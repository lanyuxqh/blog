---
title: Vue梳理
date: 2022-6-11
tags:
  - vue
categories:
  - vue
  - javascript
---

# Vue 梳理

## 1. 概述

### 1.1 对 VUE 的整体理解

- vue 可以通过**vue-cli**快速初始化项目，做到开箱即用，轻量便捷。从利于前端工程化的角度去考虑使用前端框架，可以提高开发效率和开发质量。
- vue 具有**组件化**特点，使得代码得到复用。

  - 组件通过 prop 进行数据传递，集成`EventBus`进行事件注册监听和事件触发，使用`slot`进行内容分发。
  - 还实现了一套声明式模板系统，在`runtime`或者预编译是对模板进行编译，生成渲染函数，供组件渲染视图使用。

- vue 具有**响应式编程**特点。

  - 通过 Object.defineProperty 进行数据拦截，实现数据响应式。
  - 通过 Dep 和 Watcher 实现依赖收集和更新通知，核心是数据使用时收集依赖，数据更新时通知更新，实现双向数据绑定。
  - 数据响应式是用来服务双向数据绑定的。

- vue 使用**虚拟 DOM 和 diff 算法**，提高性能。

  - 用 JS 对象模拟 DOM。
  - 通过 render 函数把虚拟 DOM 转成真实 DOM 并插入页面中。
  - diff 算法用来比较同层级的新旧节点差异，如果有事件发生修改了虚拟 DOM，比较两棵虚拟 DOM 树的差异，得到差异对象。
  - 使用 patch 把差异对象应用到真正的 DOM 树上。

- 利用**VueRouter 路由机制**实现单页面应用，页面局部刷新，不需要每次切换路由都向后端发起请求。
- 利用**Vuex 集中式存储**管理应用的所有组件的状态，为复杂组件间的通信提供解决方案。
- **vue 是单页面应用**，使页面局部刷新，不用每次跳转页面都要请求所有数据和 dom，这样大大加快了访问速度和提升用户体验。而且它的第三方 ui 库节省开发时间。

### 1.2 渐进式框架

渐进式框架（自底向上增量开发的设计）。渐进式框架就是指强制主张最少，没有多做职责之外的事。

- 每个框架都有各自的特点，会对开发者有一定的要求，比如 Angular 就是强主张型的，如果要用它就必须使用它的（模板机制、依赖注入等），React 的主张程度相对弱一些，它是具有函数式编程的理念，需要调用 api 去修改数据。
- 而对于 Vue 来说并没有强主张，开发者需要什么就去做什么，不是说强制一定要使用一些全家桶之类的，可以"按需使用"。

### 1.3 对比其他框架

|  框架   | 描述                                                                                                                                                                      |
| :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JQuery  | 更方便的选取和操作 DOM 对象、数据和界面是在一起的。                                                                                                                       |
|   Vue   | 更注重 web 开发者的习惯，用 HTML 渲染模板；声明式编程（直接赋值）；push-based；v-model 双向数据流；vuex 使用的是可变的数据；vue-cli                                       |
|  React  | 用 JSX 渲染模板；函数式编程（需要调用 api 去修改数据）；pull-based；单向数据流；redux 使用的是不可变的数据；Create React App (CRA)；需要对虚拟 DOM 渲染出来的结果做脏检查 |
| Angular | 声明式编程；脏检查，所以 watcher 越多越慢                                                                                                                                 |

#### 1.3.1 React

**不同点**：

- React 采用 Virtual DOM 会对渲染出来的结果做脏检查；
- **数据管理**：Vuex 管理可变数据，直接修改；Redux 管理不可变数据，新替旧
- **代码风格**：react 推荐 jsx，把 html，css 都写进 js 里面，all in js；vue 推荐 webpack+vue-loader 的单文件组件格式，html，css，js 都写在.vue 里面。
- React 不使用模板，它要求开发者借助 JSX 在 JavaScript 中创建 DOM。函数式编程，是类式写法，api 很少；vue 用模板搭建项目。使用声明式写法，传入各种 options,api 和参数都很多，但 vue3.0 支持类式写法。
- 数据流，

**相同点**：

- React 采用独特的 JSX 语法，Vue.js 在组件开发中也推崇编写.vue 特殊文件格式，对文件内容都有一些约定；
- 两者都需要编译后使用；
- 中心实现相同：一切都是组件，组件实例之间可以嵌套；
- 都提供合理的钩子函数，可以让开发者定制化地处理需求，都不内置列数 Ajax，Route 等功能到核心包，而是以插件的方式加载；
- 在组件开发中都支持 mixins 的特性了。

#### 1.3.2 AngularJs

**相同点**：都支持指令，内置指令和自定义指令；都支持过滤器：内置过滤器和自定义过滤器；都支持双向数据绑定，都不支持低端浏览器；

**不同点**：AngularJs 的学习成本高，比如 Dependency、Injecttion 特性，而 vue.js 本身提供的 API 都比较简单、直观；在性能上，AngularJs 依赖对数据做脏检查，所以 watcher 越多越慢；Vue.js 使用基于依赖追踪的观察并且使用异步队列更新，所以的数据都是独立触发的。

#### 1.3.3 JQuery

Vue 直接操作视图层，它通过 Vue 对象将数据和 View 完全分离开来了。对数据进行操作不需要引用相应的 DOM 节点，只需要关注逻辑，完全实现了视图层和逻辑层的解耦；

Jquery 的操作是基于 DOM 节点的操作，jQuery 是使用选择器（$）选取 DOM 对象，对其进行赋值、取值、事件绑定等操作，其实和原生的 js 的区别只在于可以更方便的选取和操作 DOM 对象，而数据和界面是在一起的。它的优势在于良好的封装和兼容，使调用简单方便。

### 1.4 vue-cli 脚手架

**脚手架**：根据业务需求或者功能需求，把需要配置的 webpack 以及一些每一次都要做的事情进行封装，以后根据脚手架安装，就可以快速进行应用开发，开箱即用。

**vue 工程化**：项目中需要基于工程化开发来管理 vue 项目。vue-cli 是一个基于 vue.js 进行快速开发的完整系统，打造 vue 工程化。

- vue.js：vue-cli 工程的核心，主要特点是组件系统和双向数据绑定。
- vue-router：vue 官方推荐使用的路由框架。
- vuex：专为 Vue.js 应用项目开发的状态管理器，主要用于维护 vue 组件间共用的一些变量和方法。
- axios（ 或者 fetch 、ajax ）：用于发起 GET 、或 POST 等 http 请求，基于 Promise 设计。
- vux：一个专为 vue 设计的移动端 UI 组件库。
- 创建一个 emit.js 文件，用于 vue 事件机制的管理。
- webpack：模块加载和 vue-cli 工程打包器。

**vue-cli 文件目录**：

- node_modules：安装的各个模块

- public
  - index.html：最后编译项目时候的页面模版
    - webpack 打包编译时，页面模板也会跟着编译，把 html 压缩，把编译后的 css 和 js 插入到页面模板中。
    - 单独自己导入一些资源，基于`<%= BASE_URL %>`指定相对引入的地址
    - 需要在页面上留一个容器，最后编译时会把所有内容插入到这个容器
- src：包含整个项目中所需要的内容和代码（脚手架生成的 webpack 配置，只对 src 目录进行编译处理，其他目录不处理）
  - main.js：项目入口（单页面一个入口）
  - App.vue：index.html 页面的主要入口
  - components：公共组件
  - views：主组件入口
  - pages：每一个单独的业务板块或者页面
  - assets：项目需要的静态资源文件，images、css、lib...
  - api：axios 的二次配置或者一些接口的数据管理
  - store：管理 vuex 的一套信息
  - router：管理 vue-router 中的一套信息
  - ...
- babel.config.js：babel 的配置信息（编译解析 js 的）
- package.json：当前项目的模块依赖清单
  - scripts：配置可执行的脚本命令
    - npm run serve：开发环境下预览项目
    - npm run build：项目打包到 dist 目录，之后部署到服务器
  - dependencies：生产依赖
  - devDependencies：开发依赖
  - eslintConfig：词法解析规则，可以自定义 ESLINT 词法检测规则
  - browserslist：配置浏览器兼容列表
- vue.config.js：vue-cli 的进阶配置
  - module.exports ={配置项 1，配置项 2...}
    - 常用配置：
      - publicPath：指定所有插入资源的统一前缀路径
      - pages：配置多页面
      - lintOnSave：在开发环境下，是否每次代码编译都执行词法检测（默认 true，一般禁掉）
      - productionSourceMap：相当于压缩后的文件对照源码的映射，方便调试（默认 true，一般禁掉）
      - devServer：host、port、https 配置
      - devServer.proxy：开发环境下将 API 请求代理到 API 服务器。
  - 环境变量和模式
    - .env.development
      - NOSE_ENV=development
      - BASE_URL="http://127.0.0.1:8080"
    - .env.production
      - NOSE_ENV=production
      - BASE_URL="http://www.baidu.com"

## 2. VUE

### 2.1 Vue 基础语法

#### 2.1.1 new Vue(options)

创建 Vue 实例，相当于创建一个 viewModel 监听器（vm），用于监听对应视图和对应数据的相互改变。

1. 调用\_init 方法初始化事件和生命周期，对 options 做选项合并
   - initMixin(Vue)，将初始化函数\_init 挂到 Vue 的原型上。
   - \_init(options)，将传进来的 options 赋值给 vm 上的$options，执行 initState(vm)。
   - initState：总初始化函数，包括 initProps、initMethods、initData、initComputed、initWatch
2. 看传进来的参数有没有 el 选项，如果有则调用$mount 来挂载模板

#### 2.1.2 el

指定当前 vm 所管理的视图。

- el 不能是 body 或 html 元素。

- vue 为什么要求组件模板只能有一个根元素？
  - new Vue({el: '#app'})：使用浏览器 document 的 querySelector API 来获取它，而 querySelector 只会返回第一个匹配的 dom 元素。
  - 单文件组件 template 中根元素只能有一个：其实就是"树"状数据结构中的"根"。

#### 2.1.3 data

指定当前 vm 所管理的数据。

- 为什么通过 `this.xxx` 可以直接访问到 `data` 里面的数据？
  - data 里的属性最终会存储到`vm`上的 `_data`对象中，访问 `this.xxx`，是访问`Object.defineProperty`代理后的 `this._data.xxx`。
- data、props、methods、computed 属性名同名会怎么样？
  - 报错，因为都会被挂载在 vm 实例上。
  - 键名优先级：props > data > methods。
- vue 中怎么重置 data？

  - 直接赋值（不推荐）
  - `this.$data = this.$options.data()`
    - `this.$options.data()`获取该组件初始状态下的 data；`this.$data`获取当前状态下的 data。
    - 最好使用` this.$options.data.call(this)`，解决 data 中用 this 获取的 props 或 method 为 undefined 问题。
    - 给某一个具体的数据 (eg: form) 重新设置值：`Object.assign(this.$data.form, this.$options.data().form)`

- 动态给 vue 的 data 添加一个新的属性时会发生什么？怎样解决？

  - 受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。
  - `Vue.set(target,key,value)`或`this.$set(target,key,value)`
    - Vue 不允许动态添加根级响应式属性。

- 为什么 data 是一个函数？
  - 如果写成对象形式，重复创建 vue 组件实例会造成多实例共享一个数据对象，A 组件修改 data，B 组件中的 data 也会相应改变。而写成一个函数，相当于给每个组件实例返回自己的数据域，防止数据污染。

#### 2.1.4 props

从父组件接收参数。

- prop 验证的 type 类型有哪几种？
  - String、Number、Boolean、Array、Object、Date、Function、Symbol、自定义构造函数
- prop 是怎么做验证的？
  - 单个类型就用 Number 等基础类型；多个类型用对象，必填的话设置 require 为 true，默认值的话设置 default，对象和数组设置默认用工厂函数，自定义验证函数 validator。
  - 这些 prop 会在组件的实例创建之前便会进行验证，所以对于 `default`、`validator` 等函数中是访问不到组件的实例的

#### 2.1.5 methods

存放函数，用于给别人调用。

- 为什么方法不能使用箭头函数？
  - 方法中的 this 指向该方法所属的实例，可以使用 this 访问 data 中的属性或者其他方法；而使用了箭头函数就会丢失 this。

#### 2.1.6 computed

存放计算属性，**不是方法**。

应用场景：文本插值中逻辑过重；有明显的依赖关系。

- computed 与 methods 区别

  - computed 是**属性访问**；methods 是**函数调用**；
  - computed 具有**缓存功能**；methods 没有缓存功能。
    - computed 依赖于 data 中的数据，只有在它的相关依赖数据发生改变时才会重新求值。

- computed 与 watch 区别
  - computed 不支持异步；watch 支持异步；
  - computed 具有缓存性，页面重新渲染值不变化，计算属性会立即返回之前的计算结果；watch 无缓存性，页面重新渲染时值不变化也会执行；
  - computed 处理一个数据受多个数据影响；watch 处理一个数据影响多个数据。

#### 2.1.7 watch

监听响应式数据的改变。监听数据必须是 data 中声明过或者父组件传递过来的 props 中的数据。

应用场景：数据变化时执行异步操作；开销较大的操作。

- watch 怎么深度监听对象变化？
  - 深度监听需要配置 handler 函数以及 deep 为 true。
- 怎么在 watch 监听开始之后立即被调用？
  - `immediate:true`，组件加载立即触发回调函数执行，
