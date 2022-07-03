---
title: Promise
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 80
---

### 什么是Promise
不把自己程序的continuation传给第三方，而是希望第三方给我们提供了解其任务何时结束的能力，然后由我们自己的代码来决定下一步做什么，那将会怎样呢？  
这种范式就称为Promise。  
一旦Promise决议，它就永远保持在这个状态。此时它就成为了不变值（immutable value），可以根据需求多次查看。Promise决议后就是外部不可变的值，我们可以安全地把这个值传递给第三方，并确信它不会被有意无意地修改。特别是对于多方查看同一个Promise决议的情况，尤其如此。一方不可能影响另一方对Promise决议的观察结果。不可变性听起来似乎一个学术话题，但实际上这是Promise设计中最基础和最重要的因素，我们不应该随意忽略这一点。   
Promise是一种封装和组合未来值的易于复用的机制。  
#### 完成事件
使用回调的话，通知就是任务（foo(..)）调用的回调。而使用Promise的话，我们把这个关系反转了过来，侦听来自foo(..)的事件，然后在得到通知的时候，根据情况继续。  
伪代码：  
```js
foo(x) {
  // 开始做点可能耗时的工作
}

foo(42);

on(foo 'completion') {
  // 可以进行下一步了！
}

on(foo 'error') {
  // 啊，foo(..)中出错了！
}
```
调用foo(..)，然后建立了两个事件侦听器，一个用于"completion"，一个用于"error"——foo(..)调用的两种可能结果。从本质上讲，foo(..)并不需要了解调用代码订阅了这些事件，这样就很好地实现了关注点分离。遗憾的是，这样的代码需要JavaScript环境提供某种魔法，而这种环境并不存在（实际上也有点不实际）。以下是在JavaScript中更自然的表达方法：  
```js
function foo(x) {
  // 开始做点可能耗时的工作

  // 构造一个listener事件通知处理对象来返回 
  return listener;
}

var evt = foo(42);

evt.on('completion', function () {
  // 可以进行下一步了！
});

evt.on('error', function () {
  // 啊，foo(..)中出错了！
});
```
foo(..)显式创建并返回了一个事件订阅对象，调用代码得到这个对象，并在其上注册了两个事件处理函数。  

### Promise信任问题
Promise提供了一些重要的保护，重新建立了第2章中已经毁掉的异步编码可信任性。  
回顾一下只用回调编码的信任问题。把一个回调传入工具foo(..)时可能出现如下问题：  
- 调用回调过早；
- 调用回调过晚（或不被调用）；
- 调用回调次数过少或过多；
- 未能传递所需的环境和参数；
- 吞掉可能出现的错误和异常
Promise的特性就是专门用来为这些问题提供一个有效的可复用的答案。   
#### 调用过早
Promise就不必担心有时同步完成，有时异步完成的问题，因为即使是立即完成的Promise（类似于new Promise(function(resolve){ resolve(42); })）也无法被同步观察到。  
#### 调用过晚
一个Promise决议后，这个Promise上所有的通过then(..)注册的回调都会在下一个异步时机点上依次被立即调用。这些回调中的任意一个都无法影响或延误对其他回调的调用。  
#### 回调未调用
没有任何东西（甚至JavaScript错误）能阻止Promise向你通知它的决议（如果它决议了的话）。如果你对一个Promise注册了一个完成回调和一个拒绝回调，那么Promise在决议时总是会调用其中的一个。  
但是，如果Promise本身永远不被决议呢？即使这样，Promise也提供了解决方案，其使用了一种称为竞态的高级抽象机制。  
#### 调用次数过少或过多
由于Promise只能被决议一次，所以任何通过then(..)注册的（每个）回调就只会被调用一次。  
当然，如果你把同一个回调注册了不止一次（比如p.then(f); p.then(f);），那它被调用的次数就会和注册次数相同。  
#### 未能传递参数/环境值
Promise至多只能有一个决议值（完成或拒绝）。   
如果你没有用任何值显式决议，那么这个值就是undefined，这是JavaScript常见的处理方式。但不管这个值是什么，无论当前或未来，它都会被传给所有注册的（且适当的完成或拒绝）回调。  
#### 吞掉错误或异常
如果拒绝一个Promise并给出一个理由（也就是一个出错消息），这个值就会被传给拒绝回调。  
如果Promise完成后在查看结果时（then(..)注册的回调中）出现了JavaScript异常错误会发现，对它们的处理方式还是有点出乎意料，深入才能理解：  
```js
var p = new Promise(function(resolve, reject){
  resolve(42);
});

p.then(
  function fulfilled(msg) {
    foo.bar();
    console.log(msg); // 永远不会到达此处
  },
  function rejected(err) {
    // 永远不会到达此处
  }
);
```  
Promise一旦决议就不可再变。p已经完成为值42，所以之后查看p的决议时，并不能因为出错就把p再变为一个拒绝。  
####  是可信任的Promise吗
如何能够确定返回的这个东西实际上就是一个可信任的Promise呢？  
从Promise.resolve(..)得到的是一个真正的Promise，是一个可以信任的值。如果你传入的已经是真正的Promise，那么你得到的就是它本身，所以通过Promise.resolve(..)过滤来获得可信任性完全没有坏处。  
对于不确定是否信任的Promise，我们可以使用Promise.resolve(..)：  
```js
// 不要只是直接这样使用（假设工具为tool(..)）
tool(22).then(
  function(v) {
    console.log(v);
  }
);

// 应该这样使用
Promise.resolve(tool(22)).then(
  function(v) {
    console.log(v);
  }
);
```
还有一个好处是：这样做很容易把函数调用规范为定义良好的异步任务。如果tool(22)有时会返回一个立即值，有时会返回Promise，那么Promise.resolve(tool(22))就能够保证总会返回一个Promise结果。  

### 链式流
Promise并不只是一个单步执行this-then-that操作的机制，可以把多个Promise连接到一起以表示一系列异步步骤。
- 每次你对Promise调用then(..)，它都会创建并返回一个新的Promise，我们可以将其链接起来；
- 不管从then(..)调用的完成回调（第一个参数）返回的值是什么，它都会被自动设置为被链接Promise（第一点中的）的完成。  
