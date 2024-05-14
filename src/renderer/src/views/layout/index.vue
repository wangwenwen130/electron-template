<template>
  <el-container direction="vertical" class="w-screen h-screen">
    <TopHead />
    <el-container>
      <Side />
      <el-main>
        <div class="w-full h-full relative">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.name" />
          </RouterView>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Side from './Side.vue'
import TopHead from './TopHead.vue'
</script>

<style lang="scss" scoped></style>