- 在 vue 中 watch 和 created 哪个先执行?
  - created——beforeMount——computed——mounted
  - （methods——）watch——beforeUpdate——computed——updated

#### 2.1.8 provide/inject

用于祖孙组件间的通信。

provide 以对象或工厂函数返回对象（可以获取 this）方式传递数据，inject 以数组或对象（避免命名冲突）方式接收数据。

#### 2.1.9 filters

把需要在视图中渲染的数据进行二次或者多次处理。

可以在一个组件的选项中定义本地的过滤器，也可以在创建 vm 之前定义全局过滤器。重名用局部。过滤器中的方法没有挂载到 vm 上（不能用 this）。

过滤器可以用在两个地方**：双花括号插值**和 **v-bind 表达式**；过滤器应该被添加在 JavaScript 表达式的尾部，由“｜”符号指示；过滤器函数总接收表达式的值作为第一个参数；过滤器可以串联。

```js
// 局部
filters:{
    addUnit(val){
        if(val){
            return val+'元/米'
        }else{
            return ''
        }
    }
}
// 全局
Vue.filter('addUnit',function(val){
    if(val){
        return val+'元/米'
    }else{
        return ''
    }
})
new Vue({
  // ...
})
```

### 2.2 小胡子语法

只能编写表达式（变量、赋值表达式、函数执行、三元表达式），不能写语句（for 循环、if 判断、switch、var 等）。

在胡子语法中绑定的数据值是对象类型时，会基于 JSON.stringify 把其编译为字符串再呈现，而不是直接 toString。

### 2.3 Vue 指令

|           特性            | 描述                                                                            |
| :-----------------------: | ------------------------------------------------------------------------------- |
|          v-bind           | 给元素的内置属性动态绑定数据（:），如，:style 驼峰式分词，:class 样式隐藏否     |
|           v-on            | 监听 DOM 事件（@）                                                              |
|          v-model          | 表单元素和数据的双向绑定                                                        |
|           v-for           | 循环展示标签                                                                    |
| v-if / v-else-if / v-else | 控制标签元素（每次都会删除或创建元素，会引起回流）                              |
|          v-show           | 控制标签元素（本质是通过设置标签属性 display 为 none）                          |
|          v-text           | 给非表单元素设置内容，相当于小胡子语法，但会替换掉节点内已有内容                |
|          v-html           | 给非表单元素设置内容，相当于 innerHTML                                          |
|          v-slot           | 插槽：作用域插槽：                                                              |
|           v-pre           | 跳过这个元素和子元素的编译过程，原样输出。                                      |
|          v-cloak          | 为了解决小胡子的显示问题，搭配 css 解决屏幕闪动问题，当模板渲染完这个指令移除。 |
|          v-once           | 元素只渲染一次                                                                  |

**v-if 和 v-show 的区别**：

- v-if 本质是动态的向 DOM 树内添加或者删除 DOM 元素，开销大；v-show 本质就是通过设置标签属性 display 为 none 来控制隐藏，开销小。
- v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 适用于需要非常频繁切换条件的场景。

**v-for 和 v-if 不能同时使用**：

- `v-for`比`v-if`优先级高，同时使用会遍历数组的每一项，然后再判断 v-if，这样会导致一些不必要的计算，浪费性能，所以一般在 computed 中先对数组进行过滤再使用。

**v-for 遍历对象**：

- 先判断是否有 iterator 接口，如果有循环执行 next()方法
- 没有 iterator 的情况下，会调用 Object.keys()方法，在不同浏览器中，JS 引擎不能保证输出顺序一致

**v-model 原理**：

- 本质是语法糖：v-model="foo" 就是 :value="foo" @input="foo = $event"，
- 定义在表单元素上：把数据绑定给表单元素，然后监听表单元素的内容改变。
  - v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
    - text 和 textarea 使用 value property 和 input 事件；
    - checkbox 和 radio 使用 checked property 和 change 事件；
    - select 使用 value property 和 change 事件。
- 定义在组件上：给子组件传递一个 props，监听子组件上的事件；子组件抛出事件，通知父组件自行改变绑定的值。
  - `v-model` 做法完全符合单向数据流，【数据向下，事件向上】。

**class 和 style 绑定**：

- :class="{样式类名:响应式数据,...}"，响应式数据为 true 则有这个样式。对象可以直接写在结构上、写在响应数据中、写在计算属性中。
- :class="[响应式数据 1,...]"，响应式数据的值为样式类。
- :style 与 class 基本一样，可以用驼峰式或者短线分割来命名。

**slot 插槽**：

- 插槽，相当于占位符。在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填坑（替换组件模板中`slot`位置）。抽取共性、保留不同。
- 作用：让组件可以自定义扩展内容。
- 应用：通用的导航组件（左中右区域内容不固定）
- 匿名插槽
- 具名插槽：在模版中给预留的插槽设置名字。v-slot:xxx 相当于 slot="xxx"，同时标签改为 template。
- 作用域插槽：解决不能在插槽中直接使用组件中私有的响应式数据问题。子组件 v-bind 绑定数据，父组件 v-slot="slotProps"，slotProps.xxx 访问。

**自定义指令**：

- 指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。

- 自定义指令有五个生命周期函数

  - bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  - inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  - update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
  - componentUpdated：被绑定元素所在模板完成一次更新周期时调用。

  5. unbind：只调用一次，指令与元素解绑时调用。

- 函数参数

  - el：指令所绑定的元素，可以用来直接操作 DOM。
  - binding： 里面包含事件信息

    - value：绑定的值
    - oldValue：绑定前的值

  - vnode：Vue 编译生成的虚拟节点。
  - oldNode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

- **原理**

  - 在生成 ast 语法树时，遇到指令会给当前元素添加 directives 属性
  - 通过 genDirectives 生成指令代码
  - 在 patch 前将指令的钩子提取到 cbs 中，在 patch 过程中调用对应的钩子
  - 当执行指令对应钩子函数时，调用对应指令定义的方法

### 2.4 修饰符

**事件修饰符** @事件.修饰符

- .stop 阻止冒泡传播
- .capture 控制函数在捕获阶段执行
- .self 只有点击元素本身才会触发这个函数
- .once 事件只会触发一次
- .prevent 阻止默认行为
- .passive 先执行默认，后执行函数（如移动端滚动事件）
- .native 加在自定义组件的事件上，保证事件能执行
- .sync 事件绑定的语法糖，在父子组件传值且子组件要修改这个数据时使用。
  - `<Child :money="total" v-on:update:money="total = $event"/>` 相当于`<Child :money.sync="total"/>`，子组件内必须用`'update:money'`事件名去触发响应`<button @click="$emit('update:money', money-100)">`。
  - 不能用表达式，否则会导致 Invalid left-hand side in assignment。

**键盘事件的修饰符** @keydown.修饰符

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right

**系统修饰键**

- .ctrl
- .alt
- .shift
- .meta

**鼠标按钮修饰符**

- .left
- .right
- .middle

**v-model 的修饰符**

- .lazy 会在 change 事件触发的时候去监听，如在光标离开 input 框才会更新数据
- .number 自动将用户的输入值转化为数值类型。先输入数字的话，只取前面数字部分，先输入字母的话，修饰符无效。
- .trim 自动过滤用户输入的首尾空格

## 3. VUE 生命周期

Vue 的生命周期指的是组件从创建到销毁的一系列的过程。

作用：在渲染的每一个关键节点上，提供对应的函数，让我们进行一些相关操作。

生命周期函数 = 生命周期钩子 = 生命周期事件

### 3.1 Vue2.0 生命周期

**实例创建阶段**：

- `new Vue()`：准备创建一个 Vue 实例对象，让这个实例完成双向处理操作。
- Init1：初始化事件和生命周期函数。
- **`beforeCreate`**：

  - 创建实例之前，data 和 methods 中的数据都还没有被初始化。
  - 组件是否渲染的权限校验。

- Init2：初始化 data、methods、filter 等数据的处理。
- **`created`**：

  - 实例创建完成，data、methods 等已经挂载到实例上了。
  - 发送异步数据请求。

- 分支判断：开始编译模板，执行 Vue 代码中的指令，在内存中生成一个编译好的模板字符串。
- **`beforeMount`**：

  - 第一次渲染 DOM 之前，此时页面中还没有 DOM 元素。
  - 基本不做啥，或发送异步数据请求。

- 虚拟 DOM 转化为真实 DOM，并渲染到页面。
- **`mounted`**：
  - 真实 DOM 渲染完了。
  - DOM 处理或者监听。

**运行阶段**：

- **`beforeUpdate`**：

  - 此时 data 数据是最新的，页面尚末和最新的数据保持同步。
  - 基本不做啥。

- 根据 data 中最新的数据，在内存中重新构建虚拟 DOM，与上一次虚拟 DOM 比较（diff 算法），然后再渲染到页面中去（回流），完成了数据从 data(Model)到 View 的更新。
- **`updated`**：
  - 页面和 data 数据已经保持同步了，都是最新的。
  - DOM 处理或者监听。不能修改响应数据（会死循环！）。

**销毁阶段**：

- **`beforeDestroy`**：

  - 销毁之前。
  - 保存、提示。

- 销毁的时候，页面已经渲染的真实 DOM 不动（路由跳转除外），其他之前挂在的东西都消失了。
- **`destroyed`**：
  - 销毁之后。
  - 基本不做啥。

<img src="\imgs\vue生命周期备注图.png" style="zoom:70%;" />

```javascript
<body>
    <div id="app">
        <h3 id="h3">
            <input type="button" value="修改msg" @click="msg='No'">

            {{msg}}
        </h3>
    </div>

    <script src="js/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                msg: "yes",
            },
            methods: {
                show() {
                    console.log('执行了show方法')
                }
            },

            // 1. 实例创建阶段
            beforeCreate() {
                // data 和 methods中的数据都还没有初始化
                console.log(this.msg);
                this.show()
            },
            created() {
                // data和methods已经被初始化好了
                // 如果要调用methods中的方法，或者操作data中的数据，最早，只能在created中操作
                console.log(this.msg)
                this.show();
            },
            beforeMount() {
              	// 模板在内存中编辑完成，但是没有渲染到页面中
                // 在beforeMount执行的时候，页面中的元素，还没有被真正替换过来，只是之前的一些模板字符串
                console.log(document.getElementById('h3').innerText);
            },
            mounted() {
                // 内存中的模板，已经挂载到页面中，用户可以看到
                // 当执行完mounted就表示实例已经被完全创建好了
              	// 此时如果没有其它操作的话，这个实例就静静的躺在我们的内存中
                console.log(document.getElementById('h3').innerText);
            },

          	// 2. 运行阶段：会根据data数据的改变，有选择性地触发0到多次
            beforeUpdate() {
              	// 此时data数据是最新的，页面尚末和最新的数据保持同步。
                console.log('界面上元素的内容：' + document.getElementById('h3').innerText);
                console.log('data中的msg数据是：' + this.msg);
            },
            updated() {
              	// 页面和data数据已经保持同步了，都是最新的。
                console.log('界面上元素的内容：' + document.getElementById('h3').innerText)
                console.log('data中的msg数据是：' + this.msg)
            },

            // 3. 销毁阶段：页面关闭等操作
            beforeDestroy() {
                // 实例身上所有的data、methods、过滤器、指令...都处于可用状态，此时，还没有真正执行销毁过程。
            },
            destroy() {
                // 组件已经完全被销毁了，此时组件中所有的data、methods、过滤器、指令...都已经被销毁了。
            }
        })
    </script>
</body>
```

**keep-alive 相关的生命周期钩子函数**：

- activated： keep-alive 组件激活时触发
- deactivated：keep-alive 组件停用时触发

### 3.2 Vue3.0 生命周期

1. 在**组合 API**中使用 Vue 3 生命周期钩子，需要将生命周期钩子导入到项目中才能使用。

2. 销毁生命周期钩子改名

   - beforeDestroy -> beforeUnmount

   - destroyed -> unmounted

3. 被替换

   - `beforeCreate` -> 使用 `setup()`

   - `created` -> 使用 `setup()`

4. 重命名

   - `beforeMount` -> `onBeforeMount`

   - `mounted` -> `onMounted`

   - `beforeUpdate` -> `onBeforeUpdate`

   - `updated` -> `onUpdated`

   - `beforeDestroy` -> `onBeforeUnmount`

   - `destroyed` -> `onUnmounted`

   - `activated` -> `onActivated`

   - `deactivated` -> `onDeactivated`

   - `errorCaptured` -> `onErrorCaptured`

5. Vue3 为我们提供了两个可用于调试的钩子

   - `onRenderTracked`：状态跟踪
     - 它会跟踪页面上所有响应式变量和方法的状态，也就是我们用`return`返回去的值。只要页面有`update`的情况，它就会跟踪，然后生成一个`event`对象，我们通过`event`对象来查找程序的问题所在。
   - `onRenderTriggered`：状态触发
     - 它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来
     - event 对象
       - key：哪边变量发生了变化
       - newValue：更新后变量的值
       - oldValue：更新前变量的值
       - target：目前页面中的响应变量和函数

### 3.3 父子组件生命周期

- **加载渲染过程（父等子 mounted）**

  父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- **子组件更新过程（父等子 update）**

  父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- **销毁过程（父等子 destroyed）**

  父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 3.4 父组件监听子组件的生命周期

**1、使用 on 和 emit**

子组件 emit 触发一个事件，父组件 on 监听相应事件：

```js
// Parent.vue
<Child @mounted="doSomething"/>
doSomething() {
   console.log('父组件监听到子组件的 mounted 钩子函数 ...');
},

// Child.vue
mounted() {
  this.$emit("mounted");
}
```

