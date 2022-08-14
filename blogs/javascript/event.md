---
title: 事件
date: 2022-2-27
tags:
  - javascript
categories:
  - javascript
---

# 事件

## 1、事件概念

**事件**：

事件是用户操作网页时发生的交互动作，比如 click/move， 事件除了用户触发的动作外，还可以是文档加载，比如窗口滚动和大小调整。可以理解为触发-响应机制。

**事件三要素**：

- 事件源：被触发的对象。
- 事件类型：如何触发。
- 事件处理程序：响应什么。通过一个函数赋值的方式完成。

**执行事件的步骤**：

- 获取事件源（DOM）
- 绑定事件
- 添加事件处理程序

**常见的事件类型**：

**1.键盘事件**：

| 事件       | 发生时机     |
| ---------- | ------------ |
| onkeydown  | 键盘按键按下 |
| onkeypress | 键盘按键按住 |
| onkeyup    | 键盘按键松开 |

- **event 参数** 该参数为 `KeyboardEvent` 事件对象，其中包含按键相关的一些属性。
  - `type`：事件类型
  - `key`：表示按下的键盘内容是什么即键值，按下字母 'p' 时，值为'p'
  - `code`：表示键盘代码，按下字母 'p' 时，值为 'KeyP'
  - `keyCode`：整数，表示键码，每个键都有唯一的键码，字母 'p' 的键码为 80
  - `altKey`：布尔值，表示此时的 alt 键是否也按下
  - `ctrKey`：布尔值，表示此时的 ctr 键是否也按下
  - `shiftKey`：布尔值，表示此时的 shift 键是否也按下
  - `metaKey`：布尔值，windows 平台表示 Window 键是否同时按下，mac 表示 Command 键是否同时按下
  - `repeat`: 布尔值，如果一个键一直被按着，则其值为 true，表示重复

**2.鼠标事件**：

| 事件        | 发生时机                                       |
| ----------- | ---------------------------------------------- |
| onclick     | 鼠标单击对象时触发的事件                       |
| ondblclick  | 鼠标双击对象时触发的事件                       |
| onmousedown | 鼠标按钮被按下时触发的事件                     |
| onmousemove | 鼠标被移动时触发的事件                         |
| onmouseout  | 鼠标离开监听该事件的元素或子元素时触发的事件   |
| onmouseover | 鼠标移动到监听该事件的元素或子元素时触发的事件 |
| onmouseup   | 鼠标按键被松开时触发的事件                     |

- 触发时的参数为 MouseEvent 对象类型，MouseEvent 对象中包含下面比较有用的属性：
  - `type`: 事件类型
  - `button`：整型，触发鼠标事件时按下的按钮编号
  - `buttons`：整型，触发鼠标事件时弹起来的按钮编号
  - `clientX`：鼠标指针在 DOM 内容区的 X 坐标
  - `clientY`：鼠标指针在 DOM 内容区的 Y 坐标
  - `offsetX`：鼠标指针相对父节点填充边缘的 X 坐标
  - `offsetY`: 鼠标指针相对父节点填充边缘的 Y 坐标
  - `screenX`: 鼠标指针在全局屏幕的 X 坐标
  - `screenY`: 鼠标指针在全局屏幕的 Y 坐标
  - `pageX`: 鼠标指针在整个 DOM 内容（包括分页）的 X 坐标
  - `pageY`: 鼠标指针在整个 DOM 内容（包括分页）的 Y 坐标
  - `altKey`: 布尔值，表示此时的 alt 键是否也按下
  - `ctrKey`: 布尔值，表示此时的 alt 键是否也按下
  - `shiftKey`: 布尔值，表示此时的 shift 键是否也按下
  - `metaKey`: 布尔值，windows 平台表示 Window 键是否同时按下，mac 表示 Command 键是否同时按下

**3.焦点事件**：

不是所有元素都有焦点事件，只有可交互性的元素才有，比如表单元素，a 标签。页面中只能有一个元素有焦点，一个聚焦，另一个就失焦，默认在 document。

| 事件    | 发生时机 |
| ------- | -------- |
| onfocus | 聚焦     |
| onblur  | 失焦     |

## 2、事件绑定/解绑

**1.传统方式绑定**

- 内联

```js
<button onclick="handleClick()">button</button>
```

- 对象.事件

```js
;<button id="btn">button</button>
document.getElementById('btn').onclick = function () {
  alert('click')
}
```

**2.事件监听绑定**

- addEventListener

```js
;<button id="btn">button</button>
document.getElementById('btn').addEventListener('click', handleClick, false)
```

- attachEvent（ie9 以前的版本）

```js
;<button id="btn">button</button>
document.getElementById('btn').attachEvent('onclick', handleClick)
```

**区别**：

- addEventListener，同一个元素可以添加多个相同事件。对象.事件，只能设置一个处理函数，后面会覆盖前面。
- addEventListener 支持冒泡和捕获。对象.事件和 attachEvent 只支持冒泡，不支持捕获。

