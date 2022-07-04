function* foo (x, y) {
  return x * y;
}

var it = foo(6, 7);

var res = it.next();

console.log(res.value); // 42