---
title: 7. 二叉树
date: 2021-11-10
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 7.1 二叉树理论

**二叉树种类**

- 满二叉树：如果一棵二叉树只有度为 0 的结点和度为 2 的结点，并且度为 0 的结点在同一层上，则这棵二叉树为满二叉树。

- 完全二叉树：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。
  - 优先级队列其实是一个堆，堆就是一棵完全二叉树，同时保证父子节点的顺序关系。
- 二叉搜索树：
  - 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
  - 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
  - 它的左、右子树也分别为二叉排序树。
- 平衡二叉搜索树：又被称为 AVL（Adelson-Velsky and Landis）树，且具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过 1，并且左右两个子树都是一棵平衡二叉树。

**二叉树的存储方式**

- 链式存储方式就用指针， 顺序存储的方式就是用数组。
- 一般用链式存储。

**二叉树的遍历方式**

- 深度优先遍历---------借助栈使用非递归
  - 前序遍历（递归法，迭代法）
  - 中序遍历（递归法，迭代法）
  - 后序遍历（递归法，迭代法）
- 广度优先遍历----------队列
  - 层次遍历（迭代法）

### 7.2 二叉树基本定义、遍历

**递归**三部曲

- **确定递归函数的参数和返回值**： 确定哪些参数是递归的过程中需要处理的，那么就在递归函数里加上这个参数， 并且还要明确每次递归的返回值是什么进而确定递归函数的返回类型。
- **确定终止条件**： 写完了递归算法, 运行的时候，经常会遇到栈溢出的错误，就是没写终止条件或者终止条件写的不对，操作系统也是用一个栈的结构来保存每一层递归的信息，如果递归没有终止，操作系统的内存栈必然就会溢出。
- **确定单层递归的逻辑**： 确定每一层递归需要处理的信息。在这里也就会重复调用自己来实现递归的过程。

```javascript
// 递归版
// 定义
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

// 前序
var preorderTraversal = function (root, res = []) {
  if (!root) return
  res.push(root.val)
  preorderTraversal(root.left, res)
  preorderTraversal(root.right, res)
}

// 中序
var inorderTraversal = function (root, res = []) {
  if (!root) return
  inorderTraversal(root.left, res)
  res.push(root.val)
  inorderTraversal(root.right, res)
}

// 后序
var postorderTraversal = function (root, res = []) {
  if (!root) return
  postorderTraversal(root.left, res)
  postorderTraversal(root.right, res)
  res.push(root.val)
}

// 5 4 6 1 2 7 8
const node7 = new TreeNode(8)
const node6 = new TreeNode(7)
const node5 = new TreeNode(2)
const node4 = new TreeNode(1)
const node3 = new TreeNode(6, node6, node7)
const node2 = new TreeNode(4, node4, node5)
const node1 = new TreeNode(5, node2, node3)
const res = []
// preorderTraversal(node1, res);
// console.log(res);  //   5, 4, 1, 2, 6, 7, 8
// inorderTraversal(node1, res);
// console.log(res);  // 1, 4, 2, 5, 7, 6, 8
// postorderTraversal(node1, res);
// console.log(res);  //   1, 2, 4, 7, 8, 6, 5
```

**递归的实现就是：每一次递归调用都会把函数的局部变量、参数值和返回地址等压入调用栈中**，然后递归返回的时候，从栈顶弹出上一次递归的各项参数，所以这就是递归为什么可以返回上一层位置的原因。

```javascript
// 迭代版
// 定义
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

// 前序----中左右
// 处理顺序和访问顺序是一致的
// 入栈 右 -> 左
// 出栈 中 -> 左 -> 右
var preorderTraversal = function (root, res = []) {
  if (!root) return
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    res.push(cur.val)
    if (cur.right) stack.push(cur.right)
    if (cur.left) stack.push(cur.left)
  }
}

// 中序-----左中右
// 处理顺序和访问顺序是不一致的
// 需要借用指针的遍历来帮助访问节点，栈则用来处理节点上的元素。
var inorderTraversal = function (root, res = []) {
  if (!root) return
  const stack = []
  let cur = root
  while (stack.length || cur) {
    if (cur) {
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      res.push(cur.val)
      cur = cur.right
    }
  }
}

// 后序-----左右中
// 只需要调整一下先序遍历的代码顺序，就变成中右左的遍历顺序，然后在反转result数组
var postorderTraversal = function (root, res = []) {
  if (!root) return
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    res.push(cur.val)
    if (cur.left) stack.push(cur.left)
    if (cur.right) stack.push(cur.right)
  }
  res.reverse()
}

// 5 4 6 1 2 7 8
const node7 = new TreeNode(8)
const node6 = new TreeNode(7)
const node5 = new TreeNode(2)
const node4 = new TreeNode(1)
const node3 = new TreeNode(6, node6, node7)
const node2 = new TreeNode(4, node4, node5)
const node1 = new TreeNode(5, node2, node3)
const res = []
// preorderTraversal(node1, res);
// console.log(res);  //   5, 4, 1, 2, 6, 7, 8
// inorderTraversal(node1, res);
// console.log(res);  // 1, 4, 2, 5, 7, 6, 8
// postorderTraversal(node1, res);
// console.log(res);  //   1, 2, 4, 7, 8, 6, 5
```

