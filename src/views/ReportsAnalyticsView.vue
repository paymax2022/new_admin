<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Reports & Analytics</h1>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 border px-4 py-2 rounded font-medium text-sm"><svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><rect x="7" y="13" width="3" height="5"/><rect x="12" y="9" width="3" height="9"/><rect x="17" y="5" width="3" height="13"/></svg>Configure Rules</button>
        <button class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-medium text-sm"><svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>Create Badge</button>
      </div>
    </div>
    <div class="flex gap-6 mb-6 border-b">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" class="pb-2 px-4 font-medium" :class="activeTab === tab ? 'border-b-2 border-black' : 'text-gray-400'">{{ tab }}</button>
    </div>
    <div v-if="activeTab === 'Overview'">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
          <div class="text-2xl font-bold mb-1 text-blue-500">514</div>
          <div class="text-xs text-gray-500">Total Members</div>
          <div class="text-xs text-blue-400 mt-1">+12.8% this month</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><text x="12" y="17" text-anchor="middle" font-size="10" fill="currentColor" stroke="none">$</text></svg></span>
          <div class="text-2xl font-bold mb-1 text-green-500">$21,500</div>
          <div class="text-xs text-gray-500">Monthly Revenue</div>
          <div class="text-xs text-green-400 mt-1">+7.2% this month</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 15v-4m4 4V7m4 12V11"/></svg></span>
          <div class="text-2xl font-bold mb-1 text-purple-500">84%</div>
          <div class="text-xs text-gray-500">Engagement Rate</div>
          <div class="text-xs text-purple-400 mt-1">+5.1% this month</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 21H3V3"/></svg></span>
          <div class="text-2xl font-bold mb-1 text-orange-400">97%</div>
          <div class="text-xs text-gray-500">Retention Rate</div>
          <div class="text-xs text-orange-300 mt-1">+2.3% this month</div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-4">Membership Growth</div>
          <Line :data="membershipGrowthData" :options="membershipGrowthOptions" class="h-48" />
        </div>
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-4">Member Retention vs Churn</div>
          <Bar :data="retentionChurnData" :options="retentionChurnOptions" class="h-48" />
        </div>
      </div>
      <div class="bg-white border rounded-xl p-6">
        <div class="font-semibold mb-4">Top Performing Content</div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <span class="text-blue-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg></span>
            <div>
              <div class="font-medium text-sm">Member Onboarding Guide</div>
              <div class="text-xs text-gray-400">1245 views</div>
            </div>
            <div class="ml-auto text-xs text-gray-500">83%</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-yellow-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
            <div>
              <div class="font-medium text-sm">Annual Networking Event</div>
              <div class="text-xs text-gray-400">180 attended</div>
            </div>
            <div class="ml-auto text-xs text-yellow-500 flex items-center gap-1"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"/></svg>4.8</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-purple-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg></span>
            <div>
              <div class="font-medium text-sm">Q&A: Industry Trends</div>
              <div class="text-xs text-gray-400">860 viewed</div>
            </div>
            <div class="ml-auto text-xs text-gray-500">78%</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-emerald-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg></span>
            <div>
              <div class="font-medium text-sm">Monthly Newsletter</div>
              <div class="text-xs text-gray-400">770 opened</div>
            </div>
            <div class="ml-auto text-xs text-gray-500">77%</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Membership'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-2">Membership Types</div>
          <div class="text-xs text-gray-500 mb-4">Distribution of membership tiers</div>
          <Pie :data="membershipTypesData" :options="membershipTypesOptions" class="h-64" />
        </div>
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-2">Total Membership Trend</div>
          <div class="text-xs text-gray-500 mb-4">Cumulative member count over time</div>
          <Line :data="membershipTrendData" :options="membershipTrendOptions" class="h-64" />
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Engagement'">
      <div class="bg-white border rounded-xl p-6 mb-6">
        <div class="font-semibold mb-2">Member Engagement Metrics</div>
        <div class="text-xs text-gray-500 mb-4">Track how members interact with your platform</div>
        <Bar :data="engagementMetricsData" :options="engagementMetricsOptions" class="h-80" />
      </div>
    </div>
    <div v-else-if="activeTab === 'Revenue'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-2">Revenue Trend</div>
          <div class="text-xs text-gray-500 mb-4">Monthly recurring revenue growth</div>
          <Line :data="revenueTrendData" :options="revenueTrendOptions" class="h-64" />
        </div>
        <div class="bg-white border rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div class="font-semibold mb-2">Revenue by Membership Type</div>
            <div class="text-xs text-gray-500 mb-4">Income breakdown by tier</div>
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full inline-block" style="background:#a78bfa"></span>Basic <span class="ml-2 px-2 py-0.5 border rounded text-xs">45 members</span></span>
                <span class="text-green-500 font-semibold">$4500</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full inline-block" style="background:#34d399"></span>Premium <span class="ml-2 px-2 py-0.5 border rounded text-xs">30 members</span></span>
                <span class="text-green-500 font-semibold">$9000</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full inline-block" style="background:#fbbf24"></span>Enterprise <span class="ml-2 px-2 py-0.5 border rounded text-xs">15 members</span></span>
                <span class="text-green-500 font-semibold">$7500</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full inline-block" style="background:#f87171"></span>Lifetime <span class="ml-2 px-2 py-0.5 border rounded text-xs">10 members</span></span>
                <span class="text-green-500 font-semibold">$5000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Content'">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/></svg></span>
          <div class="text-2xl font-bold mb-1">247</div>
          <div class="text-xs text-gray-500">Total Resources</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="4"/></svg></span>
          <div class="text-2xl font-bold mb-1">18.2K</div>
          <div class="text-xs text-gray-500">Total Views</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12,2 15,8.5 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 9,8.5"/></svg></span>
          <div class="text-2xl font-bold mb-1">4.6</div>
          <div class="text-xs text-gray-500">Avg. Rating</div>
        </div>
      </div>
      <div class="bg-white border rounded-xl p-6">
        <div class="font-semibold mb-2">Content Performance</div>
        <div class="text-xs text-gray-500 mb-4">Detailed analytics for all your content</div>
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <span class="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-600">Resource</span>
            <span class="font-medium">Member Onboarding Guide</span>
            <span class="ml-auto text-xs text-gray-400">1245 views</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-600">Event</span>
            <span class="font-medium">Annual Networking Event</span>
            <span class="ml-auto text-xs text-gray-400">180 attended</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-600">Forum</span>
            <span class="font-medium">Q&amp;A: Industry Trends</span>
            <span class="ml-auto text-xs text-gray-400">890 views</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-600">Communication</span>
            <span class="font-medium">Monthly Newsletter</span>
            <span class="ml-auto text-xs text-gray-400">78% opens</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Other tabs can be implemented similarly -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Line, Bar, Pie } from 'vue-chartjs';
