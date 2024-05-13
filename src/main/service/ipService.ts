import child_process from 'child_process'
import { logService } from './logService'
import { baseDir } from 'main/config'
import path from 'path'
import { fileService } from './fileService'

export const ipService = {
  currentIP: '',
  filePath: 'ComConfig.json',
  port: '8763',
  // ip = http://192.168.2.75:8763/ || 192.168.2.75:8763 || 192.168.2.75
  resolveCommonIP(ip: string): { host: string; port: string } {
    let headIdx = ip.indexOf('//')
    headIdx = headIdx > -1 ? headIdx + 2 : 0
    let endIdx = ip.indexOf(':', headIdx)
    endIdx = endIdx > -1 ? endIdx : ip.length
    const host = ip.slice(headIdx, endIdx)
    let port = endIdx == ip.length ? '' : ip.slice(endIdx + 1, ip.length)
    port = port.replace('/', '')
    return { host, port }
  },
  getIPs(): Promise<string[] | false> {
    return new Promise((resolve, rejects) => {
      try {
        child_process.exec('ipconfig /all', (err, stdout) => {
          if (err != null) return rejects(false)
          const arr = stdout.split('\n')
          const arr1 = arr.filter((item) => item.indexOf('IPv4') > -1)
          const arr2: string[] = []
          arr1.forEach((element) => {
            const e = element.split(':')
            arr2.push(e[1].split('(')[0].trim())
          })
          return resolve(arr2)
        })
      } catch (error) {
        logService.writeLine('获取本地ips 错误' + error?.toString())
        rejects(false)
      }
    })
  },
  // DeviceServerPath 硬件服务ip 字段
  async getConfigIP(): Promise<string> {
    const filePath = path.join(baseDir.config, ipService.filePath)
    const res = await fileService.isExistFile(filePath)
    try {
      if (res) {
        const pathStr = await fileService.readFile(filePath)
        const pathInfo = JSON.parse(pathStr)
        return pathInfo.DeviceServerPath
      }
      return ''
    } catch (error) {
      return ''
    }
  },

  async setConfigIP(ip: string): Promise<boolean> {
    const filePath = path.join(baseDir.config, ipService.filePath)
    const res = await fileService.isExistFile(filePath)
    let fileContent
    if (res) {
      const content = await fileService.readFile(filePath)
      fileContent = JSON.parse(content)
      if (typeof fileContent !== 'object') fileContent = {}
      fileContent.DeviceServerPath = ip
    } else {
      fileService.mkdirsSync(path.dirname(filePath))
      fileContent = {
        DeviceServerPath: ip
      }
    }
    return fileService
      .wirteFile(filePath, JSON.stringify(fileContent, null, 2))
      .then(() => {
        ipService.currentIP = ip
        return true
      })
      .catch(() => false)
  },

  async getCurrentIp(): Promise<string> {
    if (ipService.currentIP) return ipService.currentIP
    let ips = await ipService.getIPs()
    const originIp = await ipService.getConfigIP()
    let configIp
    if (originIp) {
      const { host } = ipService.resolveCommonIP(originIp)
      configIp = host
    }
    if (!ips || !ips.includes(configIp)) {
      if (!ips) {
        logService.writeLine('获取本地ip 失败')
        ips = ['127.0.0.1']
      }
      let ip = ips.find((item) => item.startsWith('192'))
      if (!ip) ip = ips.find((item) => item.startsWith('1'))
      if (!ip) ip = ips[0]
      const setIp = 'http://' + ip + ':' + ipService.port + '/'
      await ipService.setConfigIP(setIp)
      logService.writeLine(
        '检测到配置文件ip不存在，已重新设置ip 原来ip：' + configIp + '当前ip：' + ip
      )
      return ip
    }
    return configIp
  }
}
