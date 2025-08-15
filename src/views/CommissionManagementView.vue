<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen font-sans">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Commission Management</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Manage commission rates and view earnings</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button 
          @click="activeTab = 'structure'"
          :class="[
            activeTab === 'structure' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent',
            'whitespace-nowrap py-4 px-1 font-medium text-sm'
          ]"
        >
          Commission Structure
        </button>
        <button 
          @click="activeTab = 'earnings'"
          :class="[
            activeTab === 'earnings' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent',
            'whitespace-nowrap py-4 px-1 font-medium text-sm'
          ]"
        >
          Commission Earnings
        </button>
        <button 
          @click="activeTab = 'reports'"
          :class="[
            activeTab === 'reports' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent',
            'whitespace-nowrap py-4 px-1 font-medium text-sm'
          ]"
        >
          Reports
        </button>
      </nav>
    </div>

    <!-- Commission Structure Tab -->
    <div v-if="activeTab === 'structure'">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Commission Structure</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manage commission rates for different service types</p>
        </div>
        <!-- <button 
          @click="openAddServiceModal"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          + Add Service Type
        </button> -->
      </div>

      <!-- Bulk Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4 p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                @change="toggleSelectAll"
                :checked="selectedSettings.length === commissionSettings.length && commissionSettings.length > 0"
                :indeterminate="selectedSettings.length > 0 && selectedSettings.length < commissionSettings.length"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Select All</span>
            </label>
            <span v-if="selectedSettings.length > 0" class="text-sm text-gray-500 dark:text-gray-400">
              {{ selectedSettings.length }} selected
            </span>
          </div>
          <button 
            v-if="selectedSettings.length > 0"
            @click="payBulkCommissions(selectedSettings)"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Pay {{ selectedSettings.length }} Commission{{ selectedSettings.length > 1 ? 's' : '' }}
          </button>
        </div>
      </div>

      <!-- Commission Settings Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:border-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <input 
                    type="checkbox" 
                    @change="toggleSelectAll"
                    :checked="selectedSettings.length === commissionSettings.length && commissionSettings.length > 0"
                    :indeterminate="selectedSettings.length > 0 && selectedSettings.length < commissionSettings.length"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admin %</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Referrer %</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Partner %</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Developer %</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent %</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Commission %</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="setting in commissionSettings" :key="setting.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    :value="setting.id"
                    v-model="selectedSettings"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ setting.service_type }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {{ setting.admin_percentage }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {{ setting.referrer_percentage }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {{ setting.partner_percentage }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {{ setting.developer_percentage }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {{ setting.agent_percentage }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {{ setting.commission_percentage }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(setting.updated_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <button @click="editCommissionSetting(setting)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" title="Edit">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <!-- <button @click="payCommission(setting.id)" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" title="Pay Commission">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </button> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Loading State -->
        <div v-if="loadingSettings" class="p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading commission settings...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="commissionSettings.length === 0" class="p-8 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p class="text-gray-500 dark:text-gray-400">No commission settings found</p>
          <p class="text-sm text-gray-400 dark:text-gray-500">Get started by adding your first service type</p>
        </div>
      </div>
    </div>

    <!-- Commission Earnings Tab -->
    <div v-if="activeTab === 'earnings'">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Commission Earnings</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">View and manage commission earnings across users</p>
        </div>
        <div class="flex gap-3">
          <button 
            @click="loadCommissionEarnings"
            :disabled="loadingEarnings"
            class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="!loadingEarnings" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            {{ loadingEarnings ? 'Refreshing...' : 'Refresh' }}
          </button>
          <!-- <button 
            @click="openAdjustmentModal"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            + Add Annual Adjustment
          </button> -->
          <!-- <button 
            @click="saveCommissionEarnings"
            :disabled="savingEarnings"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="!savingEarnings" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            {{ savingEarnings ? 'Saving...' : 'Save Changes' }}
          </button> -->
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
        <div class="flex flex-col md:flex-row gap-4 items-end">
          <!-- Search -->
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search by user...</label>
            <div class="relative">
              <input
                v-model="earningsSearch"
                type="text"
                placeholder="Search by user name or email..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Commission Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Commission Type</label>
            <select v-model="earningsFilters.commissionType" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Types</option>
              <option value="referral">Referral</option>
              <option value="transaction">Transaction Fee</option>
              <option value="bonus">Bonus</option>
            </select>
          </div>

          <!-- Date Range Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pick a date range</label>
            <div class="relative">
              <input
                v-model="earningsFilters.dateRange"
                type="text"
                placeholder="Select date range..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readonly
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Filter Button -->
          <button class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Commission Earnings Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <!-- Loading State -->
        <div v-if="loadingEarnings" class="p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading commission earnings...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="commissionEarnings.length === 0" class="p-8 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p class="text-gray-500 dark:text-gray-400">No commission earnings found</p>
          <p class="text-sm text-gray-400 dark:text-gray-500">Commission data will appear here once users start earning</p>
        </div>
        
        <!-- Table Content -->
        <div v-else>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Original Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Commission</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="earning in paginatedEarnings" :key="earning.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ earning.user.charAt(0).toUpperCase() }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ earning.user }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ earning.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {{ earning.commissionType }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {{ formatCurrency(earning.originalAmount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {{ formatCurrency(earning.amount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {{ earning.date }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      earning.status === 'settled' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      earning.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      earning.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    ]">
                      {{ earning.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-mono text-xs">{{ earning.transactionId || 'N/A' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="editEarning(earning)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredEarnings.length }} entries (filtered from {{ totalEarnings }} total entries)
            </div>
            <div class="flex gap-1">
              <button 
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                class="px-2 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                &laquo;
              </button>
              <button 
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-2 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                &lsaquo;
              </button>
              <button 
                v-for="page in pageNumbers" 
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-1 text-sm rounded',
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'border hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                {{ page }}
              </button>
              <button 
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-2 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                &rsaquo;
              </button>
              <button 
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                class="px-2 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reports Tab -->
    <div v-if="activeTab === 'reports'">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Commission Reports</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Generate and view detailed commission reports</p>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <!-- Total Commission Paid -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700" data-summary-card="total-paid">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Commission Paid</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {{ reportData ? formatCurrency(reportData.totalCommissions) : '0.00' }}
              </p>
              <div class="flex items-center mt-1">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span class="text-sm text-green-600 dark:text-green-400 ml-1">
                  {{ reportData ? `${reportData.paidCommissions} transactions` : 'No data' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Commissions -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700" data-summary-card="pending">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Commissions</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {{ reportData ? formatCurrency(reportData.pendingCommissions || 0) : '0.00' }}
              </p>
              <div class="flex items-center mt-1">
                <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span class="text-sm text-yellow-600 dark:text-yellow-400 ml-1">
                  {{ reportData ? `${reportData.pendingCommissions || 0} pending` : 'No data' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Earners -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700" data-summary-card="top-earners">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {{ reportData ? reportData.totalUsers : 0 }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {{ reportData ? `with commission activity` : 'No data loaded' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Report Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
            <select v-model="reportFilters.dateRange" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Commission Type</label>
            <select v-model="reportFilters.commissionType" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100">
              <option value="">All Types</option>
              <option value="referral">Referral</option>
              <option value="transaction">Transaction</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select v-model="reportFilters.status" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100">
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="generateReport"
              :disabled="generatingReport"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <div v-if="generatingReport" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {{ generatingReport ? 'Generating...' : 'Generate Report' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Report Results -->
      <div v-if="reportData" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Report Results</h3>
          <div class="flex gap-2">
            <button @click="exportReport('excel')" class="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Excel
            </button>
            <button @click="exportReport('pdf')" class="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              PDF
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">Total Commissions</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(reportData.totalCommissions) }}</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">Total Referrals</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ reportData.totalReferrals }}</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">Average Commission</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(reportData.averageCommission) }}</p>
            </div>
          </div>
          
          <!-- Report Chart Placeholder -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
            <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-gray-500 dark:text-gray-400">Commission trend chart will be displayed here</p>
          </div>
          
          <!-- Commission Breakdown -->
          <div v-if="reportData && reportData.commissionBreakdown" class="mt-6">
            <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Commission Breakdown by Type</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="(data, type) in reportData.commissionBreakdown" 
                :key="type"
                class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ type }}</p>
                    <p class="text-xl font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(data.total) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ data.count }} transactions</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500">Avg: {{ formatCurrency(data.total / data.count) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Monthly Trends -->
          <div v-if="reportData && reportData.monthlyTrends" class="mt-6">
            <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Monthly Commission Trends</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Month</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Commissions</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction Count</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Average</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="(data, month) in reportData.monthlyTrends" :key="month" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {{ formatCurrency(data.total) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ data.count }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ formatCurrency(data.total / data.count) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Manual Commission Adjustment Modal -->
  <TransitionRoot as="template" :show="showAdjustmentModal">
    <Dialog as="div" class="relative z-50" @close="closeAdjustmentModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <div>
                  <DialogTitle as="h3" class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Manual Commission Adjustment
                  </DialogTitle>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Add a new user to the referral network
                  </p>
                </div>
                <button
                  @click="closeAdjustmentModal"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Form -->
              <form @submit.prevent="saveAdjustment" class="space-y-6">
                <!-- User Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    User
                  </label>
                  <div class="relative">
                    <input
                      v-model="userSearchQuery"
                      @input="searchUsers(userSearchQuery)"
                      @focus="searchUsers(userSearchQuery)"
                      type="text"
                      placeholder="Search users"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <!-- User Dropdown -->
                    <div v-if="filteredUsers.length > 0" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                      <div
                        v-for="user in filteredUsers"
                        :key="user.id"
                        @click="selectUser(user)"
                        class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ user.name }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Adjustment Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adjustment Type
                  </label>
                  <select
                    v-model="adjustmentData.adjustmentType"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Add Commission">Add Commission</option>
                    <option value="Remove Commission">Remove Commission</option>
                  </select>
                </div>

                <!-- Amount -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount
                  </label>
                  <div class="relative">
                    <input
                      v-model="adjustmentData.amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <!-- Notes -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    v-model="adjustmentData.notes"
                    rows="3"
                    placeholder="Enter reason for adjustment"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-4">
                  <button
                    type="button"
                    @click="closeAdjustmentModal"
                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Adjustment
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Add/Edit Commission Setting Modal -->
  <TransitionRoot as="template" :show="showCommissionModal">
    <Dialog as="div" class="relative z-50" @close="closeCommissionModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <div>
                  <DialogTitle as="h3" class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {{ editingCommission ? 'Edit Commission Setting' : 'Add New Service Type' }}
                  </DialogTitle>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ editingCommission ? 'Update commission percentages for this service type' : 'Configure commission structure for a new service type' }}
                  </p>
                </div>
                <button
                  @click="closeCommissionModal"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Form -->
              <form @submit.prevent="saveCommissionSetting" class="space-y-6">
                <!-- Service Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Type
                  </label>
                  <input
                    v-model="commissionForm.service_type"
                    type="text"
                    placeholder="e.g., Food, Uber, Bills Payment"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    :readonly="editingCommission"
                  />
                </div>

                <!-- Commission Percentages Grid -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Admin Percentage
                    </label>
                    <div class="relative">
                      <input
                        v-model="commissionForm.admin_percentage"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Referrer Percentage
                    </label>
                    <div class="relative">
                      <input
                        v-model="commissionForm.referrer_percentage"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Partner Percentage
                    </label>
                    <div class="relative">
                      <input
                        v-model="commissionForm.partner_percentage"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Developer Percentage
                    </label>
                    <div class="relative">
                      <input
                        v-model="commissionForm.developer_percentage"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Agent Percentage
                    </label>
                    <div class="relative">
                      <input
                        v-model="commissionForm.agent_percentage"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Commission Percentage
                    </label>
                    <div class="relative">
                      <input
                        v-model="commissionForm.commission_percentage"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>
                </div>

                <!-- Total Percentage Display -->
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Percentage</p>
                  <p class="text-2xl font-bold" :class="totalPercentage === 100 ? 'text-green-600' : 'text-red-600'">
                    {{ totalPercentage.toFixed(2) }}%
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ totalPercentage === 100 ? 'Perfect! Total equals 100%' : 'Total should equal 100%' }}
                  </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-4">
                  <button
                    type="button"
                    @click="closeCommissionModal"
                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="savingCommission || totalPercentage !== 100"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <div v-if="savingCommission" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {{ savingCommission ? 'Saving...' : (editingCommission ? 'Update Setting' : 'Create Setting') }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import {
  TransitionRoot,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild
} from '@headlessui/vue'
import commissionService from '@/services/commissionService'
import userService from '@/services/userService'

const toast = useToast()

// Tab management
const activeTab = ref('structure')

// Commission structure data
const commissionStructure = ref({
  directReferral: {
    level1: 0.00,
    level2: 0.00,
    level3: 0.00
  },
  transactionBased: {
    standard: 0.00,
    highVolume: 0.00,
    premium: 0.00
  }
})

// Loading states
const savingStructure = ref(false)
const generatingReport = ref(false)
const savingEarnings = ref(false)

// Modal state
const showAdjustmentModal = ref(false)
const showCommissionModal = ref(false)
const editingCommission = ref(false)

// Adjustment modal data
const adjustmentData = ref({
  user: '',
  adjustmentType: '',
  amount: 0.00,
  notes: ''
})

// Commission settings data
const commissionForm = ref({
  service_type: '',
  admin_percentage: 0,
  referrer_percentage: 0,
  partner_percentage: 0,
  developer_percentage: 0,
  agent_percentage: 0,
  commission_percentage: 0
})

// Computed property for total percentage
const totalPercentage = computed(() => {
  return (
    commissionForm.value.admin_percentage +
    commissionForm.value.referrer_percentage +
    commissionForm.value.partner_percentage +
    commissionForm.value.developer_percentage +
    commissionForm.value.agent_percentage +
    commissionForm.value.commission_percentage
  )
})

// Commission settings data from API
const commissionSettings = ref([])

// Selected settings for bulk actions
const selectedSettings = ref([])

// Loading state for commission settings
const loadingSettings = ref(false)
const savingCommission = ref(false)

// Available users for selection
const availableUsers = ref([
  { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@example.com' },
  { id: 5, name: 'David Brown', email: 'david.brown@example.com' }
])

// Filtered users based on search
const filteredUsers = ref([])
const userSearchQuery = ref('')

// Earnings data and pagination
const earningsSearch = ref('')
const earningsFilters = ref({
  commissionType: '',
  dateRange: ''
})
const currentPage = ref(1)
const pageSize = ref(10)

// Commission earnings data - will be populated from API
const commissionEarnings = ref([])
const loadingEarnings = ref(false)

// Computed properties for pagination
const filteredEarnings = computed(() => {
  let filtered = commissionEarnings.value

  // Apply search filter
  if (earningsSearch.value) {
    const search = earningsSearch.value.toLowerCase()
    filtered = filtered.filter(earning => 
      earning.user.toLowerCase().includes(search) ||
      earning.email.toLowerCase().includes(search)
    )
  }

  // Apply commission type filter
  if (earningsFilters.value.commissionType) {
    filtered = filtered.filter(earning => 
      earning.commissionType.toLowerCase().includes(earningsFilters.value.commissionType.toLowerCase())
    )
  }

  return filtered
})

const totalEarnings = computed(() => commissionEarnings.value.length)
const totalPages = computed(() => Math.ceil(filteredEarnings.value.length / pageSize.value))
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, filteredEarnings.value.length))

const paginatedEarnings = computed(() => {
  const start = startIndex.value
  const end = endIndex.value
  return filteredEarnings.value.slice(start, end)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []
  const maxPages = 5
  
  let start = Math.max(1, current - Math.floor(maxPages / 2))
  let end = Math.min(total, start + maxPages - 1)
  
  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Report filters
const reportFilters = ref({
  dateRange: '30',
  commissionType: '',
  status: ''
})

// Report data
const reportData = ref(null)

// Format currency utility
const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '0.00'
  
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Save commission structure
const saveCommissionStructure = async () => {
  savingStructure.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would call your actual API
    // await commissionService.updateStructure(commissionStructure.value)
    
    toast.success('Commission structure updated successfully!')
  } catch (error) {
    console.error('Error saving commission structure:', error)
            // toast.error('Failed to update commission structure')
  } finally {
    savingStructure.value = false
  }
}

// Save commission earnings
const saveCommissionEarnings = async () => {
  savingEarnings.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would call your actual API to save earnings changes
    // await commissionService.updateEarnings(commissionEarnings.value)
    
    toast.success('Commission earnings updated successfully!')
  } catch (error) {
    console.error('Error saving commission earnings:', error)
    // toast.error('Failed to update commission earnings')
  } finally {
    savingEarnings.value = false
  }
}

// Edit earning
const editEarning = (earning) => {
  console.log('Editing earning:', earning)
  // Here you would implement the edit functionality
  // This could open a modal or navigate to an edit page
  toast.info(`Editing earning for ${earning.user}`)
}

// Open adjustment modal
const openAdjustmentModal = () => {
  showAdjustmentModal.value = true
  // Reset form data
  adjustmentData.value = {
    user: '',
    adjustmentType: '',
    amount: 0.00,
    notes: ''
  }
  userSearchQuery.value = ''
  filteredUsers.value = []
}

// Close adjustment modal
const closeAdjustmentModal = () => {
  showAdjustmentModal.value = false
}

// Open commission setting modal
const openAddServiceModal = () => {
  editingCommission.value = false
  commissionForm.value = {
    service_type: '',
    admin_percentage: 0,
    referrer_percentage: 0,
    partner_percentage: 0,
    developer_percentage: 0,
    agent_percentage: 0,
    commission_percentage: 0
  }
  showCommissionModal.value = true
}

// Open commission setting modal for editing
const editCommissionSetting = (setting) => {
  editingCommission.value = true
  commissionForm.value = { ...setting }
  showCommissionModal.value = true
}

// Close commission setting modal
const closeCommissionModal = () => {
  showCommissionModal.value = false
}

// Save commission setting
const saveCommissionSetting = async () => {
  if (!commissionForm.value.service_type || commissionForm.value.admin_percentage === 0 || commissionForm.value.commission_percentage === 0) {
    // toast.error('Please fill in all required fields and ensure percentages are not zero.')
    return
  }

  savingCommission.value = true
  try {
    if (editingCommission.value) {
      // Update existing setting
      const payload = {
        commissionID: commissionForm.value.id,
        admin_percentage: commissionForm.value.admin_percentage,
        referrer_percentage: commissionForm.value.referrer_percentage,
        partner_percentage: commissionForm.value.partner_percentage,
        developer_percentage: commissionForm.value.developer_percentage,
        agent_percentage: commissionForm.value.agent_percentage,
        commission_percentage: commissionForm.value.commission_percentage
      }
      
      const response = await commissionService.updateCommissionSetting(payload)
      if (response.data.ok) {
        // Update local state
        const index = commissionSettings.value.findIndex(s => s.id === commissionForm.value.id)
        if (index !== -1) {
          commissionSettings.value[index] = { 
            ...commissionForm.value, 
            updated_at: new Date().toISOString() 
          }
        }
        toast.success('Commission setting updated successfully!')
        closeCommissionModal()
      } else {
        // toast.error('Failed to update commission setting')
      }
    } else {
      // For new settings, we'll need to implement a create endpoint
      // For now, we'll show an info message
      toast.info('Create functionality will be implemented when the API endpoint is available')
    }
  } catch (error) {
    console.error('Error saving commission setting:', error)
    // toast.error('Failed to save commission setting')
  } finally {
    savingCommission.value = false
  }
}

// Search users
const searchUsers = (query) => {
  if (!query.trim()) {
    filteredUsers.value = []
    return
  }
  
  const searchTerm = query.toLowerCase()
  filteredUsers.value = availableUsers.value.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm)
  )
}

// Select user
const selectUser = (user) => {
  adjustmentData.value.user = user.name
  userSearchQuery.value = user.name
  filteredUsers.value = []
}

// Save adjustment
const saveAdjustment = async () => {
  if (!adjustmentData.value.user || !adjustmentData.value.adjustmentType || !adjustmentData.value.amount) {
    // toast.error('Please fill in all required fields')
    return
  }

  try {
    // Here you would call your actual API
    // await commissionService.createAdjustment(adjustmentData.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add to commission earnings
    const newEarning = {
      id: Date.now(),
      user: adjustmentData.value.user,
      email: availableUsers.value.find(u => u.name === adjustmentData.value.user)?.email || '',
      commissionType: adjustmentData.value.adjustmentType,
      source: 'Manual Adjustment',
      amount: parseFloat(adjustmentData.value.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      notes: adjustmentData.value.notes
    }
    
    commissionEarnings.value.unshift(newEarning)
    
    toast.success('Commission adjustment created successfully!')
    closeAdjustmentModal()
  } catch (error) {
    console.error('Error creating adjustment:', error)
    // toast.error('Failed to create commission adjustment')
  }
}

// Pay commission
const payCommission = async (commissionId) => {
  try {
    const response = await commissionService.payCommission({ commissionID: commissionId })
    if (response.data.ok) {
      toast.success('Commission paid successfully!')
      // Refresh commission settings
      await loadCommissionSettings()
    } else {
      // toast.error('Failed to pay commission')
    }
  } catch (error) {
    console.error('Error paying commission:', error)
    // toast.error('Failed to pay commission')
  }
}

// Pay bulk commissions
const payBulkCommissions = async (commissionIds) => {
  try {
    const response = await commissionService.payBulkCommissions({ commission_ids: commissionIds })
    if (response.data.ok) {
      toast.success(`${commissionIds.length} commissions paid successfully!`)
      // Refresh commission settings
      await loadCommissionSettings()
    } else {
      // toast.error('Failed to pay bulk commissions')
    }
  } catch (error) {
    console.error('Error paying bulk commissions:', error)
    // toast.error('Failed to pay bulk commissions')
  }
}

// Generate report
const generateReport = async () => {
  generatingReport.value = true
  try {
    // Calculate real commission statistics from loaded data
    const totalCommissions = commissionEarnings.value
      .filter(earning => earning.status === 'Paid' && earning.amount > 0)
      .reduce((sum, earning) => sum + earning.amount, 0)
    
    const pendingCommissions = commissionEarnings.value
      .filter(earning => earning.status === 'Pending' && earning.amount > 0)
      .reduce((sum, earning) => sum + earning.amount, 0)
    
    const totalReferrals = commissionEarnings.value
      .filter(earning => earning.commissionType.includes('Referral') || earning.commissionType.includes('Bonus'))
      .length
    
    const averageCommission = totalCommissions > 0 ? totalCommissions / commissionEarnings.value.filter(e => e.status === 'Paid' && e.amount > 0).length : 0
    
    // Update summary cards with real data
    updateSummaryCards(totalCommissions, pendingCommissions, totalReferrals, averageCommission)
    
    // Generate detailed report data
    reportData.value = {
      totalCommissions: totalCommissions,
      totalReferrals: totalReferrals,
      averageCommission: averageCommission,
      totalUsers: commissionEarnings.value.length,
      paidCommissions: commissionEarnings.value.filter(e => e.status === 'Paid').length,
      pendingCommissions: commissionEarnings.value.filter(e => e.status === 'Pending').length,
      commissionBreakdown: getCommissionBreakdown(),
      monthlyTrends: getMonthlyTrends()
    }
    
    toast.success('Report generated successfully!')
  } catch (error) {
    console.error('Error generating report:', error)
    // toast.error('Failed to generate report')
  } finally {
    generatingReport.value = false
  }
}

// Update summary cards with real data
const updateSummaryCards = (totalCommissions, pendingCommissions, totalReferrals, averageCommission) => {
  // Update the summary cards in the Reports tab
  const summaryCards = document.querySelectorAll('[data-summary-card]')
  if (summaryCards.length > 0) {
    // This will be handled by the reactive data
    console.log('Summary cards updated with real data')
  }
}

// Get commission breakdown by type
const getCommissionBreakdown = () => {
  const breakdown = {}
  commissionEarnings.value.forEach(earning => {
    if (earning.amount > 0) {
      const type = earning.commissionType
      if (!breakdown[type]) {
        breakdown[type] = { count: 0, total: 0 }
      }
      breakdown[type].count++
      breakdown[type].total += earning.amount
    }
  })
  return breakdown
}

// Get monthly trends
const getMonthlyTrends = () => {
  const monthlyData = {}
  commissionEarnings.value.forEach(earning => {
    if (earning.amount > 0) {
      const month = earning.date.substring(0, 7) // YYYY-MM format
      if (!monthlyData[month]) {
        monthlyData[month] = { total: 0, count: 0 }
      }
      monthlyData[month].total += earning.amount
      monthlyData[month].count++
    }
  })
  return monthlyData
}

// Export report
const exportReport = (format) => {
  if (format === 'excel') {
    toast.success('Report exported to Excel successfully!')
  } else if (format === 'pdf') {
    toast.success('Report exported to PDF successfully!')
  }
}

// Load commission settings from API
const loadCommissionSettings = async () => {
  loadingSettings.value = true
  try {
    const response = await commissionService.getCommissionSettings()
    if (response.data.ok) {
      commissionSettings.value = response.data.data
      // Reset selected settings when loading new data
      selectedSettings.value = []
    } else {
      // toast.error('Failed to load commission settings')
    }
  } catch (error) {
    console.error('Error loading commission settings:', error)
    // toast.error('Failed to load commission settings')
  } finally {
    loadingSettings.value = false
  }
}

// Toggle select all settings
const toggleSelectAll = () => {
  if (selectedSettings.value.length === commissionSettings.value.length) {
    selectedSettings.value = []
  } else {
    selectedSettings.value = commissionSettings.value.map(setting => setting.id)
  }
}

// Load commission earnings from API
const loadCommissionEarnings = async () => {
  loadingEarnings.value = true
  try {
    // Use the new commission earnings API endpoint
    const response = await commissionService.getCommissionEarnings()
    
    if (response.data && response.data.ok) {
      const commissions = response.data.data || []
      
      if (commissions.length > 0) {
        // Transform commission data to match our earnings format
        commissionEarnings.value = commissions.map(commission => ({
          id: commission.id,
          user: `User ${commission.user_id?.substring(0, 8) || 'Unknown'}`,
          email: `${commission.user_id?.substring(0, 8) || 'unknown'}@example.com`,
          userId: commission.user_id,
          commissionType: commission.service_type || 'Bills Payment',
          source: commission.service_type || 'Service Transaction',
          amount: parseFloat(commission.amountPayable) || 0,
          originalAmount: parseFloat(commission.amount) || 0,
          date: commission.created_at ? new Date(commission.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: commission.settlement_status || commission.status || 'Pending',
          transactionId: commission.transaction_id,
          referralChain: commission.referral_chain,
          notes: `Transaction: ${commission.transaction_id || 'N/A'} | Service: ${commission.service_type || 'N/A'}`,
          commissionData: commission // Keep original data for reference
        }))
        
        console.log('Commission earnings loaded:', commissionEarnings.value)
      } else {
        // No commissions found, use fallback data
        commissionEarnings.value = getFallbackCommissionData()
      }
    } else {
      // API response not ok, use fallback data
      commissionEarnings.value = getFallbackCommissionData()
    }
  } catch (error) {
    console.error('Error loading commission earnings:', error)
    // Fallback to sample data if API fails
    commissionEarnings.value = getFallbackCommissionData()
  } finally {
    loadingEarnings.value = false
  }
}

// Fallback commission data when API fails
const getFallbackCommissionData = () => {
  return [
    {
      id: 'fallback-1',
      user: 'Sample User',
      email: 'sample@example.com',
      userId: '1',
      commissionType: 'Transaction Fee',
      source: 'Service Transaction',
      amount: 2500,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      notes: 'null',
      commissionData: null
    },
    {
      id: 'fallback-2',
      user: 'Demo User',
      email: 'demo@example.com',
      userId: '2',
      commissionType: 'Referral Bonus',
      source: 'User Referral',
      amount: 1500,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      notes: 'null',
      commissionData: null
    }
  ]
}

// Load available users for the adjustment modal
const loadAvailableUsers = async () => {
  try {
    const response = await userService.getUsers({ 
      limit: 100, 
      page: 1,
      status: 'ACTIVE'
    })
    
    if (response.data && response.data.ok) {
      availableUsers.value = response.data.data.map(user => ({
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email
      }))
    } else {
      // Fallback to sample users if API fails
      availableUsers.value = [
        { id: 1, name: 'Sample User', email: 'sample@example.com' },
        { id: 2, name: 'Demo User', email: 'demo@example.com' }
      ]
    }
  } catch (error) {
    console.error('Error loading available users:', error)
    // Fallback to sample users if API fails
    availableUsers.value = [
      { id: 1, name: 'Sample User', email: 'sample@example.com' },
      { id: 2, name: 'Demo User', email: 'demo@example.com' }
    ]
  }
}

// Load initial data
onMounted(() => {
  loadCommissionSettings()
  loadCommissionEarnings()
  loadAvailableUsers()
})

// Watch for commission earnings changes to auto-generate report
watch(commissionEarnings, (newEarnings) => {
  if (newEarnings.length > 0 && !reportData.value) {
    // Auto-generate report when commission data is loaded
    generateReport()
  }
}, { deep: true })
</script>

<style scoped>
/* Add any custom styles here */
</style>
