const restaurantRoutes = [
    {
        path: '/restaurant',
        // component:
        children: [
            {
                path: '',
                name: 'restaurantHome',
                component: () => import('../../views/Restaurant/RestaurantHome.vue'),
            },
            {
                path: 'order',
                name: 'order',
                component: () => import('../../views/Restaurant/order.vue'),
            },
            {
                path: 'tableReservation',
                name: 'tableReservation',
                component: () => import('../../views/Restaurant/tableReservation.vue'),
            },
            {
                path: 'reports',
                name: 'reports',
                component: () => import('../../views/Restaurant/reports.vue'),
            },
            {
                path: 'loyaltyPoints',
                name: 'loyaltyPoints',
                component: () => import('../../views/Restaurant/loyaltyPoints.vue'),
            },
            {
                path: 'tableOrdering',
                name: 'tableOrdering',
                component: () => import('../../views/Restaurant/tableOrdering.vue'),
            },
            {
                path: 'printer',
                name: 'printer',
                component: () => import('../../views/Restaurant/printer.vue'),
            },
            {
                path: '/apps/invoice/preview',
                name: 'invoice-preview',
                component: () => import('../../views/apps/invoice/preview.vue'),
            },
            {
                path: '/apps/invoice/add',
                name: 'invoice-add',
                component: () => import('../../views/apps/invoice/add.vue'),
            },
            {
                path: '/apps/invoice/edit',
                name: 'invoice-edit',
                component: () => import('../../views/apps/invoice/edit.vue'),
            },
        ],
    },
];

export default restaurantRoutes;
