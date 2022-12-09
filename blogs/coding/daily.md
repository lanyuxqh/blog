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

### 12.3 [字符串中第二大的数字](https://leetcode.cn/problems/second-largest-digit-in-a-string/)

- 题目
  - 给你一个混合字符串 s ，请你返回 s 中 第二大 的数字，如果不存在第二大的数字，请你返回 -1 。
- 方法一
  - 一次遍历，记录 第一大 first 和 第二大 second
  - 当前 num 大于 first，first 替换 second，num 替换 first (注意顺序！)
  - 当前 num 小于 first 且大于 second，num 替换 second（注意 num 等于 first 情况！）

```js
var secondHighest = function (s) {
  let first = -1,
    second = -1
  for (let c of s) {
    if (c >= '0' && c <= '9') {
      const num = c.charCodeAt() - '0'.charCodeAt()
      if (num > first) {
        second = first
        first = num
      } else if (num < first && num > second) {
        second = num
      }
    }
  }
  return second
}
```

### 12.4 [最接近目标价格的甜点成本](https://leetcode.cn/problems/closest-dessert-cost/)

- 题目
  - 返回最接近 target 的甜点成本。如果有多种方案，返回 成本相对较低 的一种。
- 方法
  - 深搜，遍历基料，枚举配料

```js
var closestCost = function (baseCosts, toppingCosts, target) {
  const n = baseCosts.length,
    m = toppingCosts.length
  const dfs = (sum, startIndex) => {
    if (sum === target) {
      res = target
      return
    }
    if (
      Math.abs(target - sum) < Math.abs(target - res) ||
      (Math.abs(target - sum) === Math.abs(target - res) && sum < res)
    ) {
      res = sum
    }
    for (let i = startIndex; i < m; i++) {
      for (let j = 1; j <= 2; j++) {
        dfs(sum + toppingCosts[i] * j, i + 1)
      }
    }
  }
  let res = Infinity
  for (let i = 0; i < n; i++) {
    dfs(baseCosts[i], 0)
  }
  return res
}
```
