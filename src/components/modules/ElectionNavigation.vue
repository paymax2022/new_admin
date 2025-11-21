<template>
  <DropdownNav
    dropdownName="electionManagement"
    title="Election"
    :iconComponent="IconMenuComponents"
    :links="links"
  />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'election-dashboard' }, displayName: 'Dashboard' },
  { route: { name: 'election-live-monitoring' }, displayName: 'Live Monitoring' },
  { route: { name: 'election-import-members' }, displayName: 'Import Members' },
  { route: { name: 'election-directory' }, displayName: 'Directory' },
  { route: { name: 'election-voter-eligibility' }, displayName: 'Voter Eligibility' },
  { route: { name: 'election-create-election' }, displayName: 'Create Election' },
  { route: { name: 'election-manage-elections' }, displayName: 'Manage Elections' },
  { route: { name: 'election-results' }, displayName: 'Results' },
  { route: { name: 'election-applications' }, displayName: 'Applications' },
  { route: { name: 'election-manual-registration' }, displayName: 'Manual Registration' },
  { route: { name: 'election-complaints-management' }, displayName: 'Complaints Management' },
  { route: { name: 'election-notifications' }, displayName: 'Notifications' },
];
</script>

