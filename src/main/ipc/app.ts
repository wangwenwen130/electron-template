import { ipcMain, app } from 'electron'

const initAppIpc = () => {
  ipcMain.on('relaunchApp', () => {
    app.relaunch()
    app.exit()
  })

  ipcMain.on('closeApp', () => {
    app.exit()
  })
}

initAppIpc()
