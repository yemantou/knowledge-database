---
title: 原型
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 92
---

### [[Prototype]]：就是对于其他对象的引用  

#### Object.create(..)  
会创建一个对象并把这个对象的[[Prototype]]关联到指定的对象。   

#### Object.prototype  
所有普通的[[Prototype]]链最终都会指向内置的Object.prototype。  

#### 属性设置和屏蔽  
若属性名foo同时存在于对象和对象的[[Prototype]]链上层，就会发生屏蔽。对象里面的foo属性会屏蔽[[Prototype]]链上层的foo属性。  
例：myObject.foo = "bar"。  
1. 