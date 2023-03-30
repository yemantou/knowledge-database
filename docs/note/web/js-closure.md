---
title: 闭包
autoGroup-1: JS
sidebarDepth: 0
autoSort: 991
---

# 闭包
闭包的定义：    
在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。可以在一个内层函数中访问到其外层函数的作用域。   
闭包是指那些能够访问自由变量的函数。 自由变量是指在函数中使用的，但既不是当前函数参数也不是当前函数的局部变量的变量。 闭包 = 函数 + 函数能够访问的自由变量。  

**闭包 = 函数 + 函数能够访问的自由变量** 
  
## ECMAScript中，闭包指的是：
**从理论角度：**      
所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。     
**从实践角度：**        
即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）;在代码中引用了自由变量。     

## 闭包分析：   
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();
```
**执行上下文栈和执行上下文的变化情况：**     
- 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
- 全局执行上下文初始化
- 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
- checkscope 执行上下文初始化，创建变量对象、作用域链、this等
- checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
- 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
- f 执行上下文初始化，创建变量对象、作用域链、this等
- f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

由以上的执行过程可以看出，执行 f 函数时**checkscope函数的执行上下文已经被销毁了（从执行上下文栈中被弹出）**，所以读取到 checkscope 作用域下的 scope 值其实**是通过f 执行上下文维护的作用域链。**   
```js
fContext = {
    Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
```