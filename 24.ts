const nums = [15,16,4,14,-8,-10,1,-3,3,-4,5,-5,-8,-11];
const types = [0,0,0,0,1,1,0,1,0,1,0,1,1,1];

const bruteforce = (test: Array<number>): boolean => {
    let z = 0;
    let testIdx = 0;
    const tmp = Array(14).fill(0);
    for(let i=0;i<14;i++) {
        if(types[i] === 0) {
            z = 26 * z + test[testIdx] + nums[i]
            tmp[i] = test[testIdx++];
        } else {
            tmp[i] = (z%26) + nums[i]
            if(tmp[i] < 1 || tmp[i] > 9) return false;
            z = Math.floor(z / 26);
        }
    }
    console.log(tmp.join(''));
    return true;
}

const first = async () =>  {
    for(let a=9;a>=1;a--) {
        for(let b=9;b>=1;b--) {
            for(let c=9;c>=1;c--) {
                for(let d=9;d>=1;d--) {
                    for(let e=9;e>=1;e--) {
                        for(let f=9;f>=1;f--) {
                            for(let g=9;g>=1;g--) {
                                const arr = [a,b,c,d,e,f,g];
                                if(bruteforce(arr)) return;
                            }
                        }
                    }
                }
            }
        }
    }
}

const second = async () => {
    for(let a=1;a<=9;a++) {
        for(let b=1;b<=9;b++) {
            for(let c=1;c<=9;c++) {
                for(let d=1;d<=9;d++) {
                    for(let e=1;e<=9;e++) {
                        for(let f=1;f<=9;f++) {
                            for(let g=1;g<=9;g++) {
                                const arr = [a,b,c,d,e,f,g];
                                if(bruteforce(arr)) return;
                            }
                        }
                    }
                }
            }
        }
    }
}

first().then(() => second());