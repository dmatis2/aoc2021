const { getInput } = require('./utils')

const direction = {
    forward: [1, 0],
    up: [0, -1],
    down: [0, 1]
}

const getDirections = x => {
    const [dir, count] = x.split(' ');
    const n = parseInt(count);
    return [direction[dir][0] * n, direction[dir][1] * n];
}

const getResultForSecond = arr => {
    let [x, y, aim] = [0, 0, 0];
    for(let i = 0; i < arr.length; i++) {
        let [dir, count] = arr[i].split(' ');
        count = parseInt(count);
        if(dir === 'down') aim += count;
        if(dir === 'up') aim -= count;
        if(dir === 'forward') {
            x += count;
            y += aim * count;
        }
    }
    return x * y;
}

const reduceDirections = (acc, x) => {
    return [acc[0]+x[0], acc[1]+x[1]]
}

const first = async () =>  {
    const data = (await getInput()).split('\n').map(getDirections).reduce(reduceDirections, [0, 0]).reduce((acc, x) => acc * x, 1);
    console.log(data);
}

const second = async () => {
    const data = (await getInput()).split('\n');
    console.log(getResultForSecond(data));
}

first().then(() => second());
