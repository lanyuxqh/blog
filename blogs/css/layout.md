---
title: 布局
date: 2021-12-11
tags:
  - css
categories:
  - css
---

# 布局

## 1、居中

### 1.1 水平居中

**1）行内元素**

**方案 1：块级父元素设置` text-align: center;`**

```css
.father {
  width: 200px;
  height: 200px;
  text-align: center;
}
```

**2）块级元素**

- 子元素定宽

**方案 1：子元素设置 `margin: 0 auto;`**

```css
.father {
  width: 200px;
  height: 200px;
}
.child {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
```

- 子元素不定宽

**方案 1：子元素转换成行内块级/行内元素，再给父元素设置 `text-align: center;`**

```css
.father {
  width: 200px;
  height: 200px;
  text-align: center;
}
.child {
  display: inline; /*inline-block*/
}
```

**方案 2：子元素使用绝对定位**

```css
.father {
    width: 200px;
    height: 200px;
    position: relative;
}
.child {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;  /* 1.必须知道自身的宽高 */
  	left： calc(50% - 50px);   /* 2.必须知道自身的宽高 */
	  transform: translateX(-50%); /* 3.可以在不知道宽高的情况下进行居中，百分比是相对于自身宽高的百分比 */
}
```

**方案 3：父元素使用 flex 布局**

```css
.father {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
}
.child {
  width: 100px;
  height: 100px;
}
```

### 1.2 垂直居中

**1）行内元素**

- 单行：

**方案 1：子元素设置`line-height`等于父元素的高**

```css
.father {
  width: 200px;
  height: 200px;
}
.child {
  line-height: 200px;
}
```

- 多行：

**方案 1：利用 table 属性，父元素设置`display:table-cell;`和`vertical-align: middle;`**

```css
.father {
  width: 200px;
  height: 200px;
  display: table-cell; /* 作为一个表格单元格显示（类似 <td> 和 <th> */
  vertical-align: middle; /* 把此元素放置在父元素的中部 */
}
```

**2）块级元素**

**方案 1：子元素使用绝对定位**

```css
.father {
    width: 200px;
    height: 200px;
    position: relative;
}
.child {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    margin-top: -50px;  /* 1.必须知道自身的宽高 */
    top: calc(50%-50px)  /* 2.必须知道自身的宽高 */
	  transform: translateY(-50%); /* 3.可以在不知道宽高的情况下进行居中，百分比是相对于自身宽高的百分比 */
}
```

**方案 2：父元素使用 flex 布局**

```css
.father {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
}
.child {
  width: 100px;
  height: 100px;
}
```

### 1.3 水平垂直居中

**方案 1：子元素使用绝对定位**

```css
.father {
  width: 200px;
  height: 200px;
  position: relative;
}
.child {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px; /*高度的一半*/
  margin-left: -50px; /*宽度的一半*/
}
.child {
  width: 100px;
  height: 100px;
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px) ；;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 兼容性问题 */
}
```

**方案 2：父元素使用 flex 布局**

```css
.father {
  display: flex;
  justify-content: center; /*定义body的元素水平居中*/
  align-items: center; /*定义body的元素垂直居中*/
}
```

**方案 3：子元素设置 绝对定位+`margin: auto;`**

margin: auto; 上边和下边无外边距，左右为水平方向居中，所以，其实 margin: auto;和 margin: 0 auto; 是一样的。

margin: auto 0; 不能实现垂直居中。这跟 auto 的默认行为有关，上下外边距如果被设置为 auto，最终会变成 0，就跟没有外边距是一样的效果。

**当 margin：auto 不生效时，想下居中原理`子元素是否占据(不单单指宽度)父容器的宽/高度`**

