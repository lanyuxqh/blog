---
title: Git
date: 2021-9-11
tags:
  - git
  - 工具
categories:
  - 工具
---

# Git

## 1. 版本控制

**概念**：一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。

**作用**：简单说就是用于管理多人协同开发项目的技术。

- 实现跨区域多人协同开发
- 追踪和记载一个或者多个文件的历史记录
- 组织和保护你的源代码和文档
- 统计工作量
- 并行开发、提高开发效率
- 跟踪记录整个软件的开发过程
- 减轻开发人员的负担，节省时间，同时降低人为错误

**常见的版本控制工具**：

- **Git**
- **SVN**（Subversion）
- **CVS**（Concurrent Versions System）
- **VSS**（Micorosoft Visual SourceSafe）
- **TFS**（Team Foundation Server）
- Visual Studio Online

**版本控制分类**：

- 本地版本控制
  - 记录文件每次的更新，可以对每个版本做一个快照，或是记录补丁文件，适合个人用。如 RCS。
- 集中版本控制
  - 所有的版本数据都保存在服务器上，协同开发者从服务器上同步更新或上传自己的修改。如 SVN。
- 分布式版本控制
  - 所有版本信息仓库全部同步到本地的每个用户，这样就可以在本地查看所有版本历史，可以离线在本地提交，只需在连网时 push 到相应的服务器或其他用户那里。如 Git。

### 1.1 SVN

- 集中式版本控制，易管理
- 适合人数不多的项目
- 不做快照的情况下所有历史版本记录都在服务器，服务器硬盘故障可能导致历史数据永久丢失
- commit 直接提交到中心库
- 必须连接在服务器上，否则基本不能工作、提交、对比、还原等
- 服务器压力较大

<img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7Ksu8UlITwMlbX3kMGtZ9p00V4uLaibxtZI9RLpq7tkSdlWiaF92AVeZ0ib9DicqBkS2poo5u8sEU2mCQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

### 1.2 Git

- 分布式版本控制，每个人都有一份代码和历史记录
- 适合多人协作
- 除了 pull 和 push 需要联网，其余操作均可本地完成
- 良好的分支机制，可以让主干代码保持干净
- 速度快， 成熟的架构，开发灵活

<img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7Ksu8UlITwMlbX3kMGtZ9p0ev8Q7qXjsTfeSwFexdA4tGjFAiaVEKQzAHdGcINXILKflI2cfk9BiawQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

### 1.3 Git 与 SVN 的区别

- Git 和 SVN 最大的区别在于 Git 是分布式的，而 SVN 是集中式的。因此 Git 支持离线工作，在本地可以进行很多操作，而 SVN 必须联网才能正常工作。
- Git 复杂概念多，SVN 简单易上手。
- Git 分支廉价，SVN 分支昂贵。Git 分支是指针指向某次提交，而 SVN 分支是拷贝的目录。这个特性使 Git 的分支切换非常迅速，且创建成本非常低。
- Git 没有一个全局的版本号，而 SVN 有。
- Git 把内容按元数据方式存储，而 SVN 是按文件。
- GIT 的内容完整性要优于 SVN：GIT 的内容存储使用的是 SHA-1 哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏
- GIT 分支和 SVN 的分支不同：svn 会发生分支遗漏的情况，而 git 可以同一个工作目录下快速的在几个分支间切换，很容易发现未被合并的分支，简单而快捷的合并这些文件。

## 2. Git 历史

Git 诞生于一个极富纷争大举创新的年代。**Git 是目前世界上最先进的分布式版本控制系统。**

Linux 内核开源项目有着为数众广的参与者。绝大多数的 Linux 内核维护工作都花在了提交补丁和保存归档的繁琐事务上(1991－2002 年间)。到 2002 年，整个项目组开始启用一个专有的分布式版本控制系统 BitKeeper 来管理和维护代码。

