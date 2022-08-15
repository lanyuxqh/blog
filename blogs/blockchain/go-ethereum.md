---
title: win10环境下go-ethereum源码运行
date: 2021-10-27
tags:
  - 区块链
categories:
  - 区块链
---

# win10 环境下 go-ethereum 源码运行

## go-ethereum 源码运行

### 环境搭建（win10）

1. go 安装、配置环境

   - 参考资料：https://www.liuyixiang.com/post/113425.html ps：区分 GOROOT（安装目录）和 GOPATH（工作目录）
   - 在 GOPATH（工作目录）下创建三个文件夹
     - bin
     - pkg
     - src（之后放代码的地方）
   - 为防止后面 go get 失败，在这里设置代理
     - `go env -w GO111MODULE=on`
     - `go env -w GOPROXY=https://goproxy.cn,direct `
   - 查看是否配置成功，命令行输入`go env`。

2. Goland 安装

   - 参考资料：https://www.cnblogs.com/randysun/p/15396074.html

3. 安装 MinGW-w64

   - 为了解决 win10 下 make 命令不能用的问题。

   - 参考资料：https://www.cnblogs.com/findumars/p/8289454.html
   - 安装且配置完成后，命令行输入`make -v`，如果还是不行，把 bin 下的 mingw32-make.exe 改名为 make.exe 就可以了。

### 源码编译

1. 下载 go-ethereum 源码

   - `go get -u -v github.com/ethereum/go-ethereum`
   - 源码会下载到工作目录下的 src/github.com

2. 按照官网的在 go-ethereum 目录下进行 make（失败）

   ```
   // 报错信息
   D:\go\src\github.com\ethereum\go-ethereum>make
   env GO111MODULE=on go run build/ci.go install ./cmd/geth
   process_begin: CreateProcess(NULL, env GO111MODULE=on go run build/ci.go install ./cmd/geth, ...) failed.
   make (e=2): 系统找不到指定的文件。
   make: *** [Makefile:12: geth] Error 2
   ```

   由于找不到解决方案，换另一种方式，不用源码中 makefile 文件进行编译，直接用`go run build/ci.go install ./cmd/geth`

   ```
   D:\go\src\github.com\ethereum\go-ethereum>go run build/ci.go install ./cmd/geth
   go: downloading github.com/cespare/cp v0.1.0
   go: downloading github.com/Azure/azure-storage-blob-go v0.7.0
   go: downloading github.com/Azure/azure-pipeline-go v0.2.2
   go: downloading github.com/mattn/go-ieproxy v0.0.0-20190702010315-6dee0af9227d
   >>> C:\Program Files\Go\bin\go build -ldflags -X main.gitCommit=526c3f6b9e99fe750b8e38c53264f0204cab1422 -X main.gitDate=20211026 -trimpath -v -o D:\go\src\github.com\ethereum\go-ethereum\build\bin\geth.exe ./cmd/geth
   internal/unsafeheader
   internal/race
   此处省略...
   github.com/ethereum/go-ethereum/internal/jsre
   github.com/ethereum/go-ethereum/console
   ##  gopkg.in/olebedev/go-duktape.v3
   duk_minimal_printf.c: In function 'duk__parse_pointer':
   duk_minimal_printf.c:126:9: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
     *out = (void *) val;
            ^
   duk_minimal_printf.c: In function 'duk_minimal_vsnprintf':
   duk_minimal_printf.c:236:76: warning: cast from pointer to integer of different size [-Wpointer-to-int-cast]
        off = duk__format_long(str, size, off, sizeof(void *) * 2, '0', 16, 0, (unsigned long) v);
                                                                               ^
   github.com/ethereum/go-ethereum/eth/tracers
   github.com/ethereum/go-ethereum/cmd/utils
   github.com/ethereum/go-ethereum/cmd/geth

   // 成功
   ```

   编译成功后，可以在 D:\go\src\github.com\ethereum\go-ethereum\build\bin 下找到 geth.exe。

