const Sema = require('async-sema');
const s = new Sema(4, { capactiy: 100 }) // 4 async calls in "parallel", up to 100 async calls on this sema
const RateLimit = require('/node_modules/async-sema/rate-limit');//don't know how to do this


const n = 50;
  const lim = RateLimit(5);

  for (let i = 0; i < n; i++) {
    await lim();
    process.stdout.write('.');
  }

async function fetchData() {
  await s.acquire()
  console.log(s.nrWaiting() + ' calls to fetch are waiting')
  // ... do some long async stuff
  s.release()
}

for(let i = 0; i < 100; i++) {
  fetchData()
}