import { fileService } from './fileService'
import { logService } from './logService'
import { baseDir, modeList as localModeList } from 'main/config'
import path from 'path'

const config = {
  fileName: 'TerminalNational.json',
  async getField(field: string): Promise<'' | unknown> {
    const filePath = path.join(baseDir.config, config.fileName)
    const res = await fileService.isExistFile(filePath)
    if (res) {
      try {
        const str = await fileService.readFile(filePath)
        const info = JSON.parse(str)
        return info[field]
      } catch (error) {
        return ''
      }
    }
    return ''
  },
  isValidData(data: string | object): [string, object?] {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (error) {
        const key = '设置config必须是个对象或JSON字符串，不能是字符串'
        logService.writeLine('解析' + config.fileName + '失败: ' + key)
        return [key]
      }
    }
    if (typeof data !== 'object' && data !== null) {
      const key = '设置config必须是个对象或JSON字符串'
      logService.writeLine(key)
      return [key]
    }
    return ['', data as object]
  },
  async getConfig(data?: object): Promise<object> {
    const filePath = path.join(baseDir.config, config.fileName)
    let fileContent
    const res = await fileService.isExistFile(filePath)
    if (res) {
      const content = await fileService.readFile(filePath)
      fileContent = JSON.parse(content)
      if (typeof fileContent !== 'object') fileContent = {}
    } else {
      fileService.mkdirsSync(path.dirname(filePath))
      fileContent = {}
    }
    if (data) {
      fileContent = { ...fileContent, ...data }
    }
    return fileContent
  },
  async setField(data: string | object): Promise<boolean> {
    const [err, val] = config.isValidData(data)
    if (err) return false
    val && (data = val)

    let fileContent
    try {
      fileContent = await config.getConfig(data as object)
    } catch (error) {
      fileContent = data
    }

    const filePath = path.join(baseDir.config, config.fileName)
    return fileService
      .wirteFile(filePath, JSON.stringify(fileContent, null, 2))
      .then(() => true)
      .catch(() => false)
  }
}

export const getModeList = async (): Promise<typeof localModeList> => {
  const localConfig = (await config.getField('modeList')) as typeof localModeList
  if (localConfig) return localConfig
  config.setField({ modeList: localModeList })
  return localModeList
}

export const comConfig = config
