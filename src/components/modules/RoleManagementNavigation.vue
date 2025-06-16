<template>
    <DropdownNav dropdownName="roleList" title="Role Management" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'roles-manager' }, displayName: 'Role list' },
    // { route: { name: 'roles-manager' }, displayName: 'Role Manager' },
];
</script>
