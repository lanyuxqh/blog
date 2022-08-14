---
title: 1. 数组
date: 2021-10-5
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 1.1 数组理论

**数组是存放在连续内存空间上的相同类型数据的集合**。

- 数组下标都是从 0 开始的。
- 数组内存空间的地址是连续的。
- 正是因为数组的在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，就难免要移动其他元素的地址。
- 数组的元素是不能删的，只能覆盖。

### 1.2 数组乱序

```js
// 方法一：sort
// 并不能真正地随机打乱数组，执行多次后，每个元素仍然有很大机率在它原来的位置附近出现。
function randomSortArray1(arr) {
  arr.sort(() => Math.random() - 0.5)
  return arr
}

// 方法二：splice O(n^2)
function randomSortArray2(arr) {
  let res = []
  while (arr.length) {
    const index = (Math.random() * arr.length) >> 0
    res.push(arr[index])
    arr.splice(index, 1)
  }
  return res
}

// 方法三：洗牌算法 O(n)
function randomSortArray3(arr) {
  let i = arr.length
  while (i) {
    const index = (Math.random() * i--) >> 0
    ;[arr[index], arr[i]] = [arr[i], arr[index]]
  }
  return arr
}

// 从长度为 100 的数组中随机取 50 个数
function getRandomArrElement(arr, count) {
  let i = arr.length
  const min = arr.length - count
  while (i > min) {
    const index = (Math.random() * i--) >> 0
    ;[arr[index], arr[i]] = [arr[i], arr[index]]
  }
  return arr.slice(min)
}

// 补充，在范围内生成随机数
function setRangeRandom(min, max) {
  let n = max - min
  if (n == 0) {
    return max
  } else if (n < 0) {
    ;[max, min] = [min, max]
    n = Math.abs(n)
  }
  return ((Math.random() * ++n) >> 0) + min
}
```

### 1.3 数组去重

- Set 转为数组：new Array、Array.from、扩展运算符
- 删除：双重循环+splice
- 添加：遍历+indexOf/includes、排序+遍历
- 保存值的字符串：filter+{}.hasOwnProperty、遍历+Map.has
- ES6：filter+indexOf、reduce+includes

```javascript
// 方法一：Set   {}没有去重
function arrayUnique1(arr) {
  return new Array(new Set(arr))
}

function arrayUnique1(arr) {
  return [...new Set(arr)]
}

// 方法二：双重循环+splice删除   NaN和{}没有去重
function arrayUnique2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}

// 方法三：遍历+indexOf   NaN和{}没有去重
function arrayUnique3(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

// 方法四：遍历+includes   {}没有去重
function arrayUnique4(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) {
      res.push(arr[i])
    }
  }
  return res
}

// 方法五：先排序+遍历比对   NaN和{}没有去重
function arrayUnique5(arr) {
  arr.sort()
  let res = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      res.push(arr[i])
    }
  }
  return res
}

// 方法六：hasOwnProperty   所有的都去重了 循环引用问题
function arrayUnique6(arr) {
  let obj = {}
  return arr.filter(item => {
    return obj.hasOwnProperty(JSON.stringify(item)) ? false : (obj[JSON.stringify(item)] = true)
  })
}

// 方法七：Map   所有的都去重了 循环引用问题
function arrayUnique7(arr) {
  const map = new Map()
  let res = []
  for (let i = 0; i < arr.length; i++) {
    let key = JSON.stringify(arr[i])
    if (!map.has(key)) {
      res.push(arr[i])
      map.set(key, true)
    }
  }
  return res
}

// 方法八：filter+indexOf    {}没有去重
function arrayUnique8(arr) {
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item, 0) === index
  })
}

// 方法九：reduce+includes    {}没有去重
function arrayUnique9(arr) {
  return arr.reduce((pre, cur) => (pre.includes(cur) ? pre : [...pre, cur]), [])
}
```

### 1.4 [数组中的第 K 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```javascript
// 方法一：sort排序 时间复杂度：O(nlogn)  空间复杂度：O(logn)
var findKthLargest = function (nums, k) {
  return nums.sort((a, b) => b - a)[k - 1]
}

