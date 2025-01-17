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
        ],
    },
];

export default restaurantRoutes;
