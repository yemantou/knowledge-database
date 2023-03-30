---
title: 迭代器与生成器
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 994
---

### 迭代器
循环是迭代机制的基础，这是因为它可以指定迭代的次数，以及每次迭代要执行什么操作。每次循环都会在下一次迭代开始之前完成，而每次迭代的顺序都是事先定义好的。  

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器API使用next()方法在可迭代对象中遍历数据。每次成功调用next()，都会返回一个IteratorResult对象，其中包含迭代器返回的下一个值。   
```js
// 可迭代对象
let arr = ['foo', 'bar'];
// 迭代器工厂函数
console.log(arr[Symbol.iterator]); // f values() { [native code] }
// 迭代器
let iter = arr[Symbol.iterator]();
console.log(iter); // ArrayIterator {}
// 执行迭代
console.log(iter.next()); // { done: false, value: 'foo' }
console.log(iter.next()); // { done: false, value: 'bar' }
console.log(iter.next()); // { done: true, value: undefined }
```

每个迭代器都表示对可迭代对象的一次性有序遍历。不同迭代器的实例相互之间没有联系，只会独立地遍历可迭代对象：    
```js
let arr = ['foo', 'bar'];
let iter1 = arr[Symbol.iterator]();
let iter2 = arr[Symbol.iterator]();
console.log(iter1.next()); // { done: false, value: 'foo' }
console.log(iter2.next()); // { done: false, value: 'foo' }
console.log(iter2.next()); // { done: false, value: 'bar' }
console.log(iter1.next()); // { done: false, value: 'bar' }
```

迭代器并不与可迭代对象某个时刻的快照绑定，而仅仅是使用游标来记录遍历可迭代对象的历程。如果可迭代对象在迭代期间被修改了，那么迭代器也会反映相应的变化：   
```js
let arr = ['foo', 'baz'];
let iter = arr[Symbol.iterator]();
console.log(iter.next()); // { done: false, value: 'foo' }
// 在数组中间插入值
arr.splice(1, 0, 'bar');
console.log(iter.next());//{done: false, value: 'bar'}
console.log(iter.next()); // { done: false, value: 'baz' }
console.log(iter.next()); // { done: true, value: undefined }
```

::: tip 注意
迭代器维护着一个指向可迭代对象的引用，因此迭代器会阻止垃圾回收程序回收可迭代对象。  
:::

为了让一个可迭代对象能够创建多个迭代器，必须每创建一个迭代器就对应一个新计数器。为此，可以把计数器变量放到闭包里，然后通过闭包返回迭代器：    
```js
class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  [Symbol.iterator]() {
    letcount=1,
        limit=this.limit;
    return{
      next(){
        if(count<=limit){
          return{done: false, value: count++};
        }else{
          return{done: true, value: undefined};
        }
      }
    };
  }
}
let counter = new Counter(3);
for (let i of counter) { console.log(i); }
// 1
// 2
// 3
for (let i of counter) { console.log(i); }
// 1
// 2
// 3
```


### 生成器  
生成器是ECMAScript 6新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。这种新能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程。    

生成器的形式是一个函数，函数名称前面加一个星号（ * ）表示它是一个生成器。只要是可以定义函数的地方，就可以定义生成器。    
```js
// 生成器函数声明
function *  generatorFn() {}
// 生成器函数表达式
let generatorFn = function *  () {}
// 作为对象字面量方法的生成器函数
let foo = {
   *  generatorFn() {}
}
// 作为类实例方法的生成器函数
class Foo {
   *  generatorFn() {}
}
// 作为类静态方法的生成器函数
class Bar {
  static  *  generatorFn() {}
}
```
::: tip 注意
箭头函数不能用来定义生成器函数。
:::

调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行（suspended）的状态。与迭代器相似，生成器对象也实现了Iterator接口，因此具有next()方法。调用这个方法会让生成器开始或恢复执行。   
```js
function *  generatorFn() {}
const g = generatorFn();
console.log(g);         // generatorFn {<suspended>}
console.log(g.next);   // f next() { [native code] }
```

