<template>
  <DropdownNav dropdownName="systemList" title="System" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'system-settings' }, displayName: 'System Settings' },
  { route: { name: 'backup-restore' }, displayName: 'Backup & Restore' },
];
</script>
