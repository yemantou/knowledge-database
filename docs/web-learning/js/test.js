var i = 2;

Number.prototype.valueOf = function () {
  return i++;
};

var a = new Number(42)

console.log(a == 2 && a == 3);