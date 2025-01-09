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
        ],
    },
];

export default crowdfundingRoutes;
