import {createPromise} from "../Utilities.js";

// ● It will return a promise.
// ● The promise will resolve with the result of all the passed
// promises or reject with the error message of the first failed
// promise.
// ● The results are returned in the same order as the promises are in
// the given array.

const promiseAll = (promises) => {
    return new Promise((resolve, reject) => {
        const output = Array(promises.length);
        let tasksCompleted = 0
        promises.forEach((promise, index) => {
            // Promise.resolve a promise returns the original promise that we sent as argument
            // Promise.resolve any other value than a promise returns a new promise
            Promise.resolve(promise).then(value => {
                output[index] = value;
                tasksCompleted++;
                tasksCompleted === promises.length && resolve(output);
            }).catch(reject)
        })
    })
}

const result = promiseAll([
    createPromise(4000),
    createPromise(1000),
    createPromise(2000),
    createPromise(2050),
    69,
    Promise.resolve(55),
])

result.then(console.log).catch(console.error);