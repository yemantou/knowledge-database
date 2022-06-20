---
title: this
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 95
---

::: danger this是什么
this是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
:::      

### 为什么要使用this  
- 可以在不同的上下文对象（me和you）中重复使用函数identify()和speak()，不用针对每个对象编写不同版本的函数。  
  ```js
  function identify() {
    return this.name.toUpperCase();
  }

  function speak() {
    var greeting = 'Hello, I\'m' + identify.call(this);
    console.log(greeting);
  }

  var me = {
    name: 'Kyle'
  };

  var you = {
    name: 'Reader'
  };

  identify.call(me); // KYLE
  identify.call(you); // READER

  speak.call(me); // Hello, I'm KYLE
  speak.call(you); // Hello, I'm READER
  ```
- this提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将API设计得更加简洁并且易于复用。  

### 对this的误解

#### 误解1：this指向函数自身
  this并不是指向自身的，如果要指向自身：  
  - 只使用this是不够的。一般来说你需要通过一个指向函数对象的词法标识符（变量）来引用它。  
    ```js
    function foo() {
      foo.count = 4; // foo指向它自身
    }

    setTimeout(function() {
      // 匿名（没有名字的）函数无法指向自身
    }, 10);
    ```
    ::: danger 缺点
    回避了this的问题，并且完全依赖于变量foo的词法作用域。 
    :::
  - 强制this指向foo函数对象。  
    - apply（可接受数组类型的参数）
    - call

#### 误解2：this的作用域，this指向函数的作用域（在某种情况下它是正确的，但是在其他情况下它却是错误的）  
  this在任何情况下都不指向函数的词法作用域
  ::: danger 重要提示
  this既不指向函数自身也不指向函数的词法作用域。  
  :::

### this调用位置  
  ::: danger 调用位置
  调用位置就在当前正在执行的函数的前一个调用中。
  :::

### this绑定规则  
1. 默认绑定（无法应用其他规则时的默认规则）;    
   ::: warning 绑定到undefined
   严格模式（strict mode），则不能将全局对象用于默认绑定，因此this会绑定到undefined。  
   :::
2. 隐式绑定（是否有上下文对象，或者说是否被某个对象拥有或者包含）;  
   - 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用
      ```js
      function foo() {
        console.log(this.a);
      }

      var obj2 = {
        a: 42,
        foo: foo
      };

      var obj1 = {
        a: 2,
        obj2: obj2
      };

      obj1.obj2.foo(); // 42
      ```
   - 隐式丢失：一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把this绑定到全局对象或者undefined（取决于是否是严格模式）上。   
      ```js
      function foo() {
        console.log(this.a);
      }

      var obj = {
        a: 2,
        foo: foo
      };

      var bar = obj.foo; // 函数别名！

      var a = 'oops，global'; // a是全局对象的属性

      bar(); // 'oops，global'
      ```
      ::: tip 提示
      虽然bar是obj.foo的一个引用，但是实际是引用的foo函数本身，应用了默认绑定。
      :::
3. 显示绑定：call(..)和apply(..)方法
   ::: tip bind、apply、call区别
   Function.prototype.bind与apply和call的最大的区别是：bind不会立即调用，而是返回一个新函数；  
   apply可以将参数用数组传入进去。
   :::
   硬绑定  
   ```js
   function foo() {
     console.log(this.a);
   }

   var obj = {
     a: 2
   };

   var bar = function() {
     foo.call(obj); 
   };

   bar(); // 2
   setTimeout(bar, 100); // 2

   // 硬绑定的this无法修改
   bar.call(window); // 2
   ```
   硬绑定是一种非常常用的模式，所以ES5提供了内置的方法Function.prototype.bind。  
   ```js
   function foo(something) {
     console.log(this.a, something)
     return this.a + something
   }

   var obj = {
     a: 2
   };

   var bar = foo.bind(obj);

   var b = bar(3); // 2 3
   console.log(b); // 5
   ```
4. new绑定  
   ```js
   function foo(a) {
     this.a = a;
   }

   var bar = new foo(2); // 构造一个新对象绑定到foo(...)调用的this上
   console.log(bar.a); // 2
   ```
   (1)．创建（或者说构造）一个全新的对象；    
   (2)．这个新对象会被执行[[Prototype]]连接；  
   (3)．这个新对象会绑定到函数调用的this；  
   (4)．如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

#### 优先级  
1. 函数是否在new中调用（new绑定）？如果是的话this绑定的是新创建的对象；  
2. 函数是否通过call、apply（显式绑定）或者硬绑定调用？如果是的话，this绑定的是指定的对象；  
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象；  
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到全局对象。  

#### 绑定例外：某些场景下this的绑定行为会出乎意料  
1. 把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则；  
   ::: danger 副作用
   如果某个函数确实使用了this（比如第三方库中的一个函数），那默认绑定规则会把this绑定到全局对象（在浏览器中这个对象是window），这将导致不可预计的后果（比如修改全局对象）。
   :::
   ::: tip 更安全
   是传入一个特殊的对象（例如空对象），把this绑定到这个对象。  
   创建一个空对象：Object.create(null)和{}很像，但是并不会创建Object. prototype这个委托，所以它比{}“更空”
   :::
2. 间接引用：可能（有意或者无意地）创建一个函数的“间接引用”，在这种情况下，调用这个函数会应用默认绑定规则； 
   ```js
   function foo() {
     console.log(this.a);
   }

   var a = 2;
   var o = { a: 3, foo: foo };
   var p = { a: 4 };

   o.foo(); // 3
   // o.foo是在o中执行foo函数
   (p.foo = o.foo)(); // 2 
   // p.foo = o.foo的返回值是foo函数的引用
   ``` 
   ::: danger 注意
   对于默认绑定来说，决定this绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this会被绑定到undefined，否则this会被绑定到全局对象。  
   :::
3. 软绑定（硬绑定会大大降低函数的灵活性，软绑定保留隐式绑定或者显式绑定修改this的能力）。   
   ```js
    if (!Function.prototype.softBind) {
      Function.prototype.softBind = function(obj) {
        var fn = this;
        // 捕获所有curried参数
        var curried = [].slice.call(arguments, 1); // arguments就是传进来的实参
        var bound  = function () {
          return fn.apply(
            (!this || this === global) ? obj : this,
            // (!this || this === (window, global)) ? obj : this, // window对象在js文件不存在
            curried.concat.apply(curried, arguments)
          );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
      };
    }

    function foo() {
      console.log('name：', this.name);

    }

    var obj = { name: 'obj' }
    var obj2 = { name: 'obj2' }
    var obj3 = { name: 'obj3' }

    var fooOBJ = foo.softBind(obj);

    fooOBJ(); // name: obj

    obj2.foo = foo.softBind(obj); // obj2有this，所以未绑定到传入的obj上
    obj2.foo(); // name: obj2

    fooOBJ.call(obj3); // name: obj3

    setTimeout(obj2.foo, 10); // name: obj
   ```

### this词法  
- 箭头函数不使用this的四种标准规则，而是根据外层（函数或者全局）作用域来决定this。
  foo()内部创建的箭头函数会捕获调用时foo()的this。由于foo()的this绑定到obj1,bar（引用箭头函数）的this也会绑定到obj1，箭头函数的绑定无法被修改。（new也不行！）。  
  ```js
  function foo () {
    // 返回一个箭头函数
    return (a) => {
      // this继承自foo()
      console.log(this.a);
    };
  }

  var obj1 = {
    a: 2
  };

  var obj2 = {
    a: 3
  };

  var bar = foo.call(obj1);
  bar.call(obj2); // 2
  ```  