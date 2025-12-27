<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dispatch & Manual Assignment</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Monitor ride requests and assign drivers in real-time</p>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm text-gray-700 dark:text-gray-300">Auto-Assignment</span>
                <button
                    @click="autoAssignment = !autoAssignment"
                    :class="[
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                        autoAssignment ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    ]"
                >
                    <span
                        :class="[
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                            autoAssignment ? 'translate-x-5' : 'translate-x-0'
                        ]"
                    ></span>
                </button>
                <span class="text-sm font-medium" :class="autoAssignment ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'">
                    {{ autoAssignment ? 'ON' : 'OFF' }}
                </span>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <!-- Pending Requests -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Pending Requests</p>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">4</p>
                    </div>
                    <div class="flex-shrink-0 ml-4">
                        <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                            <ClockIcon class="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Available Drivers -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Available Drivers</p>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">4</p>
                    </div>
                    <div class="flex-shrink-0 ml-4">
                        <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <UserIcon class="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active Assignments -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Active Assignments</p>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">0</p>
                    </div>
                    <div class="flex-shrink-0 ml-4">
                        <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Avg Wait Time -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg Wait Time</p>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">4.2m</p>
                    </div>
                    <div class="flex-shrink-0 ml-4">
                        <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                            <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content: Three Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Ride Requests Panel (Left) -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Ride Requests</h2>
                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">4</span>
                </div>

                <!-- Tabs -->
                <div class="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                        @click="activeRequestTab = 'pending'"
                        :class="[
                            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                            activeRequestTab === 'pending'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        ]"
                    >
                        Pending
                    </button>
                    <button
                        @click="activeRequestTab = 'assigned'"
                        :class="[
                            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                            activeRequestTab === 'assigned'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        ]"
                    >
                        Assigned
                    </button>
                </div>

                <!-- Pending Requests List -->
                <div v-if="activeRequestTab === 'pending'" class="space-y-3">
                    <div 
                        v-for="request in pendingRequests" 
                        :key="request.id"
                        @click="openRequestDetailsModal(request)"
                        class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ request.id }}</span>
                                    <span 
                                        :class="[
                                            'px-2 py-0.5 text-xs font-medium rounded',
                                            request.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                        ]"
                                    >
                                        {{ request.priority }}
                                    </span>
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">{{ request.customer }}</p>
                                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <MapPinIcon class="h-3 w-3 text-green-500" />
                                    <span>{{ request.pickup }}</span>
                                </div>
                                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    <MapPinIcon class="h-3 w-3 text-red-500" />
                                    <span>{{ request.destination }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span class="text-xs text-gray-500 dark:text-gray-400">{{ request.vehicleType }}</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">{{ request.timeAgo }}</span>
                        </div>
                    </div>
                </div>

                <!-- Assigned Requests List -->
                <div v-else class="space-y-3">
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                        No assigned requests
                    </div>
                </div>
            </div>

            <!-- Live Dispatch Map Panel (Center) -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Live Dispatch Map</h2>
                    <div class="flex items-center gap-2">
                        <button class="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Zones</button>
                        <button class="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Recenter</button>
                    </div>
                </div>

                <!-- Status Indicators -->
                <div class="flex items-center gap-4 mb-4 text-xs">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        <span class="text-gray-600 dark:text-gray-400">4 Available</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-red-500"></div>
                        <span class="text-gray-600 dark:text-gray-400">4 Waiting</span>
                    </div>
                </div>

                <!-- Map View -->
                <div class="bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700" style="height: 500px;">
                    <div class="h-full flex flex-col items-center justify-center">
                        <MapPinIcon class="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
                        <p class="text-sm text-gray-500 dark:text-gray-400 text-center px-4">Interactive Map View</p>
                        <p class="text-xs text-gray-400 dark:text-gray-500 text-center px-4 mt-1">Shows driver locations, ride requests, and zones</p>
                    </div>
                </div>

                <!-- Legend -->
                <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div class="space-y-2 text-xs">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            <span class="text-gray-600 dark:text-gray-400">Available Drivers</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <span class="text-gray-600 dark:text-gray-400">Busy Drivers</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-red-500"></div>
                            <span class="text-gray-600 dark:text-gray-400">Pending Requests</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Available Drivers Panel (Right) -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Available Drivers</h2>
                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">4</span>
                </div>

                <!-- Search and Filters -->
                <div class="space-y-3 mb-4">
                    <div class="relative">
                        <input
                            v-model="driverSearchQuery"
                            type="text"
                            placeholder="Search drivers..."
                            class="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <select class="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Type</option>
                        </select>
                        <select class="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Regi</option>
                        </select>
                    </div>
                </div>

                <!-- Driver List -->
                <div class="space-y-3 max-h-[500px] overflow-y-auto">
                    <div 
                        v-for="driver in filteredDrivers" 
                        :key="driver.id"
                        class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <div class="flex items-start gap-3">
                            <div class="flex-shrink-0">
                                <div class="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ driver.name }}</span>
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">{{ driver.driverId }}</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">{{ driver.vehicle }}</p>
                                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-1">
                                    <MapPinIcon class="h-3 w-3" />
                                    <span>{{ driver.location }}</span>
                                </div>
                                <div class="flex items-center gap-1 text-xs">
                                    <StarIcon class="h-3 w-3 text-yellow-500" />
                                    <span class="text-gray-600 dark:text-gray-400">{{ driver.rating }} ({{ driver.trips }} trips)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Assignments Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Assignments</h2>
                <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
            </div>

            <div class="space-y-4">
                <div 
                    v-for="assignment in recentAssignments" 
                    :key="assignment.id"
                    class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                    <div class="flex-shrink-0">
                        <div :class="[
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            assignment.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                        ]">
                            <component :is="assignment.icon" :class="[
                                'h-5 w-5',
                                assignment.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                            ]" />
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ assignment.id }}</span>
                            <span class="text-sm text-gray-600 dark:text-gray-400">→</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ assignment.driver }}</span>
                        </div>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">{{ assignment.date }}</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Assigned by {{ assignment.assignedBy }}</p>
                        <p v-if="assignment.note" class="text-xs text-gray-500 dark:text-gray-500 italic">{{ assignment.note }}</p>
                    </div>
                    <div class="flex-shrink-0">
                        <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                            {{ assignment.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ride Request Details Modal -->
        <div
            v-if="showRequestDetailsModal && selectedRequest"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showRequestDetailsModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <MapPinIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Ride Request Details - {{ selectedRequest.id }}</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Complete information about this ride request.</p>
                        </div>
                    </div>
                    <button
                        @click="showRequestDetailsModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Rider & Trip Information -->
                    <div class="grid grid-cols-2 gap-6">
                        <!-- Left Column: Rider Details -->
                        <div class="space-y-4">
                            <div>
                                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Rider</label>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRequest.customer }}</p>
                            </div>
                            <div>
                                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                                <div class="flex items-center gap-2">
                                    <PhoneIcon class="h-4 w-4 text-gray-400" />
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRequest.phone || '+234567809' }}</p>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Vehicle Type</label>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRequest.vehicleType }}</p>
                            </div>
                        </div>

                        <!-- Right Column: Trip Details -->
                        <div class="space-y-4">
                            <div>
                                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</label>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRequest.distance || '8.5 km' }}</p>
                            </div>
                            <div>
                                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Estimated Fare</label>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">${{ selectedRequest.estimatedFare || '24.50' }}</p>
                            </div>
                            <div>
                                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Priority</label>
                                <span 
                                    :class="[
                                        'px-2 py-1 text-xs font-medium rounded',
                                        selectedRequest.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ selectedRequest.priority }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Location Section -->
                    <div class="space-y-3">
                        <!-- Pickup Location -->
                        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-4 flex items-center gap-3">
                            <MapPinIcon class="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <div class="flex-1">
                                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Pickup Location</label>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRequest.pickup }}</p>
                            </div>
                        </div>

                        <!-- Dropoff Location -->
                        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-4 flex items-center gap-3">
                            <MapPinIcon class="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <div class="flex-1">
                                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Dropoff Location</label>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRequest.destination }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Special Request Section -->
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <ClockIcon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            <label class="block text-sm font-medium text-gray-900 dark:text-white">Special Request:</label>
                        </div>
                        <textarea
                            v-model="selectedRequest.specialRequest"
                            rows="2"
                            placeholder="Special note here...."
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        ></textarea>
                    </div>

                    <!-- Recommended Drivers Section -->
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Recommended Drivers</h3>
                            <button class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Auto-Assign Best
                            </button>
                        </div>

                        <div class="space-y-3">
                            <div 
                                v-for="driver in recommendedDrivers" 
                                :key="driver.id"
                                class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                            >
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ driver.name }}</p>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">{{ driver.distance }} - {{ driver.eta }}</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="flex items-center gap-1">
                                        <StarIcon class="h-4 w-4 text-yellow-500" />
                                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ driver.rating }}</span>
                                    </div>
                                    <button
                                        @click="assignDriver(driver)"
                                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                                    >
                                        Assign
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showRequestDetailsModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

        <!-- Confirm Manual Assignment Modal -->
        <div
            v-if="showConfirmAssignmentModal && selectedRequest && selectedDriver"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="cancelAssignment"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <PaperAirplaneIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Confirm Manual Assignment</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Assign this trip to the selected driver.</p>
                        </div>
                    </div>
                    <button
                        @click="cancelAssignment"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Assignment Summary -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4 flex items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                <span class="text-white text-xs font-bold">i</span>
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-blue-900 dark:text-blue-300">
                                You are about to manually assign {{ selectedRequest.id }} to {{ selectedDriver.name }}.
                            </p>
                        </div>
                    </div>

                    <!-- Trip and Driver Details -->
                    <div class="grid grid-cols-2 gap-6">
                        <!-- Trip Column -->
                        <div>
                            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-2">Trip</label>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ selectedRequest.id }}</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedRequest.customer }}</p>
                        </div>

                        <!-- Driver Column -->
                        <div>
                            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-2">Driver</label>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ selectedDriver.name }}</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedRequest.vehicleType }}</p>
                        </div>
                    </div>

                    <!-- Key Metrics -->
                    <div class="grid grid-cols-3 gap-4">
                        <!-- Distance -->
                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</label>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedDriver.distance }}</p>
                        </div>

                        <!-- ETA -->
                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">ETA</label>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedDriver.eta }}</p>
                        </div>

                        <!-- Rating -->
                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Rating</label>
                            <div class="flex items-center justify-center gap-1">
                                <StarIcon class="h-4 w-4 text-yellow-500" />
                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedDriver.rating }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Assignment Notes -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Assignment Notes (Optional)</label>
                        <textarea
                            v-model="assignmentNotes"
                            rows="3"
                            placeholder="Add any special instructions or notes..."
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        ></textarea>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="cancelAssignment"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="confirmAssignment"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <PaperAirplaneIcon class="h-4 w-4" />
                        Confirm Assignment
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
    ClockIcon, 
    UserIcon, 
    MapPinIcon, 
    StarIcon,
    CheckCircleIcon,
    PaperAirplaneIcon,
    XMarkIcon,
    PhoneIcon
} from '@heroicons/vue/24/outline'

