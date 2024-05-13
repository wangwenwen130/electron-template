import { computed, ComputedRef } from 'vue'
import { useWindowSize } from '../useWindowResize'

let isHorizontal: ComputedRef<boolean>
export function useIsHorizontal() {
  const { width, height } = useWindowSize()
  if (isHorizontal === undefined) {
    isHorizontal = computed<boolean>(() => width > height)
  }
  return isHorizontal
}
