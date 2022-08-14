---
title: 浏览器梳理
date: 2022-6-22
tags:
  - 浏览器
categories:
  - 浏览器
---

# 浏览器

## 1. 对浏览器的认识

**浏览器的主要功能**：将用户选择的 web 资源呈现出来，它需要从服务器请求资源，并将其显示在浏览器窗口中，资源的格式通常是 HTML，也包括 PDF、image 及其他格式。用户用 URI 来指定所请求资源的位置。

**浏览器可以分为两部分：shell 和 内核**。shell 的种类相对比较多，内核则比较少。

- shell 是指浏览器的外壳：例如菜单，工具栏等。主要是提供给用户界面操作，参数设置等等。调用内核来实现各种功能的。
- 内核是浏览器的核心。内核是基于标记语言显示内容的程序或模块。
  - 浏览器内核主要分成两部分：
    - 渲染引擎：在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，它也可以借助插件显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。
    - JS 引擎：解析和执行 javascript 来实现网页的动态效果。
  - 常见浏览器所用内核
    - IE 浏览器内核：Trident 内核；
    - Firefox 浏览器内核：Gecko 内核；
    - Safari 浏览器内核：Webkit 内核；
    - Chrome 浏览器内核：以前是 Webkit 内核，现在是 Blink 内核；
    - Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；
    - 360 浏览器、猎豹浏览器内核：IE + Chrome 双内核；
    - 搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；
    - 百度浏览器、世界之窗内核：IE 内核；

## 2. 进程与线程

### 2.1 进程和线程区别

- 最小单位：进程是 CPU 资源分配的最小单位，拥有自己的地址空间；线程是 CPU 调度和执行的最小单位，同一个进程下的所有线程共享进程的地址空间。
- 通信：进程通信需要借助进程间通信；线程间可以通过直接共享同一进程中的资源。
- 系统开销：由于创建或撤销进程时，系统都要为之分配或回收资源，如内存、I/O 等，其开销远大于创建或撤销线程时的开销。同理，在进行进程切换时，涉及当前执行进程 CPU 环境还有各种各样状态的保存及新调度进程状态的设置，而线程切换时只需保存和设置少量寄存器内容，开销较小。
- 生命周期：进程间的生命周期是相互不影响的；而如果进程挂了，进程下的所有线程都要结束生命。

### 2.2 进程通信

- 信号量：本质就是一个计数器，通过 PV 操作实现进程之间的互斥与同步。
- 管道：操作系统在内核中开辟的一段缓冲区，进程 1 可以将需要交互的数据拷贝到这段缓冲区，进程 2 就可以读取了。半双工、依赖于文件系统。
- 消息队列：一个进程向另一个进程发送一个数据块的方法。 每个数据块都被认为含有一个类型，接收进程可以独立地接收含有不同类型的数据结构，可以通过发送消息来避免命名管道的同步和阻塞问题。
- 共享内存：申请一段多进程都可以操作的内存。最快的 IPC 方式。
- 套接字 Socket：跨机器通信，比如通过浏览器发起一个 http 请求，然后服务器给你返回对应的数据，这种就是采用 Socket 的通信方式。

### 2.3 死锁

- 概念：多个进程在运行过程中因争夺资源而造成的一种僵局，当进程处于这种僵持状态时，若无外力作用，它们都将无法再向前推进。
- 原因：
  - 竞争资源：竞争不可剥夺资源（例如：系统中只有一台打印机，可供进程 P1 使用，假定 P1 已占用了打印机，若 P2 继续要求打印机打印将阻塞）；竞争临时资源（临时资源包括硬件中断、信号、消息、缓冲区内的消息等），通常消息通信顺序进行不当，则会产生死锁。
  - 进程间推进顺序非法：若 P1 保持了资源 R1，P2 保持了资源 R2，系统处于不安全状态，因为这两个进程再向前推进，便可能发生死锁。例如，当 P1 运行到 P1：Request（R2）时，将因 R2 已被 P2 占用而阻塞；当 P2 运行到 P2：Request（R1）时，也将因 R1 已被 P1 占用而阻塞，于是发生进程死锁。
- 必要条件：

  - 互斥条件：进程要求对所分配的资源进行排它性控制，即在一段时间内某资源仅为一进程所占用。
  - 不剥夺条件：进程已获得的资源在未使用完之前，不能剥夺，只能在使用完时由自己释放。
  - 请求和保持条件：当进程因请求资源而阻塞时，对已获得的资源保持不放。
  - 循环等待条件：在发生死锁时，必然存在一个进程——资源的环形链。

- 预防：（破坏必要条件）
  - 可剥夺资源：即当某进程获得了部分资源，但得不到其它资源，则释放已占有的资源（破坏不可剥夺条件）
  - 资源一次性分配：一次性分配所有资源，这样就不会再有请求了（破坏请求条件）
  - 只要有一个资源得不到分配，也不给这个进程分配其他的资源（破坏请保持条件）
  - 资源有序分配法：系统给每类资源赋予一个编号，每一个进程按编号递增的顺序请求资源，释放则相反（循环等待条件）

## 3. 浏览器的多进程架构

### 3.1 Chrome 的多个进程

- 主进程：Browser Process ，负责浏览器界面的显示与交互。各个页面的管理、创建和销毁其他进程。网络的资源管理、下载等。

- 第三方插件进程：Plugin Process，每种类型的插件对应一个进程，仅当使用该插件时才创建。

- GPU 进程：GPU Process，最多只有一个，用于 3D 绘制等。

- **渲染进程 ** ：Renderer Process，称为**浏览器内核，内部是多线程的**。主要负责页面渲染，脚本执行，事件处理等。

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/7/16f7ee19a85b3c8f~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="process_list" style="zoom:80%;" />

### 3.2 渲染进程（浏览器内核）

- **GUI 渲染线程**

  - 负责渲染浏览器界面，解析 HTML 和 CSS，构建 DOM 树和 RenderObject 树，布局和绘制等。

  - 当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时，该线程就会执行。

- **JS 引擎线程**

  - 又称为 JS 内核，负责解析 Javascript 脚本，运行代码，例如 V8 引擎。
  - JS 引擎一直等待着任务队列中任务的到来，然后加以处理。一个 Tab 页中无论什么时候都只有一个 JS 线程在运行 JS 程序。
  - **GUI 渲染线程与 JS 引擎线程是互斥的**，当 JS 引擎执行时 GUI 线程会被挂起（相当于被冻结了）。GUI 更新会被保存在一个队列中，等到 JS 引擎空闲时立即被执行。如果 JS 执行的时间过长，就会造成页面渲染不连贯。

- **事件触发线程**

  - 负责控制事件循环（可以理解，JS 引擎自己都忙不过来，需要浏览器另开线程协助）。
  - 当一个事件被触发时，该线程会把事件添加到待处理队列的队尾，等待 JS 引擎的处理。这些事件可以是当前执行的代码块如定时任务，也可来自浏览器内核的其他线程如鼠标点击、AJAX 异步请求等。
  - 由于 JS 的单线程关系所有这些事件都得排队等待 JS 引擎处理。

- **定时触发器线程**

  - setInterval 与 setTimeout 所在线程。
  - 浏览器定时计数器并不是由 JS 引擎计数的，因为 JS 引擎是单线程, 如果处于阻塞线程状态就会影响计时的准确，因此通过**单独线程**来计时并触发定时。（计时完毕后，添加到事件队列中，等待 JS 引擎空闲后执行）

- **异步 http 请求线程**

  - XMLHttpRequest 在连接后是通过浏览器新开一个线程请求，检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调放入事件队列中，再由 JS 引擎执行。

## 4. 浏览器内多个标签页之间的通讯

