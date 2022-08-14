---
title: 13. 动态规划
date: 2021-12-22
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 13.1 动规步骤

1. 确定 dp 数组（dp table）以及下标的含义
2. 确定递推公式
3. dp 数组如何初始化
4. 确定遍历顺序
5. 举例推导 dp 数组

### 13.2 [斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

题目：斐波那契数列

- 方法一
  - dp
    - dp[i]:第 i 个数的斐波那契数值是 dp[i]
    - dp[i] = dp[i - 1] + dp[i - 2]
    - dp[0] = 0; dp[1] = 1;
    - 从前到后
    - 0 1 1 2 3 5 8 13 21 34 55
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var fib = function (n) {
  if (n <= 1) return n
  const dp = new Array(n + 1).fill(0)
  const MOD = 1000000007
  dp[0] = 0
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % MOD
  }
  return dp[n]
}
```

- 方法二
  - 方法一优化
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var fib = function (n) {
  if (n <= 1) return n
  const dp = [0, 1]
  let sum = 0
  const MOD = 1000000007
  for (let i = 2; i <= n; i++) {
    sum = (dp[0] + dp[1]) % MOD
    dp[0] = dp[1]
    dp[1] = sum
  }
  return sum
}
```

- 方法三：
  - 递归
  - 时间复杂度：O(2^n)，超时
  - 空间复杂度：O(n) 算上了编程语言中实现递归的系统栈所占空间

```javascript
var fib = function (n) {
  if (n <= 1) return n
  const MOD = 1000000007
  return (fib(n - 1) + fib(n - 2)) % MOD
}
```

### 13.3 [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

题目：假设你正在爬楼梯。需要 _n_ 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

- 方法一
  - dp
    - dp[i]： 爬到第 i 层楼梯，有 dp[i]种方法
    - dp[i] = dp[i - 1] + dp[i - 2]
    - dp[1] = 1，dp[2] = 2
    - 从前向后
    - 1 1 2 3 5 8
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var climbStairs = function (n) {
  const dp = new Array(n + 1).fill(0)
  ;(dp[0] = 1), (dp[1] = 1)
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
```

### 13.4 [使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)

题目：找出达到楼层顶部的最低花费。

- 方法一
  - dp
    - dp[i]： 到达第 i 个台阶所花费的最少花费
    - dp[i] = dp[i - 1] + dp[i - 2]
    - dp[1] = 1，dp[2] = 2
    - 从前向后
    - 1 1 2 3 5 8
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var minCostClimbingStairs = function (cost) {
  const n = cost.length
  const dp = new Array(n)
  dp[0] = 0
  dp[1] = 0
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }
  return dp[n]
}
```

### 13.5 [不同路径](https://leetcode-cn.com/problems/unique-paths/)

题目：左上角到右下角共多少条路径

- 方法一

  - dp

    - dp[i]\[j]：从(0,0)到(i, j) 不同的路径数目。

    - dp[i] = dp[i - 1]\[j] + dp[i]\[j-1]

    - dp[i]\[0] = 1，dp[0]\[j] = 1

    - 从左向右，从上向下

    - 1 1 1

      1 2 3

  - 时间复杂度：O(m \* n)

  - 空间复杂度：O(m \* n)

```javascript
var uniquePaths = function (m, n) {
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}
```

- 方法二
  - dfs
  - 时间复杂度：O(2^(m + n - 1) - 1)，超时
  - 空间复杂度：O(m+n-1)

```javascript
var uniquePaths = function (m, n) {
  return dfs(0, 0, m, n)
}
var dfs = function (i, j, m, n) {
  if (i >= m || j >= n) return 0
  if (i == m - 1 && j == n - 1) return 1
  return dfs(i + 1, j, m, n) + dfs(i, j + 1, m, n)
}
```

- 方法三
  - 数学组合，从左上角到右下角的过程中，我们需要移动 m+n-2 次，其中有 m-1 次向下移动，n-1 次向右移动。因此路径的总数，就等于从 m+n-2 次移动中选择 m-1 次向下移动的方案数 或 从 m+n-2 次移动中选择 n-1 次向右移动的方案数，即组合数：
  - 时间复杂度：O(m)
  - 空间复杂度：O(1)

```javascript
var uniquePaths = function (m, n) {
  let res = 1
  // C(m+n-2)(n-1) = C(m+n-2)(m-1) ---- 计算时要防止相乘溢出，所以应该乘除并行
  for (let x = 1, y = m; x < n; x++, y++) {
    res = Math.floor((res * y) / x)
  }
  return res
}
```

### 13.6 [不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)

题目：左上角到右下角共多少条路径，有障碍物

- 方法一

  - dp

    - dp[i]\[j]：从(0,0)到(i, j) 不同的路径数目。

    - 如果无障碍，dp[i] = dp[i - 1]\[j] + dp[i]\[j-1]，有障碍不变

    - 如果无障碍，dp[i]\[0] = 1，dp[0]\[j] = 1，有障碍不变

    - 从左向右，从上向下

    - 1 0

      1 1

  - 时间复杂度 O(n \* m)

  - 空间复杂度 O(n \* m)

```javascript
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1
  }
  for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) {
    dp[0][j] = 1
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }
  return dp[m - 1][n - 1]
}
```

### 13.7 [整数拆分](https://leetcode-cn.com/problems/integer-break/)

题目：给定一个正整数 _n_，将其拆分为**至少**两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

- 方法一
  - dp
    - dp[i]：数字 i，可以得到的最大乘积。
    - dp[i]=max(dp[i], dp[i-j]\*j, (i-j)\*j)
    - dp[2] = 1
    - 从前向后
    - 1 1 1 2 4 6 9 12
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n)

```javascript
var integerBreak = function (n) {
  const dp = new Array(n + 1).fill(0)
  dp[2] = 1
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i - 1; j++) {
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
    }
  }
  return dp[n]
}
```

