---
title: BOM
date: 2022-2-23
tags:
  - javascript
categories:
  - javascript
---

# BOM

## 1、BOM 概念

**BOM**：

浏览器对象模型，提供操作浏览器的属性和方法。

BOM 由一系列相关的对象构成，并且每个对象都提供了很多属性和方法，其核心对象是 window。

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/10/16d191f327978675~tplv-t2oaga2asx-watermark.awebp" alt="img" />

## 2、window

window 是 BOM 的核心对象，表示浏览器的一个实例。

**双重角色**：既是通过 js 访问浏览器窗口的一个接口；又是 ECMAScript 规定的 Global 对象。

#### 1）全局作用域

- 所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法。
- 定义全局变量与在 window 对象上直接定义属性的区别：全局变量不能通过 delete 操作符删除，而直接在 window 对象上的定义的属性可以。
  - 全局变量不能通过 delete 操作符删除**原因**：使用 var 语句添加的 window 属性有一个名为 [[Configurable]] 的特性，这个特性的值被设置为 false，因此这样定义的属性不可以通过 delete 操作符删除。
- 尝试访问未声明的变量会抛出错误，但是通过查询 window 对象，可以知道某个可能未声明的变量是否存在。

#### 2）窗口关系及框架

- 如果页面中包含框架，则每个框架都拥有自己的 window 对象，通过以下几种方法访问相应的 window 对象。
  - window.frames[序号]
  - window.frames[name]
  - top.frames[序号] // top 对象始终指向最高（最外）层的框架。
  - top.frames[name]
  - frames[序号]
  - frames[name]
- parent 对象始终指向当前框架的直接上层框架。
- self 对象始终指向 window。
- 所有这些对象都是 window 对象的属性。

#### 3）窗口位置

确定 window 对象位置的属性

- screenLeft // 窗口相对于屏幕左边
- screenTop // 窗口相对于屏幕上边
- screenX
- screenY

修改 window 对象位置的方法

- moveTo() // 接收的是新位置的 x 和 y 坐标值
- moveBy() // 接收的是在水平和垂直方向上移动的像素数

#### 4）窗口大小

确定一个窗口的大小

- innerWidth、innerHeight // 该容器中页面视图区的大小（减去边框宽度）
- outerWidth 、outerHeight // 浏览器窗口本身的尺寸

调整浏览器窗口的大小

- resizeTo() // 接收浏览器窗口的新宽度和新高度
- resizeBy() // 接收新窗口与原窗口的宽度和高度之差

#### 5）导航和打开窗口

- window.open() // 导航到一个特定的 URL 或 打开一个新的浏览器窗口
  - 接收 4 个参数：要加载的 URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值
  - 通常只须传递第一个参数，最后一个参数只在不打开新窗口的情况下使用。
  - 第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示哪些特性。
  - 该方法返回一个指向新窗口的引用。

#### 6）间歇调用和超时调用

JavaScript 是单线程语言，但它允许通过设置**超时值**和**间歇时间值**来调度代码在特定的时刻执行。

- 超时调用 setTimeout()

  - 它接受两个参数：要执行的代码（字符串或函数）和以毫秒表示的时间（即在执行代码前需要等待多少毫秒）。

  - 第二个参数告诉 js 再过多长时间把当前任务添加到队列中。
    - 该方法会返回一个超时调用 ID。clearTimeout() 方法，将相应的超时调用 ID 作为参数传递给它，来取消超时调用。

- 间歇调用 setInterval()
  - 它接受两个参数：要执行的代码（字符串或函数）和每次执行之前需要等待的毫秒数。
  - 该方法会返回一个间歇调用 ID。clearInterval() 方法，传入相应的间歇调用 ID，来取消间歇调用。
  - 取消间歇调用的重要性要远远高于取消超时调用。

#### 7）系统对话框

调用系统对话框向用户显示消息。

- alert()
- confirm()
- prompt()

## 3、history

history 对象保存着用户上网的**历史记录**，从窗口被打开的那一刻算起。

- go()
  - 接受一个参数，表示向后或向前跳转的页面数的一个整数值。负数-后退，正数-前进。
  - 也可以传递一个字符串参数。此时浏览器会跳转到历史记录中包含该字符串的第一个位置——可能后退，也可能前进，具体要看哪个位置最近。
