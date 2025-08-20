<template>
  <div class="p-6 space-y-6">
    <!-- Navigation Tabs -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-8 px-6" aria-label="Overview Navigation">
        <button
          v-for="tab in navigationTabs"
          :key="tab.name"
          @click="activeTab = tab.name"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
            activeTab === tab.name
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
          ]"
        >
          <div class="flex items-center space-x-2">
            <component :is="tab.icon" class="h-5 w-5" />
            <span>{{ tab.label }}</span>
          </div>
        </button>
      </nav>
    </div>

    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold mb-1">{{ getActiveTabTitle() }}</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">{{ getActiveTabDescription() }}</p>
    </div>

    <!-- Content based on active tab -->
    <div v-if="activeTab === 'overview'">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <SummaryCard title="Total Members" value="2,847" change="↑ 12%" subtext="from last month" icon="UserGroupIcon" iconBg="bg-blue-100" iconColor="text-blue-500" positive />
        <SummaryCard title="Active Members" value="2,156" change="↑ 12%" subtext="from last month" icon="UserIcon" iconBg="bg-green-100" iconColor="text-green-500" positive />
        <SummaryCard title="Monthly Revenue" value="$142,350" change="↑ 12%" subtext="from last month" icon="BanknotesIcon" iconBg="bg-purple-100" iconColor="text-purple-500" positive />
        <SummaryCard title="Overdue Payments" value="23" change="↓ 5%" subtext="from last month" icon="ExclamationCircleIcon" iconBg="bg-red-100" iconColor="text-red-500" negative />
        <SummaryCard title="Upcoming Events" value="12" change="↑ 3" subtext="from last month" icon="CalendarDaysIcon" iconBg="bg-pink-100" iconColor="text-pink-500" positive />
        <SummaryCard title="Engagement Score" value="87%" change="↑ 12%" subtext="from last month" icon="ChartBarIcon" iconBg="bg-cyan-100" iconColor="text-cyan-500" positive />
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction color="blue" title="Create Meeting" subtitle="Schedule a new meeting" icon="CalendarIcon" />
        <QuickAction color="green" title="Add Member" subtitle="Register new member" icon="UserPlusIcon" />
        <QuickAction color="purple" title="Send Announcement" subtitle="Broadcast to members" icon="MegaphoneIcon" />
        <QuickAction color="orange" title="Create Badge" subtitle="Design new achievement" icon="SparklesIcon" />
      </div>

      <!-- Highlights & Deadlines -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Highlights -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
          <h2 class="font-semibold mb-3">This Month's Highlights</h2>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between"><span>New member registrations</span><span class="text-green-600">+142</span></li>
            <li class="flex justify-between"><span>Events hosted</span><span>12</span></li>
            <li class="flex justify-between"><span>Meetings conducted</span><span>16</span></li>
            <li class="flex justify-between"><span>Badges awarded</span><span>234</span></li>
          </ul>
        </div>
        <!-- Deadlines -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
          <h2 class="font-semibold mb-3">Upcoming Deadlines</h2>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between items-center"><span>Payment reminders due</span><span class="bg-pink-500 text-white rounded-full px-3 py-1 text-xs">Today</span></li>
            <li class="flex justify-between items-center"><span>Board meeting preparation</span><span class="bg-yellow-400 text-white rounded-full px-3 py-1 text-xs">Tomorrow</span></li>
            <li class="flex justify-between items-center"><span>Monthly newsletter</span><span class="bg-blue-500 text-white rounded-full px-3 py-1 text-xs">3 days</span></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Activity Feed Tab -->
    <div v-else-if="activeTab === 'activity-feed'" class="space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Recent Activity Feed</h2>
        <div class="space-y-4">
          <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">JD</span>
            </div>
            <div class="flex-1">
              <p class="text-sm"><span class="font-medium">John Doe</span> joined the group</p>
              <p class="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">JS</span>
            </div>
            <div class="flex-1">
              <p class="text-sm"><span class="font-medium">Jane Smith</span> made a payment</p>
              <p class="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">MJ</span>
            </div>
            <div class="flex-1">
              <p class="text-sm"><span class="font-medium">Mike Johnson</span> created an event</p>
              <p class="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Widgets Tab -->
    <div v-else-if="activeTab === 'widgets'" class="space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Available Widgets</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h3 class="font-medium mb-2">Member Statistics</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Display member growth and activity</p>
          </div>
          <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h3 class="font-medium mb-2">Revenue Chart</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Show financial performance</p>
          </div>
          <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h3 class="font-medium mb-2">Event Calendar</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Upcoming events and meetings</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Directory Tab -->
    <div v-else-if="activeTab === 'directory'" class="space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Member Directory</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">john@example.com</td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Jan 15, 2024</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Jane Smith</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">jane@example.com</td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Jan 20, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Activity Logs Tab -->
    <div v-else-if="activeTab === 'activity-logs'" class="space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Activity Logs</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="text-sm font-medium">User login</p>
              <p class="text-xs text-gray-500">IP: 192.168.1.1</p>
            </div>
            <span class="text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="text-sm font-medium">Payment processed</p>
              <p class="text-xs text-gray-500">Amount: $150.00</p>
            </div>
            <span class="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="text-sm font-medium">Event created</p>
              <p class="text-xs text-gray-500">Event: Monthly Meeting</p>
            </div>
            <span class="text-xs text-gray-500">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SummaryCard from '@/components/SummaryCard.vue';
import QuickAction from '@/components/QuickAction.vue';
import {
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  CogIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

// Navigation tabs configuration
const navigationTabs = [
  {
    name: 'overview',
    label: 'Overview',
    icon: ChartBarIcon,
    title: 'Dashboard Overview',
    description: 'Monitor your organization\'s key metrics and performance'
  },
  {
    name: 'activity-feed',
    label: 'Activity Feed',
    icon: UserGroupIcon,
    title: 'Activity Feed',
    description: 'View recent activities and member interactions'
  },
  {
    name: 'widgets',
    label: 'Widgets',
    icon: CogIcon,
    title: 'Widgets',
    description: 'Customize your dashboard with various widgets'
  },
  {
    name: 'directory',
    label: 'Directory',
    icon: UserIcon,
    title: 'Member Directory',
    description: 'Browse and manage member information'
  },
  {
    name: 'activity-logs',
    label: 'Activity Logs',
    icon: ClockIcon,
    title: 'Activity Logs',
    description: 'Detailed system activity and audit trail'
  }
]

const activeTab = ref('overview')

const getActiveTabTitle = () => {
  const tab = navigationTabs.find(tab => tab.name === activeTab.value)
  return tab ? tab.title : 'Dashboard Overview'
}

const getActiveTabDescription = () => {
  const tab = navigationTabs.find(tab => tab.name === activeTab.value)
  return tab ? tab.description : 'Monitor your organization\'s key metrics and performance'
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style> 