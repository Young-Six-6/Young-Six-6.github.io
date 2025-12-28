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
  description: '', // 按你的要求留空，如需补充可改为 "日常记录ing"
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
    enable: true, // 已启用搜索功能
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
})