到了 2005 年，开发 BitKeeper 的商业公司同 Linux 内核开源社区的合作关系结束，他们收回了 Linux 内核社区免费使用 BitKeeper 的权力。这就迫使 Linux 开源社区(特别是 Linux 的缔造者 Linus Torvalds)基于使用 BitKeeper 时的经验教训，开发出自己的版本系统。（2 周左右！） 也就是后来的 Git！

Git 是免费、开源的，最初 Git 是为辅助 Linux 内核开发的，来替代 BitKeeper！

## 3. Git 配置

```
##  查看系统config
git config --system --list　　
#查看当前用户（global）配置
git config --global  --list

git config --global user.name "kuangshen"  #名称
git config --global user.email 24736743@qq.com   #邮箱
```

## 4. Git 基本理论

### 4.1 四个区域

Git 本地有三个工作区域：工作区（Working Directory）、暂存区(Stage/Index)、本地仓库(Repository 或 Git Directory)。如果在加上远程 Git 仓库(Remote Directory)就可以分为四个工作区域。文件在这四个区域之间的转换关系如下：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1d538d63559402fbcfd82d68b08061c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="Git经典流程图" style="zoom:67%;" />

- Workspace：工作区，就是你平时存放项目代码的地方。
- Index / Stage：暂存区，用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息。
- Repository：仓库区（或本地仓库），就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中 HEAD 指向最新放入仓库的版本。
- Remote：远程仓库，托管代码的服务器，可以简单的认为是你项目组中的一台电脑用于远程数据交换。

<img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7Ksu8UlITwMlbX3kMGtZ9p0icz6X2aibIgUWzHxtwX8kicPCKpDrsiaPzZk04OlI2bzlydzicBuXTJvLEQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

- Directory：使用 Git 管理的一个目录，也就是一个仓库，包含我们的工作空间和 Git 的管理空间。
- WorkSpace：工作区，需要通过 Git 进行版本控制的目录和文件，这些目录和文件组成了工作空间。
- .git：存放 Git 管理信息的目录，初始化仓库的时候自动创建。`.git文件`另外一个作用就是它在创建的时候，会自动创建 master 分支，并且将 HEAD 指针指向 master 分支。
- Index/Stage：暂存区，或者叫待提交更新区，在提交进入 repo 之前，我们可以把所有的更新放在暂存区。
- Local Repo：本地仓库，一个存放在本地的版本库；HEAD 会指向当前的开发分支（branch）。
- Stash：隐藏，是一个工作状态保存栈，用于保存/恢复 WorkSpace 中的临时状态。

**暂存区的意义**：

- **分批递交，降低 commit 的颗粒度**

  比如，你修改了 `a.py`，`b.py`，其中 `a.py` 和 `c.py` 是一个功能相关修改，`b.py`，`d.py`属于另外一个功能相关修改。就可采用：

  ```js
  git add a.py c.py
  git commit -m "function 1"
  git add b.py d.py
  git commit -m "function 2"
  ```

- **分阶段递交**

- **进行快照，便于回退**

### 4.2 工作流程

git 的工作流程一般是这样的：

１、在工作目录中添加、修改文件；

２、将需要进行版本管理的文件放入暂存区域；

３、将暂存区域的文件提交到 git 仓库。

因此，git 管理的文件有三种状态：已修改（modified）,已暂存（staged）,已提交(committed)

<img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7Ksu8UlITwMlbX3kMGtZ9p09iaOhl0dACfLrMwNbDzucGQ30s3HnsiaczfcR6dC9OehicuwibKuHjRlzg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

## 5. Git 文件操作

### 5.1 文件的四种状态

版本控制就是对文件的版本控制，要对文件进行修改、提交等操作，首先要知道文件当前在什么状态，不然可能会提交了现在还不想提交的文件，或者要提交的文件没提交上。