**迭代统一版**

- **将访问的节点放入栈中，把要处理的节点也放入栈中但是要做标记**。
- 如何标记呢，**就是要处理的节点放入栈之后，紧接着放入一个空指针作为标记**。

```javascript
// 迭代统一版
// 定义
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

// 前序----中左右
var preorderTraversal = function (root, res = []) {
  if (!root) return
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    if (cur) {
      if (cur.right) stack.push(cur.right)
      if (cur.left) stack.push(cur.left)
      stack.push(cur)
      stack.push(null)
    } else {
      res.push(stack.pop().val)
    }
  }
}

// 中序-----左中右
var inorderTraversal = function (root, res = []) {
  if (!root) return
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    if (cur) {
      if (cur.right) stack.push(cur.right)
      stack.push(cur)
      stack.push(null)
      if (cur.left) stack.push(cur.left)
    } else {
      res.push(stack.pop().val)
    }
  }
}

// 后序-----左右中
var postorderTraversal = function (root, res = []) {
  if (!root) return
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    if (cur) {
      stack.push(cur)
      stack.push(null)
      if (cur.right) stack.push(cur.right)
      if (cur.left) stack.push(cur.left)
    } else {
      res.push(stack.pop().val)
    }
  }
}

// 5 4 6 1 2 7 8
const node7 = new TreeNode(8)
const node6 = new TreeNode(7)
const node5 = new TreeNode(2)
const node4 = new TreeNode(1)
const node3 = new TreeNode(6, node6, node7)
const node2 = new TreeNode(4, node4, node5)
const node1 = new TreeNode(5, node2, node3)
const res = []
// preorderTraversal(node1, res);
// console.log(res);  //   5, 4, 1, 2, 6, 7, 8
// inorderTraversal(node1, res);
// console.log(res);  // 1, 4, 2, 5, 7, 6, 8
// postorderTraversal(node1, res);
// console.log(res);  //   1, 2, 4, 7, 8, 6, 5
```

**层序遍历**

- 102.二叉树的层序遍历
- 107.二叉树的层次遍历 II
- 199.二叉树的右视图
- 637.二叉树的层平均值
- 429.N 叉树的前序遍历
- 515.在每个树行中找最大值
- 116.填充每个节点的下一个右侧节点指针
- 117.填充每个节点的下一个右侧节点指针 II
- 104.二叉树的最大深度
- 111.二叉树的最小深度

```javascript
// 定义
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

// 层序----上下
var levelorderTraversal = function (root, res = []) {
  if (!root) return
  const queue = [root]
  while (queue.length) {
    let len = queue.length
    let level = []
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      level.push(cur.val)
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
    }
    res.push(level)
  }
}

// 层序----下上
var levelorderBottomTraversal = function (root, res = []) {
  if (!root) return
  const queue = [root]
  while (queue.length) {
    let len = queue.length
    let level = []
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      level.push(cur.val)
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
    }
    res.unshift(level)
  }
}

// 5 4 6 1 2 7 8
const node7 = new TreeNode(8)
const node6 = new TreeNode(7)
const node5 = new TreeNode(2)
const node4 = new TreeNode(1)
const node3 = new TreeNode(6, node6, node7)
const node2 = new TreeNode(4, node4, node5)
const node1 = new TreeNode(5, node2, node3)
const res = []
// levelorderTraversal(node1, res);
// console.log(res);  // [ [ 5 ], [ 4, 6 ], [ 1, 2, 7, 8 ] ]
// levelorderBottomTraversal(node1, res);
// console.log(res);  // [ [ 1, 2, 7, 8 ], [ 4, 6 ], [ 5 ] ]
```

### 7.3 [翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

题目：

- 方法一

  - 递归

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
// 后序
var invertTree = function (root) {
  if (root === null) return root
  const left = invertTree(root.left) // 不能直接写root.right=...，因为root.right下面还要用!
  const right = invertTree(root.right)
  root.left = right
  root.right = left
  return root
}
// 前序
var invertTree = function (root) {
  if (!root) return root
  ;[root.left, root.right] = [root.right, root.left]
  invertTree(root.left)
  invertTree(root.right)
  return root
}
```

- 方法二

  - 迭代，前序

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var invertTree = function (root) {
  if (root === null) return root
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    if (cur) {
      // 前序 中左右
      cur.right && stack.push(cur.right)
      cur.left && stack.push(cur.left)
      stack.push(cur)
      stack.push(null)
    } else {
      const cur = stack.pop()
      //节点处理
      ;[cur.left, cur.right] = [cur.right, cur.left]
    }
  }
  return root
}
```

