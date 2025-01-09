const transactionsRoutes = [
    {
        path: '/transactions',
        // component:
        children: [
            {
                path: '',
                name: 'transactionsHome',
                component: () => import('../../views/Transactions/TransactionsHome.vue'),
            },
        ],
    },
];

export default transactionsRoutes;
