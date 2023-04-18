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
            if (promise instanceof Promise) {
                promise.then(value => {
                    output[index] = value;
                    tasksCompleted++;
                    tasksCompleted === promises.length && resolve(output);
                }).catch(reject)
            } else {
                output[index] = promise;
                tasksCompleted++;
                tasksCompleted === promises.length && resolve(output);
            }
        })
    })
}

const createPromise = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => time > 5000 ? reject(time) : resolve(time), time);
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