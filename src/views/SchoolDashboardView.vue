<template>
  <div v-if="hasError" class="space-y-6">
    <div class="bg-red-50 border border-red-200 rounded-lg p-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error Loading Dashboard</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ errorMessage }}</p>
          </div>
          <div class="mt-4">
            <button @click="retryLoad" class="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-200">
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Platform Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400">Overview of the entire FeeSync platform</p>
      </div>
      <div class="text-sm text-gray-500">
        Last refreshed: {{ lastUpdated }}
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <DashboardCard
        title="Total Schools"
        value="4,521"
        change="+24%"
        subtitle="215 active"
        icon="school"
        color="blue"
      />
      <DashboardCard
        title="Total Users"
        value="18,500"
        change="+16%"
        subtitle="32 new this week"
        icon="users"
        color="green"
      />
      <DashboardCard
        title="Transactions"
        value="15,782"
        change="+12%"
        subtitle="Across all schools"
        icon="chart-line"
        color="purple"
      />
      <DashboardCard
        title="Revenue"
        value="₦12.5M"
        change="+8%"
        subtitle="Transaction fees: 1.5%"
        icon="money-bag"
        color="yellow"
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
          @click="activeTab = 'schools'"
          :class="activeTab === 'schools' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Schools
        </button>
        <button 
          @click="activeTab = 'transactions'"
          :class="activeTab === 'transactions' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Transactions
        </button>
      </nav>
    </div>

    <!-- Overview Tab Content -->
    <div v-if="activeTab === 'overview'">
    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- School Growth Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">School Growth - Monthly new school registrations</h3>
            </div>
        </div>
        <div class="h-64">
          <BarChart
            v-if="schoolGrowthData && schoolGrowthData.datasets"
            :data="schoolGrowthData"
            :options="schoolGrowthOptions"
          />
          <div v-else class="h-full flex items-center justify-center text-gray-500">
            Loading chart...
          </div>
        </div>
      </div>

        <!-- Monthly Revenue Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Monthly Revenue - Platform revenue from all sources</h3>
            </div>
        </div>
        <div class="h-64">
            <BarChart
            v-if="revenueData && revenueData.datasets"
            :data="revenueData"
            :options="revenueOptions"
          />
          <div v-else class="h-full flex items-center justify-center text-gray-500">
            Loading chart...
          </div>
        </div>
      </div>
    </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <!-- Revenue Sources Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Revenue Sources - Breakdown of user activity status</h3>
            </div>
        </div>
        <div class="h-64">
          <PieChart
              v-if="revenueSourcesData && revenueSourcesData.datasets"
              :data="revenueSourcesData"
            :options="pieChartOptions"
          />
          <div v-else class="h-full flex items-center justify-center text-gray-500">
            Loading chart...
          </div>
        </div>
      </div>

        <!-- Support Status Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Support Status - Current support ticket metrics</h3>
            </div>
          </div>
          <div class="space-y-6">
            <div class="space-y-2">
          <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Open Tickets</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">18 tickets</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-purple-500 h-3 rounded-full" style="width: 18%"></div>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Response Rate</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">92%</span>
          </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-purple-500 h-3 rounded-full" style="width: 92%"></div>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Average Resolution Time</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">4.2 hrs</span>
          </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-purple-500 h-3 rounded-full" style="width: 84%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Schools Tab Content -->
    <div v-if="activeTab === 'schools'" class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Schools</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Recently registered or updated schools</p>
      </div>
      
      <!-- Search and Actions Bar -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <!-- Search Bar -->
          <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Name"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          
          <!-- Action Buttons -->
          <div class="flex items-center space-x-3">
            <button class="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button class="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 flex items-center space-x-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Schools Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">School Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="school in schoolsData" :key="school.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-gray-600 text-sm font-medium">{{ school.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ school.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ school.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ school.registrationDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(school.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ school.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="openSchoolModal(school)" class="text-blue-600 hover:text-blue-900">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Showing 0 to 0 of 0 entries (filtered from 0 total entries)
          </div>
          <div class="flex items-center space-x-1">
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"><<</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"><</button>
            <button class="px-3 py-1 text-sm text-white bg-purple-600 border border-purple-600 rounded-md">1</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">3</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">4</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">...</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">></button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">>></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions Tab Content -->
    <div v-if="activeTab === 'transactions'" class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Platform revenue transactions</p>
      </div>
      
      <!-- Search and Actions Bar -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <!-- Search Bar -->
          <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Name"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          
          <!-- Action Buttons -->
          <div class="flex items-center space-x-3">
            <button class="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button class="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 flex items-center space-x-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Transactions Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">School</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="transaction in transactionsData" :key="transaction.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ transaction.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-gray-600 text-xs font-medium">{{ transaction.school.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ transaction.school }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ₦{{ transaction.amount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ transaction.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ transaction.type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getTransactionStatusClass(transaction.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ transaction.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Showing 0 to 0 of 0 entries (filtered from 0 total entries)
          </div>
          <div class="flex items-center space-x-1">
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"><<</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"><</button>
            <button class="px-3 py-1 text-sm text-white bg-black border border-black rounded-md">1</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">3</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">4</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">...</button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">></button>
            <button class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">>></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- School Details Modal -->
  <div v-if="showSchoolModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
    <div class="bg-white w-full max-w-md h-full overflow-y-auto">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">{{ selectedSchool?.name }}</h2>
            <p class="text-sm text-gray-600">{{ selectedSchool?.email }}</p>
          </div>
        </div>
        <button @click="closeSchoolModal" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6 space-y-6">
        <!-- School Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">School Information</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Status</span>
              <span :class="getStatusClass(selectedSchool?.status)" class="px-3 py-1 text-xs font-semibold rounded-full">
                {{ selectedSchool?.status }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Registration Date</span>
              <div v-if="!editingFields.registrationDate" class="flex items-center space-x-2">
                <span class="text-sm text-gray-900">{{ selectedSchool?.registrationDate }}</span>
                <button @click="startEditing('registrationDate')" class="text-blue-600 hover:text-blue-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              <div v-else class="flex items-center space-x-2">
                <input 
                  v-model="editingValues.registrationDate" 
                  type="date" 
                  class="text-sm border border-gray-300 rounded px-2 py-1 w-32"
                />
                <button @click="saveField('registrationDate')" class="text-green-600 hover:text-green-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button @click="cancelEditing('registrationDate')" class="text-red-600 hover:text-red-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Phone Number</span>
              <div v-if="!editingFields.phoneNumber" class="flex items-center space-x-2">
                <span class="text-sm text-gray-900">{{ editingValues.phoneNumber }}</span>
                <button @click="startEditing('phoneNumber')" class="text-blue-600 hover:text-blue-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              <div v-else class="flex items-center space-x-2">
                <input 
                  v-model="editingValues.phoneNumber" 
                  type="tel" 
                  class="text-sm border border-gray-300 rounded px-2 py-1 w-36"
                  placeholder="+234 803 123 4567"
                />
                <button @click="saveField('phoneNumber')" class="text-green-600 hover:text-green-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button @click="cancelEditing('phoneNumber')" class="text-red-600 hover:text-red-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Administrator</span>
              <div v-if="!editingFields.administrator" class="flex items-center space-x-2">
                <span class="text-sm text-gray-900">{{ editingValues.administrator }}</span>
                <button @click="startEditing('administrator')" class="text-blue-600 hover:text-blue-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              <div v-else class="flex items-center space-x-2">
                <input 
                  v-model="editingValues.administrator" 
                  type="text" 
                  class="text-sm border border-gray-300 rounded px-2 py-1 w-36"
                  placeholder="Dr. Samuel Okafor"
                />
                <button @click="saveField('administrator')" class="text-green-600 hover:text-green-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button @click="cancelEditing('administrator')" class="text-red-600 hover:text-red-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Metrics -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Metrics</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">485</div>
              <div class="text-sm text-gray-600">Students</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">92%</div>
              <div class="text-sm text-gray-600">Payment Rate</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">Premium</div>
              <div class="text-sm text-gray-600">Subscription</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg col-span-2">
              <div class="text-sm text-gray-600 mb-1">School Address</div>
              <div v-if="!editingFields.schoolAddress" class="flex items-center justify-between">
                <span class="text-sm text-gray-900">{{ editingValues.schoolAddress }}</span>
                <button @click="startEditing('schoolAddress')" class="text-blue-600 hover:text-blue-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              <div v-else class="flex items-center space-x-2">
                <input 
                  v-model="editingValues.schoolAddress" 
                  type="text" 
                  class="text-sm border border-gray-300 rounded px-2 py-1 w-full"
                  placeholder="15 King's Avenue, Lagos"
                />
                <button @click="saveField('schoolAddress')" class="text-green-600 hover:text-green-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button @click="cancelEditing('schoolAddress')" class="text-red-600 hover:text-red-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button class="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">Credit</div>
                  <div class="text-xs text-gray-600">Subscription</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">₦25,000</div>
                <div class="text-xs text-gray-600">5/9/2023</div>
              </div>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">Credit</div>
                  <div class="text-xs text-gray-600">Subscription</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">₦25,000</div>
                <div class="text-xs text-gray-600">4/9/2022</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3 pt-4 border-t border-gray-200">
          <button @click="closeSchoolModal" class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
            Close
          </button>
          <button class="flex-1 px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900">
            Edit School
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onErrorCaptured } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'

