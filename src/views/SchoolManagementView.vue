<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Schools Management</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage and monitor schools using the platform.</p>
    </div>

    <!-- Search and Filter Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <!-- Search Bar -->
      <div class="relative flex-1 max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search school by name or email"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>
      
      <!-- Filter Dropdown -->
      <div class="relative">
        <select 
          v-model="selectedFilter"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <option value="all">All Schools</option>
          <option value="active">Active Schools</option>
          <option value="suspended">Suspended Schools</option>
          <option value="pending">Pending Schools</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Schools Directory Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <!-- Enhanced Table Header with Summary -->
      <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Schools Directory
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Showing <span class="font-semibold text-gray-900 dark:text-white">{{ schoolsData.length }}</span>
              {{ schoolsData.length === 1 ? 'school' : 'schools' }}
              <span v-if="paginationMeta.totalItems !== schoolsData.length" class="text-gray-500 dark:text-gray-500">
                (of {{ paginationMeta.totalItems }} total)
              </span>
            </p>
          </div>
          <div class="flex items-center gap-4 flex-wrap">
            <!-- Statistics Cards -->
            <div class="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div class="text-center">
                <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ activeSchoolsCount }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Active</div>
              </div>
            </div>
            <div class="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div class="text-center">
                <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ primarySchoolsCount }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Primary</div>
              </div>
            </div>
            <div class="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div class="text-center">
                <div class="text-lg font-bold text-purple-600 dark:text-purple-400">{{ nurserySchoolsCount }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Nursery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vue3 DataTable -->
      <div class="p-6">
        <Vue3Datatable
          :rows="schoolsData"
          :columns="columns"
          :totalRows="paginationMeta.totalItems"
          :sortable="true"
          :searchable="true"
          :pageSize="itemsPerPage"
          :pageSizeOptions="[10, 25, 50, 100]"
          :classes="{
            table: 'table-auto w-full',
            thead: 'bg-gray-50 dark:bg-gray-700',
            tbody: '',
            tr: 'border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
            th: 'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider',
            td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white',
          }"
          skin="bh-table-compact"
          :loading="loading"
          @row-clicked="onRowClick"
        >
          <!-- Custom School Name Column -->
          <template #schoolName="data">
            <div v-if="data && data.value" class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <div class="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span class="text-gray-600 dark:text-gray-300 text-sm font-medium">{{ (data.value.name || '').charAt(0).toUpperCase() || 'N' }}</span>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ data.value.name || 'N/A' }}</div>
              </div>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <!-- Custom Reference Column -->
          <template #reference="data">
            <span v-if="data && data.value" class="text-sm font-mono text-gray-700 dark:text-gray-300">
              {{ data.value.reference || 'N/A' }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <!-- Custom Type Column -->
          <template #type="data">
            <span v-if="data && data.value" :class="getTypeClass(data.value.type)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize">
              {{ data.value.type || 'N/A' }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <!-- Custom Director Name Column -->
          <template #directorName="data">
            <span v-if="data && data.value" class="text-sm text-gray-900 dark:text-white">
              {{ data.value.directorName || 'N/A' }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <!-- Custom Director Phone Column -->
          <template #directorPhone="data">
            <span v-if="data && data.value" class="text-sm text-gray-700 dark:text-gray-300">
              {{ data.value.directorPhone || 'N/A' }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <!-- Custom Status Column -->
          <template #status="data">
            <span v-if="data && data.value" :class="getStatusClass(data.value.status || 'active')" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
              {{ data.value.status || 'N/A' }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <!-- Custom Created Date Column -->
          <template #createdAt="data">
            <div v-if="data && data.value && data.value.createdAt" class="flex flex-col">
              <span class="text-sm text-gray-900 dark:text-white">
                {{ formatDate(data.value.createdAt) }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatTime(data.value.createdAt) }}
              </span>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <!-- Custom Actions Column -->
          <template #actions="data">
            <div v-if="data && data.value" class="flex items-center space-x-2">
              <button
                @click.stop="viewSchool(data.value)"
                class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
              >
                View
              </button>
              <button
                @click.stop="suspendSchool(data.value)"
                class="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 font-medium text-sm"
              >
                Suspend
              </button>
              <button
                @click.stop="deleteSchool(data.value)"
                class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm"
              >
                Delete
              </button>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>
        </Vue3Datatable>
      </div>
    </div>

    <!-- School Details Modal -->
    <div v-if="showSchoolModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div class="bg-white w-full max-w-2xl h-full overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">School Details</h2>
            <p class="text-sm text-gray-600">Comprehensive information about the school</p>
          </div>
          <button @click="closeSchoolModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <!-- School Identification -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900">{{ selectedSchool?.name }}</h3>
                <span :class="getStatusClass(selectedSchool?.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ selectedSchool?.status }}
                </span>
              </div>
            </div>
            <div class="text-sm text-gray-600">
              Registered on: {{ selectedSchool?.createdAt ? formatDate(selectedSchool.createdAt) : 'N/A' }}
            </div>
          </div>

          <!-- Key Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">{{ selectedSchool?.location || selectedSchool?.address || 'N/A' }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">{{ selectedSchool?.email || selectedSchool?.director?.email || 'N/A' }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">{{ selectedSchool?.director?.phone || 'N/A' }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">Academic Year: 2023/2024</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">Current Term: 2nd Term</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">Director: {{ selectedSchool?.director?.name || 'N/A' }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">Reference: {{ selectedSchool?.reference || 'N/A' }}</span>
            </div>
          </div>

          <!-- Subscription Details -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-3">Subscription Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span class="text-sm text-gray-600">Plan:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">Premium Tier</span>
              </div>
              <div>
                <span class="text-sm text-gray-600">Renewal Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">15 Dec 2023</span>
              </div>
              <div>
                <span class="text-sm text-gray-600">Payment Status:</span>
                <span class="ml-2 text-sm font-medium text-green-600">Paid</span>
              </div>
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button 
                @click="activeTab = 'statistics'"
                :class="activeTab === 'statistics' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
              >
                Statistics
              </button>
              <button 
                @click="activeTab = 'administrators'"
                :class="activeTab === 'administrators' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
              >
                Administrators
              </button>
              <button 
                @click="activeTab = 'activity'"
                :class="activeTab === 'activity' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
              >
                Activity log
              </button>
              <button 
                @click="activeTab = 'support'"
                :class="activeTab === 'support' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
              >
                Support
              </button>
            </nav>
          </div>

          <!-- Tab Content: Statistics from GET /api/v1/admin/schools/:id/stats -->
          <div v-if="activeTab === 'statistics'" class="space-y-4">
            <div v-if="loadingStats" class="text-center py-8 text-gray-500">Loading statistics…</div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600">Total Fee Volume</p>
                    <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(schoolStats?.total_fee_volume ?? 0) }}</p>
                  </div>
                  <div :class="trendClass(schoolStats?.fee_volume_trend)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm mt-2" :class="changeClass(schoolStats?.fee_volume_change_percentage)">
                  {{ formatChange(schoolStats?.fee_volume_change_percentage) }} from last period
                </p>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600">Platform Fees</p>
                    <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(schoolStats?.platform_fees ?? 0) }}</p>
                  </div>
                  <div :class="trendClass(schoolStats?.platform_fees_trend)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm mt-2" :class="changeClass(schoolStats?.platform_fees_change_percentage)">
                  {{ formatChange(schoolStats?.platform_fees_change_percentage) }}
                </p>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600">Payment Success Rate</p>
                    <p class="text-2xl font-bold text-gray-900">{{ (schoolStats?.payment_success_rate ?? 0) }}%</p>
                  </div>
                  <div :class="trendClass(schoolStats?.success_rate_trend)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm mt-2" :class="changeClass(schoolStats?.success_rate_change)">
                  {{ formatChange(schoolStats?.success_rate_change) }} improvement
                </p>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600">Active Parents</p>
                    <p class="text-2xl font-bold text-gray-900">{{ (schoolStats?.active_parents ?? 0).toLocaleString() }}</p>
                  </div>
                  <div :class="trendClass(schoolStats?.active_parents_trend)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm mt-2" :class="changeClass(schoolStats?.active_parents_change_percentage)">
                  {{ formatChange(schoolStats?.active_parents_change_percentage) }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'administrators'" class="space-y-4">
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold text-sm">JS</span>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">John Smith</h4>
                    <p class="text-sm text-gray-600">Principal Administrator</p>
                  </div>
                </div>
                <button class="px-4 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100">
                  Contact
                </button>
              </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span class="text-green-600 font-semibold text-sm">SJ</span>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Sarah Johnson</h4>
                    <p class="text-sm text-gray-600">Finance Officer</p>
                  </div>
                </div>
                <button class="px-4 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100">
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'activity'" class="space-y-4">
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Generated term fee structure</p>
                    <p class="text-xs text-gray-500">Today, 10:23 AM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Added 25 new students</p>
                    <p class="text-xs text-gray-500">Yesterday, 2:45 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Processed bulk payment</p>
                    <p class="text-xs text-gray-500">05 May, 11:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Updated school information</p>
                    <p class="text-xs text-gray-500">03 May, 4:15 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'support'" class="space-y-4">
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Payment gateway integration issue</p>
                  </div>
                </div>
                <button class="px-4 py-2 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-md">
                  Open
                </button>
              </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Bulk import student data</p>
                  </div>
                </div>
                <button class="px-4 py-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                  Resolved
                </button>
              </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Parent account recovery</p>
                  </div>
                </div>
                <button class="px-4 py-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                  Resolved
                </button>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4 border-t border-gray-200">
            <button @click="suspendSchool(selectedSchool)" class="flex-1 px-4 py-2 text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50">
              Suspend School
            </button>
            <button @click="updateSchool" class="flex-1 px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
              Update School
            </button>
            <button @click="closeSchoolModal" class="flex-1 px-4 py-2 text-white bg-black rounded-md hover:bg-gray-900">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Suspend School Confirmation Modal -->
    <div v-if="showSuspendModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Suspend School</h2>
          <button @click="closeSuspendModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <!-- Warning Message -->
          <p class="text-gray-600">
            This will temporarily disable the school's access to the platform. They will not be able to process transactions until reinstated.
          </p>

          <!-- School Identification -->
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ schoolToSuspend?.name }}</h3>
              <p class="text-sm text-gray-600">{{ schoolToSuspend?.email }}</p>
            </div>
          </div>
    
          <!-- Suspension Reason Input -->
          <div>
            <label for="suspensionReason" class="block text-sm font-medium text-gray-700 mb-2">
              Suspension Reason <span class="text-red-500">*</span>
            </label>
            <textarea
              id="suspensionReason"
              v-model="suspensionReason"
              rows="3"
              placeholder="Provide a reason for suspension"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4">
            <button @click="closeSuspendModal" class="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button @click="confirmSuspendSchool" :disabled="!suspensionReason.trim()" class="flex-1 px-4 py-2 text-white bg-orange-600 border border-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Suspend School
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete School Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>
            <h2 class="text-xl font-bold text-red-600">Delete School</h2>
          </div>
          <button @click="closeDeleteModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <!-- Warning Message -->
          <div class="border border-red-400 bg-red-50 text-red-700 rounded px-3 py-2 text-sm">
            <strong>Warning:</strong> This action cannot be undone. All school data and associated records will be permanently deleted.
          </div>

          <!-- School Identification -->
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ schoolToDelete?.name }}</h3>
              <p class="text-sm text-gray-600">{{ schoolToDelete?.email }}</p>
              <p class="text-xs text-gray-500 mt-1">Reference: {{ schoolToDelete?.reference }}</p>
            </div>
          </div>

          <p class="text-gray-600 text-sm">
            Are you sure you want to delete <strong>{{ schoolToDelete?.name }}</strong>? This will permanently remove all school data, including students, staff, and transaction records.
          </p>

          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4">
            <button @click="closeDeleteModal" class="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button @click="confirmDeleteSchool" class="flex-1 px-4 py-2 text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700">
              Delete School
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import schoolService from '@/services/schoolService'

