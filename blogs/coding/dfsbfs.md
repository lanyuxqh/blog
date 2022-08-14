---
title: 9. DFS、BFS
date: 2021-11-29
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 9.1 [求根节点到叶节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)

```js
var sumNumbers = function (root) {
  const dfs = (root, cur) => {
    if (!root) return
    cur = cur * 10 + root.val
    if (!root.left && !root.right) {
      res += cur
      return
    }
    dfs(root.left, cur)
    dfs(root.right, cur)
  }
  let res = 0
  dfs(root, 0)
  return res
}
```

### 9.2 [二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

```js
var diameterOfBinaryTree = function (root) {
  const dfs = root => {
    if (!root) return 0
    const l = dfs(root.left)
    const r = dfs(root.right)
    res = Math.max(res, l + r)
    return Math.max(l, r) + 1
  }
  let res = 0
  dfs(root)
  return res
}
```

### 9.3 [图像渲染](https://leetcode-cn.com/problems/flood-fill/)

```js
// dfs
var floodFill = function (image, sr, sc, newColor) {
  const m = image.length
  const n = image[0].length
  const dirx = [-1, 0, 1, 0],
    diry = [0, -1, 0, 1]
  const oldColor = image[sr][sc]
  const dfs = (x, y) => {
    if (x < 0 || x >= m || y < 0 || y >= n || image[x][y] !== oldColor) return
    image[x][y] = newColor
    for (let i = 0; i < 4; i++) {
      const new_x = x + dirx[i]
      const new_y = y + diry[i]
      dfs(new_x, new_y)
    }
  }
  if (image[sr][sc] === newColor) return image
  dfs(sr, sc)
  return image
}

// bfs
var floodFill = function (image, sr, sc, newColor) {
  if (image[sr][sc] === newColor) return image
  const m = image.length
  const n = image[0].length
  const dirx = [-1, 0, 1, 0],
    diry = [0, -1, 0, 1]
  const oldColor = image[sr][sc]
  const q = [[sr, sc]]
  while (q.length) {
    const [x, y] = q.shift()
    image[x][y] = newColor
    for (let i = 0; i < 4; i++) {
      const new_x = x + dirx[i]
      const new_y = y + diry[i]
      if (new_x < 0 || new_x >= m || new_y < 0 || new_y >= n || image[new_x][new_y] !== oldColor)
        continue
      q.push([new_x, new_y])
    }
  }
  return image
}
```

### 9.4 [跳跃游戏 III](https://leetcode.cn/problems/jump-game-iii/)

- bfs

```js
var canReach = function (arr, start) {
  if (arr[start] === 0) return true
  const n = arr.length
  const q = [start]
  const used = new Array(n).fill(false)
  used[start] = true
  while (q.length) {
    let len = q.length
    while (len--) {
      const cur = q.shift()
      const l = cur - arr[cur]
      const r = cur + arr[cur]
      if (l >= 0 && !used[l]) {
        if (arr[l] === 0) return true
        q.push(l)
        used[l] = true
      }
      if (r < n && !used[r]) {
        if (arr[r] === 0) return true
        q.push(r)
        used[r] = true
      }
    }
  }
  return false
}
```

### 9.5 [模式匹配](https://leetcode.cn/problems/pattern-matching-lcci/)

- dfs

```js
var patternMatching = function (pattern, value) {
  const dfs = (pattern, value, map, set) => {
    if (pattern === '') return value === ''
    const p = pattern[0]
    if (map.has(p)) {
      const v = map.get(p)
      if (!value.startsWith(v)) return false
      return dfs(pattern.substring(1), value.substring(v.length), map, set)
    }
    for (let i = -1; i < value.length; i++) {
      const v = value.substring(0, i + 1)
      if (set.has(v)) continue
      map.set(p, v)
      set.add(v)
      if (dfs(pattern.substring(1), value.substring(v.length), map, set)) return true
      map.delete(p)
      set.delete(v)
    }
    return false
  }
  const map = new Map() // p-v
  const set = new Set() // 确保"a"和"b"不能同时表示相同的字符串
  return dfs(pattern, value, map, set)
}
```

### 9.6 [网格中的最短路径](https://leetcode.cn/problems/shortest-path-in-a-grid-with-obstacles-elimination/)

