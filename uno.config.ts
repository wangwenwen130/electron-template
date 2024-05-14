import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      warn: true,
      prefix: ['i-'],
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      },
      collections: {
        icon: FileSystemIconLoader('src/renderer/src/assets/icons'),
        image: FileSystemIconLoader('src/renderer/src/assets/images')
      },
      customizations: {
        customize(props) {
          props.width = '2em'
          props.height = '2em'
          return props
        }
      }
    }),
    presetAttributify(),
    presetRemToPx({ baseFontSize: 4 })
  ],
  transformers: [transformerVariantGroup()],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['flex-col-c-c', 'flex flex-col justify-center items-center']
  ]
})