**事件解绑**：

用什么方式绑定事件，就应该用对应的方式解绑事件

- 对象.on 事件类型=null;

- 对象.removeEventListener("没有 on 的事件类型",函数名字,false);
- 对象.detachEvent("on 事件类型",函数名字);

**兼容性代码**：

```js
//绑定事件
function addEvent(element, type, fn) {
  if (element.addEventListener) {
    element.addEventListener(type, fn, false)
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, fn)
  } else {
    element['on' + type] = fn
  }
}

//解绑事件
function removeEvent(element, type, fnName) {
  if (element.removeEventListener) {
    element.removeEventListener(type, fnName, false)
  } else if (element.detachEvent) {
    element.detachEvent('on' + type, fnName)
  } else {
    element['on' + type] = null
  }
}
```

**封装绑定事件处理函数**

```js
function addEvent(ele, type, selector, cb) {
  // cb：回调函数
  if (!cb) {
    cb = selector
    selector = null
  }
  ele.addEventListener(type, function (e) {
    // e.stopPropagation()
    const target = e.target
    if (selector) {
      // matches方法用来判断是不是点击了li，也可以用来判断是不是点击了某个选择器。也可以用e.target.nodeName==='LI'或e.target.constructor===HTMLLIElement来判断是不是点击了li元素
      if (target.matches(selector)) {
        cb.call(target, e)
      }
    } else {
      cb.call(target, e)
    }
  })
}
```

## 3、事件流

**事件流**：

从页面中接收事件的顺序。事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即 DOM 事件流。

**事件流三阶段**

- 捕获阶段：`window` 往事件触发处传播，遇到注册的捕获事件会触发。
- 当前目标阶段：传播到事件触发处。
- 冒泡阶段：从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发。
  - 事件冒泡本身的特性会带来坏处（阻止冒泡），也会带来好处（事件委托）。

`addEventListener()`和 `removeEventListener()` 第三个参数：true：在捕获阶段调用事件处理程序；false 或空：在冒泡阶段调用事件处理程序（一般用 false）

**一个 DOM 元素绑定多个事件时，先发生捕获事件，后发生冒泡事件**。同一个元素的 onclick 绑定的冒泡和 addEventListener 的冒泡，绑定越早执行越早。

## 4、事件对象

event 对象代表事件的状态，比如键盘按键的状态、鼠标的位置等。事件发生后，跟事件相关的一系列信息数据的集合都放在这个对象中。

event 是一个形参，系统帮我们设定为事件对象，不需要传递实参过去。当我们绑定事件时，event 对象会被系统自动创建，并一次传递给事件处理函数。

兼容性：e = e || window.event

**常见的事件对象的属性和方法**：

- e.target：返回的是触发事件的对象

  - 兼容性：target = e.target || e.srcElement

- e.currentTarget：约等于 this（this 返回的是绑定事件的对象）
- e.type：返回事件类型
- e.preventDefault()：阻止默认行为（普通浏览器）
  - e.returnValue：ie678
  - return false：没有兼容性问题，return 后面的代码不执行，仅限于传统绑定方式
- e.stopPropagation()：阻止事件冒泡。防止对事件流中**所有后续节点**中的事件侦听器进行处理。
  - e.cancelbubble = true：ie678
  - e.stopImmediatePropagation()：阻止事件冒泡。防止对事件流中**当前节点和所有后续节点**中的事件侦听器进行处理

## 5、事件委托

**背景**：

给每一条删除按钮都添加点击事件的回调。存在的问题：首先，每个函数都是对象，都会占用内存，内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的 DOM 访问次数，会延迟整个页面的交互就绪时间。

**原理**：

不是每个子节点单独设置事件监听器，而是事件监听器设置在父节点上，然后利用**浏览器事件冒泡**机制影响设置每个子节点。

**例子**：

```js
var ul = document.getElementsByTagName('ul')
// 给所有li统一设置事件处理程序
ul.onclick = function (e) {
  var e = e || window.event
  var target = e.target || e.srcElement
  if (target.nodeName.toLowerCase() === 'li') {
    console.log(target.innerHTML)
  }
}
```

**优点**：

- 减少事件注册，节省内存。
- 简化了 dom 节点更新时，相应事件的更新（绑定或解绑）。

**缺点**：

- 事件委托基于冒泡，对于不冒泡的事件不支持。比如 focus、blur 之类的事件。
- mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，性能消耗高。
- 层级过多，冒泡过程中，可能会被某层阻止掉。

**适合用事件委托的事件**：

click，mousedown，mouseup，keydown，keyup，keypress

**不适合用事件委托的事件**：

mouseover/mouseout/mousemove，每次都要计算它的位置，非常不好把控。focus，blur 之类的，本身就没用冒泡的特性。
