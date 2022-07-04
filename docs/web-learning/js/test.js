function foo(bar, baz) {
  var x = bar * baz;
  // 返回两个promise
  retrun [
    Promise.resolve(x),
    getY(x)
  ];
}

Promise.all(foo(10, 20)).then(
  function(msgs) {
    var x = msgs[0];
    var y = msgs[1];

    console.log(x, y); // 200 599
  }
);