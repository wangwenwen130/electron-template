import { log } from '@/service'
import { filterKeys } from 'src/utils'
import type { AxiosResponse } from 'axios'

const handleLog = (req: Request.ReqParams, res: AxiosResponse) => {
  const { reqFilter, resFilter } = req.custom || {}
  const reqStr = filterKeys(req, (reqFilter || []).concat('custom')) || req
  const resStr =
    (resFilter && resFilter.length && res.data && filterKeys(res.data, resFilter)) || res.data
  try {
    return [reqStr, resStr]
  } catch (error) {
    return [req, res.data]
  }
}

export function apiPrinte(req: Request.ReqParams, res: AxiosResponse<Request.ReqRes<unknown>>) {
  const [reqStr, resStr] = handleLog(req, res)
  log.put(
    [
      '调用服务接口',
      `${req.custom?.label || ''} ${res.data?.code == 0 ? ' 成功 ' : ' 失败 '}`,
      `耗时 ${req.custom?.during}ms`
    ],
    [
      ['请求参数：', reqStr],
      ['返回结果：', resStr]
    ]
  )
}

export function hardwarePrint(
  req: Request.ReqParams,
  res: AxiosResponse<Request.HWareReqRes<any>>
) {
  const [reqStr, resStr] = handleLog(req, res)
  log.put(
    [
      '调用硬件服务接口',
      `${req.custom?.label || ''} ${res.data?.result == 0 ? ' 成功 ' : ' 失败 '}`,
      `耗时 ${req.custom?.during}ms`
    ],
    [
      ['请求参数：', reqStr],
      ['返回结果：', resStr]
    ]
  )
}
