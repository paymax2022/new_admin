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

app.mount('#app')
