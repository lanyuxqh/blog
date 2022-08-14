---
title: 6. 栈、队列、单调栈、单调队列
date: 2021-11-3
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 6.1 [用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

题目：标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。

- 方法一
  - 双栈：in-push，out-pop/peek
  - 时间复杂度：O(1)
  - 空间复杂度：O(n)

```javascript
var MyQueue = function () {
  this.in = []
  this.out = []
}

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.in.push(x)
}

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (!this.out.length) {
    this.in2out()
  }
  return this.out.length ? this.out.pop() : -1
}

MyQueue.prototype.in2out = function () {
  while (this.in.length) {
    this.out.push(this.in.pop())
  }
}

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (!this.out.length) {
    this.in2out()
  }
  return this.out[this.out.length - 1]
}

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return !this.in.length && !this.out.length
}

// var obj = new MyQueue()
// obj.push(1)
// obj.push(2)
// obj.push(3)
// obj.push(4)
// console.log(obj.pop());
// console.log(obj.peek());
// console.log(obj.empty());
```

### 6.2 [用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

题目：队列的基本操作-- 也就是 push to back, peek/pop from front, size, 和 is empty 这些操作是合法的。

- 方法一

  - 双队列，主队列，辅助队列

    也可以用一个队列，移到队尾

  - 时间复杂度：O(1)

  - 空间复杂度：O(n)

```javascript
var MyStack = function () {
  this.q1 = []
  this.q2 = []
}

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  while (this.q1.length) {
    this.q2.push(this.q1.shift())
  }
  this.q1.push(x)
  while (this.q2.length) {
    this.q1.push(this.q2.shift())
  }
}

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  return this.q1.shift()
}

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  return this.q1[0]
}

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return !this.q1.length
}

// var obj = new MyStack();
// obj.push(1);
// obj.push(2);
// obj.push(3);
// obj.push(4);
// console.log(obj.pop());
```

### 6.3 [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

题目：给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

- 方法一
  - 小技巧：在匹配左括号的时候，右括号先入栈，就只需要比较当前元素和栈顶相不相等就可以了，比左括号先入栈代码实现要简单的多了！
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var isValid = function (s) {
  const stack = []
  const map = { '(': ')', '[': ']', '{': '}' }
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '(' || c === '[' || c === '{') stack.push(map[c])
    else {
      if (stack.pop() !== c) return false
    }
  }
  return !stack.length
}
```

### 6.4 [删除字符串中的所有相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

题目：

- 方法一
  - 栈，消消乐
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var removeDuplicates = function (s) {
  const stack = []
  for (const c of s) {
    if (stack[stack.length - 1] === c) {
      stack.pop()
    } else {
      stack.push(c)
    }
  }
  return stack.join('')
}

// 直接在字符串上操作
var removeDuplicates = function (s) {
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && s[i] === s[i - 1]) {
      s = s.substring(0, i - 1) + s.substring(i + 1)
      i -= 2
    }
  }
  return s
}
```

### 6.5 [逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

题目：逆波兰表达式，是一种后缀表达式，所谓后缀就是指算符写在后面**。后缀表达式对计算机来说是非常友好的**。

- 方法一
  - 逆波兰表达式主要有以下两个优点：去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + \* 也可以依据次序计算出正确结果。适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中。
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var evalRPN = function (tokens) {
  const stack = []
  const map = {
    '+': (a, b) => a * 1 + b * 1, // 直接+，会变成字符串拼接
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (a / b) | 0 // 整除
  }
  for (const token of tokens) {
    if (token in map) {
      const b = stack.pop()
      const a = stack.pop()
      stack.push(map[token](a, b))
    } else {
      stack.push(token)
    }
  }
  return stack.pop()
}
```

### 6.6 [滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

题目：

- 方法一
  - 暴力---超时
  - 时间复杂度：O(n\*k)
  - 空间复杂度：O(n)

```javascript
var maxSlidingWindow = function (nums, k) {
  let res = []
  for (let i = 0; i <= nums.length - k; i++) {
    let max = -Infinity
    for (let j = 0; j < k; j++) {
      if (nums[i + j] > max) max = nums[i + j]
    }
    res.push(max)
  }
  return res
}
```

- 方法二
  - 优先队列，大顶堆，如果堆顶元素不在窗口里，就移除
  - 时间复杂度：O(nlogk)
  - 空间复杂度：O(n)

```javascript
// js优先队列定义
function PriorityQueue(compareFn) {
  this.compareFn = compareFn
  this.queue = []
}

