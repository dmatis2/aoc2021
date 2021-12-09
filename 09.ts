import { getInput } from "./utils";

const parseInput = async () : Promise<number[][]> => {
    const data = (await getInput()).split('\n').map((x: string) => x.split('').map((y: string) => parseInt(y)));
    return data;
}

const getIndex = (data: number[][], x: number, y: number) => data[0].length * y + x;

const first = async () =>  {
    const data = await parseInput();
    let sum = 0;
    for(let y=0; y < data.length; y++) {
        for(let x=0; x < data[0].length; x++) {
            const current = data[y][x];
            if(y - 1 >= 0 && current >= data[y - 1][x]) continue;
            if(y + 1 < data.length && current >= data[y + 1][x]) continue;
            if(x - 1 >= 0 && current >= data[y][x - 1]) continue;
            if(x + 1 < data[y].length && current >= data[y][x + 1]) continue;
            sum += current + 1;
        }
    }
    console.log(sum);
}

const second = async () => {
    const data = await parseInput();
    let sums: number[] = [];
    for(let y=0; y < data.length; y++) {
        for(let x=0; x < data[0].length; x++) {
            const current = data[y][x];
            if(y - 1 >= 0 && current >= data[y - 1][x]) continue;
            if(y + 1 < data.length && current >= data[y + 1][x]) continue;
            if(x - 1 >= 0 && current >= data[y][x - 1]) continue;
            if(x + 1 < data[y].length && current >= data[y][x + 1]) continue;

            // Start BFS here
            let tmpSum = 1;
            let queue = [[x, y]];
            let visitedIndexes: number[] = [];
            while(queue.length > 0) {
                const dir = queue.shift();
                if(dir) {
                    const newX = dir[0];
                    const newY = dir[1];
                    const currentValue = data[newY][newX];
                    const possibleDir = [[newX, newY-1], [newX, newY+1], [newX-1, newY], [newX+1, newY]];
                    for(let z=0; z < possibleDir.length; z++) {
                        const x1 = possibleDir[z][0];
                        const y1 = possibleDir[z][1];
                        if(x1 >= 0 && y1 >= 0 && x1 < data[0].length && y1 < data.length) {
                            if(currentValue < data[y1][x1] && data[y1][x1] !== 9) {
                                const index = getIndex(data, x1, y1);
                                if(!visitedIndexes.includes(index)) {
                                    queue = [...queue, [x1, y1]];
                                    tmpSum += 1;
                                    visitedIndexes = [...visitedIndexes, index];
                                }
                            }
                        }
                    }
                }
            }
            sums = [...sums, tmpSum];
        }
    }
    console.log(sums.sort((a,b) => b - a).slice(0, 3).reduce((a,v) => a*v, 1));
}

first().then(() => second());