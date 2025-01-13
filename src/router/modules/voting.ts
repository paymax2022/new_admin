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
            {
                path: 'contests',
                // component:
                children: [
                    {
                        path: '',
                        name: 'votingContestHome',
                        component: () => import('../../views/Voting/Contest/VotingContestHome.vue'),
                    },
                    {
                        path: 'create',
                        name: 'votingContestCreate',
                        component: () => import('../../views/Voting/Contest/VotingContestCreate.vue'),
                    },
                    {
                        path: ':contestId/edit',
                        name: 'votingContestEdit',
                        component: () => import('../../views/Voting/Contest/VotingContestEdit.vue'),
                    },
                    {
                        path: ':contestId',
                        name: 'votingContestDetail',
                        component: () => import('../../views/Voting/Contest/VotingContestDetail.vue'),
                    },
                ],
            },
        ],
    },
];

export default votingRoutes;