// 添加
PriorityQueue.prototype.push = function (item) {
  this.queue.push(item)
  let index = this.queue.length - 1
  let parent = Math.floor((index - 1) / 2)
  // 上浮
  while (parent >= 0 && this.compare(parent, index) > 0) {
    // 交换
    ;[this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]]
    index = parent
    parent = Math.floor((index - 1) / 2)
  }
}

// 获取堆顶元素
PriorityQueue.prototype.top = function () {
  return this.queue[0]
}

// 移除堆顶元素
PriorityQueue.prototype.pop = function () {
  const ret = this.queue[0]
  // 把最后一个节点移到堆顶
  this.queue[0] = this.queue.pop()

  let index = 0
  // 左子节点下标，left + 1 就是右子节点下标
  let left = 1
  let selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left

  // 下沉
  while (selectedChild !== undefined && this.compare(index, selectedChild) > 0) {
    // 交换
    ;[this.queue[index], this.queue[selectedChild]] = [this.queue[selectedChild], this.queue[index]]
    index = selectedChild
    left = 2 * index + 1
    selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left
  }
  return ret
}

PriorityQueue.prototype.size = function () {
  return this.queue.length
}

// 使用传入的 compareFn 比较两个位置的元素
PriorityQueue.prototype.compare = function (index1, index2) {
  if (this.queue[index1] === undefined) {
    return 1
  }
  if (this.queue[index2] === undefined) {
    return -1
  }
  return this.compareFn(this.queue[index1], this.queue[index2])
}

var maxSlidingWindow = function (nums, k) {
  let res = []
  const queue = new PriorityQueue((a, b) => b[0] - a[0])
  for (let i = 0; i < k; i++) {
    queue.push([nums[i], i])
  }
  res.push(queue.top()[0])
  for (let i = k; i < nums.length; i++) {
    queue.push([nums[i], i])
    while (queue.top()[1] <= i - k) {
      queue.pop()
    }
    res.push(queue.top()[0])
  }
  return res
}
```

- 方法三
  - **单调队列的经典题目**，从大到小，“欺软怕硬”
  - 时间复杂度：O(n)
  - 空间复杂度：O(k)

```javascript
var maxSlidingWindow = function (nums, k) {
  let res = []
  const q = []
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop()
    }
    q.push(i)
    while (q[0] <= i - k) {
      q.shift()
    }
    if (i >= k - 1) {
      res.push(nums[q[0]])
    }
  }
  return res
}
```

### 6.7 [前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

题目：

- 方法一

  - 要统计元素出现频率

    对频率排序------**优先级队列**（**就是一个披着队列外衣的堆**）

    找出前 K 个高频元素------小顶堆

  - 时间复杂度：O(nlogk)

  - 空间复杂度：O(n)

```javascript
var topKFrequent = function (nums, k) {
  const map = new Map()
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }
  // 小顶堆
  const heapSort = (arr, start, end) => {
    const tmp = arr[start]
    let i = start
    for (let j = start * 2 + 1; j <= end; j = j * 2 + 1) {
      if (j < end && map.get(arr[j]) > map.get(arr[j + 1])) j++
      if (map.get(tmp) <= map.get(arr[j])) break
      arr[i] = arr[j]
      i = j
    }
    arr[i] = tmp
  }
  const keys = [...map.keys()]
  const arr = keys.slice(0, k)
  for (let i = Math.floor(k / 2 - 1); i >= 0; i--) {
    heapSort(arr, i, k - 1)
  }
  for (let i = k; i < keys.length; i++) {
    if (map.get(keys[i]) > map.get(arr[0])) {
      arr[0] = keys[i]
      heapSort(arr, 0, k - 1)
    }
  }
  return arr
}
```

```javascript
// js优先队列定义
function PriorityQueue(compareFn) {
  this.compareFn = compareFn
  this.queue = []
}

// 添加
PriorityQueue.prototype.push = function (item) {
  this.queue.push(item)
  let index = this.queue.length - 1
  let parent = Math.floor((index - 1) / 2)
  // 上浮
  while (parent >= 0 && this.compare(parent, index) > 0) {
    // 交换
    ;[this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]]
    index = parent
    parent = Math.floor((index - 1) / 2)
  }
}

