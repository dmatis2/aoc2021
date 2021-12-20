import { getInput } from "./utils";

type ParsedInput = {
    algo: string;
    set: Set<string>,
    grid: string[],
}
const parseInput = async () : Promise<ParsedInput> => {
    const data = (await getInput()).split('\n');
    const algo = data[0];
    const grid = data.slice(2);
    const set: Set<string> = new Set();

    for(let x=0; x<grid.length; x++) {
        for(let y=0; y<grid[0].length; y++) {
            if(grid[x][y] === '#') set.add(`${x},${y}`);
        }
    }

    return {
        algo,
        set,
        grid,
    };
}

const getBounds = (input: ParsedInput) => {
    const min = [Number.MAX_VALUE, Number.MAX_VALUE];
    const max = [Number.MIN_VALUE, Number.MIN_VALUE];
    input.set.forEach(pair => {
        const split = pair.split(',').map(n => parseInt(n));
        if(split[0] < min[0]) min[0] = split[0];
        if(split[0] > max[0]) max[0] = split[0];
        if(split[1] < min[1]) min[1] = split[1];
        if(split[1] > max[1]) max[1] = split[1];
    });
    return [min[0], min[1], max[0], max[1]];
}

const printGrid = (input: ParsedInput, bounds: number[]) => {
    const {grid, set} = input;
    for(let x=bounds[0];x<=bounds[2];x++) {
        for(let y=bounds[1];y<=bounds[3];y++) {
            process.stdout.write(set.has(`${x},${y}`) ? '#' : '.');
        }
        process.stdout.write('\n');
    }
}

const enhance = (input: ParsedInput, bounds: number[]): ParsedInput => {
    const {algo, set} = input;
    const newSet: Set<string> = new Set();
    for(let x=bounds[0];x<=bounds[2];x++) {
        for(let y=bounds[1];y<=bounds[3];y++) {
            let binary = "";
            for(let dx=-1;dx<=1;dx++) {
                for(let dy=-1;dy<=1;dy++) {
                    const newX = x + dx;
                    const newY = y + dy;
                    binary += set.has(`${newX},${newY}`) ? "1" : "0";
                }
            }
            const binNum = parseInt(binary, 2);
            
            if(algo[binNum] === '#') {
                newSet.add(`${x},${y}`);
            }
        }
    }

    return {
        ...input,
        set: newSet,
    }
        
}

const first = async () =>  {
    let input = await parseInput();
    const minmax = getBounds(input);
    minmax[0] -= 100;
    minmax[1] -= 100;
    minmax[2] += 100;
    minmax[3] += 100;

    for(let i=0; i<2; i++) {
        input = enhance(input, minmax);
        minmax[0] += 3;
        minmax[1] += 3;
        minmax[2] -= 3;
        minmax[3] -= 3;
    }
    
    console.log(input.set.size);
}

const second = async () => {
    let input = await parseInput();
    const minmax = getBounds(input);
    minmax[0] -= 200;
    minmax[1] -= 200;
    minmax[2] += 200;
    minmax[3] += 200;

    for(let i=0; i<50; i++) {
        input = enhance(input, minmax);
        minmax[0] += 3;
        minmax[1] += 3;
        minmax[2] -= 3;
        minmax[3] -= 3;
    }
    
    console.log(input.set.size);
}

first().then(() => second());