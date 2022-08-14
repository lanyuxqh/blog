---
title: Webpack梳理
date: 2022-7-14
tags:
  - webpack
categories:
  - webpack
  - javascript
---

# Webpack 梳理

## 1、前端模块化

### 1.1 模块化理解

**为什么需要模块化**：

- Web 技术发展，前端代码量和复杂度增高，各种命名冲突、代码冗余、文件间依赖变大等等一系列的问题就出来了，甚至导致后期难以维护。

**什么是模块化**：

- 模块化是将一个复杂的程序依据一定的规则封装成几个文件，并进行组合；

- 模块内部数据与实现是私有的，只是向外部暴露一些接口，与外部其他模块通信。

**模块化好处**：

- 避免命名冲突
- 更好的分离，按需加载
- 更高复用性
- 高可维护性

### 1.2 JS 模块化

#### 1.2.1 早期 JS 模块化方案

**1）全局函数**

- 实现：把不同的功能封装成不同的全局函数

- 问题：污染全局命名空间，容易引起命名冲突；模块成员之间看不出直接关系

```js
function m1() {
  //...
}
function m2() {
  //...
}
m1()
```

**2）命名空间**

- 实现：把模块写成一个对象，所有的模块成员都放到这个对象里面。

- 作用：解决命名冲突
- 问题：会暴露所有模块成员，内部状态可以被外部改写。

```js
var module1 = new Object({
  _count: 0,
  m1: function () {
    //...
  },
  m2: function () {
    //...
  }
})
module1.m1()
module1._count = 5 // 外部代码可以直接改变内部计数器的值。
```

**3）立即执行函数（IIFE）**

- 实现：将数据和行为封装到一个立即执行函数内部，通过给 window 添加属性来向外暴露接口
- 作用：数据是私有的，外部只能通过暴露的方法操作
- 问题：多个模块有依赖关系，不好办

```js
;(function (window) {
  let data = 'www.baidu.com'
  function foo() {
    console.log(`foo() ${data}`)
  }
  function bar() {
    console.log(`bar() ${data}`)
    otherFun()
  }
  function otherFun() {
    console.log('otherFun()')
  }
  window.myModule = { foo, bar }
})(window)

myModule.foo()
```

**4）IIFE 模式增强**

- 实现：向入口中传入依赖的模块（现代模块实现的基石）
- 作用：模块之间的依赖关系变得明显
- 问题：引入的模块要有先后顺序

```js
// module.js文件
(function(window, $) {
  let data = 'www.baidu.com'
  function foo() {
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    console.log(`bar() ${data}`)
    otherFun()
  }
  function otherFun() {
    console.log('otherFun()')
  }
  window.myModule = { foo, bar }
})(window, jQuery)

// index.html文件
<!-- 引入的js必须有一定顺序 -->
<script type="text/javascript" src="jquery-1.10.1.js"></script>
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
  myModule.foo()
</script>
```

**引入多个`<script>`后出现出现问题**：

- 请求过多：首先我们要依赖多个模块，那样就会发送多个请求，导致请求过多；

- 依赖模糊：我们不知道他们的具体依赖关系是什么，也就是说很容易因为不了解他们之间的依赖关系导致加载先后顺序出错；

以上两种原因就导致了很难维护，很可能出现牵一发而动全身的情况导致项目出现严重的问题。 模块化固然有多个好处，然而一个页面需要引入多个 js 文件，就会出现以上这些问题。而这些问题可以通过模块化规范来解决。

#### 1.2.2 JS 模块化规范

因为有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。但是，这样做有一个前提，那就是大家必须以同样的方式编写模块，否则你有你的写法，我有我的写法，岂不是乱了套！

**1）CommonJS**

`CommonJS` 是服务器端模块的规范，`Node.js` 就是采用了这个规范。

**规范**：

- 专门用于服务器端（Node.js），也可用于浏览器端（需要使用 `Browserify` 提前编译打包处理）；
- 同步加载，有缓存；
- 使用 module.exports 或 exports 暴露模块，使用 require 引入模块；
- 每个文件就是一个模块，有自己的作用域；
- 每个模块内部，包含 CommonJS 规范的核心变量：module 变量代表当前模块，这个变量是一个对象；它的 exports 属性（即 module.exports）是对外的接口，加载某个模块，其实是加载该模块的 module.exports 属性；require 方法用于加载模块。

```
exports.xxx = value;
module.exports = value;

require(xxx)
```

**commonjs 实现原理**：

- 在编译的过程中，实际 Commonjs 对 js 的代码块进行了首尾包装，会形成一个包装函数，我们写的代码将作为包装函数的执行上下文，使用的 `require` ，`exports` ，`module` 本质上是通过形参的方式传递到包装函数中的。返回的包装函数`modulefunction`暂且是一个字符串。

- 在模块加载的时候，会通过 runInThisContext (可以理解成 eval ) 执行 `modulefunction` ，传入`require` ，`exports` ，`module` 等参数。最终我们写的 nodejs 文件就这么执行了。

```js
function wrapper(script) {
  return '(function (exports, require, module, __filename, __dirname) {' + script + '\n})'
}

const modulefunction = wrapper(`
  const sayName = require('./hello.js')
    module.exports = function say(){
        return {
            name:sayName(),
            author:'我不是外星人'
        }
    }
`)

runInThisContext(modulefunction)(module.exports, require, module, __filename, __dirname)
```

**exports 和 module.exports**：

- exports 就是传入到当前模块内的一个对象，本质上就是 `module.exports`。
- exports={} 不可以直接赋值一个对象：exports 作为形参的方式传入到 js 模块中，直接 `exports = {}` 修改 exports ，等于内部重新声明一份 `exports` 而和外界的 `exports` 断绝了关系。

**require 文件加载流程**：

- 当 require 方法执行的时候，接收的唯一参数作为一个**标识符** ，Commonjs 下对不同的标识符，处理流程不同，但是**目的相同，都是找到对应的模块**。
- 像 fs ，http ，path 等标识符，会被作为 nodejs 的**核心模块**。
  - 核心模块的优先级仅次于缓存加载，在 `Node` 源码编译中，已被编译成二进制代码，所以加载核心模块，加载过程中速度最快。
- `./` 和 `../` 作为相对路径的**文件模块**， `/` 作为绝对路径的**文件模块**。
  - 会将路径转换成真实路径，并以真实路径作为索引，将编译后的结果缓存起来，第二次加载的时候会更快。
- 非路径形式也非核心模块的模块（通过 npm 下载），将作为**自定义模块**。
  - 在当前目录下的 `node_modules` 目录查找。
  - 如果没有，在父级目录的 `node_modules` 查找，如果没有在父级目录的父级目录的 `node_modules` 中查找。
  - 沿着路径向上递归，直到根目录下的 `node_modules` 目录。
  - 在查找过程中，会找 `package.json` 下 main 属性指向的文件，如果没有 `package.json` ，在 node 环境下会以此查找 `index.js` ，`index.json` ，`index.node`。

**require 模块引入与处理**：

- CommonJS 模块同步加载并执行模块文件，CommonJS 模块在执行阶段分析模块依赖，采用**深度优先遍历**，执行顺序是父 -> 子 -> 父；
- require 会接收一个参数——文件标识符，然后分析定位文件，接下来会从 Module 上查找有没有缓存，如果有缓存，那么直接返回缓存的内容。如果没有缓存，会创建一个 module 对象，缓存到 Module 上，然后执行文件，加载完文件，将 loaded 属性设置为 true ，然后返回 module.exports 对象。（避免了重复加载和循环引用）

  - **`module`** ：在 Node 中每一个 js 文件都是一个 module ，module 上保存了 exports 等信息之外，还有一个 **`loaded`** 表示该模块是否被加载。
  - **`Module`** ：以 nodejs 为例，整个系统运行之后，会用 `Module` 缓存每一个模块加载的信息。

- require 可以在任意的上下文，动态加载模块。

**2）AMD**

`CommonJS`规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。由于`Node.js`主要用于服务器编程，模块文件一般都已经存在于本地硬盘，加载起来比较快，所以同步加载没有问题。但是如果是浏览器端，同步加载很容易阻塞，这时候 AMD 规范就出来了。

AMD（Async Module Definition，异步模块定义）是异步加载模块，允许指定回调函数。因此浏览器端一般会使用 AMD 规范。RequireJS 是对这个规范的实现。

**规范**：

