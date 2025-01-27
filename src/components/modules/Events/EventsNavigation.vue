<template>
    <DropdownNav dropdownName="events" title="Events" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'eventsHome' }, displayName: 'Events Home' },
    { route: { name: 'totalEvents' }, displayName: 'All Events' },
    { route: { name: 'bookings' }, displayName: 'Bookings' },
    { route: { name: 'tickets' }, displayName: 'Tickets' },
    { route: { name: 'vendors' }, displayName: 'Vendors' },
    { route: { name: 'vendorComplaints' }, displayName: 'Vendor Complaints' },
    { route: { name: 'customerFeedback' }, displayName: ' Customers Feedback' },
];
</script>
