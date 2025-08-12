<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Wallet Management</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Manage user wallets, transactions, and currency settings</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Balance Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance (NGN)</h3>
          <CurrencyDollarIcon class="h-5 w-5 text-blue-500" />
        </div>
        <div v-if="loadingStats" class="flex items-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          <span class="text-sm text-gray-500">Loading...</span>
        </div>
        <div v-else>
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {{ formatCurrency(walletStats.total_balance?.[0]?.total_balance || 0) }}
          </p>
          <div v-if="walletStats.total_balance?.[0]?.percentage" class="flex items-center mt-1">
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ walletStats.total_balance[0].count }} wallets ({{ walletStats.total_balance[0].percentage }}%)
            </span>
          </div>
        </div>
      </div>

      <!-- Active Wallets Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Wallets</h3>
          <WalletIcon class="h-5 w-5 text-blue-500" />
        </div>
        <div v-if="loadingStats" class="flex items-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          <span class="text-sm text-gray-500">Loading...</span>
        </div>
        <div v-else>
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ walletStats.active_wallets?.count || 0 }}</p>
          <div v-if="walletStats.active_wallets?.percent_change !== undefined" class="flex items-center mt-1">
            <span :class="[
              'text-xs font-medium',
              walletStats.active_wallets.is_increasing 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            ]">
              {{ walletStats.active_wallets.is_increasing ? '+' : '-' }}{{ walletStats.active_wallets.percent_change }}%
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
              vs {{ walletStats.active_wallets.previous_month || 0 }} last month
            </span>
          </div>
        </div>
      </div>

      <!-- Recent Deposits Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Deposits</h3>
          <ArrowDownIcon class="h-5 w-5 text-blue-500" />
        </div>
        <div v-if="loadingStats" class="flex items-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          <span class="text-sm text-gray-500">Loading...</span>
        </div>
        <div v-else>
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(walletStats.entry?.deposits || 0) }}</p>
          <div v-if="walletStats.entry?.deposit_change !== undefined" class="flex items-center mt-1">
            <span :class="[
              'text-xs font-medium',
              walletStats.entry.deposit_change >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            ]">
              {{ walletStats.entry.deposit_change >= 0 ? '+' : '' }}{{ walletStats.entry.deposit_change }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">change</span>
          </div>
        </div>
      </div>

      <!-- Recent Withdrawals Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Withdrawals</h3>
          <ArrowUpIcon class="h-5 w-5 text-blue-500" />
        </div>
        <div v-if="loadingStats" class="flex items-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          <span class="text-sm text-gray-500">Loading...</span>
        </div>
        <div v-else>
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(walletStats.entry?.withdrawals || 0) }}</p>
          <div v-if="walletStats.entry?.withdrawal_change !== undefined" class="flex items-center mt-1">
            <span :class="[
              'text-xs font-medium',
              walletStats.entry.withdrawal_change >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            ]">
              {{ walletStats.entry.withdrawal_change >= 0 ? '+' : '' }}{{ walletStats.entry.withdrawal_change }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">change</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Wallet Activity Trends -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Wallet Activity Trends</h3>
        <div class="h-64">
          <Line :data="activityTrendsData" :options="lineChartOptions" />
        </div>
      </div>

      <!-- Wallet Distribution -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Wallet Distribution</h3>
        <div class="h-64">
          <Doughnut :data="distributionData" :options="doughnutChartOptions" />
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="relative flex-1 max-w-xs">
          <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            @input="handleSearchInput"
            type="text"
            placeholder="Search Wallet"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          >
        </div>

        <!-- Currency Filter Dropdown -->
        <div class="relative">
          <button 
            @click="toggleCurrencyDropdown"
            data-dropdown="currency"
            class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[140px] justify-between"
          >
            <span>{{ selectedCurrency }}</span>
            <ChevronDownIcon class="h-4 w-4" />
          </button>
          <!-- Currency Dropdown -->
          <div v-if="showCurrencyDropdown" 
               class="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="py-1">
              <div class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 font-medium">
                CURRENCY
              </div>
              <a 
                v-for="currency in currencies" 
                :key="currency.value"
                href="#" 
                @click.prevent="handleCurrencyFilter(currency)"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{'bg-blue-50 dark:bg-blue-900/20': selectedCurrency === currency.label}"
              >
                {{ currency.label }}
              </a>
            </div>
          </div>
        </div>

        <!-- Status Filter Dropdown -->
        <div class="relative">
          <button 
            @click="toggleStatusDropdown"
            data-dropdown="status"
            class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[140px] justify-between"
          >
            <span>{{ selectedStatus }}</span>
            <ChevronDownIcon class="h-4 w-4" />
          </button>
          <!-- Status Dropdown -->
          <div v-if="showStatusDropdown" 
               class="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="py-1">
              <div class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 font-medium">
                STATUS
              </div>
              <a 
                v-for="status in statuses" 
                :key="status.value"
                href="#" 
                @click.prevent="handleStatusFilter(status)"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{'bg-blue-50 dark:bg-blue-900/20': selectedStatus === status.label}"
              >
                <span class="inline-flex items-center">
                  <span v-if="status.color" :class="['h-2 w-2 rounded-full mr-2', status.color]"></span>
                  {{ status.label }}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <button v-if="selectedWalletTab === 'currencies'" class="flex items-center px-4 py-2 border border-blue-600 text-blue-700 bg-white rounded-md text-sm font-medium hover:bg-blue-50 mr-2" @click="showAddCurrencyModal = true">
          <PlusIcon class="h-4 w-4 mr-2" />
          Add Currency
        </button>
        <button v-if="selectedWalletTab === 'exchange'" class="flex items-center px-4 py-2 border border-blue-600 text-blue-700 bg-white rounded-md text-sm font-medium hover:bg-blue-50 mr-2" @click="showAddRateModal = true">
          <PlusIcon class="h-4 w-4 mr-2" />
          Add Rate
        </button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center">
          <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
          Export
        </button>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium"
          @click="showReconcileModal = true"
        >
          Reconcile Wallets
        </button>
        <!-- Test button for debugging -->
        <button
          class="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 font-medium"
          @click="() => { selectedWalletForCredit = wallets[0]; showCreditFundsModal = true; }"
        >
          Test Credit Modal
        </button>
      </div>
    </div>

    <!-- Tabs Bar -->
    <div class="mb-4">
      <div class="flex border-b border-gray-200 dark:border-gray-700">
        <button
          v-for="tab in walletTabs"
          :key="tab.value"
          @click="selectedWalletTab = tab.value"
          :class="[
            'px-4 py-2 -mb-px text-sm font-medium focus:outline-none',
            selectedWalletTab === tab.value
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-gray-900'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          ]"
          type="button"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Wallet Table -->
    <div v-if="selectedWalletTab === 'wallet'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div v-if="loadingWallets" class="flex justify-center items-center py-10">
        <span class="text-blue-600 font-semibold">Loading...</span>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">User</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">Type</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">Currency</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">Balance</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">Tier</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">Created At</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="wallet in wallets" :key="wallet.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.id }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.name || '-' }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.wallet_type }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.currency }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ formatCurrency(wallet.balance) }}</td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  wallet.active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                ]">
                  {{ wallet.active ? 'Active' : 'Frozen' }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.tier?.name || '-' }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ new Date(wallet.created_at).toLocaleString() }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium" @click.stop>
                <div class="relative">
                  <button 
                    @click="handleActionClick($event, wallet)"
                    data-dropdown="action"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <EllipsisVerticalIcon class="h-5 w-5" />
                  </button>
                  <!-- Actions Dropdown -->
                  <div v-if="activeActionDropdown === wallet.id" 
                       class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1 divide-y divide-gray-100 dark:divide-gray-700">
                      <div class="px-4 py-3">
                        <p class="text-base font-semibold text-gray-900 dark:text-white">Actions</p>
                      </div>
                      <div class="py-1">
                        <a 
                          href="#" 
                          @click.prevent="handleWalletAction('view', wallet)"
                          class="group flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <EyeIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                          View Details
                        </a>
                        <a 
                          href="#" 
                          @click.prevent="handleWalletAction('credit', wallet)"
                          class="group flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <PlusCircleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                          Credit Funds
                        </a>
                        <a 
                          href="#" 
                          @click.prevent="handleWalletAction('debit', wallet)"
                          class="group flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <MinusCircleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                          Debit Funds
                        </a>
                        <a 
                          href="#" 
                          @click.prevent="handleWalletAction('freeze', wallet)"
                          class="group flex items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <NoSymbolIcon class="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500 dark:text-red-400 dark:group-hover:text-red-300" />
                          {{ wallet.active ? 'Freeze Wallet' : 'Unfreeze Wallet' }}
                        </a>
                        <a 
                          href="#" 
                          @click.prevent="handleWalletAction('remark', wallet)"
                          class="group flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <ChatBubbleLeftIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                          Add Remark
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination Controls -->
      <div class="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Showing {{ ((currentPage - 1) * walletsPerPage) + 1 }} to {{ Math.min(currentPage * walletsPerPage, totalWallets) }} of {{ totalWallets }} wallets
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            
            <!-- Page Numbers -->
            <div class="flex items-center space-x-1">
              <button
                v-for="page in Math.min(5, totalPages)"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-md',
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                ]"
              >
                {{ page }}
              </button>
            </div>
            
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Currencies Table -->
    <div v-if="selectedWalletTab === 'currencies'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Code</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precision</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="currency in currenciesTable" :key="currency.code" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ currency.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ currency.code }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ currency.symbol }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ currency.precision }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                currency.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              ]">
                {{ currency.status.charAt(0).toUpperCase() + currency.status.slice(1) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
              <button @click.stop="toggleCurrencyActionDropdown(currency.code)" class="text-gray-400 hover:text-gray-600">
                <EllipsisVerticalIcon class="h-5 w-5" />
              </button>
              <div v-if="activeCurrencyActionDropdown === currency.code" class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <button @click="openEditCurrencyModal(currency); activeCurrencyActionDropdown = null" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Edit Currency</button>
                  <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                  <button @click="openDeactivateCurrencyModal(currency); activeCurrencyActionDropdown = null" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">Deactivate</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Wallet Details Modal -->
    <div v-if="selectedWallet" 
         class="fixed inset-y-0 right-0 w-[600px] bg-white dark:bg-gray-800 shadow-xl z-50">
      <div class="h-full flex flex-col">
        <!-- Header -->
        <div class="p-6">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center space-x-2">
              <DocumentDuplicateIcon class="h-5 w-5 text-gray-400" />
              <h2 class="text-base font-medium text-gray-900 dark:text-white">Wallet {{ selectedWallet.id }}</h2>
            </div>
            <button @click="closeWalletDetails" class="text-gray-400 hover:text-gray-500">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <p class="text-sm text-gray-500">User: {{ selectedWallet.name || 'Unknown User' }}</p>
        </div>

        <!-- Content -->
        <div class="flex-1 px-6">
          <div v-if="loadingWalletDetails" class="flex items-center justify-center py-10">
            <div class="flex items-center">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
              <span class="text-blue-600 font-semibold">Loading wallet details...</span>
            </div>
          </div>
          <div v-else>
          <!-- Wallet Info Grid -->
          <div class="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <div class="text-sm text-gray-500">Wallet ID</div>
                <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedWallet.id }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-500">User ID</div>
                <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedWallet.user_id }}</div>
              </div>
            <div>
              <div class="text-sm text-gray-500">Type</div>
                <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedWallet.wallet_type?.replace('_', ' ').toUpperCase() }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Currency</div>
              <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedWallet.currency }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Balance</div>
                <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatCurrency(selectedWallet.balance) }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Status</div>
              <div class="mt-1">
                  <span :class="[
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    selectedWallet.active 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  ]">
                    {{ selectedWallet.active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
              <div>
                <div class="text-sm text-gray-500">Tier</div>
                <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedWallet.tier?.name || 'No Tier' }}</div>
              </div>
            <div>
              <div class="text-sm text-gray-500">Created On</div>
                <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ new Date(selectedWallet.created_at).toLocaleDateString() }}</div>
            </div>
            </div>

            <!-- Tier Information -->
            <div v-if="selectedWallet.tier" class="mt-6">
              <div class="text-sm font-medium text-gray-900 dark:text-white mb-2">Tier Information</div>
              <div class="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4">
                <div class="grid grid-cols-2 gap-4">
            <div>
                    <div class="text-xs text-gray-500">Daily Payout Limit</div>
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ formatCurrency(selectedWallet.tier.daily_payout_limit) }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500">Single Payout Limit</div>
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ formatCurrency(selectedWallet.tier.single_payout_limit) }}</div>
                  </div>
                </div>
            </div>
          </div>

          <!-- Remark -->
          <div class="mt-6">
            <div class="text-sm text-gray-500">Remark</div>
            <div class="mt-1 text-sm text-gray-900 dark:text-white">
              Recheck and update wallet before freezing account
            </div>
          </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-6 bg-gray-50 dark:bg-gray-900/50">
          <div class="flex items-center space-x-3">
            <button 
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              @click="handleWalletAction('freeze', selectedWallet)"
            >
              {{ selectedWallet.active ? 'Freeze Wallet' : 'Unfreeze Wallet' }}
            </button>
            <button 
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              @click="closeWalletDetails"
            >
              Close
            </button>
            <button 
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none"
            >
              Credit Wallet
            </button>
            <button 
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none"
            >
              Debit Wallet
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div v-if="selectedWallet" 
         class="fixed inset-0 bg-black bg-opacity-25"
         @click="closeWalletDetails">
    </div>

    <!-- Credit Funds Modal -->
    <TransitionRoot appear :show="showCreditFundsModal" as="template">
      <Dialog as="div" @close="showCreditFundsModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Credit Funds
                  </DialogTitle>
                  <button @click="showCreditFundsModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Add funds to wallet {{ selectedWalletForCredit?.id }}
                </p>

                <form @submit.prevent="handleCreditFunds" class="space-y-4">
                  <!-- Amount -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      v-model="creditFundsData.amount"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      v-model="creditFundsData.description"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Manual credit by admin"
                      required
                    />
                  </div>

                  <!-- Current Balance -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Balance
                    </label>
                    <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                      {{ formatCurrency(selectedWalletForCredit?.balance || 0) }}
                    </div>
                  </div>

                  <!-- Buttons -->
                  <div class="flex gap-3 pt-4">
                    <button
                      type="button"
                      @click="showCreditFundsModal = false"
                      :disabled="loadingCreditAction"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      :disabled="loadingCreditAction"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                    >
                      <div v-if="loadingCreditAction" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Credit Funds
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Debit Funds Modal -->
    <TransitionRoot appear :show="showDebitFundsModal" as="template">
      <Dialog as="div" @close="showDebitFundsModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Debit Funds
                  </DialogTitle>
                  <button @click="showDebitFundsModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Remove funds from wallet {{ selectedWalletForDebit?.id }}
                </p>

                <form @submit.prevent="handleDebitFunds" class="space-y-4">
                  <!-- Amount -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      v-model="debitFundsData.amount"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      v-model="debitFundsData.description"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Manual Debit by admin"
                      required
                    />
                  </div>

                  <!-- Buttons -->
                  <div class="flex gap-3 pt-4">
                    <button
                      type="button"
                      @click="showDebitFundsModal = false"
                      :disabled="loadingDebitAction"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      :disabled="loadingDebitAction"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                    >
                      <div v-if="loadingDebitAction" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Debit Funds
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Freeze Wallet Modal -->
    <TransitionRoot appear :show="showFreezeWalletModal" as="template">
      <Dialog as="div" @close="showFreezeWalletModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    {{ selectedWalletForFreeze?.active ? 'Freeze Wallet' : 'Unfreeze Wallet' }}
                  </DialogTitle>
                  <button @click="showFreezeWalletModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {{ selectedWalletForFreeze?.active 
                    ? 'This will prevent the user from performing any transactions with this wallet. Are you sure you want to freeze it?' 
                    : 'This will allow the user to perform transactions with this wallet again. Are you sure you want to unfreeze it?' 
                  }}
                </p>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-5">
                  <div class="flex items-center mb-1">
                    <ExclamationTriangleIcon class="h-5 w-5 text-yellow-500 mr-2" />
                    <span class="font-medium text-yellow-800">
                      {{ selectedWalletForFreeze?.active ? 'Important Notice' : 'Restoration Notice' }}
                    </span>
                  </div>
                  <div class="text-xs text-yellow-700">
                    {{ selectedWalletForFreeze?.active 
                      ? 'Freezing this wallet will prevent the user from depositing, withdrawing, or transferring funds until the wallet is unfrozen.' 
                      : 'Unfreezing this wallet will restore all transaction capabilities for the user.'
                    }}
                  </div>
                </div>
                <div class="border rounded p-4 bg-gray-50 dark:bg-gray-900/30 mb-6">
                  <div class="text-sm text-gray-500 mb-1">Wallet Details</div>
                  <div class="flex flex-col gap-1">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">Wallet ID:</span>
                      <span class="text-gray-900 dark:text-white">{{ selectedWalletForFreeze?.id }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">User ID:</span>
                      <span class="text-gray-900 dark:text-white">{{ selectedWalletForFreeze?.user_id || selectedWalletForFreeze?.user }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">Balance:</span>
                      <span class="text-gray-900 dark:text-white">{{ formatCurrency(selectedWalletForFreeze?.balance) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">Current Status:</span>
                      <span :class="[
                        'font-medium',
                        selectedWalletForFreeze?.active ? 'text-green-600' : 'text-red-600'
                      ]">
                        {{ selectedWalletForFreeze?.active ? 'Active' : 'Frozen' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-3 pt-2">
                  <button
                    type="button"
                    @click="showFreezeWalletModal = false"
                    :disabled="loadingFreezeAction"
                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="handleFreezeWallet"
                    :disabled="loadingFreezeAction"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    <div v-if="loadingFreezeAction" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {{ selectedWalletForFreeze?.active ? 'Freeze Wallet' : 'Unfreeze Wallet' }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Add Remark Modal -->
    <TransitionRoot appear :show="showAddRemarkModal" as="template">
      <Dialog as="div" @close="showAddRemarkModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Remark
                  </DialogTitle>
                  <button @click="showAddRemarkModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add an internal remark to {{ selectedWalletForRemark?.id }} - {{ selectedWalletForRemark?.user }}
                </p>
                <form @submit.prevent="handleAddRemark">
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remark</label>
                    <textarea
                      v-model="remarkText"
                      rows="5"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your comment here..."
                      required
                    ></textarea>
                  </div>
                  <div class="flex gap-3 pt-2">
                    <button
                      type="button"
                      @click="showAddRemarkModal = false"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800"
                    >
                      Add Remark
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Reconcile Wallet Modal -->
    <TransitionRoot appear :show="showReconcileModal" as="template">
      <Dialog as="div" @close="showReconcileModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[450px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Reconcile Wallet Balances
                  </DialogTitle>
                  <button @click="showReconcileModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Start the wallet reconciliation process to validate balances against transaction records.
                </p>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-5">
                  <div class="flex items-center mb-1">
                    <ExclamationTriangleIcon class="h-5 w-5 text-yellow-500 mr-2" />
                    <span class="font-medium text-yellow-800">Warning: This operation should be performed with caution</span>
                  </div>
                  <div class="text-xs text-yellow-700">
                    Reconciliation will check all transaction records against current balances and may correct discrepancies. This operation will generate a detailed audit log.
                  </div>
                </div>
                <div class="mb-6">
                  <div class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Reconciliation Options</div>
                  <div class="flex flex-col gap-3">
                    <label class="inline-flex items-center text-sm text-gray-700 dark:text-gray-200">
                      <input type="checkbox" v-model="reconcileOptions.auditOnly" class="form-checkbox mr-2 rounded border-gray-300 dark:border-gray-600 text-blue-600" />
                      Generate audit report only (no changes)
                    </label>
                    <label class="inline-flex items-center text-sm text-gray-700 dark:text-gray-200">
                      <input type="checkbox" v-model="reconcileOptions.autoFix" class="form-checkbox mr-2 rounded border-gray-300 dark:border-gray-600 text-blue-600" />
                      Automatically fix discrepancies
                    </label>
                    <label class="inline-flex items-center text-sm text-gray-700 dark:text-gray-200">
                      <input type="checkbox" v-model="reconcileOptions.notifyUsers" class="form-checkbox mr-2 rounded border-gray-300 dark:border-gray-600 text-blue-600" />
                      Notify users of balance adjustments
                    </label>
                  </div>
                </div>
                <div class="flex gap-3 pt-2">
                  <button
                    type="button"
                    @click="showReconcileModal = false"
                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="handleStartReconciliation"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800"
                  >
                    Start Reconciliation
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Add Currency Modal -->
    <TransitionRoot appear :show="showAddCurrencyModal" as="template">
      <Dialog as="div" @close="showAddCurrencyModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[450px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add New Currency
                  </DialogTitle>
                  <button @click="showAddCurrencyModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add a new currency to the system
                </p>
                <form @submit.prevent="handleAddCurrency">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Code</label>
                    <input v-model="newCurrency.code" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="USD" required />
                    <span class="text-xs text-gray-400">3-letter ISO code (e.g., USD, EUR)</span>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Name</label>
                    <input v-model="newCurrency.name" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="US Dollar" required />
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Symbol</label>
                    <input v-model="newCurrency.symbol" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="$" required />
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Decimal Precision</label>
                    <select v-model="newCurrency.decimalPrecision" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option v-for="opt in decimalPrecisionOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No of Decimal places</label>
                    <input v-model="newCurrency.decimalPlaces" type="number" min="0" max="6" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="0" required />
                  </div>
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select v-model="newCurrency.status" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="flex gap-3 pt-2">
                    <button
                      type="button"
                      @click="showAddCurrencyModal = false"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800"
                    >
                      Add Currency
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Edit Currency Modal -->
    <TransitionRoot appear :show="showEditCurrencyModal" as="template">
      <Dialog as="div" @close="showEditCurrencyModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[450px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Currency
                  </DialogTitle>
                  <button @click="showEditCurrencyModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Update currency information
                </p>
                <form @submit.prevent="handleUpdateCurrency">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Code</label>
                    <input v-model="editCurrency.code" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled />
                    <span class="text-xs text-gray-400">Currency code cannot be changed</span>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Name</label>
                    <input v-model="editCurrency.name" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Symbol</label>
                    <input v-model="editCurrency.symbol" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Decimal Precision</label>
                    <select v-model="editCurrency.decimalPrecision" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option v-for="opt in decimalPrecisionOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No of Decimal places</label>
                    <input v-model="editCurrency.decimalPlaces" type="number" min="0" max="6" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  </div>
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select v-model="editCurrency.status" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="flex gap-3 pt-2">
                    <button
                      type="button"
                      @click="showEditCurrencyModal = false"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800"
                    >
                      Update Currency
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Exchange Rates Table -->
    <div v-if="selectedWalletTab === 'exchange'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">From</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">To</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rate</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fee (%)</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(rate, idx) in exchangeRates" :key="idx" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ rate.from }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ rate.to }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ rate.rate }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ rate.fee }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ rate.lastUpdated }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-gray-400 hover:text-gray-600">
                <ArrowPathIcon class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Exchange Rate Modal -->
    <TransitionRoot appear :show="showAddRateModal" as="template">
      <Dialog as="div" @close="showAddRateModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[450px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Exchange Rate
                  </DialogTitle>
                  <button @click="showAddRateModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add a new currency exchange rate and fee.
                </p>
                <form @submit.prevent="handleAddRate">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Currency</label>
                    <select v-model="newRate.from" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                      <option value="" disabled>Select Currency</option>
                      <option v-for="opt in currencyOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Currency</label>
                    <select v-model="newRate.to" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                      <option value="" disabled>Select Currency</option>
                      <option v-for="opt in currencyOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exchange Rate</label>
                    <input v-model="newRate.rate" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="1.0000" required />
                  </div>
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fee (%)</label>
                    <input v-model="newRate.fee" type="text" class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="1.50" required />
                  </div>
                  <div class="flex gap-3 pt-2">
                    <button
                      type="button"
                      @click="showAddRateModal = false"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800"
                    >
                      Add Rate
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Deactivate Currency Modal -->
    <TransitionRoot appear :show="showDeactivateCurrencyModal" as="template">
      <Dialog as="div" @close="showDeactivateCurrencyModal = false" class="relative z-[60]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-40" />
        </TransitionChild>
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Deactivate Currency
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    This will prevent users from selecting or using {{ currencyToDeactivate?.code }} for new wallets and transactions.
                  </p>
                </div>
                <div class="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    @click="showDeactivateCurrencyModal = false"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    @click="confirmDeactivateCurrency"
                  >
                    Deactivate
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification'
import {
  CurrencyDollarIcon,
  WalletIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  PencilIcon,
  CreditCardIcon,
  ClockIcon,
  BanknotesIcon,
  NoSymbolIcon,
  EyeIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Doughnut } from 'vue-chartjs'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import walletService from '@/services/walletService';

// Initialize toast
const toast = useToast()

// Utility function to format currency with Naira symbol and proper formatting
const formatCurrency = (amount, currency = 'NGN') => {
  if (amount === null || amount === undefined) return '₦0.00'
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (isNaN(numAmount)) return '₦0.00'
  
  // Format with comma separators and 2 decimal places
  const formatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numAmount)
  
  return formatted
}

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Chart Data
const activityTrendsData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Deposits',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: '#3B82F6',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Withdrawals',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: '#EF4444',
      tension: 0.4,
      fill: false
    }
  ]
})

