<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Restaurants</h1>
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
                <div class="relative">
                    <select v-model="selectedFilter" class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8">
                        <option value="all">All</option>
                        <option value="awaiting-review">Awaiting Review</option>
                        <option value="rejected">Rejected</option>
                        <option value="approved">Approved</option>
                    </select>
                    <div class="absolute right-2 top-2.5 pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Verified</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuisine Type</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr 
                            v-for="(restaurant, index) in paginatedRestaurants" 
                            :key="restaurant.id" 
                            :class="[
                                'hover:bg-gray-50 cursor-pointer',
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            ]"
                            @click="openModal(restaurant)"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ restaurant.restaurantId }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ restaurant.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ restaurant.dateVerified }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ restaurant.cuisineType }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <span :class="getStatusDotClass(restaurant.status)" class="w-2 h-2 rounded-full mr-2"></span>
                                    <span class="text-sm text-gray-900">{{ restaurant.status }}</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="filteredRestaurants.length === 0">
                            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No restaurants found</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-center">
                <div class="flex items-center gap-1">
                    <button
                        @click="prevPage"
                        :disabled="currentPage === 1"
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
                        :disabled="currentPage === totalPages"
                        class="p-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Restaurant Detail Modal -->
        <TransitionRoot appear :show="showModal" as="template">
            <Dialog as="div" @close="closeModal" class="relative z-50">
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
                            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <div class="flex items-start justify-between mb-3">
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm text-gray-600">{{ selectedRestaurant?.restaurantId || 'APP-1001' }}</span>
                                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-2xl font-bold text-gray-900">{{ selectedRestaurant?.status === 'Rejected' ? 'REJECTED APPLICATION' : 'MAMA PUT EXPRESS' }}</h2>
                                        <span 
                                            :class="[
                                                'px-3 py-1 text-white text-xs font-medium rounded-full',
                                                selectedRestaurant?.status === 'Rejected' 
                                                    ? 'bg-red-500' 
                                                    : 'bg-orange-500'
                                            ]"
                                        >
                                            {{ selectedRestaurant?.status === 'Rejected' ? 'Rejected' : 'Pending Review' }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6 max-h-[calc(100vh-300px)] overflow-y-auto">
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
                                                    <p class="text-base font-medium text-gray-900">Mama Put Express</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Contact Person</p>
                                                <p class="text-base font-medium text-gray-900">Tunde Adewale - 08012345678</p>
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
                                                <p class="text-base font-medium text-gray-900">mama.put@gmail.com</p>
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
                                                <p class="text-base font-medium text-gray-900">12 Allen Ave, Ikeja, Lagos Opp. Iwo Road, Aja, Lagos</p>
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
                                                <p class="text-base font-medium text-gray-900">Drive-In</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Restaurant Category</p>
                                                <p class="text-base font-medium text-gray-900">Fast Food</p>
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
                                                <p class="text-base font-medium text-gray-900">Local Dishes</p>
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
                                                <p class="text-base font-medium text-gray-900">Fast Food</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg 
                                                    v-if="selectedRestaurant?.status === 'Rejected'"
                                                    class="w-5 h-5 text-red-500" 
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                                </svg>
                                                <svg 
                                                    v-else
                                                    class="w-5 h-5 text-green-500" 
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Status</p>
                                                <p class="text-base font-medium text-gray-900">{{ selectedRestaurant?.status === 'Rejected' ? 'Rejected' : 'Active' }}</p>
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
                                                <p class="text-base font-medium text-gray-900">2025-08-30</p>
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
                                                <p class="text-base font-medium text-gray-900">4.5 <span class="text-sm text-gray-500 font-normal">(980 total orders)</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Rejection Reason Section (only for rejected restaurants) -->
                                    <div v-if="selectedRestaurant?.status === 'Rejected'" class="mb-6" data-rejection-reason>
                                        <div class="flex items-center gap-2 mb-3">
                                            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h3 class="text-lg font-semibold text-gray-900">Rejection Reason</h3>
                                        </div>
                                        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p class="text-sm text-gray-700 leading-relaxed">
                                                {{ selectedRestaurant?.rejectionReason || 'The provided business license is expired. Please submit a valid, current business license document.' }}
                                            </p>
                                        </div>
                                    </div>

                                    <!-- About us Section -->
                                    <div class="mb-6">
                                        <div class="flex items-center gap-2 mb-3">
                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h3 class="text-lg font-semibold text-gray-900">About us</h3>
                                        </div>
                                        <p class="text-sm text-gray-600 leading-relaxed">
                                            Mama Put Express has applied to join the platform. Documents are pending verification. Requires approval to onboard.
                                        </p>
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
                                                        <p class="text-xs text-gray-500 mt-1">3.5MB</p>
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
                                                        <p class="text-xs text-gray-500 mt-1">3.5MB</p>
                                                        <a href="#" class="text-xs text-blue-600 hover:text-blue-700 mt-2 inline-block">Preview</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                                    <template v-if="selectedRestaurant?.status === 'Rejected'">
                                        <button @click="handleViewRejectionReason" class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                                            View Rejection Reason
                                        </button>
                                        <button @click="handleAccept" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                                            Accept
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button @click="handleReject" class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors">
                                            Reject
                                        </button>
                                        <button @click="handleAccept" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                                            Accept
                                        </button>
                                    </template>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Reject Application Modal -->
        <TransitionRoot appear :show="showRejectModal" as="template">
            <Dialog as="div" @close="closeRejectModal" class="relative z-50">
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
                            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <div class="flex items-start justify-between mb-3">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-600">Application ID {{ selectedRestaurant?.restaurantId || 'APP-1001' }}</span>
                                        </div>
                                        <button @click="closeRejectModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h2 class="text-xl font-bold text-gray-900 uppercase">REJECT APPLICATION - PROVIDE REASON</h2>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <p class="text-sm text-gray-600 mb-6 leading-relaxed">
                                        This message will be sent to the restaurant owner. Make it specific and helpful so they can fix the issues and re-apply.
                                    </p>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Write rejection message (required)
                                        </label>
                                        <textarea
                                            v-model="rejectionMessage"
                                            rows="6"
                                            placeholder="Reason for rejecting the application"
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400 resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                                    <button 
                                        @click="closeRejectModal" 
                                        class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        @click="handleSendRejection" 
                                        :disabled="!rejectionMessage.trim()"
                                        :class="[
                                            'px-6 py-2 rounded-lg font-medium transition-colors',
                                            rejectionMessage.trim() 
                                                ? 'bg-red-600 text-white hover:bg-red-700' 
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        ]"
                                    >
                                        Send
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Reject Confirmation Modal -->
        <TransitionRoot appear :show="showRejectConfirmationModal" as="template">
            <Dialog as="div" @close="closeRejectConfirmationModal" class="relative z-50">
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
                            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <div class="flex items-start justify-between mb-3">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-600">Application ID {{ selectedRestaurant?.restaurantId || 'APP-1001' }}</span>
                                        </div>
                                        <button @click="closeRejectConfirmationModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h2 class="text-xl font-bold text-gray-900 uppercase">REJECT APPLICATION SENT</h2>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <p class="text-sm text-gray-600 leading-relaxed">
                                        The rejection message has been successfully sent to the restaurant.
                                    </p>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
                                    <button 
                                        @click="closeRejectConfirmationModal" 
                                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Application Accepted Modal -->
        <TransitionRoot appear :show="showAcceptConfirmationModal" as="template">
            <Dialog as="div" @close="closeAcceptConfirmationModal" class="relative z-50">
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
                            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <span class="text-sm text-gray-600">Application ID {{ selectedRestaurant?.restaurantId || 'APP-1001' }}</span>
                                        </div>
                                        <button @click="closeAcceptConfirmationModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <h2 class="text-2xl font-bold text-gray-900 uppercase mb-4">APPLICATION ACCEPTED</h2>
                                    <p class="text-sm text-gray-600 leading-relaxed">
                                        You've successfully accept the application for Restaurant {{ selectedRestaurant?.restaurantId || 'APP-1001' }}
                                    </p>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
                                    <button 
                                        @click="closeAcceptConfirmationModal" 
                                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                    >
                                        Close
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
import { ref, computed, watch } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