const toast = useToast()

// Reactive data
const searchQuery = ref('')
const selectedFilter = ref('all')
const itemsPerPage = ref(10)
const loading = ref(false)

// Modal state
const showSchoolModal = ref(false)
const selectedSchool = ref<any>(null)
const activeTab = ref('statistics')
const schoolStats = ref<any>(null)
const loadingStats = ref(false)

// Suspend modal state
const showSuspendModal = ref(false)
const schoolToSuspend = ref<any>(null)
const suspensionReason = ref('')

// Delete modal state
const showDeleteModal = ref(false)
const schoolToDelete = ref<any>(null)

// Schools data
const schoolsData = ref<any[]>([])
const paginationMeta = ref({
  countPerPage: 10,
  currentPage: 1,
  totalItems: 0,
  totalPages: 1
})

// Computed statistics
const activeSchoolsCount = computed(() => {
  return schoolsData.value.filter((school: any) => school.status === 'active').length
})

const primarySchoolsCount = computed(() => {
  return schoolsData.value.filter((school: any) => school.type === 'primary').length
})

const nurserySchoolsCount = computed(() => {
  return schoolsData.value.filter((school: any) => school.type === 'nursery').length
})

// Table columns configuration
const columns = ref([
  {
    key: 'schoolName',
    title: 'School Name',
    field: 'name',
    sortable: true,
    filterable: true,
    visible: true,
  },
  {
    key: 'reference',
    title: 'Reference',
    field: 'reference',
    sortable: true,
    filterable: true,
    visible: true,
  },
  {
    key: 'type',
    title: 'Type',
    field: 'type',
    sortable: true,
    filterable: true,
    visible: true,
  },
  {
    key: 'email',
    title: 'Director Email',
    field: 'email',
    sortable: true,
    filterable: true,
    visible: true,
  },
  {
    key: 'directorName',
    title: 'Director Name',
    field: 'directorName',
    sortable: true,
    filterable: true,
    visible: true,
  },
  {
    key: 'directorPhone',
    title: 'Director Phone',
    field: 'directorPhone',
    sortable: true,
    filterable: true,
    visible: true,
  },
  {
    key: 'location',
    title: 'Location',
    field: 'location',
    sortable: true,
    filterable: true,
    visible: true,
  },
  {
    key: 'status',
    title: 'Status',
    field: 'status',
    sortable: true,
    filterable: true,
    visible: true,
  },
  {
    key: 'createdAt',
    title: 'Created Date',
    field: 'createdAt',
    sortable: true,
    filterable: false,
    visible: true,
  },
  {
    key: 'actions',
    title: 'Actions',
    field: 'actions',
    sortable: false,
    filterable: false,
    visible: true,
  },
])

