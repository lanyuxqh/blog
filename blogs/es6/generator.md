---
title: Generator
date: 2022-7-3
tags:
  - es6
  - javascript
categories:
  - es6
---

# Generator

## 1、Generator 函数

Generator 函数是一个状态机，封装了多个内部状态（是异步任务的容器）。

执行 Generator 函数会返回一个遍历器对象，返回的遍历器对象可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态。

```javascript
// 使用 * 表示这是一个 Generator 函数
// 内部可以通过 yield 暂停代码
// 通过调用 next 恢复执行
function* test() {
  let a = 1 + 2
  yield 2
  yield 3
}
let b = test() // Generator函数执行后，返回了一个拥有next函数的对象，每次调用next函数可以继续执行被暂停的代码。
console.log(b.next()) // >  { value: 2, done: false }
console.log(b.next()) // >  { value: 3, done: false }
console.log(b.next()) // >  { value: undefined, done: true }
```

## 2、yield 表达式

`yield`表达式就是暂停标志。`yield`后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

异步操作需要暂停的地方，都用`yield`语句注明（具有位置记忆功能），用`next()`继续执行。其最大特点就是可以交出函数的执行权（即暂停执行）。

**`yield`表达式与`return`语句**：

- 相同
  - 都能返回紧跟在语句后面的那个表达式的值。
- 不同
  - 每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。
  - 一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`表达式。
  - 正常函数只能返回一个值，因为只能执行一次`return`；Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。

**`yield`注意点**：

- `yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。
- `yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。
- `yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

## 3、next 方法

`next()`方法返回一个对象，包含以下两个属性：

- `value`： `yield`出来的值
- `done`：函数全部执行完返回`true`，否则返回`false`

`next()`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。（`yield`表达式本身没有返回值，或者说总是返回`undefined`）

```js
function* foo(x) {
  var y = 2 * (yield x + 1)
  var z = yield y / 3
  return x + y + z
}

var a = foo(5)
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5)
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

**next 方法的运行逻辑**：

- 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值；
- 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式；
- 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值；如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined。

## 4、Generator 原型的方法

1. `next()` 方法返回一个包含属性 `done` 和 `value` 的对象。
2. `return()` 方法返回给定的值并结束生成器。
3. `throw()` 方法用来向生成器抛出异常，并恢复生成器的执行，返回带有 `done` 及 `value` 两个属性的对象。
4. 这三个方法本质上是同一件事，它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式。
   - `next()`是将`yield`表达式替换成一个值。
   - `return()`是将`yield`表达式替换成一个`return`语句。
   - `throw()`是将`yield`表达式替换成一个`throw`语句。

## 5、自动执行 Generator 函数

- 回调函数。将异步操作包装成 thunk 函数，在回调函数里交回执行权**。（thunk 函数）**
- Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权**。（co 模块）**

**thunk 函数**

- 传值调用：传入时就计算好，简单，但性能较低。
- 传名调用：只在用到他的时候求值**（thunk 策略）**

```js
var thunk = function () {
  return x + 5
}
function f(thunk) {
  return thunk() * 2
}
var x = 1
f() // 6
```

**作用**：用于 Generator 函数的**自动流程管理**，Thunk 可以自动执行 Generator 函数（yeild 将程序执行移出 Generator 函数，而 Thunk 将将执行权交还给 Generator 函数），将同一个回到函数反复传入 next 方法的 value 值，相当于递归地自动完成该过程。

**前提**：每个异步操作都是 Thunk 函数（yeild 后跟的是 Thunk 函数）

```js
function run(fn){
    var gen = fn();
    function next(err, data){
        var result = gen.next(data);
        if(result.done) return;
        result.value(next);
    }
    next();
}
function* g(){...}
run(g)
```

**co 模块**

自动执行 Generator 函数。co 函数返回一个 Promise 对象，可以将 then 方法添加回调函数。

```js
var co = require('co')
co(gen)
```

co 模块将两种自动执行器（Thunk 函数和 Promise 对象）包装成一个模块，即使用 co 的前提是 yeild 后面一定是 Thunk 函数或 Promise 对象

```js
function run(fn){
    var gen = fn();
    function next(data){
        var result = gen.next(data);
        if(result.done) return result.value;
        result.value.then(function(data){ // 在then方法里面添加回调函数，next(data)循环
            next(data);
        });
    }
    next();
}
function* g(){...}
run(g)
```
