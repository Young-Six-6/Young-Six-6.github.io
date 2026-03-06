import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'
import { addonWaline, type WalineOptions } from 'valaxy-addon-waline'
import path from 'path'
import { fileURLToPath } from 'url'

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

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
  },

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

  build: {
    base: '/',
    outDir: 'dist',
    rollupOptions: {
      resolve: {
        alias: {
          'vue-router': path.resolve(__dirname, './node_modules/vue-router/dist/vue-router.esm-bundler.js')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
      external: []
    }
  }
})