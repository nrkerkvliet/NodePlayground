
// const p = Promise.resolve({ id: 1});
/* const p = Promise.reject(new Error('reason for rejection...'));
p.then(result => console.log(result));
p.catch(err => console.log(err)); */


const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async Op 1...');
        resolve(1);
        // reject(new Error('because something failed'));
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async Op 2...');
        resolve(2);
    }, 2000);
});

// wait for all promises to be fulfilled
/* Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err)); */

// wait for the first promise of the group to be fulfilled
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err));