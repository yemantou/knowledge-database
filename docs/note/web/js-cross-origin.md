---
title: 跨域
autoGroup-1: JS
sidebarDepth: 0
autoSort: 985
---

# 跨域
::: tip 参考文章
[聊聊跨域的原理与解决方法](https://zhuanlan.zhihu.com/p/149734572?from_voters_page=true)
:::

跨域，是指浏览器不能执行其它网站的脚本。它是由浏览器的同源策略造成的，是浏览器对javascript实施的安全限制。 

所谓同源，就是域名、协议、端口均相同。   


## CORS
CORS的基本思想就是使用额外的HTTP头部让浏览器与服务器进行沟通，从而决定是否接受跨域请求。   


## 跨域的解决办法
遇到跨域的报错，可以分别从客户端和服务端去解决。   
### 客户端
跨域的判断是在浏览器进行的，服务器只是根据客户端的请求做出正常的响应，服务端不对跨域做任何判断。因此如果禁用了浏览器的跨域检查，使浏览器不再对比Origin是否被服务器允许，即可发出正常的请求。      
只在开发调试的过程中使用，如给chrome浏览器设置--disable-web-security参数。   

### 服务端
1. 代理转发     
   通过代理服务器代理转发，代理服务器和H5资源服务器放在同一个域名下，接口请求全走代理服务器。   
2. 配置CORS      
   在目标服务器上配置CORS响应头，这样浏览器经过对比判断之后，就可以发起正常的访问。


## 总结
- 跨域是由浏览器的同源策略造成的，所谓同源，即域名、协议、端口均相同。
- CORS（跨来源资源共享），通过添加HTTP头信息，使浏览器判断是否可以发起跨域访问。
- **浏览器将跨域请求分为两类：简单请求和非简单请求。简单请求采取先请求后判断的方式，非简单请求采取预检请求的方式判断是否允许跨域访问。**
- 解决跨域通常采用服务端代理转发和配置CORS两种方式。