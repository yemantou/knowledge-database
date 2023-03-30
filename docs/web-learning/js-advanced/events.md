---
title: 事件
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 983
---

## 事件

### 事件流
页面哪个部分拥有特定的事件呢？要理解这个问题，可以在一张纸上画几个同心圆。把手指放到圆心上，则手指不仅是在一个圆圈里，而且是在所有的圆圈里。当你点击一个按钮时，实际上不光点击了这个按钮，还点击了它的容器以及整个页面。事件流描述了页面接收事件的顺序。    

#### 事件冒泡
IE事件流被称为事件冒泡，这是因为事件被定义为从最具体的元素（文档树中最深的节点）开始触发，然后向上传播至没有那么具体的元素（文档）。   

#### 事件捕获
事件捕获的意思是最不具体的节点应该最先收到事件，而最具体的节点应该最后收到事件。**与冒泡顺序刚好相反**。

#### DOM事件流
DOM2 Events规范规定事件流分为3个阶段：事件捕获、到达目标和事件冒泡。事件捕获最先发生，为提前拦截事件提供了可能。然后，实际的目标元素接收到事件。最后一个阶段是冒泡，最迟要在这个阶段响应事件。

点击\<div>元素会以如图所示的顺序触发事件。
![DOM事件流](@assets/img/events.png)
在DOM事件流中，实际的目标（\<div>元素）在捕获阶段不会接收到事件。这是因为捕获阶段从document到\<html>再到\<body>就结束了。      
大多数支持DOM事件流的浏览器实现了一个小小的拓展。虽然DOM2 Events规范明确捕获阶段不命中事件目标，但现代浏览器都会在捕获阶段在事件目标上触发事件。最终结果是在事件目标上有两个机会来处理事件。     


### 事件处理程序
事件意味着用户或浏览器执行的某种动作。比如，单击（click）、加载（load）、鼠标悬停（mouseover）。为响应事件而调用的函数被称为事件处理程序（或事件监听器）。事件处理程序的名字以"on"开头，因此click事件的处理程序叫作onclick，而load事件的处理程序叫作onload。有很多方式可以指定事件处理程序。     


#### DOM0事件处理程序
在JavaScript中指定事件处理程序的传统方式是把一个函数赋值给（DOM元素的）一个事件处理程序属性。这也是在第四代Web浏览器中开始支持的事件处理程序赋值方法，直到现在所有现代浏览器仍然都支持此方法，主要原因是简单。要使用JavaScript指定事件处理程序，必须先取得要操作对象的引用。    
每个元素（包括window和document）都有通常小写的事件处理程序属性，比如onclick。只要把这个属性赋值为一个函数即可： 
```js
let btn = document.getElementById("myBtn");
btn.onclick = function() {
  console.log("Clicked");
};
```
像这样使用DOM0方式为事件处理程序赋值时，所赋函数被视为元素的方法。因此，事件处理程序会在元素的作用域中运行，即this等于元素。    

#### DOM2事件处理程序
OM2 Events为事件处理程序的赋值和移除定义了两个方法：addEventListener()和remove-EventListener()。它们接收3个参数：事件名、事件处理函数和一个布尔值，true表示在捕获阶段调用事件处理程序，false（默认值）表示在冒泡阶段调用事件处理程序。例：     
```js
let btn = document.getElementById("myBtn");
btn.addEventListener("click", ()=>{
  console.log(this.id);
}, false);
```
使用DOM2方式的主要优势是可以为同一个事件添加多个事件处理程序。例：
```js
let btn = document.getElementById("myBtn");
btn.addEventListener("click", () => {
  console.log(this.id);
}, false);
btn.addEventListener("click", ()=>{
  console.log("Helloworld!");
}, false);
```
多个事件处理程序以添加顺序来触发，因此前面的代码会先打印元素ID，然后显示消息“Hello world! ”。     
通过addEventListener()添加的事件处理程序只能使用removeEventListener()并传入与添加时同样的参数来移除。这意味着使用addEventListener()添加的匿名函数无法移除。    

#### IE事件处理程序
IE实现了与DOM类似的方法，即attachEvent()和detachEvent()。这两个方法接收两个同样的参数：事件处理程序的名字和事件处理函数。因为IE8及更早版本只支持事件冒泡，所以使用attachEvent()添加的事件处理程序会添加到冒泡阶段。    

#### 跨浏览器事件处理程序
```js
var EventUtil = {
  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  }
};
```


### 事件对象
在DOM中发生事件时，所有相关信息都会被收集并存储在一个名为event的对象中。这个对象包含了一些基本信息，比如导致事件的元素、发生的事件类型，以及可能与特定事件相关的任何其他数据。   

#### DOM事件对象
在DOM合规的浏览器中，event对象是传给事件处理程序的唯一参数。不管以哪种方式（DOM0或DOM2）指定事件处理程序，都会传入这个event对象。下面的例子展示了在两种方式下都可以使用事件对象：
```js
let btn = document.getElementById("myBtn");
btn.onclick=function(event){
  console.log(event.type);  //"click"
};
btn.addEventListener("click", (event)=>{
  console.log(event.type);  //"click"
}, false);
```


