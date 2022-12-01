(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{635:function(l,v,_){"use strict";_.r(v);var e=_(5),t=Object(e.a)({},(function(){var l=this,v=l.$createElement,_=l._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[_("h1",{attrs:{id:"第-11-章-dom-扩展"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#第-11-章-dom-扩展"}},[l._v("#")]),l._v(" 第 11 章_DOM 扩展")]),l._v(" "),_("p",[l._v("尽管 DOM 作为 API 已经非常完善了，但为了实现更多的功能，仍然会有一些标准或专有的扩展。")]),l._v(" "),_("h2",{attrs:{id:"_1、选择符-api"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1、选择符-api"}},[l._v("#")]),l._v(" 1、选择符 API")]),l._v(" "),_("ul",[_("li",[l._v("querySelector()\n"),_("ul",[_("li",[l._v("接收一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null。")])])]),l._v(" "),_("li",[l._v("querySelectorAll()\n"),_("ul",[_("li",[l._v("接收一个 CSS 选择符，返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个 NodeList 的实例。")])])]),l._v(" "),_("li",[l._v("matchesSelector()\n"),_("ul",[_("li",[l._v("接收一个 CSS 选择符，如果调用元素与该选择符匹配，返回 true；否则，返回 false。")])])])]),l._v(" "),_("h2",{attrs:{id:"_2、元素遍历"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2、元素遍历"}},[l._v("#")]),l._v(" 2、元素遍历")]),l._v(" "),_("ul",[_("li",[_("p",[l._v("对于元素间的空格，在 IE9 之前，都不会返回文档节点，其它的所有浏览器都会返回文档节点。为了兼容浏览器这间的差异，又不更改已有的 DOM 标准，所以有了 Element Traversal 规范。")])]),l._v(" "),_("li",[_("p",[l._v("这个规范为元素增加了 5 个 属性")]),l._v(" "),_("ul",[_("li",[l._v("childElementCount // 返回子元素（不包括文本节点和注释）的个数。")]),l._v(" "),_("li",[l._v("firstElementChild // 指向第一个子元素。")]),l._v(" "),_("li",[l._v("lastElementChild // 指向最后一个子元素。")]),l._v(" "),_("li",[l._v("previousElementSibling // 指向前一个同辈元素。")]),l._v(" "),_("li",[l._v("nextElementSibling // 指向后一个同辈元素。")])])]),l._v(" "),_("li",[_("p",[l._v("支持的浏览器为 DOM 元素添加了这些属性，利用这些元素不必担心空白文本节点，从而可以非常方便的查找 DOM 元素了。")])])]),l._v(" "),_("h2",{attrs:{id:"_3、html5"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3、html5"}},[l._v("#")]),l._v(" 3、HTML5")]),l._v(" "),_("ul",[_("li",[l._v("与类相关的扩充\n"),_("ul",[_("li",[l._v("getElementsByClassName()\n"),_("ul",[_("li",[l._v("接收一个参数，即一个包含一或多个类名的字符串，返回带有指定类的所有元素的 NodeList。")]),l._v(" "),_("li",[l._v("传入多个类名时，类名的先后顺序不重要。")])])]),l._v(" "),_("li",[l._v("classList\n"),_("ul",[_("li",[l._v("add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。")]),l._v(" "),_("li",[l._v("contains(value)：表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。")]),l._v(" "),_("li",[l._v("remove(value)：从列表中删除给定的字符串。")]),l._v(" "),_("li",[l._v("toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。")])])])])]),l._v(" "),_("li",[l._v("焦点管理\n"),_("ul",[_("li",[l._v("document.activeElement // 引用 DOM 中当前获得了焦点的元素。")]),l._v(" "),_("li",[l._v("document.hasFocus() // 用于确定文档是否获得了焦点。")]),l._v(" "),_("li",[l._v("查询文档获知哪个元素获得了焦点，以及确定文档是否获得了焦点，这两个功能最重要的用途是提高 Web 应用的无障碍性。")])])]),l._v(" "),_("li",[l._v("HTMLDocument 的变化\n"),_("ul",[_("li",[l._v("readyState 属性\n"),_("ul",[_("li",[l._v("两个值：loading，正在加载文档；complete，已经加载完文档。")])])]),l._v(" "),_("li",[l._v("compatMode 属性\n"),_("ul",[_("li",[l._v("区分渲染页面的模式是标准的还是混杂的。标准：CSS1Compat；混杂：BackCompat。")])])]),l._v(" "),_("li",[l._v("head 属性\n"),_("ul",[_("li",[l._v("引用文档的"),_("code",[l._v("<head>")]),l._v("元素")])])])])]),l._v(" "),_("li",[l._v("字符集属性\n"),_("ul",[_("li",[l._v('charset 属性 // 表示文档中实际使用的字符集，也可以用来指定新字符集。默认"UTF-16"。')]),l._v(" "),_("li",[l._v("defaultCharset // 表示根据默认浏览器及操作系统的设置。")])])]),l._v(" "),_("li",[l._v("自定义数据属性\n"),_("ul",[_("li",[l._v("HTML5 规定可以为元素添加非标准的属性，但要添加前缀 data-，目的是为元素提供与渲染无关的信息，或者提供语义信息。")]),l._v(" "),_("li",[l._v("通过元素的 dataset 属性来访问自定义属性的值。")])])]),l._v(" "),_("li",[l._v("插入标记\n"),_("ul",[_("li",[l._v("innerHTML 属性")]),l._v(" "),_("li",[l._v("outerHTML 属性")]),l._v(" "),_("li",[l._v("insertAdjacentHTML()\n"),_("ul",[_("li",[l._v("接收两个参数：插入位置和要插入的 HTML 文本。")]),l._v(" "),_("li",[l._v('"beforebegin"，在当前元素之前插入一个紧邻的同辈元素；')]),l._v(" "),_("li",[l._v('"afterbegin"，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素；')]),l._v(" "),_("li",[l._v('"beforeend"，在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素；')]),l._v(" "),_("li",[l._v('"afterend"，在当前元素之后插入一个紧邻的同辈元素。')])])]),l._v(" "),_("li",[l._v("内存与性能问题\n"),_("ul",[_("li",[l._v("使用本节介绍的方法替换子节点可能会导致浏览器的内存占用问题。因此，最好先手工删除要被替换的元素的所有事件处理程序和 JavaScript 对象属性。")]),l._v(" "),_("li",[l._v("使用 innerHTML 属性与通过多次 DOM 操作先创建节点再指定它们之间的关系相比，效率要高得多。这是因为在设置 innerHTML 或 outerHTML 时，就会创建一个 HTML 解析器。这个解析器是在浏览器级别的代码（通常是 C++编写的）基础上运行的，因此比执行 JavaScript 快得多。")])])])])]),l._v(" "),_("li",[l._v("scrollIntoView() 方法\n"),_("ul",[_("li",[l._v("可以在所有 HTML 元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。")]),l._v(" "),_("li",[l._v("如果给这个方法传入 true 作为参数，或者不传入任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。")]),l._v(" "),_("li",[l._v("如果传入 false 作为参数，调用元素会尽可能全部出现在视口中。")])])])]),l._v(" "),_("h2",{attrs:{id:"_4、专有扩展"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4、专有扩展"}},[l._v("#")]),l._v(" 4、专有扩展")]),l._v(" "),_("ul",[_("li",[l._v("文档模式：页面的文档模式决定了可以使用什么功能。通过 document.documentMode 属性可以知道给定页面使用的是什么文档模式。")]),l._v(" "),_("li",[l._v("children 属性")]),l._v(" "),_("li",[l._v("contains() 方法 和 compareDocumentPosition() 方法")]),l._v(" "),_("li",[l._v("innerText 属性 和 outerText 属性")]),l._v(" "),_("li",[l._v("scrollIntoViewIfNeeded(alignCenter)、scrollByLines(lineCount)、scrollByPages(pageCount)")])])])}),[],!1,null,null,null);v.default=t.exports}}]);