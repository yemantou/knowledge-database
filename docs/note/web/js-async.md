---
title: 异步（async）
autoGroup-1: JS
sidebarDepth: 0
autoSort: 988
---

# 异步

## event loop（事件循环）、宏任务和微任务
**事件循环是js实现异步的一种方法，也是js的执行机制。**    

::: tip 参考视频
[什么是event loop](https://www.bilibili.com/video/BV1oV411k7XY/?spm_id_from=333.788.recommend_more_video.-1)     
[JS代码执行流程网站](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)    
:::

#### JS代码运行的顺序
1. JS代码按顺序进入调用栈执行
2. 遇到异步代码入栈后马上出栈到 Web APIs 中创建线程开始执行
3. 异步代码执行完毕后进入任务队列
4. 任务队列中的任务等待调用栈清空后进入调用栈执行


### 宏任务和微任务（任务队列中分为宏任务和微任务）
异步任务主要分为宏任务与微任务两种。ES6 规范中，宏任务（Macrotask） 称为 Task， 微任务（Microtask） 称为 Jobs。宏任务是由宿主（浏览器、Node）发起的，而微任务由 JS 自身发起。     
::: tip 参考文章
[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.cn/post/6844903512845860872)     
[深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.cn/post/6844904165462769678)    
:::
哪些是宏任务，哪些是微任务？    
![图示](@assets/img/note-web/macro-micro.png)  

### 如何理解 script（整体代码块）是个宏任务呢
实际上如果同时存在两个 script 代码块，会首先在执行第一个 script 代码块中的同步代码，如果这个过程中创建了微任务并进入了微任务队列，第一个 script 同步代码执行完之后，会首先去清空微任务队列，再去开启第二个 script 代码块的执行。所以这里应该就可以理解 script（整体代码块）为什么会是宏任务。    

### 事件循环（event loop）          
1. JS代码按顺序进入调用栈执行，遇到异步代码入栈后马上出栈到 Web APIs 中创建线程开始执行，异步代码执行完毕后回调进入任务队列（宏任务和微任务队列）
2. 微任务队列开始按照入队顺序，依次执行其中的微任务，直至微任务队列清空为止；            
   **(执行过程中产生的新的微任务添加到微任务队列中一起清空，微任务队列没清空之前，是不会执行下一个宏任务的)**
3. 当微任务队列清空后，一个事件循环结束；
4. 接着从宏任务队列中，找到下一个执行的宏任务，开始第二个事件循环，宏任务执行完后再次进行2步骤内容，直至宏任务队列清空为止。

### 页面渲染
**每次当一次事件循环结束后，即一个宏任务执行完成后以及微任务队列被清空后，浏览器就会判断需不需要更新渲染，需要就会进行一次页面更新渲染。**    

通常我们浏览器页面刷新频率是60fps，也就是意味着16.67ms要刷新一次，因此我们也要尽量保证一次事件循环控制在16.67ms之内，这也是我们**需要做代码性能优化的一个原因**。



## Promise
::: tip 学习参考文章
[Promise 对象](https://es6.ruanyifeng.com/#docs/promise)    
[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469#heading-0)       
[要就来45道Promise面试题一次爽到底](https://juejin.cn/post/6844904077537574919)      
:::


## async/await 和 Promise 的关系
- async/await 是消灭异步回调的终极武器。
- 但和 Promise 并不互斥，反而，两者相辅相成。
- 执行 async 函数，返回的一定是 Promise 对象。
- await 相当于 Promise 的 then。
- try...catch 可捕获异常，代替了 Promise 的 catch。

## async、await 细节

