// 正则用的少，对正则的学习还不够；只考虑Object、Set、Map、Array、Function这几种引用类型的拷贝
// 使用Map记录已经被拷贝的变量，解决循环引用（对象内部直接或间接引用自身）
// 使用WeakMap不阻止垃圾回收

// 可遍历类型
const mapTag = '[object Map]'; // 引用类型
const setTag = '[object Set]'; // 引用类型
const arrayTag = '[object Array]'; // 引用类型
const objectTag = '[object Object]'; // 引用类型
const argsTag = '[object Arguments]'; // 引用类型

// 不可遍历类型
const undefinedTag = '[object Null]';
const nullTag = '[object Undefined]';
const boolTag = '[object Boolean]';
const dateTag = '[object Date]'; // 引用类型
const errorTag = '[object Error]'; // 引用类型
const numberTag = '[object Number]';
// const regexpTag = '[object RegExp]'; // 引用类型
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const funcTag = '[object Function]'; // 引用类型


// 可遍历类型数组
const iterableTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 获取数据类型
function getDataType(target) {
  return Object.prototype.toString.call(target);
};

// 初始化（解决拷贝引用对象问题，先初始化为其对应的；类型数据）
function getDataInit(target) {
  const constructor = target.constructor;
  return new constructor();
};

// 判断是否引用类型
function isObject(value) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

// 数组和对象通用while循环，比使用for in效率要高很多倍
function forEach(array, callback) {
  if (getDataType(array) !== arrayTag && getDataType(array) !== objectTag) {
    throw new Error('array not Array or Object');
  }
  let index = 0;
  while (index < array.length) {
    callback(array[index], index);
    index++;
  }
  return array
};

// 拷贝函数（无意义，两个对象使用一个在内存中处于同一个地址的函数是没有任何问题的，但可用来复习基础知识）
function cloneFunction(func) {
  const funcString = deepClone.toString();
  const paramString = funcString.substring(funcString.indexOf('(') + 1, funcString.indexOf(') {')) // 函数的参数
  const bodyString = funcString.substring(funcString.indexOf('{') + 1, funcString.lastIndexOf('}')) // 函数的内容

  // 普通函数有原型属性，箭头函数没有
  if (func.prototype) {
    if (paramString) {
      const paramArr = paramString.split(',');
      return new Function(...paramArr, bodyString)
    } else {
      return new Function(bodyString)
    }
  } else {
    return eval(funcString) // 危险
  }
};

// 拷贝不可遍历的引用类型
function cloneOtherType(target, type) {
  let val = null
  switch (type) {
    case dateTag:
      val = new Date(target);
      break
    case funcTag:
      val = cloneFunction(target);
      break
  }
  return val;
};

// WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不该将该引用考虑在内。
// 因此，只要所引用的对象其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
// 也就是说，一旦不再需要，WeakMap里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
function deepClone(target, map = new WeakMap()) {
  // 不是引用类型直接返回
  if (!isObject(target)) {
    return target
  }

  let dataType = getDataType(target);
  let cloneTarget;
  // 初始化可以遍历的类型，拷贝不可遍历的类型
  if (iterableTag.includes(dataType)) {
    cloneTarget = getDataInit(target);
  } else {
    return cloneOtherType(target, dataType);
  }

  // 处理循环引用
  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget)

  // 处理对象和数组
  if (dataType === objectTag || dataType === arrayTag) {
    const keys = (dataType === arrayTag) ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = deepClone(target[key], map);
    })
    return cloneTarget;
  }

  // 处理Map
  if (dataType === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map)) // Map的value也可能是引用类型
    });
    return cloneTarget;
  }

  // 处理Set
  if (dataType === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepClone(value, map)) // Set的value也可能是引用类型
    });
    return cloneTarget;
  }

  return cloneTarget;
};