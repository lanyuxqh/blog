---
title: 继承
date: 2022-1-5
tags:
  - javascript
categories:
  - javascript
---

# 继承

## 1、基本概念

子类的原型作为父类的实例，子类的实例共享父类原型的所有属性和方法。

```js
function SuperType() {
  this.property = true
}
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType() {
  this.subproperty = false
}
SubType.prototype = new SuperType() //继承了 SuperType
SubType.prototype.getSubValue = function () {
  return this.subproperty
}
var instance = new SubType()
alert(instance.getSuperValue()) //true
```

<img src="/imgs/clipboard-1595681408705.png" alt="img" />

instance 指向 SubType 的 原 型 ， SubType 的 原 型 又 指 向 SuperType 的 原 型 。 getSuperValue() 方 法 仍 然 还 在 SuperType.prototype 中，但**property 则位于 SubType.prototype 中**。这是因为 property 是一个实例属性，而 getSuperValue()则是一个原型方法。既然 SubType.prototype 现在是 SuperType 的实例，那么 property 当然就位于该实例中了。此外，要注意 **instance.constructor 现在指向的是 SuperType**，这是因为原来 SubType.prototype 中的 constructor 被重写了的缘故（实际上，不是 SubType 的原型的 constructor 属性被重写了，而是 SubType 的原型指向了另一个对象——SuperType 的原型，而这个原型对象的 constructor 属性指向的是 SuperType。）。

### 3.7.1 继承方式

#### 1）原型链继承

子类的原型对象指向父类的实例。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea28942065b145a3852e751bab7dcbfd~tplv-k3u1fbpfcp-watermark.awebp"/>

```javascript
function Parent() {
  this.name = 'parent'
  this.sex = 'boy'
}
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child() {
  this.name = 'child'
}
Child.prototype = new Parent()

var child1 = new Child()
child1.getName()
console.log(child1)
```

**缺点**：

- 因为已经制定了原型对象了，无法实现多继承（多继承就是将多个对象和成员交给当前对象）。

- 如果修改了原型对象中的引用类型属性，那么所有子类创建的实例对象都会受到影响。
- 在创建子类实例时，无法向父类构造函数传参数。

#### 2）构造继承

在子类构造函数内部使用`call`或`apply`来调用父类构造函数。

```javascript
function Parent(name) {
  this.name = name
}
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child() {
  this.sex = 'boy'
  Parent.call(this, 'child')
}
var child1 = new Child()
console.log(child1)
// child1.getName()   // 不能继承父类原型的属性和方法
```

**优点**：

- 解决了原型链继承中子类实例共享父类引用对象的问题，实现了多继承。
- 创建子类实例时，可以向父类传递参数。

**缺点**：

- 构造只能继承父类的实例属性和方法，不能继承父类原型的属性和方法。
- 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能。

#### 3）组合继承

**使用原型链继承来保证子类能继承到父类原型中的属性和方法，使用构造继承来保证子类能继承到父类的实例属性和方法**。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bded4617c2f45019f37d8a7d9c77387~tplv-k3u1fbpfcp-watermark.awebp"/>

```javascript
function Parent(name) {
  this.name = name
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name) {
  Parent.call(this, name)
}

Child.prototype = new Parent()
const child1 = new Child('child')

console.log(child1)
child1.getName()
console.log(Child.prototype)
```

**优点**：

- 可以继承父类原型属性和方法，也可以继承父类实例的属性和方法。

- 弥补了原型链继承中引用属性共享的问题。
- 创建子类实例时，可以向父类传递参数。
- 函数复用。

**缺点**：

- 父类构造函数会被调用两次。
- 生成了两个实例，子类实例中的属性和方法会覆盖子类原型（父类实例）上的属性和方法，所以增加了不必要的内存。

#### 4）寄生组合继承

**背景**：组合继承需要调用两次父类的构造函数，一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。导致在调用子类型构造函数时重写继承的属性。

**寄生组合式继承**：可以通过借用构造函数来继承属性，通过原型链混成的形式来继承方法。

- **不用为了指定子类型的原型而调用超类型的构造函数，只需要超类型原型的一个副本**。

(<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11d44fbdd2f8456f96b65bda245ed1c6~tplv-k3u1fbpfcp-watermark.awebp" alt="image.png" />

```javascript
function Parent(name) {
  this.name = name
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name) {
  this.sex = 'boy'
  Parent.call(this, name)
}

// 与组合继承的区别
Child.prototype = Object.create(Parent.prototype)

var child1 = new Child('child1')

console.log(child1)
child1.getName()
```

**优点**：ES6 之前一种比较完美的继承方式

- 只调用了一次父类构造函数。
- 子类可以用到父类原型链上的属性和方法。
- 并且避免了在 Child.prototype 上面创建不必要的多余的属性。

#### 5）原型式继承

基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```js
function objcet(obj) {
  function F() {}
  F.prototype = obj
  F.prototype.constructor = F
  return new F()
}

const obj1 = {
  name: 'obj',
  a: {
    b: 1
  }
}

const obj2 = Object(obj1)
console.log(obj2)
```

在 ES5 之后可以直接使用`Object.create(proto，[propertiesObject])`方法来实现。

**优点（应用场景）**：

- 在没有必要创建构造函数，只想让一个对象与另一个对象保持类似的情况下。

**缺点**：

- 包含引用类型值的属性始终都会共享相应的值。
- 无法直接给父级构造函数使用参数。

#### 6）寄生式继承

在原型式继承的基础上再封装一层，来增强对象，之后将这个对象返回。

```javascript
function createAnother(original) {
  var clone = Object.create(original) // 通过调用 Object.create() 函数创建一个新对象
  clone.fn = function () {} // 以某种方式来增强对象
  return clone // 返回这个对象
}
```

**优点（应用场景）**：

- 主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。前面示范继承模式时使用的 object()函数不是必需的；任何能够返回新对象的函数都适用于此模式。

**缺点**：

- 使用寄生式继承来为对象添加函数，会由于**不能做到函数复用**而降低效率；这一点与构造函数模式类似。

#### 7）混入式继承

一个子类继承多个父类，可以把多个对象的属性和方法拷贝到目标对象中，若是存在同名属性的话，后面的会覆盖到前面。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2051a9e4f2cf4c4ea6e2a7c4529ee56a~tplv-k3u1fbpfcp-watermark.awebp" alt="image.png"/>

```js
function Child() {
  Parent.call(this)
  OtherParent.call(this)
}
Child.prototype = Object.create(Parent.prototype)
Object.assign(Child.prototype, OtherParent.prototype)
Child.prototype.constructor = Child
```

#### 8）ES6 类继承 extends

Class 可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多，该继承效果和寄生组合继承方式一样。

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

父类的静态方法，也会被子类继承。

```js
class Parent {
  constructor(name) {
    this.name = name
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}

const child1 = new Child('lanyu', 18)
const child2 = new Child('xqh', 20)
console.log(child1.name, child1.age)
console.log(child2.name, child2.age)
```

### 3.7.2 具体应用

1）补充完整方法，使结果正确输出

```js
let a = [1, 2, 3]
a.mutiply()
console.log(a) //1,4,9

// 具体修改如下：
Array.prototype.mutiply = function () {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i] * this[i]
  }
  return this
}
```

#
