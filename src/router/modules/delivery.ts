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
        ],
    },
];

export default deliveryRoutes;
