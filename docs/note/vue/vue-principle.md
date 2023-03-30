---
title: Vue原理
autoGroup-1: Vue
sidebarDepth: 0
autoSort: 998
---

## Vue原理

### 组件化和MVVM
- 传统组件，只是静态渲染，更新还要依赖于操作DOM
- MVVM，数据驱动视图：Model-View-ViewModel；dom通过监听事件操作vue里的data，反之vue中的data通过指令操作dom，这就是所说数据驱动视图   
- MVC 和 MVVM：       
  MVC：Model-View-Controller，Model 跟 View 之间的同步通过 Controller 来控制。         
  MVVM：Model-View-ViewModel；MVVM实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变。     

### 响应式原理
- 组件 data 的数据一旦变化，立刻触发视图更新
- 核心API - Object.defineProperty

#### 如何实现响应式？
使用Object.defineProperty（数据劫持 / 数据代理）    
基本用法：
```js
// 触发更新视图
function updateView() {
  console.log('视图更新');
}

// 重新定义数据原型
const oldArrayProperty = Array.prototype;
// 创建新对象，原型指向 oldArrayProperty，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function () {
    oldArrayProperty[methodName].call(this, ...arguments)
    
    // 触发视图更新
    updateView()
  }
});

/**
 * 重新定义属性、监听起来
 * 需要定义 defineReactive 函数的原因：
 * get和set需要变量周转才能工作，将get和set放到一个函数中形成闭包
 */
function defineReactive(target, key, value) {
  // 深度监听（值可能也是个对象）
  observer(value)

  // 核心API
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        // 深度监听新值（新增的值可能也是个对象）
        observer(newVal)

        // 设置新值
        // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
        value = newVal

        // 触发视图更新
        updateView()
      }
    }
  })
}

// 监听对象属性
function observer(target) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象或数组
    return target
  }

  // 数组通过修改原型进行监听
  if (Array.isArray(target)) {
    Object.setPrototypeOf(target, arrProto)
  }

  // 重新定义各个属性，for in可以遍历对象和数组
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

// 准备数据
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京'
  },
  nums: [10, 20, 30]
}

// 监听数据
observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
// data.x = '100' //新增属性，监听不到 - 所以有 Vue.set
// delete data.name // 删除属性，监听不到 - 所以有 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4) // 监听数组
```


#### Object.defineProperty的一些缺点（Vue3.0 使用 Proxy）
- 深度监听，需要递归到底，一次性计算量大
- 无法监听新增属性 / 删除属性（解决方法：Vue.set Vue.delete）
- 无法原生监听数组，需要特殊处理


### vdom 和 diff算法
- vdom 是实现 Vue 和 React 的重要基石
- diff算法是 vdom 中最核心、最关键的部分

问题：DOM操作非常耗费性能，现代业务和DOM操作复杂需要复杂计算。      
思路：有了一定复杂度，想减少计算次数比较困难，能不能把计算更多的转移我JS计算？JS计算很快     
解决方案：vdom   

#### vdom
用 JS 模拟 DOM 结构，计算出最小的变更，操作DOM
![v-model](@assets/img/vue/JS-DOM.png) 

#### diff算法
diff是发生在虚拟DOM上面的，新老虚拟DOM进行diff（精细化比较），算出应该如何最小量更新，最后反映到真正的DOM上。             

**虚拟节点的属性**    
```js
{
  sel: 'div',
  key: undefined, // 也可以放在data中的props中
  elm: undefined,
  data: {},
  children: undefined,
  text: '我是一个盒子'
}
```

