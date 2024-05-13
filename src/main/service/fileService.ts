import fs from 'fs'
import path from 'path'

export const fileService = {
  isExistFile(path: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) resolve(false)
        else resolve(true)
      })
    })
  },

  wirteFile(path: string, content: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content || '', 'utf8', (err) => {
        if (err) reject(err)
        else resolve(true)
      })
    })
  },

  appendFile(path: string, content: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.appendFile(path, content, 'utf8', (err) => {
        if (err) reject(err)
        else resolve(true)
      })
    })
  },

  deleteFile(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.unlink(path, function (err) {
        if (err) reject(err)
        else resolve(true)
      })
    })
  },
  readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  },
  mkdirsSync(dirname: string): boolean {
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (fileService.mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
      return false
    }
  },
  deleteDir(url) {
    let files
    if (fs.existsSync(url)) {
      files = fs.readdirSync(url)
      files.forEach(function (file, index) {
        const curPath = path.join(url, file)
        if (fs.statSync(curPath).isDirectory()) {
          fileService.deleteDir(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(url)
    }
  }
}
