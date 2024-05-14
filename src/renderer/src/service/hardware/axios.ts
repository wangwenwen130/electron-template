import axios from 'axios'
import type {
  AxiosInstance as Instance,
  AxiosResponse,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: 'http://192.168.2.184:9090',
  timeout: 30000,
  withCredentials: true
}

export type RequestRes<T> = Request.HWareReqRes<T>
export type ReqConfig<T = any> = InternalAxiosRequestConfig<T>
export type ReqParams<T = any> = Request.ReqParams<T, AxiosRequestConfig>
export type ResPonse<T = any> = AxiosResponse<RequestRes<T>>

interface AxiosInstance extends Instance {
  (config: AxiosRequestConfig): Promise<RequestRes<any>>
  (url: string, config?: AxiosRequestConfig): Promise<RequestRes<any>>
}

const service = axios.create(options) as AxiosInstance

service.interceptors.response.use((res: ResPonse) => {
  const result = res.data.result
  if (result !== 0) return Promise.reject(res.data)
  return res
})

export const post = <T = unknown, K = any>(data: ReqParams<K>) => {
  return service.post<RequestRes<T>>(data.url, data.data, data.config)
}

export const get = <T = unknown, K = any>(data: ReqParams<K>) => {
  return service.get<RequestRes<T>>(data.url, data.config)
}

export default service
