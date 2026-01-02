<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Contestants Manager</h1>
        <p class="text-xs text-gray-600">Manage contestant applications and profiles</p>
      </div>
      <div class="flex items-center gap-4">
        <!-- Search Bar -->
        <div class="relative">
          <input type="text" placeholder="Search contestants..." class="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <!-- Filter Button -->
        <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <svg class="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span class="text-xs text-gray-700">Filter</span>
        </button>
      </div>
    </div>

    <!-- Category Filters -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-6">
        <button @click="activeCategory = 'all'" class="pb-2 relative">
          <span class="text-xs font-medium" :class="activeCategory === 'all' ? 'text-gray-900' : 'text-gray-500'">All Contestants (4)</span>
          <div v-if="activeCategory === 'all'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
        </button>
        <button @click="activeCategory = 'female'" class="pb-2 relative">
          <span class="text-xs font-medium" :class="activeCategory === 'female' ? 'text-gray-900' : 'text-gray-500'">Female (23)</span>
          <div v-if="activeCategory === 'female'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
        </button>
        <button @click="activeCategory = 'male'" class="pb-2 relative">
          <span class="text-xs font-medium" :class="activeCategory === 'male' ? 'text-gray-900' : 'text-gray-500'">Male (20)</span>
          <div v-if="activeCategory === 'male'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
        </button>
        <button @click="activeCategory = 'standby'" class="pb-2 relative">
          <span class="text-xs font-medium" :class="activeCategory === 'standby' ? 'text-gray-900' : 'text-gray-500'">Standby (3)</span>
          <div v-if="activeCategory === 'standby'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
        </button>
        <button @click="activeCategory = 'risk'" class="pb-2 relative">
          <span class="text-xs font-medium" :class="activeCategory === 'risk' ? 'text-gray-900' : 'text-gray-500'">Eviction Risk (2)</span>
          <div v-if="activeCategory === 'risk'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
        </button>
      </div>
      <button @click="showMoveModal = true" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg">
        Move to Next Round
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <!-- Total Card -->
      <div class="bg-white border border-gray-200 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center ml-auto">
            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg class="w-3 h-3 text-purple-600 -ml-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <h4 class="text-xs text-gray-600 mb-1">Total</h4>
        <h3 class="text-2xl font-bold text-gray-900">127</h3>
      </div>

      <!-- Male Contestants Card -->
      <div class="bg-white border border-gray-200 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center ml-auto">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <h4 class="text-xs text-gray-600 mb-1">Male Contestants</h4>
        <h3 class="text-2xl font-bold text-green-600">98</h3>
      </div>

      <!-- Female Contestants Card -->
      <div class="bg-white border border-gray-200 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center ml-auto">
            <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
        </div>
        <h4 class="text-xs text-gray-600 mb-1">Female Contestants</h4>
        <h3 class="text-2xl font-bold text-yellow-500">12</h3>
      </div>

      <!-- At Risk Card -->
      <div class="bg-white border border-gray-200 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center ml-auto">
            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h4 class="text-xs text-gray-600 mb-1">At Risk</h4>
        <h3 class="text-2xl font-bold text-red-600">3</h3>
      </div>
    </div>

    <!-- Contestant List -->
    <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div class="space-y-4">
        <!-- Male Tab Content -->
        <template v-if="activeCategory === 'male'">
          <!-- Contestant 1: Sarah Johnson -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                SJ
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">Sarah Johnson</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Singing</span>
                  <span class="px-2 py-0.5 bg-gray-300 text-gray-900 text-xs font-semibold rounded-full">ROUND 1</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg">
                Vote
              </button>
              <span class="text-xs text-blue-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                +37 Votes
              </span>
              <span class="text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Evict
              </span>
              <div class="relative">
                <button @click="toggleDropdown('sarah')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'sarah'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Contestant 2: Michael Chen -->
          <div class="flex items-center justify-between py-3">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                MC
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">Michael Chen</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Comedy</span>
                  <span class="px-2 py-0.5 bg-gray-300 text-gray-900 text-xs font-semibold rounded-full">ROUND 1</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg">
                Vote
              </button>
              <button class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg">
                At Risk
              </button>
              <span class="text-xs text-blue-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                +30 Votes
              </span>
              <span class="text-xs text-yellow-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Save
              </span>
              <div class="relative">
                <button @click="toggleDropdown('michael1')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'michael1'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Female Tab Content -->
        <template v-if="activeCategory === 'female'">
          <!-- Michael Chen 1 -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                MC
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">Michael Chen</p>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Female</span>
                  <span class="text-xs text-gray-500">Dancing</span>
                  <span class="px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full">ROUND 1</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-blue-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                +37 votes
              </span>
              <span class="text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Evict
              </span>
              <div class="relative">
                <button @click="toggleDropdown('michael-female-1')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'michael-female-1'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Michael Chen 2 -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                MC
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">Michael Chen</p>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Female</span>
                  <span class="text-xs text-gray-500">Dancing</span>
                  <span class="px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full">ROUND 1</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-blue-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                +37 votes
              </span>
              <span class="text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Evict
              </span>
              <div class="relative">
                <button @click="toggleDropdown('michael-female-2')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'michael-female-2'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Michael Chen 3 -->
          <div class="flex items-center justify-between py-3">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                MC
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">Michael Chen</p>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Female</span>
                  <span class="text-xs text-gray-500">Dancing</span>
                  <span class="px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full">ROUND 1</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-blue-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                +37 votes
              </span>
              <span class="text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Evict
              </span>
              <div class="relative">
                <button @click="toggleDropdown('michael-female-3')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'michael-female-3'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- All Tab Content -->
        <template v-if="activeCategory === 'all'">
          <!-- Sarah Johnson -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                SJ
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">Sarah Johnson</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Singing</span>
                  <span class="px-2 py-0.5 bg-gray-300 text-gray-900 text-xs font-semibold rounded-full">ROUND 1</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg">
                Vote
              </button>
              <span class="text-xs text-blue-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                +37 Votes
              </span>
              <span class="text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Evict
              </span>
              <div class="relative">
                <button @click="toggleDropdown('sarah')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'sarah'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Michael Chen (Female) -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                MC
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">Michael Chen</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Dancing</span>
                  <span class="px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Female</span>
                  <span class="px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full">ROUND 1</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-blue-600 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                +37 Votes
              </span>
              <button class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                Evict
              </button>
              <div class="relative">
                <button @click="toggleDropdown('michael-female')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'michael-female'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Michael Chen (At Risk) -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                MC
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">Michael Chen</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Comedy</span>
                  <span class="px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full">Male</span>
                  <span class="px-2 py-0.5 bg-red-600 text-white text-xs font-semibold rounded-full">At Risk</span>
                  <span class="px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full">ROUND 1</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-gray-500">+38 Votes</span>
              <button class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-lg">
                Save
              </button>
              <div class="relative">
                <button @click="toggleDropdown('michael-risk')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'michael-risk'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>

          <!-- David Okonkwo -->
          <div class="flex items-center justify-between py-3">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                DO
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">David Okonkwo</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Singing</span>
                  <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">Standby</span>
                  <span class="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">Approved</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="relative">
                <button @click="toggleDropdown('david')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'david'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Standby Tab Content -->
        <template v-if="activeCategory === 'standby'">
          <!-- David Okonkwo 1 -->
          <div class="flex items-center justify-between py-3 border-b border-gray-100">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold text-xs">
                DO
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">David Okonkwo</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Singing</span>
                  <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">Standby</span>
                  <button @click="showApproveModal = true" class="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">Approve</button>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="relative">
                <button @click="toggleDropdown('david-standby-1')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'david-standby-1'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>

          <!-- David Okonkwo 2 -->
          <div class="flex items-center justify-between py-3">
            <div class="flex items-center gap-4 flex-1">
              <input type="checkbox" class="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500">
              <div class="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold text-xs">
                DO
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-900 mb-0.5">David Okonkwo</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Singing</span>
                  <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">Standby</span>
                  <button @click="showApproveModal = true" class="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">Approve</button>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="relative">
                <button @click="toggleDropdown('david-standby-2')" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="dropdownOpen === 'david-standby-2'" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button @click="handleEdit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</button>
                  <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move</button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Edit Contestant Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">Edit Contestant</h2>
          <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Contestant Selfie -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Contestant Selfie</label>
            <div class="flex items-center gap-4">
              <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Contestant" class="w-full h-full object-cover">
              </div>
            </div>
          </div>

          <!-- Form Fields -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-4">
              <!-- Full Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" v-model="editForm.fullName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Registration Fee -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Registration Fee</label>
                <input type="text" v-model="editForm.registrationFee" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <input type="text" v-model="editForm.gender" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" v-model="editForm.address" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- State -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" v-model="editForm.state" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Talent/Video Link -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Talent/Video Link</label>
                <input type="text" v-model="editForm.talentVideoLink" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Date of Birth -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="text" v-model="editForm.dateOfBirth" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- TikTok Handle -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">TikTok Handle</label>
                <input type="text" v-model="editForm.tikTokHandle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Twitter Handle -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Twitter Handle</label>
                <input type="text" v-model="editForm.twitterHandle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- YouTube Handle -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">YouTube Handle</label>
                <input type="text" v-model="editForm.youTubeHandle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-4">
              <!-- Stage Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Stage Name (if any)</label>
                <input type="text" v-model="editForm.stageName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Number of Votes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Number of Votes</label>
                <input type="text" v-model="editForm.numberOfVotes" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Talent Category -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Talent Category</label>
                <input type="text" v-model="editForm.talentCategory" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Country -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input type="text" v-model="editForm.country" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Local Government -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Local Government</label>
                <input type="text" v-model="editForm.localGovernment" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Talent Performance Video -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Talent Performance Video</label>
                <input type="text" v-model="editForm.talentPerformanceVideo" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Instagram Handle -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Instagram Handle</label>
                <input type="text" v-model="editForm.instagramHandle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Facebook Handle -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Facebook Handle</label>
                <input type="text" v-model="editForm.facebookHandle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>

              <!-- Snapchat Handle -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Snapchat Handle</label>
                <input type="text" v-model="editForm.snapchatHandle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              </div>
            </div>
          </div>

          <!-- Text Areas -->
          <div class="mt-6 space-y-4">
            <!-- About Me -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">About Me</label>
              <textarea v-model="editForm.aboutMe" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>

            <!-- Why are you contesting? -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Why are you contesting?</label>
              <textarea v-model="editForm.whyContesting" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
          <button @click="showEditModal = false" class="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
            Cancel
          </button>
          <button @click="handleSaveContestant" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Add Contestant
          </button>
        </div>
      </div>
    </div>

    <!-- Approve Contestant Modal -->
    <div v-if="showApproveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">Approve Contestant</h2>
          <button @click="showApproveModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-base text-gray-700">Are you sure you want to approve {{ approveContestantName }}? This will allow them to participate in the contest, and start receiving votes.</p>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
          <button @click="showApproveModal = false" class="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
            Cancel
          </button>
          <button @click="handleApproveContestant" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Yes, Approve
          </button>
        </div>
      </div>
    </div>

    <!-- Move Contestants Modal -->
    <div v-if="showMoveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">Move Contestants</h2>
          <button @click="showMoveModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-base text-gray-700 mb-4">You have selected 10 contestants. Choose the round you want them to move to and confirm your action.</p>
          
          <!-- Dropdown -->
          <div class="mb-4 relative">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select targeted round</label>
            <select class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
              <option value="">Select targeted round</option>
              <option value="round2">Round 2</option>
              <option value="round3">Round 3</option>
            </select>
            <svg class="absolute right-3 bottom-2.5 w-5 h-5 pointer-events-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>

          <p class="text-sm text-gray-500 mb-4">Once moved, contestants will no longer appear in the current round.</p>

          <!-- Date Information -->
          <div class="space-y-2">
            <p class="text-sm text-gray-600">Start Date: August 5th</p>
            <p class="text-sm text-gray-600">End Date: August 5th</p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
          <button @click="showMoveModal = false" class="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
            Cancel
          </button>
          <button @click="handleMoveContestants" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Move Contestants
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">Contestants Moved Successfully</h2>
          <button @click="showSuccessModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-base text-gray-700">10 contestants have been moved to Round 2 - Quarter Finals. They will receive a notification with round details and next steps.</p>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
          <button @click="showSuccessModal = false" class="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
            Cancel
          </button>
          <button @click="handleViewRound2" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            View Round 2
          </button>
        </div>
      </div>
    </div>

    <!-- Contestant Growth Metrics Chart -->
    <div class="bg-white border border-gray-200 rounded-xl p-6">
    <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-900 mb-1">Contestant growth Metrics</h2>
        <p class="text-xs text-gray-500">track the growth of contestants</p>
    </div>

      <!-- Chart Container -->
      <div class="relative h-64">
        <svg viewBox="0 0 900 320" preserveAspectRatio="xMidYMid meet" class="w-full h-full">
          <!-- Y-axis labels -->
          <text x="15" y="30" text-anchor="middle" class="text-[10px] fill-gray-600">700</text>
          <text x="15" y="70" text-anchor="middle" class="text-[10px] fill-gray-600">600</text>
          <text x="15" y="110" text-anchor="middle" class="text-[10px] fill-gray-600">500</text>
          <text x="15" y="150" text-anchor="middle" class="text-[10px] fill-gray-600">400</text>
          <text x="15" y="190" text-anchor="middle" class="text-[10px] fill-gray-600">300</text>
          <text x="15" y="230" text-anchor="middle" class="text-[10px] fill-gray-600">200</text>
          <text x="15" y="270" text-anchor="middle" class="text-[10px] fill-gray-600">100</text>
          <text x="15" y="310" text-anchor="middle" class="text-[10px] fill-gray-600">0</text>
          
          <!-- Bars for Jan -->
          <rect x="75" y="160" width="25" height="150" fill="#9333EA" rx="3"></rect>
          <rect x="105" y="95" width="25" height="215" fill="#F97316" rx="3"></rect>
          
          <!-- Bars for Feb -->
          <rect x="175" y="155" width="25" height="155" fill="#9333EA" rx="3"></rect>
          <rect x="205" y="92" width="25" height="218" fill="#F97316" rx="3"></rect>
          
          <!-- Bars for Mar -->
          <rect x="275" y="145" width="25" height="165" fill="#9333EA" rx="3"></rect>
          <rect x="305" y="88" width="25" height="222" fill="#F97316" rx="3"></rect>
          
          <!-- Bars for Apr -->
          <rect x="375" y="138" width="25" height="172" fill="#9333EA" rx="3"></rect>
          <rect x="405" y="85" width="25" height="225" fill="#F97316" rx="3"></rect>
          
          <!-- Bars for May -->
          <rect x="475" y="125" width="25" height="185" fill="#9333EA" rx="3"></rect>
          <rect x="505" y="80" width="25" height="230" fill="#F97316" rx="3"></rect>
          
          <!-- Bars for Jun -->
          <rect x="575" y="115" width="25" height="195" fill="#9333EA" rx="3"></rect>
          <rect x="605" y="75" width="25" height="235" fill="#F97316" rx="3"></rect>
          
          <!-- Bars for Jul -->
          <rect x="675" y="105" width="25" height="205" fill="#9333EA" rx="3"></rect>
          <rect x="705" y="70" width="25" height="240" fill="#F97316" rx="3"></rect>
          
          <!-- X-axis labels -->
          <text x="87" y="300" text-anchor="middle" class="text-[10px] fill-gray-600">Jan</text>
          <text x="187" y="300" text-anchor="middle" class="text-[10px] fill-gray-600">Feb</text>
          <text x="287" y="300" text-anchor="middle" class="text-[10px] fill-gray-600">Mar</text>
          <text x="387" y="300" text-anchor="middle" class="text-[10px] fill-gray-600">Apr</text>
          <text x="487" y="300" text-anchor="middle" class="text-[10px] fill-gray-600">May</text>
          <text x="587" y="300" text-anchor="middle" class="text-[10px] fill-gray-600">Jun</text>
          <text x="687" y="300" text-anchor="middle" class="text-[10px] fill-gray-600">Jul</text>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import votingService from '@/services/votingService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute();
