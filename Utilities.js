export const createPromise = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => time > 5000 ? reject(time) : resolve(time), time);
    })
}