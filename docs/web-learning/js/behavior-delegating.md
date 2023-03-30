---
title: 行为委托
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 91
---

### 行为委托  
多个对象（a,  b）委托一个对象（c），修改某个对象（a || b）的原型属性不会影响c。  
::: danger 注意
行为委托认为对象之间是兄弟关系，互相委托，而不是父类和子类的关系。JavaScript的[[Prototype]]机制本质上就是行为委托机制。  
:::

### 面向委托的设计  

#### 委托理论  
执行任务“XYZ”需要两个兄弟对象（XYZ和Task）协作完成。但是我们并不需要把这些行为放在一起，通过类的复制，我们可以把它们分别放在各自独立的对象中，需要时可以允许XYZ对象委托给Task。  
```js
var Task = {
  setID: function(ID) { this.id = ID; },
  outputID: function() { console.log(this.id); }
};

// 让XYZ委托Task
var XYZ = Object.create(Task);

XYZ.prepareTask = function(ID, Label) {
  this.setID(ID);
  this.label = Label;
};

XYZ.outputTaskDetails = function() {
  this.outputID();
  console.log(this.label);
};

// ABC = Object.create(Task);
// ...
```
1. 在上面的代码中，id和label数据成员都是直接存储在XYZ上（而不是Task）。通常来说，在[[Prototype]]委托中最好把状态保存在委托者（XYZ、ABC）而不是委托目标（Task）上。  
2. 2．在类设计模式中，我们故意让父类（Task）和子类（XYZ）中都有outputTask方法，这样就可以利用重写（多态）的优势。在委托行为中则恰好相反：我们会尽量避免在[[Prototype]]链的不同级别中使用相同的命名，否则就需要使用笨拙并且脆弱的语法来消除引用歧义。  
3. this.setID(ID); XYZ中的方法首先会寻找XYZ自身是否有setID(..)，但是XYZ中并没有这个方法名，因此会通过[[Prototype]]委托关联到Task继续寻找，这时就可以找到setID(..)方法。此外，由于调用位置触发了this的隐式绑定规则，因此虽然setID(..)方法在Task中，运行时this仍然会绑定到XYZ，这正是我们想要的。  
::: danger 注意
this.setID(ID); // 在API接口的设计中，委托最好在内部实现，不要直接暴露出去
:::

::: danger 互相委托（禁止）
无法在两个或两个以上互相（双向）委托的对象之间创建循环委托。如果你把B关联到A然后试着把A关联到B，就会出错。  
:::

### 比较思维模型  
1. （“原型”）面向对象风格：
   ```js
   function Foo(who) {
     this.me = who;
   }
   Foo.prototype.identify = function() {
     return 'I am ' + this.me;
   };
   
   function Bar(who) {
     Foo.call(this.who);
   }
   Bar.prototype = Object.create(Foo.prototype);

   Bar.prototype.speak = function() {
     alert('Hello, ' + this.identify() + '.');
   };

   var b1 = new Bar('b1');
   var b2 = new Bar('b2');

   b1.speak();
   b2.speak();
   ```
   ::: tip 提示
   子类Bar继承了父类Foo，然后生成了b1和b2两个实例。b1委托了Bar.prototype, Bar.prototype委托了Foo.prototype。  
   :::
   （“原型”）面向对象风格思维模型：
   ![对象关联风格](@assets/img/object-oriented.png)
2. 对象关联风格：
   ```js
   const Foo = {
     init: function(who) {
       this.me = who
     },
     identify: function() {
       return 'I am ' + this.me
     }
   };
   const Bar = Object.create(Foo);

   Bar.speak = function() {
     alert('Hello, ' + this.identify() + '.')
   };

   var b1 = Object.create(Bar);
   b1.init('b1');
   var b2 = Object.create(Bar);
   b2.init('b2');

   b1.speak();
   b2.speak();
   ```
   对象关联风格思维模型：
   ![对象关联风格](@assets/img/object-associations.png)

### 类与对象  

