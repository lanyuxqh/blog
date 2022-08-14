---
title: 14. 图
date: 2022-1-8
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 14.1 [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

- 方法一
  - dfs，遍历所有，遇到 1dfs，查看上下左右，如果是 1，标记为 0

```js
var numIslands = function (grid) {
  // dfs
  const m = grid.length
  const n = grid[0].length
  let res = 0

  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return
    grid[i][j] = '0'
    dfs(i + 1, j)
    dfs(i - 1, j)
    dfs(i, j + 1)
    dfs(i, j - 1)
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        res++
        dfs(i, j)
      }
    }
  }
  return res
}
```

- 方法二
  - bfs

```js
var numIslands = function (grid) {
  // bfs
  const m = grid.length
  const n = grid[0].length
  let res = 0
  let q = []
  const mark = (i, j) => {
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]
    while (q.length) {
      const cur = q.shift()
      for (let dir of dirs) {
        const new_i = cur[0] + dir[0]
        const new_j = cur[1] + dir[1]
        if (new_i < 0 || new_i >= m || new_j < 0 || new_j >= n || grid[new_i][new_j] === '0')
          continue
        grid[new_i][new_j] = '0'
        q.push([new_i, new_j])
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        res++
        q.push([i, j])
        mark(i, j)
      }
    }
  }
  return res
}
```

- 方法三
  - 并查集

```js
// 并查集模版
class UnionFind {
  constructor(n) {
    this.count = n
    this.size = new Array(n).fill(1)
    this.parent = new Array(n)
    for (let i = 0; i < n; i++) {
      this.parent[i] = i
    }
  }
  union(p, q) {
    let rp = this.find(p)
    let rq = this.find(q)
    if (rp === rq) return
    // 元素数量小的接到数量多的下面，这样比较平衡
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
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x])
    return this.parent[x]
  }
  getCount() {
    return this.count
  }
  // isConnected(p, q) { //判断p,q是否连通
  //     return this.find(p) === this.find(q)
  // }
}
var numIslands = function (grid) {
  // 并查集
  const m = grid.length
  const n = grid[0].length
  const uf = new UnionFind(m * n)
  const dummy = -1
  const dirs = [
    [1, 0],
    [0, 1]
  ] //向下 向右
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        for (let dir of dirs) {
          const new_i = i + dir[0]
          const new_j = j + dir[1]
          if (new_i >= m || new_j >= n || grid[new_i][new_j] === '0') continue
          uf.union(i * n + j, new_i * n + new_j)
        }
      } else {
        uf.union(i * n + j, dummy)
      }
    }
  }
  return uf.getCount()
}
```

### 14.2 [岛屿的最大面积](https://leetcode.cn/problems/max-area-of-island/)

```js
var maxAreaOfIsland = function (grid) {
  const m = grid.length
  const n = grid[0].length
  let res = 0
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) return 0
    grid[i][j] = 0
    let area = 1
    area += dfs(i - 1, j)
    area += dfs(i + 1, j)
    area += dfs(i, j - 1)
    area += dfs(i, j + 1)
    return area
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        res = Math.max(res, dfs(i, j, 0))
      }
    }
  }
  return res
}
```

### 14.3 [最大人工岛](https://leetcode.cn/problems/making-a-large-island/)

- 方法一
  - 每次尝试修改，dfs 计算面积
  - 要用 set 记录已经遍历过的
  - O(n^3)

```js
var largestIsland = function (grid) {
  const m = grid.length
  const n = grid[0].length
  let res = 0
  const set = new Set()
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0 || set.has(i + '-' + j)) return 0
    let area = 1
    set.add(i + '-' + j)
    area += dfs(i - 1, j)
    area += dfs(i + 1, j)
    area += dfs(i, j - 1)
    area += dfs(i, j + 1)
    return area
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        grid[i][j] = 1
        res = Math.max(res, dfs(i, j))
        grid[i][j] = 0
        set.clear()
      }
    }
  }
  return res === 0 ? m * n : res
}
```

- 方法二
  - 第一次遍历，计算每个岛屿面积，并标记岛屿编号，用 map 存储（岛屿编号--面积）
  - 第二次遍历，尝试连接，计算合并后面积
  - O(n^2)

```js
var largestIsland = function (grid) {
  const m = grid.length
  const n = grid[0].length
  let res = 0
  let id = 1,
    map = new Map()
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== 1) return 0
    grid[i][j] = id
    let area = 1
    area += dfs(i - 1, j)
    area += dfs(i + 1, j)
    area += dfs(i, j - 1)
    area += dfs(i, j + 1)
    return area
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        id++
        const area = dfs(i, j)
        map.set(id, area)
      }
    }
  }
  let dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        let tmp = 1
        const set = new Set()
        for (let d of dirs) {
          const x = i + d[0],
            y = j + d[1]
          if (x < 0 || x >= m || y < 0 || y >= n) continue
          const id = grid[x][y]
          if (id > 1 && !set.has(id)) {
            tmp += map.get(id)
            set.add(id)
          }
        }
        res = Math.max(res, tmp)
      }
    }
  }
  return res === 0 ? m * n : res
}
```
