<template>
  <DropdownNav dropdownName="disputeList" title="Dispute" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'dispute-management' }, displayName: 'Dispute Management' },
  { route: { name: 'activity-logs' }, displayName: 'Activity Logs' },
  { route: { name: 'export-reports' }, displayName: 'Export Reports' },
];
</script>
