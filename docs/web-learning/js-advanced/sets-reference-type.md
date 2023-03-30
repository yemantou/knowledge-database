---
title: 集合引用类型
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 995
---

### Object    

### Array     
Array构造函数还有两个ES6新增的用于创建数组的静态方法：from()和of()。from()用于将类数组结构转换为数组实例，而of()用于将一组参数转换为数组实例。     

Array.from()的第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个length属性和可索引元素的结构。这种方式可用于很多场合：    
```js
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"]
// 可以使用from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2)
                    .set(3, 4);
const s = new Set().add(1)
                    .add(2)
                    .add(3)
                    .add(4);
console.log(Array.from(m)); // [[1, 2], [3, 4]]
console.log(Array.from(s)); // [1, 2, 3, 4]
// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);
console.log(a1);          // [1, 2, 3, 4]
alert(a1 === a2); // false
// 可以使用任何可迭代对象
const iter = {
  ＊[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }
};
console.log(Array.from(iter)); // [1, 2, 3, 4]
// arguments对象可以被轻松地转换为数组
function getArgsArray() {
  return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4]
// from()也能转换带有必要属性的自定义对象
const arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4
};
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]
```
Array.from()还接收第二个可选的映射函数参数。还可以接收第三个可选参数，用于指定映射函数中this的值。但这个重写的this值在箭头函数中不适用。    

Array.of()可以把一组参数转换为数组。   
```js
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
console.log(Array.of(undefined));   // [undefined]
```

::: tip 注意
数组最多可以包含4294967295个元素，这对于大多数编程任务应该足够了。如果尝试添加更多项，则会导致抛出错误。以这个最大值作为初始值创建数组，可能导致脚本运行时间过长的错误。
:::

#### 栈方法    
数组对象可以像栈一样，也就是一种限制插入和删除项的数据结构。栈是一种后进先出（LIFO, Last-In-First-Out）的结构。    
ECMAScript数组提供了push()和pop()方法，以实现类似栈的行为，push()方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度。pop()方法则用于删除数组的最后一项，同时减少数组的length值，返回被删除的项。    

#### 队列方法   
队列以先进先出（FIFO, First-In-First-Out）形式限制访问。队列在列表末尾添加数据，但从列表开头获取数据。   
使用shift()和push()，可以把数组当成队列来使用。shift()，它会删除数组的第一项并返回它，然后数组长度减1。   

unshift()就是执行跟shift()相反的操作：在数组开头添加任意多个值，然后返回新的数组长度。通过使用unshift()和pop()，可以在相反方向上模拟队列，即在数组开头添加新数据，在数组末尾取得数据。    

#### 排序方法   
everse()和sort()，reverse()方法就是将数组元素反向排列。     
sort()会按照升序重新排列数组元素，即最小的值在前面，最大的值在后面。为此，sort()会在每一项上调用String()转型函数，然后比较字符串来决定顺序。即使数组的元素都是数值，也会先把数组转换为字符串再比较、排序。    

sort()方法可以接收一个比较函数，用于判断哪个值应该排在前面。比较函数接收两个参数，如果第一个参数应该排在第二个参数前面，就返回负值；如果两个参数相等，就返回0；如果第一个参数应该排在第二个参数后面，就返回正值。   

::: tip 注意
reverse()和sort()都返回调用它们的数组的引用。
:::


### 定型数组   


### Map   
set()方法返回映射实例，因此可以把多个操作连缀起来，包括初始化声明：   
```js
const m = new Map().set("key1", "val1");
m.set("key2", "val2")
  .set("key3", "val3");
alert(m.size); // 3
```


### WeakMap     
弱映射中的键只能是Object或者继承自Object的类型，尝试使用非对象设置键会抛出TypeError。值的类型没有限制。   

Map与WeakMap最重要的区别是，WeakMap 不会阻止在没有对键的引用时对键进行垃圾收集。    
WeakMap中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用，不会阻止垃圾回收。但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。只要键存在，键/值对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。    