**2、hook 钩子函数**

子组件不需要任何处理，只需要在父组件引用的时候通过`@hook`来监听即可：

```js
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>
doSomething() {
   console.log('父组件监听到子组件的 mounted 钩子函数 ...');
},

//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到子组件的 mounted 钩子函数 ...
```

## 4. 双向数据绑定

### 4.1 架构模式

#### 4.1 MVC

**MVC**：

- 模型（Model）：数据保存；
- 视图（View）：用户界面；
- 控制器（Controller）：业务逻辑

**特点**：

- 所有通信都是单向的。
- View 把指令传给 Controller；Controller 完成业务逻辑操作后， 改变 Model 状态；Model 将新的数据发送到 View，用户得到反馈。
- **两种接收指令的方式**：1. View 传送指令到 Controller；2. 用户直接将指令传到 Controller。

**优点**：

- 把业务逻辑全部分离到 Controller 中，模块化程度高。当业务逻辑变更的时候，不需要变更 View 和 Model，只需要 Controller 换成另外一个 Controller 就行了。

**缺点**：

- Controller 测试困难。
- View 和 Model 之间存在耦合，View 无法组件化。

**应用**：

- Backbone.js

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png" alt="img" style="zoom: 60%;" />

#### 4.2 MVP

**MVP**：

- Presenter：View 和 Model 的中间枢纽，处理和用户交互的逻辑。

**特点**：

1. 各部分之间的通信都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 接受用户请求并传递给 Presenter，Presenter 做逻辑处理并修改 Model，Model 通知 Presenter 数据变化，Presenter 更新 View。
4. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter 非常厚，所有逻辑都部署在那里。

**优点**：

- 便于测试。

- View 和 Model 解耦，View 可以进行组件化。

**缺点**：

- View 需要持有 Presenter 的引用，同时，Presenter 也需要持有 View 的引用，增加了控制的复杂度，一旦视图变更了，Presenter 也要变更。

- Presenter 中除了业务逻辑以外，还有大量的 View->Model，Model->View 的手动同步逻辑，造成 Presenter 笨重，维护困难。

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015020109.png" alt="img" style="zoom:60%;" />

#### 4.3 MVVM

**MVVM**：

- **ViewModel，** 监听模型数据的改变和控制试图行为、处理用户交互、简单理解就是一个同步 View 和 Model 的对象，连接 Model 和 View。

**特点**：

- ViewModel 层和 View 层采用双向绑定的形式（Binding），View 层的变动，将自动反映在 ViewModel 层，反之亦然。

- View 接收用户交互请求并转交给 ViewModel，ViewModel 操作 Model 数据更新，Model 更新完数据，通知 ViewModel 数据发生变化

  ViewModel 更新 View 数据。

**优点**：

- 通过双向绑定机制解决了 MVP 大量的手动 View 和 Model 同步的问题，提高了代码的可维护性。

**缺点**：

- 数据绑定使得一个位置的 Bug 被快速传递到别的位置，问题的定位变得困难。
- 对于大型的图形应用程序，视图状态较多，ViewModel 的构建和维护的成本都会比较高。
- 一个模块中 model 很大的情况下，如果长期持有不释放内存会造成内存泄漏。

**应用**：

- AngularJs、EmberJs、VueJs

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png" alt="img" style="zoom:60%;" />

**MVVM 和 MVC 区别**：

- MVC 中 Controller 演变成 MVVM 中的 ViewModel
- MVVM 通过数据来显示视图层，并采用数据双向绑定原理，MVC 是通过 Controller 来进行节点的操作
- MVVM 主要解决了 MVC 中大量的 dom 操作使页面渲染性能降低，加载速度变慢，影响用户体验

**MVVM 和 MVP 区别**：

- MVVM 采用数据双向绑定：View 的变化会自动反映在 ViewModel，反之亦然；而 MVP 需要 Presenter 手动同步 View 和 Model。

**Vue 的 MVVM**：包括 数据绑定 和 DOM 监听，数据绑定把数据放在了视图中我们指定的位置上，以后数据无论怎么变化，页面上的数据就会自动更新，无需我们手动进行 DOM 操作；DOM 监听则是监听页面上的 DOM 改变，然后映射回数据当中。

### 4.2 数据到视图绑定

#### 4.2.1 原理

**数据响应式**：数据发生变化后，会重新渲染页面。

**原理**：

- Vue 在实例化时会对 data 上的数据进行递归生成 Observer 实例对象和 Dep 实例对象。在 observer 这个过程中给每一项对象通过`Object.defineProperty`进行数据劫持（给对象的属性添加 getter 和 setter）。在 getter 中收集依赖，在 setter 中触发依赖。

- 解析模板指令，将模板中的变量替换成数据，初始化渲染视图；然后创建 Watcher 实例，传入当前指令对应节点的更新函数；在 Watcher 实例化的时候会进行依赖收集，触发 getter，使得 dep 对象的 subs 数组中存放了对应的 watcher 实例，当数据发生变化时，会触发 setter，dep 会通知 subs 数组中的 watcher 实例进行更新渲染。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64661fd2e47e4582bdd388c1b29b845f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img" style="zoom:50%;" />

**实现目标**：

- 侦测数据的变化（数据劫持 / 数据代理）
- 收集视图依赖了哪些数据（依赖收集）
- 数据变化时，自动“通知”需要更新的视图部分，并进行更新（发布订阅模式）

#### 4.2.2 数据劫持

数据劫持是对属性的读取和修改进行拦截，简单来说就是侦测数据的变化，这样才能根据数据变化做对应操作。

##### 4.2.2.1 Object.defineProperty

**作用**：在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

**语法**：`Object.defineProperty(obj, prop, descriptor)`

