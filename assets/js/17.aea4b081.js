(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{288:function(t,s,a){t.exports=a.p+"assets/img/document.d6c529cd.png"},366:function(t,s,a){"use strict";a.r(s);var n=a(15),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"文档对象模型-dom-document-object-model"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#文档对象模型-dom-document-object-model"}},[t._v("#")]),t._v(" 文档对象模型（DOM, Document Object Model）")]),t._v(" "),n("p",[t._v("IE8及更低版本中的DOM是通过COM对象实现的。这意味着这些版本的IE中，DOM对象跟原生JavaScript对象具有不同的行为和功能。")]),t._v(" "),n("div",{staticClass:"language-html extra-class"},[n("pre",{pre:!0,attrs:{class:"language-html"}},[n("code",[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Sample Page"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Hello World! "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),n("p",[t._v("如果表示为层级结构，则如图：\n"),n("img",{attrs:{src:a(288),alt:"层级结构"}})]),t._v(" "),n("p",[t._v("其中，document节点表示每个文档的根节点。在这里，根节点的唯一子节点是html元素，我们称之为文档元素（documentElement）。文档元素是文档最外层的元素，所有其他元素都存在于这个元素之内。每个文档只能有一个文档元素。在HTML页面中，文档元素始终是html元素。在XML文档中，则没有这样预定义的元素，任何元素都可能成为文档元素。")]),t._v(" "),n("h3",{attrs:{id:"dom编程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dom编程"}},[t._v("#")]),t._v(" DOM编程")]),t._v(" "),n("p",[t._v("很多时候，操作DOM是很直观的。通过HTML代码能实现的，也一样能通过JavaScript实现。")]),t._v(" "),n("h4",{attrs:{id:"动态脚本"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#动态脚本"}},[t._v("#")]),t._v(" 动态脚本")]),t._v(" "),n("p",[t._v("与对应的HTML元素一样，有两种方式通过<script>动态为网页添加脚本：引入外部文件和直接插入源代码。")]),t._v(" "),n("h3",{attrs:{id:"mutationobserver接口"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#mutationobserver接口"}},[t._v("#")]),t._v(" MutationObserver接口")]),t._v(" "),n("p",[t._v("MutationObserver接口，可以在DOM被修改时异步执行回调。使用MutationObserver可以观察整个文档、DOM树的一部分，或某个元素。此外还可以观察元素属性、子节点、文本，或者前三者任意组合的变化。")]),t._v(" "),n("h4",{attrs:{id:"基本用法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基本用法"}},[t._v("#")]),t._v(" 基本用法")]),t._v(" "),n("p",[t._v("MutationObserver的实例要通过调用MutationObserver构造函数并传入一个回调函数来创建：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" observer "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MutationObserver")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DOM was mutated! '")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("要把这个observer与DOM关联起来，需要使用observe()方法。这个方法接收两个必需的参数：要观察其变化的DOM节点，以及一个MutationObserverInit对象。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" observer "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MutationObserver")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<body> attributes changed'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nobserver"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("observe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("attributes")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("h2",{attrs:{id:"dom扩展"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dom扩展"}},[t._v("#")]),t._v(" DOM扩展")]),t._v(" "),n("h3",{attrs:{id:"selectors-api"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#selectors-api"}},[t._v("#")]),t._v(" Selectors API")]),t._v(" "),n("h4",{attrs:{id:"queryselector"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#queryselector"}},[t._v("#")]),t._v(" querySelector()")]),t._v(" "),n("p",[t._v("querySelector()方法接收CSS选择符参数，返回匹配该模式的第一个后代元素，如果没有匹配项则返回null。下面是一些例子：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 取得<body>元素")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" body "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"body"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 取得ID为"myDiv"的元素')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" myDiv "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#myDiv"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 取得类名为"selected"的第一个元素')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" selected "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('".selected"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 取得类名为"button"的图片')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" img "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"img.button"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("h4",{attrs:{id:"queryselectorall"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#queryselectorall"}},[t._v("#")]),t._v(" querySelectorAll()")]),t._v(" "),n("p",[t._v("querySelectorAll()方法跟querySelector()一样，也接收一个用于查询的参数，但它会返回所有匹配的节点，而不止一个。这个方法返回的是一个NodeList的静态实例。再强调一次，querySelectorAll()返回的NodeList实例一个属性和方法都不缺，但它"),n("strong",[t._v("是一个静态的“快照”，而非“实时”的查询")]),t._v("。这样的底层实现避免了使用NodeList对象可能造成的性能问题。")]),t._v(" "),n("h4",{attrs:{id:"matches"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#matches"}},[t._v("#")]),t._v(" matches()")]),t._v(" "),n("p",[t._v("matches()方法（在规范草案中称为matchesSelector()）接收一个CSS选择符参数，如果元素匹配则该选择符返回true，否则返回false。")]),t._v(" "),n("h3",{attrs:{id:"元素遍历"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#元素遍历"}},[t._v("#")]),t._v(" 元素遍历")]),t._v(" "),n("p",[t._v("IE9之前的版本不会把元素间的空格当成空白节点，而其他浏览器则会。这样就导致了childNodes和firstChild等属性上的差异。为了弥补这个差异，同时不影响DOM规范，W3C通过新的Element Traversal规范定义了一组新属性。")]),t._v(" "),n("p",[t._v("Element Traversal API为DOM元素添加了5个属性：")]),t._v(" "),n("ul",[n("li",[t._v("childElementCount，返回子元素数量（不包含文本节点和注释）；")]),t._v(" "),n("li",[t._v("firstElementChild，指向第一个Element类型的子元素（Element版firstChild）；")]),t._v(" "),n("li",[t._v("lastElementChild，指向最后一个Element类型的子元素（Element版lastChild）；")]),t._v(" "),n("li",[t._v("previousElementSibling，指向前一个Element类型的同胞元素（Element版previousSibling）；")]),t._v(" "),n("li",[t._v("nextElementSibling，指向后一个Element类型的同胞元素（Element版nextSibling）。")])]),t._v(" "),n("h3",{attrs:{id:"html5"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#html5"}},[t._v("#")]),t._v(" HTML5")]),t._v(" "),n("p",[t._v("HTML5代表着与以前的HTML截然不同的方向。在所有以前的HTML规范中，从未出现过描述JavaScript接口的情形，HTML就是一个纯标记语言。JavaScript绑定的事，一概交给DOM规范去定义。然而，HTML5规范却包含了与标记相关的大量JavaScript API定义。其中有的API与DOM重合，定义了浏览器应该提供的DOM扩展。")]),t._v(" "),n("h4",{attrs:{id:"css类扩展"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#css类扩展"}},[t._v("#")]),t._v(" CSS类扩展")]),t._v(" "),n("ol",[n("li",[t._v("getElementsByClassName()"),n("br"),t._v("\n接收一个参数，即包含一个或多个类名的字符串，返回类名中包含相应类的元素的NodeList。如果提供了多个类名，则顺序无关紧要。")]),t._v(" "),n("li",[t._v("classList属性\n"),n("ul",[n("li",[t._v("add（value），向类名列表中添加指定的字符串值value。如果这个值已经存在，则什么也不做。")]),t._v(" "),n("li",[t._v("contains（value），返回布尔值，表示给定的value是否存在。")]),t._v(" "),n("li",[t._v("remove（value），从类名列表中删除指定的字符串值value。")]),t._v(" "),n("li",[t._v("toggle（value），如果类名列表中已经存在指定的value，则删除；如果不存在，则添加。")])])]),t._v(" "),n("li",[t._v("焦点管理"),n("br"),t._v("\ndocument.activeElement方法，始终包含当前拥有焦点的DOM元素。页面加载时，可以通过用户输入（按Tab键或代码中使用focus()方法）\n让某个元素自动获得焦点。"),n("br"),t._v("\n默认情况下，document.activeElement在页面刚加载完之后会设置为document.body。而在页面完全加载之前，document.activeElement的值为null。"),n("br"),t._v("\ndocument.hasFocus()方法，该方法返回布尔值，表示文档是否拥有焦点。")])]),t._v(" "),n("h4",{attrs:{id:"htmldocument扩展"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#htmldocument扩展"}},[t._v("#")]),t._v(" HTMLDocument扩展")]),t._v(" "),n("h4",{attrs:{id:"scrollintoview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#scrollintoview"}},[t._v("#")]),t._v(" scrollIntoView()")]),t._v(" "),n("p",[t._v("scrollIntoView()方法存在于所有HTML元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口。这个方法的参数如下：")]),t._v(" "),n("ul",[n("li",[t._v("alignToTop是一个布尔值。\n"),n("ul",[n("li",[t._v("true：窗口滚动后元素的顶部与视口顶部对齐。")]),t._v(" "),n("li",[t._v("false：窗口滚动后元素的底部与视口底部对齐。")])])]),t._v(" "),n("li",[t._v("scrollIntoViewOptions是一个选项对象。\n"),n("ul",[n("li",[t._v('behavior：定义过渡动画，可取的值为"smooth"和"auto"，默认为"auto"。')]),t._v(" "),n("li",[t._v('block：定义垂直方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为"start"。')]),t._v(" "),n("li",[t._v('inline：定义水平方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为"nearest"。')])])]),t._v(" "),n("li",[t._v("不传参数等同于alignToTop为true\n例子：")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 确保元素可见")]),t._v("\ndocument"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("forms"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("scrollIntoView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 同上")]),t._v("\ndocument"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("forms"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("scrollIntoView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndocument"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("forms"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("scrollIntoView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("block")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'start'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 尝试将元素平滑地滚入视口")]),t._v("\ndocument"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("forms"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("scrollIntoView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("behavior")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'smooth'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("block")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'start'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("h2",{attrs:{id:"dom2和dom3"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dom2和dom3"}},[t._v("#")]),t._v(" DOM2和DOM3")]),t._v(" "),n("p",[t._v("DOM1（DOM Level 1）主要定义了HTML和XML文档的底层结构。DOM2（DOM Level 2）和DOM3（DOM Level 3）在这些结构之上加入更多交互能力，提供了更高级的XML特性。实际上，DOM2和DOM3是按照模块化的思路来制定标准的，每个模块之间有一定关联，但分别针对某个DOM子集。这些模式如下所示。")]),t._v(" "),n("ul",[n("li",[t._v("DOM Core：在DOM1核心部分的基础上，为节点增加方法和属性。")]),t._v(" "),n("li",[t._v("DOM Views：定义基于样式信息的不同视图。")]),t._v(" "),n("li",[t._v("DOM Events：定义通过事件实现DOM文档交互。")]),t._v(" "),n("li",[t._v("DOM Style：定义以编程方式访问和修改CSS样式的接口。")]),t._v(" "),n("li",[t._v("DOM Traversal and Range：新增遍历DOM文档及选择文档内容的接口。")]),t._v(" "),n("li",[t._v("DOM HTML：在DOM1 HTML部分的基础上，增加属性、方法和新接口。")]),t._v(" "),n("li",[t._v("DOM Mutation Observers：定义基于DOM变化触发回调的接口。这个模块是DOM4级模块，用于取代Mutation Events。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);