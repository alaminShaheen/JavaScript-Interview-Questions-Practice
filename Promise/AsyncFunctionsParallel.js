import {createPromise} from "../Utilities.js";
// Implement a function that takes a list of async functions as input and a callback function and executes the input tasks in parallel i.e
// all at once and invokes the callback after every task is finished.

// using then and catch
const asyncFunctionsParallelWithThenCatch = (asyncFunctions, callback) => {
    let tasksExecuted = 0;
    const result = []
    asyncFunctions.forEach(asyncFunction => {
        Promise.resolve(asyncFunction).then(value => {
            result.push(value);
        }).catch(error => {
            result.push(error);
        }).finally(() => {
            tasksExecuted++;
            if (tasksExecuted === asyncFunctions.length) {
                callback(result);
            }
        })
    })
}

asyncFunctionsParallelWithThenCatch([
    createPromise(1000),
    createPromise(5000),
    createPromise(2000),
    createPromise(3000),
    createPromise(3500),
], console.log);