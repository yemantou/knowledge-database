---
title: 作用域闭包
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 96
---

### 闭包是什么（能够读取其他函数内部变量的函数，可以理解成“定义在一个函数内部的函数“）
- 闭包的“神奇”之处在于可以阻止对内存空间的回收，内部作用域依然存在。  
- 该作用域能够一直存活，以供bar()在之后任何时间进行引用。bar()依然持有对该作用域的引用，而这个引用就叫作闭包。  
  ```js
  function foo() {
    var a = 2;

    function bar() {
      console.log(a);
    }

    return bar;
  }

  var baz = foo();
  baz(); // 2
  ```
- 无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。  

::: tip 提示
只要使用了回调函数，实际上就是在使用闭包
:::

### 循环和闭包  
- 会以每秒一次的频率输出五次6， 延迟函数的回调会在循环结束时才执行。尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个i。  
  ```js
  for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log(i);
    }, i*1000);
  }
  ```
- 在迭代内使用IIFE会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的作用域封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。  
  ```js
  for (var i = 1; i <= 5; i++) {
    (function (j) {
      setTimeout(function timer() {
        console.log(j);
      }, j*1000);
    })(i)
  }
  ```
- for循环头部的let声明还会有一个特殊的行为。这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。  
  ```js
  for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log(i);
    }, i*1000);
  }
  ```

### 模块  
#### 两个主要特征
1. 为创建内部作用域而调用了一个包装函数；  
2. 包装函数的返回值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包。  

```js
function CoolModule() {
  var something = 'cool';
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join('！'));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1！2！3
```

#### 模块示例  
```js
// 闭包-模块

var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i = 0;i < deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply(impl, deps); // 生成一个根据名字来管理的模块列表（apply接受数组类型的参数）
	}

	function get(name) {
		return modules[name];	
	}

	return {
		define: define,
		get: get
	}
})();

MyModules.define("bar", [], function(){
	function hello(who) {
		return "Let me introduce: " + who;
	}

	return {
		hello: hello
	};
});


MyModules.define("foo", ["bar"], function(bar){
	var hungry = "hippo";
	
	function awesome() {
		console.log(bar.hello(hungry).toUpperCase());
	}

	return {
		awesome: awesome
	};
});

var bar = MyModules.get("bar");
var foo= MyModules.get("foo");

console.log(bar.hello("hippo")); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO


```
