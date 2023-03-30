---
title: 函数
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 987
---

## 函数
把函数想象为对象，把函数名想象为指针是很重要的。    


### 箭头函数
箭头函数虽然语法简洁，但也有很多场合不适用。**箭头函数不能使用arguments、super和new.target，也不能用作构造函数。此外，箭头函数也没有prototype属性。**


### 函数声明与函数表达式
JavaScript引擎在任何代码执行之前，会先读取函数声明，并在执行上下文中生成函数定义。而函数表达式必须等到代码执行到它那一行，才会在执行上下文中生成函数定义。   

```js
// 没问题
console.log(sum(10, 10));
function sum(num1, num2) {
  return num1 + num2;
}
```
以上代码可以正常运行，因为函数声明会在任何代码执行之前先被读取并添加到执行上下文。这个过程叫作**函数声明提升**（function declaration hoisting）。    

如果把前面代码中的函数声明改为等价的函数表达式，那么执行的时候就会出错：    
```js
// 会出错
console.log(sum(10, 10));
let sum = function(num1, num2) {
  return num1 + num2;
};
```


### 函数属性与方法
ECMAScript中的函数是对象，因此有属性和方法。每个函数都有两个属性：length和prototype。其中，length属性保存函数定义的命名参数的个数。        
函数的 length 是 函数的形参个数 形参数量是指在第一个具有默认值之前的参数个数：          
```js
console.log("==============", function (...arguments) { }.length) // => ============== 0
function () { }.length  // => 0
function (c) { }.length  // => 1
function (a, b) { }.length  // => 2
function (a, b=1, c) { }.length  // => 1
function (a = 1, b, c) { }.length  // => 0
```


### 闭包
闭包指的是那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的。   

#### this对象
闭包中使用this会让代码变复杂。如果内部函数没有使用箭头函数定义，则this对象会在运行时绑定到执行函数的上下文。如果在全局函数中调用，则this在非严格模式下等于window，在严格模式下等于undefined。如果作为某个对象的方法调用，则this等于这个对象。**匿名函数在这种情况下不会绑定到某个对象，这就意味着this会指向window，除非在严格模式下this是undefined。**    
```js
window.identity = 'The Window';
let object = {
  identity: 'My Object',
  getIdentityFunc() {
    return function() {
      return this.identity;
    };
  }
};
console.log(object.getIdentityFunc()()); // 'The Window'
```

#### 内存泄漏
由于IE在IE9之前对JScript对象和COM对象使用了不同的垃圾回收机制（第4章讨论过），所以闭包在这些旧版本IE中可能会导致问题。在这些版本的IE中，把HTML元素保存在某个闭包的作用域中，就相当于宣布该元素不能被销毁。来看下面的例子：
```js
function assignHandler() {
  let element = document.getElementById('someElement');
  element.onclick = () => console.log(element.id);
}
```
其实只要这个例子稍加修改，就可以避免这种情况，比如：
```js
function assignHandler() {
  let element = document.getElementById('someElement');
  letid=element.id;
  element.onclick = () => console.log(id);
  element=null;
}
```

#### 立即调用的函数表达式
立即调用的匿名函数又被称作立即调用的函数表达式（IIFE, Immediately Invoked Function Expression）。   

使用IIFE可以模拟块级作用域，即在一个函数表达式内部声明变量，然后立即调用这个函数。这样位于函数体作用域的变量就像是在块级作用域中一样。ECMAScript 5尚未支持块级作用域，使用IIFE模拟块级作用域是相当普遍的。比如下面的例子：
```js
// IIFE
(function () {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
})();
console.log(i);   // 抛出错误
```

在ECMAScript 6以后，IIFE就没有那么必要了，因为块级作用域中的变量无须IIFE就可以实现同样的隔离。下面展示了两种不同的块级作用域形式：
```js
// 内嵌块级作用域
{
  let i;
  for (i = 0; i < count; i++) {
    console.log(i);
  }
}
console.log(i); // 抛出错误

// 循环的块级作用域
for (let i = 0; i < count; i++) {
  console.log(i);
}
console.log(i); // 抛出错误
```

#### 私有变量

严格来讲，JavaScript没有私有成员的概念，所有对象属性都公有的。不过，倒是有私有变量的概念。任何定义在函数或块中的变量，都可以认为是私有的，因为在这个函数或块的外部无法访问其中的变量。私有变量包括函数参数、局部变量，以及函数内部定义的其他函数。

特权方法（privileged method）是能够访问函数私有变量（及私有函数）的公有方法。特权方法可以使用构造函数或原型模式通过自定义类型中实现，也可以使用模块模式或模块增强模式在单例对象上实现。在构造函数中实现，比如：
```js
function MyObject() {
  // 私有变量和私有函数
  let privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // 特权方法
  this.publicMethod = function() {
    privateVariable++;
    return privateFunction();
  };
}
```

**静态私有变量**     
特权方法也可以通过使用私有作用域定义私有变量和函数来实现。这个模式如下所示：
```js
(function() {
  // 私有变量和私有函数
  let privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // 构造函数
  MyObject = function() {};
  // 公有和特权方法
  MyObject.prototype.publicMethod = function() {
    privateVariable++;
    return privateFunction();
  };
})();
```
这里声明MyObject并没有使用任何关键字。因为**不使用关键字声明的变量会创建在全局作用域中**，所以MyObject变成了全局变量，可以在这个私有作用域外部被访问。注意在严格模式下给未声明的变量赋值会导致错误。   

::: tip 注意
使用闭包和私有变量会导致作用域链变长，作用域链越长，则查找变量所需的时间也越多。
:::

#### 模块模式
