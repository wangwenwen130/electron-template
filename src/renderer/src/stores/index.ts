import { createPinia } from 'pinia'
import type { App } from 'vue'

const pinia = createPinia()

export const setupStore = (app: App) => {
  app.use(pinia)
}