const searchQuery = ref('');
const selectedFilter = ref('all');
const perPage = ref(10);
const currentPage = ref(1);
const showModal = ref(false);
const showRejectModal = ref(false);
const showRejectConfirmationModal = ref(false);
const showAcceptConfirmationModal = ref(false);
const selectedRestaurant = ref<any>(null);
const rejectionMessage = ref('');

const restaurants = ref([
    { id: 1, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 2, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected', rejectionReason: 'The provided business license is expired. Please submit a valid, current business license document.' },
    { id: 3, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 4, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected', rejectionReason: 'The provided business license is expired. Please submit a valid, current business license document.' },
    { id: 5, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 6, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected', rejectionReason: 'The provided business license is expired. Please submit a valid, current business license document.' },
    { id: 7, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 8, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected', rejectionReason: 'The provided business license is expired. Please submit a valid, current business license document.' },
    { id: 9, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 10, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected', rejectionReason: 'The provided business license is expired. Please submit a valid, current business license document.' },
    { id: 11, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 12, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected' },
    { id: 13, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 14, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected' },
    { id: 15, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 16, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected' },
    { id: 17, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 18, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected' },
    { id: 19, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: '---', cuisineType: 'Indian', status: 'Awaiting Review' },
    { id: 20, restaurantId: 'APP-1001', name: 'Spice Hub', dateVerified: 'August 22, 2024', cuisineType: 'Upload', status: 'Rejected' },
    // Add more to reach 10 pages (100 items with 10 per page)
    ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 21,
        restaurantId: `APP-${1001 + i}`,
        name: `Restaurant ${i + 21}`,
        dateVerified: i % 2 === 0 ? '---' : 'August 22, 2024',
        cuisineType: i % 2 === 0 ? 'Indian' : 'Upload',
        status: i % 2 === 0 ? 'Awaiting Review' : 'Rejected',
        rejectionReason: i % 2 !== 0 ? 'The provided business license is expired. Please submit a valid, current business license document.' : undefined
    })),
]);

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

    // Filter by status
    if (selectedFilter.value !== 'all') {
        const statusMap: Record<string, string> = {
            'awaiting-review': 'Awaiting Review',
            'rejected': 'Rejected',
            'approved': 'Approved',
        };
        filtered = filtered.filter(restaurant => restaurant.status === statusMap[selectedFilter.value]);
    }

    return filtered;
});

const totalPages = computed(() => Math.ceil(filteredRestaurants.value.length / perPage.value));

const pagination = computed(() => {
    const startIndex = (currentPage.value - 1) * perPage.value;
    const endIndex = Math.min(startIndex + perPage.value, filteredRestaurants.value.length);
    return { startIndex, endIndex };
});

const paginatedRestaurants = computed(() => {
    return filteredRestaurants.value.slice(pagination.value.startIndex, pagination.value.endIndex);
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

const getStatusDotClass = (status: string) => {
    const classes: Record<string, string> = {
        'Awaiting Review': 'bg-orange-500',
        'Rejected': 'bg-red-500',
        'Approved': 'bg-green-500',
    };
    return classes[status] || 'bg-gray-500';
};

const openModal = (restaurant: any) => {
    selectedRestaurant.value = restaurant;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    selectedRestaurant.value = null;
};

const handleAccept = () => {
    // Handle accept logic here
    console.log('Accept restaurant:', selectedRestaurant.value);
    closeModal();
    showAcceptConfirmationModal.value = true;
};

const closeAcceptConfirmationModal = () => {
    showAcceptConfirmationModal.value = false;
};

const handleViewRejectionReason = () => {
    // Scroll to rejection reason section or show it if hidden
    // For now, it's already visible, but we can add scroll behavior if needed
    const rejectionSection = document.querySelector('[data-rejection-reason]');
    if (rejectionSection) {
        rejectionSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

const handleReject = () => {
    showRejectModal.value = true;
};

const closeRejectModal = () => {
    showRejectModal.value = false;
    rejectionMessage.value = '';
};

const handleSendRejection = () => {
    if (!rejectionMessage.value.trim()) {
        return;
    }
    // Handle send rejection logic here
    console.log('Reject restaurant:', selectedRestaurant.value);
    console.log('Rejection message:', rejectionMessage.value);
    closeRejectModal();
    showRejectConfirmationModal.value = true;
};

const closeRejectConfirmationModal = () => {
    showRejectConfirmationModal.value = false;
    closeModal();
};

watch([searchQuery, selectedFilter], () => {
    currentPage.value = 1;
});
</script>
