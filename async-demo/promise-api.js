const resolved = Promise.resolve('promise result');
resolved.then(result => console.log(result));

const rejected = Promise.reject(new Error('reason for rejection'));
rejected.catch(err => console.error(err));

const p1 = new Promise(resolve => {
  console.log('promise 1 called');
  setTimeout(() => {
    console.log('promise 1 resolved');
    resolve(1);
  }, 1500)
});

const p2 = new Promise(resolve => {
  console.log('promise 2 called');
  setTimeout(() => {
    console.log('promise 2 resolved');
    resolve(2);
  }, 3000)
});

Promise.all([p1, p2])
  .then(results => console.log(results));

