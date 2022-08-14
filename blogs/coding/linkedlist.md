---
title: 2. 链表
date: 2021-10-12
tags:
  - 刷题
  - javascript
categories:
  - 刷题
---

### 2.1 链表理论

> 链表是一种通过指针串联在一起的线性结构，每一个节点由两部分组成，一个是数据域一个是指针域（存放指向下一个节点的指针），最后一个节点的指针域指向 null。

链表的几种类型：单链表、双链表、循环链表

数组和链表：

- 数组是在内存中是连续分布的，但是链表在内存中可不是连续分布的；
- 数组插入删除 O(n)，查询 O(1)；链表插入删除 O(1)，查询 O(n)；

### 2.2 链表基本定义、插入、删除、反转、打印

```javascript
// 链表定义
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

// 打印
ListNode.prototype.print = function () {
  let cur = head
  const res = []
  while (cur !== null) {
    if (cur.val) res.push(cur.val)
    cur = cur.next
  }
  console.log(res)
}

// 在item后插入x
ListNode.prototype.insert = function (x, item) {
  const node = new ListNode(x)
  let cur = head
  while (cur.val !== item) {
    cur = cur.next
  }
  node.next = cur.next
  cur.next = node
}

// 删除x节点(一个)
ListNode.prototype.remove = function (x) {
  let cur = head
  while (cur.next && cur.next.val !== x) {
    cur = cur.next
  }
  if (cur.next) {
    cur.next = cur.next.next
  }
}

// 反转
ListNode.prototype.reverse = function () {
  if (head === null || head.next === null) return head
  let cur = head
  let pre = null
  let tmp
  while (cur) {
    tmp = cur.next
    cur.next = pre
    pre = cur
    cur = tmp
  }
  head = pre
}

// 反转(递归)
ListNode.prototype.reverseRecur = function (head) {
  if (head === null || head.next === null) return head
  let new_head = this.reverseRecur(head.next)
  head.next.next = head
  head.next = null
  return new_head
}

let head = new ListNode(null) // 虚拟头节点
head.insert(1, null)
head.insert(2, 1)
head.insert(3, 2)
head.insert(4, 2)
head.insert(4, 2)
head.print()

// head.remove(2);
// head.print();

// head.reverse();
// head.print();

// head = head.reverseRecur(head);
// head.print();
```

### 2.3 [移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

题目：

- 方法一
  - 加一个虚拟头节点，删除操作都相同了
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var removeElements = function (head, val) {
  const dummy = new ListNode(0)
  dummy.next = head
  let cur = dummy
  while (cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return dummy.next
}
```

### 2.4 [设计链表](https://leetcode-cn.com/problems/design-linked-list/)

题目：

- 方法一
  - 注意细节

```javascript
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

var MyLinkedList = function () {
  this.size = 0
  this.head = null
  this.tail = null
}

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index >= this.size) return -1
  let cur = this.head
  while (index--) {
    cur = cur.next
  }
  return cur.val
}

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const node = new ListNode(val, this.head)
  this.size++
  this.head = node
  if (!this.tail) {
    this.tail = node
  }
}

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const node = new ListNode(val, null)
  this.size++
  if (!this.tail) {
    this.head = node
    this.tail = node
  } else {
    this.tail.next = node
    this.tail = node
  }
}

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index > this.size) return
  if (index <= 0) {
    this.addAtHead(val)
    return
  } else if (index === this.size) {
    this.addAtTail(val)
    return
  } else {
    const dummy = new ListNode(0, this.head)
    let cur = dummy
    while (index--) {
      cur = cur.next
    }
    cur.next = new ListNode(val, cur.next)
    this.size++
  }
}

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) return
  if (index === 0) {
    this.head = this.head.next
    if ((index = this.size - 1)) {
      this.tail = this.head
    }
    this.size--
    return
  }
  const dummy = new ListNode(0, this.head)
  let cur = dummy
  const tmp = index
  while (index--) {
    cur = cur.next
  }
  cur.next = cur.next.next
  if (tmp === this.size - 1) {
    this.tail = cur
  }
  this.size--
  // this.print()
}

