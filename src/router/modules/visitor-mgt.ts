const visitorMgtRoutes = [
    {
        path: '/visitor-mgt',
        // component:
        children: [
            {
                path: '/',
                name: 'visitorMgtHome',
                component: () => import('../../views/VisitorMgt/VisitorMgtHome.vue'),
            },
        ],
    },
];

export default visitorMgtRoutes;
