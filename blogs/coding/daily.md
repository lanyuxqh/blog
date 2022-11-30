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


