export const replaceTag = (str: string) => {
  const urlReg = /<a\s*href="(.*?)"\s?>/gms
  const regVal = str.match(urlReg)
  if (regVal && regVal.length) {
    regVal.forEach((txt) => {
      const reg = /<a\s*href="(.*?)"\s?>/i
      const val = txt.match(reg)
      if (!val) return
      const url = val[0].replace(val[1], 'javascript:;')
      str = str.replace(val[0], url)
    })
  }
  return str
}
