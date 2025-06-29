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
        redirect: { name: 'login' },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        meta: { layout: 'auth' } // Optional: if you want the login page to use a minimal layout
    },
    {
        path: '/admin-view',
        name: 'admin-view',
        component: () => import('@/views/AdminPanelView.vue'),
        meta: { layout: 'auth' }
    },
    {
        path: '/admin-home',
        name: 'admin-home',
        component: () => import('@/views/AdminPanelHome.vue'),
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: () => import('@/views/TransactionsView.vue'),
    },
    {
        path: '/transactions-mgt',
        name: 'transactions-mgt',
        component: () => import('@/views/TransactionManagementView.vue'),
    },
    {
        path: '/wallets',
        name: 'wallets',
        component: () => import('@/views/WalletManagementView.vue'),
    },
    {
        path: '/roles',
        name: 'roles',
        component: () => import('@/views/RolesPermissionView.vue'),
    },
    {
        path: '/roles-manager',
        name: 'roles-manager',
        component: () => import('@/views/RolesManagerView.vue'),
    },
    {
        path: '/user-management',
        name: 'user-management',
        component: () => import('@/views/UserManangementView.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
    },
    {
        path: '/commission-earnings',
        name: 'commission-earnings',
        component: () => import('@/views/CommissionEarningsView.vue'),
    },
    {
        path: '/payouts-management',
        name: 'payouts-management',
        component: () => import('@/views/PayoutsManagementView.vue'),
    },
    {
        path: '/referral-network',
        name: 'referral-network',
        component: () => import('@/views/ReferralNetworkView.vue'),
    },
    {
        path: '/referral-program-settings',
        name: 'referral-program-settings',
        component: () => import('@/views/ReferralProgramSettingsView.vue'),
    },
    {
        path: '/dispute-management',
        name: 'dispute-management',
        component: () => import('@/views/DisputeManagementView.vue'),
    },
    {
        path: '/analytics-dashboard',
        name: 'analytics-dashboard',
        component: () => import('@/views/AnalyticsDashboardView.vue'),
    },
    {
        path: '/system-settings',
        name: 'system-settings',
        component: () => import('@/views/SystemSettingsView.vue'),
    },
    {
        path: '/backup-restore',
        name: 'backup-restore',
        component: () => import('@/views/BackupRestoreView.vue'),
    },
    {
        path: '/activity-logs',
        name: 'activity-logs',
        component: () => import('@/views/ActivityLogsView.vue'),
    },
    {
        path: '/export-reports',
        name: 'export-reports',
        component: () => import('@/views/ExportReportsView.vue'),
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
        // component: () => import('../views/Error404.vue'),
        component: () => import('@/views/LoginView.vue'),
        meta: { layout: 'auth' },
    },
];

export default routes;
