---
title: 动画
date: 2022-3-10
tags:
  - css
categories:
  - css
---

# 动画

## 1、基本用法

**举例**： 一个小球从向右匀速移动 200px，然后移动回来，再移动过去，最后停留在 200px 处。

```css
div {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #0ff;
  animation: move 2s linear 3 alternate both;
}
@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(200px, 0);
  }
}
```

## 2、transform、transition 和 animation 的区别

- **transform**： 用于元素旋转 rotate、缩放 scale、移动 translate、倾斜 skew 等效果。

- **transition**：

  - 强调过渡，用于较为单一的动画；

  - 只有两个状态，开始状态和结束状态；

  - 需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画；

  - transition 和 js 的结合更强大，js 设定要变化的样式，transition 负责动画效果。

- **animation**：

  - 强调流程与控制，用`@keyframes`来控制 CSS 动画序列中的中间步骤，一般用于较为复杂、有中间态的动画；

  - 可以设定每一帧的样式和时间；

  - 可以在页面加载时自动启动，可以循环；

  - animation 与 js 的交互不是很紧密。

## 3、实现动画的方式

### 3.1 Html

- canvas、svg

```html
<!--实现圆缩放-->
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title></title>
  </head>

  <body>
    <canvas id="myCanvas" width="500" height="500" style="border: 1px solid pink;"></canvas>
    <!--每10毫秒重新绘制一次图形-->
    <button onclick="tt=setInterval(action ,10);">开始</button>
    <button onclick="clearInterval(tt);">停止</button>

    <script type="text/javascript">
      var canvas = document.getElementById('myCanvas')
      var ctx = canvas.getContext('2d')
      var dir = 0 // 半径
      var per = 1 // 每次增加的半径值
      function action() {
        ctx.clearRect(0, 0, 500, 500) // 清除Canvas的内容
        ctx.fillStyle = 'lightgreen' // 设置颜色
        ctx.beginPath() // 开始新的绘画
        ctx.arc(250, 250, dir, 0, Math.PI * 2) // 绘制圆
        ctx.closePath() // 结束绘画
        ctx.fill() // 填色
        dir = dir + per
        if (dir == 0 || dir == 250) {
          // 判断圆半径的大小
          per = per * -1 // 往相反的方向运动
        }
      }
    </script>
  </body>
</html>
```

### 3.2 Css3

- transition、animation

### 3.3 JavaScript

- setTimeout、setInterval
- requestAnimationFrame API

```html
<!--实现进度条-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>progress</title>
  </head>

  <body>
    <div class="progress" style="width: 0px; height:20px; background-color:pink;">0%</div>
    <script>
      var p = document.getElementsByClassName('progress')[0]
      // setInterval
      p.onclick = function () {
        var timer = setInterval(function f() {
          if (parseInt(p.style.width) < 300) {
            p.style.width = parseInt(p.style.width) + 3 + 'px'
            p.innerHTML = parseInt(p.style.width) / 3 + '%'
          } else {
            clearInterval(timer)
          }
        }, 17)
      }
      // setTimeout
      p.onclick = function () {
        var timer = setTimeout(function f() {
          if (parseInt(p.style.width) < 300) {
            p.style.width = parseInt(p.style.width) + 3 + 'px'
            p.innerHTML = parseInt(p.style.width) / 3 + '%'
            timer = setTimeout(f, 17)
          } else {
            clearTimeout(timer)
          }
        }, 17)
      }
      // requestAnimationFrame
      p.onclick = function () {
        var timer = requestAnimationFrame(function f() {
          if (parseInt(p.style.width) < 300) {
            p.style.width = parseInt(p.style.width) + 3 + 'px'
            p.innerHTML = parseInt(p.style.width) / 3 + '%'
            timer = requestAnimationFrame(f)
          } else {
            cancelAnimationFrame(timer)
          }
        })
      }
    </script>
  </body>
</html>
```

**setTimeout/setInterval 和 requestAnimationFrame 区别**：

- **回调函数执行时机**： `setTimeout`的执行时间并不是确定的； `setTimeout`只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同，容易导致丢帧。`requestAnimationFrame`最大的优势是**由系统来决定回调函数的执行时机**，如果屏幕刷新率是 60Hz，那么回调函数就每 16.7ms 被执行一次，**它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次**，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
- **CPU 节能** ：使用`setTimeout`实现的动画，当页面被隐藏或最小化时，`setTimeout `仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而`requestAnimationFrame`则完全不同，当页面处于未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的`requestAnimationFrame`也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。
- **函数节流** ：在高频率事件(`resize`,`scroll`等)中，为了防止在一个刷新间隔内发生多次函数执行，使用`requestAnimationFrame`可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次是没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。
