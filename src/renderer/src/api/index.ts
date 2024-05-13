import axios from 'axios'
import type { AxiosInstance as Instance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: '127.0.0.1:8763',
  timeout: 30000,
  withCredentials: true
}

const service = axios.create(options)

interface AxiosInstance extends Instance {
  (config: AxiosRequestConfig): Promise<RequestRes<any>>
  (url: string, config?: AxiosRequestConfig): Promise<RequestRes<any>>
}

export const post = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<RequestRes<T>> | undefined
) => {
  return service.post<RequestRes<T>>(url, data, config)
}

export const get = <T>(url: string, config?: AxiosRequestConfig<RequestRes<T>> | undefined) => {
  return service.get<RequestRes<T>>(url, config)
}

export default service as AxiosInstance
