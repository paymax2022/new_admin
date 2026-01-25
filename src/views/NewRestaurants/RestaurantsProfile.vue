<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Restaurants Profile</h1>
                <p class="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform today.</p>
            </div>
            <div class="flex gap-3">
                <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Export Data
                </button>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    View Full Report
                </button>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
            <div class="flex gap-4 items-center">
                <div class="relative flex-1">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Q Search res. name, ID..."
                        class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        @input="handleSearch"
                    />
                    <div class="absolute left-3 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant ID</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Name</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuisine Type</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-2">
                                    <span>Avg. Rating</span>
                                    <div class="relative">
                                        <select class="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                            <option>All</option>
                                        </select>
                                        <div class="absolute right-1 top-1.5 pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-if="loading">
                            <td colspan="8" class="px-6 py-8 text-center">
                                <div class="flex items-center justify-center">
                                    <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span class="ml-3 text-gray-600">Loading restaurants...</span>
                                </div>
                            </td>
                        </tr>
                        <tr 
                            v-else
                            v-for="(restaurant, index) in paginatedRestaurants" 
                            :key="restaurant.id" 
                            :class="[
                                index === 0 
                                    ? 'bg-blue-50 hover:bg-blue-100' 
                                    : (index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100')
                            ]"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ restaurant.restaurantId }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900 cursor-pointer hover:text-blue-600" @click.stop="openDetailedModal(restaurant)">{{ restaurant.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ restaurant.category }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ restaurant.cuisineType }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ restaurant.address }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center cursor-pointer" @click.stop="openProfileModal(restaurant)">
                                    <span 
                                        :class="[
                                            'w-2 h-2 rounded-full mr-2',
                                            restaurant.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                                        ]"
                                    ></span>
                                    <span class="text-sm text-gray-900">{{ restaurant.status }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">({{ restaurant.avgRating }})</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    <button
                                        v-if="!restaurant.verified"
                                        @click.stop="verifyRestaurant(restaurant)"
                                        :disabled="verifyingRestaurantId === restaurant.id"
                                        class="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <span v-if="verifyingRestaurantId === restaurant.id" class="inline-flex items-center">
                                            <svg class="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </span>
                                        <span v-else>Verify</span>
                                    </button>
                                    <span
                                        v-else
                                        class="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-md"
                                    >
                                        Verified
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!loading && filteredRestaurants.length === 0">
                            <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">No restaurants found</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div class="text-sm text-gray-600">
                    Showing {{ (currentPage - 1) * perPage + 1 }} to {{ Math.min(currentPage * perPage, totalRestaurants) }} of {{ totalRestaurants }} restaurants
                </div>
                <div class="flex items-center gap-1">
                    <button
                        @click="prevPage"
                        :disabled="currentPage === 1 || loading"
                        class="p-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <template v-for="page in visiblePages" :key="page">
                        <span v-if="page === '...'" class="px-2 text-gray-500">...</span>
                        <button
                            v-else
                            @click="goToPage(page)"
                            :class="[
                                'w-8 h-8 flex items-center justify-center border rounded text-sm font-medium',
                                page === currentPage 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            ]"
                        >
                            {{ page }}
                        </button>
                    </template>

                    <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages || loading"
                        class="p-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Restaurant Profile Modal -->
        <TransitionRoot appear :show="showProfileModal" as="template">
            <Dialog as="div" @close="closeProfileModal" class="relative z-50">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
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
                            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all max-h-[90vh] flex flex-col">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                                    <div class="flex items-start justify-between mb-3">
                                        <div>
                                            <p class="text-sm text-gray-500">Restaurant ID</p>
                                            <p class="text-sm text-gray-500">{{ selectedRestaurant?.restaurantId || 'RES-2001' }}</p>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <button @click="openEditModal" class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button @click="closeProfileModal" class="text-gray-500 hover:text-gray-700">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-3">
                                            <h2 class="text-2xl font-bold text-gray-900 uppercase">{{ selectedRestaurant?.fullName || 'MAMA PUT EXPRESS' }}</h2>
                                            <div class="flex items-center gap-1">
                                                <span class="w-2 h-2 rounded-full bg-red-500"></span>
                                                <span class="text-sm text-gray-500">Low Performance</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <span 
                                                :class="[
                                                    'w-2 h-2 rounded-full',
                                                    selectedRestaurant?.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                                                ]"
                                            ></span>
                                            <span 
                                                :class="[
                                                    'text-sm font-medium',
                                                    selectedRestaurant?.status === 'Active' ? 'text-green-600' : 'text-gray-500'
                                                ]"
                                            >
                                                {{ selectedRestaurant?.status || 'Active' }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6 overflow-y-auto flex-1">
                                    <!-- Restaurant Details -->
                                    <div class="space-y-4 mb-6">
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Restaurant Name</p>
                                                <div class="flex items-center gap-2 mt-1">
                                                    <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                        <span class="text-xs font-semibold text-blue-600">MP</span>
                                                    </div>
                                                    <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.fullName || 'Mama Put Express' }}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Contact Person</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.contactPerson || 'Tunde Adewale - 08012345678' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Email</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.email || 'mama.put@gmail.com' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Address</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.fullAddress || '12 Allen Ave, Ikeja, Lagos Opp. Iwo Road, Aja, Lagos' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Service</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.service || 'Drive-In' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Restaurant Category</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.category || 'Fast Food' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Cuisine Type</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.cuisineType || 'Local Dishes' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Restaurant Type</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.restaurantType || 'Fast Food' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg 
                                                    class="w-5 h-5 text-gray-600" 
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Status</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.status || 'Active' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Joined On</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.joinedOn || '2025-08-30' }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Avg. Rating</p>
                                                <div class="flex items-center gap-1 mt-1">
                                                    <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.avgRating || '4.5' }}</p>
                                                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span class="text-sm text-gray-500">({{ selectedRestaurant?.totalOrders || '980' }} total orders)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- About us Section -->
                                    <div class="flex items-start gap-3 mb-6">
                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-sm text-gray-500 mb-2">About us</p>
                                            <textarea
                                                v-model="aboutUsText"
                                                rows="4"
                                                class="w-full border border-gray-200 rounded-lg p-4 bg-gray-50 text-sm text-gray-600 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Mama Put Express has applied to join the platform. Documents are pending verification. Requires approval to onboard."
                                            ></textarea>
                                        </div>
                                    </div>

                                    <!-- Attachments Section -->
                                    <div>
                                        <div class="flex items-center gap-2 mb-3">
                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                            <h3 class="text-lg font-semibold text-gray-900">Attachments</h3>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <div class="flex items-start gap-3">
                                                    <div class="w-10 h-10 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900 truncate">Business License.pdf</p>
                                                        <p class="text-xs text-gray-500 mt-1">{{ selectedRestaurant?.licenseSize || '3.5MB' }}</p>
                                                        <a href="#" class="text-xs text-blue-600 hover:text-blue-700 mt-2 inline-block">Preview</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <div class="flex items-start gap-3">
                                                    <div class="w-10 h-10 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900 truncate">Food Safety Cert.jpg</p>
                                                        <p class="text-xs text-gray-500 mt-1">{{ selectedRestaurant?.certSize || '3.0MB' }}</p>
                                                        <a href="#" class="text-xs text-blue-600 hover:text-blue-700 mt-2 inline-block">Preview</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex-shrink-0">
                                    <button 
                                        @click="handleToggleStatus"
                                        :class="[
                                            'w-full py-3 rounded-lg font-bold text-white transition-colors',
                                            selectedRestaurant?.status === 'Active' 
                                                ? 'bg-red-600 hover:bg-red-700' 
                                                : 'bg-green-600 hover:bg-green-700'
                                        ]"
                                    >
                                        {{ selectedRestaurant?.status === 'Active' ? 'Disactivate' : 'Activate' }}
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Detailed Restaurant Modal with Tabs -->
        <TransitionRoot appear :show="showDetailedModal" as="template">
            <Dialog as="div" @close="closeDetailedModal" class="relative z-50">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
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
                            <DialogPanel class="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all max-h-[90vh] flex flex-col">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200 flex-shrink-0 bg-gray-50">
                                    <div class="flex items-start justify-between mb-3">
                                        <div>
                                            <p class="text-sm text-gray-500">Restaurant ID: {{ selectedRestaurant?.restaurantId || 'RES-2001' }}</p>
                                            <h2 class="text-xl font-bold text-gray-900 mt-1">{{ selectedRestaurant?.fullName || 'MAMA PUT EXPRESS' }}</h2>
                                        </div>
                                        <button @click="closeDetailedModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <!-- Tabs -->
                                    <div class="flex gap-6 border-b border-gray-200 -mb-4">
                                        <button 
                                            @click="activeTab = 'restaurant-profiles'"
                                            :class="[
                                                'pb-3 px-1 text-sm font-bold border-b-2 transition-colors',
                                                activeTab === 'restaurant-profiles' 
                                                    ? 'text-gray-900 border-blue-600' 
                                                    : 'text-gray-500 border-transparent'
                                            ]"
                                        >
                                            RESTAURANT PROFILES
                                        </button>
                                        <button 
                                            @click="activeTab = 'sales-reports'"
                                            :class="[
                                                'pb-3 px-1 text-sm font-bold border-b-2 transition-colors',
                                                activeTab === 'sales-reports' 
                                                    ? 'text-gray-900 border-blue-600' 
                                                    : 'text-gray-500 border-transparent'
                                            ]"
                                        >
                                            SALES & PERFORMANCE REPORTS
                                        </button>
                                        <button 
                                            @click="activeTab = 'commission-settings'"
                                            :class="[
                                                'pb-3 px-1 text-sm font-bold border-b-2 transition-colors',
                                                activeTab === 'commission-settings' 
                                                    ? 'text-gray-900 border-blue-600' 
                                                    : 'text-gray-500 border-transparent'
                                            ]"
                                        >
                                            COMMISSION SETTINGS
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6 overflow-y-auto flex-1">
                                    <!-- Restaurant Profiles Tab Content -->
                                    <div v-if="activeTab === 'restaurant-profiles'">
                                        <!-- Business Details Section -->
                                        <div class="mb-8">
                                            <h3 class="text-lg font-bold text-gray-900 mb-4">Business Details</h3>
                                            <div class="grid grid-cols-2 gap-6">
                                                <!-- Left Column -->
                                                <div class="space-y-4">
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Restaurant ID & Name</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.restaurantId || 'RES-2001' }} - {{ selectedRestaurant?.fullName || 'Mama Put Express' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Manager Name</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.managerName || 'Tunde Adewale' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Address</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.fullAddress || '12 Allen Ave, Ikeja, Lagos' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Email</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.email || 'mama.put@gmail.com' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Category</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.category || 'Fast Food' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Avg. Rating</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.avgRating || '4.5' }} ({{ selectedRestaurant?.totalReviews || '3800' }} reviews)</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Joined On</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.joinedOn || '2025-08-30' }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Right Column -->
                                                <div class="space-y-4">
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Phone</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.phone || '08012345678' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Cuisine Type</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.cuisineType || 'Local/African' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Restaurant Type</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.restaurantType || 'Vendors' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg 
                                                                class="w-5 h-5 text-gray-600" 
                                                                fill="currentColor" 
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Status</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.status || 'Active' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                        <div class="flex-1">
                                                            <p class="text-sm text-gray-500 mb-2">About us</p>
                                                            <textarea
                                                                v-model="aboutUsText"
                                                                rows="4"
                                                                class="w-full border border-gray-200 rounded-lg p-4 bg-gray-50 text-sm text-gray-600 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                placeholder="Mama Put Express has applied to join the platform. Documents are pending verification. Requires approval to onboard."
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Menu Uploaded Section -->
                                        <div class="mb-8">
                                            <div class="flex items-center justify-between mb-4">
                                                <h3 class="text-lg font-bold text-gray-900">Menu Uploaded</h3>
                                                <span class="text-sm text-blue-600 cursor-pointer">See all</span>
                                            </div>
                                            <div v-if="menuItems.length > 0" class="flex gap-4 overflow-x-auto pb-4">
                                                <div v-for="menu in menuItems" :key="menu.id" class="flex-shrink-0 w-48">
                                                    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                                        <img :src="menu.image" :alt="menu.name" class="w-full h-32 object-cover" />
                                                        <div class="p-3">
                                                            <p class="text-sm font-medium text-gray-900">{{ menu.name }}</p>
                                                            <p class="text-sm font-bold text-gray-900 mt-1">${{ menu.price }}</p>
                                                            <p class="text-xs text-gray-500 mt-1">{{ menu.category }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else class="text-sm text-gray-500 py-4">No menu items available</div>
                                        </div>

                                        <!-- Bank/Payout Setup Section -->
                                        <div class="mb-8">
                                            <h3 class="text-lg font-bold text-gray-900 mb-4">Bank/Payout Setup</h3>
                                            <div class="grid grid-cols-2 gap-6">
                                                <!-- Left Column -->
                                                <div class="space-y-4">
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Bank Name</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.bankName || 'Items' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Account Holder Name</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.accountHolderName || 'Tunde Adewale' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Account Number</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.accountNumber || '1234567890' }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Branch</p>
                                                            <p class="text-base font-medium text-gray-900 mt-1">{{ selectedRestaurant?.branch || 'Wuse2' }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Right Column -->
                                                <div class="space-y-4">
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Payment Permissions</p>
                                                            <div class="flex items-center gap-1 mt-1">
                                                                <p class="text-base font-medium text-gray-900">Yes</p>
                                                                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm text-gray-500">Payout Status</p>
                                                            <div class="flex items-center gap-1 mt-1">
                                                                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                                                                <p class="text-base font-medium text-gray-900">Active</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Ratings & Feedback History Section -->
                                        <div>
                                            <div class="flex items-center justify-between mb-4">
                                                <h3 class="text-lg font-bold text-gray-900">Ratings & Feedback History</h3>
                                                <span class="text-sm text-blue-600 cursor-pointer">See all</span>
                                            </div>
                                            <div class="grid grid-cols-3 gap-4">
                                                <div v-for="feedback in feedbackItems" :key="feedback.id" class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                    <div class="flex items-start gap-3 mb-3">
                                                        <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                                                            <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <div class="flex-1">
                                                            <p class="text-sm font-medium text-gray-900">{{ feedback.userName }}</p>
                                                            <p class="text-xs text-gray-500">{{ feedback.role }}</p>
                                                        </div>
                                                    </div>
                                                    <p class="text-sm text-gray-600 mb-3 leading-relaxed">{{ feedback.comment }}</p>
                                                    <div class="flex items-center justify-between">
                                                        <div class="flex">
                                                            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </div>
                                                        <p class="text-xs text-gray-500">{{ feedback.timeAgo }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Sales & Performance Reports Tab Content -->
                                    <div v-if="activeTab === 'sales-reports'">
                                        <!-- Sales & Performance Reports Section -->
                                        <div class="mb-8">
                                            <div class="flex items-center justify-between mb-6">
                                                <h3 class="text-lg font-bold text-gray-900">Sales & Performance Reports</h3>
                                                <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>Weekly</option>
                                                    <option>Daily</option>
                                                    <option>Monthly</option>
                                                </select>
                                            </div>

                                            <!-- KPI Cards Grid -->
                                            <div class="grid grid-cols-3 gap-4 mb-8">
                                                <!-- Total Orders -->
                                                <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                                                    <div class="absolute top-4 right-4">
                                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <p class="text-sm text-gray-500 mb-2">Total Orders</p>
                                                    <p class="text-2xl font-bold text-gray-900 mb-1">128</p>
                                                    <p class="text-sm text-green-600">↑ 0% vs yesterday</p>
                                                </div>

                                                <!-- Total Revenue -->
                                                <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                                                    <div class="absolute top-4 right-4">
                                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <p class="text-sm text-gray-500 mb-2">Total Revenue</p>
                                                    <p class="text-2xl font-bold text-gray-900 mb-1">₦520,000</p>
                                                    <p class="text-sm text-green-600">↑ 0% vs last week</p>
                                                </div>

                                                <!-- Net Revenue -->
                                                <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                                                    <div class="absolute top-4 right-4">
                                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                    </div>
                                                    <p class="text-sm text-gray-500 mb-2">Net Revenue</p>
                                                    <p class="text-2xl font-bold text-gray-900 mb-1">₦442,000</p>
                                                    <p class="text-sm text-gray-500">After Commissions</p>
                                                </div>

                                                <!-- Average Order -->
                                                <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                                                    <div class="absolute top-4 right-4">
                                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                    </div>
                                                    <p class="text-sm text-gray-500 mb-2">Average Order</p>
                                                    <p class="text-2xl font-bold text-gray-900 mb-1">₦4,062</p>
                                                    <p class="text-sm text-green-600">↑ 0% vs last week</p>
                                                </div>

                                                <!-- Cancelled Orders -->
                                                <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                                                    <div class="absolute top-4 right-4">
                                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    <p class="text-sm text-gray-500 mb-2">Cancelled Orders</p>
                                                    <p class="text-2xl font-bold text-gray-900 mb-1">57</p>
                                                    <p class="text-sm text-green-600">↑ 1.7% of orders</p>
                                                </div>

                                                <!-- Refunds Processed -->
                                                <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                                                    <div class="absolute top-4 right-4">
                                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                        </svg>
                                                    </div>
                                                    <p class="text-sm text-gray-500 mb-2">Refunds Processed</p>
                                                    <p class="text-2xl font-bold text-gray-900 mb-1">₦102,000</p>
                                                    <p class="text-sm text-gray-500">33 refunds</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Top Selling Menu Items Section -->
                                        <div>
                                            <div class="flex items-center justify-between mb-4">
                                                <h3 class="text-lg font-bold text-gray-900">Top Selling Menu Items</h3>
                                                <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>All</option>
                                                    <option>Fast Food</option>
                                                    <option>Drinks</option>
                                                </select>
                                            </div>
                                            <div class="space-y-3">
                                                <div class="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                                    <span class="text-sm font-medium text-gray-900">Jollof Rice with Chicken</span>
                                                    <span class="text-sm text-gray-500">1,240 orders</span>
                                                </div>
                                                <div class="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                                    <span class="text-sm font-medium text-gray-900">Beef Burger</span>
                                                    <span class="text-sm text-gray-500">980 orders</span>
                                                </div>
                                                <div class="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                                    <span class="text-sm font-medium text-gray-900">Shawarma</span>
                                                    <span class="text-sm text-gray-500">875 orders</span>
                                                </div>
                                                <div class="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                                    <span class="text-sm font-medium text-gray-900">Fried Rice & Plantain</span>
                                                    <span class="text-sm text-gray-500">820 orders</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Commission Settings Tab Content -->
                                    <div v-if="activeTab === 'commission-settings'">
                                        <!-- Summary Statistics Section -->
                                        <div class="grid grid-cols-4 gap-4 mb-8">
                                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <p class="text-sm text-gray-500 mb-2">Commission Rate Applied</p>
                                                <p class="text-2xl font-bold text-gray-900">15%</p>
                                            </div>
                                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <p class="text-sm text-gray-500 mb-2">Total Commission Collected</p>
                                                <p class="text-2xl font-bold text-gray-900">₦520,000</p>
                                            </div>
                                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <p class="text-sm text-gray-500 mb-2">Outstanding Payments</p>
                                                <p class="text-2xl font-bold text-gray-900">₦42,000</p>
                                            </div>
                                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <p class="text-sm text-gray-500 mb-2">Last Settlement Date</p>
                                                <p class="text-2xl font-bold text-gray-900">Sept 25, 2025</p>
                                            </div>
                                        </div>

                                        <!-- Commission Configuration and History Section -->
                                        <div class="grid grid-cols-2 gap-6">
                                            <!-- Commission Configuration Section -->
                                            <div>
                                                <div class="flex items-center justify-between mb-4">
                                                    <h3 class="text-lg font-bold text-gray-900">Commission Configuration</h3>
                                                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                                                        Save
                                                    </button>
                                                </div>
                                                
                                                <div class="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                                                    <!-- Commission Type -->
                                                    <div>
                                                        <label class="block text-sm font-medium text-gray-700 mb-3">Commission Type</label>
                                                        <div class="space-y-3">
                                                            <label class="flex items-center cursor-pointer">
                                                                <input type="radio" name="commissionType" value="percentage" checked class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                                                                <span class="ml-2 text-sm text-gray-700">Percentage %</span>
                                                            </label>
                                                            <label class="flex items-center cursor-pointer">
                                                                <input type="radio" name="commissionType" value="flat" class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                                                                <span class="ml-2 text-sm text-gray-700">Flat fee (per order)</span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <!-- Rate/Fee -->
                                                    <div>
                                                        <label class="block text-sm font-medium text-gray-700 mb-2">Rate/Fee</label>
                                                        <div class="flex items-center gap-2">
                                                            <input 
                                                                type="number" 
                                                                value="16" 
                                                                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            >
                                                            <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                                <option>%</option>
                                                                <option>₦</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <!-- Settlement Frequency -->
                                                    <div>
                                                        <label class="block text-sm font-medium text-gray-700 mb-2">Settlement Frequency</label>
                                                        <select class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                            <option>Weekly</option>
                                                            <option>Daily</option>
                                                            <option>Monthly</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Commission History Section -->
                                            <div>
                                                <h3 class="text-lg font-bold text-gray-900 mb-4">Commission History</h3>
                                                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                                    <table class="w-full">
                                                        <thead class="bg-gray-50 border-b border-gray-200">
                                                            <tr>
                                                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                                                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="bg-white divide-y divide-gray-200">
                                                            <tr>
                                                                <td class="px-4 py-3 text-sm text-gray-900">Sept 25</td>
                                                                <td class="px-4 py-3 text-sm text-gray-900">₦520,000</td>
                                                                <td class="px-4 py-3">
                                                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        Status
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="px-4 py-3 text-sm text-gray-900">Sept 25</td>
                                                                <td class="px-4 py-3 text-sm text-gray-900">₦520,000</td>
                                                                <td class="px-4 py-3">
                                                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                                        Pending
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="px-4 py-3 text-sm text-gray-900">Sept 25</td>
                                                                <td class="px-4 py-3 text-sm text-gray-900">₦520,000</td>
                                                                <td class="px-4 py-3">
                                                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        Status
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Edit Restaurant Profile Modal -->
        <TransitionRoot appear :show="showEditModal" as="template">
            <Dialog as="div" @close="closeEditModal" class="relative z-50">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
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
                            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all max-h-[90vh] flex flex-col">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h2 class="text-2xl font-bold text-gray-900">Edit Restaurant Profile</h2>
                                            <p class="text-sm text-gray-500 mt-1">Restaurant ID: {{ editForm.restaurantId || 'RES-2001' }}</p>
                                        </div>
                                        <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6 overflow-y-auto flex-1">
                                    <div class="space-y-4">
                                        <!-- Restaurant Name -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                                            <input
                                                type="text"
                                                v-model="editForm.fullName"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- Contact Person -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                                            <input
                                                type="text"
                                                v-model="editForm.contactPerson"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- Email -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                v-model="editForm.email"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- Address -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <textarea
                                                v-model="editForm.fullAddress"
                                                rows="3"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                            ></textarea>
                                        </div>

                                        <!-- Service -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Service</label>
                                            <input
                                                type="text"
                                                v-model="editForm.service"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- Restaurant Category -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Restaurant Category</label>
                                            <input
                                                type="text"
                                                v-model="editForm.category"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- Cuisine Type -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                                            <input
                                                type="text"
                                                v-model="editForm.cuisineType"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- Restaurant Type -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Restaurant Type</label>
                                            <input
                                                type="text"
                                                v-model="editForm.restaurantType"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- Status -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                            <select
                                                v-model="editForm.status"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        <!-- Joined On -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Joined On</label>
                                            <input
                                                type="date"
                                                v-model="editForm.joinedOn"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- Avg Rating -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Avg. Rating</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                v-model="editForm.avgRating"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                        </div>

                                        <!-- About us -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">About us</label>
                                            <textarea
                                                v-model="editForm.aboutUs"
                                                rows="4"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                placeholder="Mama Put Express has applied to join the platform. Documents are pending verification. Requires approval to onboard."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
                                    <button
                                        type="button"
                                        @click="closeEditModal"
                                        class="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        @click="saveEditChanges"
                                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                    >
                                        Save Changes
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

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const searchQuery = ref('');
const perPage = ref(20);
const currentPage = ref(1);
const showProfileModal = ref(false);
const showDetailedModal = ref(false);
const showEditModal = ref(false);
const selectedRestaurant = ref<any>(null);
const activeTab = ref('restaurant-profiles');
const aboutUsText = ref('');
const loading = ref(false);
const totalRestaurants = ref(0);
const verifyingRestaurantId = ref<string | null>(null);

const editForm = ref({
    restaurantId: '',
    fullName: '',
    contactPerson: '',
    email: '',
    fullAddress: '',
    service: '',
    category: '',
    cuisineType: '',
    restaurantType: '',
    status: 'Active',
    joinedOn: '',
    avgRating: '',
    aboutUs: ''
});

// Menu items - populated from API data
const menuItems = ref<any[]>([]);

// Feedback items
const feedbackItems = ref([
    { id: 1, userName: 'Ethan Mitchell', role: 'View Executive', comment: 'Personally surprised by the increase in funds, just last year, it\'s a good thing when the increase is massive.', timeAgo: '3 days ago' },
    { id: 2, userName: 'Oliver Mitchell', role: 'View Executive', comment: 'Personally surprised by the increase in funds, just last year, it\'s a good thing when the increase is massive.', timeAgo: '2 days ago' },
    { id: 3, userName: 'Ethan Mitchell', role: 'View Executive', comment: 'Personally surprised by the increase in funds, just last year, it\'s a good thing when the increase is massive.', timeAgo: '3 days ago' },
    { id: 4, userName: 'Oliver Mitchell', role: 'View Executive', comment: 'Personally surprised by the increase in funds, just last year, it\'s a good thing when the increase is massive.', timeAgo: '2 days ago' },
    { id: 5, userName: 'Ethan Mitchell', role: 'View Executive', comment: 'Personally surprised by the increase in funds, just last year, it\'s a good thing when the increase is massive.', timeAgo: '3 days ago' },
    { id: 6, userName: 'Oliver Mitchell', role: 'View Executive', comment: 'Personally surprised by the increase in funds, just last year, it\'s a good thing when the increase is massive.', timeAgo: '2 days ago' },
]);

const restaurants = ref<any[]>([]);

// Transform API data to component format
const transformRestaurantData = (apiRestaurant: any) => {
    const cuisineNames = apiRestaurant.cuisines?.map((c: any) => c.name).join(', ') || 'N/A';
    const firstCuisine = apiRestaurant.cuisines?.[0]?.name || 'N/A';
    const address = apiRestaurant.address || 'N/A';
    const shortAddress = address.length > 20 ? address.substring(0, 20) + '...' : address;
    const shortName = apiRestaurant.name?.length > 15 ? apiRestaurant.name.substring(0, 15) + '...' : apiRestaurant.name;
    
    return {
        id: apiRestaurant._id,
        restaurantId: apiRestaurant._id,
        name: shortName,
        fullName: apiRestaurant.name,
        category: apiRestaurant.category_id || 'N/A',
        cuisineType: firstCuisine,
        address: shortAddress,
        fullAddress: address,
        status: apiRestaurant.accepting_orders ? 'Active' : 'Inactive',
        avgRating: '0.0', // Not in API response, default to 0.0
        contactPerson: 'N/A',
        email: 'N/A',
        phone: 'N/A',
        managerName: 'N/A',
        service: apiRestaurant.services || 'N/A',
        restaurantType: apiRestaurant.restaurant_type || 'N/A',
        joinedOn: apiRestaurant.created_at ? new Date(apiRestaurant.created_at).toISOString().split('T')[0] : 'N/A',
        totalOrders: '0',
        totalReviews: '0',
        bankName: apiRestaurant.settlement_bank || 'N/A',
        accountHolderName: 'N/A',
        accountNumber: apiRestaurant.account_number || 'N/A',
        branch: 'N/A',
        aboutUs: apiRestaurant.about || 'No description available',
        licenseSize: 'N/A',
        certSize: 'N/A',
        verified: apiRestaurant.verified || false,
        // Store original API data for reference
        _original: apiRestaurant,
        // Store restaurant ID for verification
        restaurantId: apiRestaurant._id
    };
};

// Fetch restaurants from API
const fetchRestaurants = async () => {
    loading.value = true;
    try {
        const response = await restaurantService.getAllRestaurants(perPage.value, currentPage.value);
        
        // Handle different response structures
        const restaurantsData = response.data?.data || response.data || [];
        const total = response.total || response.data?.total || restaurantsData.length;
        
        if (Array.isArray(restaurantsData)) {
            restaurants.value = restaurantsData.map(transformRestaurantData);
            totalRestaurants.value = total;
        } else {
            restaurants.value = [];
            totalRestaurants.value = 0;
        }
    } catch (error: any) {
        console.error('Error fetching restaurants:', error);
        toast.error('Failed to load restaurants');
        restaurants.value = [];
        totalRestaurants.value = 0;
    } finally {
        loading.value = false;
    }
};

// Fetch restaurants on mount and when page/perPage changes
onMounted(() => {
    fetchRestaurants();
});

watch([currentPage, perPage], () => {
    fetchRestaurants();
});

// Verify restaurant function
const verifyRestaurant = async (restaurant: any) => {
    if (!restaurant.restaurantId && !restaurant.id) {
        toast.error('Restaurant ID not found');
        return;
    }

    const restaurantId = restaurant.restaurantId || restaurant.id;
    verifyingRestaurantId.value = restaurantId;

    try {
        await restaurantService.verifyRestaurant(restaurantId);
        
        // Update restaurant status locally
        const index = restaurants.value.findIndex(r => (r.id === restaurantId || r.restaurantId === restaurantId));
        if (index !== -1) {
            restaurants.value[index].verified = true;
            restaurants.value[index].status = 'Active';
            // Update original data if it exists
            if (restaurants.value[index]._original) {
                restaurants.value[index]._original.verified = true;
                restaurants.value[index]._original.accepting_orders = true;
            }
        }

        toast.success('Restaurant verified successfully');
    } catch (error: any) {
        console.error('Error verifying restaurant:', error);
        const errorMessage = error.response?.data?.message || 'Failed to verify restaurant';
        toast.error(errorMessage);
    } finally {
        verifyingRestaurantId.value = null;
    }
};

const filteredRestaurants = computed(() => {
    let filtered = restaurants.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (restaurant) =>
                restaurant.restaurantId.toLowerCase().includes(query) ||
                restaurant.name.toLowerCase().includes(query)
        );
    }

    return filtered;
});

