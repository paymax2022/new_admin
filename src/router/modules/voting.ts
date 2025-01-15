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
                        component: () => import('../../views/Voting/Contest/Details/DetailLayout.vue'),
                        children: [
                            {
                                path: '',
                                name: 'votingContestDetail',
                                component: () => import('../../views/Voting/Contest/Details/VotingContestDetail.vue'),
                            },
                            {
                                path: 'contestant/:contestantId',
                                name: 'votingContestDetailContestant',
                                component: () => import('../../views/Voting/Contest/Details/VotingContestDetailContestant.vue'),
                            },
                            {
                                path: 'rounds',
                                name: 'votingContestDetailRounds',
                                component: () => import('../../views/Voting/Contest/Details/VotingContestDetailRounds.vue'),
                            },
                            {
                                path: 'prizes',
                                name: 'votingContestDetailPrizes',
                                component: () => import('../../views/Voting/Contest/Details/VotingContestDetailPrizes.vue'),
                            },
                            {
                                path: 'pricing',
                                name: 'votingContestDetailPricing',
                                component: () => import('../../views/Voting/Contest/Details/VotingContestDetailPricing.vue'),
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export default votingRoutes;