- 方法二
  - 贪心，每次拆成 n 个 3，如果剩下是 4，则保留 4，然后相乘
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var integerBreak = function (n) {
  if (n === 2) return 1
  if (n === 3) return 2
  if (n === 4) return 4
  let res = 1
  while (n > 4) {
    res *= 3
    n -= 3
  }
  res *= n
  return res
}
```

### 13.8 01 背包

题目：有 N 件物品和一个最多能被重量为 W 的背包。第 i 件物品的重量是 weight[i]，得到的价值是 value[i] 。每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大。

- 方法一
  - dp
    - dp[i]\[j]：前 i 件物品装入容量为 j 的背包所能得到的最大总价值
    - dp[i]\[j]=max(dp[i-1]\[j],dp[i-1]\[j-w[i]]+v[i])
    - dp[0]\[j] = value[0];
    - 从前向后
    - 画表格
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n^2)

```javascript
var bag = function (weight, value, bagWeight) {
  const n = weight.length
  const dp = new Array(n + 1).fill(0).map(() => new Array(bagWeight + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    const w = weight[i - 1]
    const v = value[i - 1]
    for (let j = 1; j <= bagWeight; j++) {
      if (j < w) dp[i][j] = dp[i - 1][j]
      // 当前物品装不下
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v) // 当前物品装得下，装或不装
    }
  }
  return dp[n - 1][bagWeight]
}
```

- 方法二
  - 方法一优化，滚动数组
    - dp[j]：容量为 j 的背包所能得到的最大总价值
    - dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
    - dp[0]=0
    - **外层 for 循环遍历物品，内层 for 循环遍历背包容量且从后向前遍历！**
    - 画表格
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n)

```javascript
var bag = function (weight, value, bagWeight) {
  const n = weight.length
  const dp = new Array(bagWeight + 1).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = bagWeight; j >= weight[i]; j--) {
      // 逆向，用到上一条数据
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    }
  }
  return dp[bagWeight]
}
```

### 13.9 [分割等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/)

题目：给你一个 **只包含正整数** 的 **非空** 数组 `nums` 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

- 方法一
  - 转换为 01 背包
    - 背包的容量为 sum / 2
    - 背包要放入的商品（集合里的元素）重量为元素的数值，价值也为元素的数值
    - 背包如何正好装满，说明找到了总和为 sum / 2 的子集。
    - 背包中每一个元素是不可重复放入。
  - dp
    - dp[j]：背包总容量是 j，最大可以凑成 j 的子集总和。
    - dp[j] = max(dp[j], dp[j - nums[i]] + nums[i])
    - dp[0]=0
    - 从后往前
    - 画表格
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n)

```javascript
var canPartition = function (nums) {
  // 01背包存在问题
  const sum = nums.reduce((pre, cur) => pre + cur)
  if (sum & 1) return false
  const target = sum / 2
  const dp = new Array(target + 1).fill(false)
  dp[0] = true
  for (let num of nums) {
    for (let i = target; i >= num; i--) {
      dp[i] = dp[i] || dp[i - num]
    }
  }
  return dp[target]
}
```

### 13.10 [最后一块石头的重量 II](https://leetcode-cn.com/problems/last-stone-weight-ii/)

题目：返回此石头 **最小的可能重量**

- 方法一
  - 转换为 01 背包
    - 尽量让石头分成重量相同的两堆，相撞之后剩下的石头最小
    - 背包的容量为 sum / 2
    - 背包要放入的商品（集合里的元素）重量为石头的质量，价值为石头的重量
    - 背包尽可能装满。
    - 背包中每一个元素是不可重复放入。
  - dp
    - dp[j]：背包总容量是 j，最大可以凑成 j 的子集总和。
    - dp[j] = max(dp[j], dp[j - nums[i]] + nums[i])
    - dp[0]=0
    - 从后往前
    - 画表格
  - 时间复杂度：O(m\*n)
  - 空间复杂度：O(m)

```javascript
var lastStoneWeightII = function (stones) {
  // 01背包最值问题
  const sum = stones.reduce((pre, cur) => pre + cur)
  const target = ~~(sum / 2)
  const dp = new Array(target + 1).fill(0)
  for (let stone of stones) {
    for (let i = target; i >= stone; i--) {
      dp[i] = Math.max(dp[i], dp[i - stone] + stone)
    }
  }
  // sum-dp[target] - dp[target]
  return sum - dp[target] * 2
}
```

### 13.11 [目标和](https://leetcode-cn.com/problems/target-sum/)

题目：向数组中的每个整数前添加 `'+'` 或 `'-'` ，然后串联起所有整数，返回可以通过上述方法构造的、运算结果等于 `target` 的不同 **表达式** 的数目。

- 方法一
  - 转换为 01 背包
    - sum(+) -（sum-sum(+)）= target
    - sum(+) = (sum+target)/2
  - dp
    - dp[j]：填满 j（包括 j）这么大容积的包，有 dp[i]种方法
    - dp[j]+=dp[j-nums[i]]
    - dp[0]=1
    - 从后往前
    - 画表格
  - 时间复杂度：O(n\*m)
  - 空间复杂度：O(m)

```javascript
var findTargetSumWays = function (nums, target) {
  // 01背包组合问题
  // 正-（sum-正）= target --- 正 = （target+sum）/ 2
  const sum = nums.reduce((pre, cur) => pre + cur)
  if ((target + sum) & 1 || sum < Math.abs(target)) return 0
  target = (target + sum) / 2
  const dp = new Array(target + 1).fill(0)
  dp[0] = 1
  for (let num of nums) {
    for (let i = target; i >= num; i--) {
      dp[i] += dp[i - num]
    }
  }
  return dp[target]
}
```

### 13.12 [一和零](https://leetcode-cn.com/problems/ones-and-zeroes/)

题目：

- 方法一
  - 转换为 01 背包
    - 这个背包有两个维度，一个是 m 一个是 n
    - 不同长度的字符串就是不同大小的待装物品
  - dp
    - dp[i]\[j]：最多有 i 个 0 和 j 个 1 的 strs 的最大子集的大小为 dp[i]\[j]。
    - dp[i]\[j] = max(dp[i]\[j], dp[i - zeroNum]\[j - oneNum] + 1)
    - dp[i]\[j]=0
    - 从后往前
    - 画表格
  - 时间复杂度：O(len\*m\*n)
  - 空间复杂度：O(m\*n)

```javascript
var findMaxForm = function (strs, m, n) {
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let str of strs) {
    let zero = 0,
      one = 0
    for (let ch of str) {
      if (ch === '0') zero++
      else one++
    }
    for (let i = m; i >= zero; i--) {
      for (let j = n; j >= one; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - zero][j - one] + 1)
      }
    }
  }
  return dp[m][n]
}
```

### 13.13 完全背包

题目**：完全背包和 01 背包问题唯一不同的地方就是，每种物品有无限件**。

```javascript
// 二维朴素
var bag = function (weight, value, bagWeight) {
  const n = weight.length
  const dp = new Array(n + 1).fill(0).map(() => new Array(bagWeight + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    const w = weight[i - 1]
    const v = value[i - 1]
    for (let j = 1; j <= bagWeight; j++) {
      for (let k = 0; k * w <= j; k++) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - k * w] + k * v)
      }
    }
  }
  return dp[n][bagWeight]
}
```

```javascript
// 二维进阶
var bag = function (weight, value, bagWeight) {
  const n = weight.length
  const dp = new Array(n + 1).fill(0).map(() => new Array(bagWeight + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    const w = weight[i - 1]
    const v = value[i - 1]
    for (let j = 1; j <= bagWeight; j++) {
      if (j < w) dp[i][j] = dp[i - 1][j]
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - w] + v)
    }
  }
  return dp[n][bagWeight]
}
```

```javascript
// 一维，先遍历物品，再遍历背包容量
var bag = function (weight, value, bagWeight) {
  const n = weight.length
  const dp = new Array(bagWeight + 1).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = weight[i]; j <= bagWeight; j++) {
      // 正向，用到本条数据
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    }
  }
  return dp[bagWeight]
}
```

```javascript
// 一维，先遍历背包容量，再遍历物品
var bag = function (weight, value, bagWeight) {
  const n = weight.length
  const dp = new Array(bagWeight + 1).fill(0)
  for (let j = 0; j <= bagWeight; j++) {
    for (let i = 0; i < n; i++) {
      if (j >= weight[i]) dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    }
  }
  return dp[bagWeight]
}
```

<img src="/imgs/背包公式推导.png"/>

### 13.14 [零钱兑换 II](https://leetcode-cn.com/problems/coin-change-2/)

题目：

- 方法一
  - 转换为完全背包，装满背包有几种方案，与纯完全背包有所区别（求是否能装满背包），求组合数
  - dp
    - dp[j]：凑成总金额 j 的货币组合数为 dp[j]
    - dp[j] += dp[j - coins[i]]
    - dp[0] = 1
    - 外层 for 遍历物品，内层 for 循环遍历背包
  - 时间复杂度：O(m\*n)
  - 空间复杂度：O(n)

```javascript
var change = function (amount, coins) {
  // 完全背包组合问题
  const dp = new Array(amount + 1).fill(0)
  dp[0] = 1
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin]
    }
  }
  return dp[amount]
}
```

ps：

- 如果求组合数就是外层 for 循环遍历物品，内层 for 遍历背包。
- 如果求排列数就是外层 for 遍历背包，内层 for 循环遍历物品。

### 13.15 [组合总和 Ⅳ](https://leetcode-cn.com/problems/combination-sum-iv/)

题目：

- 方法一
  - 转换为完全背包，求排列数
  - dp
    - dp[j]: 凑成目标正整数为 j 的排列个数为 dp[j]
    - dp[j] += dp[j - coins[i]]
    - dp[0] = 1
    - 外层 for 循环遍历背包，内层 for 遍历物品
      - 如果把遍历 nums（物品）放在外循环，遍历 target 的作为内循环的话，举一个例子：计算 dp[4]的时候，结果集只有 {1,3} 这样的集合，不会有{3,1}这样的集合，因为 nums 遍历放在外层，3 只能出现在 1 后面！
  - 时间复杂度：O(m\*n)
  - 空间复杂度：O(n)

```javascript
var combinationSum4 = function (nums, target) {
  // 完全背包排列问题
  const dp = new Array(target + 1).fill(0)
  dp[0] = 1
  for (let i = 1; i <= target; i++) {
    for (let num of nums) {
      if (i >= num) dp[i] += dp[i - num]
    }
  }
  return dp[target]
}
```

### 13.16 爬楼梯进阶

题目**：改为：一步一个台阶，两个台阶，三个台阶，.......，直到 m 个台阶。问有多少种不同的方法可以爬到楼顶呢？**

- 方法一
  - 1 阶，2 阶，.... m 阶就是物品，楼顶就是背包。转换为完全背包，求排列数
  - dp
    - dp[j]：爬到有 j 个台阶的楼顶，有 dp[j]种方法
    - dp[j] += dp[j - nums[i]]
    - dp[0] = 1
    - 外层 for 循环遍历背包，内层 for 遍历物品
  - 时间复杂度：O(m\*n)
  - 空间复杂度：O(n)

```javascript
var climbStairs = function (n) {
  const dp = new Array(n + 1).fill(0)
  const weight = [1, 2]
  dp[0] = 1
  for (let j = 0; j <= n; j++) {
    for (let i = 0; i < weight.length; i++) {
      if (j >= weight[i]) dp[j] += dp[j - weight[i]]
    }
  }
  return dp[n]
}
```

### 13.17 [零钱兑换](https://leetcode-cn.com/problems/coin-change/)

题目：

- 方法一
  - 转换为完全背包，排列组合均可
  - dp
    - dp[j]：凑足总额为 j 所需钱币的最少个数为 dp[j]
    - dp[j] = min(dp[j - coins[i]] + 1, dp[j])
    - dp[0] = 0，其他无限大
    - 外层 for 循环遍历物品，内层 for 遍历背包
  - 时间复杂度：O(m\*n)
  - 空间复杂度：O(n)

```javascript
var coinChange = function (coins, amount) {
  // 完全背包最值问题
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1)
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}
```

### 13.18 [完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

题目：

- 方法一
  - 转换为完全背包，完全平方数就是物品（可以无限件使用），凑个正整数 n 就是背包，问凑满这个背包最少有多少物品？
  - dp
    - dp[j]：和为 j 的完全平方数的最少数量为 dp[j]
    - dp[j] = min(dp[j - i*i] + 1, dp[j])
    - dp[0] = 0，其他无限大
    - 外层 for 循环遍历物品，内层 for 遍历背包
  - 时间复杂度：O(m\*n)
  - 空间复杂度：O(n)

```javascript
var numSquares = function (n) {
  // 完全背包最值问题
  const dp = new Array(n + 1).fill(Infinity)
  dp[0] = 0
  for (let num = 1; num <= Math.sqrt(n); num++) {
    for (let i = num * num; i <= n; i++) {
      dp[i] = Math.min(dp[i], dp[i - num * num] + 1)
    }
  }
  return dp[n]
}
```

### 13.19 [单词拆分](https://leetcode-cn.com/problems/word-break/)

题目：

- 方法一
  - 转换为完全背包，单词就是物品，字符串 s 就是背包，单词能否组成字符串 s，就是问物品能不能把背包装满
  - dp
    - dp[i] : 字符串长度为 i 的话，dp[i]为 true，表示可以拆分为一个或多个在字典中出现的单词。
    - if([j, i] 这个区间的子串出现在字典里 && dp[j]是 true) 那么 dp[i] = true
    - dp[0] = true
    - 外层 for 循环遍历背包，内层 for 遍历物品
  - 时间复杂度：O(m\*n)
  - 空间复杂度：O(n)

```javascript
var wordBreak = function (s, wordDict) {
  // 完全背包存在问题
  const n = s.length
  const dp = new Array(n + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= n; i++) {
    for (let w of wordDict) {
      if (i >= w.length && w === s.substring(i - w.length, i) && dp[i - w.length]) {
        dp[i] = true
        break
      }
    }
  }
  return dp[n]
}
```

### 13.20 多重背包

题目：多重背包和 01 背包问题唯一不同的地方就是，每种物品有限定个数。

- 转换：每件物品最多有 Mi 件可用，把 Mi 件摊开，其实就是一个 01 背包问题了。

- 时间复杂度：$O(m × n × k)$，m：物品种类个数，n 背包容量，k 单类物品数量

```javascript
// 将物品展开数量为1
var bag = function (weight, value, nums, bagWeight) {
  let n = weight.length
  const dp = new Array(bagWeight + 1).fill(0)
  for (let i = 0; i < n; i++) {
    while (nums[i] > 1) {
      weight.push(weight[i])
      value.push(value[i])
      nums[i]--
    }
  }
  n = weight.length
  for (let i = 0; i < n; i++) {
    for (let j = bagWeight; j >= weight[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    }
  }
  return dp[bagWeight]
}
```

```javascript
// 改变遍历个数
var bag = function (weight, value, nums, bagWeight) {
  let n = weight.length
  const dp = new Array(bagWeight + 1).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = bagWeight; j >= weight[i]; j--) {
      for (let k = 1; k <= nums[i] && j >= k * weight[i]; k++) {
        dp[j] = Math.max(dp[j], dp[j - k * weight[i]] + k * value[i])
      }
    }
  }
  return dp[bagWeight]
}
```

### 13.21 [掷骰子的 N 种方法](https://leetcode.cn/problems/number-of-dice-rolls-with-target-sum/)

- 分组背包--**「枚举物品组-枚举容量-枚举决策」**

```js
var numRollsToTarget = function (n, k, target) {
  // 分组背包问题
  const MOD = Math.pow(10, 9) + 7
  const dp = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(0))
  dp[0][0] = 1
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= target; j++) {
      for (let t = 1; t <= k; t++) {
        if (j >= t) dp[i][j] = (dp[i][j] + dp[i - 1][j - t]) % MOD
      }
    }
  }
  return dp[n][target]
}
```

### 13.21 背包总结

<img src="\imgs\背包问题.png"/>

- 背包分类的模板：
  1、0/1 背包：外循环 nums,内循环 target,target 倒序且 target>=nums[i];
  2、完全背包：外循环 nums,内循环 target,target 正序且 target>=nums[i];
  3、组合背包：外循环 target,内循环 nums,target 正序且 target>=nums[i];
  4、分组背包：这个比较特殊，需要三重循环：外循环背包 bags,内部两层循环根据题目的要求转化为 1,2,3 三种背包类型的模板

- 问题分类的模板：
  1、最值问题: dp[i] = max/min(dp[i], dp[i-nums]+1)或 dp[i] = max/min(dp[i], dp[i-num]+nums);
  2、存在问题(bool)：dp[i]=dp[i]||dp[i-num];
  3、组合问题：dp[i]+=dp[i-num];

### 13.22 [打家劫舍](https://leetcode-cn.com/problems/house-robber/)

题目：相邻报警

- 方法一

  - dp

    - dp[i]：考虑下标 i（包括 i）以内的房屋，最多可以偷窃的金额为 dp[i]。

    - 如果偷第 i 房间，那么 dp[i] = dp[i - 2] + nums[i] ，即：第 i-1 房一定是不考虑的，找出 下标 i-2（包括 i-2）以内的房屋，最多可以偷窃的金额为 dp[i-2] 加上第 i 房间偷到的钱。

      如果不偷第 i 房间，那么 dp[i] = dp[i - 1]，即考虑 i-1 房，**（注意这里是考虑，并不是一定要偷 i-1 房）**

      然后 dp[i]取最大值，即 dp[i] = max(dp[i - 2] + nums[i], dp[i - 1]);

    - dp[0] 一定是 nums[0]，dp[1]就是 nums[0]和 nums[1]的最大值即：dp[1] = max(nums[0], nums[1]);

    - 从前到后

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var rob = function (nums) {
  const n = nums.length
  if (n === 1) return nums[0]
  if (n === 2) return Math.max(nums[0], nums[1])
  const dp = new Array(n).fill(0)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }
  return dp[n - 1]
}
```

