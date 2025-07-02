<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold mb-1">Dashboard Overview</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Monitor your organization's key metrics and performance</p>
    </div>

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
</template>

<script setup lang="ts">
import SummaryCard from '@/components/SummaryCard.vue';
import QuickAction from '@/components/QuickAction.vue';
// Placeholder for icon components and logic
// You may want to import or define SummaryCard and QuickAction components for reusability
</script>

<style scoped>
/* Add any custom styles if needed */
</style> 