- obj: 要在其上定义属性的对象。
- prop: 要定义或修改的属性的名称。
- descriptor: 将被定义或修改的属性的描述符。
  - 数据描述符：
    - [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的描述符，或者能否把属性修改为存取描述符。默认为 false。
    - [[Enumerable]]：表示能否通过 for-in 循环返回属性。默认为 false。
    - [[Writable]]：表示能否修改属性的值。默认为 undefined。
    - [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。默认为 undefined。
  - 存取描述符：
    - [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为 true。
    - [[Enumerable]]：表示能否通过 for-in 循环返回属性。对于直接在对象上定义的属性，这个特性的默认值为 true。
    - [[Get]]：在读取属性时调用的函数。默认为 undefined。
    - [[Set]]：在写入属性时调用的函数。默认为 undefined。

**缺点**：

- 无法检测到对象属性的添加或删除

  - Vue.set、vm.$set、vm.$delete

    ```js
    // 向嵌套对象添加响应式属性
    Vue.set(vm.someObject, 'b', 2)
    // vm.$set 实例方法，是全局 Vue.set 方法的别名
    this.$set(this.someObject, 'b', 2)
    ```

  - 给这个对象重新赋值

    ```js
    // 添加多个对象属性
    this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
    ```

- 无法监听数组的变化（当利用索引直接设置一个数组项时、当修改数组的长度时、使用数组的方法）

  - Vue.set、vm.$set

    ```js
    Vue.set(vm.items, indexOfItem, newValue)
    vm.$set(vm.items, indexOfItem, newValue)
    vm.items.splice(indexOfItem, 1, newValue)
    vm.items.splice(newLength)
    ```

  - 重写数组方法

    ```js
    const def = function (obj, key, value, enumerable) {
      Object.defineProperty(obj, key, {
        value,
        enumerable,
        writable: true,
        configurable: true
      })
    }

    // 得到Array.prototype
    const arrayPrototype = Array.prototype

    // 以Array.prototype为原型创建arrayMethods对象，并暴露
    export const arrayMethods = Object.create(arrayPrototype)

    // 要被改写的7个数组方法
    const methodsNeedChange = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

    methodsNeedChange.forEach(methodName => {
      // 备份原来的方法，因为push、pop等7个函数的功能不能被剥夺
      const original = arrayPrototype[methodName]
      // 定义新的方法
      def(
        arrayMethods,
        methodName,
        function () {
          // 恢复原来的功能
          const result = original.apply(this, arguments)
          // 把类数组对象变为数组
          const args = [...arguments]
          // 把这个数组身上的__ob__取出来，__ob__已经被添加了。
          const ob = this.__ob__

          // 有三种方法push\unshift\splice能够插入新项，现在要把插入的新项也要变为observe的
          let inserted = []

          switch (methodName) {
            case 'push':
            case 'unshift':
              inserted = args
              break
            case 'splice':
              // splice格式是splice(下标, 数量, 插入的新项)
              inserted = args.slice(2)
              break
          }

          // 判断有没有要插入的新项，让新项也变为响应的
          if (inserted) {
            ob.observeArray(inserted)
          }

          ob.dep.notify()

          return result
        },
        false
      )
    })
    ```

ps**：Vue.set()和 this.$set()区别**：将 Vue.set()函数绑定在 Vue 构造函数；将 this.$set()函数绑定在 Vue 原型上。

```js
// 核心代码
function observer(data) {
  if (data && typeof data == 'object') {
    for (let key in data) {
      defineReactive(data, key, data[key])
    }
  }
}
function defineReactive(data, key, value) {
  // 递归子属性
  observer(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      //如果赋值是一个对象，也要递归子属性
      observer(newValue)
      if (newValue !== value) {
        value = newValue
      }
    }
  })
}
```

##### 4.2.2.2 Proxy

**作用**：提供了一种机制可以对外界的访问进行过滤和改写，修改某些操作的默认行为。Proxy 的代理是针对整个对象的，而不是对象的某个属性。

**语法**：`new Proxy(target, handler)`

- `target`：拦截的目标对象
- `handler`：定制拦截行为的对象

**优点**：

- proxy 可以监听对象而非属性，并返回一个新对象（proxy 可以直接监听数组的变化）。
- 除了 get 和 set，proxy 有多达 13 种的拦截方法。速度加倍、内存减半。

**缺点**：

- 兼容性：Proxy 对 IE 不友好
  - vue3 在检测到使用 IE 的情况下（包括 IE11），会自动降级为 Object.defineProperty 。

```js
function render() {
  console.log('模拟视图渲染')
}

let handler = {
  get(target, key) {
    // 如果取的值是对象就在对这个对象进行数据劫持
    if (typeof target[key] == 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    if (key === 'length') return true
    render()
    return Reflect.set(target, key, value)
  }
}

let data = {
  name: '前端工匠',
  age: { age: 100 },
  arr: [1, 2, 3]
}
let proxy = new Proxy(data, handler)
proxy.age.name = '浪里行舟' // 支持新增属性 模拟视图的更新
console.log(proxy.age.name) // 浪里行舟
proxy.arr[0] = '浪里行舟' //支持数组的内容发生变化 模拟视图的更新
console.log(proxy.arr) // ['浪里行舟', 2, 3 ]
proxy.arr.length-- // 无效
console.log(proxy.arr) // [ '浪里行舟', 2, 3 ]
```

### 4.3 视图到数据绑定

v-model：把数据绑定给表单元素，然后**监听表单内容改变（事件绑定）**。在事件处理函数中，把表单最新值赋值给数据，触发 setter，通知 watcher 更新渲染视图。

### 4.4 实现

#### 4.4.1 Observer

作用：利用 Object.defineProperty 给对象的属性添加 getter 和 setter**。在 getter 中收集依赖，在 setter 中触发依赖**。

```js
/* observer.js */
class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    if (!data || typeof data !== 'object') return
    // 遍历 data 转为响应式
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, value) {
    this.walk(value)
    const self = this
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 添加 Watcher 实例
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        if (newValue === value) return
        value = newValue
        self.walk(newValue)
        dep.notify()
      }
    })
  }
}
```

#### 4.4.2 Compiler

作用：解析 Vue 模板指令，将模板中的变量替换成数据，初始化渲染视图；然后创建 Watcher 实例，传入当前指令对应节点的更新函数。

```js
/* compiler.js */
class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    // 编译模板
    this.compile(this.el)
  }
  compile(el) {
    // 创建文档碎片，提高 DOM 操作的性能
    const fragment = document.createDocumentFragment()
    let childNode = null
    while ((childNode = el.firstChild)) {
      fragment.appendChild(childNode)
    }
    // 进行模板替换
    this.replace(fragment)
    el.appendChild(fragment)
  }
  replace(node) {
    // 定义匹配插值表达式的正则
    const regMustache = /\{\{\s*(\S+)\s*\}\}/

    // 当前的 node 节点是一个文本子节点，需要进行正则的替换
    if (node.nodeType === 3) {
      const text = node.textContent
      const execResult = regMustache.exec(text)
      if (execResult) {
        const key = execResult[1]
        const value = key.split('.').reduce((newObj, k) => newObj[k], this.vm)
        node.textContent = text.replace(regMustache, value)
        // 创建 Watcher 类的实例
        new Watcher(this.vm, key, newValue => {
          node.textContent = text.replace(regMustache, newValue)
        })
      }
      return
    }

    // 当前的 node 节点是 input 输入框
    if (node.nodeType === 1 && node.tagName.toUpperCase() === 'INPUT') {
      // 得到当前元素的所有属性节点
      const attrs = Array.from(node.attributes)
      // 找是否存在 v-model 属性
      const findResult = attrs.find(x => x.name === 'v-model')
      if (findResult) {
        // 获取到当前 v-model 属性的值, v-model="info.a"
        const key = findResult.value
        const value = key.split('.').reduce((newObj, k) => newObj[k], this.vm)
        node.value = value
        // 创建 Watcher 的实例
        new Watcher(this.vm, key, newValue => {
          node.value = newValue
        })
        // 监听文本框的 input 输入事件，拿到文本框最新的值，把最新的值，更新到 vm 上
        node.addEventListener('input', e => {
          const keyArr = key.split('.')
          const obj = keyArr.slice(0, keyArr.length - 1).reduce((newObj, k) => newObj[k], this.vm)
          // 触发 setter
          obj[keyArr[keyArr.length - 1]] = e.target.value
        })
      }
    }

    node.childNodes.forEach(child => this.replace(child))
  }
}
```

#### 4.4.3 Dep

作用：依赖管理，用于收集当前响应式对象的依赖关系，每个响应式对象包括子对象都拥有一个 Dep 实例（里面 subs 是 Watcher 实例数组），当数据有变更时，会通过 dep.notify()通知各个 watcher。

```js
/* dep.js */
class Dep {
  constructor() {
    // 存储观察者
    this.subs = []
  }
  // 添加观察者
  addSub(watcher) {
    if (watcher && watcher.update) {
      this.subs.push(watcher)
    }
  }
  // 通知方法
  notify() {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}
```

#### 4.4.4 Watcher

作用：每个依赖会生成一个 Watcher 实例，在执行构造函数的时候将 `Dep.target` 指向自身，触发 get 劫持使得 Dep 实例收集到了对应的 Watcher，在派发更新的时候取出对应的 Watcher ，然后执行 `update` 函数（触发解析器 compile 中对应的更新函数）。

```js
/* watcher.js */
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 把创建的 Watcher 实例存到 Dep 实例的 subs 数组中
    Dep.target = this
    this.oldValue = key.split('.').reduce((newObj, k) => newObj[k], vm) // 触发 getter
    Dep.target = null
  }
  // 观察者中的必备方法,用来更新视图
  update() {
    const newValue = this.key.split('.').reduce((newObj, k) => newObj[k], this.vm)
    if (newValue === this.oldValue) return
    this.cb(newValue)
  }
}
```

#### 4.4.5 Vue

作用：获取 options，属性代理，数据劫持，模版编译。

```js
/* vue.js */
class Vue {
  constructor(options) {
    // 获取 options
    this.$options = options || {}
    // 获取 el
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 获取 data
    this.$data = options.data || {}
    // 属性代理
    this._proxyData(this.$data)
    // 数据劫持
    new Observer(this.$data)
    // 模板编译
    new Compiler(this)
  }
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) return
          data[key] = newValue
        }
      })
    })
  }
}
```

#### 4.4.6 index

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vue双向数据绑定原理</title>
  </head>

  <body>
    <div id="app">
      <h3>姓名是：{{name}}</h3>
      <h3>年龄是：{{ age }}</h3>
      <h3>info.a的值是：{{info.a}}</h3>
      <div>
        name的值：
        <input type="text" v-model="name" />
      </div>
      <div>
        info.a的值：
        <input type="text" v-model="info.a" />
      </div>
    </div>

    <script src="./dep.js"></script>
    <script src="./watcher.js"></script>
    <script src="./compiler.js"></script>
    <script src="./observer.js"></script>
    <script src="./vue.js"></script>
    <script>
      const vm = new Vue({
        el: '#app',
        data: {
          name: 'lanyu',
          age: 20,
          info: {
            a: 'a1',
            c: 'c1'
          }
        }
      })
      console.log(vm)
    </script>
  </body>
</html>
```

## 5. 组件通信

### 5.1 父-->子

- **props**：父组件通过标签特性传递给子组件，子组件通过 props 来获取
- **provide / inject**：父组件通过 provider 传递数据，子组件通过 inject 来获取
- **$attrs / $listeners**：子组件通过 v-bind 绑定`$attrs`，其中包含着不被 prop 识别的父组件传递过来的数据。通过 v-on 绑定`$listeners`将事件传递给子组件。
- **$parent**：父组件的实例对象

##### 1）props

父组件在子组件标签特性里将数据值传递给 prop，子组件通过 props 属性定义的 prop 列表，从而让子组件可访问这个值。

```js
// 父：传递list
<com-article :alist="list"></com-article>
// 子
props: ['alist']
```

##### 2）provide / inject

在父组件中通过 `provider` 来提供属性，然后在子组件（子孙组件）中通过 `inject` 来注入变量。

```js
// 父：传递list
provide: {
  list: 'test'
}
// 子/子孙
inject: ['list']
```

##### 3）$attrs / $listeners

子组件中的`$attrs`包含了父组件组件中不被 prop 所识别的特性绑定，使用 v-bind 绑定 `$attrs`在孙子组件上，将数据传递给孙子组件；

子组件中的`$listeners`包含了父组件绑定在子组件上的事件，使用 v-on 绑定`$listeners`在孙子组件上，将事件传递给孙子组件。

```html
// 父A：传递list
<b
  :messagec="messagec"
  :message="message"
  @getCData="getCData"
  @getChildData="getChildData(message)"
>
  methods: { getChildData(val) { console.log(`这是来自B组件的数据：${val}`); }, getCData(val) {
  console.log(`这是来自C组件的数据：${val}`); } } // 子B
  <!-- C组件中能直接触发 getCData 的原因在于：B组件调用 C组件时，使用 v-on 绑定了 $listeners 属性 -->
  <!-- 通过v-bind 绑定 $attrs 属性，C组件可以直接获取到 A组件中传递下来的 props（除了 B组件中 props声明的） -->
  <C v-bind="$attrs" v-on="$listeners"></C>
  props: ['message'], data(){ return { mymessage: this.message } }, methods: { passData(val){
  //触发父组件中的事件 this.$emit('getChildData', val) } } // 子孙C
  <input type="text" v-model="$attrs.messagec" @input="passCData($attrs.messagec)" />
  methods: { passCData(val) { // 触发父组件A中的事件 this.$emit('getCData',val) } }
</b>
```

##### 4）$parent

`$parent` ：在子组件中调用，获取其所在父组件的实例。

```js
// 子组件
data() {
    boymessage: this.$parent.message
}
this.$parent.message = this.boymessage;//通过如此调用可以改变父组件的值
```

### 5.2 子-->父

- **$emit / v-on**：将数据作为`this.$emit`方法的参数，回传给父组件用`v-on：[自定义事件]`监听的函数。
- **ref / $refs**：父组件通过调用子组件 ref 名获取数据或调用方法，并且获取的是实时数据。
- **$children**：子组件的实例对象，是数组类型的，并不保证顺序，也不是响应式的。

##### 1）$emit / v-on

通过在子组件中触发一个自定义事件 xxx，将数据作为方法的参数，`this.$emit(xxx,参数)`回传给父组件，父组件用`v-on:xxx="handler"`监听。

```html
// 父组件
<son v-on:sendData="getSonText"></son>
<script>
  import son from './son.vue'
  export default {
    ...
    methods: {
      getSonText (text) {
        this.text = text
      }
    }
  }
</script>
```

```html
// 子组件
<script>
  export default {
    ...
    methods: {
      sendData () {
        this.$emit('sendData', this.text)
      }
    }
  }
</script>
```

##### 2）ref / $refs

通过 ref 对子组件做标记，父组件可以通过`vm.$refs.[子组件的ref].[子组件的属性/方法]`这种方式直接取得子组件的数据、和方法，并且获取的是实时数据。

```html
// 父组件
<child ref="msg"></child>
<script>
  export default {
    ...
    methods:{
      submitForm () {
        var _this = this
        _this.data = _this.$refs.msg.tableData
        //只要子组件的data中有tableData这个数据，我们就能在父组件中获取到他
        _this.flag= _this.$refs.msg.sendMsg()
        //只要子组件的methods中有sendMsg这个方法，我们就能在父组件中调用他
      }
    }
  }
</script>
```

##### 3）$children

`$children`：在父组件中使用，返回的是一个子组件 Array。

```js
// 父
this.$children[0].boymessage = 'hello'
```

### 5.3 兄-->弟

- **子传父、父传子**
- **EventBus**：新建一个 `Vue` 对象 `bus`，挂载到 Vue.prototype，然后通过 `bus.$emit` 触发事件，`bus.$on` 监听触发的事件。
- **Vuex**：使用`commit`触发一个`mutation`修改 store 中的 state 数据，通过`this.$store.state.[属性名]`获取 vuex 仓库中的数据

##### 1）EventBus 事件总线

通过新建一个 `Vue` 对象 `bus`，挂载到 Vue.prototype，然后通过 `bus.$emit` 触发事件，`bus.$on` 监听触发的事件。

**原理**：事件总线是一种发布订阅模式。注册时就将订阅者存在一个数组中，发布时就触发事件 `bus.$emit`，然后通过`.notify()`进行发布，订阅者通过`bus.$on`进行监听

相比之下，vuex 会将通知的概念上升到共享状态层次，有利于后期代码的维护。

```js
// 创建总的事件池
const EventBus = new Vue();
// 将事件总线赋值到 Vue.prototype 上，这样所有组件都能访问到了
Vue.prototype.$EventBus = EventBus;

// 组件A 通知事件池中的方法执行
this.$EventBus.$emit('globalEvent', val)
// 组件B  把方法加入到事件池
this.$EventBus.$on('globalEvent', (val) => {
    this.brothermessage = val;
});
// 取消
this.$EventBus.$off('globalEvent')；
```

##### 2）Vuex

- 使用`this.$store.commit('[函数名]', {'[state属性名]': 属性值})`更新 vuex 仓库中的数据。
- 使用`this.$store.state.[属性名]`获取 vuex 仓库中的数据。
- 将 state 和 mutations 挂载到 Vuex.Store 实例上去

```js
// 兄弟组件A（B结构一样）
<button @click="transform">点我让B组件接收到数据</button>
<p>因为你点了B，所以我的信息发生了变化：{{BMessage}}</p>

	data() {
      return {
        AMessage: 'Hello，B组件，我是A组件'
      }
    },
    computed: {
      BMessage() {
        // 这里存储从store里获取的B组件的数据
        return this.$store.state.BMsg
      }
    },
    methods: {
      transform() {
        // 触发receiveAMsg，将A组件的数据存放到store里去
        this.$store.commit('receiveAMsg', {
          AMsg: this.AMessage
        })
      }
    }
```

`store.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 初始化A和B组件的数据，等待获取
  AMsg: '',
  BMsg: ''
}

const mutations = {
  receiveAMsg(state, payload) {
    // 将A组件的数据存放于state
    state.AMsg = payload.AMsg
  },
  receiveBMsg(state, payload) {
    // 将B组件的数据存放于state
    state.BMsg = payload.BMsg
  }
}

export default new Vuex.Store({
  state,
  mutations
})
```

## 6. Vuex

### 6.1 Vuex 基本用法

**概念**：

Vuex 是为了解决组件间的数据交互。它是 Vue 的状态管理器，采用**集中式存储**管理应用的所有组件的状态。它的核心是 store 仓库，就是一个容器，包含着应用中大部分的状态 state。

**优点**：

- 能够在 Vuex 中集中管理共享的数居，易于开发和后期维护
- 能够高效地实现组件之间的数据共享，提高开发效率
- 存储在 vuex 中的数据都是响应式的，能够实时保持数据与页面的同步

**基本使用**：

```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 1. 创建Vuex实例
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})

// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// 2.把Vuex实例 注入到根组件，每个组件就拥有$store属性
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

- **state**
  - 存放组件之间需要共享的公共状态，即 Vuex 中的基本数据。
  - `state:{count:2}`
  - 通过`this.$store.state.count`访问
  - 从`vuex`中导入`mapState`函数，将当前组件需要的全局数据，映射为当前组件的`computed`计算属性，`...mapState(['count'])`。对象形式，可以自定义名称，`...mapState({count123:'count'})`
- **getters**
  - 可以对 state 中的数据进行加工处理形成新的数据（类似计算属性）**。不会修改 state 中的原数据**。当多个组件共用一套处理逻辑时选择使用。
  - `getters:{countInfo(state, getters){return '数量：'+state.count}}`
  - 通过`this.$store.getters.showNum`访问
  - 从`vuex`中导入`mapGetters`函数，将当前组件需要的 getter，映射为当前组件的`computed`计算属性，`...mapGetters(['showNum'])`
- **mutations**
  - 存储用来更改 state 中数据的**同步方法\*\***。只有 mutations 里的函数，才有权利修改 state 的数据；mutations 里不能包含异步操作\*\*。为了方便状态可控，修改状态有迹可循。
  - `mutations:{sub(state,option){state.count-=option}}`
  - `this.$store.commit('sub',1) `触发 mutations 里定义的函数
  - 从`vuex`中导入`mapMutations`函数，将当前组件需要的 mutations 函数，映射为当前组件的`methods`函数，`...mapMutations(['sub'])`
- **actions**
  - 由于直接在 mutations 中进行异步操作会引起数据失效，因此提供 actions 专门进行异步任务**。在 actions 中不能直接修改 state 中的数据，还是要通过触发 Mutation 的方式间接变更数据**。
  - `actions:{subAsync(store,option){setTimeout(()=>{store.commit('sub',option)},1000)}}`
    - `this.$store.dispatch('subAsync',1)`触发 Actions 里定义的函数
  - 从`vuex`中导入`mapActions`函数，将当前组件需要的 actions 函数，映射为当前组件的`methods`函数，`...mapActions(['subAsync'])`
- **modules**
  - 使用单一状态树，导致应用的所有状态集中到一个很大的对象。但是，当应用变得很大时，store 对象会变得臃肿不堪。因此，Vuex 允许我们将 store 分割到模块，每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。
  - `modules:{a:moduleA,b:moduleB}`
  - `this.$store.state.a this.$store.state.b`
  - 默认情况下，模块内部的 action 等注册在全局命名空间，这样使得多个模块能够对同一 mutation 或 action 作出响应。在模块下加`namespaced:true`，会把当前模块作为一个封闭空间，调用时需要指定模块，`this.$store.commit('user/sub',1)`

### 6.2 Vuex 工作流程

1. 在 vue 组件里面，通过 dispatch 来触发异步任务 actions（如，ajax 请求）提交修改数据的操作。
2. 访问后端接口，然后获取后端返回数据。
3. 然后通过 commit 触发 mutations 更新数据
4. 通过 Mutate 修改 state 里面的数据。
5. 最后由 store 触发每一个调用它的组件的数据更新。

<img src="https://img-blog.csdnimg.cn/20200521181420101.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ1MzE1Njk3,size_16,color_FFFFFF,t_70" alt="vuex流程" style="zoom:80%;" />

### 6.3 Vuex 原理

- Vuex 本质是一个对象。Vuex 有两个属性，一个是 install 方法，一个是 Store 这个类。
  - install 方法的作用是将 store 这个实例挂载到所有的组件上，注意是同一个 store 实例。
  - Store 这个类拥有`commit`，`dispatch`这些方法，Store 类里将用户传入的`state`包装成 data，作为 new Vue 的参数，从而实现了`state` 值的响应式。改变状态的唯一途径就是提交`mutations`。

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')


// App.vue
<template>
  <div id="app">
    <p>state:{{this.$store.state.num}}</p>
    <p>getter:{{this.$store.getters.getNum}}</p>
    <button @click="add">+1</button>
    <button @click="asyncAdd">异步+2</button>
  </div>
</template>

<script>
  export default {
    methods: {
      add() {
        this.$store.commit('incre', 1)
      },
      asyncAdd() {
        this.$store.dispatch('asyncIncre', 2)
      }
    }
  };
</script>


// store/index.js
import Vue from 'vue'
import Vuex from './myVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 0
  },
  getters: {
    getNum: (state) => {
      return state.num + 1
    }
  },
  mutations: {
    incre(state, arg) {
      state.num += arg
    }
  },
  actions: {
    asyncIncre({
      commit
    }, arg) {
      setTimeout(() => {
        commit('incre', arg)
      }, 1000)
    }
  },
  modules: {}
})


// store/myVuex.js
import Vue from "vue"

class Store {    // Vuex中的store本质就是没有template的隐藏着的vue组件。
    constructor(options) {
        this.vm = new Vue({   // Vuex的状态存储是响应式的
            data() {
                return {
                    state: options.state
                }
            }
        })

        this.getters = {}
        let getters = options.getters || {}
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return getters[getterName](this.state)
                }
            })
        })

        this.mutations = {}
        let mutations = options.mutations || {}
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = (arg) => {
                mutations[mutationName](this.state, arg)
            }
        })

        this.actions = {}
        let actions = options.actions || {}
        Object.keys(actions).forEach(actionName => {
            this.actions[actionName] = (arg) => {
                actions[actionName](this, arg)
            }
        })

    }

    get state() {
        return this.vm.state
    }

    commit = (method, arg) => {
        this.mutations[method](arg)
    }

    dispatch(method, arg) {
        this.actions[method](arg)
    }

}

