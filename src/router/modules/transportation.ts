const transportationRoutes = [
    {
        path: '/transportation',
        component: () => import('../../views/Transportation/TransportationLayout.vue'),
        children: [
            {
                path: '',
                name: 'transportationDashboard',
                component: () => import('../../views/Transportation/Dashboard.vue'),
            },
            {
                path: 'users',
                name: 'transportationUsers',
                component: () => import('../../views/Transportation/Users.vue'),
            },
            {
                path: 'deliveries',
                redirect: { name: 'transportationUsers' },
            },
            {
                path: 'drivers-and-rides',
                name: 'transportationDriversAndRides',
                component: () => import('../../views/Transportation/Riders.vue'),
            },
            {
                path: 'drivers-and-rides/driver/:id',
                name: 'transportationDriverProfile',
                component: () => import('../../views/Transportation/DriverProfile.vue'),
            },
            {
                path: 'riders',
                redirect: { name: 'transportationDriversAndRides' },
            },
            {
                path: 'vehicles-fleet',
                name: 'transportationVehiclesFleet',
                component: () => import('../../views/Transportation/VehiclesFleet.vue'),
            },
            {
                path: 'booking',
                name: 'transportationBooking',
                component: () => import('../../views/Transportation/Bookings.vue'),
            },
            {
                path: 'rides',
                name: 'transportationRides',
                component: () => import('../../views/Transportation/Rides.vue'),
            },
            {
                path: 'refunds',
                redirect: { name: 'transportationAutoAssignment' },
            },
            {
                path: 'auto-assignment',
                name: 'transportationAutoAssignment',
                component: () => import('../../views/Transportation/AutoAssignment.vue'),
            },
            {
                path: 'reports',
                redirect: { name: 'transportationPricingAndFares' },
            },
            {
                path: 'pricing-and-fares',
                name: 'transportationPricingAndFares',
                component: () => import('../../views/Transportation/PricingAndFares.vue'),
            },
            {
                path: 'settings',
                redirect: { name: 'transportationDispatch' },
            },
            {
                path: 'dispatch',
                name: 'transportationDispatch',
                component: () => import('../../views/Transportation/Dispatch.vue'),
            },
            {
                path: 'scheduled-rides',
                name: 'transportationScheduledRides',
                component: () => import('../../views/Transportation/ScheduledRides.vue'),
            },
            {
                path: 'delivery-management',
                name: 'transportationDispatchManagement',
                component: () => import('../../views/Transportation/DispatchManagement.vue'),
            },
            {
                path: 'riders-management',
                name: 'transportationRidersManagement',
                component: () => import('../../views/Transportation/RidersManagement.vue'),
            },
            {
                path: 'customers',
                name: 'transportationCustomerManagement',
                component: () => import('../../views/Transportation/CustomerManagement.vue'),
            },
            {
                path: 'pricing',
                name: 'transportationPricing',
                component: () => import('../../views/Transportation/Pricing.vue'),
            },
            {
                path: 'vehicle-hire',
                name: 'transportationVehicleHire',
                component: () => import('../../views/Transportation/VehicleHire.vue'),
            },
            {
                path: 'bus-booking',
                name: 'transportationBusBooking',
                component: () => import('../../views/Transportation/BusBooking.vue'),
            },
            {
                path: 'payments',
                name: 'transportationPayments',
                component: () => import('../../views/Transportation/Payments.vue'),
            },
            {
                path: 'analytics',
                name: 'transportationAnalytics',
                component: () => import('../../views/Transportation/Analytics.vue'),
            },
            {
                path: 'settings',
                name: 'transportationSettings',
                component: () => import('../../views/Transportation/Settings.vue'),
            },
            {
                path: 'riders-management/rider/:id',
                name: 'transportationRiderProfile',
                component: () => import('../../views/Transportation/RiderProfile.vue'),
            },
        ],
    },
];

export default transportationRoutes;