const loading = ref(false);
const activeCategory = ref('all');
const dropdownOpen = ref<string | null>(null);
const showEditModal = ref(false);
const showApproveModal = ref(false);
const approveContestantName = ref('Michael Chen');
const showMoveModal = ref(false);
const showSuccessModal = ref(false);

// Contestants data
const contestants = ref<any[]>([]);
const categories = ref<string[]>([]);
const selectedContestId = ref<string>('');

// Stats
const totalContestants = computed(() => contestants.value.length);
const maleContestants = computed(() => contestants.value.filter(c => c.gender === 'male').length);
const femaleContestants = computed(() => contestants.value.filter(c => c.gender === 'female').length);
const atRiskContestants = computed(() => contestants.value.filter(c => c.status === 'at_risk').length);

// Fetch contestants
const fetchContestants = async (contestId?: string) => {
  loading.value = true;
  try {
    const id = contestId || selectedContestId.value || route.params.contestId as string;
    if (!id) {
      console.warn('No contest ID provided');
      return;
    }
    const response = await votingService.getContestants(id);
    if (response.ok && response.data) {
      contestants.value = Array.isArray(response.data) ? response.data : [];
    } else {
      toast.error(response.message || 'Error fetching contestants');
    }
  } catch (error: any) {
    console.error('Error fetching contestants:', error);
    toast.error(error.response?.data?.message || error.message || 'Error fetching contestants');
  } finally {
    loading.value = false;
  }
};

