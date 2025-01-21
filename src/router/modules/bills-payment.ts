const billsPaymentRoutes = [
    {
        path: '/bills-payment',
        // component:
        children: [
            {
                path: '',
                name: 'billsPaymentHome',
                component: () => import('../../views/BillsPayment/BillsPaymentHome.vue'),
            },
            {
                path: 'airtime',
                name: 'billsPaymentAirtime',
                component: () => import('../../views/BillsPayment/BillsPaymentAitrtimeData.vue'),
            },
            {
                path: 'cabletv',
                name: 'billsPaymentCabletv',
                component: () => import('../../views/BillsPayment/BillsPaymentCabletv.vue'),
            },
            {
                path: 'prepaid-eletricity',
                name: 'billsPaymentPrepaidElectricity',
                component: () => import('../../views/BillsPayment/BillsPaymentPrepaidElectricity.vue'),
            },
            {
                path: 'postpaid-eletricity',
                name: 'billsPaymentPostpaidElectricity',
                component: () => import('../../views/BillsPayment/BillsPaymentPostpaidElectricity.vue'),
            }
        ],
    },
];

export default billsPaymentRoutes;
