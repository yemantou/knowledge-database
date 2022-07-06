function run (generator) {
  var args = [].slice.call(arguments, 1); // 获取所有除了generator函数的所有实参
  var it;

  // 在当前上下文中初始化生成器
  it = generator.apply(this, args);

  // 返回一个promise用于生成器完成
  return Promise.resolve().then(
    function handleNext (value) {
      // 对下一个yield出的值运行
      var next = it.next(value);
      console.log('next', next);

      return (function handleResult (next) {
        // 判断生成器是否运行完毕
        if (next.done) {
          // 运行完毕返回值
          return next.value
        } else {
          // 未运行完毕继续运行
          return Promise.resolve(next.value).then(
            // 成功就恢复异步循环，把决议的值发回生成器
            handleNext,

            // 如果value是被拒绝的promise，就把错误传回生成器进行出错处理
            function handleError (err) {
              return Promise.resolve(
                it.throw(err)
              ).then(handleResult);
            }
          );
        }
      })(next);
    }
  );
}


var ajax = function (url) {
  return new Promise(function (resolve, reject) {
    if (url === 'http://url.1' || url === 'http://url.2' || url === 'http://url.3?v=http://url.1,http://url.2') {
      resolve(url);
    } else {
      reject('url错误');
    }
  });
}


function* foo () {
  // 让两个请求并发执行（promise在实例化的时候就开始了）
  var p1 = ajax('http://url.1');
  var p2 = ajax('http://url.2');

  // 等待两个promise决议
  var r1 = yield p1;
  var r2 = yield p2;

  var r3 = yield ajax(`http://url.3?v=${r1},${r2}`)

  console.log('r3', r3);
}

run(foo);