3. 查看 geth 命令

   ```
   D:\go\src\github.com\ethereum\go-ethereum\build\bin>geth --help
   NAME:
      geth - the go-ethereum command line interface

      Copyright 2013-2021 The go-ethereum Authors

   USAGE:
      geth [options] [command] [command options] [arguments...]

   VERSION:
      1.10.12-unstable-526c3f6b-20211026

   COMMANDS:
      account                            Manage accounts
      attach                             Start an interactive JavaScript environment (connect to node)
      console                            Start an interactive JavaScript environment
      db                                 Low level database operations
      dump                               Dump a specific block from storage
      dumpconfig                         Show configuration values
      dumpgenesis                        Dumps genesis block JSON configuration to stdout
      export                             Export blockchain into file
      export-preimages                   Export the preimage database into an RLP stream
      import                             Import a blockchain file
      import-preimages                   Import the preimage database from an RLP stream
      init                               Bootstrap and initialize a new genesis block
      js                                 Execute the specified JavaScript files
      license                            Display license information
      makecache                          Generate ethash verification cache (for testing)
      makedag                            Generate ethash mining DAG (for testing)
      removedb                           Remove blockchain and state databases
      show-deprecated-flags              Show flags that have been deprecated
      snapshot                           A set of commands based on the snapshot
      version                            Print version numbers
      version-check                      Checks (online) whether the current version suffers from any known security vulnerabilities
      wallet                             Manage Ethereum presale wallets
      help, h                            Shows a list of commands or help for one command

   ETHEREUM OPTIONS:
     --config value                      TOML configuration file
     --datadir value                     Data directory for the databases and keystore (default: "C:\\Users\\徐倩慧\\AppData\\Roaming\\Ethereum")
     --datadir.ancient value             Data directory for ancient chain segments (default = inside chaindata)
     --datadir.minfreedisk value         Minimum free disk space in MB, once reached triggers auto shut down (default = --cache.gc converted to MB, 0 = disabled)
     --keystore value                    Directory for the keystore (default = inside the datadir)
     --usb                               Enable monitoring and management of USB hardware wallets
     --pcscdpath value                   Path to the smartcard daemon (pcscd) socket file
     --networkid value                   Explicitly set network id (integer)(For testnets: use --ropsten, --rinkeby, --goerli instead) (default: 1)
     --mainnet                           Ethereum mainnet
     --goerli                            Görli network: pre-configured proof-of-authority test network
     --rinkeby                           Rinkeby network: pre-configured proof-of-authority test network
     --ropsten                           Ropsten network: pre-configured proof-of-work test network
     --syncmode value                    Blockchain sync mode ("fast", "full", "snap" or "light") (default: snap)
     --exitwhensynced                    Exits after block synchronisation completes
     --gcmode value                      Blockchain garbage collection mode ("full", "archive") (default: "full")
     --txlookuplimit value               Number of recent blocks to maintain transactions index for (default = about one year, 0 = entire chain) (default: 2350000)
     --ethstats value                    Reporting URL of a ethstats service (nodename:secret@host:port)
     --identity value                    Custom node name
     --lightkdf                          Reduce key-derivation RAM & CPU usage at some expense of KDF strength
     --whitelist value                   Comma separated block number-to-hash mappings to enforce (<number>=<hash>)

   LIGHT CLIENT OPTIONS:
     --light.serve value                 Maximum percentage of time allowed for serving LES requests (multi-threaded processing allows values over 100) (default: 0)
     --light.ingress value               Incoming bandwidth limit for serving light clients (kilobytes/sec, 0 = unlimited) (default: 0)
     --light.egress value                Outgoing bandwidth limit for serving light clients (kilobytes/sec, 0 = unlimited) (default: 0)
     --light.maxpeers value              Maximum number of light clients to serve, or light servers to attach to (default: 100)
     --ulc.servers value                 List of trusted ultra-light servers
     --ulc.fraction value                Minimum % of trusted ultra-light servers required to announce a new head (default: 75)
     --ulc.onlyannounce                  Ultra light server sends announcements only
     --light.nopruning                   Disable ancient light chain data pruning
     --light.nosyncserve                 Enables serving light clients before syncing

   DEVELOPER CHAIN OPTIONS:
     --dev                               Ephemeral proof-of-authority network with a pre-funded developer account, mining enabled
     --dev.period value                  Block period to use in developer mode (0 = mine only if transaction pending) (default: 0)

   ETHASH OPTIONS:
     --ethash.cachedir value             Directory to store the ethash verification caches (default = inside the datadir)
     --ethash.cachesinmem value          Number of recent ethash caches to keep in memory (16MB each) (default: 2)
     --ethash.cachesondisk value         Number of recent ethash caches to keep on disk (16MB each) (default: 3)
     --ethash.cacheslockmmap             Lock memory maps of recent ethash caches
     --ethash.dagdir value               Directory to store the ethash mining DAGs (default: "C:\\Users\\徐倩慧\\AppData\\Local\\Ethash")
     --ethash.dagsinmem value            Number of recent ethash mining DAGs to keep in memory (1+GB each) (default: 1)
     --ethash.dagsondisk value           Number of recent ethash mining DAGs to keep on disk (1+GB each) (default: 2)
     --ethash.dagslockmmap               Lock memory maps for recent ethash mining DAGs

   TRANSACTION POOL OPTIONS:
     --txpool.locals value               Comma separated accounts to treat as locals (no flush, priority inclusion)
     --txpool.nolocals                   Disables price exemptions for locally submitted transactions
     --txpool.journal value              Disk journal for local transaction to survive node restarts (default: "transactions.rlp")
     --txpool.rejournal value            Time interval to regenerate the local transaction journal (default: 1h0m0s)
     --txpool.pricelimit value           Minimum gas price limit to enforce for acceptance into the pool (default: 1)
     --txpool.pricebump value            Price bump percentage to replace an already existing transaction (default: 10)
     --txpool.accountslots value         Minimum number of executable transaction slots guaranteed per account (default: 16)
     --txpool.globalslots value          Maximum number of executable transaction slots for all accounts (default: 5120)
     --txpool.accountqueue value         Maximum number of non-executable transaction slots permitted per account (default: 64)
     --txpool.globalqueue value          Maximum number of non-executable transaction slots for all accounts (default: 1024)
     --txpool.lifetime value             Maximum amount of time non-executable transaction are queued (default: 3h0m0s)

   PERFORMANCE TUNING OPTIONS:
     --cache value                       Megabytes of memory allocated to internal caching (default = 4096 mainnet full node, 128 light mode) (default: 1024)
     --cache.database value              Percentage of cache memory allowance to use for database io (default: 50)
     --cache.trie value                  Percentage of cache memory allowance to use for trie caching (default = 15% full mode, 30% archive mode) (default: 15)
     --cache.trie.journal value          Disk journal directory for trie cache to survive node restarts (default: "triecache")
     --cache.trie.rejournal value        Time interval to regenerate the trie cache journal (default: 1h0m0s)
     --cache.gc value                    Percentage of cache memory allowance to use for trie pruning (default = 25% full mode, 0% archive mode) (default: 25)
     --cache.snapshot value              Percentage of cache memory allowance to use for snapshot caching (default = 10% full mode, 20% archive mode) (default: 10)
     --cache.noprefetch                  Disable heuristic state prefetch during block import (less CPU and disk IO, more time waiting for data)
     --cache.preimages                   Enable recording the SHA3/keccak preimages of trie keys

   ACCOUNT OPTIONS:
     --unlock value                      Comma separated list of accounts to unlock
     --password value                    Password file to use for non-interactive password input
     --signer value                      External signer (url or path to ipc file)
     --allow-insecure-unlock             Allow insecure account unlocking when account-related RPCs are exposed by http

   API AND CONSOLE OPTIONS:
     --ipcdisable                        Disable the IPC-RPC server
     --ipcpath value                     Filename for IPC socket/pipe within the datadir (explicit paths escape it)
     --http                              Enable the HTTP-RPC server
     --http.addr value                   HTTP-RPC server listening interface (default: "localhost")
     --http.port value                   HTTP-RPC server listening port (default: 8545)
     --http.api value                    API's offered over the HTTP-RPC interface
     --http.rpcprefix value              HTTP path path prefix on which JSON-RPC is served. Use '/' to serve on all paths.
     --http.corsdomain value             Comma separated list of domains from which to accept cross origin requests (browser enforced)
     --http.vhosts value                 Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
     --ws                                Enable the WS-RPC server
     --ws.addr value                     WS-RPC server listening interface (default: "localhost")
     --ws.port value                     WS-RPC server listening port (default: 8546)
     --ws.api value                      API's offered over the WS-RPC interface
     --ws.rpcprefix value                HTTP path prefix on which JSON-RPC is served. Use '/' to serve on all paths.
     --ws.origins value                  Origins from which to accept websockets requests
     --graphql                           Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.
     --graphql.corsdomain value          Comma separated list of domains from which to accept cross origin requests (browser enforced)
     --graphql.vhosts value              Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
     --rpc.gascap value                  Sets a cap on gas that can be used in eth_call/estimateGas (0=infinite) (default: 50000000)
     --rpc.evmtimeout value              Sets a timeout used for eth_call (0=infinite) (default: 5s)
     --rpc.txfeecap value                Sets a cap on transaction fee (in ether) that can be sent via the RPC APIs (0 = no cap) (default: 1)
     --rpc.allow-unprotected-txs         Allow for unprotected (non EIP155 signed) transactions to be submitted via RPC
     --jspath loadScript                 JavaScript root path for loadScript (default: ".")
     --exec value                        Execute JavaScript statement
     --preload value                     Comma separated list of JavaScript files to preload into the console

   NETWORKING OPTIONS:
     --bootnodes value                   Comma separated enode URLs for P2P discovery bootstrap
     --discovery.dns value               Sets DNS discovery entry points (use "" to disable DNS)
     --port value                        Network listening port (default: 30303)
     --maxpeers value                    Maximum number of network peers (network disabled if set to 0) (default: 50)
     --maxpendpeers value                Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
     --nat value                         NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
     --nodiscover                        Disables the peer discovery mechanism (manual peer addition)
     --v5disc                            Enables the experimental RLPx V5 (Topic Discovery) mechanism
     --netrestrict value                 Restricts network communication to the given IP networks (CIDR masks)
     --nodekey value                     P2P node key file
     --nodekeyhex value                  P2P node key as hex (for testing)

   MINER OPTIONS:
     --mine                              Enable mining
     --miner.threads value               Number of CPU threads to use for mining (default: 0)
     --miner.notify value                Comma separated HTTP URL list to notify of new work packages
     --miner.notify.full                 Notify with pending block headers instead of work packages
     --miner.gasprice value              Minimum gas price for mining a transaction (default: 1000000000)
     --miner.gaslimit value              Target gas ceiling for mined blocks (default: 8000000)
     --miner.etherbase value             Public address for block mining rewards (default = first account) (default: "0")
     --miner.extradata value             Block extra data set by the miner (default = client version)
     --miner.recommit value              Time interval to recreate the block being mined (default: 3s)
     --miner.noverify                    Disable remote sealing verification

   GAS PRICE ORACLE OPTIONS:
     --gpo.blocks value                  Number of recent blocks to check for gas prices (default: 20)
     --gpo.percentile value              Suggested gas price is the given percentile of a set of recent transaction gas prices (default: 60)
     --gpo.maxprice value                Maximum transaction priority fee (or gasprice before London fork) to be recommended by gpo (default: 500000000000)
     --gpo.ignoreprice value             Gas price below which gpo will ignore transactions (default: 2)

   VIRTUAL MACHINE OPTIONS:
     --vmdebug                           Record information useful for VM and contract debugging

   LOGGING AND DEBUGGING OPTIONS:
     --fakepow                           Disables proof-of-work verification
     --nocompaction                      Disables db compaction after import
     --verbosity value                   Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)
     --vmodule value                     Per-module verbosity: comma-separated list of <pattern>=<level> (e.g. eth/*=5,p2p=4)
     --log.json                          Format logs with JSON
     --log.backtrace value               Request a stack trace at a specific logging statement (e.g. "block.go:271")
     --log.debug                         Prepends log messages with call-site location (file and line number)
     --pprof                             Enable the pprof HTTP server
     --pprof.addr value                  pprof HTTP server listening interface (default: "127.0.0.1")
     --pprof.port value                  pprof HTTP server listening port (default: 6060)
     --pprof.memprofilerate value        Turn on memory profiling with the given rate (default: 524288)
     --pprof.blockprofilerate value      Turn on block profiling with the given rate (default: 0)
     --pprof.cpuprofile value            Write CPU profile to the given file
     --trace value                       Write execution trace to the given file

   METRICS AND STATS OPTIONS:
     --metrics                              Enable metrics collection and reporting
     --metrics.expensive                    Enable expensive metrics collection and reporting
     --metrics.addr value                   Enable stand-alone metrics HTTP server listening interface (default: "127.0.0.1")
     --metrics.port value                   Metrics HTTP server listening port (default: 6060)
     --metrics.influxdb                     Enable metrics export/push to an external InfluxDB database
     --metrics.influxdb.endpoint value      InfluxDB API endpoint to report metrics to (default: "http://localhost:8086")
     --metrics.influxdb.database value      InfluxDB database name to push reported metrics to (default: "geth")
     --metrics.influxdb.username value      Username to authorize access to the database (default: "test")
     --metrics.influxdb.password value      Password to authorize access to the database (default: "test")
     --metrics.influxdb.tags value          Comma-separated InfluxDB tags (key/values) attached to all measurements (default: "host=localhost")
     --metrics.influxdbv2                   Enable metrics export/push to an external InfluxDB v2 database
     --metrics.influxdb.token value         Token to authorize access to the database (v2 only) (default: "test")
     --metrics.influxdb.bucket value        InfluxDB bucket name to push reported metrics to (v2 only) (default: "geth")
     --metrics.influxdb.organization value  InfluxDB organization name (v2 only) (default: "geth")

   ALIASED (deprecated) OPTIONS:
     --nousb                             Disables monitoring for and managing USB hardware wallets (deprecated)

   MISC OPTIONS:
     --snapshot                          Enables snapshot-database mode (default = enable)
     --bloomfilter.size value            Megabytes of memory allocated to bloom-filter for pruning (default: 2048)
     --help, -h                          show help
     --catalyst                          Catalyst mode (eth2 integration testing)
     --override.london value             Manually specify London fork-block, overriding the bundled setting (default: 0)


   COPYRIGHT:
      Copyright 2013-2021 The go-ethereum Authors
   ```

