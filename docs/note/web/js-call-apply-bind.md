---
title: call、apply、bind 实现
autoGroup-1: JS
sidebarDepth: 0
autoSort: 990
---

# call、apply、bind 实现
::: tip 参考文章
[call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)    
[bind的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)   
:::

## call
call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。    

```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```
从上面代码可以看出：   
- call 改变了 this 的指向，指向到 foo
- bar 函数执行了


## apply模拟实现
```js
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  let result = null;
  context = context || window;
  // 与上面代码相比，我们使用 Symbol 来保证属性唯一
  // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  // 执行要被调用的方法
  result = context[fnSymbol]([...arguments].slice(1));
  delete context[fnSymbol];
  return result;
};
```


## bind
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。   
bind 方法与 call / apply 最大的不同就是前者返回一个绑定上下文的函数，而后两者是直接执行了函数。    

#### bind 有如下特性：  
1. 指定 this
2. 传入参数
3. 返回一个函数
4. 柯里化

```js
Function.prototype.bind2 = function (context) {

  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
      // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
      // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
```

#### 柯里化
[点击前往柯里化](../../web-learning/js/currying.md)


