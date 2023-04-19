import {createPromise} from "../Utilities.js";

// ● We have to take a callback function as an input and call this callback function when the promise is settled which is either after resolve or reject.
// ● Since there is no reliable way to tell if the promise was accepted or refused, a finally callback will not receive any argument.
// ● It will provide you with a promise that you can use to compose calls to other promise methods in a chain.

Promise.prototype.finally = function (callback) {
    if (typeof callback !== 'function') {
        return this.then(callback, callback);
    }

    const thisPromise = this || Promise

    thisPromise.then(
        value => Promise.resolve(callback()).then(() => value),
        error => Promise.resolve(callback()).then(() => {
            throw error
        })
    )
}

createPromise(1000).then(console.log).finally(console.log)