---
title: JS-设计模式
autoGroup-1: JS
sidebarDepth: 0
autoSort: 999
---

# JS-设计模式
开闭原则，对于扩展开放，对于修改关闭。

[构造器模式 / 原型模式](https://gitlab.com/yemantou/yemantou-base-study/-/blob/main/src/design-pattern/constructor.html)
## 构造器模式
使用构造函数封装对象的生成：    
```js
function Person (name, age) {
  this.name = name;
  this.age = age

  this.say = function () {
    console.log(`${this.name} - ${this.age}`);
  }
};

const obj1 = new Person('张三', 10);
console.log('obj1', obj1);

const obj2 = new Person('李四', 20);
console.log('obj2', obj2);

obj1.say();
obj2.say();
```


## 原型模式
[原型模式-示例]()
将函数放入原型中：
```js
function Person (name, age) {
  this.name = name;
  this.age = age
};

Person.prototype.say = function () {
  console.log(`${this.name} - ${this.age}`);
}

const obj1 = new Person('张三', 10);
console.log('obj1', obj1); // obj1 Person { name: '张三', age: 10 }

const obj2 = new Person('李四', 20);
console.log('obj2', obj2); // obj2 Person { name: '李四', age: 20 }

obj1.say(); // 张三 - 10
obj2.say(); // 李四 - 20
```


## ES6类模式（结合构造器和原型模式）
```js
class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }

  say () {
    console.log(`${this.name} - ${this.age}`);
  }
}

const obj1 = new  Person('粉1', 20);
console.log('obj1', obj1);

const obj2 = new  Person('粉2', 21);
console.log('obj2', obj2);

obj1.say(); // 粉1 - 20
obj2.say(); // 粉2 - 21
```


## 工厂模式
由一个工厂对象决定创建某一种产品对象类的实例，主要用来创建同一类对象。通过提供一个通用的接口来创建对象，在接口的入参中指定需要创建的对象类型。  


## 抽象工厂模式
返回的是具体的类，不通过参数生成实例，而是通过参数返回不同的类。      


## 建造者模式
```js
class Navbar {
  init () {
    console.log('Navbar-init');
  }

  getData () {
    console.log('Navbar-getData');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Navbar-1111');
      },1000)
    })
  }

  render () {
    console.log('Navbar-render');
  }
}

class List {
  init () {
    console.log('List-init');
  }

  getData () {
    console.log('List-getData');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('List-1111');
      },1000)
    })
  }

  render () {
    console.log('List-render');
  }
}

class operator {
  async startBuild(builder) {
    await builder.init();
    await builder.getData();
    await builder.render(); 
  }
}
const op = new operator(); 
const navbar = new Navbar();
const list = new List();
op.startBuild(navbar);
op.startBuild(list);
```
建造者模式将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。工厂模式主要是为了创建对象实例或者类簇(抽象工厂)，关心的是最终产出(创建)的是什么，而不关心创建的过程。而建造者模式关心的是创建这个对象的整个过程，甚至于创建对象的每一个细节。   


## 单例模式
保证一个类仅有一个实例，并提供一个访问它发的全局访问点，主要解决全局变量污染和一个全局使用的类频繁的创建和销毁，占用内存。   

ES5：使用闭包。       
ES6：使用类，将实例直接挂载到类上，不论实例多少次，挂载到类上的实例不变。          


## 装饰器模式（低耦合）
装饰器模式能够很好的对已有功能进行拓展，这样不会更改原有的代码，对其他的业务产生影响，这方便我们在较少的改动下对软件功能进行拓展。    

**axios等的拦截器就是装饰器模式。**    



## 适配器模式
将一个类的接口转换成客户希望的另一个接口。适配器模式让那些接口不兼容的类可以一起工作。    
适配器不会去改变实现层，它干涉了抽象层。     


## 策略模式
主要解决在有多种算法相似的情况下，使用 if...else 所带来的复杂和难以维护。它的优点是算法可以自由切换，同时避免多重 if...else 判断，具有良好的扩展性。    
```js
// 计算年终奖
function calBonusOld (level, salary) {
  if (level === 'A') {
    return salary * 4
  }
  if (level === 'B') {
    return salary * 3
  }
  if (level === 'C') {
    return salary * 2
  }
  if (level === 'D') {
    return 0
  }
}

// 策略模式
let strategry = {
  'A': (salary) => {
    return salary * 4
  },
  'B': (salary) => {
    return salary * 3
  },
  'C': (salary) => {
    return salary * 2
  },
  'D': (salary) => {
    return 0
  }
}

function calBonus (level, salary) {
  return strategry[level](salary)
}

calBonus("A", 1000)
```


## 代理模式
代理模式（Proxy），为前提对象提供一种代理以控制对这个对象的访问。    
代理模式使得代理对象控制具体对象额引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。     
```js
// 明星接戏需要经纪人代理
class Star {
  play () {
    console.log('演戏');
  }
}

class StarProxy {
  constructor () {
    this.superStar() = new Star()
  }

  talk (price) {
    if (price >= 10000) {
      this.superStar.play()
    } else {
      throw new Error('价钱不合适')
    }
  }
}
```


## 观察者模式
观察者模式包含目标和观察者两类对象，一个目标可以有任意数目的与之相依赖的观察者，一旦观察目标的状态发生改变，所有的观察者都将得到通知，可以实现自动更新。       
```js
class Subject {
  constructor () {
    this.observers = []
  }

  add (observer) {
    this.observers.push(observer)
  }

  notify () {
    this.observers.forEach(item => {
      item.update()
    })
  }

  remove (observer) {
    this.observers = this.observers.filter(item => {
      return item !== observer
    })
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }

  update () {
    console.log('update', this.name);
  }
}

const subject = new Subject()
const observer1 = new Observer('pink1')
const observer2 = new Observer('pink2')

subject.add(observer1)
subject.add(observer2)

setTimeout(() => {
  subject.remove(observer1)
}, 1000)

setTimeout(() => {
  subject.notify()
}, 2000)
```


## 发布订阅模式
[发布订阅模式代码示例](https://gitlab.com/yemantou/yemantou-base-study/-/blob/main/src/design-pattern/publish-subscribe.html)

::: tip 观察者模式与发布/订阅模式的区别
观察者模式是由具体目标调度的，而发布/订阅模式是统一由调度中心调的，所以观察者模式的订阅者与发布者之间是存在依赖的，而发布/订阅模式则不会。
:::


## 模块模式
能够使一个单独的对象拥有公共/私有的方法和变量，从而屏蔽来自全局作用域的特殊部分。这可以减少我们的函数名与在页面中其他脚本区域内定义的函数名冲突的可能性。    
1. 闭包
2. ES6 Module        


## 桥接模式
将抽象部分与它的实现部分分离，使它们可以独立变化，独立拼接。（为抽像与实践搭桥）            
使用场景：一个类存在两个或多个独立变化的维度，且这两个或多个维度都需要进行扩展。      

示例：     
[桥接模式](https://gitlab.com/yemantou/yemantou-base-study/-/blob/main/src/design-pattern/bridge-mode.html)


## 组合模式
组合模式在对象间行成树形结构；组合模式中基本对象和组合对象被一致对待；无须关心对象由多少层，调用时只需在根部进行调用。    

作用：在树形结构的问题中，模糊了简单元素和复杂元素的概念，客户程序可以像处理简单元素一样来处理复杂元素，从而使得客户程序与复杂元素的内部结构解耦。     
```js
// 扫描文件夹
const Folder = function (folder) {
  this.folder = folder
  this.list = [] // 保存 子文件夹 或者 文件
}

Folder.prototype.add = function (res) {
  this.list.push(res)
}

Folder.prototype.scan = function () {
  console.log('开始扫描文件夹', this.folder);
  for (let i = 0;i < this.list.length;i++) {
    this.list[i].scan()
  }
}

const File = function (file) {
  this.file = file
}

File.prototype.scan = function () {
  console.log('开始扫描文件', this.file);
}

// 根文件夹
const rootFolder = new Folder('root')
// 子文件夹
const htmlFolder = new Folder('html')
const cssFolder = new Folder('css')
const jsFolder = new Folder('js')

// 文件
const html4 = new File('html4')
const html5 = new File('html5')
const css2 = new File('css2')
const css3 = new File('css3')
const es5 = new File('es5')
const es6 = new File('es6')

rootFolder.add(htmlFolder)
rootFolder.add(cssFolder)
rootFolder.add(jsFolder)

htmlFolder.add(html4)
htmlFolder.add(html5)

cssFolder.add(css2)
cssFolder.add(css3)

jsFolder.add(es5)
jsFolder.add(es6)

rootFolder.scan()
```


## 命令模式
有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。需要一种松耦合的方式来设计程序，使得发送者和接受者能够消除彼此之间的耦合关系。    
命令模式由三种角色构成：    
1. 发布者 invoker （发出命令，调用命令对象，不知道如何执行与谁执行）；
2. 接收者 receiver （提供对应接口处理请求，不知道谁发起请求）；
3. 命令对象 command （接收命令，调用接收者对应接口处理发布者的请求）。       
  
**发布者和接受者互相不可知。**    

**类似于 客户（发布者），订单（命令对象），仓库（接收者）。**    


## 模板方法模式（将特定的处理操作封装成一个模板）
模板方法由两部分组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象，也继承了整个算法结构，并且可以选择重写父类的方法。    
子类方法的种类和执行顺序都是不变的，但是子类的方法具体实现规则是可以变的。父类是个模板，子类可以添加，添加了子类就增加了不同的功能。      

类似于：     
1. 泡柠檬茶：第一步是烧开水，第二步是放入茶叶，第三步是放入柠檬。    
2. 泡咖啡：第一步是烧开水，第二步是放入咖啡粉，第三步是放入牛奶。   

**这两个都可以抽象为一个公共父类模板，里面有一个烧开水的公共方法，加入第一个产品的方法，加入第二个产品的方法。**      
```js
/**
 * 模板方法模式，生成一个模板
 */
function createTemplate(params = {}) {
  const Template = function () { }

  Template.prototype.init = async function () {
    console.log('开始初始化');
    const data = await this.getData()
    this.render(data)
  }

  Template.prototype.getData = params.getData || function () {
    throw new Error('getData 方法必须被复写')
  }

  Template.prototype.render = function (data) {
    console.log('开始渲染模板，模板数据：', data);
  }

  return Template
}

const MyTemplate = createTemplate({
  getData() {
    return 'MyTemplate 数据'
  }
})

new MyTemplate().init() 

const MyTemplate1 = createTemplate()

new MyTemplate1().init()
```


## 迭代器模式
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式也可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。    

1. 为遍历不同数据结构的“集合”提供统一的接口；   
2. 能遍历访问“集合”数据中的项，不关心项目的数据结构。      

```js
const myEach = function (arr, callback) {
  for (let i = 0;i < arr.length;i++) {
    callback(i, arr[i])
  }
}

myEach([11, 22, 33, 44], (key, value) => {
  console.log(key, value);
})
```
ES6：Iterator（迭代器对象，Symbol.Iterator）


## 职责链模式（类似于原型）
使多个对象都有机会处理请求，从而避免了请求的发送者与多个接受者直接的耦合关系，将这些接受者连成一条链，顺着这条链传递该请求，直到找到能够处理该请求的对象。   

