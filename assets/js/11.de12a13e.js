(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{274:function(t,a,r){t.exports=r.p+"assets/img/dynamic-loading-cascader.ee5cf954.png"},320:function(t,a,r){"use strict";r.r(a);var s=r(15),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h3",{attrs:{id:"问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[t._v("#")]),t._v(" 问题")]),t._v(" "),s("h4",{attrs:{id:"_1-动态加载导致的回显问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-动态加载导致的回显问题"}},[t._v("#")]),t._v(" 1. 动态加载导致的回显问题；")]),t._v(" "),s("p",[t._v("问题原因："),s("br"),t._v("\n动态加载在回显时，存在绑定的值还未被加载的情况。")]),t._v(" "),s("p",[t._v("解决方法："),s("br"),t._v("\n在已有数据源中查询"),s("code",[t._v("v-model")]),t._v("传入的值，若无则调用接口则一级一级查询后保存起来。")]),t._v(" "),s("h4",{attrs:{id:"_2-页面复用组件多次导致的接口重复请求问题。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-页面复用组件多次导致的接口重复请求问题。"}},[t._v("#")]),t._v(" 2. 页面复用组件多次导致的接口重复请求问题。")]),t._v(" "),s("p",[t._v("解决方法："),s("br"),t._v("\n使用Map将每次请求的结果用"),s("code",[t._v("父节点id -> 子节点数组")]),t._v("的格式存起来，然后每次加载数据都按下图判断进行。"),s("br"),t._v(" "),s("img",{attrs:{src:r(274),alt:"流程图"}})])])}),[],!1,null,null,null);a.default=e.exports}}]);