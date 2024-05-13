import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'
import component from './components'
import i18n from '@/i18n/index'

const app = createApp(App)

app.config.errorHandler = function (err) {
  console.log('全局捕获 err >>>', err)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(component)
app.use(i18n)

app.mount('#app')