let install = function (Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) { // 如果是根组件
                this.$store = this.$options.store
            } else { //如果是子组件
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

let Vuex = {
    Store,
    install
}
export default Vuex
```

## 7. VueRouter

### 7.1 前端路由

**为什么会出现前端路由？**

- 多页面应用 MPA

  - 特点：

    - 浏览器在地址栏中切换不同的 URL 时，每次都向后台服务器发出请求，服务器响应请求，在后台拼接 html 文件返回给前端，并且每次切换页面时，浏览器都会刷新页面。（页面跳转 => 返回 HTML）
    - 在后端，路由映射表中就是**不同的 URL 地址**与**不同的 html + css + 后端数据**之间的映射。

  - 优点

    - 首屏时间快
    - 有利于 SEO
    - 页面复杂度不高，开发成本较低

  - 缺点：
    - 页面切换慢，用户体验差
    - 代码重复度大，不利于后期维护
    - 对服务器的压力较大

- 单页面应用 SPA

  - 特点

    - 通常仅在第一次进入页面时会向后台服务器请求一个 html 文件和所有必需的 CSS、JS 代码，之后所有的活动都局限在该页面。当用户操作改变页面时，它不会向后端请求一个新的 html，而是利用 JS 动态地变换 HTML 里的元素，渲染出一个新页面。（页面跳转 => JS 渲染）

  - 优点：

    - 页面切换快，用户体验好
    - 代码的可复用，且由于是组件化开发，有利于后期的维护
    - 对服务器的压力较小

  - 缺点：

    - 首屏时间慢（初始加载时候需要加载所有模块文件进行渲染）

      - 骨架图，loadding 效果
      - SSR，组件和页面通过服务器生成 html 字符串，再发送到浏览器。vue 可以使用 Nuxt.js 实现服务端渲染。
      - 路由懒加载，减少入口文件体积
      - 静态资源本地缓存
      - UI 框架在引用时按需加载

    - 不利于 SEO（因为搜索引擎是根据网页内容设置网页权重，来进行网页的排名。它只认识 html 内容，不认识 js 内容，而 SPA 的内容都是靠 js 渲染生成出来的）

      - 预渲染，SSR

    - 只有一个 url，SPA 无法记住用户的操作记录，页面发生变化后，无法利用浏览器工具栏上的倒退、前进按钮进行操作。

      - 为了有效地使用单个页面来管理原来多页面的功能，**前端路由出现**。通过切换浏览器地址路径，来匹配相对应的页面组件，通过记录浏览过的历史路由信息，可以很好的记录历史查看过的界面。

    - 页面复杂度变大，开发难度较大

**前端路由是什么，解决了什么问题？**

- 前端路由：通过一套映射规则（url 路径->组件）让用户从一个视图导航到另一个视图。在保证只有一个 HTML 页面，且与用户交互时不刷新和跳转页面的同时，为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和 SEO 时均通过这个特殊的 url 来实现。
- 目标：改变 URL 却不引起页面刷新；可以监听到 URL 的变化。

**前端路由实现的原理**：

- **hash 模式**

  - hash 就是指 URL 后的 ## 号以及后面的字符，比如说 "[www.baidu.com/#hashhash](https://link.juejin.cn/?target=http%3A%2F%2Fwww.baidu.com%2F%23hashhash)" ，其中 "#hashhash" 就是我们期望的 hash 值。

  - hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对服务器端完全无用，因此，改变 hash 值不会刷新页面。

  - 通过 hashchange 事件监听 URL 的变化。

    - 通过浏览器前进后退改变 URL
    - 通过`<a>`标签改变 URL
    - 通过 window.location 改变 URL

  - 每一次改变 hash，都会在浏览器的访问历史中增加一个记录

  - hash 模式下，仅 hash 符号之前的内容会被包含在请求中，对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

  - API

    ```js
    window.location.hash = 'hash字符串' // 用于设置 hash 值

    let hash = window.location.hash // 获取当前 hash 值

    // 监听hash变化，点击浏览器的前进后退会触发
    window.addEventListener(
      'hashchange',
      function (event) {
        let newURL = event.newURL // hash 改变后的新 url
        let oldURL = event.oldURL // hash 改变前的旧 url
      },
      false
    )
    ```

```js
// HashRouter.js
class HashRouter {
    constructor() {
        this.routers = {};
        window.addEventListener('hashchange', this.load.bind(this), false);
    }
    register(hash, cb = function () {}) {
        this.routers[hash] = cb;
    }
    registerIndex(cb = function () {}) {
        this.routers['index'] = cb;
    }
    registerNotFound(cb = function () {}) {
        this.routers['404'] = cb;
    }
    registerError(cb = function () {}) {
        this.routers['error'] = cb;
    }
    load() {
        let hash = location.hash.slice(1);
        let handler;
        if (!hash) {
            handler = this.routers['index'];
        } else if (!this.routers.hasOwnProperty(hash)) {
            handler = this.routers['404'];
        } else {
            handler = this.routers[hash];
        }
        try {
            handler.call(this);
        } catch (e) {
            this.routers['error'].call(this, e);
        }
    }
}

// HashRouter.html
<body>
    <div id="nav">
        <a href="#/page1">page1</a>
        <a href="#/page2">page2</a>
        <a href="#/page3">page3</a>
    </div>
    <div id="container"></div>

    <script src="./HashRouter.js"></script>
    <script>
        let router = new HashRouter();
				let container = document.getElementById('container');
        router.registerIndex(() => container.innerHTML = '首页');
        router.register('/page1', () => container.innerHTML = 'page1');
        router.register('/page2', () => container.innerHTML = 'page2');
        router.register('/page3', () => {
            throw new Error('抛出一个异常')
        });
        router.registerNotFound(() => container.innerHTML = '页面未找到');
        router.registerError((e) => container.innerHTML = '页面异常<br>错误消息：' + e.message);
        router.load();
    </script>
</body>
```

- **history 模式**

  - history 提供了 pushState 和 replaceState 两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新。

  - popstate 事件

    - 通过浏览器前进后退改变 URL 时会触发
    - 通过 pushState/replaceState 或`<a>`标签改变 URL **不会**触发 popstate 事件。
      - 但我们可以拦截 pushState/replaceState 的调用和`<a>`标签的点击事件来检测 URL 变化
    - 通过 js 调用 history 的 back，go，forward 方法会触发

  - 在使用 `history` 模式时，需要**通过服务端来允许地址可访问**，如果没有设置，就很容易导致出现 `404` 的局面。

  - API

    ```js
    history.go(-1);       // 后退一页
    history.go(2);        // 前进两页
    history.forward();     // 前进一页
    history.back();      // 后退一页
    history.pushState();         // 添加新的状态到历史状态栈
    history.replaceState();      // 用新的状态代替当前状态
    history.state                // 返回当前状态对象

    history.pushState() 和 history.replaceState() 均接收三个参数（state, title, url）
        state：合法的 Javascript 对象，可以用在 popstate 事件中
        title：现在大多浏览器忽略这个参数，可以直接用 null 代替
        url：任意有效的 URL，用于更新浏览器的地址栏
    history.pushState() 和 history.replaceState() 的区别在于：
    		history.pushState() 在保留现有历史记录的同时，将 url 加入到历史记录中。
    		history.replaceState() 会将历史记录中的当前页面历史替换为 url。

    ```

```js
// HistoryRouter.js
class HistoryRouter {
    constructor() {
        this.routers = {};
        this.listenPopState();
        this.listenLink();
    }
    register(path, cb = function () {}) {
        this.routers[path] = cb;
    }
    registerIndex(cb = function () {}) {
        this.routers['/'] = cb;
    }
    registerNotFound(cb = function () {}) {
        this.routers['404'] = cb;
    }
    registerError(cb = function () {}) {
        this.routers['error'] = cb;
    }
    assign(path) {
        history.pushState({
            path
        }, null, path);
        this.dealPathHandler(path)
    }
    replace(path) {
        history.replaceState({
            path
        }, null, path);
        this.dealPathHandler(path)
    }
    dealPathHandler(path) {
        let handler;
        if (!this.routers.hasOwnProperty(path)) {
            handler = this.routers['404'];
        } else {
            handler = this.routers[path];
        }
        try {
            handler.call(this);
        } catch (e) {
            this.routers['error'].call(this, e);
        }
    }
    load() {
        let path = location.pathname;
        this.dealPathHandler(path)
    }
    listenPopState() {
        window.addEventListener('popstate', (e) => {
            let state = e.state || {},
                path = state.path || '';
            this.dealPathHandler(path)
        }, false)
    }
    listenLink() {
        window.addEventListener('click', (e) => {
            let dom = e.target;
            if (dom.tagName.toUpperCase() === 'A' && dom.getAttribute('href')) {
                // e.preventDefault()
                this.assign(dom.getAttribute('href'));
            }
        }, false)
    }
}

// HistoryRouter.html
<body>
    <div id="nav">
        <a href="/page1">page1</a>
        <a href="/page2">page2</a>
        <a href="/page3">page3</a>
        <a href="/page4">page4</a>
        <button id="btn">page2</button>
    </div>
    <div id="container">
    </div>

    <script src="./HistoryRouter.js"></script>
    <script>
        let router = new HistoryRouter();
        let container = document.getElementById('container');
        router.registerIndex(() => container.innerHTML = '首页');
        router.register('/page1', () => container.innerHTML = 'page1');
        router.register('/page2', () => container.innerHTML = 'page2');
        router.register('/page3', () => {
            throw new Error('抛出一个异常')
        });
        router.registerNotFound(() => container.innerHTML = '页面未找到');
        router.registerError((e) => container.innerHTML = '页面异常<br>错误消息：' + e.message);
        document.getElementById('btn').onclick = () => router.assign('/page2')
        router.load();
    </script>
</body>
```

- **模式对比**
  - `pushState()`设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改#后面的部分
  - `pushState()`设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发记录添加到栈中
  - `pushState()`通过`stateObject`参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串
  - `pushState()` 可额外设置 `title` 属性供后续使用。
  - `hash` 模式下，仅 hash 符号之前的内容会被包含在请求中，后端来即使没有做到对路由的全覆盖，也不会返回 404 错误；`history` 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致。
- 使用场景
  - 当需要兼容低版本的浏览器时，建议使用 hash 模式。
  - hash 模式下 url 会带有#，当你希望 url 更优雅时，可以使用 history 模式。
  - 当需要添加任意类型数据到记录时，可以使用 history 模式。
  - 当使用 history 模式时，需要注意在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

### 7.2 VueRouter 基本用法

- 从 vue-router 导入 VueRouter
- Vue.use(VueRouter)
- 创建 VueRouter 实例，配置，导出实例
- 挂载到根组件上
- 在 App.js 中使用 router-link 和 router-view

```js
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),  // 路由懒加载
    },
	]
})