- 方法三

  - 层序

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var invertTree = function (root) {
  if (root === null) return root
  const queue = [root]
  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      //节点处理
      ;[cur.left, cur.right] = [cur.right, cur.left]
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }
  }
  return root
}
```

### 7.3 [对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

题目：对于二叉树是否对称，要比较的是根节点的左子树与右子树是不是相互翻转的，理解这一点就知道了**其实我们要比较的是两个树（这两个树是根节点的左右子树）**，所以在递归遍历的过程中，也是要同时遍历两棵树。

- 方法一

  - 递归，比较两棵树的内侧和外侧

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var isSymmetric = function (root) {
  const compare = (left, right) => {
    if (!left && !right) return true
    else if (!left || !right) return false
    else if (left.val !== right.val) return false
    const inside = compare(left.right, right.left)
    const outside = compare(left.left, right.right)
    return inside && outside
  }

  if (!root) return true
  return compare(root.left, root.right)
}
```

- 方法二

  - 迭代，把左右两个子树要比较的元素顺序放进一个容器，然后成对成对的取出来进行比较

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var isSymmetric = function (root) {
  if (!root) return true
  const queue = [root.left, root.right]
  while (queue.length) {
    const node1 = queue.shift()
    const node2 = queue.shift()
    if (!node1 && !node2) continue
    if (!node1 || !node2 || node1.val !== node2.val) return false
    queue.push(node1.left)
    queue.push(node2.right)
    queue.push(node1.right)
    queue.push(node2.left)
  }
  return true
}
```

### 7.4 [二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

题目：

- 方法一

  - 层序

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var maxDepth = function (root) {
  let res = 0
  if (!root) return res
  c
  const queue = [root]
  while (queue.length) {
    res++
    let len = queue.length
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
    }
  }
  return res
}
```

- 方法二

  - 递归，使用前序（中左右）求的就是深度，使用后序（左右中）求的是高度。

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var maxDepth = function (root) {
  const getHeight = root => {
    // 返回当前节点高度
    if (!root) return 0
    const lH = getHeight(root.left)
    const rH = getHeight(root.right)
    return Math.max(lH, rH) + 1 // 后序
  }
  return getHeight(root)
}

// 前序，相当于回溯
var maxDepth = function (root) {
  const getDepth = (root, depth) => {
    res = Math.max(res, depth)
    if (root.left) {
      getDepth(root.left, depth + 1)
    }
    if (root.right) {
      getDepth(root.right, depth + 1)
    }
  }
  let res = 0
  if (!root) return res
  getDepth(root, 1)
  return res
}
```

#### [N 叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/) 同理

### 7.5 [二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

题目：

- 方法一

  - 层序，**只有当左右孩子都为空的时候，才说明遍历的最低点了**。

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var minDepth = function (root) {
  let res = 0
  if (!root) return res
  const queue = [root]
  while (queue.length) {
    res++
    let len = queue.length
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      if (!cur.left && !cur.right) return res
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
    }
  }
  return res
}
```

- 方法二

  - 递归

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
// 错误代码-----没有左孩子的分支会算为最短深度
// var minDepth = function (root) {
//     if (!root) return 0;
//     return Math.min(minDepth(root.left), minDepth(root.right) )+ 1;
// };

var minDepth = function (root) {
  if (!root) return 0
  const lH = minDepth(root.left)
  const rH = minDepth(root.right)
  if (!root.left && root.right) return rH + 1
  else if (root.left && !root.right) return lH + 1
  else return Math.min(lH, rH) + 1
}
```

### 7.6 [完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)

题目：

- 方法一

  - 当作普通二叉树，递归 or 迭代都可

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var countNodes = function (root) {
  if (!root) return 0
  return countNodes(root.left) + countNodes(root.right) + 1
}

var countNodes = function (root) {
  let res = 0
  if (!root) return res
  const queue = [root]
  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      res++
      const cur = queue.shift()
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }
  }
  return res
}
```

- 方法二

  - 完全二叉树性质
    - 满二叉树（最左侧高度等于最右侧高度）：可以直接用 2^树深度 - 1 来计算，注意这里根节点深度为 1。
    - 最后一层叶子节点没有满（最左侧高度不等于最右侧高度）：分别递归左孩子，和右孩子，递归到某一深度一定会有左孩子或者右孩子为满二叉树，然后依然可以按照情况 1 来计算。
  - 时间复杂度：O(log n × log n)
  - 空间复杂度：O(log n)

```javascript
var countNodes = function (root) {
  if (!root) return 0
  let left = root.left,
    right = root.right
  let lH = 0,
    rH = 0
  while (left) {
    lH++
    left = left.left
  }
  while (right) {
    rH++
    right = right.right
  }
  if (lH === rH) return Math.pow(2, lH + 1) - 1
  return countNodes(root.left) + countNodes(root.right) + 1
}
```

### 7.7 [平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

题目：