实现多个标签页之间的通信，本质上都是通过中介者模式来实现的。因为标签页之间没有办法直接通信，因此可以找一个中介者，让标签页和中介者进行通信，然后让这个中介者来进行消息的转发。通信方法如下：

- **使用 WebSocket 协议**，因为 WebSocket 协议可以实现服务器推送，所以服务器就可以用来当做这个中介者。标签页通过向服务器发送数据，然后由服务器向其他标签页推送转发。
- **使用 SharedWorker 的方式**，SharedWorker 会在页面存在的生命周期内创建一个唯一的线程，并且开启多个页面也只会使用同一个线程。这个时候共享线程就可以充当中介者的角色。标签页间通过共享一个线程，然后通过这个共享的线程来实现数据的交换。
- **使用 localStorage 的方式**，我们可以在一个标签页对 localStorage 的变化事件进行监听，然后当另一个标签页修改数据的时候，我们就可以通过这个监听事件来获取到数据。这个时候 localStorage 对象就是充当的中介者的角色。
- **使用 postMessage 方法**，如果我们能够获得对应标签页的引用，就可以使用 postMessage 方法，进行通信。

## 5. 浏览器缓存

### 5.1 对缓存机制的理解

浏览器缓存：指的是浏览器将用户请求过的静态资源，存储到电脑本地磁盘中，当浏览器再次访问时，就可以直接从本地加载，不需要再去服务端请求了。从而减少了服务器的负担，加快了客户端网页的加载速度，减少了多余网络数据传输。

### 5.2 缓存位置

资源缓存的位置一共有 3 种，按优先级从高到低分别是：

**Service Worker**

- Service Worker 是运行在浏览器里的一个独立线程，我们可以在其中编写 JavaScript 代码去自由控制缓存哪些资源，另外安装了 Service Worker 的页面，它的**所有请求都会经过 Service Worker**，若存在缓存的话直接读取缓存，否则继续去请求资源。在这一部分，我们也可以加入对网络状况的检查，实现**离线缓存**。

**Memory Cache**

- Memory Cache 也就是内存中的缓存，主要包含的是当前中页面中已经抓取到的资源，例如页面上已经下载的样式、脚本、图片等。内存缓存虽然**读取高效**，可是**缓存持续性很短，会随着进程的释放而释放**。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。同时，受限于内存容量，我们也不可能将太多太大的资源都存在 Memory Cache 里。

- Memory Cache 在缓存资源时并不关心返回资源的 HTTP 缓存头 Cache-Control 是什么值，同时资源的匹配也并非仅仅是对 URL 做匹配，还可能会对 Content-Type，CORS 等其他特征做校验。

**Disk Cache**

- Disk Cache 也就是存储在磁盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache **胜在容量和存储时效性**上。在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的。它会根据 HTTP Header 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。

| 比较     | 读取速度                                          | 时效性             | 容量 | 匹配优先级 |
| -------- | ------------------------------------------------- | ------------------ | ---- | ---------- |
| 内存缓存 | 快速，将编译解析后的文件直接存入该进程的内存中    | 进程结束后就会清除 | 小   | 先         |
| 硬盘缓存 | 速度比内存缓存慢，需要重新解析文件，进行 I/O 操作 | 根据过期时间清除   | 大   | 后         |

在浏览器中，浏览器会在`html`、`js`、图片等文件解析执行后直接存入内存缓存中，那么当刷新页面时只需直接从内存缓存中读取；而`css`文件则会存入硬盘文件中，所以每次渲染页面都需要从硬盘读取缓存。原因：css 只需加载一次，js 需要频繁读取。

### 5.3 缓存分类

#### 5.3.1 强缓存

浏览器在加载资源时，会根据本地缓存资源 header 中的`Expire` 和 `Cache-control` 信息判断是否命中强缓存，如果命中则直接使用本地缓存中的资源不会再向服务器发送请求。如果不命中就向服务器发起请求，更新本地缓存。

命中强缓存：本地缓存未过期 `Cache-control` > `Expire`，如果对浏览器**兼容性**要求很高的话，可以两个都使用。

**Expire**

缓存到期时间（绝对时间），过了这个时间，响应会失效；

缺点：要求服务器与客户端的时钟保持严格的同步，并且时间到后，服务器还得重新设定新时间。

**Cache-Control**

缓存资源最大有效时间（相对时间，相对的是文档的请求时间），包含的属性：

- max-age：单位是秒，缓存时间计算的方式是距离发起的时间的秒数，超过间隔的秒数缓存失效
- no-cache：可以在本地进行缓存，但是每次发起请求都需要到服务器去验证一下，如果服务器返回告诉你可以使用本地缓存，你才可以去使用本地的缓存
- no-store：禁止使用缓存（包括协商缓存），每次都向服务器请求最新的资源
- private：只有发起请求的浏览器才可以进行缓存
- public：在 HTTP 请求返回的内容经过的所有路径中，都可以对返回内容进行缓存
- must-revalidate：在缓存过期前可以使用，过期后必须向服务器验证

#### 5.3.2 协商缓存

若强缓存没有命中，则根据上次响应头中的`Last-Modified`或`Etag`在请求头中设置`If-Modified-Since`或`If-None-Match`，然后**在服务器端验证资源是否更新**。如果没有更新，则返回 304，告诉浏览器资源未更新，加载浏览器本地缓存。如果资源已经更新，返回 200 和新的数据，并更新响应头的`Etag`或`Last-Modified`属性，最后用新数据更新本地缓存。

**Last-Modified/If-Modified-Since**

`Last-Modified/If-Modified-Since`表示资源的**最后修改**时间（绝对时间）

当浏览器第一次请求资源时，服务器会返回`Last-Modified`字段；当再次请求该资源时，通过`If-Modified-Since`字段将`Last-Modified`发送回服务器。然后服务器进行比较，如果相等，则返回 `304` 表示未修改，浏览器使用本地缓存。

**ETag/If-None-Match**

`ETag/If-None-Match` 的值是对资源取 hash 的结果（摘要）。

当浏览器第一次请求资源时，服务器会返回`Etag`字段；当再次请求该资源时，通过`If-None-match` 字段将 `Etag` 发送回服务器。然后服务器进行比较，如果相等，则返回 `304` 表示未修改，浏览器使用本地缓存。

**Last-Modified 和 Etag 区别**

- Last-Modified 只能精确到秒。无法通过最后修改时间 Last-modified 判断资源是否更新，可能时间变了但内容没变。
- Etag 的精度比 Last-modified 高，属于强验证，要求资源字节级别的一致，优先级高。

**注意**：如果响应头中有 Last-modified 而没有 Expire 或 Cache-Control 时，浏览器会有自己的算法来推算出一个时间缓存该文件多久，不同浏览器得出的时间不一样，所以 Last-modified 要记得配合 Expires/Cache-Control 使用。

**为什么有了 Etag 还需要 last-modified?**

一起使用时，服务器可以根据自己缓存机制的需要，选择 ETag 或 Last-Modified 来做缓存判断的依据，甚至可以两个同时参考。有时候 Last-Modified 可以弥补 ETag 判断的缺陷，比如一些图片等静态文件的修改，如果每次扫描内容生成 ETag 来比较，显然要比直接比较修改时间慢很多**。（Etag 因为要计算 hash 所以需要占用 cpu 资源）**

#### 5.3.3 区别

它们都属于 http 缓存。

