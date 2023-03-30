---
title: 继承
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 992
---

## 继承
很多面向对象语言都支持两种继承：接口继承和实现继承。前者只继承方法签名，后者继承实际的方法。接口继承在ECMAScript中是不可能的，因为函数没有签名。**实现继承是ECMAScript唯一支持的继承方式，而这主要是通过原型链实现的。**


### 原型链
如果原型是另一个类型的实例，那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。这就是原型链的基本构想。    
实现原型链涉及如下代码模式：
```js
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function() {
  return this.property;
};
function SubType() {
  this.subproperty = false;
}
// 继承SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};
let instance = new SubType();
console.log(instance.getSuperValue()); // true
```
上面原型链代码图解：   
![图示](@assets/img/inherit.png)

#### 默认原型
默认情况下，所有引用类型都继承自Object，这也是通过原型链实现的。    
上面例子的完整的原型链： 
![图示](@assets/img/default-prototype.png)    

#### 原型与继承关系
1. instanceof操作符，如果一个实例的原型链中出现过相应的构造函数，则instanceof返回true。   
   ```js
   console.log(instance instanceof Object);      // true
   console.log(instance instanceof SuperType);   // true
   console.log(instance instanceof SubType);     // true
   ```
2. 使用isPrototypeOf()方法。原型链中的每个原型都可以调用这个方法，如下例所示，只要原型链中包含这个原型，这个方法就返回true。  
   ```js
   console.log(Object.prototype.isPrototypeOf(instance));      // true
   console.log(SuperType.prototype.isPrototypeOf(instance));   // true
   console.log(SubType.prototype.isPrototypeOf(instance));     // true
   ```

#### 原型链的问题
1. 主要问题出现在原型中包含引用值的时候，原型中包含的引用值会在所有实例间共享。下面例子揭示问题：
   ```js
   function SuperType() {
    this.colors = ["red", "blue", "green"];
   }
   function SubType() {}
   // 继承SuperType
   SubType.prototype = new SuperType();
   let instance1 = new SubType();
   instance1.colors.push("black");
   console.log(instance1.colors); // "red, blue, green, black"
   let instance2 = new SubType();
   console.log(instance2.colors); // "red, blue, green, black"
   ```
2. 子类型在实例化时不能给父类型的构造函数传参。       
   
**事实上，我们无法在不影响所有对象实例的情况下把参数传进父类的构造函数。再加上之前提到的原型中包含引用值的问题，就导致原型链基本不会被单独使用。**    


### 盗用构造函数
为了解决原型包含引用值导致的继承问题，一种叫作“盗用构造函数”（constructor stealing）的技术在开发社区流行起来（这种技术有时也称作“对象伪装”或“经典继承”）。基本思路很简单：在子类构造函数中调用父类构造函数。       
函数就是在特定上下文中执行代码的简单对象，所以可以使用apply()和call()方法以新创建的对象为上下文执行构造函数。例：     
```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}
function SubType() {
  //继承SuperType
  SuperType.call(this);
}
let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // "red, blue, green, black"
let instance2 = new SubType();
console.log(instance2.colors); // "red, blue, green"
```
1. 传递参数，相比于使用原型链，盗用构造函数的一个优点就是可以在子类构造函数中向父类构造函数传参。   
2. 盗用构造函数的问题：
   盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。由于存在这些问题，盗用构造函数基本上也不能单独使用。   


### 组合继承（伪经典继承）
组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。例：       
```js
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age){
  // 继承属性
  SuperType.call(this, name);
  this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
  console.log(this.age);
};
let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);   // "red, blue, green, black"
instance1.sayName();               // "Nicholas";
instance1.sayAge();                // 29
let instance2 = new SubType("Greg", 27);
console.log(instance2.colors);   // "red, blue, green"
instance2.sayName();               // "Greg";
instance2.sayAge();                // 27
```
在上面的代码执行后，SubType.prototype上会有两个属性：name和colors。它们都是SuperType的实例属性，但现在成为了SubType的原型属性。在调用SubType构造函数时，也会调用SuperType构造函数，这一次会在新对象上创建实例属性name和colors。这两个实例属性会遮蔽原型上同名的属性。     
**组合继承弥补了原型链和盗用构造函数的不足，是JavaScript中使用最多的继承模式。而且组合继承也保留了instanceof操作符和isPrototypeOf()方法识别合成对象的能力。**     


### 原型式继承
Crockford推荐的原型式继承，即使不自定义类型也可以通过原型实现对象之间的信息共享。
```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

ECMAScript 5通过增加Object.create()方法将原型式继承的概念规范化了。在只有一个参数时，Object.create()与这里的object()方法效果相同。Object.create() 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）。          
Object.create()的第二个参数每个新增属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。       
```js
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = Object.create(person, {
  name: {
    value: "Greg"
  }
});
console.log(anotherPerson.name);   // "Greg"
```
**原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住，属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。**      


### 寄生式继承（与原型式继承比较接近）
创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。基本的寄生继承模式如下：     
```js
function createAnother(original){
  let clone = object(original);   // 通过调用函数创建一个新对象
  clone.sayHi = function() {      // 以某种方式增强这个对象
    console.log("hi");
  };
  return clone;              // 返回这个对象
}
```
可以像下面这样使用createAnother()函数：   
```js
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi();   // "hi"
```
寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。object()函数不是寄生式继承所必需的，任何返回新对象的函数都可以在这里使用。**通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。**      


### 寄生式组合继承
组合继承其实也存在效率问题。最主要的效率问题就是父类构造函数始终会被调用两次：一次在是创建子类原型时调用，另一次是在子类构造函数中调用。本质上，子类原型最终是要包含超类对象的所有实例属性，子类构造函数只要在执行时重写自己的原型就行了。     

寄生式组合继承通过盗用构造函数继承属性，但使用混合式原型链继承方法。基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本。说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。寄生式组合继承的基本模式如下所示：   
```js
function inheritPrototype(subType, superType) {
  let prototype = Object.create(superType.prototype);   // 创建对象，object() 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）。
  prototype.constructor = subType;                  // 增强对象，解决由于重写原型导致默认constructor丢失的问题
  subType.prototype = prototype;                    // 赋值对象
}
```
调用inheritPrototype**实现寄生式组合继承**：     
```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function() {
  console.log(this.age);
};
```
只调用了一次SuperType构造函数，避免了SubType.prototype上不必要也用不到的属性，因此可以说这个例子的效率更高。而且，原型链仍然保持不变，因此instanceof操作符和isPrototypeOf()方法正常有效。**寄生式组合继承可以算是引用类型继承的最佳模式。**    







