(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{640:function(t,s,e){"use strict";e.r(s);var a=e(5),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"第-9-章-对象的扩展"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第-9-章-对象的扩展"}},[t._v("#")]),t._v(" 第 9 章_对象的扩展")]),t._v(" "),e("h2",{attrs:{id:"一、属性简洁表达"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一、属性简洁表达"}},[t._v("#")]),t._v(" 一、属性简洁表达")]),t._v(" "),e("ol",[e("li",[t._v("ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。")]),t._v(" "),e("li",[t._v("这种写法用于函数的返回值、CommonJS 模块输出一组变量、打印对象，将会非常方便。")]),t._v(" "),e("li",[e("em",[t._v("注意，简写的对象方法不能用作构造函数，会报错。")])])]),t._v(" "),e("h2",{attrs:{id:"二、属性名表达式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二、属性名表达式"}},[t._v("#")]),t._v(" 二、属性名表达式")]),t._v(" "),e("ol",[e("li",[t._v("ES6 允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内。")]),t._v(" "),e("li",[t._v("表达式还可以用于定义方法名。")]),t._v(" "),e("li",[e("em",[t._v("注意，属性名表达式与简洁表示法，不能同时使用，会报错。")])]),t._v(" "),e("li",[t._v("属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串"),e("code",[t._v("[object Object]")])])]),t._v(" "),e("h2",{attrs:{id:"三、方法的-name-属性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#三、方法的-name-属性"}},[t._v("#")]),t._v(" 三、方法的 name 属性")]),t._v(" "),e("ol",[e("li",[t._v("对象方法也是函数，也有"),e("code",[t._v("name")]),t._v("属性。方法的"),e("code",[t._v("name")]),t._v("属性返回函数名（即方法名）。")]),t._v(" "),e("li",[t._v("如果对象的方法使用了取值函数（"),e("code",[t._v("getter")]),t._v("）和存值函数（"),e("code",[t._v("setter")]),t._v("），则"),e("code",[t._v("name")]),t._v("属性不是在该方法上面，而是该方法的属性的描述对象的"),e("code",[t._v("get")]),t._v("和"),e("code",[t._v("set")]),t._v("属性上面，返回值是方法名前加上"),e("code",[t._v("get")]),t._v("和"),e("code",[t._v("set")]),t._v("。")]),t._v(" "),e("li",[e("code",[t._v("bind")]),t._v("方法创造的函数，"),e("code",[t._v("name")]),t._v("属性返回"),e("code",[t._v("bound")]),t._v("加上原函数的名字；"),e("code",[t._v("Function")]),t._v("构造函数创造的函数，"),e("code",[t._v("name")]),t._v("属性返回"),e("code",[t._v("anonymous")]),t._v("。")]),t._v(" "),e("li",[t._v("如果对象的方法是一个 Symbol 值，那么"),e("code",[t._v("name")]),t._v("属性返回的是这个 Symbol 值的描述。")])]),t._v(" "),e("h2",{attrs:{id:"四、属性的可枚举性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#四、属性的可枚举性"}},[t._v("#")]),t._v(" 四、属性的可枚举性")]),t._v(" "),e("ol",[e("li",[e("p",[e("code",[t._v("Object.getOwnPropertyDescriptor")]),t._v("方法可以获取对象某属性的描述对象。")])]),t._v(" "),e("li",[e("p",[t._v("描述对象的"),e("code",[t._v("enumerable")]),t._v("属性，称为“可枚举性”，如果该属性为"),e("code",[t._v("false")]),t._v("，就表示某些操作会忽略当前属性。")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("for...in")]),t._v("循环：只遍历对象自身的和"),e("strong",[t._v("继承")]),t._v("的可枚举的属性。")]),t._v(" "),e("li",[e("code",[t._v("Object.keys()")]),t._v("：返回对象自身的所有可枚举的属性的键名。")]),t._v(" "),e("li",[e("code",[t._v("JSON.stringify()")]),t._v("：只串行化对象自身的可枚举的属性。")]),t._v(" "),e("li",[e("code",[t._v("Object.assign()")]),t._v("： 忽略"),e("code",[t._v("enumerable")]),t._v("为"),e("code",[t._v("false")]),t._v("的属性，只拷贝对象自身的可枚举的属性。")])])]),t._v(" "),e("li",[e("p",[t._v("引入“可枚举”（"),e("code",[t._v("enumerable")]),t._v("）这个概念的最初目的，就是让某些属性可以规避掉"),e("code",[t._v("for...in")]),t._v("操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的"),e("code",[t._v("toString")]),t._v("方法，以及数组的"),e("code",[t._v("length")]),t._v("属性，就通过“可枚举性”，从而避免被"),e("code",[t._v("for...in")]),t._v("遍历到。")])]),t._v(" "),e("li",[e("p",[t._v("所有 Class 的原型的方法都是不可枚举的。")])]),t._v(" "),e("li",[e("p",[t._v("操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用"),e("code",[t._v("for...in")]),t._v("循环，而用"),e("code",[t._v("Object.keys()")]),t._v("代替。")])])]),t._v(" "),e("h2",{attrs:{id:"五、属性的遍历"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#五、属性的遍历"}},[t._v("#")]),t._v(" 五、属性的遍历")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("ES6 一共有 5 种方法可以遍历对象的属性。")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("for...in")]),t._v("：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。")]),t._v(" "),e("li",[e("strong",[t._v("Object.keys(obj)")]),t._v("：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。")]),t._v(" "),e("li",[e("strong",[t._v("Object.getOwnPropertyNames(obj)")]),t._v("：返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。")]),t._v(" "),e("li",[e("strong",[t._v("Object.getOwnPropertySymbols(obj)")]),t._v("：返回一个数组，包含对象自身的所有 Symbol 属性的键名。")]),t._v(" "),e("li",[e("strong",[t._v("Reflect.ownKeys(obj)")]),t._v("：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。")])])]),t._v(" "),e("li",[e("p",[t._v("以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。")]),t._v(" "),e("ul",[e("li",[t._v("首先遍历所有数值键，按照数值升序排列。")]),t._v(" "),e("li",[t._v("其次遍历所有字符串键，按照加入时间升序排列。")]),t._v(" "),e("li",[t._v("最后遍历所有 Symbol 键，按照加入时间升序排列。")])])])]),t._v(" "),e("h2",{attrs:{id:"六、super-关键字"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#六、super-关键字"}},[t._v("#")]),t._v(" 六、super 关键字")]),t._v(" "),e("ol",[e("li",[t._v("关键字"),e("code",[t._v("super")]),t._v("，指向当前对象的原型对象。")]),t._v(" "),e("li",[t._v("*注意，"),e("code",[t._v("super")]),t._v("关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。*目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。")])]),t._v(" "),e("h2",{attrs:{id:"七、对象的扩展运算符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#七、对象的扩展运算符"}},[t._v("#")]),t._v(" 七、对象的扩展运算符")]),t._v(" "),e("ol",[e("li",[t._v("对象的"),e("strong",[t._v("解构赋值")]),t._v("用于从一个对象取值，相当于将目标对象自身的所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。\n"),e("ul",[e("li",[t._v("如果等号右边是"),e("code",[t._v("undefined")]),t._v("或"),e("code",[t._v("null")]),t._v("，就会报错，因为它们无法转为对象。")]),t._v(" "),e("li",[t._v("解构赋值必须是最后一个参数，否则会报错。")]),t._v(" "),e("li",[t._v("解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。")]),t._v(" "),e("li",[t._v("不能复制继承自原型对象的属性。")]),t._v(" "),e("li",[t._v("解构赋值的另一个用处，是扩展某个函数的参数，引入其他操作。")])])]),t._v(" "),e("li",[t._v("对象的扩展运算符用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。\n"),e("ul",[e("li",[t._v("由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。")]),t._v(" "),e("li",[t._v("如果扩展运算符后面是一个空对象，则没有任何效果。")]),t._v(" "),e("li",[t._v("如果扩展运算符后面不是对象，则会自动将其转为对象。")]),t._v(" "),e("li",[t._v("如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。")]),t._v(" "),e("li",[t._v("对象的扩展运算符等同于使用"),e("code",[t._v("Object.assign()")]),t._v("方法。")])])]),t._v(" "),e("li",[t._v("其他用处\n"),e("ul",[e("li",[t._v("扩展运算符可以用于合并两个对象。")]),t._v(" "),e("li",[t._v("修改现有对象部分的属性。")]),t._v(" "),e("li",[t._v("设置新对象的默认属性值。")])])]),t._v(" "),e("li",[t._v("对象的扩展运算符后面可以跟表达式。")]),t._v(" "),e("li",[t._v("扩展运算符的参数对象之中，如果有取值函数"),e("code",[t._v("get")]),t._v("，这个函数是会执行的。")])]),t._v(" "),e("h2",{attrs:{id:"八、对象新增的方法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#八、对象新增的方法"}},[t._v("#")]),t._v(" 八、对象新增的方法")]),t._v(" "),e("h3",{attrs:{id:"object-is"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#object-is"}},[t._v("#")]),t._v(" "),e("code",[t._v("Object.is()")])]),t._v(" "),e("ul",[e("li",[e("p",[t._v("ES5 比较两个值是否相等：相等运算符（"),e("code",[t._v("==")]),t._v("）会自动转换数据类型；严格相等运算符（"),e("code",[t._v("===")]),t._v("）的"),e("code",[t._v("NaN")]),t._v("不等于自身，+0"),e("code",[t._v("等于")]),t._v("-0。")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("Object.is")]),t._v("，用来比较两个值是否严格相等。")]),t._v(" "),e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//true")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("NaN")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("NaN")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n\nObject"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("is")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\nObject"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("is")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("NaN")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("NaN")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br")])])])]),t._v(" "),e("h3",{attrs:{id:"object-assign"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#object-assign"}},[t._v("#")]),t._v(" "),e("code",[t._v("Object.assign()")])]),t._v(" "),e("ul",[e("li",[t._v("用于对象的合并，将源对象（source）的所有"),e("strong",[t._v("可枚举属性")]),t._v("，复制到目标对象（target）。")]),t._v(" "),e("li",[t._v("第一个参数是目标对象，后面的参数都是源对象。\n"),e("ul",[e("li",[t._v("如果只有一个参数，会直接返回该参数。如果该参数不是对象，则会先转成对象，然后返回。"),e("em",[t._v("由于"),e("code",[t._v("undefined")]),t._v("和"),e("code",[t._v("null")]),t._v("无法转成对象，所以如果它们作为参数，就会报错。")])]),t._v(" "),e("li",[t._v("如果非对象参数出现在源对象的位置（即非首参数），首先，这些参数都会转成对象，如果无法转成对象，就会跳过。\n"),e("ul",[e("li",[t._v("如果"),e("code",[t._v("undefined")]),t._v("和"),e("code",[t._v("null")]),t._v("不在首参数，就不会报错。")]),t._v(" "),e("li",[t._v("其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。因为布尔值、数值、字符串分别转成对应的包装对象，它们的原始值都在包装对象的内部属性"),e("code",[t._v("[[PrimitiveValue]]")]),t._v("上面，这个属性不会被拷贝。")]),t._v(" "),e("li",[t._v("字符串会以数组形式，拷贝入目标对象。因为只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。")])])])])]),t._v(" "),e("li",[t._v("注意点：\n"),e("ul",[e("li",[t._v("只拷贝源对象的自身属性、属性名为 Symbol 值的属性，不拷贝继承属性、不可枚举的属性。")]),t._v(" "),e("li",[t._v("实行的是浅拷贝（只复制一层），而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。")]),t._v(" "),e("li",[t._v("同名属性是直接替换。")]),t._v(" "),e("li",[t._v("可以用来处理数组，但是会把数组视为对象。")]),t._v(" "),e("li",[t._v("只能进行值的复制，如果要复制的值是一个"),e("strong",[t._v("取值函数")]),t._v("，那么将求值后再复制。")])])]),t._v(" "),e("li",[t._v("用途\n"),e("ul",[e("li",[t._v("为对象添加属性")]),t._v(" "),e("li",[t._v("为对象添加方法")]),t._v(" "),e("li",[t._v("克隆对象")]),t._v(" "),e("li",[t._v("合并多个对象")]),t._v(" "),e("li",[t._v("为属性指定默认值")])])])]),t._v(" "),e("h3",{attrs:{id:"object-getownpropertydescriptors"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#object-getownpropertydescriptors"}},[t._v("#")]),t._v(" "),e("code",[t._v("Object.getOwnPropertyDescriptors()")])]),t._v(" "),e("ul",[e("li",[t._v("返回指定对象所有自身属性（非继承属性）的描述对象。")]),t._v(" "),e("li",[t._v("该方法的引入目的，主要是为了解决"),e("code",[t._v("Object.assign()")]),t._v("无法正确拷贝"),e("code",[t._v("get")]),t._v("属性和"),e("code",[t._v("set")]),t._v("属性的问题。"),e("code",[t._v("Object.getOwnPropertyDescriptors()")]),t._v("方法配合"),e("code",[t._v("Object.defineProperties()")]),t._v("方法，就可以实现正确拷贝。")])]),t._v(" "),e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Object.assign()")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" source "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target1 "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nObject"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("assign")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target1"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nObject"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getOwnPropertyDescriptor")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target1"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'foo'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// { value: undefined,")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   writable: true,")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   enumerable: true,")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   configurable: true }")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Object.getOwnPropertyDescriptors()")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" source "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target2 "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nObject"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("defineProperties")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target2"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Object"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getOwnPropertyDescriptors")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("source"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nObject"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getOwnPropertyDescriptor")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target2"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'foo'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// { get: undefined,")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   set: [Function: set foo],")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   enumerable: true,")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   configurable: true }")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br"),e("span",{staticClass:"line-number"},[t._v("15")]),e("br"),e("span",{staticClass:"line-number"},[t._v("16")]),e("br"),e("span",{staticClass:"line-number"},[t._v("17")]),e("br"),e("span",{staticClass:"line-number"},[t._v("18")]),e("br"),e("span",{staticClass:"line-number"},[t._v("19")]),e("br"),e("span",{staticClass:"line-number"},[t._v("20")]),e("br"),e("span",{staticClass:"line-number"},[t._v("21")]),e("br"),e("span",{staticClass:"line-number"},[t._v("22")]),e("br"),e("span",{staticClass:"line-number"},[t._v("23")]),e("br"),e("span",{staticClass:"line-number"},[t._v("24")]),e("br"),e("span",{staticClass:"line-number"},[t._v("25")]),e("br"),e("span",{staticClass:"line-number"},[t._v("26")]),e("br"),e("span",{staticClass:"line-number"},[t._v("27")]),e("br"),e("span",{staticClass:"line-number"},[t._v("28")]),e("br"),e("span",{staticClass:"line-number"},[t._v("29")]),e("br"),e("span",{staticClass:"line-number"},[t._v("30")]),e("br")])]),e("ul",[e("li",[t._v("其他用处：\n"),e("ul",[e("li",[t._v("是配合"),e("code",[t._v("Object.create()")]),t._v("方法，将对象属性克隆到一个新对象。这属于浅拷贝。")]),t._v(" "),e("li",[t._v("可以实现一个对象继承另一个对象。")]),t._v(" "),e("li",[t._v("可以实现 Mixin（混入）模式。")])])])]),t._v(" "),e("h3",{attrs:{id:"proto-属性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#proto-属性"}},[t._v("#")]),t._v(" "),e("code",[t._v("__proto__")]),t._v("属性")]),t._v(" "),e("ul",[e("li",[t._v("用来读取或设置当前对象的原型对象（prototype）。")]),t._v(" "),e("li",[t._v("它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性。")])]),t._v(" "),e("h3",{attrs:{id:"object-setprototypeof"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#object-setprototypeof"}},[t._v("#")]),t._v(" "),e("code",[t._v("Object.setPrototypeOf()")])]),t._v(" "),e("ul",[e("li",[t._v("用来设置一个对象的原型对象，返回参数对象本身。"),e("code",[t._v("Object.setPrototypeOf(object, prototype)")])]),t._v(" "),e("li",[t._v("如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。")]),t._v(" "),e("li",[e("em",[t._v("由于"),e("code",[t._v("undefined")]),t._v("和"),e("code",[t._v("null")]),t._v("无法转为对象，所以如果第一个参数是"),e("code",[t._v("undefined")]),t._v("或"),e("code",[t._v("null")]),t._v("，就会报错。")])])]),t._v(" "),e("h3",{attrs:{id:"object-getprototypeof"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#object-getprototypeof"}},[t._v("#")]),t._v(" "),e("code",[t._v("Object.getPrototypeOf()")])]),t._v(" "),e("ul",[e("li",[t._v("用于读取一个对象的原型对象。"),e("code",[t._v("Object.getPrototypeOf(obj)")])]),t._v(" "),e("li",[t._v("如果参数不是对象，会被自动转为对象。")]),t._v(" "),e("li",[e("em",[t._v("如果参数是"),e("code",[t._v("undefined")]),t._v("或"),e("code",[t._v("null")]),t._v("，它们无法转为对象，所以会报错。")])])]),t._v(" "),e("h3",{attrs:{id:"object-keys-object-values-object-entries"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#object-keys-object-values-object-entries"}},[t._v("#")]),t._v(" "),e("code",[t._v("Object.keys()")]),t._v("，"),e("code",[t._v("Object.values()")]),t._v("，"),e("code",[t._v("Object.entries()")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("Object.keys")]),t._v("方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。")]),t._v(" "),e("li",[e("code",[t._v("Object.values")]),t._v("方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。\n"),e("ul",[e("li",[t._v("会过滤属性名为 Symbol 值的属性。")]),t._v(" "),e("li",[t._v("如果参数不是对象，"),e("code",[t._v("Object.values")]),t._v("会先将其转为对象")]),t._v(" "),e("li",[t._v("如果参数是一个字符串，会返回各个字符组成的一个数组。")])])]),t._v(" "),e("li",[e("code",[t._v("Object.entries()")]),t._v("方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。\n"),e("ul",[e("li",[t._v("基本用途是遍历对象的属性。")]),t._v(" "),e("li",[t._v("另一个用处是，将对象转为真正的"),e("code",[t._v("Map")]),t._v("结构。")])])])]),t._v(" "),e("h3",{attrs:{id:"object-fromentries"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#object-fromentries"}},[t._v("#")]),t._v(" "),e("code",[t._v("Object.fromEntries()")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("Object.entries()")]),t._v("的逆操作，用于将一个键值对数组"),e("strong",[t._v("转为对象")]),t._v("。")]),t._v(" "),e("li",[t._v("特别适合将 Map 结构转为对象。")]),t._v(" "),e("li",[t._v("配合"),e("code",[t._v("URLSearchParams")]),t._v("对象，将查询字符串转为对象。")])]),t._v(" "),e("h2",{attrs:{id:"九、null-传导运算符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#九、null-传导运算符"}},[t._v("#")]),t._v(" 九、Null 传导运算符")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("?.")]),t._v(" 替代层层判断")]),t._v(" "),e("li",[t._v("只要有一个返回"),e("code",[t._v("null")]),t._v("或"),e("code",[t._v("undefined")]),t._v("，就不再继续运算，而是返回"),e("code",[t._v("undefined")]),t._v("。")])])])}),[],!1,null,null,null);s.default=n.exports}}]);