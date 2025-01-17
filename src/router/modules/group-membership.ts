const groupMembershipRoutes = [
    {
        path: '/group-membership',
        // component:
        children: [
            {
                path: '',
                name: 'groupMembershipHome',
                component: () => import('../../views/GroupMembership/GroupMembershipHome.vue'),
            },
        ],
    },
];

export default groupMembershipRoutes;
