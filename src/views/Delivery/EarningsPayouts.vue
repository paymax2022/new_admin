<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Earnings & Payouts</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">Manage driver payouts and financial reconciliation</p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <!-- Gross Earnings Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2">
                            <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Gross Earnings</p>
                        </div>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">₦{{ earningsStats.grossEarnings.toLocaleString() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">15% average</p>
                    </div>
                </div>
            </div>

            <!-- Net Earnings Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2">
                            <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Net Earnings</p>
                        </div>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">₦{{ earningsStats.netEarnings.toLocaleString() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">15% average</p>
                    </div>
                </div>
            </div>

            <!-- Pending Payouts Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2">
                            <CurrencyDollarIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Payouts</p>
                        </div>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">₦{{ earningsStats.pendingPayouts.toLocaleString() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">15% average</p>
                    </div>
                </div>
            </div>

            <!-- Adjustments Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2">
                            <DocumentTextIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Adjustments</p>
                        </div>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">2</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">This period</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation Tabs and Action Buttons -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <!-- Tabs -->
                <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700 md:border-b-0">
                    <button
                        v-for="tab in tabs"
                        :key="tab.id"
                        @click="activeTab = tab.id"
                        :class="[
                            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                            activeTab === tab.id
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        ]"
                    >
                        {{ tab.label }}
                    </button>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-2">
                    <button v-if="activeTab === 'payouts'" class="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export CSV
                    </button>
                    <button 
                        v-if="activeTab === 'payouts'"
                        @click="openBatchPayoutModal"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Process Batch Payout
                    </button>
                    <button 
                        v-if="activeTab === 'commission-rules'"
                        @click="openNewRuleModal"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <PlusIcon class="h-4 w-4" />
                        New Rule
                    </button>
                </div>
            </div>
        </div>

        <!-- Search and Filter Bar -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <!-- Search Bar -->
                <div class="flex-1">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search payouts..."
                            class="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <!-- Status Filter -->
                <div class="relative" ref="statusDropdownRef">
                    <button
                        @click.stop="toggleStatusDropdown"
                        class="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 min-w-[140px]"
                    >
                        {{ selectedStatus }}
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div
                        v-if="showStatusDropdown"
                        @click.stop
                        class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                    >
                        <div class="py-1">
                            <button
                                v-for="status in statusOptions"
                                :key="status"
                                @click="selectStatus(status)"
                                :class="[
                                    'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                    selectedStatus === status ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                ]"
                            >
                                {{ status }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Manual Adjustment Button -->
                <button 
                    @click="openManualAdjustmentModal"
                    class="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2"
                >
                    <PencilIcon class="h-4 w-4" />
                    Manual Adjustment
                </button>
            </div>
        </div>

        <!-- Payouts Table -->
        <div v-if="activeTab === 'payouts'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th class="px-6 py-3 text-left">
                                <input
                                    type="checkbox"
                                    @change="toggleAllSelection"
                                    :checked="allSelected"
                                    class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                                />
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payout ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Driver</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Earnings</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Commission</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Adjustments</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Net Amount</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trips</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr 
                            v-for="payout in filteredPayouts" 
                            :key="payout.id"
                            class="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    :checked="selectedPayouts.includes(payout.id)"
                                    @change="togglePayoutSelection(payout.id)"
                                    class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                                />
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ payout.id }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ payout.driverName }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ payout.driverId }}</p>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-medium text-gray-900 dark:text-white">${{ payout.earnings.toFixed(2) }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-medium text-red-600 dark:text-red-400">-${{ payout.commission.toFixed(2) }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span 
                                    :class="[
                                        'text-sm font-medium',
                                        payout.adjustments >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                    ]"
                                >
                                    {{ payout.adjustments >= 0 ? '+' : '' }}${{ payout.adjustments.toFixed(2) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">${{ payout.netAmount.toFixed(2) }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ payout.trips }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span 
                                    :class="[
                                        'px-2 py-1 text-xs font-medium rounded',
                                        payout.status === 'completed' ? 'bg-gray-900 dark:bg-gray-700 text-white' :
                                        payout.status === 'pending' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
                                        payout.status === 'failed' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                                        'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ payout.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Adjustments Tab Content -->
        <div v-if="activeTab === 'adjustments'" class="space-y-6">
            <!-- Adjustments Header -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ adjustments.length }} total adjustments</p>
                    <button 
                        @click="openManualAdjustmentModal"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <PlusIcon class="h-4 w-4" />
                        New Adjustment
                    </button>
                </div>
            </div>

            <!-- Adjustments Table -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Adj ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created By</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr 
                                v-for="adjustment in adjustments" 
                                :key="adjustment.id"
                                class="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ adjustment.id }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ adjustment.targetName }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ adjustment.targetId }}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span 
                                        :class="[
                                            'px-2 py-1 text-xs font-medium rounded',
                                            adjustment.type === 'positive' 
                                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                        ]"
                                    >
                                        @ {{ adjustment.type }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span 
                                        :class="[
                                            'text-sm font-medium',
                                            adjustment.type === 'positive' 
                                                ? 'text-green-600 dark:text-green-400' 
                                                : 'text-red-600 dark:text-red-400'
                                        ]"
                                    >
                                        {{ adjustment.type === 'positive' ? '+' : '-' }}${{ Math.abs(adjustment.amount).toFixed(2) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ adjustment.category }}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ adjustment.reason }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ adjustment.createdBy }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ adjustment.date }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-700 text-white rounded">
                                        {{ adjustment.status }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Commission Rules Tab Content -->
        <div v-if="activeTab === 'commission-rules'" class="space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ commissionRules.length }} active rules</p>
            </div>

            <!-- Commission Rules Cards -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Standard Driver - 20% Rule -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Standard Driver - 20%</h3>
                        <div class="flex items-center gap-2">
                            <button class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <PencilIcon class="h-4 w-4" />
                            </button>
                            <button class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-2 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-700 text-white rounded">active</span>
                        <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">percentage</span>
                    </div>
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Vehicle Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Standard</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Partner Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Individual</span>
                        </div>
                        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-3">
                            <p class="text-sm font-medium text-blue-900 dark:text-blue-300">20% of trip fare</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                            <span class="text-sm text-gray-900 dark:text-white">2025-01-01</span>
                        </div>
                    </div>
                </div>

                <!-- Premium Driver - 15% Rule -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Premium Driver - 15%</h3>
                        <div class="flex items-center gap-2">
                            <button class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <PencilIcon class="h-4 w-4" />
                            </button>
                            <button class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-2 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-700 text-white rounded">active</span>
                        <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">percentage</span>
                    </div>
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Vehicle Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Premium</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Partner Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Individual</span>
                        </div>
                        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-3">
                            <p class="text-sm font-medium text-blue-900 dark:text-blue-300">15% of trip fare</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                            <span class="text-sm text-gray-900 dark:text-white">2025-01-01</span>
                        </div>
                    </div>
                </div>

                <!-- Airport Flat Fee Rule -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Airport Flat Fee</h3>
                        <div class="flex items-center gap-2">
                            <button class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <PencilIcon class="h-4 w-4" />
                            </button>
                            <button class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-2 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-700 text-white rounded">active</span>
                        <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">fixed</span>
                    </div>
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Vehicle Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">XL</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Partner Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Individual</span>
                        </div>
                        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-3">
                            <p class="text-sm font-medium text-green-900 dark:text-green-300">$5.00 per trip</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                            <span class="text-sm text-gray-900 dark:text-white">2025-03-01</span>
                        </div>
                    </div>
                </div>

                <!-- Fleet Partnership - Tiered Rule -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Fleet Partnership - Tiered</h3>
                        <div class="flex items-center gap-2">
                            <button class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <PencilIcon class="h-4 w-4" />
                            </button>
                            <button class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-2 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-700 text-white rounded">active</span>
                        <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">tiered</span>
                    </div>
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Vehicle Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">All</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Partner Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Fleet</span>
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">0 - 100 trips</span>
                                <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-medium">18%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">101 - 500 trips</span>
                                <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-medium">16%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">501 - ∞ trips</span>
                                <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-medium">12%</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                            <span class="text-sm text-gray-900 dark:text-white">2025-02-15</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Other Tabs Placeholder -->
        <div v-if="activeTab === 'refunds'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <p class="text-gray-500 dark:text-gray-400">{{ tabs.find(t => t.id === activeTab)?.label }} content coming soon</p>
        </div>

        <!-- Process Batch Payout Modal -->
        <div
            v-if="showBatchPayoutModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showBatchPayoutModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <PaperAirplaneIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Process Batch Payout</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Process multiple payouts to drivers simultaneously</p>
                        </div>
                    </div>
                    <button
                        @click="showBatchPayoutModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Summary Section -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4 flex items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                <span class="text-white text-xs font-bold">i</span>
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-blue-900 dark:text-blue-300 mb-2">You have selected</p>
                            <p class="text-3xl font-bold text-blue-900 dark:text-blue-300">{{ selectedPayoutsCount }}</p>
                            <p class="text-sm text-blue-900 dark:text-blue-300 mt-2">payouts totaling</p>
                            <p class="text-2xl font-bold text-blue-900 dark:text-blue-300">${{ selectedPayoutsTotal.toFixed(2) }}</p>
                        </div>
                    </div>

                    <!-- Payout Details Section -->
                    <div v-if="selectedPayoutsList.length > 0">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Payout Details</h3>
                        <div class="space-y-4">
                            <div 
                                v-for="payout in selectedPayoutsList" 
                                :key="payout.id"
                                class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <div class="flex items-center justify-between">
                                    <div class="flex-1">
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ payout.driverName }}</p>
                                        <p class="text-xs text-gray-600 dark:text-gray-400">{{ payout.id }} ****-{{ getLastFourDigits(payout.id) }}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white">${{ payout.netAmount.toFixed(2) }}</p>
                                        <p class="text-xs text-gray-600 dark:text-gray-400">{{ payout.trips }} trips</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Warning Section -->
                    <div class="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-4 flex items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="w-6 h-6 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center">
                                <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-red-800 dark:text-red-300">
                                This action cannot be undone. Ensure all payout amounts are correct before proceeding.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showBatchPayoutModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="processBatchPayout"
                        :disabled="selectedPayoutsCount === 0"
                        :class="[
                            'px-4 py-2 rounded-lg text-sm font-medium',
                            selectedPayoutsCount === 0
                                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
                        ]"
                    >
                        Process {{ selectedPayoutsCount }} Payout{{ selectedPayoutsCount !== 1 ? 's' : '' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Manual Adjustment Modal -->
        <div
            v-if="showManualAdjustmentModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showManualAdjustmentModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <PencilIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Manual Adjustment</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Apply a manual adjustment with mandatory reason for audit trail</p>
                        </div>
                    </div>
                    <button
                        @click="showManualAdjustmentModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Information Box -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4 flex items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                <span class="text-white text-xs font-bold">i</span>
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-blue-900 dark:text-blue-300">
                                All adjustments are logged for audit purposes with timestamp and user information.
                            </p>
                        </div>
                    </div>

                    <!-- Target Driver -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Target Driver <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                            <select
                                v-model="manualAdjustment.targetDriver"
                                class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                            >
                                <option value="">Select driver</option>
                                <option v-for="driver in availableDrivers" :key="driver.id" :value="driver.id">
                                    {{ driver.name }} ({{ driver.id }})
                                </option>
                            </select>
                            <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <!-- Adjustment Type -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                            Adjustment Type <span class="text-red-500">*</span>
                        </label>
                        <div class="space-y-3">
                            <!-- Positive Adjustment -->
                            <label class="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="manualAdjustment.adjustmentType === 'positive' ? 'border-green-500 dark:border-green-400' : 'border-gray-200 dark:border-gray-700'"
                            >
                                <input
                                    type="radio"
                                    v-model="manualAdjustment.adjustmentType"
                                    value="positive"
                                    class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                />
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Positive Adjustment</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Add to driver earnings</p>
                                </div>
                            </label>

                            <!-- Negative Adjustment -->
                            <label class="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="manualAdjustment.adjustmentType === 'negative' ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'"
                            >
                                <input
                                    type="radio"
                                    v-model="manualAdjustment.adjustmentType"
                                    value="negative"
                                    class="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                />
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                            </svg>
                                        </div>
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Negative Adjustment</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Deduct from driver earnings</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Amount -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Amount ($) <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            v-model.number="manualAdjustment.amount"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Category -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Category <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                            <select
                                v-model="manualAdjustment.category"
                                class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                            >
                                <option value="">Select category</option>
                                <option value="bonus">Bonus</option>
                                <option value="penalty">Penalty</option>
                                <option value="correction">Correction</option>
                                <option value="refund">Refund</option>
                                <option value="other">Other</option>
                            </select>
                            <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <!-- Reason -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Reason (Required for Audit) <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            v-model="manualAdjustment.reason"
                            rows="4"
                            placeholder="Enter detailed reason for this adjustment..."
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        ></textarea>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">This will be recorded in the audit log</p>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showManualAdjustmentModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="applyManualAdjustment"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Apply Adjustment
                    </button>
                </div>
            </div>
        </div>

        <!-- Create Commission Rule Modal -->
        <div
            v-if="showNewRuleModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showNewRuleModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <CogIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Create Commission Rule</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Configure commission rules for different vehicle types and partnerships</p>
                        </div>
                    </div>
                    <button
                        @click="showNewRuleModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Rule Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Rule Name <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="newRule.ruleName"
                            type="text"
                            placeholder="e.g., Standard Driver - 20%"
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Vehicle Type and Partner Type -->
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Vehicle Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Vehicle Type <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <select
                                    v-model="newRule.vehicleType"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                                >
                                    <option value="">Select type</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                    <option value="XL">XL</option>
                                    <option value="All">All</option>
                                </select>
                                <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <!-- Partner Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Partner Type <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <select
                                    v-model="newRule.partnerType"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                                >
                                    <option value="">Select type</option>
                                    <option value="Individual">Individual</option>
                                    <option value="Fleet">Fleet</option>
                                </select>
                                <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Commission Type -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                            Commission Type <span class="text-red-500">*</span>
                        </label>
                        <div class="space-y-3">
                            <!-- Percentage -->
                            <label class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="newRule.commissionType === 'percentage' ? 'border-gray-900 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'"
                            >
                                <input
                                    type="radio"
                                    v-model="newRule.commissionType"
                                    value="percentage"
                                    class="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300"
                                />
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Percentage</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Commission as % of trip fare</p>
                                </div>
                            </label>

                            <!-- Fixed Amount -->
                            <label class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="newRule.commissionType === 'fixed' ? 'border-gray-900 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'"
                            >
                                <input
                                    type="radio"
                                    v-model="newRule.commissionType"
                                    value="fixed"
                                    class="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300"
                                />
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Fixed Amount</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Fixed commission per trip</p>
                                </div>
                            </label>

                            <!-- Tiered -->
                            <label class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="newRule.commissionType === 'tiered' ? 'border-gray-900 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'"
                            >
                                <input
                                    type="radio"
                                    v-model="newRule.commissionType"
                                    value="tiered"
                                    class="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300"
                                />
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Tiered (Volume-based)</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Different rates based on trip volume</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Percentage Commission Input -->
                    <div v-if="newRule.commissionType === 'percentage'">
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Commission Percentage (%) <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                v-model.number="newRule.percentage"
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                placeholder="0.0"
                                class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span class="text-sm text-gray-600 dark:text-gray-400">%</span>
                        </div>
                    </div>

                    <!-- Fixed Commission Amount Input -->
                    <div v-if="newRule.commissionType === 'fixed'">
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Fixed Commission Amount ($) <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                v-model.number="newRule.fixedAmount"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button class="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                                $
                            </button>
                        </div>
                    </div>

                    <!-- Tiered Structure -->
                    <div v-if="newRule.commissionType === 'tiered'">
                        <div class="flex items-center justify-between mb-4">
                            <label class="block text-sm font-medium text-gray-900 dark:text-white">
                                Tiered Structure
                            </label>
                            <button
                                @click="addTier"
                                class="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 flex items-center gap-1"
                            >
                                <PlusIcon class="h-3 w-3" />
                                Add Tier
                            </button>
                        </div>
                        <div class="space-y-3">
                            <div 
                                v-for="(tier, index) in newRule.tiers" 
                                :key="index"
                                class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">Tier {{ index + 1 }}</span>
                                    <button
                                        @click="removeTier(index)"
                                        class="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                    >
                                        <TrashIcon class="h-4 w-4" />
                                    </button>
                                </div>
                                <div class="grid grid-cols-3 gap-3">
                                    <div>
                                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Min Trips</label>
                                        <input
                                            v-model.number="tier.minTrips"
                                            type="number"
                                            min="0"
                                            class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Max Trips</label>
                                        <input
                                            v-model.number="tier.maxTrips"
                                            type="number"
                                            min="0"
                                            :placeholder="index === newRule.tiers.length - 1 ? '∞' : ''"
                                            class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Rate (%)</label>
                                        <input
                                            v-model.number="tier.rate"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeNewRuleModal"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="createCommissionRule"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Create Rule
                    </button>
                </div>
            </div>
        </div>

        <!-- Create Commission Rule Modal -->
        <div
            v-if="showNewRuleModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showNewRuleModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <CogIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Create Commission Rule</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Configure commission rules for different vehicle types and partnerships</p>
                        </div>
                    </div>
                    <button
                        @click="showNewRuleModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Rule Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Rule Name <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="newRule.ruleName"
                            type="text"
                            placeholder="e.g., Standard Driver - 20%"
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Vehicle Type and Partner Type -->
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Vehicle Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Vehicle Type <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <select
                                    v-model="newRule.vehicleType"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                                >
                                    <option value="">Select type</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                    <option value="XL">XL</option>
                                    <option value="All">All</option>
                                </select>
                                <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <!-- Partner Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Partner Type <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <select
                                    v-model="newRule.partnerType"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                                >
                                    <option value="">Select type</option>
                                    <option value="Individual">Individual</option>
                                    <option value="Fleet">Fleet</option>
                                </select>
                                <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Commission Type -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                            Commission Type <span class="text-red-500">*</span>
                        </label>
                        <div class="space-y-3">
                            <!-- Percentage -->
                            <label class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="newRule.commissionType === 'percentage' ? 'border-gray-900 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'"
                            >
                                <input
                                    type="radio"
                                    v-model="newRule.commissionType"
                                    value="percentage"
                                    class="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300"
                                />
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Percentage</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Commission as % of trip fare</p>
                                </div>
                            </label>

                            <!-- Fixed Amount -->
                            <label class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="newRule.commissionType === 'fixed' ? 'border-gray-900 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'"
                            >
                                <input
                                    type="radio"
                                    v-model="newRule.commissionType"
                                    value="fixed"
                                    class="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300"
                                />
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Fixed Amount</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Fixed commission per trip</p>
                                </div>
                            </label>

                            <!-- Tiered -->
                            <label class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="newRule.commissionType === 'tiered' ? 'border-gray-900 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'"
                            >
                                <input
                                    type="radio"
                                    v-model="newRule.commissionType"
                                    value="tiered"
                                    class="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300"
                                />
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Tiered (Volume-based)</span>
                                    </div>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Different rates based on trip volume</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Percentage Commission Input -->
                    <div v-if="newRule.commissionType === 'percentage'">
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Commission Percentage (%) <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                v-model.number="newRule.percentage"
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                placeholder="0.0"
                                class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span class="text-sm text-gray-600 dark:text-gray-400">%</span>
                        </div>
                    </div>

                    <!-- Fixed Commission Amount Input -->
                    <div v-if="newRule.commissionType === 'fixed'">
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Fixed Commission Amount ($) <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                v-model.number="newRule.fixedAmount"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button class="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                                $
                            </button>
                        </div>
                    </div>

                    <!-- Tiered Structure -->
                    <div v-if="newRule.commissionType === 'tiered'">
                        <div class="flex items-center justify-between mb-4">
                            <label class="block text-sm font-medium text-gray-900 dark:text-white">
                                Tiered Structure
                            </label>
                            <button
                                @click="addTier"
                                class="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 flex items-center gap-1"
                            >
                                <PlusIcon class="h-3 w-3" />
                                Add Tier
                            </button>
                        </div>
                        <div class="space-y-3">
                            <div 
                                v-for="(tier, index) in newRule.tiers" 
                                :key="index"
                                class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">Tier {{ index + 1 }}</span>
                                    <button
                                        @click="removeTier(index)"
                                        class="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                    >
                                        <TrashIcon class="h-4 w-4" />
                                    </button>
                                </div>
                                <div class="grid grid-cols-3 gap-3">
                                    <div>
                                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Min Trips</label>
                                        <input
                                            v-model.number="tier.minTrips"
                                            type="number"
                                            min="0"
                                            class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Max Trips</label>
                                        <input
                                            v-model.number="tier.maxTrips"
                                            type="number"
                                            min="0"
                                            :placeholder="index === newRule.tiers.length - 1 ? '∞' : ''"
                                            class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Rate (%)</label>
                                        <input
                                            v-model.number="tier.rate"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeNewRuleModal"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="createCommissionRule"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Create Rule
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from 'vue-toastification'
import { 
    CurrencyDollarIcon,
    DocumentTextIcon,
    PencilIcon,
    PaperAirplaneIcon,
    XMarkIcon,
    PlusIcon,
    TrashIcon
} from '@heroicons/vue/24/outline'
import deliveryService from '@/services/deliveryService'

const toast = useToast()
const earningsStats = ref({
    grossEarnings: 0,
    netEarnings: 0,
    pendingPayouts: 0,
    adjustments: 0
})

// Fetch earnings data
const fetchEarningsData = async () => {
    try {
        const today = new Date().toISOString().split('T')[0]
        // Note: Would need to aggregate from multiple riders or use a summary endpoint if available
        // For now, we'll fetch earnings for a date range
        // const response = await deliveryService.getRiderEarnings(today)
    } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to load earnings data')
    }
}

// Tabs
const tabs = [
    { id: 'payouts', label: 'Payouts' },
    { id: 'adjustments', label: 'Adjustments' },
    { id: 'refunds', label: 'Refunds' },
    { id: 'commission-rules', label: 'Commission Rules' }
]
const activeTab = ref('payouts')

// Search and Filter
const searchQuery = ref('')
const selectedStatus = ref('All Status')
const showStatusDropdown = ref(false)
const statusDropdownRef = ref<HTMLElement | null>(null)

const statusOptions = ['All Status', 'Pending', 'Completed', 'Failed']

const toggleStatusDropdown = () => {
    showStatusDropdown.value = !showStatusDropdown.value
}

const selectStatus = (status: string) => {
    selectedStatus.value = status
    showStatusDropdown.value = false
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
    if (statusDropdownRef.value && !statusDropdownRef.value.contains(event.target as Node)) {
        showStatusDropdown.value = false
    }
}

onMounted(async () => {
    document.addEventListener('click', handleClickOutside)
    await fetchEarningsData()
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

// Payouts Data
const payouts = ref([
    {
        id: 'PAY-1001',
        driverName: 'James Wilson',
        driverId: 'DRV-501',
        earnings: 1500.00,
        commission: 255.50,
        adjustments: -10.00,
        netAmount: 1234.50,
        trips: 45,
        status: 'pending'
    },
    {
        id: 'PAY-1002',
        driverName: 'Maria Garcia',
        driverId: 'DRV-502',
        earnings: 1200.00,
        commission: 212.75,
        adjustments: 0.00,
        netAmount: 987.25,
        trips: 38,
        status: 'completed'
    },
    {
        id: 'PAY-1003',
        driverName: 'Robert Taylor',
        driverId: 'DRV-503',
        earnings: 2100.00,
        commission: 343.20,
        adjustments: 0.00,
        netAmount: 1756.80,
        trips: 62,
        status: 'pending'
    },
    {
        id: 'PAY-1004',
        driverName: 'Lisa Anderson',
        driverId: 'DRV-504',
        earnings: 650.00,
        commission: 106.80,
        adjustments: 0.00,
        netAmount: 543.20,
        trips: 22,
        status: 'failed'
    }
])

// Selection
const selectedPayouts = ref<string[]>([])

const togglePayoutSelection = (payoutId: string) => {
    const index = selectedPayouts.value.indexOf(payoutId)
    if (index > -1) {
        selectedPayouts.value.splice(index, 1)
    } else {
        selectedPayouts.value.push(payoutId)
    }
}

const toggleAllSelection = () => {
    if (allSelected.value) {
        selectedPayouts.value = []
    } else {
        selectedPayouts.value = filteredPayouts.value.map(p => p.id)
    }
}

const allSelected = computed(() => {
    return filteredPayouts.value.length > 0 && selectedPayouts.value.length === filteredPayouts.value.length
})

// Filtered Payouts
const filteredPayouts = computed(() => {
    let result = payouts.value

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(payout => 
            payout.id.toLowerCase().includes(query) ||
            payout.driverName.toLowerCase().includes(query) ||
            payout.driverId.toLowerCase().includes(query)
        )
    }

    // Filter by status
    if (selectedStatus.value !== 'All Status') {
        result = result.filter(payout => payout.status === selectedStatus.value.toLowerCase())
    }

    return result
})

// Batch Payout Modal
const showBatchPayoutModal = ref(false)

const selectedPayoutsCount = computed(() => {
    return selectedPayouts.value.length
})

const selectedPayoutsTotal = computed(() => {
    return payouts.value
        .filter(payout => selectedPayouts.value.includes(payout.id))
        .reduce((sum, payout) => sum + payout.netAmount, 0)
})

const selectedPayoutsList = computed(() => {
    return payouts.value.filter(payout => selectedPayouts.value.includes(payout.id))
})

const getLastFourDigits = (payoutId: string) => {
    // Extract last 4 characters or generate a mock number
    const match = payoutId.match(/\d+$/)
    if (match) {
        const num = match[0]
        return num.slice(-4).padStart(4, '0')
    }
    return '1234'
}

const openBatchPayoutModal = () => {
    showBatchPayoutModal.value = true
}

const processBatchPayout = () => {
    if (selectedPayoutsCount.value === 0) return
    
    // Handle batch payout processing logic here
    console.log('Processing batch payout for:', selectedPayouts.value)
    console.log('Total amount:', selectedPayoutsTotal.value)
    
    // You could add logic to update payout statuses, send notifications, etc.
    showBatchPayoutModal.value = false
    selectedPayouts.value = []
}

// Manual Adjustment Modal
const showManualAdjustmentModal = ref(false)

const manualAdjustment = ref({
    targetDriver: '',
    adjustmentType: 'positive',
    amount: 0.00,
    category: '',
    reason: ''
})

const availableDrivers = computed(() => {
    return payouts.value.map(payout => ({
        id: payout.driverId,
        name: payout.driverName
    }))
})

const openManualAdjustmentModal = () => {
    manualAdjustment.value = {
        targetDriver: '',
        adjustmentType: 'positive',
        amount: 0.00,
        category: '',
        reason: ''
    }
    showManualAdjustmentModal.value = true
}

const applyManualAdjustment = () => {
    // Validate required fields
    if (!manualAdjustment.value.targetDriver || !manualAdjustment.value.adjustmentType || 
        !manualAdjustment.value.amount || !manualAdjustment.value.category || !manualAdjustment.value.reason) {
        alert('Please fill in all required fields')
        return
    }
    
    // Handle manual adjustment logic here
    console.log('Applying manual adjustment:', manualAdjustment.value)
    
    // You could add logic to update payout, log audit trail, etc.
    showManualAdjustmentModal.value = false
    
    // Reset form
    manualAdjustment.value = {
        targetDriver: '',
        adjustmentType: 'positive',
        amount: 0.00,
        category: '',
        reason: ''
    }
}

// Adjustments Data
const adjustments = ref([
    {
        id: 'ADJ-3001',
        targetName: 'James Wilson',
        targetId: 'DRV-501',
        type: 'negative',
        amount: 10.00,
        category: 'customer service',
        reason: 'customer complaint compensation',
        createdBy: 'admin@paymax.com',
        date: '2025-10-19 10:30',
        status: 'applied'
    },
    {
        id: 'ADJ-3002',
        targetName: 'Maria Garcia',
        targetId: 'DRV-502',
        type: 'positive',
        amount: 25.00,
        category: 'bonus',
        reason: 'Bonus for 5-star ratings',
        createdBy: 'system',
        date: '2025-10-18 14:20',
        status: 'applied'
    }
])

// Commission Rules Data
const commissionRules = ref([
    {
        id: 'CR-001',
        title: 'Standard Driver - 20%',
        status: 'active',
        type: 'percentage',
        vehicleType: 'Standard',
        partnerType: 'Individual',
        commission: '20% of trip fare',
        created: '2025-01-01'
    },
    {
        id: 'CR-002',
        title: 'Premium Driver - 15%',
        status: 'active',
        type: 'percentage',
        vehicleType: 'Premium',
        partnerType: 'Individual',
        commission: '15% of trip fare',
        created: '2025-01-01'
    },
    {
        id: 'CR-003',
        title: 'Airport Flat Fee',
        status: 'active',
        type: 'fixed',
        vehicleType: 'XL',
        partnerType: 'Individual',
        commission: '$5.00 per trip',
        created: '2025-03-01'
    },
    {
        id: 'CR-004',
        title: 'Fleet Partnership - Tiered',
        status: 'active',
        type: 'tiered',
        vehicleType: 'All',
        partnerType: 'Fleet',
        tiers: [
            { range: '0 - 100 trips', rate: '18%' },
            { range: '101 - 500 trips', rate: '16%' },
            { range: '501 - ∞ trips', rate: '12%' }
        ],
        created: '2025-02-15'
    }
])

// Create Commission Rule Modal
const showNewRuleModal = ref(false)

const newRule = ref({
    ruleName: '',
    vehicleType: '',
    partnerType: '',
    commissionType: 'percentage',
    percentage: 0,
    fixedAmount: 0,
    tiers: [
        { minTrips: 0, maxTrips: 100, rate: 20 }
    ]
})

const openNewRuleModal = () => {
    newRule.value = {
        ruleName: '',
        vehicleType: '',
        partnerType: '',
        commissionType: 'percentage',
        percentage: 0,
        fixedAmount: 0,
        tiers: [
            { minTrips: 0, maxTrips: 100, rate: 20 }
        ]
    }
    showNewRuleModal.value = true
}

const closeNewRuleModal = () => {
    showNewRuleModal.value = false
}

const addTier = () => {
    const lastTier = newRule.value.tiers[newRule.value.tiers.length - 1]
    const newMinTrips = lastTier ? lastTier.maxTrips + 1 : 0
    newRule.value.tiers.push({
        minTrips: newMinTrips,
        maxTrips: newMinTrips + 100,
        rate: 20
    })
}

const removeTier = (index: number) => {
    if (newRule.value.tiers.length > 1) {
        newRule.value.tiers.splice(index, 1)
    }
}

const createCommissionRule = () => {
    // Validate required fields
    if (!newRule.value.ruleName || !newRule.value.vehicleType || !newRule.value.partnerType || !newRule.value.commissionType) {
        alert('Please fill in all required fields')
        return
    }

    if (newRule.value.commissionType === 'percentage' && !newRule.value.percentage) {
        alert('Please enter commission percentage')
        return
    }

    if (newRule.value.commissionType === 'fixed' && !newRule.value.fixedAmount) {
        alert('Please enter fixed commission amount')
        return
    }

    if (newRule.value.commissionType === 'tiered' && newRule.value.tiers.length === 0) {
        alert('Please add at least one tier')
        return
    }

    // Handle commission rule creation logic here
    console.log('Creating commission rule:', newRule.value)
    
    // Add to commission rules list
    const ruleData: any = {
        id: `CR-${String(commissionRules.value.length + 1).padStart(3, '0')}`,
        title: newRule.value.ruleName,
        status: 'active',
        type: newRule.value.commissionType,
        vehicleType: newRule.value.vehicleType,
        partnerType: newRule.value.partnerType,
        created: new Date().toISOString().split('T')[0]
    }

    if (newRule.value.commissionType === 'percentage') {
        ruleData.commission = `${newRule.value.percentage}% of trip fare`
    } else if (newRule.value.commissionType === 'fixed') {
        ruleData.commission = `$${newRule.value.fixedAmount.toFixed(2)} per trip`
    } else if (newRule.value.commissionType === 'tiered') {
        ruleData.tiers = newRule.value.tiers.map(tier => ({
            range: tier.maxTrips ? `${tier.minTrips} - ${tier.maxTrips} trips` : `${tier.minTrips} - ∞ trips`,
            rate: `${tier.rate}%`
        }))
    }

    commissionRules.value.push(ruleData)
    
    showNewRuleModal.value = false
    
    // Reset form
    newRule.value = {
        ruleName: '',
        vehicleType: '',
        partnerType: '',
        commissionType: 'percentage',
        percentage: 0,
        fixedAmount: 0,
        tiers: [
            { minTrips: 0, maxTrips: 100, rate: 20 }
        ]
    }
}
</script>

