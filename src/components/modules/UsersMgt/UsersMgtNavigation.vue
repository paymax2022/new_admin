<template>
    <DropdownNav dropdownName="usersMgt" title="Users Mgt" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    { route: { name: 'usersMgtHome' }, displayName: 'Users Mgt Home' },
];
</script>