- 方法一

  - 递归

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var isBalanced = function (root) {
    // 返回以该节点为根节点的二叉树的高度，如果不是二叉搜索树了则返回-1
    const getHeight = (root) => {
        if (!root) return 0;
        const lH = getHeight(root.left);
        if (lH === -1) return -1;
        const rH = getHeight(root.right);
        if (rH === -1) return -1;
        if (Math.abs(lH - rH) > 1) return -1;
        else return Math.max(lH, rH) + 1;

    const res = getHeight(root);
    return res !== -1;
};
```

### 7.8 [二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

题目：

- 方法一

  - 回溯
  - 本题要找到叶子节点，就开始结束的处理逻辑了
    - **回溯和递归是一一对应的，有一个递归，就要有一个回溯**

- 时间复杂度：O(n^2)
  - 空间复杂度：O(n^2)

```javascript
var binaryTreePaths = function (root) {
  const backtraking = root => {
    if (!root.left && !root.right) {
      res.push(path.slice().join(''))
      return
    }

    if (root.left) {
      path.push('->')
      path.push(root.left.val)
      backtraking(root.left)
      path.pop()
      path.pop()
    }
    if (root.right) {
      path.push('->')
      path.push(root.right.val)
      backtraking(root.right)
      path.pop()
      path.pop()
    }
  }
  if (!root) return []
  let res = [],
    path = [root.val]
  backtraking(root)
  return res
}
```

- 方法一

  - 迭代，队列
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n^2)

```javascript
var binaryTreePaths = function (root) {
  let res = []
  if (!root) return res
  let nodeq = [root],
    pathq = [root.val + '']
  while (nodeq.length) {
    const len = nodeq.length
    for (i = 0; i < len; i++) {
      const cur = nodeq.shift()
      const path = pathq.shift()
      if (!cur.left && !cur.right) res.push(path)
      if (cur.left) {
        nodeq.push(cur.left)
        pathq.push(path + '->' + cur.left.val)
      }
      if (cur.right) {
        nodeq.push(cur.right)
        pathq.push(path + '->' + cur.right.val)
      }
    }
  }
  return res
}
```

### 7.9 [左叶子之和](https://leetcode-cn.com/problems/sum-of-left-leaves/)

题目：

- 方法一

  - 通过节点的父节点来判断其左孩子是不是左叶子了

    前序

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var sumOfLeftLeaves = function (root) {
  let res = 0
  const dfs = root => {
    if (!root) return
    if (root.left && !root.left.left && !root.left.right) res += root.left.val
    dfs(root.left)
    dfs(root.right)
  }
  dfs(root)
  return res
}
```

- 方法二
  - 层序迭代
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var sumOfLeftLeaves = function (root) {
  let res = 0
  if (!root) return res
  const stack = [root]
  while (stack.length) {
    const len = stack.length
    for (let i = 0; i < len; i++) {
      const cur = stack.shift()
      if (cur.left && !cur.left.left && !cur.left.right) {
        res += cur.left.val
      }
      cur.left && stack.push(cur.left)
      cur.right && stack.push(cur.right)
    }
  }
  return res
}
```

### 7.10 [找树左下角的值](https://leetcode-cn.com/problems/find-bottom-left-tree-value/)

题目：

- 方法一

  - 层序，记录每一行第一个节点

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var findBottomLeftValue = function (root) {
  let res = null
  const stack = [root]
  while (stack.length) {
    const len = stack.length
    for (let i = 0; i < len; i++) {
      const cur = stack.shift()
      if (i === 0) {
        res = cur.val
      }
      cur.left && stack.push(cur.left)
      cur.right && stack.push(cur.right)
    }
  }
  return res
}
```

- 方法二

  - 递归

    最后一行，深度最大的叶子节点

    最左边，前序遍历

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var findBottomLeftValue = function (root) {
  let maxDepth = -Infinity
  let maxVal = -Infinity
  const traversal = (root, leftDepth) => {
    if (!root.left && !root.right) {
      if (leftDepth > maxDepth) {
        maxDepth = leftDepth
        maxVal = root.val
      }
      return
    }
    if (root.left) {
      leftDepth++
      traversal(root.left, leftDepth)
      leftDepth--
    }
    if (root.right) {
      leftDepth++
      traversal(root.right, leftDepth)
      leftDepth--
    }
  }
  traversal(root, 0)
  return maxVal
}
```

### 7.11 [路径总和](https://leetcode-cn.com/problems/path-sum/)

题目：

- 方法一

  - **递归什么时候需要返回值**
    - 如果要搜索其中一条符合条件的路径，那么递归一定需要返回值，因为遇到符合条件的路径了就要及时返回。（本题）
    - 如果需要搜索整颗二叉树且不用处理递归返回值，递归函数就不要返回值。（7.12）
  - 如果需要搜索整颗二叉树且需要处理递归返回值，递归函数就需要返回值。
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var hasPathSum = function (root, targetSum) {
  const traversal = (root, cnt) => {
    if (!root.left && !root.right) {
      if (cnt === 0) {
        return true
      } else {
        return false
      }
    }
    if (root.left && traversal(root.left, cnt - root.left.val)) return true
    if (root.right && traversal(root.right, cnt - root.right.val)) return true
    return false
  }
  if (!root) return false
  return traversal(root, targetSum - root.val)
}
```

### 7.12 [路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)

题目：

- 方法一

  - 递归

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var pathSum = function (root, targetSum) {
  const traversal = (root, cnt) => {
    if (!root.left && !root.right) {
      if (cnt === 0) {
        res.push(path.slice())
      }
      return
    }
    if (root.left) {
      path.push(root.left.val)
      traversal(root.left, cnt - root.left.val)
      path.pop()
    }
    if (root.right) {
      path.push(root.right.val)
      traversal(root.right, cnt - root.right.val)
      path.pop()
    }
  }
  const res = [],
    path = []
  if (!root) return res
  path.push(root.val)
  traversal(root, targetSum - root.val)
  return res
}
```

### 7.13 [从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

题目：

- 方法一

  - 中：左根右

    后：左右根

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var buildTree = function (inorder, postorder) {
  if (!postorder.length) return null
  // 取后序最后一个
  let rootVal = postorder.pop()
  const root = new TreeNode(rootVal)
  // 在中序中找分割点
  let i = 0
  for (; i < inorder.length; i++) {
    if (inorder[i] === rootVal) break
  }
  // 构造
  root.left = buildTree(inorder.slice(0, i), postorder.slice(0, i))
  root.right = buildTree(inorder.slice(i + 1), postorder.slice(i))
  return root
}
```

### 7.14 [从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

题目：

- 方法一

  - 前：根左右

    中：左根右

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var buildTree = function (preorder, inorder) {
  if (!preorder.length) return null
  let rootVal = preorder.shift()
  const root = new TreeNode(rootVal)
  let i = 0
  for (; i < inorder.length; i++) {
    if (inorder[i] === rootVal) break
  }
  root.left = buildTree(preorder.slice(0, i), inorder.slice(0, i))
  root.right = buildTree(preorder.slice(i), inorder.slice(i + 1))
  return root
}
```

**前序和后序不能唯一确定一颗二叉树！**，因为没有中序遍历无法确定左右部分，也就是无法分割。

### 7.15 [最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

题目：

- 方法一

  - 跟前两题思路一样

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var constructMaximumBinaryTree = function (nums) {
  if (!nums.length) return null
  let maxVal = -Infinity
  let maxIndex = -1
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxVal) {
      maxVal = nums[i]
      maxIndex = i
    }
  }
  const root = new TreeNode(maxVal)
  root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex))
  root.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1))
  return root
}

// 优化----每次分隔不用定义新的数组，而是通过下标索引直接在原数组上操作。
var constructMaximumBinaryTree = function (nums) {
  const build = (nums, start, end) => {
    if (start > end) return null
    let maxVal = -Infinity
    let maxIndex = -1
    for (let i = start; i <= end; i++) {
      if (nums[i] > maxVal) {
        maxVal = nums[i]
        maxIndex = i
      }
    }
    const root = new TreeNode(maxVal)
    root.left = build(nums, start, maxIndex - 1)
    root.right = build(nums, maxIndex + 1, end)
    return root
  }

  return build(nums, 0, nums.length - 1)
}
```

### 7.16 [合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)

题目：

- 方法一

  - 前序递归

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var mergeTrees = function (root1, root2) {
  if (!root1) return root2
  if (!root2) return root1
  root1.val += root2.val
  root1.left = mergeTrees(root1.left, root2.left)
  root1.right = mergeTrees(root1.right, root2.right)
  return root1
}
```

- 方法二

  - 层序迭代

    如何同时处理两棵树呢？把两个树的节点同时加入队列进行比较。

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var mergeTrees = function (root1, root2) {
  if (!root1) return root2
  if (!root2) return root1
  const queue = [root1, root2]
  while (queue.length) {
    const cur1 = queue.shift()
    const cur2 = queue.shift()
    cur1.val += cur2.val
    if (cur1.left && cur2.left) {
      queue.push(cur1.left)
      queue.push(cur2.left)
    }
    if (cur1.right && cur2.right) {
      queue.push(cur1.right)
      queue.push(cur2.right)
    }
    if (!cur1.left && cur2.left) {
      cur1.left = cur2.left
    }
    if (!cur1.right && cur2.right) {
      cur1.right = cur2.right
    }
  }
  return root1
}
```

### 7.17 [二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)

题目：利用二叉搜索树的特性

- 方法一

  - 递归

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var searchBST = function (root, val) {
  if (!root) return null
  if (root.val === val) return root
  else if (root.val > val) return searchBST(root.left, val)
  else return searchBST(root.right, val)
}
```

- 方法二

  - 迭代

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var searchBST = function (root, val) {
  if (!root) return null
  while (root) {
    if (root.val === val) return root
    else if (root.val > val) root = root.left
    else root = root.right
  }
  return null
}
```

### 7.18 [验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

题目：

- 方法一

  - 中序遍历，再比较数组

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var isValidBST = function (root) {
  const arr = []
  const inorder = root => {
    if (!root) return
    inorder(root.left)
    arr.push(root.val)
    inorder(root.right)
  }
  inorder(root)
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) return false
  }
  return true
}
```

- 方法二

  - 中序递归

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var isValidBST = function (root) {
  let pre = null
  const helper = root => {
    if (!root) return true
    if (!helper(root.left)) {
      return false
    }
    if (pre && root.val <= pre.val) {
      return false
    }
    pre = root
    if (!helper(root.right)) {
      return false
    }
    return true
  }
  return helper(root)
}
```

