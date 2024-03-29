---
title: 客户端存储
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 981
---

## 客户端存储


### cookie
HTTP cookie通常也叫作cookie，最初用于在客户端存储会话信息。这个规范要求服务器在响应HTTP请求时，通过发送Set-Cookie HTTP头部包含会话信息。浏览器会存储这些会话信息，并在之后的每个请求中都会通过HTTP头部cookie再将它们发回服务器。   

#### 限制
- 不超过300个cookie；
- 每个cookie不超过4096字节；
- 每个域不超过20个cookie；
- 每个域不超过81920字节。

#### cookie的构成
cookie在浏览器中是由以下参数构成的：    
- 名称：唯一标识cookie的名称。cookie名不区分大小写，因此myCookie和MyCookie是同一个名称。不过，实践中最好将cookie名当成区分大小写来对待，因为一些服务器软件可能这样对待它们。cookie名必须经过URL编码。
- 值：存储在cookie里的字符串值。这个值必须经过URL编码。
- 域：cookie有效的域。发送到这个域的所有请求都会包含对应的cookie。这个值可能包含子域（如www.wrox.com），也可以不包含（如．wrox.com表示对wrox.com的所有子域都有效）。如果不明确设置，则默认为设置cookie的域。
- 路径：请求URL中包含这个路径才会把cookie发送到服务器。例如，可以指定cookie只能由http://www.wrox.com/books/访问，因此访问http://www.wrox.com/下的页面就不会发送cookie，即使请求的是同一个域。
- 过期时间：表示何时删除cookie的时间戳（即什么时间之后就不发送到服务器了）。默认情况下，浏览器会话结束后会删除所有cookie。不过，也可以设置删除cookie的时间。这个值是GMT格式（Wdy, DD-Mon-YYYY HH:MM: SS GMT），用于指定删除cookie的具体时间。这样即使关闭浏览器cookie也会保留在用户机器上。把过期时间设置为过去的时间会立即删除cookie。
- 安全标志：设置之后，只在使用SSL安全连接的情况下才会把cookie发送到服务器。例如，请求https://www.wrox.com会发送cookie，而请求http://www.wrox.com则不会。

#### JavaScript中的cookie
在JavaScript中处理cookie比较麻烦，因为接口过于简单，只有BOM的document.cookie属性。根据用法不同，该属性的表现迥异。要使用该属性获取值时，document.cookie返回包含页面中所有有效cookie的字符串（根据域、路径、过期时间和安全设置），以分号分隔。**所有名和值都是URL编码的，因此必须使用decodeURIComponent()解码。**    

设置cookie最好使用encodeURIComponent()对名称和值进行编码。   

#### 使用cookie的注意事项
还有一种叫作HTTP-only的cookie。HTTP-only可以在浏览器设置，也可以在服务器设置，但只能在服务器上读取，这是因为JavaScript无法取得这种cookie的值。      
因为所有cookie都会作为请求头部由浏览器发送给服务器，所以在cookie中保存大量信息可能会影响特定域浏览器请求的性能。**保存的cookie越大，请求完成的时间就越长。即使浏览器对cookie大小有限制，最好还是尽可能只通过cookie保存必要信息，以避免性能问题。**

::: tip 注意
不要在cookie中存储重要或敏感的信息。cookie数据不是保存在安全的环境中，因此任何人都可能获得。应该避免把信用卡号或个人地址等信息保存在cookie中。   
:::


### Web Storage
localStorage和sessionStorage。localStorage是永久存储机制，sessionStorage是跨会话的存储机制。    

#### sessionStorage对象
essionStorage对象只存储会话数据，这意味着数据只会存储到浏览器关闭（窗口关闭）。这跟浏览器关闭时会消失的会话cookie类似。存储在sessionStorage中的数据不受页面刷新影响，可以在浏览器崩溃并重启后恢复。（取决于浏览器，Firefox和WebKit支持，IE不支持。）

#### localStorage对象
要访问同一个localStorage对象，页面必须来自同一个域（子域不可以）、在相同的端口上使用相同的协议。   

存储在localStorage中的数据会保留到通过JavaScript删除或者用户清除浏览器缓存。localStorage数据不受页面刷新影响，也不会因关闭窗口、标签页或重新启动浏览器而丢失。

#### 限制
不同浏览器给localStorage和sessionStorage设置了不同的空间限制，但大多数会限制为每个源5MB。关于每种媒介的新配额限制信息表，可以参考web.dev网站上的文章“Storage for the Web”。


### IndexedDB
Indexed Database API简称IndexedDB，是浏览器中存储结构化数据的一个方案。IndexedDB用于代替目前已废弃的Web SQL Database API。IndexedDB背后的思想是创造一套API，方便JavaScript对象的存储和获取，同时也支持查询和搜索。    

IndexedDB的设计几乎完全是异步的。为此，大多数操作以请求的形式执行，这些请求会异步执行，产生成功的结果或错误。绝大多数IndexedDB操作要求添加onerror和onsuccess事件处理程序来确定输出。

#### 数据库
IndexedDB是类似于MySQL或Web SQL Database的数据库。与传统数据库最大的区别在于，IndexedDB使用对象存储而不是表格保存数据。IndexedDB数据库就是在一个公共命名空间下的一组对象存储，类似于NoSQL风格的实现。    



