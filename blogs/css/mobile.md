---
title: 移动端适配
date: 2022-5-11
tags:
  - css
categories:
  - css
---

# 移动端适配

## 1、基本概念

**屏幕尺寸**： 以屏幕对角线的长度来计算的，单位是英寸。1 英寸 = 2.54 厘米。

**像素**： 显示屏的画面上表示出来的最小单位。一个像素，类似一个小方块。

**屏幕分辨率**： 一个屏幕具体由多少个像素点组成。分辨率高不代表屏幕就清晰，屏幕的清晰程度还与尺寸有关。

**每英寸像素点 ppi**： PPI 越高，屏幕越清晰。

**设备像素(物理像素)**： 由设备的屏幕决定，其实就是屏幕中控制显示的最小单位。

**设备独立像素(逻辑像素)**： 一种可以被程序所控制的虚拟像素，在 Web 开发中对应 CSS 像素。（让两个屏幕尺寸一样大、分辨率不同的设备，呈现的同一个图片看起来差不多是一样大的）

**CSS 像素**： 浏览器使用的单位，用来精确度量网页上的内容，一般情况下 CSS 像素 = 逻辑像素，但浏览器可以放大，手机也有放大模式，此时就不再相等。

**设备像素比 dpr**： 物理像素 / 逻辑像素。

## 2、viewport

**视口 viewport**： 浏览器或 app 中 webview 显示页面的区域。一般来讲 PC 端的视口指的是浏览器窗口区域，而移动端就有点复杂，它有三个视口。

**布局视口**： html 元素之上的容器，我们的页面就“装”在布局视口中。通过**document.documentElement.clientWidth**获取。

**视觉视口**：用户通过设备屏幕看到的区域。可以通过缩放来改变视觉视口的大小，通过**window.innerWidth**获取。

**理想视口**： 网站在移动设备中的理想大小，这个大小就是设备的屏幕大小。通过**screen.width**获取。

```html
<meta
  name="viewport"
  content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover"
/>
```

1. width：将布局视口设置为固定的值，比如 375px 或者 device-width（设备宽度）
2. initial-scale：设置页面的初始缩放
3. minimum-scale：设置最小的缩小程度
4. maximum-scale：设置最大的放大程度
5. user-scalable：设置为 no 时禁用缩放

**width = device-width**： 让页面的布局视口的宽度等于视觉视口的宽度，此时页面元素会以设备逻辑像素宽度做为文档宽度进行布局。如果不加，则页面元素会以 980px 的文档宽度进行布局，然后 980px 的宽度再缩小填充整个屏幕。会导致页面元素看起来比较小。

**initial-scale**： 页面的缩放系数 = 理想视口宽度 / 视觉视口宽度，initial-scale 就相当于初始化了视觉视口，将布局视口初始化为这个视觉视口的值。

**布局视口宽度取的是 width 和 视觉视口宽度 的最大值**。（width 与 initial-scale 都会初始化布局视口，但浏览器会取其最大值。）

```html
<meta name="viewport" content="width=600, initial-scale=2" />
假设理想视口宽度为`414px`(device-width)，此时`document.documentElement.clientWidth`(布局视口)的值是多少?
视觉视口 = 414 / 2 = 207 布局视口 = Math.max(207, 600) = 600
```

## 3、适配方案

移动端适配的目标是让页面在不同的移动设备上都合理展示。一般来说有两种方向：

- 0 适配，使用合理的 flex 布局+媒体查询做微调

- 基于一个尺寸的屏幕做设计，其他屏幕等比缩放

### 3.1 0 适配

手机页面最常见的布局就是水平均分排列和两栏布局。使用 flex 布局实现的水平均分排列原本就是响应式的。

缺点：

- 设计师就给了一个尺寸的设计稿，其他的尺寸的实现效果本质上是工程师和浏览器的自由发挥，设计师无法再对工程师实现页面的还原度做 100%的把控，这对很多设计师来说是不可接受的事。
- 有很多不可控的因素在，开发工程师和测试工程师需要在尽可能多的真实设备上确认效果，对展示有问题的地方用媒体查询做微调。但这样这样间接增加了工作量。
- flex 自适应布局对绝大多数页面能合理展示，但对于一些非匀分排列和两栏布局的设计风格就无能为力了。

### 3.2 等比缩放

简单一句话概括：移动端适配就是在进行 屏幕宽度 的**等比例缩放**。

**1）viewport+PX**

在 HTML 的 head 标签里加入 `<meta name="viewport" content="width={设计稿宽度}, initial-scale={屏幕逻辑像素宽度/设计稿宽度}" >` 。

假如 UI 给我们提供的设计稿宽度时 375px，我们则需要将页面的 viewport 的 width 设为 375，然后再根据设备的逻辑像素将页面进行整体放缩。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      .box {
        font-size: 16px;
      }
    </style>
  </head>

  <body>
    <div class="box">一段文字</div>
    <script>
      const WIDTH = 375
      const mobileAdapter = () => {
        let scale = screen.width / WIDTH
        let content = `width=${WIDTH}, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}`
        let meta = document.querySelector('meta[name=viewport]')
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute('name', 'viewport')
          document.head.appendChild(meta)
        }
        meta.setAttribute('content', content)
      }
      mobileAdapter()
      window.onresize = mobileAdapter
    </script>
  </body>