- 专门用于浏览器端（RequireJS）；
- 异步加载，有缓存；
- 使用 define 定义模块，使用 return 暴露模块，使用 require 引入模块。

```
// 定义没有依赖的模块
define(function(){
	...
	return 模块
})

// 定义有依赖的模块
define(['module1','module2'],function(m1,m2){
	...
	return 模块
})

// 引入模块
require(['module1','module2'],function(m1,m2){
	// 使用m1、m2
})
```

**3）CMD**

CMD（Common Module Definition，通用模块定义）是根据 CommonJS 和 AMD 基础上提出的，和 AMD 是比较相似的。SeaJS 是对这个规范的实现。

CMD 是懒加载，虽然一开始就并行加载 js 文件，但是不会执行，而是在需要的时候才执行。

**规范**：

- 专门用于浏览器端（sea.js）；
- 异步加载，有缓存；
- 使用 define 定义模块，使用 module.exports 或 exports 暴露模块，使用 require 引入模块。

```
// 定义没有依赖的模块
define(function(require,exports,module){
	exports.xxx = value;
	module.exports = value;
})

// 定义有依赖的模块
define(function(require,exports,module){
	// 引入依赖模块（同步）
	var module2 = require('./module2')
	// 引入依赖模块（异步）
	require.async('./module3',function(m3){

	})
	exports.xxx = value;
	module.exports = value;
})

// 引入模块
define(function(require){
	var m1 = require('./module1')
	var m2 = require('./module2')
	...
})
```

**AMD 和 CMD 的区别**：

- AMD 是依赖关系前置，在定义模块的时候就要声明其依赖的模块。
- CMD 是按需加载依赖就近，只有在用到某个模块的时候再去 require。

**4）UMD**

UMD（Universal Module Definition，通用模块定义）是通用解决方案，有三个步骤：

1. 判断是否支持 AMD
2. 判断是否支持 CommonJS
3. 如果都没有，使用全局变量

**5）ES6 Module**

ES6 模块化的出现，给前端更大的方便。

**规范**：

- 浏览器和服务器通用的模块解决方案，但还是主要专门针对浏览器端（使用 babel 将 es6 编译为 es5，使用 Browserify 编译）；
- 依赖模块需要编译打包处理；
- 动态引入（按需加载---`import(xxx)`），没有缓存；
- 使用 export 或 export default 暴露模块，使用 import 引入模块。

```
export {xxx}
export default {xxx}

import {xxx},xxx from 'xxx'
```

**运行时加载和编译时加载**：

- 运行时加载：CommonJS 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。

- 编译时加载：ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

## 2. 前端构建工具

### 2.0 作用

前端技术发展之快，各种可以提高开发效率的新思想和框架层出不穷。但是它们都有一个共同点：源代码无法直接运行，必须通过转换后才可以正常运行。构建就是做这件事情，将源代码转换成可执行的 JavaScript、CSS、HTML 代码。

**构建内容**：

- 代码转换：将 TypeScript 编译成 JavaScript、将 SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要通过构建功能将模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新代码后，自动构建出线上发布代码并传输给发布系统。

**常见的构建工具**：Grunt、Gulp、Parcel、Webpack、Rollup、Vite

|    工具    | 优点                                   | 缺点                                                     |
| :--------: | -------------------------------------- | -------------------------------------------------------- |
| Npm Script | Node. js 内置工具，无须安装其他依赖    | 功能单薄，不能管理多任务依赖                             |
|   Grunt    | 管理多任务依赖，自动化执行             | 集成度不高，要写很多配置后才可以用，**无法做到开箱即用** |
|    Gulp    | 引入了流的概念；可以监听、读写文件     | 集成度不高，要写很多配置后才可以用，**无法做到开箱即用** |
|  Webpack   | 专注于处理模块化项目，**做到开箱即用** | 只能用于模块化开发项目。                                 |

**webpack 与 grunt、gulp 的不同**：

- Grunt、Gulp 是基于任务运⾏的⼯具： 它们会⾃动执⾏指定的任务，就像流⽔线，把资源放上去然后通过不同插件进⾏加⼯，它们包含活跃的社区，丰富的插件，能⽅便的打造各种⼯作流。
- Webpack 是基于模块化打包的⼯具: ⾃动化处理模块，webpack 把⼀切当成模块，当 webpack 处理应⽤程序时，它会递归地构建⼀个依赖关系图，其中包含应⽤程序需要的每个模块，然后将所有这些模块打包成⼀个或多个 bundle。

**webpack、rollup、parcel 优劣**：

- webpack 适⽤于⼤型复杂的前端站点构建：webpack 有强⼤的 loader 和插件⽣态，打包后的⽂件实际上就是⼀个⽴即执⾏函数，这个⽴即执⾏函数接收⼀个参数，这个参数是模块对象，键为各个模块的路径，值为模块内容。⽴即执⾏函数内部则处理模块之间的引⽤，执⾏模块等，这种情况更适合⽂件依赖复杂的应⽤开发。
- rollup 适⽤于基础库的打包，如 vue、d3 等：rollup 就是将各个模块打包进⼀个⽂件中，并且通过 Tree-shaking 来删除⽆⽤的代码，可以最⼤程度上降低代码体积，但是 rollup 没有 webpack 如此多的的如代码分割、按需加载等⾼级功能，其更聚焦于库的打包，因此更适合库的开发。
- parcel 适⽤于简单的实验性项⽬：它可以满⾜低⻔槛的快速看到效果，但是⽣态差、报错信息不够全⾯都是它的硬伤，除了⼀些玩具项⽬或者实验项⽬不建议使⽤。

### 2.1 Npm Script

Npm Script 是一个任务执行者。Npm 是在安装 Node. js 时附带的包管理器，Npm Script 则是 Npm 内置的一个功能，允许在 package.json 文件里面使用 scripts 字段定义任务：

```js
{
  "scripts": {
    "dev": "node dev.js",
    "pub": "node build.js"
  }
}
```

里面的 scripts 字段是一个对象，每个属性对应一段 Shell 脚本，以上代码定义了两个任务：dev 和 pub。其底层实现原理是通过调用 Shell 去运行脚本命令，例如，执行 npm run pub 命令等同于执行 node build.js 命令。

Npm Script 优点是内置，无须安装其他依赖。

Npm Script 缺点是功能太简单，虽然提供了 pre 和 post 两个钩子，但不能方便地管理多个任务之间的依赖。

### 2.2 Grunt

Grunt 和 Npm Script 类似，也是一个任务执行者。Grunt 有大量现成的插件封装了常见的任务，也能管理任务之间的依赖关系，自动化地执行依赖的任务，每个任务的具体执行代码和依赖关系写在配置文件 Gruntfile.js 里，例如：

```js
module.exports = function (grunt) {
  // 所有插件的配置信息
  grunt.initConfig({
    // uglify插件的配置信息
    uglify: {
      app_task: {
        files: {
          'build/app.min.js': ['lib/index.js', 'lib/test.js']
        }
      }
    },
    // watch插件的配置信息
    watch: {
      another: {
        files: ['lib/*.js']
      }
    }
  })
  // 告诉Grunt我们将使用这些插件
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  // 告诉Grunt我们在终端中启动Grunt时需要执行哪些任务
  grunt.registerTask('dev', ['uglify', 'watch'])
}
```

在项目根目录下执行命令 grunt dev，就会启动 JavaScript 文件压缩和自动刷新功能。

Grunt 的优点是：

1. 灵活，它只负责执行我们定义的任务；
2. 大量的可复用插件封装好了常见的构建任务。

Grunt 的缺点是：

1. 集成度不高，要写很多配置后才可以用，无法做到开箱即用。
2. Grunt 相当于进化版的 Npm Script，它的诞生其实是为了弥补 Npm Script 的不足。

### 2.3 Gulp

Gulp 是一个基于流的自动化构建工具。除了可以管理和执行任务，还支持监听文件、读写文件。Gulp 被设计得非常简单，只通过下面 5 种方法就可以支持几乎所有构建场景：

1. 通过 gulp.task 注册一个任务；
2. 通过 gulp.run 执行任务；
3. 通过 gulp.watch 监听文件的变化；
4. 通过 gulp.src 读取文件；
5. 通过 gulp.dest 写文件。

Gulp 的最大特点是**引入了流的概念**，同时提供了一系列常用的插件去处理流，流可以在插件之间传递，大致使用如下：

