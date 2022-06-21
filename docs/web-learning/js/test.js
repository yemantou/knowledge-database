var myObject = {
  a: 2,
  b: 3,
  c: 4
}

// Symbol.iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。
Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: true,
  writable: true,
  configurable: true,
  value: function() {
    var o = this
    var idx = 0
    var ks = Object.keys(o)
    return {
      next: function() {
        return {
          value: { key: ks[idx], value: o[ks[idx++]] }, // idx++是先赋值给idx后++
          done: idx > ks.length
        };
      }
    };
  }
});

// 手动遍历
var obj = myObject[Symbol.iterator]();
const res = obj.next();
const res1 = obj.next();
const res2 = obj.next();
const res3 = obj.next();
console.log(res);
console.log(res1);
console.log(res2);
console.log(res3);

// for...of遍历
for (var value of myObject) {
  console.log(value);
}


// { value: { key: 'a', value: 2 }, done: false }
// { value: { key: 'b', value: 3 }, done: false }
// { value: { key: 'c', value: 4 }, done: false }
// { value: { key: undefined, value: undefined }, done: true }
// { key: 'a', value: 2 }
// { key: 'b', value: 3 }
// { key: 'c', value: 4 }