- 强缓存的优先级高于协商缓存，一般先通过强缓存判断资源是否命中，若不命中，再用协商缓存判断服务器资源是否更新；
- 强缓存如果命中则不会向服务端发起请求，协商缓存不管是否命中都会向服务端发起一次请求。
- **状态码的区别**：
  - `200`：强缓存失效时，返回新的资源文件
  - `200(from cache)`: 强缓存 Expires/Cache-Control 两者都存在，未过期，Cache-Control 优先 Expires 时，浏览器从本地获取资源成功，现在的`200(from cache)`已经变成了`from disk cache(磁盘缓存)`和`from memory cache(内存缓存)`两种
  - `304(Not Modified)`：协商缓存 Last-modified/Etag 没有过期时，服务端返回状态码 304

### 5.4 缓存过程

- 浏览器请求 a.js。
- 服务器返回 a.js，同时告诉浏览器过期绝对时间（Expires）以及相对时间（Cache-Control：max-age=10），以及 a.js 上次修改时间 Last-Modified，以及 a.js 的 Etag。
- 10 秒内浏览器再次请求 a.js，不再请求服务器，直接使用本地缓存。
- 11 秒时，浏览器再次请求 a.js，请求服务器，带上上次修改时间 If-Modified-Since 和上次的 Etag 值 If-None-Match。
- 服务器收到浏览器的 If-Modified-Since 和 If-None-Match，发现有 If-None-Match，则比较 If-None-Match 和 a.js 的 Etag 值，忽略 If-Modified-Since 的比较。
- a.js 文件内容没变化，则 Etag 和 If-None-Match 一致，服务器告诉浏览器继续使用本地缓存（304）。如果不一致则有改动，直接返回新的资源文件带上新的 Etag 值并返回 200；
- 如果服务器收到的请求只有 If-Modified-Since，则将 If-Modified-Since 和被请求文件的最后修改时间做比对，一致则命中协商缓存，返回 304；不一致则返回新的 last-modified 和文件并返回 200；
- 如此往复。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9130c2a31bde41deb268fbfb2da44b85~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img" style="zoom:80%;" />

点击刷新按钮或者按 F5、按 Ctrl+F5 （强制刷新）、地址栏回车有什么区别？

- **点击刷新按钮或者按 F5**：浏览器直接对本地的缓存文件过期，但是会带上 If-Modifed-Since，If-None-Match，这就意味着服务器会对文件检查新鲜度，返回结果可能是 304，也有可能是 200。
- **用户按 Ctrl+F5（强制刷新）**：浏览器不仅会对本地文件过期，而且不会带上 If-Modifed-Since，If-None-Match，相当于之前从来没有请求过，返回结果是 200。
- **地址栏回车**： 浏览器发起请求，按照正常流程，本地检查是否过期，然后服务器检查新鲜度，最后返回内容。

## 6. 浏览器本地存储

### 6.1 Cookie

**出现原因**：HTTP 是无状态的，服务器无法知道两个请求是否来自同一个浏览器。而实际 Web 运用中，我们会希望 HTTP 可以保存一些已有的状态信息，方便服务器端跟踪会话。在 HTML4 中可以使用 Cookie，在客户端保存诸如用户名等简单的用户信息，弥补 http 的无状态。

**概念**：Cookie 是服务器保存在浏览器的一小段文本信息，一般大小不能超过 4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。作用是区分用户和放置状态信息。

**应用场景**：

- 对话（session）管理：保存登录状态、购物车等需要记录的信息。（Cookie 和 session 结合使用，将服务端返回的 sessionId 存储到 Cookie 中，每次发请求都会携带这个 sessionId，这样服务端就知道是谁发起的请求，从而响应相应的信息。）
- 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。
- 追踪用户：记录和分析用户行为。

**缺点**：

- 数量和大小：单个域名设置的 Cookie 不应超过 30 个，每个 Cookie 的大小不能超过 4KB。
- 性能：Cookie 是随 HTTP 事务一起被发送的，因此会浪费一部分发送 Cookie 时使用的带宽。
- 使用：源生的 Cookie 接口不友好，需要程序员自己封装。
- 受到同源策略的限制。

**Cookie 与 HTTP 协议**：

- Cookie 的生成：服务器如果希望在浏览器保存 Cookie，就要在 HTTP 响应头放置一个`Set-Cookie`字段。

```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
Set-Cookie: tasty_cookie=strawberry; domain=example.com; path=/

[page content]
```

- Cookie 的发送：浏览器向服务器发送 HTTP 请求时，每个请求头都会在 HTTP 请求头放置一个`Cookie`字段。

```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

**Cookie 的属性**：

- **Name**：Cookie 的名称。
- **Value**：Cookie 的值。
- **Size**： Cookie 的大小。
- **Expires/Max-Age** ：Cookie 的超时时间。`Expires`属性指定一个具体的到期时间，它的值是 UTC 格式。`Max-Age`属性指定从现在开始 Cookie 存在的秒数。`Max-Age`的优先级高于`Expires`。不设置就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器（不是标签页），此 Cookie 失效。
- **Domain**：可以访问该 Cookie 的域名。Domain 属性只能是当前域名或者当前域名的上级域名，但设为上级域名时，不能设为顶级域名或公共域名。（顶级域名指的是 .com、.net 这样的域名，公共域名指的是开放给外部用户设置子域名的域名，比如 github.io。）浏览器发送 Cookie 时，Domain 属性必须与当前域名一致，或者是当前域名的上级域名（公共域名除外）。

- **Path**：可以访问此 Cookie 的页面路径。只要浏览器发现，`Path`属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 Cookie。比如，`Path`属性是`/`，那么请求`/docs`路径也会包含该 Cookie。
- **Secure**：指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。
- **HttpOnly**：指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是`document.cookie`属性、`XMLHttpRequest`对象和 Request API 都拿不到该属性。
- **SameSite**：限制由第三方网站引导而附带发送 Cookie。值为 Strict，完全禁止第三方 Cookie，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。值为 Lax，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外（链接，预加载请求，GET 表单）。值为 none，默认为 Lax，显式关闭`SameSite`属性，前提是必须同时设置`Secure`属性。

**基本用法**：

`document.cookie`属性用于读写当前网页的 Cookie。

- 读取：它会返回当前网页的所有 Cookie，前提是该 Cookie 不能有`HTTPOnly`属性。
- 写入：Cookie 的值必须写成`key=value`的形式。注意，等号两边不能有空格。另外，写入 Cookie 的时候，必须对分号、逗号和空格进行转义。一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加。写入 Cookie 的时候，可以一起写入 Cookie 的属性。
- 修改：只需要重新赋值就行，旧的值会被新的值覆盖。但要注意一点，在设置新 Cookie 时，`key`、`domain`、`path`和`secure`这几个选项一定要旧 Cookie 保持一样。只要有一个属性不同，就会生成一个全新的 Cookie。

- 删除：其实就是修改 Cookie 的过期时间为已过去的时间。

```js
// Cookie.js 封装
function setCookie(name, value) {
  var exp = new Date()
  exp.setTime(exp.getTime() + 12 * 60 * 60 * 1000)
  document.cookie = name + '=' + value + '; expires=' + exp.toGMTString()
}
function getCookie(name) {
  var _name = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim()
    if (c.indexOf(_name) == 0) {
      return c.substring(_name.length, c.length)
    }
  }
  return ''
}
function delCookie(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1) // 设置cookie失效时间为当前时间的前一天,说明cookie的有效期是在过去，即删除cookie
  var value = getCookie(name)
  if (value != null) document.cookie = name + '=' + value + '; expires=' + exp.toGMTString()
}

