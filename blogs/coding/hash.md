---
title: 3. 哈希表
date: 2021-10-20
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 3.1 哈希表理论

> 哈希表是根据关键码的值而直接进行访问的数据结构。

**当我们遇到了要快速判断一个元素是否出现集合里的时候，就要考虑哈希法**。

哈希法**牺牲了空间换取了时间**，因为我们要使用额外的**数组，set 或者是 map**来存放数据，才能实现快速的查找。

### 3.2 [有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)

题目：判断 `t` 是否是 `s` 的字母异位词。

- 方法一
  - 定一个数组大小为 26
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false
  const hash = new Array(26).fill(0)
  for (const c of s) {
    hash[c.charCodeAt() - 'a'.charCodeAt()]++
  }
  for (let c of t) {
    if (hash[c.charCodeAt() - 'a'.charCodeAt()] === 0) return false
    hash[c.charCodeAt() - 'a'.charCodeAt()]--
  }
  return true
}
```

### 3.3 [两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

题目：

- 方法一
  - set
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var intersection = function (nums1, nums2) {
  if (nums1.length < nums2.length) {
    const tmp = nums1
    num1 = nums2
    num2 = tmp
  }
  const set = new Set(nums1)
  const res = new Set()
  for (let num of nums2) {
    if (set.has(num)) {
      res.add(num)
    }
  }
  return [...res]
}
```

- 方法二
  - map

```js
var intersection = function (nums1, nums2) {
  const map = new Map()
  for (let num of nums1) {
    map.set(num, true)
  }
  const res = []
  for (let num of nums2) {
    if (map.get(num)) {
      map.set(num, false)
      res.push(num)
    }
  }
  return res
}
```

### 3.4 [快乐数](https://leetcode-cn.com/problems/happy-number/)

题目：判断一个数 `n` 是不是快乐数。

- 方法一
  - 题目中说了会 **无限循环**，那么也就是说**求和的过程中，sum 会重复出现，这对解题很重要！**
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var isHappy = function (n) {
  const map = new Map()
  const getSum = x => {
    let sum = 0
    while (x) {
      sum += (x % 10) ** 2
      x = Math.floor(x / 10)
    }
    return sum
  }
  while (n !== 1) {
    if (map.has(n)) return false
    map.set(n, true)
    n = getSum(n)
  }
  return true
}
```

### 3.5 [两数之和](https://leetcode-cn.com/problems/two-sum/)

题目：

- 方法一
  - map
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var twoSum = function (nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const key = target - nums[i]
    if (map.has(key)) {
      return [map.get(key), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
}
```

### 3.6 [四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)

题目：

- 方法一
  - 分组 + 哈希表，A 和 B 为一组，C 和 D 为另外一组。
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n^2)

```javascript
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  const map = new Map()
  for (let a of nums1) {
    for (let b of nums2) {
      map.set(a + b, (map.get(a + b) || 0) + 1)
    }
  }
  let res = 0
  for (let c of nums3) {
    for (let d of nums4) {
      if (map.has(-c - d)) {
        res += map.get(-c - d)
      }
    }
  }
  return res
}
```

### 3.7 [赎金信](https://leetcode-cn.com/problems/ransom-note/)

题目：

