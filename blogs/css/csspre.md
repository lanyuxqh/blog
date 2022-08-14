---
title: CSS 预处理器
date: 2022-3-19
tags:
  - css
categories:
  - css
---

# CSS 预处理器

## 1、基本概念

**CSS 缺点**： CSS 是一门非程序式语言，没有变量、函数、作用域等概念，代码冗余、不易维护和扩展、没有很好的计算能力。

**CSS 预处理器**： 用一种专门的编程语言，进行 Web 页面样式设计，再通过编译器转化为正常的 CSS 文件，以供项目使用。

**原理**： 预处理器包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 css 文件。

**优点**： 为 CSS 增加一些**可编程**的特性，通过**变量**、**嵌套**、**简单的程序逻辑**、**计算**、**函数**等特性，通过**工程化**的手段让 CSS 的开发变得简单和可维护，提升开发效率。

**主流**： Sass、Less、Stylus。

**CSS 预处理器和后处理器**：

- **预处理器，**如：`sass`，`less`，`stylus`，为`css`增加一些编程特性，无需考虑浏览器的兼容问题，可以在`CSS`中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让`css`更加的简洁，增加适应性以及可读性，可维护性等。

- **后处理器，** 如： `postCss`，通常是在完成的样式表中根据`css`规范处理`css`，让其更加有效。目前最常做的是给`css`属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

## 2、Sass

Sass 是最早出现的 CSS 预处理语言，有着比 Less 更强大的功能。采用 Ruby 语言编写。

### 2.1 基本用法

**注释**： 标准的 CSS 注释 /_ comment _/ ，会保留到编译后的文件；单行注释 // comment，只保留在 SASS 源文件中，编译后被省略；在/\*后面加一个感叹号，表示这是"重要注释"，即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

**变量**： $ 声明变量，#{} 用于变量插值 #{$var}。

**嵌套**： 选择器嵌套；`&` 表示父选择器，常用于给现有选择器添加伪类或生成重复类名；属性也可以嵌套，比如 border-color 属性（border 后面必须加上冒号）。

**混合**： 使用@mixin 命令，定义一个代码块，使用@include 命令，调用这个 mixin；可以指定参数和缺省值，使用的时候根据需要加入参数。

**运算**： 允许在代码中使用算式，除法需要添加括号，运算要注意单位。

**继承**： 使用@extend 命令，一个选择器继承另一个选择器，会继承包含该选择器的所有样式。

**导入**： @import 命令，用来插入外部文件；sass 局部文件的文件名以下划线 \_ 开头，sass 在编译时就不会将这个文件编译输出为 css，引入局部文件时，可以省略文件开头的下划线和`.scss`后缀。

**颜色函数**： rgb(_red_, _green_, _blue_)、rgba(_red_, _green_, _blue_, _alpha_)；hsl(_hue_, _saturation_, _lightness_)、hsla(_hue_, _saturation_, _lightness_, _alpha_)；adjust-hue(_$color_,_hue_)、saturate(_$color_,_saturation_)/desaturate(_$color_,_saturation_)、lighten(_$color_,_lightness_)/darken(_$color_,_lightness_)、transparentize(_$color_,_alpha_)/opacify(_$color_,_alpha_)

**数字函数**： abs(_number_)、ceil(_number_)、floor(_number_)、round(_number_)、max(_number..._)、min(_number..._)、percentage(_number_)、random()

**字符串函数**： to-lower-case(_string_)、to-upper-case(_string_)、str-length(_string_)、str-index(_string_, _substring_)、str-insert(_string_, _insert_, _index_)

**列表函数**： length(_list_)、nth(_list_, _n_)、index(_list_, _value_)、append(_list_, _value_, [*separator*])、join(_list1_, _list2_, [*separator, bracketed*])、zip(_lists_)

**字典函数**： length(_map_)、map-get(_map_, _key_)、map-has-key(_map_, _key_)、map-keys(_map_)、map-values(_map_)、map-merge(_map1_, _map2_)、map-remove(_map_, _keys..._)

**自定义函数**： @function 名称(参数 1,参数 2,...) { ... @return ... }，@warn，@error

**条件语句**： @if、@else if、@else

**循环语句**： @for，@for $i from 1 through/to 10，through 会包含结束值，to 不会；@while，while $i > 0；@each，@each $item in $list。

### 2.2 Scss

Sass 最初版本采用的是严格缩进的风格（不带大括号和分号），这一语法也导致一开始 Sass 并不太为开发者所接受。

Sass 从 V3 版本开始放弃了缩进式的风格，并完全兼容普通的 CSS 代码，也因此从第三代开始，Sass 也被称为 Scss。Sass 3 就是 Scss，是 Sassy CSS 的简写，它是 CSS3 语法的超集，也就是说所有有效的 CSS/CSS3 样式也同样适合于 Sass。

对现代编程来说，Sass 就是 Scss，也因此，Sass 现在的扩展名为`.scss`（如果是旧版本的 Sass，可能扩展名会为`.sass`）。

### 2.3 ruby sass、node-sass、dart-sass

Sass 的 3 代编译器。

ruby sass：用 ruby 实现的，而 ruby 是一门解释型语言，所以前端开发想编译 sass 就需要在本地安装 ruby。Node.js 的出现推动了前端工程化的发展，而 Node.js 只支持 c++ 这种编译型语言的扩展包，ruby sass 就用不了，退出历史舞台。

