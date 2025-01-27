<template>
    <DropdownNav dropdownName="restaurant" title="Restaurant" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'restaurantHome' }, displayName: 'Home' },
    { route: { name: 'order' }, displayName: 'Order' },
    { route: { name: 'tableReservation' }, displayName: 'Table Resevation' },
    { route: { name: 'reports' }, displayName: 'Reports' },
    { route: { name: 'loyaltyPoints' }, displayName: 'Loyalty Points' },
    { route: { name: 'tableOrdering' }, displayName: 'Table Ordering' },
    { route: { name: 'printer' }, displayName: 'Printer' },
];
</script>
