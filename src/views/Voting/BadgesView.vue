<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Badge System</h1>
        <p class="text-xs text-gray-600">Manage contestant badges and achievements</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center justify-between mb-6 border-b border-gray-200">
      <div class="flex items-center gap-6">
        <button @click="activeTab = 'all'" class="pb-2 relative">
          <span class="text-sm font-medium" :class="activeTab === 'all' ? 'text-gray-900' : 'text-gray-500'">All Badges</span>
          <div v-if="activeTab === 'all'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
        </button>
        <button @click="activeTab = 'automation'" class="pb-2 relative">
          <span class="text-sm font-medium" :class="activeTab === 'automation' ? 'text-gray-900' : 'text-gray-500'">Automation Rules</span>
          <div v-if="activeTab === 'automation'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
        </button>
        <button @click="activeTab = 'templates'" class="pb-2 relative">
          <span class="text-sm font-medium" :class="activeTab === 'templates' ? 'text-gray-900' : 'text-gray-500'">Templates</span>
          <div v-if="activeTab === 'templates'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
        </button>
      </div>
      <button @click="showCreateBadgeModal = true" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-orange-500">
        Create Badge
      </button>
    </div>

    <!-- All Badges Tab Content -->
    <div v-if="activeTab === 'all'">
      <!-- Badge Cards Grid -->
      <div class="grid grid-cols-4 gap-6">
        <!-- New Entry -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">New Entry</h3>
            <p class="text-xs text-gray-500 text-center mb-4">Your official Spotlight identity</p>
            <div class="flex items-center gap-4 mt-auto">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Request Vote Badge -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Request Vote Badge</h3>
            <p class="text-xs text-gray-500 text-center mb-4">Ask friends to support you</p>
            <div class="flex items-center gap-4 mt-auto">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Nominated for eviction -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Nominated for eviction</h3>
            <p class="text-xs text-gray-500 text-center mb-4">You're at risk this week</p>
            <div class="flex items-center gap-4 mt-auto">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Evicted -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Evicted</h3>
            <p class="text-xs text-gray-500 text-center mb-4">Evicted in Week 4</p>
            <div class="flex items-center gap-4 mt-auto">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Referral Elite -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5026 20.1719C25.5026 21.498 26.0294 22.7697 26.9671 23.7074C27.9048 24.6451 29.1765 25.1719 30.5026 25.1719C31.8287 25.1719 33.1005 24.6451 34.0382 23.7074C34.9758 22.7697 35.5026 21.498 35.5026 20.1719C35.5026 18.8458 34.9758 17.574 34.0382 16.6363C33.1005 15.6987 31.8287 15.1719 30.5026 15.1719C29.1765 15.1719 27.9048 15.6987 26.9671 16.6363C26.0294 17.574 25.5026 18.8458 25.5026 20.1719ZM17.8993 33.3419C17.3181 33.6635 16.8068 34.0978 16.3953 34.6192C15.9837 35.1407 15.6803 35.739 15.5026 36.379C15.3248 37.0191 15.2765 37.6882 15.3602 38.3471C15.444 39.0061 15.6582 39.6418 15.9904 40.2171C16.3226 40.7923 16.7661 41.2956 17.295 41.6975C17.8239 42.0995 18.4276 42.392 19.0708 42.558C19.714 42.724 20.3838 42.7602 21.0412 42.6644C21.6985 42.5686 22.3302 42.3428 22.8993 42.0002C24.0383 41.3325 24.867 40.2413 25.2045 38.9648C25.542 37.6883 25.3608 36.3302 24.7007 35.1867C24.0405 34.0433 22.9548 33.2074 21.6806 32.8615C20.4064 32.5155 19.0471 32.6876 17.8993 33.3402V33.3419ZM43.106 33.3419C43.6862 33.6638 44.1965 34.098 44.6071 34.6192C45.0178 35.1403 45.3206 35.7381 45.4978 36.3775C45.6751 37.0169 45.7232 37.6852 45.6395 38.3435C45.5557 39.0017 45.3418 39.6366 45.0101 40.2113C44.6784 40.786 44.2355 41.2889 43.7075 41.6906C43.1794 42.0924 42.5766 42.3849 41.9343 42.5513C41.2919 42.7177 40.6229 42.7545 39.9662 42.6596C39.3095 42.5647 38.6782 42.34 38.1093 41.9985C36.9852 41.324 36.1711 40.2349 35.8424 38.9658C35.5137 37.6967 35.6968 36.3493 36.3521 35.2139C37.0075 34.0785 38.0827 33.2461 39.346 32.8959C40.6093 32.5457 41.9596 32.7059 43.106 33.3419Z" fill="white" stroke="white" stroke-width="2"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.6165 21.2397C25.4739 20.59 25.4623 19.9184 25.5825 19.2641C25.7027 18.6099 25.9522 17.9863 26.3165 17.4297C22.6002 18.509 19.4449 20.9828 17.5099 24.3341C15.5749 27.6854 15.0099 31.6549 15.9332 35.413C16.2332 34.8195 16.6487 34.2918 17.1552 33.8608C17.6618 33.4298 18.2492 33.1042 18.8832 32.903C18.6623 30.5014 19.1912 28.0904 20.397 26.0017C21.6028 23.913 23.4263 22.2494 25.6165 21.2397ZM35.3832 21.2397C37.5734 22.2494 39.3968 23.913 40.6027 26.0017C41.8085 28.0904 42.3373 30.5014 42.1165 32.903C42.7506 33.1044 43.3381 33.4302 43.8447 33.8615C44.3512 34.2928 44.7666 34.8208 45.0665 35.4147C45.9897 31.6566 45.4248 27.6871 43.4898 24.3358C41.5548 20.9845 38.3994 18.5107 34.6832 17.4314C35.0472 17.9877 35.2966 18.6111 35.4168 19.265C35.537 19.9189 35.5255 20.5902 35.3832 21.2397ZM40.8832 42.6597C40.219 42.697 39.5541 42.6013 38.9273 42.3784C38.3006 42.1555 37.7246 41.8097 37.2332 41.3614C35.2637 42.7532 32.9114 43.5005 30.4998 43.5005C28.0882 43.5005 25.7359 42.7532 23.7665 41.3614C23.2752 41.81 22.6993 42.1561 22.0725 42.3793C21.4458 42.6025 20.7808 42.6984 20.1165 42.6614C22.9095 45.3403 26.6298 46.8361 30.4998 46.8361C34.3699 46.8361 38.0902 45.3386 40.8832 42.6597Z" fill="white"/>
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Referral Elite</h3>
            <p class="text-xs text-gray-500 text-center mb-4">Top 10 referrer</p>
            <div class="flex items-center gap-4 mt-auto">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Standby Contestant -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1641 16H43.8307" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.6641 16V19.384C19.6641 21.4538 20.6254 23.4062 22.266 24.6681L30.4974 31L38.7287 24.6681C40.3694 23.4062 41.3307 21.4538 41.3307 19.384V16" fill="white"/>
                <path d="M19.6641 16V19.384C19.6641 21.4538 20.6254 23.4062 22.266 24.6681L30.4974 31L38.7287 24.6681C40.3694 23.4062 41.3307 21.4538 41.3307 19.384V16" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.6641 46V42.616C19.6641 40.5462 20.6254 38.5938 22.266 37.3318L30.4974 31L38.7287 37.3318C40.3694 38.5938 41.3307 40.5462 41.3307 42.616V46" fill="white"/>
                <path d="M19.6641 46V42.616C19.6641 40.5462 20.6254 38.5938 22.266 37.3318L30.4974 31L38.7287 37.3318C40.3694 38.5938 41.3307 40.5462 41.3307 42.616V46" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.1641 46H43.8307" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Standby Contestant</h3>
            <p class="text-xs text-gray-500 text-center mb-4">Eligible to replace evicted contestant</p>
            <div class="flex items-center gap-4 mt-auto">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Automation Rules Tab Content -->
    <div v-if="activeTab === 'automation'">
      <!-- Badge Automation Rules Section -->
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Badge Automation Rules
        </h2>
        
        <!-- Auto-assign Profile Badge -->
        <div class="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-1">Auto-assign Profile Badge</h3>
            <p class="text-xs text-gray-500">Automatically assign on registration</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="autoAssignProfileBadge" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Templates Tab Content -->
    <div v-if="activeTab === 'templates'">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-bold text-gray-900">Badge Templates</h2>
          <p class="text-xs text-gray-500">Pre-designed badge templates for your contests</p>
        </div>
        <button @click="showCreateTemplateModal = true" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-orange-500 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Template
        </button>
      </div>

      <!-- Badge Templates Grid -->
      <div class="grid grid-cols-3 gap-6">
        <!-- New Entry Template -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
          <span class="absolute top-4 left-4 px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Active</span>
          <button @click="showSettingsModal = true" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="flex flex-col items-center mt-8">
            <div class="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">New Entry</h3>
            <p class="text-xs text-gray-500 text-center mb-6">Your official Spotlight identity</p>
            <div class="flex items-center gap-3 w-full">
              <button @click="showExportModal = true" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button @click="showEditBadgeModal = true" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Request Vote Badge Template -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
          <span class="absolute top-4 left-4 px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Active</span>
          <button @click="showSettingsModal = true" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="flex flex-col items-center mt-8">
            <div class="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Request Vote Badge</h3>
            <p class="text-xs text-gray-500 text-center mb-6">Ask friends to support you</p>
            <div class="flex items-center gap-3 w-full">
              <button @click="showExportModal = true" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button @click="showEditBadgeModal = true" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Nominated for eviction Template -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
          <span class="absolute top-4 left-4 px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Active</span>
          <button @click="showSettingsModal = true" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="flex flex-col items-center mt-8">
            <div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Nominated for eviction</h3>
            <p class="text-xs text-gray-500 text-center mb-6">You're at risk this week</p>
            <div class="flex items-center gap-3 w-full">
              <button @click="showExportModal = true" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button @click="showEditBadgeModal = true" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Evicted Template -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
          <span class="absolute top-4 left-4 px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Active</span>
          <button @click="showSettingsModal = true" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="flex flex-col items-center mt-8">
            <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Evicted</h3>
            <p class="text-xs text-gray-500 text-center mb-6">Evicted in Week 4</p>
            <div class="flex items-center gap-3 w-full">
              <button @click="showExportModal = true" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button @click="showEditBadgeModal = true" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Referral Elite Template -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
          <span class="absolute top-4 left-4 px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Active</span>
          <button @click="showSettingsModal = true" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="flex flex-col items-center mt-8">
            <div class="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-white" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5026 20.1719C25.5026 21.498 26.0294 22.7697 26.9671 23.7074C27.9048 24.6451 29.1765 25.1719 30.5026 25.1719C31.8287 25.1719 33.1005 24.6451 34.0382 23.7074C34.9758 22.7697 35.5026 21.498 35.5026 20.1719C35.5026 18.8458 34.9758 17.574 34.0382 16.6363C33.1005 15.6987 31.8287 15.1719 30.5026 15.1719C29.1765 15.1719 27.9048 15.6987 26.9671 16.6363C26.0294 17.574 25.5026 18.8458 25.5026 20.1719ZM17.8993 33.3419C17.3181 33.6635 16.8068 34.0978 16.3953 34.6192C15.9837 35.1407 15.6803 35.739 15.5026 36.379C15.3248 37.0191 15.2765 37.6882 15.3602 38.3471C15.444 39.0061 15.6582 39.6418 15.9904 40.2171C16.3226 40.7923 16.7661 41.2956 17.295 41.6975C17.8239 42.0995 18.4276 42.392 19.0708 42.558C19.714 42.724 20.3838 42.7602 21.0412 42.6644C21.6985 42.5686 22.3302 42.3428 22.8993 42.0002C24.0383 41.3325 24.867 40.2413 25.2045 38.9648C25.542 37.6883 25.3608 36.3302 24.7007 35.1867C24.0405 34.0433 22.9548 33.2074 21.6806 32.8615C20.4064 32.5155 19.0471 32.6876 17.8993 33.3402V33.3419ZM43.106 33.3419C43.6862 33.6638 44.1965 34.098 44.6071 34.6192C45.0178 35.1403 45.3206 35.7381 45.4978 36.3775C45.6751 37.0169 45.7232 37.6852 45.6395 38.3435C45.5557 39.0017 45.3418 39.6366 45.0101 40.2113C44.6784 40.786 44.2355 41.2889 43.7075 41.6906C43.1794 42.0924 42.5766 42.3849 41.9343 42.5513C41.2919 42.7177 40.6229 42.7545 39.9662 42.6596C39.3095 42.5647 38.6782 42.34 38.1093 41.9985C36.9852 41.324 36.1711 40.2349 35.8424 38.9658C35.5137 37.6967 35.6968 36.3493 36.3521 35.2139C37.0075 34.0785 38.0827 33.2461 39.346 32.8959C40.6093 32.5457 41.9596 32.7059 43.106 33.3419Z" fill="white" stroke="white" stroke-width="2"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.6165 21.2397C25.4739 20.59 25.4623 19.9184 25.5825 19.2641C25.7027 18.6099 25.9522 17.9863 26.3165 17.4297C22.6002 18.509 19.4449 20.9828 17.5099 24.3341C15.5749 27.6854 15.0099 31.6549 15.9332 35.413C16.2332 34.8195 16.6487 34.2918 17.1552 33.8608C17.6618 33.4298 18.2492 33.1042 18.8832 32.903C18.6623 30.5014 19.1912 28.0904 20.397 26.0017C21.6028 23.913 23.4263 22.2494 25.6165 21.2397ZM35.3832 21.2397C37.5734 22.2494 39.3968 23.913 40.6027 26.0017C41.8085 28.0904 42.3373 30.5014 42.1165 32.903C42.7506 33.1044 43.3381 33.4302 43.8447 33.8615C44.3512 34.2928 44.7666 34.8208 45.0665 35.4147C45.9897 31.6566 45.4248 27.6871 43.4898 24.3358C41.5548 20.9845 38.3994 18.5107 34.6832 17.4314C35.0472 17.9877 35.2966 18.6111 35.4168 19.265C35.537 19.9189 35.5255 20.5902 35.3832 21.2397ZM40.8832 42.6597C40.219 42.697 39.5541 42.6013 38.9273 42.3784C38.3006 42.1555 37.7246 41.8097 37.2332 41.3614C35.2637 42.7532 32.9114 43.5005 30.4998 43.5005C28.0882 43.5005 25.7359 42.7532 23.7665 41.3614C23.2752 41.81 22.6993 42.1561 22.0725 42.3793C21.4458 42.6025 20.7808 42.6984 20.1165 42.6614C22.9095 45.3403 26.6298 46.8361 30.4998 46.8361C34.3699 46.8361 38.0902 45.3386 40.8832 42.6597Z" fill="white"/>
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Referral Elite</h3>
            <p class="text-xs text-gray-500 text-center mb-6">Top 10 referrer</p>
            <div class="flex items-center gap-3 w-full">
              <button @click="showExportModal = true" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button @click="showEditBadgeModal = true" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Standby Contestant Template -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
          <span class="absolute top-4 left-4 px-2 py-0.5 bg-yellow-400 text-black text-xs font-semibold rounded-full">Active</span>
          <button @click="showSettingsModal = true" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="flex flex-col items-center mt-8">
            <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-white" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1641 16H43.8307" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.6641 16V19.384C19.6641 21.4538 20.6254 23.4062 22.266 24.6681L30.4974 31L38.7287 24.6681C40.3694 23.4062 41.3307 21.4538 41.3307 19.384V16" fill="white"/>
                <path d="M19.6641 16V19.384C19.6641 21.4538 20.6254 23.4062 22.266 24.6681L30.4974 31L38.7287 24.6681C40.3694 23.4062 41.3307 21.4538 41.3307 19.384V16" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.6641 46V42.616C19.6641 40.5462 20.6254 38.5938 22.266 37.3318L30.4974 31L38.7287 37.3318C40.3694 38.5938 41.3307 40.5462 41.3307 42.616V46" fill="white"/>
                <path d="M19.6641 46V42.616C19.6641 40.5462 20.6254 38.5938 22.266 37.3318L30.4974 31L38.7287 37.3318C40.3694 38.5938 41.3307 40.5462 41.3307 42.616V46" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.1641 46H43.8307" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">Standby Contestant</h3>
            <p class="text-xs text-gray-500 text-center mb-6">Eligible to replace evicted contestant</p>
            <div class="flex items-center gap-3 w-full">
              <button @click="showExportModal = true" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button @click="showEditBadgeModal = true" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Badge Modal -->
    <div v-if="showCreateBadgeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Create New Badge</h2>
          <button @click="showCreateBadgeModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Badge Preview -->
          <div class="text-center pb-6 border-b border-gray-200">
            <h3 class="text-sm font-semibold text-gray-900 mb-1">Badge Preview</h3>
            <p class="text-xs text-gray-500 mb-4">Live preview of your badge</p>
            <div class="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          <!-- Badge Details -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-900">Badge Details</h3>
            
            <!-- Badge Name -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Badge Name</label>
              <input type="text" placeholder="Enter badge name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
            </div>

            <!-- Category -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Category</label>
              <div class="relative">
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none bg-white">
                  <option>Contestant</option>
                  <option>Achievement</option>
                  <option>Special Event</option>
                </select>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Description</label>
              <textarea placeholder="Describe what this badge represents" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"></textarea>
            </div>
          </div>

          <!-- Icon and Color Theme -->
          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <!-- Icon -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Icon</label>
              <div class="relative">
                <select v-model="selectedIcon" class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none bg-white">
                  <option value="star">Star</option>
                  <option value="thumbs">Thumbs</option>
                  <option value="cancel">cancel</option>
                  <option value="hourglass">hourglass</option>
                  <option value="share">Share</option>
                </select>
                <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg v-if="selectedIcon === 'star'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <svg v-else-if="selectedIcon === 'thumbs'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <svg v-else-if="selectedIcon === 'cancel'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <svg v-else-if="selectedIcon === 'hourglass'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else-if="selectedIcon === 'share'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Color Theme -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Color Theme</label>
              <div class="relative">
                <select v-model="selectedColor" class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none bg-white">
                  <option value="blue">Primary Blue</option>
                  <option value="green">Success Green</option>
                  <option value="yellow">Warning Yellow</option>
                  <option value="purple">Royal Purple</option>
                </select>
                <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <div v-if="selectedColor === 'blue'" class="w-3 h-3 rounded-full bg-blue-600"></div>
                  <div v-else-if="selectedColor === 'green'" class="w-3 h-3 rounded-full bg-green-600"></div>
                  <div v-else-if="selectedColor === 'yellow'" class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div v-else-if="selectedColor === 'purple'" class="w-3 h-3 rounded-full bg-purple-600"></div>
                </div>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Automation Settings -->
          <div class="pt-4 border-t border-gray-200">
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Automation Settings</h3>
            
            <!-- Auto-assign on registration -->
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <div class="flex-1">
                <p class="text-sm text-gray-700">Auto-assign on registration</p>
                <p class="text-xs text-gray-500">Automatically give this badge to new contestants</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="autoAssignOnRegistration" @change="autoAssignOnRegistration = !autoAssignOnRegistration" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- Achievement trigger -->
            <div class="flex items-center justify-between py-3">
              <div class="flex-1">
                <p class="text-sm text-gray-700">Achievement trigger</p>
                <p class="text-xs text-gray-500">Award based on specific achievements</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="achievementTrigger" @change="achievementTrigger = !achievementTrigger" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="showCreateBadgeModal = false" class="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Create Badge
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Badge Template Modal -->
    <div v-if="showEditBadgeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Edit Badge Template</h2>
          <button @click="showEditBadgeModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Badge Preview -->
          <div class="text-center pb-6 border-b border-gray-200">
            <h3 class="text-sm font-semibold text-gray-900 mb-1">Badge Preview</h3>
            <p class="text-xs text-gray-500 mb-4">Live preview of your badge</p>
            <div class="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          <!-- Badge Details -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-900">Badge Details</h3>
            
            <!-- Badge Name -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Badge Name</label>
              <input type="text" placeholder="Enter badge name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Description</label>
              <textarea placeholder="Describe what this badge represents" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"></textarea>
            </div>

            <!-- Category -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Category</label>
              <div class="relative">
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none bg-white">
                  <option>Select category</option>
                  <option>Contestant</option>
                  <option>Achievement</option>
                  <option>Special Event</option>
                </select>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Icon and Color Theme -->
          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <!-- Icon -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Icon</label>
              <div class="relative">
                <select v-model="editSelectedIcon" class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none bg-white">
                  <option value="">Select icon</option>
                  <option value="star">Star</option>
                  <option value="thumbs">Thumbs</option>
                  <option value="cancel">cancel</option>
                  <option value="hourglass">hourglass</option>
                  <option value="share">Share</option>
                </select>
                <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg v-if="editSelectedIcon === 'star'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <svg v-else-if="editSelectedIcon === 'thumbs'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <svg v-else-if="editSelectedIcon === 'cancel'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <svg v-else-if="editSelectedIcon === 'hourglass'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else-if="editSelectedIcon === 'share'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Color Theme -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">Color Theme</label>
              <div class="relative">
                <select v-model="editSelectedColor" class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none bg-white">
                  <option value="">Select category</option>
                  <option value="blue">Primary Blue</option>
                  <option value="green">Success Green</option>
                  <option value="yellow">Warning Yellow</option>
                  <option value="purple">Royal Purple</option>
                </select>
                <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <div v-if="editSelectedColor === 'blue'" class="w-3 h-3 rounded-full bg-blue-600"></div>
                  <div v-else-if="editSelectedColor === 'green'" class="w-3 h-3 rounded-full bg-green-600"></div>
                  <div v-else-if="editSelectedColor === 'yellow'" class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div v-else-if="editSelectedColor === 'purple'" class="w-3 h-3 rounded-full bg-purple-600"></div>
                </div>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="showEditBadgeModal = false" class="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Export Badge Template Modal -->
    <div v-if="showExportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Export Badge Template</h2>
          <button @click="showExportModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-sm text-gray-600 mb-6">Export this badge template for use in other contests or as a backup.</p>
          
          <!-- Export Options -->
          <div class="flex flex-col gap-3">
            <button class="w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download SVG
            </button>
            <button class="w-full px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create New Badge Template Modal -->
    <div v-if="showCreateTemplateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 class="text-2xl font-bold text-gray-900">Create New Badge Template</h2>
          <button @click="showCreateTemplateModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <div class="grid grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="space-y-4">
              <!-- Badge Name -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Badge Name</label>
                <input v-model="templateBadgeName" type="text" placeholder="Enter badge name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Description</label>
                <textarea v-model="templateDescription" rows="3" placeholder="Describe what this badge represents" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
              </div>

              <!-- Icon Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-900 mb-2">Icon</label>
                <div class="relative">
                  <!-- Selected Icon Display -->
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg v-if="templateSelectedIcon === 'star'" class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg v-if="templateSelectedIcon === 'thumbs'" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <svg v-if="templateSelectedIcon === 'cancel'" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <svg v-if="templateSelectedIcon === 'hourglass'" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-if="templateSelectedIcon === 'share'" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <select v-model="templateSelectedIcon" class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                    <option value="star">Star</option>
                    <option value="thumbs">Thumbs</option>
                    <option value="cancel">Cancel</option>
                    <option value="hourglass">Hourglass</option>
                    <option value="share">Share</option>
                  </select>
                  <!-- Dropdown Chevron -->
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-4">
              <!-- Category Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-900 mb-2">Category</label>
                <select v-model="templateCategory" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                  <option value="contestant">Contestant</option>
                  <option value="achievement">Achievement</option>
                  <option value="special-event">Special Event</option>
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Color Theme Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-900 mb-2">Color Theme</label>
                <div class="relative">
                  <!-- Selected Color Display -->
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div v-if="templateSelectedColor === 'blue'" class="w-3 h-3 rounded-full bg-blue-600"></div>
                    <div v-if="templateSelectedColor === 'green'" class="w-3 h-3 rounded-full bg-green-600"></div>
                    <div v-if="templateSelectedColor === 'yellow'" class="w-3 h-3 rounded-full bg-orange-600"></div>
                    <div v-if="templateSelectedColor === 'purple'" class="w-3 h-3 rounded-full bg-purple-600"></div>
                  </div>
                  <select v-model="templateSelectedColor" class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                    <option value="blue">Primary Blue</option>
                    <option value="green">Success Green</option>
                    <option value="yellow">Warning Yellow</option>
                    <option value="purple">Royal Purple</option>
                  </select>
                  <!-- Dropdown Chevron -->
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Template Preview -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Template Preview</h3>
            <div class="text-center">
              <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <div :class="getColorClass(templateSelectedColor)" class="w-28 h-28 rounded-full flex items-center justify-center">
                  <svg v-if="templateSelectedIcon === 'star'" class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg v-if="templateSelectedIcon === 'thumbs'" class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <svg v-if="templateSelectedIcon === 'cancel'" class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <svg v-if="templateSelectedIcon === 'hourglass'" class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-if="templateSelectedIcon === 'share'" class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
              </div>
              <p class="text-sm text-gray-500 mt-4">Your template will appear here</p>
            </div>
          </div>

          <!-- Template Settings -->
          <div class="mt-8 pt-6 border-t border-gray-200 space-y-4">
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Make template public</p>
                <p class="text-xs text-gray-500">Other admins can see this template</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="templatePublic" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between py-3">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Auto-assign on creation</p>
                <p class="text-xs text-gray-500">Automatically assign to new contestants</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="templateAutoAssign" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <button @click="showCreateTemplateModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="createTemplate" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Create Template
          </button>
        </div>
      </div>
    </div>

    <!-- Badge Template Settings Modal -->
    <div v-if="showSettingsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Badge Template Settings</h2>
          <button @click="showSettingsModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <!-- Badge Preview -->
          <div class="text-center mb-8">
            <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Profile Badge</h3>
          </div>

          <!-- Settings -->
          <div class="space-y-4">
            <!-- Template Status -->
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Template Status</p>
                <p class="text-xs text-gray-500">Enable or disable this template</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="templateStatus" @change="templateStatus = !templateStatus" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- Auto-assign to new contestants -->
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Auto-assign to new contestants</p>
                <p class="text-xs text-gray-500">Automatically assign when users register</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="autoAssignNewContestants" @change="autoAssignNewContestants = !autoAssignNewContestants" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- Show in public gallery -->
            <div class="flex items-center justify-between py-3">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Show in public gallery</p>
                <p class="text-xs text-gray-500">Display in contestant badge gallery</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="showInPublicGallery" @change="showInPublicGallery = !showInPublicGallery" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-between p-6 border-t border-gray-200">
          <button class="px-4 py-2 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-50 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
          <button @click="showSettingsModal = false" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Template
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('all');
const autoAssignProfileBadge = ref(false);
const showCreateBadgeModal = ref(false);
const autoAssignOnRegistration = ref(false);
const achievementTrigger = ref(false);
const selectedIcon = ref('star');
const selectedColor = ref('green');
const showEditBadgeModal = ref(false);
const editSelectedIcon = ref('star');
const editSelectedColor = ref('green');
const showExportModal = ref(false);
const showSettingsModal = ref(false);
const templateStatus = ref(true);
const autoAssignNewContestants = ref(true);
const showInPublicGallery = ref(true);

// Create Template Modal
const showCreateTemplateModal = ref(false);
const templateBadgeName = ref('');
const templateDescription = ref('');
const templateSelectedIcon = ref('star');
const templateCategory = ref('contestant');
const templateSelectedColor = ref('green');
const templatePublic = ref(false);
const templateAutoAssign = ref(false);

// Color class helper
const getColorClass = (color: string) => {
  const colorMap: { [key: string]: string } = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-orange-600',
    purple: 'bg-purple-600',
  };
  return colorMap[color] || 'bg-green-600';
};

// Create template function
const createTemplate = () => {
  // TODO: Implement template creation logic
  console.log('Creating template:', {
    name: templateBadgeName.value,
    description: templateDescription.value,
    icon: templateSelectedIcon.value,
    category: templateCategory.value,
    color: templateSelectedColor.value,
    public: templatePublic.value,
    autoAssign: templateAutoAssign.value,
  });
  showCreateTemplateModal.value = false;
};
</script>