### 13.23 [打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)

题目：相邻、首尾报警

- 方法一
  - dp，转换为上一题，nums.slice(0, n - 1)，nums.slice(1, n)
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var rob = function (nums) {
  const n = nums.length
  if (n === 1) return nums[0]
  if (n === 2) return Math.max(nums[0], nums[1])
  const res1 = rob1(nums.slice(0, n - 1))
  const res2 = rob1(nums.slice(1, n))
  return Math.max(res1, res2)
}

var rob1 = function (nums) {
  const n = nums.length
  const dp = new Array(n).fill(0)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }
  return dp[n - 1]
}
```

### 13.24 [打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)

题目：树结构，相邻报警

- 方法一
  - 树形 dp
    - 递归
      - 确定递归函数的参数和返回值：参数为当前节点，返回值就是一个长度为 2 的 dp 数组（一个节点偷与不偷的两个状态所得到的金钱）
      - 确定终止条件：遇到空节点的话，很明显，无论偷还是不偷都是 0，所以就返回
      - 确定遍历顺序：后序，因为通过递归函数的返回值来做下一步计算。
    - dp
      - 如果不偷当前节点，那么左右孩子就可以偷，至于到底偷不偷一定是选一个最大的，所以：val2 = max(left[0], left[1]) + max(right[0], right[1]);
      - 如果是偷当前节点，那么左右孩子就不能偷，val1 = cur->val + left[0] + right[0];
      - 最后当前节点的状态就是{val2, val1}; 即：{不偷当前节点得到的最大金钱，偷当前节点得到的最大金钱}
  - 时间复杂度：O(n)
  - 空间复杂度：O(logn)

```javascript
var rob = function (root) {
  const robTree = cur => {
    let res = [0, 0]
    if (cur === null) return res
    const left = robTree(cur.left)
    const right = robTree(cur.right)
    // cur不偷
    res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
    // cur偷
    res[1] = cur.val + left[0] + right[0]
    return res
  }

  const [res1, res2] = robTree(root)
  return Math.max(res1, res2)
}
```

### 13.25 [买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

题目：一次买卖一支股

- 方法一
  - dp
    - dp[i]\[0] 表示第 i 天不持有股票所得最多现金，dp[i]\[1]表示第 i 天持有股票所得最多现金。
    - dp[i]\[0]=max(dp[i-1]\[0],dp[i-1]\[1]+prices[i]）dp[i]\[1]=max(-prices[i],dp[i-1]\[1]）
    - dp[0]\[0]=0 dp[0]\[1]=-prices[0]
    - 从前向后
    - 模拟
  - 时间复杂度：O(n)
  - 空间复杂度：O(n\*2)

```javascript
var maxProfit = function (prices) {
  const n = prices.length
  const dp = new Array(n).fill(0).map(() => new Array(2).fill(0))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(-prices[i], dp[i - 1][1])
  }
  return dp[n - 1][0]
}
```

- 方法二
  - 贪心：因为股票就买卖一次，那么贪心的想法很自然就是取最左最小值，取最右最大值，那么得到的差值就是最大利润。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var maxProfit = function (prices) {
  let res = 0
  let min = Infinity
  for (let p of prices) {
    min = Math.min(min, p)
    res = Math.max(res, p - min)
  }
  return res
}
```

