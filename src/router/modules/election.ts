import type { RouteRecordRaw } from 'vue-router';

const electionRoutes: RouteRecordRaw[] = [
  {
    path: '/election',
    children: [
      {
        path: '',
        name: 'election-dashboard',
        component: () => import('../../views/Election/Dashboard.vue'),
      },
      {
        path: 'live-monitoring',
        name: 'election-live-monitoring',
        component: () => import('../../views/Election/LiveMonitoring.vue'),
      },
      {
        path: 'results',
        name: 'election-results',
        component: () => import('../../views/Election/Results.vue'),
      },
      {
        path: 'manual-registration',
        name: 'election-manual-registration',
        component: () => import('../../views/Election/ManualRegistration.vue'),
      },
      {
        path: 'complaints',
        name: 'election-complaints-management',
        component: () => import('../../views/Election/ComplaintsManagement.vue'),
      },
      {
        path: 'notifications',
        name: 'election-notifications',
        component: () => import('../../views/Election/Notifications.vue'),
      },
      {
        path: 'applications',
        name: 'election-applications',
        component: () => import('../../views/Election/Applications.vue'),
      },
      {
        path: 'import-members',
        name: 'election-import-members',
        component: () => import('../../views/Election/ImportMembers.vue'),
      },
      {
        path: 'directory',
        name: 'election-directory',
        component: () => import('../../views/Election/Directory.vue'),
      },
      {
        path: 'voter-eligibility',
        name: 'election-voter-eligibility',
        component: () => import('../../views/Election/VoterEligibility.vue'),
      },
      {
        path: 'create-election',
        name: 'election-create-election',
        component: () => import('../../views/Election/CreateElection.vue'),
      },
      {
        path: 'manage-elections',
        name: 'election-manage-elections',
        component: () => import('../../views/Election/ManageElections.vue'),
      },
    ],
  },
];

export default electionRoutes;

