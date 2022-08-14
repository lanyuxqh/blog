---
title: 4. 字符串
date: 2021-10-27
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 4.1 [反转字符串](https://leetcode-cn.com/problems/reverse-string/)

题目：必须原地修改输入数组、使用 O(1) 的额外空间

- 方法一
  - 双指针
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var reverseString = function (s) {
  let l = 0,
    r = s.length - 1
  while (l < r) {
    ;[s[l], s[r]] = [s[r], s[l]]
    l++
    r--
  }
  return s
}
```

### 4.2 [反转字符串 II](https://leetcode-cn.com/problems/reverse-string-ii/)

题目：每计数至 `2k` 个字符，就反转这 `2k` 字符中的前 `k` 个字符。

- 方法一
  - 模拟
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var reverseStr = function (s, k) {
  const n = s.length
  let res = s.split('')
  for (let i = 0; i < n; i += 2 * k) {
    if (i + k <= n) {
      reverse(res, i, i + k - 1)
    } else {
      reverse(res, i, n - 1)
    }
  }
  return res.join('')
}

var reverse = function (s, l, r) {
  while (l < r) {
    ;[s[l], s[r]] = [s[r], s[l]]
    l++
    r--
  }
}
```

### 4.3 [替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

题目：

- 方法一
  - 直接库函数
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var replaceSpace = function (s) {
  const res = s.split(' ')
  return res.join('%20')
}
```

- 方法二
  - 扩充，双指针，i 指向新长度的末尾，j 指向旧长度的末尾。
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var replaceSpace = function (s) {
  const arr = Array.from(s) // 字符串无法通过下标进行直接修改
  let cnt = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ' ') {
      cnt++
    }
  }
  let l = arr.length - 1,
    r = arr.length - 1
  while (l >= 0) {
    if (arr[l] === ' ') {
      arr[r--] = '%20'
      l--
    } else {
      arr[r--] = arr[l--]
    }
  }
  return arr.join('')
}
```

### 4.4 [翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

题目：尝试使用 `O(1)` 额外空间复杂度的原地解法，`C++` 方法只需要 O(1) 的额外空间来存放若干变量。

- 方法一

  - 移除多余空格

    将整个字符串反转

    将每个单词反转

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var reverseWords = function (s) {
  const arr = s.split(' ')
  // 移除空项
  removespace(arr)
  // 反转
  reverse(arr, 0, arr.length - 1)
  return arr.join(' ')
}
var removespace = function (arr) {
  let i = 0,
    j = 0
  while (i < arr.length) {
    if (arr[i] === '') {
      i++
    } else {
      arr[j++] = arr[i++]
    }
  }
  arr.length = j
}
var reverse = function (arr, start, end) {
  while (start < end) {
    ;[arr[start], arr[end]] = [arr[end], arr[start]]
    start++
    end--
  }
}
```

### 4.5 [左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

题目：把字符串前面的若干个字符转移到字符串的尾部。

- 方法一

  - 反转区间为前 n 的子串

    反转区间为 n 到末尾的子串

    反转整个字符串

  - 时间复杂度：O(n)

  - 空间复杂度：O(n)

```javascript
var reverseLeftWords = function (s, k) {
  const strArr = Array.from(s)
  reverse(strArr, 0, k - 1)
  reverse(strArr, k, s.length - 1)
  reverse(strArr, 0, s.length - 1)
  return strArr.join('')
}

var reverse = function (strArr, start, end) {
  let l = start,
    r = end
  while (l < r) {
    ;[strArr[l], strArr[r]] = [strArr[r], strArr[l]]
    l++
    r--
  }
}
```

- 方法二
  - 双倍 s 拼接，截取

```js
var reverseLeftWords = function (s, n) {
  let ds = s + s
  return ds.slice(n, n + s.length)
}
```

### 4.6 [实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)

题目：字符串单模匹配

- 方法一
  - 暴力匹配
  - 时间复杂度：_O_(*n*×*m*)
  - 空间复杂度：O(1)

```javascript
var strStr = function (haystack, needle) {
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0
    for (; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        break
      }
    }
    if (j === needle.length) {
      return i
    }
  }
  return -1
}
```

- 方法二
  - Knuth-Morris-Pratt 算法
    - KMP 的主要思想是**当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配了**。
    - next 数组就是一个**前缀表**（**最长相同前后缀长度**）**。前缀表是用来回退的，它记录了模式串与主串(文本串)不匹配的时候，模式串应该从哪里开始重新匹配**。
    - 字符串的前缀是指不包含最后一个字符的所有以第一个字符开头的连续子串；后缀是指不包含第一个字符的所有以最后一个字符结尾的连续子串。
  - 时间复杂度：O(n+m)
  - 空间复杂度：O(n)

```javascript
var strStr = function (haystack, needle) {
  // kmp
  const getNext = str => {
    const next = [0]
    let j = 0
    for (let i = 1; i < str.length; i++) {
      while (j > 0 && str[i] !== str[j]) j = next[j - 1]
      if (str[i] === str[j]) j++
      next.push(j)
    }
    return next
  }
  const next = getNext(needle)
  let j = 0
  for (let i = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) j = next[j - 1]
    if (haystack[i] === needle[j]) j++
    if (j === needle.length) return i - needle.length + 1
  }
  return -1
}
```

### 4.7 [重复的子字符串](https://leetcode-cn.com/problems/repeated-substring-pattern/)

题目：

- 方法一
  - 枚举
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var repeatedSubstringPattern = function (s) {
  const n = s.length
  for (let i = 1; i * 2 <= n; i++) {
    if (n % i === 0) {
      let flag = true
      for (let j = i; j < n; j++) {
        if (s[j] !== s[j - i]) {
          flag = false
          break
        }
      }
      if (flag) {
        return true
      }
    }
  }
  return false
}
```

