<template>
  <DropdownNav dropdownName="meetingsList" title="meetings" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'meeting-dashboard' }, displayName: 'dashboard' },
  { route: { name: 'agenda-builder' }, displayName: 'agenda builder' },
  { route: { name: 'documents' }, displayName: 'documents' },
  { route: { name: 'action-points' }, displayName: 'action points' },
  { route: { name: 'archive' }, displayName: 'archive' },
];
</script> 