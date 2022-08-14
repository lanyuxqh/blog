---
title: 用户认证
date: 2022-6-30
tags:
  - javascript
categories:
  - javascript
---

# 用户认证

## 1、基于 Cookie 的用户认证

**原理**：Cookie 机制一种是客户端保存状态信息的方案，实际上 Cookie 就是一小段的文本信息，储存在浏览器内存中。

**过程**：

1. 客户端第一次发送一个 http 请求到服务器
2. 服务器处理后返回一个 http 响应，该响应头里会包含一个 Set-Cookie 字段，存放服务器生成的 Cookie 信息
3. 客户端接收到该响应后，将 Cookie 保存下来
4. 之后客户端每次向该服务器发送 http 请求时，都会将该 Cookie 塞进请求头中的 Cookie 字段，一起发送给服务器

## 2、基于 Session 的用户认证

**原理**：

利用服务器端的 session（会话）和浏览器端的 cookie 来实现前后端的认证。服务器端创建一个会话(session)，将同一个客户端的请求都维护在各自得会会话中，每当请求到达服务器端的时候，先去查一下该客户端有没有在服务器端创建 session，如果有则已经认证成功了，否则就没有认证。

**过程**：

1. 用户输入其登录信息。
2. 服务器验证信息是否正确，并创建一个 session，然后将其存储在数据库中。给这个 session 生成一个唯一的标识字符串 sessionId。
3. 服务器处理后返回一个 http 响应，该响应头里会包含一个 Set-Cookie 字段，存放 sessionId。
4. 客户端接收到该响应后，将 sessionId 保存下来在本地 cookie 中，在下次 http 请求的请求头中会带上该域名下的 cookie 信息。
5. 服务器在接受客户端请求时会去解析请求头 cookie 中的 sid，然后根据这个 sessionId 去找服务器端保存的该客户端的 session，然后判断该请求是否合法。
6. 一旦用户注销应用程序，会话将在客户端和服务器端都被销毁

**缺点**：

- 服务器内存消耗大：用户每做一次应用认证，应用就会在服务端做一次记录，以方便用户下次请求时使用。通常来讲 session 保存在内存中，随着认证用户的增加，服务器的消耗就会很大。
- 易受到 CSRF 攻击：基于 cookie 的一种跨站伪造攻击，基于 cookie 来进行识别用户的话，用户本身就携带了值，cookie 被截获，用户就很容易被伪造。

## 3、基于 Token 的用户认证

**原理**：

Token 是服务端生成的一串字符串，以作客户端进行请求的一个令牌，当第一次登录后，服务器生成一个 Token 便将此 Token 返回给客户端，以后客户端只需带上这个 Token 前来请求数据即可，无需再次带上用户名和密码。

**过程**：

1. 用户输入登陆凭据；
2. 服务器验证凭据是否正确，然后返回一个经过签名的 token（使用凭据加密成 token）；
3. 客户端负责存储 token，可以存在 localStorage/sessionStorage 中；
4. 对服务器的请求带上这个 token；
5. 服务器对 JWT 进行解码（解密成凭据然后验证），如果 token 有效，则处理该请求；
6. 一旦用户登出，客户端销毁 token。

**最常见的 Token 生成方式是使用 JWT（Json Web Token）**。JWT Token 组成部分：头部（header）、载荷（payload）、签证（signature）

<img src="https://www.wangbase.com/blogimg/asset/201807/bg2018072303.jpg" alt="img" style="zoom: 67%;" />

1）Header：头部用于描述关于该 JWT 的最基本的信息，例如其类型以及签名所用的算法等。

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

2）Payload：用来存放实际需要传递的数据。JWT 规定了 7 个官方字段，供选用。也可以定义私有字段。

```json
{
  "iss": "John Wu JWT",
  "iat": 1441593502,
  "exp": 1441594722,
  "aud": "www.example.com",
  "sub": "jrocket@example.com",
  "from_user": "B",
  "target_user": "A"
}
```

```js
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
```

3）Signature：是对前两部分的签名，防止数据篡改。首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。

