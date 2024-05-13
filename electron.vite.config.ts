import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import cssPlugin from './vite-css-plugin'

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
    plugins: [vue(), cssPlugin()],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src'),
        'src': resolve('src/'),
        'main': resolve('src/main/')
      }
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || ''
            const info = name.split('.')
            const extType = info[info.length - 1]
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(name))
              return `assets/media/[name][extname]`
            else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(name)) return `assets/img/[name][extname]`
            else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(name))
              return `assets/css/[name][extname]`
            return `assets/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      }
    }
  }
})