export default router

new Vue({
  router
  ...
})

<template>
  <div id="app">
    <div class="nav">
       <router-link to="/home">Home</router-link>
			 <router-link to="/home">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
```

**router-link**：Vue-Router 的内置组件，在具有路由功能的应用中作为声明式的导航使用。有 8 个 props。

- `to`：必填，表示目标路由的链接。当被点击后，内部会立刻把`to`的值传到`router.push()`，所以这个值可以是一个字符串或者是描述目标位置的对象。
- `replace`：默认值为 false
- `append`：设置 append 属性后，则在当前 (相对) 路径前添加基路径。
- `tag`：让`<router-link>`渲染成`tag`设置的标签
- `active-class`：默认值为`router-link-active`,设置链接激活时使用的 CSS 类名。
- `exact-active-class`：默认值为`router-link-exact-active`,设置链接被精确匹配的时候应该激活的 class。
- `exact`：是否精确匹配，默认为 false。
- `event`：声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组，默认是`click`。

**route 和 router 的区别**：

- route 是“路由信息对象”，提供了一系列路由的属性，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。
- router 是“路由实例对象”，提供一系列操作路由的方法，包括路由的跳转方法、钩子函数等。

**嵌套路由**：

- children 定义子路由，在父路由组件上要定义`<router-view/>`出口

### 7.3 VueRouter 原理

- 创建 VueRouter 类
  - constructor
    - mode
    - routes,routesMap
    - history
  - createMap：将 routes 转化为 path-component
  - init：判断 mode 是 hash 还是 history，设置监听
    - hash：hashchange
    - history：popstate
- 创建 install 方法
  - 添加混入，在 beforeCreate 中定义\_root、\_router，$router，$route
  - 创建 router-view 组件和 router-link 组件
  - 利用了 Vue 提供的 API：defineReactive，使得 this.\_router.history 对象得到监听

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  },
}).$mount('#app')


// App.vue
<template>
  <div id="app">
    <div id='nav'>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>


// router/index.js
import Vue from 'vue'
import VueRouter from './myVueRouter'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router


// router/myVueRouter.js
class HistoryRoute {
  constructor() {
    this.current = null
  }
}

class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.routesMap = this.createMap(this.routes)
    this.history = new HistoryRoute()
    this.init()
  }

  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component
      return pre
    }, {})
  }

  init() {
    if (this.mode === 'hash') {
      // 先判断用户打开时有没有hash值，没有的话跳转到#/
      location.hash ? '' : (location.hash = '/')
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      location.pathname ? '' : (location.pathname = '/')
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }
}

let Vue = null
VueRouter.install = function (v) {
  Vue = v
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        // 如果是根组件
        this._root = this //把当前组件实例挂载到_root上
        this._router = this.$options.router
        Vue.util.defineReactive(this, 'xxx', this._router.history)
      } else {
        //如果是子组件
        this._root = this.$parent && this.$parent._root
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router
        },
      })
      Object.defineProperty(this, '$route', {
        get() {
          return this._root._router.history.current
        },
      })
    },
  })

  Vue.component('router-link', {
    props: {
      to: String,
    },
    render(h) {
      let mode = this._self._root._router.mode
      let to = mode === 'hash' ? '#' + this.to : this.to
      return h('a', { attrs: { href: to } }, this.$slots.default)
    },
  })
  Vue.component('router-view', {
    render(h) {
      let current = this._self._root._router.history.current
      let routeMap = this._self._root._router.routesMap
      return h(routeMap[current])
    },
  })
}

export default VueRouter

```

<img src="\imgs\image-20200817215653874.png" alt="image-20200817215653874" style="zoom:80%;" />

### 7.4 导航守卫

**概念**：

- 导航守卫就是在路由跳转过程中的一些钩子函数，通过钩子函数在不同时段可以做不同的事。
- 导航守卫都是在 Vue 实例生命周期钩子函数之前执行的。

- 分类：全局守卫，路由守卫，组件守卫。

**1）全局守卫**：

```js
// 1. 全局前置守卫，在路由跳转前，它在 每次导航 时都会触发。
router.beforeEach((to, from, next) => {
	next()
})

- `to` 代表要进入的路由对象
- `from` 代表离开的路由对象
- `next` 是一个必须要执行的函数，否则不能进入路由**(页面空白)**
  - next()： 执行下一个钩子函数
    - next(false)：取消进入路由，url地址重置为from路由地址(也就是将要离开的路由地址)；
    - next('/')或next({path: '/'})： 跳转到一个不同的地址;
    - next(error)： 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`]注册过											的回调。


// 2. 全局解析守卫，在路由跳转前，所有 组件守卫 和 异步路由组件 被解析之后触发，它同样在 每次导航 时都会触发。
router.beforeResolve((to, from, next) => {
  next();
})

// 3. 全局后置守卫，在路由跳转完成后，组件守卫之前。它同样在 每次导航 时都会触发。 不接受next的参数
router.afterEach((to, from) => {
  // ...
})
```

**2）路由守卫**：

```javascript
// 1. 在路由配置上定义 beforeEnter 守卫，此守卫只在进入路由时触发
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

**3）组件守卫**：

```javascript
const Foo = {
  template: `...`,
  // 1. 路由进入组件之前调用，该守卫内访问不到组件的实例，也就是 this 为 undefined，也就是他在 beforeCreate 生命周期前触发。
  beforeRouteEnter(to, from, next) {},
  // 2. 在当前路由改变，但是该组件被复用时调用，可以访问组件实例 this
  //    可以在这里监听路由参数的变化
  beforeRouteUpdate(to, from) {},
  // 3. 导航离开该组件的对应路由时调用，可以访问组件实例 this
  //    比较常用：清除当前组件中的定时器、提示用户保存
  beforeRouteLeave(to, from) {}
}
```

**完整的导航解析流程**：

1. 导航被触发
2. 在将要离开的路由组件中调用**beforeRouteLeave**
3. 调用全局前置守卫**beforeEach**
4. 在重用的组件里调用 **beforeRouteUpdate (2.2+)**
5. 在路由配置里调用 **beforeEnter**
6. 解析异步路由组件
7. 在将要进入的路由组件中调用**beforeRouteEnter**
8. 调用全局解析守卫**beforeResolve(2.5+)**
9. 导航被确认
10. 调用全局后置钩子**afterEach**
11. 触发 DOM 更新
12. 执行**beforeRouteEnter**的 **next **回调函数

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f72fd5c28a54767b1892ebf9c307653~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="未命名文件.png" style="zoom:80%;" />

### 7.5 路由跳转方法

**1）标签导航： router-link**

```html
<!-- 不传参 -->
<router-link to="user">点击验证动画效果</router-link>

<!-- 传参 -->
<router-link :to="'/user/' + this.id"><router-link /></router-link>
```

**2）编程式导航： this.$router.方法**

基于 JS 的 this.$router 下的方法实现路由跳转，相当于把 router-link 的规则转移到 JS 中。

- `this.$router.push({path:'/user',query:{id:100}})`

- `this.$router.replace({path:'/user'})`

- `this.$router.go(n)`

- `this.$router.forward()`

- `this.$router.back() `

**三种 vue 路由跳转传参方式**

**1.配置动态路由**

- 页面刷新，参数不会消失
- URl 路径会显示传递的参数

```js
// 1. 路由配置
{
    path:	'/home/:id',
    name:'Home',
    component:Home
}

// 2. 跳转页面传参
var id = 1;
this.$router.push(`/home/${id}`)			// 字符串
this.$router.push({path:`/home/${id}`})	// 对象

//3. 跳转后获取参数
this.$route.params.id
```

**2.query 传参**

- 页面刷新，参数不会消失
- URl 路径会显示传递的参数
- 通过路由属性中的 path 来匹配路由

```js
// 1. 路由配置
{
    path:	'/home',
    name:'Home',
    component:Home
}

// 2. 跳转页面传参
this.$router.push({  // 变成 /user?id=1
    path:'/home',
    query:{
        id:1
    }
})

//3. 跳转后获取参数
this.$route.query.id
```

**3.params 传参**

- 页面刷新，参数会消失
- URl 路径不会显示传递的参数
- 通过路由属性中的 name 来匹配路由

```js
// 1. 路由配置
{
    path:'/home',
    name:'Home',
    component:Home
}

// 2. 跳转页面传参
this.$router.push({
    name:'Home',
    params:{
        id:1
    }
})

//3. 跳转后获取参数
this.$route.params.id
```

### 7.6 动态路由

将某种模式匹配到的所有路由，全部映射到同个组件。

例如，有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”来达到这个效果：

```js
const User = {
  template: '<div>User</div>'
}
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    // 像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由
    { path: '/user/:id', component: User }
  ]
})
```

**鉴权-动态路由**

1. 路由跳转 先判断是否登录 未登录只能访问白名单页面，访问其他页面全部重定向到登录页面
2. 登录行为触发，获取动态路由，递归解析动态路由信息，并且 addRouter，同时存储到 Vuex 并且记录获取路由的状态
3. 跳转页面不会获取动态路由，刷新页面重新获取动态路由

**动态加载路由**

使用 Router 的实例方法 addRoutes 来实现动态加载路由，一般用来实现菜单权限。

## 8. Vue 渲染

<img src="https://upload-images.jianshu.io/upload_images/13429147-32832d6b08b108c4.jpg?imageMogr2/auto-orient/strip|imageView2/2/format/webp" alt="img" style="zoom: 50%;" />

### 8.1 虚拟 DOM

**来源**：由于在浏览器中操作 DOM 是很昂贵的，频繁的操作 DOM 会产生一定的性能问题。Vue2 的 Virtual DOM 借鉴了开源库 snabbdom 的实现，Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

**虚拟 DOM **：一个普通的 JavaScript 对象，包含了 `tag`、`props`、`children` 三个属性。

**优点**：

- 提高性能，**不是说不操作 DOM，而是减少操作 DOM 的次数，减少回流和重绘**。虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 diff 算法避免了没有必要的 dom 操作。
- 无需手动操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
- **抽象了原本的渲染过程，实现了跨平台的能力**，不局限于浏览器的 DOM，也可以是服务端渲染 SSR、安卓和 IOS 的原生组件、小程序。

**缺点**：

- 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。

**虚拟 DOM 算法的三个步骤**：

- 用 `JS` 对象模拟 `DOM` 树 — `element.js`
- 比较两棵虚拟 `DOM` 树的差异 — `diff.js`
- 将两个虚拟 `DOM` 对象的差异应用到真正的 `DOM` 树 — `patch.js`

**如果只有一个 DOM 操作，直接操作真实 DOM 性能是否更优？**

- 可以直接操作 DOM，但获取了性能的同时失去了代码的可维护性和后期开发效率。Vue 是采用声明式渲染的，如果单独用 js 操作某个真实 DOM，该操作不能被后期检测到。而且采取虚拟 DOM 的本质就是实现了跨平台的能力，比如服务端渲染 SSR、小程序等，顺带做一些能做的优化，单就一个操作讨论运行性能没有意义，在 VUE 的框架下就遵循 VUE 的范式；小范围直接操作 DOM 是允许的，但如果要跨平台渲染，就要注意了。

### 8.2 VNode

**`Virtual DOM`关键属性**

- `tag` ：这个`vnode`的标签属性
- `data` ：包含了最后渲染成真实`dom`节点后，节点上的`class`，`attribute`，`style`以及绑定的事件
- `children` ：`vnode`的子节点
- `text` ：文本属性
- `elm` ：这个`vnode`对应的真实`dom`节点
- `key` ：`vnode`的标记，在`diff`过程中可以提高`diff`的效率

### 8.3 Diff

Diff 算法：用来比较同层级的新旧节点差异的高效算法。

**同层对比**：新旧虚拟 DOM 对比的时候，Diff 算法比较只会在同层级进行，不会跨层级比较。 所以 Diff 算法是深度优先算法，时间复杂度为`O(n)`。_如果两颗树完全对比，老树的每一个节点都去遍历新树的节点，直到找到新树对应的节点，这个流程就是 `O(n^2)`，再紧接着找到不同之后，再计算最短修改距离然后修改节点，时间复杂度是 `O(n^3)`。_

**对比流程**：

- 当数据改变时，会触发`setter`，并且通过`dep.notify`去通知所有订阅者 watcher，watcher 会调用 patch()函数比较新旧节点，更新相应的视图。
- patch(oldVnode, newVnode) ：对比当前同层的虚拟节点是否为同一种类型的标签

  - sameVnode(oldVnode, newVnode) ：判断是否为同一类型节点
    - key 是否相同
    - 标签名是否相同
    - 是否都为注释节点
    - 是否都定义了 data
    - 当标签为 input 时，type 是否相同
  - **是：继续执行 patchVnode 函数，进行深层对比**
  - 否：没必要对比了，直接整个节点替换成新虚拟节点

