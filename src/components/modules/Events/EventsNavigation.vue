<template>
    <DropdownNav dropdownName="events" title="Events" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

    const links = [
        { route: { name: 'eventsHome' }, displayName: 'Events Home' },
        { route: { name: 'eventsCategory' }, displayName: 'Event Categories' },
        { route: { name: 'eventPage' }, displayName: 'Event' },
        { route: { name: 'bookingsPage' }, displayName: 'Bookings' },
        { route: { name: 'commissionPage' }, displayName: 'Commission' },
        { route: { name: 'venuesPage' }, displayName: 'Venues' },
        { route: { name: 'bannerPage' }, displayName: 'Banners' },

    ];
</script>
