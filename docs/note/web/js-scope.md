---
title: 作用域（Scope）与作用域链
autoGroup-1: JS
sidebarDepth: 0
autoSort: 995
---

# 作用域（Scope）与作用域链
- 作用域：规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。换句话说，作用域决定了代码区块中变量和其他资源的可见性。（全局作用域、函数作用域、块级作用域）
- 作用域链：从当前作用域开始一层层往上找某个变量，如果找到全局作用域还没找到，就放弃寻找 。这种层级关系就是作用域链。（由多个执行上下文的变量对象构成的链表就叫做作用域链）

**js 采用的是静态作用域，所以函数的作用域在函数定义时就确定了。**    

::: tip 参考文章
[深入理解JavaScript作用域和作用域链](https://juejin.cn/post/6844903797135769614)
:::

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```
上面代码中，变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。所以最后输出的是10。    

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。    

**for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。**      
```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```
上面代码正确运行，输出了 3 次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。    


## 作用域链
函数变量要到**创建这个函数的那个作用域中**取值，这里强调的是“创建”，而不是“调用”，切记切记——其实这就是所谓的"静态作用域"。