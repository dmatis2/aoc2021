import { getInput } from './utils'

interface Direction {
    forward: number[],
    up: number[],
    down: number[]
}

const direction: Direction = {
    forward: [1, 0],
    up: [0, -1],
    down: [0, 1]
}

const getDirections = (x: string) : number[] => {
    const [dir, count] = x.split(' ');
    const n = parseInt(count);
    return [direction[dir as keyof Direction][0] * n, direction[dir as keyof Direction][1] * n];
}

const getResultForSecond = (arr: string[]) : number => {
    let [x, y, aim] = [0, 0, 0];
    for(let i = 0; i < arr.length; i++) {
        const [dir, count] = arr[i].split(' ');
        const intCount = parseInt(count);
        if(dir === 'down') aim += intCount;
        if(dir === 'up') aim -= intCount;
        if(dir === 'forward') {
            x += intCount;
            y += aim * intCount;
        }
    }
    return x * y;
}

const reduceDirections = (acc : number[], x : number[]) : number[] => {
    return [acc[0]+x[0], acc[1]+x[1]]
}

const first = async () : Promise<void> => {
    const data = (await getInput()).split('\n').map(getDirections).reduce(reduceDirections, [0, 0]).reduce((acc, x) => acc * x, 1);
    console.log(data);
}

const second = async () : Promise<void> => {
    const data = (await getInput()).split('\n');
    console.log(getResultForSecond(data));
}

first().then(() => second());