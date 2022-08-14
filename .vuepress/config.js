module.exports = {
  title: '懒鱼',
  description: '人生海海，山山而川，不过尔尔',
  dest: 'docs',
  base: '/blog/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/avatar.png'
      }
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ]
  ],
  plugins: [
    ['@vuepress/register-components'],
    [
      //先安装在配置， npm install @vuepress-reco/vuepress-plugin-kan-ban-niang --save
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: [
          'koharu',
          'blackCat',
          'whiteCat',
          'haru2',
          'haruto',
          'haru1',
          'izumi',
          'shizuku',
          'wanko',
          'miku',
          'z16'
        ],
        clean: true, // 是否显示操作按钮
        messages: {
          welcome: '我是懒鱼，欢迎你的关注 ',
          home: '心里的话，我想要带你回家。',
          theme: '好吧，希望你能喜欢我的其他小伙伴。',
          close: '再见哦'
        },
        width: 170,
        height: 240,
        modelStyle: {
          left: '5px',
          bottom: '-20px',
          opacity: '0.8'
        }
      }
    ],
    [
      //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
      'cursor-effects',
      {
        size: 3, // size of the particle, default: 2
        shape: 'circle', // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999 // z-index property of the canvas, default: 999999999
      }
    ],
    [
      //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
      'dynamic-title',
      {
        showIcon: '/favicon.ico',
        showText: 'hi～',
        hideIcon: '/failure.ico',
        hideText: 'bye～',
        recoverTime: 2000
      }
    ],
    [
      //vuepress复制粘贴提示插件P 先安装在配置 npm install vuepress-plugin-nuggets-style-copy --save
      'vuepress-plugin-nuggets-style-copy',
      {
        copyText: '复制代码',
        tip: {
          content: '复制成功!'
        }
      }
    ],
    [
      '@vuepress-reco/vuepress-plugin-bgm-player',
      {
        audios: [
          {
            name: 'River Flows In You',
            artist: 'Martin Ermen',
            //地址
            url: 'http://music.163.com/song/media/outer/url?id=20110049.mp3',
            //封面图片
            cover:
              'https://y.qq.com/music/photo_new/T002R300x300M000003zD6X70C6Ti6_2.jpg?max_age=2592000'
          }
        ],
        // 是否默认缩小
        autoShrink: true,
        // 缩小时缩为哪种模式
        shrinkMode: 'float',
        // 悬浮窗样式
        floatStyle: { bottom: '30px', 'z-index': '999999' }
      }
    ]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      {
        text: '主页',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: '时间轴',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: '留言板',
        icon: 'reco-suggestion',
        link: '/others/message-board.md'
      },
      {
        text: '关于我',
        icon: 'reco-account',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/lanyuxqh',
            icon: 'reco-github'
          },
          {
            text: 'xqh-vue-ui',
            link: 'https://lanyuxqh.github.io/xqh-vue-ui-doc/',
            icon: 'reco-document'
          }
        ]
      }
    ],
    subSidebar: 'auto',
    // sidebar: {
    //   '/others/informal-essay/': [
    //     // "timer"
    //   ]
    // },
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: '分类'
      },
      tag: {
        location: 3,
        text: '标签'
      }
    },
    friendLink: [
      {
        title: 'xqh-vue-ui',
        desc: '一款轻量、好用的 Vue 组件库',
        link: 'https://lanyuxqh.github.io/xqh-vue-ui-doc/'
      }
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
    ],
    vssueConfig: {
      platform: 'github',
      owner: 'lanyuxqh',
      repo: 'blog',
      clientId: 'cc21e3e1dd6c5c86f2c8',
      clientSecret: '443794132323d7c5a7f8a883293e6cc0118e3c79'
    },
    logo: '/avatar.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: '懒鱼',
    authorAvatar: '/avatar.png',
    // record: '懒鱼',
    startYear: '2021'
  },
  markdown: {
    lineNumbers: true
  }
}