export { setCookie, getCookie, delCookie }
```

### 6.2 WebStorage

**出现原因**：Cookie 的缺点，大小和性能。

**概念**：提供了 Web 存储机制，浏览器可以安全地存储键值对，可以存储大量的数据，不参与和服务器的通信。包括 sessionStorage 和 localStorage。

- **sessionStorage**，保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空。
- **localStorage**，保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。
- 相同点：
  - 都是保存在浏览器端的数据，不同浏览器无法共享 localStorage 和 sessionStorage 信息。
  - 都是同源的，所谓同源就是同域名、同端口、同协议。不同源的页面无法共享 localStorage 和 sessionStorage 信息。
  - 具有相同的操作方法，不但可以用自身的 setItem()，getItem()等方便存取，也可以像普通对象一样用点“.”操作符，及“[]”的方式进行数据存取。
- 不同点：
  - 生命周期：localStorage 为永久存储，除非用户手动清除 localStorage 信息，否则这些信息将永远存在。sessionStorage 为临时保存，生命周期为当前窗口或标签页，一旦窗口或标签页被关闭了，sessionStorage 被清空。
  - 作用域：localStorage 信息可以在相同浏览器中同源的不同页面间共享，可以是不同标签页中的页面、也可以是不同窗口的页面。sessionStorage 信息不可以在不同页面或标签页间共享，即使是相同浏览器、相同窗口中的同源页面。

**应用场景**：

- 网站的一些不常变动的个人信息等也可以存储在本地的 LocalStorage 中；网站的换肤信息存储在本地的 LocalStorage 中。
- 由于 SessionStorage 具有时效性，所以可以用来存储一些网站的游客登录的信息，还有临时的浏览记录的信息。

**优点**：

- 大小：可以存储更大容量的数据（一般为 5MB）。每个域名的存储上限视浏览器而定。
- 性能：仅在客户端（即浏览器）中保存，不参与和服务器的通信。
- 使用：源生接口可以接受，拥有 setItem()、getItem()、removeItem()、clear()等方法。

**缺点**：

- 存在浏览器兼容问题，IE8 以下版本的浏览器不支持。
- 受到同源策略的限制。

**基本用法**：

属性和方法：

- `Storage.length`：返回保存的数据项个数。
- `Storage.setItem()`：用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。该方法没有返回值。两个参数都是字符串。如果不是字符串，会自动转成字符串，再存入浏览器。
- `Storage.getItem()`：用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回`null`。
- `Storage.removeItem()`：用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。
- `Storage.clear()`：用于清除所有保存的数据。该方法的返回值是`undefined`。
- `Storage.key()`：接受一个整数作为参数（从零开始），返回该位置对应的键名。

事件：

- storage 事件：对 Storage 对象进行任何修改，都会在文档上触发 storage 事件，可以指定这个事件的监听函数。监听函数接受一个`event`实例对象作为参数。这个实例对象有几个特有的属性，都是只读属性。
  - `StorageEvent.key`：字符串，表示发生变动的键名。如果 storage 事件是由`clear()`方法引起，该属性返回`null`。
  - `StorageEvent.newValue`：字符串，表示新的键值。如果 storage 事件是由`clear()`方法或删除该键值对引发的，该属性返回`null`。
  - `StorageEvent.oldValue`：字符串，表示旧的键值。如果该键值对是新增的，该属性返回`null`。
  - `StorageEvent.storageArea`：对象，返回键值对所在的整个对象。也说是说，可以从这个属性上面拿到当前域名储存的所有键值对。
  - `StorageEvent.url`：字符串，表示原始触发 storage 事件的那个网页的网址。

注意，该事件有一个很特别的地方，就是它不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发。也就是说，如果浏览器只打开一个窗口，可能观察不到这个事件。比如同时打开多个窗口，当其中的一个窗口导致储存的数据发生改变时，只有在其他窗口才能观察到监听函数的执行。可以通过这种机制，实现多个窗口之间的通信。

### 6.3 Cookie，LocalStorage，SessionStorage 联系与区别

**联系**：三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。

**区别**：

（1）存储大小

- cookie：4KB 左右。

- localStorage 和 sessionStorage：可以保存 5MB 的信息。

（2）生命周期

- cookie：在设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭，没有设置的话，默认是关闭浏览器后失效。
- localStorage：存储持久数据，浏览器关闭后数据不丢失，除非主动删除数据。
- sessionStorage：仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

（3）作用域

- cookie 和 localStorage 在所有同源窗口中数据都是共享的。
- sessionStorage 只在同源的同窗口(或标签页)中共享数据，也就是只在当前会话中共享。

（4）性能

- cookie：每次都会携带在 HTTP 头中，会在浏览器和服务器间来回传递，如果使用 cookie 保存过多数据会带来性能问题。

- localStorage 和 sessionStorage：仅在浏览器中保存，不参与和服务器的通信。

（5）使用

- cookie：源生的 cookie 接口不友好，需要程序员自己封装。

- localStorage 和 sessionStorage：源生接口可以接受，也可再次封装来对 Object 和 Array 有更好的支持。

（6）应用场景

- Cookie 主要用来区分用户和放置状态信息。
- 其他情况下，可以使用 storage 就用 storage。localStorage 可以用来跨页面传递参数，sessionStorage 用来保存一些临时的数据，防止用户刷新页面之后丢失了一些参数。

### 6.4 IndexedDB

**出现原因**：现有的浏览器数据储存方案，都不适合储存大量数据。

**概念**：IndexedDB 就是浏览器提供的本地数据库（更接近 NoSQL 数据库），它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。

**特点**：

- **键值对储存**。 IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以“键值对”的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。
- **异步**。 IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。
- **支持事务**。 IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
- **同源限制**。 IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
- **储存空间大**。 IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。
- **支持二进制储存**。 IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。

**基本用法**：

**1）indexedDB 对象**（浏览器原生）

- `indexedDB.open()`：用于打开数据库。这是一个异步操作，但是会立刻返回一个 IDBOpenDBRequest 对象。
  - `open()`方法的第一个参数是数据库名称，格式为字符串，不可省略；第二个参数是数据库版本，是一个大于`0`的正整数（`0`将报错），如果该参数大于当前版本，会触发数据库升级。第二个参数可省略，如果数据库已存在，将打开当前版本的数据库；如果数据库不存在，将创建该版本的数据库，默认版本为`1`。
  - 可能触发的 4 种事件。
    - **success**：打开成功。`success`事件发生后，从`openRequest.result`属性可以拿到已经打开的`IndexedDB`数据库对象。
    - **error**：打开失败。
    - **upgradeneeded**：第一次打开该数据库，或者数据库版本发生变化。
    - **blocked**：上一次的数据库连接还未关闭。
- `indexedDB.deleteDatabase()`：用于删除一个数据库，参数为数据库的名字。它会立刻返回一个`IDBOpenDBRequest`对象，然后对数据库执行异步删除。删除操作的结果会通过事件通知：`success`：删除成功；`error`：删除报错。
- `indexedDB.cmp()`：比较两个值是否为 indexedDB 的相同的主键。它返回一个整数，表示比较的结果：`0`表示相同，`1`表示第一个主键大于第二个主键，`-1`表示第一个主键小于第二个主键。

**2）IDBRequest 对象**：表示打开的数据库连接，`indexedDB.open()`方法和`indexedDB.deleteDatabase()`方法会返回这个对象。

- 属性

  - `IDBRequest.readyState`：等于`pending`表示操作正在进行，等于`done`表示操作正在完成。

  - `IDBRequest.result`：返回请求的结果。如果请求失败、结果不可用，读取该属性会报错。

  - `IDBRequest.error`：请求失败时，返回错误对象。

  - `IDBRequest.source`：返回请求的来源（比如索引对象或 ObjectStore）。

  - `IDBRequest.transaction`：返回当前请求正在进行的事务，如果不包含事务，返回`null`。

  - `IDBRequest.onsuccess`：指定`success`事件的监听函数。

  - `IDBRequest.onerror`：指定`error`事件的监听函数。

- IDBOpenDBRequest 对象继承了 IDBRequest 对象，提供了两个额外的事件监听属性。
  - `IDBOpenDBRequest.onblocked`：指定`blocked`事件（`upgradeneeded`事件触发时，数据库仍然在使用）的监听函数。
  - `IDBOpenDBRequest.onupgradeneeded`：`upgradeneeded`事件的监听函数。

**3）IDBDatabase 对象**：打开数据成功以后，可以从`IDBOpenDBRequest`对象的`result`属性上面，拿到这个对象，它表示连接的数据库。

- 属性
  - `IDBDatabase.name`：字符串，数据库名称。
  - `IDBDatabase.version`：整数，数据库版本。数据库第一次创建时，该属性为空字符串。
  - `IDBDatabase.objectStoreNames`：DOMStringList 对象（字符串的集合），包含当前数据的所有 object store 的名字。
  - `IDBDatabase.onabort`：指定 abort 事件（事务中止）的监听函数。
  - `IDBDatabase.onclose`：指定 close 事件（数据库意外关闭）的监听函数。
  - `IDBDatabase.onerror`：指定 error 事件（访问数据库失败）的监听函数。
  - `IDBDatabase.onversionchange`：数据库版本变化时触发（发生`upgradeneeded`事件，或调用`indexedDB.deleteDatabase()`）。
- 方法
  - `IDBDatabase.close()`：关闭数据库连接，实际会等所有事务完成后再关闭。
  - `IDBDatabase.createObjectStore()`：创建存放数据的对象仓库，类似于传统关系型数据库的表格，返回一个 IDBObjectStore 对象。该方法只能在`versionchange`事件监听函数中调用。
  - `IDBDatabase.deleteObjectStore()`：删除指定的对象仓库。该方法只能在`versionchange`事件监听函数中调用。
  - `IDBDatabase.transaction()`：返回一个 IDBTransaction 事务对象。

**4）IDBObjectStore 对象**：对应一个对象仓库（一张表），`IDBDatabase.createObjectStore()`方法返回这个对象。IDBDatabase 对象的`transaction()`返回一个事务对象，该对象的`objectStore()`方法也返回这个对象。

- 属性

  - `IDBObjectStore.indexNames`：返回一个类似数组的对象（DOMStringList），包含了当前对象仓库的所有索引。
  - `IDBObjectStore.keyPath`：返回当前对象仓库的主键。
  - `IDBObjectStore.name`：返回当前对象仓库的名称。
  - `IDBObjectStore.transaction`：返回当前对象仓库所属的事务对象。
  - `IDBObjectStore.autoIncrement`：布尔值，表示主键是否会自动递增。

- 方法
  - `IDBObjectStore.add()`：用于向对象仓库添加数据，返回一个 IDBRequest 对象。该方法只用于添加数据，如果主键相同会报错，因此更新数据必须使用`put()`方法。
  - `IDBObjectStore.put()`：用于更新某个主键对应的数据记录，如果对应的键值不存在，则插入一条新的记录。该方法返回一个 IDBRequest 对象。
  - `IDBObjectStore.clear()`：删除当前对象仓库的所有记录。该方法返回一个 IDBRequest 对象。
  - `IDBObjectStore.delete()`：用于删除指定主键的记录。该方法返回一个 IDBRequest 对象。
  - `IDBObjectStore.count()`：用于计算记录的数量。该方法返回一个 IDBRequest 对象。
  - `IDBObjectStore.getKey()`：用于获取主键。该方法返回一个 IDBRequest 对象。
  - `IDBObjectStore.get()`：用于获取主键对应的数据记录。该方法返回一个 IDBRequest 对象。
  - `DBObjectStore.getAll()`：用于获取对象仓库的记录。该方法返回一个 IDBRequest 对象。
  - `IDBObjectStore.getAllKeys()`：用于获取所有符合条件的主键。该方法返回一个 IDBRequest 对象。
  - `IDBObjectStore.index()`：返回指定名称的索引对象 IDBIndex。
  - `IDBObjectStore.createIndex()`：用于新建当前数据库的一个索引。该方法只能在`VersionChange`监听函数里面调用。
  - `IDBObjectStore.deleteIndex()`：用于删除指定的索引。该方法只能在`VersionChange`监听函数里面调用。
  - `IDBObjectStore.openCursor()`：获取一个指针对象。
  - `IDBObjectStore.openKeyCursor()`：用于获取一个主键指针对象。

**5）IDBTransaction 对象**：用来异步操作数据库事务。`IDBDatabase.transaction()`方法返回这个对象。

- 属性
  - `IDBTransaction.db`：返回当前事务所在的数据库对象 IDBDatabase。
  - `IDBTransaction.error`：返回当前事务的错误。如果事务没有结束，或者事务成功结束，或者被手动终止，该方法返回`null`。
  - `IDBTransaction.mode`：返回当前事务的模式，默认是`readonly`（只读），另一个值是`readwrite`。
  - `IDBTransaction.objectStoreNames`：返回一个类似数组的对象 DOMStringList，成员是当前事务涉及的对象仓库的名字。
  - `IDBTransaction.onabort`：指定`abort`事件（事务中断）的监听函数。
  - `IDBTransaction.oncomplete`：指定`complete`事件（事务成功）的监听函数。
  - `IDBTransaction.onerror`：指定`error`事件（事务失败）的监听函数。
- 方法
  - `IDBTransaction.abort()`：终止当前事务，回滚所有已经进行的变更。
  - `IDBTransaction.objectStore(name)`：返回指定名称的对象仓库 IDBObjectStore。

**6）IDBIndex 对象**：代表数据库的索引，`IDBObjectStore.index()`方法返回这个对象。

- 属性
  - `IDBIndex.name`：字符串，索引的名称。
  - `IDBIndex.objectStore`：索引所在的对象仓库。
  - `IDBIndex.keyPath`：索引的主键。
  - `IDBIndex.multiEntry`：布尔值，针对`keyPath`为数组的情况，如果设为`true`，创建数组时，每个数组成员都会有一个条目，否则每个数组都只有一个条目。
  - `IDBIndex.unique`：布尔值，表示创建索引时是否允许相同的主键。
- 方法
  - `IDBIndex.count()`：用来获取记录的数量。它可以接受主键或 IDBKeyRange 对象作为参数，这时只返回符合主键的记录数量，否则返回所有记录的数量。
  - `IDBIndex.get(key)`：用来获取符合指定主键的数据记录。
  - `IDBIndex.getKey(key)`：用来获取指定的主键。
  - `IDBIndex.getAll()`：用来获取所有的数据记录。它可以接受两个参数，都是可选的，第一个参数用来指定主键，第二个参数用来指定返回记录的数量。如果省略这两个参数，则返回所有记录。由于获取成功时，浏览器必须生成所有对象，所以对性能有影响。如果数据集比较大，建议使用 IDBCursor 对象。
  - `IDBIndex.getAllKeys()`：该方法与`IDBIndex.getAll()`方法相似，区别是获取所有主键。
  - `IDBIndex.openCursor()`：用来获取一个 IDBCursor 对象，用来遍历索引里面的所有条目。
  - `IDBIndex.openKeyCursor()`：该方法与`IDBIndex.openCursor()`方法相似，区别是遍历所有条目的主键。

**7）IDBCursor 对象**：代表指针对象。

- 属性
  - `IDBCursor.source`：返回正在遍历的对象仓库或索引。
  - `IDBCursor.direction`：字符串，表示指针遍历的方向。共有四个可能的值：next（从头开始向后遍历）、nextunique（从头开始向后遍历，重复的值只遍历一次）、prev（从尾部开始向前遍历）、prevunique（从尾部开始向前遍历，重复的值只遍历一次）。该属性通过`IDBObjectStore.openCursor()`方法的第二个参数指定，一旦指定就不能改变了。
  - `IDBCursor.key`：返回当前记录的主键。
  - `IDBCursor.value`：返回当前记录的数据值。
  - `IDBCursor.primaryKey`：返回当前记录的主键。对于数据仓库（objectStore）来说，这个属性等同于 IDBCursor.key；对于索引，IDBCursor.key 返回索引的位置值，该属性返回数据记录的主键。
- 方法
  - `IDBCursor.advance(n)`：指针向前移动 n 个位置。
  - `IDBCursor.continue()`：指针向前移动一个位置。它可以接受一个主键作为参数，这时会跳转到这个主键。
  - `IDBCursor.continuePrimaryKey()`：该方法需要两个参数，第一个是`key`，第二个是`primaryKey`，将指针移到符合这两个参数的位置。
  - `IDBCursor.delete()`：用来删除当前位置的记录，返回一个 IDBRequest 对象。该方法不会改变指针的位置。
  - `IDBCursor.update()`：用来更新当前位置的记录，返回一个 IDBRequest 对象。它的参数是要写入数据库的新的值。

**8）IDBKeyRange 对象**：代表数据仓库里面的一组主键。

- 属性
  - `IDBKeyRange.lower`：返回下限
  - `IDBKeyRange.lowerOpen`：布尔值，表示下限是否为开区间（即下限是否排除在范围之外）
  - `IDBKeyRange.upper`：返回上限
  - `IDBKeyRange.upperOpen`：布尔值，表示上限是否为开区间（即上限是否排除在范围之外）
- 方法
  - `IDBKeyRange.lowerBound()`：指定下限。
  - `IDBKeyRange.upperBound()`：指定上限。
  - `IDBKeyRange.bound()`：同时指定上下限。
  - `IDBKeyRange.only()`：指定只包含一个值。

## 7. 同源和跨域

### 7.1 同源策略

**出现原因**：出于安全考虑，没有同源策略，Cookie 可以共享。

**概念**：两个不同的源之间想要互相访问资源或者操作 DOM，会有一套基础的安全策略的制约。同源指的是：两个 URL 的协议、域名和端口都相同。

**限制范围**：

- 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
- 无法接触非同源网页的 DOM。
- 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。

**优点**：

- 保证用户的信息安全。

**缺点**：

- 有时很不方便，合理的用途也受到影响。

### 7.2 跨域机制

#### 7.2.1 JSONP

**概念**：jsonp（JSON with Padding）填充式 JSON。

**原理**：利用 script 标签的 src 属性可跨域性，在 GET 请求的 url 中携带一个回调函数名，跨域的服务端把浏览器所请求的数据放入该回调函数返回给浏览器，浏览器在本地的回调函数中对返回的数据进行处理。

拥有”src”这个属性的标签都拥有跨域的能力，比如<\script>、<\img>、<\iframe>

**优点**：

- 简单易用，服务端改造非常小，只需请求获取数据，后续操作都由调用者来自己处理。
- 兼容性更好，老式浏览器全部支持。

**缺点**：

- 只能用 GET 请求。

- 在调用失败的时候不会返回 HTTP 状态码，不知道是否成功.

- 不安全，可能会遭受 XSS 攻击.

**例子**：

1）原生实现：

```html
<body>
  <button>发起跨域请求</button>
  <script type="text/javascript">
    var handleCallback = function (data) {
      // 回调函数
      console.log(data.user)
    }
    var div = document.getElementsByTagName('button')[0]
    div.onclick = function () {
      let url = 'https://www.baidu.com?callback=handleCallback'
      let script = document.createElement('script')
      script.setAttribute('src', url)
      document.body.appendChild(script)
    }
  </script>
