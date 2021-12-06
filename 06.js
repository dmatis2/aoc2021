const { getInput, getExample } = require('./utils')

const parseInput = async () => {
    const data = (await getInput()).split(',').map(x => parseInt(x));
    return data;
}

const getNumberAfterNDays = async (N) => {
    let timers = await parseInput();
    let map = new Map();
    timers.forEach(timer => {
        if (map.has(timer)) {
            map.set(timer, map.get(timer) + 1);
            return;
        }
        map.set(timer, 1);
    });
    for (let day = 1; day <= N; day++) {
        let tmpMap = new Map();
        for (let i = 0; i <= 8; i++)
            tmpMap.set(i, 0);

        map.forEach((val, key) => {
            if (key === 0) {
                tmpMap.set(6, tmpMap.get(6) + val);
                tmpMap.set(8, tmpMap.get(8) + val);
                return;
            }
            tmpMap.set(key - 1, tmpMap.get(key - 1) + val);
        });
        map = tmpMap;
    }
    console.log([...map.values()].reduce((a, x) => a + x, 0));
}

const first = async () =>  {
    await getNumberAfterNDays(80);
}

const second = async () => {
    await getNumberAfterNDays(256);
}

first().then(() => second());
