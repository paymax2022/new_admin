<template>
  <DropdownNav dropdownName="financialList" title="Financial" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'transactions' }, displayName: 'Transactions' },
  { route: { name: 'transactions-mgt' }, displayName: 'Transaction Mgt' },
  { route: { name: 'wallets' }, displayName: 'Wallets' },
  { route: { name: 'commission-earnings' }, displayName: 'Commission' },
  { route: { name: 'payouts-management' }, displayName: 'Payouts' }
];
</script>
