import { getInput } from "./utils";

interface Input {
    template: string,
    pairs: Map<string, string>
}

const parseInput = async () : Promise<Input> => {
    const data = (await getInput()).split('\n\n');
    const template = data[0];
    const map = new Map();
    data[1].split('\n').forEach(pair => {
        const split = pair.split(' -> ');
        map.set(split[0], split[1]);
    });
    return ({
        template: template,
        pairs: map
    });
}

const insertRound = (orig: string, map: Map<string, string>) => {
    let newString = "";
    for(let i = 0; i < orig.length; i++) {
        const target = orig.slice(i, i + 2);
        newString += orig[i];
        if(map.has(target)) {
            newString += map.get(target) ?? "";
        }
    }
    return newString;
}

const first = async () =>  {
    const data = await parseInput();
    let polymer = data.template;
    for(let i = 0; i < 10; i++) {
        polymer = insertRound(polymer, data.pairs);
    }
    const cardinality = new Map();
    polymer.split('').forEach(letter => {
        const count = cardinality.get(letter) ?? 0;
        cardinality.set(letter, count + 1);
    });
    const results = [...cardinality.entries()].sort((a,b) => a[1] - b[1]);
    console.log(results[results.length - 1][1] - results[0][1]);
}

const second = async () => {
    const data = await parseInput();
    let inserts: Map<string, number> = new Map();
    for(let i = 0; i < data.template.length - 1; i++) {
        const target = data.template.slice(i, i + 2);
        const count = inserts.get(target) ?? 0;
        inserts.set(target, count + 1);
    }
    for(let i = 0; i < 40; i++) {
        const newInserts: Map<string, number> = new Map();
        [...inserts.entries()].forEach(pair => {
            const orig = data.pairs.get(pair[0]) ?? "";
            const pair1 = pair[0][0] + orig;
            const pair2 = orig + pair[0][1];
            const pair1count = pair[1] + (newInserts.get(pair1) ?? 0);
            const pair2count = pair[1] + (newInserts.get(pair2) ?? 0);
            newInserts.set(pair1, pair1count);
            newInserts.set(pair2, pair2count);
        });
        inserts = newInserts;
    }
    const lettersCount: Map<string, number> = new Map();
    [...inserts.entries()].forEach(pair => {
        pair[0].split('').forEach(letter => {
            lettersCount.set(letter, pair[1] + (lettersCount.get(letter) ?? 0));
        })
    })
    const arr = [...lettersCount.values()];
    const [min, max] = [Math.min(...arr), Math.max(...arr)];
    console.log(Math.round(max / 2) - Math.round(min / 2));
}

first().then(() => second());