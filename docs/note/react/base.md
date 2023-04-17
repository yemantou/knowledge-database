---
title: React基础
autoGroup-1: React
sidebarDepth: 0
autoSort: 999
---

# React基础

## JSX语法
1. 定义虚拟DOM时，不要写引号；
2. 标签中混入JS表达式时要用{}；
3. 样式的类名指定不要用class，要用className；
4. 内联样式，要用下面的形式去写；
   ```html
   style={{key: value}} 
   ```
5. 只有一个根标签；
6. 标签必须闭合；
7. 标签首字母
   - 若小写字母开头，则将标签转为html中同名原色，若html中无该标签对应的同名元素，则报错；
   - 若大写字母开头，reaxt就去渲染对应的组件，若组件没有定义，则报错。