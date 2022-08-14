---
title: 8. 回溯
date: 2021-11-18
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 8.1 回溯理论

回溯法也可以叫做回溯搜索法，它是一种搜索的方式。只要有递归就会有回溯。

**回溯的本质是穷举，穷举所有可能，然后选出我们想要的答案**，如果想让回溯法高效一些，可以加一些剪枝的操作，但也改不了回溯法就是穷举的本质。

回溯法，一般可以解决如下几种问题：

- 组合问题：N 个数里面按一定规则找出 k 个数的集合
- 切割问题：一个字符串按一定规则有几种切割方式
- 子集问题：一个 N 个数的集合里有多少符合条件的子集
- 排列问题：N 个数按一定规则全排列，有几种排列方式
- 棋盘问题：N 皇后，解数独等等

回溯三部曲

- 回溯函数模板返回值以及参数
- 回溯函数终止条件
- 回溯搜索的遍历过程

```javascript
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```

### 8.2 [组合](https://leetcode-cn.com/problems/combinations/)

题目：

- 方法一

  - 如果是一个集合来求组合的话，就需要 startIndex

  - 时间复杂度：Cnk\*k

  - 空间复杂度：O(n)

```javascript
var combine = function (n, k) {
  const backtracking = start => {
    if (path.length === k) {
      res.push(path.slice())
      return
    }
    for (let i = start; i <= n - (k - path.length) + 1; i++) {
      path.push(i)
      backtracking(i + 1)
      path.pop()
    }
  }
  const res = [],
    path = []
  backtracking(1)
  return res
}
```

### 8.3 [ 组合总和 III](https://leetcode-cn.com/problems/combination-sum-iii/)

题目：

- 方法一

  - 组合剪枝

  - 时间复杂度：Cnk\*k

  - 空间复杂度：O(n)

```javascript
var combinationSum3 = function (k, n) {
  const backtraking = (start, cnt) => {
    if (cnt < 0) return
    if (path.length === k) {
      if (cnt === 0) res.push(path.slice())
      return
    }
    for (let i = start; i <= 9 - (k - path.length) + 1; i++) {
      path.push(i)
      backtraking(i + 1, cnt - i)
      path.pop()
    }
  }
  const res = [],
    path = []
  backtraking(1, n)
  return res
}
```

### 8.4 [电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

题目：

- 方法一

  - 如果是多个集合取组合，各个集合之间相互不影响，那么就不用 startIndex

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var letterCombinations = function (digits) {
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const backtraking = index => {
    if (path.length === n) {
      res.push(path.join(''))
      return
    }
    const digit = digits[index]
    const str = map[digit]
    for (let i = 0; i < str.length; i++) {
      path.push(str[i])
      backtraking(index + 1)
      path.pop()
    }
  }
  const n = digits.length
  if (n === 0) return []
  const res = [],
    path = []
  backtraking(0)
  return res
}
```

### 8.5 [组合总和](https://leetcode-cn.com/problems/combination-sum/)

题目：无重复元素，元素可重复选取

- 方法一

  - **在求和问题中，排序之后加剪枝是常见的套路！**

  - 时间复杂度：Cnk\*k

  - 空间复杂度：O(n)

```javascript
var combinationSum = function (candidates, target) {
  const backtracking = (startIndex, cnt) => {
    if (cnt < 0) return
    if (cnt === 0) {
      res.push(path.slice())
      return
    }
    for (let i = startIndex; i < n; i++) {
      path.push(candidates[i])
      backtracking(i, cnt - candidates[i])
      path.pop()
    }
  }
  const res = [],
    path = []
  const n = candidates.length
  backtracking(0, target)
  return res
}

