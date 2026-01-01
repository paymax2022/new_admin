<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Rider Assignment</h1>
            <p class="text-sm text-gray-500">Assign and manage rider assignments for order deliveries.</p>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <span class="w-2 h-2 rounded-full bg-red-500 block"></span>
                </div>
                <p class="text-sm text-gray-500 mb-2">Unassigned Orders</p>
                <p class="text-2xl font-bold text-gray-900">00</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <span class="w-2 h-2 rounded-full bg-gray-500 block"></span>
                </div>
                <p class="text-sm text-gray-500 mb-2">Available Riders</p>
                <p class="text-2xl font-bold text-gray-900">00</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <span class="w-2 h-2 rounded-full bg-yellow-500 block"></span>
                </div>
                <p class="text-sm text-gray-500 mb-2">Busy Riders</p>
                <p class="text-2xl font-bold text-gray-900">00</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <span class="w-2 h-2 rounded-full bg-gray-500 block"></span>
                </div>
                <p class="text-sm text-gray-500 mb-2">Avg Assignment Time</p>
                <p class="text-2xl font-bold text-gray-900">00</p>
            </div>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
            <div class="relative max-w-md">
                <input
                    type="text"
                    placeholder="Search res, name, ID..."
                    v-model="searchQuery"
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        <!-- Main Content: Orders and Riders -->
        <div class="grid grid-cols-2 gap-6 mb-8">
            <!-- Orders Needing Assignment (Left Panel) -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold text-gray-900">Orders Needing Assignment</h2>
                    <router-link :to="{ name: 'new-restaurants-orders-needing-assignment' }" class="text-sm text-blue-600 hover:text-blue-700">See all</router-link>
                </div>
                <div class="space-y-4">
                    <div v-for="order in unassignedOrders" :key="order.id" class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <p class="text-sm font-bold text-gray-900">{{ order.orderId }}</p>
                                <p class="text-sm text-gray-600">{{ order.restaurant }}</p>
                            </div>
                        </div>
                        <div class="space-y-2 mb-4">
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{{ order.distance }}</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Pickup ETA: {{ order.pickupEta }}</span>
                            </div>
                            <div class="text-sm text-gray-600">
                                <span class="font-medium">Customer:</span> {{ order.customer }}
                            </div>
                            <div class="text-sm text-gray-600">
                                <span class="font-medium">Value:</span> {{ order.value }} + {{ order.deliveryFee }} delivery
                            </div>
                        </div>
                        <button @click="openAssignRiderModal(order)" class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                            Assign Rider
                        </button>
                    </div>
                </div>
            </div>

            <!-- Active Riders (Right Panel) -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold text-gray-900">Active Riders</h2>
                    <router-link :to="{ name: 'new-restaurants-active-riders' }" class="text-sm text-blue-600 hover:text-blue-700">See all</router-link>
                </div>
                <div class="space-y-4">
                    <div v-for="rider in activeRiders" :key="rider.id" class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <p class="text-sm font-bold text-gray-900">{{ rider.name }}</p>
                                <p class="text-sm text-gray-600">{{ rider.location }}</p>
                            </div>
                            <span
                                :class="[
                                    'text-xs font-medium px-2 py-1 rounded',
                                    rider.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                ]"
                            >
                                {{ rider.status }}
                            </span>
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{{ rider.rating }}</span>
                            </div>
                            <div class="text-sm text-gray-600">
                                <span class="font-medium">Deliveries:</span> {{ rider.deliveries }} deliveries
                            </div>
                            <div class="text-sm text-gray-600">
                                <span class="font-medium">Vehicle Type:</span> {{ rider.vehicleType }}
                            </div>
                            <div class="text-sm text-gray-600">
                                <span class="font-medium">Average Time:</span> {{ rider.avgTime }} avg
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Orders History (Bottom Section) -->
        <div>
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-900">Orders History</h2>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-700">See all</a>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned At</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Progress</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA / Delivered</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="order in orderHistory" :key="order.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ order.orderId }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ order.rider }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ order.restaurant }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ order.assignedAt }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                                        getStatusClass(order.status)
                                    ]"
                                >
                                    {{ order.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ order.eta }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- All Orders Modal -->
        <TransitionRoot appear :show="showAllOrdersModal" as="template">
            <Dialog as="div" @close="showAllOrdersModal = false" class="relative z-50">
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
                            <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all max-h-[90vh] flex flex-col">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-xl font-bold text-gray-900">Orders Needing Assignment</h2>
                                        <button @click="showAllOrdersModal = false" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6 overflow-y-auto flex-1">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div v-for="order in allUnassignedOrders" :key="order.id" class="bg-white border border-gray-200 rounded-lg p-4">
                                            <div class="flex items-start justify-between mb-3">
                                                <div>
                                                    <p class="text-sm font-bold text-gray-900">{{ order.orderId }}</p>
                                                    <p class="text-sm text-gray-600">{{ order.restaurant }}</p>
                                                </div>
                                            </div>
                                            <div class="space-y-2 mb-4">
                                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{{ order.distance }}</span>
                                                </div>
                                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Pickup ETA: {{ order.pickupEta }}</span>
                                                </div>
                                                <div class="text-sm text-gray-600">
                                                    <span class="font-medium">Customer:</span> {{ order.customer }}
                                                </div>
                                                <div class="text-sm text-gray-600">
                                                    <span class="font-medium">Value:</span> {{ order.value }} + {{ order.deliveryFee }} delivery
                                                </div>
                                            </div>
                                            <button class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                                                Assign Rider
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- All Active Riders Modal -->
        <TransitionRoot appear :show="showAllRidersModal" as="template">
            <Dialog as="div" @close="showAllRidersModal = false" class="relative z-50">
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
                            <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all max-h-[90vh] flex flex-col">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                                    <div class="mb-4">
                                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Active Riders</h1>
                                        <div class="relative max-w-md">
                                            <input
                                                type="text"
                                                placeholder="Search res, name, ID..."
                                                v-model="searchQuery"
                                                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                            <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2 text-sm text-gray-600">
                                            <span>Active Riders</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <a href="#" class="text-sm text-blue-600 hover:text-blue-700">See all</a>
                                            <button @click="showAllRidersModal = false" class="text-gray-500 hover:text-gray-700 ml-2">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6 overflow-y-auto flex-1">
                                    <div class="space-y-0">
                                        <div v-for="rider in paginatedRiders" :key="rider.id" class="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0">
                                            <!-- Profile Picture -->
                                            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <!-- Rider Info -->
                                            <div class="flex-1">
                                                <div class="flex items-center gap-2 mb-1">
                                                    <p class="text-sm font-bold text-gray-900">{{ rider.name }}</p>
                                                    <div class="flex items-center gap-1">
                                                        <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span class="text-sm text-gray-900">{{ rider.rating }}</span>
                                                    </div>
                                                </div>
                                                <p class="text-sm text-gray-600 mb-2">{{ rider.location }}</p>
                                                <div class="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>{{ rider.deliveries }} deliveries</span>
                                                    <span>{{ rider.vehicleType }}</span>
                                                    <span>{{ rider.avgTime }} avg</span>
                                                </div>
                                            </div>
                                            <!-- Status -->
                                            <div>
                                                <span
                                                    :class="[
                                                        'text-xs font-medium px-2 py-1 rounded',
                                                        rider.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                                    ]"
                                                >
                                                    {{ rider.status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Pagination -->
                                <div class="px-6 py-4 border-t border-gray-200 flex-shrink-0">
                                    <div class="flex items-center justify-center">
                                        <div class="flex items-center gap-2">
                                            <button
                                                @click="currentRiderPage = Math.max(1, currentRiderPage - 1)"
                                                :disabled="currentRiderPage === 1"
                                                :class="[
                                                    'px-3 py-1 rounded border',
                                                    currentRiderPage === 1
                                                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                ]"
                                            >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                v-for="page in [1, 2, 3, 4, 5]"
                                                :key="page"
                                                @click="currentRiderPage = page"
                                                :class="[
                                                    'px-3 py-1 rounded border text-sm',
                                                    currentRiderPage === page
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                ]"
                                            >
                                                {{ page }}
                                            </button>
                                            <span v-if="totalRiderPages > 5" class="px-2 text-gray-500">...</span>
                                            <button
                                                v-if="totalRiderPages > 5"
                                                @click="currentRiderPage = totalRiderPages"
                                                :class="[
                                                    'px-3 py-1 rounded border text-sm',
                                                    currentRiderPage === totalRiderPages
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                ]"
                                            >
                                                {{ totalRiderPages }}
                                            </button>
                                            <button
                                                @click="currentRiderPage = Math.min(totalRiderPages, currentRiderPage + 1)"
                                                :disabled="currentRiderPage === totalRiderPages"
                                                :class="[
                                                    'px-3 py-1 rounded border',
                                                    currentRiderPage === totalRiderPages
                                                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                ]"
                                            >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Assign Rider Modal -->
        <TransitionRoot appear :show="showAssignRiderModal" as="template">
            <Dialog as="div" @close="closeAssignRiderModal" class="relative z-50">
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
                                        <h2 class="text-xl font-bold text-gray-900">Order Details</h2>
                                        <button @click="closeAssignRiderModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6 overflow-y-auto flex-1">
                                    <!-- Order Details Section -->
                                    <div class="mb-6">
                                        <div class="flex items-center gap-3 mb-4">
                                            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <span class="text-sm font-semibold text-blue-600">MP</span>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedOrder?.restaurant || 'Mama Put Express' }}</p>
                                                <p class="text-sm text-gray-500">{{ selectedOrder?.distance || '2.3km' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-3 mb-4">
                                            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedOrder?.customer || 'Jack Smith' }}</p>
                                                <p class="text-sm text-gray-500">{{ selectedOrder?.value || '$45' }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Rider Search -->
                                    <div class="mb-4">
                                        <div class="relative">
                                            <input
                                                type="text"
                                                placeholder="Search riders by name or location"
                                                v-model="riderSearchQuery"
                                                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                            <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <!-- Active Riders Section -->
                                    <div>
                                        <h3 class="text-lg font-bold text-gray-900 mb-4">Active Riders</h3>
                                        <div class="space-y-4">
                                            <div v-for="rider in filteredAvailableRiders" :key="rider.id" class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <div class="flex items-start justify-between mb-3">
                                                    <div class="flex-1">
                                                        <p class="text-sm font-bold text-gray-900">{{ rider.name }}</p>
                                                        <p class="text-sm text-gray-600">{{ rider.phone }}</p>
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-2 gap-3 mb-4">
                                                    <div class="flex items-center gap-2 text-sm text-gray-600">
                                                        <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span>{{ rider.rating }}</span>
                                                    </div>
                                                    <div class="text-sm text-gray-600">
                                                        <span class="font-medium">Distance:</span> {{ rider.distance }}
                                                    </div>
                                                    <div class="text-sm text-gray-600">
                                                        <span class="font-medium">Avg Time:</span> {{ rider.avgTime }}
                                                    </div>
                                                    <div class="text-sm text-gray-600">
                                                        <span class="font-medium">Deliveries:</span> {{ rider.deliveries }}
                                                    </div>
                                                    <div class="text-sm text-gray-600 col-span-2">
                                                        <span class="font-medium">Current Location:</span> {{ rider.location }}
                                                    </div>
                                                </div>
                                                <button 
                                                    @click="assignRiderToOrder(rider)"
                                                    class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                                >
                                                    Assign Rider
                                                </button>
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

        <!-- Rider Assigned Confirmation Modal -->
        <TransitionRoot appear :show="showRiderAssignedModal" as="template">
            <Dialog as="div" @close="closeRiderAssignedModal" class="relative z-50">
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
                                        <span class="text-sm text-gray-500">Order #{{ selectedOrder?.orderId || 'A120' }}</span>
                                        <button @click="closeRiderAssignedModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <h2 class="text-2xl font-bold text-gray-900 uppercase mb-4">RIDER ASSIGNED</h2>
                                    <p class="text-sm text-gray-600 leading-relaxed">
                                        You've successfully assign {{ selectedRider?.name || 'Tobi Ola' }} to {{ selectedOrder?.customer || 'Jack Smith' }}
                                    </p>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
                                    <button 
                                        @click="closeRiderAssignedModal" 
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

const router = useRouter();

const searchQuery = ref('');
const showAllOrdersModal = ref(false);
const showAllRidersModal = ref(false);
const showAssignRiderModal = ref(false);
const showRiderAssignedModal = ref(false);
const selectedOrder = ref<any>(null);
const selectedRider = ref<any>(null);
const riderSearchQuery = ref('');
const currentRiderPage = ref(1);
const ridersPerPage = ref(10);

const unassignedOrders = ref([
    {
        id: 1,
        orderId: 'ORD005',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '15:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    },
    {
        id: 2,
        orderId: 'ORD005',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '15:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    },
    {
        id: 3,
        orderId: 'ORD006',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '15:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    }
]);

const allUnassignedOrders = ref([
    {
        id: 1,
        orderId: 'ORD005',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '15:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    },
    {
        id: 2,
        orderId: 'ORD005',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '15:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    },
    {
        id: 3,
        orderId: 'ORD005',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '15:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    },
    {
        id: 4,
        orderId: 'ORD005',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '15:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    },
    {
        id: 5,
        orderId: 'ORD005',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '15:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    },
    {
        id: 6,
        orderId: 'ORD006',
        restaurant: 'Golden Dragon Restaurant',
        distance: '2.4km',
        pickupEta: '16:00',
        customer: 'Jack Smith',
        value: '$32.97',
        deliveryFee: '$4.99'
    },
    {
        id: 7,
        orderId: 'ORD007',
        restaurant: 'Mama Put Restaurant',
        distance: '3.1km',
        pickupEta: '16:00',
        customer: 'Jane Doe',
        value: '$45.50',
        deliveryFee: '$5.99'
    },
    {
        id: 8,
        orderId: 'ORD008',
        restaurant: 'Spice Hub',
        distance: '1.8km',
        pickupEta: '16:00',
        customer: 'Mike Johnson',
        value: '$28.75',
        deliveryFee: '$4.99'
    }
]);

const activeRiders = ref([
    {
        id: 1,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 2,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 3,
        name: 'Corios Rodrigue',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'On Delivery'
    },
    {
        id: 4,
        name: 'Ceries Rodrigues',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    }
]);

const allActiveRiders = ref([
    {
        id: 1,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 2,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 3,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 4,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 5,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 6,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 7,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    }
]);

const totalRiderPages = computed(() => Math.ceil(allActiveRiders.value.length / ridersPerPage.value));

const paginatedRiders = computed(() => {
    const startIndex = (currentRiderPage.value - 1) * ridersPerPage.value;
    const endIndex = startIndex + ridersPerPage.value;
    return allActiveRiders.value.slice(startIndex, endIndex);
});

const orderHistory = ref([
    {
        id: 1,
        orderId: 'ORD001',
        rider: 'John Smith',
        restaurant: 'Golden Dragon Restaurant',
        assignedAt: '12:00',
        status: 'Pickup up',
        eta: '15:00'
    },
    {
        id: 2,
        orderId: 'ORD001',
        rider: 'John Smith',
        restaurant: 'Golden Dragon Restaurant',
        assignedAt: '12:00',
        status: 'Delivered',
        eta: '15:00'
    }
]);

const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'pickup up') {
        return 'bg-blue-100 text-blue-800';
    } else if (statusLower === 'delivered') {
        return 'bg-gray-100 text-gray-800';
    }
    return 'bg-gray-100 text-gray-800';
};

const availableRiders = ref([
    {
        id: 1,
        name: 'Tobi Ola',
        phone: '+2349 189 082 7632',
        rating: '4.9',
        distance: '1.2km',
        avgTime: '22m',
        deliveries: '4878',
        location: 'Aja, Lagos',
        status: 'Available'
    },
    {
        id: 2,
        name: 'Tobi Ola',
        phone: '+2349 189 082 7632',
        rating: '4.9',
        distance: '1.2km',
        avgTime: '22m',
        deliveries: '4878',
        location: 'Aja, Lagos',
        status: 'Available'
    },
    {
        id: 3,
        name: 'Tobi Ola',
        phone: '+2349 189 082 7632',
        rating: '4.9',
        distance: '1.2km',
        avgTime: '22m',
        deliveries: '4878',
        location: 'Aja, Lagos',
        status: 'Available'
    }
]);

const filteredAvailableRiders = computed(() => {
    let filtered = availableRiders.value;

    if (riderSearchQuery.value) {
        const query = riderSearchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (rider) =>
                rider.name.toLowerCase().includes(query) ||
                rider.location.toLowerCase().includes(query)
        );
    }

    return filtered;
});

const openAssignRiderModal = (order: any) => {
    selectedOrder.value = order;
    riderSearchQuery.value = '';
    showAssignRiderModal.value = true;
};

const closeAssignRiderModal = () => {
    showAssignRiderModal.value = false;
    selectedOrder.value = null;
    riderSearchQuery.value = '';
};

const assignRiderToOrder = (rider: any) => {
    selectedRider.value = rider;
    showAssignRiderModal.value = false;
    showRiderAssignedModal.value = true;
};

const closeRiderAssignedModal = () => {
    showRiderAssignedModal.value = false;
    selectedOrder.value = null;
    selectedRider.value = null;
};
</script>

