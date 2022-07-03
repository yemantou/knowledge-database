const p = new Promise(function(resolve, reject) {
  resolvess(21);
})

p.then((data) => {
  // throw('wdwddwdw');
  console.log('llll', data);
}).catch((err, err1) => {
  console.log('catch1', err, err1);
  }
)