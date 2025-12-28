import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'
import { addonWaline, type WalineOptions } from 'valaxy-addon-waline'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

type ExtendedWalineOptions = WalineOptions & {
  placeholder?: string
  avatar?: string
  requiredMeta?: ('nick' | 'mail' | 'link')[]
  pageSize?: number
  lang?: string
}

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '小乌龟的 6-Blog',
    },
    bg_image: {
      enable: true,
      url: 'https://rba.kanostar.top/adapt',
      dark: 'https://rba.kanostar.top/adapt',
      opacity: 0.7
    },

    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '喜欢的女孩子',
        url: '/girls/',
        icon: 'i-ri-women-line',
        color: 'hotpink',
      },
    ],

    footer: {
      since: 2025,
      beian: {
        enable: false,
        icp: 'N/A',
      },
    },
  },

  unocss: { safelist },
  addons: [
    (addonWaline as (options: ExtendedWalineOptions) => any)({
      serverURL: 'https://youngsix6.work', 
      avatar: 'mp', // 头像类型（支持微信/QQ/Gravatar 等，可选值：mp、qq、gravatar 等）
      requiredMeta: ['nick', 'mail'], // 必填信息（昵称、邮箱，可按需删除）
      pageSize: 10, // 每页显示的评论数
      lang: 'zh-CN',
      locale: {
        placeholder: '期待你的回复～'
    },
    }),
  ],
})