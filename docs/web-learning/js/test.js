
// ajax(..)是一个支持Promise的ajax工具
var ajax = function (url) {
  return new Promise(function (resolve, reject) {
    if (url === 'http://url.1' || url === 'http://url.2') {
      resolve(url);
    } else {
      reject('url错误');
    }
  });
}

function foo(url) {
  // 管理生成器状态
  var state;

  // 生成器范围变量声明
  var val;

  function process(v) {
    switch (state) {
      case 1:
        console.log('ajaxing:', url);
        return ajax(url);
      case 2:
        val = v;
        console.log(val);
        return;
      case 3:
        var err = v;
        console.log('Oops:', err);
        return false;
    }
  }

  // 构造并返回一个迭代器
  return {
    next: function (v) {
      // 初始状态
      if (!state) {
        state = 1;
        return {
          done: false,
          value: process()
        };
      }
      // yield成功恢复
      else if (state === 1) {
        state = 2;
        return {
          done: true,
          value: process(v)
        };
      }
      // 生成器已经完成
      else {
        return {
          done: true,
          value: undefined
        }
      }
    },
    'throw': function (e) {
      // 唯一的显式错误处理在状态1
      if (state === 1) {
        state = 3;
        return {
          done: true,
          value: process(e)
        }
      }
      // 否则错误就不会处理，所以只把它抛回
      else {
        throw e;
      }
    }
  }
}