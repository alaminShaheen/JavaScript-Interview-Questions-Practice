// Implement a function that takes a list of async functions as input and executes them in a series that is one at a time.
// The next task is executed only when the previous task is completed.


import {createPromise} from "../Utilities.js";

// using async await
const asyncFunctionsSeriesWithAwait = async (asyncFunctions) => {
    for (const asyncFunction of asyncFunctions) {
        try {
            const result = await asyncFunction;
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }
}

void asyncFunctionsSeriesWithAwait([
    createPromise(1000),
    createPromise(2000),
    createPromise(3000),
    createPromise(3500),
    createPromise(5000),
])

// using then catch & recursion
const asyncFunctionsSeriesWithThenCatch = async (asyncFunctions) => {
    const asyncFunctionRecursion = (index = 0) => {
        if (index < asyncFunctions.length) {
            asyncFunctions[index].then((value) => {
                console.log(value);
                asyncFunctionRecursion(index + 1);
            }).catch(error => {
                console.error(error);
                asyncFunctionRecursion(index + 1);
            })
        }
    }
    asyncFunctionRecursion();
}

void asyncFunctionsSeriesWithThenCatch([
    createPromise(1000),
    createPromise(2000),
    createPromise(3000),
    createPromise(3500),
    createPromise(5000)
])


// using Array.reduce
const asyncFunctionsSeriesWithReduce = async (asyncFunctions) => {
    asyncFunctions.reduce((accumulator, asyncFunction) => {
        return accumulator.then(() => {
            return asyncFunction.then(console.log).catch(console.error);
        })
    }, Promise.resolve());
}

void asyncFunctionsSeriesWithReduce([
    createPromise(1000),
    createPromise(2000),
    createPromise(3000),
    createPromise(3500),
    createPromise(5002)
])