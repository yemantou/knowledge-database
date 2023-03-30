---
title: 类
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 991
---

## 类
为解决用ECMAScript 5特性来模拟类似于类的问题，ECMAScript 6新引入的class关键字具有正式定义类的能力。类（class）是ECMAScript中新的基础性语法糖结构。虽然ECMAScript 6类表面上看起来可以支持正式的面向对象编程，但实际上它背后使用的仍然是原型和构造函数的概念。    


### 类定义
定义类也有两种主要方式：类声明和类表达式。
```js
// 类声明
class Person {}
// 类表达式
const Animal = class {};
```
跟函数声明不同的地方：     
1. 函数声明可以提升，但类定义不能；
2. 函数受函数作用域限制，而类受块作用域限制。
   ```js
   {
    function FunctionDeclaration() {}
    class ClassDeclaration {}
   }
   console.log(FunctionDeclaration); // FunctionDeclaration() {}
   console.log(ClassDeclaration);     // ReferenceError: ClassDeclaration is not defined
   ```


### 类构造函数
constructor关键字用于在类定义块内部创建类的构造函数。方法名constructor会告诉解释器在使用new操作符创建类的新实例时，应该调用这个函数。构造函数的定义不是必需的，不定义构造函数相当于将构造函数定义为空函数。    

使用new调用类的构造函数会执行如下操作：     
1. 在内存中创建一个新对象。    
2. 这个新对象内部的[[Prototype]]指针被赋值为构造函数的prototype属性，若是new Class则指向Class的prototype。   
3. 构造函数内部的this被赋值为这个新对象（即this指向新对象）。      
4. 执行构造函数内部的代码（给新对象添加属性）。    
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。     

例：    
```js
class Animal {}
class Person {
  constructor() {
    console.log('person ctor');
  }
}
class Vegetable {
  constructor() {
    this.color = 'orange';
  }
}
let a = new Animal();
let p = new Person();   // person ctor
let v = new Vegetable();
console.log(v.color);   // orange
```

如果类构造函数返回的不是this对象，而是其他对象，那么这个对象不会通过instanceof操作符检测出跟类有关联，因为这个对象的原型指针并没有被修改。    
```js
class Person {
  constructor(override) {
    this.foo = 'foo';
    if (override) {
      return {
        bar: 'bar'
      };
    }
  }
}
let p1 = new Person(),
    p2 = new Person(true);
console.log(p1);                         // Person{ foo: 'foo' }
console.log(p1 instanceof Person);   // true
console.log(p2);                         // { bar: 'bar' }
console.log(p2 instanceof Person);   // false
```
**类构造函数与构造函数的主要区别**：调用类构造函数必须使用new操作符。而普通构造函数如果不使用new调用，那么就会以全局的this（通常是window）作为内部对象。调用类构造函数时如果忘了使用new则会抛出错误。     

#### 把类当成特殊函数
1. 声明一个类之后，通过typeof操作符检测类标识符，表明它是一个函数。
2. 类标识符有prototype属性，而这个原型也有一个constructor属性指向类自身
3. 与普通构造函数一样，可以使用instanceof操作符检查构造函数原型是否存在于实例的原型链中。

在类的上下文中，类本身在使用new调用时就会被当成构造函数。重点在于，类中定义的constructor方法不会被当成构造函数，在对它使用instanceof操作符时会返回false。但是，如果在创建实例时**直接将类构造函数当成普通构造函数来使用**，那么instanceof操作符的返回值会反转：    
```js
class Person {}
let p1 = new Person();
console.log(p1.constructor === Person);           // true
console.log(p1 instanceof Person);                  // true
console.log(p1 instanceof Person.constructor);   // false
let p2 = new Person.constructor();
console.log(p2.constructor === Person);           // false
console.log(p2 instanceof Person);                  // false
console.log(p2 instanceof Person.constructor);   // true
```

类可以像其他对象或函数引用一样把类作为参数传递：   
```js
// 类可以像函数一样在任何地方定义，比如在数组中
let classList = [
  class {
    constructor(id) {
      this.id_ = id;
      console.log(`instance ${this.id_}`);
    }
  }
];
function createInstance(classDefinition, id) {
  return new classDefinition(id);
}
let foo = createInstance(classList[0], 3141);   // instance 3141
``` 

与立即调用函数表达式相似，类也可以立即实例化：  
```js
// 因为是一个类表达式，所以类名是可选的
let p = new class Foo {
  constructor(x) {
    console.log(x);
  }
}('bar');          // bar
console.log(p);   // Foo {}
```


### 实例、原型和类成员
类的语法可以非常方便地定义应该存在于实例上的成员、应该存在于原型上的成员，以及应该存在于类本身的成员。    
1. **实例成员**      
   在构造函数执行完毕后，仍然可以给实例继续添加新成员。每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上共享。    
   ```js
   class Person {
    constructor() {
      // 这个例子先使用对象包装类型定义一个字符串
      // 为的是在下面测试两个对象的相等性
      this.name = new String('Jack');
      this.sayName = () => console.log(this.name);
      this.nicknames = ['Jake', 'J-Dog']
    }
   }
   let p1 = new Person();
   let p2 = new Person();
   p1.sayName(); // Jack
   p2.sayName(); // Jack
   console.log(p1.name === p2.name);               // false
   console.log(p1.sayName === p2.sayName);        // false
   console.log(p1.nicknames === p2.nicknames);   // false
   p1.name = p1.nicknames[0];
   p2.name = p2.nicknames[1];
   p1.sayName();   // Jake
   p2.sayName();   // J-Dog
   ```