Gulp 的优点：好用又不失灵活，既可以单独完成构建，也可以和其他工具搭配使用。

Gulp 的缺点**：和 Grunt 的类似，集成度不高，要写很多配置后才可以用，无法做到开箱即用**。

可以将 Gulp 看作 Grunt 的加强版。相对于 Grunt，Gulp**增加了监听文件、读写文件、流式处理的功能**。

## 3. Webpack

**概念**：Webpack 是一种前端资源构建工具（汇集了多个功能的大工具），一个静态模块打包工具。在 webpack 看来，前端的所有资源文件(js/json/css/less/scss/img...)都是一个个**模块**；webpack 会根据模块的依赖关系进行静态分析，然后按照指定规则生成浏览器可以使用的静态资源（bundle）。

**优点**：

- 专注于处理模块化的项目，能做到开箱即用、一步到位；

- 可通过 Plugin 扩展，完整好用又不失灵活；

- 使用场景不局限于 Web 开发；
- 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展，良好的开发体验。

**缺点**：

- 只能用于采用模块化开发的项目。

**创建 webpack 项目**：

```
cd webpack-use
npm init
npm i webpack webpack-cli -D
写代码...
打包：webpack ./src/index.js -o ./dist --mode=development
```

### 3.1 核心概念

**entry**：入口，指示 Webpack 从哪个文件开始打包。

**output**：出口，指示 Webpack 打包完的文件输出到哪里去，如何命名等。

**loader**：加载器，Webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader 才能解析。

**plugins**：插件，扩展 Webpack 的功能。插件的范围包括：从打包优化和压缩，一直到重新定义环境中的变量等。

**mode**：模式，指示 Webpack 使用相应模式的配置，主要包括开发模式（development）和 生产模式（production）。

```js
// webpack.config.js：Webpack配置文件，指示Webpack干哪些活（当运行webpack指令时，会加载里面的配置）
// Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范
module.exports = {
  // 入口
  entry: '',
  // 输出
  output: {},
  // 加载器
  module: {
    rules: []
  },
  // 插件
  plugins: [],
  // 模式
  mode: ''
}
```

**bundle，chunk，module 是什么**：

- bundle：是由 webpack 打包出来的⽂件；
- chunk：代码块，⼀个 chunk 由多个模块组合⽽成，⽤于代码的合并和分割；
- module：是开发中的单个模块，在 webpack 的世界，⼀切皆模块，⼀个模块对应⼀个⽂件，webpack 会从配置的 entry 中递归开始找出所有依赖的模块。

**Loader 和 Plugin 的不同**：

- 作用不同
  - Loader 直译为"加载器"。因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。
  - Plugin 直译为"插件"。Plugin 基于事件流框架 Tapable，可以扩展 Webpack 的功能。在 Webpack 运⾏的⽣命周期中会⼴播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
- 用法不同
  - Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。
  - Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

**常⻅的 Loader**：

- css-loader：加载 CSS，⽀持模块化、压缩、⽂件导⼊等特性
- style-loader：把 CSS 代码注⼊到 JavaScript 中，通过 DOM 操作去加载 CSS
- sass-loader：将 SCSS/SASS 代码转换成 CSS
- postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
- file-loader：把⽂件输出到⼀个⽂件夹中，在代码中通过相对 URL 去引⽤输出的⽂件
- url-loader：和 file-loader 类似，但是能在⽂件很⼩的情况下以 base64 的⽅式把⽂件内容注⼊到代码中去
- image-loader：加载并且压缩图⽚⽂件
- babel-loader：把 ES6 转换成 ES5
- ts-loader: 将 TypeScript 转换成 JavaScript
- eslint-loader：通过 ESLint 检查 JavaScript 代码
- vue-loader：加载 Vue.js 单文件组件
- source-map-loader：加载额外的 Source Map ⽂件，以⽅便断点调试
- mocha-loader：加载 Mocha 测试用例的代码

**常⻅的 Plugin**：

- define-plugin：定义环境变量 (Webpack4 之后指定 mode 会自动配置)
- html-webpack-plugin：简化 html ⽂件创建
- mini-css-extract-plugin：CSS 提取为独立文件，支持按需加载
- terser-webpack-plugin：压缩 JavaScript
- webpack-parallel-uglify-plugin：多进程执行代码压缩，提升构建速度
- webpack-bundle-analyzer：可视化 webpack 输出⽂件的体积
- serviceworker-webpack-plugin：为网页应用增加离线缓存功能
- clean-webpack-plugin：目录清理
- BannerPlugin：为每个 chunk 文件头部添加 banner
- HotModuleReplacementPlugin：启用热模块更换
- EslintWebpackPlugin：一个用于 webpack 的 ESLint 插件

### 3.2 基本配置

```js
// Node.js的核心模块，专门用来处理文件路径
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js', // 打包入口地址
  output: {
    filename: 'main.js', // 输出文件名
    path: path.resolve(__dirname, 'dist') // path.resolve()方法返回一个绝对路径，__dirname 当前文件的文件夹绝对路径
  },
  module: {
    rules: [
      // 转换规则
      {
        test: /\.css$/, // 匹配哪些文件
        use: ['style-loader', 'css-loader'] // 使用哪些loader
      }
    ]
  },
  plugins: [
    // 配置插件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development' // 开发模式
}
```

#### 3.2.1 开发模式

开发模式：开发代码时使用的模式。

- 编译代码，使浏览器能识别运行
  - 开发时我们有样式资源、字体图标、图片资源、html 资源等，webpack 默认都不能处理这些资源，所以我们要加载配置来编译这些资源
- 代码质量检查，树立代码规范
  - 提前检查代码的一些隐患，让代码运行时能更加健壮。
  - 提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观。

**1）处理样式资源**

**css 文件**：

- `css-loader`：将 css 文件转换成 commonjs 模块加载到 js 中，css 代码被转换成了样式字符串。（转换后得到的 commonjs 模块可以理解为：用 js 给元素动态添加样式的那种代码）；
- `style-loader`：创建 style 标签，将`css-loader`生成的样式资源插入进去，添加到 head 中，使样式生效。

```js
// 下载
npm i css-loader style-loader -D
// 配置
{
  test: /\.css$/,  // 用来匹配 .css 结尾的文件
  use: ['style-loader', 'css-loader']  // use 数组里面 loader 执行顺序是从右到左
}
```

**less 文件**：

- `less-loader`：将 less 文件编译成 css 文件。

```js
npm i less less-loader -D
{
  test: /\.less$/,
  use: ['style-loader', 'css-loader', 'less-loader']
}
```

**scss/sass 文件**：

- `sass-loader`：将 sass 或 scss 文件编译成 css 文件；

```js
npm i sass sass-loader -D
{
  test: /\.s[ac]ss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```

**styl 文件**：

- `stylus-loader`：将 styl 文件编译成 css 文件。

```js
npm i stylus stylus-loader -D
{
  test: /\.styl$/,
  use: ["style-loader", "css-loader", "stylus-loader"],
},
```

**2）处理图片资源**

Webpack4 通过 `file-loader` 和 `url-loader` 处理图片资源；

- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- `url-loader`：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去 (处理图片和字体)

  - limit：图片大小限制，小于的就会被处理成 base64；
  - esModule：url-loader 默认使用 es6 解析。设置为 false：关闭它的 es6 模块化，使用 commonjs 解析;
  - name：给图片进行重命名。[hash:10] - 取图片的 hash 的前 10 位；[ext] - 取文件原来的拓展名。

- `html-loader`：处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理）

```js
npm i url-loader file-loader html-loader -D
{
  test: /\.(png|jpe?g|gif|webp)$/,
  loader: 'url-loader',
  options: {
    limit: 8 * 1024,
    esModule: false,
    name: '[hash:10].[ext]'
  },
  type: 'javascript/auto'  // webpack5中url-loader，file-loader已经是弃用了，如果还要使用，需要加上这句，否则出现一张图片打包两次、背景图片不会显示到页面问题
},
{
  test: /\.html$/,
  loader: 'html-loader',  // webpack5中使用 html-withimg-loader代替html-loader
  options: {
  	esModule: false
  }
}
```

Webpack5 已经将两个 Loader 功能内置到 Webpack 里了，我们只需要简单配置即可处理图片资源。

