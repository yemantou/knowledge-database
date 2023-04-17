(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{279:function(t,a,e){t.exports=e.p+"assets/img/v-model.97916ee5.png"},327:function(t,a,e){"use strict";e.r(a);var s=e(15),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"vue的基础使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue的基础使用"}},[t._v("#")]),t._v(" Vue的基础使用")]),t._v(" "),s("h3",{attrs:{id:""}},[s("a",{staticClass:"header-anchor",attrs:{href:"#"}},[t._v("#")])]),t._v(" "),s("p",[s("a",{attrs:{href:"https://juejin.cn/post/6844903833160646663",target:"_blank",rel:"noopener noreferrer"}},[t._v("不使用脚手架搭建Vue开发环境"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"computed-和-watch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#computed-和-watch"}},[t._v("#")]),t._v(" computed 和 watch")]),t._v(" "),s("h4",{attrs:{id:"computed"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#computed"}},[t._v("#")]),t._v(" computed")]),t._v(" "),s("p",[t._v("computed有缓存，data不变不会重新计算。")]),t._v(" "),s("h4",{attrs:{id:"watch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#watch"}},[t._v("#")]),t._v(" watch")]),t._v(" "),s("p",[t._v("watch监听引用类型，没有oldVal。老值指向引用地址。")]),t._v(" "),s("h3",{attrs:{id:"v-for的key"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#v-for的key"}},[t._v("#")]),t._v(" v-for的key")]),t._v(" "),s("ul",[s("li",[t._v("不用key的v-for，他会在要进行操作的节点之前，将该节点之后的节点都进行更新，这样的效率很低。（例如a、b、c、d，ab中间插入e，要更新b及以后的所有）")]),t._v(" "),s("li",[t._v("而使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。")])]),t._v(" "),s("h3",{attrs:{id:"v-for-和-v-if-不要一起用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#v-for-和-v-if-不要一起用"}},[t._v("#")]),t._v(" v-for 和 v-if 不要一起用")]),t._v(" "),s("p",[t._v("因为先会进行 v-for 循环，然后再判断 v-if ，会导致 v-if 循环判断。")]),t._v(" "),s("h3",{attrs:{id:"event"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#event"}},[t._v("#")]),t._v(" event")]),t._v(" "),s("ol",[s("li",[t._v("event是原生的")]),t._v(" "),s("li",[t._v("事件被挂载到当前元素")])]),t._v(" "),s("h2",{attrs:{id:"vue的组件使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue的组件使用"}},[t._v("#")]),t._v(" Vue的组件使用")]),t._v(" "),s("h3",{attrs:{id:"props-和-emit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#props-和-emit"}},[t._v("#")]),t._v(" props 和 $emit")]),t._v(" "),s("h3",{attrs:{id:"组件间通讯"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件间通讯"}},[t._v("#")]),t._v(" 组件间通讯")]),t._v(" "),s("ol",[s("li",[t._v("自定义事件（v-on 和 $emit）")])]),t._v(" "),s("h3",{attrs:{id:"组件生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件生命周期"}},[t._v("#")]),t._v(" 组件生命周期")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://blog.csdn.net/m0_57138227/article/details/120833797",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue生命周期"),s("OutboundLink")],1)]),t._v(" "),s("h4",{attrs:{id:"父子组件的生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#父子组件的生命周期"}},[t._v("#")]),t._v(" 父子组件的生命周期")]),t._v(" "),s("p",[t._v("实例化是从父组件到子组件，渲染是从子组件到父组件。")]),t._v(" "),s("ol",[s("li",[t._v("父组件 before create")]),t._v(" "),s("li",[t._v("父组件 created")]),t._v(" "),s("li",[t._v("父组件 beforeMount")]),t._v(" "),s("li",[t._v("子组件 before create")]),t._v(" "),s("li",[t._v("子组件 created")]),t._v(" "),s("li",[t._v("子组件 mounted")]),t._v(" "),s("li",[t._v("父组件 mounted")]),t._v(" "),s("li",[t._v("父组件 before update")]),t._v(" "),s("li",[t._v("子组件 before update")]),t._v(" "),s("li",[t._v("子组件 updated")]),t._v(" "),s("li",[t._v("父组件 updated")]),t._v(" "),s("li",[t._v("父组件 before destroy")]),t._v(" "),s("li",[t._v("子组件 before destroy")]),t._v(" "),s("li",[t._v("子组件 destroyed")]),t._v(" "),s("li",[t._v("父组件 destroyed")])]),t._v(" "),s("h2",{attrs:{id:"vue的高级特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue的高级特性"}},[t._v("#")]),t._v(" Vue的高级特性")]),t._v(" "),s("h3",{attrs:{id:"自定义model"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自定义model"}},[t._v("#")]),t._v(" 自定义model")]),t._v(" "),s("p",[s("img",{attrs:{src:e(279),alt:"v-model"}})]),t._v(" "),s("h3",{attrs:{id:"nexttick"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nexttick"}},[t._v("#")]),t._v(" $nextTick")]),t._v(" "),s("ul",[s("li",[t._v("Vue 是异步渲染")]),t._v(" "),s("li",[t._v("data改变之后，DOM不会立刻渲染")]),t._v(" "),s("li",[t._v("$nextTick会在DOM渲染之后被触发，以获取最新DOM节点")]),t._v(" "),s("li",[t._v("页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次")])]),t._v(" "),s("h3",{attrs:{id:"slot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#slot"}},[t._v("#")]),t._v(" slot")]),t._v(" "),s("h3",{attrs:{id:"动态、异步组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态、异步组件"}},[t._v("#")]),t._v(" 动态、异步组件")]),t._v(" "),s("h4",{attrs:{id:"动态组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态组件"}},[t._v("#")]),t._v(" 动态组件")]),t._v(" "),s("ul",[s("li",[t._v(':is="component-name" 用法')]),t._v(" "),s("li",[t._v("需要根据数据，动态渲染的场景。即组件类型不确定。")])]),t._v(" "),s("h4",{attrs:{id:"异步组件-较大的组件-全部打包加载会导致性能问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#异步组件-较大的组件-全部打包加载会导致性能问题"}},[t._v("#")]),t._v(" 异步组件（较大的组件，全部打包加载会导致性能问题）")]),t._v(" "),s("ul",[s("li",[t._v("import() 函数")]),t._v(" "),s("li",[t._v("按需加载，异步加载大组件"),s("br"),t._v("\n在components中：组件名: ()=> import('路径')")])]),t._v(" "),s("h3",{attrs:{id:"keep-alive"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#keep-alive"}},[t._v("#")]),t._v(" keep-alive")]),t._v(" "),s("ul",[s("li",[t._v("缓存组件")]),t._v(" "),s("li",[t._v("频繁切换，不需要重复渲染的时候")]),t._v(" "),s("li",[t._v("Vue 常见性能优化")]),t._v(" "),s("li",[t._v("与v-show的区别："),s("br"),t._v("\nv-show使用css的display实现，适合简单的标签组件；"),s("br"),t._v("\nkeep-alive是Vue实现的，适合复杂一点的组件，例如tabs的切换。")])]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),s("p",[t._v("keep-alive 不会在函数式组件中正常工作，因为它们没有缓存实例。")])]),t._v(" "),s("h4",{attrs:{id:"activated-被-keep-alive-缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#activated-被-keep-alive-缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用。"}},[t._v("#")]),t._v(" activated：被 keep-alive 缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用。")]),t._v(" "),s("h4",{attrs:{id:"deactivated-被-keep-alive-缓存的组件失活时调用。该钩子在服务器端渲染期间不被调用。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deactivated-被-keep-alive-缓存的组件失活时调用。该钩子在服务器端渲染期间不被调用。"}},[t._v("#")]),t._v(" deactivated：被 keep-alive 缓存的组件失活时调用。该钩子在服务器端渲染期间不被调用。")]),t._v(" "),s("h4",{attrs:{id:"清除keep-alive"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#清除keep-alive"}},[t._v("#")]),t._v(" 清除keep-alive")]),t._v(" "),s("ul",[s("li",[t._v("在其cache中删除指定组件的缓存")]),t._v(" "),s("li",[t._v("在再次进入组件时将使用exclude排除掉组件，或是include中不包含此组件")])]),t._v(" "),s("h3",{attrs:{id:"mixin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mixin"}},[t._v("#")]),t._v(" mixin")]),t._v(" "),s("ul",[s("li",[t._v("多个组件有相同的逻辑，抽离出来")]),t._v(" "),s("li",[t._v("mixin并不是完美的解决方案，会有一些问题")]),t._v(" "),s("li",[t._v("Vue3提出的Composition API旨在解决这些问题")])]),t._v(" "),s("h4",{attrs:{id:"mixin问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mixin问题"}},[t._v("#")]),t._v(" mixin问题：")]),t._v(" "),s("ul",[s("li",[t._v("变量来源不明确，不利于阅读")]),t._v(" "),s("li",[t._v("多 mixin 可能会造成命名冲突")]),t._v(" "),s("li",[t._v("mixin 和组件可能会出现多对多的关系，复杂度较高")])]),t._v(" "),s("h2",{attrs:{id:"vuex"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vuex"}},[t._v("#")]),t._v(" Vuex")]),t._v(" "),s("ul",[s("li",[t._v("state")]),t._v(" "),s("li",[t._v("getters")]),t._v(" "),s("li",[t._v("mutation，使用方式：commit。原子操作")]),t._v(" "),s("li",[t._v("action，使用方式：dispatch。只有action能做异步操作，可能会整合一个或多个 mutation")]),t._v(" "),s("li",[t._v("mapState")]),t._v(" "),s("li",[t._v("mapGetters")]),t._v(" "),s("li",[t._v("mapMutations")]),t._v(" "),s("li",[t._v("mapActions")])]),t._v(" "),s("h3",{attrs:{id:"路由模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#路由模式"}},[t._v("#")]),t._v(" 路由模式")]),t._v(" "),s("ul",[s("li",[t._v("hash模式（默认），如http://abc.com/#/user/10")]),t._v(" "),s("li",[t._v("H5 history模式，如http://abc.com/user/10"),s("br"),t._v("\n需要server端支持，无特殊需求可选择hash")])]),t._v(" "),s("h3",{attrs:{id:"组件注册"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件注册"}},[t._v("#")]),t._v(" 组件注册")]),t._v(" "),s("ul",[s("li",[t._v("全局注册（Vue.component('component-a', { /* ... */ })）")]),t._v(" "),s("li",[t._v("局部注册（components: {}）")])]),t._v(" "),s("h3",{attrs:{id:"依赖注入-provide-inject"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#依赖注入-provide-inject"}},[t._v("#")]),t._v(" 依赖注入：provide / inject")]),t._v(" "),s("p",[t._v("类型：")]),t._v(" "),s("ul",[s("li",[t._v("provide：Object | () => Object")]),t._v(" "),s("li",[t._v("inject：Array/"),s("string"),t._v(" | { [key: string]: string | Symbol | Object }")],1)]),t._v(" "),s("p",[t._v("允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),s("p",[t._v("provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。")])]),t._v(" "),s("h3",{attrs:{id:"程序化的事件侦听器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#程序化的事件侦听器"}},[t._v("#")]),t._v(" 程序化的事件侦听器")]),t._v(" "),s("p",[t._v("$emit 的用法，它可以被 v-on 侦听，还可以按以下方法监听：")]),t._v(" "),s("ul",[s("li",[t._v("通过 $on(eventName, eventHandler) 侦听一个事件")]),t._v(" "),s("li",[t._v("通过 $once(eventName, eventHandler) 一次性侦听一个事件")]),t._v(" "),s("li",[t._v("通过 $off(eventName, eventHandler) 停止侦听一个事件")])]),t._v(" "),s("h3",{attrs:{id:"过滤器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#过滤器"}},[t._v("#")]),t._v(" 过滤器")]),t._v(" "),s("p",[t._v("Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式。"),s("br"),t._v("\n过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 在双花括号中 --\x3e")]),t._v("\n{{ message | capitalize }}\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 在 `v-bind` 中 --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("v-bind:")]),t._v("id")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("rawId | formatId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h2",{attrs:{id:"vue-router"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-router"}},[t._v("#")]),t._v(" Vue-router")]),t._v(" "),s("h3",{attrs:{id:"动态路由匹配-相当于用路由传参"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态路由匹配-相当于用路由传参"}},[t._v("#")]),t._v(" 动态路由匹配（相当于用路由传参）")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" router "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("VueRouter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("routes")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 动态路径参数 以冒号开头")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/user/:id'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("component")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" User "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"获所有路由或-404-not-found-路由"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#获所有路由或-404-not-found-路由"}},[t._v("#")]),t._v(" 获所有路由或 404 Not found 路由")]),t._v(" "),s("p",[t._v("路由 { path: '*' } 通常用于客户端 404 错误。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 会匹配所有路径")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 会匹配以 `/user-` 开头的任意路径")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/user-*'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。")]),t._v(" "),s("h3",{attrs:{id:"导航守卫-导航-表示路由正在发生改变"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#导航守卫-导航-表示路由正在发生改变"}},[t._v("#")]),t._v(" 导航守卫（“导航”表示路由正在发生改变）")]),t._v(" "),s("p",[t._v("导航守卫主要用来通过跳转或取消的方式守卫导航，"),s("strong",[t._v("参数或查询的改变并不会触发进入/离开的导航守卫")]),t._v("。")]),t._v(" "),s("h4",{attrs:{id:"全局前置守卫-router-beforeeach"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局前置守卫-router-beforeeach"}},[t._v("#")]),t._v(" 全局前置守卫（router.beforeEach）")]),t._v(" "),s("p",[s("strong",[t._v("确保 next 函数在任何给定的导航守卫中都被严格调用一次")]),t._v("。"),s("strong",[t._v("它可以出现多于一次")]),t._v("，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。")]),t._v(" "),s("h4",{attrs:{id:"全局解析守卫-router-beforeresolve"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局解析守卫-router-beforeresolve"}},[t._v("#")]),t._v(" 全局解析守卫（router.beforeResolve）")]),t._v(" "),s("p",[t._v("在导航被确认之前，同时"),s("strong",[t._v("在所有组件内守卫和异步路由组件被解析之后")]),t._v("，解析守卫就被调用。")]),t._v(" "),s("h4",{attrs:{id:"全局后置钩子-router-aftereach"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局后置钩子-router-aftereach"}},[t._v("#")]),t._v(" 全局后置钩子（router.afterEach）")]),t._v(" "),s("h3",{attrs:{id:"路由独享的守卫"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#路由独享的守卫"}},[t._v("#")]),t._v(" 路由独享的守卫")]),t._v(" "),s("p",[t._v("在路由配置上直接定义 beforeEnter 守卫：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" router "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("VueRouter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("routes")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/foo'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("component")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Foo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("beforeEnter")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("to"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" from"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" next")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h4",{attrs:{id:"完整的导航解析流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#完整的导航解析流程"}},[t._v("#")]),t._v(" 完整的导航解析流程")]),t._v(" "),s("ul",[s("li",[t._v("导航被触发。")]),t._v(" "),s("li",[t._v("在失活的组件里调用 beforeRouteLeave 守卫。")]),t._v(" "),s("li",[t._v("调用全局的 beforeEach 守卫。")]),t._v(" "),s("li",[t._v("在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。")]),t._v(" "),s("li",[t._v("在路由配置里调用 beforeEnter。")]),t._v(" "),s("li",[t._v("解析异步路由组件。")]),t._v(" "),s("li",[t._v("在被激活的组件里调用 beforeRouteEnter。")]),t._v(" "),s("li",[t._v("调用全局的 beforeResolve 守卫 (2.5+)。")]),t._v(" "),s("li",[t._v("导航被确认。")]),t._v(" "),s("li",[t._v("调用全局的 afterEach 钩子。")]),t._v(" "),s("li",[t._v("触发 DOM 更新。")]),t._v(" "),s("li",[t._v("调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。")])]),t._v(" "),s("h2",{attrs:{id:"web-安全"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#web-安全"}},[t._v("#")]),t._v(" Web 安全")]),t._v(" "),s("h3",{attrs:{id:"跨站脚本攻击-xss-的防御"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨站脚本攻击-xss-的防御"}},[t._v("#")]),t._v(" 跨站脚本攻击 (XSS) 的防御")]),t._v(" "),s("p",[t._v("XSS 的本质是一种”HTML 注入”。用户数据被当作 HTML 代码的一部分来执行。"),s("br"),t._v("\n设置 Cookie 的 HttpOnly 属性， 这个属性使浏览器禁止页面的 JavaScript 访问 Cookie。")]),t._v(" "),s("h3",{attrs:{id:"跨站点请求伪造-csfr-的防御"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨站点请求伪造-csfr-的防御"}},[t._v("#")]),t._v(" 跨站点请求伪造 (CSFR) 的防御")]),t._v(" "),s("ol",[s("li",[t._v("使用验证码")]),t._v(" "),s("li",[t._v("使用 Token (令牌)")])])])}),[],!1,null,null,null);a.default=r.exports}}]);