node-sass：用 c++ 实现的，编译速度比 ruby sass 快很多，和 node 做了集成，安装的时候要和 node 版本对应，不然就会编译报错。支持 CSS 新特性的速度跟不上，社区中出现 dart-sass，慢慢退出历史舞台。

dart-sass：用 dart 实现的，提供的 dart-sass 的包是 js 的，编译速度上会比 node-sass 慢。优点在于对 css 的特性支持的全，而且因为是 js 包，安装很方便。官方推荐使用。

### 2.4 框架中使用

vue：安装 sass 和 sass-loader

react：安装 sass 和 sass-loader

## 3、Less

### 3.1 基本用法

**注释**： 多行注释保留，单行注释不被保留在编译生成的 CSS 中。

**变量**： @ 声明变量，@{} 用于变量插值 @{var}；当一个变量被声明多次，会取最后一次的值，并从当前作用域往外寻找变量。

**嵌套**： 选择器嵌套；`&` 表示父选择器，常用于给现有选择器添加伪类或生成重复类名；

**混合**： 将一组属性从一个规则集混入到另一个规则集的方式，xxx(参数)；`@arguments` 变量包含了传入的所有参数。

**运算**： 计算结果以操作数最左侧的单位类型为准。

**继承**： 让多个选择器应用同一组属性，:extend(xxx)，精确匹配，:extend(xxx all) ，全部匹配。

**导入**： import，@import 的位置可随意放置；reference 关键字，使用引入的 Less 文件，但不会编译它，`@import (reference) "bootstrap.less";` ；once 关键字，相同的文件只会被导入一次，而随后的导入文件的重复代码都不会解析，`@import (once) "foo.less";`；multiple 关键字，允许导入多个同名文件，`@import (multiple) "foo.less";`。

**避免编译**： ~' 值 '。

**循环语句**： 递归调用自身，利用 when 跳出循环

### 3.2 sass 和 less

**相同**：

- 都是动态样式语言，对 CSS 赋予了动态语言的特性，如变量、继承、运算、函数等，提高开发效率。

**不同**：

- `Sass`的安装需要 Ruby 环境，是在服务端处理的； `Less`是需要引入 less.js 来处理 Less 代码输出 css 到浏览器，也可以在开发环节使用 Less，然后编译成 css 文件，直接放到项目中。
- 变量、混合、继承用法不同（本质一样）。
- 作用域遵循就近原则，内部顺序有些不同。
- sass 支持条件语句和循环语句；less 不支持。
- sass 提供 4 种输出选项：nested（默认，嵌套缩进）, compact（紧凑）, compressed（压缩） 和 expanded（展开的多行）；less 没有。
- sass 导入以下划线\_开头的文件，不会将其编译为 css 文件；less 引用外部文件和 css 中的@import 没什么差异。
- `Sass`有工具库 Compass，`Less`有 UI 组件库 Bootstrap。

### 3.3 框架中使用

Vue：安装 less 和 less-loader

react：安装 less 和 less-loader，在 webpack.config.js 中配置（先将项目的代码本地 git 提交一下，npm run eject 暴露配置文件）。

```js
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

	...,
  {
    test: lessRegex,
      exclude: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
            modules: {
              mode: 'icss',
            },
          },
          'less-loader'
        ),
          sideEffects: true,
  },
  {
    test: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 3,
          sourceMap: isEnvProduction
          ? shouldUseSourceMap
          : isEnvDevelopment,
          modules: {
            mode: 'local',
            getLocalIdent: getCSSModuleLocalIdent,
          },
        },
        'less-loader'
      ),
  },
  ...
```

## 4、Stylus

冒号可选、分号可选逗号可选、括号可选、变量、插值、混合书写、算术、强制类型转换、动态导入、条件、迭代、嵌套选择、父级参考、变量函数调用、词法作用域、内置函数、内部语言函数、压缩可选、图像内联可选、可执行 `Stylus`、健壮的错误报告、单行和多行注释、`CSS` 字面量、字符转义、`TextMate` 捆绑等。

## 5、PostCSS

使用 JavaScript 插件来转换 CSS 的工具。你正常地写完了一句 CSS，然后 PostCSS 的插件就会自动分析你的代码并转换成你想要的格式。

可以编译尚未被浏览器广泛支持的先进的 CSS 语法，还可以自动为一些需要额外兼容的语法增加前缀。更强的是，由于 PostCss 有着强大的插件机制，支持各种各样的扩展，极大地强化了 CSS 的能力。

**使用场景**：

- 提高 CSS 代码的可读性，PostCss 其实可以做类似预处理器能做的工作；
- 当我们的 CSS 代码需要适配低版本浏览器时，PostCss 的 [Autoprefixer](https://github.com/postcss/autoprefixer) 插件可以帮助我们自动增加浏览器前缀；
- 允许我们编写面向未来的 CSS，PostCss 能够帮助我们编译 CSS next 代码；

<img src="https://cdn.nlark.com/yuque/0/2021/jpeg/1500604/1615998491947-34e3237c-e54f-4b1a-8aeb-3c38655e1cb0.jpeg?x-oss-process=image%2Fresize%2Cw_1258%2Climit_0" alt="img" />
