function run(generator) {
  var args = [].slice.call(arguments, 1); // 获取所有除了generator函数的所有实参
  var it;

  // 在当前上下文中初始化生成器
  it = generator.apply(this, args);

  // 返回一个promise用于生成器完成
  return Promise.resolve().then(
    function handleNext(value) {
      // 对下一个yield出的值运行
      var next = it.next(value);

      return (function handleResult(next) {
        // 判断生成器是否运行完毕
        if (next.done) {
          // 运行完毕返回值
          return next.value
        } else if (typeof next.value === 'function') {
          return new Promise(function (resolve, reject) {
            // 用error-first回调调用这个thunk
            next.value(function (err, msg) {
              if (err) {
                resolve(msg);
              } else {
                reject(err);
              }
            });
          }).then(
            handleNext,
            function handleError(err) {
              return Promise.resolve(
                it.throw(err)
              ).then(handleResult);
            }
          )
        } else {
          // 未运行完毕继续运行
          return Promise.resolve(next.value).then(
            // 成功就恢复异步循环，把决议的值发回生成器
            handleNext,

            // 如果value是被拒绝的promise，就把错误传回生成器进行出错处理
            function handleError(err) {
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