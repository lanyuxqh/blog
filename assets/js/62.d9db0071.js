(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{623:function(e,v,_){"use strict";_.r(v);var a=_(5),t=Object(a.a)({},(function(){var e=this,v=e.$createElement,_=e._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("h1",{attrs:{id:"第-11-章-set-和-map-数据结构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#第-11-章-set-和-map-数据结构"}},[e._v("#")]),e._v(" 第 11 章_Set 和 Map 数据结构")]),e._v(" "),_("h2",{attrs:{id:"一、set"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、set"}},[e._v("#")]),e._v(" 一、Set")]),e._v(" "),_("ol",[_("li",[e._v("ES6 提供了新的数据结构 "),_("code",[e._v("Set")]),e._v("。它类似于数组，但是成员的值都是唯一的，没有重复的值。")]),e._v(" "),_("li",[_("code",[e._v("new Set()")]),e._v("：接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数。")]),e._v(" "),_("li",[e._v("在 "),_("code",[e._v("Set")]),e._v(" 内部，两个"),_("code",[e._v("NaN")]),e._v("是相等的。两个对象总是不相等的。")]),e._v(" "),_("li",[_("code",[e._v("Set")]),e._v("实例的属性和方法\n"),_("ul",[_("li",[e._v("属性\n"),_("ul",[_("li",[_("code",[e._v("Set.prototype.constructor")]),e._v("：构造函数，默认就是"),_("code",[e._v("Set")]),e._v("函数。")]),e._v(" "),_("li",[_("code",[e._v("Set.prototype.size")]),e._v("：返回"),_("code",[e._v("Set")]),e._v("实例的成员总数。")])])]),e._v(" "),_("li",[e._v("方法\n"),_("ul",[_("li",[_("code",[e._v("Set.prototype.add(value)")]),e._v("：添加某个值，返回"),_("code",[e._v("Set")]),e._v(" 结构本身。")]),e._v(" "),_("li",[_("code",[e._v("Set.prototype.delete(value)")]),e._v("：删除某个值，返回一个布尔值，表示删除是否成功。")]),e._v(" "),_("li",[_("code",[e._v("Set.prototype.has(value)")]),e._v("：返回一个布尔值，表示该值是否为"),_("code",[e._v("Set")]),e._v("的成员。")]),e._v(" "),_("li",[_("code",[e._v("Set.prototype.clear()")]),e._v("：清除所有成员，没有返回值。")])])])])]),e._v(" "),_("li",[_("code",[e._v("Array.from")]),e._v("方法可以将 "),_("code",[e._v("Set")]),e._v(" 结构转为数组。")]),e._v(" "),_("li",[e._v("遍历操作\n"),_("ul",[_("li",[_("code",[e._v("Set.prototype.keys()")]),e._v("：返回键名的遍历器（由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以"),_("code",[e._v("keys")]),e._v("方法和"),_("code",[e._v("values")]),e._v("方法的行为完全一致。）")]),e._v(" "),_("li",[_("code",[e._v("Set.prototype.values()")]),e._v("：返回键值的遍历器")]),e._v(" "),_("li",[_("code",[e._v("Set.prototype.entries()")]),e._v("：返回键值对的遍历器")]),e._v(" "),_("li",[_("code",[e._v("Set.prototype.forEach()")]),e._v("：使用回调函数遍历每个成员")])])])]),e._v(" "),_("h2",{attrs:{id:"二、weakset"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、weakset"}},[e._v("#")]),e._v(" 二、WeakSet")]),e._v(" "),_("ol",[_("li",[_("code",[e._v("WeakSet")]),e._v(" 结构与 "),_("code",[e._v("Set")]),e._v(" 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。\n"),_("ul",[_("li",[_("code",[e._v("WeakSet")]),e._v(" 的成员只能是对象，而不能是其他类型的值。")]),e._v(" "),_("li",[_("code",[e._v("WeakSet")]),e._v(" 中的对象都是弱引用，即垃圾回收机制不考虑 "),_("code",[e._v("WeakSet")]),e._v(" 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 "),_("code",[e._v("WeakSet")]),e._v(" 之中。")])])]),e._v(" "),_("li",[_("code",[e._v("new WeakSet()")]),e._v("：接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）")]),e._v(" "),_("li",[_("code",[e._v("WeakSet")]),e._v("实例的方法\n"),_("ul",[_("li",[_("code",[e._v("WeakSet.prototype.add(value)")]),e._v("：向 WeakSet 实例添加一个新成员。")]),e._v(" "),_("li",[_("code",[e._v("WeakSet.prototype.delete(value)")]),e._v("：清除 WeakSet 实例的指定成员。")]),e._v(" "),_("li",[_("code",[e._v("WeakSet.prototype.has(value)")]),e._v("：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。")]),e._v(" "),_("li",[_("code",[e._v("WeakSet")]),e._v(" "),_("strong",[e._v("没有")]),_("code",[e._v("size")]),e._v("属性，没有办法遍历它的成员。")]),e._v(" "),_("li",[_("code",[e._v("WeakSet")]),e._v(" 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。")])])]),e._v(" "),_("li",[_("code",[e._v("WeakSet")]),e._v(" 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。")])]),e._v(" "),_("h2",{attrs:{id:"三、map"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#三、map"}},[e._v("#")]),e._v(" 三、Map")]),e._v(" "),_("ol",[_("li",[_("p",[_("code",[e._v("Object")]),e._v(" 结构提供了“字符串—值”的对应，"),_("code",[e._v("Map")]),e._v(" 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。")])]),e._v(" "),_("li",[_("p",[_("code",[e._v("new Map()")]),e._v("：任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作"),_("code",[e._v("Map")]),e._v("构造函数的参数。")])]),e._v(" "),_("li",[_("p",[_("em",[e._v("注意，只有对同一个对象的引用，"),_("code",[e._v("Map")]),e._v(" 结构才将其视为同一个键。")])])]),e._v(" "),_("li",[_("p",[e._v("如果 "),_("code",[e._v("Map")]),e._v(" 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，"),_("code",[e._v("Map")]),e._v(" 将其视为一个键，比如"),_("code",[e._v("0")]),e._v("和"),_("code",[e._v("-0")]),e._v("就是一个键，布尔值"),_("code",[e._v("true")]),e._v("和字符串"),_("code",[e._v("true")]),e._v("则是两个不同的键。另外，"),_("code",[e._v("undefined")]),e._v("和"),_("code",[e._v("null")]),e._v("也是两个不同的键。虽然"),_("code",[e._v("NaN")]),e._v("不严格相等于自身，但 Map 将其视为同一个键。")])]),e._v(" "),_("li",[_("p",[_("code",[e._v("Map")]),e._v("实例的属性和方法")]),e._v(" "),_("ul",[_("li",[e._v("属性\n"),_("ul",[_("li",[_("code",[e._v("Map.prototype.constructor")]),e._v("：构造函数，默认就是"),_("code",[e._v("Map")]),e._v("函数。")]),e._v(" "),_("li",[_("code",[e._v("Map.prototype.size")]),e._v("：返回"),_("code",[e._v("Map")]),e._v("实例的成员总数。")])])]),e._v(" "),_("li",[e._v("方法\n"),_("ul",[_("li",[_("code",[e._v("Map.prototype.set(key, value)")]),e._v("：设置键名"),_("code",[e._v("key")]),e._v("对应的键值为"),_("code",[e._v("value")]),e._v("，然后返回整个 Map 结构。如果"),_("code",[e._v("key")]),e._v("已经有值，则键值会被更新，否则就新生成该键。")]),e._v(" "),_("li",[_("code",[e._v("Map.prototype.get(key)")]),e._v("：读取"),_("code",[e._v("key")]),e._v("对应的键值，如果找不到"),_("code",[e._v("key")]),e._v("，返回"),_("code",[e._v("undefined")]),e._v("。")]),e._v(" "),_("li",[_("code",[e._v("Map.prototype.has(key)")]),e._v("：返回一个布尔值，表示某个键是否在当前 Map 对象之中。")]),e._v(" "),_("li",[_("code",[e._v("Map.prototype.delete(key)")]),e._v("：删除某个键，返回"),_("code",[e._v("true")]),e._v("。如果删除失败，返回"),_("code",[e._v("false")]),e._v("。")]),e._v(" "),_("li",[_("code",[e._v("Map.prototype.clear()")]),e._v("：清除所有成员，没有返回值。")])])])])]),e._v(" "),_("li",[_("p",[e._v("遍历操作")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("Map.prototype.keys()")]),e._v("：返回键名的遍历器。")]),e._v(" "),_("li",[_("code",[e._v("Map.prototype.values()")]),e._v("：返回键值的遍历器。")]),e._v(" "),_("li",[_("code",[e._v("Map.prototype.entries()")]),e._v("：返回所有成员的遍历器。")]),e._v(" "),_("li",[_("code",[e._v("Map.prototype.forEach()")]),e._v("：遍历 Map 的所有成员。")])])]),e._v(" "),_("li",[_("p",[e._v("与其他数据结构互相转换")]),e._v(" "),_("ul",[_("li",[e._v("Map 转为数组：使用扩展运算符（"),_("code",[e._v("...")]),e._v("）")]),e._v(" "),_("li",[e._v("数组 转为 Map：将数组传入 Map 构造函数")]),e._v(" "),_("li",[e._v("Map 转为对象：自定义"),_("code",[e._v("strMapToObj")]),e._v("函数。如果所有 Map 的键都是字符串，它可以无损地转为对象；如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。")]),e._v(" "),_("li",[e._v("对象转为 Map：自定义"),_("code",[e._v("objToStrMap")]),e._v("函数。")]),e._v(" "),_("li",[e._v("Map 转为 JSON：Map 的键名都是字符串，这时可以选择转为对象 JSON (JSON.stringify(obj))；Map 的键名有非字符串，这时可以选择转为数组 JSON (JSON.stringify(arr))。")]),e._v(" "),_("li",[e._v("JSON 转为 Map：Map 转为 JSON 逆向操作 (JSON.parse())。")])])])]),e._v(" "),_("h2",{attrs:{id:"四、weakmap"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#四、weakmap"}},[e._v("#")]),e._v(" 四、WeakMap")]),e._v(" "),_("ol",[_("li",[_("p",[_("code",[e._v("WeakMap")]),e._v("结构与"),_("code",[e._v("Map")]),e._v("结构类似，也是用于生成键值对的集合。")])]),e._v(" "),_("li",[_("p",[_("code",[e._v("WeakMap")]),e._v("与"),_("code",[e._v("Map")]),e._v("的区别有两点")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("WeakMap")]),e._v("只接受对象作为键名（"),_("code",[e._v("null")]),e._v("除外），不接受其他类型的值作为键名。")]),e._v(" "),_("li",[_("code",[e._v("WeakMap")]),e._v("的键名所指向的对象（弱引用），不计入垃圾回收机制。")])])]),e._v(" "),_("li",[_("p",[_("em",[e._v("注意，"),_("code",[e._v("WeakMap")]),e._v(" 弱引用的只是键名，而不是键值。键值依然是正常引用。")])])]),e._v(" "),_("li",[_("p",[_("code",[e._v("WeakMap")]),e._v("实例的方法")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("WeakMap")]),e._v("只有四个方法可用："),_("code",[e._v("get()")]),e._v("、"),_("code",[e._v("set()")]),e._v("、"),_("code",[e._v("has()")]),e._v("、"),_("code",[e._v("delete()")]),e._v("。")]),e._v(" "),_("li",[e._v("没有"),_("code",[e._v("size")]),e._v("属性。")]),e._v(" "),_("li",[e._v("没有遍历操作（即没有"),_("code",[e._v("keys()")]),e._v("、"),_("code",[e._v("values()")]),e._v("和"),_("code",[e._v("entries()")]),e._v("方法）。")]),e._v(" "),_("li",[e._v("无法清空，即不支持"),_("code",[e._v("clear")]),e._v("方法。")])])]),e._v(" "),_("li",[_("p",[e._v("WeakMap 应用的典型场合就是 DOM 节点作为键名。（注册监听事件的 listener 对象很适合用 WeakMap 来实现，一旦 DOM 对象消失，与它绑定的监听函数也会自动消失。）")])]),e._v(" "),_("li",[_("p",[e._v("WeakMap 另一个用处是部署私有属性。")])])]),e._v(" "),_("h2",{attrs:{id:"五、weakref"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#五、weakref"}},[e._v("#")]),e._v(" 五、WeakRef")]),e._v(" "),_("ol",[_("li",[e._v("用于直接创建对象的弱引用。")]),e._v(" "),_("li",[e._v("WeakRef 实例的"),_("code",[e._v("deref()")]),e._v("方法可以判断原始对象是否已被清除。")]),e._v(" "),_("li",[e._v("弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。")]),e._v(" "),_("li",[e._v("一旦使用"),_("code",[e._v("WeakRef()")]),e._v("创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除。")])]),e._v(" "),_("h2",{attrs:{id:"六、finalizationregistry"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#六、finalizationregistry"}},[e._v("#")]),e._v(" 六、FinalizationRegistry")]),e._v(" "),_("ol",[_("li",[_("p",[e._v("用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数。")]),e._v(" "),_("div",{staticClass:"language-javascript line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-javascript"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" registry "),_("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("new")]),e._v(" "),_("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("FinalizationRegistry")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),_("span",{pre:!0,attrs:{class:"token parameter"}},[e._v("heldValue")]),e._v(" "),_("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),_("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ....")]),e._v("\n"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n")])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br")])])]),e._v(" "),_("li",[_("p",[e._v("注册表实例的"),_("code",[e._v("register()")]),e._v("方法，用来注册所要观察的目标对象。`、")]),e._v(" "),_("div",{staticClass:"language-javascript line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-javascript"}},[_("code",[e._v("registry"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),_("span",{pre:!0,attrs:{class:"token function"}},[e._v("register")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("theObject"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),_("span",{pre:!0,attrs:{class:"token string"}},[e._v("'some value'")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n")])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br")])]),_("p",[e._v("上面示例中，"),_("code",[e._v("theObject")]),e._v("就是所要观察的目标对象，一旦该对象被垃圾回收机制清除，注册表就会在清除完成后，调用早前注册的回调函数，并将"),_("code",[e._v("some value")]),e._v("作为参数（前面的"),_("code",[e._v("heldValue")]),e._v("）传入回调函数。")])])])])}),[],!1,null,null,null);v.default=t.exports}}]);