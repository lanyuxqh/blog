---
title: 数组
date: 2021-12-24
tags:
  - javascript
categories:
  - javascript
---

# 数组

## 1、数组类型判断

```js
var arr = [1, 2]
arr instanceof Array // 如果实例的原型链发生变化，则无法做出正确判断。
arr.constructor === Array // 如果 arr 的 constructor 被修改，则无法做出正确判断。
Object.getPrototypeOf(arr) === Array.prototype // 如果实例的原型链发生变化，则无法做出正确判断。
Array.prototype.isPrototypeOf(arr) // 如果实例的原型链发生变化，则无法做出正确判断。
Object.prototype.toString.call(arr) === '[object Array]'
Array.isArray(arr)
```

**数组为空**：

```js
if (matrix == null || matrix.length == 0) return true
```

## 2、数组的方法

|     方法      | 描述                                                                                                                                                                                      |
| :-----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    join()     | 把数组转换成字符串。默认是逗号，                                                                                                                                                          |
|    push()     | 把里面的内容添加到数组末尾，并**返回修改后的长度\*\***。（会改变原数组）\*\*                                                                                                              |
|     pop()     | 移除数组最后一项，返回移除的那个值**。（会改变原数组）**                                                                                                                                  |
|    shift()    | 删除原数组第一项，并返回删除元素的值；如果数组为空则返回 undefined **。（会改变原数组）**                                                                                                 |
|   unshift()   | 将参数添加到原数组开头，并返回数组的长度 **。（会改变原数组）**                                                                                                                           |
|    sort()     | 函数参数如果不设置的话，会以默认方式（字母顺序 / unicode 字符编码的顺序）进行排序**。（会改变原数组）**                                                                                   |
|   reverse()   | 反转数组项的顺序**。（会改变原数组）**                                                                                                                                                    |
|   concat()    | 将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本 |
|    slice()    | 返回从原数组中指定开始下标到结束下标之间的项组成的新数组。参数：arrayObj ，start，end 可选项。                                                                                            |
|   splice()    | 删除、插入和替换。3 个参数：起始位置， 要删除的项数（0 就是不删除），插入的项。；返回删掉的数据**（会改变原数组）**                                                                       |
|   reduce()    | （ES5 新增）对一个数组进行遍历，然后返回一个累计                                                                                                                                          |
|   indexOf()   | （ES5 新增）接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。从数组的开头 0 开始向后查找。                                                                                     |
| lastIndexOf() | （ES5 新增）接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。从数组的末尾开始向前查找。                                                                                        |
|   forEach()   | （ES5 新增）对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是 function 类型，默认有传参，参数分别为：遍历的数组内容；对应的数组索引，数组本身。              |
|     map()     | （ES5 新增）指“映射”，对数组中的每一项运行给定函数，返回每次函数调用的结果组成的**数组**。                                                                                                |
|   filter()    | （ES5 新增）“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。                                                                                                          |
|    every()    | （ES5 新增）判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回 true。                                                                                                         |
|    some()     | （ES5 新增）判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回 true。                                                                                                           |
|    flat()     | （ES6 新增）用于将嵌套的数组“拉平”，变成一维数组，参数是拉多少层；如果有空位 flat()会跳过                                                                                                 |
|   flatMap()   | （ES6 新增）执行 Array.prototype.map()，然后执行 flat()方法。flatMap()只能展开一层数组                                                                                                    |
| copyWithin()  | （ES6 新增）在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组**。（会改变原数组）**                                                                      |
|    fill()     | （ES6 新增）将一个固定值替换数组的元素**。（会改变原数组）**                                                                                                                              |

**splice()**： 3 个参数：起始位置， 要删除的项数（0 就是不删除），插入的项。；返回删掉的数据

```js
a = [1, 2, 3, 4, 5, 6, 7]
console.log(a.splice(2, 4)) // [3,4,5,6] 删除操作
console.log(a) // [1,2,7]
console.log(a.splice(1, 1, [8, 9])) // [2]		 替换操作
console.log(a) // [1,[8, 9],7]
console.log(a.splice(1, 0, 3)) // []		 添加操作
console.log(a) // [1,3,[8, 9],7]
```

**（1）姓名排序**

**localeCompare()**：把当前的汉字转化为拼音，再根据首字母进行排序。（拼音 > unicode）

