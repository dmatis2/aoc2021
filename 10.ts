import { getExample, getInput } from "./utils";

const parseInput = async () : Promise<string[]> => {
    const data = (await getInput()).split('\n');
    return data;
}

interface Mapper {
    '[': string,
    '{': string,
    '(': string,
    '<': string
}

interface Values {
    ']': number
    '}': number
    ')': number
    '>': number
}

const mapper: Mapper = {
    '[': ']',
    '{': '}',
    '(': ')',
    '<': '>'
}

const values: Values = {
    ']': 57,
    '}': 1197,
    ')': 3,
    '>': 25137
}

const scoreValues: Values = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

const first = async () =>  {
    const data = await parseInput();
    let sum = 0;
    data.forEach((line: string) => {
        let stack: string[] = [];
        const brackets = line.split('');
        for(let i=0; i < brackets.length; i++) {
            const bracket = brackets[i];
            if(['(', '{', '[', '<'].includes(bracket)) {
                stack = [...stack, bracket];
            } else {
                const top = stack[stack.length - 1];
                if(mapper[top as keyof Mapper] === bracket) {
                    stack = stack.slice(0, stack.length - 1);
                    continue;
                }
                sum += values[bracket as keyof Values];
                break;
            }
        }
    });
    console.log(sum);
}

const second = async () => {
    const data = await parseInput();
    let scores: number[] = [];
    data.forEach((line: string) => {
        let stack: string[] = [];
        let isCorrupted = false;
        const brackets = line.split('');
        for(let i=0; i < brackets.length; i++) {
            const bracket = brackets[i];
            if(['(', '{', '[', '<'].includes(bracket)) {
                stack = [...stack, bracket];
            } else {
                const top = stack[stack.length - 1];
                if(mapper[top as keyof Mapper] === bracket) {
                    stack = stack.slice(0, stack.length - 1);
                    continue;
                }
                isCorrupted = true;
                break;
            }
        }
        if(!isCorrupted && stack.length > 0) {
            let score = 0;
            while(stack.length > 0) {
                const top = stack[stack.length - 1];
                stack = stack.slice(0, stack.length - 1);
                score = score * 5 + scoreValues[mapper[top as keyof Mapper] as keyof Values];
            }
            scores = [...scores, score];
        }
    });
    scores = scores.sort((a,b) => a - b);
    console.log(scores[Math.floor(scores.length / 2)]);
}

first().then(() => second());