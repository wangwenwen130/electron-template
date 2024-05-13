import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), swcPlugin()],
    resolve: {
      alias: {
        'src': resolve('src/'),
        'main': resolve('src/main/')
      }
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [ vue({
      template: { compilerOptions: { hoistStatic: false } },
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    Unocss(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'element-plus': ['ElMessage', 'ElMessageBox', 'ElNotification']
        },
        {
          from: 'element-plus',
          imports: ['ElMessage', 'ElMessageBox', 'ElNotification'],
          type: true
        },
        {
          '@vueuse/core': ['useStorage']
        },
        {
          from: '@vueuse/core',
          imports: ['useStorage'],
          type: true
        }
      ],
      dts: true,
      eslintrc: {
        enabled: true
      },
      dirs: ['src/preload/src/stores/**', 'src/preload/src/hooks/**']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      extensions: ['vue', 'tsx'],
      dts: true,
      deep: true,
      dirs: ['src/preload/src/components', 'src/preload/src/business']
    })],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src'),
        'src': resolve('src/'),
        'main': resolve('src/main/')
      }
    }
  }
})
