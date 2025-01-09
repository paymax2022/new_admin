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
        ],
    },
];

export default billsPaymentRoutes;