// 获取堆顶元素并移除
PriorityQueue.prototype.pop = function () {
  const ret = this.queue[0]
  // 把最后一个节点移到堆顶
  this.queue[0] = this.queue.pop()

  let index = 0
  // 左子节点下标，left + 1 就是右子节点下标
  let left = 1
  let selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left

  // 下沉
  while (selectedChild !== undefined && this.compare(index, selectedChild) > 0) {
    // 交换
    ;[this.queue[index], this.queue[selectedChild]] = [this.queue[selectedChild], this.queue[index]]
    index = selectedChild
    left = 2 * index + 1
    selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left
  }
  return ret
}

PriorityQueue.prototype.size = function () {
  return this.queue.length
}

// 使用传入的 compareFn 比较两个位置的元素
PriorityQueue.prototype.compare = function (index1, index2) {
  if (this.queue[index1] === undefined) {
    return 1
  }
  if (this.queue[index2] === undefined) {
    return -1
  }
  return this.compareFn(this.queue[index1], this.queue[index2])
}

var topKFrequent = function (nums, k) {
  const map = new Map()
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }

  // 创建小顶堆
  const priorityQueue = new PriorityQueue((a, b) => a[1] - b[1])

  // entry 是一个长度为2的数组，0位置存储key，1位置存储value
  for (const entry of map.entries()) {
    priorityQueue.push(entry)
    if (priorityQueue.size() > k) {
      priorityQueue.pop()
    }
  }

  const res = []

  for (let i = priorityQueue.size() - 1; i >= 0; i--) {
    res[i] = priorityQueue.pop()[0]
  }

  return res
}
```

### 6.8 [每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

题目：本题其实就是找找到一个元素右边第一个比自己大的元素。

- 方法一
  - 单调栈模板
    - 单调递增栈：从 栈底 到 栈顶 递增，栈顶大
    - 单调递减栈：从 栈底 到 栈顶 递减，栈顶小
    - 当前项向左找第一个比自己大的位置 —— 从左向右维护一个单调递减栈
      当前项向左找第一个比自己小的位置 —— 从左向右维护一个单调递增栈
      当前项向右找第一个比自己大的位置 —— 从右向左维护一个单调递减栈
      当前项向右找第一个比自己小的位置 —— 从右向左维护一个单调递增栈
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
// 从右向左维护一个单调递减栈
var dailyTemperatures = function (temperatures) {
  const stack = []
  const res = new Array(temperatures.length).fill(0)
  for (let i = temperatures.length - 1; i >= 0; i--) {
    while (stack.length && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
      stack.pop()
    }
    if (stack.length) {
      res[i] = stack[stack.length - 1] - i
    }
    stack.push(i)
  }
  return res
}
```

### 6.9 [下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i/)

题目：

- 方法一

  - 从右向左维护一个单调递减栈

    存 map 里查询

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var nextGreaterElement = function (nums1, nums2) {
  // 当前项向右找第一个比自己大的位置 —— 从右向左维护一个单调递减栈
  const n = nums1.length,
    m = nums2.length
  const stack = []
  const map = new Map()
  for (let i = m - 1; i >= 0; i--) {
    while (stack.length && nums2[i] >= stack[stack.length - 1]) {
      stack.pop()
    }
    map.set(nums2[i], stack.length ? stack[stack.length - 1] : -1)
    stack.push(nums2[i])
  }
  let res = []
  for (let i = 0; i < n; i++) {
    res.push(map.get(nums1[i]))
  }
  return res
}
```

### 6.10 [下一个更大元素 II](https://leetcode-cn.com/problems/next-greater-element-ii/)

题目：循环查找

- 方法一

  - 在遍历的过程中模拟走两边 nums

    从右向左维护一个单调递减栈

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var nextGreaterElements = function (nums) {
  // 当前项向右找第一个比自己大的位置 —— 从右向左维护一个单调递减栈
  // 循环查找，遍历两次
  const n = nums.length
  const stack = []
  let res = new Array(n)
  for (let i = nums.length * 2 - 1; i >= 0; i--) {
    while (stack.length && nums[i % n] >= stack[stack.length - 1]) {
      stack.pop()
    }
    res[i % n] = stack.length ? stack[stack.length - 1] : -1
    stack.push(nums[i % n])
  }
  return res
}
```