### geth 搭建私有链网络

1. 初始化创世块

   - 创建 privateChain 目录，我是 D:\privateChain

   - 在 D:\privateChain 目录下新建一个文件 genesis.json 来放置创世块（第 0 号区块）的配置信息。

     ```
     {
       "config": {
         "chainId": 15,
         "homesteadBlock": 0,
         "eip150Block": 0,
         "eip155Block": 0,
         "eip158Block": 0,
         "byzantiumBlock": 0,
         "constantinopleBlock": 0,
         "petersburgBlock": 0,
         "ethash": {}
       },
       "difficulty": "2000",
       "gasLimit": "8000000",
       "alloc": {
         "7df9a875a174b3bc565e6424a0050ebc1b2d1d82": { "balance": "300000" },
         "f41c74c9ae680c1aa78f42e5647a62f353b7bdde": { "balance": "400000" }
       }
     }
     ```

   - 用上面这个配置文件来初始化创世块，需要进入 D:\go\src\github.com\ethereum\go-ethereum\build\bin 目录

     ```
     D:\go\src\github.com\ethereum\go-ethereum\build\bin>geth init --datadir D:\privateChain D:\privateChain\genesis.json
     INFO [10-27|16:12:23.152] Maximum peer count                       ETH=50 LES=0 total=50
     INFO [10-27|16:12:23.217] Set global gas cap                       cap=50,000,000
     INFO [10-27|16:12:23.221] Allocated cache and file handles         database=D:\privateChain\geth\chaindata cache=16.00MiB handles=16
     INFO [10-27|16:12:23.325] Writing custom genesis block
     INFO [10-27|16:12:23.328] Persisted trie from memory database      nodes=3 size=397.00B time="35.2µs" gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
     INFO [10-27|16:12:23.334] Successfully wrote genesis state         database=chaindata                      hash=b8627b..6f1af8
     INFO [10-27|16:12:23.337] Allocated cache and file handles         database=D:\privateChain\geth\lightchaindata cache=16.00MiB handles=16
     INFO [10-27|16:12:23.475] Writing custom genesis block
     INFO [10-27|16:12:23.478] Persisted trie from memory database      nodes=3 size=397.00B time="527µs"  gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
     INFO [10-27|16:12:23.483] Successfully wrote genesis state         database=lightchaindata                      hash=b8627b..6f1af8
     ```

