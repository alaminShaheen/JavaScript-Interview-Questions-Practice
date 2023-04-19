import {createPromise} from "../Utilities.js";

// ● Map the array of promises to return an object with status and value/error depending upon the promised settlement.
// ● Pass this map to the Promise.all to run them at once and return the result.

/**
 *
 * @param promises - Array of promises or any other non promise values
 * @returns {Promise<Array<any>>}
 */
const promiseAllSettled = (promises) => {
    const settledPromises = promises.map(promise => {
        return Promise
            .resolve(promise)
            .then(value => ({status: "fulfilled", value}))
            .catch(error => ({status: "rejected", value: error}));
    })
    return Promise.all(settledPromises);
}

promiseAllSettled([
    createPromise(1000),
    createPromise(2000),
    createPromise(5020),
    56,
    "hello",
    Promise.resolve(45),
    Promise.reject(29),
]).then(console.log).catch(console.error);
