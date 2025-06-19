<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Total Referrers</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">35 Users</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">With at least one referral</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Total Referrals</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">128 Users</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">Joined via referral links.</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Top Performer</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">John Doe</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">8 referrals, $420.50 earned</div>
      </div>
    </div>

    <!-- Referral Network Section -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Referral Network</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">View and manage the hierarchical referral structure</p>
      </div>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center">
        <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
        Export
      </button>
    </div>
    <div class="flex items-center gap-3 mb-4">
      <div class="relative flex-1 max-w-xs">
        <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          v-model="search"
          type="text"
          placeholder="Search Wallet"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        >
      </div>
      <select v-model="statusFilter" class="border border-gray-300 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center">
        <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
        Export Tree
      </button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center">
        <PlusIcon class="h-4 w-4 mr-2" />
        Add Manual Referral
      </button>
    </div>

    <!-- Referral Hierarchy List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div v-for="(ref, idx) in filteredReferrals" :key="idx" class="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
          <div class="flex items-center w-48">
            <UserCircleIcon class="h-8 w-8 text-gray-400 mr-3" />
            <div>
              <div class="font-medium text-gray-900 dark:text-gray-100">{{ ref.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ ref.email }}</div>
            </div>
          </div>
          <div class="w-20">
            <span :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              ref.status === 'Active' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'
            ]">
              {{ ref.status }}
            </span>
          </div>
          <div class="w-20 text-xs text-gray-500 dark:text-gray-400">Level {{ ref.level }}</div>
          <div class="w-32 text-xs text-gray-900 dark:text-gray-100">{{ ref.referrals }} Referrals</div>
          <div class="w-32 text-xs text-gray-900 dark:text-gray-100">${{ ref.earnings.toFixed(2) }} Earnings</div>
          <div class="w-28 text-xs text-gray-500 dark:text-gray-400">{{ ref.joined }}</div>
          <div class="flex-1"></div>
          <div class="relative">
            <button class="text-gray-400 hover:text-gray-600">
              <EllipsisVerticalIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowDownTrayIcon, PlusIcon, MagnifyingGlassIcon, UserCircleIcon, EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
const search = ref('')
const statusFilter = ref('')
const referrals = ref([
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Active', level: 1, referrals: 3, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Active', level: 2, referrals: 8, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Inactive', level: 1, referrals: 0, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Active', level: 3, referrals: 8, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Inactive', level: 1, referrals: 0, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Inactive', level: 1, referrals: 0, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Active', level: 1, referrals: 12, earnings: 420.5, joined: '1/14/2023' }
])
const filteredReferrals = computed(() => {
  let data = referrals.value
  if (search.value) {
    data = data.filter(r => r.name.toLowerCase().includes(search.value.toLowerCase()) || r.email.toLowerCase().includes(search.value.toLowerCase()))
  }
  if (statusFilter.value) {
    data = data.filter(r => r.status === statusFilter.value)
  }
  return data
})
</script> 