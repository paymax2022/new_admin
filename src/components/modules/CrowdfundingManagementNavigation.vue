<template>
  <DropdownNav
    dropdownName="newCrowdfundingManagement"
    title="Crowdfunding Mgt"
    :iconComponent="IconMenuComponents"
    :links="links"
  />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'new-crowdfunding-dashboard' }, displayName: 'Dashboard' },
  { route: { name: 'new-crowdfunding-campaigns' }, displayName: 'Campaigns' },
  { route: { name: 'new-crowdfunding-users' }, displayName: 'Users' },
  { route: { name: 'new-crowdfunding-wallet' }, displayName: 'Wallet' },
  { route: { name: 'new-crowdfunding-support' }, displayName: 'Support' },
  { route: { name: 'new-crowdfunding-promotion' }, displayName: 'Promotion' },
  { route: { name: 'new-crowdfunding-admin-users' }, displayName: 'Admin Users' },
];
</script>

