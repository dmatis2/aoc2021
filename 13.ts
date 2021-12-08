import { getInput } from "./utils";

const parseInput = async () : Promise<string[]> => {
    const data = (await getInput()).split('\n');
    return data;
}

const first = async () =>  {
    const data = await parseInput();
}

const second = async () => {
    const data = await parseInput();
}

first().then(() => second());