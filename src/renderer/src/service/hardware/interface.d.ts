type ActionType =
  | 'getDevStatus'
  | 'setConfig'
  | 'setHotelLocks'
  | 'getWinVersion'
  | 'exitApp'
  | 'cardMachineInit'
  | 'cardMoveTo'
  | 'cardPushOut'
  | 'getCardInfo'
  | 'cardMoveBack'
  | 'CancelCard'
  | 'getCardVol'
  | 'startPullIn'
  | 'stopPullIn'
  | 'makeCard'
  | 'MakeCopyCard'

type Params = {
  id: number
  action: ActionType
  type: 'req'
  retry?: Request.Retry<K>
  data: any
} & Recordable<string, any>

type PhysicsCardinfo = {
  cardNo: string
  beginTime: string
  endTime: string
  doorNo: string
  lockNo: string
}

type MachineStatus = {
  cardVol: 0 | 1 | 2 | 3 //发卡箱状态 0: 卡充足; 1: 卡不足; 2: 无卡 3:卡满
  cardPosW: 0 | 1 //备卡区状态 0 写卡区无卡；1:写卡区有卡
  cardPosE: 0 | 1 //出卡口状态 0 入卡口无卡；1.入卡口有卡
  cardRecall: 0 | 1 //回收盒状态 0：未满 1：已满
}
