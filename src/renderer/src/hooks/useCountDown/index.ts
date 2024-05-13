import { onMounted, onUnmounted, Ref, ref, watch } from 'vue'

export function useCountDown(
  count: Ref<number> | number,
  fn: () => void,
  options?: {
    timeout?: number
    immediate?: boolean
  }
) {
  let { timeout, immediate } = options || {}
  timeout = timeout ?? 1000
  immediate = immediate ?? false

  let cancle: (() => void) | null
  let isClosed = false

  const second = typeof count === 'number' ? ref(count) : count

  watch(second, () => {
    if (second.value > 0 && !cancle && !isClosed) {
      initCountdown()
    }
    if (second.value <= 0) {
      cancle && cancle()
      cancle = null
    }
  })

  const countdown = (count: Ref<number>, timeout, fn: (num: number) => void) => {
    let timeId = setInterval(() => {
      count.value -= 1
      if (count.value >= 0 && timeId) {
        fn(count.value)
      } else {
        clearInterval(timeId)
      }
    }, timeout)
    return () => {
      clearInterval(timeId)
      // @ts-ignore
      timeId = null
    }
  }

  const initCountdown = () => {
    cancle = countdown(second, timeout, (num) => {
      second.value = num
      if (num === 0 && !isClosed) {
        fn()
      }
    })
  }

  if (immediate) {
    second.value > 0 && initCountdown()
  } else {
    onMounted(() => {
      initCountdown()
    })
  }

  const closeCountdown = (num = 0) => {
    isClosed = true
    second.value = num
    cancle && cancle()
  }

  onUnmounted(() => {
    closeCountdown()
    cancle = null
  })

  return second
}
