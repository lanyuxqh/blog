---
title: 每日一题
date: 2022-11-30
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 11.30 [最大频率栈](https://leetcode.cn/problems/maximum-frequency-stack/)

- 题目
  - 设计一个类似堆栈的数据结构，将元素推入堆栈，并从堆栈中弹出**出现频率**最高的元素。
- 方法
  - **维护两个哈希表**，一个是记录 元素-频率，另一个记录 频率-元素的数组
  - 维护当前最大频率
  - push：获取当前元素最新频率，更新两个哈希表和最大频率
  - pop：删除当前最大频率的栈顶元素，更新两个哈希表和最大频率

```js
var FreqStack = function () {
  this.vf = new Map() // val-freq
  this.fv = new Map() // freq-[val]
  this.maxFreq = 0 // 记录当前最大频率
}

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
  const freq = (this.vf.get(val) || 0) + 1
  this.vf.set(val, freq)
  if (!this.fv.get(freq)) {
    this.fv.set(freq, [])
  }
  this.fv.get(freq).push(val)
  this.maxFreq = Math.max(this.maxFreq, freq)
}

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  const val = this.fv.get(this.maxFreq).pop()
  this.vf.set(val, this.vf.get(val) - 1)
  if (this.vf.get(val) === 0) {
    this.vf.delete(val)
  }
  if (this.fv.get(this.maxFreq).length === 0) {
    this.fv.delete(this.maxFreq)
    this.maxFreq -= 1
  }
  return val
}
```

### 12.1 [找到最近的有相同 X 或 Y 坐标的点](https://leetcode.cn/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate/)

- 题目
  - 找到最近的有相同 X 或 Y 坐标的点
- 方法
  - 枚举数组中所有点就完事了

```js
var nearestValidPoint = function (x, y, points) {
  let minDistance = Infinity,
    res = -1
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    if (p[0] === x || p[1] === y) {
      if (Math.abs(p[0] - x) + Math.abs(p[1] - y) < minDistance) {
        minDistance = Math.abs(p[0] - x) + Math.abs(p[1] - y)
        res = i
      }
    }
  }
  return res
}
```

### 12.2 [移动所有球到每个盒子所需的最小操作数](https://leetcode.cn/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/)

- 题目
  - 将所有小球移动到第 i 个盒子所需的 最小 操作数。
- 方法一
  - 模拟，暴力枚举，双重循环

```js
var minOperations = function (boxes) {
  const n = boxes.length
  let res = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    let cnt = 0
    for (let j = 0; j < n; j++) {
      if (boxes[j] === '1') {
        cnt += Math.abs(j - i)
      }
    }
    res[i] = cnt
  }
  return res
}
```

- 方法二
  - res[i] = res[i-1] + left - right left: i 左侧球数量，right: i 自身和右侧球数量
  - 先遍历一次得到 res[0]、初始 left 和 right，再遍历一次，依据递推公式计算 res[i]，同时更新 left 和 right

```js
var minOperations = function (boxes) {
  const n = boxes.length
  let left = boxes[0] === '1' ? 1 : 0,
    right = 0
  let res = new Array(n).fill(0)
  for (let i = 1; i < n; i++) {
    if (boxes[i] === '1') {
      right++
      res[0] += i
    }
  }
  for (let i = 1; i < n; i++) {
    res[i] = res[i - 1] + left - right
    if (boxes[i] === '1') {
      right--
      left++
    }
  }
  return res
}
```
