---
title: 11. 搜索
date: 2021-12-8
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 11.1 [搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

```js
var search = function (nums, target) {
  const n = nums.length
  let l = 0,
    r = n - 1
  while (l <= r) {
    let m = Math.floor((r - l) / 2) + l
    if (nums[m] === target) return m
    if (nums[l] === target) return l
    if (nums[r] === target) return r
    else if (nums[l] < nums[m]) {
      //左边有序
      if (target > nums[l] && target < nums[m]) {
        r = m - 1
      } else {
        l = m + 1
      }
    } else {
      //右边有序
      if (target > nums[m] && target < nums[r]) {
        l = m + 1
      } else {
        r = m - 1
      }
    }
  }
  return -1
}
```

### 11.2 [搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)

```js
var search = function (nums, target) {
  let l = 0,
    r = nums.length - 1
  while (l <= r) {
    let m = Math.floor((r - l) / 2) + l
    if (target === nums[m]) return true
    if (target === nums[l]) return true
    if (target === nums[r]) return true
    if (nums[l] === nums[m]) {
      l++
      continue
    }
    if (nums[l] < nums[m]) {
      if (target > nums[l] && target < nums[m]) {
        r = m - 1
      } else {
        l = m + 1
      }
    } else {
      if (target > nums[m] && target < nums[r]) {
        l = m + 1
      } else {
        r = m - 1
      }
    }
  }
  return false
}
```

### 11.3 [x 的平方根 ](https://leetcode-cn.com/problems/sqrtx/)

```js
var mySqrt = function (x) {
  let l = 1,
    r = x
  while (l <= r) {
    let m = Math.floor((r - l) / 2) + l
    if (m * m <= x) {
      if ((m + 1) * (m + 1) > x) {
        return m
      } else {
        l = m + 1
      }
    } else {
      r = m - 1
    }
  }
  return 0
}
```

### 11.4 [寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

```js
var findMedianSortedArrays = function (nums1, nums2) {
  let m = nums1.length
  let n = nums2.length
  if (m > n) {
    ;[nums1, nums2] = [nums2, nums1]
    ;[m, n] = [n, m]
  }
  let l = 0,
    r = m
  const totalleft = Math.floor((m + n + 1) / 2)
  while (l < r) {
    let i = Math.floor((r - l) / 2) + l
    let j = totalleft - i
    if (nums1[i] < nums2[j - 1]) l = i + 1
    else r = i
  }
  ;(i = l), (j = totalleft - i)
  const nums1leftmax = i === 0 ? -Infinity : nums1[i - 1]
  const nums2leftmax = j === 0 ? -Infinity : nums2[j - 1]
  const leftmax = Math.max(nums1leftmax, nums2leftmax)
  if ((m + n) % 2 === 1) return leftmax
  const nums1rightmin = i === m ? Infinity : nums1[i]
  const nums2rightmin = j === n ? Infinity : nums2[j]
  const rightmin = Math.min(nums1rightmin, nums2rightmin)
  return (leftmax + rightmin) / 2
}
```

### 11.5 [二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

```js
var findNumberIn2DArray = function (matrix, target) {
  const m = matrix.length
  if (m === 0) return false
  const n = matrix[0].length
  let i = 0,
    j = n - 1
  while (i < m && j >= 0) {
    if (target === matrix[i][j]) return true
    else if (target > matrix[i][j]) i++
    else j--
  }
  return false
}
```

### 11.6 [旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

```js
var minArray = function (numbers) {
  let l = 0,
    r = numbers.length - 1
  while (l < r) {
    const m = Math.floor((r - l) / 2) + l
    if (numbers[m] > numbers[r]) l = m + 1
    else if (numbers[m] < numbers[r]) r = m
    else r--
  }
  return numbers[l]
}
```

### 11.7 [在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

```js
var searchRange = function (nums, target) {
  const n = nums.length
  // 找第一个小于target的下标
  let l = 0,
    r = n - 1
  let lb = r
  while (l <= r) {
    const m = ~~((r - l) / 2) + l
    if (target <= nums[m]) {
      r = m - 1
      lb = r
    } else l = m + 1
  }
  // 找第一个大于target的下标
  ;(l = 0), (r = n - 1)
  let rb = l
  while (l <= r) {
    const m = ~~((r - l) / 2) + l
    if (target >= nums[m]) {
      l = m + 1
      rb = l
    } else r = m - 1
  }
  if (rb - lb <= 1) return [-1, -1]
  else return [lb + 1, rb - 1]
}
```

### 11.8 [山脉数组的峰顶索引](https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/)

```js
var peakIndexInMountainArray = function (arr) {
  let l = 0,
    r = arr.length
  while (l < r) {
    const m = ~~((r - l) / 2) + l
    if (arr[m] < arr[m + 1]) {
      l = m + 1
    } else {
      r = m
    }
  }
  return l
}
```

### 11.9 [排列硬币](https://leetcode-cn.com/problems/arranging-coins/)

```js
var arrangeCoins = function (n) {
  let l = 1,
    r = n
  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l
    const sum = ((m + 1) * m) / 2
    if (n === sum) return m
    else if (n > sum) l = m + 1
    else r = m - 1
  }
  return r
}
```

### 11.10 [0 ～ n-1 中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)

```js
var missingNumber = function (nums) {
  let l = 0,
    r = nums.length - 1
  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l
    if (nums[m] === m) l = m + 1
    else r = m - 1
  }
  return l
}
```

### 11.11 [第 k 个缺失的正整数](https://leetcode-cn.com/problems/kth-missing-positive-number/)

- 方法一
  - 遍历比较

```js
var findKthPositive = function (arr, k) {
  let cur = 1,
    p = 0,
    missnum = -1
  while (k) {
    if (arr[p] === cur) {
      p = p < arr.length - 1 ? p + 1 : p
    } else {
      k--
      missnum = cur
    }
    cur++
  }
  return missnum
}
```

- 方法二
  - 二分

```js
var findKthPositive = function (arr, k) {
  let l = 0,
    r = arr.length - 1
  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l
    if (arr[m] - m >= k + 1) r = m - 1
    else l = m + 1
  }
  return l + k
}
```

### 11.12 [供暖器](https://leetcode-cn.com/problems/heaters/)

- 方法一
  - 遍历

```js
var findRadius = function (houses, heaters) {
  heaters.sort((a, b) => a - b)
  let res = 0
  for (let h of houses) {
    let cur = Math.abs(heaters[0] - h)
    for (let i = 0; i < heaters.length - 1; i++) {
      if (Math.abs(heaters[i] - h) >= Math.abs(heaters[i + 1] - h)) {
        cur = Math.abs(heaters[i + 1] - h)
      } else {
        cur = Math.abs(heaters[i] - h)
        break
      }
    }
    res = Math.max(res, cur)
  }
  return res
}
```

- 方法二
  - 二分查找

```js
var findRadius = function (houses, heaters) {
  heaters.sort((a, b) => a - b)
  let res = 0
  for (let h of houses) {
    let cur = 0
    let l = 0,
      r = heaters.length - 1
    let rb = l
    while (l <= r) {
      const m = ~~((r - l) / 2) + l
      if (h > heaters[m]) {
        l = m + 1
        rb = l
      } else r = m - 1
    }
    if (rb === 0) cur = heaters[rb] - h
    else if (rb === heaters.length) cur = h - heaters[heaters.length - 1]
    else cur = Math.min(heaters[rb] - h, h - heaters[rb - 1])
    res = Math.max(res, cur)
  }
  return res
}
```

### 11.13 [分割数组的最大值](https://leetcode.cn/problems/split-array-largest-sum/)

- 子数组的最大值是有范围的，即在区间 [max(nums),sum(nums)]之中。
- 计算数组和最大值不大于 mid 对应的子数组个数 cnt
  - 如果 cnt>m，说明划分的子数组多了，即我们找到的 mid 偏小，故 l=mid+1；
  - 否则，说明划分的子数组少了，即 mid 偏大(或者正好就是目标值)，故 h=mid-1。

```js
var splitArray = function (nums, m) {
  let l = Math.max(...nums)
  let r = nums.reduce((pre, cur) => pre + cur, 0)
  while (l <= r) {
    let mid = ~~((r - l) / 2) + l
    let tmp = 0
    let cnt = 1
    for (let num of nums) {
      tmp += num
      if (tmp > mid) {
        tmp = num
        cnt++
      }
    }
    if (cnt > m) l = mid + 1
    else r = mid - 1
  }
  return l
}
```

### 11.14 [爱吃香蕉的珂珂](https://leetcode.cn/problems/koko-eating-bananas/)

```js
var minEatingSpeed = function (piles, h) {
  let l = 1,
    r = Math.max(...piles)
  let res = r
  while (l <= r) {
    const m = ~~((r - l) / 2) + l
    const time = getTime(m, piles)
    if (time > h) {
      l = m + 1
    } else {
      res = m
      r = m - 1
    }
  }
  return res
}
var getTime = function (speed, piles) {
  let time = 0
  for (let p of piles) {
    time += Math.floor((p + speed - 1) / speed)
  }
  return time
}
```
