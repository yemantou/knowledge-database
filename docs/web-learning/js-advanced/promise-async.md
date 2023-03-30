---
title: 期约（Promise）与异步函数
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 986
---

## 期约（Promise）与异步函数


### 异步编程

#### 以往的异步编程模式
异步行为是JavaScript的基础，但以前的实现不理想。在早期的JavaScript中，只支持定义回调函数来表明异步操作完成。串联多个异步操作是一个常见的问题，通常需要深度嵌套的回调函数（俗称“回调地狱”）来解决。    


### 期约(Promise)

#### Promise基础
CMAScript 6新增的引用类型Promise，可以通过new操作符来实例化。创建新期约时需要传入执行器（executor）函数作为参数。    
```js
let p = new Promise(() => {});
setTimeout(console.log, 0, p);   // Promise <pending>
```
3种状态：
1. pending
2. resolved 或者 fulfilled
3. rejected

控制期约状态的转换是通过调用它的两个函数参数实现的。这两个函数参数通常都命名为resolve()和reject()。调用resolve()会把状态切换为兑现，调用reject()会把状态切换为拒绝。    

同步/异步执行的二元性：
```js
try {
  thrownewError('foo');
} catch(e) {
  console.log(e); // Error: foo
}
try {
  Promise.reject(newError('bar'));
} catch(e) {
  console.log(e);
}
//Uncaught(inpromise)Error: bar
```
第一个try/catch抛出并捕获了错误，第二个try/catch抛出错误却没有捕获到。乍一看这可能有点违反直觉，因为代码中确实是同步创建了一个拒绝的期约实例，而这个实例也抛出了包含拒绝理由的错误。这里的同步代码之所以没有捕获期约抛出的错误，是因为它没有通过异步模式捕获错误。从这里就可以看出期约真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。    

#### 期约的实例方法
1. **实现Thenable接口**        
   thenable对象指的是具有then方法的对象，**thenable里面的then方法，其实也是异步代码**。Promise.resolve方法会将这个对象转为Promise对象，然后立即执行thenable对象的then方法。
   立即执行指的是**在then链式调用的时候，在下一个then方法调用之前，会立即执行thenable里面的then方法，返回由thenable转为的新promise。**     
   Promise.resolve(thenable)调用了thenable里面的then方法，将这个新产生的Promise所对应的.then()方法，加入到微任务队列中。   
   题目：      
   ```js
    const thenable = {
      then(resolve, reject) { // 微1 微2
        console.log("then");
        resolve("data");
        //reject("reason")
      },
    };

    Promise.resolve(thenable).then( // 微3
      (res) => console.log(res),
      (err) => console.log(err)
    )


    console.log(Promise.resolve(thenable));
    console.log('aaa')

    // 结果
    // Promise { <pending> }
    // aaa
    // then
    // then
    // data
   ```
   解答代码执行情况：   
   1. 先声明一个对象，继续执行；
   2. 然后Promise.resolve了一个thenable对象，将thenable对象的.then方法加入微任务队列，叫微1；
   3. console.log(Promise.resolve(thenable));是主线程任务，先会打印这个Promise的状态；Promise.resolve(thenable)也resolve了thenable对象，
      将thenable对象的.then方法加入微任务队列，叫微2；
   4. console.log('aaa');是主线程任务，打印aaa；
   5. 主线程执行完毕开始执行微任务，微1执行打印第一个then，然后resolve("data");执行，Promise.resolve(thenable).then方法成功回调加入微任务队列，叫微3；
   6. 微2执行打印第二个then，然后resolve("data");执行，没有.then方法，微2结束；
   7. 微3执行，打印data
2. **Promise.prototype.then()**    
   then()方法接收最多两个参数：onResolved处理程序和onRejected处理程序。这两个参数都是可选的，如果提供的话，则会在期约分别进入“兑现”和“拒绝”状态时执行。
