<template>
  <DropdownNav dropdownName="subscriptionList" title="subscription" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'subscription-dashboard' }, displayName: 'subscription dashboard' },
  { route: { name: 'plans-tiers' }, displayName: 'plans & tiers' },
  { route: { name: 'invoice-center' }, displayName: 'invoice center' },
  { route: { name: 'payment-history' }, displayName: 'payment history' },
  { route: { name: 'failed-payments' }, displayName: 'failed payments' },
  { route: { name: 'subscription-settings' }, displayName: 'subscription settings' },
];
</script>