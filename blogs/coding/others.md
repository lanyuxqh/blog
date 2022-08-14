---
title: 16. 其他
date: 2022-2-16
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 16.1 10 进制转化为 36 进制

- 36 进制由 0 - 9，a - z，共 36 个字符表示

- '1b' 换算成 10 进制等于 1 _ 36 ^ 1 + 11 _ 36 ^ 0 = 36 + 11 = 47

```js
function base36(n) {
  const getNum = () => {
    const arr = []
    for (let i = 0; i < 36; i++) {
      if (i >= 0 && i <= 9) {
        arr.push(i)
      } else {
        arr.push(String.fromCharCode(i + 87)) //97---a
      }
    }
    return arr
  }

  const res = []
  const arr = getNum()
  while (n) {
    let index = n % 36
    res.unshift(arr[index])
    n = parseInt(n / 36)
  }
  return res.join('')
}

console.log(base36(47)) //1b
```

### 16.2 区间最小数乘区间和的最大值

X=sum(subArray) \* min(subArray)

- 方法一：
  - 暴力枚举的每个元素（设为 x）作为区间最小值，在 x 左右两侧找到第一个比 x 小的元素，分别记录左右边界的下标为 l,r，寻找边界时计算当前区间的和。

```js
function maxX(arr) {
  let res = 0
  const n = arr.length
  for (let i = 0; i < n; i++) {
    let l = i - 1,
      r = i + 1
    let sum = arr[i]
    while (l >= 0 && arr[l] >= arr[i]) {
      sum += arr[l]
      l--
    }
    while (r < n && arr[r] >= arr[i]) {
      sum += arr[r]
      r++
    }
    res = Math.max(res, sum * arr[i])
  }
  return res
}

console.log(maxX([6, 2, 1]))
```

- 方法二
  - 单调栈，递增，遇到比栈顶小的数，计算栈顶，左边界，右边界。
  - 小技巧，结合前缀和数组。

```js
function maxX(arr) {
  let res = 0
  const n = arr.length
  const presumarr = [0]
  let presum = 0
  for (let i = 0; i < n; i++) {
    presum = presum + arr[i]
    presumarr.push(presum)
  }
  // console.log(presumarr);
  const stack = []
  for (let i = 0; i < n; i++) {
    while (stack.length && arr[i] < arr[stack[stack.length - 1]]) {
      const index = stack.pop()
      let l = stack.length ? stack[stack.length - 1] : -1,
        r = i - 1
      let sum = presumarr[r + 1] - presumarr[l + 1]
      res = Math.max(res, arr[index] * sum)
    }
    stack.push(i)
  }
  while (stack.length) {
    const index = stack.pop()
    let l = stack.length ? stack[stack.length - 1] : -1,
      r = n - 1
    let sum = presumarr[r + 1] - presumarr[l + 1]
    res = Math.max(res, arr[index] * sum)
  }
  return res
}
console.log(maxX([4, 6, 5, 1]))
```

### 16.3 JSON 对象的 key 从横杠形式转换到小驼峰形式

```js
function underline2Hump(s) {
  return s.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}
// console.log(underline2Hump("a_b_c"));

function hump2Underline(s) {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}
// console.log(hump2Underline("aBC"));

function json2Hump(obj) {
  if (!isObject(obj)) return obj
  const res = {}
  Object.keys(obj).forEach(key => {
    const val = obj[key]
    let newkey = underline2Hump(key)
    res[newkey] = isObject(val) ? json2Hump(val) : val
  })
  return res
}

function json2Underline(obj) {
  if (!isObject(obj)) return obj
  const res = {}
  Object.keys(obj).forEach(key => {
    const val = obj[key]
    let newkey = hump2Underline(key)
    res[newkey] = isObject(val) ? json2Underline(val) : val
  })
  return res
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const obj1 = { a_b: { a_b_c: { a_b_c_d: '1' } } }
console.log(json2Hump(obj1))
const obj2 = { aB: { aBC: { aBCD: '1' } } }
console.log(json2Underline(obj2))
```

### 16.4 关系型数组转换成树状结构对象/数组

```js
// 树状结构对象 转 关系型数组
const tree2Array = tree => {
  const dfs = (root, parent) => {
    const { children, ...props } = root
    res.push({ ...props, parentId: parent })
    if (children) {
      children.forEach(child => {
        dfs(child, root.id)
      })
    }
  }
  const res = []
  dfs(tree, null)
  return res
}
const tree = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        { id: 4, children: [] },
        { id: 5, children: [] }
      ]
    },
    {
      id: 3,
      children: [{ id: 6, children: [] }]
    }
  ]
}
console.log(tree2Array(tree))

// 关系型数组 转 树状结构对象
function array2Tree(arr) {
  let res = {}
  const map = {}
  for (let item of arr) {
    map[item.id] = item
  }
  for (let item of arr) {
    const { parentId } = item
    item.children = []
    if (parentId) {
      const p = map[parentId]
      ;(p.children || (p.children = [])).push(item)
    } else {
      res = item
    }
    delete item['parentId']
  }
  return res
}
const arr = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 2 },
  { id: 3, parentId: 1 },
  { id: 6, parentId: 3 }
]
console.log(array2Tree(arr))

// 树状结构数组 转 关系型数组
function tree2Array(tree) {
  const dfs = (root, parent) => {
    const { children, ...props } = root
    res.push({ ...props, parentId: parent })
    if (children) {
      children.forEach(child => {
        dfs(child, root.id)
      })
    }
  }
  const res = []
  for (let item of tree) {
    dfs(item, null)
  }
  return res
}
const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          { id: 4, children: [] },
          { id: 5, children: [] }
        ]
      },
      {
        id: 3,
        children: [{ id: 6, children: [] }]
      }
    ]
  }
]
console.log(tree2Array(tree))

// 关系型数组 转 树状结构数组
function array2Tree(arr) {
  let res = []
  const map = {}
  for (let item of arr) {
    map[item.id] = item
  }
  for (let item of arr) {
    const { parentId } = item
    item.children = []
    if (parentId) {
      const p = map[parentId]
      ;(p.children || (p.children = [])).push(item)
    } else {
      res.push(item)
    }
    delete item['parentId']
  }
  return res
}
const arr = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 2 },
  { id: 3, parentId: 1 },
  { id: 6, parentId: 3 }
]
```

