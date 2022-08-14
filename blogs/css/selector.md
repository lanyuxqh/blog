---
title: 选择器
date: 2021-12-8
tags:
  - css
categories:
  - css
---

# 选择器

CSS 选择器规定了 CSS 规则会被应用到哪些元素上。

## 1、基础选择器

- id 选择器

```
#box{
	color:red;
}
```

- 类选择器

```
.box{
	color:red;
}
```

- 标签选择器

```
div{
	color:red;
}
```

- 属性选择器

```
a[href]{
	color: red;
}

[attr]：该选择器选择包含 attr 属性的所有元素
[attr=val]：该选择器仅选择 attr 属性被赋值为 val 的所有元素
[attr~=val]：该选择器仅选择具有 attr 属性的元素，而且要求 val 值是 attr 值包含的被空格分隔的取值列表里中的一个。
[attr|=val] : 选择 attr 属性的值是 val 或值以 val- 开头的元素
[attr^=val] : 选择 attr 属性的值以 val 开头（包括 val）的元素。
[attr$=val] : 选择 attr 属性的值以 val 结尾（包括 val）的元素。
[attr*=val] : 选择 attr 属性的值中包含子字符串 val 的元素。
```

- 通配符选择器

```
*{
	margin:0;
	padding:0;
}
```

## 2、组合选择器

- 后代选择器

```
<div class="page">
    <div class="inner">
        <p>我是随便写的</p>
    </div>
    <p>我也是随便写的</p>
</div>

.page p{
	color: red;
}
```

- 子选择器

```
.page >p{
	color: red;
}
```

- 相邻兄弟选择器

```
h1+p{
	color: red;
}
```

- 通用兄弟选择器

```
h1～p{
	color: red;
}
```

- 交集选择器

```
.list-item.active{
	color: red;
}
```

- 并集选择器

```
h1,h2,p{
	color: red;
}
```

## 3、伪类选择器

- 标记状态的伪类

```
a:link 选取未访问过的超链接
a:visited 选取访问过的连接
a:hover 选取鼠标悬浮的元素
a:active 选取点中的元素
a:focus 选取获取焦点的元素
```

- 筛选功能的伪类

```
:empty 选取没有子元素的元素
:checked 选取勾选状态下的input 元素（只对 radio 和 checkbox 有效）
:disabled 选取禁用的表单元素
:first-child 选取当前选择器下的第一个元素
:last-child 选取当前选择器下的最后一个元素
:nth-child(an+b) 选取指定位置的元素
:nth-last-child(an+b) 和上面类似,不过从后面选取
:only-child 选取元素唯一的子元素,如果元素的父元素只有它一个子元素就会生效,如果还有其他的兄弟元素,则不生效
:first-of-type 选取父元素下某个类型的第一个子元素
:last-of-type 选取父元素下某个类型的最后一个子元素
:only-of-type 选取唯一的某个元素类型。如果元素的父元素只有它一个当前类型的子元素就会生效。
```

## 4、伪元素选择器

```
::first-line 元素的第一行
::first-letter 元素的首字母或第一个文字
::before 在某个元素之前插入内容
::after 在某个元素之后插入内容
::selection 光标选中的元素
```

**伪类和伪元素**：

伪类：通过在元素选择器上加⼊伪类改变元素状态。它是已有元素上添加类别的，不会产生新的元素。

伪元素：在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。

## 5、选择器优先级

|              选择器              |   权重   |
| :------------------------------: | :------: |
|           ! important            | Infinity |
|             内联样式             |   1000   |
|            id 选择器             |   100    |
| 类选择器、属性选择器、伪类选择器 |    10    |
|     标签选择器、伪元素选择器     |    1     |
|     通配符选择器、继承选择器     |    0     |

**优先级的计算规则**：

优先级是由 `A` 、`B`、`C`、`D` 的值来决定的，其中它们的值计算规则如下：

1. 如果存在内联样式，那么 `A = 1`, 否则 `A = 0`;
2. `B` 的值等于 `ID选择器` 出现的次数;
3. `C` 的值等于 `类选择器` 和 `属性选择器` 和 `伪类` 出现的总次数;
4. `D` 的值等于 `标签选择器` 和 `伪元素` 出现的总次数 。

```
#nav-global > ul > li > a.nav-link    A、B、C、D 可以简记作：(0, 1, 1, 3)。
```
