<template>
    <DropdownNav dropdownName="delivery" title="Delivery" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'deliveryHome' }, displayName: 'Dashboard' },
    { route: { name: 'deliveryDeliveries' }, displayName: 'Deliveries' },
    { route: { name: 'deliveryDrivers' }, displayName: 'Drivers' },
    { route: { name: 'deliveryAutoAssignment' }, displayName: 'Auto assignment' },
    { route: { name: 'deliveryPricingFares' }, displayName: 'Pricing & Fares' },
    { route: { name: 'deliveryDispatch' }, displayName: 'Dispatch' },
    { route: { name: 'deliveryEarningsPayouts' }, displayName: 'Earnings & Payouts' },
    { route: { name: 'deliveryDisputes' }, displayName: 'Disputes' },
    { route: { name: 'deliveryReportsAnalytics' }, displayName: 'Reports & Analytics' },
    { route: { name: 'deliveryScheduledRides' }, displayName: 'Scheduled Rides' },
    { route: { name: 'deliveryRolesAudits' }, displayName: 'Roles & Audits' },
];
</script>
