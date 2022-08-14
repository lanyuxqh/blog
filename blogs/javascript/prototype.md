---
title: 原型
date: 2022-1-5
tags:
  - javascript
categories:
  - javascript
---

# 原型

## 1、原型

prototype：原型，函数的一个属性，指向对象

\_\_proto\_\_：隐式原型（原型链接点），对象的一个属性，指向对象

关联：每个对象都有一个\_\_proto\_\_属性，指向创建该对象的函数的 prototype。

原型对象：该对象包含了可以由特定类型的所有**实例**共享的属性和方法，原型对象的 constructor 指向构造函数本身。作用是为了创建对象时代码复用，大大减少内存消耗。

- 自定义函数由 Function 函数创建。
- **对象都是通过函数来创建的**。
- **函数也是一种对象**。
  - Function.\_\_proto\_\_===Function.prototype
  - Function.prototype.\_\_proto\_\_=Object.prototype
  - Object.\_\_proto\_\_===Function.prototype
  - Object.prototype.\_\_proto\_\_===null

<img src="https://images0.cnblogs.com/blog/138012/201409/181637013624694.png" />

```js
Object instanceof Function
Function instanceof Object
Function instanceof Function
```

## 2、原型链

每个对象（除 null）都有 `__proto__` 属性，这个属性指向创建该对象的函数的原型。而原型对象也通过`__proto__`指向它自己的原型对象，层层向上直到 Object.prototype，这样就形成了原型链。

**原型链的特点**：

- 当访问对象属性时，如果对象内部没有这个属性，就会沿着\_\_proto\_\_这条原型链一直往上找。

  - obj.hasOwnProperty(key)：区分一个属性到底是对象内部的还是从原型中找到的。这个方法来自 Object.prototype。
  - 在 for…in…循环中，key 还包括原型中的。

- 当修改原型时，与之相关的对象也会继承这一改变。

**原型链的缺点**：

- 如果被继承的实例中包含引用类型属性，那么新生成的子类实例，如果对引用类型的属性进行修改，那么其他实例的该属性也会发生变化。

- 不能向超类的构造函数中添加参数。
