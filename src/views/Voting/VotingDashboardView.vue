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
            <p class="text-sm text-white/90">3 contestants are marked for eviction. Review and confirm by Friday 11:59 PM</p>
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
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">127</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +12%
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
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">35</h3>
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
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">8</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-orange-400 text-black text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            This week: 3
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
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">1,234</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +15%
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
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">12m 34s</h3>
        </div>
        <div class="flex flex-col gap-2">
          <span class="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +2m 15s
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
            <!-- Activity Item 1 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  NV
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">New Vote Received</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">A new vote was casted to the voting system</p>
                    <div class="flex items-center mt-2">
                      <svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-xs text-gray-400">2 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Item 2 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  CS
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Contest Suspended</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">An admin suspended a contest for the budget Season 3</p>
                    <div class="flex items-center mt-2">
                      <svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-xs text-gray-400">45 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Item 3 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  EA
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Eviction Alert</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">2 contestants were set for another eviction round</p>
                    <div class="flex items-center mt-2">
                      <svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-xs text-gray-400">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Item 4 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  BA
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Badge Awarded</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Top voter badge was given to all top contestants</p>
                    <div class="flex items-center mt-2">
                      <svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-xs text-gray-400">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Item 5 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  PU
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Phase Update</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Contest Phase 2 is now Live on Voting module</p>
                    <div class="flex items-center mt-2">
                      <svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-xs text-gray-400">3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Item 6 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  VM
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Voting Milestone</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Refer total vote reached for the online voting show</p>
                    <div class="flex items-center mt-2">
                      <svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-xs text-gray-400">5 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
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
            <!-- Contestant 1 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md relative">
                    <svg class="w-4 h-4 absolute -top-1 -left-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="absolute -top-1 -right-1 text-xs font-bold text-gray-900 bg-white rounded-full w-4 h-4 flex items-center justify-center">#1</span>
                    SJ
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Sarah Johnson</p>
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-xs text-green-600 inline-flex items-center">+2</span>
                    <p class="text-xs text-gray-500">Lagos, NG</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">finalist</span>
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
                    <span class="text-sm font-bold text-gray-900 dark:text-white">8,904</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contestant 2 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md relative">
                    <svg class="w-4 h-4 absolute -top-1 -left-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="absolute -top-1 -right-1 text-xs font-bold text-gray-900 bg-white rounded-full w-4 h-4 flex items-center justify-center">#2</span>
                    DO
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">David Okafor</p>
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-xs text-red-600 inline-flex items-center">-1</span>
                    <p class="text-xs text-gray-500">Abuja, NG</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">qualified</span>
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
                    <span class="text-sm font-bold text-gray-900 dark:text-white">7,691</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contestant 3 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md relative">
                    <svg class="w-4 h-4 absolute -top-1 -left-1 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="absolute -top-1 -right-1 text-xs font-bold text-gray-900 bg-white rounded-full w-4 h-4 flex items-center justify-center">#3</span>
                    AH
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Amina Hassan</p>
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-xs text-green-600 inline-flex items-center">+1</span>
                    <p class="text-xs text-gray-500">Kano, NG</p>
                  </div>
                  <div class="flex items-center gap-2">
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
                    <span class="text-sm font-bold text-gray-900 dark:text-white">7,203</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contestant 4 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md relative">
                    <svg class="w-4 h-4 absolute -top-1 -left-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="absolute -top-1 -right-1 text-xs font-bold text-gray-900 bg-white rounded-full w-4 h-4 flex items-center justify-center">#4</span>
                    SO
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Sandra Okoro</p>
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-xs text-red-600 inline-flex items-center">-2</span>
                    <p class="text-xs text-gray-500">Port Harcourt, NG</p>
                  </div>
                  <div class="flex items-center gap-2">
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
                    <span class="text-sm font-bold text-gray-900 dark:text-white">6,847</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contestant 5 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md relative">
                    <svg class="w-4 h-4 absolute -top-1 -left-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="absolute -top-1 -right-1 text-xs font-bold text-gray-900 bg-white rounded-full w-4 h-4 flex items-center justify-center">#5</span>
                    FJ
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Fatima Bello</p>
                  <div class="flex items-center gap-1 mb-1">
                    <span class="text-xs text-green-600 inline-flex items-center">+1</span>
                    <p class="text-xs text-gray-500">Kaduna, NG</p>
                  </div>
                  <div class="flex items-center gap-2">
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
                    <span class="text-sm font-bold text-gray-900 dark:text-white">6,234</span>
                  </div>
                </div>
              </div>
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
        <h2 class="text-xl font-bold text-gray-900">Eviction Review - 6 Contestants Pending</h2>
        <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="space-y-4">
          <!-- Contestant 1 -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                SJ
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">Sarah Johnson</p>
                <p class="text-xs text-gray-500">1245 votes • Last</p>
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

          <!-- Contestant 2 -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                MC
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">Mike Chen</p>
                <p class="text-xs text-gray-500">1988 votes • 2nd Last</p>
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

          <!-- Contestant 3 -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                LR
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">Lisa Rodriguez</p>
                <p class="text-xs text-gray-500">1502 votes • 3rd Last</p>
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

          <!-- Contestant 4 -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                LR
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">Lisa Rodriguez</p>
                <p class="text-xs text-gray-500">1502 votes • 3rd Last</p>
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

          <!-- Contestant 5 -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                LR
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">Lisa Rodriguez</p>
                <p class="text-xs text-gray-500">1502 votes • 3rd Last</p>
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

          <!-- Contestant 6 -->
          <div class="flex items-center justify-between py-3">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                LR
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">Lisa Rodriguez</p>
                <p class="text-xs text-gray-500">1502 votes • 3rd Last</p>
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
import { ref, onMounted } from 'vue';

// Component data
const loading = ref(false);
const showModal = ref(false);

onMounted(() => {
  // Initialize component
  console.log('Voting Dashboard mounted');
});
</script>
