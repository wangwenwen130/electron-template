import axios from 'axios'
import type {
  AxiosInstance as Instance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'
import { setHandle } from './handle'
import { getBaseUrl } from '@/utils'

export type ReqConfig<T = any> = InternalAxiosRequestConfig<T>
export type ResPonse<T = any> = AxiosResponse<Request.ReqRes<T>>
export type ReqParams<T = any> = Request.ReqParams<T, AxiosRequestConfig>

export interface AxiosInstance extends Instance {
  (config: AxiosRequestConfig): Promise<ResPonse>
  (url: string, config?: AxiosRequestConfig): Promise<ResPonse>
}

const options: CreateAxiosDefaults = {
  baseURL: getBaseUrl(),
  timeout: 30000,
  withCredentials: true
}
const service = axios.create(options) as AxiosInstance

setHandle(service)

export const post = <T = unknown, K = any>(data: ReqParams<K>) => {
  return service.post<Request.ReqRes<T>>(data.url, data.data, data.config)
}

export const get = <T = unknown, K = any>(data: ReqParams<K>) => {
  return service.get<Request.ReqRes<T>>(data.url, data.config)
}

export default service
