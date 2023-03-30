---
title: 动画与Canvas图形
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 982
---

## 动画与Canvas图形
与浏览器环境中的其他部分一样，\<canvas>自身提供了一些API，但并非所有浏览器都支持这些API，其中包括支持基础绘图能力的2D上下文和被称为WebGL的3D上下文。支持的浏览器的最新版本现在都支持2D上下文和WebGL。

### 使用requestAnimationFrame

#### 早期定时动画
以前，在JavaScript中创建动画基本上就是使用setInterval()来控制动画的执行。下面的例子展示了使用setInterval()的基本模式：
```js
(function() {
  function updateAnimations() {
    doAnimation1();
    doAnimation2();
    // 其他任务
  }
  setInterval(updateAnimations, 100);
})();
```
作为一个小型动画库的标配，这个updateAnimations()方法会周期性运行注册的动画任务，并反映出每个任务的变化（例如，同时更新滚动新闻和进度条）。如果没有动画需要更新，则这个方法既可以什么也不做，直接退出，也可以停止动画循环，等待其他需要更新的动画。    

#### 时间间隔的问题
知道何时绘制下一帧是创造平滑动画的关键。直到几年前，都没有办法确切保证何时能让浏览器把下一帧绘制出来。随着\<canvas>的流行和HTML5游戏的兴起，开发者发现setInterval()和setTimeout()的不精确是个大问题。     
浏览器自身计时器的精度让这个问题雪上加霜。浏览器的计时器精度不足毫秒。    

#### requestAnimationFrame
创造一个新方法，用以通知浏览器某些JavaScript代码要执行动画了。这样浏览器就可以在运行某些代码后进行适当的优化。目前所有浏览器都支持这个方法不带前缀的版本，即requestAnimationFrame()。   

requestAnimationFrame()方法接收一个参数，此参数是一个要在重绘屏幕前调用的函数。这个函数就是修改DOM样式以反映下一次重绘有什么变化的地方。为了实现动画循环，可以把多个requestAnimationFrame()调用串联起来，就像以前使用setTimeout()时一样：
```js
function updateProgress() {
  var div = document.getElementById("status");
  div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
  if (div.style.left ! = "100%") {
    requestAnimationFrame(updateProgress);
  }
}
requestAnimationFrame(updateProgress);
```
传给requestAnimationFrame()的函数实际上可以接收一个参数，此参数是一个DOMHighRes-TimeStamp的实例（比如performance.now()返回的值），表示下次重绘的时间。这一点非常重要：requestAnimationFrame()实际上把重绘任务安排在了未来一个已知的时间点上，而且通过这个参数告诉了开发者。基于这个参数，就可以更好地决定如何调优动画了。    

#### cancelAnimationFrame
与setTimeout()类似，requestAnimationFrame()也返回一个请求ID，可以用于通过另一个方法cancelAnimationFrame()来取消重绘任务。   

#### 通过requestAnimationFrame节流
支持这个方法的浏览器实际上会暴露出作为钩子的回调队列。所谓钩子（hook），就是浏览器在执行下一次重绘之前的一个点。这个回调队列是一个可修改的函数列表，包含应该在重绘之前调用的函数。每次调用requestAnimationFrame()都会在队列上推入一个回调函数，队列的长度没有限制。     

这个回调队列的行为不一定跟动画有关。不过，通过requestAnimationFrame()递归地向队列中加入回调函数，可以保证每次重绘最多只调用一次回调函数。这是一个非常好的节流工具。在频繁执行影响页面外观的代码时（比如滚动事件监听器），可以利用这个回调队列进行节流。    

先来看一个原生实现，其中的滚动事件监听器每次触发都会调用名为expensiveOperation()（耗时操作）的函数。当向下滚动网页时，这个事件很快就会被触发并执行成百上千次，想把事件处理程序的调用限制在每次重绘前发生，那么可以像这样下面把它封装到request-AnimationFrame()调用中：
```js
letenabled=true;
function expensiveOperation() {
  console.log('Invoked at', Date.now());
}
window.addEventListener('scroll', () => {
  if(enabled){
    enabled=false;
    window.requestAnimationFrame(expensiveOperation);
    window.setTimeout(()=>enabled=true, 50);
  }
});
```


### WebGL
WebGL是画布的3D上下文。与其他Web技术不同，WebGL不是W3C制定的标准，而是Khronos Group的标准。Khronos Group也制定了其他图形API，包括作为浏览器中WebGL基础的OpenGL ES 2.0。    
OpenGL这种3D图形语言很复杂，本书不会涉及过多相关概念。不过，要使用WebGL最好熟悉OpenGL ES 2.0，因为很多概念可以照搬过来。      
**推荐一个WebGL教程网站：Learn WebGL。**       


