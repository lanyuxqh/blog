---
title: 15. 数学
date: 2022-1-23
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 15.1 [多数元素](https://leetcode-cn.com/problems/majority-element/)

- 摩尔投票：是候选人加一，不是减一，计数器为 0 则换候选人。

```js
var majorityElement = function (nums) {
  let cnt = 0,
    candidate = undefined
  for (let num of nums) {
    if (cnt === 0) candidate = num
    if (num !== candidate) cnt--
    else cnt++
  }
  return candidate
}
```

### 15.2 [求众数 II](https://leetcode-cn.com/problems/majority-element-ii/)

- 摩尔投票，三数抵消

```js
var majorityElement = function (nums) {
  let candidate1 = undefined,
    candidate2 = undefined
  let cnt1 = 0,
    cnt2 = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === candidate1) {
      cnt1++
    } else if (nums[i] === candidate2) {
      cnt2++
    } else if (cnt1 === 0) {
      candidate1 = nums[i]
      cnt1 = 1
    } else if (cnt2 === 0) {
      candidate2 = nums[i]
      cnt2 = 1
    } else {
      cnt1--
      cnt2--
    }
  }
  ;(cnt1 = 0), (cnt2 = 0)
  for (let num of nums) {
    if (num === candidate1) cnt1++
    if (num === candidate2) cnt2++
  }
  const res = []
  if (cnt1 > nums.length / 3) res.push(candidate1)
  if (cnt2 > nums.length / 3) res.push(candidate2)
  return res
}
```

### 15.3 [只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

- 异或运算

```js
var singleNumber = function (nums) {
  let res = 0
  for (let num of nums) {
    res ^= num
  }
  return res
}
```

- 排序+跳着遍历

```js
var singleNumber = function (nums) {
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 1; i += 2) {
    if (nums[i] !== nums[i + 1]) return nums[i]
  }
  return nums[nums.length - 1]
}
```

- map+两次遍历

```js
var singleNumber = function (nums) {
  const map = new Map()
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }
  for (let [key, val] of map.entries()) {
    if (val === 1) return key
  }
  return undefined
}
```

### 15.4 [回文数](https://leetcode-cn.com/problems/palindrome-number/)

- 取余数重组

```js
var isPalindrome = function (x) {
  if (x < 0 || (x % 10 == 0 && x !== 0)) return false //负数、末尾为0的非零数
  let res = 0,
    y = x
  while (y) {
    res = res * 10 + (y % 10)
    y = Math.floor(y / 10)
  }
  return res === x
}
```

### 15.5 [圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)

- 方法一
  - 数组模拟-----超时

```js
var lastRemaining = function (n, m) {
  let arr = []
  for (let i = 0; i < n; i++) {
    arr.push(i)
  }
  let len = arr.length
  let i = 0
  while (len > 1) {
    i = (i + m - 1) % len
    arr.splice(i, 1)
    len--
  }
  return arr[0]
}
```

- 方法二
  - 迭代
  - https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/solution/huan-ge-jiao-du-ju-li-jie-jue-yue-se-fu-huan-by-as/

```js
var lastRemaining = function (n, m) {
  let pos = 0
  for (let i = 2; i <= n; i++) {
    pos = (pos + m) % i
  }
  return pos
}
```

### 15.6 [整数反转](https://leetcode-cn.com/problems/reverse-integer/)

```js
var reverse = function (x) {
  let res = 0
  while (x) {
    res = res * 10 + (x % 10)
    if (res > Math.pow(2, 31) - 1 || res < Math.pow(-2, 31)) return 0
    x = ~~(x / 10)
  }
  return res
}
```

### 15.7 [Excel 表列名称](https://leetcode-cn.com/problems/excel-sheet-column-title/)

- 把【1，26】转化到【0，25】

```js
var convertToTitle = function (columnNumber) {
  let res = []
  while (columnNumber) {
    columnNumber--
    res.unshift(String.fromCharCode((columnNumber % 26) + 'A'.charCodeAt()))
    columnNumber = Math.floor(columnNumber / 26)
  }
  return res.join('')
}
```

### 15.8 [扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)

- 牌组中的最大值减最小值小于 5，并且除了 joker 牌，不能有其他重复的牌

```js
var isStraight = function (nums) {
  let set = new Set()
  let max = 0
  let min = 14
  for (let num of nums) {
    if (num === 0) continue
    if (set.has(num)) return false
    set.add(num)
    max = Math.max(max, num)
    min = Math.min(min, num)
  }
  return max - min < 5
}

// 先排序再比较
var isStraight = function (nums) {
  nums.sort((a, b) => a - b)
  let minindex = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      minindex++
      continue
    }
    if (i > 0 && nums[i] === nums[i - 1]) return false
  }
  return nums[4] - nums[minindex] < 5
}
```

### 15.9 [丢失的数字](https://leetcode-cn.com/problems/missing-number/)

- 方法一
  - 数学，0-n 高斯求和，减去数组之和

```js
var missingNumber = function (nums) {
  const n = nums.length
  let target = (n * (n + 1)) / 2
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += nums[i]
  }
  return target - sum
}
```

- 方法二
  - 位运算 异或
  - 位运算符有 7 个，分为两类：
    - 逻辑位运算符：位与（&）、位或（|）、位异或（^）、非位（~）
    - 移位运算符：左移（<<）、右移（>>）、无符号右移（>>>）

```js
var missingNumber = function (nums) {
  let res = 0
  for (let num of nums) {
    res ^= num
  }
  for (let i = 0; i <= nums.length; i++) {
    res ^= i
  }
  return res
}
```

### 15.10 [位 1 的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

- 使用逻辑右移，即 `>>>` ，while 的判断条件才能是 `n != 0` 。

  - **算术右移 `>>`** ：舍弃最低位，高位用符号位填补；

  - **逻辑右移 `>>>`** ：舍弃最低位，高位用 0 填补。本题要用这个，

```js
var hammingWeight = function (n) {
  let res = 0
  while (n) {
    res += n & 1
    n = n >>> 1
  }
  return res
}
```

- n & (n-1) ：可以让 n 的最后一个 1 变为 0，转换的次数就是 1 的个数

```js
var hammingWeight = function (n) {
  let res = 0
  while (n) {
    n = n & (n - 1)
    res++
  }
  return res
}
```

### 15.11 [数字转换为十六进制数](https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/)

```js
var toHex = function (num) {
  if (!num) return '0'
  if (num < 0) num = Math.pow(2, 32) + num // 负数加上偏移
  const hex = '0123456789abcdef'
  let res = ''
  while (num) {
    res = hex[num % 16] + res
    num = ~~(num / 16)
  }
  return res
}

var toHex = function (num) {
  if (!num) return '0'
  const hex = '0123456789abcdef'
  let res = ''
  while (num) {
    res = hex[num & 15] + res
    num = num >>> 4
  }
  return res
}
```

### 15.12 [完美数](https://leetcode-cn.com/problems/perfect-number/)

```js
var checkPerfectNumber = function (num) {
  if (num === 1) return false
  let sum = 1
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i + num / i
    }
  }
  return sum === num
}
```

### 15.13 [杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/)

```js
var generate = function (numRows) {
  const res = []
  const cur = [1]
  res.push(cur.slice())
  for (let i = 1; i < numRows; i++) {
    cur.push(1)
    for (let i = cur.length - 2; i >= 1; i--) {
      cur[i] = cur[i] + cur[i - 1]
    }
    res.push(cur.slice())
  }
  return res
}
```

### 15.14 [阶乘后的零](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

- 质因子 5 的个数

```js
var trailingZeroes = function (n) {
  let res = 0
  for (let i = 5; i <= n; i += 5) {
    let num = i
    while (num % 5 === 0) {
      num = num / 5
      res++
    }
  }
  return res
}

// 优化
var trailingZeroes = function (n) {
  let res = 0
  while (n) {
    n = Math.floor(n / 5)
    res += n
  }
  return res
}
```

### 15.15 [三个数的最大乘积](https://leetcode-cn.com/problems/maximum-product-of-three-numbers/)

```js
// // 排序找最大最小
var maximumProduct = function (nums) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  return Math.max(nums[n - 1] * nums[n - 2] * nums[n - 3], nums[0] * nums[1] * nums[n - 1])
}

// 不排序，直接找最大最小
var maximumProduct = function (nums) {
  const n = nums.length
  let max1 = Number.MIN_SAFE_INTEGER
  let max2 = Number.MIN_SAFE_INTEGER
  let max3 = Number.MIN_SAFE_INTEGER
  let min1 = Number.MAX_SAFE_INTEGER
  let min2 = Number.MAX_SAFE_INTEGER
  for (const num of nums) {
    if (num > max1) {
      max3 = max2
      max2 = max1
      max1 = num
    } else if (num > max2) {
      max3 = max2
      max2 = num
    } else if (num > max3) {
      max3 = num
    }
    if (num < min1) {
      min2 = min1
      min1 = num
    } else if (num < min2) {
      min2 = num
    }
  }
  return Math.max(max1 * max2 * max3, min1 * min2 * max1)
}
```

### 15.16 [计数质数](https://leetcode-cn.com/problems/count-primes/)

- 方法一
  - 暴力枚举，超时

```js
var countPrimes = function (n) {
  let res = 0
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      res++
    }
  }
  return res
}

var isPrime = function (num) {
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}
```

- 方法二
  - 埃氏筛法，标记

```js
var countPrimes = function (n) {
  let res = 0
  const isPrime = new Array(n).fill(1)
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      res++
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0
      }
    }
  }
  return res
}
```

### 15.17 [Nim 游戏](https://leetcode-cn.com/problems/nim-game/)

```js
var canWinNim = function (n) {
  return n % 4 !== 0
}
```

### 15.18 [2 的幂](https://leetcode-cn.com/problems/power-of-two/)

```js
var isPowerOfTwo = function (n) {
  return n > 0 && (n & (n - 1)) === 0
}

// or
var isPowerOfTwo = function (n) {
  return n > 0 && (n & -n) === n
}
```

### 15.19 [4 的幂](https://leetcode-cn.com/problems/power-of-four/)

```js
var isPowerOfFour = function (n) {
  if (n <= 0) return false
  const x = Math.floor(Math.sqrt(n))
  return x * x === n && (x & (x - 1)) === 0
}

// or
var isPowerOfFour = function (n) {
  if (n <= 0) return false
  const x = Math.floor(Math.sqrt(n))
  return x * x === n && (x & -x) === x
}

// or
var isPowerOfFour = function (n) {
  return n > 0 && (n & (n - 1)) === 0 && (n & 0xaaaaaaaa) === 0
}
```

### 15.20 [判定字符是否唯一](https://leetcode-cn.com/problems/is-unique-lcci/)

```js
// 不使用额外的数据结构，位运算
var isUnique = function (astr) {
  let mark = 0
  for (const ch of astr) {
    const move_bit = ch.charCodeAt() - 'a'.charCodeAt()
    if (mark & (1 << move_bit)) return false
    else mark = mark | (1 << move_bit)
  }
  return true
}
```

### 15.21 [矩形重叠](https://leetcode-cn.com/problems/rectangle-overlap/)

```js
// 反向考虑：不重叠条件，取非
var isRectangleOverlap = function (rec1, rec2) {
  const [x1, y1, x2, y2] = rec1
  const [x3, y3, x4, y4] = rec2
  return !(x3 >= x2 || x1 >= x4 || y3 >= y2 || y1 >= y4)
}

// 正向考虑，投影到一维线段
var isRectangleOverlap = function (rec1, rec2) {
  const [x1, y1, x2, y2] = rec1
  const [x3, y3, x4, y4] = rec2
  return x1 < x4 && x3 < x2 && y3 < y2 && y1 < y4
}
```

### 15.22 [1 比特与 2 比特字符](https://leetcode-cn.com/problems/1-bit-and-2-bit-characters/)

```js
var isOneBitCharacter = function (bits) {
  const n = bits.length
  let i = 0
  while (i < n - 1) {
    i += bits[i] + 1
  }
  return i === n - 1
}
```

### 15.23 [丑数](https://leetcode-cn.com/problems/ugly-number/)

```js
var isUgly = function (n) {
  while (n) {
    if (n % 2 === 0) n /= 2
    else if (n % 3 === 0) n /= 3
    else if (n % 5 === 0) n /= 5
    else break
  }
  return n === 1
}
```

### 15.24 [自除数](https://leetcode-cn.com/problems/self-dividing-numbers/)

```js
var selfDividingNumbers = function (left, right) {
  let res = []
  for (let i = left; i <= right; i++) {
    if (isDN(i)) res.push(i)
  }
  return res
}
var isDN = function (n) {
  let tmp = n
  while (tmp) {
    const digit = tmp % 10
    if (digit === 0 || n % digit) return false
    tmp = ~~(tmp / 10)
  }
  return true
}
```

### 15.25 [将数组分成和相等的三个部分](https://leetcode-cn.com/problems/partition-array-into-three-parts-with-equal-sum/)

```js
// 遍历数组查找和为sum/3的子数组个数
var canThreePartsEqualSum = function (arr) {
  const sum = arr.reduce((pre, cur) => pre + cur, 0)
  if (sum % 3) return false
  const avg = sum / 3
  let cnt = 0,
    sum1 = 0
  for (let i = 0; i < arr.length - 1; i++) {
    sum1 += arr[i]
    if (sum1 === avg) {
      cnt++
      sum1 = 0
    }
    if (cnt === 2) return true
  }
  return false
}
```

### 15.26 [不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)

```js
var add = function (a, b) {
  while (b) {
    const c = a ^ b // add
    b = (a & b) << 1 // carry
    a = c
  }
  return a
}
```

### 15.27 [颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

```js
var reverseBits = function (n) {
  let res = 0
  for (let i = 0; i < 32; i++) {
    res = (res << 1) + (n & 1)
    n = n >>> 1
  }
  return res >>> 0 // x >>> 0本质上就是保证x有意义（为数字类型），且为正整数
}
```

### 15.28 [用 Rand7() 实现 Rand10()](https://leetcode.cn/problems/implement-rand10-using-rand7/)

- (rand_X() - 1) × Y + rand_Y() ==> 可以等概率的生成[1, X * Y]范围的随机数；
- rand_N() % K + 1 且 N > K 且 N 是 K 的倍数 ==> 可以等概率的生成[[1, K]范围的随机数。
  - 拒绝采样，实现等概率

```js
var rand10 = function () {
  let num
  do {
    num = (rand7() - 1) * 7 + rand7() // rand49()---[1,49]
  } while (num > 40)
  return (num % 10) + 1 // rand40()%10+1---[1,10]
}
```

### 15.29 [第 N 位数字](https://leetcode.cn/problems/nth-digit/)

```js
var findNthDigit = function (n) {
  // 找到n所在整数的长度
  // [10^(len-1),10^len-1]---> 9*10^(len-1)*len
  let len = 1
  while (len * 9 * Math.pow(10, len - 1) < n) {
    n -= len * 9 * Math.pow(10, len - 1)
    len++
  }
  // 找到n所在整数
  let num = Math.pow(10, len - 1) + parseInt((n - 1) / len)
  // 找到n所在整数的第n位（从高到低）
  n -= len * parseInt((n - 1) / len)
  return parseInt(num / Math.pow(10, len - n)) % 10
}
```

### 15.30 [字典序的第 K 小数字](https://leetcode.cn/problems/k-th-smallest-in-lexicographical-order/)

```js
var findKthNumber = function (n, k) {
  let cur = 1 // 当前前缀
  k -= 1
  while (k > 0) {
    // 计算界限为n 【当前前缀下-同层邻居】节点个数
    let cnt = 0,
      first = cur,
      last = cur + 1
    while (first <= n) {
      cnt += Math.min(last, n + 1) - first
      first *= 10
      last *= 10
    }
    if (cnt <= k) {
      // 去邻居找
      cur += 1
      k -= cnt
    } else {
      // 去当前前缀子节点找
      cur *= 10
      k -= 1
    }
  }
  return cur
}
```

### 15.31 [旋转图像](https://leetcode.cn/problems/rotate-image/)

- 对角线互换，按行反转

```js
var rotate = function (matrix) {
  const n = matrix.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      ;[matrix[i][j], matrix[i][n - j - 1]] = [matrix[i][n - j - 1], matrix[i][j]]
    }
  }
}
```