3. **Promise.prototype.catch()**    
   romise.prototype.catch()方法用于给期约添加拒绝处理程序。这个方法只接收一个参数：onRejected处理程序。事实上，这个方法就是一个语法糖，
   调用它就相当于调用Promise.prototype. then(null, onRejected)。     
   例如：
   ```js
    let p = Promise.reject();
    let onRejected = function(e) {
      setTimeout(console.log, 0, 'rejected');
    };
    // 这两种添加拒绝处理程序的方式是一样的：
    p.then(null, onRejected);   // rejected
    p.catch(onRejected);        //rejected
   ```
4. **Promise.prototype.finally()**     
   Promise.prototype.finally()方法用于给期约添加onFinally处理程序，这个处理程序在期约转换为解决或拒绝状态时都会执行。
   这个方法可以避免onResolved和onRejected处理程序中出现冗余代码。但onFinally处理程序没有办法知道期约的状态是解决还是拒绝，所以这个方法主要用于添加清理代码。
5. **非重入期约方法**    
   当期约进入落定状态时，与该状态相关的处理程序**仅仅会被排期，而非立即执行**。跟在添加这个处理程序的代码之后的同步代码一定会在处理程序之前先执行。
   即使期约一开始就是与附加处理程序关联的状态，执行顺序也是这样的。这个特性由JavaScript运行时保证，被称为“非重入”（non-reentrancy）特性。     
   非重入适用于onResolved/onRejected处理程序、catch()处理程序和finally()处理程序。
6. **邻近处理程序的执行顺序**     
   如果给期约添加了多个处理程序，当期约状态变化时，相关处理程序会按照添加它们的顺序依次执行。

#### 期约连锁与期约合成
期约连锁是一个期约接一个期约地拼接；期约合成则是将多个期约组合为一个期约。     

**期约图**     
因为一个期约可以有任意多个处理程序，所以期约连锁可以构建有向非循环图的结构。这样，每个期约都是图中的一个节点，而使用实例方法添加的处理程序则是有向顶点。因为图中的每个节点都会等待前一个节点落定，所以图的方向就是期约的解决或拒绝顺序。下面的例子展示了一种期约有向图，也就是二叉树：    
```js
//      A
//     / \
//    B    C
//   /\   /\
//   D E  F G
let A = new Promise((resolve, reject) => {
  console.log('A');
  resolve();
});
let B = A.then(() => console.log('B'));
let C = A.then(() => console.log('C'));
B.then(() => console.log('D'));
B.then(() => console.log('E'));
C.then(() => console.log('F'));
C.then(() => console.log('G'));
// A
// B
// C
// D
// E
// F
// G
```

**Promise.all()**     
Promise.all()静态方法创建的期约会在一组期约全部解决之后再解决。  
- 如果所有期约都成功解决，则合成期约的解决值就是所有包含期约解决值的数组，按照迭代器顺序。       
- 如果至少有一个包含的期约待定，则合成的期约也会待定。      
- 如果有一个包含的期约拒绝，则合成的期约也会拒绝。      
  如果有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由。之后再拒绝的期约不会影响最终期约的拒绝理由。                  

**Promise.race()**    
Promise.race()静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。    

**串行期约合成**     
```js
function addTwo(x) {return x + 2; }
function addThree(x) {return x + 3; }
function addFive(x) {return x + 5; }
functioncompose(...fns){
  return(x)=>fns.reduce((promise, fn)=>promise.then(fn), Promise.resolve(x))
}
let addTen = compose(addTwo, addThree, addFive);
addTen(8).then(console.log); // 18
```


#### 期约扩展
ES6期约实现是很可靠的，但它也有不足之处。比如，很多第三方期约库实现中具备而ECMAScript规范却未涉及的两个特性：期约取消和进度追踪。     

**期约取消**     
实际上，可以在现有实现基础上提供一种临时性的封装，以实现取消期约的功能。这可以用到Kevin Smith提到的“取消令牌”（cancel token）。生成的令牌实例提供了一个接口，利用这个接口可以取消期约；同时也提供了一个期约的实例，可以用来触发取消后的操作并求值取消状态。下面是CancelToken类的一个基本实例：
```js
class CancelToken {
  constructor(cancelFn) {
    this.promise = new Promise((resolve, reject) => {
      cancelFn(resolve);
    });
  }
}
```
这个类包装了一个期约，把解决方法暴露给了cancelFn参数。这样，外部代码就可以向构造函数中传入一个函数，从而控制什么情况下可以取消期约。这里期约是令牌类的公共成员，因此可以给它添加处理程序以取消期约。     

