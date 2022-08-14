---
title: 10. 排序
date: 2021-12-4
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 10.1 冒泡排序

冒泡排序比较任何两个相邻的项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样。

时间复杂度：O(n^2 )

稳定

```javascript
var bubbleSort = function (arr) {
  const n = arr.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}
```

优化一：

- 每一轮设置 isSorted 标志：如果在本轮排序中，元素有交换，则说明数列无序；如果没有元素交换，说明数列已然有序，直接跳出大循环。

```js
function bubleSort(arr) {
  const n = arr.length
  for (let i = 0; i < n; i++) {
    let isSorted = true
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        isSorted = false
      }
    }
    if (isSorted) break
  }
}
```

优化二：

- 记录 sortBorder：每一轮排序过程中，sortBorder 之后的元素肯定是有序的，就不需要比较了。

```js
function bubleSort(arr) {
  const n = arr.length
  let lastExchange = -1,
    sortBorder = n - 1
  for (let i = 0; i < n; i++) {
    let isSorted = true
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        isSorted = false
        lastExchange = j
      }
    }
    if (isSorted) break
    sortBorder = lastExchange
  }
}
```

优化三：

- 双向冒泡

```js
function bubleSort(arr) {
  const n = arr.length
  let low = 0,
    high = n - 1
  while (low < high) {
    let isSorted = true
    for (let i = low; i < high; i++) {
      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        isSorted = false
      }
    }
    high--
    for (let i = high; i > low; i--) {
      if (arr[i] < arr[i - 1]) {
        ;[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
        isSorted = false
      }
    }
    low++
    if (isSorted) break
  }
}
```

### 10.2 选择排序

找到数据结构中的最小值并 将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。

时间复杂度：O(n^2 )

不稳定

```javascript
var selectionSort = function (arr) {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    let min = i
    for (let j = i; j < n; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    if (min != i) {
      ;[arr[i], arr[min]] = [arr[min], arr[i]]
    }
  }
}
```

### 10.3 插入排序

每次排一个数组项，以此方式构建最后的排序数组。

时间复杂度：O(n^2 )

稳定

```javascript
var insertionSort = function (arr) {
  const n = arr.length
  for (let i = 1; i < n; i++) {
    const tmp = arr[i]
    let j = i
    while (j > 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = tmp
  }
}
```

### 10.4 归并排序

将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

时间复杂度：O(nlog^n )

稳定

```javascript
var mergeSort = function (arr) {
  const n = arr.length
  if (n === 1) return arr
  let m = Math.floor(n / 2)
  const arr_l = mergeSort(arr.slice(0, m))
  const arr_r = mergeSort(arr.slice(m, n))
  return merge(arr_l, arr_r)
}

var merge = function (arr1, arr2) {
  const res = []
  let i = 0,
    j = 0
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      res.push(arr1[i++])
    } else {
      res.push(arr2[j++])
    }
  }
  while (i < arr1.length) {
    res.push(arr1[i++])
  }
  while (j < arr2.length) {
    res.push(arr2[j++])
  }
  return res
}
```

### 10.5 快速排序

选定一个哨兵元素 pivot；把小于 pivot 的元素放在 pivot 左边，大于 pivot 的放在右边，这样，划分完后 pivot 就在自己**最终应该在的位置**了；对于 pivot 位置的左边和右边，递归进行前两步，直至待排序数组长度为 1 或者 0。

时间复杂度：O(nlog^n )

不稳定

- Lomuto

  - 选取第一个元素作为基准。将序列分成三段，一段比基准数小，一段比基准数大，一段是待划分序列。
  - i 指向小于基准数段的最后一个元素。
  - j 从待划分序列的第一个元素开始向后扫描数组，过程中当发现比基准数小的，则将该元素和 i 的后一个元素进行交换。
  - 最后基准与 i 元素交换。

- 选基准（就是和 l 交换，其余代码不变）
  - l 或 r
  - Math.floor((r - l) / 2) + l
  - Math.floor(Math.random() \* (r - l + 1)) + l