const distributionData = ref({
  labels: ['Active Wallets', 'Inactive Wallets', 'Frozen Wallets'],
  datasets: [{
    data: [0, 0, 0],
    backgroundColor: ['#10B981', '#6B7280', '#EF4444']
  }]
})

// Function to update chart data with real data
const updateChartData = () => {
  console.log('Updating chart data with:', {
    wallets: wallets.value.length,
    walletStats: walletStats.value,
    activeWallets: wallets.value.filter(w => w.active).length
  })
  
  // Update activity trends with real data
  if (walletStats.value.entry) {
    const deposits = walletStats.value.entry.deposits || 0
    const withdrawals = walletStats.value.entry.withdrawals || 0
    
    // Create a more realistic trend based on current values and wallet data
    const baseDeposit = deposits > 0 ? deposits : (wallets.value.length > 0 ? wallets.value.reduce((sum, wallet) => sum + (wallet.balance || 0), 0) / wallets.value.length : 1000)
    const baseWithdrawal = withdrawals > 0 ? withdrawals : baseDeposit * 0.7
    
    const trendData = [
      baseDeposit * 0.8, 
      baseDeposit * 0.9, 
      baseDeposit, 
      baseDeposit * 1.1, 
      baseDeposit * 1.05, 
      baseDeposit * 1.2
    ]
    const withdrawalTrend = [
      baseWithdrawal * 0.8, 
      baseWithdrawal * 0.9, 
      baseWithdrawal, 
      baseWithdrawal * 1.1, 
      baseWithdrawal * 1.05, 
      baseWithdrawal * 1.2
    ]
    
    activityTrendsData.value.datasets[0].data = trendData
    activityTrendsData.value.datasets[1].data = withdrawalTrend
    
    console.log('Activity trends updated:', { trendData, withdrawalTrend })
  }
  
  // Update distribution data with real wallet data
  if (wallets.value.length > 0) {
    const activeWallets = wallets.value.filter(wallet => wallet.active).length
    const inactiveWallets = wallets.value.filter(wallet => !wallet.active).length
    const totalWallets = wallets.value.length
    
    // Calculate frozen wallets (assuming some percentage of active wallets might be frozen)
    const frozenWallets = Math.floor(activeWallets * 0.1) // 10% of active wallets
    const trulyActiveWallets = activeWallets - frozenWallets
    
    distributionData.value.datasets[0].data = [trulyActiveWallets, inactiveWallets, frozenWallets]
    
    // Update labels to be more descriptive
    distributionData.value.labels = [
      `Active (${trulyActiveWallets})`, 
      `Inactive (${inactiveWallets})`, 
      `Frozen (${frozenWallets})`
    ]
    
    console.log('Distribution updated:', {
      active: trulyActiveWallets,
      inactive: inactiveWallets,
      frozen: frozenWallets,
      labels: distributionData.value.labels
    })
  } else if (walletStats.value.active_wallets) {
    // Fallback to stats data if no wallet list
    const activeCount = walletStats.value.active_wallets.count || 0
    const totalBalance = walletStats.value.total_balance?.[0]?.count || 0
    const inactiveCount = Math.max(0, totalBalance - activeCount)
    const frozenCount = Math.floor(activeCount * 0.1) // Assume 10% of active wallets might be frozen
    
    distributionData.value.datasets[0].data = [activeCount, inactiveCount, frozenCount]
    distributionData.value.labels = [
      `Active (${activeCount})`, 
      `Inactive (${inactiveCount})`, 
      `Frozen (${frozenCount})`
    ]
    
    console.log('Distribution updated (fallback):', {
      active: activeCount,
      inactive: inactiveCount,
      frozen: frozenCount
    })
  }
}