```js
{
  test: /\.(png|jpe?g|gif|webp)$/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024 // 小于10kb的图片会被base64处理，优点：减少请求数量，缺点：体积变得更大。
    }
  },
  generator: {
    // 将图片文件输出到 static/imgs 目录中，将图片文件命名 [hash:8][ext][query]
    // [hash:8]: hash值取8位，[ext]: 使用之前的文件扩展名 [query]: 添加之前的query参数
    filename: 'imgs/[hash:8][ext][query]'
  }
},
```

**3）处理字体图标资源**

```
{
  test: /\.(ttf|woff2?)$/,
  type: 'asset/resource',
  generator: {
  	filename: 'fonts/[hash:8][ext][query]'
  }
}
```

`type: "asset/resource"`和`type: "asset"`的区别：

- `type: "asset/resource"` 相当于`file-loader`，将文件转化成 Webpack 能识别的资源，其他不做处理

- `type: "asset"` 相当于`url-loader`将文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式

**4）处理 js 资源**

Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法。

- Eslint：用来检测 js 和 jsx 语法的工具。
  - 关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查。
  - 配置文件由很多种写法：
    - .eslintrc.\*：新建文件，位于项目根目录（`.eslintrc`、`.eslintrc.js`、`.eslintrc.json`）
    - `package.json` 中 `eslintConfig`：不需要创建文件，在原有文件基础上写

```js
// 定义 Eslint 配置文件 .eslintrc.js
module.exports = {
  extends: ['eslint:recommended'], // 继承Eslint官方规则
  env: {
    node: true, // 启用node中全局变量
    browser: true // 启用浏览器中全局变量
  },
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: 'module' // ES 模块化
  },
  /**
   *  rules 具体规则，会覆盖继承规则
        "off" 或 0 - 关闭规则
        "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
        "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    'no-var': 2 // 不能使用var定义变量
    // 规则详见：https://eslint.bootcss.com/docs/rules/
  }
}

npm i eslint-webpack-plugin eslint -D
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
new ESLintWebpackPlugin({
  context: resolve(__dirname, 'src'), // 指定检查文件的根目录
  exclude: 'fonts'
})
```

- Babel：将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中
  - 配置文件由很多种写法：
    - babel.config.\*：新建文件，位于项目根目录（`babel.config.js`、`babel.config.json`）
    - .babelrc.\*：新建文件，位于项目根目录（`.babelrc`、`.babelrc.js`、`.babelrc.json`）
    - `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写
  - presets 预设：一组 Babel 插件，扩展 Babel 功能
    - `@babel/preset-env`：一个智能预设，允许您使用最新的 JavaScript。
    - `@babel/preset-react`：一个用来编译 React jsx 语法的预设
    - `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

```js
npm i babel-loader @babel/core @babel/preset-env -D
// 定义 Babel 配置文件  babel.config.js
module.exports = {
  presets: ['@babel/preset-env']
}
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
},
```

**5）处理 html 资源**

- `html-webpack-plugin`：默认会创建一个空的 HTML，自动引入打包输出的所有资源，包括 js，css...；（简化 html 文件创建）

```js
npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin')
new HtmlWebpackPlugin({
	// 以 src/index.html 为模板创建文件，新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
	template: './src/index.html'
})
```

**6）开发服务器&自动化**

- **devServer**：开发服务器，用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  - **特点**：所有代码都会在内存中编译打包，不会有任何输出
  - **启动**：webpack-dev-server / webpack serve

```js
npm i webpack-dev-server -D
devServer: {
  // static: resolve(__dirname, 'dist'),
  host: "localhost",  // 启动服务器域名
  port: 3000,  // 启动服务器端口号
  open: true,  // 是否自动打开浏览器
  // watchFiles: ['./src/index.html']
}
// 当版本 webpack-dev-server version >= 4.0.0 时，需要使用 devServer.static 进行配置，不再有 devServer.contentBase 配置项。
```

**webpack.dev.js**

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined,
    filename: 'js/main.js'
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'imgs/[hash:8][ext][query]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash:8][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'fonts'
    })
  ],
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true
  }
}

// webpack serve --config ./config/webpack.dev.js
```

#### 3.2.2 生产模式

生产模式：开发完成代码后，我们需要得到代码将来部署上线。

- 优化代码运行性能
- 优化代码打包速度

**配置运行指令**

```json
// package.json
{
  // 其他省略
  "scripts": {
    "start": "npm run dev",
    "dev": "npx webpack serve --config ./config/webpack.dev.js",
    "build": "npx webpack --config ./config/webpack.prod.js"
  }
}
// 开发模式：npm start 或 npm run dev
// 生产模式：npm run build
```

**1）提取 css 成单独文件**

Css 文件被打包到 js 文件中，会导致 js 文件体积变大，js 解析时样式才解析，会导致闪屏现象，因此需要提取 css 文件，通过 link 标签加载。

- `mini-css-extract-plugin`：提取 js 中的 css 成单独文件，并将样式文件放到 link 标签的 href 里。

```js
npm i mini-css-extract-plugin -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
{
  test: /\.css$/,
  use: ['MiniCssExtractPlugin.loader,', 'css-loader']
}
new MiniCssExtractPlugin({
	filename:'css/main.css'
})
```

**2）css 兼容性处理**

- `postcss-loader`：根据 node 环境变量生成对应环境的兼容性代码；
  - 设置环境变量：`process.env.NODE_ENV = 'development'`;
  - 如果不手动设置 node 环境变量，默认为"production"。
- `postcss-preset-env`：帮助`postcss-loader`找到 package.json 中 browserslist 的配置

```js
npm i postcss postcss-loader postcss-preset-env -D
// process.env.NODE_ENV = 'development'
{
  test: /\.css$/,
  use: [
  	MiniCssExtractPlugin.loader,
  	'css-loader',
  	{
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
  			}
  		}
  	}
  ]
}

// 在 package.json 文件中添加 browserslist 来控制样式的兼容性做到什么程度。
"browserslist": {
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ],
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
```

**3）css 压缩**

- `css-minimizer-webpack-plugin`：压缩 css

```
npm i css-minimizer-webpack-plugin -D
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
new CssMinimizerPlugin()
```

**4）html，js 压缩**

默认生产模式已经开启了 html 压缩和 js 压缩，不需要额外进行配置

**webpack.prod.js**

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// 获取处理样式的Loaders
const getStyleLoaders = preProcessor => {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    preProcessor
  ].filter(Boolean)
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/main.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders()
      },
      {
        test: /\.less$/,
        use: getStyleLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders('sass-loader')
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders('stylus-loader')
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'imgs/[hash:8][ext][query]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash:8][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'fonts'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new CssMinimizerPlugin()
  ],
  mode: 'production'
}
```

### 3.3 Webpack 优化

#### 3.3.1 提升开发体验

- 使用 `Source Map` 让开发或上线时代码报错能有更加准确的错误提示。

**1）SourceMap**

**原因**：开发时我们运行的代码是经过 webpack 编译后的，如果代码运行出错那么提示代码错误位置我们是看不懂的。

SourceMap（源代码映射）：是一个用来生成源代码与构建后代码一一映射的文件的方案。

它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。