// Error handling
const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((error, instance, info) => {
  console.error('Error captured in SchoolDashboardView:', error, instance, info)
  hasError.value = true
  errorMessage.value = 'An error occurred while loading the dashboard. Please refresh the page.'
  return false // Prevent error from propagating
})

// ... existing code ...

const retryLoad = () => {
  hasError.value = false
  errorMessage.value = ''
  // Re-initialize the component by calling the initialization logic directly
  initializeDashboard()
}

// ... existing code ...

// Lifecycle
onMounted(() => {
  // Initialize dashboard data
  initializeDashboard()
})

// Add a separate function for initialization
const initializeDashboard = () => {
  console.log('Platform Dashboard mounted')
  // Add any initialization logic here
}

// ... existing code ...

// Reactive data
const lastUpdated = ref('5/10/2025, 8:20:13 PM')
const activeTab = ref('overview')

// School growth chart data - matching the design exactly
const schoolGrowthData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Schools',
    data: [600, 200, 400, 700, 450, 450],
    backgroundColor: 'rgba(147, 51, 234, 0.8)', // Purple color
    borderColor: 'rgba(147, 51, 234, 1)',
    borderWidth: 1
  }]
})

const schoolGrowthOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 700,
      ticks: {
        stepSize: 100
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
    }
  }
})

