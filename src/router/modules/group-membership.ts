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
            {
                path: 'groups',
                // component:
                children: [
                    {
                        path: '',
                        name: 'groupMembershipGroupHome',
                        component: () => import('../../views/GroupMembership/Group/GroupHome.vue'),
                    },
                    {
                        path: 'create',
                        name: 'groupMembershipGroupCreate',
                        component: () => import('../../views/GroupMembership/Group/GroupCreate.vue'),
                    },
                    {
                        path: ':groupId/edit',
                        name: 'groupMembershipGroupEdit',
                        component: () => import('../../views/GroupMembership/Group/GroupEdit.vue'),
                    },
                    {
                        path: ':groupId',
                        name: 'groupMembershipGroupDetail',
                        component: () => import('../../views/GroupMembership/Group/GroupDetail.vue'),
                    },
                ],
            },
        ],
    },
];

export default groupMembershipRoutes;
