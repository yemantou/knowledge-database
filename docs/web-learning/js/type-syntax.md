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

### 特殊的数字
- NaN   
  ::: tip 提示
  NaN是JavaScript中唯一一个不等于自身的值。  
  :::
  理解为“无效数值”“失败数值”或者“坏数值”可能更准确些。  
  NaN是一个“警戒值”：执行数学运算没有成功，这是失败后返回的结果。  
  使用内建的全局工具函数isNaN(..)来判断一个值是否是NaN
  ::: danger 警告
  isNaN(..)有一个严重的缺陷，它的检查方式过于死板，就是“检查参数是否不是NaN，也不是数字”。但是这样做的结果并不太准确。   
  ES6开始我们可以使用工具函数Number.isNaN(..)，不存在此bug。  
  :::
- Infinity  
  `1 / 0`结果就是Infinity（即Number.POSITIVE INfINITY）；   
  `-1 / 0`结果就是-Infinity（即Number.NEGATIVE INfINITY）；  
  ::: tip 提示
  规范规定，如果数学运算（如加法）的结果超出处理范围，则由IEEE 754规范中的“就近取整”（round-to-nearest）模式来决定最后的结果。  
  :::
  计算结果一旦溢出为无穷数（infinity）就无法再得到有穷数。换句话说，就是你可以从有穷走向无穷，但无法从无穷回到有穷。  
- 零值
  JavaScript有一个常规的0（也叫作+0）和一个-0。   
  -0等于0。  
- 特殊等式  
  ES6中新加入了一个工具方法Object.is(..)来判断两个值是否绝对相等（Object.is(..)主要用来处理那些特殊的相等比较）.  

### 值和引用
- 简单值（即标量基本类型值，scalar primitive）总是通过值复制的方式来赋值/传递，包括null、undefined、字符串、数字、布尔和ES6中的symbol。  
- 复合值（compound value）——对象（包括数组和封装对象）和函数，则总是通过引用复制的方式来赋值/传递。 
   
由于引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向（使用=赋值再使用=赋值不会产生引用效果）：   
```js
var a = [1, 2, 3];
var b = a;
console.log(a); // [1, 2, 3]
console.log(b); // [1, 2, 3]

b = [4, 5, 6];
console.log(a); // [1, 2, 3]
console.log(b); // [4, 5, 6]
```
::: warning 注意
b=[4,5,6]并不影响a指向值[1,2,3]，除非b不是指向数组的引用，而是指向a的指针，但在JavaScript中不存在这种情况！  
:::

函数参数就经常让人产生这样的困惑：
```js
function foo (x) {
  x.push(4);
  console.log(x); // [ 1, 2, 3, 4 ]

  x = [4, 5, 6]
  x.push(7);
  console.log(x); // [ 4, 5, 6, 7 ]
}

var a = [1, 2, 3];

foo(a);

console.log(a); // [ 1, 2, 3, 4 ]
```
::: tip 提示
向函数传递a的时候，实际是将引用a的一个复本赋值给x，而a仍然指向[1,2,3]。在函数中我们可以通过引用x来更改数组的值（push(4)之后变为[1,2,3,4]）。但x =[4,5,6]并不影响a的指向，所以a仍然指向[1,2,3,4]。   
不能通过引用x来更改引用a的指向，只能更改a和x共同指向的值。  
:::
如果要将a的值变为[4,5,6,7]，必须更改x指向的数组，而不是为x赋值一个新的数组。  
```js
function foo (x) {
  x.push(4);
  console.log(x); // [ 1, 2, 3, 4 ]

  x.length = 0; // 使用x = [];不行
  x.push(4, 5, 6, 7);
  console.log(x); // [ 4, 5, 6, 7 ]
}

var a = [1, 2, 3];

foo(a);

console.log(a); // [ 4, 5, 6, 7 ]
```
::: tip 提示
如果要将标量基本类型值传递到函数内并进行更改，就需要将该值封装到一个复合值（对象、数组等）中，然后通过引用复制的方式传递。  
:::


