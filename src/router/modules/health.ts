const healthRoutes = [
    {
        path: '/health',
        // component:
        children: [
            {
                path: '',
                name: 'healthHome',
                component: () => import('../../views/Health/HealthHome.vue'),
            },

            {
                path: 'doctorslist',
                name: 'doctorsList',
                component: () => import('../../views/Health/DoctorsList.vue'),
            },
            {
                path: 'patientlist',
                name: 'patientList',
                component: () => import('../../views/Health/PatientList.vue'),
            },
            {
                path: 'specialities',
                name: 'Specialities',
                component: () => import('../../views/Health/Specialities.vue'),
            },
            {
                path: 'review',
                name: 'reviewList',
                component: () => import('../../views/Health/ReviewList.vue'),
            },
            {
                path: 'complainlist',
                name: 'complainList',
                component: () => import('../../views/Health/Complain.vue'),
            },
            {
                path: 'contactlist',
                name: 'contactList',
                component: () => import('../../views/Health/ContactList.vue'),
            },
            {
                path: 'medicinelist',
                name: 'medicineList',
                component: () => import('../../views/Health/MedicineList.vue'),
            },
            {
                path: 'addresslist',
                name: 'addressList',
                component: () => import('../../views/Health/AddressList.vue'),
            },
            {
                path: 'pharmacylist',
                name: 'pharmacyList',
                component: () => import('../../views/Health/PharmacyList.vue'),
            },
            {
                path: 'pharmacyorder',
                name: 'pharmacyOrder',
                component: () => import('../../views/Health/PharmacyOrder.vue'),
            },
            // {
            //     path: 'doctor-subscription',
            //     name: 'doctorSubscription',
            //     component: () => import('../../views/Health/DoctorSubscription.vue'),
            // },
            {
                path: 'appointment',
                name: 'appointmentList',
                component: () => import('../../views/Health/AppointmentTable.vue'),
            },
            {
                path: 'pending-payment',
                name: 'pendingPayment',
                component: () => import('../../views/Health/PendingPayments.vue'),
            },
            {
                path: 'add-payment',
                name: 'addPayment',
                component: () => import('../../views/Health/AddPayment.vue'),
            },
            {
                path: 'subscription',
                name: 'subscriptionPage',
                component: () => import('../../views/Health/SubscriptionPage.vue'),
            },
            {
                path: 'save-payment',
                name: 'savePayment',
                component: () => import('../../views/Health/SavePayment.vue'),
            },
            {
                path: 'subscriber-list',
                name: 'subscriberListPage',
                component: () => import('../../views/Health/SubscriberList.vue'),
            },
            {
                path: 'view-subscription',
                name: 'viewSubPage',
                component: () => import('../../views/Health/ViewSubscription.vue'),
            },
            {
                path: 'complete-payment',
                name: 'completePayment',
                component: () => import('../../views/Health/CompletePayment.vue'),
            },
            {
                path: 'banner-page',
                name: 'bannerPage',
                component: () => import('../../views/Health/BannerPage.vue'),
            },
            {
                path: 'payment-gateway',
                name: 'paymentPage',
                component: () => import('../../views/Health/PaymentGateway.vue'),
            },
        ],
    },
];

export default healthRoutes;
