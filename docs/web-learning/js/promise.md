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
错误可以继续沿着Promise链传播下去，直到遇到显式定义的拒绝处理函数。  

使链式流程控制可行的Promise固有特性：  
- 调用Promise的then(..)会自动创建一个新的Promise从调用返回。
- 在完成或拒绝处理函数内部，如果返回一个值或抛出一个异常，新返回的（可链接的）Promise就相应地决议。
- 如果完成或拒绝处理函数返回一个Promise，它将会被展开，这样一来，不管它的决议值是什么，都会成为当前then(..)返回的链接Promise的决议值。  

术语：决议（resolve）、完成（fulfill）和拒绝（reject）  

### 错误处理
try..catch很好，但是无法跨异步操作工作。  
Promise没有采用流行的error-first回调设计风格，而是使用了分离回调（split-callback）风格。一个回调用于完成情况，一个回调用于拒绝情况。  
#### 处理未捕获的情况
下面这种错误情况如何处理呢？
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
有一些Promise库增加了一些方法：注册一个类似于“全局未处理拒绝”处理函数的东西，这样就不会抛出全局错误，而是调用这个函数。    
它们辨识未捕获错误的方法是定义一个某个时长的定时器，比如3秒钟，在拒绝的时刻启动。如果Promise被拒绝，而在定时器触发之前都没有错误处理函数被注册，那它就会假定你不会注册处理函数，进而就是未被捕获错误。（并不太建议使用）     

### Promise模式
1. Promise.all([ .. ])
   传给Promise.all([ .. ])的数组中的值可以是Promise、thenable，甚至是立即值。就本质而言，列表中的每个值都会通过Promise. resolve(..)过滤，以确保要等待的是一个真正的Promise，所以立即值会被规范化为为这个值构建的Promise。如果数组是空的，主Promise就会立即完成。  
   从Promise.all([ .. ])返回的主promise在且仅在所有的成员promise都完成后才会完成。如果这些promise中有任何一个被拒绝的话，主Promise.all([ .. ])promise就会立即被拒绝，并丢弃来自其他所有promise的全部结果。  
2. Promise.race([ .. ])（只响应“第一个跨过终点线的Promise”，而抛弃其他Promise。）  
   一旦有任何一个Promise决议为完成，Promise.race([ .. ])就会完成；一旦有任何一个Promise决议为拒绝，它就会拒绝。  
   如果传入了一个空数组，主race([..]) Promise永远不会决议，而不是立即决议。  
3. all([ .. ])和race([ .. ])的变体（有些Promise抽象库提供了这些支持，但也可以使用Promise、race([ .. ])和all([ .. ])这些机制，你自己来实现它们）：
   - none([ .. ])  
     这个模式类似于all([ .. ])，不过完成和拒绝的情况互换了。所有的Promise都要被拒绝，即拒绝转化为完成值，反之亦然。  
   - any([ .. ])  
     这个模式与all([ .. ])类似，但是会忽略拒绝，所以只需要完成一个而不是全部。  
   - first([ .. ])   
     这个模式类似于与any([ .. ])的竞争，即只要第一个Promise完成，它就会忽略后续的任何拒绝和完成。  
   - last([ .. ])
     这个模式类似于first([ .. ])，但却是只有最后一个完成胜出。  
#### 并发迭代
有些时候会需要在一列Promise中迭代，并对所有Promise都执行某个任务，非常类似于对同步数组可以做的那样（比如forEach(..)、map(..)、some(..)和every(..)）。    
例如map(..)，接收一个数组的值（可以是Promise或其他任何值），外加要在每个值上运行一个函数（任务）作为参数。map(..)本身返回一个promise，其完成值是一个数组，该数组（保持映射顺序）保存任务执行之后的异步完成值：    
```js
if (!Promise.map) {
  Promise.map = function(vals, cb) {
    // 一个等待列表所有promise的新promise
    return Promise.all(
      // 一般数组map(..)把值数组转换为promise数组
      vals.map(function(val) {
        // 用val异步map之后决议（resolve）的新promise替换val
        return new Promise(function(resolve) {
          cb(val, resolve);
        });
      })
    ); 
  };
}
```

### Promise API概述
#### new Promise(..)构造器
Promise(..)必须和new一起使用，并且必须提供一个函数回调：  
```js
var p = new Promise(function(resolve, reject) {
  // resolve(..)用于决议/完成这个promise
  // reject(..)用于拒绝这个promise
})
```
#### Promise.resolve(..)和Promise.reject(..)
- Promise.reject(..)  
  创建一个已被拒绝的Promise的快捷方式是使用Promise.reject(..)。   
- Promise.resolve(..)  
  Promise.resolve(..)常用于创建一个已完成的Promise，使用方式与Promise.reject(..)类似。但是，Promise.resolve(..)也会展开thenable值。  
  如果传入的是真正的Promise, Promise.resolve(..)什么都不会做，只会直接把这个值返回。  