#### [下一个更大元素 III](https://leetcode.cn/problems/next-greater-element-iii/)

```js
var nextGreaterElement = function (n) {
  // 转换为 下一个排列
  const nums = n.toString().split('')
  const len = nums.length
  let i = len - 2
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }
  if (i < 0) return -1
  let j = len - 1
  while (nums[j] <= nums[i]) {
    j--
  }
  ;[nums[i], [nums[j]]] = [nums[j], nums[i]]
  let l = i + 1,
    r = len - 1
  while (l < r) {
    ;[nums[l], nums[r]] = [nums[r], nums[l]]
    l++
    r--
  }
  return parseInt(nums.join('')) > Math.pow(2, 31) - 1 ? -1 : parseInt(nums.join(''))
}
```

### 6.11 [接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

题目：

- 方法一

  - 只要从头遍历一遍所有的列，然后求出每一列雨水的体积，相加之后就是总雨水的体积了。注意最左侧和最右侧不接雨水

    双指针，每一列雨水的高度，取决于，该列 左侧最高的柱子和右侧最高的柱子中最矮的那个柱子的高度。

  - 时间复杂度：O(n^2)

  - 空间复杂度：O(1)

```javascript
var trap = function (height) {
  const n = height.length
  let res = 0
  for (let i = 0; i < n; i++) {
    if (i === 0 || i === n - 1) continue
    let lH = height[i],
      rH = height[i]
    for (l = i - 1; l >= 0; l--) {
      if (height[l] > lH) lH = height[l]
    }
    for (r = i + 1; r < n; r++) {
      if (height[r] > rH) rH = height[r]
    }
    res += Math.min(lH, rH) - height[i]
  }
  return res
}
```

- 方法二
  - 方法一优化
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var trap = function (height) {
  const n = height.length;
  let l = 0, r = n - 1;
  let lH = height[l], rH = height[r];
  let res = 0;
  while (l <=c r) {
    if (lH < rH) {
      res += lH - height[l];
      l++;
      lH = Math.max(lH, height[l]);
    } else {
      res += rH - height[r];
      r--;
      rH = Math.max(rH, height[r]);
    }
  }
  return res;
};
```

- 方法三
  - 单调栈，从左到右递减，找到个凹槽就计算
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var trap = function (height) {
  const n = height.length
  let res = 0
  const stack = []
  for (let i = 0; i < n; i++) {
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      const cur = stack.pop()
      if (stack.length) {
        const w = i - stack[stack.length - 1] - 1
        const h = Math.min(height[i], height[stack[stack.length - 1]]) - height[cur]
        res += w * h
      }
    }
    stack.push(i)
  }
  return res
}
```

### 6.12 [柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

题目：

- 方法一
  - 双指针
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(1)

```javascript
var largestRectangleArea = function (heights) {
  let res = 0
  const n = heights.length
  for (let i = 0; i < n; i++) {
    let l = i,
      r = i
    for (; l >= 0; l--) {
      if (heights[l] < heights[i]) break
    }
    for (; r < n; r++) {
      if (heights[r] < heights[i]) break
    }
    const w = r - l - 1
    const h = heights[i]
    res = Math.max(res, w * h)
  }
  return res
}
```

