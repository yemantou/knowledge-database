---
title: this的用法
autoGroup-1: Js
sidebarDepth: 0
autoSort: 1000
---

[参考《Javascript 的 this 用法》](https://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)      
[参考《彻底搞懂JavaScript中的this指向问题》](https://zhuanlan.zhihu.com/p/42145138)

### 关于this
this是javaScript的一个关键字。是函数运行时在函数体内部生成的一个对象，只能在函数体内部使用。代码例： 
```js
function test() {
　this.x = 1;
}
// test函数内部会自动有一个this对象可以使用
```

### this的指向
this就是函数运行时所在的环境对象，但是在不同使用场合，this有不同的指向。   
this永远指向一个对象；this的指向完全取决于函数调用的位置。    

#### this使用最频繁的几种情况:   
1. **普通情况函数调用**      
   此时this指向全局对象
   ```js
   var x = 1;
   function test() {
     console.log(this.x);
   }
   test();  // 1
   ```

2. **作为对象方法的调用**     
   此时this指向上级对象
   ```js
   function test() {
    console.log(this.x);
   }

   var obj = {};
   obj.x = 1;
   obj.m = test;

   obj.m(); // 1
   ```

   多层级对象时this指向函数调用的最近一级对象   
   ```js
   function foo() {
    console.log(this.a);

   }
   var obj2 = {
       a: 2,
       fn: foo
   };
   var obj1 = {
       a: 1,
       o1: obj2
   };
   obj1.o1.fn(); // 2
   ```
3. **作为构造函数调用**     
   此时this指向构造函数生成的新对象   
   ```js
   var x = 2;
   function test() {
     this.x = 1;
   }

   var obj = new test();
   obj.x // 1
   x  // 2
   ```  
   
4. **apply 调用**   
   此时this指向apply函数调用传递的第一个参数。参数为空时，默认调用全局对象。       
   ```js
   var x = 0;
   function test() {
    console.log(this.x);
   }

   var obj = {};
   obj.x = 1;
   obj.m = test;
   obj.m.apply(); // 0
   obj.m.apply(obj); // 1
   ```
   
5. **事件绑定中的this**   
   事件绑定共有三种方式：**行内绑定、动态绑定、事件监听**。    

   **行内绑定**：一种情况指向window，一种情况指向本节点对象。        
   ```html
   <input type="button" value="按钮" onclick="clickFun()">
   <script>
    function clickFun(){
        this // 此函数的运行环境在全局window对象下，因此this指向window;
    }
   </script>

   <input type="button" value="按钮" onclick="this">
   <!-- 运行环境在节点对象中，因此this指向本节点对象 -->
   ```

   **动态绑定与事件监听**：this指向本节点对象（事件监听中this指向的原理与动态绑定基本一致）。    
   ```html
   <input type="button" value="按钮" id="btn">
   <script>
    var btn = document.getElementById('btn');
    btn.onclick = function(){
        this ;  // this指向本节点对象
    }
   </script>
   ```

6. **window定时器中的this**     
   ```js
   var obj = {
    fun:function(){
        this ;
    }
   }

   setInterval(obj.fun,1000);      // this指向window对象
   setInterval('obj.fun()',1000);  // this指向obj对象
   ```
   - setInterval(obj.fun,1000); 的第一个参数是obj对象的fun ，因为 JS 中函数可以被当做值来做引用传递，实际就是将这个函数的地址当做参数传递给了 setInterval 方法，也就是 setInterval 的第一参数接受了一个函数，那么1000毫秒后，函数的运行就是在window对象下了，也就是函数的调用者已经变成了window对象，所以其中的this则指向的全局window对象；
   - setInterval('obj.fun()',1000) 中的第一个参数，实际则是传入的一段可执行的 JS 代码；1000毫秒后当 JS 引擎来执行这段代码时，是通过 obj 对象来找到 fun 函数并调用执行，所以函数的运行环境在 对象 obj 内，所以函数内部的this也就指向了 obj 对象；



