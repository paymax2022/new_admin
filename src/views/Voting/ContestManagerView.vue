<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Contest Manager</h1>
        <p class="text-sm text-gray-600">Create and manage your contests</p>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="flex items-center gap-8 border-b border-gray-200 mb-8">
      <button @click="activeTab = 'overview'" class="pb-3" :class="activeTab === 'overview' ? 'border-b-2 border-gray-900' : ''">
        <span :class="activeTab === 'overview' ? 'text-sm font-semibold text-gray-900' : 'text-sm font-medium text-gray-500'">Contest Overview</span>
      </button>
      <button @click="activeTab = 'create'" class="pb-3" :class="activeTab === 'create' ? 'border-b-2 border-gray-900' : ''">
        <span :class="activeTab === 'create' ? 'text-sm font-semibold text-gray-900' : 'text-sm font-medium text-gray-500'">Create/Edit Contest</span>
      </button>
      <button @click="activeTab = 'settings'" class="pb-3" :class="activeTab === 'settings' ? 'border-b-2 border-gray-900' : ''">
        <span :class="activeTab === 'settings' ? 'text-sm font-semibold text-gray-900' : 'text-sm font-medium text-gray-500'">Contest Settings</span>
      </button>
    </div>

    <!-- Contest Overview Tab -->
    <div v-if="activeTab === 'overview'" class="space-y-6">
      <!-- Contest 1: The Spotlight Season 5 -->
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <!-- Contest Header -->
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-start gap-4">
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-1">The Spotlight Season 5</h2>
              <p class="text-sm text-gray-600">The biggest talent competition of the year</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="showEditModal = true" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span class="text-sm text-gray-700">Edit</span>
            </button>
            <button @click="showCloseModal = true" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="text-sm text-gray-700">Close</span>
            </button>
          </div>
        </div>

        <!-- Status Tags and Profile Icons -->
        <div class="flex items-center gap-3 mb-6">
          <span class="px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">Active</span>
          <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">bootcamps</span>
          <div class="flex -space-x-2 ml-4">
            <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white">P</div>
            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white">
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-5 gap-4">
          <!-- Contestants Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-1">127</h3>
            <p class="text-sm text-gray-600">Contestants</p>
          </div>

          <!-- Total Votes Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-1">45,891</h3>
            <p class="text-sm text-gray-600">Total Votes</p>
          </div>

          <!-- Revenue Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-1">₦234,500</h3>
            <p class="text-sm text-gray-600">Revenue</p>
          </div>

          <!-- Start Date Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-1">2024-01-15</h3>
            <p class="text-sm text-gray-600">Start Date</p>
          </div>

          <!-- End Date Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-1">2024-06-15</h3>
            <p class="text-sm text-gray-600">End Date</p>
          </div>
        </div>
      </div>

      <!-- Contest 2: Future Stars 2024 -->
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <!-- Contest Header -->
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-start gap-4">
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-1">Future Stars 2024</h2>
              <p class="text-sm text-gray-600">Discovering tomorrow's superstars</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="showEditModal = true" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span class="text-sm text-gray-700">Edit</span>
            </button>
            <button @click="showStartModal = true" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-gray-700">Start</span>
            </button>
          </div>
        </div>

        <!-- Status Tags -->
        <div class="flex items-center gap-3 mb-6">
          <span class="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">draft</span>
          <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">pre-qualification</span>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-5 gap-4">
          <!-- Contestants Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-1">0</h3>
            <p class="text-sm text-gray-600">Contestants</p>
          </div>

          <!-- Total Votes Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-1">0</h3>
            <p class="text-sm text-gray-600">Total Votes</p>
          </div>

          <!-- Revenue Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-1">0</h3>
            <p class="text-sm text-gray-600">Revenue</p>
          </div>

          <!-- Start Date Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-1">2024-01-15</h3>
            <p class="text-sm text-gray-600">Start Date</p>
          </div>

          <!-- End Date Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-1">2024-06-15</h3>
            <p class="text-sm text-gray-600">End Date</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Contest Tab -->
    <div v-if="activeTab === 'create'">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Create New Contest</h2>
      <form class="space-y-6">
        <!-- Row 1: Contest Title and Charges & Fees -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Contest Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contest Title</label>
            <input type="text" placeholder="Enter Contest Title" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>

          <!-- Charges & Fees -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Charges & Fees</label>
            <input type="text" placeholder="Enter registration fee" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>
        </div>

        <!-- Row 2: Contest Type and Contest Format -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Contest Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contest Type</label>
            <div class="relative">
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                <option value="">Select Option</option>
              </select>
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- Contest Format -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contest Format</label>
            <div class="relative">
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                <option value="">Select Format</option>
              </select>
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Round Details Section -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-3">Round Details</label>
          <div class="grid grid-cols-3 gap-4">
            <!-- Round Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Round Name</label>
              <input type="text" placeholder="Enter Name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>

            <!-- Start Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <div class="relative">
                <input type="text" placeholder="dd/mm/yyyy" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10">
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <!-- End Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <div class="relative">
                <input type="text" placeholder="dd/mm/yyyy" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10">
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Contest Rules Section -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-2">Contest Rules</label>
          <p class="text-xs text-gray-500 mb-3">Use system rules or create new rules</p>
          <div class="grid grid-cols-2 gap-4">
            <!-- Role Type -->
            <div>
              <div class="flex items-center gap-2 mb-2">
                <label class="block text-sm font-medium text-gray-700">Role Type</label>
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="relative">
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                  <option value="">Select Option</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Number</label>
              <input type="text" placeholder="Enter Number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
          </div>
        </div>

        <!-- Auto Move -->
        <div class="flex items-center justify-between py-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Auto Move</label>
            <p class="text-xs text-gray-500">System move contestants automatically</p>
          </div>
          <button type="button" @click="autoMoveCreate = !autoMoveCreate" class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200" :class="autoMoveCreate ? 'bg-purple-600' : 'bg-gray-300'">
            <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200" :class="autoMoveCreate ? 'translate-x-6' : 'translate-x-1'"></span>
          </button>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea placeholder="Contest description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
        </div>

        <!-- Contest Banner -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Contest banner</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-sm text-gray-600 mb-1">Click to upload banner image or drag and drop</p>
            <p class="text-xs text-gray-500">PNG, JPG, or GIF. Max 10MB</p>
          </div>
        </div>

        <!-- Row 3: Number of Qualifiers and Medical Fee -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Number of Qualifiers -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Number of Qualifiers</label>
            <input type="text" placeholder="e.g., 50" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>

          <!-- Medical Fee -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Medical Fee (N)</label>
            <input type="text" placeholder="e.g., 5000" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>
        </div>

        <!-- Contest Benefits & Rewards -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Contest Benefits & Rewards</label>
          <textarea placeholder="Enter contest benefits and user rewards" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button type="button" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-yellow-400 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow">
            Create Contest
          </button>
        </div>
      </form>
    </div>

    <!-- Contest Settings Tab -->
    <div v-if="activeTab === 'settings'" class="grid grid-cols-2 gap-6">
      <!-- Left Panel: Voting Settings -->
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Voting Settings</h2>
        
        <!-- Enable Free Voting Section -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-1">Enable Free Voting</label>
              <p class="text-xs text-gray-500">Allow users to vote for free</p>
            </div>
            <button type="button" @click="enableFreeVoting = !enableFreeVoting" class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200" :class="enableFreeVoting ? 'bg-gray-600' : 'bg-gray-300'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200" :class="enableFreeVoting ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
          
          <!-- Free Vote Interval -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Free Vote Interval</label>
            <div class="relative">
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                <option value="">Select Interval</option>
              </select>
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Enable Paid Voting Section -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-1">Enable Paid Voting</label>
              <p class="text-xs text-gray-500">Allow users to purchase votes</p>
            </div>
            <button type="button" @click="enablePaidVoting = !enablePaidVoting" class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200" :class="enablePaidVoting ? 'bg-gray-600' : 'bg-gray-300'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200" :class="enablePaidVoting ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
          
          <!-- Vote Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Vote Price (N)</label>
            <input type="text" placeholder="e.g., 100" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          </div>
        </div>
      </div>

      <!-- Right Panel: Contest Leaders -->
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Contest Leaders</h2>
        
        <!-- Add Contest Leader Section -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Add Contest Leader</label>
          <input type="email" placeholder="Enter email address" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4">
          
          <!-- Digital Signature -->
          <label class="block text-sm font-medium text-gray-700 mb-2">Digital Signature</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer mb-4">
            <svg class="w-10 h-10 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-sm text-gray-600 mb-1">Click to upload banner image or drag and drop</p>
            <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
          
          <button type="button" class="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Leader
          </button>
        </div>

        <!-- Current Leaders Section -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Current Leaders</label>
          <div class="space-y-3">
            <div class="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
              <span class="text-sm text-gray-900">admin@spotlight.com</span>
              <button type="button" class="text-gray-400 hover:text-red-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Close Contest Modal -->
  <div v-if="showCloseModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
      <!-- Modal Header -->
      <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900">Close Contest</h2>
        <button @click="showCloseModal = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-6">
        <p class="text-base text-gray-700 text-center">
          Are you sure you want to close 'The Spotlight Season 5'? this will stop all voting and contestant activities.
        </p>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <button @click="showCloseModal = false" class="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
          Cancel
        </button>
        <button @click="showCloseModal = false" class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors border-2 border-red-700">
          Close Contest
        </button>
      </div>
    </div>
  </div>

  <!-- Start Contest Modal -->
  <div v-if="showStartModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
      <!-- Modal Header -->
      <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900">Start Contest</h2>
        <button @click="showStartModal = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-6">
        <p class="text-base text-gray-700 text-center">
          Are you sure you want to start "Future Stars 2024"? This will make the contest live and enable voting.
        </p>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <button @click="showStartModal = false" class="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
          Cancel
        </button>
        <button @click="showStartModal = false" class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
          Start Contest
        </button>
      </div>
    </div>
  </div>

  <!-- Edit Contest Modal -->
  <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
      <!-- Modal Header -->
      <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900">Edit Contest</h2>
        <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto flex-1">
        <form class="space-y-5">
          <!-- Row 1: Contest Title and Contest Phase -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Contest Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contest Title</label>
              <input type="text" placeholder="Enter Contest Title" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>

            <!-- Contest Phase -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contest Phase</label>
              <div class="relative">
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                  <option value="">Select Phase</option>
                  <option value="pre-qualification">Pre-Qualification</option>
                  <option value="bootcamps">Bootcamps</option>
                  <option value="semi-final">Semi-Final</option>
                  <option value="final">Final</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Row 2: Registration Charge and Contest Format -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Registration Charge -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Registration Charge</label>
              <input type="text" placeholder="Enter Amount" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>

            <!-- Contest Format -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contest Format</label>
              <div class="relative">
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                  <option value="">Select Format</option>
                  <option value="talent">Talent</option>
                  <option value="beauty">Beauty</option>
                  <option value="music">Music</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Round Details Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Round Details</h3>
            <div class="grid grid-cols-2 gap-4">
              <!-- Start Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contest Title</label>
                <div class="relative">
                  <input type="text" placeholder="DD/MM/YYYY" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10">
                  <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- End Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contest Phase</label>
                <div class="relative">
                  <input type="text" placeholder="DD/MM/YYYY" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10">
                  <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Contest Rules Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Contest Rules</h3>
            <!-- Rule Type -->
            <div class="mb-3">
              <label class="block text-sm font-medium text-gray-700 mb-2">Rule Type</label>
              <div class="relative">
                <input type="text" placeholder="Only Qualifiers in Physical Activity" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10">
                <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">New contestants specify for next round</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Select Format -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Format</label>
                <div class="relative">
                  <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                    <option value="">Select Format</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Number</label>
                <input type="text" placeholder="Enter Number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>
            </div>
          </div>

          <!-- Auto Move -->
          <div class="flex items-center justify-between py-2">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Auto Move</label>
              <p class="text-xs text-gray-500">System-wise, contestants are moved automatically</p>
            </div>
            <button type="button" @click="autoMove = !autoMove" class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200" :class="autoMove ? 'bg-purple-600' : 'bg-gray-300'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200" :class="autoMove ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea placeholder="Contest description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
          </div>

          <!-- Contest Banner -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contest Banner</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-sm text-gray-600 mb-1">Click to upload banner image or drag and drop</p>
              <p class="text-xs text-gray-500">max 10 MB .jpg or .png</p>
            </div>
          </div>

          <!-- Row 3: Number of Qualifiers and Medical Fee -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Number of Qualifiers -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Number of Qualifiers</label>
              <input type="text" placeholder="e.g., 35" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>

            <!-- Medical Fee -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Medical Fee (N)</label>
              <input type="text" placeholder="e.g., 3338" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
          </div>

          <!-- Contest Benefits & Rewards -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contest Benefits & Rewards</label>
            <textarea placeholder="List contest benefits and rewards" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <button @click="showEditModal = false" class="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
          Cancel
        </button>
        <button @click="showEditModal = false" class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
          Update Contest
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import votingService from '@/services/votingService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const activeTab = ref('overview');
const showEditModal = ref(false);
const showCloseModal = ref(false);
const showStartModal = ref(false);
const autoMove = ref(false);
const autoMoveCreate = ref(false);
const enableFreeVoting = ref(false);
const enablePaidVoting = ref(false);