- Untracked：未跟踪，此文件在文件夹中，但并没有加入到 git 库，不参与版本控制。通过 git add 状态变为 Staged。
- Unmodify：文件已经入库，未修改，即版本库中的文件快照内容与文件夹中完全一致。这种类型的文件有两种去处，如果它被修改，则变为 Modified；如果使用 git rm 移出版本库，则变为 Untracked。
- Modified：文件已修改，仅仅是修改，并没有进行其他的操作。这个文件也有两个去处，通过 git add 可变为 Staged；使用 git checkout 丢弃修改过，则变为 Unmodify，这个 git checkout 即从库中取出文件，覆盖当前修改 !
- Staged：暂存状态。执行 git commit 则将修改同步到库中，这时库中的文件和本地文件又变为一致，变为 Unmodify。执行 git reset HEAD filename 取消暂存，变为 Modified。

### 5.2 查看文件状态

上面说文件有 4 种状态，通过如下命令可以查看到文件的状态：

```
#查看指定文件状态
git status [filename]
#查看所有文件状态
git status
```

### 5.3 忽略文件

有些时候我们不想把某些文件纳入版本控制中，比如数据库文件，临时文件，设计文件等.

在主目录下建立".gitignore"文件，此文件有如下规则：

1. 忽略文件中的空行或以井号（#）开始的行将会被忽略。
2. 可以使用 Linux 通配符。例如：星号（\*）代表任意多个字符，问号（？）代表一个字符，方括号（[abc]）代表可选字符范围，大括号（{string1,string2,...}）代表可选的字符串等。
3. 如果名称的最前面有一个感叹号（!），表示例外规则，将不被忽略。
4. 如果名称的最前面是一个路径分隔符（/），表示要忽略的文件在此目录下，而子目录中的文件不忽略。
5. 如果名称的最后面是一个路径分隔符（/），表示要忽略的是此目录下该名称的子目录，而非文件（默认文件或目录都忽略）。

```
*.txt        #忽略所有 .txt结尾的文件,这样的话上传就不会被选中！
!lib.txt     #但lib.txt除外
/temp        #仅忽略项目根目录下的TODO文件,不包括其它目录temp
build/       #忽略build/目录下的所有文件
doc/*.txt    #会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```

## 6. Git 常用命令

**配置命令**：

- `git config --list`：列出当前配置
- `git config --local --list`：列出 Repository 配置
- `git config --global --list`：列出全局配置

- `git config --system --list`：列出系统配置
- `git config --global user.name "your name"`：配置用户名
- `git config --global user.email "youremail@github.com"`：配置用户邮箱
- `git config --global color.ui true`：让 Git 显示颜色，会让命令输出看起来更醒目

**状态查询**：

- `git status`：查看当前仓库的状态
  - Changes not staged for commit：工作区有该内容，但是暂存区没有，需要`git add`
  - Changes to be committed：文件放在暂存区了，需要`git commit`
  - nothing to commit, working tree clean：需要将本地的代码推送到远端
- `git log`：查看从最近到最远的提交历史
- `git reflog`：查看可引用的历史版本

**差异比较**：

- `git diff` ：比较工作区与暂存区
- `git diff --cached`：比较暂存区与版本区
- `git diff HEAD`：比较工作区与版本区
- `git diff <commit ID> <commit ID>`：比较两个 commit

**花式撤销**：

- `git reset HEAD <file>`：暂存区撤销，与版本区一致 (不覆盖工作区)
- `git checkout <file>`：工作区撤销，与暂存区一致（暂存区没有找版本区）
- `git rm <file> --cached` ：删除暂存区的文件
- `git rm <file>` ：同时删除暂存区和工作区
- `git reset --hard <version>`： 恢复版本区指定版本的内容到工作区，直接删除指定的提交
  - --hard 回退全部，包括版本区、暂存区、工作区
  - --mixed 回退部分，包括版本区、暂存区
  - --soft 只回退版本区
- `git revert -n <version>`：回退版本，会生成一个新的提交记录

**分支管理**：

