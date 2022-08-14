---
title: BFC
date: 2021-12-6
tags:
  - css
categories:
  - css
---

# BFC

## 1、概念

`BFC` 全称：`Block Formatting Context`， 名为 "块级格式化上下文"。

`W3C`官方解释为：`BFC`它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`Block Formatting Context`提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局。

简单来说就是，`BFC`是页面上的一个隔离的独立容器，容器内里面的元素布局不受外部影响。可以看做是一个`CSS`元素属性。

## 2、触发 BFC 条件

- 根元素`html`
- `float`的值不为`none`
- `overflow`的值为`hidden`、`auto`或`scroll`（不为`visible`）
- `position`的值为`absolute `或`fixed`
- `display`的值为`table-cell`、`table-caption`、`inline-block`、`flex`、`inline-flex`

## 3、BFC 特点

- 块级元素独占一行
- 属于同一 BFC 的两个相邻 Box 的 margin 会发生重叠
- 计算 BFC 的高度时，浮动元素也参与计算
- BFC 的区域不会与 float box 重叠
- BFC 是独立的容器，容器内部元素不会影响外部元素

## 4、BFC 作用

- **阻止外边距重叠**：同一个 BFC 下的两个元素外边距会发生折叠，可以设置不同的 BFC 或只给一个元素设置 BFC

- **清除浮动，防止高度塌陷**：父元素开启 BFC，包含浮动的子元素。
- **阻止元素被浮动元素覆盖**：设置被覆盖元素为 BFC。

## 5、IFC 布局规则

**行级格式化上下文**

- 内部的盒子会在水平方向，一个接一个地放置；当一行不够的时候会自动切换到下一行。
- 行级上下文的高度由内部最高的内联盒子的高度决定。

**其他布局：BFC、IFC、GFC 和 FFC**

- BFC（Block formatting contexts）：块级格式上下文
- IFC（Inline formatting contexts）：内联格式上下文
- GFC（GrideLayout formatting contexts）：网格布局格式化上下文
- FFC（Flex formatting contexts）：自适应格式上下文