### 7.19 [二叉搜索树的最小绝对差](https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/)

题目：遇到在二叉搜索树上求什么最值啊，差值之类的，就把它想成在一个有序数组上求最值，求差值，这样就简单多了。

- 方法一

  - 需要辅助数组

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var getMinimumDifference = function (root) {
  const arr = []
  const traversal = root => {
    if (!root) return
    traversal(root.left)
    arr.push(root.val)
    traversal(root.right)
  }
  traversal(root)
  let res = Infinity
  for (let i = 1; i < arr.length; i++) {
    res = Math.min(res, arr[i] - arr[i - 1])
  }
  return res === Infinity ? -1 : res
}
```

- 方法二
  - 递归中记录前一个节点的指针
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var getMinimumDifference = function (root) {
  let pre = null
  let res = Infinity
  const traversal = root => {
    if (!root) return
    traversal(root.left)
    if (pre) {
      res = Math.min(res, root.val - pre.val)
    }
    pre = root
    traversal(root.right)
  }
  traversal(root)
  return res === Infinity ? -1 : res
}
```

- 方法三
  - 中序迭代
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var getMinimumDifference = function (root) {
  let res = Infinity
  let pre = null
  const stack = [root]
  // 中序：左中右
  while (stack.length) {
    const cur = stack.pop()
    if (cur) {
      cur.right && stack.push(cur.right)
      stack.push(cur)
      stack.push(null)
      cur.left && stack.push(cur.left)
    } else {
      const cur1 = stack.pop()
      if (pre) res = Math.min(res, cur1.val - pre.val)
      pre = cur1
    }
  }
  return res === Infinity ? -1 : res
}
```

### 7.20 [二叉搜索树中的众数](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/)

题目：

- 方法一

  - 当成普通二叉树，任何遍历都行，map 记录频率
  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var findMode = function (root) {
  const map = new Map()
  const traversal = root => {
    if (!root) return
    map.set(root.val, (map.get(root.val) || 0) + 1)
    traversal(root.left)
    traversal(root.right)
  }
  traversal(root)
  let maxcnt = -Infinity
  let maxnum = -Infinity
  for (const val of map.values()) {
    if (val > maxcnt) {
      maxcnt = t
    }
  }

  const res = []
  for (let [key, val] of map.entries()) {
    if (val === maxcnt) {
      res.push(key)
    }
  }
  return res
}
```

