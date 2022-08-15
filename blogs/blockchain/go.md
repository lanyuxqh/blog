---
title: win10下go版本管理、升降版本
date: 2021-10-29
tags:
  - 区块链
categories:
  - 区块链
---

# win10 下 go 版本管理、升降版本

## go 版本管理、降级、升级

> 由于之前安装的 go 版本是最新版，有些老的 go 项目无法编译通过，需要将 go 版本降至 1.10，这里使用 g 进行 go 的版本管理（有点类似 nvm 管理 node 版本）

### 一、删除之前下载的 go 版本（没有的直接下一步）

1. 可以通过命令行`go env`查看 GOROOT（安装目录），直接删除对应文件夹。

2. 删除之前配置的环境变量 GOROOT（安装目录），可保留 GOPATH（工作目录）。
3. 重新进入命令行，`go env`查看，此时已找不到 go。

### 二、下载 go 版本管理工具 g

1. 下载地址：https://github.com/voidint/g/releases，选择系统对应版本。
2. win10 下载 [g1.2.1.windows-amd64.zip](https://github.com/voidint/g/releases/download/v1.2.1/g1.2.1.windows-amd64.zip)
3. 解压出来是`g.exe`

### 三、设置环境变量

1. 系统变量添加

   - 变量名：`G_MIRROR` 变量值：`https://golang.google.cn/dl/`
   - 变量名：`GOROOT` 变量值：`C:\Users\用户名\.g\go`

2. 在 D 盘新建一个目录`g`，把刚才的`g.exe`复制进来。

3. 系统变量 Path 中添加

   - D:\g

   - %GOROOT%\bin

### 四、使用 g

1. 测试是否配置成功，在命令行输入`g`

   ```
   C:\Users\用户名>g
   NAME:
     g - Golang Version Manager

    USAGE:
     g  command [arguments...]

    VERSION:
     1.2.1

    AUTHOR:
     voidint <voidint@126.com>

    COMMANDS:
       ls         List installed versions
       ls-remote  List remote versions available for install
       use        Switch to specified version
       install    Download and install a version
       uninstall  Uninstall a version
       clean      Remove files from the package download directory
       help, h    Shows a list of commands or help for one command

    GLOBAL OPTIONS:
     --help, -h     show help
     --version, -v  print the version

    COPYRIGHT:
     Copyright (c) 2019-2021, voidint. All rights reserved.

   ```

2. 使用`g`

   ```
   g ls 查询已安装的go版本
   g ls-remote  查询可供安装的所有go版本
   g ls-remote stable 查询当前可供安装的stable状态的go版本
   g install 1.10 安装目标go版本1.10
   g use 1.10 切换至1.10版本
   g uninstall 1.10 卸载一个已安装的go版本
   ```

---

至此 go 切换版本成功~~可以放心跑以前的 go 项目了，再也不用担心因为 go 版本问题而无法通过编译了。