</body>

// 服务端返回如下（返回时即执行全局函数）： handleCallback({"status": true, "user": "admin"})
```

2）在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP，以下是简单实现

```js
function jsonp(url, jsonpCallback, success) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function (data) {
    success && success(data)
  }
  document.body.appendChild(script)
}
jsonp('http://xxx', 'callback', function (value) {
  console.log(value)
})
```

#### 7.2.2 CORS

**概念**：CORS（Cross-Origin Resource Sharing）跨域资源共享。

**原理**：整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现 CORS 通信的关键是服务器**。只要服务器实现了 CORS 接口，就可以跨域通信**。服务器端对于 CORS 的支持，主要就是通过设置`Access-Control-Allow-Origin`来进行的。该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。如果浏览器检测到相应的设置，就可以允许 Ajax 进行跨域的访问。相当于在后端设置了白名单，只要前端地址在这个白名单中就可以访问后端。

CORS 请求分成两类：简单请求和非简单请求。

**简单请求**：简单的 HTTP 方法与简单的 HTTP 头信息的结合。只要同时满足以下两大条件，就属于简单请求。

1. 请求方法是以下三种方法之一：
   - HEAD
   - GET
   - POST
2. HTTP 的头信息不超出以下几种字段：
   - Accept
   - Accept-Language
   - Content-Language
   - Last-Event-ID
   - Content-Type：只限于 application/x-www-form-urlencoded、multipart/form-data、text/plain

**基本流程**：

- 浏览器发现这次跨域 AJAX 请求是简单请求，就自动在头信息之中，添加一个`Origin`字段。

  - `Origin`字段用来说明，本次请求来自哪个域（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

- 如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段，就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是 200。
- 如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。
  - `Access-Control-Allow-Origin`：该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求。
  - `Access-Control-Allow-Credentials`：该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。设为`true`，即表示服务器明确许可，浏览器可以把 Cookie 包含在请求中，一起发给服务器。这个值也只能设为`true`，如果服务器不要浏览器发送 Cookie，不发送该字段即可。
  - `Access-Control-Expose-Headers`：该字段可选。CORS 请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到 6 个服务器返回的基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。

**非简单请求**：对服务器提出特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。

**基本流程**：

- "预检"请求：浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 方法和头信息字段。"预检"请求用的请求方法是`OPTIONS`，表示这个请求是用来询问的。

  - `Origin`：表示请求来自哪个源。
  - `Access-Control-Request-Method`：用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法。
  - `Access-Control-Request-Headers`：用来指定浏览器的 CORS 请求会额外发送的头信息字段。

- 如果服务器否定了"预检"请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段，或者明确表示请求不符合条件。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。
  - `Access-Control-Allow-Methods`：该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次“预检”请求。
  - `Access-Control-Allow-Headers`：如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在“预检”中请求的字段。
  - `Access-Control-Allow-Credentials`：表示是否允许发送 Cookie。
  - `Access-Control-Max-Age`：该字段可选，用来指定本次预检请求的有效期，单位为秒。
- 如果服务器通过"预检"请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。

**CORS 请求中发送 Cookie**：

- 在 AJAX 请求中打开`withCredentials`属性。`xhr.withCredentials = true;`
- 服务器`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。
- 服务器`Access-Control-Allow-Credentials`设置为 true。

