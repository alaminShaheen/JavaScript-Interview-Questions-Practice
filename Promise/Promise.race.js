import {createPromise} from "../Utilities.js";

// ● It returns a promise.
// ● The returned promise fulfills or rejects as soon as any one of
// the input promises fulfills or rejects.
// ● Returned promise resolves with the value of the input
// promise or rejects with the reason of the input promise.

/**
 *
 * @param promises - Array of promises or any other non promise values
 * @returns {Promise<Array<any>>}
 */
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
