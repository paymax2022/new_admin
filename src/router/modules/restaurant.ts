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
                path: 'restaurant-list',
                name: 'restaurantList',
                component: () => import('../../views/Restaurant/RestaurantsList.vue'),
            },
            {
                path: 'restaurant-categories',
                name: 'restaurantCategories',
                component: () => import('../../views/Restaurant/RestaurantCategories.vue'),
            },
            {
                path: 'restaurant-menu',
                name: 'restaurantMenu',
                component: () => import('../../views/Restaurant/RestaurantMenuItems.vue'),
            },
            {
                path: 'restaurant-cuisines',
                name: 'restaurantCuisines',
                component: () => import('../../views/Restaurant/RestaurantCuisines.vue'),
            },
            {
                path: 'restaurant-time-slots',
                name: 'restaurantTimeSlots',
                component: () => import('../../views/Restaurant/RestaurantTime.vue'),
            },
            {
                path: 'restaurant-table',
                name: 'restaurantTable',
                component: () => import('../../views/Restaurant/RestaurantTable.vue'),
            },
            {
                path: 'restaurant-ratings',
                name: 'restaurantRatings',
                component: () => import('../../views/Restaurant/RestaurantRatings.vue'),
            },
            {
                path: 'restaurant-reservations',
                name: 'restaurantReservations',
                component: () => import('../../views/Restaurant/RestaurantReservation.vue'),
            },
            {
                path: 'restaurant-orders',
                name: 'restaurantOrders',
                component: () => import('../../views/Restaurant/RestaurantOrders.vue'),
            },
            {
                path: 'restaurant-users',
                name: 'restaurantUsers',
                component: () => import('../../views/Restaurant/RestaurantUsers.vue'),
            },
            {
                path: 'restaurant-customers',
                name: 'restaurantCustomers',
                component: () => import('../../views/Restaurant/RestaurantCustomers.vue'),
            },
            {
                path: 'restaurant-owners',
                name: 'restaurantOwners',
                component: () => import('../../views/Restaurant/RestaurantOwners.vue'),
            },
            {
                path: 'restaurant-delivery-agents',
                name: 'restaurantDeliveryAgents',
                component: () => import('../../views/Restaurant/RestaurantDeliveryAgent.vue'),
            },
        ],
    },
];

export default restaurantRoutes;