// Auto-Assignment Toggle
const autoAssignment = ref(true)

// Request Tab
const activeRequestTab = ref('pending')

// Request Details Modal
const showRequestDetailsModal = ref(false)
const selectedRequest = ref<any>(null)

// Pending Requests
const pendingRequests = ref([
    {
        id: 'REQ-1001',
        priority: 'urgent',
        customer: 'John Davis',
        phone: '+234567809',
        pickup: '123 Main Street, Downtown',
        destination: '456 Oak Avenue, Uptown',
        vehicleType: 'Standard',
        timeAgo: '2 min ago',
        distance: '8.5 km',
        estimatedFare: '24.50',
        specialRequest: ''
    },
    {
        id: 'REQ-1002',
        priority: 'high',
        customer: 'Sarah Johnson',
        phone: '+234567810',
        pickup: '789 Pine Street',
        destination: '321 Elm Avenue',
        vehicleType: 'Premium',
        timeAgo: '5 min ago',
        distance: '12.3 km',
        estimatedFare: '35.20',
        specialRequest: ''
    },
    {
        id: 'REQ-1003',
        priority: 'normal',
        customer: 'Mike Chen',
        phone: '+234567811',
        pickup: '555 Broadway',
        destination: '888 Market Street',
        vehicleType: 'Standard',
        timeAgo: '8 min ago',
        distance: '6.2 km',
        estimatedFare: '18.50',
        specialRequest: ''
    },
    {
        id: 'REQ-1004',
        priority: 'normal',
        customer: 'Emily Davis',
        phone: '+234567812',
        pickup: '222 First Street',
        destination: '999 Second Avenue',
        vehicleType: 'XL',
        timeAgo: '12 min ago',
        distance: '15.8 km',
        estimatedFare: '42.30',
        specialRequest: ''
    }
])