```javascript
var quickSort = function (arr, l, r) {
  if (l >= r) return
  const index = partition(arr, l, r)
  quickSort(arr, l, index - 1)
  quickSort(arr, index + 1, r)
}

var partition = function (arr, l, r) {
  const pivot = arr[l] // 轴选最左边
  let i = l
  for (let j = l + 1; j <= r; j++) {
    if (arr[j] < pivot) {
      swap(arr, ++i, j)
    }
  }
  swap(arr, l, i)
  return i
}

var swap = function (arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
```

- Hoare

  - 选取第一个元素作为基准。

  - 当 l<r，循环

    - r 从后往前遍历，直到元素小于基准
    - l 从前往后遍历，直到元素大于基准

    - l 元素和 r 元素交换

  - l 元素和基准交换

```js
var quickSort = function (arr, l, r) {
  if (l >= r) return
  const index = partition(arr, l, r)
  quickSort(arr, l, index - 1)
  quickSort(arr, index + 1, r)
}

var partition = function (arr, l, r) {
  if (l >= r) return
  let pivot = arr[l] // 轴选最左边
  let pindex = l
  while (l < r) {
    while (l < r && arr[r] >= pivot) r--
    while (l < r && arr[l] <= pivot) l++
    if (l < r) {
      swap(arr, l, r)
    }
  }
  swap(arr, l, pindex)
  return l
}

var swap = function (arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
```

```js
// 记住这个版本就ok了～
var sortArray = function (nums) {
  // 手写快排
  quickSort(nums, 0, nums.length - 1)
  return nums
}

var quickSort = function (arr, l, r) {
  if (l >= r) return
  let m = ((Math.random() * (r - l + 1)) >> 0) + l // 随机选基准
  ;[arr[l], arr[m]] = [arr[m], arr[l]]
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
```

### 10.6 希尔排序

将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序

不稳定

```javascript
var shellSort = function (arr) {
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < arr.length; i++) {
      let tmp = arr[i]
      let j = i
      while (j - gap >= 0 && arr[j - gap] > tmp) {
        arr[j] = arr[j - gap]
        j -= gap
      }
      arr[j] = tmp
    }
  }
}
```

### 10.7 基数排序

稳定

```javascript
var radixSort = function (arr) {
  const max = String(Math.max(...arr)).length
  const counter = []
  for (let i = 0, n = 1; i < max; i++, n = n * 10) {
    for (let j = 0; j < arr.length; j++) {
      const bucket = Math.floor((arr[j] / n) % 10)
      counter[bucket] = counter[bucket] === undefined ? [] : counter[bucket]
      counter[bucket].push(arr[j])
    }
    let pos = 0
    for (let j = 0; j < counter.length; j++) {
      if (counter[j] !== undefined) {
        while (counter[j].length) {
          arr[pos++] = counter[j].shift()
        }
      }
    }
  }
}
```

### 10.8 堆排序

不稳定

```javascript
var sortArray = function (nums) {
  for (let i = Math.floor(nums.length / 2 - 1); i >= 0; i--) {
    heapSort(nums, i, nums.length - 1)
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    ;[nums[i], nums[0]] = [nums[0], nums[i]]
    heapSort(nums, 0, i - 1)
  }
  return nums
}

var heapSort = function (arr, start, end) {
  // 小顶堆-降序
  let tmp = arr[start]
  let i = start
  for (let j = start * 2 + 1; j <= end; j = j * 2 + 1) {
    if (j < end && arr[j] > arr[j + 1]) j++
    if (arr[j] >= tmp) break
    arr[i] = arr[j]
    i = j
  }
  arr[i] = tmp
}

var heapSort = function (arr, start, end) {
  // 大顶堆-升序
  let tmp = arr[start]
  let i = start
  for (let j = start * 2 + 1; j <= end; j = j * 2 + 1) {
    if (j < end && arr[j] < arr[j + 1]) j++
    if (arr[j] <= tmp) break
    arr[i] = arr[j]
    i = j
  }
  arr[i] = tmp
}
```