// Format date helper
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  } catch {
    return dateString
  }
}

// Format time helper
const formatTime = (dateString: string) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    })
  } catch {
    return ''
  }
}

// Fetch schools from API
const fetchSchools = async () => {
  loading.value = true
  try {
    const params: any = {
      page: 1,
      limit: 1000, // Fetch all for client-side filtering/sorting
      sort: 'desc'
    }
    
    if (selectedFilter.value !== 'all') {
      params.status = selectedFilter.value
    }
    
    const response = await schoolService.getSchools(params)
    // API: GET /api/v1/admin/schools returns { data: [...], message, ok, page, rows_per_page, total_count }
    const rawList = Array.isArray(response?.data) ? response.data : (response?.data?.data ?? [])
    if (rawList.length >= 0) {
      let mappedSchools = (rawList || []).map((school: any) => ({
        id: school.id,
        name: school.name || 'N/A',
        email: school.director?.email || 'N/A',
        location: school.address || 'N/A',
        status: school.status || 'active',
        students: school.total_students ?? school.students ?? 0,
        reference: school.reference || 'N/A',
        type: school.type || 'N/A',
        directorName: school.director?.name || 'N/A',
        directorPhone: school.director?.phone || 'N/A',
        director: school.director,
        createdAt: school.createdAt,
        updatedAt: school.updatedAt,
        logo: school.logo,
        date_formatted: school.createdAt ? formatDate(school.createdAt) : 'N/A',
        time_formatted: school.createdAt ? formatTime(school.createdAt) : ''
      }))

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        mappedSchools = mappedSchools.filter((school: any) =>
          (school.name && school.name.toLowerCase().includes(query)) ||
          (school.email && school.email.toLowerCase().includes(query))
        )
      }

      schoolsData.value = mappedSchools

      const totalCount = response?.total_count ?? response?.data?.total_count ?? mappedSchools.length
      const pageNum = response?.page ?? response?.data?.page ?? 1
      const rowsPerPage = response?.rows_per_page ?? response?.data?.rows_per_page ?? 10
      paginationMeta.value = {
        countPerPage: rowsPerPage,
        currentPage: pageNum,
        totalItems: totalCount,
        totalPages: rowsPerPage ? Math.ceil(totalCount / rowsPerPage) || 1 : 1
      }
    }
  } catch (error: any) {
    console.error('Error fetching schools:', error)
    toast.error(error.response?.data?.message || 'Failed to load schools')
  } finally {
    loading.value = false
  }
}

