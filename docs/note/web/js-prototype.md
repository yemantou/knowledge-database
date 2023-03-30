---
title: 原型与原型链
autoGroup-1: JS
sidebarDepth: 0
autoSort: 996
---

# 原型和原型链
[点击跳转到 对象-原型](../../web-learning/js-advanced/object.md)     

每个对象都有_proto_（原型属性，这个属性会指向该对象的原型），对象的原型指向其构造函数的prototype（原型对象），只有函数才有prototype（原型对象），构造函数的prototype（原型对象）的constructor = 函数本身。     
**实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有。**实例的_proto_等于构造函数的prototype。
**_proto_指向一个prototype，但Object._proto_指向null。**    

图示：   
![原型图示](@assets/img/note-web/prototype.png)

**所有由function构建的函数的_proto_都指向Function.prototype。**    