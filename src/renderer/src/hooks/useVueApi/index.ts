import { useRouter, useRoute, Router, RouteLocationNormalizedLoaded } from 'vue-router'
import * as vApi from 'vue'

let route: RouteLocationNormalizedLoaded
let router: Router
let init = false

let apis: {
  route: RouteLocationNormalizedLoaded
  router: Router
} & typeof vApi

export function useVueApi() {
  if (!init) {
    route = useRoute()
    router = useRouter()

    apis = {
      route,
      router,
      ...vApi
    }

    init = true
  }

  return apis
}
