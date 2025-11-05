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
                path: 'dashboard',
                name: 'voting-dashboard',
                component: () => import('../../views/Voting/VotingDashboardView.vue'),
            },
            {
                path: 'contest-manager',
                name: 'voting-contest-manager',
                component: () => import('../../views/Voting/ContestManagerView.vue'),
            },
            {
                path: 'contestants',
                name: 'voting-contestants',
                component: () => import('../../views/Voting/VotingContestantsView.vue'),
            },
            {
                path: 'voting',
                name: 'voting',
                component: () => import('../../views/Voting/VotingView.vue'),
            },
            {
                path: 'badges',
                name: 'voting-badges',
                component: () => import('../../views/Voting/BadgesView.vue'),
            },
            {
                path: 'referrals',
                name: 'voting-referrals',
                component: () => import('../../views/Voting/ReferralsView.vue'),
            },
            {
                path: 'eviction',
                name: 'voting-eviction',
                component: () => import('../../views/Voting/EvictionView.vue'),
            },
            {
                path: 'notifications',
                name: 'voting-notifications',
                component: () => import('../../views/Voting/NotificationsView.vue'),
            },
            {
                path: 'certificates',
                name: 'voting-certificates',
                component: () => import('../../views/Voting/CertificatesView.vue'),
            },
            {
                path: 'analytics',
                name: 'voting-analytics',
                component: () => import('../../views/Voting/AnalyticsView.vue'),
            },
            {
                path: 'results',
                name: 'voting-results',
                component: () => import('../../views/Voting/VotingResultsView.vue'),
            },
            {
                path: 'settings',
                name: 'voting-settings',
                component: () => import('../../views/Voting/VotingSettingsView.vue'),
            },
            {
                path: 'contests',
                name: 'voting-contests',
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
