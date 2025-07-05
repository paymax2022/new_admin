<template>
  <DropdownNav dropdownName="groupList" title="group" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  // Group
  { route: { name: 'overview' }, displayName: 'overview' },
  { route: { name: 'activity-feed' }, displayName: 'activity feed' },
  { route: { name: 'widgets' }, displayName: 'widgets' },
  { route: { name: 'directory' }, displayName: 'directory' },
  { route: { name: 'activity-logs' }, displayName: 'Activity Logs' }
  
];
</script>
