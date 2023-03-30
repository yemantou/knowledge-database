---
title: ES6+
autoGroup-1: JS
sidebarDepth: 0
autoSort: 982
---

# ES6+
::: tip 参考文章
[ES6入门](https://es6.ruanyifeng.com/#docs/object-methods)
[ES6 - ES11](https://www.bilibili.com/video/BV1uK411H7on?p=3&vd_source=6209062cbf65dad9c29cdb5fe3d107e4)
:::

## ES6
- 块级作用域，let和const
- 箭头函数，this指向函数定义时的this，无法被改变
- 变量的解构赋值，数组和对象都可以
- 模板字符串，``
- 对象的简化写法，对象里面值可以使用变量
- Symbol
- Proxy和Reflect
- 迭代器和生成器
- Promise
- class
- ...扩展运算符，针对数组
- Set，集合
- Map
- 模块

## ES7
- Array.prototype.includes
- 指数操作符，** 相当于 Math.pow

## ES8
- async 和 await，await 的 promise 失败了要用 try...catch 捕获
- 对象方法扩展 Object.values、Object.entries（对象转化为二维数组，二维数组可用于生成Map）、Object.getOwnPropertyDescriptors

## ES9
- 扩展运算符，可针对对象
- 正则扩展 - 命名捕获分组

## ES10
- 对象扩展方法，Object.fromEntries（二维数组或Map转为对象）
- 字符串扩展方法，trimStart 与 trimEnd（清除左边或右边空格）
- 数组扩展方法，flat 和 flatMap（类似数组的map方法，可以在里面把返回平铺）

## ES11
- 私有属性，属性前面加#，外部不可以直接访问修改
- Promise.allSettled 方法，永远返回成功，值是数组
- 可选链操作符：?. ，判断前面对象存在时才读取后面属性
- 动态import，then方法中返回模块
- BigInt，进行大数运算
- 绝对全局对象 globalThis，永远指向全局对象

## ES12
- 逻辑赋值操作符 ??=、&&=、 ||=    
  ??，只有当操作符左边的值是null或者undefined的时候，才会取操作符右边的值
  ```js
  // 等同于 a = a || b
  a ||= b;
  // 等同于 c = c && d
  c &&= d;
  // 等同于 e = e ?? f
  e ??= f;
  ```
- promise.any：只要其中一个promise成功，就返回那个已经成功的permise，如果可叠戴对象中没有一个premise成功，就返回一个失败的premise
