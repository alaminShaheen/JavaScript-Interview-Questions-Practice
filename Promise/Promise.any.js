// ● Function takes an array of promises as input and returns a new promise.
// ● The returned promise is resolved as soon as any of the input promises resolves.
// ● Else if all the input promises are rejected then the returned promise is rejected with the array of all the input promises reasons.

const promiseAny = (promises) => {
    return new Promise((resolve, reject) => {
        const aggregateErrors = [];
        let failedPromises = 0
        promises.forEach(promise => {
            if (promise instanceof Promise) {
                promise.then(resolve).catch(error => {
                    aggregateErrors.push(error);
                    failedPromises++;
                    failedPromises === promises.length && reject(aggregateErrors);
                })
            } else {
                resolve(promise);
            }
        })
    })
}

const createPromise = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => time > 5000 ? reject(time) : resolve(time), time);
    })
}

const result = promiseAny([
    createPromise(5002),
    createPromise(5003),
    createPromise(9000),
    createPromise(5001),
    40
]).then(console.log).catch(error => {
    console.error(`Rejected with ${error}`)
});