const totalPages = computed(() => Math.ceil(totalRestaurants.value / perPage.value));

const pagination = computed(() => {
    const startIndex = (currentPage.value - 1) * perPage.value;
    const endIndex = Math.min(startIndex + perPage.value, filteredRestaurants.value.length);
    return { startIndex, endIndex };
});

const paginatedRestaurants = computed(() => {
    // Since we're fetching paginated data from API, just return filtered restaurants
    return filteredRestaurants.value;
});

const visiblePages = computed(() => {
    const pages: (number | string)[] = [];
    
    // Always show pages 1-5, then ... and 10 if totalPages >= 10
    if (totalPages.value <= 5) {
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
        }
    } else {
        // Show 1, 2, 3, 4, 5, ..., 10
        for (let i = 1; i <= 5; i++) {
            pages.push(i);
        }
        if (totalPages.value > 5) {
            pages.push('...');
            pages.push(totalPages.value);
        }
    }
    
    return pages;
});

const goToPage = (page: number | string) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const handleSearch = () => {
    currentPage.value = 1;
};

watch([searchQuery], () => {
    currentPage.value = 1;
});

const openProfileModal = (restaurant: any) => {
    selectedRestaurant.value = restaurant;
    aboutUsText.value = restaurant.aboutUs || 'Mama Put Express has applied to join the platform. Documents are pending verification. Requires approval to onboard.';
    showProfileModal.value = true;
};

