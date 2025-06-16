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
                path: 'create-restaurant',
                name: 'createRestaurant',
                component: () => import('../../views/Restaurant/CreateRestaurant.vue'),
            },
            {
                path: 'list-view',
                name: 'restaurantListView',
                component: () => import('../../views/Restaurant/RestaurantListView.vue'),
            },
            {
                path: 'restaurant-categories',
                name: 'restaurantCategories',
                component: () => import('../../views/Restaurant/RestaurantCategories.vue'),
            },
            {
                path: 'create-categories',
                name: 'createCategories',
                component: () => import('../../views/Restaurant/CreateCategory.vue'),
            },
            {
                path: 'restaurant-menu',
                name: 'restaurantMenu',
                component: () => import('../../views/Restaurant/RestaurantMenuItems.vue'),
            },
            {
                path: 'create-menu',
                name: 'createMenu',
                component: () => import('../../views/Restaurant/CreateMenuItem.vue'),
            },
            {
                path: 'restaurant-cuisines',
                name: 'restaurantCuisines',
                component: () => import('../../views/Restaurant/RestaurantCuisines.vue'),
            },
            {
                path: 'create-cuisines',
                name: 'createCuisines',
                component: () => import('../../views/Restaurant/CreateCuisine.vue'),
            },
            {
                path: 'restaurant-time-slots',
                name: 'restaurantTimeSlots',
                component: () => import('../../views/Restaurant/RestaurantTime.vue'),
            },
            {
                path: 'create-time-slot',
                name: 'createTimeSlot',
                component: () => import('../../views/Restaurant/CreateTimeSlot.vue'),
            },
            {
                path: 'restaurant-table',
                name: 'restaurantTable',
                component: () => import('../../views/Restaurant/RestaurantTable.vue'),
            },
            {
                path: 'create-table',
                name: 'createTable',
                component: () => import('../../views/Restaurant/CreateTable.vue'),
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
                path: 'create-reservation',
                name: 'createReservation',
                component: () => import('../../views/Restaurant/CreateReservation.vue'),
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
            {
                path: 'restaurant-complaint',
                name: 'restaurantComplaints',
                component: () => import('../../views/Restaurant/RestaurantComplaint.vue'),
            },
            {
                path: 'restaurant-push-notifications',
                name: 'restaurantPushNotifications',
                component: () => import('../../views/Restaurant/PushNotification.vue'),
            },
            {
                path: 'restaurant-appBanner',
                name: 'restaurantAppBanner',
                component: () => import('../../views/Restaurant/RestaurantAppBanner.vue'),
            },
              {
                path: 'restaurant-report',
                name: 'restaurantReport',
                component: () => import('../../views/Restaurant/RestaurantReport.vue'),
            },


        ],
    },
];

export default restaurantRoutes;