2. 启动私有链网络

   - 执行命令行

     ```
     D:\go\src\github.com\ethereum\go-ethereum\build\bin>geth --datadir D:\privateChain --dev --http --http.addr 127.0.0.1 --http.port 8545 --http.api "web3,eth,personal,net" console 2>>D:\privateChain/geth.log --allow-insecure-unlock
     Welcome to the Geth JavaScript console!

     instance: Geth/v1.10.12-unstable-526c3f6b-20211026/windows-amd64/go1.16.5
     coinbase: 0xab7924b47c7ec50aae6c65b06ec8fe2f59f85aed
     at block: 0 (Thu Jan 01 1970 08:00:00 GMT+0800 (CST))
      datadir: D:\privateChain
      modules: admin:1.0 debug:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

     To exit, press ctrl-d or type exit
     >

     ```

   - 命令分析
     - --datadir D:\privateChain // 数据库和 keystore 密钥的数据目录
     - --dev // 开发者模式，使用 POA 共识网络，默认预分配一个开发者账户并且会自动开启挖矿。
     - --http --http.addr 127.0.0.1 --http.port 8545 --http.api "web3,eth,personal,net" // 启用 HTTP 服务器，设置接口地址、监听端口、api（这里可能是最新版本的缘故，跟以前的命令不太一样，以前的是 --rpc，具体可以通过 geth --help 查看当前可用命令）
     - console // 启动交互式 JavaScript 环境
     - 2>>D:\privateChain/geth.log // 打印信息不显示在命令行，写入指定文件
     - --allow-insecure-unlock // 打开 HTTP 通道解锁账户
   - D:\privateChain 目录分析
     - geth：数据库
     - keystore：账户密钥（启动后会有自动创建一个账户，但由于不知道密码，可以先删除，之后手动再创建）
     - genesis.json：创世块信息
     - geth.log：打印信息