// MyLinkedList.prototype.print = function () {
//     let cur = this.head;
//     const res = [];
//     while (cur) {
//         res.push(cur.val);
//         cur = cur.next;
//     }
//     console.log(res);
//     console.log(this.head, this.tail)
// }

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```

### 2.5 [反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

题目：

- 方法一
  - pre 保存 cur 前，tmp 保存 cur 后
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var reverseList = function (head) {
  let cur = head
  let pre = null
  let tmp
  while (cur) {
    tmp = cur.next
    cur.next = pre
    pre = cur
    cur = tmp
  }
  return pre
}
```

- 方法二
  - 递归
  - 时间复杂度：O(n)
  - 空间复杂度：O(n)

```javascript
var reverseList = function (head) {
  if (head === null || head.next === null) return head
  let new_head = reverseList(head.next)
  head.next.next = head
  head.next = null
  return new_head
}
```

### 2.6 [两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

题目：

- 方法一
  - 画图
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var swapPairs = function (head) {
  const dummy = new ListNode(0, head)
  let cur = dummy
  while (cur.next && cur.next.next) {
    const p1 = cur.next
    const p2 = cur.next.next
    p1.next = p2.next
    p2.next = p1
    cur.next = p2
    cur = p1
  }
  return dummy.next
}
```

### 2.7 [删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

题目：

- 方法一
  - 双指针的经典应用，如果要删除倒数第 n 个节点，让 fast 移动 n 步，然后让 fast 和 slow 同时移动，直到 fast 指向链表末尾。删掉 slow 所指向的节点就可以了。
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head)
  let fast = dummy,
    slow = dummy
  while (n-- && fast) {
    fast = fast.next
  }
  fast = fast.next // fast再提前走一步，因为需要让slow指向删除节点的上一个节点
  while (fast) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return dummy.next
}
```

### 2.8 [链表相交](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

题目：

- 方法一
  - 双指针
  - 时间复杂度：O(n)
  - 空间复杂度：O(1)

```javascript
var getIntersectionNode = function (headA, headB) {
  const getLen = head => {
    let cur = head
    let len = 0
    while (cur) {
      len++
      cur = cur.next
    }
    return len
  }
  let lenA = getLen(headA)
  let lenB = getLen(headB)
  let curA = headA,
    curB = headB
  if (lenA < lenB) {
    ;[curA, curB] = [curB, curA]
    ;[lenA, lenB] = [lenB, lenA]
  }
  let n = lenA - lenB
  while (n-- && curA) {
    curA = curA.next
  }
  while (curA && curB && curA !== curB) {
    curA = curA.next
    curB = curB.next
  }
  return curA
}
```

### 2.9 [环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

题目：

- 方法一

  - 判断链表是否环：快慢指针

    找这个环的入口：2(x+y)=x+y+n(z+y) x=z+(n-1)(y+z)

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var detectCycle = function (head) {
  let fast = head,
    slow = head
  let flag = false
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      flag = true
      break
    }
  }
  if (!flag) return null
  slow = head
  while (slow != fast) {
    slow = slow.next
    fast = fast.next
  }
  return slow
}
```

### 2.10 [合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

题目：

- 方法一

  - 模拟

  - 时间复杂度：O(n)

  - 空间复杂度：O(1)

```javascript
var mergeTwoLists = function (l1, l2) {
  const dummy = new ListNode(0)
  let cur = dummy
  while (l1 && l2) {
    if (l1.val > l2.val) {
      ;[l1, l2] = [l2, l1]
    }
    cur.next = l1
    l1 = l1.next
    cur = cur.next
  }
  if (l1) cur.next = l1
  if (l2) cur.next = l2
  return dummy.next
}
```

### 2.11 [LRU 缓存](https://leetcode-cn.com/problems/lru-cache/)

题目：

- 实现 LRUCache 类：

  - LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存

    - int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。

    - void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。

    - 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

- 方法一
  - map+库函数
  - 时间复杂度：O(1)
  - 空间复杂度：O(n)

```js
var LRUCache = function (capacity) {
  this.cap = capacity
  this.keyToVal = new Map()
}

LRUCache.prototype.get = function (key) {
  if (!this.keyToVal.has(key)) return -1
  const val = this.keyToVal.get(key)
  this.keyToVal.delete(key)
  this.keyToVal.set(key, val)
  return val
}

