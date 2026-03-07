---
title: 修改制作一个可爱的Windows安装镜像（一）
date: 2026-03-07
updated: 2026-03-07
categories: 美化
tags:
  - 美化
  - 二次元
  - Windows
excerpt: "摘要：修改制作一个可爱的Windows安装镜像"

---

## 零、所需材料  
一个windwos10 22H2镜像（理论上其他win镜像同理）  
Dism++  
ultraiso  
ResourceHacker_v5.1.8  （文中简称RH）  
Photoshop  
Everything（非必须，推荐）  

## 开始之前  
强调，所有修改完的dll请妥善另存，出了问题不用全部重来，只需要修改出问题的文件即可，切勿直接删除或直接覆盖以免丢失  
## 一、挂载镜像  
win8以上用户请双击打开iso，win7可以使用ultraiso工具打开iso（一会还要用）  
导航到`\sources`目录下，可以看到`spwizimg.dll，acmigration.dll`等文件就找对位置了  

## 二、RH修改文件  

**注意！只修改认识的字符串，全大写且你没见到过的字符不要修改，以免破坏结构**  

### 1、第一个文件（字符串修改案例）  
首先打开`ResourceHacker_v5.1.8`，将`sources\zh-ch\appraiser.dll.mui`拖进入软件，在左侧点开字符串表，点击32:3052在右侧窗口修改希望修改的字符串  
![ResourceHacker.png](https://free.picui.cn/free/2026/03/07/69ab6c2ec84fc.png)  
然后左上角 文件-->另存为 找一个地方保存备用`ヽ(*。>Д<)o゜  ` 
同理修改同目录`appraiserwc.dll.mui`  

### 2、第二个文件（位图修改案例）  
将`sources\arunimg.dll`拖进入软件  
展开位图，左侧菜单点击会在右侧看到预览图，右键`“205：1033”`（举个例子），点击“保存.bmp资源”另存你想要改动的按钮  
推荐使用Photoshop对其进行修改（注意，此图片修改有困难，与普通png图片的修改不一致，请尽量编辑rgb和alpha通道而不是直接绘制），修改之后另存，弹窗BMP选项默认即可  
在RH里右键`“205：1033”`点击 “替换位图”-->“打开新位图文件” ，选择你修改好的位图文件，右侧能看到预览，确认无误右侧点击替换，此时预览窗口应该能看到效果  
![editsource.png](https://free.picui.cn/free/2026/03/07/69ab6fc5584ba.png)  
### 3、其他文件（所有要改的文件）  
```
sources\arunimg.dll  
sources\arunres.dll   //正常修改字符串表，对话框栏目有几个字符串也可以改  
sources\arunres.dll.mui  
sources\zh-ch\appraiser.dll.mui  
sources\zh-ch\appraiserec.dll.mui  
sources\zh-ch\setup.exe.mui   //为了节省体力，setup开头的酌情修改  
sources\zh-ch\setuperror.exe.mui  //可选  
sources\zh-ch\setupprep.exe.mui  //可选  
sources\spwizimg.dll  //重点！重点！重点！这里的位图是窗口样式，窗口背景，按钮，务必修改，网上很多教程落下这一个dll导致效果大打折扣
sources\w32uires.dll.mui  //也很重点，对话框和字符串比较多，主要是安装程序文字内容  
\sources\zh-CN\*.rtf
```  
将修改之后备用的文件替换回去，ultraiso可以写入iso镜像

## 三、修改普通图片文件  

在iso全局搜索`background_cil.bmp`，`setup.bmp` 替换为你喜欢的图  
很多教程到这里就截止了，殊不知在`boot.wim`里还有  

### 1、挂载wim  
把`sources\boot.wim`复制到任意位置（此步骤不可忽略，不要直接使用挂载的iso，否则你的修改无法写入）
打开`Dism++`，左上角`文件-->挂载映像`导航到你另存的`boot.wim`,目标映像选择`2.Microsoft Windows Setup （x64）(可启动)`，挂载路径任意  
![dism.png](https://free.picui.cn/free/2026/03/07/69ab7ae387dc6.png)  
进入你的目标目录
```
里面应该长这样
2022/09/08  12:25    <DIR>          .
2022/09/08  12:25    <DIR>          ..
2019/12/07  14:54    <DIR>          Program Files
2019/12/07  14:54    <DIR>          Program Files (x86)
2022/09/08  12:23            74,208 setup.exe
2022/09/08  12:25    <DIR>          sources
2019/12/07  14:54    <DIR>          Users
2022/09/08  12:25    <DIR>          Windows
```  
### 2、替换文件

进入 `挂载路径\sources`，眼熟吗？没错和大标题一的修改内容很类似（甚至文件有重复的）  
使用步骤一的文件覆盖同名文件，ARUNIMG.dll大写了但是内容没变，直接覆盖  
此外，这里单独替换`background.bmp``setup.bmp`两个图片（每种图片各两个一共四张，请在挂载路径全局搜索搜索并确保完全替换）  

## 四、修改oobe的文字  
同理挂载iso的`install.wim`  
进入`挂载目录\Windows\System32\oobe\zh_ch`  
```
msoobedui.dll.mui  
msoobeFirstLogonAnim.dll.mui   //windows安装的古诗词都在这里，别来无恙也在，很有意思的文件  
oobecoreadapters.dll.mui  //不多说，打开就知道是什么,复选框那个页面  
UserOOBE.dll.mui  
W32UIRes.dll.mui  
*.rtf
*.htm
```   
修改并替换  

## 五、重打包  
Dism++左上角文件，保存映像，直接保存，得到修改的install.wim和boot.wim,使用ultraiso替换回去  
把第一步的dll也替换进去（如果你忘记替换而是只另存了你的修改内容）  
尝试启动你的iso，如果一切顺利你即将看到修改好的  
可以在dism++卸载映像，清理战场  

## 六、预告  
下一篇介绍如何修改安装好之后的系统，包括壁纸，预装软件等等  

## Q&A  

Q 有什么用？纯浪费时间  
A 说得对，我纯浪费时间，不过乐在其中就好不是吗？  
Q 看不明白  
A 正常，人之常情，可以问问ai，实在不行给我发邮件，解决问题的方法很多  
Q 无法启动/出错了  
A 可能是你错误的修改导致文件损坏，请仔细核对  
Q 懒人，有成品吗？
A 翻翻我的github，我有时间会把部分修改的东西传上去  
Q 有的地方没改到
A 抱歉这是我去年的发现，中途需要修改的文件清单丢失了，我只能凭印象，我认为记的比较全，没改到的地方可以跟我反馈  
Q 想要视频教程 
A 喵呜~  

## 效果图
闲鱼水印是因为我懒得重新截图了，用的以前的图  
![d47c17fedd6470776e07c2f78ad603cc.jpg](https://free.picui.cn/free/2026/03/07/69ab8695e9a28.jpg)  
![bd41ddaa8c928ca12340fc7c3346bbe3.jpg](https://free.picui.cn/free/2026/03/07/69ab869617f9c.jpg)  
![c40dfae3cbf2983dd70f5f09b19d1b21.jpg](https://free.picui.cn/free/2026/03/07/69ab86960bb7e.jpg)  
![08c0258d326fbffed9a0e571be4aa983.jpg](https://free.picui.cn/free/2026/03/07/69ab8695f0c46.jpg)  