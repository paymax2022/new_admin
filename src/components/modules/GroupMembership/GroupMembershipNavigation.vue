<template>
    <DropdownNav dropdownName="groupMembership" title="Group Membership" :iconComponent="IconMenuComponents"
        :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'groupMembershipHome' }, displayName: 'Group Membership Home' },
    { route: { name: 'groupMembershipGroupHome' }, displayName: 'Groups / List' },
    { route: { name: 'groupMembershipGroupCreate' }, displayName: 'Groups / Create' },
];
</script>