- 方法二
  - 数学
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var repeatedSubstringPattern = function (s) {
  return (s + s).indexOf(s, 1) !== s.length
}
```

- 方法三
  - KMP
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var repeatedSubstringPattern = function (s) {
  const getNext = str => {
    let next = [0]
    let j = 0
    for (let i = 1; i < str.length; i++) {
      while (j > 0 && str[j] !== str[i]) {
        j = next[j - 1]
      }
      if (str[j] === str[i]) {
        j++
      }
      next.push(j)
    }
    return next
  }

  const n = s.length
  let next = getNext(s)
  if (next[n - 1] !== 0 && n % (n - next[n - 1]) === 0) return true
  else return false
}
```

### 4.8 [字符串相加](https://leetcode-cn.com/problems/add-strings/)

- 方法一
  - 数学加法计算，列竖式模拟

```js
var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    add = 0
  const res = []
  while (i >= 0 || j >= 0 || add) {
    const x = i >= 0 ? num1[i].charCodeAt() - '0'.charCodeAt() : 0
    const y = j >= 0 ? num2[j].charCodeAt() - '0'.charCodeAt() : 0
    const sum = x + y + add
    res.unshift(sum % 10)
    add = Math.floor(sum / 10)
    i--
    j--
  }
  return res.join('')
}
```

### 4.9 [字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)

- 去除头尾空格
- 判断符号
- 数字是否超出范围
- 实际上是个 parseInt 函数

```js
var myAtoi = function (s) {
  let res = 0
  let flag = 1
  let i = 0
  while (i < s.length && s[i] === ' ') {
    i++
  }
  let j = s.length - 1
  while (j >= 0 && s[j] === ' ') {
    j--
  }
  s = s.substring(i, j + 1)
  for (let i = 0; i < s.length; i++) {
    if (i === 0 && s[i] === '+') {
      continue
    } else if (i === 0 && s[i] === '-') {
      flag = -1
      continue
    } else if (s[i] >= '0' && s[i] <= '9') {
      res = res * 10 + (s[i] - '0')
      if (res * flag >= 2 ** 31 - 1) return 2 ** 31 - 1
      else if (res * flag <= -1 * 2 ** 31) return -1 * 2 ** 31
    } else {
      break
    }
  }
  return res * flag
}
```

### 4.10 [最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)

```js
var longestCommonPrefix = function (strs) {
  let res = ''
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[0][i] !== strs[j][i]) return res
    }
    res += strs[0][i]
  }
  return res
}

// 两两比较
var longestCommonPrefix = function (strs) {
  let res = strs[0]
  for (let str of strs) {
    for (let i = 0; i < res.length; i++) {
      if (str[i] !== res[i]) {
        res = res.substring(0, i)
      }
    }
  }
  return res
}
```