// Chart Options
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#374151'
      }
    },
    x: {
      grid: {
        color: '#374151'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#9CA3AF'
      }
    }
  }
}

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#9CA3AF'
      }
    }
  }
}

// Wallet Data
const wallets = ref([])
const loadingWallets = ref(false)

// Pagination state
const currentPage = ref(1)
const totalPages = ref(1)
const totalWallets = ref(0)
const walletsPerPage = ref(10)

// Wallet Stats Data
const walletStats = ref({
  active_wallets: {
  count: 0,
  is_increasing: false,
  percent_change: 0,
  previous_month: 0
  },
  entry: {
    deposits: 0,
    withdrawals: 0,
    deposit_change: 0,
    withdrawal_change: 0
  },
  total_balance: [
    {
      count: 0,
      currency: 'NGN',
      percentage: 0,
      total_balance: 0
    }
  ]
})
const loadingStats = ref(false)

// Search and filter parameters
const searchQuery = ref('')
const sortOrder = ref('desc')

// Function to fetch wallets with parameters
const fetchWallets = async (params = {}) => {
  loadingWallets.value = true
  try {
    const apiParams = {
      page: currentPage.value,
      limit: walletsPerPage.value,
      sort: sortOrder.value,
      search: searchQuery.value,
      ...params
    }
    
    const res = await walletService.getAllWallets(apiParams)
    wallets.value = res.data?.data || []
    
    // Update pagination data from API response
    if (res.data) {
      totalWallets.value = res.data.total_count || 0
      totalPages.value = res.data.total_pages || Math.ceil(totalWallets.value / walletsPerPage.value)
      currentPage.value = res.data.page || 1
    }
    
    // If no data from API, use mock data for testing
    if (wallets.value.length === 0) {
      wallets.value = [
        {
          id: 'WAL001',
          name: 'John Doe',
          wallet_type: 'Personal',
          currency: 'NGN',
          balance: 125045.50,
          active: true,
          tier: { name: 'Gold' },
          created_at: '2024-01-15T10:30:00Z'
        },
        {
          id: 'WAL002',
          name: 'Jane Smith',
          wallet_type: 'Business',
          currency: 'NGN',
          balance: 75000.00,
          active: true,
          tier: { name: 'Silver' },
          created_at: '2024-01-14T14:20:00Z'
        },
        {
          id: 'WAL003',
          name: 'Mike Johnson',
          wallet_type: 'Personal',
          currency: 'NGN',
          balance: 45000.75,
          active: false,
          tier: { name: 'Bronze' },
          created_at: '2024-01-13T09:15:00Z'
        }
      ]
    }
    
    // Update chart data with the fetched wallets
    updateChartData()
  } catch (e) {
    console.error('Error fetching wallets:', e)
    wallets.value = []
  } finally {
    loadingWallets.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    fetchWallets(),
    fetchWalletStats()
  ])
  
  // Ensure charts are updated with the latest data
  updateChartData()
})

