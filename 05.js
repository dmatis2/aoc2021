const { getInput } = require('./utils')

class Point {
    constructor(x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.used = 1;
    }

    isSame(point) {
        return this.x === point.x && this.y === point.y;
    }

    newUse() {
        this.used += 1;
    }
}

class Line {
    constructor(line, allowDiagonal) {
        let {groups: {x1, y1, x2, y2}} = line.match(/(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/)
        this.x1 = parseInt(x1);
        this.y1 = parseInt(y1);
        this.x2 = parseInt(x2);
        this.y2 = parseInt(y2);
        this.overlapping = [];
        this.diagonal = false;
        this.points = [];
        if(this.x1 === this.x2) {
            const [min, max] = [Math.min(this.y1, this.y2), Math.max(this.y1, this.y2)]
            for(let i=min; i <= max; i++) this.points = [...this.points, new Point(this.x1, i)];
        } else if (this.y1 === this.y2) {
            const [min, max] = [Math.min(this.x1, this.x2), Math.max(this.x1, this.x2)]
            for(let i=min; i <= max; i++) this.points = [...this.points, new Point(i, this.y1)];
        } else {
            if(!allowDiagonal) return;
            const directionX = this.x2 - this.x1 > 0 ? 1 : -1;
            const directionY = this.y2 - this.y1 > 0 ? 1 : -1;
            for(let i = 0; i <= Math.abs(this.x2 - this.x1); i++) {
                this.points = [...this.points, new Point(this.x1 + i * directionX, this.y1 + i * directionY)]
            }
        }
    }

    isHorizontal() {
        return this.y1 === this.y2;
    }

    isVertical() {
        return this.x1 === this.x2;
    }

    isDiagonal() {
        return this.diagonal;
    }

    setOverlapping(items) {
        this.overlapping = items;
    }
}

const parseInput = async (allowDiagonal = true) => {
    const data = (await getInput()).split('\n');
    const parsed = data.map(line => new Line(line, allowDiagonal))
    return parsed;
}

const first = async () =>  {
    const map = new Map();
    const lines = await parseInput(false);
    lines.map(line => {
        line.points.forEach(point => {
            const {x,y} = point;
            const str = `${x},${y}`;
            if(!map.has(str)) {
                map.set(str, 1);
            } else {
                map.set(str, map.get(str) + 1);
            }
        })
    });
    console.log([...map.values()].filter(x => x > 1).length);
}

const second = async () => {
    const map = new Map();
    const lines = await parseInput();
    lines.map(line => {
        line.points.forEach(point => {
            const {x,y} = point;
            const str = `${x},${y}`;
            if(!map.has(str)) {
                map.set(str, 1);
            } else {
                map.set(str, map.get(str) + 1);
            }
        })
    });
    console.log([...map.values()].filter(x => x > 1).length);
}

first().then(() => second());
