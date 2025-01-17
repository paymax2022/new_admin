<template>
    <DropdownNav dropdownName="visitorMgt" title="Visitor Mgt" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

    const links = [
        { route: { name: 'visitorMgtHome' }, displayName: 'Visitor Mgt Home' },
        { route: { name: 'visitorMgtTicket' }, displayName: 'Tickets' },
        { route: { name: 'visitorRealTimeAcess' }, displayName: 'Real Time Access' },
        { route: { name: 'visitorMessagePage' }, displayName: 'Message' },
        { route: { name: 'addressPage' }, displayName: 'Address' },
        { route: { name: 'securityAlertPage' }, displayName: 'Security Alerts' },
        { route: { name: 'accessCardsPage' }, displayName: 'Access Cards' },
        { route: { name: 'vehicleTagPage' }, displayName: 'Vehicle Tags' },
        { route: { name: 'visitorDependantPage' }, displayName: 'Dependants' },
       
    ];
</script>