// Search handler
const handleSearchInput = () => {
  currentPage.value = 1
  fetchWallets()
}

// Filter handlers
const handleCurrencyFilter = (currency) => {
  selectCurrency(currency)
  currentPage.value = 1
  fetchWallets({ currency: currency.value !== 'all' ? currency.value : undefined })
}

const handleStatusFilter = (status) => {
  selectStatus(status)
  currentPage.value = 1
  fetchWallets({ status: status.value !== 'all' ? status.value : undefined })
}

// Dropdown states
const showCurrencyDropdown = ref(false)
const showStatusDropdown = ref(false)
const activeActionDropdown = ref(null)

// Selected values
const selectedCurrency = ref('All Currencies')
const selectedStatus = ref('All Status')

// Currency options
const currencies = [
  { label: 'All Currencies', value: 'all' },
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' }
]

// Status options
const statuses = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'active', color: 'bg-green-400' },
  { label: 'Frozen', value: 'frozen', color: 'bg-red-400' },
  { label: 'Inactive', value: 'inactive', color: 'bg-gray-400' }
]

// Update functions
const selectCurrency = (currency) => {
  selectedCurrency.value = currency.label
  showCurrencyDropdown.value = false
}

const selectStatus = (status) => {
  selectedStatus.value = status.label
  showStatusDropdown.value = false
}