方法 2：重新写一个数组用来存“赵钱孙李”，然后判断姓名的第一个字在那个里面的顺序

```js
;['李晓明', '王晓璐', '张一丹', '白小马', '阿凡提'].sort(function (a, b) {
  return a.localeCompare(b)
}) // 姓名排序
```

**（2）按对象中某属性排序**

```js
var arr = [
  { name: 'zopp', age: 0 },
  { name: 'gpp', age: 18 },
  { name: 'yjj', age: 8 }
]
function compare(property) {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}
console.log(arr.sort(compare('age')))
```

## 3、深浅拷贝

**赋值**：JS 中的数组是引用类型，不能直接赋值，赋得的是引用（栈中的地址）。

**浅拷贝**：不可以拷贝对象里的子对象。

**深拷贝**：可以拷贝对象里的子对象。

![](https://i.loli.net/2020/07/02/limKsPASbnCBMg8.png#alt=image-20200619162012701)

### 3.1 浅拷贝

数组：

- `Array.prototype.concat()`
- `Array.prototype.slice()`

对象：

- 展开运算符`...`
- `Object.assign()`：把任意多个的源对象自身的**可枚举属性**拷贝给目标对象，然后返回目标对象。
- 库函数`lodash.clone()`

```js
let obj1 = {
  name: 'lanyu',
  age: 18,
  flag: true,
  n: undefined,
  m: null,
  k: Symbol(1),
  child: {
    a: 'a',
    b: 'b'
  },
  arr: [1, 2, 3, 4],
  reg: /^\d+$/,
  fun: function () {
    console.log(this.name)
  },
  time: new Date()
}

// let obj2 = {...obj1};

// let obj2 = Object.assign({},obj1);

// var lodash = require('lodash');
// let obj2 = lodash.clone(obj1)

function shallClone(obj) {
  if (typeof obj !== 'object') return obj
  const newobj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newobj[key] = obj[key]
    }
  }
  return newobj
}

// 主要是用到了Object对象的一些方法
function shallClone(obj) {
  const newobj = {}
  const propNames = Object.getOwnPropertyNames(obj)
  for (const prop of propNames) {
    const des = Object.getOwnPropertyDescriptor(obj, prop)
    Object.defineProperty(newobj, prop, des)
  }
  return newobj
}

function shallClone(obj) {
  const newobj = new Proxy(obj, {})
  return newobj
}

obj1.name = 'xqh'
obj1.child.a = 'c'
console.log(obj1)
console.log(obj2)
```

### 3.2 深拷贝

- `JSON.stringify`和`JSON.parse`
- for 循环拷贝，为避免循环引用可以使用 hashMap
- `lodash.cloneDeep`
- `jQuery.extend()`

**1）`JSON.stringify`和`JSON.parse`实现深拷贝**

JSON.stringify 把对象转成字符串，再用 JSON.parse 把字符串转成新的对象

```js
let newList = JSON.parse(JSON.stringify(obj1))
```

**局限性**：

- 对于属性值类型是`undefined`、 `symbol`、`function`的，会丢失对应属性
- 对于属性值类型是`error`、`regexp`的，属性值变为空对象
- 对于属性值类型是`date`的，属性值变为字符串
- bigint 值无法转换
- 不能解决循环引用的对象

**2）for 循环拷贝**

- **递归实现**

**原理**：递归遍历对象、数组**直到里边都是基本数据类型**，然后再去复制

```javascript
// 简单版本
function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  const newobj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key]
      if (typeof val === 'object' && val !== null) {
        newobj[key] = deepClone(val)
      } else {
        newobj[key] = val
      }
    }
  }
  return newobj
}
```

**缺点**：存在循环引用：`obj.value = obj`。

**改进**：用**Map**设置一个哈希表存储已经拷贝过的对象，当检测到当前对象已存在于哈希表时，取出该值返回。

```javascript
// 利用Map存储oldobj->newobj，检测当前对象是否已拷贝，若已拷贝，则直接取出
// 如果利用weakMap的话，可以利用垃圾回收机制回收内存
function deepClone(obj, map = new Map()) {
  if (typeof obj !== 'object') return obj
  if ([Date, RegExp].includes(obj.constructor)) {
    return new obj.constructor(obj)
  }
  if (map.has(obj)) return map.get(obj)
  const newobj = Array.isArray(obj) ? [] : {}
  map.set(obj, newobj)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key]
      if (typeof val === 'object' && val !== null) {
        newobj[key] = deepClone(val, map)
      } else {
        newobj[key] = val
      }
    }
  }
  return newobj
}
function deepClone(target, map = new Map()) {
  if (map.get(target)) return map.get(target)
  let constructor = target.constructor
  // 检测当前对象target是否与 正则、日期格式对象匹配
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    return new constructor(target) // 创建一个新的特殊对象(正则类/日期类)的实例
  }
  if (isObject(target)) {
    const cloneTarget = Array.isArray(target) ? [] : {}
    map.set(target, cloneTarget)
    for (let prop in target) {
      if (target.hasOwnProperty) {
        cloneTarget[prop] = deepClone(target[prop], map)
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

function isObject(target) {
  return (typeof target === 'object' || typeof target === 'function') && target == null
}
```

- **3）库函数 lodash.cloneDeep**

该函数库也有提供\_.cloneDeep 用来做 Deep Copy

```javascript
var _ = require('lodash')
var obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3]
}
var obj2 = _.cloneDeep(obj1)
console.log(obj1.b.f === obj2.b.f) // false
```

**4）jQuery.extend()方法**

```js
var $ = require('jquery')
var obj2 = $.extend(true, {}, obj1) // 第一个参数为true,就是深拷贝
```

## 4、类数组

属性要为索引（数字）属性；必须有 length 属性。比如函数中的 arguments，{0:'red',1:'pink',length:2}

**类数组与数组区别**：

- 类数组是对象，数组是 Array
- 类数组不具备数组的方法(splice，split，push..)

![image-20200802203923222](\imgs\image-20200802203923222.png)
![image-20200802204028318](\imgs\image-20200802204028318.png)

**类数组转化为数组**：

```js
Array.prototype.slice.call(arguments)
[].slice.call(arguments)
[].concat.apply([],arguments)
Array.from(arguments) // es6
[...arguments]	      // es6

var toArray = function(s){
   try {
       return Array.prototype.slice.call(s);
   } catch(e){
       var arr = [];
       for(var i = 0,len = s.length; i < len; i++){
          //arr.push(s[i]);
          arr[i] = s[i];     //据说这样比push快
       }
       return arr;
    }
}
```

## 5、数组合并

- **concat()**
- **Array.prototype.push.apply()**
- **for 循环**

```js
var c = a.concat(b) // c = [1,2,3,4,5,6];
Array.prototype.push.apply(a, [4, 5, 6]) // a = [1,2,3,4,5,6];
```

## 6、数组遍历

- **for 循环**
- **forEach**：`arr.forEach((item, index) =>{})`
- **map 函数**：遍历数组每个元素，并回调操作，需要返回值，返回值组成新的数组，原数组不变
- **filter 函数**：过滤通过条件的元素组成一个新数组， 原数组不变
- **some 函数**：遍历数组中是否有符合条件的元素，返回 Boolean 值
- **every 函数**：遍历数组中是否每个元素都符合条件， 返回 Boolean 值
- **in**： 不仅可以用来 遍历对象，还可以用来遍历数组， 不过 i 对应与数组的 key 值

## 7、算法

### 7.1 数组去重

- Set 转为数组：Array.from、扩展运算符
- 删除：双重循环+splice
- 添加：遍历+indexOf/includes、排序+遍历
- 保存值的字符串：filter+{}.hasOwnProperty、遍历+Map.has
- ES6：filter+indexOf、reduce+includes

```javascript
// 方法一：Set   {}没有去重
function arrayUnique1(arr) {
  return Array.from(new Set(arr))
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

### 7.2 数组扁平化

- arr.flat(Infinity)
- 递归
- 栈
- some+apply/解构
- reduce
- 字符串：toString()，JSON.stringify+正则

```js
// 1. 递归
const flatten = arr => {
  const res = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      res.push(...flatten(item))
    } else {
      res.push(item)
    }
  }
  return res
}

