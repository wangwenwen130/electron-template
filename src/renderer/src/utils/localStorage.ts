import { isString } from 'src/utils/index'

export const localGet = <T>(key: string) => {
  const data = localStorage.getItem(key)
  let res!: T
  try {
    res = data ? JSON.parse(data) : ''
  } catch (error) {
    res = data as T
  }
  return res
}

export const localSet = (key: string, val: any) => {
  const data = isString(val) ? val : JSON.stringify(val)
  return localStorage.setItem(key, data)
}

export const localDel = (key: string) => localStorage.removeItem(key)