// 方法二：快排  时间复杂度：O(nlogn)  空间复杂度：O(logn)
var findKthLargest = function (nums, k) {
  // 快排
  quickSort(nums, 0, nums.length - 1)
  return nums[nums.length - k]
}

var quickSort = function (arr, l, r) {
  if (l >= r) return
  const m = Math.floor(Math.random() * (r - l + 1)) + l
  ;[arr[m], arr[l]] = [arr[l], arr[m]]
  const pivot = arr[l]
  let i = l,
    j = r
  while (i < j) {
    while (i < j && arr[j] >= pivot) j--
    arr[i] = arr[j]
    while (i < j && arr[i] <= pivot) i++
    arr[j] = arr[i]
  }
  arr[i] = pivot
  quickSort(arr, l, i - 1)
  quickSort(arr, i + 1, r)
}

// 方法三：快速选择  时间复杂度O(n)  空间复杂度：O(1)
var findKthLargest = function (nums, k) {
  // 快速选择
  quickSelect(nums, 0, nums.length - 1, nums.length - k)
  return nums[nums.length - k]
}

var quickSelect = function (arr, l, r, pos) {
  const m = Math.floor(Math.random() * (r - l + 1)) + l
  ;[arr[m], arr[l]] = [arr[l], arr[m]]
  const pivot = arr[l]
  let i = l,
    j = r
  while (i < j) {
    while (i < j && arr[j] >= pivot) j--
    arr[i] = arr[j]
    while (i < j && arr[i] <= pivot) i++
    arr[j] = arr[i]
  }
  arr[i] = pivot
  if (pos === i) return
  else if (pos < i) quickSelect(arr, l, i - 1, pos)
  else quickSelect(arr, i + 1, r, pos)
}

// 方法四：堆  维护大小为k的小顶堆     时间复杂度：O(nlogn)   空间复杂度：O(logn)
var findKthLargest = function (nums, k) {
  const arr = nums.slice(0, k)
  for (let i = Math.floor(k / 2 - 1); i >= 0; i--) {
    heapSort(arr, i, k - 1)
  }
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > arr[0]) {
      arr[0] = nums[i]
      heapSort(arr, 0, k - 1)
    }
  }
  return arr[0]
}

var heapSort = function (arr, start, end) {
  const tmp = arr[start]
  let i = start
  for (let j = start * 2 + 1; j <= end; j = j * 2 + 1) {
    if (j < end && arr[j] > arr[j + 1]) j++
    if (arr[j] >= tmp) break
    arr[i] = arr[j]
    i = j
  }
  arr[i] = tmp
}
```

### 1.5 [长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

题目：给定一个含有 n 个正整数的数组和一个正整数 target ，找出该数组中满足其和 ≥ target 的长度最小的**连续子数组**，并返回其长度。

思路：双指针，滑动窗口（左缩右扩），当[l,r]的 sum >= target ，收缩窗口，直到条件不再满足，如果 sum < target ，扩张窗口。

时间复杂度：O(n)，其中 n 是数组的长度。指针 start 和 end 最多各移动 n 次。

空间复杂度：O(1)

```javascript
var minSubArrayLen = function (target, nums) {
  const n = nums.length
  let l = 0,
    r = 0,
    sum = 0
  let res = Infinity
  while (r < n) {
    sum += nums[r]
    while (sum >= target) {
      res = Math.min(res, r - l + 1)
      sum -= nums[l++]
    }
    r++
  }
  return res === Infinity ? 0 : res
}
```

### 1.6 [和为 K 的子数组](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

题目：给你一个整数数组 `nums` 和一个整数 `k` ，请你统计并返回该数组中和为 `k` 的连续子数组的个数。

- 方法一

  - 思路：穷举

  - 时间复杂度：O(n^2)，超时

  - 空间复杂度：O(1)

```javascript
var subarraySum = function (nums, k) {
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    let sum = 0
    for (let j = i; j < nums.length; j++) {
      sum += nums[j]
      if (sum === k) res++
    }
  }
  return res
}
```

- 方法二

  - 思路：前缀和，当前前缀和-之前前缀和=k，之前前缀和保存起来。
  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var subarraySum = function (nums, k) {
  let res = 0
  const map = new Map()
  map.set(0, 1)
  let presum = 0
  for (let i = 0; i < nums.length; i++) {
    presum += nums[i]
    if (map.has(presum - k)) {
      res += map.get(presum - k)
    }
    map.set(presum, (map.get(presum) || 0) + 1)
  }
  return res
}
```

