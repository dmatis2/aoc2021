import { getInput } from "./utils";

type Grid = number[][];

const parseInput = async () : Promise<Grid> => {
    const data = (await getInput()).split('\n').map((line: string) => line.split('')).map((line: string[]) => line.map((num: string) => parseInt(num)));
    return data;
}

let flashes = 0;
const recursiveFlash = (data: Grid, row: number, col: number) => {
    flashes += 1;
    data[row][col] = -100;
    for(let row1 = -1; row1 < 2; row1++) {
        for(let col1 = -1; col1 < 2; col1++) {
            const newRow = row + row1;
            const newCol = col + col1;
            if(newRow < 0 || newCol < 0 || newRow >= 10 || newCol >= 10) continue;
            if(data[newRow][newCol] >= 0) data[newRow][newCol] += 1;
            if(data[newRow][newCol] >= 10) {
                recursiveFlash(data, newRow, newCol);
            }
        }
    }
}

const firstWithSecond = async () =>  {
    const data = await parseInput();
    let step = 0;
    let isDone = false;
    while(!isDone) {
        step += 1;
        for(let row = 0; row < 10; row++) {
            for(let col = 0; col < 10; col++) {
                data[row][col] += 1;
            }
        }
        for(let row = 0; row < 10; row++) {
            for(let col = 0; col < 10; col++) {
                if(data[row][col] === 10) recursiveFlash(data, row, col);
            }
        }
        let flashedCount = 0;
        for(let row = 0; row < 10; row++) {
            for(let col = 0; col < 10; col++) {
                if(data[row][col] < 0) {
                    flashedCount += 1;
                    data[row][col] = 0;
                }
            }
        }
        if(step + 1 === 100) {
            console.log(flashes);
        }
        if(flashedCount === 100) {
            isDone = true;
            console.log(step);
        }
    }
}

firstWithSecond();