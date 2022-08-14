---
title: 12. 贪心算法
date: 2021-12-18
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 12.1 贪心理论

**贪心的本质是选择每一阶段的局部最优，从而达到全局最优**。

刷题或者面试的时候，手动模拟一下感觉可以**局部最优推出整体最优**，而且**想不到反例**，那么就试一试贪心。

贪心算法步骤：

- 将问题分解为若干个子问题
- 找出适合的贪心策略
- 求解每一个子问题的最优解
- 将局部最优解堆叠成全局最优解

### 12.2 [分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

题目：尽可能满足越多数量的孩子

- 方法一
  - **这里的局部最优就是大饼干喂给胃口大的，充分利用饼干尺寸喂饱一个，全局最优就是喂饱尽可能多的小孩**。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var findContentChildren = function (g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  let index = s.length - 1
  let res = 0
  for (let i = g.length - 1; i >= 0; i--) {
    if (s[index] >= g[i]) {
      index--
      res++
    }
  }
  return res
}
```

### 12.3 [摆动序列](https://leetcode-cn.com/problems/wiggle-subsequence/)

题目**：摆动序列** 的 **最长子序列的长度** 。

- 方法一

  - **局部最优：删除单调坡度上的节点（不包括单调坡度两端的节点），那么这个坡度就可以有两个局部峰值**。

    **整体最优：整个序列有最多的局部峰值，从而达到最长摆动序列**。

    **实际操作上，其实连删除的操作都不用做，因为题目要求的是最长摆动子序列的长度，所以只需要统计数组的峰值数量就可以了（相当于是删除单一坡度上的节点，然后统计长度）**

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var wiggleMaxLength = function (nums) {
  let res = 1
  let curdiff = 0
  let prediff = 0
  for (let i = 1; i < nums.length; i++) {
    curdiff = nums[i] - nums[i - 1]
    if ((curdiff > 0 && prediff <= 0) || (curdiff < 0 && prediff >= 0)) {
      res++
      prediff = curdiff
    }
  }
  return res
}
```

### 12.4 [最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)

题目：具有最大和的连续子数组

- 方法一

  - 局部最优：当前“连续和”为负数的时候立刻放弃，从下一个元素重新计算“连续和”，因为负数加上下一个元素 “连续和”只会越来越小。

    全局最优：选取最大“连续和”

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var maxSubArray = function (nums) {
  let res = -Infinity
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    if (sum > res) {
      res = sum
    }
    if (sum < 0) {
      sum = 0
    }
  }
  return res
}
```

### 12.5 [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

题目：多次买卖一支股票

- 方法一
  - **局部最优：收集每天的正利润，全局最优：求得最大利润**。
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

### 12.6 [跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

题目**：转化为跳跃覆盖范围究竟可不可以覆盖到终点！**

- 方法一
  - **局部最优：每次取最大跳跃步数（取最大覆盖范围），整体最解：最后得到整体最大覆盖范围，看是否能到终点**。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var canJump = function (nums) {
  let cover = 0
  for (let i = 0; i <= cover; i++) {
    cover = Math.max(cover, i + nums[i])
    if (cover >= nums.length - 1) return true
  }
  return false
}
```

### 12.7 [跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/)

题目：使用最少的跳跃次数到达数组的最后一个位置