- patchVnode(oldVnode, newVnode)：更新旧节点
  - 找到对应的`真实DOM`，称为`el`
  - 判断`newVnode`和`oldVnode`是否指向同一个对象，如果是，直接`return`
  - 如果都有文本节点并且不相等，那么将`el`的文本节点设置为`newVnode`的文本节点
  - 如果`oldVnode`有子节点而`newVnode`没有，则删除`el`的子节点
  - 如果`oldVnode`没有子节点而`newVnode`有，则将`newVnode`的子节点真实化之后添加到`el`
  - **如果两者都有子节点，则执行`updateChildren`函数，比较子节点**
- updateChildren(parentElm, oldCh, newCh)：比较子节点
  - 首先给 `oldCh`和 `newCh` 分别分配一个 `startIndex` 和 `endIndex` 来作为遍历的索引，当`oldCh` 或者 `newCh` 遍历完后(遍历完的条件就是 `oldCh` 或者 `newCh` 的 `startIndex >= endIndex` )，就停止`oldCh` 和 `newCh` 的 `diff` 过程。
  - 比较 oldCh 和 newCh 的首尾节点是否有相同的节点，判断是否是相同的节点，然后进行增删改移操作。
    - 旧头与新头
    - 旧头与新尾
    - 旧尾与新头
    - 旧尾与新尾
  - 如果以上逻辑都匹配不到，再把所有`oldVnode`的 `key` 做一个映射到`index`的 map，然后用 `newVnode` 的 `key` 去找出在旧节点中可以复用的位置。

**v-for 为什么要加 key？**

- 如果不使用 key，Vue 会使用就地复用策略，即尽量使用已经存在的 DOM 元素，直接在已有的 DOM 上进行复用修改。key 的作用主要是给 VNode 添加唯一标识，通过这个 key，diff 操作可以更准确、更快速。
- **更准确**：同级比较，在 sameVnode 函数 a.key === b.key 对比中可以避免就地复用的情况，所以会更加准确。
- **更快速**：子节点比较，利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快。

### 8.4 模版编译渲染（compile）

compile 的作用是解析模板，生成渲染模板的 render。

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/9/16c747ba0086422b~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="公众号" style="zoom:80%;" />

```
_c('div', [_c('span'), _v(num)])
```

render 的作用是为了生成跟模板节点一一对应的 VNode

```
{
    tag: "div",
    children:[{
        tag: "span",
        text: undefined
    },{
        tag: undefined
        text: "111"
    }]
}
```

- 渲染到哪个根节点上：
  - 有 el 属性，直接获取根节点
  - 没有 el 属性，调用$mount 获取根节点
- 渲染哪个模板：

  - 有 render：优先执行 render 函数，render 优先级 > template

  - 无 render：
    - 有 template：拿 template 去解析成 render 函数的所需的格式，并调用 render 函数渲染
    - 无 template：拿 el 根节点的 outerHTML 去解析成 render 函数的所需的格式，并调用 render 函数渲染

**渲染的方式：无论什么情况，最后都统一是要使用 render 函数渲染**

**步骤**：

- $mount 函数

  - initMixin(Vue)，把$mount 函数挂在 Vue 的原型上

  - $mount 函数重点在于判断各属性的有无情况（render、template）
  - 然后把 template 传入 compileToFunctions 函数，生成一个 render 函数，把生成的 render 函数赋值到 options 的 render 属性上
  - 最后返回 Vue 实例
  - \_init(options)，如果 vm.$options.el存在，调用vm.$mount(vm.$options.el)

- compileToFunctions 函数

  - parse 函数：接收 template 原始模板，按照模板的节点和数据生成对应的 AST
  - optimize 函数：递归遍历每一个 AST 节点，标记静态节点（没有绑定任何动态数据），这样就知道哪部分不会变化，于是在页面需要更新时，减少去比对这部分 DOM。
  - generate 函数：把前两步生成完善的 AST 组装成 render 字符串
  - 使用 with 改变 this 指向，返回生成的 render 函数

  <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adf9f56dd2684042a8b4540275d1df0d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="在这里插入图片描述" style="zoom:80%;" />

- 运行 render 函数，获得虚拟 DOM

  - \_c：创建元素节点虚拟 DOM
  - \_v：创建文本节点虚拟 DOM

- 当数据改变时，会触发`setter`，并且通过`dep.notify`去通知所有订阅者 watcher，watcher 会调用 patch()函数比较新旧节点，然后根据差异进行更新渲染，这里用到了 diff 算法，最终将虚拟 DOM 转真实 DOM 并渲染。

![img](\imgs\vue-render.jpg)

## 9. Vue 事件绑定

- 原生事件绑定是通过 addEventListener 绑定给真实元素的。

- 组件事件绑定是通过 Vue 自定义的$on 实现的。如果要在组件上使用原生事件，需要加`.native `修饰符，这样就相当于在父组件中把子组件当做普通 html 标签，然后加上原生事件。
  - $on、$emit 是基于发布订阅模式的，维护一个事件中心，on 的时候将事件按名称存在事件中心里，称之为订阅者，然后 emit 将对应的事件进行发布，去执行事件中心里的对应的监听器。

## 10. Vue.nextTick

**作用**：可以让我们在下次 `DOM` 更新循环结束之后执行延迟回调，用于获得更新后的 `DOM`

**原因**：Vue 中 DOM 更新是一个异步的过程。当数据变化时 Vue 不会立刻更新 DOM，而是开启⼀个队列，把组件更新函数保存在队列中，在同⼀事件循环中发生的所有数据变更会异步的批量更新。这⼀策略导致我们对数据的修改不会立刻体现在 DOM 上，此时如果想要获取更新后的 DOM 状态，就需要使用 nextTick。

**原理**：注册异步任务来对任务进行处理，nextTick 主要使用了宏任务和微任务的原理，根据执行环境降级判断 `Promise.then` 、`MutationObserver` 、`setImmediate`、`setTimeout` 这四种方法，如果支持的话，便会使用该方法调用 `flushCallbacks` 函数。

**应用场景**：需要在视图更新之后，基于新的视图进行操作。

- created()钩子函数进行的 DOM 操作一定要放在 Vue.nextTick()的回调函数中
- 更改数据后当你想立即使用 js 操作新的视图的时候需要使用它

注意 mounted 不会承诺所有的子组件也都一起被挂载。如果希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted

```js
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the entire view has been rendered
  })
}
```

## 11. Composition API

### 11.1 Option API

**Option API**：

- 在 Vue2 中常常会需要在特定的区域（data，methods，watch，computed...）编写负责相同功能的代码。
- 优点：少量逻辑代码时非常便于阅读和理解。

- 缺点：随着业务复杂度越来越高，代码量会不断的加大，但由于相关业务的代码需要遵循 option 的配置写到特定的区域，导致后续维护非常的复杂，代码可复用性也不高。
- 适用场景：小型项目、或者业务逻辑比较简单的项目

**Composition API**：

- Vue3 使用基于函数组合的 API，把代码的逻辑抽离出来封装，并把封装的内容直接引用到生命周期里面。
- 优点：逻辑的抽离，代码的复用，便于后期维护。
- 适用场景：中大型项目、或者逻辑比较复杂的项目

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c2a22b42d42458e87d9d1c0e13bacfd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="04.png" style="zoom:50%;" />

### 11.2 基本用法

- 抽离逻辑代码到一个函数，函数的命名约定为 `useXxx` 格式（React hooks 也是）；
- 在 `setup` 中引用 `useXxx` 函数。

```js
// useSum.js
import { ref, computed } from 'vue'
export default function useSum(){
    let a = ref(1);
    let b = computed(() => {
        return a.value * 2
    })
    const handleSum = () => {
        a.value = a.value + b.value
    }
    return {
        a,
        b,
        handleSum
    }
}

// App.vue
<template>
  <div>
    <h1>{{ a }} {{ b }}</h1>
    <button @click="handleSum">hanleSum</button>
  </div>
</template>

<script>
import useSum from "./composables/useSum";
export default {
  name: "App",
  setup() {
    const { a, b, handleSum } = useSum();
    return {
      a,
      b,
      handleSum,
    };
  },
};
</script>

// main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 11.3 与 Vue.mixin 区别

- 当一个组件混入大量不同的 mixins 的时候，会存在两个非常明显的问题：命名冲突和数据来源不清晰。
- 用 hook 函数在组件中使用，即使去编写更多的 hook 函数，也不会出现命名冲突的问题，而且整个数据来源清晰。

### 11.4 与 React Hooks 区别

Compositon API 设计思想借鉴了 React Hooks

- `Composition API`声明在`setup`函数内，一次组件实例化只调用一次`setup`；而`React Hook`每次重渲染都需要调用`Hook`，使得`React`的`GC`比`Vue`更有压力，性能也相对于`Vue`来说也较慢。
- `Compositon API`的调用不需要顾虑调用顺序，也可以在循环、条件、嵌套函数中使用；而`React Hook`是根据`useState`调用的顺序来确定下一次重渲染时的`state`是来源于哪个`useState`，所以不能在循环、条件、嵌套函数中调用`Hook`，必须确保总是在你的`React`函数的顶层调用`Hook`，`useEffect`、`useMemo`等函数必须手动确定依赖关系。

## 12. Vue2.0 与 Vue3.0

### 12.1 区别

- 挂载方式

  - vue2 是通过`new Vue`创建实例，通过参数 el 确定挂载的 dom 进行挂载，也可以不传 el 直接使用`app.$mount('#app')`。
  - vue3 可以通过解构的方式拿到`createApp`方法，通过该方法得到 app，调用`mount`进行挂载。这也是 vue3`函数式编程`的设计理念，这种设计方式可以按需引入资源，更好的利用 tree-shaking（去除没用到的代码）来减小打包体积。

- Composition API（核心）

  - setup 函数是一个新的组件选项，作为组件内使用 Composition API 的入口点。setup 返回一个对象。则对象的所有属性(**它是响应式的数据**)都可以直接在模板中使用。

  - 创建组件实例，然后初始化 props，紧接着调用`setup`函数，它会在`beforeCreate`钩子之前调用。

  - ref：可传入任意类型的值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性`.value`,改变值的时候必须使用其 value 属性

    reactive：接受一个普通对象然后返回该普通对象的响应式代理。

- 生命周期函数

  - vue3 中移除了 beforeCreate 和 created，增加了`setup`函数。
  - 销毁生命周期钩子改名。
  - 其他周期函数基本就是命名上在 vue2.x 的基础上加上`on`前缀，以驼峰命名方式命名，要写到 setup 函数里面。
  - 还增加了 onRenderTracked 和 onRenderTriggered 调试钩子。

- 数据响应方式

  - 使用：vue2 直接将数据放到了 data 中，通过 this.xx = xx 来改变。原理：vue2 是利用`object.defineProperty`和观察者模式来实现。
  - 使用：vue3 提供了`ref`和`reactive`，ref 定义的变量通过`变量.value = xxx `改变，reactive 定义的变量通过 obj.xxx = xxx 即可。原理：vue3 是利用`Proxy`和`Reflect`来实现，最大的优势就是 vue3 可以监听到数组、对象新增/删除以及多层嵌套数据结构的响应。基于 proxy 监听就是所谓的 lazy by default，就是只要你用到了才会监听，可以理解"按需监听"，官方给出的诠释是**：速度加倍，同时内存占用还减半**。

- 渲染函数 API

  - Vue2 中 h 函数作为参数传递给 render 函数，vue3 中 h 函数全局导入

- 模板语法变化 slot 具名插槽语法，自定义指令 v-model 升级

### 12.2 优缺点

**Vue3.0 优点**：

- 有更好的代码组织能力，有更好的逻辑抽离能力

- 将 Vue 内部的绝大部分 api 对外暴露，使 Vue 具备开发大型项目的能力，例如 compile 编译 api 等
- webpack 的 treeshaking（它可以在打包时忽略没有用到的代码）支持度友好
- 使用 Proxy 进行响应式变量定义，性能提高 1.2~2 倍
- 可在 Vue2.0 中单独使用 composition-api 插件，或者直接用它开发插件
- ssr 快了 2~3 倍

**Vue3.0 缺点**：

- 兼容性：vue3 不再支持 ie11；vue2 不支持 ie8 及以下，部分兼容 ie9 ，完全兼容 10 以上， 因为 vue 的响应式原理是基于 es5 的`Object.defineProperty()`，而这个方法不支持 ie8 及以下。。
- 对于习惯了 vue2.0 开发模式的开发者来说，增加了心智负担，对开发者代码组织能力有体验

### 12.3 升级

**Vue2 到 Vue3 的升级**：

- 利用 gogocode 把 Vue2 的代码升级到 Vue3
- 第三方组件库升级
- 其他依赖升级
- 根据提示修改部分不兼容的代码

## 14. vue 组件继承

**执行顺序**：Vue.extend > Vue.mixin > extends > mixins > 本身的钩子函数。（并且会被后面的覆盖）

|    类型    | 描述                                                                                                      |
| :--------: | --------------------------------------------------------------------------------------------------------- |
| Vue.extend | Vue 构造器创建（继承 Vue 的）一个子类，可以通过 new 来新建一个实例，挂载到一个元素上。                    |
| Vue.mixin  | （对 Vue 类的 options 进行混入）全局注册 mixin 之后创建的每个 Vue 实例都会有这些属性或方法。              |
|  extends   | `Array< Object>`对象数组类型，向 Vue 实例中混入多个组件，与组件中的对象和方法进行合并，可理解为**多继承** |
|   mixins   | `Object`                                                                                                  |

```js
const extend = {
  created() {
    console.log('extends created')
  }
}
const mixin1 = {
  created() {
    console.log('mixin1 created')
  }
}
const mixin2 = {
  created() {
    console.log('mixin2 created')
  }
}
export default {
  extends: extend,
  mixins: [mixin1, mixin2],
  name: 'app',
  created() {
    console.log('created')
  }
}
// extends created
// mixin1 created
// mixin2 created
// created
```

### 14.1 Vue.extend

使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

**具体使用**：根据类 new 一个实例，并挂载到一个元素上。

```html
<div id="mount-point"></div>
```

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

```html
<p>Walter White aka Heisenberg</p>
// 效果
```

### 14.2 Vue.mixin

全局注册一个 mixin 混入，注册之后创建的每个 Vue 实例都会有这些属性或方法。

```js
// 比如我们希望每一个Vue实例都有一个print方法，我们就可以这么做：
Vue.mixin({
  methods: {
    print() {
      console.log(`我是一个通过mixin注入的方法！`)
    }
  }
})
```

### 14.1 Mixins 高阶组件

Mixins（混入）：复用代码的主要方式。

可以混入多个，`Array< Object>`类型，其中的数组中的成员可以是不同类型的对象，可理解为**多继承**。

在混入后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。

当组件和混入对象含有同名选项时：

- 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
- 同名钩子函数将合并为一个数组，因此都将被调用。优先级：mixins > 本身的钩子函数

**使用场景**：在全局注册所有 vue 实例共享的 methods、filter 或者 hooks 等方法。

### 14.2 Extends

`Object | Function`类型。可理解为**单继承**。

**使用场景**：当我们不需要全局去混入一些配置，比如想要获得一个 component，可以使用 Vue.component()，也可以使用 Vue.extend()。

### 14.3 区别

[vue mixins和extends的妙用]: https://juejin.im/post/6844903537516740615

## 15. 动态组件和异步组件

### 15.1 动态组件

Vue.js 提供了一个特殊的元素 `<component> `用来动态地挂载不同的组件。_让多个组件使用同一个挂载点，并动态切换。_

#### keep-alive

keep-alive 是 vue 内置的组件，用 keep-alive 包裹组件时，会缓存不活动的组件实例，而不是销毁他们。主要用于保存组件状态或避免重复创建，避免重复渲染导致的性能问题。

**特点**：

- 它是一个抽象组件，自身不会渲染一个 dom 元素，也不会出现在组件的父组件链中。
- 当组件在 keep-alive 内被切换，组件的 activated 和 deactivated 这两个生命周期钩子函数会被执行。组件一旦被缓存，再次渲染就不会执行 created、mounted 生命周期钩子函数。
- 要求同时只有一个子组件被渲染。
- 不会在函数式组件中正常工作，因为它们没有缓存实例。

**常用的属性有**：

- include：设置会被缓存的组件。
- exclude：设置不会被缓存的组件。
- max：限制缓存组件的最大数量。

**keep-alive 相关的生命周期钩子函数**：

- activated： 进入页面时触发。（常用来实现每次进入页面的时候重新获取最新的数据）
- deactivated：退出页面时触发。

**动态组件**：

```html
<keep-alive :include="allowList" :exclude="noAllowList" :max="amount">
  <component :is="currentComponent"></component>
