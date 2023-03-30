---
title: 模块化
autoGroup-1: JS
sidebarDepth: 0
autoSort: 983
---

# JS模块化
针对代码，将复杂的代码封装为一个模块，块的内部数据/实现的私有的，只是像外部暴露一下接口（方法）与外部其他模块通信，达到可复用的效果。     
- 避免命名冲突(减少命名空间污染)
- 更好的分离, 按需加载
- 高复用性
- 高可维护性

## 简单封装：Namespace模式
定义对象，属性方法放到对象里面。    
缺点：对象中的属性和方法容易被修改，不安全。    


## 匿名闭包：IIFE（立即执行函数）模式（现代模块实现的基石）
将属性和方法放到立即执行的匿名函数里面，实现私有化。     
增强：引入依赖，依赖通过函数形参引入，例如传入window对象，通过给window增加一个对象来暴露模块。      


## CommonJS
Node 应用由模块组成，采用 CommonJS 模块规范。    
- 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
- 在服务器端，模块的加载是运行时同步加载的。
- 在浏览器端，模块需要提前编译打包处理。    

**特点：**     
- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

**基本语法：**        
- 暴露模块：module.exports = value或exports.xxx = value
- 引入模块：require(xxx),如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径
 
**模块的加载机制：**       
CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。    


## AMD
CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范是非同步加载模块，允许指定回调函数。    

RequireJS是一个工具库，主要用于客户端的模块管理。它的模块管理遵守AMD规范，RequireJS的基本思想是，通过define方法，将代码定义为模块；通过require方法，实现代码的模块加载。     
**AMD规范基本语法：**     
定义暴露模块：
```js
//定义没有依赖的模块
define(function(){
   return 模块
})

//定义有依赖的模块
define(['module1', 'module2'], function(m1, m2){
   return 模块
})
```
引入使用模块：
```js
require(['module1', 'module2'], function(m1, m2){
   使用m1/m2
})
```


## CMD
CMD规范专门用于浏览器端，模块的加载是异步的，**模块使用时才会加载执行**。CMD规范整合了CommonJS和AMD规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。     
**基本语法：**         
定义暴露模块：
```js
//定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})

//定义有依赖的模块
define(function(require, exports, module){
  //引入依赖模块(同步)
  var module2 = require('./module2')
  //引入依赖模块(异步)
    require.async('./module3', function (m3) {
    })
  //暴露模块
  exports.xxx = value
})
```
引入使用模块：
```js
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})
```


## ES6 Module 的语法
::: tip 学习文章
[Module 的语法](https://es6.ruanyifeng.com/#docs/module)
:::
在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。     

**ES6 模块**的设计思想是**尽量的静态化，使得编译时就能确定模块的依赖关系**，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。   

ES6 模块不是对象，而是通过 **<code>export</code>** 命令显式指定**输出**的代码，再通过 **<code>import</code>** 命令**输入**。    
```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载**称为“编译时加载”或者静态加载**，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。    

**ES6 模块好处：**    
1. ES6 模块是编译时加载，使得静态分析成为可能，能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。
2. 不再需要 UMD 模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
3. 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
4. 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。
   
ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

### export 命令
export命令用于规定模块的对外接口。一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。      

**export语句输出的接口**，与其对应的值是**动态绑定**关系，即通过该接口，可以取到模块内部实时的值。与 CommonJS 规范完全不同。**CommonJS 模块输出的是值的缓存**，不存在动态更新。        

### import 命令
可以通过import命令加载模块。import命令输入的变量都是**只读**的，因为它的本质是输入接口。也就是说，**不允许在加载模块的脚本里面，改写接口**。    

由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。   

### 模块的整体加载
除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
```js
import * as circle from './circle';
```

### export default 命令
为模块指定默认输出，一个模块只能有一个默认输出。    
**默认输出和正常输出：**    
```js
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```

export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。
```js
// 正确
export default 42;

// 报错
export 42;
```
上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。   

export default也可以用来输出类。
```js
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

### export 与 import 的复合写法
在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。   
```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
::: tip 注意
写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。   
:::

模块的接口改名和整体输出，也可以采用这种写法。
```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

### 模块的继承
模块引入了另外一个模块就叫做继承

### 跨模块常量
const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。     
```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

### import()
import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）。  所以，下面的代码会报错：
```js
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```
ES2020提案 引入import()函数，支持动态加载模块。import()返回一个 Promise 对象。   
- import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。
- 另外，import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。
- import()类似于 Node.js 的require()方法，区别主要是前者是异步加载，后者是同步加载。

#### 适用场合
1. 按需加载，可以在需要的时候，再加载某个模块。
2. 条件加载，可以放在if代码块，根据不同的情况，加载不同的模块。
3. 动态的模块路径，允许模块路径动态生成。

::: tip 注意
import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。   
```js
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```
:::

### import.meta
开发者使用一个模块时，有时需要知道模板本身的一些信息（比如模块的路径）。ES2020 为 import 命令添加了一个元属性import.meta，返回当前模块的元信息。   
**import.meta只能在模块内部使用，如果在模块外部使用会报错。**       

一般来说，import.meta至少会有下面两个属性。
1. import.meta.url，返回当前模块的 URL 路径。      
   如果模块里面还有一个数据文件data.txt，那么就可以用下面的代码，获取这个数据文件的路径。
   ```js
   new URL('data.txt', import.meta.url)
   ```
   ::: tip 注意
    Node.js 环境中，import.meta.url返回的总是本地路径，即file:URL协议的字符串，比如file:///home/user/foo.js。
   :::
2. import.meta.scriptElement   
   是浏览器特有的元属性，返回加载模块的那个 script 元素，相当于 document.currentScript 属性。


## ES6 Module 的加载实现

### 浏览器加载
浏览器加载 ES6 模块，也使用 script 标签，但是要加入type="module"属性。   
```js
<script type="module" src="./foo.js"></script>
```
浏览器对于带有type="module"的 script ，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了 script 标签的defer属性。如果网页有多个 type="module" 的 script，它们会按照在页面出现的顺序依次执行。

### ES6 模块与 CommonJS 模块的差异
ES6 模块与 CommonJS 模块完全不同。    
**三个重大差异：**
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。    
   CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。   
   ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。    
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
3. CommonJS 模块的require()是同步加载模块，ES6 模块的import()命令是异步加载，有一个独立的模块依赖的解析阶段。

### 循环加载
“循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。   

#### CommonJS 模块的加载原理
CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。   
以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。     

CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。    

#### ES6 模块的循环加载
ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。   