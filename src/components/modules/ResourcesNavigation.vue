<template>
  <DropdownNav dropdownName="resourcesList" title="resources" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'resources' }, displayName: 'resources' },
];
</script>
