---
title: CSS画图
date: 2022-4-26
tags:
  - css
categories:
  - css
---

# CSS 画图

## 1、实现一个三角形

原理：设置粗边框，隐藏其他边框。

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/2/27/161d7ebd112bc745~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img" />

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/2/27/161d7ebd1136014c~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="图像 022.png"/>

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/2/27/161d7ebd722d127c~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="图像 024.png"/>

```css
/* 直角三角形 */
div {
  width: 0;
  height: 0;
  border-top: 100px solid pink;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
}

/* 更小的直角三角形 */
div {
  width: 0;
  height: 0;
  border-top: 100px solid pink;
  border-left: 100px solid transparent;
}

/* 等腰三角形 */
div {
  width: 0;
  height: 0;
  border-top: 200px solid pink;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
}

/* 对话气泡 */
div {
  width: 200px;
  height: 100px;
  background-color: pink;
  border-radius: 10px;
  position: relative;
}
div::after {
  content: '';
  border-left: 20px solid pink;
  border-right: 20px solid transparent;
  border-bottom: 20px solid transparent;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
}
```

## 2、实现一个扇形

和三角形基本一致，就是多了一个圆角的样式

```css
/* 90°的扇形 */
div {
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-top-color: pink;
  border-radius: 100px;
}
```

## 3、实现一个圆

正方形设置 border-radius

```css
/* 圆 */
div {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: pink;
}
```

在使用 border-radius 时，使用 50%和 100%都可以得到一个圆，为什么？

**当任意两个相邻边框半径的总和超过边框的长度时，UA（标准实现方）必须按比例减少所有边框半径的使用值，直到它们没有重叠**

- 设置值加起来如果超过 100%，那需要按比例重新划分：比如一个 a 设置 100%，一个 b 设置 300%，加起来就 400% 了（超过 100% 了） —— 那么实际上一个真正分得长度的 1/4，另一个真正分得长度的 3/4；
- border-radius 最全写法：a b c d / e f g h

<img src="https://img2018.cnblogs.com/blog/337820/202001/337820-20200109103437202-1220652373.png" alt="示意图" />

## 4、实现一个半圆

长方形设置 border-radius

```css
/* 半圆 */
div {
  width: 100px;
  height: 50px;
  border-radius: 50px 50px 0 0;
  background-color: pink;
}
```

## 5、实现一个宽高自适应的正方形

用 vw 实现

利用元素的 padding/margin 百分比是相对父元素 width 的性质来实现

利用子元素的 margin-top 的值来实现，父元素需要 bfc 防止边距重叠

```css
/* 利用vw来实现 */
div {
  width: 10%;
  height: 10vw;
  background-color: pink;
}

/* 利用padding来实现 */
div {
  width: 10%;
  height: 0;
  padding-top: 10%;
  background-color: pink;
}

/* 利用margin来实现 */
div {
  width: 10%;
  background-color: pink;
  overflow: hidden;
}

div::after {
  display: block;
  content: '';
  margin-top: 100%;
}
```

## 6、实现一个梯形

```css
/* 直角梯形 */
div {
  width: 100px;
  height: 0;
  border-bottom: 100px solid pink;
  border-right: 40px solid transparent;
}

/* 等腰梯形 */
div {
  width: 100px;
  height: 0;
  border-bottom: 100px solid pink;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}
```

## 7、实现一条 0.5px 的线

定位 + 伪元素 + transfrom 缩放

```css
div {
  width: 100px;
  height: 100px;
  position: relative;
}
div::after {
  content: '';
  width: 200%;
  height: 200%;
  border: 1px solid pink;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(0.5);
  -webkit-transform: scale(0.5);
  transform-origin: top left;
  -webkit-transform-origin: top left;
}
```

## 8、设置小于 12px 的字体

在谷歌下 css 设置字体大小为 12px 及以下时，显示都是一样大小，都是默认 12px。

**解决办法**：

- 使用 Webkit 的内核的-webkit-text-size-adjust 的私有 CSS 属性来解决，只要加了-webkit-text-size-adjust:none;字体大小就不受限制了。但是 chrome 更新到 27 版本之后就不可以用了。所以高版本 chrome 谷歌浏览器已经不再支持-webkit-text-size-adjust 样式，所以要使用时候慎用。
- 使用 transform 缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display：block/inline-block/...；
- 使用图片：如果是内容固定不变情况下，使用将小于 12px 文字内容切出做图片，这样不影响兼容也不影响美观。
