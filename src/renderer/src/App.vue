<template>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import './assets/css/index.scss';
@import './assets/css/_handle.scss';
@font-face {
  font-family: PingFang;
  src: url('./assets/css/Alibaba-PuHuiTi-Regular.woff');
}

#app {
  font-family: PingFang;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  background-color: transparent !important;
}

html,
body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  background-color: transparent !important;
}
</style>
