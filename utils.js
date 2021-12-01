const fs = require('fs')

const getInput = () => new Promise((res, rej) => {
    fs.readFile('input.txt', 'utf8', (e, data) => {
        if(e) rej(e);
        res(data);
    })
})

module.exports = {
    getInput
}