- 方法二
  - 单调栈
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var largestRectangleArea = function (heights) {
  let res = 0
  heights = [0, ...heights, 0]
  const n = heights.length
  const stack = []
  for (let i = 0; i < n; i++) {
    while (heights[i] < heights[stack[stack.length - 1]]) {
      const top = stack.pop()
      const w = i - stack[stack.length - 1] - 1
      const h = heights[top]
      res = Math.max(res, w * h)
    }
    stack.push(i)
  }
  return res
}
```

### 6.13 [最小栈](https://leetcode-cn.com/problems/min-stack/)

- 两个栈，一个正常，一个放最小

```js
var MinStack = function () {
  this.stack = []
  this.minstack = []
}

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val)
  if (val <= this.getMin() || this.minstack.length === 0) {
    this.minstack.push(val)
  }
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const val = this.stack.pop()
  if (this.minstack[this.minstack.length - 1] === val) {
    this.minstack.pop()
  }
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minstack[this.minstack.length - 1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

### 6.14 [字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

```js
var firstUniqChar = function (s) {
  const map = new Map()
  const q = []
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map.set(s[i], -1)
      while (q.length && map.get(q[0][0]) === -1) q.shift()
    } else {
      map.set(s[i], i)
      q.push([s[i], i])
    }
  }
  return q.length ? q[0][1] : -1
}
```

### 6.15 [基本计算器](https://leetcode.cn/problems/basic-calculator/)

```js
var calculate = function (s) {
  const stack = []
  let res = 0,
    sign = 1
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') continue
    else if (s[i] === '+') sign = 1
    else if (s[i] === '-') sign = -1
    else if (s[i] === '(') {
      stack.push(res)
      stack.push(sign)
      res = 0
      sign = 1
    } else if (s[i] === ')') {
      res *= stack.pop()
      res += stack.pop()
    } else {
      let num = 0
      while (i < s.length && s[i] !== ' ' && isNumber(Number(s[i]))) {
        num = num * 10 + Number(s[i])
        i++
      }
      i--
      res += sign * num
    }
  }
  return res
}
var isNumber = function (s) {
  return typeof s === 'number' && !isNaN(s)
}
```

### 6.16 [行星碰撞](https://leetcode.cn/problems/asteroid-collision/)

```js
var asteroidCollision = function (asteroids) {
  let stack = []
  for (let a of asteroids) {
    while (stack.length && a < 0 && stack[stack.length - 1] > 0 && stack[stack.length - 1] < -a) {
      stack.pop()
    }
    if (stack.length && a < 0 && stack[stack.length - 1] === -a) {
      stack.pop()
    } else if (!stack.length || a > 0 || stack[stack.length - 1] < 0) {
      stack.push(a)
    }
  }
  return stack
}
```

### 6.17 [字符串解码](https://leetcode.cn/problems/decode-string/)

```js
var decodeString = function (s) {
  const cntStack = [],
    strStack = []
  let cnt = 0,
    str = ''
  for (let ch of s) {
    if (!isNaN(ch)) {
      cnt = cnt * 10 + ch.charCodeAt() - '0'.charCodeAt()
    } else if (ch.charCodeAt() >= 'a'.charCodeAt() && ch.charCodeAt() <= 'z'.charCodeAt()) {
      str = str + ch
    } else if (ch === '[') {
      strStack.push(str)
      str = ''
      cntStack.push(cnt)
      cnt = 0
    } else if (ch === ']') {
      const topcnt = cntStack.pop()
      str = strStack.pop() + str.repeat(topcnt)
    }
  }
  return str
}
```

### 6.18 [最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)

- 设置-1 为栈底（边界）
- 左括号，下标入栈
- 右括号，弹出；若栈中还有元素，获取当前长度；否则下标入栈作为栈底（边界）

```js
var longestValidParentheses = function (s) {
  // -1()(()))()
  const stack = [-1]
  let res = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length) {
        res = Math.max(res, i - stack[stack.length - 1])
      } else {
        stack.push(i)
      }
    }
  }
  return res
}
```

- dp

```js
var longestValidParentheses = function (s) {
  // -1()(()))()
  const n = s.length
  const dp = new Array(n).fill(0)
  let res = 0
  for (let i = 1; i < n; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        //...x()
        if (i - 2 >= 0) {
          dp[i] = dp[i - 2] + 2
        } else {
          dp[i] = 2
        }
      } else {
        // xx...))
        if (i - 1 - dp[i - 1] >= 0 && s[i - 1 - dp[i - 1]] === '(') {
          dp[i] = dp[i - 1] + 2
          if (i - 2 - dp[i - 1] >= 0) {
            dp[i] += dp[i - 2 - dp[i - 1]]
          }
        }
      }
    }
    res = Math.max(res, dp[i])
  }
  return res
}
```

### 6.19 [移掉 K 位数字](https://leetcode.cn/problems/remove-k-digits/)

- 单调递增栈

```js
var removeKdigits = function (num, k) {
  const stack = []
  for (let i = 0; i < num.length; i++) {
    const digit = parseInt(num[i])
    while (k > 0 && stack.length && stack[stack.length - 1] > digit) {
      stack.pop()
      k--
    }
    if (stack.length || digit !== 0) {
      stack.push(digit)
    }
  }
  while (k > 0) {
    stack.pop()
    k--
  }
  return stack.length ? stack.join('') : '0'
}
```
