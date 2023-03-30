---
title: 混合对象“类”
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 93
---

### 多态  
```js
class Vehicle {
  engines = 1;

  ignition() {
    output('Turning on my engine.');
  }

  drive() {
    ignition();
    output('Steering and moving forward.');
  }
}

class Car inherits Vehicle {
  wheels = 4;

  drive() {
    inherited: drive();
    output('Roling on all', wheels, 'wheels！');
  }
}

class SpeedBoat inherits Vehicle {
  engines = 2;

  ignition() {
    output('Turning on my', engines, 'engines.');
  }

  pilot() {
    inherited: drive();
    output('Speeding through the water with ease！');
  }
}
```
Car重写了继承自父类的drive()方法，但是之后Car调用了inherited:drive()方法，这表明Car可以引用继承来的原始drive()方法。快艇的pilot()方法同样引用了原始drive()方法。这个技术被称为多态或者虚拟多态。在本例中，更恰当的说法是相对多态。  
::: tip 多态
多态并不表示子类和父类有关联，子类得到的只是父类的一份副本。类的继承其实就是复制。    
::: 
::: tip 相对多态
“相对”是因为我们并不会定义想要访问的绝对继承层次（或者说类），而是使用相对引用“查找上一层”。  
:::

### 混入：模拟类的复制行为

#### 显式混入  
```js
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    // 只会在不存在的情况下进行复制
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }
  return targetObj
}

var Vehicle = {
  engines: 1;
  ignition: function() {
    console.log('Turning on my engine.');
  },
  drive: function() {
    this.ignition();
    console.log('Steering and moving forward！');
  }
};

var Car = mixin(Vehicle, {
  wheels: 4;
  drive: function() {
    Vehicle.drive.call(this);
    console.log('Rolling on all' + this.wheels + 'wheels！');
  }
});
```
::: danger 警告
js对于函数是进行引用的，所以修改函数实际会影响两个对象。  
只在能够提高代码可读性的前提下使用显式混入，避免使用增加代码理解难度或者让对象关系更加复杂的模式。  
:::

#### 隐式混入  
```js
var Something = {
  cool: function() {
    this.greeting = 'Hello World';
    this.count = this.count ? this.count + 1 : 1;
  }
};

Something.cool();
console.log(Something.greeting); // 'Hello World'
console.log(Something.count); // 1

var Another = {
  cool: function() {
    // 隐式把Something混入Another
    Something.cool.call(this);
  }
}

Another.cool();
console.log(Another.greeting); // 'Hello World'
console.log(Another.count); // 1（count不是共享状态）
```