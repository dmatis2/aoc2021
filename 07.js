const { getInput, getExample } = require('./utils')

const parseInput = async () => {
    const data = (await getInput()).split(',').map(x => parseInt(x));
    return data;
}

const getCost = (arr, to) => {
    return arr.reduce((acc, val) => acc + Math.abs(val - to), 0);
}

const getCostWithATwist = (arr, to) => {
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
        let cost = getCost(data, low);
        if(cost < lowestCost) lowestCost = cost;
    }
    console.log(lowestCost);
}

const second = async () => {
    const data = await parseInput();
    const [min, max] = [Math.min(...data), Math.max(...data)];
    let lowestCost = Number.MAX_SAFE_INTEGER;
    for(let low=min; low <= max; low++) {
        let cost = getCostWithATwist(data, low);
        if(cost < lowestCost) lowestCost = cost;
    }
    console.log(lowestCost);
}

first().then(() => second());
