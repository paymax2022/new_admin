const deliveryRoutes = [
    {
        path: '/delivery',
        // component:
        children: [
            {
                path: '',
                name: 'deliveryHome',
                component: () => import('../../views/Delivery/DeliveryHome.vue'),
            },
            {
                path: 'deliveries',
                name: 'deliveryDeliveries',
                component: () => import('../../views/Delivery/Deliveries.vue'),
            },
            {
                path: 'drivers',
                name: 'deliveryDrivers',
                component: () => import('../../views/Delivery/Drivers.vue'),
            },
            {
                path: 'auto-assignment',
                name: 'deliveryAutoAssignment',
                component: () => import('../../views/Delivery/AutoAssignment.vue'),
            },
            {
                path: 'pricing-fares',
                name: 'deliveryPricingFares',
                component: () => import('../../views/Delivery/PricingFares.vue'),
            },
            {
                path: 'dispatch',
                name: 'deliveryDispatch',
                component: () => import('../../views/Delivery/Dispatch.vue'),
            },
            {
                path: 'earnings-payouts',
                name: 'deliveryEarningsPayouts',
                component: () => import('../../views/Delivery/EarningsPayouts.vue'),
            },
            {
                path: 'disputes',
                name: 'deliveryDisputes',
                component: () => import('../../views/Delivery/Disputes.vue'),
            },
            {
                path: 'reports-analytics',
                name: 'deliveryReportsAnalytics',
                component: () => import('../../views/Delivery/ReportsAnalytics.vue'),
            },
            {
                path: 'scheduled-rides',
                name: 'deliveryScheduledRides',
                component: () => import('../../views/Delivery/ScheduledRides.vue'),
            },
            {
                path: 'roles-audits',
                name: 'deliveryRolesAudits',
                component: () => import('../../views/Delivery/RolesAudits.vue'),
            },
        ],
    },
];

export default deliveryRoutes;
