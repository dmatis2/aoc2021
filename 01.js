const { getInput } = require('./utils')

const countIncreasing = arr => {
    return arr.slice(1).filter((x,i) => x > arr[i]).length;
}

const countIncreasingTriples = arr => {
    return countIncreasing(arr.slice(0, arr.length - 2).map((x,i) => x+arr[i+1]+arr[i+2]))
}

const first = async () =>  {
    const data = (await getInput()).split('\n').map(x => parseInt(x));
    console.log(countIncreasing(data));
}

const second = async () => {
    const data = (await getInput()).split('\n').map(x => parseInt(x));
    console.log(countIncreasingTriples(data));
}

first().then(() => second());
