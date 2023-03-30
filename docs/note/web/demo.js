var arr = [1, [[2, 3], 4], [5, 6, [7, [8, 9, [10, 11]]]]];

function * flat (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (Array.isArray(item)) {
      yield * flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}