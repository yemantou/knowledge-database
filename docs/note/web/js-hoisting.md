---
title: 变量与函数提升（hoisting）
autoGroup-1: JS
sidebarDepth: 0
autoSort: 993
---

# 变量与函数提升（hoisting）

## 变量提升：
js的var关键字把**变量声明**，提升到了最顶端，然后才去执行剩下的编译代码。   
::: tip 注意
变量提升只提升声明，不提升赋值。   
:::

## 函数提升：  
```js
function chifan(){
  console.log('我要吃111')
}
chifan()
function chifan(){
  console.log('我要吃2222')
}
chifan()
// 我要吃2222
// 我要吃2222
```
**与变量提升不同，函数提升不仅仅提升函数声明，而是提升函数整体。**    

**函数表达式的方式不存在函数整体提升**，例如：
```js
var game=function (){
  console.log('111')
}
game()
var game=function (){
  console.log('2222')
}
game()
// 111
// 222
```

## 特殊情况
**如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。**     
```js
console.log(drink)
drink('白水')
function drink(type){
  var type = '牛奶'
  console.log(type)
}
var drink='饮料'
// [Function: drink]
// 牛奶
```  