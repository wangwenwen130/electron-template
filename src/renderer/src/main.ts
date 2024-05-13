import '@/assets/style/reset.css'
import 'uno.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { setupStore } from './stores'
import { setupI18n } from './i18n'
import { setupRouter } from './router'
import { setupDirectives } from './directives'
import { setupIcons } from './components'

import App from './App.vue'

const bootstrap = () => {
  const app = createApp(App)

  setupRouter(app)
  setupStore(app)
  setupI18n(app)
  setupDirectives(app)
  setupIcons(app)

  app.mount('#app')
  app.config.errorHandler = function (err) {
    console.log('全局捕获 err >>>', err)
  }
}

bootstrap()
