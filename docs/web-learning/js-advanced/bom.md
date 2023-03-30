---
title: BOM
autoGroup-1: JS高级程序设计
sidebarDepth: 0
autoSort: 985
---

## BOM（Browser Object Mode）浏览器对象模型


### window对象
BOM的核心是window对象，表示浏览器的实例。window对象在浏览器中有两重身份，一个是ECMAScript中的Global对象，另一个就是浏览器窗口的JavaScript接口。       

#### 窗口关系
top对象始终指向最上层（最外层）窗口，即浏览器窗口本身。而parent对象则始终指向当前窗口的父窗口。如果当前窗口是最上层窗口，则parent等于top（都等于window）。最上层的window如果不是通过window.open()打开的，那么其name属性就不会包含值。     
还有一个self对象，它是终极window属性，始终会指向window。实际上，self和window就是同一个对象。之所以还要暴露self，就是为了和top、parent保持一致。     


### location对象
location是最有用的BOM对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。这个对象独特的地方在于，它既是window的属性，也是document的属性。也就是说，window.location和document.location指向同一个对象。location对象不仅保存着当前加载文档的信息，也保存着把URL解析为离散片段后能够通过属性访问的信息。     


### navigator对象

### screen对象

### history对象
history对象表示当前窗口首次使用以来用户的导航历史记录。因为history是window的属性，所以每个window都有自己的history对象。出于安全考虑，这个对象不会暴露用户访问过的URL，但可以通过它在不知道实际URL的情况下前进和后退。