2. **原型方法与访问器**      
   为了在实例间共享方法，类定义语法把在类块中定义的方法作为原型方法。类方法等同于对象属性，因此可以使用字符串、符号或计算的值作为键。      
   ```js
   class Person {
    constructor() {
      // 添加到this的所有内容都会存在于不同的实例上
      this.locate = () => console.log('instance');
    }
    // 在类块中定义的所有内容都会定义在类的原型上
    locate() {
      console.log('prototype');
    }
   }
   let p = new Person();
   p.locate();                     // instance
   Person.prototype.locate();   // prototype
   ```
   **可以把方法定义在类构造函数中或者类块中，但不能在类块中给原型添加原始值或对象作为成员数据。**      

   类定义也支持获取和设置访问器。语法与行为跟普通对象一样：
   ```js
   class Person {
     set name(newName) {
       this.name_ = newName;
     }
     get name() {
       return this.name_;
     }
   }
   let p = new Person();
   p.name = 'Jake';
   console.log(p.name); // Jake
   ```
3. **静态类方法**     
   **不需要通过实例对象，可以直接通过类来调用的方法，其中的 this 指向类本身**      
   可以在类上定义静态方法。这些方法通常用于执行不特定于实例的操作，也不要求存在类的实例。与原型成员类似，静态成员每个类上只能有一个。    
   静态类成员在类定义中使用static关键字作为前缀。在静态成员中，this引用类自身。其他所有约定跟原型成员一样：    
   ```js
   class Person {
     constructor() {
       // 添加到this的所有内容都会存在于不同的实例上
       this.locate = () => console.log('instance', this);
     }
     // 定义在类的原型对象上
     locate() {
       console.log('prototype', this);
     }
     //定义在类本身上
     static locate(){
       console.log('class', this);
     }
   }
   let p = new Person();
   p.locate();                     // instance, Person {}
   Person.prototype.locate();   // prototype, {constructor: ... }
   Person.locate();               // class, class Person {}
   ```
   静态类方法非常适合作为实例工厂：    
   ```js
   class Person {
     constructor(age) {
       this.age_ = age;
     }
     sayAge() {
       console.log(this.age_);
     }
     static create() {
       // 使用随机年龄创建并返回一个Person实例
       return new Person(Math.floor(Math.random()＊100));
     }
   }
   console.log(Person.create()); // Person { age_: ... }
   ```
4. **非函数原型和类成员**    
   虽然类定义并不显式支持在原型或类上添加成员数据，但在类定义外部，可以手动添加   
5. **迭代器与生成器方法**   
   类定义语法支持在原型和类本身上定义生成器方法：    
   ```js
    class Person {
      // 在原型上定义生成器方法
      ＊createNicknameIterator() {
        yield 'Jack';
        yield 'Jake';
        yield 'J-Dog';
      }
      // 在类上定义生成器方法
      static ＊createJobIterator() {
        yield 'Butcher';
        yield 'Baker';
        yield 'Candlestick maker';
      }
    }
    let jobIter = Person.createJobIterator();
    console.log(jobIter.next().value);   // Butcher
    console.log(jobIter.next().value);   // Baker
    console.log(jobIter.next().value);   // Candlestick maker
    let p = new Person();
    let nicknameIter = p.createNicknameIterator();
    console.log(nicknameIter.next().value);   // Jack
    console.log(nicknameIter.next().value);   // Jake
    console.log(nicknameIter.next().value);   // J-Dog
   ```


### 继承
ECMAScript 6新增特性中最出色的一个就是原生支持了类继承机制。虽然类继承使用的是新语法，但背后依旧使用的是原型链。    

#### 继承基础
ES6类支持单继承。使用extends关键字，就可以继承任何拥有[[Construct]]和原型的对象。很大程度上，这意味着不仅可以继承一个类，也可以继承普通的构造函数（保持向后兼容）：    
```js
class Vehicle {}
// 继承类
class Bus extends Vehicle {}
let b = new Bus();
console.log(b instanceof Bus);        // true
console.log(b instanceof Vehicle);   // true
function Person() {}
// 继承普通构造函数
class Engineer extends Person {}
let e = new Engineer();
console.log(e instanceof Engineer);   // true
console.log(e instanceof Person);     // true
```
::: tip 注意
extends关键字也可以在类表达式中使用，因此let Bar = class extends Foo {}是有效的语法。  
:::

