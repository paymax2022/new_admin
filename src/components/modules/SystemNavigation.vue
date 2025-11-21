<template>
  <DropdownNav dropdownName="systemList" title="System" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'system-settings' }, displayName: 'System Settings' },
  { route: { name: 'school-settings' }, displayName: 'School Settings' },
  { route: { name: 'multicurrency-settings' }, displayName: 'Multicurrency - Audit Logs' },
  { route: { name: 'multicurrency-system-settings' }, displayName: 'Multicurrency - Settings' },
  { route: { name: 'new-crowdfunding-settings' }, displayName: 'Crowdfunding Settings' },
  { route: { name: 'voting-settings' }, displayName: 'Voting Settings' },
  { route: { name: 'backup-restore' }, displayName: 'Backup & Restore' },
];
</script>
