---
title: 语言基础
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 998
---

### var声明提升（变量提升）
使用var时，下面的代码不会报错。这是因为使用这个关键字声明的变量会自动提升到函数作用域顶部：
```js
function foo() {
  console.log(age);
  var age = 26;
}
foo();   // undefined
```
等价于如下代码：
```js
function foo() {
  var age;
  console.log(age);
  age = 26;
}
foo();   // undefined
```



### for-in 与 for-of
1. 功能不同
  for-in是遍历数组的下标    
  for-of是遍历数组的元素    
2. 原型的属性
  for-in会遍历原型的属性   
  for-of不会遍历原型的属性     
1. 数据类型
  for-in可以遍历Object类型
  for-of不可以遍历Object类型     

- for-in：一般遍历对象      
- for-of：一般遍历数组     

::: tip 注意
for-in会遍历原型的可枚举属性怎么解决？使用 hasOwnProperty 函数判断是否对象本身的属性
:::

```js
let i = 0;
for (const j = 7; i < 5; ++i) {
  console.log(j);
}
// 7, 7, 7, 7, 7
for (const key in {a: 1, b: 2}) {
  console.log(key);
}
// a, b
for (const value of [1,2,3,4,5]) {
  console.log(value);
}
// 1, 2, 3, 4, 5
```



### 数据类型（7种）   
ECMAScript有6种简单数据类型（也称为原始类型）: Undefined、Null、Boolean、Number、String和Symbol。Symbol（符号）是ECMAScript 6新增的。还有一种复杂数据类型叫Object（对象）。   

在对未初始化的变量调用typeof时，返回的结果是"undefined"，但对未声明的变量调用它时，返回的结果还是"undefined"。   

对于非常大或非常小的数值，浮点值可以用科学记数法来表示。科学记数法用于表示一个应该乘以10的给定次幂的数值。   
例如：
```js
let floatNum = 3.125e7; // 等于31250000

let floatNum1 = 3e-17; // 等于0.00000000000000003
```

浮点值的精确度最高可达17位小数，但在算术计算中远不如整数精确。例如，0.1加0.2得到的不是0.3，而是0.30000000000000004。
解决方法：   
1. 将其先转换成整数，再相加之后转回小数。具体做法为先乘10相加后除以10；   
2. 使用number对象的toFixed方法，toFixed方法可以指定运算结果的小数点后的指定位数的数字，使保留一位小数就是toFixed(1)；   
3. 使用es6新增的Number.EPSILON方法，这个方法表示js的最小精度，使用这个方法通常只是对0.1+0.2是否=0.3做判断，并不像前两种改变0.1+0.2的值。   

::: tip 注意  
不传底数参数相当于让parseInt()自己决定如何解析，所以为避免解析出错，建议始终传给它第二个参数。   
多数情况下解析的应该都是十进制数，此时第二个参数就要传入10。   

parseFloat()只解析十进制值，因此不能指定底数。   
:::

ECMAScript中的字符串是不可变的（immutable），意思是一旦创建，它们的值就不能变了。要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量。   

对数值调用toString()方法时，toString()可以接收一个底数参数，即以什么底数来输出数值的字符串表示。   


 #### 常用内置符号（Symbol）   
 ::: tip 注意
 在提到ECMAScript规范时，经常会引用符号在规范中的名称，前缀为@@。比如，@@iterator指的就是Symbol.iterator。
 :::
