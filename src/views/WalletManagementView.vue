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
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance (USD)</h3>
          <CurrencyDollarIcon class="h-5 w-5 text-blue-500" />
        </div>
        <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">$14,137.75</p>
      </div>

      <!-- Active Wallets Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Wallets</h3>
          <WalletIcon class="h-5 w-5 text-blue-500" />
        </div>
        <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">6</p>
      </div>

      <!-- Recent Deposits Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Deposits</h3>
          <ArrowDownIcon class="h-5 w-5 text-blue-500" />
        </div>
        <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">$18,450</p>
      </div>

      <!-- Recent Withdrawals Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Withdrawals</h3>
          <ArrowUpIcon class="h-5 w-5 text-blue-500" />
        </div>
        <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">$12,345</p>
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
                @click.prevent="selectCurrency(currency)"
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
                @click.prevent="selectStatus(status)"
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
        <button v-if="selectedWalletTab === 'exchange'" class="flex items-center px-4 py-2 border border-blue-600 text-blue-700 bg-white rounded-md text-sm font-medium hover:bg-blue-50 mr-2" @click="">
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
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Currency</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Balance</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Activity</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="wallet in wallets" 
              :key="wallet.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.user }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.currency }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.balance }}</td>
            <td class="px-6 py-4 whitespace-nowrap" @click.stop>
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                {
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': wallet.status === 'active',
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': wallet.status === 'frozen',
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400': wallet.status === 'inactive'
                }
              ]">
                {{ wallet.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100" @click.stop>{{ wallet.lastActivity }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" @click.stop>
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
                        Freeze Website
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

    <!-- Currencies Table -->
    <div v-if="selectedWalletTab === 'currencies'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Currency</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Code</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Balance</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="currency in currenciesTable" :key="currency.code" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ currency.currency }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ currency.code }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ currency.symbol }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ currency.totalBalance }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                currency.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
              ]">
                {{ currency.status.charAt(0).toUpperCase() + currency.status.slice(1) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" @click="openEditCurrencyModal(currency)">Edit</button>
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
          <p class="text-sm text-gray-500">User: {{ selectedWallet.user }}</p>
        </div>

        <!-- Content -->
        <div class="flex-1 px-6">
          <!-- Wallet Info Grid -->
          <div class="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <div class="text-sm text-gray-500">Type</div>
              <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedWallet.type }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Currency</div>
              <div class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedWallet.currency }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Balance</div>
              <div class="mt-1 text-sm text-gray-900 dark:text-white">${{ selectedWallet.balance }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Status</div>
              <div class="mt-1">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ selectedWallet.status }}
                </span>
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Created On</div>
              <div class="mt-1 text-sm text-gray-900 dark:text-white">2023-01-15</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Last Activity</div>
              <div class="mt-1 text-sm text-gray-900 dark:text-white">2023-04-07</div>
            </div>
          </div>

          <!-- Remark -->
          <div class="mt-6">
            <div class="text-sm text-gray-500">Remark</div>
            <div class="mt-1 text-sm text-gray-900 dark:text-white">
              Recheck and update wallet before freezing account
            </div>
          </div>

          <!-- Recent Transactions -->
          <div class="mt-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-500">View All</a>
            </div>
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase pb-3">Type</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase pb-3">Amount</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase pb-3">Description</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase pb-3">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="transaction in recentTransactions" :key="transaction.date" class="group">
                  <td class="py-3">
                    <div class="flex items-center">
                      <div :class="[
                        'flex-shrink-0 rounded-full p-2 mr-2',
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      ]">
                        <ArrowUpIcon v-if="transaction.type === 'credit'" 
                                   class="h-4 w-4 text-green-600 transform rotate-45" />
                        <ArrowDownIcon v-else 
                                     class="h-4 w-4 text-red-600 transform -rotate-45" />
                      </div>
                      <span class="text-sm text-gray-900 dark:text-white capitalize">{{ transaction.type }}</span>
                    </div>
                  </td>
                  <td class="py-3">
                    <span :class="[
                      'text-sm font-medium',
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    ]">
                      {{ transaction.type === 'credit' ? '+' : '-' }}${{ transaction.amount }}
                    </span>
                  </td>
                  <td class="py-3">
                    <span class="text-sm text-gray-900 dark:text-white">{{ transaction.description }}</span>
                  </td>
                  <td class="py-3">
                    <span class="text-sm text-gray-500">{{ transaction.date }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-6 bg-gray-50 dark:bg-gray-900/50">
          <div class="flex items-center space-x-3">
            <button 
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              @click="handleWalletAction('freeze', selectedWallet)"
            >
              Freeze Wallet
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

                  <!-- Buttons -->
                  <div class="flex gap-3 pt-4">
                    <button
                      type="button"
                      @click="showCreditFundsModal = false"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
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
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                    >
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
                    Freeze Wallet
                  </DialogTitle>
                  <button @click="showFreezeWalletModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  This will prevent the user from performing any transactions with this wallet. Are you sure you want to freeze it?
                </p>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-5">
                  <div class="flex items-center mb-1">
                    <ExclamationTriangleIcon class="h-5 w-5 text-yellow-500 mr-2" />
                    <span class="font-medium text-yellow-800">Important Notice</span>
                  </div>
                  <div class="text-xs text-yellow-700">
                    Freezing this wallet will prevent the user from depositing, withdrawing, or transferring funds until the wallet is unfrozen.
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
                      <span class="text-gray-900 dark:text-white">{{ selectedWalletForFreeze?.user }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">Balance:</span>
                      <span class="text-gray-900 dark:text-white">{{ selectedWalletForFreeze?.balance }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">Current Status:</span>
                      <span class="font-medium text-green-600" v-if="selectedWalletForFreeze?.status === 'active'">Active</span>
                      <span class="font-medium text-red-600" v-else-if="selectedWalletForFreeze?.status === 'frozen'">Frozen</span>
                      <span class="font-medium text-gray-600" v-else>Inactive</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-3 pt-2">
                  <button
                    type="button"
                    @click="showFreezeWalletModal = false"
                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="handleFreezeWallet"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Freeze Wallet
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
const activityTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Deposits',
      data: [1500, 2000, 1800, 2200, 1900, 2100],
      borderColor: '#3B82F6',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Withdrawals',
      data: [1000, 1200, 900, 1400, 1100, 1300],
      borderColor: '#EF4444',
      tension: 0.4,
      fill: false
    }
  ]
}

