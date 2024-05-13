import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'
import { localSet } from '@/utils/index'

export const textLanguage = {
  cn: '中文',
  en: 'English'
}

export const messages = {
  cn: zhCN,
  en: enUS
}

const i18n = createI18n({
  legacy: false,
  locale: 'cn',
  globalInjection: true,
  messages
})

export const setLanguage = (lang: keyof typeof textLanguage) => {
  i18n.global.locale.value = lang
  localSet('language', lang)
}

export default i18n
