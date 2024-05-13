import { sm4Cypto } from 'main/utils'
import { fileService } from './fileService'
import { logService } from './logService'
import { baseDir, modeList } from 'main/config'
import path from 'path'

// 获取注册码
class License {
  static nFileName = 'ComConfig.json'
  static oFileName = 'license.txt'
  async getLicense(): Promise<typeof modeList | false> {
    // 兼容老的获取license获取方法
    const nFilePath = path.join(baseDir.licencePath, License.nFileName)
    const isExist = await fileService.isExistFile(nFilePath)
    if (isExist) {
      const str = await fileService.readFile(nFilePath)
      let config
      try {
        config = JSON.parse(str)
      } catch (error) {
        logService.writeLine('解析 ' + License.nFileName + ' 失败: ' + error + '内容是：' + config)
      }
      if (config.iv && config.content) return this.getNew(config)
    }
    return false
  }
  getNew(config): Promise<typeof modeList> {
    return new Promise((resolve) => {
      const { content, iv } = config
      const text = sm4Cypto.decrypt(content, iv)
      resolve(JSON.parse(text))
    })
  }
}

export const licenService = new License()
