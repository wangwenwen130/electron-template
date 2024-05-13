<template>
  <div class="img-box wh100">
    <img :src="imgUrl" alt="img-icon" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import {} from '@/utils/index'

// const props = defineProps({
//   name: {
//     type: String,
//     require: true
//   }
// })

const imgUrl = ref('')
</script>

<style lang="scss" scoped>
.img-box {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