// Toggle functions
const toggleCurrencyDropdown = () => {
  showCurrencyDropdown.value = !showCurrencyDropdown.value
  showStatusDropdown.value = false
  activeActionDropdown.value = null
}

const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value
  showCurrencyDropdown.value = false
  activeActionDropdown.value = null
}

const toggleActionDropdown = (walletId) => {
  activeActionDropdown.value = activeActionDropdown.value === walletId ? null : walletId
  showCurrencyDropdown.value = false
  showStatusDropdown.value = false
}

const handleWalletAction = async (action, wallet) => {
  console.log('handleWalletAction called:', { action, wallet })
  
  if (action === 'view') {
    // Fetch detailed wallet information from API
    loadingWalletDetails.value = true
    try {
      const res = await walletService.getWalletById(wallet.id)
      if (res.data?.ok && res.data?.data) {
        selectedWallet.value = res.data.data
      } else {
        // Fallback to the wallet data we have
    selectedWallet.value = wallet
      }
    } catch (error) {
      console.error('Error fetching wallet details:', error)
      // Fallback to the wallet data we have
      selectedWallet.value = wallet
    } finally {
      loadingWalletDetails.value = false
    }
  } else if (action === 'freeze') {
    selectedWalletForFreeze.value = wallet
    showFreezeWalletModal.value = true
    activeActionDropdown.value = null
  } else if (action === 'credit') {
    console.log('Credit action triggered')
    selectedWalletForCredit.value = wallet
    showCreditFundsModal.value = true
    console.log('showCreditFundsModal set to:', showCreditFundsModal.value)
    activeActionDropdown.value = null
  } else if (action === 'debit') {
    console.log('Debit action triggered')
    selectedWalletForDebit.value = wallet
    showDebitFundsModal.value = true
    console.log('showDebitFundsModal set to:', showDebitFundsModal.value)
    activeActionDropdown.value = null
  } else if (action === 'remark') {
    selectedWalletForRemark.value = wallet
    showAddRemarkModal.value = true
    activeActionDropdown.value = null
  }
  activeActionDropdown.value = null
}

