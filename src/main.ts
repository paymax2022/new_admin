import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// pinia store
const pinia = createPinia()
app.use(pinia)

// router
app.use(router)

// main app css
import '@/assets/css/app.css'

// perfect scrollbar
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
app.use(PerfectScrollbarPlugin)

//vue-meta
import { createHead } from '@vueuse/head'
const head = createHead()
app.use(head)

// set default settings
import appSetting from '@/app-setting'
appSetting.init()

// tippy tooltips
import { TippyPlugin } from 'tippy.vue'
app.use(TippyPlugin)

//input mask
import { vMaska } from 'maska/vue'
app.directive('maska', vMaska)

// popper
import Popper from 'vue3-popper'
app.component('Popper', Popper)

app.mount('#app')
