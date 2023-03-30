---
title: 执行上下文（execution context）
autoGroup-1: JS
sidebarDepth: 0
autoSort: 994
---

# 执行上下文（execution context）
::: tip 顺序阅读下列文章
[JavaScript深入之执行上下文栈](https://github.com/mqyqingfeng/Blog/issues/4)       
[JavaScript深入之变量对象](https://github.com/mqyqingfeng/Blog/issues/5)     
[JavaScript深入之作用域链](https://github.com/mqyqingfeng/Blog/issues/6)    
[JavaScript深入之执行上下文](https://github.com/mqyqingfeng/Blog/issues/8)
:::

### this指向问题
[this指向问题](https://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

JavaScript属于解释型语言，JavaScript的执行分为：解释和执行两个阶段,这两个阶段所做的事并不一样。  

#### 解释阶段：
- 词法分析
- 语法分析
- 作用域规则确定

#### 执行阶段：
- 创建执行上下文
- 执行函数代码
- 垃圾回收

作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。执行上下文最明显的就是this的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。    

**作用域和执行上下文之间最大的区别是： 执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变。**  


## 执行上下文栈
JavaScript 代码执行顺序：    
JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，比如[变量提升和函数提升](./js-hoisting.md)。   

**如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。**     
```js
console.log(drink)
drink('白水')
function drink(type){
  var type = '牛奶'
  console.log(type)
}
var drink='饮料'
// [Function: drink]
// 牛奶
```  

#### 上面提到的“一段一段”中的“段”的划分方式：    
可执行代码(executable code)：全局代码、函数代码、eval代码。    
当执行到可执行代码(executable code)就会进行准备工作，“准备工作”即"执行上下文(execution context)"。  

#### 管理创建的执行上下文
执行上下文栈（Execution context stack，ECS）用来管理执行上下文。   
当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文。当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。     


## 变量对象
**变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。**    

对于每个执行上下文，都有三个重要属性：
- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

### 函数上下文
在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。   

活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。   

### 执行过程
执行上下文的代码会分成两个阶段进行处理：分析和执行（或者说是进入执行上下文和代码执行）。   


## 作用域链
函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：**[[scope]] 并不代表完整的作用域链！**，当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端（此时才是完整的作用域链）。

#### 以下面的例子为例，结合着之前讲的变量对象和执行上下文栈，我们来总结一下函数执行上下文中作用域链和变量对象的创建过程：
```js
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```
执行过程如下：
1. checkscope 函数被创建，保存作用域链到 内部属性[[scope]]
   ```js
   checkscope.[[scope]] = [
    globalContext.VO
   ];
   ```
2. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈
   ```js
   ECStack = [
    checkscopeContext,
    globalContext
   ];
   ```
3. checkscope 函数并不立刻执行，开始做准备工作，第一步：复制函数[[scope]]属性创建作用域链
   ```js
   checkscopeContext = {
    Scope: checkscope.[[scope]],
   }
   ```
4. 第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明
   ```js
   checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
   }
   ```
5. 第三步：将活动对象压入 checkscope 作用域链顶端
   ```js
   checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
   }
   ```
6. 准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值
   ```js
   checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
   }
   ```
7. 查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
   ```js
   ECStack = [
    globalContext
   ];
   ```