### 4.11 [验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

- 方法一
  - 正则+翻转

```js
var isPalindrome = function (s) {
  const arr = s.toLowerCase().match(/[a-z0-9]/g)
  if (!arr) return true
  return arr.join('') === arr.reverse().join('')
}
```

- 方法二
  - 双指针

```js
var isPalindrome = function (s) {
  s = s.toLowerCase()
  let l = 0,
    r = s.length - 1
  while (l < r) {
    while (l < r && !isValid(s[l])) l++
    while (l < r && !isValid(s[r])) r--
    if (l < r) {
      if (s[l] !== s[r]) return false
      l++
      r--
    }
  }
  return true
}
var isValid = function (s) {
  return (s >= 'a' && s <= 'z') || (s >= '0' && s <= '9')
}
```

### 4.12 [反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

```js
var reverseWords = function (s) {
  const arr = s.split(' ')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = reverse(arr[i].split('')).join('')
  }
  return arr.join(' ')
}
var reverse = function (s) {
  let l = 0,
    r = s.length - 1
  while (l < r) {
    ;[s[l], s[r]] = [s[r], s[l]]
    l++
    r--
  }
  return s
}
```

### 4.13 [日期之间隔几天](https://leetcode-cn.com/problems/number-of-days-between-two-dates/)

```js
var daysBetweenDates = function (date1, date2) {
  if (date1 > date2) [date1, date2] = [date2, date1]
  const t1 = date1.split('-')
  const t2 = date2.split('-')
  return (
    daysBetweenYears(t1[0], t2[0]) +
    daysFromYearStart(parseInt(t2[0]), parseInt(t2[1]), parseInt(t2[2])) -
    daysFromYearStart(parseInt(t1[0]), parseInt(t1[1]), parseInt(t1[2]))
  )
}

var daysBetweenYears = function (y1, y2) {
  let sum = 0
  for (let i = y1; i < y2; i++) {
    if (isLeap(i)) sum += 366
    else sum += 365
  }
  return sum
}

var daysFromYearStart = function (y, m, d) {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let sum = d
  for (let i = 0; i < m - 1; i++) sum += monthDays[i]
  if (m > 2 && isLeap(y)) sum += 1
  return sum
}

var isLeap = function (year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}
```

### 4.14 [外观数列](https://leetcode-cn.com/problems/count-and-say/)

```js
var countAndSay = function (n) {
  let s = '1'
  for (let i = 0; i < n - 1; i++) {
    let tmp = ''
    let cnt = 1
    for (let j = 0; j < s.length - 1; j++) {
      if (s[j] === s[j + 1]) cnt++
      else {
        tmp += cnt + s[j]
        cnt = 1
      }
    }
    tmp += cnt + s[s.length - 1]
    s = tmp
  }
  return s
}
```

### 4.15 [字符串相乘](https://leetcode.cn/problems/multiply-strings/)

```js
var multiply = function (num1, num2) {
  const n = num1.length
  const m = num2.length
  const res = new Array(n + m).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const tmp = res[i + j + 1] + +num1[i] * +num2[j]
      res[i + j + 1] = tmp % 10
      res[i + j] += ~~(tmp / 10)
    }
  }
  while (res[0] === 0) {
    res.shift()
  }
  return res.length ? res.join('') : '0'
}
```

### 4.16 [Z 字形变换](https://leetcode.cn/problems/zigzag-conversion/)

```js
var convert = function (s, numRows) {
  if (numRows === 1) return s
  let isDown = false,
    curRow = 0
  let res = new Array(numRows).fill('')
  for (let c of s) {
    res[curRow] += c
    if (curRow === 0 || curRow === numRows - 1) {
      isDown = !isDown
    }
    curRow += isDown ? 1 : -1
  }
  return res.join('')
}
```

### 4.17 [最短回文串](https://leetcode.cn/problems/shortest-palindrome/)

- 方法一
  - s 反转为 r_s，s 前缀和 r_s 后缀是否相同，相同则取不同段添加