### 13.26 [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

题目：多次买卖一支股

- 方法一
  - dp
    - dp[i]\[0] 表示第 i 天不持有股票所得最多现金，dp[i]\[1]表示第 i 天持有股票所得最多现金。
    - dp[i]\[0]=max(dp[i-1]\[0],dp[i-1]\[1]+prices[i]）dp[i]\[1]=max(dp[i-1]\[0]-prices[i],dp[i-1]\[1]）
    - dp[0]\[0]=0 dp[0]\[1]=-prices[0]
    - 从前向后
    - 模拟
  - 时间复杂度：O(n)
  - 空间复杂度：O(n\*2)

```javascript
var maxProfit = function (prices) {
  const n = prices.length
  const dp = new Array(n).fill(0).map(() => new Array(2).fill(0))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1])
  }
  return dp[n - 1][0]
}
```

- 方法二
  - 方法一优化，滚动数组
    - 二乘二数组
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var maxProfit = function (prices) {
  const n = prices.length
  const dp = new Array(2).fill(0).map(() => new Array(2).fill(0))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < n; i++) {
    dp[i % 2][0] = Math.max(dp[(i - 1) % 2][0], dp[(i - 1) % 2][1] + prices[i])
    dp[i % 2][1] = Math.max(dp[(i - 1) % 2][0] - prices[i], dp[(i - 1) % 2][1])
  }
  return dp[(n - 1) % 2][0]
}

// 或者两个单位的数组
var maxProfit = function (prices) {
  const n = prices.length
  const dp = [0, -prices[0]]
  for (let i = 1; i < n; i++) {
    dp[0] = Math.max(dp[0], dp[1] + prices[i])
    dp[1] = Math.max(dp[0] - prices[i], dp[1])
  }
  return dp[0]
}
```

- 方法三
  - 贪心
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var maxProfit = function (prices) {
  const n = prices.length
  let res = 0
  for (let i = 1; i < n; i++) {
    res += Math.max(prices[i] - prices[i - 1], 0)
  }
  return res
}
```

### 13.27 [卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

题目：最多可以完成**两笔**交易，买卖一支股

- 方法一
  - dp
    - dp[i]\[j]中 i 表示第 i 天，j 为 [0 - 4] 五个状态，dp[i]\[j]表示第 i 天状态 j 所剩最大现金。
      - 没有操作
      - 第一次买入
      - 第一次卖出
      - 第二次买入
      - 第二次卖出
    - 推导公式
      - dp[i]\[0]=dp[i-1]\[0]
      - dp[i]\[1]=max(dp[i-1]\[1],dp[i - 1]\[0] - prices[i]）
      - dp[i]\[2]=max(dp[i-1]\[2],dp[i - 1]\[1] + prices[i]）
      - dp[i]\[3]=max(dp[i-1]\[3],dp[i - 1]\[2] - prices[i]）
      - dp[i]\[4]=max(dp[i-1]\[4],dp[i - 1]\[3] + prices[i]）
    - dp[0]\[0]=0 dp[0]\[1]=-prices[0] dp[0]\[2]=0 dp[0]\[3]=-prices[0] dp[0]\[4]=0
    - 从前向后
    - 模拟
  - 时间复杂度：O(n)
  - 空间复杂度：O(n\*5)

```javascript
var maxProfit = function (prices) {
  const n = prices.length
  const dp = new Array(n).fill(0).map(() => new Array(5).fill(0))
  dp[0][1] = dp[0][3] = -prices[0]
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0]
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i])
    dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i])
    dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i])
  }
  return dp[n - 1][4]
}
```

- 方法二
  - 方法一优化，滚动数组
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
const maxProfit = prices => {
  const len = prices.length
  const dp = new Array(5).fill(0)
  dp[1] = -prices[0]
  dp[3] = -prices[0]
  for (let i = 1; i < len; i++) {
    dp[1] = Math.max(dp[1], dp[0] - prices[i])
    dp[2] = Math.max(dp[2], dp[1] + prices[i])
    dp[3] = Math.max(dp[3], dp[2] - prices[i])
    dp[4] = Math.max(dp[4], dp[3] + prices[i])
  }
  return dp[4]
}
```

### 13.28 [买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

题目：最多可以完成**K 笔**交易，买卖一支股

- 方法一
  - dp，在上一题基础上增加状态，奇数买入，偶数卖出
  - 时间复杂度：O(n\*(2k+1))
  - 空间复杂度：O(n\*(2k+1))

```javascript
var maxProfit = function (k, prices) {
  const n = prices.length
  if (n === 0) return 0
  const dp = new Array(n).fill(0).map(() => new Array(2 * k + 1).fill(0))
  for (let i = 1; i < 2 * k; i += 2) {
    dp[0][i] = -prices[0]
  }
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 2 * k; j += 2) {
      dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[i - 1][j] - prices[i])
      dp[i][j + 2] = Math.max(dp[i - 1][j + 2], dp[i - 1][j + 1] + prices[i])
    }
  }
  return dp[n - 1][2 * k]
}
```

- 方法二
  - 方法一优化，滚动数组
  - 时间复杂度：O(n\*(2k+1))
  - 空间复杂度：O(2k+1)

```javascript
var maxProfit = function (k, prices) {
  let n = prices.length
  let dp = new Array(2 * k + 1).fill(0)
  for (let i = 1; i < 2 * k; i += 2) {
    dp[i] = -prices[0]
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < 2 * k + 1; j++) {
      // j 为奇数：买入状态
      if (j % 2) {
        dp[j] = Math.max(dp[j], dp[j - 1] - prices[i])
      } else {
        // j为偶数：卖出状态
        dp[j] = Math.max(dp[j], dp[j - 1] + prices[i])
      }
    }
  }
  return dp[2 * k]
}
```

### 13.29 [最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

题目：多次买卖一支股票，冷冻期为 1 天

- 方法一
  - dp
    - 状态一：买入股票状态（今天买入股票，或者是之前就买入了股票然后没有操作）
    - 卖出股票状态，这里就有两种卖出股票状态
      - 状态二：两天前就卖出了股票，度过了冷冻期，一直没操作，今天保持卖出股票状态
      - 状态三：今天卖出了股票
    - 状态四：今天为冷冻期状态，但冷冻期状态不可持续，只有一天！
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var maxProfit = function (prices) {
  const n = prices.length
  if (n === 0) return 0
  const dp = new Array(n).fill(0).map(() => new Array(4).fill(0))
  dp[0][0] = -prices[0]
  // 0 买入  1 两天前卖出 2 今天卖出  3 冷冻期
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i], dp[i - 1][3] - prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3])
    dp[i][2] = dp[i - 1][0] + prices[i]
    dp[i][3] = dp[i - 1][2]
  }
  return Math.max(dp[n - 1][1], dp[n - 1][2], dp[n - 1][3])
}
```

### 13.30 [买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

题目：多次买卖一支股票，每笔交易都需要付手续费

- 方法一
  - dp：和股票 2 一样，只需要减去手续费
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var maxProfit = function (prices, fee) {
  const n = prices.length
  if (n === 0) return 0
  const dp = new Array(n).fill(0).map(() => new Array(2).fill(0))
  dp[0][1] = -prices[0]
  // 0 不持有  1 持有
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)
    dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1])
  }
  return dp[n - 1][0]
}
```

### 13.31 [最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

题目：最长上升子序列

- 方法一
  - dp
    - dp[i]：i 之前包括 i 的最长上升子序列的长度。
    - if (nums[i] > nums[j]) dp[i] = max(dp[i], dp[j] + 1)
    - dp[i]=1
    - 从前向后
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n)

```javascript
var lengthOfLIS = function (nums) {
  const n = nums.length
  const dp = new Array(n).fill(1)
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}
```

### 13.32 [最长连续递增序列](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/)

题目：最长**连续**递增序列

- 方法一
  - dp
    - dp[i]：以下标 i 为结尾的数组的连续递增的子序列长度为 dp[i]
    - if ( nums[i ] > nums[i-1]) dp[i] = dp[i - 1] + 1
    - dp[i]=1
    - 从前向后
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var findLengthOfLCIS = function (nums) {
  let n = nums.length
  const dp = new Array(n).fill(1)
  let res = 1
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
      res = Math.max(res, dp[i])
    }
  }
  return res
}
```

