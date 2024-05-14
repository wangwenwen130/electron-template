import { version } from '~/package'

const mode = import.meta.env.MODE
export const isDev = import.meta.env.DEV
export const getVersion = () => version
export const isProd = import.meta.env.PROD

export const getBaseUrl = () => {
  let baseURL = ''
  switch (mode) {
    case 'product':
      baseURL = 'https://api.woxiangzhu.com.cn/'
      break
    case 'development':
      // baseURL = 'https://dev-api.woxiangzhu.com.cn/'
      baseURL = 'http://192.168.2.223:10000/'
      break
    case 'test':
      baseURL = 'https://test-api.woxiangzhu.com.cn/'
      break
    case 'uat':
      baseURL = 'https://uat-api.woxiangzhu.com.cn/'
      break
    case 'pre':
      baseURL = 'https://pre.woxiangzhu.com.cn/'
      break
    default:
      break
  }
  return baseURL
}
