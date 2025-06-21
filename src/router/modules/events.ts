const eventsRoutes = [
    {
        path: '/events',
        // component:
        children: [
            {
                path: '',
                name: 'eventsHome',
                component: () => import('../../views/Events/EventsHome.vue'),
            },
            {
                path: 'event-category',
                name: 'eventsCategory',
                component: () => import('../../views/Events/EventCategories.vue'),
            },
            {
                path: 'category-view',
                name: 'viewCategory',
                component: () => import('../../views/Events/CategoriesView.vue'),
            },
            {
                path: 'category-edit',
                name: 'editCategory',
                component: () => import('../../views/Events/CategoriesEdit.vue'),
            },
            {
                path: 'category-create',
                name: 'createCategory',
                component: () => import('../../views/Events/CategoriesCreate.vue'),
            },
            {
                path: 'eventPage',
                name: 'eventPage',
                component: () => import('../../views/Events/EventPage.vue'),
            },
            {
                path: 'edit-event',
                name: 'editEvent',
                component: () => import('../../views/Events/EditEvent.vue'),
            },
            {
                path: 'add-event',
                name: 'addEvent',
                component: () => import('../../views/Events/CreateEvent.vue'),
            },

             {
                path: 'event-view',
                name: 'eventView',
                component: () => import('../../views/Events/newEventView.vue'),
            },
            {
                path: 'bookingsPage',
                name: 'bookingsPage',
                component: () => import('../../views/Events/EventBookings.vue'),
            },
            {
                path: 'bookings-View',
                name: 'bookingsView',
                component: () => import('../../views/Events/BookingsView.vue'),
            },
             {
                path: 'bookings-Edit',
                name: 'bookingsEdit',
                component: () => import('../../views/Events/BookingsEdit.vue'),
            },
            {
                path: 'commissionPage',
                name: 'commissionPage',
                component: () => import('../../views/Events/EventCommission.vue'),
            },
            {
                path: 'commission-view',
                name: 'commissionView',
                component: () => import('../../views/Events/CommissionView.vue'),
            },
            {
                path: 'venuesPage',
                name: 'venuesPage',
                component: () => import('../../views/Events/EventsVenue.vue'),
            },
            {
                path: 'edit-venue',
                name: 'editVenue',
                component: () => import('../../views/Events/EditVenue.vue'),
            },
            {
                path: 'view-venue',
                name: 'viewVenue',
                component: () => import('../../views/Events/ViewVenue.vue'),
            },
            {
                path: 'bannerPage',
                name: 'bannerPage',
                component: () => import('../../views/Events/EventsBanner.vue'),
            },
            {
                path: 'view-banner',
                name: 'viewBanner',
                component: () => import('../../views/Events/ViewBanner.vue'),
            },
              {
                path: 'edit-banner',
                name: 'editBanner',
                component: () => import('../../views/Events/EditBanner.vue'),
            },
        ],
    },
];

export default eventsRoutes;