- 方法一
  -
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var canConstruct = function (ransomNote, magazine) {
  if (ransomNote.length > magazine.length) {
    return false
  }
  const hash = new Array(26).fill(0)
  for (let c of magazine) {
    hash[c.charCodeAt() - 'a'.charCodeAt()]++
  }
  for (let c of ransomNote) {
    if (hash[c.charCodeAt() - 'a'.charCodeAt()] === 0) return false
    hash[c.charCodeAt() - 'a'.charCodeAt()]--
  }
  return true
}
```

### 3.8 [三数之和](https://leetcode-cn.com/problems/3sum/)

题目：

- 方法一
  - 暴力，三重循环，set 去重----超时
  - 时间复杂度：O(n^3)
  - 空间复杂度：O(n)

```javascript
var threeSum = function (nums) {
  if (nums.length <= 2) return []
  nums.sort()
  const res = []
  const set = new Set()
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const key = [nums[i], nums[j], nums[k]]
        if (nums[i] + nums[j] + nums[k] === 0 && !set.has(key.join())) {
          res.push(key)
          set.add(key.join())
        }
      }
    }
  }
  return res
}
```

- 方法二
  - 确定一个数，双指针左右夹逼，set 去重
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n)

```javascript
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let set = new Set()
  for (let i = 0; i < nums.length - 2; i++) {
    let l = i + 1,
      r = nums.length - 1
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r]
      if (sum < 0) l++
      else if (sum > 0) r--
      else {
        set.add([nums[i], nums[l], nums[r]].join())
        l++
        r--
      }
    }
  }
  return Array.from(set).map(item => item.split(','))
}
```

- 方法二
  - 确定一个数，双指针左右夹逼，去重优化
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n)

```javascript
var threeSum = function (nums) {
  const n = nums.length
  if (n <= 2) return []
  nums.sort((a, b) => a - b)
  const res = []
  for (let i = 0; i < n - 2; i++) {
    if (nums[i] > 0) break
    // a去重
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    let l = i + 1,
      r = n - 1
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r]
      if (sum < 0) {
        l++
      } else if (sum > 0) {
        r--
      } else {
        res.push([nums[i], nums[l], nums[r]])
        l++
        r--
        // b,c去重
        while (l < r && nums[l] === nums[l - 1]) l++
        while (l < r && nums[r] === nums[r + 1]) r--
      }
    }
  }
  return res
}
```

### 3.9 [四数之和](https://leetcode-cn.com/problems/4sum/)

题目：

- 方法一
  - 在三数之和基础上，多加一层循环
  - 时间复杂度：O(n^3)
  - 空间复杂度：O(1)

```javascript
var fourSum = function (nums, target) {
  const n = nums.length
  const res = []
  if (n <= 3) return res
  nums.sort((a, b) => a - b)
  for (let i = 0; i < n - 3; i++) {
    // 这种剪枝是错误的，这道题目target 是任意值
    // if (nums[i] > target) {
    //   break;
    // }
    // 这种剪枝是正确的
    if (nums[i] > 0 && nums[i] > target) {
      break
    }
    // a去重
    if (i > 0 && nums[i] === nums[i - 1]) continue
    for (let j = i + 1; j < n - 2; j++) {
      // b去重
      if (j > i + 1 && nums[j] === nums[j - 1]) continue
      let l = j + 1,
        r = n - 1
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r]
        if (sum < target) {
          l++
        } else if (sum > target) {
          r--
        } else {
          res.push([nums[i], nums[j], nums[l], nums[r]])
          l++
          r--
          // c,d去重
          while (l < r && nums[l] === nums[l - 1]) l++
          while (l < r && nums[r] === nums[r + 1]) r--
        }
      }
    }
  }
  return res
}
```

### 3.10 [缺失的第一个正数](https://leetcode-cn.com/problems/first-missing-positive/)

- 方法一
  - 哈希记录、查找
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```js
var firstMissingPositive = function (nums) {
  const n = nums.length
  const hash = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) {
    hash[nums[i]]++
  }
  for (let i = 1; i <= n; i++) {
    if (hash[i] === 0) return i
  }
  return n + 1
}
```

- 方法二
  - 原地哈希，找到不符合位置的交换位置
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```js
var firstMissingPositive = function (nums) {
  const n = nums.length
  for (let i = 0; i < n; i++) {
    while (nums[i] >= 1 && nums[i] <= n && nums[i] != nums[nums[i] - 1]) {
      const temp = nums[nums[i] - 1] // 交换
      nums[nums[i] - 1] = nums[i]
      nums[i] = temp
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] != i + 1) {
      return i + 1
    }
  }
  return n + 1
}
```

### 3.11 [设计哈希映射](https://leetcode-cn.com/problems/design-hashmap/)

- 链地址法

```js
var MyHashMap = function () {
  this.base = 10
  this.map = new Array(this.base).fill(0).map(() => new Array())
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
  const hash = key % this.base
  for (let item of this.map[hash]) {
    if (item[0] === key) {
      item[1] = value
      return
    }
  }
  this.map[hash].push([key, value])
}

