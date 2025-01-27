const votingRoutes = [
    {
        path: '/voting',
        // component:
        children: [
            {
                path: '',
                name: 'votingHome',
                component: () => import('../../views/Voting/VotingHome.vue'),
            },
        ],
    },
];

export default votingRoutes;