::: tip
ES6不支持取消期约和进度通知，一个主要原因就是这样会导致期约连锁和期约合成过度复杂化。比如在一个期约连锁中，如果某个被其他期约依赖的期约被取消了或者发出了通知，那么接下来应该发生什么完全说不清楚。毕竟，如果取消了Promise.all()中的一个期约，或者期约连锁中前面的期约发送了一个通知，那么接下来应该怎么办才比较合理呢？   
:::


### 异步函数
异步函数，也称为“async/await”（语法关键字），是ES6期约模式在ECMAScript函数中的应用。async/await是ES8规范新增的。    

#### async   
async关键字用于声明异步函数。这个关键字可以用在函数声明、函数表达式、箭头函数和方法上。使用async关键字可以让函数具有异步特征，但总体上其代码仍然是同步求值的。不过，异步函数如果使用return关键字返回了值（如果没有return则会返回undefined），这个值会被Promise.resolve()包装成一个期约对象。异步函数始终返回期约对象。在函数外部调用这个函数可以得到它返回的期约：         
```js
async function foo() {
  console.log(1);
  return3;
}
// 给返回的期约添加一个解决处理程序
foo().then(console.log);
console.log(2);
// 1
// 2
// 3
```

与在期约处理程序中一样，在异步函数中抛出错误会返回拒绝的期约：
```js
async function foo() {
  console.log(1);
  throw3;
}
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);
console.log(2);
// 1
// 2
// 3
```
不过，拒绝期约的错误不会被异步函数捕获：
```js
async function foo() {
  console.log(1);
  Promise.reject(3);
}
// Attach a rejected handler to the returned promise
foo().catch(console.log);
console.log(2);
// 1
// 2
//Uncaught(inpromise): 3
```

#### await
使用await关键字可以暂停异步函数代码的执行，等待期约解决。   
await关键字会暂停执行异步函数后面的代码，让出JavaScript运行时的执行线程。这个行为与生成器函数中的yield关键字是一样的。await关键字同样是尝试“解包”对象的值，然后将这个值传给表达式，再异步恢复异步函数的执行。    
等待会抛出错误的同步操作，会返回拒绝的期约：
```js
async function foo() {
  console.log(1);
  await(() => { throw 3; })();
}
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);
console.log(2);
// 1
// 2
// 3
```
单独的Promise.reject()不会被异步函数捕获，而会抛出未捕获错误。不过，对拒绝的期约使用await则会释放（unwrap）错误值（将拒绝期约返回）：
```js
async function foo() {
  console.log(1);
  await Promise.reject(3);
  console.log(4); // 这行代码不会执行
}
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);
console.log(2);
// 1
// 2
// 3
```

#### 停止和恢复执行
async/await中真正起作用的是await。async关键字，无论从哪方面来看，都不过是一个标识符。毕竟，**异步函数如果不包含await关键字，其执行基本上跟普通函数没有什么区别**。      
要完全理解await关键字，必须知道它并非只是等待一个值可用那么简单。JavaScript运行时在碰到await关键字时，会记录在哪里暂停执行。等到await右边的值可用了，JavaScript运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。因此，即使await后面跟着一个立即可用的值，函数的其余部分也会被异步求值。     

