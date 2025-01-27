const insuranceRoutes = [
    {
        path: '/insurance',
        // component:
        children: [
            {
                path: '',
                name: 'insuranceHome',
                component: () => import('../../views/Insurance/InsuranceHome.vue'),
            },
        ],
    },
];

export default insuranceRoutes;