- 方法二
  - 贪心
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var findLengthOfLCIS = function (nums) {
  const n = nums.length
  let res = 1
  let cnt = 1
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      cnt++
    } else {
      cnt = 1
    }
    res = Math.max(res, cnt)
  }
  return res
}
```

### 13.33 [最长重复子数组](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)

题目：给两个整数数组 `A` 和 `B` ，返回两个数组中公共的、长度最长的子数组的长度**。要求连续**

- 方法一
  - dp：题目中说的子数组，其实就是连续子序列。
    - dp[i]\[j] ：以下标 i - 1 为结尾的 A，和以下标 j - 1 为结尾的 B，最长重复子数组长度为 dp[i]\[j]。
    - if (nums1[i - 1] === nums2[j - 1]) dp[i]\[j] = dp[i - 1]\[j - 1] + 1
    - dp[i]\[0] 和 dp[0]\[j]初始化为 0
    - 从前向后
  - 时间复杂度：O(n × m)
  - 空间复杂度：O(n × m)

```javascript
var findLength = function (nums1, nums2) {
  const n = nums1.length
  const m = nums2.length
  let res = 0
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        res = Math.max(res, dp[i][j])
      }
    }
  }
  return res
}
```

- 方法二
  - 方法一优化，滚动数组
  - 时间复杂度：O(n × m)
  - 空间复杂度：O(m)

```javascript
var findLength = function (nums1, nums2) {
  const m = nums1.length
  const n = nums2.length
  const dp = new Array(n + 1).fill(0)
  let res = 0
  for (let i = 1; i <= m; i++) {
    for (let j = n; j >= 1; j--) {
      if (nums1[i - 1] === nums2[j - 1]) dp[j] = dp[j - 1] + 1
      else dp[j] = 0 // 注意这里不相等的时候要有赋0的操作
      res = Math.max(res, dp[j])
    }
  }
  return res
}
```

### 13.34 [最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)

题目：不要求连续

- 方法一

  - dp

    - dp[i]\[j]：长度为[0, i - 1]的字符串 text1 与长度为[0, j - 1]的字符串 text2 的最长公共子序列为 dp[i]\[j]

    - 如果 text1[i - 1] 与 text2[j - 1]相同，那么找到了一个公共元素，所以 dp[i]\[j] = dp[i - 1]\[j - 1] + 1;

      如果 text1[i - 1] 与 text2[j - 1]不相同，那就看看 text1[0, i - 2]与 text2[0, j - 1]的最长公共子序列 和 text1[0, i - 1]与 text2[0, j - 2]的最长公共子序列，取最大的。

    - dp[i]\[0] 和 dp[0]\[j]初始化为 0

    - 从前向后

  - 时间复杂度：O(n × m)

  - 空间复杂度：O(n × m)

```javascript
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length
  const n = text2.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n]
}
```

#### [两个字符串的最小 ASCII 删除和](https://leetcode.cn/problems/minimum-ascii-delete-sum-for-two-strings/)

```js
var minimumDeleteSum = function (s1, s2) {
  const n = s1.length,
    m = s2.length
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0))
  let sum1 = 0,
    sum2 = 0
  for (let i = 0; i < n; i++) {
    sum1 += s1[i].charCodeAt()
  }
  for (let j = 0; j < m; j++) {
    sum2 += s2[j].charCodeAt()
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + s1[i - 1].charCodeAt()
      else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return sum1 + sum2 - dp[n][m] * 2
}