// 2. 栈
const flatten = arr => {
  const res = []
  const stack = [...arr]
  while (stack.length) {
    const item = stack.pop()
    if (Array.isArray(item)) {
      stack.push(...item)
    } else {
      res.unshift(item)
    }
  }
  return res
}

// 3. some + apply
const flatten = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat.apply([], arr)
  }
  return arr
}

// 4. 解构运算符
const flatten = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// 5. reduce
const flatten = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}

// 6. toString()
const flatten = arr => {
  return arr
    .toString()
    .split(',')
    .map(item => +item)
}

// 7. JSON.stringify + 正则
const flatten = arr => {
  return JSON.stringify(arr)
    .replace(/(\[|\])/g, '')
    .split(',')
    .map(item => +item)
}
```

### 7.3 数组乱序

- sort+random 取正负数
- random 取下标+splice
- 洗牌：random 取下标+交换

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

### 7.4 url 解析成对象

```js
const parseQueryString = function (url) {
  var obj = {}
  var arr = url.substr(url.indexOf('?') + 1).split('&')
  arr.forEach(item => {
    let tmp = item.split('=')
    obj[tmp[0]] = tmp[1]
  })
  return obj
}
```

### 7.5 数组方法实现

- forEach

```js
Array.prototype.myForEach = function (fn, thisArgs) {
  const arr = this
  for (let i = 0; i < arr.length; i++) {
    fn.call(thisArgs, arr[i], i, arr)
  }
}
```

- map

```js
Array.prototype.myMap = function (fn, thisArgs) {
  const arr = this
  const res = []
  for (let i = 0; i < arr.length; i++) {
    res.push(fn.call(thisArgs, arr[i], i, arr))
  }
  return res
}
```

- filter

```js
Array.prototype.myFilter = function (fn, thisArgs) {
  const arr = this
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(thisArgs, arr[i], i, arr)) {
      res.push(arr[i])
    }
  }
  return res
}
```

- some

```js
Array.prototype.mySome = function (fn, thisArgs) {
  const arr = this
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(thisArgs, arr[i], i, arr)) return true
  }
  return false
}
```

- every

```js
Array.prototype.myEvery = function (fn, thisArgs) {
  const arr = this
  for (let i = 0; i < arr.length; i++) {
    if (!fn.call(thisArgs, arr[i], i, arr)) return false
  }
  return true
}
```

- find

```js
Array.prototype.myFind = function (fn, thisArgs) {
  const arr = this
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(thisArgs, arr[i], i, arr)) return arr[i]
  }
  return undefined
}
```

- findIndex

```js
Array.prototype.myFindIndex = function (fn, thisArgs) {
  const arr = this
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(thisArgs, arr[i], i, arr)) return i
  }
  return undefined
}
```

- reduce

```js
Array.prototype.myReduce = function (fn, initialValue) {
  const arr = this
  let res, index
  if (initialValue === undefined) {
    res = arr[0]
    index = 1
  } else {
    res = initialValue
    index = 0
  }
  for (let i = index; i < arr.length; i++) {
    res = fn(res, arr[i], i, arr)
  }
  return res
}
const res = arr.myReduce((pre, cur) => pre + cur, 1)
console.log(res)
```

- 利用 reduce 实现 map

```js
Array.prototype.mapReduce = function (fn, thisArgs) {
  const arr = this
  return arr.reduce((pre, cur, index, arr) => {
    return [...pre, fn.call(thisArgs, cur, index, arr)]
  }, [])
}
```

- 利用 reduce 实现 filter

```js
Array.prototype.filterReduce = function (fn, thisArgs) {
  const arr = this
  return arr.reduce((pre, cur, index, arr) => {
    return fn.call(thisArgs, cur, index, arr) ? [...pre, cur] : pre
  }, [])
}
```

### 7.6 数组相同判断

```js
JSON.stringify([1, 2, 3].sort()) === JSON.stringify([3, 2, 1].sort()) //true
```

## 8、数组和链表的区别

| 数组                                                                         | 链表                                                     |
| ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| 连续的地址空间                                                               | 不一定是连续的                                           |
| 内存管理会将连续的存储空间提前读入缓存，数组会被读入到缓存，随机访问效率很高 | 不能随机查找，必须从第一个开始遍历，查找效率低（改查慢） |
| 插入和删除效率低                                                             | 插入删除速度快（增删快）                                 |
| 数组大小固定，不能动态拓展                                                   | 大小没有固定，可以动态拓展                               |
| 内存空间要求高，必须有足够的连续内存空间                                     | 内存利用率高，不会浪费内存                               |
