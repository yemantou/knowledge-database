---
title: 原型
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 92
---

### [[Prototype]]：就是对于其他对象的引用  

#### Object.create(..)  
会创建一个对象并把这个对象的[[Prototype]]关联到指定的对象。   

#### Object.prototype  
所有普通的[[Prototype]]链最终都会指向内置的Object.prototype。  

#### 属性设置和屏蔽  
若属性名foo同时存在于对象和对象的[[Prototype]]链上层，就会发生屏蔽。对象里面的foo属性会屏蔽[[Prototype]]链上层的foo属性。

例：myObject.foo = "bar"。  
1. [[Prototype]]链上层存在foo属性，没有被标识为只读（writable:false）；  
   会直接在myObject中添加一个名为foo的新属性，它是屏蔽属性。  
2. [[Prototype]]链上层存在foo属性，被标记为只读（writable:false）；  
   无法修改已有属性或者在myObject上创建屏蔽属性，不会发生屏蔽。  
3. [[Prototype]]链上层存在foo属性，并且它是一个setter，那就一定会调用这个setter。  
   不会发生屏蔽，也不会重新定义foo这个setter

### .constructor属性  
.constructor属性只是Foo函数在声明时的默认属性  
```js
function Foo() {}

Foo.prototype.constructor = Foo; // true

var a = new Foo(); // a内部[[Prototype]]都会关联到Foo.prototype上
a.constructor = Foo; // true .constructor引用同样被委托给了Foo.prototype，而Foo.prototype.constructor默认指向Foo
```
如果创建了一个新对象并替换了函数默认的．prototype对象引用，那么新对象并不会自动获得.constructor属性。  
```js
function Foo() {}

Foo.prototype = {};

var a1 = new Foo();
a1.constructor = Foo; // false
a1.constructor = Object; // true
```
::: tip 提示
a1并没有．constructor属性，所以它会委托[[Prototype]]链上的Foo. prototype。但是这个对象也没有．constructor属性（不过默认的Foo.prototype对象有这个属性！），所以它会继续委托，这次会委托给委托链顶端的Object.prototype。这个对象有．constructor属性，指向内置的Object(..)函数。 
:::


### （原型）继承  
```js
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function () {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

function Fun(name, age) {
  Foo.call(this, name);
  this.age = age;
}

// Object.create(..)会凭空创建一个“新”对象并把新对象内部的[[Prototype]]关联到你指定的对象
// 创建一个新的Bar.prototype对象并关联到Foo.prototype
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.myLabel = function () {
  return this.label;
};

Fun.prototype = Object.create(Foo.prototype);

Fun.prototype.myAge = function () {
  return this.age;
};

var a = new Bar('a', 'obj a');
var b = new Fun('a', 12);

const res1 = a.myName();
const res2 = a.myLabel();

const res3 = b.myName();
const res4 = b.myAge();

console.log('a', a); // a Foo { name: 'a', label: 'obj a' }
console.log('b', b); // b Foo { name: 'a', age: 12 }
console.log('a.myName', res1); // a.myName a
console.log('a.myLabel', res2); // a.myLabel obj a
console.log('b.myName', res3); // b.myName a
console.log('b.myAge', res4); // b.myAge 12
console.log('Foo.prototype.isPrototypeOf(a)', Foo.prototype.isPrototypeOf(a)); // Foo.prototype.isPrototypeOf(a) true
console.log('Foo.prototype.isPrototypeOf(b)', Foo.prototype.isPrototypeOf(b)); // Foo.prototype.isPrototypeOf(b) true
```
::: danger 重要  
Bar.prototype = Object.create(Foo.prototype)  
创建一个新的Bar.prototype对象并把它关联到Foo.prototype。  

Bar.prototype = Foo.prototype  
并不会创建一个关联到Bar.prototype的新对象，它只是让Bar.prototype直接引用Foo.prototype对象。   

Bar.prototype = new Foo()  
使用了Foo(..)的“构造函数调用”，如果函数Foo有一些副作用（比如写日志、修改状态、注册到其他对象、给this添加数据属性，等等）的话，就会影响到Bar()的“后代”。  
:::
::: tip 检查委托关系
检查一个对象（Foo.prototype）是否存在于另一个对象（a）的原型链中：Foo.prototype.isPrototypeOf(a)。  
:::

### 对象关联  
#### 创建关联
```js
var foo = {
  something: function() {
    console.log('Tell me something good...');
  }
};

var bar = Object.create(foo);

bar.something(); // Tell me something good...
```
Object.create()的polyfill代码：Object.create(..)是在ES5中新增的函数，所以在ES5之前的环境中（比如旧IE）如果要支持这个功能的话就需要使用一段简单的polyfill代码。  
```js
if (!Object.create) {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```
::: tip polyfill代码
部分实现了Object. create(..)的功能。  
:::

### 一些原型方法  
1. obj.hasOwnProperty(prop)  
   用来判断某个对象是否含有指定的属性，会忽略掉那些从原型链上继承到的属性。  
2. in 运算符  
   可以判断某个对象是否有某个属性，包括原型链上的属性。  
3. hasPrototypeProperty   
   判断属性是否存在对象的原型上。  

### 小结   
#### prototype、__proto__与constructor  
例：  
```js
function Foo() {}; 
let f1 = new Foo();
```
1. __proto__和constructor属性是对象所独有的；prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性；函数的__proto__指向了Function.prototype；  
2. __proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链；  
3. prototype属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype；  
4. constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。  

![prototype、__proto__与constructor](@assets/img/prototype-constructor.png)