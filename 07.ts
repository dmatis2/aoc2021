import { getInput } from './utils';

const parseInput = async () : Promise<number[]> => {
    const data = (await getInput()).split(',').map(x => parseInt(x));
    return data;
}

const getCost = (arr: number[], to: number) => {
    return arr.reduce((acc, val) => acc + Math.abs(val - to), 0);
}

const getCostWithATwist = (arr: number[], to: number) => {
    return arr.reduce((acc, val) => {
        const distance = Math.abs(val - to)
        return acc + (distance * (distance + 1) / 2);
    }, 0);
}

const first = async () =>  {
    const data = await parseInput();
    const [min, max] = [Math.min(...data), Math.max(...data)];
    let lowestCost = Number.MAX_SAFE_INTEGER;
    for(let low=min; low <= max; low++) {
        const cost = getCost(data, low);
        if(cost < lowestCost) lowestCost = cost;
    }
    console.log(lowestCost);
}

const second = async () => {
    const data = await parseInput();
    const [min, max] = [Math.min(...data), Math.max(...data)];
    let lowestCost = Number.MAX_SAFE_INTEGER;
    for(let low=min; low <= max; low++) {
        const cost = getCostWithATwist(data, low);
        if(cost < lowestCost) lowestCost = cost;
    }
    console.log(lowestCost);
}

first().then(() => second());
