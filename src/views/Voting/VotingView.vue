<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p class="text-xs text-gray-600">Manage contestant applications and profiles</p>
      </div>
      <div class="flex items-center gap-4">
        <!-- Export Logs Button -->
        <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span class="text-xs text-gray-700">Export Logs</span>
        </button>
        <!-- Filter Button -->
        <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <svg class="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span class="text-xs text-gray-700">Filter</span>
        </button>
      </div>
    </div>

    <!-- Secondary Navigation Tabs -->
    <div class="flex items-center gap-6 mb-6 border-b border-gray-200">
      <button @click="activeTab = 'settings'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'settings' ? 'text-gray-900' : 'text-gray-500'">Voting Settings</span>
        <div v-if="activeTab === 'settings'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
      <button @click="activeTab = 'logs'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'logs' ? 'text-gray-900' : 'text-gray-500'">Voting Logs</span>
        <div v-if="activeTab === 'logs'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
      <button @click="activeTab = 'revenue'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'revenue' ? 'text-gray-900' : 'text-gray-500'">Revenue Dashboard</span>
        <div v-if="activeTab === 'revenue'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
      <button @click="activeTab = 'leaderboard'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'leaderboard' ? 'text-gray-900' : 'text-gray-500'">Leaderboard Control</span>
        <div v-if="activeTab === 'leaderboard'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
    </div>

    <!-- Voting Settings Tab Content -->
    <div v-if="activeTab === 'settings'">
      <!-- Two Column Layout -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <!-- Left Column - Free Voting Rules -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-6">Free Voting Rules</h2>
          
          <!-- Enable Free Voting -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Enable Free Voting</label>
                <p class="text-xs text-gray-500">Allow users to vote for free</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="enableFreeVoting" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          <!-- Voting Interval -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Voting Interval</label>
            <div class="relative">
              <select v-model="votingInterval" class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                <option value="daily">Daily (24 hours)</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <svg class="absolute right-3 bottom-2.5 w-5 h-5 pointer-events-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Timer Reset Time -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Timer Reset Time</label>
            <input type="text" v-model="timerResetTime" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="12:00 AM">
            <p class="text-xs text-gray-500 mt-1">Time when daily voting clears reset</p>
          </div>

          <!-- Max Free Votes per User -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Max Free Votes per User</label>
            <input type="number" v-model="maxFreeVotes" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="1">
          </div>
        </div>

        <!-- Right Column - Paid Voting Settings -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-6">Paid Voting Settings</h2>
          
          <!-- Enable Paid Voting -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Enable Paid Voting</label>
                <p class="text-xs text-gray-500">Allow users to purchase votes</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="enablePaidVoting" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          <!-- Price per Vote -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Price per Vote (N)</label>
            <input type="number" v-model="pricePerVote" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="100">
          </div>

          <!-- Bulk Vote Packages -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Bulk Vote Packages</label>
            <div class="flex items-center gap-2 mb-4">
              <input type="number" v-model="bulkVotes" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Votes">
              <input type="number" v-model="bulkPrice" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Price (N)">
              <button @click="addBulkPackage" class="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">
                Add
              </button>
            </div>
            <!-- Existing Bulk Packages -->
            <div class="space-y-2">
              <div v-for="(pkg, index) in bulkPackages" :key="index" class="text-sm text-gray-700">
                {{ pkg.votes }} votes = N{{ pkg.price }} ({{ pkg.discount }}% discount)
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Methods</label>
            <div class="space-y-4">
              <!-- Card Payment -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Card Payment</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="paymentMethods.card" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <!-- Bank Transfer -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Bank Transfer</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="paymentMethods.bankTransfer" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <!-- Mobile Money -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Mobile Money</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="paymentMethods.mobileMoney" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section - Two Columns -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <!-- Left Column - Advanced Settings -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Advanced Settings</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Vote Verification</label>
            <div class="relative">
              <select v-model="voteVerification" class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                <option value="">Select verification</option>
                <option value="email">Email Verification</option>
                <option value="phone">Phone Verification</option>
              </select>
              <svg class="absolute right-3 bottom-2.5 w-5 h-5 pointer-events-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Right Column - Anti-Bot Protection -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Anti-Bot Protection</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Anti-Bot Protection</label>
            <div class="relative">
              <select v-model="antiBotProtection" class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                <option value="">Select Anti-Bot Protection</option>
                <option value="captcha">CAPTCHA</option>
                <option value="recaptcha">reCAPTCHA</option>
              </select>
              <svg class="absolute right-3 bottom-2.5 w-5 h-5 pointer-events-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Settings Button -->
      <div class="flex justify-end">
        <button @click="handleSaveSettings" class="px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium rounded-full hover:from-purple-700 hover:to-orange-600">
          Save Settings
        </button>
      </div>
    </div>

    <!-- Voting Logs Tab Content -->
    <div v-if="activeTab === 'logs'">
      <!-- Voting Activity Logs Section -->
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <!-- Header with Filters -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold text-gray-900">Voting Activity Logs</h2>
          <div class="flex items-center gap-4">
            <!-- Dropdown -->
            <div class="relative">
              <select class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white text-sm">
                <option>All Votes</option>
                <option>Free Votes</option>
                <option>Paid Votes</option>
              </select>
              <svg class="absolute right-3 bottom-2.5 w-5 h-5 pointer-events-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <!-- Date Input -->
            <input type="date" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
          </div>
        </div>

        <!-- Log Entries -->
        <div class="space-y-4">
          <!-- John Doe -->
          <div class="flex items-center justify-between py-4 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-semibold text-gray-900">John Doe</span>
                  <span class="px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">free</span>
                </div>
                <p class="text-xs text-gray-600">Voted for Soran Johnson - 2024-01-20 14:30:25</p>
                <p class="text-xs text-gray-500 mt-1">IP: 192.168.1.100</p>
              </div>
            </div>
          </div>

          <!-- Jane Smith -->
          <div class="flex items-center justify-between py-4 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                JS
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-semibold text-gray-900">Jane Smith</span>
                  <span class="px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full">gold</span>
                </div>
                <p class="text-xs text-gray-600">Voted for Michael Chen - 2024-01-20 14:28:15</p>
                <p class="text-xs text-gray-500 mt-1">₩00 - IP: 192.168.1.101</p>
              </div>
            </div>
          </div>

          <!-- Anonymous -->
          <div class="flex items-center justify-between py-4">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-semibold text-gray-900">Anonymous</span>
                  <span class="px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full">pro</span>
                </div>
                <p class="text-xs text-gray-600">Voted for Aisha Ibrahim - 2024-01-20 14:25:10</p>
                <p class="text-xs text-gray-500 mt-1">₩00 - IP: 192.168.1.101</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Dashboard Tab Content -->
    <div v-if="activeTab === 'revenue'">
      <!-- First Row - Revenue Metrics -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <!-- Total Revenue -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h4 class="text-xs text-gray-600 mb-1">Total Revenue</h4>
          <h3 class="text-2xl font-bold text-gray-900">N245,670</h3>
        </div>

        <!-- Today -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h4 class="text-xs text-gray-600 mb-1">Today</h4>
          <h3 class="text-2xl font-bold text-gray-900">N12,450</h3>
        </div>

        <!-- This Week -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <h4 class="text-xs text-gray-600 mb-1">This Week</h4>
          <h3 class="text-2xl font-bold text-gray-900">N89,320</h3>
        </div>

        <!-- This Month -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
          <h4 class="text-xs text-gray-600 mb-1">This Month</h4>
          <h3 class="text-2xl font-bold text-gray-900">N245,670</h3>
        </div>
      </div>

      <!-- Second Row - Vote Metrics -->
      <div class="grid grid-cols-3 gap-4">
        <!-- Total Votes -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <h4 class="text-xs text-gray-600 mb-1">Total Votes</h4>
          <h3 class="text-2xl font-bold text-gray-900">156,789</h3>
        </div>

        <!-- Paid Votes -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <h4 class="text-xs text-gray-600 mb-1">Paid Votes</h4>
          <h3 class="text-2xl font-bold text-green-600">45,890</h3>
        </div>

        <!-- Free Votes -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <h4 class="text-xs text-gray-600 mb-1">Free Votes</h4>
          <h3 class="text-2xl font-bold text-blue-600">110,899</h3>
        </div>
      </div>
    </div>

    <!-- Leaderboard Control Tab Content -->
    <div v-if="activeTab === 'leaderboard'">
      <!-- Leaderboard Settings Section -->
      <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 class="text-lg font-bold text-gray-900 mb-6">Leaderboard Settings</h2>
        
        <!-- Public Leaderboard -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Public Leaderboard</label>
              <p class="text-xs text-gray-500">Allow public to view contestant rankings</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="publicLeaderboard" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <!-- Show Vote Counts and Update Frequency -->
        <div class="grid grid-cols-2 gap-6">
          <!-- Show Vote Counts -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Show Vote Counts</label>
            <div class="relative">
              <select v-model="showVoteCounts" class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                <option value="">Select Vote count</option>
                <option value="show">Show</option>
                <option value="hide">Hide</option>
              </select>
              <svg class="absolute right-3 bottom-2.5 w-5 h-5 pointer-events-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Update Frequency -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
            <div class="relative">
              <select v-model="updateFrequency" class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                <option value="">Select Frequency</option>
                <option value="realtime">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
              <svg class="absolute right-3 bottom-2.5 w-5 h-5 pointer-events-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Update Settings Button -->
      <div class="flex justify-end">
        <button @click="handleUpdateSettings" class="px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium rounded-full hover:from-purple-700 hover:to-orange-600">
          Update Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('settings');
