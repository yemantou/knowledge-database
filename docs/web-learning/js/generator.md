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
iterable（可迭代）：指一个包含可以在其值上迭代的迭代器的对象。  
从一个iterable中提取迭代器的方法是：iterable必须支持一个函数，其名称是专门的ES6符号值Symbol.iterator。  

#### 生成器迭代器
可以把生成器看作一个值的生产者，我们通过迭代器接口的next()调用一次提取出一个值。  
严格说来，生成器本身并不是iterable，尽管非常类似——当你执行一个生成器，就得到了一个迭代器。  
在JS程序中使用while..true循环是非常糟糕的，如果没有break或者return的话，会同步地无限循环，并阻塞和锁住浏览器UI。  
如果在生成器中有yield的话，使用这样的循环就完全没有问题。因为生成器会在每次迭代中暂停，通过yield返回到主程序或事件循环队列中。
因为生成器会在每个yield处暂停，函数＊something()的状态（作用域）会被保持，即意味着不需要闭包在调用之间保持变量状态。  
通过for..of循环使用我们雕琢过的新的＊something()生成器：  
```js
function* something () {
  var nextVal;

  while (true) {
    if (nextVal === undefined) {
      nextVal = 1;
    } else {
      nextVal = (3 * nextVal) + 6
    }

    yield nextVal;
  }
}

for (var item of something()) {
  console.log(item);

  // 不要死循环
  if (item > 500) {
    break;
  }
} 
```
两个问题：  
1. 为什么不能用for (var v of something)  
   因为这里的something是生成器，并不是iterable。我们需要调用something()来构造一个生产者供for..of循环迭代。  
2. something()调用产生一个迭代器，但for..of循环需要的是一个iterable  
   生成器的迭代器也有一个Symbol.iterator函数，基本上这个函数做的就是return this，和我们前面定义的iterable something一样。换句话说，生成器的迭代器也是一个iterable！  

#### 停止生成器
在上面的例子中看起来＊something()生成器的迭代器实例在循环中的break调用之后就永远留在了挂起状态。但其实for..of循环的“异常结束”（也就是“提前终止”），通常由break、return或者未捕获异常引起，会向生成器的迭代器发送一个信号使其终止。  
向一个迭代器手工发送停止信号：  
1. try..finally，for..of循环内的break会触发finally语句  
   ```js
   function* something () {
     try {
       var nextVal;

       while (true) {
         if (nextVal === undefined) {
           nextVal = 1;
         } else {
           nextVal = (3 * nextVal) + 6
         }

         yield nextVal;
       }
     } finally {
       console.log('cleaning up!');
     }
   }
   ```
2. 外部通过return(..)手工终止  
   ```js
   function* something () {
     var nextVal;

     while (true) {
       if (nextVal === undefined) {
         nextVal = 1;
       } else {
         nextVal = (3 * nextVal) + 6
       }

       yield nextVal;
     }
   }

   var it = something();

   for (var item of it) {
     console.log(item);

     // 不要死循环
     if (item > 500) {
       console.log(it.return('停止').value);
     }
   }
   // 1
   // 9
   // 33
   // 105
   // 321
   // 969
   // 停止
   ```
   调用it.return(..)之后，它会立即终止生成器，这当然会运行finally语句。另外，它还会把返回的value设置为传入return(..)的内容，这也就是"停止"被传出去的过程。  

### 异步迭代生成器
生成器与异步编码模式及解决回调问题的关系：  
使用回调：  
```js
const ajax = function (url, callback) {
  setTimeout(() => {
    callback && callback(null, `${url}，请求成功`)
  }, 2000)
}

function foo (x, y, callback) {
  ajax(`http://url.1?x=${x}&y=${y}`, callback);
}

foo(11, 31, function (err, text) {
  if (err) {
    console.error(err);
  } else {
    console.log(text); // http://url.1?x=11&y=31，请求成功
  }
});
```  
通过生成器来表达同样的任务流程控制的实现：  
```js
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
    var text = yield foo(11, 31);
    console.log('success', text);
  } catch (err) {
    console.log('error', err);
  }
}

var it = main();

it.next()
```
上面例子最重要的一段代码：  
```js
var text = yield foo(11, 31)
console.log('success', text);
```
`text`接受到的是`it.next(data);`的返回
yield暂停也得生成器能够捕获错误。生成器yield暂停的特性意味着我们不仅能够从异步函数调用得到看似同步的返回值，还可以同步捕获来自这些异步函数调用的错误！  

### 生成器+Promise
ES6中最完美的世界就是生成器（看似同步的异步代码）和Promise（可信任可组合）的结合。  
支持Promise的foo(..)和生成器＊main()：  
```js
// foo返回的是一个promise
function foo(x, y) {
  return request(`http://url.1/?x=${x}&y=${y}`);
}

