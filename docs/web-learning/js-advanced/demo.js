// 可遍历类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

// 不可遍历类型
const nullTag = '[object Null]';
const undefinedTag = '[object Undefined]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const booleanTag = '[object Boolean]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const functionTag = '[object Function]';

// 可遍历类型
const iterableTags = [mapTag, setTag, arrayTag, objectTag, argsTag]

// 获取类型tag
function getTypeTag(val) {
  return Object.prototype.toString.call(val)
}

// 判断是否基本类型（非引用类型）
function isValue(val) {
  const type = typeof val
  return (type !== 'object' && type !== 'function') || val === null
}

// 根据数据类型初始化空的类型变量
function initTypeObj(val) {
  const constructor = val.constructor
  return new constructor()
}

// 使用while循环遍历数组和对象（效率比for in高）
function forEach(val, tag, callback) {
  if (tag !== arrayTag && tag !== objectTag && tag !== argsTag) {
    throw new Error('只能遍历数组、对象、Arguments');
  }
  let keyOrArr = tag === objectTag ? Object.keys(val) : val
  let index = 0;
  while (index < keyOrArr.length) {
    tag === objectTag ? callback(val[keyOrArr[index]], keyOrArr[index])
      : callback(val[index], index);
    index++;
  }
  return val
}

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

// 克隆不可遍历的引用类型
function cloneOtherType(target, typeTag) {
  let val = null
  switch (typeTag) {
    case dateTag:
      val = new Date(target);
      break
    case functionTag:
      val = cloneFunction(target);
      break
  }
  return val;
}


/**
 * 深度拷贝
 * @param {*} target 
 * @param {*} map WeakMap解决循环引用问题
 * @returns 
 */
function deepClone(target, map = new WeakMap) {
  // 基本类型就直接返回值
  if (isValue(target)) {
    return target
  }
  const typeTag = getTypeTag(target)
  // 不是可遍历类型就特殊处理克隆返回，是救根据类型初始化一个空的该类型变量
  let cloneTarget
  if (!iterableTags.includes(typeTag)) {
    return cloneOtherType(target, typeTag)
  } else {
    cloneTarget = initTypeObj(target)
  }
  // 处理循环引用（即对象的属性间接或直接的引用了自身的情况）
  if (map.has(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)
  // 处理数组、对象、Arguments
  if (typeTag === arrayTag || typeTag === objectTag || typeTag === argsTag) {
    forEach(target, typeTag, (item, keyOrIndex) => {
      cloneTarget[keyOrIndex] = deepClone(item, map)
    })
    return cloneTarget
  }
  // 处理Map
  if (typeTag === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map))
    })
  }
  // 处理Set
  if (typeTag === mapTag) {
    target.forEach((value) => {
      cloneTarget.add(deepClone(value, map))
    })
  }
}

function a() {
  // const arr = deepClone(arguments)
}

const obj1 = {
  obj: null,
  b: 1
}
obj1.obj = obj1

console.log(deepClone(obj1));
