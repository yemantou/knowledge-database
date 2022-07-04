if (!Promise.wrap) {
  Promise.wrap = function(fn) {
    return function() {
      console.log('fn-arguments', fn, arguments);
      var args = [].slice.call(arguments);
      return new Promise(function(resolve, reject) {
        fn.apply(
          null,
          args.concat(function(err, v) {
            if (err) {
              reject(err);
            } else {
              resolve(v);
            }
          })
        );
      });
    };
  };
}

// 模拟的一个ajax请求
const ajax = function(url, callback) {
  setTimeout(() => {
    callback && callback(url)
  }, 2000)
}

// 使用回调的方式
ajax('http://url.1/', (data) => {
  console.log('data', data);
})

// 将模拟的ajax请求转化为Promise
const request = Promise.wrap(ajax);

request('http://url.2/').then(
  function(data) {
    console.log('data2', data);
  },
  function(err) {
    console.log('err', err);
  }
)