- `git branch`： 查看本地分支
- `git branch -r`： 查看远程分支
- `git branch -a`： 查看本地和远程分支
- `git branch <branch-name>`： 创建分支
- `git checkout <branch-name>` ：切换分支
- `git checkout -b <branch-name>`： 创建并切换到新建分支
- `git branch -m <oldbranch-name> <newbranch-name>`：重命名分支
- `git branch -d <branch-name>`：删除分支，有可能会删除失败，因为`Git`会保护没有被合并的分支
- `git branch -D <branch-name>`：强行删除，丢弃没被合并的分支
- `git merge <branch-name>`：当前分支与指定分支合并
- `git merge --no-ff <branch-name>`：合并分支的时候禁用`Fast forward`模式，因为这个模式会丢失分支历史信息
- `git branch --merged`： 查看哪些分支已经合并到当前分支
- `git branch --no-merged`：查看哪些分支没有合并到当前分支
- `git log --graph`：查看分支合并图
- `git branch -v`：查看各个分支最后一个提交对象的信息
- `git push origin -d <branch-name>`：删除远程分支
- `git checkout -b <branch-name> origin/远程分支名x`：拉取远程分支并创建本地分支
- `git rebase`：把分叉的提交历史“整理”成一条直线，看上去更直观

**fetch 指令**：

- `git fetch origin <branch-name>:<local-branch-name>`：拉取远程分支并创建本地分支
- `git fetch <远程主机名>` ：将某个远程主机的更新，全部取回本地
- `git fetch <远程主机名> <分支名>`：取回特定分支的更新

**文件暂存**：

- `git stash`：当有其他任务插进来时，把当前工作现场“存储”起来，以后恢复后继续工作
- `git stash list`：查看你刚刚“存放”起来的工作去哪里了
- `git stash drop <stash@{ID}>`：删除`stash`内容
- `git stash clear`：删除全部缓存
- `git stash apply <stash@{ID}>`：恢复却不删除`stash`内容
- `git stash pop <stash@{ID}>`：恢复的同时把 stash 内容也删了

**提交文件**：

- `git init`：初始化仓库
- `git add .` 把工作区的文件全部提交到暂存区
- `git add ./<file>/`：把工作区的`<file>`文件提交到暂存区
- `git commit -m "xxx"`：把暂存区的所有文件提交到版本区，暂存区空空荡荡
- `git remote add origin https://github.com/name/name_cangku.git`：把本地仓库与远程仓库连接起来
- `git push -u origin master`：把版本区的主分支`master`提交到远程仓库
- `git push -u origin <其他分支>`：把其他分支提交到远程仓库
- `git remote`：查看远程仓库的信息，会显示`origin`，远程仓库默认名称为`origin`
- `git pull`：把最新的提交从远程仓库中抓取下来，在本地合并，和`git push`相反
- `git clone <仓库地址>`：下载克隆文件

**Git 标签**：

- `git tag`：查看所有标签，可以知道历史版本的 tag

- `git tag <name>`：打标签，默认为`HEAD`。比如`git tag v1.0`

- `git tag <tagName> <版本号>`：把版本号打上标签，版本号就是`commit`时，跟在旁边的一串字母数字

- `git tag -a <tagName> -m "<说明>"`：创建带说明的标签

- `git show <tagName>`：查看标签信息

- `git tag -d <tagName>`：删除标签

- `git push origin <tagname>`：推送某个标签到远程

- `git push origin --tags`：一次性推送全部尚未推送到远程的本地标签

- `git push origin :refs/tags/<tagname>`：删除远程标签

### 6.1 git merge 和 git rebase

git merge 和 git rebase 都是用于分支合并，关键**在** **commit 记录的处理上不同**：

- git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。
- git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。

**git merge**：

```
//将分支切换到master分支
git checkout master

//把test分支合并到master分支
git merge test
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03a1dcb7d79d4bc5b4e2d472526bc06e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="image-20211104215627579" style="zoom:80%;" />

当执行 merge 操作时，git 会把两个分支的最新快照（`F、E` 和 `D、C`）以及二者最近的共同祖先（`B`）进行三方合并，合并的结果是生成一个新的快照`G`（并提交）。

**git rebase**：

```
//将分支切换到master分支
git checkout master

