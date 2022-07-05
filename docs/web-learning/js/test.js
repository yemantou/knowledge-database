var something = (function() {
  var nextVal;

  return {
    // for..of循环需要
    [Symbol.iterator]: function() { return this; },

    // 标准迭代器接口方法
    next: function() {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = (3 * nextVal) + 6;
      }

      return { done: false, value: nextVal }
    }
  };
})()

// var res1 = something.next()
// var res2 = something.next()
// var res3 = something.next()
// var res4 = something.next()

// console.log(res1);
// console.log(res2);
// console.log(res3);
// console.log(res4);

for (var item of something) {
  console.log(item);

  if (item > 500) {
    break;
  }
}