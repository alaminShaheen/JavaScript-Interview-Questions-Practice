import {createPromise} from "../Utilities.js";

const promiseRace = (promises) => {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            // Promise.resolve a promise returns the original promise that we sent as argument
            // Promise.resolve any other value than a promise returns a new promise
            Promise.resolve(promise).then(resolve).catch(reject);
        })
    })
}

promiseRace([
    createPromise(5002),
    createPromise(5003),
    createPromise(9000),
    createPromise(5001),
    createPromise(2000),
    250
]).then(value => {
    console.log(value);
    console.log("hello")
}).catch(error => {
    console.error(`Rejected with ${error}`)
});
