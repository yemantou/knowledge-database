function foo (x) {
  x.a = 4;
  console.log(x); // [ 1, 2, 3, 4 ]

  delete x.a
  x.a = 5
  console.log(x);
}

var a = {
  a: 1
};

foo(a);

console.log(a); // [ 4, 5, 6, 7 ]