- 方法一
  - **以最小的步数增加最大的覆盖范围，直到覆盖范围覆盖了终点**
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var jump = function (nums) {
  let cover = 0
  let end = 0
  let res = 0
  for (let i = 0; i < nums.length - 1; i++) {
    cover = Math.max(cover, i + nums[i])
    if (i === end) {
      res++
      end = cover
    }
  }
  return res
}
```

- 方法二
  - bfs

```js
var jump = function (nums) {
  const n = nums.length
  if (n === 1) return 0
  let res = 0
  const used = new Array(n).fill(false)
  let q = [0]
  while (q.length) {
    res++
    const len = q.length
    for (let i = 0; i < len; i++) {
      const cur = q.shift()
      for (let j = cur; j <= cur + nums[cur]; j++) {
        if (j >= nums.length - 1) return res
        if (!used[j]) {
          q.push(j)
          used[j] = true
        }
      }
    }
  }
  return res
}
```

- 方法三
  - 反向查找出发位置

```js
var jump = function (nums) {
  let res = 0,
    end = nums.length - 1
  while (end > 0) {
    for (let i = 0; i < end; i++) {
      if (i + nums[i] >= end) {
        res++
        end = i
      }
    }
  }
  return res
}
```

### 12.8 [ K 次取反后最大化的数组和](https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/)

题目：

- 方法一

  - 局部最优：让绝对值大的负数变为正数，当前数值达到最大；整体最优：整个数组和达到最大。

    局部最优：只找数值最小的正整数进行反转，当前数值可以达到最大；全局最优：整个数组和达到最大。

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var largestSumAfterKNegations = function (nums, k) {
  nums.sort((a, b) => Math.abs(a) - Math.abs(b))
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < 0 && k > 0) {
      nums[i] *= -1
      k--
    }
  }
  k = k % 2
  if (k > 0) {
    nums[0] *= -1
  }
  return nums.reduce((pre, cur) => pre + cur, 0)
}
```

### 12.9 [加油站](https://leetcode-cn.com/problems/gas-station/)

题目：

- 方法一
  - 暴力模拟
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(1)

```javascript
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length
  for (let i = 0; i < n; i++) {
    let rest = gas[i] - cost[i]
    let index = (i + 1) % n
    while (rest > 0 && index !== i) {
      rest += gas[index] - cost[index]
      index = (index + 1) % n
    }
    if (rest >= 0 && index === i) {
      return i
    }
  }
  return -1
}
```

- 方法二
  - **局部最优：当前累加 rest[j]的和 curSum 一旦小于 0，起始位置至少要是 j+1，因为从 j 开始一定不行。全局最优：找到可以跑一圈的起始位置**。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length
  let curSum = 0
  let totalSum = 0
  let start = 0
  for (let i = 0; i < n; i++) {
    curSum += gas[i] - cost[i]
    totalSum += gas[i] - cost[i]
    if (curSum < 0) {
      start = i + 1
      curSum = 0
    }
  }
  if (totalSum < 0) return -1
  return start
}
```

### 12.10 [分发糖果](https://leetcode-cn.com/problems/candy/)

题目：

- 方法一

  - 局部最优：只要右边评分比左边大，右边的孩子就多一个糖果，全局最优：相邻的孩子中，评分高的右孩子获得比左边孩子更多的糖果

    局部最优：取 candyVec[i + 1] + 1 和 candyVec[i] 最大的糖果数量，保证第 i 个小孩的糖果数量即大于左边的也大于右边的。全局最优：相邻的孩子中，评分高的孩子获得更多的糖果。

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var candy = function (ratings) {
  const n = ratings.length
  const c = new Array(n).fill(1)
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      c[i] = c[i + 1] + 1
    }
  }
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      c[i] = Math.max(c[i - 1] + 1, c[i])
    }
  }
  return c.reduce((pre, cur) => pre + cur, 0)
}
```

### 12.11 [柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/)

题目：

- 方法一
  - 局部最优：遇到账单 20，优先消耗美元 10，完成本次找零。全局最优：完成全部账单的找零。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var lemonadeChange = function (bills) {
  let five = 0,
    ten = 0,
    twenty = 0
  for (let bill of bills) {
    if (bill === 5) {
      five++
    } else if (bill === 10) {
      if (five <= 0) return false
      five--
      ten++
    } else {
      if (ten > 0 && five > 0) {
        ten--
        five--
        twenty++
      } else if (five >= 3) {
        five -= 3
        twenty++
      } else {
        return false
      }
    }
  }
  return true
}
```

### 12.12 [根据身高重建队列](https://leetcode-cn.com/problems/queue-reconstruction-by-height/)

题目：

- 方法一

  - **局部最优：优先按身高高的 people 的 k 来插入。插入操作过后的 people 满足队列属性**

    **全局最优：最后都做完插入操作，整个队列满足题目队列属性**

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var reconstructQueue = function (people) {
  people.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1]
    return b[0] - a[0]
  })
  console.log(people)
  const queue = []
  for (let i = 0; i < people.length; i++) {
    queue.splice(people[i][1], 0, people[i])
  }
  return queue
}
```