const tabs = ['Overview', 'Membership', 'Engagement', 'Revenue', 'Content'];
const activeTab = ref('Overview');
const membershipGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'New Members',
      data: [200, 250, 300, 350, 400, 500, 600, 650, 700, 750, 800, 850],
      fill: true,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: '#6366f1',
      tension: 0.4,
    },
  ],
};
const membershipGrowthOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
};
const retentionChurnData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Retained',
      data: [120, 200, 300, 400, 500, 600, 700, 800],
      backgroundColor: '#34d399',
    },
    {
      label: 'Churned',
      data: [80, 60, 50, 40, 30, 20, 10, 5],
      backgroundColor: '#f87171',
    },
  ],
};
const retentionChurnOptions = {
  responsive: true,
  plugins: { legend: { position: 'top' as const } },
  scales: { y: { beginAtZero: true } },
};
const membershipTypesData = {
  labels: ['Basic', 'Premium', 'Enterprise', 'Lifetime'],
  datasets: [
    {
      label: 'Membership Types',
      data: [45, 15, 10, 30],
      backgroundColor: [
        '#a78bfa', // Basic - purple
        '#34d399', // Premium - green
        '#fbbf24', // Enterprise - yellow
        '#f87171', // Lifetime - red
      ],
      borderWidth: 1,
    },
  ],
};
const membershipTypesOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' as const },
    tooltip: { enabled: true },
  },
};
const membershipTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Members',
      data: [1500, 1550, 1520, 1600, 1570, 1590],
      fill: false,
      borderColor: '#6366f1',
      backgroundColor: '#6366f1',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#6366f1',
    },
  ],
};
const membershipTrendOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: false } },
};
const engagementMetricsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Team attendance',
      data: [200, 220, 250, 300, 320, 340, 360],
      backgroundColor: '#8b5cf6',
    },
    {
      label: 'Forum Posts',
      data: [400, 470, 420, 430, 440, 450, 460],
      backgroundColor: '#10b981',
    },
    {
      label: 'Resource Views',
      data: [600, 570, 610, 620, 630, 640, 650],
      backgroundColor: '#f59e42',
    },
  ],
};
const engagementMetricsOptions = {
  responsive: true,
  plugins: { legend: { position: 'bottom' as const } },
  scales: { y: { beginAtZero: true } },
};
const revenueTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [300, 320, 310, 350, 370, 400, 420, 450, 480, 520, 600, 700],
      fill: true,
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: '#22c55e',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#22c55e',
    },
  ],
};
const revenueTrendOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
};
</script> 