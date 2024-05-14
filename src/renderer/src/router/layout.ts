import type { RouteRecordRaw } from 'vue-router'

export const layout: RouteRecordRaw[] = [
  {
    path: '/env',
    name: 'env',
    meta: {
      title: '环境配置'
    },
    component: () => import('@/views/env/index.vue')
  },
  {
    path: '/active',
    name: 'active',
    meta: {
      title: '注册码'
    },
    component: () => import('@/views/active/index.vue')
  },
  {
    path: '/doorLock',
    name: 'doorLock',
    meta: {
      title: '发卡机/门锁'
    },
    component: () => import('@/views/doorLock/index.vue')
  }
]
