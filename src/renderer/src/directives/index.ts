import { vLoading } from 'element-plus'
import type { App } from 'vue'

export const setupDirectives = (app: App) => {
  app.directive('loading', vLoading)
}
