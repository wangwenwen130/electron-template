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
      dirs: ['src/renderer/src/stores', 'src/renderer/src/hooks']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      extensions: ['vue', 'tsx'],
      dts: true,
      deep: true,
      dirs: ['src/renderer/src/components', 'src/renderer/src/business']
    })],
    base: './',
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '~/package': resolve(__dirname, './package.json'),
        'src': resolve('src/'),
        'main': resolve('src/main/')
      },
      extensions: [ '.js', '.json','.vue', '.ts', '.tsx']
    }
  }
})