```js
var shortestPalindrome = function (s) {
  // aacecaaa
  // aaacecaa
  // abcd
  // dcba
  const r_s = s.split('').reverse().join('')
  for (let i = s.length - 1; i >= 0; i--) {
    if (s.substring(0, i + 1) === r_s.substring(s.length - i - 1))
      return r_s.substr(0, s.length - i - 1) + s
  }
  return ''
}
```

- 方法二
  - kmp

```js
var shortestPalindrome = function (s) {
  // aacecaaa#aaacecaa
  // 01000122012234567
  // abcd#dcba
  // 000000001
  const n = s.length
  const r_s = s.split('').reverse().join('')
  const str = s + '#' + r_s
  const getNext = s => {
    const next = [0]
    let i = 1,
      j = 0
    while (i < 2 * n + 1) {
      while (j > 0 && s[j] !== s[i]) j = next[j - 1]
      if (s[i] === s[j]) j++
      next.push(j)
      i++
    }
    return next
  }
  const next = getNext(str)
  const maxlen = next[2 * n]
  return r_s.substring(0, n - maxlen) + s
}
```

### 4.18 [验证回文字符串 Ⅱ](https://leetcode.cn/problems/valid-palindrome-ii/)

- 双指针

```js
var validPalindrome = function (s) {
  let l = 0,
    r = s.length - 1
  const isPalindrom = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false
      l++
      r--
    }
    return true
  }
  while (l < r) {
    if (s[l] !== s[r]) {
      return isPalindrom(l, r - 1) || isPalindrom(l + 1, r)
    }
    l++
    r--
  }
  return true
}
```

### 4.19 [寻找最近的回文数](https://leetcode.cn/problems/find-the-closest-palindrome/)

- 特殊情况
  - < 10，返回自身 - 1
  - 10 100 ... 10000，返回自身 - 1，如 9 99 ... 9999
  - 9 99 ... 9999，返回自身 + 2，如 11 101 ... 10001
  - 11 101 ... 10001，返回自身 - 2，如 9 99 ... 9999
- 一般情况
  - 长度为奇数，取一半多取 1 位，翻转时，少翻 1 位，以下 3 数找与原数最接近的
    - +0: 99321 取 993，翻转后 99，拼接为 99399
    - -1: 99321 取 993，-1 得 992，翻转后 99，拼接为 99299
    - +1: 99321 取 993，+1 得 994，翻转后 99，拼接为 99499
  - 长度为偶数，取一半，翻转，以下 3 数找与原数最接近的
    - +0: 994321 取 994，翻转后 499，拼接为 994499
    - -1：994321 取 994，-1 得 993，翻转后 399，拼接为 993399
    - +1: 994321 取 994，+1 得 995，翻转后 599，拼接为 995599

```js
var nearestPalindromic = function (n) {
  const len = n.length,
    m = BigInt(n)
  if (m < 10n || m === BigInt(10 ** (len - 1))) return m - 1n + '' // <10  或 10,100...10000
  if (m + 1n === BigInt(10 ** len)) return m + 2n + '' // 9,99...9999
  if (m - 1n === BigInt(10 ** (len - 1))) return m - 2n + '' // 11,101...10001
  const pre = n.slice(0, (len + 1) >>> 1) // 取一半，长度为奇数，多取 1 位
  let minDiff = Number.MAX_SAFE_INTEGER,
    ans = ''
  for (let i = -1; i <= 1; i++) {
    // 依次枚举 -1 +0 +1 三种情况，最小的最接近原数的结果先被找到
    const newPre = (pre | 0) + i + ''
    const newStr = newPre + (len & 1 ? newPre.slice(0, -1) : newPre).split('').reverse().join('')
    const diff = Math.abs(n - newStr)
    if (diff && diff < minDiff) {
      minDiff = diff
      ans = newStr
    }
  }
  return ans
}
```

### 4.20 [破坏回文串](https://leetcode.cn/problems/break-a-palindrome/)

- 贪心

```js
var breakPalindrome = function (palindrome) {
  const n = palindrome.length
  if (n === 1) return ''
  const arr = palindrome.split('')
  let l = 0,
    r = n - 1
  while (l < r && arr[l] === 'a') {
    l++
    r--
  }
  if (l < r) {
    arr[l] = 'a'
  } else {
    arr[n - 1] = 'b'
  }
  return arr.join('')
}
```

