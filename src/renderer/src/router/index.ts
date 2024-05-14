import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import { layout } from './layout'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: layout
    }
  ]
})

export const setupRouter = (app: App) => {
  app.use(router)
}

export default router
