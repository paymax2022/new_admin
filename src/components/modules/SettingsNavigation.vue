<template>
  <DropdownNav dropdownName="settingsList" title="settings" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'settings' }, displayName: 'settings' },
  { route: { name: 'help-support' }, displayName: 'help & support' },
];
</script>