[Devtool](https://webpack.docschina.org/configuration/devtool/)：控制是否生成，以及如何生成 source map。

- 开发模式：`devtool: "cheap-module-source-map"`
  - 优点：打包编译速度快，只包含行映射
  - 缺点：没有列映射
- 生产模式：`devtool: "source-map"`
  - 优点：包含行/列映射
  - 缺点：打包编译速度更慢

#### 3.3.2 提升打包构建速度

- 使用 `HotModuleReplacement` 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快。
- 使用 `OneOf` 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快。
- 使用 `Include/Exclude` 排除或只检测某些文件，处理的文件更少，速度更快。
- 使用 `Cache` 对 eslint 和 babel 处理的结果进行缓存，让第二次打包速度更快。
- 使用 `Thead` 多进程处理 eslint 和 babel 任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在比较多代码处理时使用才有效果）

**1）HotModuleReplacement**

**原因**：开发时我们修改了其中一个模块代码，Webpack 默认会将所有模块全部重新打包编译，速度很慢。

HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。

在 devServer 中配置`hot: true`：开启 HMR 功能（只能用于开发环境，生产环境不需要了）。

css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行。

```
// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept('./js/add.js')
  module.hot.accept('./js/sum.js')
}
```

这样写会很麻烦，所以实际开发我们会使用其他 loader 来解决。比如：vue-loader，react-hot-loader。

**2）OneOf**

**原因**：打包时每个文件都会经过所有 loader 处理。

oneOf：只能匹配上一个 loader，剩下的就不匹配了。

**3）Include/Exclude**

**原因**：开发时我们需要使用第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。

include：包含，只处理 xxx 文件

exclude：排除，除了 xxx 文件以外其他文件都处理

**4）Cache**

**原因**：每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。

缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。

```
options: {
	cacheDirectory: true, // 开启babel编译缓存
	cacheCompression: false, // 缓存文件不要压缩
},

cache: true, // 开启Eslint缓存
cacheLocation: path.resolve(__dirname,"../node_modules/.cache/.eslintcache"),  // 缓存目录
```

**5）Thead**

**原因**：当项目越来越庞大时，打包速度越来越慢。

多进程打包：开启电脑的多个进程同时干一件事，速度更快。

**需要注意：请仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右开销**。

```
npm i thread-loader -D

// 获取cpu核数
const os = require('os')
const threads = os.cpus().length

// babel开启多进程
{
  loader: 'thread-loader', // 开启多进程
  options: {
  	workers: threads // 数量
  }
},

// 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
const TerserPlugin = require("terser-webpack-plugin");
new TerserPlugin({
	parallel: threads // 开启多进程
})
```

#### 3.3.3 减少代码体积

- 使用 `Tree Shaking` 剔除了没有使用的多余代码，让代码体积更小。
- 使用 `@babel/plugin-transform-runtime` 插件对 babel 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小。
- 使用 `Image Minimizer` 对项目中图片进行压缩，体积更小，请求速度更快。

**1）Tree Shaking**

**原因**：开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库。如果没有特殊处理的话我们打包时会引入整个库，但是实际上可能我们可能只用上极小部分的功能。

移除 JavaScript 中的没有使用上的代码，**它依赖 `ES Module`**。Webpack 生产模式已经默认开启了这个功能。

**2）Babel**

**原因**：Babel 为编译的每个文件都插入了辅助代码，比如 `_extend`。默认情况下会被添加到每一个需要它的文件中。

`@babel/plugin-transform-runtime`：禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 `@babel/plugin-transform-runtime` 并且使所有辅助代码从这里引用。

```
npm i @babel/plugin-transform-runtime -D
{
  loader: 'babel-loader',
  options: {
  	...
    plugins: ['@babel/plugin-transform-runtime']
  }
}
```

**3）Image Minimizer**

**原因**：开发如果项目中引用了较多图片，那么图片体积会比较大，请求速度比较慢。

`image-minimizer-webpack-plugin`：用来压缩图片

```
npm i image-minimizer-webpack-plugin imagemin -D
无损压缩：
npm i imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D --ignore-scripts
有损压缩
npm i imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D --ignore-scripts
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
```

#### 3.3.4 优化代码运行性能

- 使用 `Code Split` 对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，从而达到需要使用时才加载该资源，不用时不加载资源。
- 使用 `Preload / Prefetch` 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
- 使用 `Network Cache` 能对输出资源文件进行更好的命名，将来好做缓存，从而用户体验更好。
- 使用 `Core-js` 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器。
- 使用 `PWA` 能让代码离线也能访问，从而提升用户体验。

**1） Code Split**

**原因**：打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。

- 分割文件：将打包生成的文件进行分割，生成多个 js 文件。

  - 多入口

    ```
    entry: {
    	main: "./src/main.js",
    	app: "./src/app.js",
    },
    output: {
    	path: path.resolve(__dirname, "./dist"),
    	// [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    	filename: "js/[name].js",
    	clear: true,
    },
    ```

  - 提取重复代码-----如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中。

    ```
      optimization: {
        // 代码分割配置
        splitChunks: {
          chunks: "all", // 对所有模块都进行分割
          // 以下是默认值
          // minSize: 20000, // 分割代码最小的大小
          // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
          // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
          // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
          // maxInitialRequests: 30, // 入口js文件最大并行请求数量
          // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
          // cacheGroups: { // 组，哪些模块要打包到一个组
          //   defaultVendors: { // 组名
          //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          //     priority: -10, // 权重（越大越高）
          //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          //   },
          //   default: { // 其他没有写的配置会使用上面的默认值
          //     minChunks: 2, // 这里的minChunks权重更大
          //     priority: -20,
          //     reuseExistingChunk: true,
          //   },
          // },
          // 修改配置
          cacheGroups: {
            default: {
              minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
    ```

- 按需加载：需要哪个文件就加载哪个文件。

  - `import()`：动态导入，会将动态导入的文件代码分割（拆分成单独模块），在需要使用时自动加载

- 单入口+代码分割+动态导入

  - /_ webpackChunkName: "add" _/ 这是 webpack 动态导入模块命名的方式

**2）Preload / Prefetch**

**原因**：我们前面已经做了代码分割，同时会使用 import 动态导入语法来进行代码按需加载（也叫懒加载，比如路由懒加载就是这样实现的）。但是加载速度还不够好，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。

- `Preload`：告诉浏览器立即加载资源。
- `Prefetch`：告诉浏览器在空闲时才开始加载资源。

- 共同点：
  - 都只会加载资源，并不执行；
  - 都有缓存
- 区别：

  - `Preload`加载优先级高，`Prefetch`加载优先级低。
  - `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源。

- 缺点：
  - 兼容性较差。

```
npm i @vue/preload-webpack-plugin -D
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
new PreloadWebpackPlugin({
	rel: "preload", // preload兼容性更好
	as: "script",
	// rel: 'prefetch' // prefetch兼容性更差
}),
```

**3）Network Cache**

**原因**：开发时我们对静态资源会使用缓存来优化，这样浏览器第二次请求资源就能读取缓存了，速度很快。但是因为前后输出的文件名是一样的，都叫 main.js，一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源。因此，从文件名入手，确保更新前后文件名不一样，这样就可以做缓存了。

- fullhash（webpack4 是 hash）

  - 每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。

- chunkhash

  - 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值。

- contenthash
  - 根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。

```
filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
```

- 将 hash 值单独保管在一个 runtime 文件中。当依赖文件发生改变时，主文件 hash 不会改变。

```
// 提取runtime文件
runtimeChunk: {
	name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
},
```

**4）Core-js**

**原因**：过去我们使用 babel 对 js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理兼容性问题，它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。所以我们想要将 js 兼容性问题彻底解决。

- `core-js` 是专门用来做 ES6 以及以上 API 的 `polyfill`。
  - `polyfill`翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

```
npm i core-js -D
import "core-js";
// 按需引入
import "core-js/es/promise";
// 自动按需引入
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // 按需加载core-js的polyfill
      { useBuiltIns: 'usage', corejs: { version: '3', proposals: true } }
    ]
  ]
}
```

**5）PWA**

**原因**：Web App 项目一旦处于网络离线情况，就没法访问了。我们希望给项目提供离线体验。

- PWA：渐进式网络应用程序，是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术。其中最重要的是，在 **离线(offline)** 时应用程序能够继续运行功能。内部通过 Service Workers 技术实现的。

```
npm i workbox-webpack-plugin -D
const WorkboxPlugin = require("workbox-webpack-plugin");
new WorkboxPlugin.GenerateSW({
	// 这些选项帮助快速启用 ServiceWorkers
	// 不允许遗留任何“旧的” ServiceWorkers
	clientsClaim: true,
	skipWaiting: true,
}),
```

### 3.4 Loader

**Loader**：帮助 webpack 将不同类型的文件转换为 webpack 可识别的模块。

**分类**：

- pre： 前置 loader
- normal： 普通 loader
- inline： 内联 loader
- post： 后置 loader

**执行顺序**：

- 4 类 loader 的执行优级为：`pre > normal > inline > post` 。
- 相同优先级的 loader 执行顺序为：`从右到左，从下到上`。

**使用 loader 的方式**：

- 配置方式：在 `webpack.config.js` 文件中指定 loader。（pre、normal、post loader）
  - `enforce: "pre"`，`enforce: "post"`
- 内联方式：在每个 `import` 语句中显式指定 loader。（inline loader）
  - `import Styles from 'style-loader!css-loader?modules!./styles.css';`
    - 使用 `css-loader` 和 `style-loader` 处理 `styles.css` 文件
    - 通过 `!` 将资源中的 loader 分开
  - `inline loader` 可以通过添加不同前缀，跳过其他类型 loader。
    - `!` 跳过 normal loader
      - `import Styles from '!style-loader!css-loader?modules!./styles.css';`
    - `-!` 跳过 pre 和 normal loader
      - `import Styles from '-!style-loader!css-loader?modules!./styles.css';`
    - `!!` 跳过 pre、 normal 和 post loader
      - `import Styles from '!!style-loader!css-loader?modules!./styles.css';`

**Loader 本质**：是导出函数的 JavaScript 模块。所导出的函数，可用于实现内容转换，该函数支持以下 3 个参数：

- `content`：源文件的内容
- `map`：SourceMap 数据
- `meta`：数据，可以是任何内容

**同步 Loader**：

```js
module.exports = function (content, map, meta) {
  return content
}

