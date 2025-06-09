<template>
    <DropdownNav dropdownName="restaurant" title="Restaurant" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

    const links = [
        { route: { name: 'restaurantHome' }, displayName: 'Restaurant Home' },
        { route: { name: 'restaurantList' }, displayName: ' List' },
        { route: { name: 'restaurantCategories' }, displayName: 'Categories' },
        { route: { name: 'restaurantMenu' }, displayName: 'Menu Items' },
        { route: { name: 'restaurantCuisines' }, displayName: 'Cuisines' },
        { route: { name: 'restaurantTimeSlots' }, displayName: 'Time Slot' },
        { route: { name: 'restaurantTable' }, displayName: 'Table' },
        { route: { name: 'restaurantRatings' }, displayName: 'Ratings' },
        { route: { name: 'restaurantReservations' }, displayName: 'Reservations' },
        { route: { name: 'restaurantOrders' }, displayName: 'Orders' },
        { route: { name: 'restaurantUsers' }, displayName: 'Users' },
        { route: { name: 'restaurantCustomers' }, displayName: 'Customers' },
        { route: { name: 'restaurantOwners' }, displayName: 'Restaurannt Owners' },
    ];
</script>
