export * from './date'
export * from './eventBus'
export * from './is'
export * from './promiseUtils'
export * from './tools'

export const sleep = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
