import { getExample, getInput } from "./utils";

type Lines = number[][];
interface Instruction {
    axis: string,
    number: number
}
interface Input {
    lines: Lines,
    instructions: Instruction[]
}

const parseInput = async () : Promise<Input> => {
    const data = (await getInput()).split('\n\n');
    const lines: number[][] = data[0].split('\n').map((line) => {
        const match = line.match(/(?<x>\d+),(?<y>\d+)/);
        if(match) {
            const { groups } = match;
            return [parseInt(groups?.x ?? ""), parseInt(groups?.y ?? "")];
        }
        return [];
    });
    const instructions: Instruction[] = data[1].split('\n').map(line => {
        const match = line.match(/fold along (?<axis>(x|y))=(?<num>\d+)/);
        if(match) {
            const { groups } = match;
            return {
                axis: groups?.axis ?? "x",
                number: parseInt(groups?.num ?? "")
            }
        }
        return {
            axis: "x",
            number: -1
        };
    });
    return {
        lines, 
        instructions
    };
}

const fold = (lines: Lines, instruction: Instruction) => {
    switch(instruction.axis) {
        case 'x':
            return lines.map(line => {
                if(line[0] > instruction.number) return [line[0] - 2 * Math.abs(line[0] - instruction.number), line[1]];
                return line;
            })
        default:
            return lines.map(line => {
                if(line[1] > instruction.number) return [line[0], line[1] - 2 * Math.abs(line[1] - instruction.number)];
                return line;
            });            
    }
}

const first = async () =>  {
    const { lines, instructions } = await parseInput();
    const linesAfter = fold(lines, instructions[0]);
    console.log([...new Set(linesAfter.map(line => line.join(",")))].length);
    
}

const second = async () => {
    const { lines, instructions } = await parseInput();
    let newLines = lines;
    for(let i=0; i < instructions.length; i++) {
        newLines = fold(newLines, instructions[i]);
    }
    const resultSet = [...new Set(newLines.map(line => line.join(",")))];
    for(let y=0;y<10;y++) {
        for(let x=0;x<40;x++) process.stdout.write(resultSet.includes(`${x},${y}`) ? 'M' : ' ');
        process.stdout.write('\n');
    }
}

first().then(() => second());