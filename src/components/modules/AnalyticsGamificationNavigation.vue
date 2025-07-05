<template>
  <DropdownNav dropdownName="analyticsGamificationList" title="analytics & gamification" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'gamification' }, displayName: 'gamification' },
  { route: { name: 'reports-analytics' }, displayName: 'reports & analytics' },
];
</script> 