// Monthly revenue chart data - matching the design exactly
const revenueData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue (₦)',
    data: [550, 250, 400, 650, 400, 400],
    backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue color
    borderColor: 'rgba(59, 130, 246, 1)',
    borderWidth: 1
  }]
})

const revenueOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 700,
      ticks: {
        stepSize: 100
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
    }
  }
})

// Revenue sources pie chart data - matching the design exactly
const revenueSourcesData = ref({
  labels: ['Transaction Fees', 'Subscriptions', 'Premium features'],
  datasets: [{
    data: [70, 20, 10],
    backgroundColor: [
      'rgba(147, 51, 234, 0.8)', // Purple
      'rgba(236, 72, 153, 0.8)', // Pink
      'rgba(147, 197, 253, 0.8)'  // Light blue
    ],
    borderWidth: 2,
    borderColor: '#fff'
  }]
})

const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'rect'
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return context.label + ': ' + context.parsed + '%'
        }
      }
    }
  }
})

// Schools data for the table
const schoolsData = ref([
  {
    id: 1,
    name: 'Heritage Grammar School',
    email: 'info@heritagegrammar.edu.ng',
    registrationDate: '5/14/2023',
    status: 'active'
  },
  {
    id: 2,
    name: 'Greenfield Academy',
    email: 'admin@greenfieldacademy.edu.ng',
    registrationDate: '5/12/2023',
    status: 'pending'
  },
  {
    id: 3,
    name: 'St. Michael\'s College',
    email: 'contact@stmichaelscollege.edu.ng',
    registrationDate: '5/10/2023',
    status: 'active'
  },
  {
    id: 4,
    name: 'Westpoint International',
    email: 'info@westpointinternational.edu.ng',
    registrationDate: '5/8/2023',
    status: 'active'
  },
  {
    id: 5,
    name: 'Horizon Educational Center',
    email: 'admin@horizoneducational.edu.ng',
    registrationDate: '5/4/2023',
    status: 'suspended'
  }
])

