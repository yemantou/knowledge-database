(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{281:function(t,v,_){t.exports=_.p+"assets/img/http-tcp.2419f6f6.png"},329:function(t,v,_){"use strict";_.r(v);var r=_(15),l=Object(r.a)({},(function(){var t=this,v=t.$createElement,r=t._self._c||v;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h2",{attrs:{id:"http请求流程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#http请求流程"}},[t._v("#")]),t._v(" HTTP请求流程")]),t._v(" "),r("p",[t._v("HTTP 协议，是建立在 TCP 连接基础之上的。"),r("strong",[t._v("HTTP 是一种允许浏览器向服务器获取资源的协议，是 Web 的基础")]),t._v("，通常由浏览器发起请求，用来获取不同类型的文件，例如 HTML 文件、CSS 文件、JavaScript 文件、图片、视频等。此外，"),r("strong",[t._v("HTTP 也是浏览器使用最广的协议")]),t._v("。")]),t._v(" "),r("p",[r("strong",[t._v("HTTP 的内容是通过 TCP 的传输数据阶段来实现的。")])]),t._v(" "),r("p",[t._v("TCP 和 HTTP 的关系：\n"),r("img",{attrs:{src:_(281),alt:"TCP 和 HTTP 的关系示意图"}})]),t._v(" "),r("h2",{attrs:{id:"导航请求流程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#导航请求流程"}},[t._v("#")]),t._v(" 导航请求流程")]),t._v(" "),r("p",[t._v("用户发出 URL 请求到页面开始解析的这个过程，就叫做导航。")]),t._v(" "),r("h4",{attrs:{id:"从输入url到页面展示发生了什么"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#从输入url到页面展示发生了什么"}},[t._v("#")]),t._v(" 从输入url到页面展示发生了什么？")]),t._v(" "),r("ol",[r("li",[r("p",[t._v("用户输入搜索内容（使用默认浏览器合成新的带搜索关键字的 URL）或者URL并回车；")])]),t._v(" "),r("li",[r("p",[t._v("浏览器进程检查url，组装协议，构成完整的url；")])]),t._v(" "),r("li",[r("p",[t._v("浏览器进程通过进程间通信（IPC）把url请求发送给网络进程")])]),t._v(" "),r("li",[r("p",[t._v("网络进程接收到url请求后检查本地缓存是否缓存了该请求资源，如果有则将该资源返回给浏览器进程；")])]),t._v(" "),r("li",[r("p",[t._v("如果没有，网络进程向web服务器发起http请求（网络请求），请求流程如下：")]),t._v(" "),r("ul",[r("li",[t._v("进行 DNS 解析，以获取请求域名的服务器 IP 地址。如果请求协议是 HTTPS，那么还需要建立 TLS 连接。")]),t._v(" "),r("li",[t._v("利用 IP 地址和服务器建立 TCP 连接。")]),t._v(" "),r("li",[t._v("浏览器端会构建请求行、请求头等信息，并把和该域名相关的 Cookie 等数据附加到请求头中，然后向服务器发送构建的请求信息。")]),t._v(" "),r("li",[t._v("服务器响应后，网络进程接收响应数据（包括响应行、响应头和响应体等信息）。")])])]),t._v(" "),r("li",[r("p",[t._v("网络进程解析响应流程；")]),t._v(" "),r("ul",[r("li",[t._v("检查状态码，如果是301/302，则需要重定向，从Location自动中读取地址，重新进行第4步")]),t._v(" "),r("li",[t._v("检查响应类型Content-Type，如果是字节流类型，则将该请求提交给下载管理器，该导航流程结束，不再进行后续的渲染，如果是html则通知浏览器进程准备渲染进程准备进行渲染。")])])]),t._v(" "),r("li",[r("p",[t._v("准备渲染进程；\nChrome 的默认策略是，每个标签对应一个渲染进程。但如果从一个页面打开了另一个新页面，而新页面和当前页面属于同一站点的话，那么新页面会复用父页面的渲染进程。官方把这个默认策略叫 process-per-site-instance。")])]),t._v(" "),r("li",[r("p",[t._v("提交数据、更新状态；(完整的导航流程就“走”完了)"),r("br"),t._v("\n浏览器进程将网络进程接收到的 HTML 数据提交给渲染进程；"),r("br"),t._v("\n渲染进程接收完数据后，向浏览器发送“确认提交”；"),r("br"),t._v("\n浏览器进程接收到确认消息后更新浏览器界面状态：安全、地址栏url、前进后退的历史状态、更新web页面。")])]),t._v(" "),r("li",[r("p",[t._v("页面渲染；")])])])])}),[],!1,null,null,null);v.default=l.exports}}]);