---
title: 对于无限宝抓包分析
password: 511511
date: 2025-12-30
updated: 2026-02-23
categories: 逆向
tags:
  - 逆向
excerpt: "逆向"

---

## 零、目前进度
mp4转wrf可行，服务端大体出来了，逆向和hook较为成熟，脚本一堆......  
项目停滞到这里正好，即使是烂尾也满意了  
希望后来者能继续研究，嘿嘿  

## 一、前提条件

下面默认你有一个配置完系统CA证书抓包的安卓设备<br>
version.16.0.20251218<br>
Reqable<br>
算法助手可选  
Frida最好有  
任意dex逆向工具  
360去加固工具  
手，脑袋  

## 二、从登录开始的抓包
### 1、包的分析

以我为例<br>
```plain
https://static.kehou.com/zj/sysfile/imeeting/update20251215/android.ini
https://yk.msyk.cn/courseList.action?uid=xxxxxxx&pwd2=07af1bb020664ad8da0998d434dbd1b2&pwd3=fdb7314e9cde54ce9a2b3a64677af2e4ec996044f4fa35e26a200d7bbf9421c7&salt=1767016476&callfrom=vpAndroid&mac=&wxbm=0&needReplayInfo=LoginAndCourseList
```
|  内容   | 值  | 含义  |
|  ----  | ----  | ----  |
| uid  | xxxxxxx | UserName |
| pwd2  | 07af1bb020664ad8da0998d434dbd1b2 | 加密密码 |
| pwd3  | fdb7xxxxx7 | 加密密码 |
| salt  | 1767016476 | 盐，秒时间戳 |
| callfrom  | vpAndroid | 客户端类型 |
| mac  |  | 空 |
| wxbm  | 0 |  |
| needReplayInfo  | LoginAndCourseList | 获取类型，登录和课程列表 |

```plain
[result]
result=1
[update]
updatedirurl=https://static.kehou.com/zj/sysfile/imeeting/update20251215 //更新链接
exeurl=https://static.kehou.com/zj/sysfile/imeeting/VPSetup160_20251215.exe
vpver=
[userinfo1]
webuserid=45219878
username=xxxxxxx
name=xxx
role=学生
headimgurl=
projectname=
[list]
mtid=1
nsmtid=2,3,4
mtname1=课程
mtname2=课程
mtname3=课程
mtname4=课程
[mt1]
MeetId=55942936
timesId=1
Meeting-Subject=课程
MeetCurrTime=2025-12-29 21:54:37
Meeting-Duration=18:40:00-22:00:00
EastimateTime=200
MeetStartTime=2025-12-29 18:40:00
Meeting-Chairman=班级号
Meeting-Project=第一中学
Meeting-BeforeTime=30 //允许提前进入
userId=45219878
NickName=王xx
Course-Total-time=576
WinAppTitle=课程
ProjectName=ABCD
NeedSSR=0
ServerIP=hzwxlogin.wanpeng.net;115.227.33.2;101.71.55.2;111.2.180.191;hzwxlogin2.wanpeng.net
Port=7000
AutoRecordPrompt=0
Meeting-AddTime=10
ClientType=1
ProxyAllocType=0
MultiMeeting=0
MiniClassMode=0
listenType=0
MeetingQuitURL=
PresidentKey2=null
VerifyKey=5ebdbd00a60a30e82ba14263fc813ace
signupCount=null
VideoVerifyInterval=0
SnapUploadURL=null
RestVodURL=null
QRCodeBaseURL=null
UserRosterURL=https://yk.msyk.cn/wxb/api/getAllStudent?unitId=817BB3264F0140B48EEAxxxxx1A4C809&
StuSchool=中学
StuClass=高一09班
StuClass2=09班
StuPhone=
InfoURL=https://yk.msyk.cn/api/wxb/delayCourse?uid=xxxxxxxx&
CameraRemind=0
CameraSnap=0
NDConf=
ShowUserCount=0
ClassAutoLock=0
IPVCamera=1
VideoQualityLevel=1
NetDiskUploadURL=
NetDiskNotifyURL=
NetDiskUserName=
NetDiskUserPasswd=
DocURL=https://yk.msyk.cn/api/wxb/getAccessory?courseUuid=402881bd96f186330198c9fc4fcd1062&unitId=817BB3264F0140BXXXXXXEA1A1A4C809&
MultiVideoChannels=0
STick=1767016477
SKey=12cef1e18b6c794846xxx98a5a6915cdc
[mt2]
MeetId=55942937
timesId=2
Meeting-Subject=xxx班课程
MeetCurrTime=2025-12-29 21:54:38
Meeting-Duration=07:00:00-12:00:00
EastimateTime=300
MeetStartTime=2025-12-30 07:00:00.000
Meeting-Chairman=高xx级0x班级号
Meeting-Project=第一中学
Meeting-BeforeTime=30
userId=45219878
NickName=XXX
Course-Big-PictureUrl=
Course-Total-time=576
[mt3]
MeetId=55942938
timesId=3
Meeting-Subject=xxx班课程
MeetCurrTime=2025-12-29 21:54:38
Meeting-Duration=13:00:00-18:00:00
EastimateTime=300
MeetStartTime=2025-12-30 13:00:00.000
Meeting-Chairman=高xx级0x班级号
Meeting-Project=第一中学
Meeting-BeforeTime=30
userId=45219878
NickName=XXX
Course-Big-PictureUrl=
Course-Total-time=576
[mt4]
MeetId=55942939
timesId=4
Meeting-Subject=xxx班课程
MeetCurrTime=2025-12-29 21:54:38
Meeting-Duration=18:40:00-22:00:00
EastimateTime=200
MeetStartTime=2025-12-30 18:40:00.000
Meeting-Chairman=高xx级0x班级号
Meeting-Project=第一中学
Meeting-BeforeTime=30
userId=45219878
NickName=XXX
Course-Big-PictureUrl=
Course-Total-time=576
[MiscInfo]
NeedReplayInfo=LoginAndCourseList
[resultend]
resultend=1

```

