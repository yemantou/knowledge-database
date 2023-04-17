(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{275:function(t,s,a){t.exports=a.p+"assets/img/JS-DOM.4858a849.png"},276:function(t,s,a){t.exports=a.p+"assets/img/diff.91281a62.png"},277:function(t,s,a){t.exports=a.p+"assets/img/with.f427711a.png"},278:function(t,s,a){t.exports=a.p+"assets/img/render-vnode.61ef8d05.png"},325:function(t,s,a){"use strict";a.r(s);var n=a(15),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"vue原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue原理"}},[t._v("#")]),t._v(" Vue原理")]),t._v(" "),n("h3",{attrs:{id:"组件化和mvvm"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#组件化和mvvm"}},[t._v("#")]),t._v(" 组件化和MVVM")]),t._v(" "),n("ul",[n("li",[t._v("传统组件，只是静态渲染，更新还要依赖于操作DOM")]),t._v(" "),n("li",[t._v("MVVM，数据驱动视图：Model-View-ViewModel；dom通过监听事件操作vue里的data，反之vue中的data通过指令操作dom，这就是所说数据驱动视图")]),t._v(" "),n("li",[t._v("MVC 和 MVVM："),n("br"),t._v("\nMVC：Model-View-Controller，Model 跟 View 之间的同步通过 Controller 来控制。"),n("br"),t._v("\nMVVM：Model-View-ViewModel；MVVM实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变。")])]),t._v(" "),n("h3",{attrs:{id:"响应式原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#响应式原理"}},[t._v("#")]),t._v(" 响应式原理")]),t._v(" "),n("ul",[n("li",[t._v("组件 data 的数据一旦变化，立刻触发视图更新")]),t._v(" "),n("li",[t._v("核心API - Object.defineProperty")])]),t._v(" "),n("h4",{attrs:{id:"如何实现响应式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#如何实现响应式"}},[t._v("#")]),t._v(" 如何实现响应式？")]),t._v(" "),n("p",[t._v("使用Object.defineProperty（数据劫持 / 数据代理）"),n("br"),t._v("\n基本用法：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 触发更新视图")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'视图更新'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重新定义数据原型")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" oldArrayProperty "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建新对象，原型指向 oldArrayProperty，再扩展新的方法不会影响原型")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" arrProto "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Object"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldArrayProperty"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'push'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'pop'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'shift'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'unshift'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'splice'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("methodName")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  arrProto"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("methodName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    oldArrayProperty"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("methodName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("arguments"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    \n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 触发视图更新")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 重新定义属性、监听起来\n * 需要定义 defineReactive 函数的原因：\n * get和set需要变量周转才能工作，将get和set放到一个函数中形成闭包\n */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("defineReactive")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" key"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 深度监听（值可能也是个对象）")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("observer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 核心API")]),t._v("\n  Object"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("defineProperty")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" key"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" value\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newVal"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newVal "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" value"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 深度监听新值（新增的值可能也是个对象）")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("observer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newVal"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置新值")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值")]),t._v("\n        value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" newVal\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 触发视图更新")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 监听对象属性")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("observer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("target")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" target "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'object'")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" target "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不是对象或数组")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" target\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 数组通过修改原型进行监听")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("isArray")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    Object"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setPrototypeOf")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arrProto"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重新定义各个属性，for in可以遍历对象和数组")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" key "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("defineReactive")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" key"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 准备数据")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" data "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'zhangsan'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("age")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("info")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("address")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'北京'")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("nums")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 监听数据")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("observer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 测试")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// data.name = 'lisi'")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// data.age = 21")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// data.x = '100' //新增属性，监听不到 - 所以有 Vue.set")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// delete data.name // 删除属性，监听不到 - 所以有 Vue.delete")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// data.info.address = '上海' // 深度监听")]),t._v("\ndata"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nums"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 监听数组")]),t._v("\n")])])]),n("h4",{attrs:{id:"object-defineproperty的一些缺点-vue3-0-使用-proxy"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#object-defineproperty的一些缺点-vue3-0-使用-proxy"}},[t._v("#")]),t._v(" Object.defineProperty的一些缺点（Vue3.0 使用 Proxy）")]),t._v(" "),n("ul",[n("li",[t._v("深度监听，需要递归到底，一次性计算量大")]),t._v(" "),n("li",[t._v("无法监听新增属性 / 删除属性（解决方法：Vue.set Vue.delete）")]),t._v(" "),n("li",[t._v("无法原生监听数组，需要特殊处理")])]),t._v(" "),n("h3",{attrs:{id:"vdom-和-diff算法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vdom-和-diff算法"}},[t._v("#")]),t._v(" vdom 和 diff算法")]),t._v(" "),n("ul",[n("li",[t._v("vdom 是实现 Vue 和 React 的重要基石")]),t._v(" "),n("li",[t._v("diff算法是 vdom 中最核心、最关键的部分")])]),t._v(" "),n("p",[t._v("问题：DOM操作非常耗费性能，现代业务和DOM操作复杂需要复杂计算。"),n("br"),t._v("\n思路：有了一定复杂度，想减少计算次数比较困难，能不能把计算更多的转移我JS计算？JS计算很快"),n("br"),t._v("\n解决方案：vdom")]),t._v(" "),n("h4",{attrs:{id:"vdom"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vdom"}},[t._v("#")]),t._v(" vdom")]),t._v(" "),n("p",[t._v("用 JS 模拟 DOM 结构，计算出最小的变更，操作DOM\n"),n("img",{attrs:{src:a(275),alt:"v-model"}})]),t._v(" "),n("h4",{attrs:{id:"diff算法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#diff算法"}},[t._v("#")]),t._v(" diff算法")]),t._v(" "),n("p",[t._v("diff是发生在虚拟DOM上面的，新老虚拟DOM进行diff（精细化比较），算出应该如何最小量更新，最后反映到真正的DOM上。")]),t._v(" "),n("p",[n("strong",[t._v("虚拟节点的属性")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("sel")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("key")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 也可以放在data中的props中")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("elm")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("data")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("children")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("text")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'我是一个盒子'")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[n("strong",[t._v("虚拟DOM是如何被渲染函数（h函数）产生？（手写h函数）")])]),t._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("学习snabbdom工程")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://github.com/yemantou/study-snabbdom",target:"_blank",rel:"noopener noreferrer"}},[t._v("学习snabbdom（h函数）"),n("OutboundLink")],1)])]),t._v(" "),n("ul",[n("li",[t._v("h函数用来产生虚拟节点（vnode）"),n("br"),t._v("\n例如："),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 调用h函数")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("h")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("props")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("href")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://......'")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'随机网址'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 得到虚拟节点")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("sel")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("data")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("props")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("href")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://......'")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("text")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'随机网址'")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n")])])])])]),t._v(" "),n("p",[n("strong",[t._v("diff算法原理？（手写diff算法）")])]),t._v(" "),n("ul",[n("li",[t._v("最小量更新；"),n("strong",[t._v("key非常重要，key是这个节点的唯一标识，告诉diff算法，在更改前后它们是同一个DOM节点")]),t._v("；")]),t._v(" "),n("li",[n("strong",[t._v("只有是同一个（选择器相同且key相同）虚拟节点才进行精细比较")]),t._v("，否则就暴力插入新的，删除旧的；")]),t._v(" "),n("li",[n("strong",[t._v("只进行同层比较，不会进行跨层比较")]),t._v("。")])]),t._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("参考文章")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/weixin_44337386/article/details/125493569",target:"_blank",rel:"noopener noreferrer"}},[t._v("diff算法流程"),n("OutboundLink")],1)])]),t._v(" "),n("p",[n("strong",[t._v("innerText一旦改变为新的text，节点的children有就会被清空。但是如果是追加DOM不会清空text。")]),n("br"),t._v(" "),n("img",{attrs:{src:a(276),alt:"diff流程"}})]),t._v(" "),n("p",[n("strong",[t._v("虚拟DOM如何通过diff变成真正的DOM的？")])]),t._v(" "),n("h3",{attrs:{id:"模板编译"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#模板编译"}},[t._v("#")]),t._v(" 模板编译")]),t._v(" "),n("h4",{attrs:{id:"前置知识-js的-with-语法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#前置知识-js的-with-语法"}},[t._v("#")]),t._v(" 前置知识，JS的 with 语法")]),t._v(" "),n("p",[n("img",{attrs:{src:a(277),alt:"with 语法"}})]),t._v(" "),n("ul",[n("li",[t._v("改变{}内自由变量的查找规则，当做obj属性来查找")]),t._v(" "),n("li",[t._v("如果找不到匹配的obj属性，就会报错")]),t._v(" "),n("li",[t._v("with要慎用，它打破了作用域规则，易读性变差")])]),t._v(" "),n("h4",{attrs:{id:"模板"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#模板"}},[t._v("#")]),t._v(" 模板")]),t._v(" "),n("ul",[n("li",[t._v("模板不是html，有指令、插值、JS表达式，能实现判断、循环")]),t._v(" "),n("li",[t._v("html是标签语言，只有JS才能实现判断、循环（图灵完备的）")]),t._v(" "),n("li",[t._v("因此，模板一定是转换为某种JS代码，即编译模板")])]),t._v(" "),n("p",[n("strong",[t._v("开发环境下，使用webpack vue loader 编译（重要）")])]),t._v(" "),n("h4",{attrs:{id:"vue-template-complier-将模板编译为render函数"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue-template-complier-将模板编译为render函数"}},[t._v("#")]),t._v(" vue template complier 将模板编译为render函数")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://github.com/yemantou/study-snabbdom/blob/main/src/vue-compiler/index.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("将模板编译为render函数"),n("OutboundLink")],1)]),t._v(" "),n("h4",{attrs:{id:"执行-render-函数生成-vnode"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#执行-render-函数生成-vnode"}},[t._v("#")]),t._v(" 执行 render 函数生成 vnode")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("Vue"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("component")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'anchored-heading'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("template")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'xxxx'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("render")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'h'")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("level"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("   "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 标签名称")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("attrs")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'headerId'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("href")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#'")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'headerId'")]),t._v("\n          "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'this is a tag'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("h3",{attrs:{id:"小结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),n("ul",[n("li",[t._v("响应式：监听 data 属性 getter setter （包括数组），使用Object.defineProperty这个API")]),t._v(" "),n("li",[t._v("模板编译：模板到renser函数，再到vnode")]),t._v(" "),n("li",[t._v("vdom：patch(elm, vnode) 和 patch(vnode, newVnode)")])]),t._v(" "),n("h3",{attrs:{id:"组件-渲染-更新-过程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#组件-渲染-更新-过程"}},[t._v("#")]),t._v(" 组件 渲染/更新 过程")]),t._v(" "),n("p",[n("img",{attrs:{src:a(278),alt:"组件 渲染/更新 过程"}})]),t._v(" "),n("ul",[n("li",[t._v("初次渲染过程\n"),n("ul",[n("li",[t._v("解析模板为 render 函数（或在开发环境已经完成，webpack vue-loader）")]),t._v(" "),n("li",[t._v("触发响应式，监听 data 属性 getter setter")]),t._v(" "),n("li",[t._v("执行 render 函数，生成 vnode，patch(elm, vnode)；执行 render 时就会触发 getter")])])]),t._v(" "),n("li",[t._v("更新过程\n"),n("ul",[n("li",[t._v("修改data，触发 setter (此前在 getter 中已被监听)")]),t._v(" "),n("li",[t._v("重新执行 render 函数，生成 newVnode")]),t._v(" "),n("li",[t._v("patch(vnode, newVnode)")])])]),t._v(" "),n("li",[t._v("异步渲染\n"),n("ul",[n("li",[t._v("回顾 $nextTick，下一次 DOM 更新时执行")]),t._v(" "),n("li",[t._v("汇总 data 的修改，一次性更新视图")]),t._v(" "),n("li",[t._v("减少 DOM 操作次数，提高性能")])])])]),t._v(" "),n("h3",{attrs:{id:"前端路由"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#前端路由"}},[t._v("#")]),t._v(" 前端路由")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://github.com/yemantou/study-snabbdom/blob/main/src/router/hash.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("路由学习"),n("OutboundLink")],1),n("br"),t._v("\n模式：")]),t._v(" "),n("ul",[n("li",[t._v("hash，#及后面的部分\n"),n("ul",[n("li",[t._v("hash 变化会触发网页跳转，即浏览器的前进、后退")]),t._v(" "),n("li",[t._v("hash 变化不会刷新页面，SPA必需的特点")]),t._v(" "),n("li",[t._v("hash 永远不会提交到 server 端（前端自生自灭）")]),t._v(" "),n("li",[t._v("window.onhashchange 监听")])])]),t._v(" "),n("li",[t._v("h5 history（需要后端支持，不然刷新后会丢失页面）\n"),n("ul",[n("li",[t._v("用 url 规范的路由，但跳转时不刷新页面")]),t._v(" "),n("li",[t._v("history.pushState")]),t._v(" "),n("li",[t._v("window.onpopstate")])])])]),t._v(" "),n("p",[n("strong",[t._v("两者的选择：")])]),t._v(" "),n("ul",[n("li",[t._v("to B 的系统推荐使用hash，简单易用，对 url 规范不敏感")]),t._v(" "),n("li",[t._v("to C 的系统，可以考虑选择 H5 history，但需要服务端支持")])]),t._v(" "),n("h3",{attrs:{id:"nexttick原理-利用promise、mutationobserver以及settimeout三种"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#nexttick原理-利用promise、mutationobserver以及settimeout三种"}},[t._v("#")]),t._v(" nextTick原理（利用Promise、MutationObserver以及setTimeout三种）")]),t._v(" "),n("p",[t._v("利用JS的event loop（事件循环），Vue中DOM的修改是异步任务中的微任务，所以通过在DOM修改后新增微任务或宏任务来拿到最新的DOM")]),t._v(" "),n("ol",[n("li",[t._v("执行微任务过程中产生的微任务，会被添加到微任务队列尾部，在前面微任务执行完后执行，属于本次事件循环。也就是在下一个宏任务执行之前执行。")]),t._v(" "),n("li",[t._v("执行微任务过程中产生的宏任务，会在微任务队列被清空后再开始执行。")])]),t._v(" "),n("p",[n("strong",[t._v("多次调用nextTick会将方法存入队列，通过异步方法清空当前队列。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);