// Fetch categories
const fetchCategories = async () => {
  try {
    const response = await votingService.getContestantsCategories();
    if (response.ok && response.data) {
      categories.value = Array.isArray(response.data) ? response.data : [];
    }
  } catch (error: any) {
    console.error('Error fetching categories:', error);
  }
};

// Get contestant by ID
const getContestantById = async (contestantId: string) => {
  try {
    const response = await votingService.getContestantById(contestantId);
    if (response.ok && response.data) {
      return response.data;
    } else {
      toast.error(response.message || 'Error fetching contestant');
    }
  } catch (error: any) {
    console.error('Error fetching contestant:', error);
    toast.error(error.response?.data?.message || error.message || 'Error fetching contestant');
  }
};

const editForm = ref({
  fullName: 'Amina Hassan',
  registrationFee: 'N2000',
  gender: 'Female',
  address: '123 Main St, City, State',
  state: 'Lagos',
  talentVideoLink: 'talentperformance.com/amina',
  dateOfBirth: '01/01/1995',
  tikTokHandle: '@aminahassan',
  twitterHandle: '@aminahassan',
  youTubeHandle: '@aminahassan',
  stageName: 'Amina',
  numberOfVotes: '200',
  talentCategory: 'Singing',
  country: 'Nigeria',
  localGovernment: 'Ikeja',
  talentPerformanceVideo: 'talentperformance.com/video',
  instagramHandle: '@aminahassan',
  facebookHandle: '@aminahassan',
  snapchatHandle: '@aminahassan',
  aboutMe: 'Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.',
  whyContesting: 'Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.'
});

const toggleDropdown = (id: string) => {
  dropdownOpen.value = dropdownOpen.value === id ? null : id;
};

const handleEdit = () => {
  showEditModal.value = true;
};

const handleSaveContestant = () => {
  console.log('Saving contestant:', editForm.value);
  showEditModal.value = false;
};

const handleApproveContestant = () => {
  console.log('Approving contestant:', approveContestantName.value);
  showApproveModal.value = false;
};

const handleMoveContestants = () => {
  console.log('Moving contestants');
  showMoveModal.value = false;
  showSuccessModal.value = true;
};

const handleViewRound2 = () => {
  console.log('Viewing Round 2');
  showSuccessModal.value = false;
};

onMounted(() => {
  fetchCategories();
  // If contestId is available in route params, fetch contestants
  if (route.params.contestId) {
    selectedContestId.value = route.params.contestId as string;
    fetchContestants();
  }
});
</script>
