<template>
  <DropdownNav dropdownName="votingManagement" title="Voting" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'voting-dashboard' }, displayName: 'Voting Dashboard' },
  { route: { name: 'voting-contest-manager' }, displayName: 'Contest Manager' },
  { route: { name: 'voting-contestants' }, displayName: 'Contestants' },
  { route: { name: 'voting' }, displayName: 'Voting' },
  { route: { name: 'voting-badges' }, displayName: 'Badges' },
  { route: { name: 'voting-referrals' }, displayName: 'Referrals' },
  { route: { name: 'voting-eviction' }, displayName: 'Eviction' },
  { route: { name: 'voting-notifications' }, displayName: 'Notification' },
  { route: { name: 'voting-certificates' }, displayName: 'Certificates' },
  { route: { name: 'voting-analytics' }, displayName: 'Analytics' },
  { route: { name: 'voting-settings' }, displayName: 'Settings' },
];
</script>