// 优化
var combinationSum = function (candidates, target) {
  const backtracking = (startIndex, cnt) => {
    if (cnt < 0) return
    if (cnt === 0) {
      res.push(path.slice())
      return
    }
    for (let i = startIndex; i < n && candidates[i] <= cnt; i++) {
      path.push(candidates[i])
      backtracking(i, cnt - candidates[i])
      path.pop()
    }
  }
  const n = candidates.length
  candidates.sort((a, b) => a - b)
  const res = [],
    path = []
  backtracking(0, target)
  return res
}
```

### 8.6 [组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

题目：元素有重复，元素不可重复选取

- 方法一

  - **所谓去重，其实就是使用过的元素不能重复选取**。

    要去重的是“**同一树层上的使用过**”，如果判断同一树层上元素（相同的元素）是否使用过了呢。

    **如果`candidates[i] == candidates[i - 1]` 并且 `used[i - 1] == false`，就说明：前一个树枝，使用了 candidates[i - 1]，也就是说同一树层使用过 candidates[i - 1]**。

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
// set----超时
var combinationSum2 = function (candidates, target) {
  const backtracking = (startIndex, cnt) => {
    if (cnt < 0) return
    if (cnt === 0) {
      if (!set.has(path.join(''))) {
        res.push(path.slice())
        set.add(path.join(''))
      }
      return
    }
    for (let i = startIndex; i < n && candidates[i] <= cnt; i++) {
      path.push(candidates[i])
      backtracking(i + 1, cnt - candidates[i])
      path.pop()
    }
  }
  const res = [],
    path = []
  const set = new Set()
  const n = candidates.length
  candidates.sort((a, b) => a - b)
  backtracking(0, target)
  return res
}

// 去重，用used
var combinationSum2 = function (candidates, target) {
  const backtracking = (startIndex, cnt) => {
    if (cnt < 0) return
    if (cnt === 0) {
      res.push(path.slice())
      return
    }
    for (let i = startIndex; i < n && candidates[i] <= cnt; i++) {
      // used[i - 1] == true，说明同一树支candidates[i - 1]使用过
      // used[i - 1] == false，说明同一树层candidates[i - 1]使用过
      if (i > 0 && candidates[i] === candidates[i - 1] && !used[i - 1]) {
        continue
      }
      path.push(candidates[i])
      used[i] = true
      backtracking(i + 1, cnt - candidates[i])
      used[i] = false
      path.pop()
    }
  }
  const res = [],
    path = []
  const n = candidates.length
  const used = new Array(n).fill(false)
  candidates.sort((a, b) => a - b)
  backtracking(0, target)
  return res
}

// 去重，用startIndex
var combinationSum2 = function (candidates, target) {
  const backtracking = (startIndex, cnt) => {
    if (cnt < 0) return
    if (cnt === 0) {
      res.push(path.slice())
      return
    }
    for (let i = startIndex; i < n && candidates[i] <= cnt; i++) {
      // 要对同一树层使用过的元素进行跳过
      if (i > startIndex && candidates[i] == candidates[i - 1]) {
        continue
      }
      path.push(candidates[i])
      backtracking(i + 1, cnt - candidates[i])
      path.pop()
    }
  }
  const res = [],
    path = []
  const n = candidates.length
  candidates.sort((a, b) => a - b)
  backtracking(0, target)
  return res
}
```

### 8.7 [分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

题目：

- 方法一

  - 切割问题，有不同的切割方式-----**使用回溯搜索法把所有可能性搜出来**

    - 我们来分析一下切割，其实切割问题类似组合问题。

      例如对于字符串 abcdef：

      组合问题：选取一个 a 之后，在 bcdef 中再去选取第二个，选取 b 之后在 cdef 中在选组第三个.....。
      切割问题：切割一个 a 之后，在 bcdef 中再去切割第二段，切割 b 之后在 cdef 中在切割第三段.....。

    判断回文

  - 时间复杂度：Cnk\*k

  - 空间复杂度：O(n)

```javascript
var partition = function (s) {
  const isPalindrom = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false
      l++
      r--
    }
    return true
  }
  const backtracking = startIndex => {
    if (startIndex === n) {
      res.push(path.slice())
      return
    }
    for (let i = startIndex; i < n; i++) {
      if (isPalindrom(startIndex, i)) {
        path.push(s.substring(startIndex, i + 1))
        backtracking(i + 1)
        path.pop()
      }
    }
  }
  const n = s.length
  const res = [],
    path = []
  backtracking(0)
  return res
}
```

### 8.8 [复原 IP 地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

题目：

- 方法一

  - 同分割

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var restoreIpAddresses = function (s) {
  const isValid = (str, start, end) => {
    // 0开头的数字不合法
    if (str[start] === '0' && start !== end) return false
    let num = 0
    for (let i = start; i <= end; i++) {
      if (str[i] > '9' || str[i] < '0') return false
      num = num * 10 + str[i].charCodeAt() - '0'.charCodeAt()
      if (num > 255) return false
    }
    return true
  }
  const backtracking = startIndex => {
    if (path.length > 4) return
    if (path.length === 4) {
      if (startIndex === n) {
        res.push(path.join('.'))
      }
      return
    }
    for (let i = startIndex; i < n; i++) {
      if (!isValid(s, startIndex, i)) {
        continue
      }
      const str = s.substring(startIndex, i + 1)
      path.push(str)
      backtracking(i + 1)
      path.pop()
    }
  }
  const n = s.length
  const res = [],
    path = []
  backtracking(0)
  return res
}
```

### 8.9 [子集](https://leetcode-cn.com/problems/subsets/)

题目：不包含重复元素

- 方法一

  - 如果把 子集问题、组合问题、分割问题都抽象为一棵树的话，**那么组合问题和分割问题都是收集树的叶子节点，而子集问题是找树的所有节点！**

    **求取子集问题，不需要任何剪枝！因为子集就是要遍历整棵树**。

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var subsets = function (nums) {
  const backtracking = startIndex => {
    // 收集子集，要放在终止添加的上面，否则会漏掉自己
    res.push(path.slice())
    if (startIndex === n) {
      return
    }
    for (let i = startIndex; i < n; i++) {
      path.push(nums[i])
      backtracking(i + 1)
      path.pop()
    }
  }
  const n = nums.length
  const res = [],
    path = []
  backtracking(0)
  return res
}
```

