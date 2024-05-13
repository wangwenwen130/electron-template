import { ElectronAPI } from '@electron-toolkit/preload'
import type { IpcApi } from 'src/preload/'

declare global {
  namespace Reflect {}
  interface Window {
    electron: ElectronAPI
    ipc: IpcApi
  }
}
