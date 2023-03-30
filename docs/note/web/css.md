---
title: CSS复习
autoGroup-1: CSS
sidebarDepth: 0
autoSort: 998
---

## CSS复习
[CSS 考点](https://juejin.cn/post/6905539198107942919)

### 盒模型介绍
CSS3 中的盒模型（box-sizing）有以下两种：标准盒模型、IE（替代）盒模型。  
- box-sizing: content-box ：标准盒模型（默认值）。
- box-sizing: border-box ：IE（替代）盒模型。    
  
两种盒子模型都是由 content + padding + border + margin 构成，其大小都是由 content + padding + border 决定的，但是盒子内容宽/高度（即 width/height）的计算范围根据盒模型的不同会有所不同：
- 标准盒模型：只包含 content 。
- IE（替代）盒模型：content + padding + border 。


### css 选择器和优先级
[选择器的种类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#%E9%80%89%E6%8B%A9%E5%99%A8%E5%8F%82%E8%80%83%E8%A1%A8)    

常规来说，样式的优先级一般为 !important > style > id > class > 标签选择器。   

::: tip 参考文章
[深入理解CSS选择器优先级](https://juejin.cn/post/6844903709772611592)
:::

优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：

1. 如果存在内联样式，那么 A = 1, 否则 A = 0;
2. B 的值等于 ID选择器 出现的次数;
3. C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数;
4. D 的值等于 标签选择器 和 伪元素 出现的总次数 。
**比较规则是: 从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则取后面的。**     


### 伪类和伪元素的区别
伪类和伪元素的根本区别在于：是否创造了新的元素。
1. 语法     
   伪元素使用双冒号（::），而伪类使用单个冒号（:）。   
   一个选择器中只能使用一个伪元素。伪元素必须紧跟在语句中的简单选择器/基础选择器之后。   
   可以在一个选择器中同时一起写多个伪类。    
2. 概念    
   伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式，例如::first-line 伪元素可改变段落首行文字的样式。   
   伪类是用来定义元素特殊状态的，可以用来设置鼠标悬停样式等。

   
### 重排（reflow）和重绘（repaint）的理解
::: tip 参考文章
[你真的了解回流和重绘吗](https://juejin.cn/post/6844903779700047885)
:::

**回流一定会触发重绘，而重绘不一定会回流**    

概念：    
- 重排：任何方式影响了页面布局或者元素的几何信息(元素在视口内的位置和尺寸大小)，浏览器需要**重新计算元素在视口内的几何属性**，这个过程叫做重排。    
  比如以下情况会发生重排：    
  - 添加或删除可见的DOM元素
  - 元素的位置发生变化
  - 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
  - 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
  - 页面一开始渲染的时候（这肯定避免不了）
  - 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
- 重绘：通过构造渲染树和重排（回流）阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(元素在视口内的位置和尺寸大小)，
  接下来就可以将渲染树的每个节点都**转换为屏幕上的实际像素**，这个阶段就叫做重绘。    

减少重排和重绘的方法：    
- 最小化重绘和重排，比如样式集中改变，使用添加新样式类名 .class 或 cssText。   
- 批量操作 DOM，比如读取某元素 offsetWidth 属性存到一个临时变量，再去使用，而不是频繁使用这个计算属性；又比如利用 document.createDocumentFragment() 来添加要被添加的节点，
  处理完之后再插入到实际 DOM 中。
- 对于复杂动画效果,使用绝对定位让其脱离文档流。      
- css3硬件加速（GPU加速）    
  使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。    
  对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。   


### 对 BFC（Block Formatting Contexts）块级格式化上下文 的理解
::: tip 参考文章
[可能是最好的BFC解析了...](https://juejin.cn/post/6960866014384881671)
:::

以下元素会创建 BFC：

- 根元素（\<html>）
- 浮动元素（float 不为 none）
- 绝对定位元素（position 为 absolute 或 fixed）
- 表格的标题和单元格（display 为 table-caption，table-cell）
- 匿名表格单元格元素（display 为 table 或 inline-table）
- 行内块元素（display 为 inline-block），inline-block会使元素变为行内块
- overflow 的值不为 visible 的元素
- 弹性元素（display 为 flex 或 inline-flex 的元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 的元素的直接子元素）

以上是 CSS2.1 规范定义的 BFC 触发方式，在最新的 CSS3 规范中，弹性元素和网格元素会创建 F(Flex)FC 和 G(Grid)FC。

**BFC 的范围**：     
BFC 包含创建它的元素的所有子元素，但是不包括创建了新的 BFC 的子元素的内部元素。子元素如果又创建了一个新的 BFC，那么它里面的内容就不属于上一个 BFC 了，这体现了 BFC 隔离 的思想。也就是说：**一个元素不能同时存在于两个 BFC 中。**

**BFC 的特性**：      
- BFC 内部的块级盒会在垂直方向上一个接一个排列 
- 同一个 BFC 下的相邻块级元素可能发生外边距折叠，创建新的 BFC 可以避免的外边距折叠 
- 每个元素的外边距盒（margin box）的左边与包含块边框盒（border box）的左边相接触（从右向左的格式化，则相反），即使存在浮动也是如此。**也就是BFC元素与包含块左边对齐**。
- 浮动盒的区域不会和 BFC 重叠 
- 计算 BFC 的高度时，浮动元素也会参与计算 

**BFC 的应用**    
1. 自适应多栏布局：中间栏创建 BFC，左右栏宽度固定后浮动。     
   由于盒子的 margin box 的左边和包含块 border box 的左边相接触，同时浮动盒的区域不会和 BFC 重叠，所以中间栏的宽度会自适应。   
2. 防止外边距折叠。     
   创建新的 BFC ，让相邻的块级盒位于不同 BFC 下可以防止外边距折叠。   
3. 清除浮动。    
   BFC 内部的浮动元素也会参与高度计算，可以清除 BFC 内部的浮动。   


### 实现两栏布局（左侧固定 + 右侧自适应布局）
1. 利用BFC
   ```css
    .outer {
      height: 200px;
    }
    .left {
      float: left;
      height: 200px;
      width: 50px;
      background-color:aqua;
    }
    .right {
      height: 200px;
      overflow: auto;
      background-color: antiquewhite;
    }
   ```
2. 利用浮动，左边元素宽度固定 ，设置向左浮动。将右边元素的 margin-left 设为固定宽度 。注意，因为右边元素的 width 默认为 auto ，所以会自动撑满父元素。
3. 利用 flex 布局，左边元素固定宽度，右边的元素设置 flex: 1 。  
4. 利用绝对定位，父级元素设为相对定位。左边元素 absolute  定位，宽度固定。右边元素的 margin-left  的值设为左边元素的宽度值。    
5. 利用绝对定位，父级元素设为相对定位。左边元素宽度固定，右边元素 absolute  定位， left  为宽度大小，其余方向定位为 0 。    


### 实现圣杯布局和双飞翼布局（经典三分栏布局）
**圣杯布局和双飞翼布局的目的：**
- 三栏布局，中间一栏最先加载和渲染（内容最重要，这就是为什么还需要了解这种布局的原因）。
- 两侧内容固定，中间内容随着宽度自适应。
- 一般用于 PC 网页。

**给元素设置margin只会影响相邻元素摆放位置、自己的摆放位置、自己的总宽度、自己的总高度，并不会影响自己的内容宽度或高度的显示。**     
::: tip 参考文章
[深入理解浮动元素与margin负值用法及三栏布局](https://blog.csdn.net/liu_yunzhao/article/details/103976547)
:::

**后边的浮动会盖住前边的浮动元素**    

**margin 的left， top， right， bottom设置负值的分别作用**    
- margin-top和margin-left负值，元素向上、向左移动；
- margin-right负值，右侧元素左移，自身不受影响；
- margin-bottom负值，下方元素上移，自身不受影响；

**实现方法：**     
- 使用 float  布局。
- 两侧使用 margin 负值，以便和中间内容横向重叠。
- 防止中间内容被两侧覆盖，圣杯布局用 padding ，双飞翼布局用 margin 。

**圣杯布局**     
```html
<html>
<head>
<meta charset="utf-8">
<style type="text/css">
#container {
  padding-left: 200px;
  padding-right: 150px;
  overflow: auto;
}
#container p {
  float: left;
}
.center {
  width: 100%;
  background-color: lightcoral;
}
.left {
  width: 200px;
  position: relative;
  left: -200px;
  margin-left: -100%;
  background-color: lightcyan;
}
.right {
  width: 150px;
  margin-right: -150px;
  background-color: lightgreen;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
</style>
</head>
<body>
  <div id="container" class="clearfix">
    <p class="center">我是中间</p>
    <p class="left">我是左边</p>
    <p class="right">我是右边</p>
  </div>
</body>
</html>
```
**margin-left: -100%;**     
margin-left为负是子元素相对于父元素的最右侧位置，100%的意思就是相对于父元素右边框距离为100%，这样，子元素左边框与父元素左边框重合，实现元素居左。    


### 水平垂直居中多种实现方式
::: tip 参考文章
[你能实现多少种水平垂直居中的布局（定宽高和不定宽高）](https://juejin.cn/post/6844903982960214029)
:::
1. 利用绝对定位，设置 left: 50%  和 top: 50%  现将子元素左上角移到父元素中心位置，然后再通过 translate  来调整子元素的中心点到父元素的中心。该方法可以不定宽高。   
2. 利用绝对定位，子元素所有方向都为 0 ，将 margin  设置为 auto ，由于宽高固定，对应方向实现平分，该方法必须盒子有宽高。   
3. 利用绝对定位，设置 left: 50% 和 top: 50% 现将子元素左上角移到父元素中心位置，然后再通过 margin-left  和 margin-top  以子元素自己的一半宽高进行负值赋值。该方法必须定宽高。
4. 利用 flex ，最经典最方便的一种了，不用解释，定不定宽高无所谓的。

### flex 布局
[点击跳转到flex布局](../../web-learning/css/flex.md)     

::: tip 参考文章
[Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
:::


### line-height 如何继承？
- 父元素的 line-height 写了具体数值，比如 30px，则子元素 line-height 继承该值。
- 父元素的 line-height 写了比例，比如 1.5 或 2，则子元素 line-height 也是继承该比例。
- 父元素的 line-height 写了百分比，比如 200%，则子元素 line-height 继承的是父元素 font-size * 200% 计算出来的值。

