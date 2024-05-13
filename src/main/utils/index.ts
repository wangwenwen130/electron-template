import { exec } from 'child_process'
export * from './sm4Cypto'
export * from './reportCrash'

export function getUUID() {
  return new Promise((resolve, reject) => {
    const cmd1 = 'wmic csproduct get UUID'
    exec(cmd1, (err, stdout) => {
      if (err) {
        return reject(err)
      }
      const id = stdout
        .replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
        .replace(/\s+/g, '')
        .replace('UUID', '')
      const arr = id.split('-')
      resolve(arr.join(''))
    })
  })
}
