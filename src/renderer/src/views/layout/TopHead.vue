<template>
  <div class="h-90 p-x40 py-20 flex justify-between">
    <el-image class="w-228 h-46" :src="logo"></el-image>
    <el-space class="flex items-center">
      <span class="text-(blue-5 20)">[环境]</span>
      <i class="i-icon-full-screen w-40 h-40 cursor-pointer" @click="fullScreen"></i>
      <i class="i-icon-min-screen w-40 h-40 cursor-pointer" @click="minScreen"></i>
      <i class="i-icon-close-sys w-40 h-40 cursor-pointer" @click="closeSys"></i>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/images/logo.png'

const fullScreen = () => {}
const minScreen = () => {}
const closeSys = () => {}
</script>

<style lang="scss" scoped></style>