- 方法二

  - 二叉搜索树，中序，pre 指针和 cur 指针

    只需要遍历一次就可以找到所有的众数

    - 频率 count 等于 maxCount（最大频率），当然要把这个元素加入到结果集中
    - 频率 count 大于 maxCount 的时候，不仅要更新 maxCount，而且要清空结果集

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var findMode = function (root) {
  const traversal = root => {
    if (!root) return
    traversal(root.left)
    if (!pre || pre.val !== root.val) cnt = 1
    else cnt++
    if (cnt === maxcnt) res.push(root.val)
    else if (cnt > maxcnt) {
      res = []
      res.push(root.val)
      maxcnt = cnt
    }
    pre = root
    traversal(root.right)
  }
  let maxcnt = -Infinity,
    cnt = 0,
    pre = null
  let res = []
  traversal(root)
  return res
}
```

### 7.21 [二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

题目：

- 方法一

  - 后序遍历就是天然的回溯过程，最先处理的一定是叶子节点。

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var lowestCommonAncestor = function (root, p, q) {
  if (!root || root === p || root === q) return root
  const l = lowestCommonAncestor(root.left, p, q)
  const r = lowestCommonAncestor(root.right, p, q)
  if (l && r) return root
  else if (l) return l
  else return r
}
```

### 7.22 [二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

题目：

- 方法一

  - 从上到下遍历的时候，cur 节点是数值在[p, q]区间中则说明该节点 cur 就是最近公共祖先了

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var lowestCommonAncestor = function (root, p, q) {
  if (root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q)
  else if (root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q)
  else return root
}
```

- 方法二
  - 迭代
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var lowestCommonAncestor = function (root, p, q) {
  while (root) {
    if (root.val > p.val && root.val > q.val) root = root.left
    else if (root.val < p.val && root.val < q.val) root = root.right
    else return root
  }
  return null
}
```

