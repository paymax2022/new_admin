import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import '@/assets/css/app.css';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import { createHead } from '@vueuse/head';
import appSetting from '@/app-setting';
import i18n from '@/i18n';
import { TippyPlugin } from 'tippy.vue';
import { vMaska } from 'maska/vue';
import Popper from 'vue3-popper';
import { Chart, registerables } from 'chart.js';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
Chart.register(...registerables);

const app = createApp(App);

// pinia store
const pinia = createPinia();
app.use(pinia);

// router
app.use(router);

// main app css

// perfect scrollbar
app.use(PerfectScrollbarPlugin);

//vue-meta
const head = createHead();
app.use(head);

// set default settings
appSetting.init();

//vue-i18n
app.use(i18n);

// tippy tooltips
app.use(TippyPlugin);

//input mask
app.directive('maska', vMaska);

// popper
app.component('Popper', Popper);

app.use(Toast, {
  position: 'top-right',
  timeout: 4000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
});

app.mount('#app');
