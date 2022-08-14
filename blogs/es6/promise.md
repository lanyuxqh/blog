---
title: Promise
date: 2022-7-2
tags:
  - es6
  - javascript
categories:
  - es6
---

# Promise

**概念**：

Promise 是异步编程的一种解决方案，解决传统异步编程+回调函数导致的“回调地狱”问题。

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

**特点**：

- **对象的状态不受外界影响**。Promise 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- **一旦状态改变，就不会再变，任何时候都可以得到这个结果**。Promise 对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。

**优点**：

- 有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
- `Promise`对象提供统一的接口，使得控制异步操作更加容易。

**缺点**：

- 无法取消 Promise，一旦新建就立即执行，无法中途取消；
- 如果不设置回调函数，Promise 内部抛出错误，不会反应到外部；
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 1、基本用法

- `Promise`对象是一个构造函数，用来生成`Promise`实例。
- 构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
  - `resolve`函数：将`Promise`对象的状态从 pending 变为 fulfilled，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
  - `reject`函数：将`Promise`对象的状态从 pending 变为 rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
- 返回一个新的 Promise 实例。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

**注意点**：

- 新建 Promise 后会立即执行，then()指定的回调函数在当前所有同步任务执行完才执行。
- `resolve()`和`reject()`函数会放到同步任务执行完后执行，并且只要有一个执行就结束同步过程。

```js
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})
var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})
p2.then(result => console.log(result)).catch(error => console.log(error))
// 上面的代码中，1秒后p2的状态发生改变，但是由于resolve()返回的是p1（Promise对象），导致p2的状态无效，p1在3秒后将rejected状态传递给p2，所以最后触发catch中的回调函数。

var pro = new Promise((resolve, reject) => {
  console.log(1)
  resolve(4)
  console.log(2)
}).then(val => {
  console.log(val)
})

pro.then(() => {
  console.log(5)
})
console.log(3)
setTimeout(function () {
  console.log(6)
})
// 输出的是 1,2,3,4,5,6

new Promise((resolve, reject) => {
  console.log(2)
  resolve(200)
  resolve(201)
  console.log(3)
  reject(500)
  console.log(4)
})
  .then(function (i) {
    console.log(i)
  })
  .catch(function (err) {
    console.log(err)
  })
// 输出的是 2,3,4,200
```

## 2、Promise.prototype.then()

- 作用：为 Promise 实例添加状态改变时的回调函数。
- 第一个参数是`fulfilled`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。
- 返回一个新的 Promise 实例。
  - 如果 then 中的回调函数没有返回值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined；
  - 如果 then 中的回调函数返回一个值，那么 then 返回的 Promise 就会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值；
  - 如果 then 中的回调函数抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值；
  - 如果 then 中的回调函数返回一个已经是接受状态的 Promise，那么 then 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的 Promise 的接受状态回调函数的参数值；如果 then 中的回调函数返回一个已经是拒绝状态的 Promise，那么 then 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的 Promise 的拒绝状态回调函数的参数值；如果 then 中的回调函数返回一个未定状态(pending)的 Promise，那么 then 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同，同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。
- 可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

实现：

```js
class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.state = MyPromise.PENDING
    this.result = null
    this.callbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  resolve(value) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.FULFILLED
      this.result = value
      setTimeout(() => {
        this.callbacks.map(callback => callback.onFulfilled(value))
      })
    }
  }
  reject(reason) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.REJECTED
      this.result = reason
      setTimeout(() => {
        this.callbacks.map(callback => callback.onRejected(reason))
      })
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = value => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = reason => reason
    }
    let promise = new MyPromise((resolve, reject) => {
      if (this.state === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(promise, onFulfilled(value), resolve, reject)
            // try {
            //   let result = onFulfilled(value)
            //   if (result instanceof MyPromise) {
            //     result.then(resolve, reject)
            //   } else {
            //     resolve(result)
            //   }
            // } catch (err) {
            //   reject(err)
            // }
          },
          onRejected: reason => {
            this.parse(promise, onRejected(reason), resolve, reject)
            // try {
            //   let result = onRejected(reason)
            //   if (result instanceof MyPromise) {
            //     result.then(resolve, reject)
            //   } else {
            //     resolve(result)
            //   }
            // } catch (err) {
            //   reject(err)
            // }
          }
        })
      }
      if (this.state === MyPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.result), resolve, reject)
          // try {
          //   let result = onFulfilled(this.result)
          //   if (result instanceof MyPromise) {
          //     result.then(resolve, reject)
          //   } else {
          //     resolve(result)
          //   }
          // } catch (err) {
          //   reject(err)
          // }
        })
      }
      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.result), resolve, reject)
          // try {
          //   let result = onRejected(this.result)
          //   if (result instanceof MyPromise) {
          //     result.then(resolve, reject)
          //   } else {
          //     resolve(result)
          //   }
          // } catch (err) {
          //   reject(err)
          // }
        })
      }
    })
    return promise
  }
  parse(promise, result, resolve, reject) {
    if (promise === result) {
      throw new TypeError('Chaining cycle detected for promise')
    }
    try {
      if (result instanceof MyPromise) {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    } catch (err) {
      reject(err)
    }
  }
}
```