### 7.23 [二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

题目：

- 方法一

  - 只要遍历二叉搜索树，找到空节点 插入元素就可以了

    通过递归函数的返回值完成父子节点的赋值是可以带来便利的。

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var insertIntoBST = function (root, val) {
  if (!root) {
    const node = new TreeNode(val)
    return node
  }
  if (val < root.val) root.left = insertIntoBST(root.left, val)
  if (val > root.val) root.right = insertIntoBST(root.right, val)
  return root
}
```

- 方法二
  - 迭代，pre 和 cur
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var insertIntoBST = function (root, val) {
  if (!root) {
    const node = new TreeNode(val)
    return node
  }
  let cur = root
  let pre = null
  while (cur) {
    pre = cur
    if (val < cur.val) cur = cur.left
    else cur = cur.right
  }
  const node = new TreeNode(val)
  if (val < pre.val) pre.left = node
  else pre.right = node
  return root
}
```

### 7.24 [删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/)

题目：

- 方法一

  - 左右孩子节点都不为空，则将删除节点的左子树头结点（左孩子）放到删除节点的右子树的最左面节点的左孩子上，返回删除节点右孩子为新的根节点。

- 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var deleteNode = function (root, key) {
  if (!root) return root
  if (root.val === key) {
    if (root.left && root.right) {
      let cur = root.right
      while (cur.left) {
        cur = cur.left
      }
      cur.left = root.left
      return root.right
    } else if (root.left && !root.right) {
      return root.left
    } else if (!root.left && root.right) {
      return root.right
    } else {
      return null
    }
  } else if (root.val > key) root.left = deleteNode(root.left, key)
  else root.right = deleteNode(root.right, key)
  return root
}
```

### 7.25 [修剪二叉搜索树](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)

题目：

- 方法一

  - 递归

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var trimBST = function (root, low, high) {
  if (!root) return null
  if (root.val < low) return trimBST(root.right, low, high)
  else if (root.val > high) return trimBST(root.left, low, high)
  else {
    root.left = trimBST(root.left, low, high)
    root.right = trimBST(root.right, low, high)
  }
  return root
}
```

### 7.26 [将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

题目：

- 方法一

  - 分割点就是数组中间位置的节点。

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var sortedArrayToBST = function (nums) {
  const build = (nums, start, end) => {
    if (start > end) return null
    let mid = start + Math.floor((end - start) / 2)
    const root = new TreeNode(nums[mid])
    root.left = build(nums, start, mid - 1)
    root.right = build(nums, mid + 1, end)
    return root
  }
  return build(nums, 0, nums.length - 1)
}
```

### 7.26 [把二叉搜索树转换为累加树](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)

题目：

- 方法一

  - 反中序，pre 保存前一个节点值

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var convertBST = function (root) {
  const traversal = root => {
    if (!root) return
    traversal(root.right)
    root.val += pre
    pre = root.val
    traversal(root.left)
  }
  let pre = 0
  traversal(root)
  return root
}
```

### 7.27 [二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

- 方法一
  - dfs：后续遍历，当前节点当转折点的值，当前节点向上提供的值。

```js
var maxPathSum = function (root) {
  let res = -Infinity
  const dfs = root => {
    if (!root) return 0
    const left = dfs(root.left) // 左子树提供的最大路径和
    const right = dfs(root.right) // 右子树提供的最大路径和
    const inner = root.val + left + right // 当前子树内部的最大路径和
    res = Math.max(res, inner)
    const out = root.val + Math.max(left, right) // 当前子树对外提供的最大和
    return out > 0 ? out : 0
  }
  dfs(root)
  return res
}
```

### 7.28 [二叉搜索树的第 k 大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

```js
var kthLargest = function (root, k) {
  const inorder = root => {
    if (!root) return
    inorder(root.right)
    if (--k === 0) {
      res = root.val
      return
    }
    inorder(root.left)
  }
  let res = null
  inorder(root)
  return res
}
```

### 7.29 [另一棵树的子树](https://leetcode-cn.com/problems/subtree-of-another-tree/)

```js
var isSubtree = function (root, subRoot) {
  if (!root && !subRoot) return true
  else if (!root || !subRoot) return false
  return (
    isSametree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
  )
}

var isSametree = function (p, q) {
  if (!p && !q) return true
  else if (!p || !q) return false
  return p.val === q.val && isSametree(p.left, q.left) && isSametree(p.right, q.right)
}
```

### 7.30 [BiNode](https://leetcode-cn.com/problems/binode-lcci/)

