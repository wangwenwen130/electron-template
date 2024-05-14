import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'
import { sleep } from 'src/utils'

export type IsRetry<T = any> = (data: AxiosResponse<T>) => boolean

export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  retry?: Retry<D>
}

export interface Retry<T = any> {
  count?: number
  delay?: number
  isRetry?: IsRetry<T>
}

export const useRequestRetry = <T = any>(service: AxiosInstance) => {
  const getConfig = (count = 3, delay = 1000, isRetry?: IsRetry): Retry<T> => {
    return {
      count,
      delay,
      isRetry
    }
  }
  const requestIntercet = (config: InternalAxiosRequestConfig) => {
    const { count, delay, isRetry } = (config as RequestConfig).retry || {}
    ;(config as RequestConfig).retry = getConfig(count, delay, isRetry)
    return config
  }
  const responseIntercep = (res: AxiosResponse<T>) => {
    const { isRetry } = (res.config as RequestConfig)?.retry ?? {}
    if (isRetry && isRetry(res)) {
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  }
  const responseErrIntercep = (err: Pick<AxiosResponse<T>, 'config'>) => {
    const { count, delay } = (err.config as RequestConfig)?.retry ?? {}
    if (!count) return Promise.reject(err)
    return sleep(delay).then(() => {
      // @ts-ignore
      ;(err.config as RequestConfig).retry.count--
      return service(err.config)
    })
  }
  return {
    getConfig,
    requestIntercet,
    responseIntercep,
    responseErrIntercep
  }
}