### 8.10 [子集 II](https://leetcode-cn.com/problems/subsets-ii/)

题目：包含重复元素

- 方法一

  - 去重

  - 时间复杂度：Cnk\*k

  - 空间复杂度：O(n)

```javascript
var subsetsWithDup = function (nums) {
  const backtracking = startIndex => {
    res.push(path.slice())
    if (startIndex === n) {
      return
    }
    for (let i = startIndex; i < n; i++) {
      if (i > startIndex && nums[i] === nums[i - 1]) continue
      path.push(nums[i])
      backtracking(i + 1)
      path.pop()
    }
  }
  const n = nums.length
  nums.sort((a, b) => a - b)
  const res = [],
    path = []
  backtracking(0)
  return res
}

// used去重
var subsetsWithDup = function (nums) {
  const backtracking = startIndex => {
    res.push(path.slice())
    if (startIndex === n) {
      return
    }
    for (let i = startIndex; i < n; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue
      path.push(nums[i])
      used[i] = true
      backtracking(i + 1)
      used[i] = false
      path.pop()
    }
  }
  const n = nums.length
  nums.sort((a, b) => a - b)
  const used = new Array(n).fill(false)
  const res = [],
    path = []
  backtracking(0)
  return res
}
```

### 8.11 [递增子序列](https://leetcode-cn.com/problems/increasing-subsequences/)

题目：

- 方法一

  - 本题求自增子序列，是不能对原数组经行排序的，**所以不能使用之前的去重逻辑！**

    **同一父节点下的同层上使用过的元素就不能在使用了**

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var findSubsequences = function (nums) {
  const backtracking = startIndex => {
    if (path.length > 1) {
      res.push(path.slice())
      // 注意这里不要加return，要取树上的节点
    }
    if (startIndex === n) {
      return
    }
    const used = new Set()
    for (let i = startIndex; i < n; i++) {
      if (used.has(nums[i]) || (path.length && path[path.length - 1] > nums[i])) continue
      path.push(nums[i])
      used.add(nums[i])
      backtracking(i + 1)
      path.pop()
    }
  }
  const n = nums.length
  const res = [],
    path = []
  backtracking(0)
  return res
}
```

### 8.12 [全排列](https://leetcode-cn.com/problems/permutations/)

题目：给定一个不含重复数字的数组 `nums` ，返回其 **所有可能的全排列** 。

- 方法一

  - 处理排列问题就不用使用 startIndex 了，每层都是从 0 开始搜索。

    但排列问题需要一个 used 数组，记录 path 里都放了哪些元素了。

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var permute = function (nums) {
  const backtracking = () => {
    if (path.length === n) {
      res.push(path.slice())
      return
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) continue
      path.push(nums[i])
      used[i] = true
      backtracking()
      used[i] = false
      path.pop()
    }
  }
  const n = nums.length
  const used = new Array(n).fill(false)
  const res = [],
    path = []
  backtracking()
  return res
}
```

### 8.13 [全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

题目：给定一个可包含重复数字的序列 `nums` ，**按任意顺序** 返回所有不重复的全排列。

- 方法一

  - used 两个作用

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var permuteUnique = function (nums) {
  const backtracking = () => {
    if (path.length === n) {
      res.push(path.slice())
      return
    }
    for (let i = 0; i < n; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue
      if (used[i]) continue
      path.push(nums[i])
      used[i] = true
      backtracking()
      used[i] = false
      path.pop()
    }
  }
  nums.sort((a, b) => a - b)
  const n = nums.length
  const used = new Array(n).fill(false)
  const res = [],
    path = []
  backtracking()
  return res
}
```

### 8.14 [重新安排行程](https://leetcode-cn.com/problems/reconstruct-itinerary/)

题目：

- 方法一

  - 一个行程中，如果航班处理不好容易变成一个圈，成为死循环

    有多种解法，字母序靠前排在前面，让很多同学望而退步，如何该记录映射关系呢 ？

    使用回溯法（也可以说深搜） 的话，那么终止条件是什么呢？

    搜索的过程中，如何遍历一个机场所对应的所有机场。

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var findItinerary = function (tickets) {
  const map = new Map() //{from:[to1,to2,...]}
  for (let t of tickets) {
    if (!map.has(t[0])) {
      map.set(t[0], [])
    }
    map.get(t[0]).push(t[1])
  }
  for (let m of map.keys()) {
    map.get(m).sort()
  }
  const backtracking = () => {
    if (res.length === tickets.length + 1) {
      return true
    }
    const last = res[res.length - 1]
    if (!map.get(last) || !map.get(last).length) return false
    for (let i = 0; i < map.get(last).length; i++) {
      const to = map.get(last)[i]
      res.push(to)
      map.get(last).splice(i, 1)
      if (backtracking()) return true
      map.get(last).splice(i, 0, to)
      res.pop()
    }
    return false
  }
  const res = ['JFK']
  backtracking()
  return res
}
```

