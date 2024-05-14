import { useWindowSize } from '@vueuse/core'

let isHorizontal: ComputedRef<boolean>
export function useIsHorizontal() {
  const { width, height } = useWindowSize()
  if (isHorizontal === undefined) {
    isHorizontal = computed<boolean>(() => width.value > height.value)
  }
  return isHorizontal
}