// Watch for filter changes
watch([selectedFilter], () => {
  fetchSchools()
})

// Watch for search changes (debounced)
let searchTimeout: any = null
watch([searchQuery], () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchSchools()
  }, 300)
})

// Row click handler
const onRowClick = (row: any) => {
  viewSchool(row)
}


// Methods

const viewSchool = async (school: any) => {
  try {
    if (school.id) {
      const response = await schoolService.getSchoolById(school.id)
      if (response.data) {
        selectedSchool.value = {
          ...school,
          ...response.data
        }
      } else {
        selectedSchool.value = school
      }
    } else {
      selectedSchool.value = school
    }
    showSchoolModal.value = true
    schoolStats.value = null
    if (selectedSchool.value?.id) {
      loadingStats.value = true
      try {
        const statsRes = await schoolService.getSchoolStats(selectedSchool.value.id)
        if (statsRes?.data) schoolStats.value = statsRes.data
      } catch (e) {
        console.error('Error fetching school stats:', e)
      } finally {
        loadingStats.value = false
      }
    }
  } catch (error: any) {
    console.error('Error fetching school details:', error)
    selectedSchool.value = school
    showSchoolModal.value = true
  }
}

const closeSchoolModal = () => {
  showSchoolModal.value = false
  selectedSchool.value = null
  schoolStats.value = null
  activeTab.value = 'statistics'
}

