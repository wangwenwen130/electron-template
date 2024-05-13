import { crashReporter, app } from 'electron'

export const getCrashFilePath = () => {
  return app.getPath('crashDumps')
}

export const startRecord = () => {
  crashReporter.start({
    compress: false,
    uploadToServer: false,
    ignoreSystemCrashHandler: false
  })
}
