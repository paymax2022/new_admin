import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/stores/index';
import { useAuthStore } from '@/stores/auth';
import appSetting from '@/app-setting';
import routes from './routes';

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
    const authStore = useAuthStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    // Protect all routes except those with meta.layout === 'auth' or name === 'login'
    // const isAuthRoute = to?.meta?.layout === 'auth' || to.name === 'login' || to.name === 'authLogin' || to.path.startsWith('/auth');


    const isAuthRoute = to.name === 'login' || to.name === 'authLogin' ;

    // If already logged in and trying to access login/auth page, redirect to dashboard
    if (isAuthRoute && authStore.isAuthenticated) {
        return next({ name: 'dashboard' });
    }

    // If not authenticated and trying to access a protected route, redirect to login
    if (!isAuthRoute && !authStore.isAuthenticated) {
        return next({ name: 'login' });
    }
    next(true);
});

router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});

export default router;