#### then(..)和catch(..)
Promise决议之后，立即会调用这两个处理函数之一，但不会两个都调用，而且总是异步调用。  
::: tip 提示
then 的第二个参数捕获 Promise 的异常，catch 除此之外还会捕获 then 的第一个参数执行时抛出的异常：   
- 当Promise是reject时，catch捕获reject
- 当Promise是resolve时，catch捕获.then中抛出的异常
:::
- then(..)  
  then(..)接受一个或两个参数：第一个用于完成回调，第二个用于拒绝回调。  
- catch(..)   
  catch(..)只接受一个拒绝回调作为参数，并自动替换默认完成回调，它等价于then(null, ..)。  
then(..)和catch(..)也会创建并返回一个新的promise，这个promise可以用于实现Promise链式流程控制。  
#### Promise.all([ .. ])和Promise.race([ .. ])
Promise.all([ .. ])和Promise.race([ .. ])都会创建一个Promise作为它们的返回值。这个promise的决议完全由传入的promise数组控制。   
Promise.all([ .. ])：所有人都到齐了才开门。   
Promise.race([ .. ])：第一个到达者打开门闩通过。  
::: danger 警告
向Promise.all([ .. ])传入空数组，它会立即完成，但Promise. race([ .. ])会挂住，且永远不会决议。  
:::

### Promise局限性
#### 顺序错误处理  
Promise的设计局限性（具体来说，就是它们链接的方式）造成了一个让人很容易中招的陷阱，即Promise链中的错误很容易被无意中默默忽略掉。  
例如一个没有错误处理函数的Promise链，链中任何地方的任何错误都会在链中一直传播下去，直到被查看（通过在某个步骤注册拒绝处理函数）。  
#### 单一值  
Promise只能有一个完成值或一个拒绝理由。在更复杂的场景中，这是一种局限。  
一般的建议是构造一个值封装（比如一个对象或数组）来保持这样的多个信息。这个解决方案可以起作用，但要在Promise链中的每一步都进行封装和解封，就十分丑陋和笨重了。  
1. 分裂值  
   可以/应该把问题分解为两个或更多Promise的信号。例如有一个工具foo(..)，它可以异步产生两个值（x和y）：   
   ```js
    function getY(x) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve((3 * x) - 1);
        }, 100);
      });
    }

    function foo(bar, baz) {
      var x = bar * baz;

      return getY(x).then(
        function(y) {
          // 返回封装两个值的数组
          return [x, y]
        }
      )
    }

    foo(10, 20).then(
      function(msgs) {
        var x = msgs[0];
        var y = msgs[1];

        console.log(x, y); // 200 599
      }
    )
   ```
   可以把每个值封装到它自己的promise：  
   ```js
    function foo(bar, baz) {
      var x = bar * baz;
      // 返回两个promise
      retrun [
        Promise.resolve(x),
        getY(x)
      ];
    }

    Promise.all(foo(10, 20)).then(
      function(msgs) {
        var x = msgs[0];
        var y = msgs[1];

        console.log(x, y); // 200 599
      }
    );
   ```
   这种方法更符合Promise的设计理念。如果以后需要重构代码把对x和y的计算分开，这种方法就简单得多。由调用代码来决定如何安排这两个promise，而不是把这种细节放在foo(..)内部抽象，这样更整洁也更灵活。  
#### 单决议
Promise最本质的一个特征是：Promise只能被决议一次（完成或拒绝）。  
#### 惯性
如果已经有大量的基于回调的代码，那么保持编码风格不变要简单得多。  
自己实现一个支持Promise而不是基于回调的Ajax工具，可以称之为request(..)：  
```js
if (!Promise.wrap) {
  Promise.wrap = function (fn) {
    return function () {
      var args = [...arguments];
      return new Promise(function (resolve, reject) {
        const callback = function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        };
        fn.apply(
          null,
          args.concat(callback)
        );
      });
    };
  };
}

// 模拟的一个ajax请求
const ajax = function (url, callback) {
  setTimeout(() => {
    callback && callback(null, '成功')
  }, 2000)
}

// 使用回调的方式
ajax('http://url.1/', (err, data) => {
  console.log(data); // 成功
})

// 将模拟的ajax请求转化为Promise
const request = Promise.wrap(ajax);

request('http://url.2/').then(
  function (data) {
    console.log(data); // 成功
  },
  function (err) {
    console.log(err);
  }
)
```
接受一个函数，这个函数需要一个error-first风格的回调作为第一个参数，并返回一个新的函数。返回的函数自动创建一个Promise并返回，并替换回调，连接到Promise完成或拒绝。  
把需要回调的函数封装为支持Promise的函数，这个动作有时被称为“提升”或“Promise工厂化”。  
#### 无法取消的Promise
一旦创建了一个Promise并为其注册了完成和/或拒绝处理函数，如果出现某种情况使得这个任务悬而未决的话，你也没有办法从外部停止它的进程。  
这可能会使Promise的一个消费者或观察者影响其他消费者查看这个Promise。这违背了未来值的可信任性（外部不变性），但更坏的是，这是“远隔作用”。实际上会导致你重陷与使用回调同样的噩梦。  
集合在一起的Promise构成的链，可称之为一个“序列”，就是一个流程控制的表达，因此将取消定义在这个抽象层次上是合适的。  
单独的Promise不应该可取消，但是取消一个序列是合理的，因为你不会像对待Promise那样把序列作为一个单独的不变值来传送。  