### 1.7 [最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)

题目：给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

- 方法一
  - 思路：dp dp(_i_)=max{dp(*i*−1)+_nums_[*i*],_nums_[*i*]}
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```js
var maxSubArray = function (nums) {
  const n = nums.length
  const dp = new Array(n)
  dp[0] = nums[0]
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
  }
  return Math.max(...dp)
}
```

- 方法二
  - 思路：贪心：sum>0，有增益，sum 加上当前数字；sum<=0，无增益，舍弃 sum，更新为当前数字。每次比较 sum 和 res 的大小。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var maxSubArray = function (nums) {
  let res = nums[0]
  let sum = 0
  for (let num of nums) {
    if (sum > 0) {
      sum += num
    } else {
      sum = num
    }
    res = Math.max(res, sum)
  }
  return res
}
```

如果要获取起始和结束下标呢？

```js
var maxSubArray = function (nums) {
  let res = nums[0]
  let sum = 0,
    l0 = -1,
    l = -1,
    r = -1
  for (let i = 0; i < nums.length; i++) {
    if (sum > 0) {
      sum += nums[i]
    } else {
      sum = nums[i]
      l0 = i
    }
    if (sum > res) {
      res = sum
      l = l0
      r = i
    }
  }
  console.log(l, r)
  return res
}
```

### 1.8 [合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array)

题目：

- 方法一
  - 思路：双指针，从前往后，两两比较，放入新数组。
  - 时间复杂度：Om+n)
  - 空间复杂度：O(n)

```
var merge = function (nums1, m, nums2, n) {
  let res = [];
  let i = 0, j = 0, k = m + n - 1;
  while (i < m && j < n) {
    if (nums1[i] <= nums2[j]) {
      res.push(nums1[i++]);
    } else {
      res.push(nums2[j++]);
    }
  }
  return res.concat(i < m ? nums1.slice(i) : nums2.slice(j));
};
```

- 方法二
  - 思路：双指针，从后往前，两两比较，放入数组 1。
  - 时间复杂度：O(m+n)
  - 空间复杂度：O(1)

```javascript
var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    k = m + n - 1
  while (i >= 0 && j >= 0) {
    if (nums1[i] < nums2[j]) {
      nums1[k--] = nums2[j--]
    } else {
      nums1[k--] = nums1[i--]
    }
  }
  // 需要考虑nums1中没有数的情况
  while (j >= 0) {
    nums1[j] = nums2[j--]
  }
  return nums1
}
```

### 1.9 [合并区间](https://leetcode-cn.com/problems/merge-intervals/)

题目：以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

- 方法一
  - 思路：先按照起点升序排列，如果起点位置相同，按照结尾升序排序。如果当前的起点大于上一个区间的结尾，不合并，否则合并比大小
  - 时间复杂度：O(nlogn) 排序
  - 空间复杂度：O(logn) 排序

```javascript
var merge = function (intervals) {
  let res = []
  intervals.sort((a, b) => a[0] - b[0])
  res.push(intervals[0])
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > res[res.length - 1][1]) {
      res.push(intervals[i])
    } else {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], intervals[i][1])
    }
  }
  return res
}
```

### 1.10 [二分查找](https://leetcode-cn.com/problems/binary-search/)

题目**：数组为有序数组**，**数组中无重复元素**

- 方法一
  - 二分法
  - 时间复杂度：O(logn)
  - 空间复杂度：O(1)

```javascript
var search = function (nums, target) {
  // 二分第一种[l,r]
  let l = 0,
    r = nums.length - 1
  while (l <= r) {
    const m = l + parseInt((r - l) / 2)
    if (nums[m] === target) return m
    else if (nums[m] > target) r = m - 1
    else l = m + 1
  }
  return -1
}