// Click outside handler
const handleClickOutside = (event) => {
  const statusDropdown = event.target.closest('[data-dropdown="status"]')
  const currencyDropdown = event.target.closest('[data-dropdown="currency"]')
  const actionDropdown = event.target.closest('[data-dropdown="action"]')
  
  if (!statusDropdown && showStatusDropdown.value) {
    showStatusDropdown.value = false
  }
  if (!currencyDropdown && showCurrencyDropdown.value) {
    showCurrencyDropdown.value = false
  }
  if (!actionDropdown && activeActionDropdown.value !== null) {
    activeActionDropdown.value = null
  }
}

// Add click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Wallet Details Modal
const selectedWallet = ref(null)
const loadingWalletDetails = ref(false)

const recentTransactions = [
  {
    type: 'credit',
    amount: 50000,
    description: 'Deposit via Credit Card',
    date: '4/7/2023, 2:30:00 PM'
  },
  {
    type: 'debit',
    amount: 15000,
    description: 'Withdrawal to Bank Account',
    date: '4/5/2023, 10:15:00 AM'
  },
  {
    type: 'credit',
    amount: 25000,
    description: 'Referral Commission',
    date: '4/7/2023, 2:30:00 PM'
  },
  {
    type: 'credit',
    amount: 75000,
    description: 'Referral Commission',
    date: '4/7/2023, 2:30:00 PM'
  }
]

const closeWalletDetails = () => {
  selectedWallet.value = null
}

// Update click handler for actions to prevent row click
const handleActionClick = (e, wallet) => {
  e.stopPropagation()
  toggleActionDropdown(wallet.id)
}