脱敏的响应，学过英语就懂<br>
此外，还会有一个update(随第一个包决定)<br>
```plain
https://static.kehou.com/zj/sysfile/imeeting/update20251215/android.ini
//我这里就是这个
[versioninfo]
;最新的版本号
NewVersionCode=1600251218
;最新的版本名称
NewVersionName=16.0.20251218
;所支持的最低版本号
SupportVersionCode=1600251218

[apkinfo]
;APK下载地址
APKFileName=vizpower_20251218_1.apk

[wxbbox]
VPAgentVer=1600251218
VPAgentZip=vpagent_20251218_1.zip

```
至此，登陆的包分析完了
### 2、密码的研究

受[github的WXBThirdLogin](https://github.com/yuhuison/WXBThirdLogin)项目启发，正确得到pwd2的生成逻辑

```python
import hashlib

# -------------------------- 你的核心参数（无需修改，直接代入） --------------------------
# 用户名（从你的uid=hhyz202575047提取，必填！）
username = "xxxxxxxxxxxx"
# 明文密码
password = "xxxxxxxxxx"
# Salt（时间戳）
salt = "xxxxxxxxxx"
# 硬编码固定字符
fixed_str = "WINUPON"
# 目标pwd2（你需要匹配的32位MD5）
target_pwd2 = "xxxxxxxxxxxxxxxxxx"
# 可选：若你有目标pwd，可填入此处
target_pwd = ""

# -------------------------- 还原 C# string2MD5 方法（两个分支完整还原） --------------------------
def string2MD5(input_str, is_checkbox1_checked=True):
    """
    完全还原Login.cs中的string2MD5方法
    :param input_str: 待加密字符串
    :param is_checkbox1_checked: checkBox1是否勾选（True=系统标准MD5；False=自定义MD5）
    :return: 大写MD5哈希字符串（与C#返回值格式一致）
    """
    if is_checkbox1_checked:
        # 分支1：checkBox1勾选 → .NET系统标准MD5（完整还原BitConverter.ToString逻辑）
        # 步骤1：UTF-8编码（与C# Encoding.UTF8.GetBytes一致）
        utf8_bytes = input_str.encode("utf-8")
        # 步骤2：计算MD5哈希
        md5_obj = hashlib.md5()
        md5_obj.update(utf8_bytes)
        md5_bytes = md5_obj.digest()
        # 步骤3：还原C# BitConverter.ToString(byte[]) → 格式如 "A1-B2-C3-...-F0"
        # 每个字节转两位大写十六进制，用"-"连接
        bit_convert_list = [f"{byte_val:02X}" for byte_val in md5_bytes]
        bit_convert_str = "-".join(bit_convert_list)
        # 步骤4：去掉横杠，返回大写字符串
        return bit_convert_str.replace("-", "")
    else:
        # 分支2：checkBox1不勾选 → 自定义MD5（对应仓库md5.cs的MDString方法）
        # 此处先预留接口，若需精准匹配，需将md5.cs的MDString逻辑转换为Python
        # 临时提示：请从md5.cs中提取MDString方法的代码补充在此处
        print("【提示】当前使用自定义MD5分支，需补充md5.cs的MDString逻辑后可精准匹配")
        # 临时占位（可替换为md5.cs的真实逻辑）
        temp_md5 = hashlib.md5(input_str.encode("utf-8")).hexdigest()
        return temp_md5.upper()

# -------------------------- 还原 pwd + pwd2 生成逻辑（精准无遗漏） --------------------------
def generate_pwd_pwd2(username, pwd, salt, fixed):
    """
    还原Login.cs中pwd和pwd2的完整生成流程
    :return: (pwd_lower, pwd2_lower) 最终传输的小写pwd和pwd2
    """
    # 1. 先计算明文密码的MD5，并转小写（pwd2拼接的核心依赖）
    pwd_md5_upper = string2MD5(pwd)
    pwd_md5_lower = pwd_md5_upper.lower()

    # 2. 生成pwd（用户名+明文密码+salt+固定字符）
    pwd_concat_str = f"{username}{pwd}{salt}{fixed}"
    pwd_md5_upper = string2MD5(pwd_concat_str)
    pwd_lower = pwd_md5_upper.lower()

    # 3. 生成pwd2（用户名+密码MD5小写+salt+固定字符，核心嵌套逻辑）
    pwd2_concat_str = f"{username}{pwd_md5_lower}{salt}{fixed}"
    pwd2_md5_upper = string2MD5(pwd2_concat_str)
    pwd2_lower = pwd2_md5_upper.lower()

    return pwd_lower, pwd2_lower

# -------------------------- 执行双重验证（两个MD5分支都验证） --------------------------
def full_verification():
    print("=" * 80)
    print("=== 验证1：checkBox1 勾选（系统标准MD5，优先验证）===")
    pwd_result, pwd2_result = generate_pwd_pwd2(username, password, salt, fixed_str)
    print(f"用户名：{username}")
    print(f"明文密码：{password}")
    print(f"Salt：{salt}")
    print(f"固定字符：{fixed_str}")
    print(f"生成的pwd（小写）：{pwd_result}")
    print(f"生成的pwd2（小写）：{pwd2_result}")
    print(f"pwd2 与目标是否匹配：{' 匹配成功' if pwd2_result == target_pwd2 else '不匹配'}")
    if target_pwd:
        print(f"pwd 与目标是否匹配：{' 匹配成功' if pwd_result == target_pwd else '不匹配'}")

    print("\n" + "=" * 80)
    print("=== 验证2：checkBox1 不勾选（自定义MD5，需补充md5.cs逻辑）===")
    # 先替换string2MD5的分支
    global string2MD5
    def custom_string2MD5(input_str):
        return string2MD5(input_str, is_checkbox1_checked=False)
    # 重新生成pwd和pwd2
    pwd_md5_upper_custom = custom_string2MD5(password)
    pwd_md5_lower_custom = pwd_md5_upper_custom.lower()
    # 生成pwd
    pwd_concat_custom = f"{username}{password}{salt}{fixed_str}"
    pwd_upper_custom = custom_string2MD5(pwd_concat_custom)
    pwd_lower_custom = pwd_upper_custom.lower()
    # 生成pwd2
    pwd2_concat_custom = f"{username}{pwd_md5_lower_custom}{salt}{fixed_str}"
    pwd2_upper_custom = custom_string2MD5(pwd2_concat_custom)
    pwd2_lower_custom = pwd2_upper_custom.lower()
    # 输出结果
    print(f"生成的pwd（小写）：{pwd_lower_custom}")
    print(f"生成的pwd2（小写）：{pwd2_lower_custom}")
    print(f"pwd2 与目标是否匹配：{' 匹配成功' if pwd2_lower_custom == target_pwd2 else '不匹配（需补充md5.cs逻辑）'}")
    if target_pwd:
        print(f"pwd 与目标是否匹配：{' 匹配成功' if pwd_lower_custom == target_pwd else '不匹配（需补充md5.cs逻辑）'}")
    print("=" * 80)

# -------------------------- 运行验证 --------------------------
if __name__ == "__main__":
    full_verification()
```

新增：逆向得到了pwd3的逻辑  
原本以为pwd3不重要，没想到后期发现pwd3是必不可少的，很多场景登陆什么的是不需要pwd3，只验证pwd2，但是很多场景不行  
```python
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
import binascii

# ===================== 配置区 =====================
# 待加密的明文内容
# 这个没看明白就回去重读一遍，是“salt_username”
PLAIN_TEXT = "1771046800_hhyz1234"
# 加密密码
KEY = "ZDSoft_Winupon01"
# 偏移量（十六进制字符串）
IV_HEX = "00000000000000000000000000000000"
# 字符集
ENCODING = "utf-8"
# ==================================================

def sm4_encrypt_cbc(plain_text, key, iv_hex, encoding="utf-8"):
    # 将密码和偏移量转换为字节
    key_bytes = key.encode(encoding)
    iv_bytes = binascii.unhexlify(iv_hex)
    
    # 初始化SM4-CBC加密器
    cipher = Cipher(
        algorithms.SM4(key_bytes),
        modes.CBC(iv_bytes),
        backend=default_backend()
    )
    encryptor = cipher.encryptor()
    
    # 对明文进行PKCS5填充
    padder = padding.PKCS7(128).padder()
    padded_plaintext = padder.update(plain_text.encode(encoding)) + padder.finalize()
    
    # 执行加密
    ciphertext_bytes = encryptor.update(padded_plaintext) + encryptor.finalize()
    
    # 返回十六进制字符串
    return binascii.hexlify(ciphertext_bytes).decode(encoding)

if __name__ == "__main__":
    encrypted_hex = sm4_encrypt_cbc(PLAIN_TEXT, KEY, IV_HEX, ENCODING)
    print("SM4加密结果（Hex）:", encrypted_hex)
```  

## 三、获取链接的变种

如果你认真读了上面，你会发现needReplayInfo的LoginAndCourseList，这个其实有多情况

| NeedReplayInfo       | 含义         | 返回内容差异                       |
| -------------------- | ---------- | ---------------------------- |
| `LoginAndCourseList` | 登录 + 课程列表  | **mt + 回放信息（或预留字段）**         |
| `MeetingListOnly`    | 只要正在/将要上的课 | **只有 mt***                   |
| `ReplayCourseList`   | 只要回放       | **没有 mt***，是 replay / vod 列表 |
| `ReplayFileList`   | 回放点进去列表       | 是ReplayFilexx Tittle Filetype Url等等 |

根据表格我们知道，登录只是其中一种，其他状态的响应大同小异（更新：差异不小），但也附在下面
```plain
//如果你没看到，说明我忘记补了（不补了，自己抓）
```
## 四、获取回放

```plain
https://msyklive.wpstatic.cn/msyklive/817BB3264F0140B48EEA2EA1A1A4C809/2022/8/18/402881bd7bb46a4f017c1fb0abbb1445/%E5%85%A8%E6%A0%A1%E5%85%AC%E7%9B%8A%E8%AF%BE%E5%A0%82_55481831_23_20220818_175219_1643034394.wrf
https://msyklive.wpstatic.cn/msyklive/817BB3264F0140B48EEA2EA1A1A4C809/2022/8/18/402881bd7bb46a4f017c1fb0abbb1445/%E5%85%A8%E6%A0%A1%E5%85%AC%E7%9B%8A%E8%AF%BE%E5%A0%82_55481831_23_20220818_175219_1643034394.wrf
https://msyklive.wpstatic.cn/msyklive/817BB3264F0140B48EEA2EA1A1A4C809/2022/8/18/402881bd7bb46a4f017c1fb0abbb1445/%E5%85%A8%E6%A0%A1%E5%85%AC%E7%9B%8A%E8%AF%BE%E5%A0%82_55481831_23_20220818_175219_1643034394.wrf
https://msyklive.wpstatic.cn/msyklive/817BB3264F0140B48EEA2EA1A1A4C809/2022/8/18/402881bd7bb46a4f017c1fb0abbb1445/%E5%85%A8%E6%A0%A1%E5%85%AC%E7%9B%8A%E8%AF%BE%E5%A0%82_55481831_23_20220818_175219_1643034394.wrf
https://msyklive.wpstatic.cn/msyklive/817BB3264F0140B48EEA2EA1A1A4C809/2022/8/18/402881bd7bb46a4f017c1fb0abbb1445/%E5%85%A8%E6%A0%A1%E5%85%AC%E7%9B%8A%E8%AF%BE%E5%A0%82_55481831_23_20220818_175219_1643034394.wrf
https://msyklive.wpstatic.cn/msyklive/817BB3264F0140B48EEA2EA1A1A4C809/2022/8/18/402881bd7bb46a4f017c1fb0abbb1445/%E5%85%A8%E6%A0%A1%E5%85%AC%E7%9B%8A%E8%AF%BE%E5%A0%82_55481831_23_20220818_175219_1643034394.wrf
//我故意没删去重复的
//实际上是.wrf文件,笔者尝试WebexPlayer播放但失败了,pc客户端自带的播放器测完写这里(是/否):是
```
看着头大实际上一点也不简单（其实乱乱的是url字符串，解码下就直观了（我偏不））<br>
正在努力分析文件格式，争取，争取  
更新：干了一个月，不完全解密了，有DES的事，我也是云里雾里，想写的有逻辑不容易，就瞎写了，希望有启发（看不明白就自己走一遍）  
```
请求列表返回的响应明明是313E383A47870CBD2C49E3651E9E7AAF2D9D2。。。。，hook到的解密其实是在DES另一个字符串，使用脚本1解密得到了一个看似答案的字符串“ 乱码字符.wpstatic.cn/msyklive/817BB3264F0140B48EEA2EA1A1A4C809/2022/10/7/402881bd7bb46a4f017c1fb0abbb1445%E5%85%A8%E6%A0%A1%E5%85%AC%E7%9B%8A%E8%AF%BE%E5%A0%82_55523220_36_20221007_092835_1643034394.wrf”，程序黑箱操作，在拼接解密后就变成了“https://msyklive+.wpstatic......”,后面使用脚本2可以生成出来一份一样结构的url=，原样返回也能被客户端识别（hookDSE解密发现揭秘之后变了），但是前缀仍然msyklive就很麻烦，不过自己有域名就把顶级域名和二级域名自己解析成msyklive也是个办法，最后就访问https://msyklive+你的域名，（不爽，不可读字符还是没明白）（前缀也没明白）  
很乱对吧？我也感觉，我实在写不动了，见谅

```  

```
#脚本1
# -*- coding: utf-8 -*-
# pip install pycryptodome

import re
import binascii
from Crypto.Cipher import DES

KEY = b"VIZPOWER"

HEX_URL = "313E383A47870CBD2C49E3651E9E7AAF2D9D27238E2353DB7BE4F680D9EB1D857256ADDF42C6D4EF4E166384BE48BD8A440BA0211BC63DC1990004539A78891D93F2401FEB0ACDA6519281B419747C4A199F2717F67034EDCC3CC96A1F71910AB10F15EBEDE4960AF021EEB490E9E32E760DC655BCCEBBE85EEBEDB8C90AEF82AB54C99885C7DD155ABEBE0B8981C605F86E3AAE84CF4B51A6FCB3899F047373BE9261357E0D271D30DD6D39E2BFBB30E5477739E2024A45AE954A934646BA6C12843BD3EAF1921D0579E1E4D0D9FE75772E8B5E9782E40C968D22E7BE949BFE3003917B86235826"  # 省略：放你那串完整 hex

def des_ecb_decrypt(hex_cipher: str) -> bytes:
    cipher = binascii.unhexlify(hex_cipher)
    des = DES.new(KEY, DES.MODE_ECB)
    return des.decrypt(cipher)

def extract_and_fix_url(plain: bytes) -> str:
    """
    明文里可能混有二进制前缀，所以不要用 startswith 判断，
    改为“搜索 wpstatic.cn/msyklive/”并补齐 scheme/host。
    若所有匹配规则都不命中，直接返回解密后的明文内容（去空字符/空格）
    """
    b = plain.rstrip(b"\x00").rstrip(b" ")

#    # 1) 优先匹配完整 host
#    m = re.search(rb"(https?://)?(msyklive\.wpstatic\.cn/msyklive/[^\s\x00]+)", b, flags=re.I)
#    if m:
#        tail = m.group(2).decode("utf-8", errors="ignore").strip()
#        return ("https://" + tail) if not (m.group(1) and m.group(1).lower().startswith(b"http")) else (m#.group(1).decode() + tail)
#
#    # 2) 退而求其次：出现 ".wpstatic.cn/..."，补上 "msyklive"
#    m = re.search(rb"(https?://)?(\.wpstatic\.cn/msyklive/[^\s\x00]+)", b, flags=re.I)
#    if m:
#        tail = m.group(2).decode("utf-8", errors="ignore").strip()
#        # 这里补关键主机名
#        return "https://msyklive" + tail

    # 3) 再退：只有 /msyklive/ 路径，补 host
#    m = re.search(rb"(msyklive/[^\s\x00]+)", b, flags=re.I)
#    if m:
#        tail = m.group(1).decode("utf-8", errors="ignore").strip()
#        return "https://msyklive.wpstatic.cn/" + tail

    # 关键修改：所有匹配都不命中时，返回解密后的明文内容（转字符串）
    return b.decode("utf-8", errors="ignore").strip()

if __name__ == "__main__":
    plain = des_ecb_decrypt(HEX_URL)
    url = extract_and_fix_url(plain)
    print(url)
```  
```
#脚本2
# -*- coding: utf-8 -*-
"""
生成官方格式 ReplayFile.URL token

结构：
    32字节前缀
    + ".wpstatic.cn/msyklive/....wrf"

DES-ECB
key = VIZPOWER
zero padding
"""

import binascii
from Crypto.Cipher import DES

KEY = b"VIZPOWER"

# 固定的 32 字节前缀（用你样本中的 prefix #1）
PREFIX_HEX = "C2FCAA8165B4821FC46BE8306CEFCAE5A2DDE872D33BFEB7201908ECF401A2D9"
PREFIX = binascii.unhexlify(PREFIX_HEX)

def zero_pad(data: bytes, block=8):
    r = len(data) % block
    if r == 0:
        return data
    return data + b"\x00" * (block - r)

def build_plain(path_tail: str) -> bytes:
    """
    path_tail 例如：
        /msyklive/817B.../2022/10/7/xxx.wrf
    """
    tail = (".wpstatic.cn" + path_tail).encode("ascii")
    return PREFIX + tail

def encrypt_token(plain: bytes) -> str:
    cipher = DES.new(KEY, DES.MODE_ECB)
    enc = cipher.encrypt(zero_pad(plain))
    return binascii.hexlify(enc).upper().decode("ascii")

if __name__ == "__main__":
    path = "/msyklive/817BB3264F0140B48EEA2EA1A1A4C809/2022/10/7/402881bd7bb46a4f017c1fb0abbb1445/%E5%85%A8%E6%A0%A1%E5%85%AC%E7%9B%8A%E8%AF%BE%E5%A0%82_55523220_36_20221007_092835_1643034394.wrf"

    plain = build_plain(path)
    token = encrypt_token(plain)

    print("明文长度:", len(plain))
    print("生成的 URL token:\n")
    print(token)

```
这块建议后来者（如果你要研究重走路线的话），别死磕反编译dex，直接frida hook加解密，一下子就出来（算法助手更简单） 

文件结构也清晰了（让gpt总结了下我的碎碎念）  
```
一、目标

目标：
把一个普通 MP4(H.264) 视频，转换为可被某 WRF 播放器正常播放、可拖动、时间正确、画面正常的 `.wrf` 文件。

二、逆向

1：确认视频真实存在


[time][event][len][payload]

属于“record element”流式结构

2：确认视频事件类型

从反编译中确认：

case WrfRecordFileHeader.REC_VIDEO_IFRAME3 /* 229 */
case WrfRecordFileHeader.REC_VIDEO /* 241 */

说明：

* 229 = I 帧（带 frameInfoEx3）
* 241 = 普通视频帧
* 255 = key tick（关键帧计数用）

这一步确认：

WRF 是逐帧封装的，而不是整段封装。

3：识别 payload 结构
通过 payload 扫描 + 多样本对比发现：
视频 payload 结构：

int width
int height
int userId
int localTime
int extFlags
AnnexB H264 Access Unit

也就是所谓的：
frameInfoEx3 + AU

extFlags:

* 1 = FROMDS
* 2 = FLIP
* 4 = H265

画面倒置就是 extFlags=2 导致。

4：识别 FrameIndex 结构

layout: timePos,filePos,chatPos,desc[32]
每条 44 bytes
结构：
u32 timePos
u32 filePos
u32 chatPos
char desc[32]

关键点：
* timePos 用于 seek
* filePos 用于跳转

5：为什么 1192h？
发现：
e8 91 12 00 = 1217000

它存在于 header 中。播放器会把这个字段参与时间轴计算。
手动改成：
0a 00 00 00
时间立刻变 5 分钟。
解决方式：
在生成 WRF 时：

清零 template 中所有等于 1217000 的 u32

6：拖动黑屏？

症状：
* 自动播放正常
* 拖动后黑屏

分析：

播放器 seek 逻辑：

1. 根据目标时间查 FrameIndex
2. 跳到 filePos
3. 期望落在 I 帧或关键 tick 上

而最初：

* 没插 event=255
* FrameIndex filePos 指向非关键帧
* 或 timePos 用相对时间

结果：

seek 落在 P 帧 → 解码器没参考帧 → 黑屏

解决方案：

1. 在每个 IDR 前插入 event=255
2. FrameIndex filePos 指向 keytick 或 I 帧
3. timePos 使用“绝对时间”（start_base + t_rel）

7：时间错位问题

现象：
点 8s → 跳到 1:50

原因：

FrameIndex timePos 用的是相对时间 0~300000

而播放器内部用的是：

absoluteTime = start_base + seekTarget

于是 seek 错位。

修复：

FrameIndex.timePos = t_abs

WRF 文件结构总结

完整结构如下：

+----------------------------+
| FileHeader (60 bytes)      |
+----------------------------+
| MediaPosInfo block         |
+----------------------------+
| msg block                  |
|   [element1]               |
|   [element2]               |
|   ...                      |
+----------------------------+
| frame_index block          |
+----------------------------+
| describ block              |
+----------------------------+

1.Header

关键字段：

| 偏移   | 内容                |
| ---- | ----------------- |
| 0x00 | "FRW\0"           |
| 0x10 | start time        |
| 0x14 | end time          |
| 0x18 | interval (≈ 40ms) |

2.Element 结构

u32 time
u8  event
u32 payload_len
payload

3.Video payload 结构

int width
int height
int userId
int localTime
int extFlags
AnnexB AU

4.FrameIndex

每条 44 bytes：

u32 timePos (绝对时间)
u32 filePos
u32 chatPos
char desc[32]---


播放器内部逻辑模型（推断）

播放流程大致为：

while reading element:
    if event==255:
        keyFrameCounter++
    if event==229/241:
        decode(payload)

seek 流程：

targetAbsTime = start + sliderTime
search frameIndex by timePos
jump to filePos
resume decode

最终生成策略

1. 使用 ffmpeg 输出 AnnexB + AUD
2. 按 AUD 切分 AU
3. 每 AU 生成 element
4. IDR 前插入 event=255
5. FrameIndex timePos 使用绝对时间
6. filePos 指向关键 tick 或 I 帧
7. 清零 deleted_tail_times
8. 正确更新：

   * msg_len
   * frame_index_pos
   * frame_index_len
   * describ_pos


逆向的过程

* 反编译
* 二进制对比
* payload dump
* 结构枚举
* ffprobe 分析
* 逐字段试错
逐步逼近正确结构。



当前掌握的完整 WRF 视频知识

现在已经掌握：
* 文件结构
* 事件体系
* 视频封装格式
* 索引结构
* seek 机制
* 关键帧处理
* 时间轴构建
* 头部污染修复

基本等价于拥有了 WRF 视频子格式规范。
```  

```
小插曲：上午还能播下午就播放不了了（电脑播放器），测试是因为播放器根据md5记住了上一次播放到了xx:xx,点进去直接索引了结尾，播放退出。16进制改一个字节完美播放
```

## 免责:

出于学习网络安全,拿去干什么的话,纯属个人行为哦

-------
Ps.第一次写长文,还是这么有争议的内容