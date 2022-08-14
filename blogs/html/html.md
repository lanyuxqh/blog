---
title: HTML
date: 2021-11-6
tags:
  - html
categories:
  - html
---

# HTML

## 1. SGML、XML、HTML、XHTML、HTML5

- `SGML` ：标准通用标记语言

  - 是一种定义电子文档结构和描述其内容的国际标准语言。
  - 是所有电子文档标记语言的起源。

- `XML`：可扩展的标记语言

  - XML 不是 HTML 的替代。
  - XML 被设计为传输和存储数据，其焦点是数据的内容。
  - XML 是不作为的，仅仅是纯文本。
  - 标签没有预定义，需要自行定义标签。

- `HTML`：超文本标记语言

  - HTML 不是一种编程语言，而是一种标记语言。标记语言是一套标记标签。HTML 使用标记标签来描述网页。
  - HTML 被设计用来显示数据，其焦点是数据的外观。

- `XHTML`：可扩展的超文本标记语言

  - XHTML 是 HTML 的规范版本。
  - 文档结构：XHTML DOCTYPE、`<html>` 中的 XML namespace 属性、`<html>`、`<head>`、`<title>` 以及 `<body>` 是强制性的。
  - 1、所有标记都必须有一个相应的结束标签； 2、所有标签的元素和属性的名字都必须使用小写； 3、所有标记都必须合理嵌套； 4、所有属性都必须用引号“”括起来； 5、把所有<和&特殊符号用编码表示； 6、给所有属性附一个值； 7、不要在注释内容中使用“--”； 8、图片必须使用说明文字。

- `HTML5`

  - HTML5 是 HTML、XHTML 以及 HTML DOM 的新标准。

  - `HTML5`新增了`canvas`绘画元素；新增了用于绘媒介回放的`video`和`audio`元素；

    更具语义化的标签，便于浏览器识别；

    对本地离线存储有更好的支持；

    新的特殊内容元素，比如 article、footer、header、nav、section；

    新的表单控件，比如 calendar、date、time、email、url、search；

## 2. HTML 语义化

**语义化**： 根据内容的结构化，选择合适的标签，即用正确的标签做正确的事情。

**优点**： 

- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于 SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

**常见的语义化标签**： 

```
<header></header>  头部
<aside></aside>  侧边栏
<main></main>  主要区域
<footer></footer>  底部
<nav></nav>  导航栏
<section></section>  区块（有语义化的div）
<article></article>  主要内容
```

**title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？**

- title 属性没有明确意义只表示是个标题；h1 则表示层次明确的标题，对页面信息的抓取有很大的影响。
- b 标签只是一个简单加粗标签；strong 标签有语义，是起到加重语气的效果，搜索引擎更侧重 strong 标签。
- i 内容展示为斜体；em 表示强调的文本。

## 3. HTML 骨架

### 3.1 HTML 起手式

**DOCTYPE**： 文档类型声明

