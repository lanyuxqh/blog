---
title: 盒模型
date: 2021-12-6
tags:
  - css
categories:
  - css
---

# 盒模型

## 1、基本概念

在 CSS 中任何元素都可以看成是一个盒子。

一个盒子是由 4 部分组成的：内容（content）、内边距（padding）、边框（border）和外边距（margin）。

```css
.box {
  width: 200px;
  height: 200px;
  padding: 10px;
  border: 1px solid #eee;
  margin: 10px;
}
```

## 2、两种模型

- 标准盒模型（W3C）：盒子的实际尺寸 = 内容（设置的宽/高） + 内边距 + 边框

  - `.box` 元素内容的宽度就为 `200px`，而实际的宽度则是 `width` + `padding-left` + `padding-right` + `border-left-width` + `border-right-width` = 200 + 10 + 10 + 1 + 1 = 222。

- IE 盒模型（IExplore）：盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框
  - `.box` 元素所占用的实际宽度为 `200px`，而内容的真实宽度则是 `width` - `padding-left` - `padding-right` - `border-left-width` - `border-right-width` = 200 - 10 - 10 - 1 - 1 = 178。

**设置**：

```css
/* 标准模型 - 默认 */
box-sizing: content-box;

/*IE模型*/
box-sizing: border-box;
```

## 3、JS 获取盒模型宽高

- `dom.style.width/height`
  - 只能获取 **内联**样式 的宽高，获取不到 **style 标签** 或 **外联**CSS 的宽高
- `dom.currentStyle.width/height`
  - 获取 **页面渲染完成后** dom 的宽高（不论样式在哪定义）。缺点：只有 **IE** 浏览器支持。
- `window.getComputedStyle(dom).width/height`
  - 原理同上，这个兼容性，通用性更好
- `dom.getBoundingClientRect().width/height`
  - 根据元素（左上角）在视窗中的绝对位置来获取宽高的：content+padding+border
- `dom.offsetWidth/offsetHeight`
  - dom 对象的可见宽度，包含 content + padding + border，默认单位 p

## 4、根据盒模型解释边距重叠

当两个外边距相遇时，他们将形成一个外边距，合并后的外边距高度等于两个发生合并的外边距的高度中的较大者。

规则：正正取最大，负负取最负，正负就相加。

浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。重叠只会出现在垂直方向。

一般有三种情况：

- 父子元素边距合并

  - 原因：一个盒子如果没有添加 `BFC`，那么它的上边距应该和其文档流中的第一个子元素的上边距重叠。
  - 解决： 通过给父容器添加` overflow: hidden` 属性，使之成为 `BFC` 。

- 兄弟元素边距重叠
  - 原因：块级元素的上外边距或下外边距有时（直接接触/相邻时）会合并为一个外边距。
  - 解决：通过给其中一个兄弟元素添加父容器并添加` overflow: hidden` 属性，使之成为 `BFC` 。
- 空元素边距合并
  - 原因：如果一个块级元素没有任何内容并且设置了 `margin-top` 和 `margin-bottom` 时会发生 `margin` 合并。
  - 解决：给每一个空元素添加父容器并添加 `overflow: hidden` 属性，使之成为 `BFC` 。

## 5、各种宽高

clientHeigh = height + 上下 padding （可视内容）

offsetHeith = height + 上下 padding + 上下 boder （控件元素）

scrollHeight = 可视区域宽度 + 被隐藏区域宽度 （实际内容）

clientTop = boder.top (上边框的宽度)

offsetTop = 当前元素上边框外边缘到最近的已定位父级（offsetParent）上边框内边缘的距离。如果父级都没有定位，则到 body 顶部的距离。

scrollTop：内容层顶部到可视区域顶部的距离（滑出可视区距离）