module.exports = function (content, map, meta) {
  // 传递map，让source-map不中断
  // 传递meta，让下一个loader接收到其他参数
  this.callback(null, content, map, meta)
  return // 当调用 callback() 函数时，总是返回 undefined
}
```

**异步 Loader**：

```js
module.exports = function (content, map, meta) {
  const callback = this.async()
  // 进行异步操作
  setTimeout(() => {
    callback(null, result, map, meta)
  }, 1000)
}
```

**Raw Loader**：

```js
module.exports = function (content) {
  // content是一个Buffer数据
  return content
}
module.exports.raw = true // 开启 Raw Loader
```

**Pitching Loader**：

- webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有），然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法。
- 在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 。

```js
module.exports = function (content) {
  return content
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('do somethings')
}
```

**Loader API**：

| 方法名                  | 含义                                       | 用法                                           |
| ----------------------- | ------------------------------------------ | ---------------------------------------------- |
| this.async              | 异步回调 loader。返回 this.callback        | const callback = this.async()                  |
| this.callback           | 可以同步或者异步调用的并返回多个结果的函数 | this.callback(err, content, sourceMap?, meta?) |
| this.getOptions(schema) | 获取 loader 的 options                     | this.getOptions(schema)                        |
| this.emitFile           | 产生一个文件                               | this.emitFile(name, content, sourceMap)        |
| this.utils.contextify   | 返回一个相对路径                           | this.utils.contextify(context, request)        |
| this.utils.absolutify   | 返回一个绝对路径                           | this.utils.absolutify(context, request)        |

**手写 Loader**：

Loader 本质上是一个函数，编写 Loader 时要遵循单⼀原则，每个 Loader 只做⼀种"转义"⼯作。

每个 Loader 的拿到的是源⽂件内容（UTF-8 编码的字符串），当某些场景下 Loader 处理二进制文件时，需要开启 Raw Loader。可以通过返回值的⽅式将处理后的内容输出；也可以调⽤ this.callback() ⽅法，将内容返回给 webpack； 还可以通过 this.async() ⽣成⼀个 callback 函数，再⽤这个 callback 将处理后的内容输出出去。

此外 webpack 还为开发者准备了开发 loader 的⼯具函数集——loader-utils。

- clean-log-loader：用来清理 js 代码中的`console.log`

```js
module.exports = function cleanLogLoader(content) {
  return content.replace(/console\.log\(.*\);?/g, '')
}
```

- banner-loader：给 js 代码添加文本注释

```js
const schema = require('./schema.json')
module.exports = function bannerLoader(content) {
  const { author } = this.getOptions(schema)
  const prefix = `
    /*
     *  Author:${author}
     */
  `
  return `${prefix} \n ${content}`
}

{
  "type": "object",
  "properties": {
    "author": {
      "type": "string"
    }
  },
  "additionalProperties": false
}

// 定义loader路径
resolveLoader: {
  modules: ['node_modules', './loaders']
},
{
  loader: 'banner-loader',
  options: { author: 'xqh' }
},
```

- babel-loader：编译 js 代码，将 ES6+语法编译成 ES5-语法。（借助@babel/core @babel/preset-env）

```js
const babel = require('@babel/core')
module.exports = function babelLoader(content) {
  const options = this.getOptions()
  const callback = this.async()
  babel.transform(content, options, function (err, result) {
    callback(err, result.code)
  })
}

options: {
  presets: ['@babel/preset-env']
}
```

- file-loader：将文件原封不动输出出去

```js
const loaderUtils = require('loader-utils')
function fileLoader(content) {
  // 根据文件内容生产一个新的文件名称
  let filename = loaderUtils.interpolateName(this, '[hash:8].[ext]', {
    content
  })
  filename = `imgs/${filename}`
  // 输出文件
  this.emitFile(filename, content)
  // 暴露出去，给js引用。记得加上''
  return `module.exports = '${filename}'`
}
fileLoader.raw = true
module.exports = fileLoader

type: 'javascript/auto' // 解决图片重复打包问题
```

- style-loader：动态创建 style 标签，插入 js 中的样式代码，使样式生效。

```js
function styleLoader(content) {}
styleLoader.pitch = function (remainingRequest) {
  // /Users/xqh/Desktop/前端准备/code/webpack-loader/node_modules/css-loader/dist/cjs.js!/Users/xqh/Desktop/前端准备/code/webpack-loader/src/css/index.css
  // console.log(remainingRequest)
  const relativeRequest = remainingRequest
    .split('!')
    .map(absolutePath => {
      const relativePath = this.utils.contextify(this.context, absolutePath)
      return relativePath
    })
    .join('!')
  // ../../node_modules/css-loader/dist/cjs.js!./index.css
  // console.log(relativeRequest)

  const script = `
    import style from "!!${relativeRequest}"
    const styleEl = document.createElement('style')
    styleEl.innerHTML = style
    document.head.appendChild(styleEl)
  `

  return script
}
module.exports = styleLoader
```

- tpl-loader：解析模版，替换变量

```js
// loaders/tpl-loader/tplReplace.js
module.exports = function tplReplace(template, replaceObj) {
  return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
    return replaceObj[key]
  })
}

// loaders/tpl-loader/index.js
const tplReplace = require('./tplReplace.js')
module.exports = function tplLoader(source) {
  source = source.replace(/\s+/g, '')
  const { log } = this.getOptions()
  const _log = log ? `console.log('compiled the file which is from ${this.resourcePath}')` : ''
  return `
    module.exports = function (options){
      ${_log}
      ${tplReplace.toString()}
      return tplReplace('${source}',options)
    }
  `
}

// src/info.tpl
<div>
  <h1>{{name}}</h1>
  <p>{{age}}</p>
  <p>{{hobby}}</p>
</div>

// index.js
import infoTpl from './info.tpl'
const app = document.querySelector('##app')
app.innerHTML = infoTpl({
  name: 'xqh',
  age: 25,
  hobby: '旅游,跑步'
})

// webpack.config.js
{
  test: /\.tpl$/,
    use: [
      'babel-loader',
      {
        loader: 'tpl-loader',
        options: {
          log: true
        }
      }
    ]
}
```

### 3.5 Plugin

**Plugin**：通过插件可以扩展 webpack，加入自定义的构建行为，使 webpack 可以执行更广泛的任务，拥有更强的构建能力。

**工作原理**：webpack 在编译代码过程中，会触发一系列 `Tapable` 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了。

**钩子**：钩子的本质就是事件。为了方便我们直接介入和控制编译过程，webpack 把编译过程中触发的各类关键事件封装成事件接口暴露了出来，这些接口被很形象地称做`hooks`（钩子）。

**手写 Plugin**：

webpack 在运⾏的⽣命周期中会⼴播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

compiler 暴露了和 Webpack 整个生命周期相关的钩子，compilation 暴露了与模块和依赖有关的粒度更小的事件钩子。插件需要在其原型上绑定 apply 方法，才能访问 compiler 实例。

找出合适的事件点去完成想要的功能，比如 emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改(emit 事件是修改 Webpack 输出资源的最后时机)。

异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住。

- BannerWebpackPlugin：给打包输出文件添加注释。

```js
class BannerWebpackPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.emit.tap('BannerWebpackPlugin', compilation => {
      const extentions = ['js', 'css']
      const assets = Object.keys(compilation.assets).filter(asset => {
        const arr = asset.split('.')
        return extentions.includes(arr[arr.length - 1])
      })
      assets.forEach(asset => {
        const prefix = `/*
* Author：${this.options.author}
*/`
        const source = prefix + '\n' + compilation.assets[asset].source()
        compilation.assets[asset] = {
          source() {
            return source
          },
          size() {
            return source.length
          }
        }
      })
    })
  }
}
module.exports = BannerWebpackPlugin
```

- CleanWebpackPlugin：在 webpack 打包输出前将上次打包内容清空。

```js
class CleanWebpackPlugin {
  apply(compiler) {
    const fs = compiler.outputFileSystem
    const outputPath = compiler.options.output.path
    compiler.hooks.emit.tap('CleanWebpackPlugin', compilation => {
      this.removeFiles(fs, outputPath)
    })
  }
  removeFiles(fs, path) {
    const files = fs.readdirSync(path)
    files.forEach(file => {
      const filePath = `${path}/${file}`
      const fileStat = fs.statSync(filePath)
      if (fileStat.isDirectory()) {
        this.removeFiles(fs, filePath)
      } else {
        fs.unlinkSync(filePath)
      }
    })
    fs.rmdirSync(path)
  }
}
module.exports = CleanWebpackPlugin
```

- AnalyzeWebpackPlugin：分析 webpack 打包资源大小，并输出分析文件。

```js
class AnalyzeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('AnalyzeWebpackPlugin', compilation => {
      const assets = Object.entries(compilation.assets)
      let source = `## 分析打包资源大小 \n| 名称 | 大小 |\n| --- | --- |`
      assets.forEach(([filename, file]) => {
        source += `\n${filename}|${Math.ceil(file.size() / 1024)}kb`
      })
      compilation.assets['analyze.md'] = {
        source() {
          return source
        },
        size() {
          return source.length
        }
      }
    })
  }
}
module.exports = AnalyzeWebpackPlugin
```

- InlineChunkWebpackPlugin：webpack 打包生成的 runtime 文件太小了，额外发送请求性能不好，所以需要将其内联到 js 中，从而减少请求数量。

```js
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin')