```js
// 中序递归
var convertBiNode = function (root) {
  const inorder = root => {
    if (!root) return
    inorder(root.left)
    pre.right = root
    root.left = null
    pre = root
    inorder(root.right)
  }
  let dummy = new TreeNode(0)
  let pre = dummy
  inorder(root)
  return dummy.right
}

// 中序迭代
var convertBiNode = function (root) {
  if (!root) return null
  let dummy = new TreeNode(0)
  let pre = dummy
  const s = [root]
  while (s.length) {
    let cur = s.pop()
    if (cur) {
      cur.right && s.push(cur.right)
      s.push(cur)
      s.push(null)
      cur.left && s.push(cur.left)
    } else {
      cur = s.pop()
      pre.right = cur
      cur.left = null
      pre = cur
    }
  }
  return dummy.right
}
```

### 7.31 [二叉搜索树的范围和](https://leetcode-cn.com/problems/range-sum-of-bst/)

```js
var rangeSumBST = function (root, low, high) {
  if (!root) return 0
  if (root.val < low) return rangeSumBST(root.right, low, high)
  else if (root.val > high) return rangeSumBST(root.left, low, high)
  return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
}
```

### 7.32 [二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

```js
var verifyPostorder = function (postorder) {
  if (postorder.length === 0) return true
  const rootval = postorder.pop()
  let i = 0
  for (; i < postorder.length; i++) {
    if (postorder[i] > rootval) break
  }
  for (let j = i + 1; j < postorder.length; j++) {
    if (postorder[j] < rootval) return false
  }
  return verifyPostorder(postorder.slice(0, i)) && verifyPostorder(postorder.slice(i))
}
```

### 7.33 [二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)

其实是分为三步：

- 首先将根节点的左子树变成链表
- 其次将根节点的右子树变成链表
- 最后将变成链表的右子树放在变成链表的左子树的最右边

这就是一个递归的过程，递归的一个非常重要的点就是：不去管函数的内部细节是如何处理的，我们只看其函数作用以及输入与输出。对于函数 flatten 来说：

- 函数作用：将一个二叉树，原地将它展开为链表
- 输入：树的根节点

- 输出：无

那我们就直接根据三步来写程序就可以了(妙！)

```js
var flatten = function (root) {
  if (!root) return
  flatten(root.left)
  flatten(root.right)
  const temp = root.right
  root.right = root.left
  root.left = null
  let cur = root
  while (cur.right) cur = cur.right
  cur.right = temp
}
```

```js
// 迭代
var flatten = function (root) {
  while (root) {
    if (!root.left) {
      root = root.right
    } else {
      let cur = root.left
      while (cur.right) {
        cur = cur.right
      }
      cur.right = root.right
      root.right = root.left
      root.left = null
      root = root.right
    }
  }
}
```

### 7.34 [路径总和 III](https://leetcode.cn/problems/path-sum-iii/)

- dfs

```js
var pathSum = function (root, targetSum) {
  const traversal = (root, cnt) => {
    if (cnt === 0) {
      res++
    }
    if (!root.left && !root.right) return
    if (root.left) traversal(root.left, cnt - root.left.val)
    if (root.right) traversal(root.right, cnt - root.right.val)
  }
  if (!root) return 0
  let res = 0
  traversal(root, targetSum - root.val)
  res += pathSum(root.left, targetSum)
  res += pathSum(root.right, targetSum)
  return res
}
```

- dfs+前缀和

```js
var pathSum = function (root, targetSum) {
  const traversal = (root, pre_sum) => {
    const cur_sum = pre_sum + root.val
    res += map.get(cur_sum - targetSum) || 0
    map.set(cur_sum, (map.get(cur_sum) || 0) + 1)
    root.left && traversal(root.left, cur_sum)
    root.right && traversal(root.right, cur_sum)
    map.set(cur_sum, map.get(cur_sum) - 1)
  }
  if (!root) return 0
  let res = 0
  const map = new Map() // 前缀和--节点数量
  map.set(0, 1)
  traversal(root, 0)
  return res
}
```

### 7.35 [寻找重复的子树](https://leetcode.cn/problems/find-duplicate-subtrees/)

```js
var findDuplicateSubtrees = function (root) {
  const traversal = root => {
    if (!root) return '#'
    const l = traversal(root.left)
    const r = traversal(root.right)
    const tree = `${root.val},${l},${r}`
    const freq = map.get(tree) || 0
    if (freq === 1) res.unshift(root)
    map.set(tree, freq + 1)
    return tree
  }
  const map = new Map()
  const res = []
  traversal(root)
  return res
}
```

### 7.36 [二叉树最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/)

- BFS
- 记录位置，注意大数

```
var widthOfBinaryTree = function (root) {
    if (!root) return 0;
    let res = 1;
    const q = [[root, 1n]];
    while (q.length) {
        const size = q.length;
        res = Math.max(res, Number(q[q.length - 1][1] - q[0][1] + 1n));
        for (let i = 0; i < size; i++) {
            const [cur, pos] = q.shift();
            cur.left && q.push([cur.left, pos * 2n]);
            cur.right && q.push([cur.right, pos * 2n + 1n]);
        }
    }
    return res;
};
```