//把test分支合并到master分支
git rebase test
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1552dbc2a3434303af00151992ece1b0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img" style="zoom:80%;" />

当执行 rebase 操作时，git 会从两个分支的共同祖先（`B`）开始提取待变基分支（master）上的修改，然后将待变基分支指向基分支（test）的最新提交，最后将刚才提取的修改应用到基分支的最新提交的后面。

用一句话解释就是改变基底。master 分支原来的基底是 A，现在变成了以 test 分支最新的提交 F 做为新的基底了。

**使用场景**：

当我们拉取公共分支最新代码的时候，使用 rebase；往公共分支上合代码的时候，使用 merge 。

### 6.2 git revert 和 git reset

git revert 是根据那个 commit 逆向生成一个新的 commit，版本历史是不会被破坏的。

git reset 是会**修改**版本历史的，他会丢弃掉一些版本历史。

<img src="https://segmentfault.com/img/bVz7ph?w=236&h=238" alt="图片描述" style="zoom:80%;" />

**已经 push 到远程仓库的 commit 不允许 reset**

### 6.3 git fetch 和 git pull 的区别

git fetch：只是将远程仓库的变化下载下来，并没有和本地分支合并。

git pull：会将远程仓库的变化下载下来，并和当前分支合并。（相当于`git fetch & git merge FETCH_HEAD`）

### 6.4 git 的撤销回滚和删除

**撤销**：将本地仓库的代码还原

- **情况一**：文件被修改了，但未执行`git add`操作

  ```python
  git checkout <filename>
  git checkout .
  ```

- **情况二**：同时对多个文件执行了`git add`操作，但本次只想提交其中一部分文件

  ```python
  git reset HEAD <filename>
  ```

- **情况三**：文件执行了`git add`操作，但想撤销对其的修改

  ```python
  ##  取消暂存
  git reset HEAD <filename>
  ##  撤销修改
  git checkout <filename>
  ```

- **情况四**：修改的文件已被`git commit`，但想再次修改不再产生新的 Commit

  ```python
  git commit --amend -m"说明"
  ```

- **情况五**：已在本地进行了多次`git commit`操作，现在想撤销到其中某次 Commit

  ```python
  git reset [--hard|soft|mixed|merge|keep] [commit|HEAD]
  ```

  - **git reset –-soft**：回退到某个版本，只回退 commit 的信息，不会恢复到暂存区 index file 一级。如果还要提交直接 commit 即可；
  - **git reset -–hard**：彻底回退到某个版本，本地的源码也会变为上一个版本的内容，撤销的 commit 中所包含的更改被冲掉；

**回滚**：将已被提交到远程仓库的代码还原的操作

- 注意：对远程仓库做回滚操作是有风险的，需提前做好备份和通知其他团队成员

每次更新线上，打一个 tag（标记一个版本号）

```python
git checkout <tag>
```

如果你回到当前 HEAD 指向

```python
git checkout <branch_name>
```

- **情况一**：撤销指定文件到指定版本

  ```python
  ##  查看指定文件的历史版本
  git log <filename>
  ##  回滚到指定commitID
  git checkout <commitID> <filename>
  ```

- **情况二**：删除最后一次远程提交

  - **方式一：使用 revert**

    ```python
    git revert HEAD
    git push origin master
    ```

  - **方式二：用 reset**

    ```python
    git reset --hard HEAD^
    git push origin master -f
    ```

  - 二者区别：

    **revert** 是放弃指定提交的修改，但是会生成一次新的提交，需要填写提交注释，以前的历史记录都在；

    **reset** 是指将 HEAD 指针指到指定提交，历史记录中不会出现放弃的提交记录。