const enableFreeVoting = ref(true);
const enablePaidVoting = ref(true);
const votingInterval = ref('daily');
const timerResetTime = ref('12:00 AM');
const maxFreeVotes = ref(1);
const pricePerVote = ref(100);
const bulkVotes = ref<number | null>(null);
const bulkPrice = ref<number | null>(null);
const voteVerification = ref('');
const antiBotProtection = ref('');
const publicLeaderboard = ref(false);
const showVoteCounts = ref('');
const updateFrequency = ref('');

const paymentMethods = ref({
  card: true,
  bankTransfer: true,
  mobileMoney: false
});

const bulkPackages = ref([
  { votes: 10, price: 900, discount: 10 },
  { votes: 10, price: 900, discount: 10 },
  { votes: 100, price: 8500, discount: 15 }
]);

const addBulkPackage = () => {
  if (bulkVotes.value && bulkPrice.value) {
    const discount = Math.round(((pricePerVote.value * bulkVotes.value - bulkPrice.value) / (pricePerVote.value * bulkVotes.value)) * 100);
    bulkPackages.value.push({
      votes: bulkVotes.value,
      price: bulkPrice.value,
      discount: discount
    });
    bulkVotes.value = null;
    bulkPrice.value = null;
  }
};

const handleSaveSettings = () => {
  console.log('Saving settings');
};

const handleUpdateSettings = () => {
  console.log('Updating settings');
};
</script>

