---
title: 5. 双指针
date: 2021-11-3
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 5.1 [移除元素](https://leetcode-cn.com/problems/remove-element/)

题目：你必须仅使用 `O(1)` 额外空间并 **原地修改输入数组**。

- 方法一
  - 通过一个快指针和慢指针在一个 for 循环下完成两个 for 循环的工作。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var removeElement = function (nums, val) {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[j++] = nums[i]
    }
  }
  return j
}
```

### 5.2 [反转字符串](https://leetcode-cn.com/problems/reverse-string/)

见 4.1

### 5.3 [反转字符串 II](https://leetcode-cn.com/problems/reverse-string-ii/)

见 4.2

### 5.4 [替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

见 4.3

### 5.5 [翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

见 4.4

### 5.6 [删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

见 2.7

### 5.7 [链表相交](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

见 2.8

### 5.8 [环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

见 2.9

### 5.9 [三数之和](https://leetcode-cn.com/problems/3sum/)

见 3.8

### 5.10 [四数之和](https://leetcode-cn.com/problems/4sum/)

见 3.9

### 5.11 [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

```js
var lengthOfLongestSubstring = function (s) {
  const n = s.length
  let res = 0
  const map = new Map()
  let i = 0,
    j = 0
  while (i < n) {
    if (map.has(s[i])) {
      j = Math.max(j, map.get(s[i]) + 1)
    }
    map.set(s[i], i)
    res = Math.max(res, i - j + 1)
    i++
  }
  return res
}
```

### 5.12 [最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

- 滑动窗口
  - 将需要匹配的字符放入字典表，存储结构为需要匹配的字符，以及字符出现的次数：[字符，次数]
  - 利用双指针维护一个滑动窗口，不断移动右指针
    - 判断右指针的字符是否与字典表中的匹配
      - 是：将字典表中的次数 - 1，直到为 0（这里有个技巧：创建一个变量（needType）记录需要匹配的字符数量，初始长度为 Map 的 size,当对应的字符次数为 0 时，就减 1）
      - 否：继续移动右指针
    - 当 needType 的值为 0 时，就证明在当前窗口所有字符都匹配成功了
      - 移动左指针，缩小滑动窗口的大小
      - 移动过程中判断左指针指向的值是否为字典中值，如果是就证明匹配的值少了一个，这是需要更新 Map 中的次数，以及 needType 的数量
      - 记录每次窗口中的字符，找到最小的返回

```js
var minWindow = function (s, t) {
  let res = ''
  const m = s.length
  const n = t.length
  if (m < n) return res
  const map = new Map()
  for (let i = 0; i < n; i++) {
    map.set(t[i], (map.get(t[i]) || 0) + 1)
  }
  let l = 0,
    r = 0
  let needtype = map.size
  while (r < m) {
    const c1 = s[r]
    if (map.has(c1)) {
      map.set(c1, map.get(c1) - 1)
      if (map.get(c1) === 0) {
        needtype--
      }
    }
    while (needtype === 0) {
      const c2 = s[l]
      const str = s.slice(l, r + 1)
      if (!res || str.length < res.length) res = str
      if (map.has(c2)) {
        map.set(c2, map.get(c2) + 1)
        if (map.get(c2) === 1) needtype++
      }
      l++
    }
    r++
  }
  return res
}
```

### 5.13 [下一个排列](https://leetcode-cn.com/problems/next-permutation/)

- 从右向左找到第一个比右边小的数 nums1

- 从右向左找到第一个比 nums1 大的数 nums2

- 两个数交换

- 后面的数升序

  - [1,5,2,4,3,2]

    [1,5,(2),4,3,2]

    [1,5,(2),4,(3),2]

    [1,5,(3),4,(2),2]

    [1,5,3,2,2,4]

```js
var nextPermutation = function (nums) {
  const n = nums.length
  if (n <= 1) return
  let i = n - 2
  // 从右向左找到第一个比右边小的数nums1
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }
  if (i >= 0) {
    let j = n - 1
    // 从右向左找到第一个比nums1大的数nums2
    while (nums[j] <= nums[i]) {
      j--
    }
    // nums1与nums2交换
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  let l = i + 1,
    r = n - 1
  // 剩余反转
  while (l < r) {
    ;[nums[l], nums[r]] = [nums[r], [nums[l]]]
    l++
    r--
  }
}
```

### 5.14 [移动零](https://leetcode-cn.com/problems/move-zeroes/)

```js
var moveZeroes = function (nums) {
  const n = nums.length
  let i = 0,
    j = 0
  for (; j < n; j++) {
    if (nums[j]) {
      nums[i++] = nums[j]
    }
  }
  for (; i < n; i++) {
    nums[i] = 0
  }
}
```

### 5.15 [调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

```js
var exchange = function (nums) {
  const n = nums.length
  let i = 0,
    j = 0
  for (; j < n; j++) {
    if (nums[j] & (1 === 1)) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
      i++
    }
  }
  return nums
}
```

### 5.16 [两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

- 排序，双指针比较

```js
var intersection = function (nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  let i = 0,
    j = 0
  let res = []
  while (i < nums1.length && j < nums2.length) {
    const a = nums1[i],
      b = nums2[j]
    if (a === b) {
      if (!res.length || res[res.length - 1] !== a) {
        res.push(a)
      }
      i++
      j++
    } else if (a > b) {
      j++
    } else {
      i++
    }
  }
  return res
}
```

### 5.17 [和为 s 的连续正数序列](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)

- 方法一
  - 枚举

```js
var findContinuousSequence = function (target) {
  let res = []
  for (let i = 1; i <= Math.floor(target / 2); i++) {
    let sum = 0
    for (let j = i; ; j++) {
      sum += j
      if (sum > target) {
        break
      } else if (sum === target) {
        const cur = []
        for (let k = i; k <= j; k++) {
          cur.push(k)
        }
        res.push(cur.slice())
      }
    }
  }
  return res
}
```

- 方法二
  - 双指针，滑动窗口

```js
var findContinuousSequence = function (target) {
  let res = []
  let l = 1,
    r = 1
  let sum = 0
  while (l <= Math.floor(target / 2)) {
    if (sum < target) {
      sum += r
      r++
    } else if (sum > target) {
      sum -= l
      l++
    } else {
      let cur = []
      for (let k = l; k < r; k++) {
        cur.push(k)
      }
      res.push(cur.slice())
      sum -= l
      l++
    }
  }
  return res
}
```

### 5.18 [删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

```js
var removeDuplicates = function (nums) {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[j]) {
      nums[++j] = nums[i]
    }
  }
  return j + 1
}
```

### 5.19 [最短无序连续子数组](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/)

- 方法一
  - 复制数组，排序后，与原数组比较不同位置。

```js
var findUnsortedSubarray = function (nums) {
  const nums1 = [...nums].sort((a, b) => a - b)
  let i = 0,
    j = nums.length - 1
  while (i < nums.length && nums[i] === nums1[i]) i++
  while (j >= 0 && nums[j] === nums1[j]) j--
  return i >= j ? 0 : j - i + 1
}
```

- 方法二
  - 一次遍历，从左向右，维护最大值，从右向左，维护最小值

```js
var findUnsortedSubarray = function (nums) {
  const n = nums.length
  let max = -Number.MAX_VALUE,
    r = -1
  let min = Number.MAX_VALUE,
    l = -1
  for (let i = 0; i < n; i++) {
    if (nums[i] >= max) {
      max = nums[i]
    } else {
      r = i
    }
    const j = n - i - 1
    if (nums[j] <= min) {
      min = nums[j]
    } else {
      l = j
    }
  }
  return r === -1 ? 0 : r - l + 1
}
```

### 5.20 [按奇偶排序数组 II](https://leetcode-cn.com/problems/sort-array-by-parity-ii/)

```js
var sortArrayByParityII = function (nums) {
  let i = 0,
    j = 1
  for (; i < nums.length; i += 2) {
    if (nums[i] & 1) {
      while (nums[j] & 1) {
        j += 2
      }
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    }
  }
  return nums
}
```

### 5.21 [字符串压缩](https://leetcode-cn.com/problems/compress-string-lcci/)

```js
var compressString = function (S) {
  if (S.length === 0) return ''
  let i = 1,
    j = 0
  let res = S[0]
  for (; i < S.length; i++) {
    if (S[i] !== S[i - 1]) {
      res += i - j + S[i]
      j = i
    }
  }
  res += i - j
  return res.length >= S.length ? S : res
}
```

### 5.22 [仅仅反转字母](https://leetcode-cn.com/problems/reverse-only-letters/)

```js
var reverseOnlyLetters = function (s) {
  const arr = s.split('')
  let l = 0,
    r = arr.length - 1
  while (l < r) {
    while (l < r && !/^[a-zA-Z]+$/.test(arr[l])) l++
    while (l < r && !/^[a-zA-Z]+$/.test(arr[r])) r--
    ;[arr[l], arr[r]] = [arr[r], arr[l]]
    l++
    r--
  }
  return arr.join('')
}
```

### 5.23 [最长和谐子序列](https://leetcode-cn.com/problems/longest-harmonious-subsequence/)

```js
var findLHS = function (nums) {
  nums.sort((a, b) => a - b)
  let i = 0,
    j = 0
  let res = 0
  while (i < nums.length) {
    while (nums[i] - nums[j] > 1) {
      j++
    }
    if (nums[i] - nums[j] === 1) {
      res = Math.max(res, i - j + 1)
    }
    i++
  }
  return res
}
```

### 5.24 [复写零](https://leetcode-cn.com/problems/duplicate-zeros/)

```js
var duplicateZeros = function (arr) {
  let n = arr.length
  let i = 0,
    j = 0
  for (; i < n; i++, j++) {
    if (arr[j] === 0) i++
  }
  i--
  j--
  if (i > n - 1) {
    arr[--i] = arr[j--]
    i--
  }
  while (j < i) {
    if (arr[j] === 0) arr[i--] = arr[j]
    arr[i--] = arr[j--]
  }
}
```

### 5.25 [字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/)

- 哈希+滑动窗口

```js
var checkInclusion = function (s1, s2) {
  const len1 = s1.length
  const len2 = s2.length
  if (len1 > len2) return false
  const map1 = new Array(26).fill(0)
  const map2 = new Array(26).fill(0)
  for (let ch of s1) {
    map1[ch.charCodeAt() - 'a'.charCodeAt()]++
  }
  let l = 0,
    r = 0
  while (r < len2) {
    map2[s2[r].charCodeAt() - 'a'.charCodeAt()]++
    if (r - l + 1 > len1) {
      map2[s2[l].charCodeAt() - 'a'.charCodeAt()]--
      l++
    }
    if (map1.toString() === map2.toString()) return true
    r++
  }
  return false
}
```

### 5.26 [部分排序](https://leetcode.cn/problems/sub-sort-lcci/)

- 两次遍历
  - 最右侧一个`a[i]`，它的左边含有一个大于它的数
  - 最左侧一个`a[i]`，它的右边含有一个小于它的数

```js
var subSort = function (array) {
  const n = array.length
  let l = -1,
    r = -1
  let max = -Infinity
  for (let i = 0; i < n; i++) {
    if (array[i] >= max) {
      max = array[i]
    } else {
      r = i
    }
  }
  let min = Infinity
  for (let j = n - 1; j >= 0; j--) {
    if (array[j] <= min) {
      min = array[j]
    } else {
      l = j
    }
  }
  return [l, r]
}
```

### 5.27 [颜色分类](https://leetcode.cn/problems/sort-colors/)

```js
var sortColors = function (nums) {
  const n = nums.length
  let p0 = 0,
    p2 = n - 1
  for (let i = 0; i <= p2; i++) {
    while (i <= p2 && nums[i] === 2) {
      ;[nums[i], nums[p2]] = [nums[p2], nums[i]]
      p2--
    }
    if (nums[i] === 0) {
      ;[nums[i], nums[p0]] = [nums[p0], nums[i]]
      p0++
    }
  }
}
```

### 5.28 [有效三角形的个数](https://leetcode.cn/problems/valid-triangle-number/)

- 方法一
  - 排序+二分

```js
var triangleNumber = function (nums) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  let res = 0
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const target = nums[i] + nums[j]
      let l = j + 1,
        r = n - 1,
        k = j
      while (l <= r) {
        const m = ~~((r - l) / 2) + l
        if (nums[m] < target) {
          l = m + 1
          k = m
        } else {
          r = m - 1
        }
      }
      res += k - j
    }
  }
  return res
}
```

- 方法二
  - 排序+双指针

```js
var triangleNumber = function (nums) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  let res = 0
  for (let i = n - 1; i >= 2; i--) {
    let l = 0,
      r = i - 1
    while (l < r) {
      if (nums[l] + nums[r] > nums[i]) {
        res += r - l
        r--
      } else {
        l++
      }
    }
  }
  return res
}
```

### 5.29 [盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

```js
var maxArea = function (height) {
  const n = height.length
  let res = 0
  let l = 0,
    r = n - 1
  while (l < r) {
    res = Math.max(res, Math.min(height[l], height[r]) * (r - l))
    if (height[l] < height[r]) l++
    else r--
  }
  return res
}
```
