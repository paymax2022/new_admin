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
                path: 'orders',
                name: 'orders',
                component: () => import('../../views/Delivery/orders.vue'),
            },
            {
                path: 'riders',
                name: 'riders',
                component: () => import('../../views/Delivery/riders.vue'),
            },
            {
                path: 'customers',
                name: 'customers',
                component: () => import('../../views/Delivery/customers.vue'),
            },
            {
                path: 'manageComplaints',
                name: 'manageComplaints',
                component: () => import('../../views/Delivery/manageComplaints.vue'),
            },
            // {
            //     path: 'riders',
            //     name: 'riders',
            //     component: () => import('../../views/Delivery/riders.vue'),
            // },
        ],
    },
];

export default deliveryRoutes;
