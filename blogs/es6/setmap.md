---
title: Set和Map
date: 2022-7-8
tags:
  - es6
  - javascript
categories:
  - es6
---

# Set 和 Map

## 1、Set

`Set`类似于数组，但成员值是唯一的。内部判断两个值相等使用的是`same-value equality`算法。

- “5”和 5 是不同的，判断标准类似“===”，但 Set 内部认为 NaN 是等于自身的，而精确相等运算法相反。
- 两个对象总是不相等的

`new Set()`：接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数。

**实例的属性和方法**：

- 属性
  - `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
  - `Set.prototype.size`：返回`Set`实例的成员总数。
- 方法
  - `Set.prototype.add(value)`：添加某个值，返回`Set` 结构本身。
  - `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
  - `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
  - `Set.prototype.clear()`：清除所有成员，没有返回值。
- 遍历操作
  - `Set.prototype.keys()`：返回键名的遍历器（由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。）
  - `Set.prototype.values()`：返回键值的遍历器
  - `Set.prototype.entries()`：返回键值对的遍历器
  - `Set.prototype.forEach()`：使用回调函数遍历每个成员

## 2、WeakSet

**特点（与 Set 区别）**：

- `WeakSet` 的成员只能是对象，而不能是其他类型的值。
- `WeakSet` 中的对象都是弱引用，即垃圾回收机制不考虑 `WeakSet` 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 `WeakSet` 之中。
- `WeakSet` 不能遍历，因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。没有`size`属性。

`new WeakSet()`：接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数。

**实例的方法**：

- `WeakMap`只有三个方法可用：`add()`、`has()`、`delete()`

**应用**：

- 用于存储 DOM 节点，不用担心这些节点从文档移除时会引发内存泄漏。

## 3、Map

`Object` 结构提供了“字符串—值”的对应，`Map` 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

- 只有对同一个对象的引用，Map 结构才将其视为同一个键。
- 如果 Map 的键是一个简单数据类型（Number、String、Boolean）的值，则只要 2 个值严格相等就被视为 1 个键。比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，`undefined`和`null`也是两个不同的键。虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。

`new Map()`：任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作`Map`构造函数的参数。

**实例的属性和方法**：

- 属性
  - `Map.prototype.constructor`：构造函数，默认就是`Map`函数。
  - `Map.prototype.size`：返回`Map`实例的成员总数。
- 方法
  - `Map.prototype.set(key, value)`：设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。
  - `Map.prototype.get(key)`：读取`key`对应的键值，如果找不到`key`，返回`undefined`。
  - `Map.prototype.has(key)`：返回一个布尔值，表示某个键是否在当前 Map 对象之中。
  - `Map.prototype.delete(key)`：删除某个键，返回`true`。如果删除失败，返回`false`。
  - `Map.prototype.clear()`：清除所有成员，没有返回值。
- 遍历操作
  - `Map.prototype.keys()`：返回键名的遍历器。
  - `Map.prototype.values()`：返回键值的遍历器。
  - `Map.prototype.entries()`：返回所有成员的遍历器。
  - `Map.prototype.forEach()`：遍历 Map 的所有成员。

**与其它数据结构的互相转换**：

- Map 转为 数组：[...map]
- 数组 转为 Map：new Map([])
- Map 转为 对象：自定义`strMapToObj`函数。如果所有 Map 的键都是字符串，它可以无损地转为对象；如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
- 对象 转为 Map：自定义`objToStrMap`函数。
- Map 转为 JSON：Map 的键名都是字符串，这时可以选择转为对象，JSON.stringify(strMapToObj(map))；Map 的键名有非字符串，这时可以选择转为数组，JSON.stringify([...map])。
- JSON 转为 Map：Map 转为 JSON 逆向操作，objToStrMap(JSON.parse(json))，new Map(JSON.parse(json))

## 4、WeakMap

**特点（与 Map 区别）**：

- `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。
- `WeakMap`的**键名**所指向的对象（弱引用），不计入垃圾回收机制。
- `WeakMap`不能遍历，无法清空故其只有 get，set，has，delete 操作，无 size 属性。

**实例的方法**：

- `WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

**应用**：

- DOM 节点作为键名，有助于防止内存泄漏。注册监听事件的 listener 对象很适合用 WeakMap 来实现，Dom 消失时对应监听函数也自动消失。

  ```js
  // let button = document.getElementById("button");
  // let count = 0;
  // let buttonClick = function () {
  //     count++;
  //     console.log(count);
  // };
  // button.addEventListener("click", buttonClick, false);
  // button = null;
  // button.removeEventListener("click", buttonClick, false);
  // count = null;

  let button = document.getElementById('button')
  let wm = new WeakMap()
  wm.set(button, {
    count: 0,
    buttonClick: function () {
      wm.get(button) && wm.get(button).count++
      wm.get(button) && console.log(wm.get(button).count)
    }
  })
  button.addEventListener('click', wm.get(button).buttonClick, false)
  button = null
  ```

- 部署私有属性。

  ```js
  // class Stack {
  //   constructor() {
  //     this.arr = [];
  //   }
  //   push(x) {
  //     this.arr.push(x);
  //   }
  // }
  // const stack = new Stack();
  // stack.push(1);
  // stack.push(2);
  // console.log(stack);  // Stack { arr: [ 1, 2 ] }

  const Stack = (function () {
    const wm = new WeakMap()
    return class Stack {
      constructor() {
        wm.set(this, [])
      }
      push(x) {
        wm.get(this).push(x)
      }
    }
  })()
  const stack = new Stack()
  stack.push(1)
  stack.push(2)
  console.log(stack) // Stack {}
  ```