const closeProfileModal = () => {
    // Save the aboutUs text if it was edited
    if (selectedRestaurant.value && aboutUsText.value) {
        selectedRestaurant.value.aboutUs = aboutUsText.value;
        // Update the restaurant in the main list
        const index = restaurants.value.findIndex(r => r.id === selectedRestaurant.value.id);
        if (index !== -1) {
            restaurants.value[index].aboutUs = aboutUsText.value;
        }
    }
    showProfileModal.value = false;
    selectedRestaurant.value = null;
    aboutUsText.value = '';
};

const openDetailedModal = (restaurant: any) => {
    selectedRestaurant.value = restaurant;
    aboutUsText.value = restaurant.aboutUs || 'Mama Put Express has applied to join the platform. Documents are pending verification. Requires approval to onboard.';
    activeTab.value = 'restaurant-profiles';
    
    // Populate menu items from API data
    if (restaurant._original?.menus && Array.isArray(restaurant._original.menus)) {
        menuItems.value = restaurant._original.menus.map((menu: any) => ({
            id: menu._id,
            name: menu.name || 'Menu Item',
            price: menu.price || '0',
            category: menu.category || 'N/A',
            image: menu.item_image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
            description: menu.description || ''
        }));
    } else {
        menuItems.value = [];
    }
    
    showDetailedModal.value = true;
};