class InlineChunkWebpackPlugin {
  constructor(tests) {
    this.tests = tests
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InlineChunkWebpackPlugin', compilation => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation)

      hooks.alterAssetTagGroups.tap('InlineChunkWebpackPlugin', assets => {
        assets.headTags = this.getInlineTag(assets.headTags, compilation.assets)
        assets.bodyTags = this.getInlineTag(assets.bodyTags, compilation.assets)
      })

      hooks.afterEmit.tap('InlineChunkHtmlPlugin', () => {
        Object.keys(compilation.assets).forEach(assetName => {
          if (this.tests.some(test => assetName.match(test))) {
            delete compilation.assets[assetName]
          }
        })
      })
    })
  }

  getInlineTag(tags, assets) {
    return tags.map(tag => {
      if (tag.tagName !== 'script') return tag

      const scriptName = tag.attributes.src

      if (!this.tests.some(test => scriptName.match(test))) return tag

      return { tagName: 'script', innerHTML: assets[scriptName].source(), closeTag: true }
    })
  }
}

module.exports = InlineChunkWebpackPlugin
```

### 3.6 构建原理

**原理**：

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. **初始化参数**：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。
2. **开始编译**：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译。
3. **确定入口**：根据配置中的 entry 找出所有的入口文件。
4. **编译模块**：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。（递归构建一个依赖关系图）
5. **完成模块编译**：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6. **输出资源**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。
7. **输出完成**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

**手写一个简易 webpack**：

```js
// lib/Compiler.js
const Parser = require('./Parser')
const path = require('path')
const fs = require('fs')

// Compiler 对象
class Compiler {
  // 获取配置参数
  constructor(options) {
    this.options = options
    this.entry = options.entry
    this.output = options.output
    this.modules = []
  }
  // 编译模块
  run() {
    // 获取 入口文件 的模块信息
    const moduleInfo = this.getModuleInfo(this.entry)
    // 递归获取所有依赖
    this.modules.push(moduleInfo)
    this.modules.forEach(module => {
      const deps = module.deps
      if (deps) {
        for (const key in deps) {
          if (deps.hasOwnProperty(key)) {
            this.modules.push(this.getModuleInfo(deps[key]))
          }
        }
      }
    })
    // 生成依赖关系图
    const depsGraph = this.modules.reduce(
      (graph, item) => ({
        ...graph,
        [item.filePath]: {
          deps: item.deps,
          code: item.code
        }
      }),
      {}
    )
    this.generate(depsGraph)
  }
  getModuleInfo(filePath) {
    const ast = Parser.getAst(filePath)
    const deps = Parser.getDependecies(ast, filePath)
    const code = Parser.getCode(ast)
    return { filePath, deps, code }
  }
  // 把入口文件内容和它的依赖模块整合起来，处理两个关键字 reuqire、exports
  generate(graph) {
    const bundle = `(function(graph){
      function require(path){
        function loaclRequire(relPath){
          return require(graph[path].deps[relPath])
        }
        const exports = {}
        ;(function(require,exports,code){
          eval(code)
        })(loaclRequire,exports,graph[path].code)
        return exports
      }
      require('${this.entry}')
    })(${JSON.stringify(graph)})`
    const outputPath = path.join(this.output.path, this.output.filename)
    fs.writeFileSync(outputPath, bundle)
  }
}
module.exports = Compiler

// lib/Parser.js
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const Parser = {
  // 读取模块内容，借助依赖包 @babel/parser 将获取到的模块内容解析成 AST 语法树
  getAst: function (filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    return parser.parse(content, {
      sourceType: 'module'
    })
  },
  // 借助 @babel/traverse 遍历 AST 收集依赖
  getDependecies: function (ast, filePath) {
    const deps = {}
    traverse(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filePath)
        const absPath = './' + path.join(dirname, node.source.value)
        deps[node.source.value] = absPath
      }
    })
    return deps
  },
  // 借助 @babel/core @babel/preset-env 把获得的 ES6 的 AST 转化成 ES5
  getCode: function (ast) {
    const { code } = babel.transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}
module.exports = Parser

// webpack.config.js
const { resolve } = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'main.js'
  }
}