</html>
```

**2）rem 方案**

根节点的的 font-size 会随着设备的布局视口的宽度变化而变化。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=2.0, user-scalable=yes" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      /* 
    device-width: 375px
    html: 1rem = 100px 
    device-width: 414px
    html: 1rem = 110.4px 
    */
      .box {
        font-size: 0.16rem;
      }
    </style>
  </head>

  <body>
    <div class="box">一段文字</div>
    <script>
      function setRootRem() {
        var root = document.documentElement
        const rem = 100 * (root.clientWidth / 375)
        root.style.fontSize = rem + 'px'
      }
      setRootRem()
      window.addEventListener('resize', setRootRem)
    </script>
  </body>
</html>
```

**3）vw 方案**

对于任何需要等比缩放的元素，在写 CSS 设置样式时直接换算成 vw 即可，尺寸 = 100vw\*设计稿标注大小/设计稿宽度。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=2.0, user-scalable=yes" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      /* 
    device-width: 375px 
    html: 100vw = 375px
    device-width: 414px  
    html: 100vw = 414px
    */
      .box {
        font-size: 4.26667vw;
      }
    </style>
  </head>

  <body>
    <div class="box">一段文字</div>
  </body>
</html>
```

**方案比较**：

- **viewport+px 方案**

  - 适配原理简单
  - 需要使用 JS
  - 直接使用设计稿标注无需换算
  - 方案死板，只能实现页面级别整体缩放

- **rem 方案**

  - 适配原理稍复杂

  - 需要使用 JS

  - 设计稿标注的 px 换算到 css 的 rem 计算简单

  - 方案灵活，既能实现整体缩放，又能实现局部不缩放

- **vw 方案**

  - 适配原理简单

  - 不需要使用 JS

  - 设计稿标注的 px 换算到 css 的 vw 计算复杂

  - 方案灵活，既能实现整体缩放，又能实现局部不缩放

## 4、1px 问题

**原因**： 没有提出逻辑像素的概念之前，1px 的 CSS 像素就体现为 1 物理像素，在该概念出现之后，在移动端设备上，1px 的 CSS 像素体现的物理像素就由逻辑像素比决定。举个例子：iPhone6 的物理像素是 750\*1334，逻辑像素是 375\*667，设备像素比是 2，这意味着我们把 2\*2 的物理像素当成 1\*1 的像素来使用。当我们设置某元素的宽度为 10px 时，我们实际上是在设置逻辑像素，对应物理像素 20。

为了适配各种屏幕，我们写代码时一般使用逻辑像素来对页面进行布局。而在设备像素比大于`1`的屏幕上，我们写的`1px`实际上是被多个物理像素渲染，这就会出现`1px`在有些屏幕上看起来很粗的现象。

**解决**：

**方案 1**： 直接设置 border-width。使用方便，但兼容性很差，0.5px 逻辑像素对于 IOS-8 支持，对于安卓不支持，不推荐使用。根据 window.devicePixelRatio 得到设备像素比，直接把 1px 改成 1/devicePixelRatio 后的值。

**方案 2**： 用阴影代替边框，设置**阴影**。使用方便，能正常展示圆角，兼容性一般。`box-shadow: *h-shadow v-shadow blur spread color* inset;`

**方案 3**： 给容器设置伪元素，设置绝对定位，高度为 1px，**背景图**为线性渐变，一半有颜色，一半透明。这种方法适合设置一条边框，没法展示圆角。

**方案 4**： 给容器设置伪元素，设置绝对定位，高度为 1px，设置底部边框，**边框背景**为线性渐变，一半有颜色，一半透明。这种方法适合设置一条边框，没法展示圆角。

**方案 5**： 给容器内设置伪元素，设置绝对定位，宽、高是 200%，边框是 1px，然后使用 transform: scale(0.5) 让**伪元素缩小**原来的一半，这时候伪元素的边框和容器的边缘重合，视觉上宽度只有 0.5px。这种方法兼容性最好，4 个边框都能一次性设置，能正常展示圆角，**推荐使用**。

**方案 6**： 通过**viewport**设置缩放，让`CSS`像素等于真正的物理像素。副作用也很大，整个页面被缩放。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div class="box box0">1px对比</div>
    <div class="box box1">方案1: 直接设置0.5px border宽度</div>
    <div class="box box2">方案2: 设置0.5px box-shadow扩散半径</div>
    <div class="box box3">方案3: 伪元素设置1px渐变的background-image</div>
    <div class="box box4">方案4: 伪元素设置1px渐变的border-image</div>
    <div class="box box5">方案5: 伪元素设置2倍尺寸1px边框再scale缩小一半</div>
    <style>
      .box {
        width: 300px;
        height: 50px;
        line-height: 50px;
        border-radius: 10px;
        margin-top: 10px;
        text-align: center;
        font-size: 12px;
      }

      .box0 {
        border: 1px solid #000;
      }

      .box1 {
        border: 0.5px solid #000;
      }

      .box2 {
        box-shadow: 0px 0px 0px 0.5px #000;
      }

      .box3 {
        position: relative;
      }

      .box3::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to bottom, transparent 50%, #000 50%);
      }

      .box4 {
        position: relative;
      }

      .box4::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(to bottom, transparent 50%, #000 50%) 0 0 100% 0;
      }

      .box5 {
        position: relative;
      }

      .box5::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid #000;
        border-radius: 10px;
        transform: scale(0.5);
        transform-origin: left top;
      }
    </style>
  </body>
</html>
```

```js
const scale = 1 / window.devicePixelRatio
const viewport = document.querySelector('meta[name="viewport"]')
if (!viewport) {
  viewport = document.createElement('meta')
  viewport.setAttribute('name', 'viewport')
  window.document.head.appendChild(viewport)
}
viewport.setAttribute(
  'content',
  'width=device-width,user-scalable=no,initial-scale=' +
    scale +
    ',maximum-scale=' +
    scale +
    ',minimum-scale=' +
    scale
)
```