#### 7.2.3 Nginx 反向代理

**原理**：用一台服务器，代理真实服务器，用户访问时，不再是访问真实服务器，而是代理服务器。

**基本流程**：

- 提前在 nginx 中配置好反向代理的规则，不同的请求，交给不同的真实服务器处理。
- 当请求到达 nginx，nginx 会根据已经定义的规则进行请求的转发，从而实现路由功能。

<img src="https://img-blog.csdnimg.cn/20190823213221462.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTI0MjYy,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" style="zoom:75%;" />

<img src="https://img-blog.csdnimg.cn/20190823212817567.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTI0MjYy,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" style="zoom:75%;" />

#### 7.2.4 nodejs 中间件代理

**原理**：大致与 nginx 相同，都是通过启一个代理服务器，实现数据的转发。

**1）非 vue 框架的跨域**

使用 node + express + http-proxy-middleware 搭建一个 proxy 服务器。

- 前端代码：

```js
var xhr = new XMLHttpRequest()
// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true
// 访问http-proxy-middleware代理服务器
xhr.open('get', 'http://www.domain1.com:3000/login?user=admin', true)
xhr.send()
```

- 中间件服务器代码：

```js
var express = require('express')
var proxy = require('http-proxy-middleware')
var app = express()
app.use(
  '/',
  proxy({
    // 代理跨域目标接口
    target: 'http://www.domain2.com:8080',
    changeOrigin: true,
    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function (proxyRes, req, res) {
      res.header('Access-Control-Allow-Origin', 'http://www.domain1.com')
      res.header('Access-Control-Allow-Credentials', 'true')
    },
    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.domain1.com' // 可以为false，表示不修改
  })
)
app.listen(3000)
console.log('Proxy server is listen at port 3000...')
```

