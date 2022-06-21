---
title: 柯里化
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 90
---

### 定义
柯里化是函数式编程中的一种过程，可以将接受具有多个参数的函数转化为一个的嵌套函数队列，然后返回一个新的函数以及期望下一个的内联参数。柯里化就是将具有多个arity的函数转化为具有较少的arity的函数（arity（元数）：指的是函数的参数个数）。

### 实质
其实就是return一个一个函数（嵌套），利用闭包内部作用域一直存在的特性。  

### 作用
避免频繁调用具有相同参数的函数。  

### 通用的柯里化函数      
```js
function currying (fn, ...args) {
  return (..._args) => {
    return fn(...args, ..._args);
  }
}

function volume(l, h, w) {
  return l * h * w
}

const hCy = currying(volume, 100);

const res = hCy(10, 2);
console.log(res); // 2000

```
