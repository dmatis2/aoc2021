import { getInput } from "./utils";

interface Mapper {
    2: number,
    4: number,
    3: number,
    7: number
}

const mapper: Mapper = {
    2: 1,
    4: 4,
    3: 7,
    7: 8
}

const parseInput = async () : Promise<string[][]> => {
    const data = (await getInput()).split('\n').map((x: string) => x.split(' | ')).map((x: string[]) => x[1]).map((x: string) => x.split(' '));
    return data;
}

const parseInputFirstPart = async () : Promise<string[][]> => {
    const data = (await getInput()).split('\n').map((x: string) => x.split(' | ')).map((x: string[]) => x[0]).map((x: string) => x.split(' '));
    return data;
}

const sortLetters = (str: string) => str.split('').sort((a,b) => a.localeCompare(b)).join('');

const first = async () =>  {
    const map = new Map();
    const data = await parseInput();
    data.forEach((line: string[]) => {
        line.forEach((num: string) => {
            const index = mapper[num.length as keyof Mapper];
            if([1,4,7,8].includes(index)) {
                map.set(index, (map.get(index) ?? 0) + 1)
            }
        });
    })
    console.log([...map.values()].reduce((a,v) => a+v, 0));
}

const second = async () => {
    const numbers = [...Array(10).fill("")];
    const testData = await parseInput();
    const data = await parseInputFirstPart();
    let result = 0;
    for(let index=0; index < data.length; index++) {
        const line = data[index]
        for(let i=0; i < line.length; i++) {
            const num = line[i];
            if(num.length === 2) {
                numbers[1] = sortLetters(num);
            }
            if(num.length === 3) {
                numbers[7] = sortLetters(num);
            }
            if(num.length === 4) {
                numbers[4] = sortLetters(num);
            }
            if(num.length === 7) {
                numbers[8] = sortLetters(num);
            }
        }
        for(let i=0; i < line.length; i++) {
            const num = line[i];
            if(num.length === 6) {
                if(numbers[4].split('').every((digit: string) => num.includes(digit))) {
                    numbers[9] = sortLetters(num);
                }
                else if(numbers[1].split('').every((digit: string) => num.includes(digit))) {
                    numbers[0] = sortLetters(num);
                } else {
                    numbers[6] = sortLetters(num);
                }
            }
        }
        for(let i=0; i < line.length; i++) {
            const num = line[i];
            if(num.length === 5) {
                const notIncluded = numbers[9].split('').filter((digit: string) => !num.includes(digit));
                if(numbers[1].split('').every((digit: string) => num.includes(digit))) {
                    numbers[3] = sortLetters(num);
                } else if(notIncluded.length === 1) {
                    numbers[5] = sortLetters(num);
                } else {
                    numbers[2] = sortLetters(num);
                }
            }
        }
        result += parseInt(testData[index].map((num: string) => sortLetters(num)).map((num: string) => numbers.indexOf(num)).join(''));
    }
    console.log(result);
}

first().then(() => second());