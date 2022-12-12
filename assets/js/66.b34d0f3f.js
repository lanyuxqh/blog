(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{627:function(t,a,s){"use strict";s.r(a);var n=s(5),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"第15章-iterator和for-of循环"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第15章-iterator和for-of循环"}},[t._v("#")]),t._v(" 第15章_Iterator和for...of循环")]),t._v(" "),s("h2",{attrs:{id:"一、概述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、概述"}},[t._v("#")]),t._v(" 一、概述")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。")])]),t._v(" "),s("li",[s("p",[t._v("Iterator 的作用有三个：")]),t._v(" "),s("ul",[s("li",[t._v("为各种数据结构，提供一个统一的、简便的访问接口；")]),t._v(" "),s("li",[t._v("使得数据结构的成员能够按某种次序排列；")]),t._v(" "),s("li",[s("code",[t._v("for...of")]),t._v("循环内部调用的是数据结构的"),s("code",[t._v("Symbol.iterator")]),t._v("方法。")])])]),t._v(" "),s("li",[s("p",[t._v("Iterator 的遍历过程：")]),t._v(" "),s("ul",[s("li",[t._v("创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。")]),t._v(" "),s("li",[t._v("第一次调用指针对象的"),s("code",[t._v("next")]),t._v("方法，可以将指针指向数据结构的第一个成员。")]),t._v(" "),s("li",[t._v("第二次调用指针对象的"),s("code",[t._v("next")]),t._v("方法，指针就指向数据结构的第二个成员。")]),t._v(" "),s("li",[t._v("不断调用指针对象的"),s("code",[t._v("next")]),t._v("方法，直到它指向数据结构的结束位置。\n"),s("ul",[s("li",[t._v("每一次调用"),s("code",[t._v("next")]),t._v("方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含"),s("code",[t._v("value")]),t._v("和"),s("code",[t._v("done")]),t._v("两个属性的对象。其中，"),s("code",[t._v("value")]),t._v("属性是当前成员的值，"),s("code",[t._v("done")]),t._v("属性是一个布尔值，表示遍历是否结束。")])])])])]),t._v(" "),s("li",[s("p",[t._v("下面是一个模拟"),s("code",[t._v("next")]),t._v("方法返回值的例子")]),t._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" it "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeIterator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("next")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// { value: "a", done: false }')]),t._v("\nit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("next")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// { value: "b", done: false }')]),t._v("\nit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("next")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// { value: undefined, done: true }")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeIterator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" nextIndex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("next")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" nextIndex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("nextIndex"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" done"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" done"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br")])])])]),t._v(" "),s("h2",{attrs:{id:"二、默认-iterator-接口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、默认-iterator-接口"}},[t._v("#")]),t._v(" 二、默认 Iterator 接口")]),t._v(" "),s("ol",[s("li",[t._v("一个数据结构只要具有"),s("code",[t._v("Symbol.iterator")]),t._v("属性，就可以认为是“可遍历的”（iterable）。")]),t._v(" "),s("li",[s("code",[t._v("Symbol.iterator")]),t._v("属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。")]),t._v(" "),s("li",[t._v("原生具备 Iterator 接口的数据结构如下：（"),s("strong",[t._v("对象")]),t._v("没有）\n"),s("ul",[s("li",[t._v("Array")]),t._v(" "),s("li",[t._v("Map")]),t._v(" "),s("li",[t._v("Set")]),t._v(" "),s("li",[t._v("String")]),t._v(" "),s("li",[t._v("TypedArray")]),t._v(" "),s("li",[t._v("函数的 arguments 对象")]),t._v(" "),s("li",[t._v("NodeList 对象")])])]),t._v(" "),s("li",[t._v("对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。"),s("code",[t._v("for...in")]),t._v("循环依然可以用来遍历键名，"),s("code",[t._v("for...of")]),t._v("循环会报错。\n"),s("ul",[s("li",[t._v("一种解决方法是，使用"),s("code",[t._v("Object.keys")]),t._v("方法将对象的键名生成一个数组，然后遍历这个数组。")]),t._v(" "),s("li",[t._v("另一个方法是使用 Generator 函数将对象重新包装一下。")])])])]),t._v(" "),s("h2",{attrs:{id:"三、调用-iterator-接口的场合"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、调用-iterator-接口的场合"}},[t._v("#")]),t._v(" 三、调用 Iterator 接口的场合")]),t._v(" "),s("ol",[s("li",[t._v("解构赋值")]),t._v(" "),s("li",[t._v("扩展运算符")]),t._v(" "),s("li",[t._v("yield*")]),t._v(" "),s("li",[t._v("其他场合：由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。\n"),s("ul",[s("li",[t._v("for...of")]),t._v(" "),s("li",[t._v("Array.from()")]),t._v(" "),s("li",[t._v("Map(), Set(), WeakMap(), WeakSet()（比如"),s("code",[t._v("new Map([['a',1],['b',2]])")]),t._v("）")]),t._v(" "),s("li",[t._v("Promise.all()")]),t._v(" "),s("li",[t._v("Promise.race()")])])])]),t._v(" "),s("h2",{attrs:{id:"四、iterator-接口与-generator-函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四、iterator-接口与-generator-函数"}},[t._v("#")]),t._v(" 四、Iterator 接口与 Generator 函数")]),t._v(" "),s("ol",[s("li",[s("p",[s("code",[t._v("Symbol.iterator()")]),t._v("方法的最简单实现，是使用 Generator 函数。")]),t._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" myIterable "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Symbol"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("iterator"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("myIterable"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [1, 2, 3]")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 或者采用下面的简洁写法")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Symbol"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("iterator"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'world'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" x "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" obj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "hello"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "world"')]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br")])])])]),t._v(" "),s("h2",{attrs:{id:"五、遍历器对象的-return-throw"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五、遍历器对象的-return-throw"}},[t._v("#")]),t._v(" 五、遍历器对象的 return()，throw()")]),t._v(" "),s("ol",[s("li",[t._v("如果你自己写遍历器对象生成函数，那么"),s("code",[t._v("next()")]),t._v("方法是必须部署的，"),s("code",[t._v("return()")]),t._v("方法和"),s("code",[t._v("throw()")]),t._v("方法是否部署是可选的。")]),t._v(" "),s("li",[s("code",[t._v("return()")]),t._v("方法的使用场合是，如果"),s("code",[t._v("for...of")]),t._v("循环提前退出（通常是因为出错，或者有"),s("code",[t._v("break")]),t._v("语句），就会调用"),s("code",[t._v("return()")]),t._v("方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署"),s("code",[t._v("return()")]),t._v("方法。")]),t._v(" "),s("li",[s("code",[t._v("throw()")]),t._v("方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。")])]),t._v(" "),s("h2",{attrs:{id:"六、与其他遍历语法的比较"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#六、与其他遍历语法的比较"}},[t._v("#")]),t._v(" 六、与其他遍历语法的比较")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("最原始的写法就是"),s("code",[t._v("for")]),t._v("循环")]),t._v(" "),s("ul",[s("li",[t._v("写法比较麻烦")])])]),t._v(" "),s("li",[s("p",[t._v("数组提供内置的"),s("code",[t._v("forEach")]),t._v("方法")]),t._v(" "),s("ul",[s("li",[t._v("无法中途跳出"),s("code",[t._v("forEach")]),t._v("循环，"),s("code",[t._v("break")]),t._v("命令或"),s("code",[t._v("return")]),t._v("命令都不能奏效。")])])]),t._v(" "),s("li",[s("p",[s("code",[t._v("for...in")]),t._v("循环（遍历数组的键名）")]),t._v(" "),s("ul",[s("li",[t._v("数组的键名是数字，但是"),s("code",[t._v("for...in")]),t._v("循环是以字符串作为键名“0”、“1”、“2”等等。")]),t._v(" "),s("li",[s("code",[t._v("for...in")]),t._v("循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。")]),t._v(" "),s("li",[t._v("某些情况下，"),s("code",[t._v("for...in")]),t._v("循环会以任意顺序遍历键名。")])])]),t._v(" "),s("li",[s("p",[s("code",[t._v("for...of")]),t._v("循环")]),t._v(" "),s("ul",[s("li",[t._v("有着同"),s("code",[t._v("for...in")]),t._v("一样的简洁语法，但是没有"),s("code",[t._v("for...in")]),t._v("那些缺点。")]),t._v(" "),s("li",[t._v("不同于"),s("code",[t._v("forEach")]),t._v("方法，它可以与"),s("code",[t._v("break")]),t._v("、"),s("code",[t._v("continue")]),t._v("和"),s("code",[t._v("return")]),t._v("配合使用。")]),t._v(" "),s("li",[t._v("提供了遍历所有数据结构的统一操作接口。")])])])])])}),[],!1,null,null,null);a.default=e.exports}}]);