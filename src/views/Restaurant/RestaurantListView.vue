<template>
    <div>
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-8">
            <div class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                Loading restaurant details...
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">Error loading restaurant data</h3>
                    <div class="mt-2 text-sm text-red-700">
                        <p>{{ error }}</p>
                    </div>
                    <div class="mt-4 flex gap-2">
                        <button @click="fetchRestaurantData"
                            class="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200">
                            Try Again
                        </button>
                        <button @click="goBackToList"
                            class="bg-gray-100 px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">
                            Back to Restaurant List
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="stat in stats" :key="stat.label"
                    class="bg-white p-4 rounded-xl shadow-sm flex items-center border border-gray-100 space-x-4">
                    <div :class="`p-3 rounded-full text-white ${stat.bg}`">
                        <component :is="stat.icon" class="w-6 h-6" />
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-medium">{{ stat.label }}</p>
                        <p class="text-lg font-semibold text-gray-800">{{ stat.value }}</p>
                    </div>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row mt-10">
                <div>
                    <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                        <img :src="restaurantData.logo || DP" alt="Logo" class="w-24 h-24 rounded-full mb-2" />
                        <div class="font-semibold text-lg">{{ restaurantData.name || 'Restaurant Name' }}</div>
                        <div class="text-sm text-gray-500">{{ restaurantData.address || 'Address not available' }}</div>
                    </div>
                    <div class="bg-white rounded-xl shadow p-2 lg:p-6 flex flex-col mt-10 items-center">
                        <img :src="DP" alt="Logo" class="w-24 h-24 rounded-full mb-2" />
                        <div class="font-semibold text-lg">John Doe</div>
                        <div class="text-sm text-gray-500">Restaurant Owner</div>
                        <div class="py-3 border border-gray-300 rounded-lg mt-4">
                            <div class="space-y-4">
                                <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                    <div class="font-medium text-gray-700">Username</div>
                                    <div class="text-gray-900">customer2</div>
                                </div>
                                <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                    <div class="font-medium text-gray-700">Phone</div>
                                    <div class="text-gray-900">115005550006</div>
                                </div>

                                <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                    <div class="font-medium text-gray-700">Email</div>
                                    <div class="text-gray-900">customer2@example.com</div>
                                </div>

                                <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                    <div class="font-medium text-gray-700">Address</div>
                                    <div class="text-gray-900">Dhaka, Bangladesh</div>
                                </div>

                                <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                    <div class="font-medium text-gray-700">Deposit Amount</div>
                                    <div class="text-gray-900">$0.00</div>
                                </div>

                                <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                    <div class="font-medium text-gray-700">Order Limit Amount</div>
                                    <div class="text-gray-900">$0.00</div>
                                </div>

                                <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                    <div class="font-medium text-gray-700">Credit</div>
                                    <div class="text-gray-900">$0.00</div>
                                </div>

                                <div class="grid grid-cols-2 gap-4 px-3 py-1">
                                    <div class="font-medium text-gray-700">Status</div>
                                    <div class="text-green-600 font-medium">Active</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-1/2 mx-auto">
                    <div class="bg-white rounded-xl shadow p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Restaurant Information</h2>
                        <table class="w-full table-auto text-sm text-left">
                            <tbody>
                                <!-- Row 1 -->
                                <tr class="align-top">
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Name</th>
                                    <td class="pb-4 text-gray-500">{{ restaurantData.name || 'N/A' }}</td>
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Latitude</th>
                                    <td class="pb-4 text-gray-500">{{ restaurantData.location?.[0]?.lat || 'N/A' }}</td>
                                </tr>

                                <!-- Row 2 -->
                                <tr class="align-top">
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Cuisines</th>
                                    <td class="pb-4 text-gray-500">
                                        <div v-if="restaurantData.cuisines && Array.isArray(restaurantData.cuisines) && restaurantData.cuisines.length > 0"
                                            class="flex flex-wrap gap-1">
                                            <span v-for="cuisine in restaurantData.cuisines" :key="cuisine.id"
                                                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {{ cuisine.name }}
                                            </span>
                                        </div>
                                        <span v-else class="text-gray-500">N/A</span>
                                    </td>
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Longitude</th>
                                    <td class="pb-4 text-gray-500">{{ restaurantData.location?.[0]?.lon || 'N/A' }}</td>
                                </tr>

                                <!-- Row 3 -->
                                <tr class="align-top">
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Delivery Status</th>
                                    <td class="pb-4">
                                        <span :class="getDeliveryStatusClass()"
                                            class="inline-block text-xs font-medium px-3 py-1 rounded-md">
                                            {{ getDeliveryStatus() }}
                                        </span>
                                    </td>
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Current Status</th>
                                    <td class="pb-4">
                                        <span
                                            :class="restaurantData.accepting_orders ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
                                            class="inline-block text-xs font-medium px-3 py-1 rounded-md">
                                            {{ restaurantData.accepting_orders ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                </tr>

                                <!-- Row 4 -->
                                <tr class="align-top">
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Pickup Status</th>
                                    <td class="pb-4">
                                        <span :class="getPickupStatusClass()"
                                            class="inline-block text-xs font-medium px-3 py-1 rounded-md">
                                            {{ getPickupStatus() }}
                                        </span>
                                    </td>
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Restaurant Type</th>
                                    <td class="pb-4 text-gray-500">{{ restaurantData.restaurant_type || 'N/A' }}</td>
                                </tr>

                                <!-- Row 5 -->
                                <tr class="align-top">
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Category</th>
                                    <td class="pb-4 text-gray-500">{{ restaurantData.category_id || 'N/A' }}</td>
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Country</th>
                                    <td class="pb-4 text-gray-500">{{ restaurantData.country || 'N/A' }}</td>
                                </tr>

                                <!-- Row 6 -->
                                <tr class="align-top">
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">City</th>
                                    <td class="pb-4 text-gray-500">{{ restaurantData.city || 'N/A' }}</td>
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Verified</th>
                                    <td class="pb-4">
                                        <span
                                            :class="restaurantData.verified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
                                            class="inline-block text-xs font-medium px-3 py-1 rounded-md">
                                            {{ restaurantData.verified ? 'Verified' : 'Not Verified' }}
                                        </span>
                                    </td>
                                </tr>

                                <!-- Row 7 -->
                                <tr class="align-top">
                                    <th class="pr-4 pb-4 font-semibold text-gray-900">Address</th>
                                    <td colspan="3" class="pb-4 text-gray-500">{{ restaurantData.address || 'N/A' }}
                                    </td>
                                </tr>

                                <!-- Row 8 -->
                                <tr class="align-top">
                                    <th class="pr-4 align-top font-semibold text-gray-900">Description</th>
                                    <td colspan="3" class="text-gray-500">
                                        {{ restaurantData.about || 'No description available' }}
                                    </td>
                                </tr>

                                <!-- Row 9 - Working Hours -->
                                <tr class="align-top" v-if="restaurantData.working_hours?.days">
                                    <th class="pr-4 align-top font-semibold text-gray-900">Working Hours</th>
                                    <td colspan="3" class="text-gray-500">
                                        <div class="space-y-1">
                                            <div v-for="day in restaurantData.working_hours.days" :key="day.day"
                                                class="flex justify-between">
                                                <span class="capitalize font-medium">{{ day.day }}:</span>
                                                <span v-if="day.is_working">{{ day.start_time }} - {{ day.end_time
                                                }}</span>
                                                <span v-else class="text-red-500">Closed</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <!-- Row 10 - Delivery Information -->
                                <tr class="align-top" v-if="restaurantData.delivery">
                                    <th class="pr-4 align-top font-semibold text-gray-900">Delivery Info</th>
                                    <td colspan="3" class="text-gray-500">
                                        <div class="space-y-1">
                                            <div><strong>Type:</strong> {{ restaurantData.delivery.delivery_type ||
                                                'N/A' }}</div>
                                            <div><strong>Minimum Order:</strong> {{
                                                restaurantData.delivery.delivery_minimum_order || 'N/A' }}</div>
                                            <div><strong>Delivery Fee:</strong> {{ restaurantData.delivery.delivery_fee
                                                || 'N/A' }}</div>
                                            <div><strong>Radius:</strong> {{ restaurantData.delivery.delivery_radius ||
                                                'N/A' }} km</div>
                                            <div v-if="restaurantData.delivery.delivery_description">
                                                <strong>Description:</strong> {{
                                                    restaurantData.delivery.delivery_description }}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-10">
                        <div class="p-6 bg-white rounded-lg shadow-md">
                            <div class="flex justify-between items-center mb-6">
                                <h1 class="text-2xl font-bold">Menu Items</h1>
                                <div class="text-gray-500">{{ items.length }} items</div>
                            </div>

                            <!-- Menu Loading State -->
                            <div v-if="menuLoading" class="flex justify-center items-center py-8">
                                <div class="inline-flex items-center">
                                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Loading menu items...
                                </div>
                            </div>

                            <!-- Menu Error State -->
                            <div v-else-if="menuError" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="text-sm font-medium text-red-800">Error loading menu items</h3>
                                        <div class="mt-2 text-sm text-red-700">
                                            <p>{{ menuError }}</p>
                                        </div>
                                        <div class="mt-4">
                                            <button @click="fetchMenuItems"
                                                class="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200">
                                                Try Again
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Menu Content -->
                            <div v-else>
                                <div class="mb-4">
                                    <input type="text" v-model="searchQuery" placeholder="Search..."
                                        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>

                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    NAME</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    CATEGORY</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    PRICE</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    TYPE
                                                </th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <tr v-if="paginatedItems.length" v-for="item in paginatedItems"
                                                :key="item._id">
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                        <img v-if="item.item_image" :src="item.item_image"
                                                            :alt="item.name"
                                                            class="w-10 h-10 rounded-lg object-cover mr-3" />
                                                        <div>
                                                            <div class="text-sm font-medium text-gray-900">{{ item.name
                                                                }}
                                                            </div>
                                                            <div v-if="item.description"
                                                                class="text-xs text-gray-500 truncate max-w-xs">{{
                                                                    item.description }}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-500">{{ item.category }}</div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">₦{{ item.price?.toLocaleString()
                                                        }}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        <span v-if="item.is_combo"
                                                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            Combo
                                                        </span>
                                                        <span v-else class="text-gray-500">-</span>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                                                    <button @click="openViewModal(item)"
                                                        class="text-blue-600 hover:text-blue-900" title="View">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                            viewBox="0 0 20 20" fill="currentColor">
                                                            <path
                                                                d="M10 3C5.5 3 2 10 2 10s3.5 7 8 7 8-7 8-7-3.5-7-8-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                                                            <path d="M10 8a2 2 0 100 4 2 2 0 000-4z" />
                                                        </svg>
                                                    </button>
                                                    <button @click="openEditModal(item)"
                                                        class="text-indigo-600 hover:text-indigo-900" title="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                            viewBox="0 0 20 20" fill="currentColor">
                                                            <path
                                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                    </button>
                                                    <button @click="openDeleteModal(item)"
                                                        class="text-red-600 hover:text-red-900" title="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                            viewBox="0 0 20 20" fill="currentColor">
                                                            <path fill-rule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clip-rule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="5" class="px-6 py-4 text-center text-gray-500">No items
                                                    found.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Pagination -->
                                <div class="flex items-center justify-between mt-4">
                                    <div class="text-sm text-gray-500">
                                        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage *
                                            itemsPerPage, filteredItems.length) }} of
                                        {{ filteredItems.length }} entries
                                    </div>
                                    <div class="flex space-x-2">
                                        <button @click="currentPage = 1" :disabled="currentPage === 1"
                                            class="px-3 py-1 border rounded-md"
                                            :class="currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'">
                                            First
                                        </button>
                                        <button @click="currentPage--" :disabled="currentPage === 1"
                                            class="px-3 py-1 border rounded-md"
                                            :class="currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'">
                                            Previous
                                        </button>
                                        <button v-for="page in visiblePages" :key="page" @click="currentPage = page"
                                            class="px-3 py-1 border rounded-md"
                                            :class="currentPage === page ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'">
                                            {{ page }}
                                        </button>
                                        <button @click="currentPage++" :disabled="currentPage === totalPages"
                                            class="px-3 py-1 border rounded-md"
                                            :class="currentPage === totalPages ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'">
                                            Next
                                        </button>
                                        <button @click="currentPage = totalPages" :disabled="currentPage === totalPages"
                                            class="px-3 py-1 border rounded-md"
                                            :class="currentPage === totalPages ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'">
                                            Last
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- View Menu Item Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        @click.self="closeModals">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-900">Menu Item Details</h3>
                <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
            <div v-if="selectedMenuItem" class="space-y-4">
                <img v-if="selectedMenuItem.item_image" :src="selectedMenuItem.item_image" :alt="selectedMenuItem.name"
                    class="w-full h-48 object-cover rounded-lg" />
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedMenuItem.name }}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedMenuItem.description || 'No description' }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Category</label>
                        <p class="mt-1 text-sm text-gray-900">{{ selectedMenuItem.category }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Price</label>
                        <p class="mt-1 text-sm text-gray-900">₦{{ selectedMenuItem.price?.toLocaleString() }}</p>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Type</label>
                    <p class="mt-1">
                        <span v-if="selectedMenuItem.is_combo"
                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Combo Meal
                        </span>
                        <span v-else
                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Regular Item
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Menu Item Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        @click.self="closeModals">
        <div class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-900">Edit Menu Item</h3>
                <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
            <form @submit.prevent="handleUpdateMenu" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name *</label>
                    <input type="text" v-model="editForm.name" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="editForm.description" rows="3"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Category *</label>
                        <input type="text" v-model="editForm.category" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Price *</label>
                        <input type="number" v-model="editForm.price" required min="0" step="0.01"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>
                <div>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="editForm.is_combo"
                            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" />
                        <span class="ml-2 text-sm text-gray-700">Is Combo Meal</span>
                    </label>
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" @click="closeModals"
                        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" :disabled="menuUpdating"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
                        <span v-if="menuUpdating">Updating...</span>
                        <span v-else>Update Menu Item</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        @click.self="closeModals">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-red-900">Delete Menu Item</h3>
                <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
            <div v-if="selectedMenuItem" class="mb-4">
                <p class="text-sm text-gray-700">Are you sure you want to delete <strong>{{ selectedMenuItem.name
                        }}</strong>?</p>
                <p class="text-xs text-gray-500 mt-2">This action cannot be undone.</p>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
                <button @click="closeModals"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Cancel
                </button>
                <button @click="handleDeleteMenu" :disabled="menuDeleting"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50">
                    <span v-if="menuDeleting">Deleting...</span>
                    <span v-else>Delete</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';
import { CubeIcon, TruckIcon, ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/solid';
import DP from '@/assets/image/dp.jpeg';
// Reactive data
const restaurantData = ref<any>({});
const loading = ref(false);
const error = ref('');
const route = useRoute();
const router = useRouter();
const toast = useToast();

// Order statistics
const orderStats = ref({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    received: 0,
    cancelled: 0
});

const stats = computed(() => [
    { label: 'Total Orders', value: orderStats.value.total, bg: 'bg-purple-500', icon: CubeIcon },
    { label: 'Pending Orders', value: orderStats.value.pending, bg: 'bg-yellow-400', icon: ClockIcon },
    { label: 'Processing Orders', value: orderStats.value.processing, bg: 'bg-green-300', icon: CheckCircleIcon },
    { label: 'Completed Orders', value: orderStats.value.completed, bg: 'bg-purple-400', icon: CubeIcon },
]);
interface MenuItem {
    _id: string;
    name: string;
    restaurant_id: string;
    description: string;
    category: string;
    price: number;
    item_image?: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    is_combo: boolean;
    combo_items?: any;
}

const items = ref<MenuItem[]>([]);
const menuLoading = ref(false);
const menuError = ref('');

// Modal states
const showViewModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedMenuItem = ref<MenuItem | null>(null);
const menuUpdating = ref(false);
const menuDeleting = ref(false);

// Edit form
const editForm = ref({
    name: '',
    description: '',
    category: '',
    price: 0,
    is_combo: false,
});

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredItems = computed(() => {
    return items.value.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
});

const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage);
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredItems.value.slice(start, end);
});

