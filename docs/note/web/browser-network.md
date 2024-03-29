---
title: 网络协议
autoGroup-1: 浏览器
sidebarDepth: 0
autoSort: 998
---

## 网络协议
::: tip 学习课程
[浏览器的工作原理及实践](https://time.geekbang.org/column/article/113550)
:::

### IP：把数据包送达目的主机
**计算机的地址就称为 IP 地址，访问任何网站实际上只是你的计算机向另外一台计算机请求信息。**    

想把一个数据包从主机 A 发送给主机 B，那么在传输之前，数据包上会被附加上**主机 B 的 IP 地址信息**，这样在传输过程中才能正确寻址。额外地，数据包上还会附加上**主机 A 本身的 IP 地址**，有了这些信息主机 B 才可以回复信息给主机 A。这些附加的信息**会被装进一个叫 IP 头的数据结构里**。IP 头是 IP 数据包开头的信息，包含 IP 版本、源 IP 地址、目标 IP 地址、生存时间等信息。     

### UDP：把数据包送达应用程序
UDP 中一个最重要的信息是**端口号**，端口号其实就是一个数字，每个想访问网络的程序都需要绑定一个端口号。     

**IP 通过 IP 地址信息把数据包发送给指定的电脑，而 UDP 通过端口号把数据包分发给正确的程序**。端口号会被装进 UDP 头里面，UDP 头再和原始数据包合并组成新的 UDP 数据包。UDP 头中除了目的端口，还有源端口号等信息。   
 
UDP 可以校验数据是否正确，但是对于错误的数据包，UDP 并不提供重发机制，只是丢弃当前的包，而且 UDP 在发送之后也无法知道是否能达到目的地。因此**UDP 不能保证数据可靠性，但是传输速度却非常快**，所以 UDP 会应用在一些关注速度、但不那么严格要求数据完整性的领域，如在线视频、互动游戏等。

**使用 UDP 来传输会存在两个问题：**    
- 数据包在传输过程中容易丢失；
- 大文件会被拆分成很多小的数据包来传输，这些小的数据包会经过不同的路由，并在不同的时间到达接收端，而 UDP 协议并不知道如何组装这些数据包，从而把这些数据包还原成完整的文件。

### TCP：把数据完整地送达应用程序
**TCP（Transmission Control Protocol，传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议。**   

**相对于 UDP，TCP 有下面两个特点:**     
- 对于数据包丢失的情况，TCP 提供重传机制；
- TCP 引入了数据包排序机制，用来保证把乱序的数据包组合成一个完整的文件。  

和 UDP 头一样，TCP 头除了包含了**目标端口和本机端口号**外，还提供了用于**排序的序列号**，以便接收端通过序号来重排数据包。  

![TCP 下的单个数据包的传输流程：](@assets/img/note-web/tcp.png)   

#### 一个完整的 TCP 连接的**生命周期包括了“建立连接”“传输数据”和“断开连接”三个阶段**。   
![一个 TCP 连接的生命周期](@assets/img/note-web/tcp1.png)     

- **建立连接阶段**。这个阶段是通过“三次握手”来建立客户端和服务器之间的连接。TCP 提供面向连接的通信传输。面向连接是指在数据通信开始之前先做好两端之间的准备工作。所谓三次握手，是指在建立一个 TCP 连接时，客户端和服务器总共要发送三个数据包以确认连接的建立。
- **传输数据阶段**。在该阶段，接收端需要对每个数据包进行确认操作，也就是接收端在接收到数据包之后，需要发送确认数据包给发送端。所以当发送端发送了一个数据包之后，在规定时间内没有接收到接收端反馈的确认消息，则判断为数据包丢失，并触发发送端的重发机制。同样，一个大的文件在传输过程中会被拆分成很多小的数据包，这些数据包到达接收端后，接收端会按照 TCP 头中的序号为其排序，从而保证组成完整的数据。   
- **断开连接阶段**。数据传输完毕之后，就要终止连接了，涉及到最后一个阶段“四次挥手”来保证双方都能断开连接。