const closeDetailedModal = () => {
    // Save the aboutUs text if it was edited
    if (selectedRestaurant.value && aboutUsText.value) {
        selectedRestaurant.value.aboutUs = aboutUsText.value;
        // Update the restaurant in the main list
        const index = restaurants.value.findIndex(r => r.id === selectedRestaurant.value.id);
        if (index !== -1) {
            restaurants.value[index].aboutUs = aboutUsText.value;
        }
    }
    showDetailedModal.value = false;
    selectedRestaurant.value = null;
    aboutUsText.value = '';
};

const openEditModal = () => {
    if (selectedRestaurant.value) {
        editForm.value = {
            restaurantId: selectedRestaurant.value.restaurantId || '',
            fullName: selectedRestaurant.value.fullName || '',
            contactPerson: selectedRestaurant.value.contactPerson || '',
            email: selectedRestaurant.value.email || '',
            fullAddress: selectedRestaurant.value.fullAddress || '',
            service: selectedRestaurant.value.service || '',
            category: selectedRestaurant.value.category || '',
            cuisineType: selectedRestaurant.value.cuisineType || '',
            restaurantType: selectedRestaurant.value.restaurantType || '',
            status: selectedRestaurant.value.status || 'Active',
            joinedOn: selectedRestaurant.value.joinedOn || '',
            avgRating: selectedRestaurant.value.avgRating || '',
            aboutUs: selectedRestaurant.value.aboutUs || aboutUsText.value || ''
        };
        showEditModal.value = true;
    }
};