// Recommended Drivers for Request
const recommendedDrivers = ref([
    {
        id: 'DRV-501',
        name: 'James Wilson',
        distance: '0.8 km',
        eta: '3m ETA',
        rating: '4.9'
    },
    {
        id: 'DRV-504',
        name: 'Lisa Anderson',
        distance: '1.5 km',
        eta: '6m ETA',
        rating: '4.92'
    }
])

const openRequestDetailsModal = (request: any) => {
    selectedRequest.value = { ...request }
    showRequestDetailsModal.value = true
}

// Confirm Assignment Modal
const showConfirmAssignmentModal = ref(false)
const selectedDriver = ref<any>(null)
const assignmentNotes = ref('')

const assignDriver = (driver: any) => {
    selectedDriver.value = driver
    assignmentNotes.value = ''
    showConfirmAssignmentModal.value = true
}

const confirmAssignment = () => {
    // Handle driver assignment logic here
    console.log('Confirming assignment:', selectedDriver.value?.name, 'to request:', selectedRequest.value?.id, 'Notes:', assignmentNotes.value)
    showConfirmAssignmentModal.value = false
    showRequestDetailsModal.value = false
    assignmentNotes.value = ''
    selectedDriver.value = null
    // You could add logic to move request to assigned tab, etc.
}

