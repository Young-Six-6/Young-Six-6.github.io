import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://young-six-6.github.io',
  lang: 'zh-CN',
  title: '小乌龟的6-Blog',
  subtitle: '', 
  author: {
    name: 'Young-Six-6',
    avatar: '/author.png',
    status: {
      emoji: '❤',
      message: 'Let life be beautiful like summer flowers And Death like autumn leaves.'
    }
  },
  description: '',
  social: [
    {
      name: 'GitHub',
      link: 'https://young-six-6.github.io/Young-Six-6/',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '网易云音乐',
      link: 'https://music.163.com/#/user/home?id=',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#C20C0C',
    },
    {
      name: 'E-Mail',
      link: 'mailto:wzh0456@126.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/1056643998',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
  ],

  search: {
    enable: true, 
    type: 'fuse', 
  },


  fuse: {
    options: {
      keys: ['title', 'excerpt', 'content'], // 搜索字段：标题、摘要、正文
      threshold: 0, // 匹配阈值，越低越精准（0为完全匹配）
      ignoreLocation: true, // 忽略位置，支持全文搜索
    },
  },

  // 【补充】代码块高度限制，超过300px自动折叠
  codeHeightLimit: 300,

  statistics: {
    enable: true,
    readTime: {
      speed: {
        cn: 300,
        en: 200,
      },
    },
  },

  sponsor: {
    enable: false, // 已隐藏赞助功能
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: '',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: '微信支付',
        url: '',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },

  comment: {
    enable: true
  },

  // 【可选补充】加密功能（若不需要，可删除此配置）
  encrypt: {
    enable: true, // 默认关闭，如需开启改为true
  },
})