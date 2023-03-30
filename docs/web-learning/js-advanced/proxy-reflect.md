---
title: 代理捕获器与反射方法
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 989
---

## 代理捕获器与反射方法
代理可以捕获13种不同的基本操作。这些操作有各自不同的反射API方法、参数、关联ECMAScript操作和不变式。    

[MDN反射方法文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)


### get()
get()捕获器会在获取属性值的操作中被调用。对应的反射API方法为Reflect.get()。   
```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
  get(target, property, receiver) {
    console.log('get()');
    return Reflect.get(...arguments)
  }
});
proxy.foo;
// get()
```
1. 返回值     
   返回值无限制。
2. 拦截的操作     
   - proxy.property   
   - proxy[property]   
   - Object.create(proxy)[property]   
   - Reflect.get(proxy, property, receiver)   
3. 捕获器处理程序参数      
   - target：目标对象。    
   - property：引用的目标对象上的字符串键属性。
   - receiver：代理对象或继承代理对象的对象。
4. 捕获器不变式     
   如果target.property不可写且不可配置，则处理程序返回的值必须与target.property匹配。       
   如果target.property不可配置且[[Get]]特性为undefined，处理程序的返回值也必须是undefined。    

