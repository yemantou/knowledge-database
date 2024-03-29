---
title: HTML中的的JavaScript
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 999
---

### \<script>元素
外部JavaScript文件的扩展名是．js。这不是必需的，因为浏览器不会检查所包含JavaScript文件的扩展名。这就为使用服务器端脚本语言动态生成JavaScript代码，或者在浏览器中将JavaScript扩展语言（如TypeScript，或React的JSX）转译为JavaScript提供了可能性。不过要注意，服务器经常会根据文件扩 async来确定响应的正确MIME类型。如果不打算使用．js扩展名，一定要确保服务器能返回正确的MIME类型。   

#### \<script>元素有下列8个属性
-  async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。   
-  charset：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。   
-  crossorigin：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。   
-  defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在IE7及更早的版本中，对行内脚本也可以指定这个属性。   
-  integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI, Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容。   
-  language：废弃。最初用于表示代码块中的脚本语言（如"JavaScript"、"JavaScript 1.2"或"VBScript"）。大多数浏览器都会忽略这个属性，不应该再使用它。    
-  src：可选。表示包含要执行的代码的外部文件。   
-  type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript文件的MIME类型通常是"application/x-javascript"，不过给type属性这个值有可能导致脚本被忽略。在非IE的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。    

::: tip 提示
\<script>元素的一个最为强大、同时也备受争议的特性是，它可以包含来自外部域的JavaScript文件。跟\<img>元素很像，\<script>元素的src属性可以是一个完整的URL，而且这个URL指向的资源可以跟包含它的HTML页面不在同一个域中，比如这个例子：    \<script src="http://www.somewhere.com/afile.js">\</script>      

这个初始的请求不受浏览器同源策略限制，但返回并被执行的JavaScript则受限制。当然，这个请求仍然受父页面HTTP/HTTPS协议的限制。
:::

#### 标签位置
\<script>元素由都被放在页面的\<head>标签内变为放在\<body>元素中的页面内容后面。这样，页面会在处理JavaScript代码之前完全渲染页面。用户会感觉页面加载更快了，因为浏览器显示空白页面的时间短了。



### \<noscript>元素      
\<noscript>元素可以包含任何可以出现在\<body>中的HTML元素，\<script>除外。在下列两种情况下，浏览器将显示包含在\<noscript>中的内容：
1. 浏览器不支持脚本；    
2. 浏览器对脚本的支持被关闭。
