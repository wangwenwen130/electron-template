export class IpcService {
  public static instance: IpcService | null = null
  public static ipc = window.ipc

  constructor() {
    if (IpcService.instance) return IpcService.instance
  }

  send(channel: string, ...args) {
    IpcService.ipc.send(channel, ...args)
  }

  invoke(channel: string, ...args) {
    return IpcService.ipc.invoke(channel, ...args)
  }

  on(channel: string, listener) {
    IpcService.ipc.on(channel, listener)
  }

  once(channel: string, listener) {
    IpcService.ipc.once(channel, listener)
  }
}

IpcService.instance = new IpcService()

export const ipcService = IpcService.instance
