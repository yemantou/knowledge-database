var a = new String('abc');

console.log(typeof a); // object

console.log(a instanceof String); // true

const res = Object.prototype.toString.call(a);

console.log(res); // [object String]