var search = function (nums, target) {
  // 二分第二种[l,r)
  let l = 0,
    r = nums.length
  while (l < r) {
    const m = l + parseInt((r - l) / 2)
    if (nums[m] === target) return m
    else if (nums[m] > target) r = m
    else l = m + 1
  }
  return -1
}
```

### 1.11 [移除元素](https://leetcode-cn.com/problems/remove-element/)

题目：给你一个数组 `nums` 和一个值 `val`，你需要 **[原地](https://baike.baidu.com/item/原地算法)** 移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。

- 方法一
  - 暴力
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(1)

```javascript
var removeElement = function (nums, val) {
  let len = nums.length
  for (let i = 0; i < len; i++) {
    if (nums[i] === val) {
      for (let j = i + 1; j < len; j++) {
        nums[j - 1] = nums[j]
      }
      i--
      len--
    }
  }
  return len
}
```

- 方法二
  - 双指针法（快慢指针法）： **通过一个快指针和慢指针在一个 for 循环下完成两个 for 循环的工作**。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var removeElement = function (nums, val) {
  let slow = 0 // 慢指针指向第一个可以放的位置
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow++] = nums[fast]
    }
  }
  return slow
}
```

### 1.12 [有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

题目：

- 方法一
  - 暴力
  - 时间复杂度：O(n+nlogn)
  - 空间复杂度：O(logn)

```javascript
var sortedSquares = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    nums[i] *= nums[i]
  }
  nums.sort((a, b) => a - b)
  return nums
}
```

- 方法二

  - 双指针，数组平方的最大值就在数组的两端，l 指向起始位置，r 指向终止位置。

    定义一个新数组 result，和 A 数组一样的大小，让 k 指向 result 数组终止位置。

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var sortedSquares = function (nums) {
  const n = nums.length
  const res = new Array(n)
  let l = 0,
    r = n - 1,
    k = n - 1
  while (k >= 0) {
    if (nums[l] * nums[l] < nums[r] * nums[r]) {
      res[k--] = nums[r] * nums[r]
      r--
    } else {
      res[k--] = nums[l] * nums[l]
      l++
    }
  }
  return res
}
```

### 1.13 [长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

题目：

- 方法一
  - 暴力
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(1)

```javascript
var minSubArrayLen = function (target, nums) {
  const n = nums.length
  let res = Infinity
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = i; j < n; j++) {
      sum += nums[j]
      if (sum >= target) {
        res = Math.min(res, j - i + 1)
        break
      }
    }
  }
  return res === Infinity ? 0 : res
}
```

- 方法二
  - 滑动窗口
    - 窗口就是 满足其和 ≥ s 的长度最小的 连续 子数组。
    - 窗口的起始位置如何移动：如果当前窗口的值大于 s 了，窗口就要向前移动了（也就是该缩小了）。
    - 窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var minSubArrayLen = function (target, nums) {
  const n = nums.length
  let res = Infinity
  let i = 0,
    j = 0,
    sum = 0
  while (j < n) {
    sum += nums[j]
    while (sum >= target) {
      res = Math.min(res, j - i + 1)
      sum -= nums[i]
      i++
    }
    j++
  }
  return res === Infinity ? 0 : res
}
```

### 1.14 [螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix/)

```js
var spiralOrder = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  const res = []
  let l = 0,
    r = n - 1,
    t = 0,
    b = m - 1
  while (true) {
    for (let i = l; i <= r; i++) {
      res.push(matrix[t][i])
    }
    if (++t > b) break
    for (let i = t; i <= b; i++) {
      res.push(matrix[i][r])
    }
    if (--r < l) break
    for (let i = r; i >= l; i--) {
      res.push(matrix[b][i])
    }
    if (--b < t) break
    for (let i = b; i >= t; i--) {
      res.push(matrix[i][l])
    }
    if (++l > r) break
  }
  return res
}
```

### 1.15 [螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

题目：

- 方法一
  - 模拟
  - 时间复杂度：O(n^2)
  - 空间复杂度：O(n^2)

