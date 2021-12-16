import { getInput } from "./utils";

const parseInput = async () : Promise<string> => {
    const data = (await getInput()).split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('');
    return data;
}

let currentIndex = 0;

const getNumber = (data: string, bitLength: number) => {
    const number = parseInt(data.slice(currentIndex, currentIndex + bitLength), 2);
    currentIndex += bitLength;
    return number;
}

const getBits = (data: string, bitLength: number) => {
    const str = data.slice(currentIndex, currentIndex + bitLength);
    currentIndex += bitLength;
    return str;
}

const parseLiteral = (data: string, isSub: boolean) => {
    let str = "";
    while(getNumber(data, 1) === 1) str += getBits(data, 4);
    str += getBits(data, 4);
    
    if(!isSub) while((currentIndex - 1) % 4 !== 0) getBits(data, 1);
    return parseInt(str, 2);
}

const packet = (data: string, isSub = false) => {
    let totalVersion = 0;
    const version = getNumber(data, 3);
    const type = getNumber(data, 3);
    if(type === 4) parseLiteral(data, isSub);
    else {
        const lengthTypeID = getBits(data, 1);
        if(lengthTypeID === "0") {
            const start = currentIndex;
            while((currentIndex - start) < getNumber(data, 15)) totalVersion += packet(data, true);
        } else {
            for(let i=0; i < getNumber(data, 11); i++) totalVersion += packet(data, true);
        }
    }
    return version + totalVersion;
}

const packet2 = (data: string, isSub = false) => {
    let value = 0;
    getNumber(data, 3);
    const type = getNumber(data, 3);
    if(type === 4) return parseLiteral(data, isSub);
    const lengthTypeID = getBits(data, 1);
    let [totalLength, numberOfSubpackets] = [0, 0]  
    if(lengthTypeID === "0") totalLength = getNumber(data, 15);
    else numberOfSubpackets = getNumber(data, 11);
    if(type === 0) {
        if(lengthTypeID === '0') {
            const start = currentIndex;
            while((currentIndex - start) < totalLength) value += packet2(data, true);
        } else for(let i=0; i < numberOfSubpackets; i++) value += packet2(data, true);
    } else if(type === 1) {
        value = 1;
        if(lengthTypeID === '0') {
            const start = currentIndex;
            while((currentIndex - start) < totalLength) value *= packet2(data, true);
        } else for(let i=0; i < numberOfSubpackets; i++) value *= packet2(data, true);
    } else if(type === 2) {
        const values = [];
        if(lengthTypeID === '0') {
            const start = currentIndex;
            while((currentIndex - start) < totalLength) values.push(packet2(data, true));
        } else for(let i=0; i < numberOfSubpackets; i++) values.push(packet2(data, true));
        value = Math.min(...values);
    } else if(type === 3) {
        const values = [];
        if(lengthTypeID === '0') {
            const start = currentIndex;
            while((currentIndex - start) < totalLength) values.push(packet2(data, true));
        } else for(let i=0; i < numberOfSubpackets; i++) values.push(packet2(data, true));
        value = Math.max(...values);
    } else if(type === 5) {
        const values = [];
        values.push(packet2(data, true));
        values.push(packet2(data, true));
        value = values[0] > values[1] ? 1 : 0;
    } else if(type === 6) {
        const values = [];
        values.push(packet2(data, true));
        values.push(packet2(data, true));
        value = values[0] < values[1] ? 1 : 0;
    } else if(type === 7) {
        const values = [];
        values.push(packet2(data, true));
        values.push(packet2(data, true));
        value = values[0] === values[1] ? 1 : 0;
    }
    return value;
}

const first = async () => {
    console.log(packet(await parseInput()));
}

const second = async () => {
    currentIndex = 0;
    console.log(packet2(await parseInput()));    
}

first().then(() => second());