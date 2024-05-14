<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useIsHorizontal } from '@/hooks'

const { width } = useWindowSize()

const isHorizontal = useIsHorizontal()

watch(
  width,
  () => {
    const zoom = width.value / (isHorizontal.value ? 1920 : 1080)
    const curSize = (zoom * 16).toFixed(4)
    document.documentElement.style.fontSize = (+curSize >= 12 ? curSize : 12) + 'px'
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss">
#app {
  font-family: PingFang;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  // background-color: transparent !important;
}

html,
body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  // background-color: transparent !important;
}
</style>