### 8.15 [N 皇后](https://leetcode-cn.com/problems/n-queens/)

题目：

- 方法一

  - 二维矩阵中矩阵的高就是这颗树的高度，矩阵的宽就是树形结构中每一个节点的宽度。

    用皇后们的约束条件，来回溯搜索这颗树，**只要搜索到了树的叶子节点，说明就找到了皇后们的合理位置了**。

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var solveNQueens = function (n) {
  const isValid = (row, col) => {
    // 检查列
    for (let i = 0; i < row; i++) {
      if (path[i][col] === 'Q') return false
    }
    // // 检查行 在单层搜索的过程中，每一层递归，只会选for循环（也就是同一行）里的一个元素，所以不用去重了。
    // for (let j = 0; j < col; j++) {
    //     if (path[row][j] === 'Q') return false;
    // }
    // 检查45度角
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (path[i][j] === 'Q') return false
    }
    // 检查135度角
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (path[i][j] === 'Q') return false
    }
    return true
  }
  const change = arr => {
    let arr1 = []
    for (let row of arr) {
      arr1.push(row.join(''))
    }
    return arr1
  }
  const backtracking = row => {
    if (row === n) {
      res.push(change(path))
      return
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        path[row][col] = 'Q'
        backtracking(row + 1)
        path[row][col] = '.'
      }
    }
  }
  const res = []
  const path = new Array(n).fill(0).map(() => new Array(n).fill('.'))
  backtracking(0)
  return res
}
```

### 8.16 [解数独](https://leetcode-cn.com/problems/sudoku-solver/)

题目：

- 方法一

  - **二维递归**

    **一个 for 循环遍历棋盘的行，一个 for 循环遍历棋盘的列，一行一列确定下来之后，递归遍历这个位置放 9 个数字的可能性！**

  - 时间复杂度：

  - 空间复杂度：O(n)

```javascript
var solveSudoku = function (board) {
  const isValid = (row, col, k) => {
    // 行不能重复
    for (let i = 0; i < n; i++) {
      if (board[row][i] === k) return false
    }
    // 列不能重复
    for (let i = 0; i < n; i++) {
      if (board[i][col] === k) return false
    }
    // 块不能重复
    let startrow = Math.floor(row / 3) * 3
    let startcol = Math.floor(col / 3) * 3
    for (let i = startrow; i < startrow + 3; i++) {
      for (let j = startcol; j < startcol + 3; j++) {
        if (board[i][j] === k) return false
      }
    }
    return true
  }
  const backtracking = () => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] !== '.') continue
        for (let k = 1; k <= 9; k++) {
          if (isValid(i, j, `${k}`)) {
            board[i][j] = `${k}`
            if (backtracking()) return true
            board[i][j] = '.'
          }
        }
        return false
      }
    }
    return true
  }
  const n = board.length
  backtracking()
  return board
}
```

### 8.17 [括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

- 优先选左括号
- 当右括号数量大于左括号，可以选右括号

```js
var generateParenthesis = function (n) {
  const backtracking = (l, r, cur) => {
    if (cur.length === 2 * n) {
      res.push(cur)
      return
    }
    if (l > 0) {
      backtracking(l - 1, r, cur + '(')
    }
    if (l < r) {
      backtracking(l, r - 1, cur + ')')
    }
  }
  let res = []
  backtracking(n, n, '')
  return res
}
```

### 8.18 [单词搜索](https://leetcode.cn/problems/word-search/)

```js
var exist = function (board, word) {
  const m = board.length,
    n = board[0].length
  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ]
  const dfs = (i, j, pos, visited) => {
    if (pos === word.length - 1) return board[i][j] === word[[pos]]
    if (board[i][j] === word[pos]) {
      visited[i][j] = true
      for (let d of dirs) {
        const new_i = i + d[0],
          new_j = j + d[1]
        if (new_i < 0 || new_i >= m || new_j < 0 || new_j >= n || visited[new_i][new_j]) continue
        if (dfs(new_i, new_j, pos + 1, visited)) return true
      }
      visited[i][j] = false
    }
    return false
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const visited = new Array(m).fill().map(() => new Array(n).fill(false))
      if (dfs(i, j, 0, visited)) return true
    }
  }
  return false
}
```