const visiblePages = computed(() => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(currentPage.value - half, 1);
    let end = Math.min(start + maxVisible - 1, totalPages.value);

    if (end - start + 1 < maxVisible) {
        start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Modal handlers
const openViewModal = async (item: MenuItem) => {
    try {
        menuLoading.value = true;
        const response = await restaurantService.getMenuById(item._id);
        if (response && response.data) {
            selectedMenuItem.value = response.data;
            showViewModal.value = true;
        } else {
            toast.error('Failed to load menu item details');
        }
    } catch (err) {
        toast.error('Failed to load menu item details');
        console.error('Error fetching menu item:', err);
    } finally {
        menuLoading.value = false;
    }
};

const openEditModal = (item: MenuItem) => {
    selectedMenuItem.value = item;
    editForm.value = {
        name: item.name,
        description: item.description || '',
        category: item.category,
        price: item.price,
        is_combo: item.is_combo || false,
    };
    showEditModal.value = true;
};

const openDeleteModal = (item: MenuItem) => {
    selectedMenuItem.value = item;
    showDeleteModal.value = true;
};

const closeModals = () => {
    showViewModal.value = false;
    showEditModal.value = false;
    showDeleteModal.value = false;
    selectedMenuItem.value = null;
    editForm.value = {
        name: '',
        description: '',
        category: '',
        price: 0,
        is_combo: false,
    };
};

// Update menu item
const handleUpdateMenu = async () => {
    if (!selectedMenuItem.value) return;

    const restaurantId = route.params.id as string;
    const menuId = selectedMenuItem.value._id;

    menuUpdating.value = true;

    try {
        await restaurantService.updateMenu(restaurantId, menuId, editForm.value);
        toast.success('Menu item updated successfully');
        await fetchMenuItems(); // Refresh menu list
        closeModals();
    } catch (err) {
        toast.error('Failed to update menu item');
        console.error('Error updating menu item:', err);
    } finally {
        menuUpdating.value = false;
    }
};

// Delete menu item
const handleDeleteMenu = async () => {
    if (!selectedMenuItem.value) return;

    const restaurantId = route.params.id as string;
    const menuId = selectedMenuItem.value._id;

    menuDeleting.value = true;

    try {
        await restaurantService.deleteMenu(restaurantId, menuId);
        toast.success('Menu item deleted successfully');
        await fetchMenuItems(); // Refresh menu list
        closeModals();
    } catch (err) {
        toast.error('Failed to delete menu item');
        console.error('Error deleting menu item:', err);
    } finally {
        menuDeleting.value = false;
    }
};

// API Integration
const fetchRestaurantData = async () => {
    const restaurantId = route.params.id as string;
    console.log('Route params:', route.params);
    console.log('Restaurant ID from route:', restaurantId);

    if (!restaurantId) {
        error.value = 'Restaurant ID not found in route parameters. Please navigate from the restaurant list.';
        console.error('No restaurant ID found in route params:', route.params);
        return;
    }

    loading.value = true;
    error.value = '';

    try {
        const response = await restaurantService.getRestaurantById(restaurantId);
        console.log('Restaurant data received:', response);

        if (response && response.data) {
            restaurantData.value = response.data;
            toast.success('Restaurant data loaded successfully');
        } else {
            error.value = 'No restaurant data found';
        }
    } catch (err) {
        error.value = 'Failed to load restaurant data';
        toast.error('Failed to load restaurant data');
        console.error('Error fetching restaurant:', err);
    } finally {
        loading.value = false;
    }
};

// Helper functions for status display
const getDeliveryStatus = () => {
    if (!restaurantData.value.services) return 'Unknown';
    const services = restaurantData.value.services.toLowerCase();
    if (services.includes('delivery')) return 'Enabled';
    return 'Disabled';
};

const getDeliveryStatusClass = () => {
    const status = getDeliveryStatus();
    return status === 'Enabled' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
};

const getPickupStatus = () => {
    if (!restaurantData.value.services) return 'Unknown';
    const services = restaurantData.value.services.toLowerCase();
    if (services.includes('pickup')) return 'Enabled';
    return 'Disabled';
};

const getPickupStatusClass = () => {
    const status = getPickupStatus();
    return status === 'Enabled' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
};

// Navigation
const goBackToList = () => {
    router.push({ name: 'restaurantList' });
};

// Fetch order statistics
const fetchOrderStats = async () => {
    const restaurantId = route.params.id as string;
    if (!restaurantId) return;

    try {
        // Fetch orders with a higher limit to get more accurate statistics
        const response = await restaurantService.getRestaurantOrders(restaurantId, 1, 100);
        console.log('Orders data received:', response);

        if (response && response.data && Array.isArray(response.data)) {
            const orders = response.data;

            // Calculate statistics based on order status
            const stats = {
                total: orders.length,
                pending: orders.filter(order => order.status === 'Pending' || order.status === 'pending').length,
                processing: orders.filter(order => order.status === 'Processing' || order.status === 'processing' || order.status === 'In Progress').length,
                completed: orders.filter(order => order.status === 'Completed' || order.status === 'completed' || order.status === 'Delivered').length,
                received: orders.filter(order => order.status === 'Received' || order.status === 'received').length,
                cancelled: orders.filter(order => order.status === 'Cancelled' || order.status === 'cancelled').length
            };

            orderStats.value = stats;
            console.log('Order statistics calculated:', stats);
        } else {
            // Reset stats if no orders found
            orderStats.value = {
                total: 0,
                pending: 0,
                processing: 0,
                completed: 0,
                received: 0,
                cancelled: 0
            };
        }
    } catch (err) {
        console.error('Error fetching order statistics:', err);
        // Don't show error toast for order stats as it's not critical
    }
};

// Fetch menu items
const fetchMenuItems = async () => {
    const restaurantId = route.params.id as string;
    if (!restaurantId) return;

    menuLoading.value = true;
    menuError.value = '';

    try {
        const response = await restaurantService.getRestaurantMenus(restaurantId);
        console.log('Menu data received:', response);

        if (response && response.data && Array.isArray(response.data)) {
            items.value = response.data;
            toast.success('Menu items loaded successfully');
        } else {
            items.value = [];
            menuError.value = 'No menu items found';
        }
    } catch (err) {
        menuError.value = 'Failed to load menu items';
        toast.error('Failed to load menu items');
        console.error('Error fetching menu items:', err);
    } finally {
        menuLoading.value = false;
    }
};

// Load restaurant data on component mount
onMounted(() => {
    fetchRestaurantData();
    fetchMenuItems();
    fetchOrderStats();
});
</script>