// Helpers for stats display
const formatCurrency = (n: number) => {
  if (n >= 1e6) return `N${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `N${(n / 1e3).toFixed(0)}K`
  return `N${Number(n).toLocaleString()}`
}
const formatChange = (v: number | undefined) => {
  if (v == null) return '—'
  const s = v >= 0 ? `+${v}%` : `${v}%`
  return v >= 0 ? `↑${s}` : `↓${s}`
}
const trendClass = (trend: string | undefined) => {
  const t = (trend || '').toLowerCase()
  if (t === 'up' || t === 'rising') return 'text-green-600'
  if (t === 'down' || t === 'falling') return 'text-red-600'
  return 'text-gray-500'
}
const changeClass = (v: number | undefined) => {
  if (v == null) return 'text-gray-500'
  return v >= 0 ? 'text-green-600' : 'text-red-600'
}

const suspendSchool = (school: any) => {
  schoolToSuspend.value = school
  showSuspendModal.value = true
}

const closeSuspendModal = () => {
  showSuspendModal.value = false
  schoolToSuspend.value = null
  suspensionReason.value = ''
}

const confirmSuspendSchool = async () => {
  if (!suspensionReason.value.trim()) {
    toast.warning('Please provide a suspension reason.')
    return
  }

  if (!schoolToSuspend.value?.id) {
    toast.error('Invalid school data')
    return
  }

  try {
    loading.value = true
    await schoolService.updateSchool({
      id: schoolToSuspend.value.id,
      status: 'suspended'
    })
    toast.success('School suspended successfully')
    await fetchSchools()
    closeSuspendModal()
  } catch (error: any) {
    console.error('Error suspending school:', error)
    toast.error(error.response?.data?.message || 'Failed to suspend school')
  } finally {
    loading.value = false
  }
}

const updateSchool = async () => {
  if (!selectedSchool.value?.id) {
    toast.warning('No school selected')
    return
  }
  
  try {
    const updateData: any = {
      id: selectedSchool.value.id
    }
    
    if (selectedSchool.value.name) updateData.name = selectedSchool.value.name
    if (selectedSchool.value.email) updateData.email = selectedSchool.value.email
    if (selectedSchool.value.phone) updateData.phone = selectedSchool.value.phone
    if (selectedSchool.value.address || selectedSchool.value.location) {
      updateData.address = selectedSchool.value.address || selectedSchool.value.location
    }
    if (selectedSchool.value.type) updateData.type = selectedSchool.value.type
    if (selectedSchool.value.status) updateData.status = selectedSchool.value.status
    if (selectedSchool.value.director_name) updateData.director_name = selectedSchool.value.director_name
    
    await schoolService.updateSchool(updateData)
    toast.success('School updated successfully')
    await fetchSchools()
    closeSchoolModal()
  } catch (error: any) {
    console.error('Error updating school:', error)
    toast.error(error.response?.data?.message || 'Failed to update school')
  }
}

const deleteSchool = (school: any) => {
  if (!school) {
    toast.error('Invalid school data')
    return
  }
  schoolToDelete.value = school
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  schoolToDelete.value = null
}

const confirmDeleteSchool = async () => {
  if (!schoolToDelete.value?.id) {
    toast.error('Invalid school data')
    return
  }

  try {
    loading.value = true
    // Use update endpoint to set status to 'deleted' or 'inactive'
    // If there's a delete endpoint, use that instead
    await schoolService.updateSchool({
      id: schoolToDelete.value.id,
      status: 'deleted'
    })
    toast.success('School deleted successfully')
    await fetchSchools()
    closeDeleteModal()
  } catch (error: any) {
    console.error('Error deleting school:', error)
    toast.error(error.response?.data?.message || 'Failed to delete school')
  } finally {
    loading.value = false
  }
}

const getStatusClass = (status: string | undefined) => {
  if (!status) {
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'suspended':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getTypeClass = (type: string | undefined) => {
  if (!type) {
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  switch (type.toLowerCase()) {
    case 'primary':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'nursery':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Lifecycle
onMounted(() => {
  fetchSchools()
})
</script>

<style scoped>
/* Custom styles for the datatable */
:deep(.bh-table-compact) {
  border-collapse: separate;
  border-spacing: 0;
}

:deep(.bh-table-compact thead th) {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f9fafb;
}

.dark :deep(.bh-table-compact thead th) {
  background-color: #374151;
}

:deep(.bh-table-compact tbody tr:hover) {
  cursor: pointer;
}

/* Search input styling */
:deep(.bh-datatable-search) {
  margin-bottom: 1rem;
}

:deep(.bh-datatable-search input) {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;
}

:deep(.bh-datatable-search input:focus) {
  outline: none;
  border-color: #9333ea;
  box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.1);
}

.dark :deep(.bh-datatable-search input) {
  background-color: #374151;
  border-color: #4b5563;
  color: #f3f4f6;
}

/* Pagination styling */
:deep(.bh-datatable-pagination) {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

:deep(.bh-datatable-pagination select) {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.dark :deep(.bh-datatable-pagination select) {
  background-color: #374151;
  border-color: #4b5563;
  color: #f3f4f6;
}

:deep(.bh-datatable-pagination button) {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #374151;
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}

:deep(.bh-datatable-pagination button:hover:not(:disabled)) {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

:deep(.bh-datatable-pagination button:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

.dark :deep(.bh-datatable-pagination button) {
  background-color: #374151;
  border-color: #4b5563;
  color: #d1d5db;
}

.dark :deep(.bh-datatable-pagination button:hover:not(:disabled)) {
  background-color: #4b5563;
}
</style>

