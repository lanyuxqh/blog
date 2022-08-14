---
title: 事件循环机制
date: 2022-6-22
tags:
  - javascript
categories:
  - javascript
---

# 事件循环机制

## 1、浏览器的 Event Loop

**问题**：

JS 是单线程的。JS 的主要用途是与用户互动，以及操作 DOM，如果多线程，可能出现 UI 操作的冲突。因此同一时间 JS 只能执行一件事，但是像 Ajax 请求、setTimeout 等异步任务需要过一段时间后再执行它的回调函数，如果主线程一直等待就会浪费很多 cpu 资源。因此就有了事件循环机制。

**同步和异步的区别**：

- 同步任务：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
- 异步任务：不进入主线程、而进入"任务队列"的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

**事件循环机制**：

当一个脚本执行的时候，js 引擎会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中执行。如果遇到异步任务，js 引擎不会一直等待其返回结果，而是继续执行执行栈中的任务。当异步任务返回结果后，将这个事件加入到任务队列，将 Ajax 请求、setTimeOut、setInterval 等宏任务放到宏任务队列，将 Promise.then、await 等微任务放入微任务队列。当执行栈为空时，即 Script 主体代码执行完毕，js 引擎会先去检查微任务队列，依次将微任务队列中的任务加入到执行栈中执行；如果微任务队列为空了，则将宏任务队列中的任务加入到执行栈中执行；执行完后再检查微任务队列是否为空，如此往复，就是事件循环机制。

**运行机制**：在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的关键步骤如下：

1. 执行一个宏任务（执行栈中没有就从宏任务队列中获取）
2. 执行过程中如果遇到微任务，就将它添加到微任务队列中
3. 宏任务执行完毕后，立即依次执行当前微任务队列中的所有微任务
4. **开始检查渲染，GUI 线程接管渲染**
5. 渲染完毕后，JS 线程继续接管，从任务队列中获取下一个宏任务

**宏任务**：包括 script（整体代码），setTimeout / setInterval / setImmediate 定时事件，DOM 事件，Ajax 请求，I/O 操作，UI 渲染，postMessage，MessageChannel

**微任务**：包括 Promise.then，async/await，process.nextTick，MutationObserver，Object.observe

**当 宏任务 出队时，任务是一个一个执行的；而 微任务 出队时，任务是一队一队执行的**。（node 是一个宏一个微？）

```js
Promise.resolve().then(() => {
  console.log('Promise1')
  setTimeout(() => {
    console.log('setTimeout2')
  }, 0)
})
setTimeout(() => {
  console.log('setTimeout1')
  Promise.resolve().then(() => {
    console.log('Promise2')
  })
}, 0)
// Promise1，setTimeout1，Promise2，setTimeout2

setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function () {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)
// timer1，promise1，timer2，promise2
```

**注意点**：

- setTimeOut 并不是直接的把回调函数放进上述的任务队列中去，而是在定时器的时间到了之后，再把回调函数放到任务队列中去。如果此时这个队列已经有很多任务了，那就排在他们的后面。

- new Promise 是同步的任务，会被放到主进程中去立即执行(当做立即执行函数去理解)；而 then()函数是异步任务，当 promise 状态结束(就是执行 reject 或者 resolve)的时候，就会立即放进任务队列中去了。

- async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

  ```js
  // 原来 async 内部的代码
  // await 上面的代码
  doA()
  await xxx
  // await 下面的代码
  doB()

  // 相当于
  new Promise(resolve => {
    // 创建 promise 实例的时候，放的是 await 前面的代码
    doA()
    // await 后面的表达式相当于 resolve(xxx)
    resolve(xxx)
  }).then(data => {
    // await 下面的代码
    doB()
  })
  ```

  <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e15770efab614a85be4b978410d698b3~tplv-k3u1fbpfcp-watermark.awebp" alt="img" style="zoom:67%;" />

## 2、node 的 Event Loop

Node 的 Event Loop 分为 6 个阶段，它们会按照**顺序**反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

- timer 阶段（定时器）：执行 setTimeout(callback)和 setInterval(callback)
- I/O callbacks 阶段（I/O 回调）：执行某些系统操作的回调（例如 TCP 错误类型）
- idle、prepare 阶段（空转）：仅 node 内部使用
- poll 阶段（轮询）：获取新的 I/O 事件，例如操作读取文件
- check 阶段（检查）：执行 setImmediate() 设定的 callbacks;
- close callbacks 阶段（关闭回调）：比如 socket.on(‘close’, callback) 的 callback 会在这个阶段执行。

**poll 阶段**

<img src="/imgs/截屏2022-08-04 上午9.09.41.png" alt="截屏2022-08-04 上午9.09.41" style="zoom:50%;" />

Node 中的 `process.nextTick`，这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会**清空队列中的所有回调函数**，并且优先于其他 microtask 执行。

```js
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function () {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function () {
  console.log('promise3')
})
console.log('end')
process.nextTick(() => {
  console.log(1)
})
//start->end->1->promise3->timer1->promise1->timer2->promise2
```

setImmediate()被设计在 poll 阶段结束后立即执行回调；setTimeout()被设计在指定下限时间到达后执行回调。

```js
setTimeout(() => {
  setTimeout(() => {
    console.log(1)
  }, 0)
  setImmediate(() => {
    console.log(2)
  })
}, 0)
// 2 1
setTimeout(() => {
  console.log(1)
}, 0)
setImmediate(() => {
  console.log(2)
})
// 1  2或 2  1
```
