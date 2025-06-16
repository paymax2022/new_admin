<template>
    <DropdownNav dropdownName="crowdfunding" title="Crowdfunding" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

    const links = [
        { route: { name: 'crowdfundingHome' }, displayName: 'Crowdfunding Home' },
        { route: { name: 'crowdfundingAll' }, displayName: 'All' },
        { route: { name: 'crowdfundingPending' }, displayName: 'Pending' },
        { route: { name: 'crowdfundingRunning' }, displayName: 'Running' },
        { route: { name: 'crowdfundingCompleted' }, displayName: 'Completed' },
        { route: { name: 'crowdfundingRejected' }, displayName: 'Rejected' },
        { route: { name: 'crowdfundingExpired' }, displayName: 'Expired' },
        { route: { name: 'crowdfundingExtend' }, displayName: 'Extended' },
        { route: { name: 'crowdfundingReviews' }, displayName: 'Reviews' },
    ];
</script>
