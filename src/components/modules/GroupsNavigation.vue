<template>
  <DropdownNav dropdownName="groupList" title="group" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
  // Group
  { route: { name: 'overview' }, displayName: 'overview' },
  { route: { name: 'activity-feed' }, displayName: 'activity feed' },
  { route: { name: 'widgets' }, displayName: 'widgets' },
  { route: { name: 'directory' }, displayName: 'directory' },
  // Subscription
  { route: { name: 'subscription-dashboard' }, displayName: 'subscription dashboard' },
  { route: { name: 'plans-tiers' }, displayName: 'plans & tiers' },
  { route: { name: 'invoice-center' }, displayName: 'invoice center' },
  { route: { name: 'payment-history' }, displayName: 'payment history' },
  { route: { name: 'failed-payments' }, displayName: 'failed payments' },
  { route: { name: 'subscription-settings' }, displayName: 'subscription settings' },
  //Group
  { route: { name: 'group-list' }, displayName: 'group list' },
  { route: { name: 'manage-group-members' }, displayName: 'manage members' },
  // Communication
  { route: { name: 'communication' }, displayName: 'communication' },
  // Polls & Surveys
  { route: { name: 'polls-surveys' }, displayName: 'polls & surveys' },
  // Resources
  { route: { name: 'resources' }, displayName: 'resources' },
  // Events
  { route: { name: 'events' }, displayName: 'events' },
  // Meetings
  { route: { name: 'meeting-dashboard' }, displayName: 'dashboard' },
  { route: { name: 'agenda-builder' }, displayName: 'agenda builder' },
  { route: { name: 'documents' }, displayName: 'documents' },
  { route: { name: 'action-points' }, displayName: 'action points' },
  { route: { name: 'archive' }, displayName: 'archive' },
  // Analytics and Gamification
  { route: { name: 'gamification' }, displayName: 'gamification' },
  { route: { name: 'reports-analytics' }, displayName: 'reports & analytics' },
  //Settings
  { route: { name: 'settings' }, displayName: 'settings' },
  { route: { name: 'help-support' }, displayName: 'help & support' },
];
</script>