- back() // 后退一页
- forward() // 前进一页
- length // 保存着历史记录的数量
  - history.length == 0 // 检测当前页面是不是用户历史记录中的第一个页面
- pushState(state, title, url) // 添加一条历史记录，不刷新页面
- replaceState(state, title, url) // 替换当前的历史记录，不刷新页面

## 4、location

location 提供了与当前窗口中加载的文档有关的信息，还提供了一些**导航**功能。location 将 URL 解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。

它既是 window 对象的属性，也是 document 对象的属性。

`http://127.0.0.1:5501/html/index.html?id=123#test`

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/10/1733658d90833f5b~tplv-t2oaga2asx-watermark.awebp" alt="Location Object"/>

**属性**：

| 属性     | 描述                                              |
| -------- | ------------------------------------------------- |
| hash     | #test                                             |
| host     | 127.0.0.1:5501                                    |
| hostname | 127.0.0.1                                         |
| href     | http://127.0.0.1:5501/html/index.html?id=123#test |
| origin   | http://127.0.0.1:5501                             |
| pathname | /html/index.html                                  |
| port     | 5501                                              |
| protocol | http:                                             |
| search   | ?id=123                                           |

除了 `origin` 是个只读属性不可修改外，其余的属性都是可读写。

每次修改`location` 的属性(`hash`除外)，页面都会以新 URL 重新加载。

**方法**：

| 方法    | 描述                     |
| ------- | ------------------------ |
| assign  | 加载新页面               |
| reload  | 重加载当前页面           |
| replace | 用一个新页面代替当前页面 |

`reload`方法：参数是一个可选的布尔类型，不填默认为`false`，表示可能从缓存中读取当前页面刷新，相当于普通的 F5 刷新，`true`表示强制浏览器从服务器去重新获取页面资源。

`assign` 和 `replace` ：这两个方法都需要传入一个参数，表示新页面的地址。区别在于，使用了 `assign` 后，会在浏览器的历史记录中留下之前老页面的地址，当我们在新页面点击回退键的时候还可以回到之前的页面。而 `replace` 则是使用新页面的地址替换老页面的地址，此时再点击回退按钮就回不到我们之前的页面去了。

## 5、navigator

navigator 对象包含有关浏览器的信息，通常用于检测显示网页的**浏览器**类型。

**属性**：

- `Navigator.useragent`返回浏览器的 User Agent 字符串，表示浏览器的厂商和版本信息。
- `Navigator.plugins`返回一个类数组对象，成员是 Plugin 实例对象，表示浏览器安装的插件。
- `Navigator.platform`返回用户的操作系统信息。
- `Navigator.onLine`返回一个布尔值，表示用户当前在线还是离线（浏览器断线）。
- `Navigator.language`返回一个表示浏览器首选语言的字符串，`Navigator.languages`返回表示用户可以接受的语言的类数组对象
- `Navigator.geolocation`返回一个 Geolocation 对象，包含用户地理位置的信息。注意，该 API 只有在 HTTPS 协议下可用。注意，调用下面三个方法时，浏览器会跳出一个对话框，要求用户给予授权。

  - `Geolocation.getCurrentPositon()`：得到用户的当前位置
  - `Geolocation.watchPosition()`：监听用户位置变化
  - `Geolocation.clearWatch()`取消上面方法指定的监听函数

- `Navigator.cookieEnabled`返回一个布尔值，表示浏览器的 Cookie 功能是否打开。

**方法**：

- `Navigator.javaEnabled()`返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序
- `Navigator.sendBeacon()`用于向服务器异步发送数据

## 6、screen

screen 对象表示当前窗口所在的屏幕，提供显示设备的信息，这些信息一般只用于站点分析。

**属性**：

- `Screen.height`：浏览器窗口所在的屏幕的高度（单位像素）。
- `Screen.width`：浏览器窗口所在的屏幕的宽度（单位像素）。
- `Screen.availHeight`：浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于`height`减去那些被系统组件的高度。
- `Screen.availWidth`：浏览器窗口可用的屏幕宽度（单位像素）。
