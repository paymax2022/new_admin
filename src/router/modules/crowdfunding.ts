const crowdfundingRoutes = [
    {
        path: '/crowdfunding',
        // component:
        children: [
            {
                path: '',
                name: 'crowdfundingHome',
                component: () => import('../../views/Crowdfunding/CrowdfundingHome.vue'),
            },
            {
                path: 'crowdfundingAll',
                name: 'crowdfundingAll',
                component: () => import('../../views/Crowdfunding/CrowdfundingAll.vue'),
            },
            {
                path: 'details-page',
                name: 'detailsPage',
                component: () => import('../../views/Crowdfunding/DetailsPage.vue'),
            },
            {
                path: 'crowdfundingPending',
                name: 'crowdfundingPending',
                component: () => import('../../views/Crowdfunding/CrowdfundingPending.vue'),
            },
            {
                path: 'view-pending',
                name: 'pendingView',
                component: () => import('../../views/Crowdfunding/PendingViews.vue'),
            },
            {
                path: 'crowdfundingRunning',
                name: 'crowdfundingRunning',
                component: () => import('../../views/Crowdfunding/CrowdfundingRunning.vue'),
            },
            {
                path: 'view-running',
                name: 'runningView',
                component: () => import('../../views/Crowdfunding/RunningView.vue'),
            },
            {
                path: 'crowdfundingCompleted',
                name: 'crowdfundingCompleted',
                component: () => import('../../views/Crowdfunding/CrowdfundingCompleted.vue'),
            },
            {
                path: 'view-completed',
                name: 'completedView',
                component: () => import('../../views/Crowdfunding/Completedviews.vue'),
            },
            {
                path: 'crowdfundingRejected',
                name: 'crowdfundingRejected',
                component: () => import('../../views/Crowdfunding/CrowdfundingRejected.vue'),
            },
            {
                path: 'view-rejected',
                name: 'rejectedView',
                component: () => import('../../views/Crowdfunding/RejectedViews.vue'),
            },
            {
                path: 'crowdfundingExpired',
                name: 'crowdfundingExpired',
                component: () => import('../../views/Crowdfunding/CrowdfundingExpired.vue'),
            },
            {
                path: 'view-expired',
                name: 'expiredView',
                component: () => import('../../views/Crowdfunding/ExpireViews.vue'),
            },
            {
                path: 'crowdfundingExtend',
                name: 'crowdfundingExtend',
                component: () => import('../../views/Crowdfunding/CrowdfundingExtend.vue'),
            },
            {
                path: 'views-extended',
                name: 'extendedView',
                component: () => import('../../views/Crowdfunding/Extendedviews.vue'),
            },
            {
                path: 'crowdfundingReviews',
                name: 'crowdfundingReviews',
                component: () => import('../../views/Crowdfunding/CrowdfundingReviews.vue'),
            },
            // {
            //     path: 'views-extended',
            //     name: 'extendedView',
            //     component: () => import('../../views/Crowdfunding/Extendedviews.vue'),
            // },
        ],
    },
];

export default crowdfundingRoutes;