**html**： 网页整体，一个网页只能有一个 html 标签，也称作根标签(root element）。

**head**： 网页的配置，描述了文档的各种属性和信息，他的内容不会出现在网页上，只是为网页渲染提供额外的信息。它是所有头部元素的容器，如`<link>, <meta>, <script>, <style>, <title>`

**meta**： 用于设置网页的元数据，name 属性表示元数据的名字，content 为属性值。

**body**： 网页的身体，容器标签，用于放置 HTML 主体内容，浏览器的内容都在 body 标签里面。

```html
<!-- 文档类型声明，告知浏览器以何种方式解析浏览器，以下是HTML5的声明类型，这里用大写DOCTYPE 是用于区分标签，因为本质上它是一个指令-->
<!DOCTYPE html>
<!-- 所用的语言类型这里默认是英语，也可设置为 zh-CN -->
<html lang="en">
  <head>
    <!--charset用来指定网页的编码方式 字符编码UTF-8 防止乱码 -->
    <meta charset="UTF-8" />
    <!--规定IE用最新的版本来渲染-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--调整视图窗口，页面缩放一比一还原比例 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 网页的标题,会显示在标题栏,它对于网页在搜索排序的引擎有很大的影响 -->
    <title>Document</title>
  </head>
  <body></body>
</html>
```

### 3.2 Doctype

Doctype：是一种标准通用标记语言的文档类型声明，目的是告诉浏览器（标准通用标记语言解析器）要使用什么样的文档类型定义（DTD）来解析文档。DOCTYPE 不存在或格式不正确会导致文档以怪异模式呈现。`<!DOCTYPE>` 声明位于文档中的最前面，处于 `<html>` 标签之前。

DTD：`Document Type Definition`，文档类型定义，定义了 XML 或者 HTML 的特定版本中允许有什么，不允许有什么，在渲染解析页面的时候浏览器会根据这些规则检查页面的有效性并且采取相应的措施。

DTD 类型：

- 严格(strict)型：结构中不能出现格式或表现的内容，以及弃用的元素（比如 font）。

```html
<!--Html4.01严格型-->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!--XHTML1.0严格型-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- 过渡(transitional)型：结构中可以出现格式标记或表现(CSS)的内容 ，仍然可以使用废弃的元素。

```html
<!--Html4.01过渡型-->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!--XHTML1.0过渡型-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

- 框架(frameset)型：可以使用框架技术，实现多个网页在一个浏览器窗口中呈现 。

```html
<!--Html4.01框架型-->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
<!--XHTML1.0框架型-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

**HTML5 为什么只需要写 `<! DOCTYPE HTML>`？**

HTML 4.01 中的 doctype 需要对 DTD 进行引用，因为 HTML 4.01 基于 SGML。而 HTML 5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为。`HTML5` 没有 `DTD` ，因此也就没有严格模式与混杂模式的区别。

**<!Doctype html>的作用**： 

让浏览器进入标准模式，使用最新的 `HTML5` 标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。

**严格模式与混杂模式**： 

- 严格模式：又称标准模式，默认模式，浏览器的解析规则都是按照**最新的 W3C 标准**进行解析的。
- 混杂模式：又称怪异模式或兼容模式，浏览器会以**宽松的向后兼容**的方式来模拟老式浏览器的行为，以保证网站的正确访问。

如何区分：浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。

严格模式与混杂模式的语句解析的不同之处

- 混杂模式盒模型的高宽包含内边距 padding 和边框 border；
- 混杂模式可以设置行内元素的高宽；
- 混杂模式设置子元素百分比的宽度仍是有效的，在父元素没有设置高度的情况下；
- 混杂模式 margin:0 auto 设置水平居中会失效；

### 3.3 meta

meta 标签是 HTML 标记 HEAD 区的一个关键标签，**用来描述网页文档的属性**，提供文档字符集、使用语言、作者等基本信息，以及对关键词和网页等级的设定等，最大的作用是能够做搜索引擎优化（SEO）。

meta 标签可分为两大部分：http-equiv 和 name 变量。

**http-equiv**

http-equiv 相当于 http 的文件头作用，它可以向浏览器传回一些有用的信息，以帮助浏览器正确地显示网页内容。

| 值              | 描述                                                                                                  | 例子                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content-type    | 设定页面使用的字符集                                                                                  | `<meta http-equiv="content-Type" content="text/html; charset=utf-8">`GB2312 时，代表说明网站是采用的编码是简体中文；ISO-8859-1 时，代表说明网站是采用的编码是英文；UTF-8 时，代表世界通用的语言编码；PS：html5 页面的做法是直接使用<meta charset="utf-8"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| X-UA-Compatible | IE8 的专用标记，用来指定 IE8 浏览器去模拟某个特定版本的 IE 浏览器的渲染方式，以此来解决部分兼容问题。 | `<meta http-equiv="X-UA-Compatible" content="IE=7"> `以上代码告诉 IE 浏览器，无论是否用 DTD 声明文档标准，IE8/9 都会以 IE7 引擎来渲染页面。 `<meta http-equiv="X-UA-Compatible" content="IE=8"> `以上代码告诉 IE 浏览器，IE8/9 都会以 IE8 引擎来渲染页面。 `<meta http-equiv="X-UA-Compatible" content="IE=edge"> `以上代码告诉 IE 浏览器，IE8/9 及以后的版本都会以最高版本 IE 来渲染页面。 `<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">`以上代码 IE=edge 告诉 IE 使用最新的引擎渲染网页，chrome=1 则可以激活 Chrome Frame.PS：谷歌添加一个插件：Google Chrome Frame（谷歌内嵌浏览器框架 GCF），这个插件可以让用户的 IE 浏览器外不变，但用户在浏览网页时，实际上使用的是 Google Chrome 浏览器内核，而且支持 IE6、7、8 等多个版本的 IE 浏览器。 |
| expires         | 设定网页的过期时间。                                                                                  | `<meta http-equiv="expires"content="Fri,12Jan200118:18:18GMT">`PS：必须使用 GMT 的时间格式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| refresh         | 自动刷新并指向新页面。                                                                                | `<meta http-equiv="Refresh" content="2;URL=https://www.baidu.com">`PS：2 代表页面停留 2 秒后跳转到后面的网址上                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| set-cookie      | 如果网页过期，那么自动删除本地 cookie。                                                               | `<meta http-equiv="Set-Cookie"content="cookie value=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">`PS：必须使用 GMT 的时间格式。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| windows-target  | 强制页面在当前窗口中以独立页面显示，可以防止自己的网页被别人当作一个 frame 页调用                     | `<meta http-equiv="Window-target" content="_top">`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| cache-control   | 缓存机制                                                                                              | `<meta http-equiv="cache-control" content="no-cache">`Public：指示响应可被任何缓存区缓存。Private：指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。no-cache：指示请求或响应消息不能缓存。no-store：用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。max-age：指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。min-fresh：指示客户机可以接收响应时间小于当前时间加上指定时间的响应。max-stale：指示客户机可以接收超出超时期间的响应消息。如果指定 max-stale 消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。                                                                                                         |

**name**

name 属性主要用于描述网页，与之对应的属性值为 content，content 中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。

| 值          | 描述                                                     | 例子                                                                                                                                                                                                                                                                                                                                                       |
| ----------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| author      | 标注网页的作者                                           | `<meta name="author" content="dashen" />`                                                                                                                                                                                                                                                                                                                  |
| keywords    | 页面关键词，用于被搜索引擎收录                           | `<meta name="keywords" content="新闻,新闻中心, 新闻频道">`                                                                                                                                                                                                                                                                                                 |
| description | 页面描述，用于搜索引擎收录                               | `<meta name="description" content="新闻中心,包含有时政新闻、国内新闻、国际新闻、社会新闻、时事评论、新闻图片、新闻专题、新闻论坛、军事、历史、的专业时事报道门户网站">`                                                                                                                                                                                    |
| viewport    | 用于控制页面缩放                                         | `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">`                                                                                                                                                                                                                                 |
| renderer    | 指定双核浏览器默认以何种方式渲染页面。                   | `<meta name="renderer" content="webkit">//默认webkit内核 <meta name="renderer" content="ie-comp">//默认IE兼容模式 <meta name="renderer" content="ie-stand">//默认IE标准模式`PS：360 浏览器支持                                                                                                                                                             |
| generator   | 说明网站的采用的什么软件制作                             | `<meta name="generator" content="Microsoft"/>`                                                                                                                                                                                                                                                                                                             |
| revised     | 网页文档的修改时间                                       | `<meta name="revised" content="设计网, 6/24/2015"/>`                                                                                                                                                                                                                                                                                                       |
| robots      | 用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。 | `<meta name="robots" content="none"/>`取值：all\|none\|index\|noindex\|follow\|nofollow, 默认 allall：文件将被检索，且页面上的链接可以被查询；none：文件将不被检索，且页面上的链接不可以被查询；index：文件将被检索；follow：页面上的链接可以被查询；noindex：文件将不被检索，但页面上的链接可以被查询；nofollow：文件将不被检索，页面上的链接可以被查询。 |
| copyright   | 网站版权信息                                             | `<meta name="copyright" content="本页版权XXX所有。All Rights Reserved" />`                                                                                                                                                                                                                                                                                 |

**meta viewport**

- meta viewport 标签的作用是让当前 viewport 的宽度等于设备的宽度，同时不允许用户进行手动缩放。

- viewport 的原理：移动端浏览器通常都会在一个比移动端屏幕更宽的虚拟窗口中渲染页面，这个虚拟窗口就是 viewport; 目的是正常展示没有做移动端适配的网页，让他们完整的展示给用户；
- 属性值
  - width 设置 layout viewport 的宽度，为一个正整数，或字符串"width-device"
  - initial-scale 设置页面的初始缩放值，为一个数字，可以带小数
  - minimum-scale 允许用户的最小缩放值，为一个数字，可以带小数
  - maximum-scale 允许用户的最大缩放值，为一个数字，可以带小数
  - height 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用
  - user-scalable 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。

**常用的 meta 标签**

```html
<meta charset="utf-8" />
声明文档使用的字符编码

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
告诉IE浏览器，IE8/9及以后的版本都会以最高版本IE来渲染页面。添加一个插件：谷歌内嵌浏览器框架，这个插件可以让用户的IE浏览器外不变，但用户在浏览网页时，实际上使用的是Google
Chrome浏览器内核，而且支持IE6、7、8等多个版本的IE浏览器。
<meta http-equiv="expires" content="Fri,12Jan200118:18:18GMT" />
网页过期时间
<meta http-equiv="Refresh" content="2;URL=https://www.baidu.com" />
页面重定向和刷新
<meta http-equiv="cache-control" content="no-cache" />
可以在客户端存储资源，每次都必须去服务端做新鲜度校验

<meta name="description" content="页面描述内容" />
页面描述
<meta name="keywords" content="关键词" />
页面关键词
<meta name="author" content="name, email@gmail.com" />
网页作者
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no"
/>
适配移动端，可以控制视口的大小和比例
<meta name="robots" content="index,follow" />
搜索引擎索引方式，文件将被检索，页面上的链接可以被查询
<meta name="apple-mobile-web-app-title" content="标题" />
iOS 设备 begin
<meta name="apple-mobile-web-app-capable" content="yes" />
添加到主屏后的标题（iOS 6 新增） 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
<meta
  name="apple-itunes-app"
  content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL"
/>
添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telphone=no, email=no" />
设置苹果工具栏颜色
<meta name="renderer" content="webkit" />
启用360浏览器的极速模式(webkit)
<meta name="HandheldFriendly" content="true" />
针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
<meta name="MobileOptimized" content="320" />
微软的老式浏览器
<meta name="screen-orientation" content="portrait" />
uc强制竖屏
<meta name="x5-orientation" content="portrait" />
QQ强制竖屏
<meta name="full-screen" content="yes" />
UC强制全屏
<meta name="x5-fullscreen" content="true" />
QQ强制全屏
<meta name="browsermode" content="application" />
UC应用模式
<meta name="x5-page-mode" content="app" />
QQ应用模式
<meta name="msapplication-tap-highlight" content="no" />
windows phone 点击无高光 设置页面不缓存
```

## 4. HTML 基础标签

排版标签：标题标签`<h1></h1>`~`<h6></h6>`、段落标签`<p></p>`、换行标签`<br>`、水平线标签`<hr>`

文本格式化标签：加粗`<b></b>` `<strong></strong>`、倾斜`<i></i>` `<em></em>`、下划线`<u></u>` `<ins></ins>`、删除线`<s></s>` `<del></del>`

媒体标签：图片标签`<img src="" alt="">`、音频标签`<audio src="" controls></audio>`、视频标签`<video src="" controls></video>`、路径标签`<a href="目标路径" target="_self/_blank"></a>`

**行内元素**： inline ，一个行内元素只占据它对应标签的边框所包含的空间。

- a b strong span img button input label select textarea sub sup

**块级元素**： block，占据其父元素（容器）的整个宽度。

- div h1-h6 p ul ol li dl dt dd

**区别**： 

- 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
- 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
- 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。

**空元素**： 没有内容的 HTML 元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签。

- `<br>`、`<hr>`、`<img>`、`<input>`、`<link>`、`<meta>`；

## 5. HTML5

html5 简而言之就是对 超文本标记语言（html）的第五次重大修改。

所有`<!DOCTYPE html>`头的 .html 文件，浏览器都会使用 HTML5 标准来解析。

HTML4.01 是基于 SGML，需要声明 DTD 标记语言规则，浏览器才可以正常解析页面代码。而 HTML5 不是基于 SGML 标准，所以不需要声明 DTD。

**新增**： 

- 语义化标签
- 增强型表单
- 媒体标签
- Canvas 绘图
- 地理定位
- 拖拽释放 API
- WebStorage
- WebWorker
- WebSocket

**删除**： 

- 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
- 对可用性产生负面影响的元素：frame，frameset，noframe

**支持 HTML5 新标签**： 

- IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签， 可以利用这一特性让这些浏览器支持 HTML5 新标签， 浏览器支持新标签后，还需要添加标签默认的样式：
- 当然最好的方式是直接使用成熟的框架、使用最多的是 html5shim 框架

```html
<!--[if lt IE 9]>
  <script>
    src = 'http://html5shim.googlecode.com/svn/trunk/html5.js'
  </script>
<![endif]-->
```

### 5.1 语义化标签

- header：定义文档的头部；
- nav：定义导航链接的部分；
- footer：定义文档或节的底部；
- article：定义文章内容；
- section：定义文档中的节（语义化 div）；
- aside：定义其所处内容之外的内容（侧边）。

| 标签           | 描述                                                 |
| :------------- | :--------------------------------------------------- |
| `<article>`    | 定义文档内的文章。                                   |
| `<aside>`      | 定义页面内容之外的内容。                             |
| `<bdi>`        | 定义与其他文本不同的文本方向。                       |
| `<details>`    | 定义用户可查看或隐藏的额外细节。                     |
| `<dialog>`     | 定义对话框或窗口。                                   |
| `<figcaption>` | 定义 `<figure>` 元素的标题。                         |
| `<figure>`     | 定义自包含内容，比如图示、图表、照片、代码清单等等。 |
| `<footer>`     | 定义文档或节的页脚。                                 |
| `<header>`     | 定义文档或节的页眉。                                 |
| `<main>`       | 定义文档的主内容。                                   |
| `<mark>`       | 定义重要或强调的内容。                               |
| `<menuitem>`   | 定义用户能够从弹出菜单调用的命令/菜单项目。          |
| `<meter>`      | 定义已知范围（尺度）内的标量测量。                   |
| `<nav>`        | 定义文档内的导航链接。                               |
| `<progress>`   | 定义任务进度。                                       |
| `<rp>`         | 定义在不支持 ruby 注释的浏览器中显示什么。           |
| `<rt>`         | 定义关于字符的解释/发音（用于东亚字体）。            |
| `<ruby>`       | 定义 ruby 注释（用于东亚字体）。                     |
| `<section>`    | 定义文档中的节。                                     |
| `<summary>`    | 定义 `<details>` 元素的可见标题。                    |
| `<time>`       | 定义日期/时间。                                      |
| `<wbr>`        | 定义可能的折行（line-break）。                       |

### 5.2 增强型表单

**新的表单元素**： 

| 标签         | 描述                             |
| :----------- | :------------------------------- |
| `<datalist>` | 定义输入控件的预定义选项。       |
| `<keygen>`   | 定义键对生成器字段（用于表单）。 |
| `<output>`   | 定义计算结果。                   |

**新的表单类型**： 

| 输入类型       | 描述                     |
| -------------- | ------------------------ |
| color          | 主要用于选取颜色         |
| date           | 选取日期                 |
| datetime       | 选取日期（UTC 时间）     |
| datetime-local | 选取日期（无时区）       |
| month          | 选择一个月份             |
| week           | 选择周和年               |
| time           | 选择一个时间             |
| email          | 包含 email 地址的输入域  |
| number         | 数值的输入域             |
| url            | url 地址的输入域         |
| tel            | 定义输入电话号码的字段   |
| search         | 用于搜索域               |
| range          | 一个范围内数字值的输入域 |

**新的表单属性**： 

| 属性         | 描述                             |
| ------------ | -------------------------------- |
| placehoder   | 输入框默认提示文字               |
| required     | 要求输入的内容是否可为空         |
| pattern      | 描述一个正则表达式验证输入的值   |
| min/max      | 设置元素最小/最大值              |
| step         | 为输入域规定合法的数字间隔       |
| height/wdith | 用于 image 类型标签图像高度/宽度 |
| autofocus    | 规定在页面加载时，域自动获得焦点 |
| multiple     | 规定元素中可选择多个值           |

**新的表单事件**： 

- oninput 每当 input 里的输入框内容发生变化都会触发此事件。
- oninvalid 当验证不通过时触发此事件。

### 5.3 媒体标签

- **音频**`<audio>`

```html
<audio src="" controls autoplay loop="true"></audio>
```

| 属性                                                                | 值       | 描述                                                                                        |
| :------------------------------------------------------------------ | :------- | :------------------------------------------------------------------------------------------ |
| [autoplay](https://www.w3school.com.cn/tags/att_audio_autoplay.asp) | autoplay | 如果出现该属性，则音频在就绪后马上播放。                                                    |
| [controls](https://www.w3school.com.cn/tags/att_audio_controls.asp) | controls | 如果出现该属性，则向用户显示控件，比如播放按钮。                                            |
| [loop](https://www.w3school.com.cn/tags/att_audio_loop.asp)         | loop     | 如果出现该属性，则每当音频结束时重新开始播放。                                              |
| [muted](https://www.w3school.com.cn/tags/att_audio_muted.asp)       | muted    | 规定视频输出应该被静音。                                                                    |
| [preload](https://www.w3school.com.cn/tags/att_audio_preload.asp)   | preload  | 如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| [src](https://www.w3school.com.cn/tags/att_audio_src.asp)           | url      | 要播放的音频的 URL。                                                                        |

- **视频** `<vidio>`

```html
<video src="" poster="imgs/aa.jpg" controls></video>
```

| 属性                                                                | 值       | 描述                                                                                        |
| :------------------------------------------------------------------ | :------- | :------------------------------------------------------------------------------------------ |
| [autoplay](https://www.w3school.com.cn/tags/att_video_autoplay.asp) | autoplay | 如果出现该属性，则视频在就绪后马上播放。                                                    |
| [controls](https://www.w3school.com.cn/tags/att_video_controls.asp) | controls | 如果出现该属性，则向用户显示控件，比如播放按钮。                                            |
| [height](https://www.w3school.com.cn/tags/att_video_height.asp)     | pixels   | 设置视频播放器的高度。                                                                      |
| [loop](https://www.w3school.com.cn/tags/att_video_loop.asp)         | loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。                                        |
| [muted](https://www.w3school.com.cn/tags/att_video_muted.asp)       | muted    | 规定视频的音频输出应该被静音。                                                              |
| [poster](https://www.w3school.com.cn/tags/att_video_poster.asp)     | URL      | 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。                              |
| [preload](https://www.w3school.com.cn/tags/att_video_preload.asp)   | preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| [src](https://www.w3school.com.cn/tags/att_video_src.asp)           | url      | 要播放的视频的 URL。                                                                        |
| [width](https://www.w3school.com.cn/tags/att_video_width.asp)       | pixels   | 设置视频播放器的宽度。                                                                      |

### 5.4 Canvas 绘图

**Canvas**： 是画布，通过 Javascript 来绘制 2D 图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

每个`<canvas>`元素都有一个对应的`CanvasRenderingContext2D`对象（上下文对象），Canvas API 就定义在这个对象上面，`<canvas>`元素节点对象的`getContext()`方法返回的就是这个对象。

```html
<canvas id="tutorial" width="300" height="300"></canvas>
<script type="text/javascript">
  function draw() {
    // 获取画布
    var canvas = document.getElementById('tutorial')
    if (!canvas.getContext) return
    // 获得画布的上下文对象
    var ctx = canvas.getContext('2d')
    // 开始代码
    ctx.fillStyle = 'pink'
    ctx.fillRect(0, 0, 300, 200)
    ctx.closePath()
    ctx.fillStyle = 'red'
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    ctx.arc(50, 50, 50, 0, 2 * Math.PI, false)
    ctx.fill()
  }
  draw()
</script>
```

Canvas API 允许将图像文件写入画布，做法是读取图片后，使用`drawImage()`方法将这张图片放上画布。

```js
var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')

var image = new Image(60, 45)
image.onload = drawImageActualSize
image.src = 'https://example.com/image.jpg'
function drawImageActualSize() {
  canvas.width = this.naturalWidth
  canvas.height = this.naturalHeight
  ctx.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight) // 由于图像的本来大小，只有图像加载成功以后才能拿到，因此调整画布的大小，必须放在image.onload这个监听函数里面。
}
```

[canvas api]: https://www.bookstack.cn/read/webapi-tutorial/docs-canvas.md

**SVG**： SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。其他图像格式都是基于像素处理的，SVG 则是属于对图像的形状描述，它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。

SVG 文件可以直接插入网页，成为 DOM 的一部分，然后用 JavaScript 和 CSS 进行操作。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

```html
<svg width="300" height="200">
  <rect width="100%" height="100%" fill="pink" />
  <circle cx="50" cy="50" r="50" fill="red"></circle>
</svg>
```

[svg 图像]: https://www.bookstack.cn/read/webapi-tutorial/docs-svg.md

**canvas 和 svg 的区别**： 

- canvas 是脚本调用各种方法生成图像，svg 则是一个 XML 文件，通过各种子元素生成图像。
- canvas 是 h5 提供的新的绘图方法 ；svg 已经有了十多年的历史
- canvas 基于像素点，放大缩小会失真 ；svg 基于矢量，放大缩小不会失真
- canvas 不支持事件处理器；svg 支持
- canvas 支持颜色比 svg 多
- canvas 无法对已经绘制的图像进行修改、操作 ；svg 可以获取到标签进行操作
- canvas 最适合图像密集型的游戏，其中的许多对象会被频繁重绘；svg 最适合带有大型渲染区域的应用程序（比如谷歌地图）

### 5.5 地理定位

```javascript
window.navigator.geolocation {
    getCurrentPosition:  fn   用于获取当前的位置数据
    watchPosition: fn  监视用户位置的改变
    clearWatch: fn   清除定位监视
}
```

### 5.6 拖放

**拖放**： 抓取对象以后拖到另一个位置。

```html
<div draggable="true" ondragstart="drag(event)"></div>
<script>
  function drag(ev) {
    console.log(ev)
  }
</script>
```

| 拖动生命周期 | 属性名      | 描述                                           |
| ------------ | ----------- | ---------------------------------------------- |
| 拖动开始     | ondragstart | 在拖动操作开始时执行脚本                       |
| 拖动过程中   | ondrag      | 只要脚本在被拖动就运行脚本                     |
| 拖动过程中   | ondragenter | 当元素被拖动到一个合法的防止目标时，执行脚本   |
| 拖动过程中   | ondragover  | 只要元素正在合法的防止目标上拖动时，就执行脚本 |
| 拖动过程中   | ondragleave | 当元素离开合法的防止目标时                     |
| 拖动结束     | ondrop      | 将被拖动元素放在目标元素内时运行脚本           |
| 拖动结束     | ondragend   | 在拖动操作结束时运行脚本                       |

### 5.7 WebStorage

**出现原因**： Cookie 的缺点

- 数量和大小：单个域名设置的 Cookie 不应超过 30 个，每个 Cookie 的大小不能超过 4KB。
- 性能：Cookie 是随 HTTP 事务一起被发送的，因此会浪费一部分发送 Cookie 时使用的带宽。
- 使用：源生的 Cookie 接口不友好，需要程序员自己封装。

**概念**： 提供了 Web 存储机制，浏览器可以安全地存储键值对，可以存储大量的数据，不参与和服务器的通信。包括 sessionStorage 和 localStorage。

- **sessionStorage**，保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空。
- **localStorage**，保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。
- 相同点：
  - 都是保存在浏览器端的数据，不同浏览器无法共享 localStorage 和 sessionStorage 信息。
  - 都是同源的，所谓同源就是同域名、同端口、同协议。不同源的页面无法共享 localStorage 和 sessionStorage 信息。
  - 具有相同的操作方法，不但可以用自身的 setItem()，getItem()等方便存取，也可以像普通对象一样用点“.”操作符，及“[]”的方式进行数据存取。
- 不同点：
  - 生命周期：localStorage 为永久存储，除非用户手动清除 localStorage 信息，否则这些信息将永远存在。sessionStorage 为临时保存，生命周期为当前窗口或标签页，一旦窗口或标签页被关闭了，sessionStorage 被清空。
  - 作用域：localStorage 信息可以在相同浏览器中同源的不同页面间共享，可以是不同标签页中的页面、也可以是不同窗口的页面。sessionStorage 信息不可以在不同页面或标签页间共享，即使是相同浏览器、相同窗口中的同源页面。

**使用场景**： 

- 网站的一些不常变动的个人信息等也可以存储在本地的 LocalStorage 中；网站的换肤信息存储在本地的 LocalStorage 中。
- 由于 SessionStorage 具有时效性，所以可以用来存储一些网站的游客登录的信息，还有临时的浏览记录的信息。

**优点**： 

- 大小：可以存储更大容量的数据（一般为 5MB）。每个域名的存储上限视浏览器而定。
- 性能：仅在客户端（即浏览器）中保存，不参与和服务器的通信。
- 使用：源生接口可以接受，拥有 setItem()、getItem()、removeItem()、clear()等方法。

**缺点**： 

- 存在浏览器兼容问题，IE8 以下版本的浏览器不支持。
- 受到同源策略的限制。

**基本用法**： 

属性和方法：

- `Storage.length`：返回保存的数据项个数。
- `Storage.setItem()`：用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。该方法没有返回值。两个参数都是字符串。如果不是字符串，会自动转成字符串，再存入浏览器。
- `Storage.getItem()`：用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回`null`。
- `Storage.removeItem()`：用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。
- `Storage.clear()`：用于清除所有保存的数据。该方法的返回值是`undefined`。
- `Storage.key()`：接受一个整数作为参数（从零开始），返回该位置对应的键名。

事件：

- storage 事件：对 Storage 对象进行任何修改，都会在文档上触发 storage 事件，可以指定这个事件的监听函数。监听函数接受一个`event`实例对象作为参数。这个实例对象有几个特有的属性，都是只读属性。
  - `StorageEvent.key`：字符串，表示发生变动的键名。如果 storage 事件是由`clear()`方法引起，该属性返回`null`。
  - `StorageEvent.newValue`：字符串，表示新的键值。如果 storage 事件是由`clear()`方法或删除该键值对引发的，该属性返回`null`。
  - `StorageEvent.oldValue`：字符串，表示旧的键值。如果该键值对是新增的，该属性返回`null`。
  - `StorageEvent.storageArea`：对象，返回键值对所在的整个对象。也说是说，可以从这个属性上面拿到当前域名储存的所有键值对。
  - `StorageEvent.url`：字符串，表示原始触发 storage 事件的那个网页的网址。

注意，该事件有一个很特别的地方，就是它不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发。也就是说，如果浏览器只打开一个窗口，可能观察不到这个事件。比如同时打开多个窗口，当其中的一个窗口导致储存的数据发生改变时，只有在其他窗口才能观察到监听函数的执行。可以通过这种机制，实现多个窗口之间的通信。

### 5.8 WebWorker

**出现原因**： JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

**作用**： 为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰，等到 Worker 线程完成计算任务，再把结果返回给主线程。

**优点**： 一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

**缺点**： Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

**使用注意点**： 

（1）**同源限制**

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）**DOM 限制**

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以`navigator`对象和`location`对象。

（3）**通信联系**

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

（4）**脚本限制**

Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（5）**文件限制**

Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。

**基本用法**： 

（1）**主线程**

采用`new`命令，调用`Worker()`构造函数，新建一个 Worker 线程。

```javascript
// 第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。第二个参数是配置对象，该对象可选。
var worker = new Worker('worker.js', { name: 'myWorker' })
```

调用`worker.postMessage()`方法，向 Worker 发消息。

```javascript
// 参数是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。
worker.postMessage('Hello World')
worker.postMessage({ method: 'echo', args: ['Work'] })
```

通过`worker.onmessage`指定监听函数，接收子线程发回来的消息。

```js
worker.onmessage = function (event) {
  console.log('Received message ' + event.data) // 事件对象的data属性可以获取 Worker 发来的数据。
  doSomething()
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!')
}
```

主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的`error`事件。

```javascript
worker.onerror(function (e) {
  console.log(['ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message].join(''))
})
```

Worker 完成任务以后，主线程就可以把它关掉。

```javascript
worker.terminate()
```

（2）**Worker 线程**

Worker 线程内部需要有一个监听函数，监听`message`事件。通过`postMessage`向主线程发送消息。

```javascript
// self代表子线程自身，即子线程的全局对象。不是主线程的window！
self.addEventListener(
  'message',
  function (e) {
    self.postMessage('You said: ' + e.data)
  },
  false
)
```

Worker 也可以关闭自身，在 Worker 的脚本中执行 `self.close()`。

Worker 内部如果要加载其他脚本，有一个专门的方法`importScripts()`。该方法可以同时加载多个脚本。

**数据通信**： 

主线程与 Worker 之间的通信内容，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。

**例子**： 

Worker 线程完成轮询：有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。

```javascript
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
```

### 5.9 WebSocket

**出现原因**： HTTP 协议有一个缺陷，通信只能由客户端发起，做不到服务器主动向客户端推送信息。这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用轮询方式了解服务器有没有新的信息。最典型的场景就是聊天室。轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。

**作用**： WebSocket 协议为 web 应用程序客户端和服务端之间提供了一种全双工通信机制。

**特点**： 

- 握手阶段采用 HTTP 协议，默认端口是 80 和 443。
- 建立在 TCP 协议基础之上，和 http 协议同属于应用层。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据。。
- 没有同源限制，客户端可以与任意服务器通信。
- 协议标识符是 ws（如果加密，为 wss），如 ws://localhost:8023。

**基本用法**： 

（1）**客户端**

```js
var ws = new WebSocket('wss://echo.websocket.org')

ws.onopen = function (evt) {
  console.log('Connection open ...')
  ws.send('Hello WebSockets!')
}

ws.onmessage = function (evt) {
  console.log('Received Message: ' + evt.data)
  ws.close()
}

ws.onclose = function (evt) {
  console.log('Connection closed.')
}
```

**WebSocket 对象的相关事件**： 

| 事件    | 事件处理程序     | 描述                       |
| ------- | ---------------- | -------------------------- |
| open    | Socket.onopen    | 连接建立时触发             |
| message | Socket.onmessage | 客户端接收服务端数据时触发 |
| error   | Socket.onerror   | 通信发生错误时触发         |
| close   | Socket.onclose   | 连接关闭时触发             |

**WebSocket 对象的相关属性和方法**： 

| 方法                     | 描述                                                                                                                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| webSocket.send()         | 使用连接发送数据                                                                                                                                                                          |
| webSocket.close()        | 关闭连接                                                                                                                                                                                  |
| webSocket.readyState     | 实例对象的当前状态：CONNECTING：值为 0，表示正在连接； OPEN：值为 1，表示连接成功，可以通信了。；CLOSING：值为 2，表示连接正在关闭； CLOSED：值为 3，表示连接已经关闭，或者打开连接失败。 |
| webSocket.bufferedAmount | 还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。                                                                                                                        |

（2）**服务器**

常用的 Node 实现有以下三种：

- [µWebSockets](https://github.com/uWebSockets/uWebSockets)
- [Socket.IO](http://socket.io/)
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

**WebSocket 如何兼容低版本浏览器？**

Adobe Flash Socket 、 ActiveX HTMLFile (IE) 、 基于 multipart 编码发送 XHR 、 基于长轮询的 XHR

## 6. iframe 框架

iframe 也称作嵌入式框架，它可以把一个网页的框架和内容嵌入在现有的网页中。

**优点**： 

- iframe 能够原封不动的把嵌入的网页展现出来。
- 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用。
- 如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
- 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决。
- 可以使脚本并行下载
- 可以实现跨子域通信

**缺点**： 

- 阻塞主页面加载。window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发；浏览器在同一时间针对同一域名下的请求有一定数量限制，主页面和其中的 iframe 是共享这些连接的，这意味着 iframe 在加载资源时可能用光了所有的可用连接。

  - 解决：在主页面上重要的元素加载完毕后，通过 JavaScript 动态设置 iframe 的 SRC 可以避免这种阻塞情况。

- 不利于 SEO，搜索引擎的爬虫程序无法解读这种页面。

- 产生多个页面，不易管理；

- 框架结构中会出现各种滚动条。

  **方案 1**： 在 iframe 外包裹一层 div,然后设置为 overflow：hidden

  **方案 2**： 

  ```html
  <iframe
    src="https://www.baidu.com"
    height="100%"
    width="100%"
    id="frame_full"
    frameborder="0"
    scrolling="auto"
    onload="this.style.height=document.body.clientHeight-50"
  ></iframe>
  ```

**应用场景**： 

- 用来加载广告；
- 一般邮箱使用 iframe，如 QQ 邮箱；
- 一些简单的后台页面；
- 所见即所得的网页编辑器；
- 跨域通信。

**iframe 基本使用**： 

```html
<iframe
  id="iframe1"
  name="iframe1"
  src="https://www.huaban.com"
  frameborder="0"
  width="100%"
  height="500px"
  scrolling="auto"
></iframe>
```

```stylus
iframe常用属性:
1.frameborder:是否显示边框，1(yes),0(no)
2.height:框架作为一个普通元素的高度，建议在使用css设置。
3.width:框架作为一个普通元素的宽度，建议使用css设置。
4.name:框架的名称，window.frames[name]时专用的属性。
5.scrolling:框架的是否滚动。yes,no,auto。
6.src:内框架的地址，可以使页面地址，也可以是图片的地址。
7.srcdoc:用来替代原来HTML body里面的内容。但是IE不支持, 不过也没什么卵用
8.sandbox:对iframe进行一些列限制，IE10+支持
```

**获取 iframe 里的内容**： 

- iframe.contentWindow：获取 iframe 的 window 对象
- iframe.contentDocument：获取 iframe 的 document 对象
- window.frames['iframe-name']：获取 iframe 的 window 对象

```html
<script>
  var iframe = document.getElementById('iframe1')
  var iwindow = iframe.contentWindow
  var idocument = iframe.contentDocument
  console.log('window', iwindow) //获取iframe的window对象
  console.log('document', idocument) //获取iframe的document
  console.log('html', idocument.documentElement) //获取iframe的html

  console.log(window.frames['iframe1'])
</script>
```

**在 iframe 中获取父级内容**： 

- window.parent 获取上一级的 window 对象，如果还是 iframe 则是该 iframe 的 window 对象
- window.top 获取最顶级容器的 window 对象，就是你打开页面的文档
- window.self 返回自身 window 的引用。可以理解 window===window.self

## 7. WEB 标准

web 标准分为**结构、表现和行为**。

结构层：由 HTML 或 XHTML 之类的标记语言负责创建。标签，也就是那些出现在尖括号里的单词，对网页内容的语义含义做出了描述。

表示层：由 CSS 负责创建。 CSS 对“如何显示有关内容”的问题做出了回答。

行为层：由 Javascript 语言和 DOM 进行创建。 行为是指页面和用户具有一定的交互，同时页面结构或者表现发生变化，负责回答“内容应该如何对事件做出反应”这一问题。

W3C 对 web 标准提出了规范化的要求，也就是在实际编程中的一些代码规范：

- 对于结构要求：（标签规范可以提高搜索引擎对页面的抓取效率，对 SEO 很有帮助）

  - 标签字母要小写
  - 标签要闭合
  - 标签不允许随意嵌套

- 对于 css 和 js 要求：
  - 尽量使用外链 css 样式表和 js 脚本。使结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验。
  - 样式尽量少用行间样式表，使结构与表现分离，标签的 id 和 class 等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版。
  - 不需要变动页面内容，便可提供打印版本而不需要复制内容，提高网站易用性。

## 8. HTML5 离线缓存

HTML5 引入离线缓存（Application Cache），这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。

**原理**： HTML5 的离线存储是基于一个 manifest 文件(缓存清单文件，后缀为.appcache)的缓存机制(不是存储技术)，通过这个文件上的清单解析离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态时，浏览器会通过被离线存储的数据进行页面展示。

**步骤**： 

- 首先在文档的 html 标签中设置 manifest 属性，引用 manifest 文件 。

- 然后配置 manifest 文件，在 manifest 文件中编写离线存储的资源。

- 最后操作 window.applicationCache 进行需求实现。

- 此外，必须要在服务器端正确的配置 MIME-type：将.manifest 后缀的文件类型声明为 text/cache-manifest

**优势**：

- 离线浏览 - 用户可在应用离线时使用它们。
- 速度 - 已缓存资源加载得更快。
- 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

**离线存储的 manifest 一般由三个部分组成**： 

- CACHE：表示需要离线存储的资源列表。

- NETWORK：表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。

- FALLBACK：表示如果访问第一个资源失败，那么就使用第二个资源来替换他。

## 9. html 常见兼容性问题

1. 双边距 BUG float 引起的，解决办法: 使用 display 解决

2. 3 像素问题 使用 float 引起的，解决办法: 使用 dislpay:inline -3px
3. 超链接 hover 点击后失效，解决办法: 使用正确的书写顺序 link visited hover active
4. Ie z-index 问题，解决办法: 给父级添加 position:relative
5. Png 透明 ，解决办法: 使用 js 代码
6. Min-height 最小高度 ，解决办法: ！Important 解决
7. select 在 ie6 下遮盖，解决办法: 使用 iframe 嵌套
8. 为什么没有办法定义 1px 左右的宽度容器，解决办法: （IE6 默认的行高造成的，使用 over:hidden, zoom:0.08 line-height:1px）
9. IE5-8 不支持 opacity，解决办法：

```css
.opacity {
    opacity: 0.4;
    filter: alpha(opacity=60);/_ for IE5-7 _/ -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";/_ for IE 8_/
}
```

10. IE6 不支持 PNG 透明背景，解决办法: IE6 下使用 gif 图片

## 10. HTML 全局属性

accesskey: 设置快捷键，提供快速访问元素如[aaa](#)在 windows 下的 firefox 中按 alt + shift + a 可激活元素

class: 为元素设置类标识，多个类名用空格分开，CSS 和 javascript 可通过 class 属性获取元素

contenteditable: 指定元素内容是否可编辑

contextmenu: 自定义鼠标右键弹出菜单内容

data-\*: 为元素增加自定义属性

dir: 设置元素文本方向

draggable: 设置元素是否可拖拽

dropzone: 设置元素拖放类型： copy, move, link

hidden: 表示一个元素是否与文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果

id: 元素 id，文档内唯一

lang: 元素内容的的语言

spellcheck: 是否启动拼写和语法检查

style: 行内 css 样式

tabindex: 设置元素可以获得焦点，通过 tab 可以导航

title: 元素相关的建议信息

translate: 元素和子孙节点内容是否需要本地化

## 11. src 与 href

**src**： source

- 指向外部资源的位置，会将其指向的资源下载并嵌入构成文档直接内容，是引入；
- 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕；
- 在 img、script、iframe 等元素上使用。

**href**： Hypertext Reference

- 指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，是引用；
- 当浏览器识别到它指向的文件时，就会并行下载资源，不会停止对当前文档的处理；
- 在 link 和 a 等元素上使用。

## 12. img

### 13.1 srcset 作用

**作用**： 提供了根据屏幕条件选取图片的能力。srcset 定义了我们允许浏览器选择的图像集，以及每个图像的大小。

**扩展**： 可以设计响应式图片，使用两个新的属性 srcset 和 sizes 来提供更多额外的资源图像和提示，帮助浏览器选择正确的一个资源。srcset 提供了一组图片源地址和图片像素宽度，sizes 定义了一组媒体条件和图片显示宽度，先根据`sizes`设定的条件下，找出此刻图片显示的宽度，然后根据这个宽度去`srcset`里找符合条件的图片。

**例子**： 

```html
<img
  src="4.jpg"
  srcset="3.jpg 229w, 2.png 618w, 1.jpg 1000w"
  ,
  sizes="(max-width: 500px) 400px, (max-width: 900px) 700px, 1200px"
/>
```

在屏幕小于等于 500px 情况下，图片显示成 400px 宽，选取`2.png`；在屏幕小于等于 900px 情况下，图片显示成 700px 宽，选取`1.jpg`；其余情况显示成 1200px 宽，还是选取`1.jpg`。

- sizes 里的媒体查询条件顺序是很重要的，只要满足了越靠前的某个条件，那么后面的条件会被忽略的

- 如果`sizes`属性没有值，或者在有媒体条件下，其余条件宽度没有设值，那么默认是`100vw`

**picture：能起到跟 srcset 相似作用的标签**

`<picture>`元素通过包含零或多个`<source>`元素和一个 `<img>`元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子`<source>`元素，如果没有匹配的，就选择`<img>`元素的 src 属性中的 URL。然后，所选图像呈现在`<img>`元素占据的空间中。

```html
<picture>
  <source srcset="/media/examples/surfer-240-200.jpg" media="(min-width: 800px)" />
  <img src="/media/examples/painted-hand-298-332.jpg" />
</picture>
```

### 12.2 alt 和 title 属性的区别

**alt**： 

- 是一个必需的属性；
- 用于图片无法加载时显示或读屏器阅读图片（帮助盲人了解图片内容），**替代**图片。
- 是给搜索引擎识别，有利于 SEO，是搜索引擎搜录时判断图片与文字是否相关的重要依据。

**title**： 

- 不是一个必需的属性；
- 用于对元素的注释说明和**额外补充**，主要是给用户解读。当鼠标放到文字或是图片上时有 title 文字显示。

（因为 IE 不标准）在 IE 浏览器中 alt 起到了 title 的作用，变成文字提示。

### 12.3 base64 编码优缺点

base64 编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上显示的时候，可以用该字符串来代替图片的 url 属性。一般一些网站的小图标可以使用 base64 图片来引入。

- **优点**： 减少一个图片的 HTTP 请求。
- **缺点**： 使用 base64 无法直接缓存，要缓存只能缓存包含 base64 的文件，比如 HTML 或者 CSS，这相比域直接缓存图片的效果要差很多。兼容性的问题，ie8 以前的浏览器不支持。

### 12.4 图片格式

**图片格式分类**

- 无压缩。无压缩的图片格式不对图片数据进行压缩处理，能准确地呈现原图片。BMP
- 无损压缩。压缩算法对图片的所有的数据进行编码压缩，能在保证图片的质量的同时降低图片的尺寸。png
- 有损压缩。压缩算法不会对图片所有的数据进行编码压缩，而是在压缩的时候，去除了人眼无法识别的图片细节。因此有损压缩可以在同等图片质量的情况下大幅降低图片的尺寸。jpg÷

| 格式   | 特点                                                                              |
| ------ | --------------------------------------------------------------------------------- |
| BMP    | 无压缩，既支持索引色也支持直接色的点阵图，文件大                                  |
| GIF    | 无损压缩，采用索引色的点阵图，只支持 256 种颜色，文件小，支持动画和透明           |
| JPEG   | 有损压缩，采用直接色的点阵图，色彩丰富，反复保存图片质量下降明显，图片较 GIF 更大 |
| PNG-8  | 无损压缩，采用索引色的点阵图，文件较 GIF 小，支持透明，不支持动画，GIF 格式替代者 |
| PNG-24 | 无损压缩，采用直接色的点阵图，文件较 BMP 小，文件较 JPEG、GIF、PNG-8 大得多       |
| SVG    | 无损的矢量图，放大时不会失真                                                      |
| webp   | 支持有损和无损压缩，使用直接色的点阵图，文件小，支持动画和透明，浏览器兼容性不好  |

**获取文件 mime 类型**

将上传文件转为二进制形式后，再获取其前四位头文件的十六进制编码，根据这个就可以精准判定上传文件类型。

```js
function getFileMimeType(file) {
  const map = {
    FFD8FFE0: 'jpg',
    '89504E47': 'png',
    47494638: 'gif',
    52494646: 'webp'
  }

  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  return new Promise((resolve, reject) => {
    reader.onload = event => {
      try {
        let array = new Uint8Array(event.target.result)
        array = array.slice(0, 4)
        let arr = [...array]
        let key = arr.map(item => item.toString(16).toUpperCase().padStart(2, '0')).join('')
        resolve(map[key])
      } catch (e) {
        reject(e)
      }
    }
  })
}
```

## 13. label

label 标签来定义表单控件的关系：当用户选择 label 标签时，浏览器会自动将焦点转到和 label 标签相关的表单控件上。

```html
<label for="mobile">Number:</label>
<input type="text" id="mobile" />

<label>
  Date:
  <input type="text" />
</label>
```

## 14. 浏览器乱码

**产生乱码的原因**： 

- 网页源代码是`gbk`，而内容中的中文字是`utf-8`编码的，这样浏览器打开即会出现`html`乱码，反之也会出现乱码；
- 网页编码是`gbk`，而程序从数据库中调出呈现是`utf-8`编码的内容也会造成编码乱码；
- 浏览器不能自动检测网页编码，造成网页乱码。

**解决办法**： 

- 使用软件编辑 HTML 网页内容；
- 如果网页设置编码是`gbk`，而数据库储存数据编码格式是`UTF-8`，此时需要程序查询数据库数据显示数据前进程序转码；
- 如果浏览器浏览时候出现网页乱码，在浏览器中找到转换编码的菜单进行转换。

## 15. 渐进增强和优雅降级

**渐进增强（progressive enhancement）**：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验。

**优雅降级（graceful degradation）**： 一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

"渐进增强"观点则认为应关注于内容本身。内容是建立网站的诱因，有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得"渐进增强"成为一种更为合理的设计范例。这也是它立即被 Yahoo 所采纳并用以构建其“分级式浏览器支持 (Graded Browser Support)”策略的原因所在。

"优雅降级"观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。 在这种设计范例下，旧版的浏览器被认为仅能提供“简陋却无妨 (poor, but passable)” 的浏览体验。可以做一些小的调整来适应某个特定的浏览器。但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被直接忽略。

## 16. defer 与 async

defer 与 async 是 script 标签中属性，如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本，这样就阻塞了后续文档的加载。

defer 和 async 属性都是去**异步加载**外部的 JS 脚本文件，它们都不会阻塞页面的解析，

- **defer**： 当整个文档解析完毕后，DOMContentLoaded 事件触发执行之前，执行脚本文件（保证顺序）
- **async**： 当脚本文件加载完毕后就开始执行脚本文件，最后回到 document 断点继续渲染。（不保证顺序）

![defer_async](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/7/16f7edfaa3e8c6ee~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
