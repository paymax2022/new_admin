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
        ],
    },
];

export default eventsRoutes;