```js
HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（`.`）分隔，就可以返回给用户。

**优点**：

- **可扩展性好**。应用程序分布式部署的情况下，session 需要做多机数据共享，通常可以存在数据库或者 redis 里面。而 jwt 不需要。
- **无状态**。jwt 不在服务端存储任何状态。

**缺点**：

- **安全性**：jwt 的 payload 没有加密，因此 jwt 中不能存储敏感数据。而 session 的信息是存在服务端的，相对来说更安全。
- **性能**：jwt 太长，sessionId 很短，用 jwt 放在 header 中可能比 body 还大，cookie 可能放不下。
- **一次性**：想修改里面的内容，就必须签发一个新的 jwt。

**适用场景**：有效期短；只希望被使用一次。

## 4、区别与联系

**Cookie 和 Session 的区别和联系**

1. **存储位置**：Cookie 是把用户的数据存到本地，而 Session 则是把用户的数据存在服务器。
2. **安全性**：Cookie 保存在客户端本地，有可能会被人窃取用来欺骗服务器，Session 可将敏感信息保存在服务器，且不会任意读取，比 Cookie 更加安全。
3. **限制**：Cookie 的大小和数量都有限制，如果很大，每次要请求都要带上，这样就影响了传输效率；Session 会在一定时间内保存在服务器内存上，当访问增多会比较占用你服务器的性能。
4. **联系：Session 需要用 Cookie 存储 sessionid**。Session 虽然保存在服务器，但它仍然需要 Cookie 作为 sessionid 的容器发送给客户端，若客户端禁用了 Cookie，会一定程度上影响 Session 的使用。

**Token 和 Session 的区别和联系**

1. 服务端需要内存空间去存储 session，而可以不需要存储 token。对于这种无状态 token，服务器可以通过在 token 中**附加“签名”的方式**来确认请求中的 token 是由自己签发，从而验证 token 的有效性。
2. sessionid 一般利用 Cookie 作为容器进行传输和保存，token 可以放在请求或响应的 body 内传输。

**Token 相对 Cookie 的优势**

token 的验证是无状态的，后端服务不需要记录 token。每个令牌都是独立的，包括检查其有效性所需的所有数据，并通过声明传达用户信息。（更安全，防止 CSRF 攻击）

## 5、前端登录

**1）Cookie + Session 登录**

用户首次登录时：

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730fcc51a6e8670~tplv-t2oaga2asx-watermark.awebp" alt="img" style="zoom:80%;" />

1. 用户访问 `a.com/pageA`，并输入密码登录。
2. 服务器验证密码无误后，会创建 SessionId，并将它保存起来。
3. 服务器端响应这个 HTTP 请求，并通过 Set-Cookie 头信息，将 SessionId 写入 Cookie 中。

后续页面访问时：

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730fcc51a81b9f8~tplv-t2oaga2asx-watermark.awebp" alt="img" style="zoom:80%;" />

1. 用户访问 `a.com/pageB` 页面时，会自动带上第一次登录时写入的 Cookie。
2. 服务器端比对 Cookie 中的 SessionId 和保存在服务器端的 SessionId 是否一致。
3. 如果一致，则身份验证成功。

缺点：

1. 由于服务器端需要对接大量的客户端，也就需要存放大量的 SessionId，这样会导致服务器压力过大。
2. 如果服务器端是一个集群，为了同步登录态，需要将 SessionId 同步到每一台机器上，无形中增加了服务器端维护成本。
3. 由于 SessionId 存放在 Cookie 中，所以无法避免 CSRF 攻击。

**2）Token 登录**

用户首次登录时：

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730fcc51ab8a1db~tplv-t2oaga2asx-watermark.awebp" alt="img" style="zoom:80%;" />

1. 用户输入账号密码，并点击登录。
2. 服务器端验证账号密码无误，创建 Token。
3. 服务器端将 Token 返回给客户端，由**_客户端自由保存_**。

后续页面访问时：

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730fcc519ee3add~tplv-t2oaga2asx-watermark.awebp" alt="img" style="zoom:80%;" />

1. 用户访问 `a.com/pageB` 时，带上第一次登录时获取的 Token。
2. 服务器端验证 Token ，有效则身份验证成功。

缺点：

1. Token 下发之后，只要在生效时间之内，就一直有效，如果服务器端想收回此 Token 的权限，并不容易。

**3）SSO 单点登录**

用户首次访问时，需要在认证中心登录：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730fcc5167bfd98~tplv-t2oaga2asx-watermark.awebp)

1. 用户访问网站 `a.com` 下的 pageA 页面。
2. 由于没有登录，则会重定向到认证中心，并带上回调地址 `www.sso.com?return_uri=a.com/pageA`，以便登录后直接进入对应页面。
3. 用户在认证中心输入账号密码，提交登录。
4. 认证中心验证账号密码有效，然后重定向 `a.com?ticket=123` 带上授权码 ticket，并将认证中心 `sso.com` 的登录态写入 Cookie。
5. 在 `a.com` 服务器中，拿着 ticket 向认证中心确认，授权码 ticket 真实有效。
6. 验证成功后，服务器将登录信息写入 Cookie（此时客户端有 2 个 Cookie 分别存有 `a.com` 和 `sso.com` 的登录态）。

认证中心登录完成之后，继续访问 `a.com` 下的其他页面：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730fcc51207ae80~tplv-t2oaga2asx-watermark.awebp)

1. 这个时候，由于 `a.com` 存在已登录的 Cookie 信息，所以服务器端直接认证成功。

如果认证中心登录完成之后，访问 `b.com` 下的页面：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730fcc53c73e18a~tplv-t2oaga2asx-watermark.awebp)

1. 这个时候，由于认证中心存在之前登录过的 Cookie，所以也不用再次输入账号密码，直接返回第 4 步，下发 ticket 给 `b.com` 即可。

**4）OAuth 第三方登录**

这里以微信开放平台的接入流程为例：

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730fcc5628c0462~tplv-t2oaga2asx-watermark.awebp" alt="img" style="zoom:70%;" />

1. 首先，`a.com` 的运营者需要在微信开放平台注册账号，并向微信申请使用微信登录功能。
2. 申请成功后，得到申请的 appid、appsecret。
3. 用户在 `a.com` 上选择使用微信登录。
4. 这时会跳转微信的 OAuth 授权登录，并带上 `a.com` 的回调地址。
5. 用户输入微信账号和密码，登录成功后，需要选择具体的授权范围，如：授权用户的头像、昵称等。
6. 授权之后，微信会根据拉起 `a.com?code=123` ，这时带上了一个临时票据 code。
7. 获取 code 之后， `a.com` 会拿着 code 、appid、appsecret，向微信服务器申请 token，验证成功后，微信会下发一个 token。
8. 有了 token 之后， `a.com` 就可以凭借 token 拿到对应的微信用户头像，用户昵称等信息了。
9. `a.com` 提示用户登录成功，并将登录状态写入 Cooke，以作为后续访问的凭证。

**5）4 种登陆方案的使用场景**：

- Cookie + Session 历史悠久，适合于简单的后端架构，需开发人员自己处理好安全问题。
- Token 方案对后端压力小，适合大型分布式的后端架构，但已分发出去的 token ，如果想收回权限，就不是很方便了。
- SSO 单点登录，适用于中大型企业，想要统一内部所有产品的登录方式。
- OAuth 第三方登录，简单易用，对用户和开发者都友好，但第三方平台很多，需要选择合适自己的第三方登录平台。
