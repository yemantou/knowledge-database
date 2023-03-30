---
title: DOM
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 984
---

## 文档对象模型（DOM, Document Object Model）
IE8及更低版本中的DOM是通过COM对象实现的。这意味着这些版本的IE中，DOM对象跟原生JavaScript对象具有不同的行为和功能。   
```html
<html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <p>Hello World! </p>
  </body>
</html>
```
如果表示为层级结构，则如图：
![层级结构](@assets/img/document.png)        

其中，document节点表示每个文档的根节点。在这里，根节点的唯一子节点是html元素，我们称之为文档元素（documentElement）。文档元素是文档最外层的元素，所有其他元素都存在于这个元素之内。每个文档只能有一个文档元素。在HTML页面中，文档元素始终是html元素。在XML文档中，则没有这样预定义的元素，任何元素都可能成为文档元素。


### DOM编程
很多时候，操作DOM是很直观的。通过HTML代码能实现的，也一样能通过JavaScript实现。

#### 动态脚本
与对应的HTML元素一样，有两种方式通过\<script>动态为网页添加脚本：引入外部文件和直接插入源代码。


### MutationObserver接口
MutationObserver接口，可以在DOM被修改时异步执行回调。使用MutationObserver可以观察整个文档、DOM树的一部分，或某个元素。此外还可以观察元素属性、子节点、文本，或者前三者任意组合的变化。

#### 基本用法
MutationObserver的实例要通过调用MutationObserver构造函数并传入一个回调函数来创建：
```js
let observer = new MutationObserver(() => console.log('DOM was mutated! '));
```
要把这个observer与DOM关联起来，需要使用observe()方法。这个方法接收两个必需的参数：要观察其变化的DOM节点，以及一个MutationObserverInit对象。
```js
let observer = new MutationObserver(() => console.log('<body> attributes changed'));
observer.observe(document.body, { attributes: true });
```



## DOM扩展

### Selectors API

#### querySelector()
querySelector()方法接收CSS选择符参数，返回匹配该模式的第一个后代元素，如果没有匹配项则返回null。下面是一些例子：
```js
// 取得<body>元素
let body = document.querySelector("body");
// 取得ID为"myDiv"的元素
let myDiv = document.querySelector("#myDiv");
// 取得类名为"selected"的第一个元素
let selected = document.querySelector(".selected");
// 取得类名为"button"的图片
let img = document.body.querySelector("img.button");
```

#### querySelectorAll()
querySelectorAll()方法跟querySelector()一样，也接收一个用于查询的参数，但它会返回所有匹配的节点，而不止一个。这个方法返回的是一个NodeList的静态实例。再强调一次，querySelectorAll()返回的NodeList实例一个属性和方法都不缺，但它**是一个静态的“快照”，而非“实时”的查询**。这样的底层实现避免了使用NodeList对象可能造成的性能问题。

#### matches()
matches()方法（在规范草案中称为matchesSelector()）接收一个CSS选择符参数，如果元素匹配则该选择符返回true，否则返回false。


### 元素遍历
IE9之前的版本不会把元素间的空格当成空白节点，而其他浏览器则会。这样就导致了childNodes和firstChild等属性上的差异。为了弥补这个差异，同时不影响DOM规范，W3C通过新的Element Traversal规范定义了一组新属性。    

Element Traversal API为DOM元素添加了5个属性：      
- childElementCount，返回子元素数量（不包含文本节点和注释）；
- firstElementChild，指向第一个Element类型的子元素（Element版firstChild）；
- lastElementChild，指向最后一个Element类型的子元素（Element版lastChild）；
- previousElementSibling，指向前一个Element类型的同胞元素（Element版previousSibling）；
- nextElementSibling，指向后一个Element类型的同胞元素（Element版nextSibling）。


### HTML5
HTML5代表着与以前的HTML截然不同的方向。在所有以前的HTML规范中，从未出现过描述JavaScript接口的情形，HTML就是一个纯标记语言。JavaScript绑定的事，一概交给DOM规范去定义。然而，HTML5规范却包含了与标记相关的大量JavaScript API定义。其中有的API与DOM重合，定义了浏览器应该提供的DOM扩展。    

#### CSS类扩展
1. getElementsByClassName()    
   接收一个参数，即包含一个或多个类名的字符串，返回类名中包含相应类的元素的NodeList。如果提供了多个类名，则顺序无关紧要。
2. classList属性    
   - add（value），向类名列表中添加指定的字符串值value。如果这个值已经存在，则什么也不做。
   - contains（value），返回布尔值，表示给定的value是否存在。
   - remove（value），从类名列表中删除指定的字符串值value。
   - toggle（value），如果类名列表中已经存在指定的value，则删除；如果不存在，则添加。
3. 焦点管理    
   document.activeElement方法，始终包含当前拥有焦点的DOM元素。页面加载时，可以通过用户输入（按Tab键或代码中使用focus()方法）
   让某个元素自动获得焦点。     
   默认情况下，document.activeElement在页面刚加载完之后会设置为document.body。而在页面完全加载之前，document.activeElement的值为null。     
   document.hasFocus()方法，该方法返回布尔值，表示文档是否拥有焦点。    

#### HTMLDocument扩展

#### scrollIntoView()
scrollIntoView()方法存在于所有HTML元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口。这个方法的参数如下：
- alignToTop是一个布尔值。
  - true：窗口滚动后元素的顶部与视口顶部对齐。
  - false：窗口滚动后元素的底部与视口底部对齐。
- scrollIntoViewOptions是一个选项对象。
  - behavior：定义过渡动画，可取的值为"smooth"和"auto"，默认为"auto"。
  - block：定义垂直方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为"start"。
  - inline：定义水平方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为"nearest"。
- 不传参数等同于alignToTop为true
例子：
```js
// 确保元素可见
document.forms[0].scrollIntoView();
// 同上
document.forms[0].scrollIntoView(true);
document.forms[0].scrollIntoView({block: 'start'});
// 尝试将元素平滑地滚入视口
document.forms[0].scrollIntoView({behavior: 'smooth', block: 'start'});
```



## DOM2和DOM3
DOM1（DOM Level 1）主要定义了HTML和XML文档的底层结构。DOM2（DOM Level 2）和DOM3（DOM Level 3）在这些结构之上加入更多交互能力，提供了更高级的XML特性。实际上，DOM2和DOM3是按照模块化的思路来制定标准的，每个模块之间有一定关联，但分别针对某个DOM子集。这些模式如下所示。
- DOM Core：在DOM1核心部分的基础上，为节点增加方法和属性。
- DOM Views：定义基于样式信息的不同视图。
- DOM Events：定义通过事件实现DOM文档交互。
- DOM Style：定义以编程方式访问和修改CSS样式的接口。
- DOM Traversal and Range：新增遍历DOM文档及选择文档内容的接口。
- DOM HTML：在DOM1 HTML部分的基础上，增加属性、方法和新接口。
- DOM Mutation Observers：定义基于DOM变化触发回调的接口。这个模块是DOM4级模块，用于取代Mutation Events。