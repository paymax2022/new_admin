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
  // Group
  { route: { name: 'overview' }, displayName: 'overview', category: 'Group' },
  { route: { name: 'activity-feed' }, displayName: 'activity feed', category: 'Group' },
  { route: { name: 'widgets' }, displayName: 'widgets', category: 'Group' },
  { route: { name: 'directory' }, displayName: 'directory', category: 'Group' },
  { route: { name: 'activity-logs' }, displayName: 'Activity Logs', category: 'Group' },
  // Subscription
  { route: { name: 'subscription-dashboard' }, displayName: 'subscription dashboard', category: 'Subscription' },
  { route: { name: 'plans-tiers' }, displayName: 'plans & tiers', category: 'Subscription' },
  { route: { name: 'invoice-center' }, displayName: 'invoice center', category: 'Subscription' },
  { route: { name: 'payment-history' }, displayName: 'payment history', category: 'Subscription' },
  { route: { name: 'failed-payments' }, displayName: 'failed payments', category: 'Subscription' },
  { route: { name: 'subscription-settings' }, displayName: 'subscription settings', category: 'Subscription' },
  // Group Management
  { route: { name: 'group-list' }, displayName: 'group list', category: 'Group Management' },
  { route: { name: 'manage-group-members' }, displayName: 'manage members', category: 'Group Management' },
  // Communication
  { route: { name: 'communication' }, displayName: 'communication', category: 'Communication' },
  // Polls & Surveys
  { route: { name: 'polls-surveys' }, displayName: 'polls & surveys', category: 'Polls & Surveys' },
  // Resources
  { route: { name: 'resources' }, displayName: 'resources', category: 'Resources' },
  // Events
  { route: { name: 'events' }, displayName: 'events', category: 'Events' },
  // Meetings
  { route: { name: 'meeting-dashboard' }, displayName: 'dashboard', category: 'Meetings' },
  { route: { name: 'agenda-builder' }, displayName: 'agenda builder', category: 'Meetings' },
  { route: { name: 'documents' }, displayName: 'documents', category: 'Meetings' },
  { route: { name: 'action-points' }, displayName: 'action points', category: 'Meetings' },
  { route: { name: 'archive' }, displayName: 'archive', category: 'Meetings' },
  // Analytics & Gamification
  { route: { name: 'gamification' }, displayName: 'gamification', category: 'Analytics & Gamification' },
  { route: { name: 'reports-analytics' }, displayName: 'reports & analytics', category: 'Analytics & Gamification' },
  // Settings
  { route: { name: 'settings' }, displayName: 'settings', category: 'Settings' },
  { route: { name: 'help-support' }, displayName: 'help & support', category: 'Settings' },
];
</script> 