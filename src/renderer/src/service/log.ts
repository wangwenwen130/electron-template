import { ipcService as ipc } from '@/service/ipc'
import { formatTime } from 'src/utils'

class Log {
  public static instance: Log | null = null
  public static ipc = ipc
  private timeout = 0
  private maxCount = 10

  private timeId

  private logList: string[] = []

  constructor() {
    if (Log.instance) return Log.instance
  }

  public printe(label: string | string[], params?: unknown[]) {
    let log = this.handleParams(label, params)
    log = this.format(log)
    console.log(log)
    this.put(label, params)
  }

  public put(label: string | string[], params?: unknown[]) {
    const log = this.handleParams(label, params)

    this.logList.push(this.format(log))

    if (this.logList.length >= this.maxCount) {
      this.save()
    }

    this.setTimeOut()
  }

  private setTimeOut() {
    if (this.timeId) {
      clearTimeout(this.timeId)
    }
    this.timeId = setTimeout(() => {
      this.save()
    }, this.timeout)
  }

  private addLine(addSpaceLine = false) {
    if (addSpaceLine) return '\n'
    return '\n\r'
  }

  private addSpace(str?: string, count = 1) {
    const space = ' '
    if (!str) return space.repeat(count)
    else return space.repeat(count) + str
  }

  private addTime() {
    const date = new Date()
    const str = formatTime(date, 'YYYY-mm-dd HH:MM:SS')
    const milliseconds = (date.getMilliseconds() + '').padStart(3, '0')
    return str + this.addSpace(milliseconds) + this.addSpace('>')
  }

  private getStr(list: unknown[]) {
    let str = ''
    list.forEach((key: unknown) => {
      let val
      try {
        val = JSON.stringify(key)
      } catch (error) {
        val = error
      }

      if (val == '{}' || val == '[]') return

      str = str + this.addLine(true) + val
    })
    return str
  }

  public handleParams(label: string | string[], params?: unknown[]): string {
    let str = ''
    if (Array.isArray(label)) {
      label.forEach((key) => {
        str += this.addSpace(key)
      })
    } else {
      str += this.addSpace(label)
    }

    if (params) {
      str += this.getStr(params)
    }
    return str
  }

  // example
  // "2023-07-04 08:24:56 499 > label
  //  params1
  //  params2
  public format(log: string): string {
    // 添加时间
    let str = this.addTime()
    //  添加换行
    str = str + log + this.addLine()
    return str
  }

  public save() {
    if (!this.logList.length) return
    Log.ipc.send(
      'receiveLog',
      this.logList.reduce((pre, cur) => {
        pre += cur
        return pre
      }, '')
    )
    this.logList.length = 0
  }

  public setLogTimeout(time: number) {
    this.timeout = time
  }
}
Log.instance = new Log()
export const log = Log.instance
