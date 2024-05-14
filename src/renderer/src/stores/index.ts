import { createPinia } from 'pinia'
import type { App } from 'vue'
export * from './hotel'
export * from './sys'

const pinia = createPinia()

export const setupStore = (app: App) => {
  app.use(pinia)
}