3. geth 常用命令

   ```
   D:\go\src\github.com\ethereum\go-ethereum\build\bin>geth --datadir D:\privateChain --dev.period 0 --http --http.addr 127.0.0.1 --http.port 8545 --http.api "web3,eth,personal,net" console 2>>D:\privateChain/geth.log --allow-insecure-unlock
   Welcome to the Geth JavaScript console!

   instance: Geth/v1.10.12-unstable-526c3f6b-20211026/windows-amd64/go1.16.5
   coinbase: 0x372dd6b9d766b3164165ce40c09f6b6b49d594c5
   at block: 27 (Wed Oct 27 2021 16:45:47 GMT+0800 (CST))
    datadir: D:\privateChain
    modules: admin:1.0 debug:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

   To exit, press ctrl-d or type exit
   > personal.newAccount()   // 创建账户、设置密码
   Passphrase:
   Repeat passphrase:
   "0xab308aca678b679926295d0119984558f057cc25"
   > eth.accounts   // 查看账户列表
   ["0xab308aca678b679926295d0119984558f057cc25"]
   > eth.getBalance(eth.accounts[0])  // 查看账户余额
   0
   > miner.setEtherbase(eth.accounts[0])  // 设置挖矿收益者
   true
   > miner.start()  // 开始挖矿
   null
   > miner.stop()   // 结束挖矿
   null
   > eth.getBalance(eth.accounts[0])
   64000000000000000000
   > web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')  // 余额单位转换
   64
   > eth.blockNumber  // 查看区块高度
   60
   > personal.newAccount()  // 创建另一个账户
   Passphrase:
   Repeat passphrase:
   "0x48ada6211841615ab9d619210fdd0a5db268bdce"
   > eth.accounts
   ["0xab308aca678b679926295d0119984558f057cc25", "0x48ada6211841615ab9d619210fdd0a5db268bdce"]
   > eth.getBalance(eth.accounts[1])
   0
   > eth.sendTransaction({from: eth.accounts[0], to: eth.accounts[1], value: 4000000000000000000})  // 发送交易失败，因为没有解锁账户
   Error: authentication needed: password or unlock
           at web3.js:6357:37(47)
           at send (web3.js:5091:62(35))
           at <eval>:1:20(16)
   > personal.unlockAccount(eth.accounts[0]) // 解锁账户
   Unlock account 0xab308aca678b679926295d0119984558f057cc25
   Passphrase:
   true
   > eth.sendTransaction({from: eth.accounts[0], to: eth.accounts[1], value: 4000000000000000000}) // 发送交易
   "0x068b45342587c6922f06199ebf2fd36eb58c6f0dcff03b63c7fd148612e7eeff"
   > eth.blockNumber
   60
   > exit

   ```

