<template>
  <div class="list-wrap">
    <div v-show="isShowRow" class="btn row_pre" @click="toPrePage">
      <img v-if="page.isFirstPage" src="@/assets/images/left-row.png" alt="" />
      <img v-else class="img-rotate" src="@/assets/images/active-right.png" alt="" />
    </div>
    <slot :item="page.showList"></slot>
    <div v-show="isShowRow" class="btn row_next" @click="toNextPage">
      <img v-if="page.isLastPage" class="img-rotate" src="@/assets/images/left-row.png" alt="" />
      <img v-else src="@/assets/images/active-right.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup generic="T = any">
import type { PropType, UnwrapNestedRefs } from 'vue'
import { reactive, computed, watch } from 'vue'

const props = defineProps({
  list: {
    type: Array as PropType<T[]>,
    default: () => []
  },
  // 默认展示1个
  showNum: {
    type: Number,
    default: 1
  }
})

defineSlots<{
  default(props: { item: UnwrapNestedRefs<T[]> }): UnwrapNestedRefs<T[]>
}>()

const isShowRow = computed(() => props.list.length / props.showNum > 1)

watch(
  () => props.list,
  () => {
    setShowList(0)
    page.curPage = 0
  }
)

const emit = defineEmits<{
  (e: 'curPage', data: number): void
}>()

const page = reactive<{
  showList: T[]
  isFirstPage: boolean
  isLastPage: boolean
  curPage: number
}>({
  showList: [],
  isFirstPage: true,
  isLastPage: false,
  curPage: 0
})

watch(
  () => page.curPage,
  (val) => {
    emit('curPage', ++val || 1)
  },
  {
    immediate: true
  }
)

const getIdx = (curPage: number) => {
  return {
    start: curPage * props.showNum,
    end: (curPage + 1) * props.showNum
  }
}

const setShowList = (curPage: number) => {
  const { start, end } = getIdx(curPage)
  page.showList = props.list.slice(start, end) as UnwrapNestedRefs<T[]>
  page.isFirstPage = true
  page.isLastPage = props.list.length > props.showNum ? false : true
}
// 初始化
setShowList(0)

const toPrePage = () => {
  if (page.isFirstPage) return

  if (page.curPage > 0) {
    page.curPage -= 1
  }
  setShowList(page.curPage)
  updateRow(page.curPage)
}
const toNextPage = () => {
  if (page.isLastPage) return
  const { end } = getIdx(page.curPage)
  const len = props.list.length
  if (end < len) page.curPage += 1
  setShowList(page.curPage)
  updateRow(page.curPage)
}

function updateRow(curPage: number) {
  const { start, end } = getIdx(curPage)
  if (start === 0) page.isFirstPage = true
  else page.isFirstPage = false

  if (end >= props.list.length) page.isLastPage = true
  else page.isLastPage = false
}
</script>

<style lang="scss" scoped>
.img-rotate {
  transform: rotate(180deg);
}

.list-wrap {
  @include flex(space-between, center);
  width: 100%;
  height: 100%;

  .btn {
    width: 34px;
    height: 34px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
