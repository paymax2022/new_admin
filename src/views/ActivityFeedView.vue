<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold mb-1">Activity Feed</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Real-time updates and system activities</p>
      </div>
      <button class="bg-black text-white rounded px-4 py-2 font-medium">Mark all Read</button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-4 border-b mb-2">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="['pb-2 px-1 font-medium', activeTab === tab ? 'border-b-2 border-black text-black dark:border-white dark:text-white' : 'text-gray-400']">{{ tab }}</button>
    </div>

    <!-- Recent Activities -->
    <div class="flex items-center justify-between mb-2">
      <h2 class="font-semibold text-lg">Recent Activities</h2>
      <span class="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">8 New</span>
    </div>
    <div class="space-y-2">
      <template v-for="(item, i) in filteredActivities" :key="i">
        <div v-if="item.title === 'Payment Overdue'">
          <ActivityItem
            :icon="item.icon"
            :iconColor="item.iconColor"
            :title="item.title"
            :desc="item.desc"
            :badge="item.badge"
            :badgeType="item.badgeType"
            :time="item.time"
          >
            <template #actions>
              <button class="ml-4 px-3 py-1 rounded border text-xs font-medium text-gray-700 hover:bg-gray-100" @click="showOverdueModal = true">Review</button>
            </template>
          </ActivityItem>
        </div>
        <div v-else>
          <ActivityItem
            :icon="item.icon"
            :iconColor="item.iconColor"
            :title="item.title"
            :desc="item.desc"
            :badge="item.badge"
            :badgeType="item.badgeType"
            :time="item.time"
          />
        </div>
      </template>
    </div>
    <OverduePaymentsModal v-if="showOverdueModal" @close="showOverdueModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ActivityItem from '@/components/ActivityItem.vue';
import OverduePaymentsModal from '@/components/OverduePaymentsModal.vue';

const showOverdueModal = ref(false);

const tabs = ['All', 'Members', 'Payments', 'Meetings', 'Communications', 'Systems'];
const activeTab = ref('All');

const activities = [
  { icon: 'UserPlusIcon', iconColor: 'text-blue-500', title: 'New Member Registration', desc: 'John Doe joined Premium tier', badge: 'Success', badgeType: 'success', time: '2 hours ago', tab: 'Members' },
  { icon: 'BanknotesIcon', iconColor: 'text-green-500', title: 'Payment Received!', desc: 'Jane Smith paid $39 for annual membership', badge: 'Success', badgeType: 'success', time: '4 hours ago', tab: 'Payments' },
  { icon: 'UsersIcon', iconColor: 'text-cyan-500', title: 'Meeting Completed', desc: 'Board Meeting with 5 action points created', badge: 'Info', badgeType: 'info', time: '6 hours ago', tab: 'Meetings' },
  { icon: 'ExclamationCircleIcon', iconColor: 'text-red-500', title: 'Payment Overdue', desc: '19 members have overdue payments', badge: 'Warning', badgeType: 'warning', time: '2 hours ago', tab: 'Payments' },
  { icon: 'MegaphoneIcon', iconColor: 'text-purple-500', title: 'Announcement Sent', desc: 'Monthly newsletter delivered to 2,847 members', badge: 'Info', badgeType: 'info', time: '1 day ago', tab: 'Communications' },
  { icon: 'SparklesIcon', iconColor: 'text-orange-500', title: 'Badge Awarded', desc: '23 members earned "Active Participant" badge', badge: 'Success', badgeType: 'success', time: '2 hours ago', tab: 'Members' },
  { icon: 'ArrowPathIcon', iconColor: 'text-gray-500', title: 'System Update', desc: 'Backup completed successfully', badge: 'Info', badgeType: 'info', time: '2 days ago', tab: 'Systems' },
  { icon: 'DocumentPlusIcon', iconColor: 'text-indigo-500', title: 'Resource Added', desc: 'New policy document uploaded to library', badge: 'Info', badgeType: 'info', time: '2 days ago', tab: 'Systems' },
];

const filteredActivities = computed(() =>
  activeTab.value === 'All' ? activities : activities.filter(a => a.tab === activeTab.value)
);
</script> 