### 4.21 [段式回文](https://leetcode.cn/problems/longest-chunked-palindrome-decomposition/)

```js
var longestDecomposition = function (text) {
  const n = text.length
  let l = 0,
    r = n - 1
  let w1 = '',
    w2 = '',
    res = 0
  while (l < r) {
    w1 += text[l++]
    w2 = text[r--] + w2
    if (w1 === w2) {
      res += 2
      w1 = ''
      w2 = ''
    }
  }
  return res + (l === r || w1.length > 0 ? 1 : 0)
}
```

### 4.22 [验证 IP 地址](https://leetcode.cn/problems/validate-ip-address/)

- 模拟

```js
var validIPAddress = function (queryIP) {
  const ipv4 = queryIP.split('.')
  const ipv6 = queryIP.split(':')
  if (ipv4.length === 4 && isIPv4(ipv4)) {
    return 'IPv4'
  }
  if (ipv6.length === 8 && isIPv6(ipv6)) {
    return 'IPv6'
  }
  return 'Neither'
}
var isIPv4 = function (arr) {
  for (const str of arr) {
    const num = +str
    if (num.toString().length !== str.length) return false
    if (num < 0 || num > 255) return false
  }
  return true
}
var isIPv6 = function (arr) {
  for (const str of arr) {
    if (str.length > 4 || str.length === 0) return false
    for (let ch of str) {
      const c = ch.charCodeAt()
      if (
        !(
          (c >= '0'.charCodeAt() && c <= '9'.charCodeAt()) ||
          (c >= 'a'.charCodeAt() && c <= 'f'.charCodeAt()) ||
          (c >= 'A'.charCodeAt() && c <= 'F'.charCodeAt())
        )
      )
        return false
    }
  }
  return true
}
```

- 正则

```js
var validIPAddress = function (queryIP) {
  const ipv4Reg =
    /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/
  const ipv6Reg = /^([0-9a-fA-F]{1,4})(\:[0-9a-fA-F]{1,4}){7}$/
  if (ipv4Reg.test(queryIP)) return 'IPv4'
  if (ipv6Reg.test(queryIP)) return 'IPv6'
  return 'Neither'
}
```

### 4.23 整数与 IP 地址间的转换

```js
while ((line = readline())) {
  if (line.includes('.')) {
    console.log(changeIpToInt(line))
  } else {
    console.log(changeIntToIp(parseInt(line)))
  }
}
function changeIpToInt(str) {
  const arr = str.split('.')
  let res = 0
  res |= +arr[0] << 24
  res |= +arr[1] << 16
  res |= +arr[2] << 8
  res |= +arr[3]
  return res >>> 0
}
function changeIntToIp(num) {
  const arr = []
  arr.unshift(num & 255)
  arr.unshift((num >> 8) & 255)
  arr.unshift((num >> 16) & 255)
  arr.unshift((num >> 24) & 255)
  return arr.join('.')
}
```

### 4.24 [整数转换英文表示](https://leetcode.cn/problems/integer-to-english-words/)

```js
var numberToWords = function (num) {
  if (num === 0) return 'Zero'
  let billion = ~~(num / 1000000000)
  num %= 1000000000
  let million = ~~(num / 1000000)
  num %= 1000000
  let thousand = ~~(num / 1000)
  num %= 1000
  let res = ''
  if (billion) {
    res += deal(billion) + 'Billion '
  }
  if (million) {
    res += deal(million) + 'Million '
  }
  if (thousand) {
    res += deal(thousand) + 'Thousand '
  }
  res += deal(num)
  // 去除最后一个空格
  return res.substring(0, res.length - 1)
}
var deal = function (num) {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
  const b = [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen'
  ]
  const c = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  let res = ''
  if (num === 0) return res
  if (num < 10) {
    res += a[num] + ' '
  } else if (num < 20) {
    res += b[num % 10] + ' '
  } else if (num < 100) {
    res += c[~~(num / 10)] + ' '
    if (num % 10) res += a[num % 10] + ' '
  } else if (num >= 100) {
    res += deal(~~(num / 100))
    res += 'Hundred '
    res += deal(num % 100)
  }
  return res
}
```
