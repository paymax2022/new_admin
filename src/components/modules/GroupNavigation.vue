<template>
  <DropdownNav
    dropdownName="groupNav"
    title="Groups and Association"
    :iconComponent="IconMenuComponents"
    :links="links"
  />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  { route: { name: 'overview' }, displayName: 'Group' },
  { route: { name: 'subscription-dashboard' }, displayName: 'Subscription' },
  { route: { name: 'group-list' }, displayName: 'Group Management' },
  { route: { name: 'communication' }, displayName: 'Communication' },
  { route: { name: 'polls-surveys' }, displayName: 'Polls & Surveys' },
  { route: { name: 'resources' }, displayName: 'Resources' },
  { route: { name: 'events' }, displayName: 'Events' },
  { route: { name: 'meeting-dashboard' }, displayName: 'Meetings' },
  { route: { name: 'gamification' }, displayName: 'Analytics & Gamification' },
  { route: { name: 'settings' }, displayName: 'Settings' },
];
</script> 