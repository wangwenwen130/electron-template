import { ElectronAPI } from '@electron-toolkit/preload'
import type { IpcApi } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    ipc: IpcApi
  }
}
