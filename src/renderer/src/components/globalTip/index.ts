import { reactive } from 'vue'

export const dialogData = reactive<TipInfo>({
  show: false,
  type: 'success',
  msg: ''
})

export function showTipMsg(data: TipInfo) {
  Object.keys(data).forEach((key) => {
    dialogData[key] = data[key]
  })

  dialogData.show = true

  if (data.showCloseBtn) {
    data.close = () => {
      dialogData.show = false
    }
  } else {
    setTimeout(() => {
      data.toHome && window.rw.toJump('home')
      dialogData.show = false
    }, data.during || 3000)
  }

  if (data.type == 'faild') {
    window.rw.log.printe(data.msg)
  }
}

export function errToHome(msg: string) {
  if (!msg) return
  showTipMsg({
    msg: msg,
    type: 'faild',
    toHome: true
  })
}
