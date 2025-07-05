<template>
  <DropdownNav dropdownName="groupManagementList" title="group management" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'group-list' }, displayName: 'group list' },
  { route: { name: 'manage-group-members' }, displayName: 'manage members' },
];
</script> 