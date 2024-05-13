import { ipcMain } from 'electron'
import { exec } from 'child_process'
import { baseDir } from 'main/config/index'
import path from 'path'
import { ipService, getModeList, licenService, logService } from 'main/service/index'
import { getUUID } from 'main/utils'

export const initUtilsIpc = () => {
  ipcMain.handle('startService', () => {
    return new Promise((resolve, reject) => {
      const real = path.join(baseDir.base, 'StartService.bat')
      exec('start ' + real, { timeout: 2000 }, (error) => {
        if (error) reject(error)
        else resolve(true)
      })
    })
  })

  ipcMain.handle('getUUID', () => getUUID())
  ipcMain.handle('getIp', () => ipService.getCurrentIp())
  ipcMain.handle('getConfig', () => getModeList())
  ipcMain.handle('getLicense', () => licenService.getLicense())
  ipcMain.on('receiveLog', (_event, arg) => logService.write(arg))
}

initUtilsIpc()
