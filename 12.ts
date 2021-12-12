import { getInput } from "./utils";

interface State {
    curr: string,
    smallCaves: Set<string>,
    alreadyVisited: boolean
}

type Queue = State[];

const parseInput = async () : Promise<Map<string, string[]>> => {
    const data = (await getInput()).split('\n').map((line: string) => line.split("-")).map((line: string[]) => line[0] === 'end' ? [line[1], line[0]] : line);
    const map = new Map();
    data.forEach(double => {
        if(!map.has(double[0])) map.set(double[0], []);
        if(!map.has(double[1])) map.set(double[1], []);
        map.set(double[0], [...map.get(double[0]), double[1]]);
        map.set(double[1], [...map.get(double[1]), double[0]]);
    });
    return map;
}

const traverseIter = (map: Map<string, string[]>, canBeTwice = false) => {
    let total = 0;
    const state: State = {
        curr: 'start',
        smallCaves: new Set(['start']),
        alreadyVisited: false
    }
    const queue: Queue = [state];
    while(queue.length > 0) {
        const currentState = queue.shift();
        if(!currentState) continue;
        if(currentState.curr === 'end') {
            total++;
            continue;
        }
        map.get(currentState.curr)?.forEach((node: string) => {
            if(!currentState.smallCaves.has(node)) {
                const tmpSet = new Set(currentState.smallCaves);
                if(node.toLowerCase() === node) {
                    tmpSet.add(node);
                }
                queue.push({
                    curr: node,
                    smallCaves: tmpSet,
                    alreadyVisited: currentState.alreadyVisited
                })
                
            } else if(canBeTwice && currentState.smallCaves.has(node) && !currentState.alreadyVisited && !['start', 'end'].includes(node)) {
                queue.push({
                    curr: node,
                    smallCaves: currentState.smallCaves,
                    alreadyVisited: true
                })
            }
        });
    }
    return total;
}

const first = async () =>  {
    console.time('p1');
    const map = await parseInput();
    const value = traverseIter(map);
    console.log(value);
    console.timeEnd('p1');
}

const second = async () => {
    console.time('p2');
    const map = await parseInput();
    const value = traverseIter(map, true);
    console.log(value);
    console.timeEnd('p2');
}

first().then(() => second());