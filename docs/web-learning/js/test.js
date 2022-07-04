function* foo (x) {
  var y = x * (yield);
  return y;
}

var it = foo(6);

it.next();

var res = it.next(7);
console.log(res.value); // 42