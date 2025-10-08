<template>
  <div class="min-h-screen bg-[#f8f9fc] dark:bg-gray-900 p-6">
    <!-- Header Section with Purple/Orange Gradient -->
    <div class="bg-gradient-to-r from-purple-500 via-purple-400 to-orange-400 rounded-2xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white mb-1">Eviction Round Pending</h1>
          <p class="text-sm text-white/90">2 contestants are marked for eviction. Round end On/this by Friday 11:59 PM</p>
        </div>
        <button class="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md transition-colors duration-200">
          Eviction Now
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">127</h3>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-md">
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">45,891</h3>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-md">
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
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-md">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +8.6%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">From past voting</span>
        </div>
      </div>

      <!-- Active Contests -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Contests</h4>
          <div class="w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">3</h3>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-md">
            2 ending soon
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">All Live Contests</span>
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">35</h3>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-md">
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
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-md">
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
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-md">
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
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-md">
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
                  <button class="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Activity Item 2 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
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
                  <button class="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Activity Item 3 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
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
                  <button class="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Activity Item 4 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
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
                  <button class="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Activity Item 5 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
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
                  <button class="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Activity Item 6 -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-11 h-11 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
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
                  <button class="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
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
            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">Leaderboard Phase</span>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <!-- Contestant 1 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    SJ
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Sarah Johnson</p>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-md">Active</span>
                    <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">Premium</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="flex items-center justify-end gap-1.5 mb-1">
                    <span class="text-xs text-gray-500">+6</span>
                    <span class="text-sm font-bold text-gray-900 dark:text-white">4.93K</span>
                  </div>
                  <button class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200">
                    Message
                  </button>
                </div>
              </div>
            </div>

            <!-- Contestant 2 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    MR
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Mike Ross</p>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">Final</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="flex items-center justify-end gap-1.5 mb-1">
                    <span class="text-xs text-gray-500">-23</span>
                    <span class="text-sm font-bold text-gray-900 dark:text-white">3.4K</span>
                  </div>
                  <button class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200">
                    Message
                  </button>
                </div>
              </div>
            </div>

            <!-- Contestant 3 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    AH
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Amina Hassan</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">New</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="flex items-center justify-end gap-1.5 mb-1">
                    <span class="text-sm font-bold text-gray-900 dark:text-white">2.34K</span>
                  </div>
                  <button class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200">
                    Message
                  </button>
                </div>
              </div>
            </div>

            <!-- Contestant 4 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    XO
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Xandia Oturo</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Old</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="flex items-center justify-end gap-1.5 mb-1">
                    <span class="text-sm font-bold text-gray-900 dark:text-white">1.42K</span>
                  </div>
                  <button class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200">
                    Message
                  </button>
                </div>
              </div>
            </div>

            <!-- Contestant 5 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    JK
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">John Keller</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Old</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="flex items-center justify-end gap-1.5 mb-1">
                    <span class="text-sm font-bold text-gray-900 dark:text-white">901</span>
                  </div>
                  <button class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200">
                    Message
                  </button>
                </div>
              </div>
            </div>

            <!-- Contestant 6 -->
            <div class="flex items-center justify-between py-2.5">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex-shrink-0">
                  <div class="w-11 h-11 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    FR
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Fatima Bello</p>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-md">Verified</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="flex items-center justify-end gap-1.5 mb-1">
                    <span class="text-sm font-bold text-gray-900 dark:text-white">4.22K</span>
                  </div>
                  <button class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Component data
const loading = ref(false);

onMounted(() => {
  // Initialize component
  console.log('Voting Dashboard mounted');
});
</script>
