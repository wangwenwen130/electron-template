<template>
  <section class="animation-box">
    <div ref="animationRef"></div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, PropType } from 'vue'
import lottie, { AnimationItem } from 'lottie-web'
import { getAnimationData as getData } from '@/utils/index'

const props = defineProps({
  name: {
    type: String,
    require: true
  },
  loop: {
    type: Boolean,
    default: true
  },
  tag: {
    type: String as PropType<'canvas' | 'svg'>,
    default: 'svg'
  },
  autoplay: {
    type: Boolean,
    default: true
  }
})

let lottieBox: AnimationItem | null = null
const animationRef = ref<HTMLDivElement>()

onMounted(() => {
  initLottie()
})

onUnmounted(() => {
  lottieBox?.destroy()
  lottieBox = null
})

const getAnimationData = () => {
  const { name } = props
  return getData(name || '')
}

const initLottie = () => {
  getAnimationData().then((res) => {
    const { loop, tag, autoplay } = props
    lottieBox = lottie.loadAnimation({
      container: animationRef.value as HTMLDivElement, // 包含动画的dom元素
      renderer: tag as 'canvas' | 'svg', // 渲染出来的是什么格式
      loop: loop, // 循环播放
      autoplay: autoplay, // 自动播放
      animationData: res
    })
  })
}

defineExpose({
  getInstace: () => lottieBox
})
</script>

<style scoped lang="scss">
.animation-box {
  .card-img {
    // width: 39vw;
    height: 32.5rem;
    margin: 0 auto 4.375rem;
  }
}
</style>