/**
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  const hash = key % this.base
  for (let item of this.map[hash]) {
    if (item[0] === key) {
      return item[1]
    }
  }
  return -1
}

/**
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  const hash = key % this.base
  for (let item of this.map[hash]) {
    if (item[0] === key) {
      const index = this.map[hash].indexOf(item)
      this.map[hash].splice(index, 1)
      return
    }
  }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
```

### 3.12 [两数之和 IV - 输入 BST](https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/)

- 方法一
  - 递归+哈希

```js
var findTarget = function (root, k) {
  const map = new Map()
  const traversal = root => {
    if (!root) return false
    const l = traversal(root.left)
    if (map.has(k - root.val)) return true
    map.set(root.val, true)
    const r = traversal(root.right)
    return l || r
  }
  return traversal(root)
}
```

- 方法二
  - 迭代+哈希

```js
var findTarget = function (root, k) {
  if (!root) return false
  const q = [root]
  const map = new Map()
  while (q.length) {
    const cur = q.shift()
    if (map.has(k - cur.val)) return true
    map.set(cur.val, true)
    cur.left && q.push(cur.left)
    cur.right && q.push(cur.right)
  }
  return false
}
```

- 方法三
  - 中序遍历+双指针

```js
var findTarget = function (root, k) {
  const inorder = root => {
    if (!root) return
    inorder(root.left)
    arr.push(root.val)
    inorder(root.right)
  }
  const arr = []
  inorder(root)
  let l = 0
  r = arr.length - 1
  while (l < r) {
    const sum = arr[l] + arr[r]
    if (k === sum) return true
    else if (k < sum) r--
    else l++
  }
  return false
}
```

### 3.13 [罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)

```js
var romanToInt = function (s) {
  const map = new Map()
  map.set('I', 1)
  map.set('V', 5)
  map.set('X', 10)
  map.set('L', 50)
  map.set('C', 100)
  map.set('D', 500)
  map.set('M', 1000)
  let res = 0
  for (let i = 0; i < s.length; i++) {
    const val = map.get(s[i])
    if (i < s.length - 1 && val < map.get(s[i + 1])) {
      res -= val
    } else {
      res += val
    }
  }
  return res
}
```

### 3.14 [整数转罗马数字](https://leetcode-cn.com/problems/integer-to-roman/)

```js
var intToRoman = function (num) {
  const map = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ]
  let res = ''
  while (num) {
    for (let [key, val] of map) {
      if (num >= key) {
        res += val
        num -= key
        break
      }
    }
  }
  return res
}
```

### 3.15 [单词规律](https://leetcode-cn.com/problems/word-pattern/)

```js
var wordPattern = function (pattern, s) {
  const map1 = new Map()
  const map2 = new Map()
  const str = s.split(' ')
  if (str.length !== pattern.length) return false
  for (let i = 0; i < pattern.length; i++) {
    const c1 = pattern[i],
      c2 = str[i]
    if ((map1.has(c1) && map1.get(c1) !== c2) || (map2.has(c2) && map2.get(c2) !== c1)) return false
    map1.set(c1, c2)
    map2.set(c2, c1)
  }
  return true
}
```

### 3.16 [猜数字游戏](https://leetcode-cn.com/problems/bulls-and-cows/)

```js
var getHint = function (secret, guess) {
  let bulls = 0,
    cows = 0
  const arr1 = new Array(10).fill(0)
  const arr2 = new Array(10).fill(0)
  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      bulls++
    } else {
      arr1[secret[i].charCodeAt() - '0'.charCodeAt()]++
      arr2[guess[i].charCodeAt() - '0'.charCodeAt()]++
    }
  }
  for (let i = 0; i < 10; i++) {
    cows += Math.min(arr1[i], arr2[i])
  }
  return bulls + 'A' + cows + 'B'
}
```

### 3.17 [实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)

```js
var Trie = function () {
  this.root = Object.create(null)
}
Trie.prototype.insert = function (word) {
  let node = this.root
  for (let c of word) {
    if (!node[c]) {
      node[c] = Object.create(null)
    }
    node = node[c]
  }
  node.isEnd = true
}
Trie.prototype.search = function (word) {
  let node = this.traversal(word)
  return !!node && !!node.isEnd
}
Trie.prototype.startsWith = function (prefix) {
  let node = this.traversal(prefix)
  return !!node
}
Trie.prototype.traversal = function (word) {
  let node = this.root
  for (let c of word) {
    if (!node[c]) return null
    node = node[c]
  }
  return node
}
```

### 3.18 [添加与搜索单词 - 数据结构设计](https://leetcode.cn/problems/design-add-and-search-words-data-structure/)

```js
var WordDictionary = function () {
  this.trie = new Trie()
}
WordDictionary.prototype.addWord = function (word) {
  this.trie.insert(word)
}
WordDictionary.prototype.search = function (word) {
  return this.trie.search(word)
}

var Trie = function () {
  this.root = Object.create(null)
}
Trie.prototype.insert = function (word) {
  let node = this.root
  for (let c of word) {
    if (!node[c]) node[c] = Object.create(null)
    node = node[c]
  }
  node.isEnd = true
}
Trie.prototype.search = function (word, root = this.root) {
  let node = root
  for (let i = 0; i < word.length; i++) {
    const c = word[i]
    if (c === '.') {
      for (const key of Object.keys(node)) {
        if (this.search(word.slice(i + 1), node[key])) return true
      }
      return false
    } else {
      if (!node[c]) return false
      node = node[c]
    }
  }
  return !!node.isEnd
}
```

### 3.19 [搜索推荐系统](https://leetcode.cn/problems/search-suggestions-system/)

```js
var Trie = function () {
  this.root = {
    child: {},
    pro: []
  }
}
Trie.prototype.insert = function (word) {
  let node = this.root
  for (let c of word) {
    if (!node.child[c]) {
      node.child[c] = {
        child: {},
        pro: []
      }
    }
    node = node.child[c]
    if (node.pro.length < 3) {
      node.pro.push(word)
    }
  }
}
Trie.prototype.search = function (word) {
  let res = []
  let node = this.root
  let empty = new Trie().root
  for (let c of word) {
    if (node.child[c]) {
      node = node.child[c]
      res.push(node.pro.slice())
    } else {
      node = empty
      res.push([])
    }
  }
  return res
}

var suggestedProducts = function (products, searchWord) {
  products.sort()
  const t = new Trie()
  for (let p of products) {
    t.insert(p)
  }
  return t.search(searchWord)
}
```

### 3.20 [和可被 K 整除的子数组](https://leetcode.cn/problems/subarray-sums-divisible-by-k/)

```js
var subarraysDivByK = function (nums, k) {
  // b%k=a%k → (b−a)%k=0
  const map = new Map()
  map.set(0, 1)
  let res = 0,
    preSum = 0
  for (const num of nums) {
    preSum += num
    let mod = ((preSum % k) + k) % k // 修正负数
    if (map.has(mod)) {
      res += map.get(mod)
    }
    map.set(mod, (map.get(mod) || 0) + 1)
  }
  return res
}
```

### 3.21 [最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)

- set 中心扩散

```js
var longestConsecutive = function (nums) {
  const set = new Set(nums)
  let res = 0
  for (let num of set) {
    let l = num - 1,
      r = num + 1,
      cnt = 1
    while (set.has(l)) {
      set.delete(l)
      l--
      cnt++
    }
    while (set.has(r)) {
      set.delete(r)
      r++
      cnt++
    }
    res = Math.max(res, cnt)
  }
  return res
}
```

- 并查集

```js
class UnionFind {
  constructor(n) {
    this.count = n
    this.parent = new Array(n)
    for (let i = 0; i < n; i++) {
      this.parent[i] = i
    }
    this.size = new Array(n).fill(1)
  }
  union(p, q) {
    const rp = this.find(p)
    const rq = this.find(q)
    if (rp === rq) return
    if (this.size[rp] > this.size[rq]) {
      this.parent[rq] = rp
      this.size[rp] += this.size[rq]
    } else {
      this.parent[rp] = rq
      this.size[rq] += this.size[rp]
    }
    this.count--
  }
  find(x) {
    if (x !== this.parent[x]) this.parent[x] = this.find(this.parent[x])
    return this.parent[x]
  }
  getCount() {
    return this.count
  }
  getMaxSize() {
    return Math.max(...this.size)
  }
}
var longestConsecutive = function (nums) {
  const n = nums.length
  if (n === 0) return 0
  const uf = new UnionFind(n)
  const map = new Map()
  for (let i = 0; i < n; i++) {
    if (map.has(nums[i])) continue
    if (map.has(nums[i] - 1)) uf.union(i, map.get(nums[i] - 1))
    if (map.has(nums[i] + 1)) uf.union(i, map.get(nums[i] + 1))
    map.set(nums[i], i)
  }
  return uf.getMaxSize()
}
```
