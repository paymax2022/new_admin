import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

const routes = [
    /************ AUTH ROUTES **********************/
    {
        path: '/auth',
        meta: { layout: 'auth' },
        children: [
            {
                path: '/login',
                name: 'AuthLogin',
                // component:
            },
            {
                path: '/register',
                name: 'AuthRegister',
                // component:
            },
            {
                path: '/forgot-password',
                name: 'AuthForgotPassword',
                // component:
            },
            {
                path: '/reset-password/:token',
                name: 'AuthResetPassword',
                // component:
            },
        ],
    },
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
        // component:
    },
    /************ MODULE ROUTES **********************/
    {
        path: '/visitor-mgt',
        // component:
        children: [
            {
                path: '/',
                name: 'VisitorMgtHome',
                // component:
            },
        ],
    },
    {
        path: '/:catchAll(.*)*',
        name: 'Error404',
        component: () => import('../views/Error404.vue'),
        meta: { layout: 'auth' },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    next(true);
});

router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});

export default router;
