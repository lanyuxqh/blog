(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{632:function(e,t,v){"use strict";v.r(t);var _=v(5),l=Object(_.a)({},(function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h1",{attrs:{id:"第-12-章-dom2-和-dom3"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#第-12-章-dom2-和-dom3"}},[e._v("#")]),e._v(" 第 12 章_DOM2 和 DOM3")]),e._v(" "),v("p",[e._v("DOM1 级主要定义的是 HTML 和 XML 文档的底层结构。")]),e._v(" "),v("p",[e._v("DOM2 和 DOM3 级则在这个结构的基础上引入了更多的交互能力，也支持了更高级的 XML 特性。")]),e._v(" "),v("p",[e._v("DOM2 和 DOM3 级分为许多模块（模块之间具有某种关联），分别描述了 DOM 的某个非常具体的子集。")]),e._v(" "),v("ul",[v("li",[e._v("DOM2 级核心（DOM Level 2 Core）：在 1 级核心基础上构建，为节点添加了更多方法和属性。")]),e._v(" "),v("li",[e._v("DOM2 级视图（DOM Level 2 Views）：为文档定义了基于样式信息的不同视图。")]),e._v(" "),v("li",[e._v("DOM2 级事件（DOM Level 2 Events）：说明了如何使用事件与 DOM 文档交互。")]),e._v(" "),v("li",[e._v("DOM2 级样式（DOM Level 2 Style）：定义了如何以编程方式来访问和改变 CSS 样式信息。")]),e._v(" "),v("li",[e._v("DOM2 级遍历和范围（DOM Level 2 Traversal and Range）：引入了遍历 DOM 文档和选择其特定部分的新接口。")]),e._v(" "),v("li",[e._v("DOM2 级 HTML（DOM Level 2 HTML）：在 1 级 HTML 基础上构建，添加了更多属性、方法和新接口。")])]),e._v(" "),v("h2",{attrs:{id:"_1、dom-变化"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1、dom-变化"}},[e._v("#")]),e._v(" 1、DOM 变化")]),e._v(" "),v("ul",[v("li",[e._v("“DOM2 级核心”为不同的 DOM 类型引入了一些与 XML 命名空间有关的方法。这些变化只在使用 XML 或 XHTML 文档时才有用；对于 HTML 文档没有实际意义。")]),e._v(" "),v("li",[e._v("“DOM2 级核心”还定义了以编程方式创建 Document 实例的方法，也支持了创建 DocumentType 对象。")])]),e._v(" "),v("h2",{attrs:{id:"_2、样式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2、样式"}},[e._v("#")]),e._v(" 2、样式")]),e._v(" "),v("p",[e._v("“DOM2 级样式”模块主要针对操作元素的样式信息而开发，其特性简要总结如下。")]),e._v(" "),v("ul",[v("li",[e._v("每个元素都有一个关联的 style 对象，可以用来确定和修改行内的样式。")]),e._v(" "),v("li",[e._v("要确定某个元素的计算样式（包括应用给它的所有 CSS 规则），可以使用 getComputedStyle() 方法。")]),e._v(" "),v("li",[e._v("IE 不支持 getComputedStyle() 方法，但为所有元素都提供了能够返回相同信息 currentStyle 属性。")]),e._v(" "),v("li",[e._v("可以通过 document.styleSheets 集合访问样式表。")]),e._v(" "),v("li",[e._v("除 IE 之外的所有浏览器都支持针对样式表的这个接口，IE 也为几乎所有相应的 DOM 功能提供了自己的一套属性和方法。")])]),e._v(" "),v("h2",{attrs:{id:"_3、遍历和范围"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3、遍历和范围"}},[e._v("#")]),e._v(" 3、遍历和范围")]),e._v(" "),v("p",[e._v("“DOM2 级遍历和范围”模块提供了与 DOM 结构交互的不同方式，简要总结如下。")]),e._v(" "),v("ul",[v("li",[e._v("遍历即使用 NodeIterator 或 TreeWalker 对 DOM 执行深度优先的遍历。")]),e._v(" "),v("li",[e._v("NodeIterator 是一个简单的接口，只允许以一个节点的步幅前后移动。而 TreeWalker 在提供相同功能的同时，还支持在 DOM 结构的各个方向上移动，包括父节点、同辈节点和子节点等方向。")]),e._v(" "),v("li",[e._v("范围是选择 DOM 结构中特定部分，然后再执行相应操作的一种手段。")]),e._v(" "),v("li",[e._v("使用范围选区可以在删除文档中某些部分的同时，保持文档结构的格式良好，或者复制文档中的相应部分。")])])])}),[],!1,null,null,null);t.default=l.exports}}]);