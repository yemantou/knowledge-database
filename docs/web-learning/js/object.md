---
title: 对象
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 94
---

### JS六种语言类型
string，number，boolean，null，undefined，object  

### 内置对象
String，Number，Boolean，Object，Function，Array，Date，RegExp，Error  

### 属性描述符
- 从ES5开始，所有的属性都具备了属性描述符。  
  ```js
  var myObject = {
    a: 2
  };

  const res = Object.getOwnPropertyDescriptor(myObject, 'a');
  console.log(res);
  // {
  //   value: 2,
  //   writable: true,
  //   enumerable: true,
  //   configurable: true
  // }
  ```
- 新建一个属性或者修改一个已有属性（如果它是configurable）。  
  ```js
  var myObject = {};

  Object.defineProperty(myObject, 'a', {
    value:2,
    writable: true,
    enumerable: true,
    configurable: true
  });

  console.log(myObject);
  // { a: 2 }
  ```