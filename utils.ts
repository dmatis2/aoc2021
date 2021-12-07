const fs = require('fs')

export const getInput = () : Promise<string> => new Promise((res, rej) => {
    fs.readFile('input.txt', 'utf8', (e: object, data: string) => {
        if(e) rej(e);
        res(data);
    })
})

export const getExample = () : Promise<string> => new Promise((res, rej) => {
    fs.readFile('example.txt', 'utf8', (e: object, data: string) => {
        if(e) rej(e);
        res(data);
    })
})

// module.exports = {
//     getInput,
//     getExample
// }