function* main() {
  try {
    var text = yield foo(11, 31);
    console.log('成功', text);
  } catch (err) {
    console.log('失败', err);
  }
}

var it = main();

var p = it.next().value

p.then(
  function(data) {
    it.next(data);
  },
  function(err) {
    it.throw(err);
  }
)
```

#### 支持Promise的Generator Runner
专门设计用来以我们前面展示的方式运行Promise-yielding生成器的工具，有几个Promise抽象库提供了这样的工具，包括asynquence库及其runner(..)。  
这里我们自己定义一个独立工具，叫作run(..)：
```js
function run (generator) {
  var args = [].slice.call(arguments, 1); // 获取所有除了generator函数的所有实参
  var it;

  // 在当前上下文中初始化生成器
  it = generator.apply(this, args);

  // 返回一个promise用于生成器完成
  return Promise.resolve().then(
    function handleNext (value) {
      // 对下一个yield出的值运行
      var next = it.next(value);
      console.log('next', next);

      return (function handleResult (next) {
        // 判断生成器是否运行完毕
        if (next.done) {
          // 运行完毕返回值
          return next.value
        } else {
          // 未运行完毕继续运行
          return Promise.resolve(next.value).then(
            // 成功就恢复异步循环，把决议的值发回生成器
            handleNext,

            // 如果value是被拒绝的promise，就把错误传回生成器进行出错处理
            function handleError (err) {
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


var ajax = function (url) {
  return new Promise(function (resolve, reject) {
    if (url === 'http://url.1') {
      resolve(url);
    } else {
      reject('url错误');
    }
  });
}


function* main () {
  try {
    var text = yield ajax('http://url.1');
    console.log('成功', text);
  } catch (err) {
    console.log('失败', err);
  }
}

run(main);

// next { value: Promise { 'http://url.1' }, done: false }
// 成功 http://url.1
// next { value: undefined, done: true }
```

#### 生成器中的Promise并发
已经展示的都是Promise+生成器下的单步异步流程。但是，正常情况下得代码常常会有多个异步步骤。  
第一直觉：  
```js
var ajax = function (url) {
  return new Promise(function (resolve, reject) {
    if (url === 'http://url.1' || url === 'http://url.2' || url === 'http://url.3?v=http://url.1,http://url.2') {
      resolve(url);
    } else {
      reject('url错误');
    }
  });
}

function* foo () {
  var r1 = yield ajax('http://url.1');
  var r2 = yield ajax('http://url.2');

  var r3 = yield ajax(`http://url.3?v=${r1},${r2}`)

  console.log(r3);
}

// 使用前面定义的工具run(..)
run(foo);

// next { value: Promise { 'http://url.1' }, done: false }
// next { value: Promise { 'http://url.2' }, done: false }
// next {
//   value: Promise { 'http://url.3?v=http://url.1,http://url.2' },
//   done: false
// }
// r3 http://url.3?v=http://url.1,http://url.2
// next { value: undefined, done: true }
```
这个例子是执行完r1再执行r2然后再执行r3，但是这并不是最优解，因为r1和r2其实可以并发执行，如下：  
```js
var ajax = function (url) {
  return new Promise(function (resolve, reject) {
    if (url === 'http://url.1' || url === 'http://url.2' || url === 'http://url.3?v=http://url.1,http://url.2') {
      resolve(url);
    } else {
      reject('url错误');
    }
  });
}

function* foo () {
  // 让两个请求并发执行（promise在实例化的时候就开始了）
  var p1 = ajax('http://url.1');
  var p2 = ajax('http://url.2');

  // 等待两个promise决议（其实这里还是先完成p1再完成p2，但是p1和p2在定义的时候就开始执行了，这里几乎等于立即执行）
  var r1 = yield p1;
  var r2 = yield p2;

  var r3 = yield ajax(`http://url.3?v=${r1},${r2}`)

  console.log('r3', r3);
}

run(foo);
```

### 生成器委托
从一个生成器调用另一个生成器，使用辅助函数run(..)：  
```js
function* foo () {
  var r2 = yield ajax('http://url.2');
  var r3 = yield ajax(`http://url.1/?v=${r2}`);

  return r3;
}

function* bar () {
  var r1 = yield ajax('http://url.1');

  // 通过run(..)“委托”给*foo(..)
  var r3 = yield run(foo);

  console.log(r3);
}

run(bar);
```
它会自动暂停＊bar()，直到＊foo()结束。  
一个更好的方法可以实现从＊bar()调用＊foo()，称为yield委托。yield委托的具体语法是：yield ＊（注意多出来的＊）。  

一个简单例子：  
```js
function* foo() {
  console.log('* foo() starting');

  yield 3;
  yield 4;
  console.log('* foo() finished');
}

function* bar() {
  yield 1;
  yield 2;
  yield* foo();
  yield 5;
}

var it = bar();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

// { value: 1, done: false }
// { value: 2, done: false }
// * foo() starting
// { value: 3, done: false }
// { value: 4, done: false }
// * foo() finished
// { value: 5, done: false }
// { value: undefined, done: true }
```
委托：＊bar()把自己的迭代控制委托给了＊foo()。 

使用三个顺序Ajax请求的委托例子：  
```js
function* foo () {
  var r2 = yield ajax('http://url.2');
  var r3 = yield ajax(`http://url.1/?v=${r2}`);

  return r3;
}

function* bar () {
  var r1 = yield ajax('http://url.1');

  // 通过yield*“委托”给*foo(..)
  var r3 = yield* foo();

  console.log(r3);
}

run(bar);
```
yield ＊暂停了迭代控制，而不是生成器控制。  

#### 为什么用委托
yield委托的主要目的是代码组织，以达到与普通函数调用的对称。  

#### 消息委托
yield委托的双向消息传递工作：   
```js
function* foo() {
  console.log('inside *foo()1：', yield 'B');

  console.log('inside *foo()2：', yield 'C');

  return 'D';
}

function* bar() {
  console.log('inside *bar()1：', yield 'A');
  // yield委托
  console.log('inside *bar()2：', yield* foo()); // 被委托的这一步yield并不向外部传递消息

  console.log('inside *bar()3：', yield 'E');

  return 'F'
}

var it = bar();

console.log('outside0：', it.next().value);
console.log('outside1：', it.next(1).value);
console.log('outside2：', it.next(2).value);
console.log('outside3：', it.next(3).value);
console.log('outside4：', it.next(4).value);

// outside0： A
// inside *bar()1： 1
// outside1： B
// inside *foo()1： 2
// outside2： C
// inside *foo()2： 3
// inside *bar()2： D
// outside3： E
// inside *bar()3： 4
// outside4： F
``` 

yield委托甚至并不要求必须转到另一个生成器，它可以转到一个非生成器的一般iterable。例如：  
```js
function* bar() {
  console.log('inside *bar()1：', yield 'A');
  // yield委托给非生成器
  console.log('inside *bar()2：', yield* ['B', 'C', 'D']);

  console.log('inside *bar()3：', yield 'E');

  return 'F'
}

var it = bar();

console.log('outside0：', it.next().value);
console.log('outside1：', it.next(1).value);
console.log('outside2：', it.next(2).value);
console.log('outside3：', it.next(3).value);
console.log('outside4：', it.next(4).value);
console.log('outside5：', it.next(5).value);

// outside0： A
// inside *bar()1： 1
// outside1： B
// outside2： C
// outside3： D
// inside *bar()2： undefined
// outside4： E
// inside *bar()3： 5
// outside5： F
```
默认的数组迭代器并不关心通过next(..)调用发送的任何消息，所以值2、3和4根本就被忽略了。还有，因为迭代器没有显式的返回值（和前面使用的＊foo()不同），所以yield ＊表达式完成后得到的是一个undefined。  

**异常也被委托**
和yield委托透明地双向传递消息的方式一样，错误和异常也是双向传递的

#### 递归委托
```js
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
      console.log('next', next);

      return (function handleResult(next) {
        // 判断生成器是否运行完毕
        if (next.done) {
          // 运行完毕返回值
          return next.value
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

var ajax = function (url) {
  return new Promise(function (resolve, reject) {
    if (url === 'http://url.1') {
      resolve(url);
    } else {
      reject('url错误');
    }
  });
}

function* foo(val) {
  console.log('val', val);
  if (val > 1) {
    val = yield* foo(val - 1);
  }
  return yield ajax(`http://url.1`);
}

function* bar() {
  var r1 = yield* foo(3);
  console.log('r1', r1);
}

run(bar);

// val 3
// val 2
// val 1
// next { value: Promise { 'http://url.1' }, done: false }
// next { value: Promise { 'http://url.1' }, done: false }
// next { value: Promise { 'http://url.1' }, done: false }
// r1 http://url.1
// next { value: undefined, done: true }
```
![prototype、__proto__与constructor](@assets/img/recurrence.png)

###  生成器并发
两个不同并发Ajax响应处理函数需要彼此协调，以确保数据交流不会出现竞态条件。我们把响应插入到res数组中：   
```js
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

const res = [];

function* reqData (url) {
  var data = yield ajax(url);

  // 控制转移
  yield;
  res.push(data);
}

var it1 = reqData('http://url.1');
var it2 = reqData('http://url.2');

var p1 = it1.next().value;
var p2 = it2.next().value;


p1.then(function (data) {
  it1.next(data);
});

p2.then(function (data) {
  it2.next(data);
});

Promise.all([p1, p2]).then(
  function () {
    it1.next();
    it2.next();
    console.log(res); // ['http://url.1', 'http://url.2']
  }
)
```

### 形实转换程序（thunk）
JavaScript中的thunk是指一个用于调用另外一个函数的函数，没有任何参数。   
例如：  
```js
function foo (x, y) {
  return x * y;
}

function fooThunk () {
  return foo(3, 4);
}

console.log(fooThunk()); // 12
```

异步的thunk，让它接收一个回调：  
```js
function foo(x, y, callback) {
  setTimeout(() => {
    callback && callback(x * y);
  }, 500)
}

function fooThunk(callback) {
  return foo(3, 4, callback);
}

fooThunk((res) => {
  console.log(res); // 12
})
```

发明一个工具来做thunk封装工作：  
```js
function foo(x, y, callback) {
  setTimeout(() => {
    callback && callback(x * y);
  }, 1000);
}

function thunkify(fn) {
  var args = [].slice.call(arguments, 1);
  return function (callback) {
    args.push(callback);
    return fn.apply(null, args);
  };
}

const fooThunk = thunkify(foo, 3, 4);

fooThunk((res) => {
  console.log(res); // 12
});
```

JavaScript中使用thunk的典型方案，不是thunkify(..)构造thunk本身，而是thunkify(..)工具产生一个生成thunk的函数。  
```js
function foo(x, y, callback) {
  setTimeout(() => {
    callback && callback(x * y);
  }, 1000);
}

// 
function thunkify(fn) {
  return function () {
    var args = [].slice.call(arguments);
    return function (callback) {
      args.push(callback);
      return fn.apply(null, args);
    };
  }
}

const thunkory = thunkify(foo);

const fooThunk = thunkory(3, 4);

fooThunk((res) => {
  console.log(res); // 12
})
```
#### thunk的内容与生成器的关系
Promise要比裸thunk功能更强、更值得信任。但它们都可以被看作是对一个值的请求，回答可能是异步的。  
thunkory和promisory本质上都是在提出一个请求（要求一个值），分别由thunk fooThunk和promise fooPromise表示对这个请求的未来的答复。  
因此yield出Promise以获得异步性的生成器，也可以为异步性而yield thunk。  
run(..)工具支持thunk的补丁：  
```js
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
```
::: danger 尽量不要使用thunk
thunk本身基本上没有任何可信任性和可组合性保证，而这些是Promise的设计目标所在。    
:::

###  ES6之前的生成器
如果不能忽略ES6前的浏览器的话，怎么才能把生成器引入到我们的浏览器JavaScript中呢？   
手工变换  
首先还是需要一个可用的普通函数，它需要返回一个迭代器。  
```js
function foo(url) {
//..

// 构造并返回一个迭代器
return {
  next: function(v) {
    // ..
  },
  throw: function(e) {
    // ..
  }
}
}

var it = foo('http://url.1')
```
生成器是通过暂停自己的作用域/状态实现它的“魔法”的。可以通过函数闭包来模拟这一点。为了理解这样的代码是如何编写的，先给生成器的各个部分标注上状态值：  
```js
// ajax是一个支持Promise的ajax工具
function* foo(url) {
  // 状态1
  try {
    console.log('ajaxing:', url);
    var tmp1 = ajax(url);
    // 状态2
    var val = yield tmp1;
  } catch (err) {
    //状态3
    console.log('Oops:', err);
    return false;
  }
}
```
1是起始状态，2是ajax(..)成功后的状态，3是ajax(..)失败的状态。  

在闭包中定义一个变量state用于跟踪状态；定义一个内层函数，称为process(..)，使用switch语句处理每个状态：    
```js
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
      case 2:
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
```

### 小结
生成器是ES6的一个新的函数类型，它并不像普通函数那样总是运行到结束。取而代之的是，生成器可以在运行当中（完全保持其状态）暂停，并且将来再从暂停的地方恢复运行。  
在异步控制流程方面，生成器的关键优点是：生成器内部的代码是以自然的同步/顺序方式表达任务的一系列步骤。其技巧在于，我们把可能的异步隐藏在了关键字yield的后面，把异步移动到控制生成器的迭代器的代码部分。  
生成器为异步代码保持了顺序、同步、阻塞的代码模式，这使得大脑可以更自然地追踪代码，解决了基于回调的异步的两个关键缺陷之一。   
   