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
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Schools Directory</h2>
      <p class="text-gray-600 dark:text-gray-400">Showing {{ filteredSchools.length }} schools</p>
    </div>

    <!-- Schools Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">School Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Students</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="school in paginatedSchools" :key="school.id">
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ school.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(school.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ school.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ school.students.toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button @click="viewSchool(school)" class="text-blue-600 hover:text-blue-900">View Details</button>
                <button @click="suspendSchool(school)" class="text-orange-600 hover:text-orange-900">Suspend</button>
                <button @click="deleteSchool(school)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredSchools.length }} entries (filtered from {{ schoolsData.length }} total entries)
          </div>
          <div class="flex items-center space-x-1">
            <button @click="goToPage(1)" class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"><<</button>
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><</button>
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="page !== '...' ? goToPage(page as number) : null"
              :class="page === currentPage ? 'bg-black text-white border-black' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'"
              class="px-3 py-1 text-sm border rounded-md"
              :disabled="page === '...'"
            >
              {{ page }}
            </button>
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">></button>
            <button @click="goToPage(totalPages)" class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">>></button>
          </div>
        </div>
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
              Registered on: 15 Jan 2023
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
              <span class="text-sm text-gray-900">{{ selectedSchool?.location }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">{{ selectedSchool?.email }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">+23480123456</span>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span class="text-sm text-gray-900">Students: {{ selectedSchool?.students.toLocaleString() }}</span>
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

          <!-- Tab Content -->
          <div v-if="activeTab === 'statistics'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600">Total Fee Volume</p>
                    <p class="text-2xl font-bold text-gray-900">N24.5M</p>
                  </div>
                  <div class="text-green-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-green-600 mt-2">+12% from last term</p>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600">Platform Fees</p>
                    <p class="text-2xl font-bold text-gray-900">N367,500</p>
                  </div>
                  <div class="text-green-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-green-600 mt-2">↑1.5% of volume</p>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600">Payment Success Rate</p>
                    <p class="text-2xl font-bold text-gray-900">98.2%</p>
                  </div>
                  <div class="text-green-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-green-600 mt-2">↑+2.15 Improvement</p>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4">
    <div class="flex items-center justify-between">
      <div>
                    <p class="text-sm text-gray-600">Active Parents</p>
                    <p class="text-2xl font-bold text-gray-900">945</p>
                  </div>
                  <div class="text-green-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-green-600 mt-2">↑76% adoption rate</p>
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
              Suspension Reason
            </label>
            <input
              id="suspensionReason"
              v-model="suspensionReason"
              type="text"
              placeholder="Provide a reason for suspension"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4">
            <button @click="closeSuspendModal" class="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button @click="confirmSuspendSchool" class="flex-1 px-4 py-2 text-white bg-orange-600 border border-orange-600 rounded-md hover:bg-orange-700">
              Suspend School
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const selectedFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 5

// Modal state
const showSchoolModal = ref(false)
const selectedSchool = ref<any>(null)
const activeTab = ref('statistics')

// Suspend modal state
const showSuspendModal = ref(false)
const schoolToSuspend = ref<any>(null)
const suspensionReason = ref('')

// Schools data
const schoolsData = ref([
  {
    id: 1,
    name: 'Heritage Grammar School',
    email: 'admin@heritage.edu',
    location: '23 Main Road, Lagos',
    status: 'Active',
    students: 1250
  },
  {
    id: 2,
    name: 'Greenfield Academy',
    email: 'info@greenfield.edu',
    location: '45 Park Avenue, Abuja',
    status: 'Active',
    students: 1250
  },
  {
    id: 3,
    name: 'St. Michael\'s College',
    email: 'admin@stmichael.edu',
    location: '10 Church Street, Port Harcourt',
    status: 'Active',
    students: 1250
  },
  {
    id: 4,
    name: 'Westpoint International',
    email: 'contact@westpoint.edu',
    location: '78 University Road, Kano',
    status: 'Active',
    students: 1250
  },
  {
    id: 5,
    name: 'Horizon Educational Center',
    email: 'admin@horizon.edu',
    location: '34 Coastal Road, Calabar',
    status: 'Active',
    students: 1250
  }
])

// Computed properties
const filteredSchools = computed(() => {
  let filtered = schoolsData.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(school => 
      school.name.toLowerCase().includes(query) || 
      school.email.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(school => 
      school.status.toLowerCase() === selectedFilter.value
    )
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredSchools.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredSchools.value.length))

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

const paginatedSchools = computed(() => {
  const start = startIndex.value
  const end = endIndex.value
  return filteredSchools.value.slice(start, end)
})

// Methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const viewSchool = (school: any) => {
  selectedSchool.value = school
  showSchoolModal.value = true
}

const closeSchoolModal = () => {
  showSchoolModal.value = false
  selectedSchool.value = null
  activeTab.value = 'statistics'
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

const confirmSuspendSchool = () => {
  if (suspensionReason.value) {
    console.log('Suspending school:', schoolToSuspend.value.name, 'Reason:', suspensionReason.value)
    // Implement actual suspension logic
    closeSuspendModal()
  } else {
    alert('Please provide a suspension reason.')
  }
}

const deleteSchool = (school: any) => {
  console.log('Deleting school:', school.name)
  // Implement delete functionality
}

const getStatusClass = (status: string) => {
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

// Lifecycle
onMounted(() => {
  console.log('School Management page mounted')
})
</script>