```css
.father {
  width: 200px;
  height: 200px;
  position: relative;
}
.child {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

## 2、两栏布局

### 2.1 左列定宽，右列自适应

**方案 1**： 左浮动+右 margin-left

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
        }
        .left {
            width: 300px;
            height: 500px;
            background-color: blue;
            float: left;
        }
        .right {
            height: 500px;
            background-color: red;
            margin-left: 300px;
        }

    </style>
    </head>

    <body>
        <div class="container">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>

</html>
```

**方案 2**： 左浮动+右父容器 BFC

```css
<!DOCTYPE html>
<html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          body {
              margin: 0;
          }

          .left {
              width: 300px;
              height: 500px;
              background-color: blue;
              float: left;
          }

          .right {
              overflow: hidden;
          }

          .content {
              height: 500px;
              background-color: red;
          }
      </style>
  </head>

  <body>
      <div class="container">
          <div class="left"></div>
          <div class="right">
              <div class="content"></div>
          </div>
      </div>
  </body>

</html>
```

**方案 3**： 左绝对定位+右 margin-left

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
        }
        .container{
            position: relative;
        }
        .left {
            width: 300px;
            height: 500px;
            background-color: blue;
            position: absolute;
            left: 0;
        }
        .right {
            height: 500px;
            background-color: red;
            margin-left: 300px;
        }

    </style>
    </head>

    <body>
        <div class="container">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>

</html>
```

**方案 4**： flex 布局，父容器 display: flex，右 flex: 1

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
        }
        .container{
            display: flex;
        }
        .left {
            width: 300px;
            height: 500px;
            background-color: blue;
        }
        .right {
            height: 500px;
            background-color: red;
            flex: 1;
        }

    </style>
    </head>

    <body>
        <div class="container">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>

</html>
```

**方案 5**： table 布局，父容器 width: 100%;display: table，左右 display: table-cell;

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
        }
        .container{
            width: 100%;
            display: table;
        }
        .left {
            width: 300px;
            height: 500px;
            background-color: blue;
            display: table-cell;
        }
        .right {
            height: 500px;
            background-color: red;
            display: table-cell;
        }

    </style>
    </head>

    <body>
        <div class="container">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>

</html>
```

**方案 6**： 左右都浮动，右父容器设置 width: 100%（因为空间不够跑到第二行），左设置 margin-right: -100%，右元素 margin-left。

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
        }
        .left {
            width: 300px;
            height: 500px;
            background-color: blue;
            float: left;
            margin-right: -100%;  /* margin-right: -300px; */
        }
        .right {
            width: 100%;
            float: left;
        }
        .content{
            height: 500px;
            background-color: yellow;
            margin-left: 300px;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="left"></div>
            <div class="right">
                <div class="content"></div>
            </div>
        </div>
    </body>

</html>
```

### 2.2 左列不定宽，右列自适应

**方案 1**： 左浮动+右父容器 BFC

**方案 2**： flex 布局，父容器 display: flex，右 flex: 1

**方案 3**： table 布局，父容器 width: 100%;display: table，左右 display: table-cell;

## 3、三栏布局

### 3.1 左中右布局

左右两栏宽度固定，中间自适应

