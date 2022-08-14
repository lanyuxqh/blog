---
title: 正则表达式
date: 2022-6-25
tags:
  - javascript
categories:
  - javascript
---

# 正则表达式

**正则表达式 (regular expression)**： 描述了一种字符串匹配的模式（pattern），可以用来检查一个串是否含有某种子串、将匹配的子串替换或者从某个串中取出符合某个条件的子串等。

优势：与普通函数操作字符串来比较，正则表达式可以写出更简洁、功能强大的代码。

```js
let str = 'xqh1997.0211@alice!=123'
console.log([...str].filter(item => !Number.isNaN(parseInt(item))).join('')) // 数组过滤
console.log(str.match(/\d/g).join('')) // 正则
```

## 1、基本使用

**1）创建正则**

- 字面量创建：使用//包裹的字面量创建方式是推荐的作法，但它不能在其中使用变量

```js
let str = 'xqh1997.0211@alice!=123'
console.log(/alice/.test(str))
let a = ':'
// console.log(/a/.test(str)) // 使用 a 变量时将不可以查询
console.log(eval(`/${a}/`).test(str)) // 使用 eval 转换为 js 语法来实现将变量解析到正则中
```

- 对象创建：当正则需要动态创建时使用对象方式，参数是字符串

```js
let str = 'xqh1997.0211@alice!=123'
let a = ':'
let reg = new RegExp(a)
console.log(reg.test(str))
```

**2）模式修饰**

| 修饰符 | 说明                                             |
| ------ | ------------------------------------------------ |
| i      | 不区分大小写字母的匹配                           |
| g      | 全局搜索所有匹配内容                             |
| m      | 视为多行                                         |
| s      | 视为单行（忽略换行符），使用`.` 可以匹配所有字符 |
| y      | 从 `regexp.lastIndex` 开始匹配                   |
| u      | 正确处理四个字符的 UTF-16 编码                   |

**3）元字符**

| 元字符 | 说明                                                 | 示例          |
| ------ | ---------------------------------------------------- | ------------- |
| \d     | 匹配任意一个数字                                     | [0-9]         |
| \D     | 与除了数字以外的任何一个字符匹配                     | [^0-9]        |
| \w     | 与任意一个英文字母，数字或下划线匹配                 | [a-zA-Z_]     |
| \W     | 除了字母，数字或下划线外与任何字符匹配               | [^a-za-z_]    |
| \s     | 任意一个空白字符匹配，如空格，制表符`\t`，换行符`\n` | [\n\f\r\t\v]  |
| \S     | 除了空白符外任意一个字符匹配                         | [^\n\f\r\t\v] |
| .      | 匹配除换行符外的任意字符                             |               |

- `|` 这个符号代表选择修饰符，也就是 `|` 左右两侧有一个匹配到就可以。
- `\ ` 转义用于改变字符的含义，用来对某个字符有多种语义时的处理。（使用 `RegExp` 构建正则时在转义上会有些区别）
- `^` 匹配字符串的开始，`$` 匹配字符串的结束，忽略换行符。

**4）原子表**

| 原子表 | 说明                               |
| ------ | ---------------------------------- |
| []     | 只匹配其中的一个原子               |
| [^]    | 只匹配"除了"其中字符的任意一个原子 |
| [0-9]  | 匹配 0-9 任何一个数字              |
| [a-z]  | 匹配小写 a-z 任何一个字母          |
| [A-Z]  | 匹配大写 A-Z 任何一个字母          |

- 可以使用 `[\s\S]` 或 `[\d\D]` 来匹配所有字符
- 原子表中有些正则字符不需要转义，如果转义也是没问题的，可以理解为在原子表中`.` 就是小数点

**5）原子组**

如果一次要匹配多个元子，可以通过元子组完成

- 原子组与原子表的差别在于原子组一次匹配多个元子，而原子表则是匹配任意一个字符
- 元字符组用 `()` 包裹

在`match`中使用原子组匹配，会将每个组数据返回到结果中。

- 0 为匹配到的完成内容
- **1/2/3 等为原子组内容**
- index 匹配的开始位置
- input 原始数据
- groups 组别名

引用分组

- `\n` 在匹配时引用原子组， `$n` 指在替换时使用匹配的组数据。

```js
let hd = `
  <h1>houdunren</h1>
  <span>后盾人</span>
  <h2>hdcms</h2>
`

let reg = /<(h[1-6])>([\s\S]*)<\/\1>/gi
console.log(hd.replace(reg, `<p>$2</p>`))
```

- 如果只希望组参与匹配，便不希望返回到结果中使用 `(?:` 处理。

```js
let hd = `
  https://www.houdunren.com
  http://houdunwang.com
  https://hdcms.com
