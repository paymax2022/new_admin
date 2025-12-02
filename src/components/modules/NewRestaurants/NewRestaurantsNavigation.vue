<template>
    <DropdownNav dropdownName="new-restaurants" title="New Restaurants" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

    const links = [
        { route: { name: 'new-restaurants-dashboard' }, displayName: 'Dashboard' },
        { route: { name: 'new-restaurants-onboarding-approvals' }, displayName: 'Onboarding & Approvals' },
        { route: { name: 'new-restaurants-profile' }, displayName: 'Restaurants Profile' },
        { route: { name: 'new-restaurants-live-orders' }, displayName: 'Live Orders' },
        { route: { name: 'new-restaurants-rider-assignment' }, displayName: 'Rider Assignment' },
        { route: { name: 'new-restaurants-delivery-settings' }, displayName: 'Delivery Settings' },
        { route: { name: 'new-restaurants-rider-registration-approval' }, displayName: 'Rider Registration & Approval' },
        { route: { name: 'new-restaurants-rider-profiles' }, displayName: 'Rider Profiles' },
        { route: { name: 'new-restaurants-rider-performance-reports' }, displayName: 'Performance Reports' },
        { route: { name: 'new-restaurants-incentives' }, displayName: 'Incentives' },
    ];
</script>

