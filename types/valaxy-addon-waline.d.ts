import type { WalineOptions as BaseWalineOptions } from 'valaxy-addon-waline'
import type { WalineInitOptions } from '@waline/client'

declare module 'valaxy-addon-waline' {
  export interface WalineOptions extends BaseWalineOptions, WalineInitOptions {
    placeholder?: string
    avatar?: string
    requiredMeta?: ('nick' | 'mail' | 'link')[]
    pageSize?: number
    lang?: string
  }
}