不可迭代键：   
WeakMap中的键/值对任何时候都可能被销毁，所以没必要提供迭代其键/值对的能力。当然，也用不着像clear()这样一次性销毁所有键/值的方法。    

#### WeakMap的使用   
1. 私有变量
   弱映射造就了在JavaScript中实现真正私有变量的一种新方式。前提很明确：私有变量会存储在弱映射中，以对象实例为键，以私有成员的字典为值。      
2. DOM节点元数据
   WeakMap实例不会妨碍垃圾回收，所以非常适合保存关联元数据。例：
   ```js
   const m = new Map();
    const loginButton = document.querySelector('#login');
    // 给这个节点关联一些元数据
    m.set(loginButton, {disabled: true});
   ```   
   在上面的代码执行后，页面被JavaScript改变了，原来的登录按钮从DOM树中被删掉了。但由于映射中还保存着按钮的引用，所以对应的DOM节点仍然会逗留在内存中，除非明确将其从映射中删除或者等到映射本身被销毁。


### Set   
Set和Map区别
1. Map是键值对，Set是值的集合
2. Set没有get方法
3. Set的值是唯一的可以做数组去重


### WeakSet   
不会阻止在没有引用时对值进行垃圾收集。     

#### 使用弱集合   
例：
```js
const disabledElements = new Set();
const loginButton = document.querySelector('#login');
// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton);
```
上面的例子中，通过查询元素在不在disabledElements中，就可以知道它是不是被禁用了。不过，假如元素从DOM树中被删除了，它的引用却仍然保存在Set中，因此垃圾回收程序也不能回收它。     

为了让垃圾回收程序回收元素的内存，可以在这里使用WeakSet：
```js
const disabledElements = new WeakSet();
const loginButton = document.querySelector('#login');
// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton);
```  
这样，只要WeakSet中任何元素从DOM树中被删除，垃圾回收程序就可以忽略其存在，而立即释放其内存（假设没有其他地方引用这个对象）。


### 迭代与扩展操作   
有4种原生集合类型定义了默认迭代器，都支持顺序迭代，都可以传入for-of循环；都兼容扩展操作符。扩展操作符在对可迭代对象执行浅复制时特别有用，只需简单的语法就可以复制整个对象：   
1. Array   
2. 所有定型数组   
3. Map   
4. Set  

这些类型都支持多种构建方法，比如Array.of()和Array.from()静态方法。在与扩展操作符一起使用时，可以非常方便地实现互操作：    
```js
let arr1 = [1, 2, 3];
// 把数组复制到定型数组
let typedArr1 = Int16Array.of(...arr1);
let typedArr2 = Int16Array.from(arr1);
console.log(typedArr1);    // Int16Array [1, 2, 3]
console.log(typedArr2);    // Int16Array [1, 2, 3]
// 把数组复制到映射
let map = new Map(arr1.map((x) => [x, 'val' + x]));
console.log(map);    // Map {1 => 'val 1', 2 => 'val 2', 3 => 'val 3'}
// 把数组复制到集合
let set = new Set(typedArr2);
console.log(set);    // Set {1, 2, 3}
// 把集合复制回数组
let arr2 = [...set];
console.log(arr2);   // [1, 2, 3]
```    


### 小结    
1. 引用类型与传统面向对象编程语言中的类相似，但实现不同。   
2. Object类型是一个基础类型，所有引用类型都从它继承了基本的行为。      
3. Array类型表示一组有序的值，并提供了操作和转换值的能力。   
4. 定型数组包含一套不同的引用类型，用于管理数值在内存中的类型。    
5. Date类型提供了关于日期和时间的信息，包括当前日期和时间以及计算。   
6. RegExp类型是ECMAScript支持的正则表达式的接口，提供了大多数基本正则表达式以及一些高级正则表达式的能力。   