---
title: Vue的使用
autoGroup-1: Vue
sidebarDepth: 0
autoSort: 999
---

## Vue的基础使用

###
[不使用脚手架搭建Vue开发环境](https://juejin.cn/post/6844903833160646663)

### computed 和 watch

#### computed
computed有缓存，data不变不会重新计算。   

#### watch
watch监听引用类型，没有oldVal。老值指向引用地址。  

### v-for的key
- 不用key的v-for，他会在要进行操作的节点之前，将该节点之后的节点都进行更新，这样的效率很低。（例如a、b、c、d，ab中间插入e，要更新b及以后的所有）         
- 而使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。

### v-for 和 v-if 不要一起用
因为先会进行 v-for 循环，然后再判断 v-if ，会导致 v-if 循环判断。

### event
1. event是原生的
2. 事件被挂载到当前元素  


## Vue的组件使用

### props 和 $emit

### 组件间通讯
1. 自定义事件（v-on 和 $emit）

### 组件生命周期
[Vue生命周期](https://blog.csdn.net/m0_57138227/article/details/120833797)   

#### 父子组件的生命周期
实例化是从父组件到子组件，渲染是从子组件到父组件。  

1. 父组件 before create
2. 父组件 created
3. 父组件 beforeMount
4. 子组件 before create
5. 子组件 created
6. 子组件 mounted
7. 父组件 mounted
8. 父组件 before update
9. 子组件 before update
10. 子组件 updated
11. 父组件 updated
12. 父组件 before destroy
13. 子组件 before destroy
14. 子组件 destroyed
15. 父组件 destroyed


## Vue的高级特性

### 自定义model
![v-model](@assets/img/vue/v-model.png)  


### $nextTick
- Vue 是异步渲染
- data改变之后，DOM不会立刻渲染
- $nextTick会在DOM渲染之后被触发，以获取最新DOM节点
- 页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次 

### slot 

### 动态、异步组件 

#### 动态组件
- :is="component-name" 用法
- 需要根据数据，动态渲染的场景。即组件类型不确定。 

#### 异步组件（较大的组件，全部打包加载会导致性能问题）
- import() 函数
- 按需加载，异步加载大组件       
  在components中：组件名: ()=> import('路径') 

### keep-alive
- 缓存组件
- 频繁切换，不需要重复渲染的时候
- Vue 常见性能优化
- 与v-show的区别：     
  v-show使用css的display实现，适合简单的标签组件；   
  keep-alive是Vue实现的，适合复杂一点的组件，例如tabs的切换。   
::: tip 注意
keep-alive 不会在函数式组件中正常工作，因为它们没有缓存实例。
:::

#### activated：被 keep-alive 缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用。
#### deactivated：被 keep-alive 缓存的组件失活时调用。该钩子在服务器端渲染期间不被调用。

#### 清除keep-alive
- 在其cache中删除指定组件的缓存
- 在再次进入组件时将使用exclude排除掉组件，或是include中不包含此组件

### mixin
- 多个组件有相同的逻辑，抽离出来
- mixin并不是完美的解决方案，会有一些问题
- Vue3提出的Composition API旨在解决这些问题

#### mixin问题：
- 变量来源不明确，不利于阅读
- 多 mixin 可能会造成命名冲突
- mixin 和组件可能会出现多对多的关系，复杂度较高


## Vuex
- state
- getters
- mutation，使用方式：commit。原子操作
- action，使用方式：dispatch。只有action能做异步操作，可能会整合一个或多个 mutation
- mapState
- mapGetters
- mapMutations
- mapActions


### 路由模式
- hash模式（默认），如http://abc.com/#/user/10
- H5 history模式，如http://abc.com/user/10    
  需要server端支持，无特殊需求可选择hash


### 组件注册
- 全局注册（Vue.component('component-a', { /* ... */ })）
- 局部注册（components: {}）

### 依赖注入：provide / inject
类型：   
- provide：Object | () => Object
- inject：Array/<string/> | { [key: string]: string | Symbol | Object }

允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。
::: tip 注意
provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。
:::

### 程序化的事件侦听器
$emit 的用法，它可以被 v-on 侦听，还可以按以下方法监听：
- 通过 $on(eventName, eventHandler) 侦听一个事件
- 通过 $once(eventName, eventHandler) 一次性侦听一个事件
- 通过 $off(eventName, eventHandler) 停止侦听一个事件

### 过滤器
Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式。    
过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：
```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```


## Vue-router

### 动态路由匹配（相当于用路由传参）
```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

### 获所有路由或 404 Not found 路由
路由 { path: '*' } 通常用于客户端 404 错误。   
```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```
有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。   

### 导航守卫（“导航”表示路由正在发生改变）
导航守卫主要用来通过跳转或取消的方式守卫导航，**参数或查询的改变并不会触发进入/离开的导航守卫**。     

#### 全局前置守卫（router.beforeEach）
**确保 next 函数在任何给定的导航守卫中都被严格调用一次**。**它可以出现多于一次**，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。  

#### 全局解析守卫（router.beforeResolve）
在导航被确认之前，同时**在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。   

#### 全局后置钩子（router.afterEach）

### 路由独享的守卫
在路由配置上直接定义 beforeEnter 守卫：
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

#### 完整的导航解析流程
- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。


## Web 安全

### 跨站脚本攻击 (XSS) 的防御
XSS 的本质是一种”HTML 注入”。用户数据被当作 HTML 代码的一部分来执行。     
设置 Cookie 的 HttpOnly 属性， 这个属性使浏览器禁止页面的 JavaScript 访问 Cookie。    

### 跨站点请求伪造 (CSFR) 的防御
1. 使用验证码
2. 使用 Token (令牌)