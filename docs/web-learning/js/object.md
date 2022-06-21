---
title: 对象
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 94
---

### JS六种语言类型
string，number，boolean，null，undefined，object  

### 内置对象
String，Number，Boolean，Object，Function，Array，Date，RegExp，Error  

### 属性描述符
- 从ES5开始，所有的属性都具备了属性描述符。  
  ```js
  var myObject = {
    a: 2
  };

  const res = Object.getOwnPropertyDescriptor(myObject, 'a');
  console.log(res);
  // {
  //   value: 2,
  //   writable: true,
  //   enumerable: true,
  //   configurable: true
  // }
  ```
- 新建一个属性或者修改一个已有属性（如果它是configurable）。  
  ```js
  var myObject = {};

  Object.defineProperty(myObject, 'a', {
    value:2,
    writable: true,
    enumerable: true,
    configurable: true
  });

  console.log(myObject);
  // { a: 2 }
  ```
### 不变性  
- 对象常量；
  结合writable:false和configurable:false就可以创建一个真正的常量属性（不可修改、重定义或者删除）。  
- 禁止扩展；
  禁止一个对象添加新属性并且保留已有属性，可以使用Object.preventExtensions(..)。  
- 密封；  
  Object.seal(..)会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用Object.preventExtensions(..)并把所有现有属性标记为configurable:false。不能添加新属性；不能重新配置或者删除任何现有属性；可以修改属性的值。  
- 冻结；  
  Object.freeze(..)会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..)并把所有“数据访问”属性标记为writable:false，这样就无法修改它们的值。这个对象引用的其他对象是不受影响的。  
  ::: tip “深度冻结”一个对象  
  遍历它引用的所有对象并在这些对象上调用Object.freeze(..)。但可能会在无意中冻结其他（共享）对象。  
  :::

### [[Get]]  
#### 例：myObject.a
实际上是在myObject上实现了[[Get]]操作（有点像函数调用：\[[Get]]()）。  
1. 首先在对象中查找是否有名称相同的属性；  
2. 找到就会返回这个属性的值；  
3. 没有找到名称相同的属性，遍历可能存在的[[Prototype]]链，也就是原型链；  
4. 属性不存在，那[[Get]]操作会返回值undefined。  

### [[Put]]  

#### [[Put]]被触发时，实际的行为取决于许多因素
最重要的因素：对象中是否已经存在这个属性
- 已经存在；  
  1. 属性是否是访问描述符？是并且存在setter就调用setter；  
  2. 属性的数据描述符中writable是否是false？如果是，在非严格模式下静默失败，在严格模式下抛出TypeError异常；  
  3. 如果都不是，将该值设置为属性的值。  
- 不存在。  
  [[Put]]操作会更加复杂，与[[Prototype]]有关。  

### Getter和Setter
setter会覆盖单个属性默认的[[Put]]（也被称为赋值）操作。  

### 存在性  
- in操作符会检查属性是否在对象及其[[Prototype]]原型链中；  
- hasOwnProperty(..)只会检查属性是否在myObject对象中，不会检查[[Prototype]]链；  
- propertyIsEnumerable(..)会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足enumerable:true；  
- Object.keys(..)会返回一个数组，包含所有可枚举属性（不包括原型链上属性）；  
- Object.getOwnPropertyNames(..)会返回一个数组，包含所有属性，无论它们是否可枚举（不包括原型链上属性）； 

### 遍历 
普通的对象没有内置的@@iterator，无法自动完成for..of遍历（为了避免影响未来的对象类型）。   
给对象定义@@iterator：  
```js
var myObject = {
  a: 2,
  b: 3,
  c: 4
}

// Symbol.iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。
Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: true,
  writable: true,
  configurable: true,
  value: function() {
    var o = this
    var idx = 0
    var ks = Object.keys(o)
    return {
      next: function() {
        return {
          value: { key: ks[idx], value: o[ks[idx++]] }, // idx++是先赋值给idx后++
          done: idx > ks.length
        };
      }
    };
  }
});

// 手动遍历
var obj = myObject[Symbol.iterator]();
const res = obj.next();
const res1 = obj.next();
const res2 = obj.next();
const res3 = obj.next();
console.log(res);
console.log(res1);
console.log(res2);
console.log(res3);

// for...of遍历
for (var value of myObject) {
  console.log(value);
}


// { value: { key: 'a', value: 2 }, done: false }
// { value: { key: 'b', value: 3 }, done: false }
// { value: { key: 'c', value: 4 }, done: false }
// { value: { key: undefined, value: undefined }, done: true }
// { key: 'a', value: 2 }
// { key: 'b', value: 3 }
// { key: 'c', value: 4 }
```