## 3、Promise.prototype.catch()

- 作用：指定发生错误时的回调函数，相当于`.then(null/undefined, rejection)`，`.then(null, rejection)`优先于`Promise.prototype.catch()`处理错误。
- 参数是`rejected`状态的回调函数。
- 返回一个新的 Promise 实例。（状态分析和 then 一样）

- 如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。

<!-- **实现**： -->

<!-- ```js

``` -->

## 4、Promise.prototype.finally()

- 作用：指定不管 Promise 对象最后状态如何，都会执行的操作。
- 不接受任何参数。
- 返回一个新的 Promise 实例，状态和值跟前一个 p 有关。

<!-- **实现**： -->

<!-- ```js

``` -->

## 5、Promise.prototype.done()

- 因为 Promise 内部的错误不会冒泡到全局，所以无论 Promise 对象的回调链以 then 方法还是 catch 结尾，只要最后一个方法抛出错误，就有可能无法捕捉到。
- 作用：它总是处于回调链的尾端（被执行），保证抛出任何可能出现的错误。

## 6、Promise.resolve()

- 作用：将现有对象转换成 Promise 对象
- 参数分成四种情况
  - 如果参数是 Promise 实例，返回该 Promise 实例。
  - 如果参数是一个`thenable`对象（有 then 方法），会将这个对象转为 Promise 对象，然后立即执行 then 方法（相当于改变状态）。
  - 如果参数不是具有`then()`方法的对象，或根本就不是对象，返回一个状态为`fulfilled`的新的 Promise 实例
  - 不带参数，返回一个状态为`fulfilled`的新的 Promise 实例。
- 返回一个新的解析过的 Promise 实例。

**实现**：

```js
Promise.myResolve = function (value) {
  if (value instanceof Promise) {
    return value
  }
  return new Promise(resolve => {
    resolve(value)
  })
}
```

## 7、Promise.reject()

- 作用：返回一个状态为`rejected`的 Promise 对象。
- 参数会原封不动地作为 reject 的理由，变成后续方法的参数。
- 返回一个新的拒绝状态的 Promise 实例。

实现：

```js
Promise.myReject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
```

## 8、Promise.all()

- 作用：将多个 Promise 实例，包装成一个新的 Promise 实例。

- 接收一个 promise 的 iterable 类型。每个成员返回的都是 Promise 实例，如果不是就先用 Promise.resolve()转换成 Promise 实例。

- 返回一个新的 Promise 实例。

  - 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。

  - 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

  - 如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected，并不会触发 Promise.all()的 catch 方法，若被 rejected 的 Promise 实例没有自己的 catch 方法，就会调用 Promise.all()的 catch 方法。

**实现**：

```javascript
Promise.myAll = function (promises) {
  let res = [],
    cnt = 0
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          cnt++
          res[i] = value
          if (cnt === promises.length) {
            resolve(res)
          }
        })
        .catch(reason => {
          reject(reason)
        })
    })
  })
}
```

## 9、Promise.race()

- 作用：将多个 Promise 实例，包装成一个新的 Promise 实例。
- 接收一个 promise 的 iterable 类型。每个成员返回的都是 Promise 实例，如果不是就先用 Promise.resolve()转换成 Promise 实例。
- 返回一个新的 Promise 实例。
  - 只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

**实现**：

```js
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p)
        .then(value => {
          resolve(value)
        })
        .catch(reason => reject(reason))
    })
  })
}
```

**all 和 race 区别**：

作用都是将多个 Promise 实例包装成一个新的 Promise

- PromiseState：all 是所有 p 成功才成功，有一个拒绝就拒绝；race 是第一个改变状态的 p 的状态。
- PromiseResult：all 成功是所有 p 返回值的数组，拒绝是第一个拒绝的返回值；race 是第一个改变状态的 p 的返回值。

### 10）Promise.allSettled()

- 作用：确定一组异步操作是否都结束了（不管成功或失败，知道每一个 p 的状态和值）。
- 接收一个 promise 的 iterable 类型。每个成员返回的都是 Promise 实例，如果不是就先用 Promise.resolve()转换成 Promise 实例。
- 返回一个新的成功状态的 Promise 实例。