#### 构造函数、HomeObject和super()
派生类的方法可以通过super关键字引用它们的原型。在类构造函数中使用super可以调用父类构造函数。    
```js
class Vehicle {
  constructor() {
    this.hasEngine = true;
  }
}
class Bus extends Vehicle {
  constructor() {
    // 不要在调用super()之前引用this，否则会抛出ReferenceError
    super(); // 相当于super.constructor()
    console.log(this instanceof Vehicle);   // true
    console.log(this);                          // Bus { hasEngine: true }
  }
}
new Bus();
```
在静态方法中可以通过super调用继承的类上定义的静态方法：   
```js
class Vehicle {
  static identify() {
    console.log('vehicle');
  }
}
class Bus extends Vehicle {
  static identify() {
    super.identify();
  }
}
Bus.identify();   // vehicle
```
::: tip 注意
ES6给类构造函数和静态方法添加了内部特性[[HomeObject]]，这个特性是一个指针，指向定义该方法的对象。这个指针是自动赋值的，而且只能在JavaScript引擎内部访问。super始终会定义为[[HomeObject]]的原型。  
:::

**使用super注意的问题**：  
1. super只能在派生类构造函数和静态方法中使用。
2. 不能单独引用super关键字，要么用它调用构造函数，要么用它引用静态方法。
3. 调用super()会调用父类构造函数，并将返回的实例赋值给this。
4. super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。
5. 如果没有定义类构造函数，在实例化派生类时会调用super()，而且会传入所有传给派生类的参数。
6. 在类构造函数中，不能在调用super()之前引用this。
7. 如果在派生类中显式定义了构造函数，则要么必须在其中调用super()，要么必须在其中返回一个对象。

#### 抽象基类
可供其他类继承，但本身不会被实例化。通过在实例化时检测new.target是不是抽象基类，可以阻止对抽象基类的实例化。
```js
// 抽象基类
class Vehicle {
  constructor() {
    console.log(new.target);
    if (new.target === Vehicle) {
      throw new Error('Vehicle cannot be directly instantiated');
    }
  }
}
// 派生类
class Bus extends Vehicle {}
new Bus();         // class Bus {}
new Vehicle();    // class Vehicle {}
// Error: Vehicle cannot be directly instantiated
```
过在抽象基类构造函数中进行检查，可以要求派生类必须定义某个方法。因为原型方法在调用类构造函数之前就已经存在了，所以可以通过this关键字来检查相应的方法：   
```js
// 抽象基类
class Vehicle {
  constructor() {
    if (new.target === Vehicle) {
      throw new Error('Vehicle cannot be directly instantiated');
    }
    if (! this.foo) {
      throw new Error('Inheriting class must define foo()');
    }
    console.log('success! ');
  }
}
// 派生类
class Bus extends Vehicle {
  foo() {}
}
// 派生类
class Van extends Vehicle {}
new Bus(); // success!
new Van(); // Error: Inheriting class must define foo()
```

#### 继承内置类型
ES6类为继承内置引用类型提供了顺畅的机制，开发者可以方便地扩展内置类型：
```js
class SuperArray extends Array {
  shuffle() {
    // 洗牌算法
    for (let i = this.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() ＊ (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  }
}
let a = new SuperArray(1, 2, 3, 4, 5);
console.log(a instanceof Array);         // true
console.log(a instanceof SuperArray);   // true
console.log(a);   // [1, 2, 3, 4, 5]
a.shuffle();
console.log(a);   // [3, 1, 4, 5, 2]
```
有些内置类型的方法会返回新实例。默认情况下，返回实例的类型与原始实例的类型是一致的。如果想覆盖这个默认行为，则可以覆盖Symbol.species访问器，这个访问器决定在创建返回的实例时使用的类。   
```js
class SuperArray extends Array {
  static get[Symbol.species](){
    returnArray;
  }
}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => ! ! (x%2))
console.log(a1);   // [1, 2, 3, 4, 5]
console.log(a2);   // [1, 3, 5]
console.log(a1 instanceof SuperArray);   // true
console.log(a2instanceofSuperArray);  //false
```

#### 类混入
一个策略是定义一组“可嵌套”的函数，每个函数分别接收一个超类作为参数，而将混入类定义为这个参数的子类，并返回这个类。这些组合函数可以连缀调用，最终组合成超类表达式：
```js
class Vehicle {}
let FooMixin = (Superclass) => class extends Superclass {
  foo() {
    console.log('foo');
  }
};
let BarMixin = (Superclass) => class extends Superclass {
  bar() {
    console.log('bar');
  }
};
let BazMixin = (Superclass) => class extends Superclass {
  baz() {
    console.log('baz');
  }
};
class Bus extends FooMixin(BarMixin(BazMixin(Vehicle))) {}
let b = new Bus();
b.foo();   // foo
b.bar();   // bar
b.baz();   // baz
```
::: tip 注意
很多JavaScript框架（特别是React）已经抛弃混入模式，转向了组合模式（把方法提取到独立的类和辅助对象中，然后把它们组合起来，但不使用继承）。这反映了那个众所周知的软件设计原则：“组合胜过继承（composition over inheritance）。”这个设计原则被很多人遵循，在代码设计中能提供极大的灵活性。
:::