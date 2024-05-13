import { isDate } from 'src/utils'

export function unitTime(d = 6) {
  const today = new Date(new Date(new Date().getTime()).setHours(0, 0, 0, 0)).getTime()
  const origin = today - 24 * 1000 * 60 * 60 * d
  return [origin, today]
}

function formatDate(fmt: string, date: Date) {
  let ret
  const opt: {
    'Y+': string
    'm+': string
    'd+': string
    'H+': string
    'M+': string
    'S+': string
  } = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
    ret = null
  }
  return fmt
}

export function formatTime(time: number | string | Date, format: string) {
  if (!time) return '--'
  if (time && time != null) {
    const formats = format || 'YYYY-mm-dd HH:MM:SS'
    return formatDate(formats, isDate(time) ? time : new Date(Number(time)))
  } else {
    return '--'
  }
}
