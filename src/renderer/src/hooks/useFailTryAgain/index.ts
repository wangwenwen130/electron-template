import { onBeforeUnmount } from 'vue'
/**
 *  how to use
 *
 *  don`t need params
 *  const {cancle, handle} = useFailTryAgain(request)
 *
 *  need params  use closure function (Arrow function) like this
 *  const {cancle, handle} = useFailTryAgain(() => request(data))
 *
 *  Cycle once every second
 *  const {cancle, handle} = useFailTryAgain(() => request(data), {sleep: 1000})
 *
 *  Cycle once every second  Up to 3 times
 *  const {cancle, handle} = useFailTryAgain(() => request(data), {sleep: 1000, countDown: 3})
 *
 */

export function useFailTryAgain<T>(
  fn: (...arg) => Promise<false | T>,
  option?: {
    sleep?: number
    pageClose?: boolean
    countDown?: number
  }
): {
  cancle: () => void
  handle: () => Promise<T>
} {
  if (!option) option = {}

  let isCancle = false
  let isUnmount = false
  const cancle = () => {
    isCancle = true
    console.warn('fn 已取消', fn)
  }

  const handle = () => {
    isCancle = false
    if (isCancle && isUnmount) return Promise.reject('pageClose')
    return request()
  }

  const request = async (): Promise<T> => {
    if (option?.countDown !== undefined && option?.countDown !== null) {
      --option.countDown
      if (option.countDown < 0) {
        cancle()
        return Promise.reject('cycles reached the upper limit')
      }
    }

    const toTry = async () => {
      option?.sleep && (await sleep(option.sleep))
      if (isCancle) return Promise.reject('cancle')
      return handle()
    }

    try {
      const flag = await (<T>fn())
      if (flag) return flag
      return toTry()
    } catch (error) {
      if (option?.countDown && option.countDown > 0) return toTry()
      console.error(error)
      return Promise.reject(error)
    }
  }
  option.pageClose &&
    onBeforeUnmount(() => {
      cancle()
      isUnmount = true
    })

  return {
    cancle,
    handle
  }
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}
