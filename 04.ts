import { getInput } from './utils';

type Nums = number[];
type Bingo = number[][];
type Bingos = number[][][];
type ParsedInput = [Nums, Bingos];

const parseInput = async () : Promise<ParsedInput> => {
    const data: string[] = (await getInput()).split('\n');
    const nums = data[0].split(',').map(x => parseInt(x));
    const bingos = getBingos(data);
    return [nums, bingos];
}

const getBingos = (data: string[]): Bingos => {
    data = data.slice(1);
    let bingos: Bingos = [];
    for(let i=0;i<data.length;i+=6) {
        let board: number[][] = [];
        for(let j=i+1; j<i+6; j++) {
            board = [...board, (data[j].trim().replace(/[ ]+/g, ',').split(',').map(x => parseInt(x)))];
        }
        bingos = [...bingos, board];
    }
    return bingos;
}

const hasWinningRow = (nums: Nums, bingo: Bingo) => {
    const predicate = (x: number) => nums.includes(x);
    if(bingo.some(row => row.every(predicate))) {
        const win = bingo.filter(row => row.every(predicate));
        return win;
    }
    return null;
}

const hasWinningCol = (nums: Nums, bingo: Bingo) => {
    const bingoT = bingo.map((col, i) => bingo.map(row => row[i]));
    return hasWinningRow(nums, bingoT);
}

const isWinner = (nums: Nums, bingo: Bingo) => {
    return hasWinningRow(nums, bingo) || hasWinningCol(nums, bingo);
}

const play = (nums: Nums, bingos: Bingos) => {
    let winIdx = 0;
    for(let i = 0; i < nums.length; i++) {
        if(bingos.some(bingo => isWinner(nums.slice(0, i), bingo))) {
            bingos.map(bingo => isWinner(nums.slice(0, i), bingo)).filter((bingo, idx) => {
                if(bingo) winIdx = idx;
                return bingo;
            });
            const winningNum = nums[i-1];
            const sum = bingos[winIdx].flat().filter(x => !nums.slice(0, i).includes(x)).reduce((acc, x) => acc + x, 0);
            return winningNum * sum;
        }
    }
    return null;
}

const playAll = (nums: Nums, bingos: Bingos) => {
    let winIdx = 0;
    for(let i = nums.length - 1; i >= 0; i--) {
        const notWinning = bingos.filter((bingo, idx) => {
            if(!isWinner(nums.slice(0, i+1), bingo)) {
                winIdx = idx;
            }
            return !isWinner(nums.slice(0, i+1), bingo);
        });
        if(notWinning.length === 1) {
            const winningNum = nums[i+1];
            const sum = bingos[winIdx].flat().filter(x => !nums.slice(0, i+2).includes(x)).reduce((acc, x) => acc + x, 0);
            return winningNum * sum;
        }
    }
    return null;
}

const first = async () : Promise<void> => {
    const [nums, bingos] = await parseInput();
    const winning = play(nums, bingos);
    console.log(winning);
}

const second = async () : Promise<void> => {
    const [nums, bingos] = await parseInput();
    const winning = playAll(nums, bingos);
    console.log(winning);

}

first().then(() => second());
