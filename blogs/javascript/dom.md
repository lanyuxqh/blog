---
title: DOM
date: 2022-2-20
tags:
  - javascript
categories:
  - javascript
---

# 14. DOM

## 1、DOM 概念

**DOM**：

文档对象模型，提供对应的属性和方法，可以让 JS 操作页面中的 DOM 元素。

**DOM 树**：

- 文档：一个页面就是一个文档，document。
- 元素：页面中所有标签都是元素，element。
- 节点：页面中所有内容都是节点（文档、标签、属性、文本、注释等），node。
  - 文档节点：整个 HTML 文档。
  - 元素节点：HTML 标签。
  - 属性节点：元素的属性。
  - 文本节点：HTML 标签中的文本内容（包括标签之间的空格、换行）。

_DOM 将以上内容都看作是对象。_

**DOM 的用途**：

- 找元素节点
- 设置元素的属性值
- 设置元素的样式
- 动态创建和删除元素
- 事件的触发响应

## 2、DOM 操作

### 1）查找元素

**利用 DOM 提供的方法获取元素**

**1.getElementById()**：通过元素 ID 获取，返回第一次出现的元素。

```javascript
var div = document.getElementById('main')
```

**2.getElementsByTagName()**：通过标签名获取，返回元素对象的集合 HTMLCollection（以类数组的形式存储）。

```javascript
var divs = document.getElementsByTagName('div') // 所有
var lis = element.getElementsByTagName('li') // 父元素中
```

**3.getElementsByClassName()**：通过类名获取，返回元素对象的集合。

```js
var boxs = document.getElementsByClassName('box')
```

**4.querySelector()**： 通过选择器获取，接受一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，则返回 null。

```javascript
var div = document.querySelector('#main')
var body = document.querySelector('body')
var box = document.querySelector('.box')
```

**5.querySelectorAll()**：与 querySelector()类似，返回元素对象的集合。

```javascript
var lis = document.querySelectorAll('li')
var boxs = document.querySelectorAll('.box')
```

**6.获取其他特殊元素**：

```js
document.documentElement // html
document.body // body
document.all // 所有
```

**利用节点层级关系获取元素**

节点：node，构成 HTML 文档最基本的单元。至少拥有 nodeType（1：元素节点，2：属性节点，3：文本节点。）、nodeName、nodeValue。

**1.获取当前元素的父节点**

```javascript
element.parentNode
```

**2.获取当前元素的子节点**

```javascript
element.chilidNodes // 返回所有子节点，包括元素节点、文本节点等。（回车也会当做一个节点）
element.chlidren // 返回所有子元素节点，只返回元素节点

element.firstChild //  返回第一个子节点，包括元素节点、文本节点等
element.firstElementChild // 返回第一个子节点，只返回元素节点，兼容性问题
element.children[0] // 实际开发

element.lastChild // 返回最后一个子节点，包括元素节点、文本节点等
element.lastElementChild // 返回最后一个子节点，只返回元素节点，兼容性问题
element.children[element.children.length - 1] // 实际开发
```

**3.获取当前元素的兄弟节点**

```javascript
element.nextSibling // 返回下一个兄弟节点，包括元素节点、文本节点等。
element.nextElementSibling // 返回下一个兄弟节点，只返回元素节点，兼容性问题

element.previousSibling // 返回上一个兄弟节点，包括元素节点、文本节点等。
element.previousElementSibling // 返回上一个兄弟节点，只返回元素节点，兼容性问题
```

### 2）创建/添加/删除元素

**1.创建节点**

```javascript
document.createElement('h3') // 创建一个元素节点
document.createTextNode(String) // 创建一个文本节点
document.createAttribute('class') // 创建一个属性节点
```

**三种动态创建元素的区别**

- document.write()：直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘。
- element.innerHTML：将内容写入某个 DOM 节点，不会导致页面全部重绘 innerHTML 创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍复杂。
- document.createElement()：创建多个元素效率稍低一点点，结构更清晰。

**2.添加节点**

```javascript
element.appendChild(Node) // 往element内部最后面添加一个节点
elelment.insertBefore(newNode, existingNode) // 在element内部的中在existingNode前面插入newNode
```

**6.删除节点**

```javascript
element.removeChild(Node) // 删除当前节点下指定的子节点，删除成功返回该被删除的节点，否则返回null
```

**7.替换节点**

```javascript
element.replace(newNode, existingNode) // 使用指定的子节点替换已有的子节点
```

**8.复制节点**

```js
element.cloneNode() // 返回调用该方法的节点的一个副本，参数为空或false，浅拷贝，只复制标签不复制里面的内容，参数为true，深拷贝。
```

### 3）修改元素

**1.修改元素内容**

```javascript
element.innerHTML // 识别html标签，保留空格和换行，W3C标准，可读写
element.innerText // 不识别html标签，去除空格和换行，非标准，可读写，节点可见
element.textContent // 不识别html标签，保留空格和换行，非标准，可读写
```

**2.修改元素属性**

```javascript
element.属性 // 元素本身自带的属性
element.属性 = '值'

element.getAttribute('属性') // 程序员自定义的属性，兼容性问题
element.setAttribute('属性', '值')
element.removeAttribute('属性')

element.dataset.属性 // ，H5规定自定义属性以'data-'开头，获取H5自定义属性
```

**3.修改样式**

```js
element.style.backgroundColor=“#eea”;		// 行内样式
element.className="change"  // 类名样式，class为保留字，会覆盖类名
```
