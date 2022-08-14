---
title: Flex布局
date: 2021-11-5
tags:
  - css
categories:
  - css
---

# Flex 布局

## 1、基本概念

**flex 布局**： 是 FlexibleBox 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为 flex 布局；采用 flex 布局的元素，称为 flex 容器，它的所有子元素自动成为容器成员，称为 flex 项目。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿水平主轴排列。

给父盒子设为 flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效；

display: flex

## 2、容器属性

- **flex-direction**：设置**主轴**的方向
  - row（默认值）：主轴为水平方向，起点在左端。
  - row-reverse：主轴为水平方向，起点在右端。
  - column：主轴为垂直方向，起点在上沿。
  - column-reverse：主轴为垂直方向，起点在下沿。
- **flex-wrap**：设置子元素是否换行
  - nowrap（默认值）：不换行。
  - wrap：换行，第一行在上方。
  - wrap-reverse：换行，第一行在下方。
- **flex-flow**：复合属性，相当于同时设置了 flex-direction 和 flex-wrap（简写）
  - row nowrap（默认值）
- **justify-content**：设置**主轴**上的子元素排列方式
  - flex-start（默认值）：左对齐
  - flex-end：右对齐
  - center：居中
  - space-between：两端对齐，项目之间的间隔都相等。
  - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
- **align-items**：设置**交叉轴**上的子元素的排列方式（**单行**）
  - flex-start：交叉轴的起点对齐。
  - flex-end：交叉轴的终点对齐。
  - center：交叉轴的中点对齐。
  - stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。
  - baseline: 项目的第一行文字的基线对齐。
- **align-content**：设置**交叉轴**上的子元素排列方式（**多行/换行**），如果项目只有一根轴线，该属性不起作用。
  - flex-start：与交叉轴的起点对齐。
  - flex-end：与交叉轴的终点对齐。
  - center：与交叉轴的中点对齐。
  - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
  - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  - stretch（默认值）：轴线占满整个交叉轴。

## 3、项目属性

- **order**：定义子项的排列顺序（前后顺序）

  - 默认为 0，数值越小，排列越靠前

- **flex-grow**：定义项目的放大比例

  - 默认为 0，即如果存在剩余空间，也不放大
  - 如果所有项目都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

- **flex-shrink**：定义了项目的缩小比例

  - 默认为 1，即如果空间不足，该项目将缩小
  - 如果所有项目都为 1，当空间不足时，都将等比例缩小。如果一个项目为 0，其他项目都为 1，则空间不足时，前者不缩小。

- **flex-basis**：定义了在分配多余空间之前，项目占据的主轴空间

  - 默认为 auto，即项目的本来大小。

- **flex**：复合属性，相当于同时设置了 flex-grow，flex-shrink，flex-basis（后两个属性可选）子项目分配剩余空间时所占份数

  - 默认为 0 1 auto
  - 该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。
  - flex: 1（表示所有子项目将平分剩余空间）**flex:1 === flex:1 1 0px**

- **align-self**：允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。

  - 默认为 auto，表示继承父元素的 align-items 属性；如果没有父元素，则等同于 stretch

  - align-self: auto | flex-start | flex-end | center | baseline | stretch;
