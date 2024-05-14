const filterKey = <T extends object, K extends keyof T>(target: T, key: K[], isDeep = true) => {
  const source = target
  if (!source) return
  Object.keys(source).forEach((item) => {
    if (key.includes(item as K)) delete source[item]
    else if (isDeep && Array.isArray(source[item])) {
      source[item].forEach((info) => {
        return (info = filterKey(info, key, isDeep))
      })
    } else if (isDeep && typeof source[item] === 'object') {
      return (source[item] = filterKey(source[item], key, isDeep))
    }
  })
  return source
}

export const filterKeys = <T extends object, K = string>(
  target: T,
  key: K[] | K,
  isDeep = true
) => {
  const source: T = JSON.parse(JSON.stringify(target))
  if (!Array.isArray(key)) key = [key]
  // @ts-ignore
  return filterKey(source, key, isDeep)
}
