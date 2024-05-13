import { onMounted, onBeforeUnmount, Ref, watch } from 'vue'
import { removeMediaDom } from '@/utils/index'

export function useAudioPlay(dom: Ref<HTMLAudioElement | null>) {
  onMounted(() => {
    if (!dom.value) {
      const cancle = watch(dom, () => {
        dom.value?.play()
        cancle()
      })
    } else {
      dom.value.play()
    }
  })

  onBeforeUnmount(() => {
    dom.value && dom.value.pause()
    removeMediaDom(dom.value)
    dom.value = null
  })
}
