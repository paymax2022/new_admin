<template>
  <DropdownNav dropdownName="schoolList" title="Schools" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'school-dashboard' }, displayName: 'School Dashboard' },
  { route: { name: 'school-management' }, displayName: 'School Management' },
  { route: { name: 'revenue-monitoring' }, displayName: 'Revenue Monitoring' },
  { route: { name: 'transaction' }, displayName: 'Transaction' },
  { route: { name: 'support-tickets' }, displayName: 'Support Tickets' },
  { route: { name: 'dispute-resolution' }, displayName: 'Dispute Resolution' },
];
</script>