var minimumDeleteSum = function (s1, s2) {
  const n = s1.length,
    m = s2.length
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    dp[i][0] = dp[i - 1][0] + s1[i - 1].charCodeAt()
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = dp[0][j - 1] + s2[j - 1].charCodeAt()
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + s1[i - 1].charCodeAt(),
          dp[i][j - 1] + s2[j - 1].charCodeAt()
        )
      }
    }
  }
  return dp[n][m]
}
```

### 13.35 [不相交的线](https://leetcode-cn.com/problems/uncrossed-lines/)

题目**：本题说是求绘制的最大连线数，其实就是求两个字符串的最长公共子序列的长度！**代码就是上一题啦~

- 方法一
  - dp
  - 时间复杂度：O(n × m)
  - 空间复杂度：O(n × m)

```javascript
var maxUncrossedLines = function (nums1, nums2) {
  const m = nums1.length
  const n = nums2.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] === nums2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n]
}
```

### 13.36 [最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)

题目：

- 方法一
  - dp
    - dp[i]：包括下标 i 之前的最大连续子数组和为 dp[i]
    - dp[i] = max(dp[i - 1] + nums[i], nums[i])
    - dp[0] = nums[0]
    - 从前向后
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var maxSubArray = function (nums) {
  const n = nums.length
  const dp = new Array(n).fill(0)
  dp[0] = nums[0]
  let res = nums[0]
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    res = Math.max(res, dp[i])
  }
  return res
}
```

