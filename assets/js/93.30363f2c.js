(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{388:function(t,a,s){"use strict";s.r(a);var r=s(15),e=Object(r.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h3",{attrs:{id:"js中的类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js中的类"}},[t._v("#")]),t._v(" JS中的类")]),t._v(" "),s("p",[t._v("JavaScript和面向类的语言不同，它并没有类来作为对象的抽象模式或者说蓝图，JavaScript中只有对象。")]),t._v(" "),s("h4",{attrs:{id:"多态"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#多态"}},[t._v("#")]),t._v(" 多态")]),t._v(" "),s("p",[t._v("多态是一个非常广泛的话题，我们现在所说的“相对”只是多态的一个方面：任何方法都可以引用继承层次中高层的方法（无论高层的方法名和当前方法名是否相同）。之所以说“相对”是因为我们并不会定义想要访问的绝对继承层次（或者说类），而是使用相对引用“查找上一层”。")]),t._v(" "),s("h4",{attrs:{id:"js的对象机制并不会自动执行复制行为"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js的对象机制并不会自动执行复制行为"}},[t._v("#")]),t._v(" JS的对象机制并不会自动执行复制行为")]),t._v(" "),s("p",[t._v("传统的类被实例化时，它的行为会被复制到实例中。类被继承时，行为也会被复制到子类中。多态（在继承链的不同层次名称相同但是功能不同的函数）看起来似乎是从子类引用父类，但是本质上引用的其实是复制的结果。"),s("br"),t._v("\n在继承或者实例化时，JavaScript的对象机制并不会自动执行复制行为。简单来说，JavaScript中只有对象，并不存在可以被实例化的“类”。一个对象并不会被复制到其他对象，它们会被关联起来。"),s("br"),t._v("\n由于在其他语言中类表现出来的都是复制行为，因此JavaScript开发者也想出了一个方法来模拟类的复制行为，这个方法就是混入。")]),t._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),s("p",[t._v("JavaScript中的函数无法（用标准、可靠的方法）真正地复制，所以你只能复制对共享函数对象的引用。"),s("br"),t._v("\n如果你修改了共享的函数对象，相关联的引用都会受到影响。")])]),t._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("混入的缺点")]),t._v(" "),s("p",[t._v("混入模式（无论显式还是隐式）可以用来模拟类的复制行为，但是通常会产生丑陋并且脆弱的语法，比如显式伪多态（OtherObj.methodName.call(this, ...)），这会让代码更加难懂并且难以维护。"),s("br"),t._v("\n显式混入实际上无法完全模拟类的复制行为，因为对象（和函数！别忘了函数也是对象）只能复制引用，无法复制被引用的对象或者函数本身。忽视这一点会导致许多问题。")])]),t._v(" "),s("h4",{attrs:{id:"模拟类要使用new"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模拟类要使用new"}},[t._v("#")]),t._v(" 模拟类要使用new")]),t._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),s("p",[t._v("使用new的构造函数调用会生成．prototype和．constructor引用。"),s("br"),t._v("\nnew会运行构造函数，Object.create不会。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);