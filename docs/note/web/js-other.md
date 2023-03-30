---
title: 其他
autoGroup-1: JS
sidebarDepth: 0
autoSort: 984
---

# 其他 JS 知识

## 防抖和节流

### 防抖
n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时   
```js
function debounce (func, wait = 500) {
  let timer
  return function () {
    const context = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(context, ...args)
    }, wait)
  }
}
```

### 节流
n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效  
```js
function throttle (func, wait = 500) {
  let flag = false
  return function () {
    const context = this
    const args = arguments
    if (flag) {
      return
    }
    flag = true
    setTimeout(() => {
      func.apply(context, args)
      flag = false
    })
  }
}
```


## Ajax
[Ajax 教程](https://www.w3school.com.cn/js/js_ajax_http_send.asp)    

作用：
- 不刷新页面更新网页
- 在页面加载后从服务器请求数据
- 在页面加载后从服务器接收数据
- 在后台向服务器发送数据

```js
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt", true); // 异步请求第三个参数必须为 true
  xhttp.send();
} 
```
Ajax 的核心是 XMLHttpRequest 对象。

缺点：需要使用回调函数来获取结果做操作；
解决方法：用 Promise 将 Ajax 请求包起来


## fetch
- 属于原生 js，脱离了xhr ,号称可以替代 ajax技术。
- 基于 Promise 对象设计的，可以解决回调地狱问题。   
- 返回结果是 Promise 对象。
- 没有办法检测请求的进度，无法取消或超时处理。    
- 浏览器支持性比较差。


## Axios
[Axios 教程](https://www.axios-http.cn/docs/instance)    

Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。

- 在浏览器中创建XMLHttpRequest请求，在node.js中创建http请求。
- 解决回调地狱问题。
- 自动转化为json数据类型。
- 可以通过网络请求检测进度。
- 提供超时处理。
- 浏览器兼容性良好。


## Ajax、fetch、Axios 的比较
[Ajax、fetch、Axios 的比较](https://baijiahao.baidu.com/s?id=1709840036410376001&wfr=spider&for=pc)


## 前端模块化
[前端模块化](https://juejin.cn/post/6844903744518389768)   

### IIFE模式：匿名函数自调用(闭包）
作用: 数据是私有的, 外部只能通过暴露的方法操作   
编码: 将数据和行为封装到一个函数内部, 通过给window添加属性来向外暴露接口   
问题: 如果当前这个模块依赖另一个模块怎么办？   
解决方法：引入依赖，将依赖通过参数传递进去

### 模块化规范
1. CommonJS


### 手写instanceof
```js
function myInstanceof(target, origin) {
  if (typeof target !== "object" || target === null) return false;
  if (typeof origin !== "function")
    throw new TypeError("origin must be function");
  let proto = Object.getPrototypeOf(target); // 相当于 proto = target.__proto__;
  while (proto) {
    if (proto === origin.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```


### ES5
[JavaScript ES5](https://www.w3school.com.cn/js/js_es5.asp)

ECMAScript 5 特性    
这些是 2009 年发布的新特性：
- "use strict" 指令
- String.trim()
- Array.isArray()
- Array.forEach()
- Array.map()
- Array.filter()
- Array.reduce()
- Array.reduceRight()
- Array.every()
- Array.some()
- Array.indexOf()
- Array.lastIndexOf()
- JSON.parse()
- JSON.stringify()
- Date.now()
- 属性 Getter 和 Setter
- 新的对象属性和方法


### ES6
[ES6 入门教程](https://es6.ruanyifeng.com/#README)    

1. es6新增了箭头函数，es5没有；
2. ES6中新增了块级作用域，es5没有；
3. ES6引入Class概念，不再像ES5一样使用原型链实现继承；
4. ES6中可以设置默认函数参数，es5不行；
5. ES6中新增了promise特性。


### 数组扁平化
1. 使用数组模拟队列的数据结构，循环遍历队列取出队头元素，遇到有子元素时加入队尾，直到队列为空。
2. 使用生成器
   ```js
    var arr = [1, [[2, 3], 4], [5, 6, [7, [8, 9, [10, 11]]]]];

    function * flat (a) {
      var length = a.length;
      for (var i = 0; i < length; i++) {
        var item = a[i];
        if (Array.isArray(item)) {
          yield* flat(item);
        } else {
          yield item;
        }
      }
    };

    for (var f of flat(arr)) {
      console.log(f);
    }
    // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
   ```