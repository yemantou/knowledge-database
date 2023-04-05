---
title: JS数据类型
autoGroup-1: JS
sidebarDepth: 0
autoSort: 997
---

# 数据类型


## 基本的数据类型介绍，及值类型和引用类型的理解
::: tip 建议阅读文章
[你真的掌握变量和类型了吗](https://juejin.cn/post/6844903854882947080)
:::

在 JS 中共有 8  种基础的数据类型，分别为： Undefined 、 Null 、 Boolean 、 Number 、 String 、 Object 、 Symbol 、 BigInt 。
其中 Symbol  和 BigInt  是 ES6 新增的数据类型，可能会被单独问：    
- Symbol 代表独一无二的值，最大的用法是用来定义对象的唯一属性名。   
- BigInt 可以表示任意大小的整数。    

**内存空间被分为两种，栈内存与堆内存。**      

**栈内存：**    
- 存储的值大小固定
- 空间较小
- 可以直接操作其保存的变量，运行效率高
- 由系统自动分配存储空间   

JavaScript中的原始类型的值被直接存储在栈中，在变量定义时，栈就为其分配好了内存空间。        

**堆内存：**     
- 存储的值大小不定，可动态调整
- 空间较大，运行效率低
- 无法直接操作其内部存储，使用引用地址读取
- 通过代码进行分配空间     
 
习惯把对象称为引用类型，引用类型的值实际存储在堆内存中，它在栈中只存储了一个固定长度的地址，这个地址指向堆内存中的值。    

**一道经典的面试题，如何让：a == 1 && a == 2 && a == 3。**       
```js
const a = {
   value:[3,2,1],
   valueOf: function () {return this.value.pop(); },
} 
```


## 数据类型的判断
- typeof：能判断所有值类型，函数。不可对 null、对象、数组进行精确判断，因为都返回 object 。
  ```js
  console.log(typeof undefined); // undefined
  console.log(typeof 2); // number
  console.log(typeof true); // boolean
  console.log(typeof "str"); // string
  console.log(typeof Symbol("foo")); // symbol
  console.log(typeof 2172141653n); // bigint
  console.log(typeof function () {}); // function
  // 不能判别
  console.log(typeof []); // object
  console.log(typeof {}); // object
  console.log(typeof null); // object
  ```
- instanceof：能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。  
  ```js
  console.log({} instanceof Object); // true
  ``` 
- Object.prototype.toString.call()：所有基础数据类型都是能判断的，还有 Error 对象，Date 对象等。   

**如何判断变量是否为数组？**        
```js
Array.isArray(arr); // true
arr.__proto__ === Array.prototype; // true
arr instanceof Array; // true
Object.prototype.toString.call(arr); // "[object Array]"
```


## 手写深拷贝
::: tip 参考文章
[如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)
:::

**最完美的深拷贝：**    
```js
// 使用Map记录已经被拷贝的变量，解决循环引用（对象内部直接或间接引用自身）
// 使用WeakMap不阻止垃圾回收

// 可遍历类型
const mapTag = '[object Map]'; // 引用类型
const setTag = '[object Set]'; // 引用类型
const arrayTag = '[object Array]'; // 引用类型
const objectTag = '[object Object]'; // 引用类型
const argsTag = '[object Arguments]'; // 引用类型

// 不可遍历类型
const undefinedTag = '[object Null]';
const nullTag = '[object Undefined]';
const boolTag = '[object Boolean]';
const dateTag = '[object Date]'; // 引用类型
const errorTag = '[object Error]'; // 引用类型
const numberTag = '[object Number]';
// const regexpTag = '[object RegExp]'; // 引用类型
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const funcTag = '[object Function]'; // 引用类型


// 可遍历类型数组
const iterableTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 获取数据类型
function getDataType(target) {
  return Object.prototype.toString.call(target);
};

// 初始化（解决拷贝引用对象问题，先初始化为其对应的；类型数据）
function getDataInit(target) {
  const constructor = target.constructor;
  return new constructor();
};

// 判断是否引用类型
function isObject(value) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

// 数组和对象通用while循环，比使用for in效率要高很多倍
function forEach(array, callback) {
  if (getDataType(array) !== arrayTag && getDataType(array) !== objectTag) {
    throw new Error('array not Array or Object');
  }
  let index = 0;
  while (index < array.length) {
    callback(array[index], index);
    index++;
  }
  return array
};

// 拷贝函数（无意义，两个对象使用一个在内存中处于同一个地址的函数是没有任何问题的，但可用来复习基础知识）
function cloneFunction(func) {
  const funcString = deepClone.toString();
  const paramString = funcString.substring(funcString.indexOf('(') + 1, funcString.indexOf(') {')) // 函数的参数
  const bodyString = funcString.substring(funcString.indexOf('{') + 1, funcString.lastIndexOf('}')) // 函数的内容

  // 普通函数有原型属性，箭头函数没有
  if (func.prototype) {
    if (paramString) {
      const paramArr = paramString.split(',');
      return new Function(...paramArr, bodyString)
    } else {
      return new Function(bodyString)
    }
  } else {
    return eval(funcString) // 危险
  }
};

// 拷贝不可遍历的引用类型
function cloneOtherType(target, type) {
  let val = null
  switch (type) {
    case dateTag:
      val = new Date(target);
      break
    case funcTag:
      val = cloneFunction(target);
      break
  }
  return val;
};

// WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不该将该引用考虑在内。
// 因此，只要所引用的对象其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
// 也就是说，一旦不再需要，WeakMap里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
function deepClone(target, map = new WeakMap()) {
  // 不是引用类型直接返回
  if (!isObject(target)) {
    return target
  }

  let dataType = getDataType(target);
  let cloneTarget;
  // 初始化可以遍历的类型，拷贝不可遍历的类型
  if (iterableTag.includes(dataType)) {
    cloneTarget = getDataInit(target);
  } else {
    return cloneOtherType(target, dataType);
  }

  // 处理循环引用
  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget)

  // 处理对象和数组
  if (dataType === objectTag || dataType === arrayTag) {
    const keys = (dataType === arrayTag) ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = deepClone(target[key], map);
    })
    return cloneTarget;
  }

  // 处理Map
  if (dataType === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map)) // Map的value也可能是引用类型
    });
    return cloneTarget;
  }

  // 处理Set
  if (dataType === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepClone(value, map)) // Set的value也可能是引用类型
    });
    return cloneTarget;
  }

  return cloneTarget;
};
```


## 根据 0.1+0.2 ! == 0.3，讲讲 IEEE 754 ，如何让其相等？
::: tip 参考文章
[硬核基础二进制篇（一）0.1 + 0.2 != 0.3 和 IEEE-754 标准](https://juejin.cn/post/6940405970954616839)
:::

原因总结：
- 进制转换 ：js 在做数字计算的时候，0.1 和 0.2 都会被转成二进制后无限循环 ，但是 js 采用的 IEEE 754 二进制浮点运算，最大可以存储 53 位有效数字，于是大于 53 位后面的会全部截掉，将导致精度丢失。
- 对阶运算 ：由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移（0舍1入），尾数位移时可能会发生数丢失的情况，影响精度。   

解决办法：
1. 转为整数（大数）运算，乘以10 * 小数位数。
2. 使用三方库，Math.js、big.js等。   
3. 转成字符串，对字符串做加法运算。（整数小数分为两个部分进行计算）。   