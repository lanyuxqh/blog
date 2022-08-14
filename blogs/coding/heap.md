---
title: 17. 堆
date: 2022-3-17
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 17.1 知识点

- 小顶堆

```
class MinHeap {
    constructor() {
        this.heap = [];
    }

    swap(i1, i2) {
        let temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftIndex(index) {
        return index * 2 + 1;
    }

    getRightIndex(index) {
        return index * 2 + 2;
    }

    shiftUp(index) {
        if (index == 0) return;
        let parentIndex = this.getParentIndex(index);
        if (this.heap[index] < this.heap[parentIndex]) {
            this.swap(index, parentIndex);
            this.shiftUp(parentIndex);
        }
    }

    shiftDown(index) {
        if (index >= this.heap.length - 1) return;
        let leftIndex = this.getLeftIndex(index);
        let rightIndex = this.getRightIndex(index);
        if (this.heap[index] > this.heap[leftIndex]) {
            this.swap(index, leftIndex);
            this.shiftDown(leftIndex);
        }
        if (this.heap[index] > this.heap[rightIndex]) {
            this.swap(index, rightIndex);
            this.shiftDown(rightIndex);
        }
    }

    push(val) {
        this.heap.push(val);
        this.shiftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length > 1) {
            this.heap[0] = this.heap.pop();
            this.shiftDown(0);
        } else {
            this.heap = [];
        }
    }

    size() {
        return this.heap.length;
    }

    top() {
        return this.heap[0];
    }
}
```

```js
class MinHeap {
  constructor(k, nums) {
    this.heap = []
    this.k = k
  }
  add(num) {
    if (this.heap.length < this.k) {
      this.heap.push(num)
      this.up(this.heap.length - 1)
    } else if (num > this.heap[0]) {
      this.heap[0] = num
      this.down(0)
    }
  }
  up(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1
      if (this.heap[parent] > this.heap[i]) {
        ;[this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]]
        i = parent
      } else {
        break
      }
    }
  }
  down(i) {
    while (2 * i + 1 < this.heap.length) {
      let child = 2 * i + 1
      if (child + 1 < this.heap.length && this.heap[child + 1] < this.heap[child]) {
        child++
      }
      if (this.heap[i] > this.heap[child]) {
        ;[this.heap[child], this.heap[i]] = [this.heap[i], this.heap[child]]
        i = child
      } else {
        break
      }
    }
  }
}
```

- 大顶堆

```
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    swap(i1, i2) {
        let temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftIndex(index) {
        return index * 2 + 1;
    }

    getRightIndex(index) {
        return index * 2 + 2;
    }

    shiftUp(index) {
        if (index == 0) return;
        let parentIndex = this.getParentIndex(index);
        if (this.heap[index] > this.heap[parentIndex]) {
            this.swap(index, parentIndex);
            this.shiftUp(parentIndex);
        }
    }

    shiftDown(index) {
        if (index >= this.heap.length - 1) return;
        let leftIndex = this.getLeftIndex(index);
        let rightIndex = this.getRightIndex(index);
        if (this.heap[index] < this.heap[leftIndex]) {
            this.swap(index, leftIndex);
            this.shiftDown(leftIndex);
        }
        if (this.heap[index] < this.heap[rightIndex]) {
            this.swap(index, rightIndex);
            this.shiftDown(rightIndex);
        }
    }

    push(val) {
        this.heap.push(val);
        this.shiftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length > 1) {
            this.heap[0] = this.heap.pop();
            this.shiftDown(0);
        } else {
            this.heap = [];
        }
    }

    size() {
        return this.heap.length;
    }

    top() {
        return this.heap[0];
    }
}
```

### 17.2 [数据流中的中位数](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/)

思路：大顶堆维护前一半数据，小顶堆维护后一半数据

```javascript
// 小顶堆
class MinHeap {
  constructor() {
    this.heap = []
  }

  swap(i1, i2) {
    let temp = this.heap[i1]
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  getLeftIndex(index) {
    return index * 2 + 1
  }

  getRightIndex(index) {
    return index * 2 + 2
  }

  shiftUp(index) {
    if (index == 0) return
    let parentIndex = this.getParentIndex(index)
    if (this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex)
      this.shiftUp(parentIndex)
    }
  }

  shiftDown(index) {
    if (index >= this.heap.length - 1) return
    let leftIndex = this.getLeftIndex(index)
    let rightIndex = this.getRightIndex(index)
    if (this.heap[index] > this.heap[leftIndex]) {
      this.swap(index, leftIndex)
      this.shiftDown(leftIndex)
    }
    if (this.heap[index] > this.heap[rightIndex]) {
      this.swap(index, rightIndex)
      this.shiftDown(rightIndex)
    }
  }

  push(val) {
    this.heap.push(val)
    this.shiftUp(this.heap.length - 1)
  }

  pop() {
    if (this.heap.length > 1) {
      this.heap[0] = this.heap.pop()
      this.shiftDown(0)
    } else {
      this.heap = []
    }
  }

  size() {
    return this.heap.length
  }

  top() {
    return this.heap[0]
  }
}

// 大顶堆
class MaxHeap {
  constructor() {
    this.heap = []
  }

  swap(i1, i2) {
    let temp = this.heap[i1]
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  getLeftIndex(index) {
    return index * 2 + 1
  }

  getRightIndex(index) {
    return index * 2 + 2
  }

  shiftUp(index) {
    if (index == 0) return
    let parentIndex = this.getParentIndex(index)
    if (this.heap[index] > this.heap[parentIndex]) {
      this.swap(index, parentIndex)
      this.shiftUp(parentIndex)
    }
  }

  shiftDown(index) {
    if (index >= this.heap.length - 1) return
    let leftIndex = this.getLeftIndex(index)
    let rightIndex = this.getRightIndex(index)
    if (this.heap[index] < this.heap[leftIndex]) {
      this.swap(index, leftIndex)
      this.shiftDown(leftIndex)
    }
    if (this.heap[index] < this.heap[rightIndex]) {
      this.swap(index, rightIndex)
      this.shiftDown(rightIndex)
    }
  }

  push(val) {
    this.heap.push(val)
    this.shiftUp(this.heap.length - 1)
  }

  pop() {
    if (this.heap.length > 1) {
      this.heap[0] = this.heap.pop()
      this.shiftDown(0)
    } else {
      this.heap = []
    }
  }

  size() {
    return this.heap.length
  }

  top() {
    return this.heap[0]
  }
}

// 大顶堆维护前一半数据，小顶堆维护后一半数据
/**
 * initialize your data structure here.
 */
var MedianFinder = function () {
  this.min_heap = new MinHeap()
  this.max_heap = new MaxHeap()
}

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (this.max_heap.size() === 0) {
    this.max_heap.push(num)
  } else {
    if (num < this.max_heap.top()) {
      this.max_heap.push(num)
    } else {
      this.min_heap.push(num)
    }
    const maxh_size = this.max_heap.size()
    const minh_size = this.min_heap.size()
    if (minh_size > maxh_size) {
      const top = this.min_heap.top()
      this.max_heap.push(top)
      this.min_heap.pop()
    } else if (maxh_size - 1 > minh_size) {
      const top = this.max_heap.top()
      this.min_heap.push(top)
      this.max_heap.pop()
    }
  }
}

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const maxh_size = this.max_heap.size()
  const minh_size = this.min_heap.size()
  if (maxh_size === minh_size) return (this.max_heap.top() + this.min_heap.top()) / 2
  else return this.max_heap.top()
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
```