```javascript
var generateMatrix = function (n) {
  const res = new Array(n).fill(0).map(() => new Array(n).fill(0))
  let l = 0,
    r = n - 1,
    t = 0,
    b = n - 1
  let num = 1
  while (true) {
    for (let i = l; i <= r; i++) {
      res[t][i] = num++
    }
    if (++t > b) break
    for (let i = t; i <= b; i++) {
      res[i][r] = num++
    }
    if (--r < l) break
    for (let i = r; i >= l; i--) {
      res[b][i] = num++
    }
    if (--b < t) break
    for (let i = b; i >= t; i--) {
      res[i][l] = num++
    }
    if (++l > r) break
  }
  return res
}
```

### 1.16 [到最近的人的最大距离](https://leetcode-cn.com/problems/maximize-distance-to-closest-person/)

```js
var maxDistToClosest = function (seats) {
  const n = seats.length
  const l = new Array(n).fill(n)
  const r = new Array(n).fill(n)
  for (let i = 0; i < n; i++) {
    if (seats[i] === 1) l[i] = 0
    else if (i > 0) l[i] = l[i - 1] + 1
  }
  for (let i = n - 1; i >= 0; i--) {
    if (seats[i] === 1) r[i] = 0
    else if (i < n - 1) r[i] = r[i + 1] + 1
  }
  let res = 0
  for (let i = 0; i < n; i++) {
    if (seats[i] === 0) {
      res = Math.max(res, Math.min(l[i], r[i]))
    }
  }
  return res
}

// 双指针
var maxDistToClosest = function (seats) {
  const n = seats.length
  let res = 0,
    pre = -1
  for (let i = 0; i < n; i++) {
    if (seats[i] === 1) pre = i
    else {
      let fut = i + 1
      while (fut < n && seats[fut] === 0) fut++
      const l = pre === -1 ? n : i - pre
      const r = fut === n ? n : fut - i
      res = Math.max(res, Math.min(l, r))
    }
  }
  return res
}
```

### 1.17 [有多少小于当前数字的数字](https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number/)

```js
var smallerNumbersThanCurrent = function (nums) {
  const n = nums.length
  const tmp = [...nums]
  tmp.sort((a, b) => a - b)
  const hash = new Array(101).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    hash[tmp[i]] = i
  }
  let res = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    res[i] = hash[nums[i]]
  }
  return res
}
```

### 1.18 [找到所有数组中消失的数字](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)

```js
var findDisappearedNumbers = function (nums) {
  const n = nums.length
  for (let num of nums) {
    const index = (num - 1) % n
    nums[index] += n
  }
  let res = []
  for (let i = 0; i < n; i++) {
    if (nums[i] <= n) {
      res.push(i + 1)
    }
  }
  return res
}

// 绝对值
var findDisappearedNumbers = function (nums) {
  const n = nums.length
  for (let num of nums) {
    if (nums[Math.abs(num) - 1] > 0) {
      nums[Math.abs(num) - 1] *= -1
    }
  }
  let res = []
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      res.push(i + 1)
    }
  }
  return res
}
```

### 1.19 [打印从 1 到最大的 n 位数](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)

```js
var printNumbers = function (n) {
  const dfs = (index, cur) => {
    if (index === n) {
      res.push(cur)
      return
    }
    for (let i = 0; i <= 9; i++) {
      dfs(index + 1, cur + i)
    }
  }
  let res = []
  dfs(0, '')
  res.shift()
  return res
}
```

### 1.20 [字符的最短距离](https://leetcode-cn.com/problems/shortest-distance-to-a-character/)

- 两次遍历
  - 从左向右遍历，记录上一个字符 C 出现的位置 prev，那么答案就是 i - prev。
  - 从右向左遍历，记录上一个字符 C 出现的位置 next，答案就是 next - i。

```js
var shortestToChar = function (s, c) {
  const n = s.length
  let res = new Array(n).fill(0)
  let pre = -Infinity
  for (let i = 0; i < n; i++) {
    if (s[i] === c) pre = i
    else res[i] = i - pre
  }
  let next = Infinity
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === c) next = i
    else res[i] = Math.min(res[i], next - i)
  }
  return res
}
```

