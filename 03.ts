import { getInput } from './utils'

const getCounts = (data: string[]) : number[] => {
    let arr = [...Array(data[0].length)].fill(0);
    return data.reduce((acc, x) => {
        for(let i = 0; i < x.length; i++) {
            acc[i] += parseInt(x.split('')[i]);
        }
        return acc;
    }, arr);
}

const oxygenGeneratorComparator = (tmp: string[]) => (x: number) => x >= tmp.length / 2 ? '1' : '0';
const co2GeneratorComparator = (tmp: string[]) => (x: number) => x >= tmp.length / 2 ? '0' : '1';

const getRating = (orig: string[], comparator: (a: string[]) => (x: number) => string): number => {
    let tmp = [...orig];
    let first_bit = 0;
    do {
        let position = first_bit;
        for(;position < tmp[0].length; position++) {
            let oxygenReduced = getCounts(tmp).map(comparator(tmp));
            tmp = tmp.filter(x => x[position] === oxygenReduced[position]);
            if(tmp.length === 1) return parseInt(tmp[0], 2);
        }
        tmp = [...orig];
        first_bit++;
    } while(tmp.length !== 1);
    return 1;
}

const first = async () =>  {
    const data = (await getInput()).split('\n');
    let reduced = getCounts(data);
    let reducedS = reduced.map(oxygenGeneratorComparator(data));
    let inverted = parseInt(reducedS.map(x => x === '0' ? '1' : '0').join(''), 2);
    let bin = parseInt(reducedS.join(''), 2);
    console.log(bin * inverted);
}

const second = async () => {
    const data = (await getInput()).split('\n');
    console.log(getRating(data, oxygenGeneratorComparator) * getRating(data, co2GeneratorComparator));
}

first().then(() => second());