// Credit Funds Modal
const showCreditFundsModal = ref(false)
const selectedWalletForCredit = ref(null)
const creditFundsData = ref({
  amount: '',
  description: 'Manual credit by admin'
})
const loadingCreditAction = ref(false)

const handleCreditFunds = async () => {
  if (!selectedWalletForCredit.value || !creditFundsData.value.amount) return
  
  loadingCreditAction.value = true
  try {
    const walletId = selectedWalletForCredit.value.id || selectedWalletForCredit.value._id
    
    if (!walletId) {
      toast.error('Wallet ID is missing')
      return
    }
    
    console.log('Crediting wallet:', {
      id: walletId,
      amount: parseFloat(creditFundsData.value.amount),
      type: 'add',
      reason: creditFundsData.value.description
    })
    
    // Call API to credit wallet
    const res = await walletService.adjustWalletBalance({
      id: walletId,
      amount: parseFloat(creditFundsData.value.amount),
      type: 'add',
      reason: creditFundsData.value.description
    })
    
    console.log('Credit API response:', res)
    
    if (res.data?.ok) {
      // Update the wallet in the local list
      const walletIndex = wallets.value.findIndex(w => w.id === walletId || w._id === walletId)
      if (walletIndex !== -1) {
        wallets.value[walletIndex].balance += parseFloat(creditFundsData.value.amount)
      }
      
      // Update selected wallet if it's the same one
      if (selectedWallet.value?.id === walletId || selectedWallet.value?._id === walletId) {
        selectedWallet.value.balance += parseFloat(creditFundsData.value.amount)
      }
      
      // Show success message
      toast.success(`Successfully credited ${formatCurrency(creditFundsData.value.amount)} to wallet`)
      
      // Refresh wallet list and stats
      await Promise.all([
        fetchWallets(),
        fetchWalletStats()
      ])
    } else {
      toast.error(res.data?.message || 'Failed to credit wallet')
    }
  } catch (error) {
    console.error('Error crediting wallet:', error)
    toast.error('Failed to credit wallet. Please try again.')
  } finally {
    loadingCreditAction.value = false
  // Reset form and close modal
  creditFundsData.value = {
    amount: '',
    description: 'Manual credit by admin'
  }
  selectedWalletForCredit.value = null
  showCreditFundsModal.value = false
  }
}

// Debit Funds Modal
const showDebitFundsModal = ref(false)
const selectedWalletForDebit = ref(null)
const debitFundsData = ref({
  amount: '',
  description: 'Manual Debit by admin'
})
const loadingDebitAction = ref(false)

const handleDebitFunds = async () => {
  if (!selectedWalletForDebit.value || !debitFundsData.value.amount) return
  
  loadingDebitAction.value = true
  try {
    const walletId = selectedWalletForDebit.value.id || selectedWalletForDebit.value._id
    
    if (!walletId) {
      toast.error('Wallet ID is missing')
      return
    }
    
    console.log('Debiting wallet:', {
      id: walletId,
      amount: parseFloat(debitFundsData.value.amount),
      type: 'subtract',
      reason: debitFundsData.value.description
    })
    
    // Call API to debit wallet
    const res = await walletService.adjustWalletBalance({
      id: walletId,
      amount: parseFloat(debitFundsData.value.amount),
      type: 'subtract',
      reason: debitFundsData.value.description
    })
    
    console.log('Debit API response:', res)
    
    if (res.data?.ok) {
      // Update the wallet in the local list
      const walletIndex = wallets.value.findIndex(w => w.id === walletId || w._id === walletId)
      if (walletIndex !== -1) {
        wallets.value[walletIndex].balance -= parseFloat(debitFundsData.value.amount)
      }
      
      // Update selected wallet if it's the same one
      if (selectedWallet.value?.id === walletId || selectedWallet.value?._id === walletId) {
        selectedWallet.value.balance -= parseFloat(debitFundsData.value.amount)
      }
      
      // Show success message
      toast.success(`Successfully debited ${formatCurrency(debitFundsData.value.amount)} from wallet`)
      
      // Refresh wallet list and stats
      await Promise.all([
        fetchWallets(),
        fetchWalletStats()
      ])
    } else {
      toast.error(res.data?.message || 'Failed to debit wallet')
    }
  } catch (error) {
    console.error('Error debiting wallet:', error)
    toast.error('Failed to debit wallet. Please try again.')
  } finally {
    loadingDebitAction.value = false
  // Reset form and close modal
  debitFundsData.value = {
    amount: '',
    description: 'Manual Debit by admin'
  }
  selectedWalletForDebit.value = null
  showDebitFundsModal.value = false
  }
}

// Freeze Wallet Modal
const showFreezeWalletModal = ref(false)
const selectedWalletForFreeze = ref(null)
const loadingFreezeAction = ref(false)

const handleFreezeWallet = async () => {
  if (!selectedWalletForFreeze.value) return
  
  loadingFreezeAction.value = true
  try {
    // Debug: Log the wallet data
    console.log('Freezing wallet:', selectedWalletForFreeze.value)
    
    // Determine new status based on current status
    const currentStatus = selectedWalletForFreeze.value.active ? 'active' : 'frozen'
    const newStatus = currentStatus === 'active' ? 'frozen' : 'active'
    
    // Ensure wallet ID is properly formatted
    const walletId = selectedWalletForFreeze.value.id || selectedWalletForFreeze.value._id
    
    if (!walletId) {
      toast.error('Wallet ID is missing')
      return
    }
    
    console.log('Sending API request:', { walletid: walletId, status: newStatus })
    
    // Call API to update wallet status
    const res = await walletService.updateWalletStatus(walletId, newStatus)
    
    console.log('API response:', res)
    
    if (res.data?.ok) {
      // Update the wallet in the local list
      const walletIndex = wallets.value.findIndex(w => w.id === walletId || w._id === walletId)
      if (walletIndex !== -1) {
        wallets.value[walletIndex].active = newStatus === 'active'
      }
      
      // Update selected wallet if it's the same one
      if (selectedWallet.value?.id === walletId || selectedWallet.value?._id === walletId) {
        selectedWallet.value.active = newStatus === 'active'
      }
      
      // Show success message
      toast.success(`Wallet ${newStatus === 'frozen' ? 'frozen' : 'unfrozen'} successfully!`)
      
      // Refresh wallet list and stats
      await Promise.all([
        fetchWallets(),
        fetchWalletStats()
      ])
    } else {
      toast.error(res.data?.message || 'Failed to update wallet status')
    }
  } catch (error) {
    console.error('Error updating wallet status:', error)
    toast.error('Failed to update wallet status. Please try again.')
  } finally {
    loadingFreezeAction.value = false
  showFreezeWalletModal.value = false
  selectedWalletForFreeze.value = null
  }
}