</keep-alive>
```

**路由组件**：

```html
<keep-alive :include="allowList" :exclude="noAllowList" :max="amount">
  <router-view></router-view>
</keep-alive>
```

**实现原理**：

组件通过插槽，获取第一个子节点。根据 include、exclude 判断是否需要缓存。通过组件的 key，判断是否命中缓存。利用 LRU 算法，更新缓存以及对应的 keys 数组，根据 max 控制缓存的最大组件数量。

**应用**：

跳转到详情页面时，需要保持列表页的滚动条的深度及筛选条件等，等返回的时候依然在这个位置，这样可以提高用户体验。

### 15.2 异步组件

**优点**：按需加载，提高首屏加载速度；具有缓存机制，无需多次加载。

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

## 16. 按需加载

1. **require**

   vue-router 配置路由，使用 vue 的异步组件技术，可以实现按需加载**。一个组件生成一个 js 文件**

   ```js
   {
       path: '/promisedemo',
       name: 'PromiseDemo',
       component: resolve => require(['../components/PromiseDemo'], resolve)
   }
   ```

2. **ES 的`import()`**

   推荐使用这种方式（需要 webpack > 2.4）

   - 下面 2 行代码，没有指定 webpack 中 Chunk 名（webpackChunkName），每个组件打包成一个 js 文件。

     ```js
     const ImportFuncDemo1 = () => import('../components/ImportFuncDemo1')
     const ImportFuncDemo2 = () => import('../components/ImportFuncDemo2')
     ```

   - 下面 2 行代码，指定了相同的 webpack 中 Chunk 名（webpackChunkName），会合并打包成一个 js 文件。

     ```js
     const ImportFuncDemo = () => import('../components/ImportFuncDemo1')
     const ImportFuncDemo = () => import('../components/ImportFuncDemo2')
     ```

3. **webpack 提供的`require.ensure()`**

   多个路由指定相同的 chunkName，会合并打包成一个 js 文件。

   ```js
   {
       path: '/promise',
       name: 'Promise',
       component: resolve => require.ensure([], () => resolve(require('../components/Promise')), 'demo')
   },
   {
        path: '/hello',
        name: 'Hello',
        component: resolve => require.ensure([], () => resolve(require('../components/Hello')), 'demo')
   }
   ```

## 17. Vue 错误处理机制

**1）errorHandler：全局错误处理函数**，组件的渲染和观察期间未捕获错误的处理函数。这个 error handler 可以作用到所有的 Vue 应用

```js
Vue.config.errorHandler = function (err, vm, info) {}
```

- `err`指代 error 对象
- `vm`指代 Vue 应用本身
- `info`是一个 Vue 特有的字符串

**2）warnHandler：捕获 Vue warning**。在生产环境是不起作用的。

```js
Vue.config.warnHandler = function (msg, vm, trace) {} // trace代表了组件树
```

**3）renderError**：不适用全局，只适用于非生产环境。

```js
const app = new Vue({
  el: '#app',
  renderError(h, err) {
    return h('pre', { style: { color: 'red' } }, err.stack)
  }
})
```

**4）errorCaptured**

**5）window.onerror (不仅仅针对 Vue)**：全局的异常处理函数，可以抓取所有的 JavaScript 异常。

## 18. Vue.use(plugin)

### 18.1 原理

**`Vue.use()` 方法**：

- 通过全局方法 `Vue.use()` 使用插件
- `Vue.use()` 方法至少传入一个参数，该参数类型必须是 Object 或 Function，如果是 Object 那么这个 Object 需要定义一个 install 方法，如果是 Function 那么这个函数就被当做 install 方法。在 `Vue.use()` 执行时 install 会默认执行，当 install 执行时第一个参数就是 Vue，其他参数是 `Vue.use()` 执行时传入的其他参数。
- `Vue.use()` 会自动阻止多次注册相同插件
- `Vue.use()` 需要在你调用 `new Vue()` 启动应用之前完成

**`Vue.use()` 源码**：

- 在全局 api Vue 上定义了 use 方法，接收一个 plugin 参数可以是 Function 也可以是 Object。
- 判断该插件是不是已经注册过，防止重复注册。
- 获取除第一个之外的其他参数，这些参数准备在调用 install 方法的时候传入，然后将 Vue 添加到 args 列表的最前面。
- 判断传入的第一个参数是 Object 还是 Function，执行那个对应的 install 方法，并将 args 作为参数传入。
- 将插件添加到 installedPlugins 中，保证相同的插件不会反复被注册。

```js
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}

// toArray方法：将类数组转成真正的数组
export function toArray(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
```

### 18.2 作用

`Vue.use()` 的注册本质上就是执行了一个 install 方法，install 里的内容由开发者自己定义。

在 install 里我们可以拿到 Vue ，那么和 Vue 相关的周边工作都可以考虑放在 `Vue.use()` 方法里。

```js
MyPlugin.install = function (Vue, options) {
  // 1.添加全局方法或 property
  Vue.myGlobalMethod = function () {}

  // 2.绑定指令、过滤器、全局组件
  Vue.directive('my-directive', {
    bind() {}
  })

  // 3.设置全局混入
  Vue.mixin({
    created: function () {}
  })

  // 4.添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {}
}
```

## 19. Mixin

**概念**：

- 将组件的公共逻辑或者配置提取出来，哪个组件需要用到时，直接将提取的这部分混入到组件内部即可。

**使用**：

- mixin 就是一个对象，包含 Vue 组件中的一些常见配置，如 data、methods、created 等等。

```js
// src/mixin/index.js
export const mixins = {
  data() {
    return {
      msg: "我是小猪课堂",
    };
  },
  computed: {},
  created() {
    console.log("我是mixin中的created生命周期函数");
  },
  mounted() {
    console.log("我是mixin中的mounted生命周期函数");
  },
  methods: {
    clickMe() {
      console.log("我是mixin中的点击事件");
    },
  },
};

// 局部混入
// src/App.vue
<template>
  <div id="app">
    <button @click="clickMe">点击我</button>
  </div>
</template>
<script>
import { mixins } from "./mixin/index";
export default {
  name: "App",
  mixins: [mixins],
  components: {},
  created(){
    console.log("组件调用minxi数据",this.msg);
  },
  mounted(){
    console.log("我是组件的mounted生命周期函数")
  }
};
</script>

// 全局混入
// src/main.js
import Vue from "vue";
import App from "./App.vue";
import { mixins } from "./mixin/index";
Vue.mixin(mixins);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

**规则**：

- mixin 中的生命周期函数会和组件的生命周期函数一起合并执行。生命周期函数合并后执行顺序：先执行 mixin 中的，后执行组件的。
- mixin 中的 data 数据、方法在组件中也可以直接使用。
- **不同组件中的 mixin 是相互独立的**，一个组件中改动了 mixin 中的数据，另一个引用了 mixin 的组件不会受影响。
- 当 mixin 中的 data 数据与组件中的 data 数据冲突时，组件中的 data 数据会覆盖 mixin 中数据。
- 当 mixin 中的方法与组件中的方法冲突时，实际调用的是组件中的方法。

**优点**：

- 提高代码复用性
- 无需传递状态
- 维护方便，只需要修改一个地方即可

**缺点**：

- 命名冲突
- 滥用的话后期很难维护
- 不好追溯源，排查问题稍显麻烦
- 不能轻易的重复代码

## 21. SSR 和 CSR

### 21.1 SSR

Server Side Rendering，服务器端渲染。

服务端把需要的组件或页面渲染成 HTML 字符串，再发给客户端，客户端只负责解析 HTML ，不需要去解析编译 js 操作 DOM**。数据拼接 HTML 字符串这件事放在服务端**

- **好处**：首屏渲染快、利于 SEO、可以生成缓存片段，生成静态化文件、节能（对比客户端渲染的耗电）、适合静态页面
- **坏处**：不利于网站交互、用户体验较差、频繁的服务器请求、前后端耦合

### 21.2 CSR

Client Side Rendering，客户端渲染。

服务端把渲染的静态文件发给客户端，客户端跑了脚本后生成相应 DOM，然后渲染给用户，数据注入部分是客服端做的**。数据拼接 HTML 字符串这件事放在客户端**

- **好处**： 利于网站交互、网络传输数据量小、减少了服务器压力、前后端分离、局部刷新
- **坏处**：首屏渲染慢、不利于 SEO

### 21.3 Vue-SSR

普通`vue`是在客户端把标签渲染成 HTML ； `ssr`是在服务器渲染成 HTML 字符串后返回。

`ssr`是`vue`的服务端渲染技术，`nuxt`是一个可以用来做`ssr`服务端渲染开发的框架。

缺点：开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。

## 22. 其他

### 22.1 scoped

1. 给 HTML 的 dom 节点添加一个不重复的 data 属性（例如: data-v-5558831a）来唯一标识这个 dom 元素
2. 在每句 css 选择器的末尾（编译后生成的 css 语句）加一个当前组件的 data 属性选择器（例如：[data-v-5558831a]）来私有化样式

### 22.2 Vue 的单向数据流

数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改（$emit）。

### 22.3 Vuex 页面刷新数据丢失怎么解决

需要做 vuex 数据持久化，一般使用本地存储的方案来保存数据，可以自己设计存储方案，也可以使用第三方插件。如使用 vuex-persist 插件，它就是为 Vuex 持久化存储而生的一个插件，不需要手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中。

### 22.4 Vuex 为什么要分模块并且加命名空间

**模块**：由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

**命名空间**：默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的，这样使得多个模块能够对同一 mutation 或 action 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

### 22.5 vue 中使用了哪些设计模式

- 工厂模式

  - 传入参数即可创建 Vue 实例
  - 虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode

- 单例模式

  - 整个程序有且仅有一个实例
  - vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉

- 发布-订阅模式

  - vue 事件机制

- 观察者模式

  - 响应式数据原理

- 装饰模式
  - @装饰器的用法
- 策略模式
  - 选项的合并策略

### 22.6 Vue 的性能优化

- 对象层级不要过深，否则性能就会差
- 不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if
- 大数据列表和表格性能优化-虚拟列表/虚拟表格
- 防止内部泄漏，组件销毁后把全局变量和事件销毁
- 图片懒加载、路由懒加载、第三方插件的按需引入
- 适当采用 keep-alive 缓存组件
- 防抖、节流运用
- 服务端渲染 SSR or 预渲染
