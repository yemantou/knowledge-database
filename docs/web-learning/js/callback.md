---
title: 回调
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 81
---

###  continuation
回调函数包裹或者说封装了程序的延续（continuation）。  
```js
// A
ajax('..', function() {
  // C
});
// B
```
// A和// B表示程序的前半部分（也就是现在的部分），而// C标识了程序的后半部分（也就是将来的部分）。前半部分立刻执行，然后是一段时间不确定的停顿。在未来的某个时刻，如果Ajax调用完成，程序就会从停下的位置继续执行后半部分。  


### 顺序的大脑
::: danger 注意
我们在假装并行执行多个任务时，实际上极有可能是在进行快速的上下文切换，比如与朋友或家人电话聊天的同时还试图打字。换句话说，我们是在两个或更多任务之间快速连续地来回切换，同时处理每个任务的微小片段。我们切换得如此之快，以至于对外界来说，我们就像是在并行地执行所有任务。  
:::

### 嵌套回调与链式回调
回调方式最主要的缺陷：对于它们在代码中表达异步的方式，我们的大脑需要努力才能同步得上。  
回调地狱：一个异步请求套着一个异步请求，一个异步请求依赖于另一个的执行结果，使用回调的方式相互嵌套。  

### 信任问题
回调的信任问题：往第三方工具库（但不限于第三方工具库）传入回调函数时，控制权就交到了其手上（控制反转）。  
如果你的代码中使用了回调，尤其是但也不限于使用第三方工具，而且你还没有应用某种逻辑来解决所有这些控制反转导致的信任问题，那你的代码现在已经有了bug，即使它们还没有给你造成损害。隐藏的bug也是bug。  

