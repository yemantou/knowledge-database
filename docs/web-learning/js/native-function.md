---
title: 原生函数
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 84
---

### 常用的原生函数（即：内建函数）
- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()——ES6中新加入的！

生函数可以被当作构造函数来使用，但其构造出来的对象可能会和我们设想的有所出入：  
```js
var a = new String('abc');

console.log(typeof a); // object

console.log(a instanceof String); // true

const res = Object.prototype.toString.call(a);

console.log(res); // [object String]
```
:::warning 注意
通过构造函数（如new String("abc")）创建出来的是封装了基本类型值（如"abc"）的封装对象。
:::

::: tip typeof
typeof 操作符返回一个字符串，表示未经计算的操作数的类型。  
typeof null = "object"
:::

::: tip instanceof
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。  
语法：  
object instanceof constructor  
:::

### 内部属性[[Class]]
所有typeof返回值为"object"的对象（如数组）都包含一个内部属性[[Class]]，这个属性无法直接访问，一般通过Object.prototype.toString(..)来查看。  
例如：  
```js
Object.prototype.toString.call([1, 2, 3]); // [object Array]
```

多数情况下，对象的内部[[Class]]属性和创建该对象的内建原生构造函数相对应（如下），但并非总是如此。  
```js
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(undefined); // [object Undefined]
```

### 封装对象包装
由于基本类型值没有．length和．toString()这样的属性和方法，需要通过封装对象才能访问，此时JavaScript会自动为基本类型值包装（box或者wrap）一个封装对象。  
::: danger 警告
使用封装对象时有些地方需要特别注意：  
比如`new Boolean(false)`，会为false创建了一个封装对象，然而该对象是真值。  
:::

### 拆封 
得到封装对象中的基本类型值，可以使用valueOf()函数：  
```js
var a = new String('abc');

a.valueOf(); // abc
```

### 原生函数作为构造函数
应该尽量避免使用构造函数，除非十分必要，因为它们经常会产生意想不到的结果。  
- Array(..)  
  构造函数Array(..)不要求必须带new关键字，会被自动补上，Array(1,2,3)和new Array(1,2,3)的效果是一样的。  
  Array构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。  
  永远不要创建和使用空单元数组：Array(3)会创建一个length=3的空数组。
- Object(..)、Function(..)和RegExp(..)  
  除非万不得已，否则尽量不要使用Object(..)/Function(..)/RegExp(..)。
  RegExp(..)有时还是很有用的，比如动态定义正则表达式时：  
  ```js
  var name = 'Kyle';
  var namePattern = new RegExp('\\b(? :' + name + ')+\\b', 'ig');
  var matches = someText.match(namePattern);
  ```  


