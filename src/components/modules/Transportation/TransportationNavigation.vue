<template>
    <DropdownNav dropdownName="transportation" title="Transportation" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'transportationDashboard' }, displayName: 'Dashboard' },
    { route: { name: 'transportationUsers' }, displayName: 'Users' },
    { route: { name: 'transportationDriversAndRides' }, displayName: 'Drivers & Rides' },
    { route: { name: 'transportationVehiclesFleet' }, displayName: 'Vehicles / Fleet' },
    { route: { name: 'transportationBooking' }, displayName: 'Booking' },
    { route: { name: 'transportationRides' }, displayName: 'Rides' },
    { route: { name: 'transportationAutoAssignment' }, displayName: 'Auto Assignment' },
    { route: { name: 'transportationPricingAndFares' }, displayName: 'Pricing & Fares' },
    { route: { name: 'transportationDispatch' }, displayName: 'Dispatch' },
    { route: { name: 'transportationScheduledRides' }, displayName: 'Scheduled Rides' },
    { route: { name: 'transportationDispatchManagement' }, displayName: 'Delivery Management' },
    { route: { name: 'transportationRidersManagement' }, displayName: 'Riders Management' },
    { route: { name: 'transportationCustomerManagement' }, displayName: 'Customer Management' },
    { route: { name: 'transportationPricing' }, displayName: 'Pricing' },
    { route: { name: 'transportationVehicleHire' }, displayName: 'Vehicle Hire' },
    { route: { name: 'transportationBusBooking' }, displayName: 'Bus Booking' },
    { route: { name: 'transportationPayments' }, displayName: 'Payments & Wallet' },
    { route: { name: 'transportationAnalytics' }, displayName: 'Analytics & Reports' },
    { route: { name: 'transportationSettings' }, displayName: 'Settings' },
];
</script>