**虚拟DOM是如何被渲染函数（h函数）产生？（手写h函数）**       
::: tip 学习snabbdom工程
[学习snabbdom（h函数）](https://github.com/yemantou/study-snabbdom)    
:::
- h函数用来产生虚拟节点（vnode）    
  例如：
  ```js
  // 调用h函数
  h('a', { props: { href: 'http://......' } }, '随机网址');
  // 得到虚拟节点
  { sel: 'a', data: { props: { href: 'http://......' } }, text: '随机网址' } 
  ```

**diff算法原理？（手写diff算法）**  
- 最小量更新；**key非常重要，key是这个节点的唯一标识，告诉diff算法，在更改前后它们是同一个DOM节点**；
- **只有是同一个（选择器相同且key相同）虚拟节点才进行精细比较**，否则就暴力插入新的，删除旧的；
- **只进行同层比较，不会进行跨层比较**。  

::: tip 参考文章
[diff算法流程](https://blog.csdn.net/weixin_44337386/article/details/125493569)    
:::

**innerText一旦改变为新的text，节点的children有就会被清空。但是如果是追加DOM不会清空text。**  
![diff流程](@assets/img/vue/diff.png) 


**虚拟DOM如何通过diff变成真正的DOM的？**


### 模板编译

#### 前置知识，JS的 with 语法
![with 语法](@assets/img/vue/with.png) 
- 改变{}内自由变量的查找规则，当做obj属性来查找
- 如果找不到匹配的obj属性，就会报错
- with要慎用，它打破了作用域规则，易读性变差

#### 模板
- 模板不是html，有指令、插值、JS表达式，能实现判断、循环
- html是标签语言，只有JS才能实现判断、循环（图灵完备的）
- 因此，模板一定是转换为某种JS代码，即编译模板        

**开发环境下，使用webpack vue loader 编译（重要）**   


#### vue template complier 将模板编译为render函数   
[将模板编译为render函数](https://github.com/yemantou/study-snabbdom/blob/main/src/vue-compiler/index.js)    


#### 执行 render 函数生成 vnode
```js
Vue.component('anchored-heading', {
  template: 'xxxx',
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      [
        createElement('a', {
          attrs: {
            name: 'headerId',
            href: '#' + 'headerId'
          }
        }, 'this is a tag')
      ]
    )
  }
})
```

### 小结
- 响应式：监听 data 属性 getter setter （包括数组），使用Object.defineProperty这个API
- 模板编译：模板到renser函数，再到vnode
- vdom：patch(elm, vnode) 和 patch(vnode, newVnode)

### 组件 渲染/更新 过程
![组件 渲染/更新 过程](@assets/img/vue/render-vnode.png)
- 初次渲染过程      
  - 解析模板为 render 函数（或在开发环境已经完成，webpack vue-loader）      
  - 触发响应式，监听 data 属性 getter setter
  - 执行 render 函数，生成 vnode，patch(elm, vnode)；执行 render 时就会触发 getter
- 更新过程
  - 修改data，触发 setter (此前在 getter 中已被监听)   
  - 重新执行 render 函数，生成 newVnode
  - patch(vnode, newVnode)
- 异步渲染
  - 回顾 $nextTick，下一次 DOM 更新时执行
  - 汇总 data 的修改，一次性更新视图
  - 减少 DOM 操作次数，提高性能

### 前端路由 
[路由学习](https://github.com/yemantou/study-snabbdom/blob/main/src/router/hash.js)     
模式：
- hash，#及后面的部分    
  - hash 变化会触发网页跳转，即浏览器的前进、后退      
  - hash 变化不会刷新页面，SPA必需的特点   
  - hash 永远不会提交到 server 端（前端自生自灭）  
  - window.onhashchange 监听 
- h5 history（需要后端支持，不然刷新后会丢失页面）   
  - 用 url 规范的路由，但跳转时不刷新页面
  - history.pushState
  - window.onpopstate

**两者的选择：**    
- to B 的系统推荐使用hash，简单易用，对 url 规范不敏感
- to C 的系统，可以考虑选择 H5 history，但需要服务端支持


### nextTick原理（利用Promise、MutationObserver以及setTimeout三种）
利用JS的event loop（事件循环），Vue中DOM的修改是异步任务中的微任务，所以通过在DOM修改后新增微任务或宏任务来拿到最新的DOM        
1. 执行微任务过程中产生的微任务，会被添加到微任务队列尾部，在前面微任务执行完后执行，属于本次事件循环。也就是在下一个宏任务执行之前执行。
2. 执行微任务过程中产生的宏任务，会在微任务队列被清空后再开始执行。

**多次调用nextTick会将方法存入队列，通过异步方法清空当前队列。**     
