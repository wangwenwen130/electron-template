<template>
  <audio
    ref="audioRef"
    :src="fileUrl"
    class="audio-card"
    preload="auto"
    controls
    @waiting="waiting"
    @canplay="canplay"
  ></audio>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { ref, onMounted } from 'vue'
import { getAudioData } from '@/utils/index'

const props = defineProps({
  name: {
    type: String,
    require: true,
    default: ''
  },
  play: Boolean
})

const audioRef = ref<HTMLAudioElement>()

const fileUrl = ref('')

const reload = debounce(
  () => {
    audioRef.value?.pause()
    fileUrl.value && audioRef.value && (audioRef.value.src = fileUrl.value)
  },
  1000,
  {
    leading: true
  }
)

const waiting = () => reload()

let isPlayNow = false
const canplay = () => {
  if (isPlayNow) audioRef.value?.play()
}

let isLoadedData = false
const getAudioUrl = () => {
  getAudioData(props.name).then((res) => {
    fileUrl.value = res
    if (audioRef.value) {
      audioRef.value.src = fileUrl.value
      isLoadedData = true
    }
  })
}

getAudioUrl()

const playAudio = () => {
  if (isLoadedData) audioRef.value?.play()
  else isPlayNow = true
}

defineExpose({
  play: playAudio,
  pause: () => {
    audioRef.value?.pause()
  },
  audioDom: audioRef
})

if (props.play) {
  onMounted(() => {
    playAudio()
  })
}
</script>

<style lang="scss" scoped>
.audio-card {
  display: none;
}
</style>
