declare module Request {
  export interface ReqRes<T> {
    code: number
    data: T
    msg: string
  }

  export interface HWareReqRes<T> {
    id: string
    type: 'rsp'
    action: number
    result: 0 | 1 //0:成功 1:失败
    msg: string //提示信息
    data: T
  }

  export interface Retry<T> {
    count?: number
    delay?: number
    isRetry?: (data: {
      data: T
      status: number
      statusText: string
      headers: Record<string, any>
      config: Record<string, any>
      request?: any
    }) => boolean
  }

  export interface ReqParams<K = unknown, D = any> {
    url: string
    method?: 'POST' | 'GET' // value 'POST'
    data?: K
    config?: D
    retry?: Retry<K>
    custom?: LogParams
  }

  export interface Page<T> {
    data: T[]
    page?: number
    pageSize?: number
    totalCount?: number
    totalPage?: number
  }

  export type LogParams = {
    label?: string
    during?: number
    resFilter?: string[]
    reqFilter?: string[]
  } & Recordable<string, any>

  export type InferParams<Fn> = Fn extends (...value: infer V) => any ? V : never
  export type InferValue<Fn> = Fn extends (value: any) => infer R ? R : never
}
