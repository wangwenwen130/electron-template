import { ipcMain } from 'electron'
import { comConfig } from 'main/service/index'

const initConfigIpc = () => {
  ipcMain.handle('getConfigField', (_event, field: string) => {
    return comConfig.getField(field)
  })

  ipcMain.handle('getComConfig', () => {
    return comConfig.getConfig()
  })

  ipcMain.handle('setConfigField', (_event, data: string | object) => {
    return comConfig.setField(data)
  })
}

initConfigIpc()
