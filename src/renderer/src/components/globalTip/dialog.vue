<template>
  <teleport to="body">
    <div v-bind="$attrs" class="dialog-overlay el-overlay" @click="onModelClick">
      <div
        class="dialog-box"
        :style="{
          width: width || '40%',
          'background-color': backgroundColor,
          'margin-top': marginTop,
          'border-radius': borderRadius
        }"
      >
        <header
          v-if="title && showClose"
          class="dialog-header el-dialog__header"
          :class="center ? 'textCenter' : ''"
        >
          <span class="title">
            {{ title }}
          </span>
          <div v-if="showClose" class="close-btn" @click="close">
            <el-icon>
              <Close />
            </el-icon>
          </div>
        </header>
        <div class="dialog-content el-dialog__body" :class="center ? 'textCenter' : ''">
          <slot />
        </div>
        <footer
          v-if="footer"
          class="dialog-footer"
          :class="{ center: center }"
          :style="{ textAlign: center ? 'center' : 'right' }"
        >
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue'

const props = defineProps({
  title: String,
  width: [Number, String],
  backgroundColor: String,
  marginTop: String,
  borderRadius: String,
  showClose: {
    type: Boolean,
    default: true
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  center: {
    type: Boolean,
    default: false
  },
  // 暂无实现
  beforeClose: {
    type: Boolean,
    default: false
  },
  value: {
    type: Boolean,
    default: false
  }
})

const footer = !!useSlots().footer
const emit = defineEmits(['close', 'update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
  emit('close', false)
}

const onModelClick = () => {
  if (props.closeOnClickModal) {
    emit('update:modelValue', false)
    emit('close', false)
  }
}
</script>

<style lang="scss" scoped>
.textLeft {
  text-align: left;
}

.textCenter {
  text-align: center;
}

.dialog-overlay {
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
}

.dialog-box {
  margin-top: 30%;
  width: 30%;
  background-color: #fff;
  border-radius: 4px;
}

.dialog-header {
  position: relative;
  padding: 20px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #303133;

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}

.dialog-content {
  padding: 30px;
  color: #606266;
  font-size: 14px;
  width: 100%;
}

.dialog-footer {
  width: 100%;
  padding: 20px;
  padding-top: 10px;
  text-align: right;
}

.dialog-footer.center {
  padding: 20px 0;
}
</style>
