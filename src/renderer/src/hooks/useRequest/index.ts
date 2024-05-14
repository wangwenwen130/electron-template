import service, { get, post, type ReqParams, type ResPonse } from './axios'
import { useRequestRetry, type RequestConfig } from '../useRequestRetry'
import { isObject, isFormData } from 'src/utils'
import { apiPrinte } from 'src/decorators/index'

const { getConfig, responseErrIntercep, responseIntercep } = useRequestRetry(service)
service.interceptors.response.use(responseIntercep, responseErrIntercep)

export const useRequest = <T>(data: ReqParams, autoAbort = false) => {
  const { method: fun, data: params } = data
  const method = fun || 'POST'

  if (data.retry) {
    const { count, delay, isRetry } = data.retry
    data.config = data.config || {}
    ;(data.config as RequestConfig).retry = getConfig(count, delay, isRetry)
  }

  const setJson = () => {
    data.config = data.config || {}
    data.config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }

  const setAbort = () => {
    data.config = data.config || {}
    data.config.headers = {
      // @ts-ignore
      signal: controller.signal
    }
  }

  const controller = new AbortController()
  // to request
  const getResult = () => {
    setAbort()
    if (method === 'POST') {
      if (params && isObject(params) && !isFormData(params)) {
        setJson()
        return post<T>(data)
      } else return post<T>(data)
    } else if (method === 'GET') {
      return get<T>(data)
    } else {
      return Promise.reject('请求方式暂不支持')
    }
  }

  if (autoAbort) {
    // 防止接口 频繁调用增加内存
    onUnmounted &&
      onUnmounted(() => {
        controller.abort()
      })
  }

  // to handle result
  const result = getResult()
    .then((res) => {
      apiPrinte(data, res)
      return res
    })
    .catch((err) => {
      apiPrinte(data, err)
      return Promise.reject(err)
    })

  return {
    result,
    cancel: () => controller.abort(),
    then: <K = any>(fn: (value: ResPonse<T>) => K | PromiseLike<K>) => {
      return result.then<K>(fn)
    },
    catch: <K = any>(err: any) => {
      return result.catch<K>(err)
    }
  }
}

useRequest.post = <T>(data: Omit<ReqParams, 'method'>) => {
  return useRequest<T>({ ...data, method: 'POST' })
}
useRequest.get = <T>(data: Omit<ReqParams, 'method' | 'data'>) => {
  return useRequest<T>({ ...data, method: 'GET' })
}
