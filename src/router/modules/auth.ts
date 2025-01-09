const authRoutes = [
    {
        path: '/auth',
        meta: { layout: 'auth' },
        children: [
            {
                path: '/login',
                name: 'AuthLogin',
                // component:
            },
            {
                path: '/register',
                name: 'AuthRegister',
                // component:
            },
            {
                path: '/forgot-password',
                name: 'AuthForgotPassword',
                // component:
            },
            {
                path: '/reset-password/:token',
                name: 'AuthResetPassword',
                // component:
            },
        ],
    },
];

export default authRoutes;