### 1.21 [非递减数列](https://leetcode-cn.com/problems/non-decreasing-array/)

```js
var checkPossibility = function (nums) {
  let flag = nums[0] > nums[1] ? false : true
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      if (flag) {
        if (nums[i + 1] >= nums[i - 1]) nums[i] = nums[i - 1]
        else nums[i + 1] = nums[i]
        flag = false
      } else {
        return false
      }
    }
  }
  return true
}
```

### 1.22 数组扁平化

```js
// 1. 递归
const flatten = arr => {
  let res = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item))
    } else {
      res.push(item)
    }
  })
  return res
}

// 2. 栈
const flatten = arr => {
  let res = []
  let stack = [].concat(arr)
  while (stack.length) {
    const val = stack.pop()
    if (Array.isArray(val)) {
      stack.push(...val)
    } else {
      res.unshift(val)
    }
  }
  return res
}

// 3. apply + some
const flatten = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat.apply([], arr)
  }
  return arr
}

// 4. reduce
const flatten = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}

// 5. 解构运算符
const flatten = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// 6. toString()
const flatten = arr => {
  return arr
    .toString()
    .split(',')
    .map(item => +item)
}

// 7. 正则
const flatten = arr => {
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '')
  str = '[' + str + ']'
  return JSON.parse(str)
}
```

### 1.23 [使数组唯一的最小增量](https://leetcode.cn/problems/minimum-increment-to-make-array-unique/)

- 方法一
  - 排序再遍历

```js
var minIncrementForUnique = function (nums) {
  nums.sort((a, b) => a - b)
  let res = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      res += nums[i - 1] + 1 - nums[i]
      nums[i] = nums[i - 1] + 1
    }
  }
  return res
}
```

- 方法二
  - 计数再遍历

```js
var minIncrementForUnique = function (nums) {
  const map = new Map()
  let max = -Infinity
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
    max = Math.max(max, num)
  }
  let res = 0
  for (let i = 0; i < max; i++) {
    if (map.get(i) > 1) {
      res += map.get(i) - 1
      map.set(i + 1, (map.get(i + 1) || 0) + map.get(i) - 1)
      map.set(i, 1)
    }
  }
  if (map.get(max) > 1) {
    const cnt = map.get(max) - 1
    res += ((1 + cnt) * cnt) / 2
  }
  return res
}
```

### 1.24 [航班预订统计](https://leetcode.cn/problems/corporate-flight-bookings/)

- 差分

```js
var corpFlightBookings = function (bookings, n) {
  // 1    2    3    4     5
  // 10   0    -10  0     0
  // 10   20   -10   -20   0
  // 10   45   -10   -20   0
  // 10   55   45    25    25
  const res = new Array(n).fill(0)
  for (let booking of bookings) {
    res[booking[0] - 1] += booking[2]
    if (booking[1] < n) {
      res[booking[1]] -= booking[2]
    }
  }
  for (let i = 1; i < n; i++) {
    res[i] += res[i - 1]
  }
  return res
}
```

### 1.25 [插入区间](https://leetcode.cn/problems/insert-interval/)

```js
var insert = function (intervals, newInterval) {
  const n = intervals.length
  let i = 0
  let res = []
  // 在右边
  while (i < n && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i])
    i++
  }
  // 有重叠
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0])
    newInterval[1] = Math.max(newInterval[1], intervals[i][1])
    i++
  }
  res.push(newInterval)
  // 在左边
  while (i < n) {
    res.push(intervals[i])
    i++
  }
  return res
}
```

### 1.26 [数组中的最长山脉](https://leetcode.cn/problems/longest-mountain-in-array/)

```js
var longestMountain = function (arr) {
  const n = arr.length
  let res = 0,
    i = 1
  while (i < n) {
    let up = 0,
      down = 0
    while (i < n && arr[i] > arr[i - 1]) up++, i++
    while (i < n && arr[i] < arr[i - 1]) down++, i++
    if (up > 0 && down > 0) res = Math.max(res, up + down + 1)
    while (i < n && arr[i] === arr[i - 1]) i++
  }
  return res
}
```
