(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{611:function(t,s,a){"use strict";a.r(s);var n=a(5),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"事件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件"}},[t._v("#")]),t._v(" 事件")]),t._v(" "),a("h2",{attrs:{id:"_1、事件概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、事件概念"}},[t._v("#")]),t._v(" 1、事件概念")]),t._v(" "),a("p",[a("strong",[t._v("事件")]),t._v("：")]),t._v(" "),a("p",[t._v("事件是用户操作网页时发生的交互动作，比如 click/move， 事件除了用户触发的动作外，还可以是文档加载，比如窗口滚动和大小调整。可以理解为触发-响应机制。")]),t._v(" "),a("p",[a("strong",[t._v("事件三要素")]),t._v("：")]),t._v(" "),a("ul",[a("li",[t._v("事件源：被触发的对象。")]),t._v(" "),a("li",[t._v("事件类型：如何触发。")]),t._v(" "),a("li",[t._v("事件处理程序：响应什么。通过一个函数赋值的方式完成。")])]),t._v(" "),a("p",[a("strong",[t._v("执行事件的步骤")]),t._v("：")]),t._v(" "),a("ul",[a("li",[t._v("获取事件源（DOM）")]),t._v(" "),a("li",[t._v("绑定事件")]),t._v(" "),a("li",[t._v("添加事件处理程序")])]),t._v(" "),a("p",[a("strong",[t._v("常见的事件类型")]),t._v("：")]),t._v(" "),a("p",[a("strong",[t._v("1.键盘事件")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("事件")]),t._v(" "),a("th",[t._v("发生时机")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("onkeydown")]),t._v(" "),a("td",[t._v("键盘按键按下")])]),t._v(" "),a("tr",[a("td",[t._v("onkeypress")]),t._v(" "),a("td",[t._v("键盘按键按住")])]),t._v(" "),a("tr",[a("td",[t._v("onkeyup")]),t._v(" "),a("td",[t._v("键盘按键松开")])])])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("event 参数")]),t._v(" 该参数为 "),a("code",[t._v("KeyboardEvent")]),t._v(" 事件对象，其中包含按键相关的一些属性。\n"),a("ul",[a("li",[a("code",[t._v("type")]),t._v("：事件类型")]),t._v(" "),a("li",[a("code",[t._v("key")]),t._v("：表示按下的键盘内容是什么即键值，按下字母 'p' 时，值为'p'")]),t._v(" "),a("li",[a("code",[t._v("code")]),t._v("：表示键盘代码，按下字母 'p' 时，值为 'KeyP'")]),t._v(" "),a("li",[a("code",[t._v("keyCode")]),t._v("：整数，表示键码，每个键都有唯一的键码，字母 'p' 的键码为 80")]),t._v(" "),a("li",[a("code",[t._v("altKey")]),t._v("：布尔值，表示此时的 alt 键是否也按下")]),t._v(" "),a("li",[a("code",[t._v("ctrKey")]),t._v("：布尔值，表示此时的 ctr 键是否也按下")]),t._v(" "),a("li",[a("code",[t._v("shiftKey")]),t._v("：布尔值，表示此时的 shift 键是否也按下")]),t._v(" "),a("li",[a("code",[t._v("metaKey")]),t._v("：布尔值，windows 平台表示 Window 键是否同时按下，mac 表示 Command 键是否同时按下")]),t._v(" "),a("li",[a("code",[t._v("repeat")]),t._v(": 布尔值，如果一个键一直被按着，则其值为 true，表示重复")])])])]),t._v(" "),a("p",[a("strong",[t._v("2.鼠标事件")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("事件")]),t._v(" "),a("th",[t._v("发生时机")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("onclick")]),t._v(" "),a("td",[t._v("鼠标单击对象时触发的事件")])]),t._v(" "),a("tr",[a("td",[t._v("ondblclick")]),t._v(" "),a("td",[t._v("鼠标双击对象时触发的事件")])]),t._v(" "),a("tr",[a("td",[t._v("onmousedown")]),t._v(" "),a("td",[t._v("鼠标按钮被按下时触发的事件")])]),t._v(" "),a("tr",[a("td",[t._v("onmousemove")]),t._v(" "),a("td",[t._v("鼠标被移动时触发的事件")])]),t._v(" "),a("tr",[a("td",[t._v("onmouseout")]),t._v(" "),a("td",[t._v("鼠标离开监听该事件的元素或子元素时触发的事件")])]),t._v(" "),a("tr",[a("td",[t._v("onmouseover")]),t._v(" "),a("td",[t._v("鼠标移动到监听该事件的元素或子元素时触发的事件")])]),t._v(" "),a("tr",[a("td",[t._v("onmouseup")]),t._v(" "),a("td",[t._v("鼠标按键被松开时触发的事件")])])])]),t._v(" "),a("ul",[a("li",[t._v("触发时的参数为 MouseEvent 对象类型，MouseEvent 对象中包含下面比较有用的属性：\n"),a("ul",[a("li",[a("code",[t._v("type")]),t._v(": 事件类型")]),t._v(" "),a("li",[a("code",[t._v("button")]),t._v("：整型，触发鼠标事件时按下的按钮编号")]),t._v(" "),a("li",[a("code",[t._v("buttons")]),t._v("：整型，触发鼠标事件时弹起来的按钮编号")]),t._v(" "),a("li",[a("code",[t._v("clientX")]),t._v("：鼠标指针在 DOM 内容区的 X 坐标")]),t._v(" "),a("li",[a("code",[t._v("clientY")]),t._v("：鼠标指针在 DOM 内容区的 Y 坐标")]),t._v(" "),a("li",[a("code",[t._v("offsetX")]),t._v("：鼠标指针相对父节点填充边缘的 X 坐标")]),t._v(" "),a("li",[a("code",[t._v("offsetY")]),t._v(": 鼠标指针相对父节点填充边缘的 Y 坐标")]),t._v(" "),a("li",[a("code",[t._v("screenX")]),t._v(": 鼠标指针在全局屏幕的 X 坐标")]),t._v(" "),a("li",[a("code",[t._v("screenY")]),t._v(": 鼠标指针在全局屏幕的 Y 坐标")]),t._v(" "),a("li",[a("code",[t._v("pageX")]),t._v(": 鼠标指针在整个 DOM 内容（包括分页）的 X 坐标")]),t._v(" "),a("li",[a("code",[t._v("pageY")]),t._v(": 鼠标指针在整个 DOM 内容（包括分页）的 Y 坐标")]),t._v(" "),a("li",[a("code",[t._v("altKey")]),t._v(": 布尔值，表示此时的 alt 键是否也按下")]),t._v(" "),a("li",[a("code",[t._v("ctrKey")]),t._v(": 布尔值，表示此时的 alt 键是否也按下")]),t._v(" "),a("li",[a("code",[t._v("shiftKey")]),t._v(": 布尔值，表示此时的 shift 键是否也按下")]),t._v(" "),a("li",[a("code",[t._v("metaKey")]),t._v(": 布尔值，windows 平台表示 Window 键是否同时按下，mac 表示 Command 键是否同时按下")])])])]),t._v(" "),a("p",[a("strong",[t._v("3.焦点事件")]),t._v("：")]),t._v(" "),a("p",[t._v("不是所有元素都有焦点事件，只有可交互性的元素才有，比如表单元素，a 标签。页面中只能有一个元素有焦点，一个聚焦，另一个就失焦，默认在 document。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("事件")]),t._v(" "),a("th",[t._v("发生时机")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("onfocus")]),t._v(" "),a("td",[t._v("聚焦")])]),t._v(" "),a("tr",[a("td",[t._v("onblur")]),t._v(" "),a("td",[t._v("失焦")])])])]),t._v(" "),a("h2",{attrs:{id:"_2、事件绑定-解绑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、事件绑定-解绑"}},[t._v("#")]),t._v(" 2、事件绑定/解绑")]),t._v(" "),a("p",[a("strong",[t._v("1.传统方式绑定")])]),t._v(" "),a("ul",[a("li",[t._v("内联")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("button onclick"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"handleClick()"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("ul",[a("li",[t._v("对象.事件")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("button id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"btn"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'btn'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onclick")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'click'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[a("strong",[t._v("2.事件监听绑定")])]),t._v(" "),a("ul",[a("li",[t._v("addEventListener")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("button id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"btn"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'btn'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'click'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" handleClick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("ul",[a("li",[t._v("attachEvent（ie9 以前的版本）")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("button id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"btn"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("button"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'btn'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("attachEvent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'onclick'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" handleClick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[a("strong",[t._v("区别")]),t._v("：")]),t._v(" "),a("ul",[a("li",[t._v("addEventListener，同一个元素可以添加多个相同事件。对象.事件，只能设置一个处理函数，后面会覆盖前面。")]),t._v(" "),a("li",[t._v("addEventListener 支持冒泡和捕获。对象.事件和 attachEvent 只支持冒泡，不支持捕获。")])]),t._v(" "),a("p",[a("strong",[t._v("事件解绑")]),t._v("：")]),t._v(" "),a("p",[t._v("用什么方式绑定事件，就应该用对应的方式解绑事件")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("对象.on 事件类型=null;")])]),t._v(" "),a("li",[a("p",[t._v('对象.removeEventListener("没有 on 的事件类型",函数名字,false);')])]),t._v(" "),a("li",[a("p",[t._v('对象.detachEvent("on 事件类型",函数名字);')])])]),t._v(" "),a("p",[a("strong",[t._v("兼容性代码")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//绑定事件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEvent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("addEventListener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("attachEvent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("attachEvent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'on'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'on'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fn\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//解绑事件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeEvent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fnName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("removeEventListener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fnName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("detachEvent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("detachEvent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'on'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fnName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'on'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br")])]),a("p",[a("strong",[t._v("封装绑定事件处理函数")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEvent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("ele"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" selector"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" cb")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// cb：回调函数")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("cb"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    cb "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" selector\n    selector "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  ele"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// e.stopPropagation()")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("selector"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// matches方法用来判断是不是点击了li，也可以用来判断是不是点击了某个选择器。也可以用e.target.nodeName==='LI'或e.target.constructor===HTMLLIElement来判断是不是点击了li元素")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("matches")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("selector"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cb")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cb")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br")])]),a("h2",{attrs:{id:"_3、事件流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、事件流"}},[t._v("#")]),t._v(" 3、事件流")]),t._v(" "),a("p",[a("strong",[t._v("事件流")]),t._v("：")]),t._v(" "),a("p",[t._v("从页面中接收事件的顺序。事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即 DOM 事件流。")]),t._v(" "),a("p",[a("strong",[t._v("事件流三阶段")])]),t._v(" "),a("ul",[a("li",[t._v("捕获阶段："),a("code",[t._v("window")]),t._v(" 往事件触发处传播，遇到注册的捕获事件会触发。")]),t._v(" "),a("li",[t._v("当前目标阶段：传播到事件触发处。")]),t._v(" "),a("li",[t._v("冒泡阶段：从事件触发处往 "),a("code",[t._v("window")]),t._v(" 传播，遇到注册的冒泡事件会触发。\n"),a("ul",[a("li",[t._v("事件冒泡本身的特性会带来坏处（阻止冒泡），也会带来好处（事件委托）。")])])])]),t._v(" "),a("p",[a("code",[t._v("addEventListener()")]),t._v("和 "),a("code",[t._v("removeEventListener()")]),t._v(" 第三个参数：true：在捕获阶段调用事件处理程序；false 或空：在冒泡阶段调用事件处理程序（一般用 false）")]),t._v(" "),a("p",[a("strong",[t._v("一个 DOM 元素绑定多个事件时，先发生捕获事件，后发生冒泡事件")]),t._v("。同一个元素的 onclick 绑定的冒泡和 addEventListener 的冒泡，绑定越早执行越早。")]),t._v(" "),a("h2",{attrs:{id:"_4、事件对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、事件对象"}},[t._v("#")]),t._v(" 4、事件对象")]),t._v(" "),a("p",[t._v("event 对象代表事件的状态，比如键盘按键的状态、鼠标的位置等。事件发生后，跟事件相关的一系列信息数据的集合都放在这个对象中。")]),t._v(" "),a("p",[t._v("event 是一个形参，系统帮我们设定为事件对象，不需要传递实参过去。当我们绑定事件时，event 对象会被系统自动创建，并一次传递给事件处理函数。")]),t._v(" "),a("p",[t._v("兼容性：e = e || window.event")]),t._v(" "),a("p",[a("strong",[t._v("常见的事件对象的属性和方法")]),t._v("：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("e.target：返回的是触发事件的对象")]),t._v(" "),a("ul",[a("li",[t._v("兼容性：target = e.target || e.srcElement")])])]),t._v(" "),a("li",[a("p",[t._v("e.currentTarget：约等于 this（this 返回的是绑定事件的对象）")])]),t._v(" "),a("li",[a("p",[t._v("e.type：返回事件类型")])]),t._v(" "),a("li",[a("p",[t._v("e.preventDefault()：阻止默认行为（普通浏览器）")]),t._v(" "),a("ul",[a("li",[t._v("e.returnValue：ie678")]),t._v(" "),a("li",[t._v("return false：没有兼容性问题，return 后面的代码不执行，仅限于传统绑定方式")])])]),t._v(" "),a("li",[a("p",[t._v("e.stopPropagation()：阻止事件冒泡。防止对事件流中"),a("strong",[t._v("所有后续节点")]),t._v("中的事件侦听器进行处理。")]),t._v(" "),a("ul",[a("li",[t._v("e.cancelbubble = true：ie678")]),t._v(" "),a("li",[t._v("e.stopImmediatePropagation()：阻止事件冒泡。防止对事件流中"),a("strong",[t._v("当前节点和所有后续节点")]),t._v("中的事件侦听器进行处理")])])])]),t._v(" "),a("h2",{attrs:{id:"_5、事件委托"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、事件委托"}},[t._v("#")]),t._v(" 5、事件委托")]),t._v(" "),a("p",[a("strong",[t._v("背景")]),t._v("：")]),t._v(" "),a("p",[t._v("给每一条删除按钮都添加点击事件的回调。存在的问题：首先，每个函数都是对象，都会占用内存，内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的 DOM 访问次数，会延迟整个页面的交互就绪时间。")]),t._v(" "),a("p",[a("strong",[t._v("原理")]),t._v("：")]),t._v(" "),a("p",[t._v("不是每个子节点单独设置事件监听器，而是事件监听器设置在父节点上，然后利用"),a("strong",[t._v("浏览器事件冒泡")]),t._v("机制影响设置每个子节点。")]),t._v(" "),a("p",[a("strong",[t._v("例子")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" ul "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementsByTagName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ul'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 给所有li统一设置事件处理程序")]),t._v("\nul"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onclick")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" e "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" e "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("event\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" target "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("srcElement\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nodeName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toLowerCase")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'li'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerHTML"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br")])]),a("p",[a("strong",[t._v("优点")]),t._v("：")]),t._v(" "),a("ul",[a("li",[t._v("减少事件注册，节省内存。")]),t._v(" "),a("li",[t._v("简化了 dom 节点更新时，相应事件的更新（绑定或解绑）。")])]),t._v(" "),a("p",[a("strong",[t._v("缺点")]),t._v("：")]),t._v(" "),a("ul",[a("li",[t._v("事件委托基于冒泡，对于不冒泡的事件不支持。比如 focus、blur 之类的事件。")]),t._v(" "),a("li",[t._v("mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，性能消耗高。")]),t._v(" "),a("li",[t._v("层级过多，冒泡过程中，可能会被某层阻止掉。")])]),t._v(" "),a("p",[a("strong",[t._v("适合用事件委托的事件")]),t._v("：")]),t._v(" "),a("p",[t._v("click，mousedown，mouseup，keydown，keyup，keypress")]),t._v(" "),a("p",[a("strong",[t._v("不适合用事件委托的事件")]),t._v("：")]),t._v(" "),a("p",[t._v("mouseover/mouseout/mousemove，每次都要计算它的位置，非常不好把控。focus，blur 之类的，本身就没用冒泡的特性。")])])}),[],!1,null,null,null);s.default=e.exports}}]);