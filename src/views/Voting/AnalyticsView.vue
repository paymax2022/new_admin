<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-gray-900 mb-1">Analytics Dashboard</h1>
        <p class="text-[10px] text-gray-600">Real-time insights and performance metrics</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Date Range Selector -->
        <div class="relative">
          <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-xs font-medium text-gray-900">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <!-- Refresh Button -->
        <button class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <!-- Export Report Button -->
        <button @click="showExportModal = true" class="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Export Report
        </button>
      </div>
    </div>

    <!-- Key Performance Indicators -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <!-- Total Votes -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <h4 class="text-xs font-medium text-gray-600 mb-1">Total Votes</h4>
            <h3 class="text-3xl font-bold text-gray-900">127</h3>
            <p class="text-[10px] text-green-600 mt-1">+12%</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Contestants -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <h4 class="text-xs font-medium text-gray-600 mb-1">Active Contestants</h4>
            <h3 class="text-3xl font-bold text-gray-900">127</h3>
            <p class="text-[10px] text-green-600 mt-1">+3</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Revenue -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <h4 class="text-xs font-medium text-gray-600 mb-1">Revenue</h4>
            <h3 class="text-3xl font-bold text-gray-900">₦457K</h3>
            <p class="text-[10px] text-green-600 mt-1">+18.2%</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Engagement -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <h4 class="text-xs font-medium text-gray-600 mb-1">Engagement</h4>
            <h3 class="text-3xl font-bold text-gray-900">89.2%</h3>
            <p class="text-[10px] text-red-600 mt-1">-2%</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-6 border-b border-gray-200 mb-6">
      <button @click="activeTab = 'overview'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'overview' ? 'text-gray-900' : 'text-gray-500'">Overview</span>
        <div v-if="activeTab === 'overview'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
      <button @click="activeTab = 'top-contestants'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'top-contestants' ? 'text-gray-900' : 'text-gray-500'">Top Contestants</span>
        <div v-if="activeTab === 'top-contestants'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
      <button @click="activeTab = 'voting-trends'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'voting-trends' ? 'text-gray-900' : 'text-gray-500'">Voting Trends</span>
        <div v-if="activeTab === 'voting-trends'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
      <button @click="activeTab = 'referral-performance'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'referral-performance' ? 'text-gray-900' : 'text-gray-500'">Referral Performance</span>
        <div v-if="activeTab === 'referral-performance'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
    </div>

    <!-- Main Content Area -->
    <!-- Overview Tab -->
    <div v-if="activeTab === 'overview'" class="grid grid-cols-2 gap-6">
      <!-- Weekly Voting Activity -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 class="text-sm font-bold text-gray-900 mb-4">Weekly Voting Activity</h3>
        <div class="space-y-3">
          <!-- Monday -->
          <div class="flex items-center gap-3">
            <div class="w-10 text-[10px] font-medium text-gray-600">Mon</div>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 flex items-center gap-1">
                <div class="flex-1 h-6 bg-gray-200 rounded flex items-center px-2">
                  <span class="text-[10px] text-gray-700">Free: 1200</span>
                </div>
                <div class="flex-1 h-6 bg-gray-800 rounded flex items-center justify-end px-2">
                  <span class="text-[10px] text-white">Paid: 450</span>
                </div>
              </div>
              <div class="w-14 text-[10px] font-medium text-gray-900 text-right">₦65K</div>
            </div>
          </div>
          <!-- Tuesday -->
          <div class="flex items-center gap-3">
            <div class="w-10 text-[10px] font-medium text-gray-600">Tue</div>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 flex items-center gap-1">
                <div class="flex-1 h-6 bg-gray-200 rounded flex items-center px-2">
                  <span class="text-[10px] text-gray-700">Free: 1200</span>
                </div>
                <div class="flex-1 h-6 bg-gray-800 rounded flex items-center justify-end px-2">
                  <span class="text-[10px] text-white">Paid: 450</span>
                </div>
              </div>
              <div class="w-14 text-[10px] font-medium text-gray-900 text-right">₦65K</div>
            </div>
          </div>
          <!-- Wednesday -->
          <div class="flex items-center gap-3">
            <div class="w-10 text-[10px] font-medium text-gray-600">Wed</div>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 flex items-center gap-1">
                <div class="flex-1 h-6 bg-gray-200 rounded flex items-center px-2">
                  <span class="text-[10px] text-gray-700">Free: 1200</span>
                </div>
                <div class="flex-1 h-6 bg-gray-800 rounded flex items-center justify-end px-2">
                  <span class="text-[10px] text-white">Paid: 450</span>
                </div>
              </div>
              <div class="w-14 text-[10px] font-medium text-gray-900 text-right">₦65K</div>
            </div>
          </div>
          <!-- Thursday -->
          <div class="flex items-center gap-3">
            <div class="w-10 text-[10px] font-medium text-gray-600">Thu</div>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 flex items-center gap-1">
                <div class="flex-1 h-6 bg-gray-200 rounded flex items-center px-2">
                  <span class="text-[10px] text-gray-700">Free: 1200</span>
                </div>
                <div class="flex-1 h-6 bg-gray-800 rounded flex items-center justify-end px-2">
                  <span class="text-[10px] text-white">Paid: 450</span>
                </div>
              </div>
              <div class="w-14 text-[10px] font-medium text-gray-900 text-right">₦65K</div>
            </div>
          </div>
          <!-- Friday -->
          <div class="flex items-center gap-3">
            <div class="w-10 text-[10px] font-medium text-gray-600">Fri</div>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 flex items-center gap-1">
                <div class="flex-1 h-6 bg-gray-200 rounded flex items-center px-2">
                  <span class="text-[10px] text-gray-700">Free: 1200</span>
                </div>
                <div class="flex-1 h-6 bg-gray-800 rounded flex items-center justify-end px-2">
                  <span class="text-[10px] text-white">Paid: 450</span>
                </div>
              </div>
              <div class="w-14 text-[10px] font-medium text-gray-900 text-right">₦65K</div>
            </div>
          </div>
          <!-- Saturday -->
          <div class="flex items-center gap-3">
            <div class="w-10 text-[10px] font-medium text-gray-600">Sat</div>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 flex items-center gap-1">
                <div class="flex-1 h-6 bg-gray-200 rounded flex items-center px-2">
                  <span class="text-[10px] text-gray-700">Free: 1200</span>
                </div>
                <div class="flex-1 h-6 bg-gray-800 rounded flex items-center justify-end px-2">
                  <span class="text-[10px] text-white">Paid: 450</span>
                </div>
              </div>
              <div class="w-14 text-[10px] font-medium text-gray-900 text-right">₦65K</div>
            </div>
          </div>
          <!-- Sunday -->
          <div class="flex items-center gap-3">
            <div class="w-10 text-[10px] font-medium text-gray-600">Sun</div>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 flex items-center gap-1">
                <div class="flex-1 h-6 bg-gray-200 rounded flex items-center px-2">
                  <span class="text-[10px] text-gray-700">Free: 1200</span>
                </div>
                <div class="flex-1 h-6 bg-gray-800 rounded flex items-center justify-end px-2">
                  <span class="text-[10px] text-white">Paid: 450</span>
                </div>
              </div>
              <div class="w-14 text-[10px] font-medium text-gray-900 text-right">₦65K</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Breakdown -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 class="text-sm font-bold text-gray-900 mb-4">Revenue Breakdown</h3>
        <div class="space-y-3">
          <!-- Paid Votes -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-medium text-gray-900">Paid Votes</span>
              <span class="text-[10px] text-gray-600">₦387,450 (84.8%)</span>
            </div>
            <div class="h-6 bg-gray-800 rounded"></div>
          </div>
          <!-- Medical Fees -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-medium text-gray-900">Medical Fees</span>
              <span class="text-[10px] text-gray-600">₦387,450 (84.8%)</span>
            </div>
            <div class="h-6 bg-gray-800 rounded" style="width: 75%;"></div>
          </div>
          <!-- Registration Fees -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-medium text-gray-900">Registration Fees</span>
              <span class="text-[10px] text-gray-600">₦387,450 (84.8%)</span>
            </div>
            <div class="h-6 bg-gray-800 rounded" style="width: 45%;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Contestants Tab -->
    <div v-if="activeTab === 'top-contestants'" class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h3 class="text-sm font-bold text-gray-900 mb-6">Top Performing Contestants</h3>
      <div class="space-y-4">
        <!-- Contestant 1 -->
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span class="text-xs font-bold text-purple-600">1</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">Sarah Johnson</span>
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="text-[10px] text-purple-600">+0.5%</span>
              </div>
            </div>
            <p class="text-xs text-gray-600 mb-2">15,678 votes (23.4%)</p>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-purple-600 rounded-full" style="width: 100%;"></div>
            </div>
          </div>
        </div>

        <!-- Contestant 2 -->
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span class="text-xs font-bold text-purple-600">2</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">Sarah Johnson</span>
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="text-[10px] text-purple-600">+0.5%</span>
              </div>
            </div>
            <p class="text-xs text-gray-600 mb-2">15,678 votes (23.4%)</p>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-purple-600 rounded-full" style="width: 85%;"></div>
            </div>
          </div>
        </div>

        <!-- Contestant 3 -->
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span class="text-xs font-bold text-purple-600">3</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">Sarah Johnson</span>
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="text-[10px] text-red-600">-2.1%</span>
              </div>
            </div>
            <p class="text-xs text-gray-600 mb-2">15,678 votes (23.4%)</p>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-purple-600 rounded-full" style="width: 70%;"></div>
            </div>
          </div>
        </div>

        <!-- Contestant 4 -->
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span class="text-xs font-bold text-purple-600">4</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">Sarah Johnson</span>
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="text-[10px] text-purple-600">+0.5%</span>
              </div>
            </div>
            <p class="text-xs text-gray-600 mb-2">15,678 votes (23.4%)</p>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-purple-600 rounded-full" style="width: 55%;"></div>
            </div>
          </div>
        </div>

        <!-- Contestant 5 -->
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span class="text-xs font-bold text-purple-600">5</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">Sarah Johnson</span>
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="text-[10px] text-red-600">-2.1%</span>
              </div>
            </div>
            <p class="text-xs text-gray-600 mb-2">15,678 votes (23.4%)</p>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-purple-600 rounded-full" style="width: 40%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Voting Trends Tab -->
    <div v-if="activeTab === 'voting-trends'">
      <!-- Three Metric Cards -->
      <div class="grid grid-cols-3 gap-6 mb-6">
        <!-- Peak Voting Hour -->
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h4 class="text-xs font-medium text-gray-600 mb-2">Peak Voting Hour</h4>
              <h3 class="text-2xl font-bold text-gray-900">8:00 PM</h3>
            </div>
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Avg. Session Duration -->
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h4 class="text-xs font-medium text-gray-600 mb-2">Avg. Session Duration</h4>
              <h3 class="text-2xl font-bold text-gray-900">4m 32s</h3>
            </div>
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Social Shares -->
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h4 class="text-xs font-medium text-gray-600 mb-2">Social Shares</h4>
              <h3 class="text-2xl font-bold text-gray-900">2,847</h3>
            </div>
            <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="grid grid-cols-2 gap-6">
        <!-- Voting Pattern Analysis -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-sm font-bold text-gray-900 mb-6">Voting Pattern Analysis</h3>
          <div>
            <h4 class="text-xs font-medium text-gray-900 mb-4">Vote Distribution</h4>
            <div class="space-y-4">
              <!-- Free Votes -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-gray-900">Free Votes</span>
                  <span class="text-[10px] text-gray-600">110,859 (70.7%)</span>
                </div>
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-purple-600 rounded-full" style="width: 70.7%;"></div>
                </div>
              </div>
              <!-- Paid Votes -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-gray-900">Paid Votes</span>
                  <span class="text-[10px] text-gray-600">110,999 (70.7%)</span>
                </div>
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-gray-800 rounded-full" style="width: 70.7%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Voting Categories -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-sm font-bold text-gray-900 mb-6">Top Voting Categories</h3>
          <div class="space-y-4">
            <!-- Singing -->
            <div class="flex items-center justify-between pb-4 border-b border-gray-200">
              <span class="text-sm font-medium text-gray-900">Singing</span>
              <span class="text-xs text-gray-600">45,234 votes</span>
            </div>
            <!-- Dancing -->
            <div class="flex items-center justify-between pb-4 border-b border-gray-200">
              <span class="text-sm font-medium text-gray-900">Dancing</span>
              <span class="text-xs text-gray-600">38,567 votes</span>
            </div>
            <!-- Comedy -->
            <div class="flex items-center justify-between pb-4 border-b border-gray-200">
              <span class="text-sm font-medium text-gray-900">Comedy</span>
              <span class="text-xs text-gray-600">32,890 votes</span>
            </div>
            <!-- Acting -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">Acting</span>
              <span class="text-xs text-gray-600">28,456 votes</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Referral Performance Tab -->
    <div v-if="activeTab === 'referral-performance'" class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h3 class="text-sm font-bold text-gray-900 mb-6">Referral Performance by Contestant</h3>
      <div class="space-y-4">
        <!-- Sarah Johnson -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span class="text-xs font-bold text-white">SJ</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">Sarah Johnson</span>
            </div>
            <div class="flex items-center gap-4 mb-2">
              <div>
                <span class="text-xs text-gray-600">Referrals:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">234</span>
              </div>
              <div>
                <span class="text-xs text-gray-600">Conversions:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">189</span>
              </div>
              <div>
                <span class="text-xs text-gray-600">Rate:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">80.8%</span>
              </div>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gray-800 rounded-full" style="width: 80.8%;"></div>
            </div>
          </div>
        </div>

        <!-- Michael Chen -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span class="text-xs font-bold text-white">MC</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">Michael Chen</span>
            </div>
            <div class="flex items-center gap-4 mb-2">
              <div>
                <span class="text-xs text-gray-600">Referrals:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">234</span>
              </div>
              <div>
                <span class="text-xs text-gray-600">Conversions:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">189</span>
              </div>
              <div>
                <span class="text-xs text-gray-600">Rate:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">80.8%</span>
              </div>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gray-800 rounded-full" style="width: 80.8%;"></div>
            </div>
          </div>
        </div>

        <!-- Aisha Ibrahim -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span class="text-xs font-bold text-white">AI</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">Aisha Ibrahim</span>
            </div>
            <div class="flex items-center gap-4 mb-2">
              <div>
                <span class="text-xs text-gray-600">Referrals:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">234</span>
              </div>
              <div>
                <span class="text-xs text-gray-600">Conversions:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">189</span>
              </div>
              <div>
                <span class="text-xs text-gray-600">Rate:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">80.8%</span>
              </div>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gray-800 rounded-full" style="width: 80.8%;"></div>
            </div>
          </div>
        </div>

        <!-- David Okonkwo -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span class="text-xs font-bold text-white">DO</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-900">David Okonkwo</span>
            </div>
            <div class="flex items-center gap-4 mb-2">
              <div>
                <span class="text-xs text-gray-600">Referrals:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">234</span>
              </div>
              <div>
                <span class="text-xs text-gray-600">Conversions:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">189</span>
              </div>
              <div>
                <span class="text-xs text-gray-600">Rate:</span>
                <span class="text-xs font-medium text-gray-900 ml-1">80.8%</span>
              </div>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gray-800 rounded-full" style="width: 80.8%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Analytics Report Modal -->
    <div v-if="showExportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="showExportModal = false">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Export Analytics Report</h2>
          <button @click="showExportModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Export Format -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-3">Export Format</label>
            <div class="grid grid-cols-3 gap-4">
              <!-- PDF -->
              <button @click="exportForm.format = 'pdf'" class="p-4 border-2 rounded-lg transition-all flex flex-col items-center gap-2" :class="exportForm.format === 'pdf' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'">
                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="text-xs font-medium text-gray-900">PDF</span>
              </button>

              <!-- Excel -->
              <button @click="exportForm.format = 'excel'" class="p-4 border-2 rounded-lg transition-all flex flex-col items-center gap-2" :class="exportForm.format === 'excel' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'">
                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span class="text-xs font-medium text-gray-900">Excel</span>
              </button>

              <!-- PNG -->
              <button @click="exportForm.format = 'png'" class="p-4 border-2 rounded-lg transition-all flex flex-col items-center gap-2" :class="exportForm.format === 'png' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'">
                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-xs font-medium text-gray-900">PNG</span>
              </button>
            </div>
          </div>

          <!-- Date Range -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Date Range</label>
            <div class="relative">
              <select v-model="exportForm.dateRange" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Include Data -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-3">Include Data</label>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="exportForm.includeData.overview" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Overview Metrics</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="exportForm.includeData.topContestants" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Top Contestants</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="exportForm.includeData.votingTrends" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Voting Trends</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="exportForm.includeData.referralPerformance" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Referral Performance</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="exportForm.includeData.revenueBreakdown" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Revenue Breakdown</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="showExportModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="exportReport" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Export
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('overview');
const showExportModal = ref(false);

const exportForm = ref({
  format: 'pdf',
  dateRange: 'last-7-days',
  includeData: {
    overview: true,
    topContestants: true,
    votingTrends: true,
    referralPerformance: true,
    revenueBreakdown: true,
  },
});

const exportReport = () => {
  // Handle export logic here
  console.log('Exporting report:', exportForm.value);
  showExportModal.value = false;
};
</script>

