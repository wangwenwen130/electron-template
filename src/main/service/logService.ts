import { baseDir } from 'main/config'
import { fileService } from './fileService'
import path from 'path'
import { unitTime, formatTime } from 'src/utils/index'

export const logService = {
  getFileName(time = Date.now()) {
    return path.join(baseDir.logPath, getDate(time) + '.txt')
  },

  addTime(): string {
    const date = new Date()
    const str = formatTime(date.getTime(), 'YYYY-mm-dd HH:MM:SS')
    const milliseconds = (date.getMilliseconds() + '').padStart(3, '0')
    return str + ' ' + milliseconds + '  >'
  },

  async write(content) {
    const filePath = logService.getFileName()
    const flag = await fileService.isExistFile(filePath)

    if (!flag) {
      return logService.createWirteFile(filePath, content)
    } else {
      return fileService.appendFile(filePath, content)
    }
  },
  writeLine(content) {
    return logService.write(logService.addTime() + content + '\n\r')
  },

  createWirteFile(filePath, content) {
    // 这里创建代表又过了一天 需要展示旧的日志
    const [origin] = unitTime(31)
    const fileName = logService.getFileName(origin)
    logService.deleteFile(fileName)
    fileService.mkdirsSync(path.dirname(filePath))
    return fileService.wirteFile(filePath, content)
  },

  deleteFile(path) {
    return fileService.deleteFile(path)
  }
}

const getDate = (time = Date.now()) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '-' + month + '-' + day
}
