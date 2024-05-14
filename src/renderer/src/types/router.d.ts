import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 设置该路由在侧边栏和面包屑中展示的名字
     */
    title: string
    /**
     * 设置该路由的图标，记得将 svg 导入 @/icons/svg
     */
    visible?: boolean
    /**
     * 设置能进入该路由的角色，支持多个角色叠加
     */
    roles?: string[]
  }
}
