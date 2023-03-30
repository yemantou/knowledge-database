---
title: 基本引用类型
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 996
---

引用类型有时候也被称为对象定义，因为它们描述了自己的对象应有的属性和方法。    
引用类型虽然有点像类，但跟类并不是一个概念。    
对象被认为是某个特定引用类型的实例。  

::: tip 注意
函数也是一种引用类型。    
:::

### Date  
Date类型将日期保存为自协调世界时（UTC, Universal Time Coordinated）时间1970年1月1日午夜（零时）至今所经过的毫秒数。使用这种存储格式，Date类型可以精确表示1970年1月1日之前及之后285616年的日期。   


### RegExp   
表示匹配模式的标记   
- g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束    
- i：不区分大小写，表示在查找匹配时忽略pattern和字符串的大小写   
- m：多行模式，表示查找到一行文本末尾时会继续查找    
- y：粘附模式，表示只查找从lastIndex开始及之后的字符串    
- u：Unicode模式，启用Unicode匹配   
- s：dotAll模式，表示元字符．匹配任何字符（包括\n或\r）   

使用不同模式和标记可以创建出各种正则表达式，比如：   
```js
// 匹配字符串中的所有"at"
let pattern1 = /at/g;
// 匹配第一个"bat"或"cat"，忽略大小写
let pattern2 = /[bc]at/i;
// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi;
```

所有元字符在模式中必须使用反斜杠来转义，包括：    ( [ { \ ^ $ | ) ] } ? ＊ + .    

#### RegExp实例方法   
RegExp实例的主要方法是exec()，主要用于配合捕获组使用。这个方法只接收一个参数，即要应用模式的字符串。如果找到了匹配项，则返回包含第一个匹配信息的数组；如果没找到匹配项，则返回null。返回的数组虽然是Array的实例，但包含两个额外的属性：index和input。index是字符串中匹配模式的起始位置，input是要查找的字符串。这个数组的第一个元素是匹配整个模式的字符串，其他元素是与表达式中的捕获组匹配的字符串。如果模式中没有捕获组，则数组只包含一个元素。例：    
```js
let text = "mom and dad and baby";
let pattern = /mom( and dad( and baby)? )? /gi;
let matches = pattern.exec(text);
console.log(matches.index);    // 0
console.log(matches.input);    // "mom and dad and baby"
console.log(matches[0]);        // "mom and dad and baby"
console.log(matches[1]);        // " and dad and baby"
console.log(matches[2]);        // " and baby"
```     

正则表达式的另一个方法是test(，接收一个字符串参数。如果输入的文本与模式匹配，则参数返回true，否则返回false。这个方法适用于只想测试模式是否匹配，而不需要实际匹配内容的情况。test()经常用在if语句中：    
```js
let text = "000-00-0000";
let pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)) {
  console.log("The pattern was matched.");
}
```
::: tip 注意
正则表达式的valueOf()方法返回正则表达式本身。   
:::



### 原始值包装类型   
为了方便操作原始值，ECMAScript提供了3种特殊的引用类型：Boolean、Number和String。   
例：
```js
let s1 = "some text";
let s2 = s1.substring(2);
```
后台会执行以下3步：
1. 创建一个String类型的实例；    
2. 调用实例上的特定方法；   
3. 销毁实例。    
这三步用代码表示为：   
```js
let s1 = new String("some text");
let s2 = s1.substring(2);
s1 = null;
```

::: danger 注意
引用类型与原始值包装类型的主要区别在于对象的生命周期。在通过new实例化引用类型后，得到的实例会在离开作用域时被销毁，而自动创建的原始值包装对象则只存在于访问它的那行代码执行期间。这意味着不能在运行时给原始值添加属性和方法。   
:::

Object构造函数作为一个工厂方法，能够根据传入值的类型返回相应原始值包装类型的实例。比如：    
```js
let obj = new Object("some text");
console.log(obj instanceof String);   // true
```
如果传给Object的是字符串，则会创建一个String的实例。如果是数值，则会创建Number的实例。布尔值则会得到Boolean的实例。    

注意，使用new调用原始值包装类型的构造函数，与调用同名的转型函数并不一样。例如：   
```js
let value = "25";
let number = Number(value);     // 转型函数
console.log(typeof number);     // "number"
let obj = new Number(value);    // 构造函数
console.log(typeof obj);         // "object"
```

::: danger 注意
所有对象在布尔表达式中都会自动转换为true   
:::

::: tip 注意
toPrecision()方法会根据数值和精度来决定调用toFixed()还是toExponential()
:::

IEEE 754数值格式有一个特殊的数值范围，在这个范围内二进制值可以表示一个整数值。这个数值范围从Number.MIN_SAFE_INTEGER（-2^53+ 1）到Number.MAX_SAFE_INTEGER（2^53-1）。  
 
鉴别整数是否在这个范围内，可以使用Number.isSafeInteger()方法：
```js
console.log(Number.isSafeInteger(-1 * (2 ** 53)));        // false
console.log(Number.isSafeInteger(-1 * (2 * 53) + 1));   // true
console.log(Number.isSafeInteger(2 ** 53));                // false
console.log(Number.isSafeInteger((2 ** 53) -1));         // true
```

JavaScript字符串使用了两种Unicode编码混合的策略：UCS-2和UTF-16。   
::: tip 注意
要深入了解关于字符编码的内容，推荐Joel Spolsky写的博客文章：“The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses! )”。     
另一个有用的资源是Mathias Bynens的博文：“JavaScript's Internal Character Encoding: UCS-2 or UTF-16? ”。
:::

字符串迭代与解构，字符串的原型上暴露了一个@@iterator方法，表示可以迭代字符串的每个字符。可以像下面这样手动使用迭代器：   
```js
let message = "abc";
let stringIterator = message[Symbol.iterator]();
console.log(stringIterator.next());   // {value: "a", done: false}
console.log(stringIterator.next());   // {value: "b", done: false}
console.log(stringIterator.next());   // {value: "c", done: false}
console.log(stringIterator.next());   // {value: undefined, done: true}
```
在for-of循环中可以通过这个迭代器按序访问每个字符：   
```js
for (const c of "abcde") {
  console.log(c);
}
// a
// b
// c
// d
// e
```
有了这个迭代器之后，字符串就可以通过解构操作符来解构了。比如，可以更方便地把字符串分割为字符数组：   
```js
let message = "abcde";
console.log([...message]); // ["a", "b", "c", "d", "e"]
```


### 单例内置对象   
ECMA-262对内置对象的定义是“任何由ECMAScript实现提供、与宿主环境无关，并在ECMAScript程序开始执行时就存在的对象”。  
Object、Array、String、Global和Math    