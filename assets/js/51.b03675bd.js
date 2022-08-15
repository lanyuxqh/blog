(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{610:function(s,t,a){"use strict";a.r(t);var n=a(5),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"_14-dom"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_14-dom"}},[s._v("#")]),s._v(" 14. DOM")]),s._v(" "),a("h2",{attrs:{id:"_1、dom-概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、dom-概念"}},[s._v("#")]),s._v(" 1、DOM 概念")]),s._v(" "),a("p",[a("strong",[s._v("DOM")]),s._v("：")]),s._v(" "),a("p",[s._v("文档对象模型，提供对应的属性和方法，可以让 JS 操作页面中的 DOM 元素。")]),s._v(" "),a("p",[a("strong",[s._v("DOM 树")]),s._v("：")]),s._v(" "),a("ul",[a("li",[s._v("文档：一个页面就是一个文档，document。")]),s._v(" "),a("li",[s._v("元素：页面中所有标签都是元素，element。")]),s._v(" "),a("li",[s._v("节点：页面中所有内容都是节点（文档、标签、属性、文本、注释等），node。\n"),a("ul",[a("li",[s._v("文档节点：整个 HTML 文档。")]),s._v(" "),a("li",[s._v("元素节点：HTML 标签。")]),s._v(" "),a("li",[s._v("属性节点：元素的属性。")]),s._v(" "),a("li",[s._v("文本节点：HTML 标签中的文本内容（包括标签之间的空格、换行）。")])])])]),s._v(" "),a("p",[a("em",[s._v("DOM 将以上内容都看作是对象。")])]),s._v(" "),a("p",[a("strong",[s._v("DOM 的用途")]),s._v("：")]),s._v(" "),a("ul",[a("li",[s._v("找元素节点")]),s._v(" "),a("li",[s._v("设置元素的属性值")]),s._v(" "),a("li",[s._v("设置元素的样式")]),s._v(" "),a("li",[s._v("动态创建和删除元素")]),s._v(" "),a("li",[s._v("事件的触发响应")])]),s._v(" "),a("h2",{attrs:{id:"_2、dom-操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、dom-操作"}},[s._v("#")]),s._v(" 2、DOM 操作")]),s._v(" "),a("h3",{attrs:{id:"_1-查找元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-查找元素"}},[s._v("#")]),s._v(" 1）查找元素")]),s._v(" "),a("p",[a("strong",[s._v("利用 DOM 提供的方法获取元素")])]),s._v(" "),a("p",[a("strong",[s._v("1.getElementById()")]),s._v("：通过元素 ID 获取，返回第一次出现的元素。")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" div "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'main'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("strong",[s._v("2.getElementsByTagName()")]),s._v("：通过标签名获取，返回元素对象的集合 HTMLCollection（以类数组的形式存储）。")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" divs "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getElementsByTagName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'div'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 所有")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" lis "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getElementsByTagName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'li'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 父元素中")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("strong",[s._v("3.getElementsByClassName()")]),s._v("：通过类名获取，返回元素对象的集合。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" boxs "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getElementsByClassName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'box'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("strong",[s._v("4.querySelector()")]),s._v("： 通过选择器获取，接受一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，则返回 null。")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" div "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("querySelector")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'#main'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" body "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("querySelector")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'body'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" box "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("querySelector")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'.box'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("5.querySelectorAll()")]),s._v("：与 querySelector()类似，返回元素对象的集合。")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" lis "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("querySelectorAll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'li'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" boxs "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("querySelectorAll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'.box'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("strong",[s._v("6.获取其他特殊元素")]),s._v("：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("documentElement "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// html")]),s._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("body "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// body")]),s._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("all "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 所有")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("利用节点层级关系获取元素")])]),s._v(" "),a("p",[s._v("节点：node，构成 HTML 文档最基本的单元。至少拥有 nodeType（1：元素节点，2：属性节点，3：文本节点。）、nodeName、nodeValue。")]),s._v(" "),a("p",[a("strong",[s._v("1.获取当前元素的父节点")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("parentNode\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("strong",[s._v("2.获取当前元素的子节点")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("chilidNodes "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回所有子节点，包括元素节点、文本节点等。（回车也会当做一个节点）")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("chlidren "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回所有子元素节点，只返回元素节点")]),s._v("\n\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("firstChild "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//  返回第一个子节点，包括元素节点、文本节点等")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("firstElementChild "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回第一个子节点，只返回元素节点，兼容性问题")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 实际开发")]),s._v("\n\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastChild "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回最后一个子节点，包括元素节点、文本节点等")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastElementChild "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回最后一个子节点，只返回元素节点，兼容性问题")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("length "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 实际开发")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("p",[a("strong",[s._v("3.获取当前元素的兄弟节点")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("nextSibling "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回下一个兄弟节点，包括元素节点、文本节点等。")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("nextElementSibling "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回下一个兄弟节点，只返回元素节点，兼容性问题")]),s._v("\n\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("previousSibling "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回上一个兄弟节点，包括元素节点、文本节点等。")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("previousElementSibling "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回上一个兄弟节点，只返回元素节点，兼容性问题")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h3",{attrs:{id:"_2-创建-添加-删除元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-创建-添加-删除元素"}},[s._v("#")]),s._v(" 2）创建/添加/删除元素")]),s._v(" "),a("p",[a("strong",[s._v("1.创建节点")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'h3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 创建一个元素节点")]),s._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("createTextNode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("String"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 创建一个文本节点")]),s._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("createAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'class'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 创建一个属性节点")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("三种动态创建元素的区别")])]),s._v(" "),a("ul",[a("li",[s._v("document.write()：直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘。")]),s._v(" "),a("li",[s._v("element.innerHTML：将内容写入某个 DOM 节点，不会导致页面全部重绘 innerHTML 创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍复杂。")]),s._v(" "),a("li",[s._v("document.createElement()：创建多个元素效率稍低一点点，结构更清晰。")])]),s._v(" "),a("p",[a("strong",[s._v("2.添加节点")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("appendChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 往element内部最后面添加一个节点")]),s._v("\nelelment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("insertBefore")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("newNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" existingNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在element内部的中在existingNode前面插入newNode")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("strong",[s._v("6.删除节点")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("removeChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 删除当前节点下指定的子节点，删除成功返回该被删除的节点，否则返回null")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("strong",[s._v("7.替换节点")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("newNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" existingNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 使用指定的子节点替换已有的子节点")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("strong",[s._v("8.复制节点")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cloneNode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回调用该方法的节点的一个副本，参数为空或false，浅拷贝，只复制标签不复制里面的内容，参数为true，深拷贝。")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_3-修改元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-修改元素"}},[s._v("#")]),s._v(" 3）修改元素")]),s._v(" "),a("p",[a("strong",[s._v("1.修改元素内容")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("innerHTML "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 识别html标签，保留空格和换行，W3C标准，可读写")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("innerText "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 不识别html标签，去除空格和换行，非标准，可读写，节点可见")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("textContent "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 不识别html标签，保留空格和换行，非标准，可读写")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("2.修改元素属性")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("属性 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 元素本身自带的属性")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("属性 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'值'")]),s._v("\n\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'属性'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 程序员自定义的属性，兼容性问题")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'属性'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'值'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("removeAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'属性'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("dataset"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("属性 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ，H5规定自定义属性以'data-'开头，获取H5自定义属性")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[a("strong",[s._v("3.修改样式")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("backgroundColor"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("“#eea”"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 行内样式")]),s._v("\nelement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("className"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"change"')]),s._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 类名样式，class为保留字，会覆盖类名")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);