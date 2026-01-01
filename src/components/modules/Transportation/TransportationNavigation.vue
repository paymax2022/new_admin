<template>
    <DropdownNav dropdownName="transportation" title="Transportation" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'transportationDashboard' }, displayName: 'Dashboard' },
    { route: { name: 'transportationDeliveries' }, displayName: 'Deliveries' },
    { route: { name: 'transportationRiders' }, displayName: 'Riders' },
    { route: { name: 'transportationCustomers' }, displayName: 'Customers' },
    { route: { name: 'transportationPricing' }, displayName: 'Pricing' },
    { route: { name: 'transportationPayments' }, displayName: 'Payments' },
    { route: { name: 'transportationRefunds' }, displayName: 'Refunds' },
    { route: { name: 'transportationReports' }, displayName: 'Reports' },
    { route: { name: 'transportationSettings' }, displayName: 'Settings' },
];
</script>

