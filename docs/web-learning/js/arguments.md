---
title: Arguments 对象
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 86
---

### arguments 是一个对应于传递给函数的参数的类数组对象。  

arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。  
::: danger 警告
arguments 对象只能在函数内使用。  
:::

参数也可以被设置：
```js
arguments[1] = 'new value';
```

```js
function func1(a, ...theArgs) {
  console.log(arguments[0]);

  console.log(arguments[1]);

  console.log(arguments[2]);

  console.log(a);

  console.log(...theArgs); // ...theArgs 表示剩余参数
}

func1(1, 2, 3);
// 1
// 2
// 3
// 1
// 2 3
```

::: tip 形参和实参
**形参**：是定义函数时在括号里定义的变量，它只是申明用的，是没有值的；  
**实参**：是调用函数时传给形参的值，是有值的。实参是形参被具体赋值之后的值，参加实际的运算，有实际作用。  
::: 

::: tip 提示
备注： 如果你编写兼容 ES6 的代码，那么优先推荐使用 剩余参数。  
:::

#### 剩余参数和 arguments对象之间的区别主要有三个：
1. 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。  
2. arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。  
3. arguments对象还有一些附加的属性 （如callee属性）。  

arguments对象不是一个 Array 。它类似于Array，但除了 length 属性和索引元素之外没有任何Array属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：
```js
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```
### 属性  
- arguments.callee  
  指向参数所属的当前执行的函数。  
- arguments.length  
  传递给函数的参数数量。  

### 例子

#### 定义连接字符串的函数（将从第二个参数开始的参数使用第一个参数作为连接符连接起来）
```js
function myConcat(separator) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separator);
}

const res = myConcat(", ", "red", "orange", "blue");
console.log(res);  // "red, orange, blue"
```