const visitorMgtRoutes = [
    {
        path: '/visitor-mgt',
        // component:
        children: [
            {
                path: '',
                name: 'visitorMgtHome',
                component: () => import('../../views/VisitorMgt/VisitorMgtHome.vue'),
            },
            {
                path: 'ticket',
                name: 'visitorMgtTicket',
                component: () => import('../../views/VisitorMgt/TicketPage.vue'),
            },
        ],
    },
];

export default visitorMgtRoutes;
