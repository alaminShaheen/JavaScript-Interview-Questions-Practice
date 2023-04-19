import {createPromise} from "../Utilities.js";
// ● Function takes an array of promises as input and returns a new promise.
// ● The returned promise is resolved as soon as any of the input promises resolves.
// ● Else if all the input promises are rejected then the returned promise is rejected with the array of all the input promises reasons.

const promiseAny = (promises) => {
    return new Promise((resolve, reject) => {
        const aggregateErrors = [];
        let failedPromises = 0
        promises.forEach(promise => {
            // Promise.resolve a promise returns the original promise that we sent as argument
            // Promise.resolve any other value than a promise returns a new promise
            Promise.resolve(promise).then(resolve).catch(error => {
                aggregateErrors.push(error);
                failedPromises++;
                failedPromises === promises.length && reject(aggregateErrors);
            })
        })
    })
}

promiseAny([
    createPromise(5002),
    createPromise(5003),
    createPromise(9000),
    createPromise(5001),
    createPromise(2000),
]).then(console.log).catch(error => {
    console.error(`Rejected with ${error}`)
});