const newRestaurantsRoutes = [
    {
        path: '/new-restaurants',
        children: [
            {
                path: '',
                name: 'new-restaurants-dashboard',
                component: () => import('../../views/NewRestaurants/Dashboard.vue'),
            },
            {
                path: 'onboarding-approvals',
                name: 'new-restaurants-onboarding-approvals',
                component: () => import('../../views/NewRestaurants/OnboardingApprovals.vue'),
            },
            {
                path: 'restaurants-profile',
                name: 'new-restaurants-profile',
                component: () => import('../../views/NewRestaurants/RestaurantsProfile.vue'),
            },
            {
                path: 'live-orders',
                name: 'new-restaurants-live-orders',
                component: () => import('../../views/NewRestaurants/LiveOrders.vue'),
            },
            {
                path: 'rider-assignment',
                name: 'new-restaurants-rider-assignment',
                component: () => import('../../views/NewRestaurants/RiderAssignment.vue'),
            },
            {
                path: 'orders-needing-assignment',
                name: 'new-restaurants-orders-needing-assignment',
                component: () => import('../../views/NewRestaurants/OrdersNeedingAssignment.vue'),
            },
            {
                path: 'active-riders',
                name: 'new-restaurants-active-riders',
                component: () => import('../../views/NewRestaurants/ActiveRiders.vue'),
            },
            {
                path: 'delivery-settings',
                name: 'new-restaurants-delivery-settings',
                component: () => import('../../views/NewRestaurants/DeliverySettings.vue'),
            },
            {
                path: 'rider-registration-approval',
                name: 'new-restaurants-rider-registration-approval',
                component: () => import('../../views/NewRestaurants/RiderRegistrationApproval.vue'),
            },
            {
                path: 'rider-profiles',
                name: 'new-restaurants-rider-profiles',
                component: () => import('../../views/NewRestaurants/RiderProfiles.vue'),
            },
            {
                path: 'rider-performance-reports',
                name: 'new-restaurants-rider-performance-reports',
                component: () => import('../../views/NewRestaurants/RiderPerformanceReports.vue'),
            },
            {
                path: 'incentives',
                name: 'new-restaurants-incentives',
                component: () => import('../../views/NewRestaurants/Incentives.vue'),
            },
        ],
    },
];

export default newRestaurantsRoutes;

