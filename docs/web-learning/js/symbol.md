---
title: Symbol
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 89
---

### Symbol
- ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。  
- Symbol函数前不能使用new命令，Symbol 是一个原始类型的值，不是对象。 
- Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，这个字符串仅仅表示描述而已；因此相同参数的Symbol函数的返回值是不相等的。 
  ```js
  let s1 = Symbol('foo');
  let s2 = Symbol('foo');

  console.log(s1 === s2); // false Symbol生成后就是独一无二的
  ```
- Symbol作为属性名保证唯一性
  ```js
  const mySymbol = Symbol('我的symbol');

  var myObject = {
    a: 2,
    b: 3,
    [mySymbol]: 333 // 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中
  };

  myObject[Symbol('我的symbol')] = 111;

  myObject[mySymbol] = 222;

  myObject[Symbol('我的symbol')] = 444;

  console.log(myObject);
  // {
  //   a: 2,
  //   b: 3,
  //   [Symbol('我的symbol')]: 222,
  //   [Symbol('我的symbol')]: 111,
  //   [Symbol('我的symbol')]: 444,
  // }
  ```

