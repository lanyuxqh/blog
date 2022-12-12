(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{631:function(t,_,v){"use strict";v.r(_);var o=v(5),r=Object(o.a)({},(function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"第-19-章-module"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#第-19-章-module"}},[t._v("#")]),t._v(" 第 19 章_Module")]),t._v(" "),v("h2",{attrs:{id:"一、概述"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#一、概述"}},[t._v("#")]),t._v(" 一、概述")]),t._v(" "),v("ol",[v("li",[t._v("在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。")]),t._v(" "),v("li",[t._v("ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。")])]),t._v(" "),v("h2",{attrs:{id:"二、export"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#二、export"}},[t._v("#")]),t._v(" 二、export")]),t._v(" "),v("ol",[v("li",[v("code",[t._v("export")]),t._v("命令用于规定模块的对外接口。")]),t._v(" "),v("li",[t._v("通常情况下，"),v("code",[t._v("export")]),t._v("输出的变量就是本来的名字，但是可以使用"),v("code",[t._v("as")]),t._v("关键字重命名。")]),t._v(" "),v("li",[v("code",[t._v("export")]),t._v("命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。")]),t._v(" "),v("li",[v("code",[t._v("export")]),t._v("语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。")]),t._v(" "),v("li",[v("code",[t._v("export")]),t._v("命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错。")]),t._v(" "),v("li",[v("code",[t._v("export default")]),t._v("命令，为模块指定默认输出。")])]),t._v(" "),v("h2",{attrs:{id:"三、import"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#三、import"}},[t._v("#")]),t._v(" 三、import")]),t._v(" "),v("ol",[v("li",[v("code",[t._v("import")]),t._v("命令用于输入其他模块提供的功能。")]),t._v(" "),v("li",[v("code",[t._v("import")]),t._v("后面的"),v("code",[t._v("from")]),t._v("指定模块文件的位置，可以是相对路径，也可以是绝对路径。")]),t._v(" "),v("li",[v("code",[t._v("import")]),t._v("命令具有提升效果，会提升到整个模块的头部，首先执行。")]),t._v(" "),v("li",[t._v("由于"),v("code",[t._v("import")]),t._v("是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。")]),t._v(" "),v("li",[t._v("如果多次重复执行同一句"),v("code",[t._v("import")]),t._v("语句，那么只会执行一次，而不会执行多次。")]),t._v(" "),v("li",[t._v("除了指定加载某个输出值，还可以使用整体加载，即用星号（"),v("code",[t._v("*")]),t._v("）指定一个对象，所有输出值都加载在这个对象上面。")])]),t._v(" "),v("h2",{attrs:{id:"四、export-与-import-的复合写法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#四、export-与-import-的复合写法"}},[t._v("#")]),t._v(" 四、export 与 import 的复合写法")]),t._v(" "),v("ol",[v("li",[t._v("如果在一个模块之中，先输入后输出同一个模块，"),v("code",[t._v("import")]),t._v("语句可以与"),v("code",[t._v("export")]),t._v("语句写在一起。实际上并没有被导入当前模块，只是相当于对外转发了这个接口。")])]),t._v(" "),v("h2",{attrs:{id:"五、import"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#五、import"}},[t._v("#")]),t._v(" 五、import()")]),t._v(" "),v("ol",[v("li",[v("code",[t._v("import")]),t._v("命令能够接受什么参数，"),v("code",[t._v("import()")]),t._v("函数就能接受什么参数，两者区别主要是后者为动态加载。")]),t._v(" "),v("li",[v("code",[t._v("import()")]),t._v("返回一个 Promise 对象。")]),t._v(" "),v("li",[v("code",[t._v("import()")]),t._v("的一些适用场合\n"),v("ul",[v("li",[t._v("按需加载")]),t._v(" "),v("li",[t._v("条件加载")]),t._v(" "),v("li",[t._v("动态的模块路径")])])])])])}),[],!1,null,null,null);_.default=r.exports}}]);