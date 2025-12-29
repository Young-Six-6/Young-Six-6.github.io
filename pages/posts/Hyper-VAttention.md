---
title: Hyper-v尝试连接到服务器xxx错误，请检查虚拟机管理服务是否正在进行......
date: 2025-12-28
updated: 2025-12-29
categories: Hyper-v
tags:
  - Hyper-V
excerpt: "折腾远程Hyper-V的时候遇到报错，水一篇文章"
readingTime: 5

---
## 一、解决方案

<div align="center">
  <img src="https://img.cdn1.vip/i/6951db56e0593_1766972246.webp" 
       alt="解决方案" 
       title="解决方案" 
       width="80%"/>
  <br>
  <small>附一张图</small>
</div>

请先确保与服务器网络连接正常（ping下看看）
填入“另一台计算机”的应该是计算机名，不是ip，域名，即使能ping通

### 经历：
由于我在hosts文件将服务器ip绑定了“SERVER”字段，导致错误将其填入“另一台计算机”,这里实际上要填计算机名，即右键“此电脑”显示的

---

Ps.有点水，随便发点什么吧