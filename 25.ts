import { getInput } from "./utils";

enum Facing {
    SOUTH,
    EAST
}
type State = [number, number, Facing];

const parseInput = async () : Promise<[number, number, Array<State>]> => {
    const data = (await getInput()).split('\n');
    const rows = data.length;
    const cols = data[0].length;
    
    const hashmap: Array<State> = [];
    data.forEach((line, idx) => {
        line.split('').forEach((ch, idx2) => {
            if(ch === '>') {
                hashmap.push([idx, idx2, Facing.EAST]);
            } else if(ch === 'v') {
                hashmap.push([idx, idx2, Facing.SOUTH]);
            }
        })
    })
    return [rows, cols, hashmap];
}

const step = (hashmap: Array<State>, rows: number, cols: number): [Array<State>, boolean] => {
    let hasChanged = false;
    const newHashmap: Array<State> = [];
    hashmap.filter(x => x[2] === Facing.EAST).forEach(x => {
        const nextCol = (x[1] + 1) % cols;
        if(hashmap.some(x2 => x[0] === x2[0] && nextCol === x2[1])) {
            newHashmap.push(x);
        } else {
            hasChanged = true;
            newHashmap.push([x[0], nextCol, x[2]]);
        }
    })
    hashmap = [...hashmap.filter(x => x[2] === Facing.SOUTH), ...newHashmap]
    hashmap.filter(x => x[2] === Facing.SOUTH).forEach(x => {
        const nextRow = (x[0] + 1) % rows;
        if(hashmap.some(x2 => x[1] === x2[1] && nextRow === x2[0])) {
            newHashmap.push(x);
        } else {
            hasChanged = true;
            newHashmap.push([nextRow, x[1], x[2]]);
        }
    })
    return [newHashmap, hasChanged];
}

const print = (hashmap: Array<State>, rows: number, cols: number) => {
    const arr = Array(rows).fill(0).map(x => Array(cols).fill('.'));
    hashmap.forEach(x => {
        arr[x[0]][x[1]] = x[2] === Facing.EAST ? '>' : 'v';
    })
    console.log(arr.map(x => x.join('')).join('\n'));
}

const first = async () =>  {
    const [rows, cols, data] = await parseInput();
    let after = data;
    let hasChanged = true;
    let steps = 0;
    while(hasChanged) {
        [after, hasChanged] = step(after, rows, cols);
        steps++;
    }
    console.log(steps);
}

first()