**实现**：

```js
Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    let res = [],
      cnt = 0
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          cnt++
          res[i] = { status: 'fulfilled', value: value }
          if (cnt === promises.length) {
            resolve(res)
          }
        })
        .catch(reason => {
          cnt++
          res[i] = { status: 'rejected', value: err }
          if (cnt === promises.length) {
            resolve(reason)
          }
        })
    })
  })
}
```

### 11）Promise.any()

- 作用：将多个 Promise 实例，包装成一个新的 Promise 实例。
- 接收一个 promise 的 iterable 类型。每个成员返回的都是 Promise 实例，如果不是就先用 Promise.resolve()转换成 Promise 实例。
- 返回一个新的 Promise 实例。
  - 只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。（逻辑和 all 相反）

**实现**：

```js
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let res = [],
      cnt = 0
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          resolve(value)
        })
        .catch(reason => {
          cnt++
          res[i] = reason
          if (cnt === promises.length) {
            reject(res)
          }
        })
    })
  })
}
```

### 12）Promise.try()

- 在不知道任务类型的情况下，让同步函数同步执行，让异步函数异步执行。

```js
const f = () => console.log('now')
Promise.try(f())
console.log('next')
```

**其他实现方式**：

**（1）async 函数**

```js
(async () => f())().then(...)
console.log("next");
```

**（2）new Promise()**

```js
const f = () => console.log('now')
;(() => new Promise(resolve => resolve(f())))()
console.log('next')
```

### 13）Promise 类原生实现

```js
/*
    1. 定义MyPromise类，初始化，绑定this
    2. 状态保护，执行者异常捕获
    3. then基础构建
    4. then异常捕获，异步处理
    5. pending状态处理
    6. pending状态异常处理
    7. pending异步处理
    8. then链式操作
    9. then返回的新promise异常处理
    10. then穿透传递
    11. then中处理函数返回类型是promise
    12. 代码冗余优化
    13. then中处理函数返回值不可以是then自身得到的promise
    14. MyPromise的resolve和reject方法(static)
    15. MyPromise的all方法(static)
    16. MyPromise的race方法(static)
*/

class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.state = MyPromise.PENDING
    this.result = null
    this.callbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  resolve(value) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.FULFILLED
      this.result = value
      setTimeout(() => {
        this.callbacks.map(callback => callback.onFulfilled(value))
      })
    }
  }
  reject(reason) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.REJECTED
      this.result = reason
      setTimeout(() => {
        this.callbacks.map(callback => callback.onRejected(reason))
      })
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = value => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = reason => reason
    }
    let promise = new MyPromise((resolve, reject) => {
      if (this.state === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(promise, onFulfilled(value), resolve, reject)
            // try {
            //   let result = onFulfilled(value)
            //   if (result instanceof MyPromise) {
            //     result.then(resolve, reject)
            //   } else {
            //     resolve(result)
            //   }
            // } catch (err) {
            //   reject(err)
            // }
          },
          onRejected: reason => {
            this.parse(promise, onRejected(reason), resolve, reject)
            // try {
            //   let result = onRejected(reason)
            //   if (result instanceof MyPromise) {
            //     result.then(resolve, reject)
            //   } else {
            //     resolve(result)
            //   }
            // } catch (err) {
            //   reject(err)
            // }
          }
        })
      }
      if (this.state === MyPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.result), resolve, reject)
          // try {
          //   let result = onFulfilled(this.result)
          //   if (result instanceof MyPromise) {
          //     result.then(resolve, reject)
          //   } else {
          //     resolve(result)
          //   }
          // } catch (err) {
          //   reject(err)
          // }
        })
      }
      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.result), resolve, reject)
          // try {
          //   let result = onRejected(this.result)
          //   if (result instanceof MyPromise) {
          //     result.then(resolve, reject)
          //   } else {
          //     resolve(result)
          //   }
          // } catch (err) {
          //   reject(err)
          // }
        })
      }
    })
    return promise
  }
  parse(promise, result, resolve, reject) {
    if (promise === result) {
      throw new TypeError('Chaining cycle detected for promise')
    }
    try {
      if (result instanceof MyPromise) {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    } catch (err) {
      reject(err)
    }
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise(resolve => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(promises) {
    let resolves = []
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(
          value => {
            resolves.push(value)
            if (resolves.length === promises.length) {
              resolve(resolves)
            }
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) =>
      promises.map(promise => {
        MyPromise.resolve(promise).then(
          value => resolve(value),
          reason => reject(reason)
        )
      })
    )
  }
}
```
