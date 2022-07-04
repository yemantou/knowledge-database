---
title: 生成器
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 79
---

### 打破完整运行
ES6引入了一个新的函数类型，它并不符合一旦开始执行就会运行到结束的特性。这类新的函数被称为生成器。  
合作式并发的ES6代码：  
```js
var x = 1;
function* foo () {
  x++;
  yield; // 暂停
  console.log('x：', x);
}

function bar () {
  x++;
}

// 构造一个迭代器来控制生成器
var it = foo();

it.next();
console.log(x); // 2

bar();

console.log(x); // 3
it.next(); // x：3
```
it = foo()运算并没有执行生成器＊foo()，而只是构造了一个迭代器（iterator），这个迭代器会控制它的执行。  
生成器就是一类特殊的函数，可以一次或多次启动和停止，并不一定非得要完成。  
#### 输入和输出
```js
function* foo (x, y) {
  return x * y;
}

var it = foo(6, 7);

var res = it.next();

console.log(res.value); // 42
```
创建了一个迭代器对象，把它赋给了一个变量it，用于控制生成器＊foo(..)。然后调用it.next()，指示生成器＊foo(..)从当前位置开始继续运行，停在下一个yield处或者直到生成器结束。next(..)调用的结果是一个对象，它有一个value属性，持有从＊foo(..)返回的值（如果有的话）。    
1. 迭代消息传递
   生成器还提供了更强大更引人注目的内建消息输入输出能力，通过yield和next(..)实现。  