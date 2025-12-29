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
  }, // 关键1：闭合 themeConfig 大括号（移出 unocss/addons）

  // 关键2：unocss 移到根级别（与 theme 同级，非 themeConfig 子属性）
  unocss: { safelist },
  addons: [
    (addonWaline as (options: ExtendedWalineOptions) => any)({
      serverURL: 'https://youngsix6.work',
      avatar: 'mp',
      requiredMeta: ['nick', 'mail'],
      pageSize: 10,
      lang: 'zh-CN',
      locale: {
        placeholder: '期待你的回复～'
      },
    }),
  ],
})