**2）vue 框架的跨域**

node + vue + webpack + webpack-dev-server 搭建的项目，跨域请求接口，直接修改 webpack.config.js 配置。开发环境下，vue 渲染服务和接口代理服务都是 webpack-dev-server 同一个，所以页面与代理接口之间不再跨域。

- webpack.config.js 部分配置：

```js
module.exports = {
    entry: {},
    module: {},
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.domain2.com:8080',  // 代理跨域目标接口
            changeOrigin: true,
            secure: false,  // 当代理某些https服务报错时用
            cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
        }],
        noInfo: true
    }
}
```

#### 7.2.5 WebSocket

WebSocket 实现了浏览器与服务器全双工通信，没有同源限制，而且性能开销小，通信高效。

**1）原生**

用`socket.send`发送数据，用`socket.addEventListener`监听各类事件。

```js
const socket = new WebSocket('ws://localhost:8080')

socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data)
})
```

**2）Socket.io**

很好地封装了 webSocket 接口。引入`socket.io.js`后，用`socket.send`发送数据，`socket.on`监听`connection`、`message`、`disconnection`事件。

- 前端代码：

```html
<div>
  user input：
  <input type="text" />
</div>
<script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js"></script>
<script>
  var socket = io('http://www.domain2.com:8080')

  // 连接成功处理
  socket.on('connect', function () {
    // 监听服务端消息
    socket.on('message', function (msg) {
      console.log('data from server: ---> ' + msg)
    })
    // 监听服务端关闭
    socket.on('disconnect', function () {
      console.log('Server socket has closed.')
    })
  })

  document.getElementsByTagName('input')[0].onblur = function () {
    // onblur对象失去焦点时触发
    socket.send(this.value)
  }
</script>
```

- Nodejs socket 后台：

```js
var http = require('http')
var socket = require('socket.io')
// 启http服务
var server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-type': 'text/html'
  })
  res.end()
})
server.listen('8080')
console.log('Server is running at port 8080...')
// 监听socket连接
socket.listen(server).on('connection', function (client) {
  // 接收信息
  client.on('message', function (msg) {
    client.send('hello：' + msg)
    console.log('data from client: ---> ' + msg)
  })
  // 断开处理
  client.on('disconnect', function () {
    console.log('Client socket has closed.')
  })
})
```

#### 7.2.6 postMessage

window.postMessage：允许跨窗口通信，不论这两个窗口是否同源。

**应用场景**：

- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
- 页面与嵌套的 iframe 消息传递

**基本用法**：

```javascript
otherWindow.postMessage(message, targetOrigin, [transfer])
```

- **otherWindow**：目标窗口，也就是给哪个窗口发消息。其他窗口的一个引用，比如是 window.frames 属性的成员或者由 window.open 方法创建的窗口。

- **message**：将要发送到其他 window 的数据，类型为`String`、`Object`。

- **targetOrigin**：目标窗口的源，指定哪些窗口能接收到消息事件，其值可以是字符串“\*”(表示无限制)或者一个 URL

**例子**：

- a.html：(domain1.com/a.html)

```html
<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>
  var iframe = document.getElementById('iframe')
  iframe.onload = function () {
    var data = {
      name: 'aym'
    }
    // 向domain2传送跨域数据
    iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com')
  }
  // 接受domain2返回数据
  window.addEventListener(
    'message',
    function (e) {
      alert('data from domain2 ---> ' + e.data)
    },
    false
  )
</script>
```

- b.html：(domain2.com/b.html)

```html
<script>
  // 接收domain1的数据
  window.addEventListener(
    'message',
    function (e) {
      alert('data from domain1 ---> ' + e.data)
      var data = JSON.parse(e.data)
      if (data) {
        data.number = 16
        // 处理后再发回domain1
        window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com')
      }
    },
    false
  )
</script>
html
```

问题：两个不同的域名的 localStorage 不能直接互相访问，那么如何在`aaa.com`中如何调用`bbb.com`的 localStorage?

实现原理：

1. 在`aaa.com`的页面中，在页面中嵌入一个 src 为`bbb.com`的`iframe`，此时这个`iframe`里可以调用`bbb.com`的 localStorage。
2. 用`postMessage`方法实现页面与`iframe`之间的通信。

以在`aaa.com`中读取`bbb.com`中的 localStorage 的`item1`为例：

```html
// aaa.com
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="text/javascript">
      window.onload = function () {
        const bbbIframe = document.getElementById('bbb-iframe')
        bbbIframe.contentWindow.postMessage(
          {
            key: 'item1'
          },
          'https://bbb.com'
        )
      }
      window.addEventListener(
        'message',
        function (event) {
          if (event.origin === 'https://bbb.com') {
            console.log(event.data)
          }
        },
        false
      )
    </script>
  </head>
  <body>
    <iframe id="bbb-iframe" src="https://bbb.com/page1.html" style="display:none;"></iframe>
  </body>
</html>

// bbb.com
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <script type="text/javascript">
      window.addEventListener(
        'message',
        function (event) {
          if (event.origin === 'https://aaa.com') {
            const { key } = event.data
            const value = localStorage.getItem(key)
            event.source.postMessage({ key: value }, event.origin)
          }
        },
        false
      )
    </script>
  </head>
  <body>
    This page is for sharing localstorage.
  </body>
</html>
```

## 8. 浏览器安全

### 8.1 XSS

**概念**：跨站脚本攻击（Cross Site Script），攻击者在网站上注入恶意的客户端代码（ JavaScript、HTML、早期 Flash），通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。

**本质**：网站没有对恶意代码进行过滤，与正常的代码混合在一起了，浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。

**攻击类型**：

- 反射型：发出请求时，XSS 代码出现在 url 中，作为输入提交到服务器，服务器解析后响应，XSS 代码随响应内容一起传回给浏览器，最后浏览器解析执行 XSS 代码。

  - 恶意代码存在目标网站 URL 里
  - 搜索关键字、新浪微博的蠕虫攻击

- 存储型：具有攻击性的脚本被保存到了服务器（数据库，内存，文件系统）并且可以被普通用户完整的从服务器取得并执行，从而获得了在网络上传播的能力。

  - 恶意代码存在目标网站数据库里
  - 提交评论、myspace 蠕虫攻击

- DOM 型：由浏览器取出 url 中的恶意代码并执行，属于前端 JavaScript 自身的安全漏洞。
  - 漏洞存在于前端而不是后端

**防御策略**：

1. 输入过滤。对所有用户提交内容进行可靠的输入验证，包括对 URL、查询关键字、POST 数据等，仅接受指定长度范围内、采用适当格式、采用所预期的字符的内容提交，对其他的一律过滤。(客户端和服务器都要)

