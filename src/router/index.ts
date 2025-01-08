import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/index.vue';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    //   {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue'),
    //   },
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