#### 类风格代码  
```js
// 父类
function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.$elem = null;
}

Widget.prototype.render = function ($where) {
  if (this.$elem) {
    this.$elem.css({
      width: this.width + 'px',
      height: this.height + 'px'
    }).appendTo($where);
  }
};

// 子类
function Button(width, height, label) {
  // 调用“super”构造函数
  Widget.call(this, width, height);
  this.label = label || 'Default';
  this.$elem = $('<button>').text(this.label);
}

// 让Button“继承”Widget
Button.prototype = Object.create(Widget.prototype)

// 重写render(..)
Button.prototype.render = function ($where) {
  // “super”调用
  Widget.prototype.render.call(this, $where);
  this.$elem.click(this.onClick.bind(this));
};

Button.prototype.onClick = function (evt) {
  console.log('Button ’' + this.label + '’ clicked!');
};

$(document).ready(function () {
  var $body = $(document.body);
  var btn1 = new Button(125, 30, 'Hello');
  var btn2 = new Button(150, 40, 'World');

  btn1.render($body);
  btn2.render($body);
});
```

#### class语法糖代码  
```js
class Widget {
  constructor(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = nu11;
  }
  render($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + 'px',
        height: this.height + 'px'
      }).appendTo($where);
    }
  }
}

class Button extends Widget {
  constructor(width, height, label) {
    super(width, height);
    this.labe1 = label || 'Default';
    this.$elem = $('<button>').text(this.label);
  }

  render($where) {
    super.render($where);
    this.$elem.click(this.onClick.bind(this));
  }
  onClick(evt) {
    console.log('Button ’' + this.label + '’ clicked!');
  }
}

$(document).ready(function () {
  var $body = $(document.body);
  var btn1 = new Button(125, 30, 'Hello');
  var btn2 = new Button(150, 40, 'World');

  btn1.render($body);
  btn2.render($body);
});
```

#### 对象关联委托代码  
```js
var Widget = {
  init: function (width, height) {
    this.width = width || 50;
    this.width = height || 50;
    this.$elem = null;
  },
  insert: function ($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + 'px',
        height: this.height + 'px'
      }).appendTo($where);
    }
  }
};

var Button = Object.create(Widget);

Button.setup = function (width, height, label) {
  // 委托调用
  this.init(width, height);
  this.label = label || 'Default';

  this.$elem = $('<button>').text(this.label);
};

Button.build = function ($where) {
  // 委托调用
  this.insert($where);
  this.$elem.click(this.onClick.bind(this));
};

Button.onClick = function (evt) {
  console.log('Button ’' + this.label + '’ clicked!');
};

$(document).ready(function () {
  var $body = $(document.body);
  var btn1 = Object.create(Button);
  btn1.setup(125, 30, 'Hello');

  var btn2 = Object.create(Button);
  btn2.setup(125, 30, 'Hello');

  btn1.build($body);
  btn2.build($body);
});
```
::: tip 提示 
对象关联可以更好地支持关注分离（separation of concerns）原则，创建和初始化并不需要合并为一个步骤。  
::: 

### 更好的语法  
ES6可以简洁声明：  
```js
var LoginController = {
  errors: [],
  getUser() {},
  getPassword() {}
};
```
::: danger 注意
简洁声明自我引用（递归、事件（解除）绑定，等等）更难。  
需要自我引用的话，那最好使用传统的具名函数表达式来定义对应的函数（baz: function baz(){}），不要使用简洁方法。  
:::

### 内省  
内省就是检查实例的类型。类实例的内省主要目的是通过创建方式来判断对象的结构和功能。  
```js
var Foo = {};

// 让Foo和Bar互相关联
var Bar = Object.create(Foo);

// 让b1关联到Foo和Bar
var b1 = Object.create(Bar);

// 使用对象关联时，所有的对象都是通过[[prototype]]委托互相关联，内省方法如下
Foo.isPrototypeOf(Bar); // true 检查Foo是否在Bar的原型链中
Object.getPrototypeOf(Bar) === Foo; // true getPrototypeOf方法返回指定对象的原型（内部[[Prototype]]属性的值）

Foo.isPrototypeOf(b1); // true
Bar.isPrototypeOf(b1); // true
Object.getPrototypeOf(Bar) === Bar; // true
```  

### class陷阱 
- class基本上只是现有[[Prototype]]（委托！）机制的一种语法糖；
- class并不会像传统面向类的语言一样在声明时<font color="red">**静态**</font>复制所有行为。如果你（有意或无意）修改或者替换了父“类”中的一个方法，那子“类”和所有实例都会受到影响；  
- super并不是动态绑定的，它会在声明时“静态”绑定。  
  手动修改super绑定，使用toMethod(..)绑定或重新绑定方法的[[HomeObject]]。  