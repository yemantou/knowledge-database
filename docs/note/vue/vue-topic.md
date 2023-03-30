---
title: Vue题目
autoGroup-1: Vue
sidebarDepth: 0
autoSort: 997
---

## Vue题目
::: tip 文章
[Vue 面试题必问](https://cloud.tencent.com/developer/article/2133959)
:::

### 为何在 v-for 中要用 key
diff算法中通过 sel 和 key 来判断，是否是同一个节点。用key能减少渲染次数，提升渲染性能    


### Vue 组件如何通讯（常见）
- 父子组件 props 和 this.$emit
- 自定义事件 event.$on event.$off event.$emit
- vuex


### computed 有何特点
缓存，data不变不会重新计算，合理使用能够提高性能


### 为何组件 data 必须是一个函数？
.vue 文件编译出来后实际是一个 calss，在各个地方使用组件相当于实例化这个组件，如果使用变量定义，那么组件之间的属性都共享了，使用函数相当于一个闭包，实现私有函数的概念。   


### ajax 请求应该放在哪个生命周期？
应该放在mounted里面，JS是单线程的，ajax异步获取数据，放在mounted之前没有用，只会让逻辑更加混乱。   


### 如何将组件的所有 props 传递给子组件？
v-bind="$props"

#### vm.$attrs：包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。
通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

#### vm.$listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器
通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

### 何时要使用异步组件？
- 加载大组件
- 路由异步加载
- 优化性能


### 何时需要使用 keep-alive ？
- 缓存组件，不需要重复渲染
- 如多个静态 tab 页的切换
- 优化性能


### 何时需要使用 beforeDestory
- 解除自定义事件 event.$off
- 清除定时器
- 解绑自定义的 DOM 事件，如 window scroll 等


### Vuex 中 action 和 mutation 有何区别？
- action 中处理异步，mutation 只能处理同步
- mutation 做原子操作
- action 可以整合多个 mutation


### 如何配置 Vue-router 异步加载
component: () => import('路径') 


### 用 vnode 描述一个 DOM 结构
{
  sel,
  data,
  children,
  text,
  elm
}


### 描述响应式原理
- 监听 data 变化
- 组件渲染和更新的过程 


### diff 算法的时间复杂度
- O(n)
- 在O(n ^ 3)基础上做了一些调整


### 简述 diff 算法过程



### Vue 为何是异步渲染，$nextTick 何用？
- 异步渲染（以及合并 data 修改），以提高渲染性能
- $nextTick 在 DOM 更新之后，触发回调


### Vue 常见性能优化的方法
- 合理使用 v-show 和 v-if
- 合理使用 computed
- v-for 时加 key，以及避免和 v-if 同时使用（v-for 会先计算，导致不必要的渲染）
- 自定义事件、DOM事件要及时销毁
- 合理使用异步组件
- 合理使用 keep-alive
- data 层级不要太深，响应式会递归监听
- 使用 vue-loader 在开发环境做模板编译（预编译）
- webpack 的优化
- 前端通用的性能优化，如图片懒加载