**方案 1**： 左右浮动+中 margin-left、margin-right

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
            text-align: center;
        }
        .container div {
            height: 500px;
        }
        .left {
            width: 300px;
            background-color: blue;
            float: left;
        }
        .right {
            width: 300px;
            background-color: red;
            float: right;
        }
        .main{
            background-color: yellow;
            margin-left: 300px;
            margin-right: 300px;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="left">left</div>
            <div class="right">right</div>
            <div class="main">main</div>
        </div>
    </body>

</html>
```

**方案 2**： 左右浮动+中父容器 BFC

```css
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            text-align: center;
        }

        .container div {
            height: 500px;
        }

        .left {
            width: 300px;
            background-color: blue;
            float: left;
        }

        .right {
            width: 300px;
            background-color: red;
            float: right;
        }

        .main {
            overflow: hidden;
        }

        .content {
            background-color: yellow;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="left">left</div>
        <div class="right">right</div>
        <div class="main">
            <div class="content">main</div>
        </div>
    </div>
</body>

</html>
```

**方案 3**： 左右绝对定位+中 margin-left、margin-right

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
            text-align: center;
        }
        .container{
            position: relative;
        }
        .container div {
            height: 500px;
        }
        .left {
            width: 300px;
            background-color: blue;
            position: absolute;
            left: 0;
        }
        .right {
            width: 300px;
            background-color: red;
            position: absolute;
            right: 0;
        }
        .main{
            background-color: yellow;
            margin-left: 300px;
            margin-right: 300px;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="left">left</div>
            <div class="right">right</div>
            <div class="main">main</div>
        </div>
    </body>

</html>
```

**方案 4**： flex 布局，父容器 display: flex，中 flex: 1

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
            text-align: center;
        }
        .container{
            height: 500px;
            display: flex;
        }
        .left {
            width: 300px;
            background-color: blue;
        }
        .right {
            width: 300px;
            background-color: red;
        }
        .main{
            background-color: yellow;
            flex: 1;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="left">left</div>
            <div class="main">main</div>
            <div class="right">right</div>
        </div>
    </body>

</html>
```

**方案 5**： table 布局，父容器 width: 100%;display: table，左中右 display: table-cell;

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
            text-align: center;
        }
        .container{
            width: 100vw;
            height: 500px;
            display: table;
        }
        .left {
            width: 300px;
            background-color: blue;
            display: table-cell;
        }
        .right {
            width: 300px;
            background-color: red;
            display: table-cell;
        }
        .main{
            background-color: yellow;
            display: table-cell;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="left">left</div>
            <div class="main">main</div>
            <div class="right">right</div>
        </div>
    </body>

</html>
```

**方案 6**： grid 布局，父容器 display: grid; grid-template-columns: 300px auto 300px;

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
            text-align: center;
        }
        .container{
            width: 100%;
            height: 500px;
            display: grid;
            grid-template-columns: 300px auto 300px;
        }
        .left {
            background-color: blue;
        }
        .right {
            background-color: red;
        }
        .main{
            background-color: yellow;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="left">left</div>
            <div class="main">main</div>
            <div class="right">right</div>
        </div>
    </body>

</html>
```

**方案 7**： 圣杯布局

目的

- 两侧内容宽度固定，中间内容宽度自适应
- 中间一栏最先加载，渲染
- 步骤
  - 所有元素都是 float，且有一致的高度；
  - main 的宽度是 100%，所以`left`和`right`被“挤”到了第二行
  - 将`left`放置到之前预留出的位置上，使用`margin-left: -100%;`将`right`放置到之前预留出的位置上，使用`margin-left: -100px;`
  - 设置父容器的`padding: 0 200px 0 180px;`
  - 使用`position: relative`和`left: -200px;`将`left`的位置在原有位置基础上左移 200px，使用`position: relative`和`right: -100px;`将`right`的位置在原有位置基础上右移 100px

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body {
            margin: 0;
            text-align: center;
        }
        .container {
            padding: 0 100px 0 200px;
        }
        .container div {
            height: 500px;
            float: left;
        }
        .main {
            width: 100%;
            background-color: yellow;
        }
        .left {
            width: 200px;
            background-color: blue;
            margin-left: -100%;
            position: relative;
            left: -200px;
        }
        .right {
            width: 100px;
            background-color: red;
            margin-left: -100px;
            position: relative;
            right: -100px;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="main">main</div>
            <div class="left">left</div>
            <div class="right">right</div>
        </div>
    </body>

</html>
```

**方案 8**： 双飞翼布局

- 步骤
  - 所有元素都是 float，且有一致的高度；
  - main 的宽度是 100%，所以`left`和`right`被“挤”到了第二行
  - 将`left`放置到之前预留出的位置上，使用`margin-left: -100%;`将`right`放置到之前预留出的位置上，使用`margin-left: -100px;`
  - 在 main 盒子的内容部分加入一个新的盒子 content，设置 content 的左右 margin；

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body{
            margin: 0;
            text-align: center;
        }
        .container div {
            float: left;
            height: 500px;
        }
        .main{
            width: 100%;
            background-color: yellow;
        }
        .main-content{
            margin: 0 100px 0 200px;
        }
        .left {
            width: 200px;
            background-color: blue;
            margin-left: -100%;
        }
        .right {
            width: 100px;
            background-color: red;
            margin-left: -100px;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="main">
                <div class="main-content">
                    main
                </div>
            </div>
            <div class="left">left</div>
            <div class="right">right</div>
        </div>
    </body>

</html>
```

**区别**： 圣杯布局与双飞翼布局所完成的界面大体是一样的，但是在解决 main 部分的文本覆盖问题中有了不一样的解决方法。圣杯布局中，给父容器设置 padding，然后 left 与 right 盒子移动相应的距离，使得三个盒子可以依次排列且布满整个页面；而双飞翼布局中，在 main 盒子的内容部分加入一个新的盒子 content，在解决覆盖问题时，只需要改变 content 盒子的左右边距即可。

### 3.2 上中下布局

**方案 1**： 中 min-height: calc(100% - 100px); padding-bottom: 100px; 下 margin-top: -100px;

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body {
            margin: 0;
            text-align: center;
        }
        .container {
            width: 100vw;
            height: 100vh;
        }
        .header {
            height: 100px;
            background-color: blue;
        }
        .main {
            background-color: yellow;
            min-height: calc(100% - 100px);
            box-sizing: border-box;
            padding-bottom: 100px;
        }
        .footer {
            height: 100px;
            background-color: red;
            margin-top: -100px;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="header">header</div>
            <div class="main">main</div>
            <div class="footer">footer</div>
        </div>
    </body>

</html>
```

**方案 2**： 上中下都绝对定位，缺陷：中间会消失

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body {
            margin: 0;
            text-align: center;
        }
        .container {
            height: 100vh;
            position: relative;
        }
        .container div{
            width: 100vw;
            position: absolute;
        }
        .header {
            height: 100px;
            background-color: blue;
            top: 0;
        }
        .main {
            background-color: yellow;
            top: 100px;
            bottom: 100px;
            overflow: auto;
        }
        .footer {
            height: 100px;
            background-color: red;
            bottom: 0;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="header">header</div>
            <div class="main">main</div>
            <div class="footer">footer</div>
        </div>
    </body>

</html>
```

**方案 3**： flex 布局，父容器 display: flex; flex-direction: column; 中 flex: 1;

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body {
            margin: 0;
            text-align: center;
        }
        .container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .header {
            height: 100px;
            background-color: blue;
        }
        .main {
            background-color: yellow;
            flex: 1;
        }
        .footer {
            height: 100px;
            background-color: red;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="header">header</div>
            <div class="main">main</div>
            <div class="footer">footer</div>
        </div>
    </body>

</html>
```

**方案 4**： table 布局，父容器 display: table，上中下 display: table-row;

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body {
            margin: 0;
            text-align: center;
        }
        .container {
            width: 100%;
            height: 100vh;
            display: table;
        }
        .container div{
            display: table-row;
        }
        .header {
            height: 100px;
            background-color: blue;
        }
        .main {
            background-color: yellow;
        }
        .footer {
            height: 100px;
            background-color: red;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="header">header</div>
            <div class="main">main</div>
            <div class="footer">footer</div>
        </div>
    </body>

</html>
```

**方案 4**： grid 布局，父容器 display: grid; grid-template-rows: 100px auto 100px;

```css
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body {
            margin: 0;
            text-align: center;
        }
        .container {
            width: 100%;
            height: 100vh;
            display: grid;
            grid-template-rows: 100px auto 100px;
        }
        .header {
            height: 100px;
            background-color: blue;
        }
        .main {
            background-color: yellow;
        }
        .footer {
            height: 100px;
            background-color: red;
        }
    </style>
    </head>

    <body>
        <div class="container">
            <div class="header">header</div>
            <div class="main">main</div>
            <div class="footer">footer</div>
        </div>
    </body>

</html>
```

## 4、品字布局

<img src="https://cdn.nlark.com/yuque/0/2021/png/1500604/1633609587312-4de73cfb-5ab3-45bb-bb09-869d276f3ae5.png" alt="image.png"/>

**方案 1**： box1 居中，box2、box3 浮动、margin-left。（需要知道盒子宽高）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 40px;
        color: white;
      }

      .box1 {
        background-color: red;
        margin: 0 auto;
      }

      .box2 {
        background-color: green;
        float: left;
        margin-left: 50%;
      }

      .box3 {
        background-color: blue;
        float: left;
        margin-left: -200px;
      }
    </style>
  </head>

  <body>
    <div class="box1">1</div>
    <div class="box2">2</div>
    <div class="box3">3</div>
  </body>
</html>
```

**方案 2**： box1 居中，box2、box3 设置为行内元素、margin-left。（类似方案 1，需要知道盒子宽高）

## 5、九宫格布局

<img src="https://cdn.nlark.com/yuque/0/2021/png/1500604/1633610665378-f963f052-32d2-4e58-aa8d-a9d351acd816.png" alt="image.png"/>

核心：让 div 换行

**方案 1**： flex

```html
<!DOCTYPE html>
<html>
  <style>
    body {
      margin: 0;
      padding: 0;
    }

    .box {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-wrap: wrap;
    }

    .box div {
      width: 30%;
      height: 30%;
      margin-right: 5%;
      margin-bottom: 5%;
      border-radius: 5px;
      background: skyblue;
      text-align: center;
    }

    .box div:nth-of-type(3n) {
      margin-right: 0;
    }

    .box div:nth-of-type(n + 7) {
      margin-bottom: 0;
    }
  </style>

  <body>
    <div class="box">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  </body>
</html>
```

**方案 2**： grid，设置列宽和行高，设置间距

```html
<!DOCTYPE html>
<html>
  <style>
    body {
      margin: 0;
      padding: 0;
    }

    .box {
      width: 100vw;
      height: 100vh;
      display: grid;
      grid-template-columns: 30% 30% 30%;
      grid-template-rows: 30% 30% 30%;
      gap: 5%;
    }

    .box div {
      border-radius: 5px;
      background: skyblue;
      text-align: center;
    }
  </style>

  <body>
    <div class="box">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  </body>
</html>
```

**方案 3**： table，设置 row 和 cell，设置间隔

```html
<!DOCTYPE html>
<html>
  <style>
    body {
      margin: 0;
      padding: 0;
    }

    .box {
      width: 100vw;
      height: 100vh;
      display: table;
      border-spacing: 10px;
    }

    .box .row {
      display: table-row;
    }

    .row div {
      width: 30%;
      height: 30%;
      border-radius: 5px;
      background: skyblue;
      text-align: center;
      display: table-cell;
    }
  </style>

  <body>
    <div class="box">
      <div class="row">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <div class="row">
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
      <div class="row">
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
    </div>
  </body>
</html>
```

**方案 4**： float

```html
<!DOCTYPE html>
<html>
  <style>
    body {
      margin: 0;
      padding: 0;
    }

    .box {
      width: 100vw;
      height: 100vh;
    }

    .box div {
      width: 30%;
      height: 30%;
      margin-right: 5%;
      margin-bottom: 5%;
      border-radius: 5px;
      background: skyblue;
      text-align: center;
      float: left;
    }

    .box div:nth-of-type(3n) {
      margin-right: 0;
    }

    .box div:nth-of-type(n + 7) {
      margin-bottom: 0;
    }
  </style>

  <body>
    <div class="box">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  </body>
</html>
```