如果await后面是一个期约，则问题会稍微复杂一些。此时，为了执行异步函数，实际上会有两个任务被添加到消息队列并被异步求值。下面的例子虽然看起来很反直觉，但它演示了真正的执行顺序：
```js
async function foo() {
  console.log(2);
  console.log(await Promise.resolve(8));
  console.log(9);
}
async function bar() {
  console.log(4);
  console.log(await 6);
  console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
```
运行时会像这样执行上面的例子：      
（1）打印1；      
（2）调用异步函数foo()；    
（3）（在foo()中）打印2；     
（4）（在foo()中）await关键字暂停执行，向消息队列中添加一个期约在落定之后执行的任务；     
（5）期约立即落定，把给await提供值的任务添加到消息队列；    
（6）foo()退出；     
（7）打印3；     
（8）调用异步函数bar()；    
（9）（在bar()中）打印4；    
（10）（在bar()中）await关键字暂停执行，为立即可用的值6向消息队列中添加一个任务；    
（11）bar()退出；    
（12）打印5；    
（13）顶级线程执行完毕；   
（14）JavaScript运行时从消息队列中取出解决await期约的处理程序，并将解决的值8提供给它；   
（15）JavaScript运行时向消息队列中添加一个恢复执行foo()函数的任务；    
（16）JavaScript运行时从消息队列中取出恢复执行bar()的任务及值6；    
（17）（在bar()中）恢复执行，await取得值6；    
（18）（在bar()中）打印6；    
（19）（在bar()中）打印7；    
（20）bar()返回；    
（21）异步任务完成，JavaScript从消息队列中取出恢复执行foo()的任务及值8；    
（22）（在foo()中）打印8；    
（23）（在foo()中）打印9；    
（24）foo()返回。   

#### 异步函数策略
 
**实现sleep()**    
实现类似Java中Thread.sleep()之类的函数，好在程序中加入非阻塞的暂停。以前，这个需求基本上都通过setTimeout()利用JavaScript运行时的行为来实现的。     
有了异步函数之后，就不一样了。一个简单的箭头函数就可以实现sleep()：
```js
async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
async function foo() {
  const t0 = Date.now();
  await sleep(1500);// 暂停约1500 毫秒
  console.log(Date.now() - t0);
}
foo();
// 1502
```

**利用平行执行**    
如果使用await时不留心，则很可能错过平行加速的机会。如果顺序不是必需保证的，那么可以先一次性初始化所有期约，然后再分别等待它们的结果：
```js
async function randomDelay(id) {
  // 延迟0~1000 毫秒
  const delay = Math.random() ＊ 1000;
  return new Promise((resolve) => setTimeout(() => {
    setTimeout(console.log, 0, `${id} finished`);
    resolve();
  }, delay));
}
async function foo() {
  const t0 = Date.now();
  const p0 = randomDelay(0);
  const p1 = randomDelay(1);
  const p2 = randomDelay(2);
  const p3 = randomDelay(3);
  const p4 = randomDelay(4);
  await p0;
  await p1;
  await p2;
  await p3;
  await p4;
  setTimeout(console.log, 0, `${Date.now() - t0}ms elapsed`);
}
foo();
// 1 finished
// 4 finished
// 3 finished
// 0 finished
// 2 finished
// 877ms elapsed
```

**串行执行期约**
使用async/await，期约连锁会变得很简单：
```js
async function addTwo(x) {return x + 2; }
async function addThree(x) {return x + 3; }
async function addFive(x) {return x + 5; }
async function addTen(x) {
  for (const fn of [addTwo, addThree, addFive]) {
    x = await fn(x);
  }
  return x;
}
addTen(9).then(console.log); // 19
```

#### 栈追踪与内存管理
期约与异步函数的功能有相当程度的重叠，但它们在内存中的表示则差别很大。    

**期约**      
JavaScript引擎会在创建期约时尽可能保留完整的调用栈。在抛出错误时，调用栈可以由运行时的错误处理逻辑获取，因而就会出现在栈追踪信息中。当然，这意味着栈追踪信息会占用内存，从而带来一些计算和存储成本。

**异步函数**    
栈追踪信息就准确地反映了当前的调用栈。JavaScript运行时可以简单地在嵌套函数中存储指向包含函数的指针，就跟对待同步函数调用栈一样。这个指针实际上存储在内存中，可用于在出错时生成栈追踪信息。这样就不会像之前的例子那样带来额外的消耗，因此在重视性能的应用中是可以优先考虑的。    