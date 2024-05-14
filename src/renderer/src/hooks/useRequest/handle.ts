import type { AxiosInstance, ReqConfig } from './axios'
import { getVersion, getBaseUrl } from '@/utils'

const commonHeader = (config: ReqConfig) => {
  if (config.headers) {
    config.headers['Authorization'] = 'Bearer ' + useStorage('authToken', '').value
    config.headers['amp-user-lang'] = 'zh-cn'
    config.headers['biz-timestamp'] = Date.now() + ''
    config.headers['os-version'] = getVersion()
  }
  config.baseURL = getBaseUrl()
  return config
}

const codes = {
  1001: '服务器错误'
}

export const setHandle = (service: AxiosInstance) => {
  service.interceptors.request.use(
    (config: ReqConfig) => commonHeader(config),
    (err) => Promise.reject(err)
  )

  service.interceptors.response.use(
    (res) => {
      // 禁止更改数据结构 只能更改请求状态
      const code = res.data.code
      if (code !== 0) {
        return Promise.reject(res)
      }
      type Code = keyof typeof codes
      if (codes[code as Code])
        return Promise.reject({
          ...res,
          data: {
            ...res.data,
            msg: codes[code as Code]
          }
        })
      return res
    },
    (err) => Promise.reject(err)
  )
}
