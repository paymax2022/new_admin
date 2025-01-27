<template>
    <DropdownNav dropdownName="delivery" title="Delivery" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'deliveryHome' }, displayName: 'Delivery Home' },
    { route: { name: 'orders' }, displayName: 'Orders' },
    { route: { name: 'riders' }, displayName: 'Riders' },
    { route: { name: 'customers' }, displayName: 'Customers' },
    { route: { name: 'manageComplaints' }, displayName: 'Manage Complaints' },
    // { route: { name: 'reviews' }, displayName: 'Reviews and Ratings' },
];
</script>