const closeEditModal = () => {
    showEditModal.value = false;
};

const saveEditChanges = () => {
    if (selectedRestaurant.value) {
        // Update selectedRestaurant with editForm values
        Object.assign(selectedRestaurant.value, editForm.value);
        
        // Update the restaurant in the main list
        const index = restaurants.value.findIndex(r => r.id === selectedRestaurant.value.id);
        if (index !== -1) {
            Object.assign(restaurants.value[index], editForm.value);
            // Update the name field for display in table
            restaurants.value[index].name = editForm.value.fullName.length > 15 
                ? editForm.value.fullName.substring(0, 15) + '...' 
                : editForm.value.fullName;
            // Update the address field for display in table
            restaurants.value[index].address = editForm.value.fullAddress.length > 20 
                ? editForm.value.fullAddress.substring(0, 20) + '...' 
                : editForm.value.fullAddress;
        }
        
        // Update aboutUsText if it was changed
        if (editForm.value.aboutUs) {
            aboutUsText.value = editForm.value.aboutUs;
        }
        
        closeEditModal();
    }
};

const handleToggleStatus = () => {
    if (selectedRestaurant.value) {
        // Toggle status
        selectedRestaurant.value.status = selectedRestaurant.value.status === 'Active' ? 'Inactive' : 'Active';
        
        // Update the restaurant in the main list
        const index = restaurants.value.findIndex(r => r.id === selectedRestaurant.value.id);
        if (index !== -1) {
            restaurants.value[index].status = selectedRestaurant.value.status;
        }
        
        // Close modal after action
        closeProfileModal();
    }
};
</script>
