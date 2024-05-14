<template>
  <div class="h-full pt-10 w-180 shadow-xl border-(1 solid right color-gray-200)">
    <el-menu :default-active="activePath" :router="true">
      <template v-for="route in layout" :key="route.name">
        <el-menu-item :index="route.path" @click="pushPath(route.path)">
          <span class="text-18">{{ route.meta?.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { layout } from '@/router/layout'
const activePath = ref<string>(layout[0].path)
const router = useRouter()
const pushPath = (path: string) => router.push(path)
pushPath(activePath.value)
</script>

<style lang="scss" scoped></style>
