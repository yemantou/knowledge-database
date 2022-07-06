function* foo () {
  var r2 = yield ajax('http://url.2');
  var r3 = yield ajax(`http://url.1/?v=${r2}`);

  return r3;
}

function* bar () {
  var r1 = yield ajax('http://url.1');

  // 通过run(..)“委托”给*foo(..)
  var r3 = yield run(foo);

  console.log(r3);
}

run(bar);