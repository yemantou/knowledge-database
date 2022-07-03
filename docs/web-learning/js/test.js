// 不要只是直接这样使用（假设工具为tool(..)）
tool(22).then(
  function(v) {
    console.log(v);
  }
);

// 应该这样使用
Promise.resolve(tool(22)).then(
  function(v) {
    console.log(v);
  }
);