<template>
  <baseDialog
    v-if="dialogData.show"
    class="flex f-jcc"
    margin-top="483px"
    background-color="transparent"
    :center="true"
    width="920px"
    :show-close="false"
  >
    <div class="box-diolag">
      <div class="image">
        <img :src="getImage" />
      </div>
      <div class="info-wrap flex f-aic f-dc">
        <div class="f-size-48 color-000">{{ dialogData.msg }}</div>
        <div
          v-if="dialogData.showCloseBtn"
          class="btn-solid m-top-90"
          style="width: 348px; height: 88px"
          @click="toClose"
        >
          <span v-if="dialogData.coundown" class="p-right-6">{{ second }}s</span> 关闭
        </div>
      </div>
    </div>
  </baseDialog>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import baseDialog from './dialog.vue'
import { showTipMsg, dialogData } from './index'
import faild from '@/assets/images/g-faild.png'
import warning from '@/assets/images/g-warning.png'
import success from '@/assets/images/g-success.png'
import { useCountDown } from '@/hooks'

const second = useCountDown(dialogData.coundown || 0, toClose)

watch(
  () => dialogData.show,
  () => {
    if (dialogData.coundown && dialogData.show && dialogData.coundown > 0) {
      second.value = dialogData.coundown
    }
  }
)

const getImage = computed(() => {
  if (dialogData.type === 'success') return success
  else if (dialogData.type === 'faild') return faild
  else return warning
})

defineExpose({
  showTipMsg
})

function toClose() {
  if (!dialogData.show) return
  dialogData.show = false
  second.value = 0
  dialogData.close && dialogData.close()
}
</script>

<style lang="scss" scoped>
.box-diolag {
  width: 100%;
  background-color: var(--back_color_fff);
  position: relative;
  border-radius: 48px;

  .image {
    width: 365px;
    height: 365px;
    position: absolute;
    top: -182px;
    left: 50%;
    transform: translateX(-182px);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info-wrap {
    background-color: var(--back_color_fff);
    width: 100%;
    min-height: 400px;
    border-radius: 48px;
    padding-top: 262px;
    padding-bottom: 90px;
  }
}
</style>