### 13.37 [判断子序列](https://leetcode-cn.com/problems/is-subsequence/)

题目：本质还是最长公共子序列

- 方法一
  - dp
  - 时间复杂度：O(n × m)
  - 空间复杂度：O(n × m)

```javascript
var isSubsequence = function (s, t) {
  const m = s.length,
    n = t.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n] === m
}
```

- 方法二
  - 双指针

```js
var isSubsequence = function (s, t) {
  const m = s.length,
    n = t.length
  let i = 0,
    j = 0
  while (i < m && j < n) {
    if (s[i] === t[j]) {
      i++
    }
    j++
  }
  return i === m
}
```

### 13.38 [不同的子序列](https://leetcode-cn.com/problems/distinct-subsequences/)

题目：

- 方法一
  - dp
    - dp[i]\[j]：以 i-1 为结尾的 s 子序列中出现以 j-1 为结尾的 t 的个数为 dp[i]\[j]。
    - s[i - 1] 与 t[j - 1]相等 不相等
    - dp[i]\[0]=1
  - 时间复杂度：O(n × m)
  - 空间复杂度：O(n × m)

```javascript
var numDistinct = function (s, t) {
  const m = s.length
  const n = t.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) {
    dp[i][0] = 1
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
      else dp[i][j] = dp[i - 1][j]
    }
  }
  return dp[m][n]
}
```

### 13.39 [两个字符串的删除操作](https://leetcode-cn.com/problems/delete-operation-for-two-strings/)

题目：

- 方法一
  - dp
    - dp[i]\[j]：以 i-1 为结尾的字符串 word1，和以 j-1 位结尾的字符串 word2，想要达到相等，所需要删除元素的最少次数。
    - 当 word1[i - 1] 与 word2[j - 1]相同的时候，dp[i]\[j] = dp[i - 1]\[j - 1]; 当 word1[i - 1] 与 word2[j - 1]不相同的时候，dp[i]\[j] = min({dp[i - 1]\[j - 1] + 2, dp[i - 1]\[j] + 1, dp[i]\[j - 1] + 1});
    - dp[i]\[0] = i; dp[0]\[j] = j;
    - 从上到下，从左到右
  - 时间复杂度：O(n × m)
  - 空间复杂度：O(n × m)

```javascript
var minDistance = function (word1, word2) {
  const m = word1.length
  const n = word2.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    dp[i][0] = i
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 2)
    }
  }
  return dp[m][n]
}

var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return n + m - dp[n][m] * 2
}
```

### 13.40 [编辑距离](https://leetcode-cn.com/problems/edit-distance/)

题目：

- 方法一

  - dp

    - dp[i]\[j]：以 i-1 为结尾的字符串 word1，和以 j-1 位结尾的字符串 word2，想要达到相等，所需要删除元素的最少次数。

    - 当 word1[i - 1] 与 word2[j - 1]相同的时候，dp[i]\[j] = dp[i - 1]\[j - 1];

      当 word1[i - 1] 与 word2[j - 1]不相同的时候，

      删除：dp\[i - 1][j] + 1

      添加：dp\[i][j - 1] + 1

      替换：dp\[i - 1][j - 1] + 1

    - dp[i]\[0] = i; dp[0]\[j] = j;

    - 从上到下，从左到右

  - 时间复杂度：O(n × m)

  - 空间复杂度：O(n × m)

