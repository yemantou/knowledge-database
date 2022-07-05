const ajax = function (url, callback) {
  setTimeout(() => {
    callback && callback(null, `${url}，请求成功`)
  }, 2000)
}

function foo (x, y) {
  ajax(`http://url.1?x=${x}&y=${y}`, function (err, data) {
    if (err) {
      // 向*main()抛出一个错误
      it.throw(err);
    } else {
      // 用收到的data来恢复*main()
      it.next(data);
    }
  });
}

function* main () {
  try {
    var text = yield foo(11, 31)
    console.log('success', text);
  } catch (err) {
    console.log('error', err);
  }
}

var it = main();

it.next()