import { sm4 } from 'sm-crypto'

export const sm4Cypto = {
  options: {
    mode: 'cbc',
    padding: 'pkcs#5',
    iv: '55495377443966573663466839534e53' // UISwD9fW6cFh9SNS
  },
  isBase64: true,
  key: '3539454445434241484e504855474d5a', // 59EDECBAHNPHUGMZ
  getOptions: (iv) => {
    const option = { ...sm4Cypto.options }
    iv && (option.iv = sm4Cypto.str2Hex(iv))
    return option
  },
  // iv 16位字符串
  encrypt: (content, iv): { iv: string; content: string } => {
    const option = sm4Cypto.getOptions(iv)
    const val = sm4.encrypt(content, sm4Cypto.key, option)
    // let txt = sm4Cypto.hex2base64(val)
    return {
      iv: iv || sm4Cypto.hex2Str(option.iv),
      content: Buffer.from(val, 'hex').toString('base64')
    }
  },
  decrypt: (val, iv): string => {
    const option = sm4Cypto.getOptions(iv)
    const str = Buffer.from(val, 'base64')
    const text = sm4Cypto.byte2Hex(str)
    return sm4.decrypt(text, sm4Cypto.key, option)
  },
  hex2base64: (val) => {
    return arrayBufferToBase64(Str2Bytes(val))
  },
  str2Hex: strToHexCharCode,
  hex2Str: hexCharCodeToStr,
  byte2Hex: Bytes2HexString
}

function Str2Bytes(str) {
  let pos = 0
  let len = str.length
  if (len % 2 != 0) {
    return null
  }
  len /= 2
  const hexA: number[] = []
  for (let i = 0; i < len; i++) {
    const s = str.substr(pos, 2)
    const v = parseInt(s, 16)
    hexA.push(v)
    pos += 2
  }
  return hexA
}

function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return Buffer.from(binary, 'binary').toString('base64')
}

function strToHexCharCode(str) {
  if (str === '') return ''
  const hexCharCode: string[] = []
  for (let i = 0; i < str.length; i++) {
    hexCharCode.push(str.charCodeAt(i).toString(16))
  }
  return hexCharCode.join('')
}

function hexCharCodeToStr(hexCharCodeStr) {
  const trimedStr = hexCharCodeStr.trim()
  const rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
  const len = rawStr.length
  if (len % 2 !== 0) {
    console.error('Illegal Format ASCII Code!')
    return ''
  }
  let curCharCode
  const resultStr: string[] = []
  for (let i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16) // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode))
  }
  return resultStr.join('')
}

function Bytes2HexString(arrBytes) {
  let str = ''
  for (let i = 0; i < arrBytes.length; i++) {
    let tmp
    const num = arrBytes[i]
    if (num < 0) {
      //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
      tmp = (255 + num + 1).toString(16)
    } else {
      tmp = num.toString(16)
    }
    if (tmp.length == 1) {
      tmp = '0' + tmp
    }
    str += tmp
  }
  return str
}
