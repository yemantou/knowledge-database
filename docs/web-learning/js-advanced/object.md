---
title: 对象
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 993
---

### 对象
1. 数据属性
   - [[Configurable]]：表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特性都是true   
   - [[Enumerable]]：表示属性是否可以通过for-in循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是true     
   - [[Writable]]：表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的这个特性都是true    
   - [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性的默认值为undefined      
   使用Object.defineProperty()方法可以修改数据属性：   
   ```js
   let person = {};
   Object.defineProperty(person, "name", {
     writable: false,
     value: "Nicholas"
   });
   console.log(person.name); // "Nicholas"
   person.name = "Greg";
   console.log(person.name); // "Nicholas"
   ```
   ::: tip 注意
   把configurable设置为false，一个属性被定义为不可配置之后，就不能再变回可配置的了。再次调用Object.defineProperty()并修改任何非writable属性会导致错误。
   :::
2. 访问器属性
   - [[Configurable]]：表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改为数据属性。默认情况下，所有直接定义在对象上的属性的这个特性都是true
   - [[Enumerable]]：表示属性是否可以通过for-in循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是true
   - [[Get]]：获取函数，在读取属性时调用。默认值为undefined
   - [[Set]]：设置函数，在写入属性时调用。默认值为undefined
   访问器属性是不能直接定义的，必须使用Object.defineProperty()

在一个对象上同时定义多个属性，使用Object.define-Properties()方法。例：   
```js
let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get() {
      return this.year_;
    },
    set(newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue -2017;
      }
    }
  }
});
```

#### 读取属性的特性  
使用Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。这个方法接收两个参数：属性所在的对象和要取得其描述符的属性名。   
ECMAScript 2017新增了Object.getOwnPropertyDescriptors()静态方法。这个方法实际上会在每个自有属性上调用Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。     

#### 合并对象
Object.assign在赋值期间出错，则操作会中止并退出，同时抛出错误。Object.assign()没有“回滚”之前赋值的概念，因此它是一个尽力而为、可能只会完成部分复制的方法。    

#### 对象标识及相等判定
ECMAScript 6之前，有些特殊情况即使是===操作符也无能为力：    
```js
// 这些是===符合预期的情况
console.log(true === 1);   // false
console.log({} === {});    // false
console.log("2" === 2);    // false
// 这些情况在不同JavaScript引擎中表现不同，但仍被认为相等
console.log(+0 === -0);    // true
console.log(+0 === 0);     // true
console.log(-0 === 0);     // true
// 要确定NaN的相等性，必须使用极为讨厌的isNaN()
console.log(NaN === NaN); // false
console.log(isNaN(NaN));   // true
```
为改善这类情况，ECMAScript 6规范新增了Object.is()，这个方法与===很像，但同时也考虑到了上述边界情形。这个方法必须接收两个参数：   
```js
console.log(Object.is(true, 1));   // false
console.log(Object.is({}, {}));    // false
console.log(Object.is("2", 2));    // false
// 正确的0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0));    // false
console.log(Object.is(+0, 0));     // true
console.log(Object.is(-0, 0));     // false
// 正确的NaN相等判定
console.log(Object.is(NaN, NaN)); // true
```



### 创建对象

#### 工厂模式
```js
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```

#### 构造函数模式 
```js
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName();   // Nicholas
person2.sayName();   // Greg
```
::: tip 注意
注意函数名Person的首字母大写。按照惯例，构造函数名称的首字母都是要大写的，非构造函数则以小写字母开头。
:::
构造函数模式与工厂模式的区别：    
- 没有显式地创建对象。
- 属性和方法直接赋值给了this。
- 没有return。

要创建Person的实例，应使用new操作符。以这种方式调用构造函数会执行如下操作：    
- 在内存中创建一个新对象。
- 这个新对象内部的[[Prototype]]特性被赋值为构造函数的prototype属性。   
- 构造函数内部的this被赋值为这个新对象（即this指向新对象）。
- 执行构造函数内部的代码（给新对象添加属性）。
- 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

上一个例子的最后，person1和person2分别保存着Person的不同实例。这两个对象都有一个constructor属性指向Person，如下所示：   
```js
console.log(person1.constructor == Person);   // true
console.log(person2.constructor == Person);   // true
```
constructor本来是用于标识对象类型的。不过，一般认为instanceof操作符是确定对象类型更可靠的方式：  
```js
console.log(person1 instanceof Object);   // true
console.log(person1 instanceof Person);   // true
console.log(person2 instanceof Object);   // true
console.log(person2 instanceof Person);   // true
```

::: tip 注意
造函数模式相比于工厂模式的好处是：定义自定义构造函数可以确保实例被标识为特定类型。
:::

1. **构造函数也是函数**  
   构造函数与普通函数唯一的区别就是调用方式不同。任何函数只要使用new操作符调用就是构造函数，而不使用new操作符调用的函数就是普通函数。   
2. **构造函数的问题**
   主要问题在于，其定义的方法会在每个实例上都创建一遍。以这种方式创建函数会带来不同的作用域链和标识符解析，因此不同实例上的函数虽然同名却不相等，如下所示：    
   ```js
   console.log(person1.sayName == person2.sayName); // false
   ``` 
   因为都是做一样的事，所以没必要定义两个不同的Function实例。况且，this对象可以把函数与对象的绑定推迟到运行时。[点击跳转到关于this的用法。](../../note/web/this-object.md)     
   要解决这个问题，可以把函数定义转移到构造函数外部：   
   ```js
   function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
   }
   function sayName() {
    console.log(this.name);
   }
   let person1 = new Person("Nicholas", 29, "Software Engineer");
   let person2 = new Person("Greg", 27, "Doctor");
   person1.sayName();   // Nicholas
   person2.sayName();   // Greg
   ```
   这样虽然解决了相同逻辑的函数重复定义的问题，但全局作用域也因此被搞乱了，因为那个函数实际上只能在一个对象上调用。如果这个对象需要多个方法，那么就要在全局作用域中定义多个函数。这会导致自定义类型引用的代码不能很好地聚集一起。这个新问题可以通过原型模式来解决。    

#### 原型模式
每个函数都会创建一个prototype属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。实际上，这个对象就是通过调用构造函数创建的对象的原型。    
使用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型，如下所示：    
```js
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
  console.log(this.name);
};
let person1 = new Person();
person1.sayName(); // "Nicholas"
let person2 = new Person();
person2.sayName(); // "Nicholas"
console.log(person1.sayName == person2.sayName); // true
```

**理解原型**    
无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个prototype属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为constructor的属性，指回与之关联的构造函数。   
脚本中没有访问这个[[Prototype]]特性的标准方式，但Firefox、Safari和Chrome会在每个对象上暴露__proto__属性，通过这个属性可以访问对象的原型。    
**实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有。**         
通过下面的代码来理解原型的行为：     
```js
/**
  * 构造函数可以是函数表达式
  * 也可以是函数声明，因此以下两种形式都可以：
  *    function Person() {}
  *    let Person = function() {}
  */
function Person() {}
/**
  * 声明之后，构造函数就有了一个
  * 与之关联的原型对象：
  */
console.log(typeof Person.prototype);
console.log(Person.prototype);
// {
//    constructor: f Person(),
//    __proto__: Object
// }
/**
  * 如前所述，构造函数有一个prototype属性
  * 引用其原型对象，而这个原型对象也有一个
  * constructor属性，引用这个构造函数
  * 换句话说，两者循环引用：
  */
console.log(Person.prototype.constructor === Person); // true
/**
  * 正常的原型链都会终止于Object的原型对象
  * Object原型的原型是null
  */
console.log(Person.prototype.__proto__ === Object.prototype);    // true
console.log(Person.prototype.__proto__.constructor === Object); // true
console.log(Person.prototype.__proto__.__proto__ === null);      // true
console.log(Person.prototype.__proto__);
// {
//    constructor: f Object(),
//    toString: ...
//    hasOwnProperty: ...
//    isPrototypeOf: ...
//    ...
// }
let person1 = new Person(),
    person2 = new Person();
/**
  * 构造函数、原型对象和实例
  * 是3 个完全不同的对象：
  */
console.log(person1 ! == Person);              // true
console.log(person1 ! == Person.prototype); // true
console.log(Person.prototype ! == Person);   // true
/**
  * 实例通过__proto__链接到原型对象，
  * 它实际上指向隐藏特性[[Prototype]]
  *
  * 构造函数通过prototype属性链接到原型对象
  *
  * 实例与构造函数没有直接联系，与原型对象有直接联系
  */
console.log(person1.__proto__ === Person.prototype);    // true
conosle.log(person1.__proto__.constructor === Person); // true
/**
  * 同一个构造函数创建的两个实例
  * 共享同一个原型对象：
  */
console.log(person1.__proto__ === person2.__proto__); // true
/**
  * instanceof检查实例的原型链中
  * 是否包含指定构造函数的原型：
  */
console.log(person1 instanceof Person);              // true
console.log(person1 instanceof Object);              // true
console.log(Person.prototype instanceof Object);   // true
```
Person构造函数、Person的原型对象和Person现有两个实例之间的关系：   
![图示](@assets/img/prototype-mode.png)

isPrototypeOf()会在传入参数的[[Prototype]]指向调用它的对象时返回true。    
```js
console.log(Person.prototype.isPrototypeOf(person1));   // true
console.log(Person.prototype.isPrototypeOf(person2));   // true
```

Object.getPrototypeOf()，返回参数的内部特性[[Prototype]]的值。    
```js
console.log(Object.getPrototypeOf(person1) == Person.prototype);   // true
console.log(Object.getPrototypeOf(person1).name);                  // "Nicholas"
```

Object类型还有一个setPrototypeOf()方法，可以向实例的私有特性[[Prototype]]写入一个新值。这样就可以重写一个对象的原型继承关系：    
```js
let biped = {
  numLegs: 2
};
let person = {
  name: 'Matt'
};
Object.setPrototypeOf(person, biped);
console.log(person.name);                                      // Matt
console.log(person.numLegs);                                  // 2
console.log(Object.getPrototypeOf(person) === biped);   // true
```

::: warning 注意
Object.setPrototypeOf()可能会严重影响代码性能。Mozilla文档说得很清楚：“在所有浏览器和JavaScript引擎中，修改继承关系的影响都是微妙且深远的。这种影响并不仅是执行Object.setPrototypeOf()语句那么简单，而是会涉及所有访问了那些修改过[[Prototype]]的对象的代码。”    
:::

为避免使用Object.setPrototypeOf()可能造成的性能下降，可以通过Object.create()来创建一个新对象，同时为其指定原型：    
```js
let biped = {
  numLegs: 2
};
let person = Object.create(biped);
person.name = 'Matt';
console.log(person.name);                                      // Matt
console.log(person.numLegs);                                  // 2
console.log(Object.getPrototypeOf(person) === biped);   // true
```

**原型层级**   
从对象本身开始往其原型对象往下寻找，找到属性即结束。   
只要给对象实例添加一个属性，这个属性就会遮蔽（shadow）原型对象上的同名属性，也就是虽然不会修改它，但会屏蔽对它的访问。即使在实例上把这个属性设置为null，也不会恢复它和原型的联系。不过，使用delete操作符可以完全删除实例上的这个属性，从而让标识符解析过程能够继续搜索原型对象。     

hasOwnProperty()方法用于确定某个属性是在实例上还是在原型对象上。这个方法是继承自Object的，会在属性存在于调用它的对象实例上时返回true。     
::: tip 注意
ECMAScript的Object.getOwnPropertyDescriptor()方法只对实例属性有效。要取得原型属性的描述符，就必须直接在原型对象上调用Object.getOwnProperty-Descriptor()。   
:::

**原型和in操作符** 
in操作符的使用：**单独使用**和**在for-in循环中使用**。    
**单独使用**：会在可以通过对象访问指定属性时返回true，无论该属性是在实例上还是在原型上。    
确定某个属性是否存在于原型上：只要in操作符返回true且hasOwnProperty()返回false，就说明该属性是一个原型属性。       
**在for-in循环中使用**：可以通过对象访问且可以被枚举的属性都会返回，包括实例属性和原型属性。    
要获得所有可枚举的实例属性，可以使用Object.keys()方法。    
要获得所有实例属性，无论是否可以枚举，都可以使用Object.getOwnPropertyNames()。Object.getOwnPropertySymbols()方法与Object.getOwnPropertyNames()类似，只是针对符号而已。    

**对象迭代**
Object.values()和Object.entries()接收一个对象，返回它们内容的数组。Object.values()返回对象值的数组，Object.entries()返回键/值对的数组。**（符号属性会被忽略）**   

**其他原型语法**
使用字面量的形式定义构造函数的prototype对象后，如constructor属性很重要则需要恢复constructor，恢复的最好办法：
```js
function Person() {}
Person.prototype = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  }
};
// 恢复constructor属性
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person
});
```

**原型的动态性**
因为从原型上搜索值的过程是动态的，所以即使实例在修改原型之前已经存在，任何时候对原型对象所做的修改也会在实例上反映出来。    
**重写整个原型会切断最初原型与构造函数的联系，但实例引用的仍然是最初的原型。记住，实例只有指向原型的指针，没有指向构造函数的指针。** 例：    
```js
function Person() {}
let friend = new Person();
Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  }
};
friend.sayName();   // 错误
```
上面的例子Person的新实例是在重写原型对象之前创建的。在调用friend.sayName()的时候，会导致错误。这是因为firend指向的原型还是最初的原型，而这个原型上并没有sayName属性。   
**重写构造函数上的原型之后再创建的实例才会引用新的原型。而在此之前创建的实例仍然会引用最初的原型。**

**原型的问题**     
原型模式也不是没有问题。首先，它弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性值。虽然这会带来不便，但还不是原型的最大问题。原型的最主要问题源自它的共享特性。我们知道，原型上的所有属性是在实例间共享的，这对函数来说比较合适。另外包含原始值的属性也还好，如前面例子中所示，可以通过在实例上添加同名属性来简单地遮蔽原型上的属性。**真正的问题来自包含引用值的属性。**例：    
```js
function Person() {}
Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  friends: ["Shelby", "Court"],
  sayName() {
    console.log(this.name);
  }
};
let person1 = new Person();
let person2 = new Person();
person1.friends.push("Van");
console.log(person1.friends);   // "Shelby,Court,Van"
console.log(person2.friends);   // "Shelby,Court,Van"
console.log(person1.friends === person2.friends);   // true
```