LRUCache.prototype.put = function (key, val) {
  if (this.cap <= 0) return
  // key 已存在
  if (this.keyToVal.has(key)) {
    this.keyToVal.delete(key)
  }
  // 添加 key
  this.keyToVal.set(key, val)
  if (this.keyToVal.size > this.cap) {
    this.keyToVal.delete(this.keyToVal.keys().next().value)
  }
}
```

- 方法二
  - 双向链表+哈希表
    - 双向链表的结点：存 key 和 对应的数据值。靠近头部的键值对是最近使用的，而靠近尾部的键值对是最久未使用的。
    - 哈希表的存在意义：快速访问【存储于双向链表】的数据
      - key：双向链表中存的 key
      - value：链表结点的引用。
  - 时间复杂度：O(1)
  - 空间复杂度：O(n)

```js
class ListNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.pre = null
  }
}
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cnt = 0
    this.keyToNode = {}
    this.dummyHead = new ListNode()
    this.dummyTail = new ListNode()
    this.dummyHead.next = this.dummyTail
    this.dummyTail.pre = this.dummyHead
  }
  get(key) {
    let node = this.keyToNode[key]
    if (node) {
      this.moveToHead(node)
      return node.value
    } else {
      return -1
    }
  }
  moveToHead(node) {
    this.deleteNode(node)
    this.addNodeAtHead(node)
  }
  deleteNode(node) {
    let tmppre = node.pre
    let tmpnext = node.next
    tmppre.next = tmpnext
    tmpnext.pre = tmppre
  }
  addNodeAtHead(node) {
    node.next = this.dummyHead.next
    node.next.pre = node
    this.dummyHead.next = node
    node.pre = this.dummyHead
  }
  put(key, value) {
    let node = this.keyToNode[key]
    if (node) {
      node.value = value
      this.moveToHead(node)
    } else {
      if (this.cnt === this.capacity) {
        let deleteNode = this.dummyTail.pre
        this.deleteNode(deleteNode)
        delete this.keyToNode[deleteNode.key]
        this.cnt--
      }
      let newNode = new ListNode(key, value)
      this.addNodeAtHead(newNode)
      this.keyToNode[key] = newNode
      this.cnt++
    }
  }
}
```

#### [LFU 缓存](https://leetcode.cn/problems/lfu-cache/)

```js
var LFUCache = function (capacity) {
  this.cap = capacity
  this.keyToVal = new Map()
  this.keyToFreq = new Map()
  this.freqToKeys = new Map()
  this.minFreq = 0
}

LFUCache.prototype.get = function (key) {
  if (!this.keyToVal.has(key)) return -1
  this.increaseKeyFreq(key) // 增加频率
  return this.keyToVal.get(key)
}

LFUCache.prototype.increaseKeyFreq = function (key) {
  let freq = this.keyToFreq.get(key)
  // 修改 keyToFreq
  this.keyToFreq.set(key, freq + 1)
  // 修改 freqToKeys
  this.freqToKeys.get(freq).delete(key)
  if (this.freqToKeys.get(freq).size === 0) {
    this.freqToKeys.delete(freq)
    if (this.minFreq === freq) {
      this.minFreq++
    }
  }
  if (!this.freqToKeys.has(freq + 1)) {
    this.freqToKeys.set(freq + 1, new Set())
  }
  this.freqToKeys.get(freq + 1).add(key)
}

LFUCache.prototype.put = function (key, val) {
  if (this.cap <= 0) return
  // key 已存在
  if (this.keyToVal.has(key)) {
    this.keyToVal.set(key, val)
    this.increaseKeyFreq(key)
    return
  }
  // key 不存在
  // 容量已满，移除 频率最小且最久未使用 的key
  if (this.keyToVal.size === this.cap) {
    this.removeMinFreqKey()
  }
  // 添加 key
  this.keyToVal.set(key, val)
  this.keyToFreq.set(key, 1)
  if (!this.freqToKeys.has(1)) {
    this.freqToKeys.set(1, new Set())
  }
  this.freqToKeys.get(1).add(key)
  this.minFreq = 1
}

