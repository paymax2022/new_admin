const newCrowdfundingRoutes = [
    {
        path: '/new-crowdfunding',
        children: [
            {
                path: '',
                name: 'new-crowdfunding-dashboard',
                component: () => import('../../views/NewCrowdfunding/Dashboard.vue'),
            },
            {
                path: 'campaigns',
                name: 'new-crowdfunding-campaigns',
                component: () => import('../../views/NewCrowdfunding/Campaigns.vue'),
            },
            {
                path: 'users',
                name: 'new-crowdfunding-users',
                component: () => import('../../views/NewCrowdfunding/Users.vue'),
            },
            {
                path: 'wallet',
                name: 'new-crowdfunding-wallet',
                component: () => import('../../views/NewCrowdfunding/Wallet.vue'),
            },
            {
                path: 'support',
                name: 'new-crowdfunding-support',
                component: () => import('../../views/NewCrowdfunding/Support.vue'),
            },
            {
                path: 'promotion',
                name: 'new-crowdfunding-promotion',
                component: () => import('../../views/NewCrowdfunding/Promotion.vue'),
            },
            {
                path: 'admin-users',
                name: 'new-crowdfunding-admin-users',
                component: () => import('../../views/NewCrowdfunding/AdminUsers.vue'),
            },
            {
                path: 'settings',
                name: 'new-crowdfunding-settings',
                component: () => import('../../views/NewCrowdfunding/Settings.vue'),
            },
        ],
    },
];

export default newCrowdfundingRoutes;

