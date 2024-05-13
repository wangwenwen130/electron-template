import { Loading, Close, Plus, Warning, Check, Search } from '@element-plus/icons-vue'

import topHeader from './topHeader/index.vue'
import ProtocolDialog from './protocolDialog/index.vue'
import animation from './animation/index.vue'
import audioPlay from './audioPlay/index.vue'

export default {
  install(app) {
    // icon
    app.component('Loading', Loading)
    app.component('Close', Close)
    app.component('Plus', Plus)
    app.component('Check', Check)
    app.component('Search', Search)
    app.component('Warning', Warning)

    // com
    app.component('TopHeader', topHeader)
    app.component('ProtocolDialog', ProtocolDialog)
    app.component('Animation', animation)
    app.component('AudioPlay', audioPlay)
  }
}