### 12.13 [用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)

题目：

- 方法一
  - 局部最优：当气球出现重叠，一起射，所用弓箭最少。全局最优：把所有气球射爆所用弓箭最少。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var findMinArrowShots = function (points) {
  points.sort((a, b) => a[0] - b[0])
  let res = 1
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > points[i - 1][1]) {
      // 换箭
      res++
    } else {
      points[i][1] = Math.min(points[i - 1][1], points[i][1]) // 一起射，并更新最小右边界
    }
  }
  return res
}
```

### 12.14 [无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

题目：转化为求最大非重复区间个数

- 方法一
  - 右边界排序之后，局部最优：优先选右边界小的区间，所以从左向右遍历，留给下一个区间的空间大一些，从而尽量避免交叉。全局最优：选取最多的非交叉区间。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[1] - b[1])
  let cnt = 1
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      intervals[i][1] = Math.min(intervals[i - 1][1], intervals[i][1])
    } else {
      cnt++
    }
  }
  return intervals.length - cnt
}
```

### 12.15 [划分字母区间](https://leetcode-cn.com/problems/partition-labels/)

题目：

- 方法一
  - 统计每一个字符最后出现的位置；从头遍历字符，并更新字符的最远出现下标，如果找到字符最远出现位置下标和当前下标相等了，则找到了分割点
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var partitionLabels = function (s) {
  const hash = new Array(26).fill(-1)
  for (let i = 0; i < s.length; i++) {
    hash[s[i].charCodeAt() - 'a'.charCodeAt()] = i
  }
  let left = 0
  let right = 0
  let res = []
  for (let i = 0; i < s.length; i++) {
    right = Math.max(right, hash[s[i].charCodeAt() - 'a'.charCodeAt()])
    if (i === right) {
      res.push(right - left + 1)
      left = i + 1
    }
  }
  return res
}
```

### 12.16 [合并区间](https://leetcode-cn.com/problems/merge-intervals/)

题目：

- 方法一
  - 局部最优：每次合并都取最大的右边界，这样就可以合并更多的区间了，整体最优：合并所有重叠的区间。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  const res = [intervals[0]]
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= res[res.length - 1][1]) {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], intervals[i][1])
    } else {
      res.push(intervals[i])
    }
  }
  return res
}
```

### 12.17 [单调递增的数字](https://leetcode-cn.com/problems/monotone-increasing-digits/)

题目：

- 方法一

  - **局部最优：遇到 strNum[i - 1] > strNum[i]的情况，让 strNum[i - 1]--，然后 strNum[i]给为 9，可以保证这两位变成最大单调递增整数**。

    **全局最优：得到小于等于 N 的最大单调递增的整数**。

    **从后向前遍历**

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var monotoneIncreasingDigits = function (n) {
  let s = n.toString().split('')
  let flag = Infinity
  for (let i = s.length - 1; i > 0; i--) {
    if (s[i - 1] > s[i]) {
      flag = i
      s[i - 1]--
    }
  }
  for (let i = flag; i < s.length; i++) {
    s[i] = 9
  }
  return +s.join('')
}
```

### 12.18 [买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

题目：

- 方法一
  - **当我们卖出一支股票时，我们就立即获得了以相同价格并且免除手续费买入一支股票的权利**。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var maxProfit = function (prices, fee) {
  let res = 0
  let buy = prices[0] + fee
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] + fee < buy) {
      buy = prices[i] + fee
    } else if (prices[i] > buy) {
      res += prices[i] - buy
      buy = prices[i]
    }
  }
  return res
}
```