const distributionData = {
  labels: ['USD Wallet', 'EUR Wallet', 'GBP Wallet', 'Other Wallets'],
  datasets: [{
    data: [40, 30, 20, 10],
    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#6B7280']
  }]
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
const wallets = ref([
  {
    id: 'W0001',
    user: 'John Doe',
    type: 'Main',
    currency: 'USD',
    balance: '$5750.45',
    status: 'active',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0002',
    user: 'John Doe',
    type: 'Savings',
    currency: 'EUR',
    balance: '€1750.45',
    status: 'active',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0003',
    user: 'John Doe',
    type: 'Main',
    currency: 'USD',
    balance: '$2750.45',
    status: 'frozen',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0004',
    user: 'John Doe',
    type: 'Bonus',
    currency: 'USD',
    balance: '$250.45',
    status: 'active',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0005',
    user: 'John Doe',
    type: 'Main',
    currency: 'USD',
    balance: '$1750.45',
    status: 'inactive',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0006',
    user: 'John Doe',
    type: 'Main',
    currency: 'USD',
    balance: '$750.45',
    status: 'active',
    lastActivity: '2023-04-07'
  }
])

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

const handleWalletAction = (action, wallet) => {
  if (action === 'view') {
    selectedWallet.value = wallet
  } else if (action === 'freeze') {
    selectedWalletForFreeze.value = wallet
    showFreezeWalletModal.value = true
    activeActionDropdown.value = null
  } else if (action === 'credit') {
    selectedWalletForCredit.value = wallet
    showCreditFundsModal.value = true
    activeActionDropdown.value = null
  } else if (action === 'debit') {
    selectedWalletForDebit.value = wallet
    showDebitFundsModal.value = true
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

const recentTransactions = [
  {
    type: 'credit',
    amount: '500.00',
    description: 'Deposit via Credit Card',
    date: '4/7/2023, 2:30:00 PM'
  },
  {
    type: 'debit',
    amount: '150.00',
    description: 'Withdrawal to Bank Account',
    date: '4/5/2023, 10:15:00 AM'
  },
  {
    type: 'credit',
    amount: '500.00',
    description: 'Referral Commission',
    date: '4/7/2023, 2:30:00 PM'
  },
  {
    type: 'credit',
    amount: '500.00',
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

const handleCreditFunds = () => {
  console.log('Credit funds:', {
    walletId: selectedWalletForCredit.value?.id,
    amount: creditFundsData.value.amount,
    description: creditFundsData.value.description
  })
  
  // Reset form and close modal
  creditFundsData.value = {
    amount: '',
    description: 'Manual credit by admin'
  }
  selectedWalletForCredit.value = null
  showCreditFundsModal.value = false
}

// Debit Funds Modal
const showDebitFundsModal = ref(false)
const selectedWalletForDebit = ref(null)
const debitFundsData = ref({
  amount: '',
  description: 'Manual Debit by admin'
})

const handleDebitFunds = () => {
  console.log('Debit funds:', {
    walletId: selectedWalletForDebit.value?.id,
    amount: debitFundsData.value.amount,
    description: debitFundsData.value.description
  })
  
  // Reset form and close modal
  debitFundsData.value = {
    amount: '',
    description: 'Manual Debit by admin'
  }
  selectedWalletForDebit.value = null
  showDebitFundsModal.value = false
}

// Freeze Wallet Modal
const showFreezeWalletModal = ref(false)
const selectedWalletForFreeze = ref(null)

const handleFreezeWallet = () => {
  console.log('Freeze wallet:', {
    walletId: selectedWalletForFreeze.value?.id
  })
  showFreezeWalletModal.value = false
  selectedWalletForFreeze.value = null
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
  { currency: 'US Dollar', code: 'USD', symbol: '$', totalBalance: '10,000.00', status: 'active' },
  { currency: 'Euro', code: 'EUR', symbol: '€', totalBalance: '5,000.00', status: 'active' },
  { currency: 'British Pound', code: 'GBP', symbol: '£', totalBalance: '2,500.00', status: 'inactive' },
  { currency: 'Japanese Yen', code: 'JPY', symbol: '¥', totalBalance: '1,200,000', status: 'active' }
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
</script> 