### 16.5 多叉树(根据 id 获取 name)

```js
// dfs
const getCity = (data, id) => {
  const traversal = data => {
    // if (!data.length) return;
    for (let item of data) {
      if (item.id === id) res = item.name
      if (item.children) {
        traversal(item.children)
      }
    }
  }
  let res = ''
  traversal(data)
  return res ? res : undefined
}
```

```js
// bfs
const getCity = (data, id) => {
  const stack = []
  for (let item of data) {
    stack.push(item)
  }
  while (stack.length) {
    const item = stack.shift()
    if (item.id === id) return item.name
    stack.push(...item.children)
  }
  return undefined
}
```

### 16.6 电话按键（面试）

```js
//['abc', 'def'] // => ['ad', 'ae', 'bd', 'be']
//['abc', 'def', 'abc'] // => ['ada', 'adb']

const dict = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  23: 'y',
  33: 'z'
}
const keys = '2332' // => [[a b c], [d e f] [d e f] [a b c]]
// => [[y] [d e f] [a b c]]
// => [[a b c], [z]] [a b c]]
function getWords(dict, keys) {
  const backtracking = startIndex => {
    if (path.length === arr.length) {
      res.push(path.join(''))
      return
    }
    for (let i = startIndex; i < arr.length; i++) {
      const str = arr[i]
      for (let ch of str) {
        path.push(ch)
        backtracking(i + 1)
        path.pop()
      }
    }
  }

  const partition = startIndex => {
    if (startIndex >= m) {
      const tmp = []
      for (let item of path1) {
        tmp.push(dict[item])
      }
      res1.push(tmp.slice())
      return
    }
    for (let i = startIndex; i < m; i++) {
      if (dict[keys.substring(startIndex, i + 1)] === undefined) {
        continue
      }
      const str = keys.substring(startIndex, i + 1)
      path1.push(str)
      partition(i + 1)
      path1.pop()
    }
  }

  const m = keys.length
  const res1 = [],
    path1 = []
  partition(0)
  console.log(res1)

  const res = [],
    path = []
  let arr
  for (let item of res1) {
    arr = item
    backtracking(0)
  }
  return res
}

console.log(getWords(dict, '2332'))
```

### 16.7 [汉诺塔问题](https://leetcode-cn.com/problems/hanota-lcci/)

```js
var hanota = function (A, B, C) {
  const move = (n, A, B, C) => {
    if (n === 1) {
      C.push(A.pop())
      return
    }
    move(n - 1, A, C, B)
    C.push(A.pop())
    move(n - 1, B, A, C)
  }
  move(A.length, A, B, C)
}
```

### 16.8 [颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

```js
var reverseBits = function (n) {
  const M1 = 0x55555555 // 01010101010101010101010101010101
  const M2 = 0x33333333 // 00110011001100110011001100110011
  const M4 = 0x0f0f0f0f // 00001111000011110000111100001111
  const M8 = 0x00ff00ff // 00000000111111110000000011111111

  n = ((n >>> 1) & M1) | ((n & M1) << 1)
  n = ((n >>> 2) & M2) | ((n & M2) << 2)
  n = ((n >>> 4) & M4) | ((n & M4) << 4)
  n = ((n >>> 8) & M8) | ((n & M8) << 8)
  return ((n >>> 16) | (n << 16)) >>> 0
}
```

### 16.9 [至少有 K 个重复字符的最长子串](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/)

```js
var longestSubstring = function (s, k) {
  const dfs = (start, end) => {
    if (end - start + 1 < k) return 0
    const freq = {}
    for (let i = start; i <= end; i++) {
      freq[s[i]] = (freq[s[i]] || 0) + 1
    }
    while (end - start + 1 >= k && freq[s[start]] < k) start++
    while (end - start + 1 >= k && freq[s[end]] < k) end--
    if (end - start + 1 < k) return 0
    for (let i = start; i <= end; i++) {
      if (freq[s[i]] < k) {
        return Math.max(dfs(start, i - 1), dfs(i + 1, end))
      }
    }
    return end - start + 1
  }
  return dfs(0, s.length - 1)
}
```
