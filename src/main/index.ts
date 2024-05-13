import { app, shell, BrowserWindow, protocol, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import './ipc'
import { startRecord } from 'main/utils'
import { logService } from './service'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

startRecord()

let mainWindow: BrowserWindow

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    show: false,
    hasShadow: false,
    width: 1280,
    height: 800,
    resizable: is.dev ? true : false,
    autoHideMenuBar: true,
    fullscreen: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
      devTools: true
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow.show())

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  ipcMain.on('fullscreen', () => mainWindow.setFullScreen(true))
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true,
      corsEnabled: true,
      supportFetchAPI: true
    }
  }
])

app.commandLine.appendSwitch('enable-experimental-web-platform-features', 'enable')

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.exit()
} else {
  app.on('second-instance', () => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (mainWindow) {
      mainWindow.show()
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('amp-terminal-national')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window))

    mainWindow = createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他打开的窗口，那么程序会重新创建一个窗口。
    app.setLoginItemSettings({ openAtLogin: false, path: process.execPath })

    app.on('before-quit', () => BrowserWindow.getAllWindows().forEach((win) => win.destroy()))

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())

    app.on('child-process-gone', async (_event, details) => {
      const crashFilePath = app.getPath('crashDumps')
      await logService.writeLine('进程异常日志' + JSON.stringify(details))
      await logService.writeLine('崩溃日志地址' + crashFilePath)
      const { reason } = details
      //  - 进程从未成功启动
      //  - 窗口代码完整性检查失败
      const reasonType = ['crashed', 'launch-failed', 'integrity-failure']
      process.crash()
      if (reasonType.includes(reason)) {
        app.relaunch()
      }
      app.exit()
    })

    // 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 macOS窗口全部关闭时,dock中程序不会退出
    app.on('window-all-closed', () => {
      process.platform !== 'darwin' && app.exit()
      globalShortcut.unregisterAll()
    })
    // In this file you can include the rest of your app"s specific main process
    // code. You can also put them in separate files and require them here.
  })
}
