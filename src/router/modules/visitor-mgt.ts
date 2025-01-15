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
            {
                path: 'time-acess',
                name: 'visitorRealTimeAcess',
                component: () => import('../../views/VisitorMgt/RealTimeAccess.vue'),
            },
            {
                path: 'visitor-message',
                name: 'visitorMessagePage',
                component: () => import('../../views/VisitorMgt/ChatPage.vue'),
            },
            {
                path: 'security-alert',
                name: 'securityAlertPage',
                component: () => import('../../views/VisitorMgt/SecurityAlert.vue'),
            },
            {
                path: 'access-cards',
                name: 'accessCardsPage',
                component: () => import('../../views/VisitorMgt/AccessCards.vue'),
            },
            {
                path: 'vehicle-tags',
                name: 'vehicleTagPage',
                component: () => import('../../views/VisitorMgt/VehicleTags.vue'),
            },
            {
                path: 'visitor-dependant',
                name: 'visitorDependantPage',
                component: () => import('../../views/VisitorMgt/VisitorDependents.vue'),
            },
            {
                path: 'address-page',
                name: 'addressPage',
                component: () => import('../../views/VisitorMgt/AddressPage.vue'),
            },
        ],
    },
];

export default visitorMgtRoutes;
