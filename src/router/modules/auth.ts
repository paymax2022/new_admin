const authRoutes = [
    {
        path: '/auth',
        meta: { layout: 'auth' },
        children: [
            {
                path: 'login',
                name: 'authLogin',
                component: () => import('../../views/Auth/AuthLogin.vue'),
            },
            {
                path: 'password-reset',
                name: 'passwordReset',
                component: () => import('../../views/Auth/PasswordReset.vue'),
            },
            {
                path: '2fa-setup',
                name: 'twoFactorSetup',
                component: () => import('../../views/Auth/TwoFactorSetup.vue'),
            },
            // {
            //     path: 'register',
            //     name: 'authRegister',
            //     component: () => import('../../views/Auth/AuthRegister.vue'),
            // },
            {
                path: 'forgot-password',
                name: 'authForgotPassword',
                component: () => import('../../views/Auth/AuthForgotPassword.vue'),
            },
            {
                path: 'reset-password/:token',
                name: 'authResetPassword',
                component: () => import('../../views/Auth/AuthResetPassword.vue'),
            },
        ],
    },
];

export default authRoutes;
