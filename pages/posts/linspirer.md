---
title: 领创6.10分析
date: 2026-04-17
updated: 2026-04-27
categories: 逆向
tags:
  - 逆向
excerpt: "逆向"

---

## 零、所需材料  
一个领创6.10的apk    
jadx-gui  
gemini(建议)  
mumu模拟器  


## 背景  
领创管理员密码变成了条形码，除了社工，有技术手段生成吗  

## 结论  
不能  

## 一、失败的尝试  
frida被强对抗，而且hook一圈无果  

## 二、jadx静态分析    

### 1、第一个文件  
以"校验失败"为关键字，搜索资源，知道

```
<stringname="check_fail">校验失败</string>
```  
搜索check_fail  

```
public static final int check_fail = 0x7f0c003d;
```  

### 2、第二步  

模拟器打开扫描条形码页，定位当前活动：  
```
com.android.launcher3.activity.AdminLoginActivity@a01dad7
```  
那就搜索类名AdminLoginActivity，在smali搜索0x7f0c003d，搜到了，那就让gemini总结吧，省省眼睛：  


“这段代码描述了 com.android.launcher3 应用中的 AdminLoginActivity 类。这是一个管理员登录界面，主要功能包括通过扫描二维码（QR Code）进行身份验证、检查应用更新、同步时间以及处理 APK 安装 。 以下是对该类的详细分析和伪代码总结：1. 核心功能模块界面初始化 （d， b， c）：绑定布局中的按钮（扫描、同步时间、检查更新）和文本框 。 设置状态栏和导航栏颜色 。 在文本框中显示当前应用的内部版本号 。 二维码扫描与身份验证 （e， onActivityResult）：检查并申请相机权限 。 启动自定义扫描界面 （CustomCaptureActivity） 。 验证逻辑：扫描结果通过 DSA 数字签名 算法进行校验 。 从 assets 目录读取名为 dsa_public_key_pkcs8.pem 的公钥文件 。 验证内容由“设备唯一标识 + 当前日期小时（yyyyMMddHH）”组成 。 如果验证通过，则跳转至 AdminActivity 。 应用更新与安装 （onClick， f）：点击更新文本时，会向服务器发送 CheckUpdateParams 请求，检查 com.android.launcher3 的新版本 。 安装功能 （f） 适配了 Android 不同版本的安装策略（如 Android 8.0+ 的未知来源权限申请，以及 Android 7.0+ 的 FileProvider） 。 ”
公钥：  

```
“-----BEGIN PUBLIC KEY-----
MIIBtzCCASsGByqGSM44BAEwggEeAoGBALbGJLPXOlBgEkb/XTm8WylCEJdlv6/3
o2HX7IsWvb7qb4eY+0VzMiyVZteF8Euy76sSaJtDm9sFSuz8uyV0jE1vx9dfJFRy
ba/hUtGHHHBSpe7QKE4mYfroWnEZQaxNh0L4pjvtfV8/O/wAOFTxbkIA8k2LPyx7
rbk+Xc9Q3qLxAhUAwgqHm++3x5PZwGz3o26I4vC7Y38CgYA92OGR3ngxP6AifJaT
WmKVu36x5mwV9XpEvmoWAE1+UEIckFlaPRyjGKMZyYkyrFXNllstJ8Wi2jM2cxe+
Jen+v7McfoDSaYeYhjXt5KLLbGKNiQTKgA9V7EMUNGqDWSd89E6AMoixJvm4AvjN
3vVLaxYqZgVpM197B+0EShMfXgOBhQACgYEArsUWspWuvFU8Gr0rwh96ALWkKMCt
BtODpSNjqbEXV9/mETqlVN44uAw+B3Y6ockiN/we9wkx4QOl2nsCk5GoCjtZTP/Q
sB1OCp577hMLy1U7QxqgbxKOWjcAY2A2EkZ2xz3Josl+8hBZ2u6md3Z2SJMyFfhS
/6eKb24frUcE5MM=
-----END PUBLIC KEY-----”
```  
死心了，除非重打包  

## 后记  
就当练习了，后期可以试试看SSL降级（毕竟没法安装根证书抓包），awa  
感谢Linspirer Hunter项目，感谢前辈们的努力  