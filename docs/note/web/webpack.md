---
title: webpack
autoGroup-1: webpack
sidebarDepth: 0
autoSort: 999
---

# webpack
- 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，
  保证项目结构的清晰和可读性。
- 编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过webpack的Loader机制，
  不仅仅可以帮助我们对代码做- polyfill，还可以编译转换诸如.less, .vue, .jsx这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。
- 能力扩展。通过webpack的Plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，
  工程效率以及打包输出的质量。

## process.cwd() 和 __dirname 的区别
- process.cwd()：当前 node 进程的路径，也就是整个项目的根路径
- __dirname：当前执行文件所处文件夹的路径

## 作用
本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。   


## 前端为何要进行打包构建
- 体积更小（Tree-Shaking、压缩、合并），加载更快
- 编译高级语言或语法（TS，ES6+，模块化，scss）
- 兼容性和错误检查（Polyfill、postcss、eslint）
- 统一、高效的开发环境
- 统一的构建流程和产出标准
- 集成公司的构建规范（提测、上线等）


## module、chunk、bundle的区别
- module，各个源码文件，webpack中一切皆模块
- chunk，多模块合成的，如entry import() splitChunk
- bundle，最终输出文件（每个chunk打包都会生成一个bundle）


## loader和plugin的区别
- loader，模块转换器，如less -> css
- plugin，扩展插件，如HtmlWebpackPlugin


## 常见的loader和plugin有哪些
- [loader文档](https://webpack.docschina.org/loaders)
- [plugin文档](https://webpack.docschina.org/plugins/)


## babel和webpack的区别
- babel，js新语法编译工具，不关心模块化。    
  Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，不转换新的 API。     
  Polyfill，Polyfill的准确意思为，用于实现浏览器并不支持的原生API的代码。
- webpack，打包构建工具，是多个loader plugin的集合


## 如何产出一个lib
```js
output: {
  // lib 的文件名
  filename: 'lodash.js'
  // 输出 lib 到 dist 目录下
  path: distPath,
  // lib 的全局变量名
  library: 'lodash'
}
```


## babel-polyfill 和 babel-runtime 的区别
- babel-polyfill会污染全局
- babel-runtime不会污染全局
- 产出第三方 lib 要用 babel-runtime


## webpack如何实现懒加载
- import()
- 结合Vue、React 异步组件
- 结合Vue-router、React-router 异步加载路由
  

## 为何 Proxy 不能 被Polyfill
- Class 可以用 function 模拟
- Promise 可以用 callback 模拟 
- Proxy 用 Object.defineProperty 无法模拟，因为defineProperty只支持对get和set方法的操作，而Proxy可以支持对in、has等方法的代理


## webpack 优化构建速度
1. 可用于生产环境:  
- 优化babel-loader； （减小打包模块入手）
- IgnorePlugin； （减小打包模块入手，直接不引入）
- noParse； （减小打包模块入手，引入,但不打包(不进行编译不进行模块化分析)）
- happyPack；（减少打包时间入手）
- ParalleUglifyPlugin; （减少打包时间入手）

2. 不用于生产环境，用于开发环境：   
- 自动刷新；（提升开发体验）
- 热更新； （提升开发体验）
- 使用 webpack.DllPlugin 来预先编译（减小打包模块入手）

