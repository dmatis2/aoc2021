import { getExample, getInput } from "./utils";

type Pair = number | [Pair, Pair];
type StackRecord = [Node, number];
type ActionResult = [Node, boolean];

let index = 0;

class Node {
    left?: Node;
    right?: Node;
    value?: Pair;
    parent?: Node; 
    index: number;

    constructor(value?: Pair, left?: Node, right?: Node, parent?: Node) {
        this.index = index++;
        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }

    print(): string {
        if(this.value !== null && this.value !== undefined && Number.isInteger(this.value)) {
            return this.value?.toString();
        }
        return `[${this.left?.print()},${this.right?.print()}]`;
    }

    hasBigNum(): boolean {
        if(this.value !== null && this.value !== undefined && Number.isInteger(this.value)) return this.value >= 10;
        const result = this.left?.hasBigNum() || this.right?.hasBigNum();
        if(result === undefined) return false;
        return result;
    }
}

const parseInput = async () : Promise<Pair[]> => {
    return (await getInput()).split('\n').map(line => JSON.parse(line));
}

const buildTree = (input: Pair, parent?: Node) => {
    if(Number.isInteger(input)) {
        const newNode = new Node(input);
        newNode.parent = parent;
        return newNode;
    }
    const newNode = new Node();
    newNode.parent = parent;
    if(Array.isArray(input)) {
        newNode.left = buildTree(input[0], newNode);
        newNode.right = buildTree(input[1], newNode);
    }
    return newNode;
}

const reduceExplode = (tree: Node, depth = 0): [Node, boolean] => {
    if(!tree) return [tree, false];

    // explode    
    if(depth >= 4 && tree.value === undefined && tree.left?.value !== undefined && tree.right?.value !== undefined) {
        const leftVal = tree?.left?.value;
        const rightVal = tree?.right?.value;
        
        // exploding left number
        let currentNode = tree.parent;
        let previousNode = tree;
        while(true) {
            if(!currentNode) break;
            if(currentNode.left?.print() !== previousNode.print()) break;
            if(currentNode.left.index !== previousNode.index) break;
            previousNode = currentNode;
            currentNode = currentNode.parent;
        }
        if(currentNode) {
            currentNode = currentNode.left;
            while(currentNode?.right) currentNode = currentNode.right;
            if(currentNode?.value !== null && currentNode?.value !== undefined) {
                if(Number.isInteger(currentNode.value) && leftVal)
                    currentNode.value = parseInt(currentNode.value.toString()) + parseInt(leftVal?.toString());
                    
            }
        }
        

        // exploding right number
        currentNode = tree.parent;
        previousNode = tree;
        while(true) {
            if(!currentNode) break;
            if(currentNode.right?.print() !== previousNode.print()) break;
            if(currentNode.right.index !== previousNode.index) break;
            previousNode = currentNode;
            currentNode = currentNode.parent;
        }
        if(currentNode) {
            currentNode = currentNode.right;
            while(currentNode?.left) currentNode = currentNode.left;
            if(currentNode?.value !== null && currentNode?.value !== undefined) {

                if(Number.isInteger(currentNode.value) && rightVal)
                    currentNode.value = parseInt(currentNode.value.toString()) + parseInt(rightVal.toString());
            }
        }
        tree.value = 0;
        tree.left = undefined;
        tree.right = undefined;
        return [tree, true];
    }

    if(tree.left) {
        const [newTree, result] = reduceExplode(tree.left, depth + 1);
        if(result) {
            tree.left = newTree;
            return [tree, result];
        }
    }

    if(tree.right) {
        const [newTree, result] = reduceExplode(tree.right, depth + 1);
        if(result) {
            tree.right = newTree;
            return [tree, result];
        }
    }

    return [tree, false];
}

const reduceSplit = (tree: Node, depth = 0): [Node, boolean] => {
    if(!tree) return [tree, false];
    if(tree.value !== undefined && (typeof tree.value) === 'number' && tree.value >= 10) {
        const val = tree.value as number;
        tree.left = new Node(Math.floor(val / 2));
        tree.right = new Node(Math.ceil(val / 2));
        tree.left.parent = tree;
        tree.right.parent = tree;
        tree.value = undefined;
        return [tree, true];
    }

    if(tree.left) {
        const [newTree, result] = reduceSplit(tree.left, depth + 1);
        if(result) {
            tree.left = newTree;
            return [tree, result];
        }
    }

    if(tree.right) {
        const [newTree, result] = reduceSplit(tree.right, depth + 1);
        if(result) {
            tree.right = newTree;
            return [tree, result];
        }
    }

    return [tree, false];
}

const add = (a: Node, b: Node) => {
    const root = new Node();
    root.left = a;
    root.right = b;
    root.left.parent = root;
    root.right.parent = root;
    return root;
}

const getMagnitude = (tree: Node | undefined): number => {
    if(!tree) return 1;
    if(typeof tree.value === 'number') return tree.value as number;
    return 3 * getMagnitude(tree.left) + 2 * getMagnitude(tree.right);
}

const first = async () => {
    const data = await parseInput();
    let tree = buildTree(data[0]);
    for(let i = 1; i < data.length; i++) {
        tree = add(tree, buildTree(data[i]));
        let hasChanged = true;
        let newTree = null;
        while(hasChanged) {
            [newTree, hasChanged] = reduceExplode(tree);
            if(hasChanged) {
                tree = newTree;
            } else {
                [newTree, hasChanged] = reduceSplit(tree);
                if(hasChanged) {
                    tree = newTree;
                }
            }
        }
    }
    console.log(getMagnitude(tree));
    
}

const second = async () => {
    const data = await parseInput();
    let maxMagnitude = Number.MIN_VALUE;
    for(let i=0; i < data.length; i++) {
        for(let j=0; j < data.length; j++) {
            if(i === j) continue;
            index = 0;
            let tree = add(buildTree(data[i]), buildTree(data[j]));
            let hasChanged = true;
            let newTree = null;
            while(hasChanged) {
                [newTree, hasChanged] = reduceExplode(tree);
                if(hasChanged) {
                    tree = newTree;
                } else {
                    [newTree, hasChanged] = reduceSplit(tree);
                    if(hasChanged) {
                        tree = newTree;
                    }
                }
            }
            const mag = getMagnitude(tree);
            if(mag > maxMagnitude) maxMagnitude = mag;
        }
    }
    console.log(maxMagnitude);
}

first().then(() => second());