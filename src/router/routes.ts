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
    {
        path: '/overview',
        name: 'overview',
        component: () => import('@/views/OverviewView.vue'),
    },
    {
        path: '/activity-feed',
        name: 'activity-feed',
        component: () => import('@/views/ActivityFeedView.vue'),
    },
    {
        path: '/widgets',
        name: 'widgets',
        component: () => import('@/views/WidgetsView.vue'),
    },
    {
        path: '/directory',
        name: 'directory',
        component: () => import('@/views/DirectoryView.vue'),
    },
    {
        path: '/subscription-dashboard',
        name: 'subscription-dashboard',
        component: () => import('@/views/SubscriptionDashboardView.vue'),
    },
    {
        path: '/plans-tiers',
        name: 'plans-tiers',
        component: () => import('@/views/PlansTiersView.vue'),
    },
    {
        path: '/invoice-center',
        name: 'invoice-center',
        component: () => import('@/views/InvoiceCenterView.vue'),
    },
    {
        path: '/payment-history',
        name: 'payment-history',
        component: () => import('@/views/PaymentHistoryView.vue'),
    },
    {
        path: '/failed-payments',
        name: 'failed-payments',
        component: () => import('@/views/FailedPaymentsView.vue'),
    },
    {
        path: '/subscription-settings',
        name: 'subscription-settings',
        component: () => import('@/views/SubscriptionSettingsView.vue'),
    },
    {
        path: '/group-list',
        name: 'group-list',
        component: () => import('@/views/GroupListView.vue'),
    },
    {
        path: '/manage-group-members',
        name: 'manage-group-members',
        component: () => import('@/views/ManageGroupMembersView.vue'),
    },
    {
        path: '/communication',
        name: 'communication',
        component: () => import('@/views/CommunicationView.vue'),
    },
    {
        path: '/polls-surveys',
        name: 'polls-surveys',
        component: () => import('@/views/PollsSurveysView.vue'),
    },
    {
        path: '/resources',
        name: 'resources',
        component: () => import('@/views/ResourcesView.vue'),
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
