import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: Login
    }
  ]
})

export const setupRouter = (app: App) => {
  app.use(router)
}

export default router
