---
title: 浏览器的垃圾回收机制（Garbage Collection）
autoGroup-1: JS
sidebarDepth: 0
autoSort: 987
---

# 浏览器的垃圾回收机制（Garbage Collection）
GC 即 Garbage Collection ，程序工作过程中会产生很多 垃圾，这些垃圾是程序不用的内存或者是之前用过了，以后不会再用的内存空间，而 GC 就是负责回收垃圾的。     

::: tip 参考文章
[你真的了解垃圾回收机制吗](https://juejin.cn/post/6981588276356317214)   
:::


## 两种垃圾回收策略

### 标记清除
标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁。    

#### 缺点：
- 内存碎片化，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块。
- 分配速度慢，因为即便是使用 First-fit 策略，其操作仍是一个 O(n) 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢。

#### 缺点补充：
而 标记整理（Mark-Compact）算法 就可以有效地解决，它的标记阶段和标记清除算法没有什么不同，只是标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存。    

### 引用计数
把对象是否不再需要简化定义为对象有没有其他对象引用到它。如果没有引用指向该对象（引用计数为 0），对象将被垃圾回收机制回收。     

#### 缺点：
- 需要一个计数器，所占内存空间大，因为我们也不知道被引用数量的上限。
- 解决不了循环引用导致的无法回收问题。

### V8 的垃圾回收机制也是基于标记清除算法，不过对其做了一些优化
V8 的垃圾回收策略主要基于分代式垃圾回收机制，V8 中将堆内存分为新生代和老生代两区域。      
新生代的对象为存活时间较短的对象，简单来说就是新产生的对象，通常只支持 1～8M 的容量，而老生代的对象为存活事件较长或常驻内存的对象，简单来说就是经历过新生代垃圾回收后还存活下来的对象，容量通常比较大。    

- 针对新生区采用并行回收。
- 针对老生区采用增量标记与-惰性回收。

