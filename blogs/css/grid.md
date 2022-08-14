---
title: Grid布局
date: 2021-11-6
tags:
  - css
categories:
  - css
---

# Grid 布局

## 1、基本概念

**Grid 布局**： 网格布局（Grid）是最强大的 CSS 布局方案。它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。

采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。行和列的交叉区域，称为"单元格"（cell）。划分网格的线，称为"网格线"（grid line），水平网格线划分出行，垂直网格线划分出列。

设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

display: grid // 指定一个容器采用网格布局。

display: inline-grid //

## 2、容器属性

- **grid-template-columns**： 定义每一列的列宽
  - 除了使用绝对单位，也可以使用百分比。
  - `repeat()`：简化重复的值
    - 接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。
  - `auto-fill`关键字表示自动填充
  - `fr` 关键字表示比例关系
  - `minmax()`函数产生一个长度范围，表示长度就在这个范围之中
    - 接受两个参数，分别为最小值和最大值
  - `auto`关键字表示由浏览器自己决定长度
  - 使用方括号，指定每一根网格线的名字，方便以后的引用。
- **grid-template-rows**： 定义每一行的行高
- **grid-template-areas**： 定义区域
  - 区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为`区域名-start`，终止网格线自动命名为`区域名-end`
- **grid-template**： `grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式
- **grid-auto-columns**： 设置浏览器自动创建的多余网格的列宽
- **grid-auto-rows**： 设置浏览器自动创建的多余网格的行高
- **grid-auto-flow**： 设置容器的子元素放置顺序
  - 默认 row，即放置顺序是"先行后列"，即先填满第一行，再开始放入第二行
  - column，先列后行
  - row dense，表示"先行后列"，并且尽量填满空格
  - column dense，表示"先列后行"，并且尽量填满空格
- **grid**： `grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。
- **row-gap**： 设置行间距
- **column-gap**： 设置列间距
- **gap**： `column-gap`和`row-gap`的合并简写
- **justify-items**： 设置单元格内容的水平位置
  - start：对齐单元格的起始边缘
  - end：对齐单元格的结束边缘
  - center：单元格内部居中
  - stretch：拉伸，占满单元格的整个宽度（默认值）
- **align-items**： 设置单元格内容的垂直位置
- **place-items**： `align-items`属性和`justify-items`属性的合并简写形式
- **justify-content**： 整个内容区域在容器里面的水平位置
  - start：对齐容器的起始边框
  - end：对齐容器的结束边框
  - center：容器内部居中
  - stretch：项目大小没有指定时，拉伸占据整个网格容器
  - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍
  - space-between：项目与项目的间隔相等，项目与容器边框之间没有间隔
  - space-evenly：项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔
- **align-content**： 整个内容区域的垂直位置
- **place-content**： `align-content`属性和`justify-content`属性的合并简写形式。

## 3、项目属性

- **grid-column-start ， grid-column-end ， grid-row-start ， grid-row-end **： 指定项目的四个边框，分别定位在哪根网格线。
  - 网格线数字
  - 网格线名字
  - `span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格
- **grid-column ， grid-row **： `grid-column-start`和`grid-column-end`的合并简写形式，`grid-row-start`属性和`grid-row-end`的合并简写形式
- **grid-area**： 指定项目放在哪一个区域
- **justify-self ， align-self ， place-self **： 设置单元格内容的水平位置，跟`justify-items`属性的用法完全一致，但只作用于单个项目

## 4、Grid 布局与 Flex 布局区别

- 相似：都可以指定容器内部多个项目的位置。
- 区别：Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。