### 12.19 [监控二叉树](https://leetcode-cn.com/problems/binary-tree-cameras/)

题目：

- 方法一

  - **局部最优：让叶子节点的父节点安摄像头，所用摄像头最少，整体最优：全部摄像头数量所用最少！**

    大体思路就是从低到上，先给叶子节点父节点放个摄像头，然后隔两个节点放一个摄像头，直至到二叉树头结点。

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var minCameraCover = function (root) {
  let res = 0
  // 0：无覆盖  1：有摄像头  2：无摄像头但有覆盖
  const traversal = cur => {
    if (cur === null) return 2
    const left = traversal(cur.left)
    const right = traversal(cur.right)
    if (left === 0 || right === 0) {
      res++
      return 1
    }
    if (left === 2 && right === 2) {
      return 0
    }
    if (left === 1 || right === 1) {
      return 2
    }
    return -1
  }

  if (traversal(root) === 0) {
    res++
  }
  return res
}
```

### 12.20 [会议室 II](https://leetcode-cn.com/problems/meeting-rooms-ii/)

- 方法一

  - 对所有会议，按照开始时间排升序；

  - 用贪心算法，每来一个新的会议，遍历所有已开的会议室，如果有空的会议室（该会议室的结束时间早于等于当前会议的开始时间），则作为当前最优的选择，更新该会议室的结束时间，并停止循环

  - 如果一个可用的会议室都没有，则新增会议室，并更新该会议室的结束时间。

```js
class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        rooms = []  # 记录各会议室的结束时间
        meetings = sorted(intervals, key=lambda x: x[0])  # 按开始时间升序
        for meeting in meetings:
            find = False
            for index, end_time in enumerate(rooms):
                # 找到满足结束时间早于当前会议开始时间的会议室，并更新会议室的时间表
                if end_time <= meeting[0]:
                    rooms[index] = meeting[1]
                    find = True
                    break
            # 如果没找到，则新增会议室
            if not find:
                rooms.append(meeting[1])
        return len(rooms)
```

- 方法二
  - 最小堆

```js
import heapq

class Solution:
    def minMeetingRooms(self, intervals: list) -> int:
        rooms = []  # 记录各会议室的最早结束时间
        meetings = sorted(intervals, key=lambda x: x[0])  # 按开始时间升序
        for meeting in meetings:
            # 如果最早结束的会议室的结束时间比会议室时间要早，则先关闭该会议室
            if rooms and rooms[0] <= meeting[0]:
                heapq.heappop(rooms)
            # 插入新的会议室到最小堆
            heapq.heappush(rooms, meeting[1])
        return len(rooms)
```

### 12.21 [种花问题](https://leetcode-cn.com/problems/can-place-flowers/)

```js
var canPlaceFlowers = function (flowerbed, n) {
  for (let i = 0; i < flowerbed.length; i++) {
    if (
      flowerbed[i] === 0 &&
      (i === 0 || flowerbed[i - 1] === 0) &&
      (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)
    ) {
      flowerbed[i] = 1
      n--
    }
    if (n <= 0) return true
  }
  return false
}
```

### 12.22 [最大交换](https://leetcode.cn/problems/maximum-swap/)

```js
var maximumSwap = function (num) {
  const numArr = Array.from(num.toString())
  const n = numArr.length
  const maxArr = new Array(n).fill(-1)
  let maxIndex = n,
    maxNum = -1
  for (let i = n - 1; i >= 0; i--) {
    if (numArr[i] > maxNum) {
      maxIndex = i
      maxNum = numArr[i]
    }
    maxArr[i] = maxIndex
  }
  for (let i = 0; i < n; i++) {
    if (numArr[i] !== numArr[maxArr[i]]) {
      ;[numArr[i], numArr[maxArr[i]]] = [numArr[maxArr[i]], numArr[i]]
      return numArr.join('')
    }
  }
  return num
}
```