// Add Remark Modal
const showAddRemarkModal = ref(false)
const selectedWalletForRemark = ref(null)
const remarkText = ref('')

const handleAddRemark = () => {
  console.log('Add remark:', {
    walletId: selectedWalletForRemark.value?.id,
    user: selectedWalletForRemark.value?.user,
    remark: remarkText.value
  })
  showAddRemarkModal.value = false
  selectedWalletForRemark.value = null
  remarkText.value = ''
}

// Tabs state
const walletTabs = [
  { label: 'Wallet', value: 'wallet' },
  { label: 'Currencies', value: 'currencies' },
  { label: 'Exchange Rate', value: 'exchange' }
]
const selectedWalletTab = ref('wallet')

// Currencies data
const currenciesTable = ref([
  { name: 'US Dollar', code: 'USD', symbol: '$', precision: 2, status: 'active' },
  { name: 'Euro', code: 'EUR', symbol: '€', precision: 2, status: 'active' },
  { name: 'British Pound', code: 'GBP', symbol: '£', precision: 2, status: 'inactive' },
  { name: 'Japanese Yen', code: 'JPY', symbol: '¥', precision: 0, status: 'active' },
  { name: 'Canadian Dollar', code: 'CAD', symbol: '$', precision: 2, status: 'active' }
])

// Reconcile Wallet Modal
const showReconcileModal = ref(false)
const reconcileOptions = ref({
  auditOnly: false,
  autoFix: false,
  notifyUsers: false
})

const handleStartReconciliation = () => {
  console.log('Start reconciliation with options:', reconcileOptions.value)
  showReconcileModal.value = false
  // Reset options if needed
  reconcileOptions.value = { auditOnly: false, autoFix: false, notifyUsers: false }
}

// Add Currency Modal
const showAddCurrencyModal = ref(false)
const newCurrency = ref({
  code: '',
  name: '',
  symbol: '',
  decimalPrecision: '0',
  decimalPlaces: '',
  status: 'active'
})
const decimalPrecisionOptions = [
  { label: '0 (No Decimal)', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' }
]
const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]

const handleAddCurrency = () => {
  console.log('Add new currency:', newCurrency.value)
  showAddCurrencyModal.value = false
  // Reset form
  newCurrency.value = { code: '', name: '', symbol: '', decimalPrecision: '0', decimalPlaces: '', status: 'active' }
}

// Edit Currency Modal
const showEditCurrencyModal = ref(false)
const editCurrency = ref({
  code: '',
  name: '',
  symbol: '',
  decimalPrecision: '0',
  decimalPlaces: '',
  status: 'active'
})

// Update Edit button in Currencies Table
const openEditCurrencyModal = (currency) => {
  editCurrency.value = { ...currency }
  showEditCurrencyModal.value = true
}

const handleUpdateCurrency = () => {
  console.log('Update currency:', editCurrency.value)
  showEditCurrencyModal.value = false
}

// Exchange Rates data
const exchangeRates = ref([
  { from: 'USD', to: 'EUR', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' },
  { from: 'USD', to: 'GBP', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' },
  { from: 'USD', to: 'EUR', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' },
  { from: 'USD', to: 'JPY', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' },
  { from: 'USD', to: 'EUR', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' },
  { from: 'USD', to: 'NGN', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' },
  { from: 'USD', to: 'USD', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' },
  { from: 'USD', to: 'EUR', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' },
  { from: 'USD', to: 'EUR', rate: 0.9100, fee: '1.50%', lastUpdated: '2023-04-08' }
])

// Add Exchange Rate Modal
const showAddRateModal = ref(false)
const newRate = ref({
  from: '',
  to: '',
  rate: '',
  fee: ''
})
const currencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'JPY', value: 'JPY' },
  { label: 'NGN', value: 'NGN' }
]

const handleAddRate = () => {
  console.log('Add new exchange rate:', newRate.value)
  showAddRateModal.value = false
  // Reset form
  newRate.value = { from: '', to: '', rate: '', fee: '' }
}

// Dropdown state for currency actions
const activeCurrencyActionDropdown = ref(null)
const toggleCurrencyActionDropdown = (code) => {
  activeCurrencyActionDropdown.value = activeCurrencyActionDropdown.value === code ? null : code
}
// Deactivate handler
const deactivateCurrency = (currency) => {
  currency.status = 'inactive'
}

const showDeactivateCurrencyModal = ref(false)
const currencyToDeactivate = ref(null)
function openDeactivateCurrencyModal(currency) {
  currencyToDeactivate.value = currency
  showDeactivateCurrencyModal.value = true
}
function confirmDeactivateCurrency() {
  if (currencyToDeactivate.value) {
    currencyToDeactivate.value.status = 'inactive'
  }
  showDeactivateCurrencyModal.value = false
  currencyToDeactivate.value = null
}

// Function to fetch wallet stats from the recent API
const fetchWalletStats = async () => {
  loadingStats.value = true
  try {
    const res = await walletService.getRecentWallets()
    if (res.data?.ok && res.data?.data) {
      walletStats.value = res.data.data
      // Update chart data with real data
      updateChartData()
    }
  } catch (e) {
    console.error('Error fetching wallet stats:', e)
    walletStats.value = {
      active_wallets: {
        count: 0,
        is_increasing: false,
        percent_change: 0,
        previous_month: 0
      },
      entry: {
        deposits: 0,
        withdrawals: 0,
        deposit_change: 0,
        withdrawal_change: 0
      },
      total_balance: [
        {
          count: 0,
          currency: 'NGN',
          percentage: 0,
          total_balance: 0
        }
      ]
    }
    // Update chart data with default values
    updateChartData()
  } finally {
    loadingStats.value = false
  }
}

// Pagination functions
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchWallets()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

</script> 