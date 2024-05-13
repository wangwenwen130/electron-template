<template>
  <div class="protocol-page">
    <p class="privacy">
      {{ tip }}{{ $t('protocol.agreeProtocol')
      }}<span class="protocol" @click="getProtocol(1)">{{ $t('protocol.user') }}、</span
      ><span class="protocol" @click="getProtocol(2)">{{ $t('protocol.face') }}</span
      ><template>
        <span>、</span
        ><span class="protocol" @click="getProtocol(3)">{{ $t('protocol.tourist') }}、</span
        ><span class="protocol" @click="getProtocol(4)">{{ $t('protocol.safe') }}</span>
      </template>
    </p>
    <!-- 协议提示 -->
    <teleport to="body">
      <Dialog
        v-if="isUsual && protocols.isShow"
        :visible="protocols.isShow"
        :type="2"
        :width="880"
        :inner="protocols.content"
        :name="protocols.name"
        @close-dialog="protocols.isShow = false"
      ></Dialog>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import i18n from '@/i18n'
import { reactive, PropType } from 'vue'
import { replaceTag } from '@/utils/index'

type Protocol = {
  name: string
  content: string
  code: string
}

const props = defineProps({
  tip: {
    type: String,
    default: i18n.global.t('scanSFZ.topTip.setUpSFZ1')
  },
  isUsual: {
    type: Boolean,
    default: true
  },
  protocolsList: {
    type: Array as PropType<Protocol[]>,
    default: () => []
  }
})

const emit = defineEmits(['getProtocols'])

const protocols = reactive<{
  isShow: boolean
  content: string
  name: string
}>({
  isShow: false,
  content: '',
  name: ''
})

// 查看相关协议
function getProtocol(type: string | number) {
  // 匹配对应的协议
  const proto = props.protocolsList.find((item) => item.code == type)
  if (proto) {
    protocols.isShow = true
    protocols.content = replaceTag(proto.content)
    protocols.name = `《${proto.name}》`
  }

  if (!props.isUsual) {
    emit('getProtocols', protocols)
  }
}
</script>

<style lang="scss" scoped>
.protocol-page {
  .privacy {
    text-align: center;
    height: 68px;
    font-size: 24px;
    width: 100%;
    color: #81889d;
    line-height: 40px;

    .protocol {
      display: inline-block;
    }
  }
}
</style>
