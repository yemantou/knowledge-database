---
title: 行为委托
autoGroup-1: 你不知道的JS
sidebarDepth: 0
autoSort: 91
---

### 行为委托  
多个对象（a,  b）委托一个对象（c），修改某个对象（a || b）的原型属性不会影响c。  

### 面向委托的设计  

#### 委托理论  
执行任务“XYZ”需要两个兄弟对象（XYZ和Task）协作完成。但是我们并不需要把这些行为放在一起，通过类的复制，我们可以把它们分别放在各自独立的对象中，需要时可以允许XYZ对象委托给Task。  
```js
var Task = {
  setID: function(ID) { this.id = ID; },
  outputID: function() { console.log(this.id); }
};

// 让XYZ委托Task
var XYZ = Object.create(Task);

XYZ.prepareTask = function(ID, Label) {
  this.setID(ID);
  this.label = Label;
};

XYZ.outputTaskDetails = function() {
  this.outputID();
  console.log(this.label);
};

// ABC = Object.create(Task);
// ...
```
1. 在上面的代码中，id和label数据成员都是直接存储在XYZ上（而不是Task）。通常来说，在[[Prototype]]委托中最好把状态保存在委托者（XYZ、ABC）而不是委托目标（Task）上。  
2. 2．在类设计模式中，我们故意让父类（Task）和子类（XYZ）中都有outputTask方法，这样就可以利用重写（多态）的优势。在委托行为中则恰好相反：我们会尽量避免在[[Prototype]]链的不同级别中使用相同的命名，否则就需要使用笨拙并且脆弱的语法来消除引用歧义。  
3. this.setID(ID); XYZ中的方法首先会寻找XYZ自身是否有setID(..)，但是XYZ中并没有这个方法名，因此会通过[[Prototype]]委托关联到Task继续寻找，这时就可以找到setID(..)方法。此外，由于调用位置触发了this的隐式绑定规则，因此虽然setID(..)方法在Task中，运行时this仍然会绑定到XYZ，这正是我们想要的。  
::: danger 注意
this.setID(ID); // 在API接口的设计中，委托最好在内部实现，不要直接暴露出去
:::

::: danger 互相委托（禁止）
无法在两个或两个以上互相（双向）委托的对象之间创建循环委托。如果你把B关联到A然后试着把A关联到B，就会出错。  
:::