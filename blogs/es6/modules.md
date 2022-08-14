---
title: Modules
date: 2022-7-12
tags:
  - es6
  - javascript
categories:
  - es6
---

# Modules

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

```js
// CommonJS模块----实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。
let { stat, exists, readfile } = require('fs')
// 等同于
let _fs = require('fs')
let stat = _fs.stat
let exists = _fs.exists
let readfile = _fs.readfile

// ES6模块----实质是从fs模块加载 3 个方法，其他方法不加载。
import { stat, exists, readFile } from 'fs'
```

ES6 的模块自动采用严格模式，顶层的`this`指向`undefined`。

## 1、export 命令

`export`命令用于规定模块的对外接口。

```js
export var firstName = 'Michael';

var lastName = 'Jackson';
var year = 1958;
export { lastName, year };

export function multiply(x, y) {
  return x * y;
};

function v1() { ... }
export {
  v1 as streamV1,  // 重命名
};
```

`export`命令规定的是对外的接口，接口名与模块内部变量之间建立了一一对应的关系。

`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新。

```js
// 报错
export 1;

// 报错---1只是一个值，不是接口。
var m = 1;
export m;
```

`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

```js
function foo() {
  export default 'bar' // 报错
}
foo()
```

## 2、import 命令

`import`命令用于输入其他模块提供的功能。

```js
import { firstName, lastName as surname, year } from './profile.js'

import * as circle from './circle' // 整体加载
```

`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。如果`a`是一个对象，改写`a`的属性是允许的。

```js
import { a } from './xxx.js'
a = {} // 报错
a.foo = 'hello' // 合法操作
```

`import`命令具有提升效果，会提升到整个模块的头部，首先执行。本质是，`import`命令是编译阶段执行的，在代码运行之前。

由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```js
foo();
import { foo } from 'my_module';  // 不会报错

import { 'f' + 'oo' } from 'my_module';  // 报错

let module = 'my_module';
import { foo } from module;  // 报错

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

`import`语句会执行所加载的模块，如果多次重复执行同一句`import`语句，那么只会执行一次。

```js
import 'lodash'
import 'lodash'

import { foo } from 'my_module'
import { bar } from 'my_module'
// 等同于
import { foo, bar } from 'my_module'
```

## 3、export default 命令

`export default`命令，为模块指定默认输出。

`export default`命令用在非匿名函数前，也是可以的。加载的时候，视同匿名函数加载。

一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import 命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

```js
// export-default.js
export default function () {
  console.log('foo')
}

// import-default.js
import customName from './export-default'
customName() // 'foo'
```

`export default`命令的本质是将后面的值，赋给`default`变量

```js
// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

## 4、export 与 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起。

```js
// foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。
export { foo, bar } from 'my_module'

// 接口改名
export { foo as myFoo } from 'my_module'

// 整体输出
export * from 'my_module'

// 具名接口改为默认接口
export { es6 as default } from './someModule'

// 默认接口改为具名接口
export { default as es6 } from './someModule'
```

## 5、import()

`import()`函数，支持动态加载模块。`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。`import()`类似于 Node.js 的`require()`方法，区别主要是前者是异步加载，后者是同步加载。

`import()`返回一个 Promise 对象。

```js
async function renderWidget() {
  const container = document.getElementById('widget')
  if (container !== null) {
    // 等同于
    // import("./widget").then(widget => {
    //   widget.render(container);
    // });
    const widget = await import('./widget.js')
    widget.render(container)
  }
}

renderWidget()
```

**适用场合**：

- 按需加载
- 条件加载
- 动态的模块路径

## 6、ES6 模块与 CommonJS 模块

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

|   区别   | import                                                                           | require                                                         |
| :------: | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
|   加载   | 编译时加载（静态加载）                                                           | 运行时加载（动态加载）                                          |
|   导入   | 可以导入模块中的所有导出内容或者部分导出内容                                     | 导入整个模块对象，本质是 module.exports                         |
|   导出   | import/export 模块输出的是值的引用                                               | require/exports 输出的是值的拷贝                                |
| 书写位置 | 虽然 import 命令具有提升效果，会提升到整个模块的头部， 但还是建议放在文件开头。  | 可以写在代码任何地方执行比如函数、判断语句当中                  |
|   性能   | 性能较高，因为 import 只需要依据 import 中的接口在编译时引入指定模块所以性能稍高 | 性能较低，因为 require 是在运行时才引入模块并且还赋值给某个变量 |