- **情况三：回滚某次提交**

  ```python
  ##  找到要回滚的commitID
  git log
  git revert commitID
  ```

https://blog.csdn.net/ligang2585116/article/details/71094887

## 7. 分支命名

**master 分支**

1. 主分支，用于部署生产环境的分支，确保稳定性。
2. master 分支一般由 develop 以及 hotfix 分支合并，任何情况下都不能直接修改代码。

**develop 分支**

1. develop 为开发分支，通常情况下，保存最新完成以及 bug 修复后的代码。
2. 开发新功能时，feature 分支都是基于 develop 分支下创建的。

**feature 分支**

1. 开发新功能，基本上以 develop 为基础创建 feature 分支。
2. 分支命名：feature/ 开头的为特性分支， 命名规则: feature/user_module、 feature/cart_module。

**这点我深有体会，我在网易，mentor 就是这么教我的，**通常建一个 feature 分支。

**release 分支**

1. release 为预上线分支，发布提测阶段，会 release 分支代码为基准提测。

**hotfix 分支**

1. 分支命名：hotfix/ 开头的为修复分支，它的命名规则与 feature 分支类似。
2. 线上出现紧急问题时，需要及时修复，以 master 分支为基线，创建 hotfix 分支，修复完成后，需要合并到 master 分支和 develop 分支。

## 8. 常用的 Linux 命令

1）cd : 改变目录。

2）cd . . 回退到上一个目录。

3）pwd : 显示当前所在的目录路径。

4）ls(ll): 都是列出当前目录中的所有文件，只不过 ll 列出的内容更为详细。

5）touch : 新建一个文件 如 touch index.js 就会在当前目录下新建一个 index.js 文件。

6）rm: 删除一个文件，rm index.js 就会把 index.js 文件删除。

7）mkdir: 新建一个目录，就是新建一个文件夹。

8）rm -r : 删除一个文件夹，rm -r src 删除 src 目录

```
rm -rf / 切勿在Linux中尝试！删除电脑中全部文件！
```

9）mv 移动文件，mv index.html src，index.html 是我们要移动的文件，src 是目标文件夹,当然, 这样写,必须保证文件和目标文件夹在同一目录下。

10）reset 重新初始化终端/清屏。

11）clear 清屏。

12）history 查看命令历史。

13）help 帮助。

14）exit 退出。

15）#表示注释。

| [tar](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#tar)         | [grep](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#grep)   | [find](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#find)   | [ssh](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#ssh)       | [sed](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#sed)     | [awk](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#awk)           | [vim](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#vim)     | [diff](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#diff)         | [sort](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#sort)     | [export](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#export)   |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [args](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#args)       | [ls](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#ls)       | [pwd](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#pwd)     | [cd](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#cd)         | [gzip](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#gzip)   | [bzip2](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#bzip2)       | [unzip](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#unzip) | [shutdown](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#shutdown) | [ftp](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#ftp)       | [crontab](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#crontab) |
| [service](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#service) | [ps](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#ps)       | [free](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#free)   | [top](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#top)       | [df](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#df)       | [kill](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#kill)         | [rm](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#rm)       | [cp](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#cp)             | [mv](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#mv)         | [cat](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#cat)         |
| [mount](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#mount)     | [chmod](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#chmod) | [chown](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#chown) | [passwd](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#passwd) | [mkdir](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#mkdir) | [ifconfig](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#ifconfig) | [uname](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#uname) | [whereis](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#whereis)   | [whatis](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#whatis) | [locate](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#locate)   |
| [man](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#man)         | [tail](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#tail)   | [less](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#less)   | [su](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#su)         | [mysql](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#mysql) | [yum](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#yum)           | [rpm](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#rpm)     | [ping](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#ping)         | [date](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#date)     | [wget](https://gywbd.github.io/posts/2014/8/50-linux-commands.html#wget)       |

[50个最常用的unix/linux命令]: https://gywbd.github.io/posts/2014/8/50-linux-commands.html