### MetaMask 钱包连接 geth 私链

1. 下载 MetaMask 钱包，自行百度

2. 自定义 RPC（根据开启的私链设置相应信息）

3. 导入账户私钥，由于 geth 中是 keystore 形式，需要转换为 privatekey

   - 参考资料：https://www.jianshu.com/p/1e5c55529eff

   - 安装包：`npm install keythereum`

   - 写个代码

     ```
     // keystore形式转换为privatekey
     var keythereum = require("keythereum");
     //keystore密钥存放目录，在project目录下的keystore目录下，密钥以address命名
     var datadir = "D:/privateChain";
     var address= "0xab308aca678b679926295d0119984558f057cc25";
     const password = "123";

     var keyObject = keythereum.importFromFile(address, datadir);
     var privateKey = keythereum.recover(password, keyObject);
     console.log(privateKey.toString('hex'));
     ```

   - 用 node 跑上面代码

     ```
     D:\privateChain\utils>node keystore2pk.js
     40fc5d61cc394c1141e79384234086d2495027e4958e3fc24062372e1ea38fbe
     ```

### Remix 连接 geth 私链

1. [Remix](http://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js)
   - 在 ENVIRONMENT 中选择 Injected Web3
   - 会主动去连接 MetaMask 钱包中的网络
   - 选择要连接的账户

---

至此，源码运行完事了~接下来要去认真读源码了哦
