type TipInfo = {
  show?: boolean
  type: 'warn' | 'success' | 'faild'
  msg: string
  showCloseBtn?: true
  coundown?: number
  close?: () => void
  toHome?: boolean
  during?: number
}
