const transportationRoutes = [
    {
        path: '/transportation',
        // component:
        children: [
            {
                path: '',
                name: 'transportationDashboard',
                component: () => import('../../views/Transportation/Dashboard.vue'),
            },
            {
                path: 'deliveries',
                name: 'transportationDeliveries',
                component: () => import('../../views/Transportation/Deliveries.vue'),
            },
            {
                path: 'riders',
                name: 'transportationRiders',
                component: () => import('../../views/Transportation/Riders.vue'),
            },
            {
                path: 'customers',
                name: 'transportationCustomers',
                component: () => import('../../views/Transportation/Customers.vue'),
            },
            {
                path: 'pricing',
                name: 'transportationPricing',
                component: () => import('../../views/Transportation/Pricing.vue'),
            },
            {
                path: 'payments',
                name: 'transportationPayments',
                component: () => import('../../views/Transportation/Payments.vue'),
            },
            {
                path: 'refunds',
                name: 'transportationRefunds',
                component: () => import('../../views/Transportation/Refunds.vue'),
            },
            {
                path: 'reports',
                name: 'transportationReports',
                component: () => import('../../views/Transportation/Reports.vue'),
            },
            {
                path: 'settings',
                name: 'transportationSettings',
                component: () => import('../../views/Transportation/Settings.vue'),
            },
        ],
    },
];

export default transportationRoutes;