// School details modal state
const showSchoolModal = ref(false)
const selectedSchool = ref<any>(null)

// Editable fields state
const editingFields = ref({
  registrationDate: false,
  phoneNumber: false,
  administrator: false,
  schoolAddress: false
})

const editingValues = ref({
  registrationDate: '',
  phoneNumber: '+234 803 123 4567',
  administrator: 'Dr. Samuel Okafor',
  schoolAddress: '15 King\'s Avenue, Lagos'
})

const openSchoolModal = (school: any) => {
  selectedSchool.value = school
  // Initialize editing values with default data
  editingValues.value = {
    registrationDate: school.registrationDate || '',
    phoneNumber: '+234 803 123 4567',
    administrator: 'Dr. Samuel Okafor',
    schoolAddress: '15 King\'s Avenue, Lagos'
  }
  // Reset editing state
  editingFields.value = {
    registrationDate: false,
    phoneNumber: false,
    administrator: false,
    schoolAddress: false
  }
  showSchoolModal.value = true
}

const closeSchoolModal = () => {
  showSchoolModal.value = false
  selectedSchool.value = null
  // Reset editing state
  editingFields.value = {
    registrationDate: false,
    phoneNumber: false,
    administrator: false,
    schoolAddress: false
  }
}

const startEditing = (field: string) => {
  editingFields.value[field as keyof typeof editingFields.value] = true
}

const saveField = (field: string) => {
  // Here you would typically save to your backend
  console.log(`Saving ${field}:`, editingValues.value[field as keyof typeof editingValues.value])
  
  // Exit editing mode
  editingFields.value[field as keyof typeof editingFields.value] = false
  
  // Show success message (optional)
  // You could add a toast notification here
}

const cancelEditing = (field: string) => {
  // Reset the value to original
  if (field === 'registrationDate') {
    editingValues.value.registrationDate = selectedSchool.value?.registrationDate || ''
  } else if (field === 'phoneNumber') {
    editingValues.value.phoneNumber = '+234 803 123 4567'
  } else if (field === 'administrator') {
    editingValues.value.administrator = 'Dr. Samuel Okafor'
  } else if (field === 'schoolAddress') {
    editingValues.value.schoolAddress = '15 King\'s Avenue, Lagos'
  }
  
  // Exit editing mode
  editingFields.value[field as keyof typeof editingFields.value] = false
}

// Helper function to get status class
const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'suspended':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Helper function to get transaction status class
const getTransactionStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Transactions data for the table
const transactionsData = ref([
  {
    id: 'TXN001',
    school: 'Heritage Grammar School',
    amount: 2500,
    date: '5/14/2023',
    type: 'Transaction Fee',
    status: 'completed'
  },
  {
    id: 'TXN002',
    school: 'Greenfield Academy',
    amount: 1500,
    date: '5/13/2023',
    type: 'Subscription',
    status: 'pending'
  },
  {
    id: 'TXN003',
    school: 'St. Michael\'s College',
    amount: 2000,
    date: '5/12/2023',
    type: 'Transaction Fee',
    status: 'completed'
  },
  {
    id: 'TXN004',
    school: 'Westpoint International',
    amount: 3000,
    date: '5/11/2023',
    type: 'Premium Feature',
    status: 'pending'
  },
  {
    id: 'TXN005',
    school: 'Horizon Educational Center',
    amount: 1800,
    date: '5/10/2023',
    type: 'Transaction Fee',
    status: 'completed'
  }
])

// Lifecycle
onMounted(() => {
  // Initialize dashboard data
  console.log('Platform Dashboard mounted')
})
</script>
