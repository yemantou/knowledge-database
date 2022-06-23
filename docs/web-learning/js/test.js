function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function () {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

function Fun(name, age) {
  Foo.call(this, name);
  this.age = age;
}

// Object.create(..)会凭空创建一个“新”对象并把新对象内部的[[Prototype]]关联到你指定的对象
// 创建一个新的Bar.prototype对象并关联到Foo.prototype
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.myLabel = function () {
  return this.label;
};

Fun.prototype = Object.create(Foo.prototype);

Fun.prototype.myAge = function () {
  return this.age;
};

var a = new Bar('a', 'obj a');
var b = new Fun('a', 12);

const res1 = a.myName();
const res2 = a.myLabel();

const res3 = b.myName();
const res4 = b.myAge();

console.log('a', a);
console.log('b', b);
console.log('a.myName', res1);
console.log('a.myLabel', res2);
console.log('b.myName', res3);
console.log('b.myAge', res4);
console.log('Foo.prototype.isPrototypeOf(a)', Foo.prototype.isPrototypeOf(a));
console.log('Foo.prototype.isPrototypeOf(b)', Foo.prototype.isPrototypeOf(b));