import { ref } from 'vue'
const nowTime = ref<number>()
const minuteTime = ref<number>(0)
let timeID
export function useTimer() {
  if (!timeID) {
    timeID = setInterval(() => {
      const date = new Date()
      nowTime.value = date.getTime()
      if (minuteTime.value !== date.getMinutes()) {
        minuteTime.value = date.getMinutes()
      }
    }, 1000)
  }

  return {
    nowTime,
    minuteTime
  }
}
