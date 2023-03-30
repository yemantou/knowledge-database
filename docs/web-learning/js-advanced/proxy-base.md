---
title: 代理基础
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 990
---

## 代理基础
代理是目标对象的抽象。目标对象既可以直接被操作，也可以通过代理来操作。但直接操作会绕过代理施予的行为。       
可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制。   


### 创建空代理
最简单的代理是空代理，即除了作为一个抽象的目标对象，什么也不做。默认情况下，在代理对象上执行的所有操作都会无障碍地传播到目标对象。因此，在任何可以使用目标对象的地方，都可以通过同样的方式来使用与之关联的代理对象。   

代理是使用Proxy构造函数创建的。这个构造函数接收两个参数：目标对象和处理程序对象。缺少其中任何一个参数都会抛出TypeError。要创建空代理，可以传一个简单的对象字面量作为处理程序对象，从而让所有操作畅通无阻地抵达目标对象。

如下面的代码所示，在代理对象上执行的任何操作实际上都会应用到目标对象。
```js
const target = {
  id: 'target'
};
const handler = {};
const proxy = new Proxy(target, handler);
// id属性会访问同一个值
console.log(target.id);   // target
console.log(proxy.id);    // target
// 给目标属性赋值会反映在两个对象上
// 因为两个对象访问的是同一个值
target.id = 'foo';
console.log(target.id); // foo
console.log(proxy.id);   // foo
// 给代理属性赋值会反映在两个对象上
// 因为这个赋值会转移到目标对象
proxy.id = 'bar';
console.log(target.id); // bar
console.log(proxy.id);   // bar
// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty('id')); // true
console.log(proxy.hasOwnProperty('id'));   // true
// Proxy.prototype是undefined
// 因此不能使用instanceof操作符
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype
'undefined' in instanceof check
console.log(proxy instanceof Proxy);  // TypeError: Function has non-object prototype
'undefined' in instanceof check
// 严格相等可以用来区分代理和目标
console.log(target === proxy); // false
```


### 定义捕获器
**使用代理的主要目的是可以定义捕获器（trap）。**捕获器就是在处理程序对象中定义的“基本操作的拦截器”。     

可以定义一个get()捕获器，在ECMAScript操作以某种形式调用get()时触发。例如：    
```js
const target = {
  foo: 'bar'
};
const handler = {
  // 捕获器在处理程序对象中以方法名为键
  get() {
    return 'handler override';
  }
};
const proxy = new Proxy(target, handler);
console.log(target.foo);                         // bar
console.log(proxy.foo);                          // handler override
console.log(target['foo']);                     // bar
console.log(proxy['foo']);                       // handler override
console.log(Object.create(target)['foo']);   // bar
console.log(Object.create(proxy)['foo']);    // handler override
```
proxy[property]、proxy.property或Object.create(proxy)[property]等操作都会触发基本的get()操作以获取属性。因此所有这些操作只要发生在代理对象上，就会触发get()捕获器。    


### 捕获器参数和反射API
捕获器都能获取相应的参数。比如，get()捕获器会接收到目标对象、要查询的属性和代理对象三个参数。有了这些参数，就可以重建被捕获方法的原始行为。   
```js
const target = {
  foo: 'bar'
};
const handler = {
  get(trapTarget, property, receiver) {
    console.log(trapTarget === target);
    console.log(property);
    console.log(receiver === proxy);
    return trapTarget[property];
  }
};
const proxy = new Proxy(target, handler);
proxy.foo;
console.log(proxy.foo);   // bar
console.log(target.foo); // bar
// true
// foo
// true
```

处理程序对象中所有可以捕获的方法都有对应的反射（Reflect）API方法。这些方法与捕获器拦截的方法具有相同的名称和函数签名，而且也具有与被拦截方法相同的行为。因此，使用反射API也可以像下面这样定义出空代理对象：     
```js
const target = {
  foo: 'bar'
};
const handler = {
  get() {
    return Reflect.get(...arguments);
  }
  // 或采用下面的简洁写法
  // get: Reflect.get
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo);    // bar
console.log(target.foo);   // bar
```

如果真想创建一个可以捕获所有方法，然后将每个方法转发给对应反射API的空代理，那么甚至不需要定义处理程序对象：
```js
const target = {
  foo: 'bar'
};
const proxy = new Proxy(target, Reflect);
console.log(proxy.foo);    // bar
console.log(target.foo);   // bar
```

基于反射API开发者可以用最少的代码修改捕获的方法。例：
```js
const target = {
  foo: 'bar',
  baz: 'qux'
};
const handler = {
  get(trapTarget, property, receiver) {
    let decoration = '';
    if (property === 'foo') {
      decoration = '!!!';
    }
    return Reflect.get(...arguments) + decoration;
  }
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo);    // bar!!!
console.log(target.foo);   // bar
console.log(proxy.baz);    // qux
console.log(target.baz);   // qux
```


### 捕获器不变式
使用捕获器几乎可以改变所有基本方法的行为，但也不是没有限制。根据ECMAScript规范，每个捕获的方法都知道目标对象上下文、捕获函数签名，而捕获处理程序的行为必须遵循“捕获器不变式”（trap invariant）。捕获器不变式因方法不同而异，但通常都会防止捕获器定义出现过于反常的行为。    

比如，如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的值时，会抛出TypeError。
```js
const target = {};
Object.defineProperty(target, 'foo', {
  configurable: false,
  writable: false,
  value: 'bar'
});
const handler = {
  get() {
    return 'qux';
  }
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo);
// TypeError
```

### 可撤销代理
roxy也暴露了revocable()方法，这个方法支持撤销代理对象与目标对象的关联。撤销代理的操作是不可逆的。而且，撤销函数（revoke()）是幂等的，调用多少次的结果都一样。撤销代理之后再调用代理会抛出TypeError。撤销函数和代理对象是在实例化时同时生成的： 
```js
const target = {
  foo: 'bar'
};
const handler = {
  get() {
    return 'intercepted';
  }
};
const { proxy, revoke } = Proxy.revocable(target, handler);
console.log(proxy.foo);    // intercepted
console.log(target.foo);   // bar
revoke();
console.log(proxy.foo);    // TypeError
```