const cancelAssignment = () => {
    showConfirmAssignmentModal.value = false
    selectedDriver.value = null
    assignmentNotes.value = ''
}


// Driver Search
const driverSearchQuery = ref('')

// Available Drivers
const availableDrivers = ref([
    {
        id: 'DRV-501',
        name: 'James Wilson',
        driverId: 'DRV-501',
        vehicle: 'Standard - Toyota Camry 2022',
        location: 'Downtown',
        rating: '4.9',
        trips: '1245'
    },
    {
        id: 'DRV-502',
        name: 'Maria Garcia',
        driverId: 'DRV-502',
        vehicle: 'Premium - BMW 5 Series 2023',
        location: 'Uptown',
        rating: '4.8',
        trips: '892'
    },
    {
        id: 'DRV-503',
        name: 'Robert Smith',
        driverId: 'DRV-503',
        vehicle: 'Standard - Honda Accord 2021',
        location: 'Midtown',
        rating: '4.7',
        trips: '654'
    },
    {
        id: 'DRV-504',
        name: 'Lisa Anderson',
        driverId: 'DRV-504',
        vehicle: 'XL - Ford Transit 2022',
        location: 'Airport',
        rating: '4.9',
        trips: '1123'
    }
])

const filteredDrivers = computed(() => {
    if (!driverSearchQuery.value) return availableDrivers.value
    const query = driverSearchQuery.value.toLowerCase()
    return availableDrivers.value.filter(driver => 
        driver.name.toLowerCase().includes(query) ||
        driver.driverId.toLowerCase().includes(query) ||
        driver.location.toLowerCase().includes(query)
    )
})

// Recent Assignments
const recentAssignments = ref([
    {
        id: 'REQ-998',
        driver: 'James Wilson',
        date: '2025-10-19 14:30',
        assignedBy: 'admin@paymax.com',
        note: 'Customer requested experienced driver',
        status: 'completed',
        icon: CheckCircleIcon
    },
    {
        id: 'REQ-999',
        driver: 'Maria Garcia',
        date: '2025-10-19 14:45',
        assignedBy: 'dispatcher@paymax.com',
        note: '',
        status: 'accepted',
        icon: PaperAirplaneIcon
    }
])
</script>

