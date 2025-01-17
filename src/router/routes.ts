import type { RouteRecordRaw } from 'vue-router';
import authRoutes from './modules/auth';
import visitorMgtRoutes from './modules/visitor-mgt';
import billsPaymentRoutes from './modules/bills-payment';
import crowdfundingRoutes from './modules/crowdfunding';
import deliveryRoutes from './modules/delivery';
import eventsRoutes from './modules/events';
import groupMembershipRoutes from './modules/group-membership';
import insuranceRoutes from './modules/insurance';
import restaurantRoutes from './modules/restaurant';
import transactionsRoutes from './modules/transactions';
import usersMgtRoutes from './modules/users-mgt';
import votingRoutes from './modules/voting';

const routes: RouteRecordRaw[] = [
    /************ MAIN APP ROUTES **********************/
    {
        path: '/',
        redirect: { name: 'dashboard' },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
    },
    /************ MODULE ROUTES **********************/
    ...authRoutes,
    ...billsPaymentRoutes,
    ...crowdfundingRoutes,
    ...deliveryRoutes,
    ...eventsRoutes,
    ...groupMembershipRoutes,
    ...insuranceRoutes,
    ...restaurantRoutes,
    ...transactionsRoutes,
    ...usersMgtRoutes,
    ...visitorMgtRoutes,
    ...votingRoutes,
    /************ ERROR ROUTE **********************/
    {
        path: '/:catchAll(.*)*',
        name: 'error404',
        component: () => import('../views/Error404.vue'),
        meta: { layout: 'auth' },
    },
];

export default routes;
