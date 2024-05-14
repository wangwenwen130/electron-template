import { defineStore } from 'pinia'

export const useSysStore = defineStore('sys', () => {
  const hardwareIp = ref('')
  return { hardwareIp }
})
