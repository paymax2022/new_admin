import type { RouteRecordRaw } from 'vue-router';

const multicurrencyRoutes: RouteRecordRaw[] = [
  {
    path: '/multicurrency',
    children: [
      {
        path: '',
        name: 'multicurrency-dashboard',
        component: () => import('@/views/Multicurrency/Dashboard.vue'),
      },
      {
        path: 'users',
        name: 'multicurrency-users',
        component: () => import('@/views/Multicurrency/Users.vue'),
      },
      {
        path: 'roles-permissions',
        name: 'multicurrency-roles-permissions',
        component: () => import('@/views/Multicurrency/RolesPermissions.vue'),
      },
      {
        path: 'transactions',
        name: 'multicurrency-transactions',
        component: () => import('@/views/Multicurrency/Transactions.vue'),
      },
      {
        path: 'virtual-cards',
        name: 'multicurrency-virtual-cards',
        component: () => import('@/views/Multicurrency/VirtualCards.vue'),
      },
      {
        path: 'support-tickets',
        name: 'multicurrency-support-tickets',
        component: () => import('@/views/Multicurrency/SupportTickets.vue'),
      },
    ],
  },
];

export default multicurrencyRoutes;

