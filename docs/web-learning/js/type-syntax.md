---
title: 类型和语法
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 85
---

### 类型
JavaScript有七种内置类型：
1. 空值（null）
2. 未定义（undefined）
3. 布尔值（boolean）
4. 数字（number）
5. 字符串（string）
6. 对象（object）
7. 符号（symbol, ES6中新增）  
除对象之外，其他统称为“基本类型”。

### 值 
#### 字符串
```js
var a = 'foo';
```
JavaScript中字符串是不可变的，而数组是可变的。并且a[1]在JavaScript中并非总是合法语法，在老版本的IE中就不被允许（现在可以了）。正确的方法应该是a.charAt(1)。  

::: tip 注意
字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串。而数组的成员函数都是在其原始值上进行操作。  
:::

字符串没有某些数组函数，但可以通过“借用”数组的非变更方法来处理字符串：  
```js
var a = 'foo';

a.join('-'); // undefined

var b = Array.prototype.join.call(a, '-');

console.log(b); // 'f-o-o'
```

<font color=red>**字符串反转：**</font>  
字符串没有reverse函数，也无法通过.call"借用"，因为字符串是不可变的。  
对于简单的字符串可以将其转为数组然后调用reverse方法再转回字符串。    
::: danger 警告
对于包含复杂字符（Unicode，如星号、多字节字符等）的字符串并不适用。这时则需要功能更加完备、能够处理Unicode的工具库。  
:::

### 数字
JavaScript中的数字类型是基于`IEEE 754`标准来实现的，该标准通常也被称为“浮点数”。JavaScript使用的是“双精度”格式（即64位二进制）。  
#### 精度丢失
```js
console.log(0.1 + 0.2 === 0.3); // false 
// 0.1 + 0.2 = 0.30000000000000004
```
整数的安全范围：  
能够被“安全”呈现的最大整数是`2^53-1`，即`9007199254740991`，在ES6中被定义为Number.MAX SAFE INTEGER。最小整数是`-9007199254740991`，在ES6中被定义为Number. MIN SAFE INTEGER。  

### 不是值的值（`null`和`undefined`）
#### 区别：  
- null指空值（empty value）
- undefined指没有值（missing value）  
  或者：  
- undefined指从未赋值
- null指曾赋过值，但是目前没有值 

::: warning 提醒
null是一个特殊关键字，不是标识符，我们不能将其当作变量来使用和赋值。  
然而undefined却是一个标识符，可以被当作变量来使用和赋值。 
:::

### void 
void并不改变表达式的结果，只是让表达式不返回值。  
例如： 
```js
var a = 42;

console.log(void a, a); // undefined 42
```
::: tip 提示
void运算符在其他地方也能派上用场，比如不让表达式返回任何结果（即使其有副作用）。  
:::