### 事件类型
Web浏览器中可以发生很多种事件。如前所述，所发生事件的类型决定了事件对象中会保存什么信息。DOM3 Events定义了如下事件类型。
- 用户界面事件（UIEvent）：涉及与BOM交互的通用浏览器事件。
- 焦点事件（FocusEvent）：在元素获得和失去焦点时触发。
- 鼠标事件（MouseEvent）：使用鼠标在页面上执行某些操作时触发。
- 滚轮事件（WheelEvent）：使用鼠标滚轮（或类似设备）时触发。
- 输入事件（InputEvent）：向文档中输入文本时触发。
- 键盘事件（KeyboardEvent）：使用键盘在页面上执行某些操作时触发。
- 合成事件（CompositionEvent）：在使用某种IME（Input Method Editor，输入法编辑器）输入字符时触发。

#### 合成事件
合成事件是DOM3 Events中新增的，用于处理通常使用IME输入时的复杂输入序列。IME可以让用户输入物理键盘上没有的字符。例如，使用拉丁字母键盘的用户还可以使用IME输入日文。IME通常需要同时按下多个键才能输入一个字符。合成事件用于检测和控制这种输入。合成事件有以下3种：
- compositionstart，在IME的文本合成系统打开时触发，表示输入即将开始；
- compositionupdate，在新字符插入输入字段时触发；
- compositionend，在IME的文本合成系统关闭时触发，表示恢复正常键盘输入。    


### 内存与性能
因为事件处理程序在现代Web应用中可以实现交互，所以很多开发者会错误地在页面中大量使用它们。在创建GUI的语言如C#中，通常会给GUI上的每个按钮设置一个onclick事件处理程序。这样做不会有什么性能损耗。在JavaScript中，页面中事件处理程序的数量与页面整体性能直接相关。原因有很多。首先，每个函数都是对象，都占用内存空间，对象越多，性能越差。其次，为指定事件处理程序所需访问DOM的次数会先期造成整个页面交互的延迟。只要在使用事件处理程序时多注意一些方法，就可以改善页面性能。   

#### 事件委托
“过多事件处理程序”的解决方案是使用事件委托。事件委托利用事件冒泡，可以只使用一个事件处理程序来管理一种类型的事件。    
例如有以下HTML：
```html
<ul id="myLinks">
  <li id="goSomewhere">Go somewhere</li>
  <li id="doSomething">Do something</li>
  <li id="sayHi">Say hi</li>
</ul>
```
这里的HTML包含3个列表项，在被点击时应该执行某个操作。对此，通常的做法是像这样指定3个事件处理程序：
```js
let item1 = document.getElementById("goSomewhere");
let item2 = document.getElementById("doSomething");
let item3 = document.getElementById("sayHi");
item1.addEventListener("click", (event) => {
  location.href = "http:// www.wrox.com";
});
item2.addEventListener("click", (event) => {
  document.title = "I changed the document's title";
});
item3.addEventListener("click", (event) => {
  console.log("hi");
});
```
使用事件委托，只要给所有元素共同的祖先节点添加一个事件处理程序，就可以解决问题。比如：
```js
let list = document.getElementById("myLinks");
list.addEventListener("click", (event) => {
  let target = event.target;
  switch(target.id) {
    case "doSomething":
      document.title = "I changed the document's title";
      break;
    case "goSomewhere":
      location.href = "http:// www.wrox.com";
      break;
    case "sayHi":
      console.log("hi");
      break;
  }
});
```

#### 删除事件处理程序
把事件处理程序指定给元素后，在浏览器代码和负责页面交互的JavaScript代码之间就建立了联系。这种联系建立得越多，页面性能就越差。除了通过事件委托来限制这种连接之外，还应该及时删除不用的事件处理程序。很多Web应用性能不佳都是由于无用的事件处理程序长驻内存导致的。    

导致这个问题的原因主要有两个：
1. 删除带有事件处理程序的元素。
2. 使用innerHTML整体替换页面的某一部分。


### 模拟事件
事件就是为了表示网页中某个有意义的时刻。通常，事件都是由用户交互或浏览器功能触发。事实上，可能很少有人知道可以通过JavaScript在任何时候触发任意事件，而这些事件会被当成浏览器创建的事件。这意味着同样会有事件冒泡，因而也会触发相应的事件处理程序。这种能力在测试Web应用时特别有用。DOM3规范指明了模拟特定类型事件的方式。    

#### DOM事件模拟
任何时候，都可以使用document.createEvent()方法创建一个event对象。这个方法接收一个参数，此参数是一个表示要创建事件类型的字符串。


### 小结
围绕着使用事件，需要考虑内存与性能问题。例如：
- 最好限制一个页面中事件处理程序的数量，因为它们会占用过多内存，导致页面响应缓慢；
- 利用事件冒泡，事件委托可以解决限制事件处理程序数量的问题；
- 最好在页面卸载之前删除所有事件处理程序。