---
title: new
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 88
---

### new

#### 原理解析
用于创建一个给定构造函数的对象实例。  
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person('tom', 20);
console.log(person1); // Person { name: 'Tom', age: 20 }
```

#### 过程
1. 创建一个空对象obj（{}）；  
2. 将obj的[[prototype]]属性指向构造函数constrc的原型（即obj.[[prototype]] = constrc.prototype），若是new Class则指向Class的prototype；  
3. 将构造函数constrc内部的this绑定到新建的对象obj，执行constrc（也就是跟调用普通函数一样，只是此时函数的this为新创建的对象obj而已，就好像执行obj.constrc()一样）；  
4. 若构造函数没有返回非原始值（即不是引用类型的值），则返回该新建的对象obj（默认会添加return this）。否则，返回引用类型的值。  
```js
function myNew (constrc, ...args) {
  // 创建一个对象将obj的[[prototype]]属性指向构造函数constrc的原型
  const obj = Object.create(constrc.prototype);

  // 将构造函数constrc内部的this绑定到新建的对象obj，执行constrc
  const res = constrc.apply(obj, args);

  // 若构造函数没有返回非原始值（即不是引用类型的值），则返回该新建的对象obj（默认会添加return this）。否则，返回引用类型的值
  return res instanceof Object ? res : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = myNew(Person, '张三', 23);

console.log(person1);  // Person { name: '张三', age: 23 }
```