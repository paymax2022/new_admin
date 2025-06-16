import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { layout: 'app' }
  },
  {
    path: '/wallet-management',
    name: 'wallet-management',
    component: () => import('../views/WalletManagementView.vue'),
    meta: { layout: 'app' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 