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
                path: 'edit-restaurant',
                name: 'editRestaurant',
                component: () => import('../../views/Restaurant/EditRestaurantList.vue'),
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
                path: 'edit-categories',
                name: 'editCategories',
                component: () => import('../../views/Restaurant/EditCategory.vue'),
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
                path: 'edit-menu',
                name: 'editMenu',
                component: () => import('../../views/Restaurant/EditMenuItem.vue'),
            },
            {
                path: 'view-menu',
                name: 'viewMenu',
                component: () => import('../../views/Restaurant/ViewMenu.vue'),
            },
             {
                path: 'variant-menu',
                name: 'variantMenu',
                component: () => import('../../views/Restaurant/MenuVariant.vue'),
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
                path: 'edit-cuisines',
                name: 'editCuisines',
                component: () => import('../../views/Restaurant/EditCuisine.vue'),
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
                path: 'edit-time-slot',
                name: 'editTimeSlot',
                component: () => import('../../views/Restaurant/EditTime.vue'),
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
                path: 'edit-table',
                name: 'editTable',
                component: () => import('../../views/Restaurant/EditTable.vue'),
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
                path: 'view-reservation',
                name: 'viewReservation',
                component: () => import('../../views/Restaurant/ViewReservation.vue'),
            },
             {
                path: 'edit-reservation',
                name: 'editReservation',
                component: () => import('../../views/Restaurant/EditReservation.vue'),
            },
            {
                path: 'restaurant-orders',
                name: 'restaurantOrders',
                component: () => import('../../views/Restaurant/RestaurantOrders.vue'),
            },
            {
                path: 'view-order',
                name: 'viewOrder',
                component: () => import('../../views/Restaurant/ViewOrder.vue'),
            },
            {
                path: 'restaurant-users',
                name: 'restaurantUsers',
                component: () => import('../../views/Restaurant/RestaurantUsers.vue'),
            },
             {
                path: 'create-user',
                name: 'createUser',
                component: () => import('../../views/Restaurant/CreateUser.vue'),
            },
           {
                path: 'view-user',
                name: 'viewUser',
                component: () => import('../../views/Restaurant/ViewUser.vue'),
            },
            {
                path: 'edit-user',
                name: 'editUser',
                component: () => import('../../views/Restaurant/EditUser.vue'),
            },
            {
                path: 'restaurant-customers',
                name: 'restaurantCustomers',
                component: () => import('../../views/Restaurant/RestaurantCustomers.vue'),
            },
            {
                path: 'create-customer',
                name: 'createCustomer',
                component: () => import('../../views/Restaurant/CreateCustomers.vue'),
            },
            {
                path: 'edit-customer',
                name: 'editCustomer',
                component: () => import('../../views/Restaurant/EditCustomers.vue'),
            },
            {
                path: 'view-customer',
                name: 'viewCustomer',
                component: () => import('../../views/Restaurant/ViewCustomers.vue'),
            },

            {
                path: 'restaurant-owners',
                name: 'restaurantOwners',
                component: () => import('../../views/Restaurant/RestaurantOwners.vue'),
            },
            {
                path: 'create-restaurant-owner',
                name: 'createRestaurantOwner',
                component: () => import('../../views/Restaurant/CreateRestaurantOwner.vue'),
            },
             {
                path: 'edit-restaurant-owner',
                name: 'editRestaurantOwner',
                component: () => import('../../views/Restaurant/EditRestaurantOwner.vue'),
            },
             {
                path: 'view-owner',
                name: 'viewOwner',
                component: () => import('../../views/Restaurant/ViewRestaurantOwner.vue'),
            },
            {
                path: 'restaurant-delivery-agents',
                name: 'restaurantDeliveryAgents',
                component: () => import('../../views/Restaurant/RestaurantDeliveryAgent.vue'),
            },
            {
                path: 'create-delivery-agents',
                name: 'createDeliveryAgents',
                component: () => import('../../views/Restaurant/CreateDeliveryAgent.vue'),
            },
            {
                path: 'edit-delivery-agents',
                name: 'editDeliveryAgents',
                component: () => import('../../views/Restaurant/EditDeliveryAgent.vue'),
            },
            {
                path: 'view-delivery-agent',
                name: 'viewDeliveryAgent',
                component: () => import('../../views/Restaurant/ViewDeliveryAgent.vue'),
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
                path: 'edit-appBanner',
                name: 'editAppBanner',
                component: () => import('../../views/Restaurant/EditAppBanner.vue'),
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