```javascript
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    dp[i][0] = i
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1)
    }
  }
  return dp[n][m]
}
```

### 13.41 [回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)

题目：统计并返回这个字符串中 **回文子串** 的数目。

- 方法一
  - dp
    - dp[i]\[j]：表示区间范围[i,j] （注意是左闭右闭）的子串是否是回文子串
    - 当 s[i]与 s[j]不相等，dp[i]\[j]一定是 false。 当 s[i]与 s[j]相等时，三种情况，i=j，i+1=j，i+1<j
    - 初始化 false
    - 从下到上，从左到右
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n^2)

```javascript
var countSubstrings = function (s) {
  //s[i]=s[j] dp[i][j]=dp[i+1][j-1]
  const n = s.length
  const dp = new Array(n).fill().map(() => new Array(n).fill(false))
  let res = 0
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
        dp[i][j] = true
        res++
      }
    }
  }
  return res
}
```

- 方法二
  - 中心扩散法

```js
var countSubstrings = function (s) {
  const n = s.length
  const cntPalindrome = (l, r) => {
    let cnt = 0
    while (l >= 0 && r < n) {
      if (s[l] !== s[r]) break
      cnt++
      l--
      r++
    }
    return cnt
  }
  let res = 0
  for (let i = 0; i < n; i++) {
    res += cntPalindrome(i, i) + cntPalindrome(i, i + 1)
  }
  return res
}
```

### 13.42 [最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

题目**：回文子串是要连续的**

- 方法一
  - dp
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n^2)

```javascript
var longestPalindrome = function (s) {
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(false))
  let maxlen = 0,
    res = ''
  // dp[i][j] <-- dp[i+1][j-1]
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
        dp[i][j] = true
        if (j - i + 1 > maxlen) {
          res = s.substring(i, j + 1)
          maxlen = j - i + 1
        }
      }
    }
  }
  return res
}
```

- 方法二
  - 中心扩散法

```js
var longestPalindrome = function (s) {
  const n = s.length
  let res = '',
    maxlen = 0
  const palindrome = (l, r) => {
    while (l >= 0 && r < n) {
      if (s[l] !== s[r]) break
      if (r - l + 1 > maxlen) {
        res = s.substring(l, r + 1)
        maxlen = r - l + 1
      }
      l--
      r++
    }
  }
  for (let i = 0; i < n; i++) {
    palindrome(i, i)
    palindrome(i, i + 1)
  }
  return res
}
```

### 13.43 [最长回文子序列](https://leetcode-cn.com/problems/longest-palindromic-subsequence/)

题目**：回文子序列可不是连续的！**

- 方法一
  - dp
    - dp[i]\[j]：字符串 s 在[i, j]范围内最长的回文子序列的长度为 dp[i]\[j]
    - 如果 s[i]与 s[j]相同，那么 dp[i]\[j] = dp[i + 1]\[j - 1] + 2; 如果 s[i]与 s[j]不相同，dp[i]\[j] = max(dp[i + 1]\[j], dp[i]\[j - 1]);
    - dp[i]\[i] = 1;
    - 从下到上，从左到右
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n^2)

```javascript
var longestPalindromeSubseq = function (s) {
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j]) {
        if (i === j) dp[i][j] = 1
        else dp[i][j] = dp[i + 1][j - 1] + 2
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[0][n - 1]
}
```

### 13.44 [让字符串成为回文串的最少插入次数](https://leetcode.cn/problems/minimum-insertion-steps-to-make-a-string-palindrome/)

- 根据上一题找出最长回文子序列，剩下的就是非回文部分，即最小插入次数

```js
var minInsertions = function (s) {
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) dp[i][j] = dp[i + 1][j - 1] + 2
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
    }
  }
  return n - dp[0][n - 1]
}
```

### 13.45 [丑数 II](https://leetcode-cn.com/problems/ugly-number-ii/)

```js
var nthUglyNumber = function (n) {
  const dp = new Array(n + 1).fill(0)
  dp[1] = 1
  let index2 = 1,
    index3 = 1,
    index5 = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[index2] * 2, dp[index3] * 3, dp[index5] * 5)
    if (dp[i] === dp[index2] * 2) index2++
    if (dp[i] === dp[index3] * 3) index3++
    if (dp[i] === dp[index5] * 5) index5++
  }
  return dp[n]
}
```

### 13.46 [三角形最小路径和](https://leetcode.cn/problems/triangle/)

```js
var minimumTotal = function (triangle) {
  const n = triangle.length
  const dp = new Array(n).fill(0).map((_, i) => new Array(i + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      if (i === n - 1) dp[i][j] = triangle[i][j]
      else {
        dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j]
      }
    }
  }
  return dp[0][0]
}
```

### 13.47 [最大正方形](https://leetcode.cn/problems/maximal-square/)

```js
var maximalSquare = function (matrix) {
  const n = matrix.length
  const m = matrix[0].length
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0))
  let res = 0
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
        res = Math.max(res, dp[i][j])
      }
    }
  }
  return res * res
}
```

### 13.48 [解码方法](https://leetcode.cn/problems/decode-ways/)

```js
var numDe刷题s = function (s) {
  if (s[0] === '0') return 0
  const n = s.length
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    if (s[i - 1] !== '0') {
      dp[i] += dp[i - 1]
    }
    if (
      s[i - 2] !== '0' &&
      (s[i - 2].charCodeAt() - '0'.charCodeAt()) * 10 + s[i - 1].charCodeAt() - '0'.charCodeAt() <=
        26
    ) {
      dp[i] += dp[i - 2]
    }
  }
  return dp[n]
}
```

### 13.49 [鸡蛋掉落](https://leetcode.cn/problems/super-egg-drop/)

```js
var superEggDrop = function (k, n) {
  // dp[i][j] i个鸡蛋 j次扔鸡蛋 测得的最多楼层
  const dp = new Array(k + 1).fill().map(() => new Array(n + 1).fill(0))
  let cnt = 0
  while (dp[k][cnt] < n) {
    cnt++
    for (let i = 1; i <= k; i++) {
      dp[i][cnt] = dp[i - 1][cnt - 1] + dp[i][cnt - 1] + 1
    }
  }
  return cnt
}
```
