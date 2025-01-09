import type { RouteRecordRaw } from 'vue-router';
import authRoutes from './modules/auth';
import visitorMgtRoutes from './modules/visitor-mgt';

const routes: RouteRecordRaw[] = [
    /************ MAIN APP ROUTES **********************/
    {
        path: '/',
        redirect: { name: 'Dashboard' },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/ProfileView.vue'),
    },
    /************ MODULE ROUTES **********************/
    ...authRoutes,
    ...visitorMgtRoutes,
    {
        path: '/:catchAll(.*)*',
        name: 'Error404',
        component: () => import('../views/Error404.vue'),
        meta: { layout: 'auth' },
    },
];

export default routes;
