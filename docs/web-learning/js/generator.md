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
   ```js
   function* foo (x) {
     var y = x * (yield);
     return y;
   }

   var it = foo(6);

   it.next();

   var res = it.next(7);
   console.log(res.value); // 42
   ```
   第一次next()在yield处暂停，第二次next(7)将7传入作为yield表达式的结果。   
2. 消息是双向传递的——yield.．作为一个表达式可以发出消息响应next(..)调用，next(..)也可以向暂停的yield表达式发送值。  
   ```js
   function* foo (x) {
     var y = x * (yield 'Hello');
     return y;
   }

   var it = foo(6);

   var res = it.next();
   console.log(res.value); // 'Hello'

   res = it.next(7);
   console.log(res.value); // 42
   ```
   yield .．和next(..)这一对组合起来，在生成器的执行过程中构成了一个双向消息传递系统。  
   ::: tip 提示
   第一个next()调用是没有参数的，因为没有已经暂停的yield去接收它。  
   :::
#### 多个迭代器
每次构建一个迭代器，实际上就隐式构建了生成器的一个实例，通过这个迭代器来控制的是这个生成器实例。   
同一个生成器的多个实例可以同时运行，它们甚至可以彼此交互：  
```js
function* foo () {
  var x = yield 2;
  z++;
  var y = yield(x * z);
  console.log(x, y, z);
}

var z = 1; // 全局变量

var it1 = foo();
var it2 = foo();

var res1 = it1.next();
var res2 = it2.next();

console.log(res1.value); // 2
console.log(res2.value); // 2

res1 = it1.next(res2.value * 10);
res2 = it2.next(res1.value * 5);

console.log(res1.value); // 40
console.log(res2.value); // 600

it1.next(res2.value / 2); // 20 300 3
it2.next(res1.value / 4); // 200 10 3
```
同一个生成器的多个实例并发运行的最常用处并不是这样的交互，而是生成器在没有输入的情况下，可能从某个独立连接的资源产生自己的值。  

### 生成器产生值
生成器作为一种产生值的方式：这是“生成器”这个名称最初的使用场景。  
#### 生产者与迭代器
要产生一系列值，其中每个值都与前面一个有特定的关系。要实现这一点，需要一个有状态的生产者能够记住其生成的最后一个值。 
这个任务是一个非常通用的设计模式，通常通过迭代器来解决。   
迭代器是一个定义良好的接口，用于从一个生产者一步步得到一系列值。   
例如为数字序列生成器实现标准的迭代器接口：  
```js
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

var res1 = something.next()
var res2 = something.next()
var res3 = something.next()
var res4 = something.next()

console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);

// 或者使用for..of循环自动迭代
for (var item of something) {
  console.log(item);

  if (item > 500) {
    break;
  }
} 
// 因为定义的迭代器something总是返回done:false，因此这个for..of循环将永远运行下去，所以要放一个break条件
```
for..of循环在每次迭代中自动调用next()，它不会向next()传入任何值，并且会在接收到done:true之后自动停止。这对于在一组数据上循环很方便。  
#### iterable