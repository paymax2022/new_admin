const eventsRoutes = [
    {
        path: '/events',
        // component:
        children: [
            {
                path: '',
                name: 'eventsHome',
                component: () => import('../../views/Events/EventsHome.vue'),
            },
            {
                path: 'totalEvents',
                name: 'totalEvents',
                component: () => import('../../views/Events/totalEvents.vue'),
            },
            {
                path: 'bookings',
                name: 'bookings',
                component: () => import('../../views/Events/bookings.vue'),
            },
            {
                path: 'tickets',
                name: 'tickets',
                component: () => import('../../views/Events/tickets.vue'),
            },
            {
                path: 'vendors',
                name: 'vendors',
                component: () => import('../../views/Events/vendors.vue'),
            },
            {
                path: 'vendorComplaints',
                name: 'vendorComplaints',
                component: () => import('../../views/Events/vendorComplaints.vue'),
            },
            {
                path: 'customerFeedback',
                name: 'customerFeedback',
                component: () => import('../../views/Events/customerFeedback.vue'),
            },
        ],
    },
];

export default eventsRoutes;
