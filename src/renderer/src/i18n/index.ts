import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './lang/en-US'
import zhCn from './lang/zh-CN'

const i18n = createI18n({
  locale: 'zh-CN',
  messages: {
    en,
    'zh-CN': zhCn
  }
})

export const setupI18n = (app: App) => {
  app.use(i18n)
}

export const $t = (key: string) => {
  return i18n.global.t(key)
}
