<template>
  <DropdownNav
    dropdownName="multicurrencyManagement"
    title="Multicurrency"
    :iconComponent="IconMenuComponents"
    :links="links"
  />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'multicurrency-dashboard' }, displayName: 'Dashboard' },
  { route: { name: 'multicurrency-users' }, displayName: 'Users' },
  { route: { name: 'multicurrency-roles-permissions' }, displayName: 'Roles & Permissions' },
  { route: { name: 'multicurrency-transactions' }, displayName: 'Transactions' },
  { route: { name: 'multicurrency-virtual-cards' }, displayName: 'Virtual Cards' },
  { route: { name: 'multicurrency-support-tickets' }, displayName: 'Support Tickets' }
];
</script>