LFUCache.prototype.removeMinFreqKey = function () {
  const keyList = this.freqToKeys.get(this.minFreq)
  // 获取要删除的 key
  const key = keyList.values().next().value
  this.keyToVal.delete(key)
  this.keyToFreq.delete(key)
  keyList.delete(key)
  if (keyList.size === 0) {
    this.freqToKeys.delete(this.minFreq)
  }
}
```

### 2.12 [K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

题目：

- 方法一
  - 非递归，反转单链表函数，传入 head 和 tail

```js
var reverseKGroup = function (head, k) {
  let cur = head
  let cnt = 0
  while (cur && cnt < k) {
    cur = cur.next
    cnt++
  }
  if (cnt < k) return head
  const new_head = reverseList(head, cur)
  head.next = reverseKGroup(cur, k)
  return new_head
}

var reverseList = function (head, tail) {
  let cur = head,
    pre = null
  while (cur != tail) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
```

- 方法二
  - 递归，反转单链表函数，传入 head 和 k

```js
var reverseKGroup = function (head, k) {
  let cur = head
  let cnt = 0
  while (cur && cnt < k) {
    cur = cur.next
    cnt++
  }
  if (cnt < k) return head
  const new_head = reverseList(head, k)
  head.next = reverseKGroup(cur, k)
  return new_head
}

var reverseList = function (head, k) {
  if (k === 1) return head
  const new_head = reverseList(head.next, k - 1)
  head.next.next = head
  head.next = null
  return new_head
}
```

### 2.13 [反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

```js
var reverseBetween = function (head, left, right) {
  const dummy = new ListNode(0, head)
  let pre = dummy
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next
  }
  let p = pre,
    q = pre.next
  pre = pre.next
  let cur = pre.next
  for (let i = 0; i < right - left; i++) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  p.next = pre
  q.next = cur
  return dummy.next
}
```

### 2.14 [合并 K 个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

```js
var mergeKLists = function (lists) {
  const n = lists.length
  if (n === 0) return null
  const dummy = new ListNode(0, lists[0])
  for (let i = 1; i < n; i++) {
    let l1 = dummy.next
    let l2 = lists[i]
    let cur = dummy
    while (l1 && l2) {
      if (l1.val > l2.val) {
        ;[l1, l2] = [l2, l1]
      }
      cur.next = l1
      l1 = l1.next
      cur = cur.next
    }
    if (l1) cur.next = l1
    if (l2) cur.next = l2
  }
  return dummy.next
}
```

### 2.15 [重排链表](https://leetcode-cn.com/problems/reorder-list/)

- 方法一
  - 把每个节点拆开放进数组里，分奇偶取。

```js
var reorderList = function (head) {
  const arr = []
  let cur = head
  while (cur) {
    const next = cur.next
    cur.next = null
    arr.push(cur)
    cur = next
  }
  cur = arr.shift()
  let i = 1
  while (arr.length) {
    if (i % 2 === 0) {
      cur.next = arr.shift()
    } else {
      cur.next = arr.pop()
    }
    i++
    cur = cur.next
  }
}
```

- 方法二
  - 利用快慢指针找到中间节点，分两段
  - 后一段反转链表
  - 两段归并

```js
var reorderList = function (head) {
  // 找到中间节点，分成两段
  let slow = head,
    fast = head.next
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  let mid = slow.next
  slow.next = null
  const reverse = head => {
    let pre = null,
      cur = head
    while (cur) {
      const next = cur.next
      cur.next = pre
      pre = cur
      cur = next
    }
    return pre
  }
  // 后一段反转链表
  let rl = reverse(mid)
  // 合并
  let l1 = head,
    l2 = rl
  while (l1 && l2) {
    let next = l1.next
    l1.next = l2
    l2 = l2.next
    l1.next.next = next
    l1 = next
  }
  return head
}
```

### 2.16 [链表中倒数第 k 个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

```js
var getKthFromEnd = function (head, k) {
  let fast = head,
    slow = head
  while (k--) {
    fast = fast.next
  }
  while (fast) {
    fast = fast.next
    slow = slow.next
  }
  return slow
}
```

### 2.17 [删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

```js
var deleteDuplicates = function (head) {
  const dummy = new ListNode(0, head)
  let pre = dummy,
    cur = head
  while (cur) {
    if (cur.next && cur.val === cur.next.val) {
      while (cur.next && cur.val === cur.next.val) {
        cur = cur.next
      }
      pre.next = cur.next
      cur = cur.next
    } else {
      pre = cur
      cur = cur.next
    }
  }
  return dummy.next
}
```

### 2.18 [排序链表](https://leetcode-cn.com/problems/sort-list/)

- 方法一

  - 归并
  - 将链表分成两个子链表

  - 对两个子链表排序后再将它们合并成一个排序的链表

```js
var sortList = function (head) {
  if (!head || !head.next) return head
  let fast = head,
    slow = head
  fast = fast.next
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  let preslow = slow
  slow = slow.next
  preslow.next = null
  let l1 = sortList(head)
  let l2 = sortList(slow)
  const merge = (l1, l2) => {
    const dummy = new ListNode(0, l1)
    let cur = dummy
    while (l1 && l2) {
      if (l1.val > l2.val) {
        ;[l1, l2] = [l2, l1]
      }
      cur.next = l1
      l1 = l1.next
      cur = cur.next
    }
    if (l1) cur.next = l1
    if (l2) cur.next = l2
    return dummy.next
  }
  return merge(l1, l2)
}
```

- 方法二
  - 快排（指针交换）
  - 分隔链表

```js
var sortList = function (head) {
  if (!head || !head.next) return head
  const pivot = head.val
  const dummy1 = new ListNode(-1)
  const dummy2 = new ListNode(-1)
  let cur1 = dummy1,
    cur2 = dummy2,
    cur = head.next
  while (cur) {
    if (cur.val < pivot) {
      cur1.next = cur
      cur1 = cur1.next
    } else {
      cur2.next = cur
      cur2 = cur2.next
    }
    cur = cur.next
  }
  cur1.next = head
  head.next = null
  cur2.next = null
  const newhead = sortList(dummy1.next)
  head.next = sortList(dummy2.next)
  return newhead
}
```

- 方法三
  - 快排（值交换）

```js
var sortList = function (head) {
  quickSort(head, null)
  return head
}
var quickSort = function (head, tail) {
  if (head === tail || head.next === tail) return
  const pivot = head.val
  let cur = head.next,
    p = head
  while (cur != tail) {
    if (cur.val < pivot) {
      p = p.next
      ;[p.val, cur.val] = [cur.val, p.val]
    }
    cur = cur.next
  }
  ;[head.val, p.val] = [p.val, head.val]
  quickSort(head, p)
  quickSort(p.next, tail)
}
```

### 2.19 [两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

- 思路和字符串相加求和一毛一样

```js
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0, null)
  let cur = dummy
  let add = 0
  while (l1 || l2 || add) {
    const x = l1 ? l1.val : 0
    const y = l2 ? l2.val : 0
    const sum = x + y + add
    const node = new ListNode(sum % 10, null)
    cur.next = node
    cur = cur.next
    add = Math.floor(sum / 10)
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  return dummy.next
}
```

### 2.20 [回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

- 快慢指针找到中间，分成两段
- 后一段反转
- 比较

```js
var isPalindrome = function (head) {
  if (!head.next) return true
  let slow = head,
    fast = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  const reverse = head => {
    let cur = head,
      pre = null
    while (cur) {
      const next = cur.next
      cur.next = pre
      pre = cur
      cur = next
    }
    return pre
  }
  let head1 = reverse(slow)
  while (head1) {
    if (head.val !== head1.val) return false
    head = head.next
    head1 = head1.next
  }
  return true
}
```

### 2.21 [删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

```js
var deleteDuplicates = function (head) {
  const dummy = new ListNode(0, head)
  let pre = dummy,
    cur = head
  while (cur) {
    if (cur.next && cur.val === cur.next.val) {
      while (cur.next && cur.val === cur.next.val) {
        cur = cur.next
      }
      pre.next = cur
    }
    pre = cur
    cur = cur.next
  }
  return dummy.next
}
```

### 2.22 [奇偶链表](https://leetcode.cn/problems/odd-even-linked-list/)

```js
var oddEvenList = function (head) {
  if (!head) return head
  let odd = head,
    even = odd.next
  let evenHead = even
  while (even && even.next) {
    odd.next = even.next
    odd = odd.next
    even.next = odd.next
    even = even.next
  }
  odd.next = evenHead
  return head
}
```
