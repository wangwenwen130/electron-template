// @ts-nocheck
const fileRegex = /\.(scss|css)$/

export default function cssPlugin() {
  return {
    name: 'transform-file',
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: compileFileToJS(src, id),
          map: null
        }
      }
    },
    generateBundle(option, bundle) {
      Object.keys(bundle).forEach((name) => {
        const { source: rsource, name: bName, fileName, type } = bundle[name]
        if (name.endsWith('.css') && rsource.includes('background-image')) {
          const source = toReplaceUrlPath(rsource)
          bundle[name].source = source
          // @ts-ignore
          this.emitFile({
            type,
            name: bName,
            fileName,
            source
          })
        }
      })
      return
    }
  }
}

function compileFileToJS(code: string, id: string) {
  if (id.includes('/node_modules')) return code
  let regRes = code.match(/(\d{1,})\s*px/i)
  while (regRes) {
    code = code.replace(regRes[0], parseInt(regRes[1]) / 16 + 'rem')
    regRes = code.match(/(\d{1,})\s*px/i)
  }
  return code
}

function toReplaceUrlPath(code: string) {
  const urlReg = /background-image:\s*url\s*\((\.\/).*(\.(png|jpe?g|gif|svg))\)/
  let regVal = code.match(urlReg)

  while (regVal) {
    const url = regVal[0].replace(regVal[1], '../img/')
    code = code.replace(regVal[0], url)
    regVal = code.match(urlReg)
  }
  return code
}
