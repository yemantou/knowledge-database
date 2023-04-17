(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{336:function(t,s,a){"use strict";a.r(s);var n=a(15),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"闭包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#闭包"}},[t._v("#")]),t._v(" 闭包")]),t._v(" "),a("p",[t._v("闭包的定义："),a("br"),t._v("\n在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。可以在一个内层函数中访问到其外层函数的作用域。"),a("br"),t._v("\n闭包是指那些能够访问自由变量的函数。 自由变量是指在函数中使用的，但既不是当前函数参数也不是当前函数的局部变量的变量。 闭包 = 函数 + 函数能够访问的自由变量。")]),t._v(" "),a("p",[a("strong",[t._v("闭包 = 函数 + 函数能够访问的自由变量")])]),t._v(" "),a("h2",{attrs:{id:"ecmascript中-闭包指的是"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ecmascript中-闭包指的是"}},[t._v("#")]),t._v(" ECMAScript中，闭包指的是：")]),t._v(" "),a("p",[a("strong",[t._v("从理论角度：")]),a("br"),t._v("\n所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。"),a("br"),t._v(" "),a("strong",[t._v("从实践角度：")]),a("br"),t._v("\n即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）;在代码中引用了自由变量。")]),t._v(" "),a("h2",{attrs:{id:"闭包分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#闭包分析"}},[t._v("#")]),t._v(" 闭包分析：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" scope "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"global scope"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("checkscope")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" scope "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"local scope"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" scope"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" f"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" foo "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("checkscope")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("strong",[t._v("执行上下文栈和执行上下文的变化情况：")])]),t._v(" "),a("ul",[a("li",[t._v("进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈")]),t._v(" "),a("li",[t._v("全局执行上下文初始化")]),t._v(" "),a("li",[t._v("执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈")]),t._v(" "),a("li",[t._v("checkscope 执行上下文初始化，创建变量对象、作用域链、this等")]),t._v(" "),a("li",[t._v("checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出")]),t._v(" "),a("li",[t._v("执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈")]),t._v(" "),a("li",[t._v("f 执行上下文初始化，创建变量对象、作用域链、this等")]),t._v(" "),a("li",[t._v("f 函数执行完毕，f 函数上下文从执行上下文栈中弹出")])]),t._v(" "),a("p",[t._v("由以上的执行过程可以看出，执行 f 函数时"),a("strong",[t._v("checkscope函数的执行上下文已经被销毁了（从执行上下文栈中被弹出）")]),t._v("，所以读取到 checkscope 作用域下的 scope 值其实"),a("strong",[t._v("是通过f 执行上下文维护的作用域链。")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("fContext "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Scope")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" checkscopeContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" globalContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);