2. 输出转义。往 HTML 标签之间插入不可信数据的时候，对不可信数据进行 HTML Entity 编码。

   ```
   &amp; 替代 &
   &lt;  替代 <
   &gt;  替代 >
   &quot; 替代 "
   &#x27; 替代 '
   &#x2F; 替代 /
   ```

3. 将重要的 cookie 标记为 httpOnly，不允许 js 脚本获取 cookie。

4. 使用 CSP。内容安全策略 (CSP, Content Security Policy) ，本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截由浏览器自己来实现。

   - 方法一：设置 http 请求头中的 Content-Security-Policy。

     ```
     Content-Security-Policy: default-src 'self'            // 只允许加载本站资源
     Content-Security-Policy: img-src https://*             // 只允许加载 HTTPS 协议图片
     Content-Security-Policy: child-src 'none'              // 允许加载任何来源框架
     Content-Security-Policy-Report-Only: default-src 'self'// 仅产生报告而不具有强制性
     ```

   - 方法二：设置 meta 标签的 Content-Security-Policy。

     ```
     <meta http-equiv="content-security-policy" content="default-src 'self'">
     ```

### 8.2 CSRF

**概念**：跨站请求伪造（Cross Site Request Forgery），攻击者引诱用户打开攻击者的网站，在攻击者的网站中，利用用户的登录状态发起的跨站请求。

**本质**：利用 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。

**具体过程**：

1. 用户登录 a.com，验证通过后，浏览器会保留用户的登录凭证 Cookie
2. 用户在没有退出登录的情况下访问恶意网站 b.com
3. 然后 b.com 要求访问 a.com，向 a.com 发起一个请求
4. 根据 b.com 的请求，浏览器会把访问 a 时存在本地的 cookie 带到请求中，然后访问被攻击网站 a.com
5. 从而伪造用户请求，在并未授权的情况下执行一些自定义事件：
   - 模拟表单提交盗取用户资金。
   - 篡改目标网站上的用户数据。
   - 盗取用户隐私数据

**攻击类型**：

- GET 型

  在受害者访问含有这个 img 的页面后，浏览器会自动向 [http://a.com](https://link.zhihu.com/?target=http%3A//a.com) 发出一次 HTTP 请求。[http://a.com](https://link.zhihu.com/?target=http%3A//a.com) 就会收到包含受害者登录信息的一次跨域请求。

  ```
  <img src="http://a.com/withdraw?amount=10000&for=hacker" >
  ```

- POST 型

  构建一个隐藏表单，页面加载时触发表单提交，相当于模拟用户完成了一次 POST 操作。

  ```
  <form action="http://a.com/withdraw" method=POST>
      <input type="hidden" name="account" value="airing" />
      <input type="hidden" name="amount" value="10000" />
      <input type="hidden" name="for" value="hacker" />
  </form>
  <script> document.forms[0].submit(); </script>
  ```

- 链接型

  需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招。

  ```
  <a href="http://a.com/withdraw.php?amount=1000&for=hacker" taget="_blank">
   屠龙宝刀，点击就送！
  <a/>
  ```

**防御策略**：

1. 同源检测。服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，从而对请求进行过滤。

   - 使用 Origin 字段确认来源域名，但是在 IE 11 不会在跨站 CORS 请求上添加 Origin 头，在 302 重定向之后 Origin 不包含在重定向的请求中。
   - 使用 Referer 字段确认来源地址，但是 Referer 的值是由浏览器提供的，不可全信，低版本浏览器下 Referer 存在伪造风险，IE6、7 使用`window.location.href=url`或`window.open`进行界面的跳转，会丢失 Referer，HTTPS 页面跳转到 HTTP 页面，所有浏览器 Referer 都丢失。

2. 使用 CSRF Token 进行验证。服务器向用户返回一个随机数 token ，当网站再次发起请求时，在请求参数中加入服务器端返回的 token ，然后服务器对这个 token 进行验证。好处是攻击者无法伪造 token，缺点是需要给网站中的所有请求都添加上这个 token，分布式服务器每个都要存 session。

3. 对 Cookie 进行双重验证。服务器向请求域名注入一个 Cookie，内容为随机字符串，然后当用户再次向服务器发送请求的时候，从 Cookie 中取出这个字符串，添加到 URL 参数中，然后服务器通过对 Cookie 中的数据和 URL 参数中的数据进行比较，来进行验证。利用了攻击者只能利用 Cookie，但是不能访问获取 Cookie 的特点。好处是比 CSRF Token 的方法更加方便，并且不涉及到分布式访问的问题。缺点是如果网站存在 XSS 漏洞的，那么这种方式会失效。

4. 加验证码。验证码会强制用户必须与应用进行交互，才能完成最终请求。缺点是用户体验不好、代价大。

5. 设置 Samesite。为`Set-Cookie`响应头增加`Samesite` 属性，该属性设置 Cookie 不随着跨域请求发送。

   - Strict 严格模式：跨站点时，任何情况下都不会发送。

     - Lax 宽松模式：假如这个请求是 GET 请求且是同步请求（改变了当前页面或者打开了新页面），则可以发送。

### 8.3 中间人攻击

**概念**：攻击者悄悄的躲在通信双方之间，窃听甚至篡改通信信息。而通信双方并不知道消息已经被截获甚至篡改了。

**具体过程**：

- 客户端发送请求到服务端，请求被中间人截获。
- 服务器向客户端发送公钥。
- 中间人截获公钥，保留在自己手上。然后自己生成一个**伪造的**公钥，发给客户端。
- 客户端收到伪造的公钥后，生成加密 hash 值发给服务器。
- 中间人获得加密 hash 值，用自己的私钥解密获得真秘钥。同时生成假的加密 hash 值，发给服务器。
- 服务器用私钥解密获得假密钥，然后加密数据传输给客户端。

**防御策略**：

- 使用 HTTPS：确保你访问的每个网站都使用 HTTPS。

- 不要忽略警告：如果你的浏览器告诉你正在访问的网站有问题，相信它。安全证书警告可能是将凭据授予攻击者和保持安全之间的区别。

- 不要使用公共 Wi-Fi：不要使用公共 Wi-Fi。如果必须使用公共 Wi-Fi 连接，则应下载并安装 VPN，为连接添加一些安全性。此外，在使用公共 Wi-Fi 连接时，请注意浏览器安全警告，如果浏览器警告的数量突然增加，则可能表明存在 MITM 攻击或漏洞。

- 运行并更新防病毒软件：确保防病毒软件是最新的。

### 8.4 网络劫持

网络劫持一般分为两种：

- **DNS 劫持**：输入京东被强制跳转到淘宝这就属于 DNS 劫持
  - **防御 1：DNS 强制解析，**通过修改运营商的本地 DNS 记录，来引导用户流量到缓存服务器
  - **防御 2：302 跳转的方式，**通过监控网络出口的流量，分析判断哪些内容是可以进行劫持处理的，再对劫持的内存发起 302 跳转的回复，引导用户获取内容
- **HTTP 劫持**：访问谷歌但是一直有贪玩蓝月的广告。由于 http 明文传输，运营商会修改 http 响应内容（即加广告）
  - **防御 1：使用全站 HTTPS，将 HTTP 加密，**使得运营商无法获取明文，就无法劫持响应内容

### 8.5 SQL 注入

**概念**：把 SQL 命令伪装成正常的 http 请求参数（如表单提交或 input 输入），传递到服务端，欺骗服务器最终执行恶意的 SQL 命令，造成逃过验证或者私密信息泄露等危害。

**防御策略**：

- 对输入校验和限制长度。
- 不要使用动态 SQL，最好使用准备好的语句和参数化查询。
- 为每个应用使用单独的权限有限的数据库连接。
- 不要把机密信息用明文存放，请加密或者 hash 掉密码和敏感的信息。