- bfs

```js
var shortestPath = function (grid, k) {
  const m = grid.length
  const n = grid[0].length
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ]
  const visited = new Array(m)
    .fill(0)
    .map(() => new Array(n).fill(0).map(() => new Array(k + 1).fill(false)))
  const q = [[0, 0, 0]]
  visited[0][0][0] = true
  let res = 0
  while (q.length) {
    let size = q.length
    for (let i = 0; i < size; i++) {
      const [x, y, z] = q.shift()
      if (x === m - 1 && y === n - 1) return res
      for (let dir of dirs) {
        const next_x = x + dir[0]
        const next_y = y + dir[1]
        if (next_x < 0 || next_y < 0 || next_x >= m || next_y >= n) continue
        let tmp = z + grid[next_x][next_y]
        if (tmp <= k && !visited[next_x][next_y][tmp]) {
          q.push([next_x, next_y, tmp])
          visited[next_x][next_y][tmp] = true
        }
      }
    }
    res++
  }
  return -1
}
```

### 9.7 [二叉树的完全性检验](https://leetcode.cn/problems/check-completeness-of-a-binary-tree/)

- bfs

```js
var isCompleteTree = function (root) {
  const q = [root]
  let end = false
  while (q.length) {
    const cur = q.shift()
    if (cur === null) {
      end = true
    } else {
      if (end) return false
      q.push(cur.left)
      q.push(cur.right)
    }
  }
  return true
}
```

- dfs

```js
// 核心：节点个数和最大下标是否一致
var isCompleteTree = function (root) {
  const dfs = (root, index) => {
    if (!root) return
    maxIndex = Math.max(index, maxIndex)
    size++
    dfs(root.left, index * 2)
    dfs(root.right, index * 2 + 1)
  }
  let maxIndex = 0,
    size = 0
  dfs(root, 1)
  return maxIndex === size
}
```

### 9.8 [课程表 II](https://leetcode.cn/problems/course-schedule-ii/)

- bfs-拓扑

```js
var findOrder = function (numCourses, prerequisites) {
  const indegree = new Array(numCourses).fill(0)
  const graph = {}
  for (let i = 0; i < prerequisites.length; i++) {
    indegree[prerequisites[i][0]]++
    if (graph[prerequisites[i][1]] === undefined) {
      graph[prerequisites[i][1]] = []
    }
    graph[prerequisites[i][1]].push(prerequisites[i][0])
  }
  let res = []
  const q = []
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) q.push(i)
  }
  while (q.length) {
    const cur = q.shift()
    res.push(cur)
    const next = graph[cur]
    if (next) {
      for (let i = 0; i < next.length; i++) {
        indegree[next[i]]--
        if (indegree[next[i]] === 0) q.push(next[i])
      }
    }
  }
  return res.length === numCourses ? res : []
}
```

### 9.9 [二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)

- dfs

```js
var serialize = function (root) {
  if (!root) return 'X'
  const l = serialize(root.left)
  const r = serialize(root.right)
  return root.val + ',' + l + ',' + r
}
var deserialize = function (data) {
  const build = arr => {
    const rootVal = arr.shift()
    if (rootVal === 'X') return null
    const root = new TreeNode(rootVal)
    root.left = build(arr)
    root.right = build(arr)
    return root
  }
  const arr = data.split(',')
  return build(arr)
}
```

- bfs

```js
var serialize = function (root) {
  let res = []
  const q = [root]
  while (q.length) {
    const cur = q.shift()
    if (!cur) res.push('X')
    else {
      res.push(cur.val)
      q.push(cur.left)
      q.push(cur.right)
    }
  }
  return res.join(',')
}
var deserialize = function (data) {
  const arr = data.split(',')
  const rootVal = arr[0]
  if (rootVal === 'X') return null
  const root = new TreeNode(rootVal)
  const q = [root]
  let pos = 1
  while (pos < arr.length) {
    const cur = q.shift()
    if (arr[pos] !== 'X') {
      const left = new TreeNode(arr[pos])
      cur.left = left
      q.push(left)
    }
    if (arr[pos + 1] !== 'X') {
      const right = new TreeNode(arr[pos + 1])
      cur.right = right
      q.push(right)
    }
    pos += 2
  }
  return root
}
```
