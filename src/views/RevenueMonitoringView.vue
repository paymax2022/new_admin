<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Transaction Monitoring</h1>
        <p class="text-gray-600 dark:text-gray-400">Track all platform transactions and fees</p>
      </div>
      <div class="text-sm text-gray-500">
        Last refreshed: {{ lastUpdated }}
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <DashboardCard
        title="Total Platform Revenue"
        value="₦6.80M"
        change="+24%"
        subtitle="18782 transactions"
        icon="money-bag"
        color="green"
      />
      <DashboardCard
        title="This Month"
        value="₦1.25M"
        change="+24%"
        subtitle="vs. last month"
        icon="chart-line"
        color="blue"
      />
      <DashboardCard
        title="Pending Payouts"
        value="₦0.85M"
        subtitle="Next payout: Friday"
        icon="wallet"
        color="yellow"
      />
      <DashboardCard
        title="Average Fee Rate"
        value="3%"
        subtitle="87% payout ratio"
        icon="percent"
        color="purple"
      />
    </div>

    <!-- Navigation Tabs -->
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="-mb-px flex space-x-8">
        <button 
          @click="activeTab = 'overview'"
          :class="activeTab === 'overview' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Overview
        </button>
        <button 
          @click="activeTab = 'payout'"
          :class="activeTab === 'payout' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Payout
        </button>
        <button 
          @click="activeTab = 'feeSettings'"
          :class="activeTab === 'feeSettings' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Fee Settings
        </button>
      </nav>
    </div>

    <!-- Overview Tab Content -->
    <div v-if="activeTab === 'overview'">
      <!-- Revenue Trend Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Monthly platform revenue</p>
          </div>
        </div>
        <div class="h-64">
          <LineChart
            v-if="revenueTrendData && revenueTrendData.datasets"
            :data="revenueTrendData"
            :options="revenueTrendOptions"
          />
          <div v-else class="h-full flex items-center justify-center text-gray-500">
            Loading chart...
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Revenue Breakdown -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Revenue Breakdown</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">By revenue stream</p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Transaction Fees</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">₦51M (75%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-purple-500 h-3 rounded-full" style="width: 75%"></div>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Subscriptions</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">₦10M (15%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-purple-500 h-3 rounded-full" style="width: 15%"></div>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Value-Added Services</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">₦0.5M (7%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-purple-500 h-3 rounded-full" style="width: 7%"></div>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Other</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">₦0.2M (3%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-purple-500 h-3 rounded-full" style="width: 3%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Revenue Schools -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Top Revenue Schools</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">By fees generated</p>
            </div>
          </div>
          <div v-if="topRevenueSchools.length > 0" class="space-y-4">
            <div 
              v-for="(school, index) in topRevenueSchools" 
              :key="school.id || index"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div :class="getSchoolAvatarColor(index)" class="w-8 h-8 rounded-full flex items-center justify-center">
                  <span :class="getSchoolTextColor(index)" class="text-xs font-medium">
                    {{ (school.name || '').charAt(0).toUpperCase() || 'N' }}
                  </span>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ school.name || 'N/A' }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">
                    {{ formatCurrency(school.totalTransactions || 0) }} in transactions
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatCurrency(school.totalFees || 0) }}
                </div>
                <div class="text-xs text-gray-600 dark:text-gray-400">in fees</div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-sm text-gray-500 dark:text-gray-400">No revenue data available</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">Revenue data will appear here when available</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Payout Tab Content -->
    <div v-if="activeTab === 'payout'" class="space-y-6">
      <!-- School Payouts Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">School Payouts</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Funds transferred to schools after fees</p>
          </div>
        </div>

        <!-- Search and Filter Bar -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search school by name or email"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>
            <div class="sm:w-48">
              <select
                v-model="selectedStatus"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Payouts Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payout ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  School
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  School's Share
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Platform Fee
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="payout in filteredPayouts" :key="payout.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ payout.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ payout.school }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ payout.totalAmount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ payout.schoolShare }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ payout.platformFee }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ payout.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(payout.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ payout.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <button @click="viewPayoutDetails(payout)" class="text-purple-600 hover:text-purple-900">Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredPayouts.length }} entries
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                &lt;
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="page !== '...' ? goToPage(page as number) : null"
                :disabled="page === '...'"
                :class="page === currentPage ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md"
              >
                {{ page }}
              </button>
              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payout Details Modal -->
    <div v-if="showPayoutModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Payout #{{ selectedPayout?.id }}</h3>
            <button @click="closePayoutModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Recipient -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-500 mb-2">Recipient</h4>
            <p class="text-lg font-semibold text-gray-900">{{ selectedPayout?.school }}</p>
          </div>

          <!-- Payout Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Status</h4>
                <span :class="getStatusClass(selectedPayout?.status)" class="inline-flex px-3 py-1 text-sm font-semibold rounded-full">
                  {{ selectedPayout?.status }}
                </span>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Total Amount</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedPayout?.totalAmount }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">School's Share</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedPayout?.schoolShare }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Platform Fee</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedPayout?.platformFee }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Date</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedPayout?.date }}</p>
              </div>
            </div>
          </div>

          <!-- Account Information -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-500 mb-3">Account Information</h4>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Bank Name:</span>
                <span class="text-sm font-medium text-gray-900">First Bank</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Account Number:</span>
                <span class="text-sm font-medium text-gray-900">1234567890</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Account Name:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedPayout?.school }}</span>
              </div>
            </div>
          </div>

          <!-- Transactions in this Payout -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-medium text-gray-500">Transactions in this Payout</h4>
              <button class="text-purple-600 hover:text-purple-900 text-sm font-medium">View All</button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="transaction in payoutTransactions" :key="transaction.id">
                    <td class="px-4 py-2 text-sm text-gray-900">{{ transaction.id }}</td>
                    <td class="px-4 py-2 text-sm text-gray-900">{{ transaction.description }}</td>
                    <td class="px-4 py-2 text-sm text-gray-900">{{ transaction.amount }}</td>
                    <td class="px-4 py-2 text-sm text-gray-900">{{ transaction.date }}</td>
                    <td class="px-4 py-2 text-sm text-gray-900">{{ transaction.type }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-between">
            <button @click="closePayoutModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Close
            </button>
            <button class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fee Settings Tab Content -->
    <div v-if="activeTab === 'feeSettings'" class="space-y-6">
      <!-- Platform Fee Configuration -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform Fee Configuration</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Manage the fees charged to schools</p>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transaction Fee (%)
                </label>
                <input
                  v-model="feeSettings.transactionFee"
                  type="number"
                  step="0.1"
                  placeholder="Enter transaction Fee"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                <p class="text-xs text-gray-500 mt-1">Fee charged on each payment transaction</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Subscription (₦)
                </label>
                <input
                  v-model="feeSettings.monthlySubscription"
                  type="number"
                  placeholder="Enter Monthly Subscription Fee"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                <p class="text-xs text-gray-500 mt-1">Monthly fee for premium schools</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Split Payment Fee (%)
                </label>
                <input
                  v-model="feeSettings.splitPaymentFee"
                  type="number"
                  step="0.1"
                  placeholder="Enter Split payment Fee"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                <p class="text-xs text-gray-500 mt-1">Additional fee for installment payments</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Fee (₦)
                </label>
                <input
                  v-model="feeSettings.minimumFee"
                  type="number"
                  placeholder="Enter Minimum Fee"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                <p class="text-xs text-gray-500 mt-1">Minimum fee charged per transaction</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Wallet Transfer Fee (%)
                </label>
                <input
                  v-model="feeSettings.walletTransferFee"
                  type="number"
                  step="0.1"
                  placeholder="Enter Wallet Transfer Fee"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                <p class="text-xs text-gray-500 mt-1">Fee for wallet-to-wallet transfers</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payout Schedule</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Schedule
                </label>
                <select
                  v-model="feeSettings.payoutSchedule"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Payment Schedule</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <p class="text-xs text-gray-500 mt-1">Schedule for transferring funds to schools</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Volume-Based Fee Tiers -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Volume-Based Fee Tiers</h3>
            <button @click="addNewTier" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Add New Tier
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Volume Range (₦)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fee Rate (%)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Eligible Schools
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="tier in feeTiers" :key="tier.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ tier.volumeRange }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ tier.feeRate }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ tier.eligibleSchools }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <button @click="editTier(tier)" class="text-purple-600 hover:text-purple-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <button @click="resetToDefault" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Reset to Default
        </button>
        <button @click="saveChanges" class="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
          Save Changes
        </button>
      </div>
    </div>

    <!-- Edit Fee Tier Modal -->
    <div v-if="showEditTierModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-2">
              <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 class="text-lg font-semibold text-gray-900">Edit Fee Tier</h3>
            </div>
            <button @click="closeEditTierModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p class="text-sm text-gray-600 mb-6">Update the existing fee tier.</p>

          <!-- Form Fields -->
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Min. Volume (₦)
              </label>
              <input
                v-model="editingTier.minVolume"
                type="number"
                placeholder="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Max. Volume (₦)
              </label>
              <input
                v-model="editingTier.maxVolume"
                type="number"
                placeholder="1,000,000"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Fee Rate (%)
              </label>
              <input
                v-model="editingTier.feeRate"
                type="number"
                step="0.1"
                placeholder="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <!-- Information Box -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div class="flex items-start space-x-3">
              <svg class="h-5 w-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-yellow-800">
                Schools with transaction volumes falling within this range will be charged the specified fee rate. The system will automatically apply this rate to eligible schools.
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button @click="closeEditTierModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button @click="saveTierChanges" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add New Fee Tier Modal -->
    <div v-if="showAddTierModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-2">
              <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 class="text-lg font-semibold text-gray-900">Add New Fee Tier</h3>
            </div>
            <button @click="closeAddTierModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p class="text-sm text-gray-600 mb-6">Create a new volume-based fee tier.</p>

          <!-- Form Fields -->
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Min. Volume (₦)
              </label>
              <input
                v-model="newTier.minVolume"
                type="number"
                placeholder="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Max. Volume (₦)
              </label>
              <input
                v-model="newTier.maxVolume"
                type="number"
                placeholder="1,000,000"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Fee Rate (%)
              </label>
              <input
                v-model="newTier.feeRate"
                type="number"
                step="0.1"
                placeholder="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <!-- Information Box -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div class="flex items-start space-x-3">
              <svg class="h-5 w-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-yellow-800">
                Schools with transaction volumes falling within this range will be charged the specified fee rate. The system will automatically apply this rate to eligible schools.
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button @click="closeAddTierModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button @click="addTier" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Add Tier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import DashboardCard from '@/components/DashboardCard.vue'
import LineChart from '@/components/charts/LineChart.vue'
import schoolService from '@/services/schoolService'

const toast = useToast()

// Reactive data
const lastUpdated = ref(new Date().toLocaleString())
const activeTab = ref('overview')
const loading = ref(false)
// API only supports years up to 2025
const selectedYear = ref(Math.min(new Date().getFullYear(), 2025).toString())

// Top Revenue Schools - Currently no endpoint available, using empty array
const topRevenueSchools = ref<any[]>([])

// Payout data
const payoutsData = ref([
  {
    id: 'P123456',
    school: 'Heritage Grammar School',
    totalAmount: '₦1,500,000',
    schoolShare: '₦1,455,000',
    platformFee: '₦45,000',
    date: '4/30/2023',
    status: 'completed'
  },
  {
    id: 'P123457',
    school: 'Greenfield Academy',
    totalAmount: '₦1,250,000',
    schoolShare: '₦1,212,500',
    platformFee: '₦37,500',
    date: '5/1/2023',
    status: 'completed'
  },
  {
    id: 'P123458',
    school: 'St. Michael\'s College',
    totalAmount: '₦980,000',
    schoolShare: '₦950,600',
    platformFee: '₦29,400',
    date: '5/2/2023',
    status: 'pending'
  },
  {
    id: 'pending',
    school: 'Westpoint International',
    totalAmount: '₦1,750,000',
    schoolShare: '₦1,697,500',
    platformFee: '₦52,500',
    date: '5/3/2023',
    status: 'processing'
  },
  {
    id: 'P123460',
    school: 'Horizon Educational Center',
    totalAmount: '₦1,320,000',
    schoolShare: '₦1,290,400',
    platformFee: '₦39,000',
    date: '5/3/2023',
    status: 'processing'
  }
])

// Payout modal state
const showPayoutModal = ref(false)
const selectedPayout = ref<any>(null)

// Sample transaction data for the selected payout
const payoutTransactions = ref([
  {
    id: 'T12345',
    description: 'School Fee (Term 2)',
    amount: '₦350,000',
    date: '4/30/2023',
    type: 'School Fees'
  },
  {
    id: 'T12346',
    description: 'Uniform Payment',
    amount: '₦45,000',
    date: '4/30/2023',
    type: 'Uniform'
  },
  {
    id: 'T12347',
    description: 'School Fee (Term 2)',
    amount: '₦350,000',
    date: '5/1/2023',
    type: 'School Fee'
  }
])

// Search and filter
const searchQuery = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed properties for payouts
const filteredPayouts = computed(() => {
  let filtered = payoutsData.value

  if (searchQuery.value) {
    filtered = filtered.filter(payout => 
      payout.school.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payout.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(payout => payout.status === selectedStatus.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredPayouts.value.length / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredPayouts.value.length));

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (currentPage.value >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Functions
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-orange-100 text-orange-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(1)}K`
  }
  return `₦${amount.toLocaleString()}`
}

// Helper function to get avatar color based on index
const getSchoolAvatarColor = (index: number) => {
  const colors = [
    'bg-purple-100 dark:bg-purple-900',
    'bg-green-100 dark:bg-green-900',
    'bg-blue-100 dark:bg-blue-900',
    'bg-orange-100 dark:bg-orange-900',
    'bg-pink-100 dark:bg-pink-900',
    'bg-indigo-100 dark:bg-indigo-900'
  ]
  return colors[index % colors.length]
}

// Helper function to get text color based on index
const getSchoolTextColor = (index: number) => {
  const colors = [
    'text-purple-600 dark:text-purple-300',
    'text-green-600 dark:text-green-300',
    'text-blue-600 dark:text-blue-300',
    'text-orange-600 dark:text-orange-300',
    'text-pink-600 dark:text-pink-300',
    'text-indigo-600 dark:text-indigo-300'
  ]
  return colors[index % colors.length]
}

// Functions for payout modal
const viewPayoutDetails = (payout: any) => {
  selectedPayout.value = payout
  showPayoutModal.value = true
}

const closePayoutModal = () => {
  showPayoutModal.value = false
  selectedPayout.value = null
}

// Revenue trend chart data
const revenueTrendData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{
    label: 'Revenue (₦)',
    data: [200, 400, 600, 800, 800],
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    borderColor: 'rgba(147, 51, 234, 1)',
    borderWidth: 2,
    fill: true,
    tension: 0.4
  }]
})

// Helper function to convert month name to short format
const getMonthShortName = (monthName: string): string => {
  const monthMap: { [key: string]: string } = {
    'january': 'Jan',
    'february': 'Feb',
    'march': 'Mar',
    'april': 'Apr',
    'may': 'May',
    'june': 'Jun',
    'july': 'Jul',
    'august': 'Aug',
    'september': 'Sep',
    'october': 'Oct',
    'november': 'Nov',
    'december': 'Dec'
  }
  return monthMap[monthName.toLowerCase()] || monthName.substring(0, 3)
}

// Fetch monthly revenue data
const fetchMonthlyRevenue = async () => {
  loading.value = true
  try {
    // Ensure year doesn't exceed 2025
    const year = Math.min(parseInt(selectedYear.value) || 2025, 2025).toString()
    const response = await schoolService.getMonthlyRevenue({ year })
    if (response.data && Array.isArray(response.data)) {
      // Map month names to short labels and extract revenue values
      const labels = response.data.map((item: any) => {
        if (typeof item.month === 'string') {
          return getMonthShortName(item.month)
        }
        // Fallback: if month is a number
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const monthIndex = parseInt(item.month || '1') - 1
        return monthNames[monthIndex] || item.month || ''
      })
      
      const data = response.data.map((item: any) => {
        // Revenue is already in the correct format, no need to divide by 1000
        return item.revenue || 0
      })
      
      revenueTrendData.value = {
        labels: labels.length > 0 ? labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue (₦)',
          data: data.length > 0 ? data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          borderColor: 'rgba(147, 51, 234, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      }
    }
  } catch (error: any) {
    console.error('Error fetching monthly revenue:', error)
    // Handle year validation error
    if (error.response?.data?.data?.includes('year cannot be later than 2025') || 
        error.response?.data?.data?.includes('year cannot be greater than 2025')) {
      // Auto-correct to 2025 and retry
      selectedYear.value = '2025'
      toast.warning('Year adjusted to 2025 (maximum supported year)')
      try {
        const response = await schoolService.getMonthlyRevenue({ year: '2025' })
        if (response.data && Array.isArray(response.data)) {
          const labels = response.data.map((item: any) => {
            if (typeof item.month === 'string') {
              return getMonthShortName(item.month)
            }
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const monthIndex = parseInt(item.month || '1') - 1
            return monthNames[monthIndex] || item.month || ''
          })
          const data = response.data.map((item: any) => {
            return item.revenue || 0
          })
          
          revenueTrendData.value = {
            labels: labels.length > 0 ? labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Revenue (₦)',
              data: data.length > 0 ? data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
              borderColor: 'rgba(147, 51, 234, 1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4
            }]
          }
        }
      } catch (retryError) {
        toast.error('Failed to load revenue data')
      }
    } else {
      toast.error(error.response?.data?.message || 'Failed to load revenue data')
    }
  } finally {
    loading.value = false
  }
}

const revenueTrendOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value: any) {
          return '₦' + value.toLocaleString()
        }
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        usePointStyle: true,
        pointStyle: 'rect'
      }
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return 'Revenue: ₦' + context.parsed.y.toLocaleString()
        }
      }
    }
  }
})

// Lifecycle
onMounted(() => {
  fetchMonthlyRevenue()
  lastUpdated.value = new Date().toLocaleString()
})

// Fee Settings data
const feeSettings = ref({
  transactionFee: 3.0,
  monthlySubscription: 5000,
  splitPaymentFee: 1.5,
  minimumFee: 100,
  walletTransferFee: 0.5,
  payoutSchedule: 'weekly'
})

// Fee Tiers data
const feeTiers = ref([
  {
    id: 1,
    volumeRange: '0 - 1,000,000',
    feeRate: '3.0%',
    eligibleSchools: 120
  },
  {
    id: 2,
    volumeRange: '1,000,001 - 5,000,000',
    feeRate: '2.5%',
    eligibleSchools: 85
  },
  {
    id: 3,
    volumeRange: '5,000,001 - 20,000,000',
    feeRate: '2.0%',
    eligibleSchools: 34
  },
  {
    id: 4,
    volumeRange: '20,000,001+',
    feeRate: '1.5%',
    eligibleSchools: 7
  }
])

// Functions for fee settings
const addNewTier = () => {
  // Reset the new tier form
  newTier.value = {
    minVolume: 0,
    maxVolume: 1000000,
    feeRate: 0
  }
  showAddTierModal.value = true
}

// Add New Tier Modal state
const showAddTierModal = ref(false)
const newTier = ref({
  minVolume: 0,
  maxVolume: 1000000,
  feeRate: 0
})

const closeAddTierModal = () => {
  showAddTierModal.value = false
  newTier.value = {
    minVolume: 0,
    maxVolume: 1000000,
    feeRate: 0
  }
}

const addTier = () => {
  // Validate inputs
  if (newTier.value.minVolume < 0 || newTier.value.maxVolume <= 0 || newTier.value.feeRate < 0) {
    alert('Please enter valid values for all fields')
    return
  }
  
  if (newTier.value.minVolume >= newTier.value.maxVolume) {
    alert('Minimum volume must be less than maximum volume')
    return
  }
  
  // Create new tier
  const nextId = Math.max(...feeTiers.value.map(tier => tier.id)) + 1
  
  // Format volume range
  let volumeRange = ''
  if (newTier.value.maxVolume === 0) {
    volumeRange = `${newTier.value.minVolume.toLocaleString()} +`
  } else {
    volumeRange = `${newTier.value.minVolume.toLocaleString()} - ${newTier.value.maxVolume.toLocaleString()}`
  }
  
  const newTierData = {
    id: nextId,
    volumeRange: volumeRange,
    feeRate: `${newTier.value.feeRate}%`,
    eligibleSchools: 0 // New tiers start with 0 eligible schools
  }
  
  // Add to the list
  feeTiers.value.push(newTierData)
  
  console.log('New tier added:', newTierData)
  closeAddTierModal()
}

// Edit Tier Modal state
const showEditTierModal = ref(false)
const editingTier = ref({
  id: 0,
  minVolume: 0,
  maxVolume: 0,
  feeRate: 0
})

const editTier = (tier: any) => {
  // Parse the volume range to get min and max values
  const volumeRange = tier.volumeRange
  const feeRate = parseFloat(tier.feeRate.replace('%', ''))
  
  if (volumeRange.includes('+')) {
    // Handle "20,000,001+" case
    const minVolume = parseInt(volumeRange.replace(/,/g, '').replace('+', ''))
    editingTier.value = {
      id: tier.id,
      minVolume: minVolume,
      maxVolume: 0, // 0 indicates no upper limit
      feeRate: feeRate
    }
  } else {
    // Handle "0 - 1,000,000" case
    const parts = volumeRange.split(' - ')
    const minVolume = parseInt(parts[0].replace(/,/g, ''))
    const maxVolume = parseInt(parts[1].replace(/,/g, ''))
    editingTier.value = {
      id: tier.id,
      minVolume: minVolume,
      maxVolume: maxVolume,
      feeRate: feeRate
    }
  }
  
  showEditTierModal.value = true
}

const closeEditTierModal = () => {
  showEditTierModal.value = false
  editingTier.value = {
    id: 0,
    minVolume: 0,
    maxVolume: 0,
    feeRate: 0
  }
}

const saveTierChanges = () => {
  // Find the tier being edited and update it
  const tierIndex = feeTiers.value.findIndex(tier => tier.id === editingTier.value.id)
  if (tierIndex !== -1) {
    const tier = feeTiers.value[tierIndex]
    
    // Update the volume range display
    if (editingTier.value.maxVolume === 0) {
      tier.volumeRange = `${editingTier.value.minVolume.toLocaleString()} +`
    } else {
      tier.volumeRange = `${editingTier.value.minVolume.toLocaleString()} - ${editingTier.value.maxVolume.toLocaleString()}`
    }
    
    // Update the fee rate
    tier.feeRate = `${editingTier.value.feeRate}%`
    
    console.log('Tier updated:', tier)
  }
  
  closeEditTierModal()
}

const resetToDefault = () => {
  // Reset to default values
  feeSettings.value = {
    transactionFee: 3.0,
    monthlySubscription: 5000,
    splitPaymentFee: 1.5,
    minimumFee: 100,
    walletTransferFee: 0.5,
    payoutSchedule: 'weekly'
  }
}

const saveChanges = () => {
  // Save changes implementation
  console.log('Save changes clicked:', feeSettings.value)
}
</script>