// Contest data
const contests = ref<any[]>([]);
const selectedContest = ref<any>(null);
const isLoading = ref(false);

// Fetch contests
const fetchContests = async () => {
  isLoading.value = true;
  try {
    const response = await votingService.getContests();
    if (response.ok && response.data) {
      contests.value = Array.isArray(response.data) ? response.data : [];
    } else {
      toast.error(response.message || 'Error fetching contests');
    }
  } catch (error: any) {
    console.error('Error fetching contests:', error);
    toast.error(error.response?.data?.message || error.message || 'Error fetching contests');
  } finally {
    isLoading.value = false;
  }
};

// Close contest
const closeContest = async (contestId: string) => {
  try {
    const response = await votingService.closeContest(contestId);
    if (response.ok) {
      toast.success('Contest closed successfully');
      showCloseModal.value = false;
      await fetchContests();
    } else {
      toast.error(response.message || 'Error closing contest');
    }
  } catch (error: any) {
    console.error('Error closing contest:', error);
    toast.error(error.response?.data?.message || error.message || 'Error closing contest');
  }
};

// Proceed in contest
const proceedInContest = async (contestId: string) => {
  try {
    const response = await votingService.proceedInContest(contestId);
    if (response.ok) {
      toast.success('Contest proceeded successfully');
      showStartModal.value = false;
      await fetchContests();
    } else {
      toast.error(response.message || 'Error proceeding contest');
    }
  } catch (error: any) {
    console.error('Error proceeding contest:', error);
    toast.error(error.response?.data?.message || error.message || 'Error proceeding contest');
  }
};

onMounted(() => {
  fetchContests();
});
</script>