`

let reg = /https?:\/\/((?:\w+\.)?\w+\.(?:com|org|cn))/gi
while ((v = reg.exec(hd))) {
  console.dir(v)
}
```

分组别名

- 组别名使用 `?<>` 形式定义

```js
let hd = `
  <h1>houdunren</h1>
  <span>后盾人</span>
  <h2>hdcms</h2>
`
let reg = /<(?<tag>h[1-6])>(?<con>[\s\S]*)<\/\1>/gi
console.log(hd.replace(reg, `<p>$<con></p>`))
```

**6）重复匹配**

正则表达式在进行重复匹配时，默认是贪婪匹配模式，也就是说会尽量匹配更多内容。

| 符号  | 说明              |
| ----- | ----------------- |
| \*    | 重复零次或更多次  |
| +     | 重复一次或更多次  |
| ?     | 重复零次或一次    |
| {n}   | 重复 n 次         |
| {n,}  | 重复 n 次或更多次 |
| {n,m} | 重复 n 到 m 次    |

**禁止贪婪**：可以通过?进行修饰来禁止重复匹配

| 使用   | 说明                              |
| ------ | --------------------------------- |
| \*?    | 重复任意次，但尽可能少重复        |
| +?     | 重复 1 次或更多次，但尽可能少重复 |
| ??     | 重复 0 次或 1 次，但尽可能少重复  |
| {n,}?  | 重复 n 次以上，但尽可能少重复     |
| {n,m}? | 重复 n 到 m 次，但尽可能少重复    |

**7）字符方法**

- search：检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，并返回字串的起始位置。

```js
let str = 'houdunren.com'
console.log(str.search(/\.com/i))
```

- match：获取匹配内容，全局不会返回匹配细节。

```js
let hd = 'houdunren'
console.log(hd.match(/u/))
let body = document.body.innerHTML
let result = body.match(/<(h[1-6])>[\s\S]+?<\/\1>/g)
console.table(result)
```

- matchAll：在新浏览器中支持使用 `matchAll` 操作，并返回迭代对象

```js
let str = 'houdunren'
let reg = /[a-z]/gi
for (const iterator of str.matchAll(reg)) {
  console.log(iterator)
}

// 自定义 matchAll
String.prototype.matchAll = function (reg) {
  let res = this.match(reg)
  if (res) {
    let str = this.replace(res[0], '^'.repeat(res[0].length))
    let match = str.matchAll(reg) || []
    return [res, ...match]
  }
}
let str = 'houdunren'
console.dir(str.matchAll(/(U)/i))
```

- split：使用字符串或正则表达式分隔字符串。

```js
let str = '2023/02-12'
console.log(str.split(/-|\//))
```

- replace：在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

```js
let hd = `
  <h1>houdunren</h1>
  <span>后盾人</span>
  <h2>hdcms</h2>
`

let reg = /<(h[1-6])>([\s\S]*)<\/\1>/gi
console.log(hd.replace(reg, `<p>$2</p>`))

console.log(
  hd.replace(reg, function (s, p1, p2) {
    return `<p>${p2}</p>`
  })
)
```

替换字符串可以插入下面的特殊变量名：

| 变量 | 说明                                                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------------------------- |
| `$$` | 插入一个 "$"。                                                                                                         |
| `$&` | 插入匹配的子串。                                                                                                       |
| $`   | 插入当前匹配的子串左边的内容。                                                                                         |
| `$'` | 插入当前匹配的子串右边的内容。                                                                                         |
| `$n` | 假如第一个参数是 `RegExp` 对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从 1 开始 |

回调函数

| 变量名            | 代表的值                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `match`           | 匹配的子串。（对应于上述的$&。）                                                                                                                                                                       |
| `p1,p2, ...`      | 假如 replace()方法的第一个参数是一个 `RegExp` 对象，则代表第 n 个括号匹配的字符串。（对应于上述的$1，$2 等。）例如，如果是用 `/(\a+)(\b+)/` 这个来匹配，`p1` 就是匹配的 `\a+`，`p2` 就是匹配的 `\b+`。 |
| `offset`          | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 `'abcd'`，匹配到的子字符串是 `'bc'`，那么这个参数将会是 1）                                                                               |
| `string`          | 被匹配的原字符串。                                                                                                                                                                                     |
| NamedCaptureGroup | 命名捕获组匹配的对象                                                                                                                                                                                   |

**8）正则方法**

- test：检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。

```js
console.log(/^\d+/.test('a123'))
```

- exec：不使用 `g` 修饰符时与 `match` 方法使用相似，使用 `g` 修饰符后可以循环调用直到全部匹配完。（依靠 lastIndex）

```js
let reg = /\d/g
let str = '123abc45'
console.log(str.match(reg))
console.log(reg.lastIndex)
console.log(reg.exec(str))
console.log(reg.lastIndex)
while ((res = reg.exec(str))) {
  console.log(res)
}
```

