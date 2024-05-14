import { useRequest } from './useRequest'
import { useSysStore } from '@/stores'
import { isDev } from '@/utils'

class HardwareService {
  public static instance: HardwareService | null = null

  private _baseUrl = isDev ? 'http://192.168.2.184:9090' : ''
  get baseUrl() {
    if (this._baseUrl) return this._baseUrl
    return (this._baseUrl = 'http://' + useSysStore().hardwareIp)
  }
  set baseUrl(url: string) {
    this._baseUrl = url
  }

  constructor() {
    if (HardwareService.instance) return HardwareService.instance
  }

  private getParams<T = Recordable<string, any>>(
    action: ActionType,
    data?: T,
    options?: {
      custom?: Request.LogParams
      retry?: Request.Retry<any>
    }
  ): Request.ReqParams {
    const reqData = {
      id: parseInt(Math.random() * 10 + ''),
      action,
      type: 'req',
      data
    }
    if (!options) options = {}
    if (!options.custom) options.custom = {}
    const { reqFilter, resFilter } = options.custom
    return {
      url: this.baseUrl,
      data: reqData,
      retry: options.retry,
      custom: {
        reqFilter: ['url', 'type', 'id', ...(reqFilter || [])],
        resFilter: ['type', 'id', ...(resFilter || [])]
      }
    }
  }

  public getDevStatus() {
    return useRequest(this.getParams('getDevStatus'))
  }
  public getWinVersion() {
    return useRequest(this.getParams('getWinVersion'))
  }
  public setConfig(data: Recordable) {
    return useRequest(
      this.getParams('setConfig', { data }, { custom: { resFilter: ['data', 'doorLock'] } })
    )
  }
  public setHotelLocks(data: Recordable) {
    return useRequest(this.getParams('setHotelLocks', data))
  }
  public exitApp(data: string) {
    return useRequest(this.getParams('exitApp', data))
  }
  public cardMachineInit() {
    return useRequest(this.getParams('cardMachineInit'))
  }
  public cardMoveTo() {
    return useRequest(this.getParams('cardMoveTo'))
  }
  public cardPushOut() {
    return useRequest(this.getParams('cardPushOut'))
  }
  public getCardInfo() {
    return useRequest<PhysicsCardinfo>(this.getParams('getCardInfo'))
  }
  public cardMoveBack() {
    return useRequest(this.getParams('cardMoveBack'))
  }
  public cancelCard() {
    return useRequest(this.getParams('CancelCard'))
  }
  public getCardVol() {
    return useRequest<MachineStatus>(this.getParams('getCardVol'))
  }
  public startPullIn() {
    return useRequest(this.getParams('startPullIn'))
  }
  public stopPullIn() {
    return useRequest(this.getParams('stopPullIn'))
  }
  public makeCard(data: Recordable) {
    data && (data.extParams = { newCard: true })
    return useRequest(this.getParams('makeCard', data))
  }
  public makeCopyCard(data: Recordable) {
    data && (data.extParams = { newCard: false })
    return useRequest(this.getParams('MakeCopyCard', data))
  }
}

HardwareService.instance = new HardwareService()
export const hardwareService = HardwareService.instance
