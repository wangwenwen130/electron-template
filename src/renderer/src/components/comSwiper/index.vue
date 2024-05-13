<template>
  <teleport to="body">
    <div class="swiper-wrap">
      <div class="close-wrap" @click="() => emits('close')">
        <el-icon :size="40">
          <Close />
        </el-icon>
      </div>
      <listWrap :list="list" @cur-page="getCurPage">
        <template #default="{ item }">
          <div class="img-box">
            <img :src="getUrl(item)" alt="" />
          </div>
        </template>
      </listWrap>
      <div class="pagination">
        <span class="page-box">
          {{ page.curPage + '/' + list.length }}
        </span>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import listWrap from './listWrap.vue'

const emits = defineEmits(['close'])
const page = reactive<{
  curPage: number
}>({
  curPage: 1
})

const props = defineProps<{
  list: string[]
  baseImg: string
}>()

const getCurPage = (cur: number) => (page.curPage = cur)

const getUrl = (url) => {
  if (Array.isArray(url)) url = url[0]
  return url.indexOf('http') > -1 ? url : props.baseImg + '/' + url
}
</script>

<style lang="scss" scoped>
.swiper-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 40px;

  .close-wrap {
    position: absolute;
    top: 120px;
    right: 60px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    z-index: 99;
  }

  .img-box {
    padding: 20px;
    max-width: calc(100% - 200px);
    margin: 0 auto;
    z-index: 999;

    img {
      max-width: 100%;
      max-height: 100%;
      z-index: 999;
    }
  }

  .pagination {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;

    .page-box {
      width: 120px;
      height: 60px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 30px;
      font-size: 24px;
      color: #ffffff;
      display: inline-block;
      text-align: center;
      line-height: 60px;
    }
  }
}
</style>
