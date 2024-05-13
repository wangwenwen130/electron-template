/**
 * notice !!!
 * @param waitTime the Promise will resolved if has 'waitTime' param  the resolve function will not work after setTimeout run
 * @returns
 */
export const getPromise = <T>(waitTime = 1000, data?: T) => {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void

  const fn = new Promise<T>((res, err) => {
    resolve = res
    reject = err
  })

  if (waitTime) {
    setTimeout(() => {
      resolve(data as T)
    }, waitTime)
  }

  return {
    resolve,
    reject,
    fn
  }
}