// start.js
const Compiler = require('./lib/Compiler')
const options = require('./webpack.config')
new Compiler(options).run()
```

### 3.7 文件监听原理

**文件监听**：在发现源码发生变化时，自动重新构建出新的输出文件。

**配置**：启动 webpack 命令时，带上 --watch 参数；或者在配置 webpack.config.js 中设置 watch: true

**原理**：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 `aggregateTimeout` 后再执行。

### 3.8 热更新

**热更新**：`Hot Module Replacement` 或 `HMR`，这个机制可以做到不⽤刷新浏览器⽽将新变更的模块替换掉旧的模块，从而节省开发时间、提升开发体验。

**配置**：只需要在 `webpack.config.js` 中添加 `devServer` 选项，并设置 `hot` 值为 `true` ，并使用`HotModuleReplacementPlugin` （webpack5 不需要手动引入 HMR 插件）

**原理**：

- HMR 的核心就是客户端从服务端拉取更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)。实际上 webpack-dev-server（WDS） 与浏览器之间维护了一个 `Websocket`，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 `Ajax` 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 `jsonp` 请求获取该 chunk 的增量更新。

- 拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？由 `HotModuleReplacementPlugin` 来完成，它提供了相关 API 以供开发者针对自身场景进行处理，像`react-hot-loader` 和 `vue-loader` 都是借助这些 API 实现 HMR。

1. webpack-dev-server 启动本地服务

   - 启动`webpack`，生成`compiler`实例。

   - 使用`express`框架启动本地`server`，让浏览器可以请求本地的静态资源。
   - 本地`server`启动之后，再去启动`websocket`服务。通过`websocket`建立本地服务和浏览器的双向通信。

2. 修改 webpack.config.js 的 entry 配置
   - 调用`updateCompiler(compiler)`方法，在入口默默增加了 2 个文件，会一同打包到`bundle`文件中去。`webpack-dev-server/client/index.js`是`websocket`客户端通信代码，`webpack/hot/dev-server.js`是热更新检查逻辑。
3. 监听 webpack 编译结束
   - 在 compiler 编译完成的钩子上注册监听事件，当监听到一次`webpack`编译结束，就会通过`websocket`给浏览器发送通知，`ok`和`hash`事件，这样浏览器就可以拿到最新的`hash`值了，进行热更新检查。
4. 监听文件变化
   - webpack-dev-middleware 调用 webpack 暴露的 API 对文件变化进行监控（文件变动会自动编译和重新打包），并且告诉 webpack，将编译后的文件打包到内存。
5. 浏览器接收到热更新的通知
   - `websocket`客户端代码中建立了`websocket`和服务端的连接，并注册了 2 个监听事件。`hash`事件，更新最新一次打包后的`hash`值。`ok`事件，利用`node.js`的`EventEmitter`，发出`webpackHotUpdate`消息。这是因为`websocket`仅仅用于客户端和服务端进行通信，而真正检查更新的活还是交回给了`webpack`。
6. HotModuleReplacementPlugin
   - HotModuleReplacementPlugin 插入的代码是热更新检查逻辑的核心。
   - module.hot.check 开始热更新：利用上一次保存的`hash`值，调用`hotDownloadManifest`发送`hash.hot-update.json`的`ajax`请求，获取热更新模块，以及下次热更新的`Hash` 标识；调用`hotDownloadUpdateChunk`发送`chunk名.hash.hot-update.js` 的`JSONP`请求，获取最新代码。`JSONP`获取的代码可以直接执行。
   - 调用`hotApply`进行代码的替换：删除过期的模块以及依赖，将新的模块添加到 modules 中，通过 webpack_require 执行相关模块的代码。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f8b73ca2b9248429c7b7028583a7dcf~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" alt="webpack-HMR.png" style="zoom:67%;" />

### 3.9 Babel

**Babel**：是一个 JavaScript 编译器，用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前版本和旧版本的浏览器或其他环境中。

**Babel 工作原理**：

- 解析：将代码(也就是字符串)转换成 AST( 抽象语法树)
- 转换：利用配置好的 plugins/presets 遍历 AST ，访问 AST 的节点进行变换操作生成新的 AST
- 生成：以新的 AST 为基础生成代码

**@babel/core**：Babel 的核心模块

**@babel/cli**：一个终端使用 babel 工具

**plugins**：本质就是一个`JS`程序，指示着 Babel 如何对代码进行转换，比如@babel/plugin-transform-arrow-functions，将箭头函数转换为 ES5 兼容的函数。

**presets**：一组插件的集合，比如@babel/preset-env，支持现代 JavaScript(ES6+)的所有插件。

**polyfill**：Babel 解决语法层面的问题，用于将 ES6+的高级语法转为 ES5；而 Babel polyfill 要解决 API 层面的问题（Promise、Array.from、Array.prototype.includes、generator 等），需要使用垫片。

- **babel-polyfill**：过向全局对象和内置对象的 prototype 上添加方法来实现的，会造成全局空间污染、文件体积大。

- **babel-runtime **：类似一种按需加载的实现。比如需要使用 Promise 的时候，只要在这个文件头部加上` import Promise from 'babel-runtime/core-js/promise'`。但是手动引入相应的包比较麻烦，维护起来也不方便，每个文件重复引入也造成代码的臃肿。

- **babel-plugin-transform-runtime**：依赖`babel-runtime`。在使用新 API 时 自动 import babel-runtime 里面的 polyfill。

  优点：

  - 不会污染全局变量
  - 多次使用只会打包一次
  - 依赖统一按需引入，无重复引入，无多余引入
  - 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积

  缺点：

  - 不能模拟实例方法，即内置对象原型上的方法。

**手写 babel 插件**：

- 原理：Babel 解析成 AST，然后插件更改 AST，最后由 Babel 输出代码
- Babel 的插件模块需要暴露一个 function，function 内返回 visitor，visitor 是对各类型的 AST 节点做处理的地方，可以把 Babel 转换的 AST 结果打印出来，然后进行相应的插件逻辑处理。[babel-ast-explorer](https://lihautan.com/babel-ast-explorer/##?eyJiYWJlbFNldHRpbmdzIjp7InZlcnNpb24iOiI3LjYuMCJ9LCJ0cmVlU2V0dGluZ3MiOnsiaGlkZUVtcHR5Ijp0cnVlLCJoaWRlTG9jYXRpb24iOnRydWUsImhpZGVUeXBlIjp0cnVlLCJoaWRlQ29tbWVudHMiOnRydWV9LCJjb2RlIjoiY29uc29sZS5sb2coJ2hlbGxvJyk7XG5pZihcIkRFQlVHXCIpe1xuICBjb25zdCBhID0gMTtcbiAgY29uc3QgYiA9IDI7XG4gIGNvbnNvbGUubG9nKGErYik7XG59In0=)

```js
// index.js
module.exports = function ({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === 'DEBUG' && t.isIfStatement(path.parent)) {
          if (process.env.NODE_ENV === 'development') {
            path.replaceWith(t.stringLiteral('DEBUG'))
          } else {
            path.parentPath.remove()
          }
        }
      }
    }
  }
}

// test.js
const babel = require('@babel/core')
const code = `
console.log('hello');
if(DEBUG){
  const a = 1;
  const b = 2;
  console.log(a+b);
}
`
const res = babel.transform(code, {
  plugins: [require('./index.js')]
})
console.log(res.code)
eval(res.code)
```

## 4. npm

### 4.1 输入 npm install 之后发生了什么？

1. 检查 `.npmrc` 文件
   - 优先级为：项目级的 `.npmrc` 文件 > 用户级的 `.npmrc` 文件> 全局级的 `.npmrc` 文件 > npm 内置的 `.npmrc` 文件
2. 检查项目中有无 `lock` 文件
   - 无 `lock`文件：
     - 从 `npm` 远程仓库获取包信息
     - 根据 `package.json`构建依赖树（扁平化）
       - 构建依赖树时，不管其是直接依赖还是子依赖的依赖，优先将其放置在 `node_modules` 根目录
       - 当遇到相同模块时，判断已放置在依赖树的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的 `node_modules` 下放置该模块
       - 注意这一步只是确定逻辑上的依赖树，并非真正的安装，后面会根据这个依赖结构去下载或拿到缓存中的依赖包
     - 在缓存中依次查找依赖树中的每个包
       - 不存在缓存：从 `npm` 远程仓库下载包，校验包的完整性。校验不通过，重新下载；校验通过，将下载的包复制到 `npm` 缓存目录，将下载的包按照依赖结构解压到 `node_modules`
       - 存在缓存：将缓存按照依赖结构解压到 `node_modules`
     - 生成 `lock` 文件
   - 有 `lock` 文件：
     - 检查 `package.json` 中的依赖版本是否和 `package-lock.json` 中的依赖有冲突
     - 如果没有冲突，直接跳过获取包信息、构建依赖树过程，开始在缓存中查找包信息，后续过程相同

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1285a07af08b4a7392d4d809bc60a39e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" alt="install.jpg" style="zoom:70%;" />

**为什么依赖树扁平化？**

- 嵌套结构缺点：嵌套层级过深；在不同层级的依赖中，可能引用了同一个模块，导致大量冗余。
- `NPM` 在 `3.x` 版本做了一次较大更新，其将早期的嵌套结构改为扁平结构。安装模块时，不管其是直接依赖还是子依赖的依赖，优先将其安装在 `node_modules` 根目录。当安装到相同模块时，判断已安装的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的 `node_modules` 下安装该模块。
- 存在问题：老版本的模块冗余问题；依赖解析顺序不同导致依赖结构的不确定性。
  - 解决：`package-lock.json` 的作用是锁定依赖结构，即只要目录下有 `package-lock.json` 文件，那么每次执行 `npm install` 后生成的 `node_modules` 目录结构一定是完全相同的。而且可以显著加速依赖安装时间。

### 4.2 运行 npm run xxx 的时候发生了什么？

1. 运行 npm run xxx 的时候，首先去项目的 package.json 文件里找 scripts 里找对应的 xxx，然后执行 xxx 的命令。
   - 例如启动 vue 项目 npm run serve 的时候，实际上就是执行了 vue-cli-service serve 这条命令；
2. npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行；
   - .bin 目录，这个目录不是任何一个 npm 包。目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着 `##!/bin/sh` ，表示这是一个脚本。
   - 在 npm install 时，npm 读到 package.json 中的 bin 声明后，就将该文件软链接到 ./node_modules/.bin 目录下，而 npm 还会自动把 node_modules/.bin 加入$PATH，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了。
   - 当使用 `npm run serve` 执行 `vue-cli-service serve` 时，虽然没有安装 `vue-cli-service`的全局命令，但是 npm 会到 `./node_modules/.bin` 中找到 `vue-cli-service` 文件作为 脚本来执行，则相当于执行了 `./node_modules/.bin/vue-cli-service serve`（最后的 serve 作为参数传入）。
3. 没有找到则从全局的 node_modules/.bin 中查找，npm i -g xxx 就是安装到到全局目录；
4. 如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序。