next()方法的返回值类似于迭代器，有一个done属性和一个value属性。函数体为空的生成器函数中间不会停留，调用一次next()就会让生成器到达done: true状态。value属性是生成器函数的返回值，默认值为undefined，可以通过生成器函数的返回值指定：   
```js
function *  generatorFn() {
  return'foo';
}
let generatorObject = generatorFn();
console.log(generatorObject);           // generatorFn {<suspended>}
console.log(generatorObject.next());   // { done: true, value: 'foo'}
```

yield关键字可以让生成器停止和开始执行，也是生成器最有用的地方。生成器函数在遇到yield关键字之前会正常执行。遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生成器函数只能通过在生成器对象上调用next()方法来恢复执行：    
```js
function *  generatorFn() {
  yield;
}
let generatorObject = generatorFn();
console.log(generatorObject.next());   // { done: false, value: undefined }
console.log(generatorObject.next());   // { done: true, value: undefined }
```
通过yield关键字退出的生成器函数会处在done: false状态；通过return关键字退出的生成器函数会处于done: true状态。   
```js
function *  generatorFn() {
  yield'foo';
  yield'bar';
  return 'baz';
}
let generatorObject = generatorFn();
console.log(generatorObject.next());  //{done: false, value: 'foo'}
console.log(generatorObject.next());  //{done: false, value: 'bar'}
console.log(generatorObject.next());   // { done: true, value: 'baz' }
```
::: tip 注意
生成器函数内部的执行流程会针对每个生成器对象区分作用域。在一个生成器对象上调用next()不会影响其他生成器。    
yield关键字必须直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出语法错误。  
:::

在生成器对象上显式调用next()方法的用处并不大。其实，如果把生成器对象当成可迭代对象，那么使用起来会更方便：    
```js
function  *  generatorFn() {
  yield 1;
  yield 2;
  yield 3;
}
for (const x of generatorFn()) {
  console.log(x);
}
// 1
// 2
// 3
```
在需要自定义迭代对象时，这样使用生成器对象会特别有用（迭代器对象学习中的自定义迭代器就会变得非常简单）。比如，我们需要定义一个可迭代对象，而它会产生一个迭代器，这个迭代器会执行指定的次数。使用生成器，可以通过一个简单的循环来实现：    
```js
function *  nTimes(n) {
  while(n--) {
    yield;
  }
}
for (let _ of nTimes(3)) {
  console.log('foo');
}
// foo
// foo
// foo
```

yield关键字还可以作为函数的中间参数使用。上一次让生成器函数暂停的yield关键字会接收到传给next()方法的第一个值。这里有个地方不太好理解——第一次调用next()传入的值不会被使用，因为这一次调用是为了开始执行生成器函数：    
```js
function *  generatorFn(initial) {
  console.log(initial);
  console.log(yield);
  console.log(yield);
}
let generatorObject = generatorFn('foo');
generatorObject.next('bar');  //foo
generatorObject.next('baz');   // baz
generatorObject.next('qux');   // qux
```

因为yield * 实际上只是将一个可迭代对象序列化为一连串可以单独产出的值，所以这跟把yield放到一个循环里没什么不同。下面两个生成器函数的行为是等价的：   
```js
function *  generatorFnA() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
for (const x of generatorFnA()) {
  console.log(x);
}
// 1
// 2
// 3
function *  generatorFnB() {
  yield * [1, 2, 3];
}
for (const x of generatorFnB()) {
  console.log(x);
}
// 1
// 2
// 3
```

yield * 的值是关联迭代器返回done: true时的value属性。对于普通迭代器来说，这个值是undefined；对于生成器函数产生的迭代器来说，这个值就是生成器函数返回的值


#### 使用yield * 实现递归算法  
yield * 最有用的地方是实现递归操作，此时生成器可以产生自身。例：    
```js
function * nTimes(n) {
  if (n > 0) {
    yield＊nTimes(n-1);
    yieldn-1;
  }
}
for (const x of nTimes(3)) {
  console.log(x);
}
// 0
// 1
// 2
```

#### 提前终止生成器
还有一个可选的return()方法用于提前终止迭代器。生成器对象除了有这两个方法，还有第三个方法：throw()。   
```js
function * generatorFn() {}
const g = generatorFn();
console.log(g);           // generatorFn {<suspended>}
console.log(g.next);     // f next() { [native code] }
console.log(g.return);   // f return() { [native code] }
console.log(g.throw);    // f throw() { [native code] }
```