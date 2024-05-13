import type { App } from 'vue'
import { Check, Close, Loading, Plus, RefreshRight } from '@element-plus/icons-vue'

export const setupIcons = (app: App) => {
  app.component('Close', Close)
  app.component('Check', Check)
  app.component('Loading', Loading)
  app.component('Plus', Plus)
  app.component('RefreshRight', RefreshRight)
}
