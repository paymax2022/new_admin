<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Rider Profiles</h1>
            <div class="flex items-center gap-4">
                <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>
                <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors">
                    Export Data
                </button>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Total Riders</span>
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">{{ kpiStats.total }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Active Riders</span>
                    <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">{{ kpiStats.active }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Avg Rating</span>
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">{{ kpiStats.avgRating }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Total Earnings</span>
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">${{ kpiStats.totalEarnings }}</p>
            </div>
        </div>

        <!-- Search and Filter Bar -->
        <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-4">
                <div class="flex-1 relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Q Search by name or email"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>
                <select
                    v-model="statusFilter"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>

        <!-- Rider Profiles Table -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider Info</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings (Total Earned)</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-if="loading">
                            <td colspan="6" class="px-6 py-8 text-center">
                                <div class="flex items-center justify-center">
                                    <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span class="ml-3 text-gray-600">Loading riders...</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-else-if="riders.length === 0">
                            <td colspan="6" class="px-6 py-8 text-center text-sm text-gray-500">No riders found</td>
                        </tr>
                        <tr v-else v-for="rider in filteredRiders" :key="rider.id" class="hover:bg-gray-50 cursor-pointer" @click="openRiderModal(rider)">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold', getAvatarColor(rider.id)]">
                                        {{ rider.name.charAt(0) }}
                                    </div>
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">{{ rider.name }}</div>
                                        <div class="text-xs text-gray-500">ID: {{ rider.id }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">{{ rider.email }}</div>
                                <div class="text-sm text-gray-500">{{ rider.phone }}</div>
                                <div class="text-sm text-gray-500">{{ rider.location }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">On-time: {{ rider.performance.onTime }}%</div>
                                <div class="text-sm text-gray-900">Completion: {{ rider.performance.completion }}%</div>
                                <div class="text-sm text-gray-500">{{ rider.performance.vehicle }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${{ rider.earnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
                            </td>
                            <td class="px-6 py-4" @click.stop>
                                <div class="space-y-1">
                                    <div v-for="(doc, docIndex) in rider.documents" :key="doc.name" class="flex items-center justify-between gap-2">
                                        <span class="text-sm text-gray-900 font-medium">{{ doc.name }}:</span>
                                        <div class="relative" @click.stop>
                                            <button
                                                @click.stop="toggleDocumentDropdown(rider.id, docIndex)"
                                                :class="[
                                                    'px-3 py-1 text-xs font-medium rounded-lg transition-colors',
                                                    doc.status === 'Uploaded' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                                                    doc.status === 'Expired' ? 'bg-orange-500 text-white hover:bg-orange-600' :
                                                    'bg-red-500 text-white hover:bg-red-600'
                                                ]"
                                            >
                                                {{ doc.status }}
                                            </button>
                                            <div
                                                v-if="openDocumentDropdowns[`${rider.id}-${docIndex}`]"
                                                class="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                            >
                                                <button
                                                    @click.stop="updateDocumentStatus(rider.id, docIndex, 'Pending')"
                                                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                                                >
                                                    Pending
                                                </button>
                                                <button
                                                    @click.stop="updateDocumentStatus(rider.id, docIndex, 'Approved')"
                                                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    Approved
                                                </button>
                                                <button
                                                    @click.stop="updateDocumentStatus(rider.id, docIndex, 'Rejected')"
                                                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                                                >
                                                    Rejected
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap" @click.stop>
                                <div class="space-y-1">
                                    <div class="relative inline-block" @click.stop>
                                        <button
                                            @click.stop="toggleStatusDropdown(rider.id)"
                                            :class="[
                                                'px-3 py-1 text-xs font-medium rounded-full transition-colors',
                                                rider.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                                'bg-red-100 text-red-800 hover:bg-red-200'
                                            ]"
                                        >
                                            {{ rider.status }}
                                        </button>
                                        <div
                                            v-if="openStatusDropdowns[rider.id]"
                                            class="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                        >
                                            <button
                                                @click.stop="updateRiderStatus(rider.id, 'Active')"
                                                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                                            >
                                                Active
                                            </button>
                                            <button
                                                @click.stop="updateRiderStatus(rider.id, 'Suspended')"
                                                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Suspended
                                            </button>
                                            <button
                                                @click.stop="updateRiderStatus(rider.id, 'Inactive')"
                                                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                                            >
                                                Inactive
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1 mt-1">
                                        <span
                                            :class="[
                                                'w-2 h-2 rounded-full',
                                                rider.onlineStatus === 'Online' ? 'bg-green-500' : 'bg-gray-400'
                                            ]"
                                        ></span>
                                        <span class="text-xs text-gray-500">{{ rider.onlineStatus }}</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Rider Detail Modal -->
        <TransitionRoot appear :show="showRiderModal" as="template">
            <Dialog as="div" @close="closeRiderModal" class="relative z-50">
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
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Application ID {{ selectedRider?.applicationId || 'APP-1001' }}</span>
                                        </div>
                                        <button @click="closeRiderModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6 overflow-y-auto max-h-[80vh]">
                                    <!-- Rider Name -->
                                    <h2 class="text-2xl font-bold text-gray-900 uppercase mb-6">{{ selectedRider?.name || 'JOHN SMITH' }}</h2>

                                    <!-- Profile Section -->
                                    <div class="flex items-start gap-4 mb-6">
                                        <div class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
                                            {{ selectedRider?.name?.charAt(0) || 'J' }}
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ selectedRider?.name || 'JOHN SMITH' }}</h3>
                                            <p class="text-sm text-gray-600 mb-1">{{ selectedRider?.email || 'mama.put@gmail.com' }}</p>
                                            <p class="text-sm text-gray-600">{{ selectedRider?.phone || '+234 905 098 0955' }}</p>
                                        </div>
                                    </div>

                                    <!-- Key Details -->
                                    <div class="space-y-4 mb-6">
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm text-gray-500 mb-1">Date Joined</p>
                                                <p class="text-sm font-medium text-gray-900">{{ selectedRider?.dateJoined || '2025-08-30' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm text-gray-500 mb-1">Vehicle</p>
                                                <p class="text-sm font-medium text-gray-900">{{ selectedRider?.vehicleDetails || 'Motorbike (Honda CBR 150)' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm text-gray-500 mb-1">Ownership</p>
                                                <p class="text-sm font-medium text-gray-900">{{ selectedRider?.ownership || 'Self Owned' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm text-gray-500 mb-1">Avg. Rating</p>
                                                <div class="flex items-center gap-2">
                                                    <span class="text-sm font-medium text-gray-900">{{ selectedRider?.avgRating || '4.5' }}</span>
                                                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span class="text-xs text-gray-500">({{ selectedRider?.totalOrders || '980' }} total orders)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Documents Section -->
                                    <div class="mb-6">
                                        <div class="flex items-center gap-2 mb-4">
                                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                            <h3 class="text-lg font-bold text-gray-900">Documents</h3>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div v-for="doc in selectedRider?.documentDetails || defaultDocuments" :key="doc.name" class="border border-gray-200 rounded-lg p-4">
                                                <div class="flex items-center gap-3 mb-2">
                                                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <div class="flex-1">
                                                        <p class="text-sm font-medium text-gray-900">{{ doc.name }}</p>
                                                        <p class="text-xs text-gray-500">{{ doc.size }}</p>
                                                    </div>
                                                </div>
                                                <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                    Preview
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
                                    <button
                                        v-if="selectedRider?.status === 'Active'"
                                        @click="handleReject"
                                        class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        v-else
                                        @click="handleActivate"
                                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                    >
                                        Activate
                                    </button>
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
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Application ID {{ selectedRider?.applicationId || 'APP-1001' }}</span>
                                        </div>
                                        <button @click="closeRejectModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <h2 class="text-2xl font-bold text-gray-900 uppercase mb-4">REJECT APPLICATION — PROVIDE REASON</h2>
                                    <p class="text-sm text-gray-600 mb-6">
                                        This message will be sent to the riders. Make it specific and helpful so they can fix the issues and re-apply.
                                    </p>
                                    
                                    <div>
                                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Write rejection message (required)
                                        </label>
                                        <textarea
                                            v-model="rejectionMessage"
                                            rows="6"
                                            placeholder="Reason for rejecting the application"
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        @click="closeRejectModal"
                                        class="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        @click="sendRejection"
                                        :disabled="!rejectionMessage.trim()"
                                        :class="[
                                            'px-6 py-2 rounded-lg text-sm text-white font-medium transition-colors',
                                            rejectionMessage.trim() 
                                                ? 'bg-red-600 hover:bg-red-700' 
                                                : 'bg-gray-300 cursor-not-allowed'
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

        <!-- Reject Application Confirmation Modal -->
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
                            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Application ID {{ selectedRider?.applicationId || 'APP-1001' }}</span>
                                        </div>
                                        <button @click="closeRejectConfirmationModal" class="text-gray-500 hover:text-gray-700">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <h2 class="text-2xl font-bold text-gray-900 uppercase mb-4">REJECT APPLICATION SENT</h2>
                                    <p class="text-sm text-gray-600 leading-relaxed">
                                        The rejection message has been successfully sent to the rider.
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const searchQuery = ref('');
const statusFilter = ref('all');
const loading = ref(false);
const openDocumentDropdowns = ref<Record<string, boolean>>({});
const openStatusDropdowns = ref<Record<string, boolean>>({});
const showRiderModal = ref(false);
const showRejectModal = ref(false);
const showRejectConfirmationModal = ref(false);
const selectedRider = ref<any>(null);
const rejectionMessage = ref('');

const defaultDocuments = [
    { name: 'Driver License (Front)', size: '3.5MB' },
    { name: 'Driver License (Back)', size: '3.5MB' },
    { name: 'Vehicle Registration', size: '3.5MB' }
];

const riders = ref<any[]>([]);

// Transform API rider data to component format
const transformRiderData = (apiRider: any) => {
    const fullName = `${apiRider.first_name || ''} ${apiRider.last_name || ''}`.trim() || 'Unknown Rider';
    const location = apiRider.local_district || apiRider.address || `${apiRider.city || ''}, ${apiRider.state || ''}`.trim() || 'N/A';
    const vehicle = apiRider.vehicle_type || apiRider.transport_mode || 'N/A';
    const vehicleDetails = apiRider.vehicle_make && apiRider.vehicle_model 
        ? `${vehicle} (${apiRider.vehicle_make} ${apiRider.vehicle_model})`
        : vehicle;
    
    // Format date joined
    const dateJoined = apiRider.created_at 
        ? new Date(apiRider.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    // Build documents array from available photos
    const documents: any[] = [];
    const documentDetails: any[] = [];
    
    if (apiRider.driving_license_photo_front) {
        documents.push({ name: 'License', status: 'Uploaded' });
        documentDetails.push({ name: 'Driver License (Front)', size: '3.5MB', url: apiRider.driving_license_photo_front });
    } else {
        documents.push({ name: 'License', status: 'Pending' });
    }
    
    if (apiRider.driving_license_photo_back) {
        if (!documents.find(d => d.name === 'License')) {
            documents.push({ name: 'License', status: 'Uploaded' });
        }
        documentDetails.push({ name: 'Driver License (Back)', size: '3.5MB', url: apiRider.driving_license_photo_back });
    }
    
    if (apiRider.driver_photo) {
        documents.push({ name: 'Driver Photo', status: 'Uploaded' });
        documentDetails.push({ name: 'Driver Photo', size: '3.5MB', url: apiRider.driver_photo });
    } else {
        documents.push({ name: 'Driver Photo', status: 'Pending' });
    }
    
    if (apiRider.vehicle_image) {
        documents.push({ name: 'Vehicle', status: 'Uploaded' });
        documentDetails.push({ name: 'Vehicle Registration', size: '3.5MB', url: apiRider.vehicle_image });
    } else {
        documents.push({ name: 'Vehicle', status: 'Pending' });
    }
    
    // Map status
    let status = 'Inactive';
    let onlineStatus = 'Offline';
    if (apiRider.status === 'online' || apiRider.status === 'active') {
        status = 'Active';
        onlineStatus = 'Online';
    } else if (apiRider.status === 'suspended' || apiRider.status === 'offline') {
        status = 'Suspended';
        onlineStatus = 'Offline';
    }
    
    // Default performance metrics (not in API)
    const performance = {
        onTime: 94, // Default value
        completion: 98, // Default value
        vehicle: vehicle
    };
    
    // Default earnings (not in API)
    const earnings = 0; // Default value
    
    return {
        id: apiRider._id || apiRider.id || 'N/A',
        name: fullName,
        email: apiRider.email || 'N/A',
        phone: apiRider.phone_number || apiRider.phone || 'N/A',
        location: location,
        applicationId: `APP-${(apiRider._id || apiRider.id || '').substring(0, 8).toUpperCase()}`,
        dateJoined: dateJoined,
        vehicleDetails: vehicleDetails,
        ownership: apiRider.vehicle_ownership === 'owned' ? 'Self Owned' : 'Rented',
        avgRating: '4.5', // Default - API doesn't provide this
        totalOrders: '0', // Default - API doesn't provide this
        performance: performance,
        earnings: earnings,
        documents: documents,
        documentDetails: documentDetails.length > 0 ? documentDetails : defaultDocuments,
        status: status,
        onlineStatus: onlineStatus,
        _original: apiRider
    };
};

// Fetch all riders
const fetchRiders = async () => {
    loading.value = true;
    try {
        const response = await restaurantService.getRiders();
        const ridersData = response.data?.riders || response.riders || [];
        
        if (Array.isArray(ridersData)) {
            riders.value = ridersData.map(transformRiderData);
        } else {
            riders.value = [];
        }
        
        if (riders.value.length === 0) {
            toast.info('No riders found');
        } else {
            toast.success(`Loaded ${riders.value.length} rider(s)`);
        }
    } catch (error: any) {
        console.error('Error fetching riders:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load riders';
        toast.error(errorMessage);
        riders.value = [];
    } finally {
        loading.value = false;
    }
};

// KPI Stats computed from riders data
const kpiStats = computed(() => {
    const total = riders.value.length;
    const active = riders.value.filter(r => r.status === 'Active').length;
    const avgRating = total > 0 ? '4.5' : '0.0'; // Default rating since API doesn't provide
    const totalEarnings = riders.value.reduce((sum, r) => sum + (r.earnings || 0), 0);
    const earningsFormatted = totalEarnings >= 1000 
        ? `${(totalEarnings / 1000).toFixed(0)}K` 
        : totalEarnings.toFixed(0);
    
    return {
        total,
        active,
        avgRating,
        totalEarnings: earningsFormatted
    };
});

const filteredRiders = computed(() => {
    let filtered = riders.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (rider) =>
                rider.name.toLowerCase().includes(query) ||
                rider.email.toLowerCase().includes(query)
        );
    }

    // Filter by status
    if (statusFilter.value !== 'all') {
        filtered = filtered.filter(
            (rider) => rider.status.toLowerCase() === statusFilter.value.toLowerCase()
        );
    }

    return filtered;
});

const getAvatarColor = (id: string) => {
    const colors = ['bg-green-500', 'bg-amber-700', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
    const index = parseInt(id.replace('R', '')) % colors.length;
    return colors[index] || 'bg-gray-500';
};

const toggleDocumentDropdown = (riderId: string, docIndex: number) => {
    const key = `${riderId}-${docIndex}`;
    // Close all other dropdowns
    Object.keys(openDocumentDropdowns.value).forEach(k => {
        if (k !== key) {
            openDocumentDropdowns.value[k] = false;
        }
    });
    Object.keys(openStatusDropdowns.value).forEach(k => {
        openStatusDropdowns.value[k] = false;
    });
    openDocumentDropdowns.value[key] = !openDocumentDropdowns.value[key];
};

const toggleStatusDropdown = (riderId: string) => {
    // Close all other dropdowns
    Object.keys(openDocumentDropdowns.value).forEach(k => {
        openDocumentDropdowns.value[k] = false;
    });
    Object.keys(openStatusDropdowns.value).forEach(k => {
        if (k !== riderId) {
            openStatusDropdowns.value[k] = false;
        }
    });
    openStatusDropdowns.value[riderId] = !openStatusDropdowns.value[riderId];
};

const updateDocumentStatus = (riderId: string, docIndex: number, status: string) => {
    const rider = riders.value.find(r => r.id === riderId);
    if (rider && rider.documents[docIndex]) {
        // Map "Approved" to "Uploaded" for display
        if (status === 'Approved') {
            rider.documents[docIndex].status = 'Uploaded';
        } else if (status === 'Rejected') {
            rider.documents[docIndex].status = 'Rejected';
        } else {
            rider.documents[docIndex].status = 'Expired';
        }
    }
    openDocumentDropdowns.value[`${riderId}-${docIndex}`] = false;
};

const updateRiderStatus = async (riderId: string, status: string) => {
    const rider = riders.value.find(r => r.id === riderId);
    if (!rider) {
        toast.error('Rider not found');
        return;
    }

    // Map UI status to API status
    const statusMap: { [key: string]: string } = {
        'Active': 'active',
        'Suspended': 'suspended',
        'Inactive': 'inactive'
    };
    const apiStatus = statusMap[status] || status.toLowerCase();

    try {
        await restaurantService.updateRiderStatus(riderId, apiStatus);
        
        // Update local state
        rider.status = status;
        
        // Update online status based on new status
        if (status === 'Active') {
            rider.onlineStatus = 'Online';
        } else {
            rider.onlineStatus = 'Offline';
        }
        
        toast.success(`Rider status updated to ${status}`);
        openStatusDropdowns.value[riderId] = false;
    } catch (error: any) {
        console.error('Error updating rider status:', error);
        const errorMessage = error.response?.data?.message || 'Failed to update rider status';
        toast.error(errorMessage);
    }
};

const closeAllDropdowns = () => {
    Object.keys(openDocumentDropdowns.value).forEach(k => {
        openDocumentDropdowns.value[k] = false;
    });
    Object.keys(openStatusDropdowns.value).forEach(k => {
        openStatusDropdowns.value[k] = false;
    });
};

onMounted(() => {
    document.addEventListener('click', closeAllDropdowns);
    fetchRiders();
});

onUnmounted(() => {
    document.removeEventListener('click', closeAllDropdowns);
});

const openRiderModal = (rider: any) => {
    selectedRider.value = rider;
    showRiderModal.value = true;
};

const closeRiderModal = () => {
    showRiderModal.value = false;
    selectedRider.value = null;
};

const handleActivate = async () => {
    if (!selectedRider.value) {
        return;
    }

    try {
        await restaurantService.updateRiderStatus(selectedRider.value.id, 'active');
        selectedRider.value.status = 'Active';
        selectedRider.value.onlineStatus = 'Online';
        
        // Update in main list
        const rider = riders.value.find(r => r.id === selectedRider.value.id);
        if (rider) {
            rider.status = 'Active';
            rider.onlineStatus = 'Online';
        }
        
        toast.success('Rider activated successfully');
        closeRiderModal();
    } catch (error: any) {
        console.error('Error activating rider:', error);
        const errorMessage = error.response?.data?.message || 'Failed to activate rider';
        toast.error(errorMessage);
    }
};

const handleReject = () => {
    showRiderModal.value = false;
    showRejectModal.value = true;
    rejectionMessage.value = '';
};

const closeRejectModal = () => {
    showRejectModal.value = false;
    rejectionMessage.value = '';
};

const sendRejection = async () => {
    if (!rejectionMessage.value.trim()) {
        return;
    }
    
    if (!selectedRider.value) {
        return;
    }

    try {
        await restaurantService.updateRiderStatus(selectedRider.value.id, 'suspended');
        selectedRider.value.status = 'Suspended';
        selectedRider.value.onlineStatus = 'Offline';
        
        // Update in main list
        const rider = riders.value.find(r => r.id === selectedRider.value.id);
        if (rider) {
            rider.status = 'Suspended';
            rider.onlineStatus = 'Offline';
        }
        
        showRejectModal.value = false;
        showRejectConfirmationModal.value = true;
    } catch (error: any) {
        console.error('Error rejecting rider:', error);
        const errorMessage = error.response?.data?.message || 'Failed to reject rider';
        toast.error(errorMessage);
    }
};

const closeRejectConfirmationModal = () => {
    showRejectConfirmationModal.value = false;
    rejectionMessage.value = '';
    closeRiderModal();
};
</script>

