---
title: flex 布局
autoGroup-1: CSS基础
sidebarDepth: 0
autoSort: 1000
---

### flexbox 的两根轴线（主轴和交叉轴）
主轴由`flex-direction`定义，另一根轴垂直于它。  
::: tip 提示
flexbox 的特性是沿着主轴或者交叉轴对齐之中的元素。  
:::
#### 主轴 
由`flex-direction`定义，可取值4个：  
- row
- row-reverse
- column
- column-reverse

row 或者 row-reverse，主轴将沿着 inline 方向延伸。  
column 或者 column-reverse，主轴会沿着上下方向延伸 — 也就是 block 排列的方向。  
#### 交叉轴
交叉轴垂直于主轴。  

### 起始线和终止线 
为什么不用上下左右来描述 flexbox 元素的方向：   
flex-direction 是 row ，并且我是在书写英文，那么主轴的起始线是左边，终止线是右边；  
书写阿拉伯文，那么主轴的起始线是右边，终止线是左边。  
这两种情况下，交叉轴的起始线是 flex 容器的顶部，终止线是底部，因为两种语言都是水平书写模式。  

### Flex 容器
把一个容器的 display 属性值改为 flex 或者 inline-flex，flex 容器中的所有 flex 元素都会有下列行为：  
- 元素排列为一行 (flex-direction 属性的初始值是 row)；
- 元素从主轴的起始线开始；
- 元素不会在主维度方向拉伸，但是可以缩小；
- 元素被拉伸来填充交叉轴大小；
- flex-basis（flex 元素在主轴方向上的初始大小） 属性为 auto；
- flex-wrap（flex 元素单行显示还是多行显示） 属性为 nowrap

### 简写属性 flex-flow
是 flex-direction 和 flex-wrap 的简写，第一个指定的值为 flex-direction ，第二个指定的值为 flex-wrap。  

### 可用空间 available space
假设在 1 个 500px 的容器中，我们有 3 个 100px 宽的元素，那么这 3 个元素需要占 300px 的宽，剩下 200px 的**可用空间`available space`**。在默认情况下，flexbox 的行为会把这 200px 的空间留在最后一个元素的后面。  
如果期望这些元素能自动地扩展去填充满剩下的空间，那么我们需要去控制可用空间在这几个元素间如何分配，这就是元素上的那些 flex 属性要做的事。  

###  flex 元素上的属性
- **flex-grow（负值无效，默认为 0）**    
  处理 flex 元素在主轴上增加空间的问题，设置`flex`元素按主轴方向的增长系数，会使该元素延展，并占据此方向轴上的可用空间（available space）。  
  `flex-grow`属性可以按比例分配空间。
  如果一共三个元素，第一个元素`flex-grow`值为 2，其他元素值为 1，则第一个元素将占有 2/4, 另外两个元素各占有1/4。
- **flex-shrink**  
  处理 flex 元素收缩的问题，可以赋予不同的值来控制 flex 元素收缩的程度，可以按比例收缩。  
- **flex-basis**  
  flex 元素是在这个基准值的基础上缩放的。  
  定义了元素的空间大小，默认值是 auto。  
  如果没有给元素设定尺寸，flex-basis 的值采用元素内容的尺寸。
- order    
  定义元素的排列顺序。数值越小，排列越靠前，默认为0。
- align-self   
  允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

### Flex 属性的简写
Flex 简写形式允许你把三个数值按这个顺序书写 — flex-grow，flex-shrink，flex-basis。  
即：`flex: flex-grow flex-shrink flex-basis;`。  
#### 几种预定义的值
- flex: initial  
  相当于 flex: 0 1 auto，素既不可以拉伸可以收缩
- flex: auto
  等同于 flex: 1 1 auto，元素既可以拉伸也可以收缩
- flex: none
  flex: 0 0 auto，元素既不能拉伸或者收缩
- flex: number  
  常看到的 flex: 1 或者 flex: 2 等等， 它相当于flex: 1 1 0。元素可以在flex-basis为 0 的基础上伸缩。
  
### 元素间的对齐和空间分配（容器的属性）
- align-items  
  使元素在交叉轴方向对齐  
  - stretch（初始值）     
    拉伸来填满 flex 容器 —— 最高的元素定义了容器的高度  
  - flex-start  
    按 flex 容器的顶部对齐
  - flex-end  
     flex 容器的下部对齐
  - center  
    居中对齐
- justify-content  
  使元素在主轴方向上对齐  
  - stretch  
    均匀排列每个元素  
    'auto'-sized 的元素会被拉伸以适应容器的大小
  - flex-start（初始值）   
    从容器的起始线排列
  - flex-end
    从终止线开始排列
  - center
    在中间排列
  - space-around
    使每个元素的左右空间相等
  - space-between
    使元素之间间隔相等
- align-content  
  如何沿着弹性盒子布局的纵轴和网格布局的主轴在内容项之间和周围分配空间。（即：行怎么排列）    
  该属性对单行弹性盒子模型无效。（即：带有 flex-wrap: nowrap）
  - center  
    所有行朝向容器的中心填充。每行互相紧挨，相对于容器居中对齐。容器的垂直轴起点边和第一行的距离相等于容器的垂直轴终点边和最后一行的距离。
  - start  
    所有行从容器的起始边缘开始填充
  - end  
    所有行从容器的结束边缘开始填充。
  - flex-start  
    所有行从垂直轴起点开始填充。第一行的垂直轴起点边和容器的垂直轴起点边对齐。接下来的每一行紧跟前一行。
  - flex-end  
    所有行从垂直轴末尾开始填充。最后一行的垂直轴终点和容器的垂直轴终点对齐。同时所有后续行与前一个对齐。
  - space-between  
    均匀分布项目项目在上下两端有一半大小的空间
  - space-around  
    均匀分布项目项目周围有相等的空间
