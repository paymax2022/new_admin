<template>
    <DropdownNav dropdownName="visitorMgt" title="Visitor Mgt" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

    const links = [
        { route: { name: 'visitorMgtHome' }, displayName: 'Visitor Mgt Home' },
        { route: { name: 'visitorMgtTicket' }, displayName: 'Tickets' },
    ];
</script>