**9）断言匹配**

断言虽然写在扩号中但它不是组，所以**不会出现在匹配结果中**，可以将断言理解为正则中的条件。

- `(?=exp)` 匹配后面为 `exp` 的内容

- `(?<=exp)` 匹配前面为 `exp` 的内容
- `(?!exp)` 后面不能出现 `exp` 指定的内容
- `(?<!exp)` 前面不能出现 `exp` 指定的内容

## 2、常见应用

### 1）转化成驼峰形式

```
{'a_b': {'a_b_c': {'a_b_c_d': '1'}}}  --->  {'aB': {'aBC': {'aBCD': '1'}}}
```

```js
function underline2Hump(s) {
  return s.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}
// console.log(underline2Hump("a_b_c"));
function hump2Underline(s) {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}
// console.log(hump2Underline("aBC"));

function json2Hump(obj) {
  if (!isObject(obj)) return obj
  const res = {}
  Object.keys(obj).forEach(key => {
    const val = obj[key]
    let newkey = underline2Hump(key)
    res[newkey] = isObject(val) ? json2Hump(val) : val
  })
  return res
}
function json2Underline(obj) {
  if (!isObject(obj)) return obj
  const res = {}
  Object.keys(obj).forEach(key => {
    const val = obj[key]
    let newkey = hump2Underline(key)
    res[newkey] = isObject(val) ? json2Underline(val) : val
  })
  return res
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const obj1 = { a_b: { a_b_c: { a_b_c_d: '1' } } }
console.log(json2Hump(obj1))
const obj2 = { aB: { aBC: { aBCD: '1' } } }
console.log(json2Underline(obj2))
```

### 2）数字转成千分位

- 第一个逗号前最多可以有 1 至 3 个数字，正则：`/\d{1,3}/`

- 第一个逗号后面数字的个数是 3 的倍数，正则：`/(\d{3})+$/`
- 判断后面是否满足条件`(?=)`：配合正则表达式进行匹配，但是不获取该匹配。下次匹配还是从该位置开始。

```js
function formatNumber(num) {
  let s = num.toString()
  let reg = s.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g
  return s.replace(reg, '$1,')
}
let num = 123456789.8888
console.log(formatNumber(num)) // 123,456,789.8888

function formatNumber(num) {
  let s = num.toString()
  let reg = s.indexOf('.') > -1 ? /(\d{1,3})(?=(\d{3})+\.)/g : /(\d{1,3})(?=(\d{3})+$)/g
  return s.replace(reg, '$1,')
}
let num = 123456789.8888
console.log(formatNumber(num))
```

### 3）去除字符串首尾空格

```js
String.prototype.trim = function () {
  var reg = /(^\s*|\s*$)/g // 表示以空格开头或以空格结尾  /g：全局搜索
  return this.replace(reg, '')
}
```

### 4）模版变量替换

```js
// 写一个方法，传入模板和内容后，输出正确的文本
var template = '我是一名{{defaultgrade}}学生，我的名字叫{{defaultname}}'
var content = { defaultgrade: '初中', defaultname: '张三' }
function change(template, content) {
  return template.replace(/{{(.*?)}}/g, function (match, key) {
    return content[key]
  })
}
console.log(change(template, content))
```

### 5）lodash.get

```js
function lodash_get(obj, path, defaultVal = 'undefined') {
  let newpath = []
  if (Array.isArray(path)) {
    newpath = path
  } else {
    newpath = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  }
  return (
    newpath.reduce((pre, cur) => {
      return (pre || {})[cur]
    }, obj) || defaultVal
  )
  // let res = obj;
  // for (let key of newpath) {
  //   res = res[key];
  //   if (res === undefined) return defaultVal;
  // }
  // return res;
}
```

### 6) 子串索引

```js
function strIndexOf(str, searchStr, startIndex) {
  const reg = new RegExp(`${searchStr}`, 'ig')
  reg.lastIndex = startIndex
  let res = reg.exec(str)
  console.log(res)
  return res ? res.index : -1
}
const res = strIndexOf('hello world hello', 'll', 5)
console.log(res)
```

### 7）验证 IP 地址

```js
var validIPAddress = function (queryIP) {
  const ipv4Reg =
    /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/
  const ipv6Reg = /^([0-9a-fA-F]{1,4})(\:[0-9a-fA-F]{1,4}){7}$/
  if (ipv4Reg.test(queryIP)) return 'IPv4'
  if (ipv6Reg.test(queryIP)) return 'IPv6'
  return 'Neither'
}
```

[js正则表达式常见面试题]: https://blog.csdn.net/weixin_30911809/article/details/97520447?utm_medium=distribute.wap_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase
