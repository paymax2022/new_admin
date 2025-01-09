const usersMgtRoutes = [
    {
        path: '/users-mgt',
        // component:
        children: [
            {
                path: '',
                name: 'usersMgtHome',
                component: () => import('../../views/UsersMgt/UsersMgtHome.vue'),
            },
        ],
    },
];

export default usersMgtRoutes;
