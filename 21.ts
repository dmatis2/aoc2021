import { getInput } from "./utils";

let dice = 1;
let rolled = 0;
const rollDice = () => {
    rolled += 3;
    let num = 0;
    for(let i=0; i < 3; i++) {
        num += dice;
        dice++;
        if(dice === 101) dice = 1;
    }
    
    return num;
}

const parseInput = async () : Promise<Array<number>> => {
    return (await getInput()).split('\n').map(line => {
        const match = line.match(/\d+$/);
        if(match) return parseInt(match[0]);
        return 0;
    });
}

type State = [number, number]
const states: Record<string, State> = {};
const universes = (pos_p1: number, pos_p2: number, score_p1: number, score_p2: number): number[] => {
    if(score_p1 >= 21) return [1, 0];
    if(score_p2 >= 21) return [0, 1];
    if(Object.keys(states).includes(`${pos_p1},${pos_p2},${score_p1},${score_p2}`)) {
        return states[`${pos_p1},${pos_p2},${score_p1},${score_p2}`];
    }
    let uni = [0, 0]
    for(let i=1; i<=3; i++) {
        for(let j=1; j<=3; j++) {
            for(let k=1; k<=3; k++) {
                const newPos = (pos_p1 + i + j + k - 1) % 10 + 1;
                const newScore = score_p1 + newPos;
                const [uni_p2, uni_p1] = universes(pos_p2, newPos, score_p2, newScore);
                uni = [uni[0] + uni_p1, uni[1] + uni_p2];
            }
        }
    }
    states[`${pos_p1},${pos_p2},${score_p1},${score_p2}`] = uni as State;
    
    return uni;
}

const first = async () =>  {
    const data = await parseInput();
    const scores = [0, 0];
    while(scores[0] < 1000 && scores[1] < 1000) {
        let newPos = (data[0] + rollDice() - 1) % 10 + 1;
        data[0] = newPos;
        scores[0] += newPos;
        
        if(scores[0] >= 1000) {
            console.log(scores[1] * rolled);
            return;
        }
        newPos = (data[1] + rollDice() - 1) % 10 + 1;
        data[1] = newPos;
        scores[1] += newPos;
        
    }
    console.log(scores[0] * rolled);
}

const second = async () => {
    const data = await parseInput();
    const scores = [0, 0];
    const [p1, p2] = universes(data[0], data[1], scores[0], scores[1]);
    console.log(p1 > p2 ? p1 : p2);
    
}

first().then(() => second());