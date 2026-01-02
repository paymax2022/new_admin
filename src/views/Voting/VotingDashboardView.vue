<template>
  <div class="min-h-screen bg-[#f8f9fc] dark:bg-gray-900 p-6">
    <!-- Header Section with Purple/Orange Gradient -->
    <div class="bg-gradient-to-r from-purple-500 via-purple-400 to-orange-400 rounded-2xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-white/80 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h1 class="text-2xl font-bold text-white mb-1">Eviction Round Pending</h1>
            <p class="text-sm text-white/90">{{ evictionPending.length }} {{ evictionPending.length === 1 ? 'contestant is' : 'contestants are' }} marked for eviction. Review and confirm by Friday 11:59 PM</p>
          </div>
        </div>
        <button @click="showModal = true" class="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md transition-colors duration-200">
          Review Now
        </button>
      </div>
    </div>

    <!-- Stats Grid - First Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <!-- Total Members -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Members</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">{{ formatNumber(dashboardStats.totalMembers) }}</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span :class="percentageChanges.totalMembers.isPositive ? 'bg-purple-600 text-white' : 'bg-red-500 text-white'" class="inline-flex items-center gap-1 w-fit px-2.5 py-1 text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="percentageChanges.totalMembers.isPositive ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'" />
            </svg>
            {{ percentageChanges.totalMembers.isPositive ? '+' : '-' }}{{ percentageChanges.totalMembers.value.toFixed(1) }}%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">Active registrations</span>
        </div>
      </div>

      <!-- Total Votes -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Votes</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">45,891</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +8.5%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">All time votes cast</span>
        </div>
      </div>

      <!-- Revenue -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">₦892,340</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +8.5%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">From paid voting</span>
        </div>
      </div>

      <!-- Active Contests -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Contests</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">3</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-orange-400 text-black text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            2 ending soon
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">Live competitions</span>
        </div>
      </div>
    </div>

    <!-- Stats Grid - Second Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Qualified -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Qualified</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">{{ dashboardStats.qualified }}</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Qualified
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">Moved to Bootcamp</span>
        </div>
      </div>

      <!-- Evictions -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Evictions</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">{{ dashboardStats.evictions }}</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-orange-400 text-black text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Pending: {{ evictionPending.length }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">Total eliminated</span>
        </div>
      </div>

      <!-- Referrals -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Referrals</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">{{ formatNumber(dashboardStats.referrals) }}</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span :class="percentageChanges.referrals.isPositive ? 'bg-purple-600 text-white' : 'bg-red-500 text-white'" class="inline-flex items-center gap-1 w-fit px-2.5 py-1 text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="percentageChanges.referrals.isPositive ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'" />
            </svg>
            {{ percentageChanges.referrals.isPositive ? '+' : '-' }}{{ percentageChanges.referrals.value.toFixed(1) }}%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">New sign-ups</span>
        </div>
      </div>

      <!-- Avg. Session -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Session</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">{{ dashboardStats.avgSession }}</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Average
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">User engagement</span>
        </div>
      </div>
    </div>

    <!-- Bottom Section with Recent Activity and Top Contestants -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <svg class="w-5 h-5 mr-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Activity
          </h2>
        </div>
        <div class="p-6">
          <div class="space-y-5">
            <div v-if="recentActivity.length > 0">
              <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {{ activity.initials }}
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex-1">
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ activity.title }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ activity.description }}</p>
                      <div class="flex items-center mt-2">
                        <svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-xs text-gray-400">{{ formatTimeAgo(activity.timestamp) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <p class="text-sm">No recent activity</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Contestants -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <svg class="w-5 h-5 mr-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Top Contestants
            </h2>
            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">Bootcamp Phase</span>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-if="topContestants.length > 0">
              <div v-for="(contestant, index) in topContestants" :key="contestant.id" class="flex items-center justify-between py-2.5">
                <div class="flex items-center gap-3 flex-1">
                  <div class="flex-shrink-0">
                    <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md relative">
                      <svg v-if="index === 0" class="w-4 h-4 absolute -top-1 -left-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="absolute -top-1 -right-1 text-xs font-bold text-gray-900 bg-white rounded-full w-4 h-4 flex items-center justify-center">#{{ contestant.rank }}</span>
                      {{ contestant.initials }}
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ contestant.name }}</p>
                    <div class="flex items-center gap-1 mb-1">
                      <p class="text-xs text-gray-500">{{ contestant.location }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <span v-if="contestant.status === 'finalist'" class="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">finalist</span>
                      <span v-else-if="contestant.status === 'qualified'" class="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">qualified</span>
                      <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-right">
                    <div class="flex items-center justify-end gap-1 mb-1">
                      <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="text-sm font-bold text-gray-900 dark:text-white">{{ formatNumber(contestant.votes) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <p class="text-sm">No contestants data available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Eviction Review Modal -->
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900">Eviction Review - {{ evictionPending.length }} {{ evictionPending.length === 1 ? 'Contestant' : 'Contestants' }} Pending</h2>
        <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
        <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="space-y-4">
          <div v-if="evictionPending.length > 0">
            <div v-for="(contestant, index) in evictionPending" :key="contestant.id" :class="index < evictionPending.length - 1 ? 'border-b border-gray-100' : ''" class="flex items-center justify-between py-3">
              <div class="flex items-center gap-4 flex-1">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {{ contestant.initials }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ contestant.name }}</p>
                  <p class="text-xs text-gray-500">{{ formatNumber(contestant.votes) }} votes • {{ contestant.rank }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save
                </button>
                <button class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                  Evict
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <p class="text-sm">No pending evictions</p>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <span class="text-sm text-gray-600">Deadline: Friday 11:59 PM</span>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg">
            Save All
          </button>
          <button class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg">
            Proceed with Eviction
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import votingService from '@/services/votingService';

const toast = useToast();
const loading = ref(false);
const showModal = ref(false);

// Dashboard statistics
const dashboardStats = ref({
  totalMembers: 0,
  totalVotes: 0,
  revenue: 0,
  activeContests: 0,
  qualified: 0,
  evictions: 0,
  referrals: 0,
  avgSession: '0m 0s',
});

const percentageChanges = ref({
  totalMembers: { value: 0, isPositive: true },
  totalVotes: { value: 0, isPositive: true },
  revenue: { value: 0, isPositive: true },
  referrals: { value: 0, isPositive: true },
});

const topContestants = ref<any[]>([]);
const recentActivity = ref<any[]>([]);
const evictionPending = ref<any[]>([]);

// Helper function to calculate percentage change
const calculatePercentageChange = (current: number, previous: number): { value: number; isPositive: boolean } => {
  if (!previous || previous === 0) {
    return { value: current > 0 ? 100 : 0, isPositive: true };
  }
  const change = ((current - previous) / previous) * 100;
  return { value: Math.abs(change), isPositive: change >= 0 };
};

// Format currency
const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

// Format number
const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

// Format time ago
const formatTimeAgo = (timestamp: string | Date): string => {
  if (!timestamp) return 'Just now';
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  return date.toLocaleDateString();
};

// Load dashboard data
const loadDashboardData = async () => {
  try {
    loading.value = true;
    
    // Fetch dashboard stats and other data in parallel
    const [statsResponse, contestsResponse, dashboardResponse] = await Promise.allSettled([
      votingService.getDashboardStats(),
      votingService.getContests(),
      votingService.getAdminDashboard(),
    ]);

    // Process dashboard stats
    let statsData: any = null;
    if (statsResponse.status === 'fulfilled') {
      const response = statsResponse.value as any;
      // Handle different response structures
      if (response.ok && response.data) {
        statsData = response.data;
      } else if (response.success && response.data) {
        statsData = response.data;
      } else if (response.data && !response.ok && !response.success) {
        // Sometimes data is directly in response
        statsData = response.data;
      }
      
      console.log('Dashboard Stats Response:', response);
      console.log('Stats Data:', statsData);
    }

    if (statsData) {
      dashboardStats.value = {
        totalMembers: statsData.total_members || statsData.total_contestants || statsData.members || statsData.totalMembers || 0,
        totalVotes: statsData.total_votes || statsData.votes || statsData.totalVotes || 0,
        revenue: statsData.revenue || statsData.total_revenue || statsData.paid_votes_revenue || statsData.totalRevenue || 0,
        activeContests: statsData.active_contests || statsData.contests_count || statsData.activeContests || 0,
        qualified: statsData.qualified || statsData.qualified_contestants || statsData.qualifiedCount || 0,
        evictions: statsData.evictions || statsData.evicted_count || statsData.evictionsCount || 0,
        referrals: statsData.referrals || statsData.referral_count || statsData.totalReferrals || 0,
        avgSession: statsData.avg_session || statsData.average_session || statsData.avgSession || '0m 0s',
      };

      // Calculate percentage changes if previous period data is available
      if (statsData.previous_total_members || statsData.previousTotalMembers) {
        percentageChanges.value.totalMembers = calculatePercentageChange(
          dashboardStats.value.totalMembers,
          statsData.previous_total_members || statsData.previousTotalMembers
        );
      }
      if (statsData.previous_total_votes || statsData.previousTotalVotes) {
        percentageChanges.value.totalVotes = calculatePercentageChange(
          dashboardStats.value.totalVotes,
          statsData.previous_total_votes || statsData.previousTotalVotes
        );
      }
      if (statsData.previous_revenue || statsData.previousRevenue) {
        percentageChanges.value.revenue = calculatePercentageChange(
          dashboardStats.value.revenue,
          statsData.previous_revenue || statsData.previousRevenue
        );
      }
      if (statsData.previous_referrals || statsData.previousReferrals) {
        percentageChanges.value.referrals = calculatePercentageChange(
          dashboardStats.value.referrals,
          statsData.previous_referrals || statsData.previousReferrals
        );
      }
    }

    // Process contests data and calculate stats from contests
    let allContests: any[] = [];
    if (contestsResponse.status === 'fulfilled') {
      const response = contestsResponse.value as any;
      console.log('Contests Response:', response);
      
      // Handle different response structures
      if (response.ok && response.data) {
        allContests = Array.isArray(response.data) ? response.data : response.data.data || [];
      } else if (response.success && response.data) {
        allContests = Array.isArray(response.data) ? response.data : response.data.data || [];
      } else if (Array.isArray(response.data)) {
        allContests = response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        allContests = response.data.data;
      }
      
      console.log('Parsed Contests:', allContests.length);
      
      // Filter active contests
      const activeContests = allContests.filter((c: any) => 
        c.status === 'active' || c.status === 'ACTIVE' || c.status === 'ongoing' || c.status === 'OPEN'
      );
      
      // Update active contests count from real data
      if (activeContests.length > 0) {
        dashboardStats.value.activeContests = activeContests.length;
      }
      
      // Get contests ending soon (within 7 days)
      const endingSoon = activeContests.filter((c: any) => {
        if (!c.end_date && !c.endDate) return false;
        const endDate = new Date(c.end_date || c.endDate);
        const today = new Date();
        const daysUntilEnd = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilEnd <= 7 && daysUntilEnd > 0;
      });
      
      // Calculate total votes and revenue from contests if not available from stats
      if (dashboardStats.value.totalVotes === 0 || dashboardStats.value.revenue === 0) {
        let totalVotesFromContests = 0;
        let totalRevenueFromContests = 0;
        
        for (const contest of allContests) {
          if (contest.total_votes || contest.totalVotes) {
            totalVotesFromContests += parseInt(contest.total_votes || contest.totalVotes || 0);
          }
          if (contest.revenue || contest.total_revenue || contest.paid_votes_revenue) {
            totalRevenueFromContests += parseFloat(contest.revenue || contest.total_revenue || contest.paid_votes_revenue || 0);
          }
        }
        
        if (totalVotesFromContests > 0 && dashboardStats.value.totalVotes === 0) {
          dashboardStats.value.totalVotes = totalVotesFromContests;
        }
        if (totalRevenueFromContests > 0 && dashboardStats.value.revenue === 0) {
          dashboardStats.value.revenue = totalRevenueFromContests;
        }
      }
      
      // Calculate total members (contestants) from all contests
      if (dashboardStats.value.totalMembers === 0 && allContests.length > 0) {
        try {
          let totalContestants = 0;
          const contestPromises = allContests.slice(0, 10).map(async (contest: any) => {
            try {
              const contestantsRes = await votingService.getContestants(contest.id || contest._id);
              if (contestantsRes.ok && contestantsRes.data) {
                const contestants = Array.isArray(contestantsRes.data) ? contestantsRes.data : [];
                return contestants.length;
              }
            } catch (error) {
              console.error(`Error fetching contestants for contest ${contest.id}:`, error);
            }
            return 0;
          });
          
          const contestantCounts = await Promise.all(contestPromises);
          totalContestants = contestantCounts.reduce((sum, count) => sum + count, 0);
          
          if (totalContestants > 0) {
            dashboardStats.value.totalMembers = totalContestants;
          }
        } catch (error) {
          console.error('Error calculating total members:', error);
        }
      }
    }

    // Process admin dashboard data (already handled above, this is just for top contestants/activity/evictions)
    if (dashboardData) {
      const dashboard = dashboardData;
      
      // Get top contestants from leaderboard if available
      if (dashboard.top_contestants || dashboard.leaderboard) {
        const leaderboard = dashboard.top_contestants || dashboard.leaderboard || [];
        topContestants.value = leaderboard.slice(0, 5).map((contestant: any, index: number) => ({
          id: contestant.id || contestant.contestant_id || contestant._id,
          name: contestant.name || `${contestant.first_name || ''} ${contestant.last_name || ''}`.trim() || 'Unknown',
          initials: (contestant.name || contestant.first_name || 'AN').substring(0, 2).toUpperCase(),
          votes: parseInt(contestant.votes || contestant.total_votes || contestant.vote_count || 0),
          rank: index + 1,
          location: contestant.location || contestant.state || contestant.city || 'NG',
          status: contestant.status || 'active',
        }));
      }
      
      // Get recent activity
      if (dashboard.recent_activity || dashboard.activities) {
        const activities = dashboard.recent_activity || dashboard.activities || [];
        recentActivity.value = activities.slice(0, 6).map((activity: any) => ({
          id: activity.id || activity._id,
          type: activity.type || activity.activity_type,
          title: activity.title || activity.message,
          description: activity.description || activity.details,
          timestamp: activity.created_at || activity.timestamp || activity.createdAt,
          initials: (activity.user_name || activity.type || 'AC').substring(0, 2).toUpperCase(),
        }));
      }
      
      // Get eviction pending
      if (dashboard.eviction_pending || dashboard.pending_evictions) {
        const evictions = dashboard.eviction_pending || dashboard.pending_evictions || [];
        evictionPending.value = evictions.map((eviction: any) => ({
          id: eviction.id || eviction.contestant_id || eviction._id,
          name: eviction.name || `${eviction.first_name || ''} ${eviction.last_name || ''}`.trim() || 'Unknown',
          initials: (eviction.name || eviction.first_name || 'AN').substring(0, 2).toUpperCase(),
          votes: parseInt(eviction.votes || eviction.total_votes || eviction.vote_count || 0),
          rank: eviction.rank || 'Last',
        }));
      }
    }

    // If we don't have top contestants from dashboard, try to get from contests
    if (topContestants.value.length === 0 && allContests.length > 0) {
      // Get leaderboard for first active contest
      const activeContest = allContests.find((c: any) => 
        c.status === 'active' || c.status === 'ACTIVE' || c.status === 'ongoing' || c.status === 'OPEN'
      );
      
      if (activeContest && (activeContest.id || activeContest._id)) {
        try {
          const contestId = activeContest.id || activeContest._id;
          const leaderboardResponse = await votingService.getVoteLeaderboard(contestId);
          const response = leaderboardResponse as any;
          
          if ((response.ok || response.success) && response.data) {
            const leaderboard = Array.isArray(response.data) 
              ? response.data 
              : response.data.data || [];
            
            topContestants.value = leaderboard.slice(0, 5).map((contestant: any, index: number) => ({
              id: contestant.id || contestant.contestant_id || contestant._id,
              name: contestant.name || `${contestant.first_name || ''} ${contestant.last_name || ''}`.trim() || 'Unknown',
              initials: (contestant.name || contestant.first_name || 'AN').substring(0, 2).toUpperCase(),
              votes: parseInt(contestant.votes || contestant.total_votes || contestant.vote_count || 0),
              rank: index + 1,
              location: contestant.location || contestant.state || contestant.city || 'NG',
              status: contestant.status || 'active',
            }));
            
            // Calculate total votes from leaderboard if not set
            if (dashboardStats.value.totalVotes === 0 && leaderboard.length > 0) {
              const totalVotes = leaderboard.reduce((sum: number, c: any) => {
                return sum + parseInt(c.votes || c.total_votes || c.vote_count || 0);
              }, 0);
              if (totalVotes > 0) {
                dashboardStats.value.totalVotes = totalVotes;
              }
            }
          }
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        }
      }
    }
    
    // Calculate qualified and evictions from contestants if not available
    if ((dashboardStats.value.qualified === 0 || dashboardStats.value.evictions === 0) && allContests.length > 0) {
      try {
        let qualifiedCount = 0;
        let evictedCount = 0;
        
        // Check first few contests for qualified/evicted contestants
        for (const contest of allContests.slice(0, 5)) {
          try {
            const contestId = contest.id || contest._id;
            const contestantsRes = await votingService.getContestants(contestId);
            const response = contestantsRes as any;
            
            if ((response.ok || response.success) && response.data) {
              const contestants = Array.isArray(response.data) ? response.data : [];
              
              qualifiedCount += contestants.filter((c: any) => 
                c.status === 'qualified' || c.status === 'QUALIFIED' || c.qualified === true
              ).length;
              
              evictedCount += contestants.filter((c: any) => 
                c.status === 'evicted' || c.status === 'EVICTED' || c.evicted === true
              ).length;
            }
          } catch (error) {
            console.error(`Error fetching contestants for contest ${contest.id}:`, error);
          }
        }
        
        if (qualifiedCount > 0 && dashboardStats.value.qualified === 0) {
          dashboardStats.value.qualified = qualifiedCount;
        }
        if (evictedCount > 0 && dashboardStats.value.evictions === 0) {
          dashboardStats.value.evictions = evictedCount;
        }
      } catch (error) {
        console.error('Error calculating qualified/evicted:', error);
      }
    }

    // If we don't have recent activity, try to get from recent votes
    if (recentActivity.value.length === 0 && allContests.length > 0) {
      try {
        // Get contestants from first active contest
        const firstContest = allContests.find((c: any) => 
          c.status === 'active' || c.status === 'ACTIVE' || c.status === 'ongoing'
        ) || allContests[0];
        
        if (firstContest && (firstContest.id || firstContest._id)) {
          const contestId = firstContest.id || firstContest._id;
          const contestantsResponse = await votingService.getContestants(contestId);
          const response = contestantsResponse as any;
          
          if ((response.ok || response.success) && response.data) {
            const contestants = Array.isArray(response.data) ? response.data : [];
            
            // Get recent votes for first few contestants
            // Note: Recent votes endpoint may not be available, so we'll skip if it fails
            for (const contestant of contestants.slice(0, 3)) {
              try {
                const contestantId = contestant.id || contestant._id || contestant.contestant_id;
                if (contestantId) {
                  const recentVotesResponse = await votingService.getRecentVotes(contestantId);
                  const voteResponse = recentVotesResponse as any;
                  
                  // Only process if we got valid data (not an error response)
                  if (voteResponse && !voteResponse.message?.includes('Route not found') && voteResponse.data) {
                    const votes = Array.isArray(voteResponse.data) ? voteResponse.data : [];
                    
                    if (votes.length > 0) {
                      recentActivity.value = votes.slice(0, 6).map((vote: any) => ({
                        id: vote.id || vote._id,
                        type: 'vote',
                        title: 'New Vote Received',
                        description: `A new vote was casted for ${contestant.name || contestant.first_name || 'a contestant'}`,
                        timestamp: vote.created_at || vote.timestamp || vote.createdAt,
                        initials: 'NV',
                      }));
                      
                      if (recentActivity.value.length > 0) break;
                    }
                  }
                }
              } catch (error: any) {
                // Silently skip if endpoint doesn't exist
                if (!error?.response?.data?.message?.includes('Route not found')) {
                  console.error('Error fetching recent votes:', error);
                }
              }
            }
            
            // If we still don't have recent activity, create placeholder from contest data
            if (recentActivity.value.length === 0 && allContests.length > 0) {
              // Use contest creation dates as recent activity
              recentActivity.value = allContests.slice(0, 6).map((contest: any, index: number) => ({
                id: contest.id || contest._id || `contest-${index}`,
                type: 'contest',
                title: 'Contest Activity',
                description: contest.title || contest.name || 'Contest activity update',
                timestamp: contest.created_at || contest.createdAt || contest.start_date || new Date().toISOString(),
                initials: 'CA',
              }));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    }

    // Final logging and ensure all values are set
    console.log('=== FINAL DASHBOARD STATS ===');
    console.log('Total Members:', dashboardStats.value.totalMembers);
    console.log('Total Votes:', dashboardStats.value.totalVotes);
    console.log('Revenue:', dashboardStats.value.revenue);
    console.log('Active Contests:', dashboardStats.value.activeContests);
    console.log('Qualified:', dashboardStats.value.qualified);
    console.log('Evictions:', dashboardStats.value.evictions);
    console.log('Referrals:', dashboardStats.value.referrals);
    console.log('Avg Session:', dashboardStats.value.avgSession);
    console.log('Top Contestants:', topContestants.value.length);
    console.log('Recent Activity:', recentActivity.value.length);
    console.log('Eviction Pending:', evictionPending.value.length);
    console.log('Dashboard data loaded:', {
      stats: dashboardStats.value,
      topContestants: topContestants.value,
      recentActivity: recentActivity.value,
      evictionPending: evictionPending.value,
    });

  } catch (error) {
    console.error('Error loading dashboard data:', error);
    toast.error('Failed to load dashboard data');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>
