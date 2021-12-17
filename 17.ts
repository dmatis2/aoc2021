import { getExample, getInput } from "./utils";

interface Coords {
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
}

const parseInput = async () : Promise<Coords> => {
    const match = (await getInput()).match(/target area: x=(?<xMin>\d+)..(?<xMax>\d+), y=(?<yMin>[-]\d+)..(?<yMax>[-]\d+)/);
    if(match && match.groups) {
        return {
            xMin: parseInt(match.groups.xMin),
            xMax: parseInt(match.groups.xMax),
            yMin: parseInt(match.groups.yMin),
            yMax: parseInt(match.groups.yMax)
        }
    }
    return {
        xMin: 0,
        xMax: 0,
        yMin: 0,
        yMax: 0
    }
}

const getIsInRange = (x: number, y: number, area: Coords) => {
    return area.xMin <= x && x <= area.xMax && area.yMin <= y && y <= area.yMax
}

const getIsBelowArea = (x: number, y: number, area: Coords) => {
    return y < area.yMin;
}

const getMaxHeight = (velocityX: number, velocityY: number, area: Coords) => {
    let maxHeight = Number.MIN_VALUE;
    let x = 0;
    let y = 0;
    while(true) {
        x += velocityX;
        y += velocityY;
        velocityX += velocityX > 0 ? -1 : (velocityX < 0 ? 1 : 0);
        velocityY -= 1;
        if(y > maxHeight) maxHeight = y;
        if(getIsInRange(x, y, area)) return maxHeight;
        if(getIsBelowArea(x, y, area)) return -1;
    }
}

const first = async () =>  {
    const coords = await parseInput();
    let maxHeight = Number.MIN_VALUE;
    for(let y = -200; y <= 200; y++) {
        for(let x = 0; x < 200; x++) {
            const tmpHeight = getMaxHeight(x, y, coords);
            if(tmpHeight > maxHeight) maxHeight = tmpHeight;
        }
    }
    console.log(maxHeight);
}

const second = async () => {
    const coords = await parseInput();
    let count = 0;
    for(let y = -200; y <= 200; y++) {
        for(let x = 0; x < 200; x++) {
            if(getMaxHeight(x, y, coords) !== -1) count++;
        }
    }
    console.log(count);
}

first().then(() => second());