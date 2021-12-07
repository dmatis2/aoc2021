import { getInput } from './utils'

const countIncreasing = (arr: number[]) => {
    return arr.slice(1).filter((x: number, i: number) => x > arr[i]).length;
}

const countIncreasingTriples = (arr: number[]) => {
    return countIncreasing(arr.slice(0, arr.length - 2).map((x: number, i: number) => x+arr[i+1]+arr[i+2]))
}

const first = async () : Promise<void> =>  {
    const data = (await getInput()).split('\n').map((x: string) => parseInt(x));
    console.log(countIncreasing(data));
}

const second = async () => {
    const data = (await getInput()).split('\n').map((x: string) => parseInt(x));
    console.log(countIncreasingTriples(data));
}

first().then(() => second());
