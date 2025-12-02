<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Delivery Settings</h1>
                <p class="text-sm text-gray-500">Configure delivery fees, zones, and rider commissions.</p>
            </div>
            <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                Save All Changes
            </button>
        </div>

        <!-- Delivery Fee Rules Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Delivery Fee Rules</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Base Delivery Fee ($)</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="deliveryFeeRules.baseFee"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="increment('baseFee')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrement('baseFee')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Distance Fee per KM ($)</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="deliveryFeeRules.distanceFee"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="increment('distanceFee')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrement('distanceFee')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Free Delivery Threshold ($)</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="deliveryFeeRules.freeDeliveryThreshold"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="increment('freeDeliveryThreshold')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrement('freeDeliveryThreshold')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Peak Hour Multiplier ($)</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="deliveryFeeRules.peakHourMultiplier"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="increment('peakHourMultiplier')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrement('peakHourMultiplier')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Service Charge Rate</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="deliveryFeeRules.serviceChargeRate"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="increment('serviceChargeRate')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrement('serviceChargeRate')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Advanced Settings Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Advanced Settings</h2>
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-900 mb-1">Auto assign riders</p>
                    <p class="text-sm text-gray-500">Automatically assign rider to available orders.</p>
                </div>
                <button
                    @click="advancedSettings.autoAssignRiders = !advancedSettings.autoAssignRiders"
                    :class="[
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                        advancedSettings.autoAssignRiders ? 'bg-blue-600' : 'bg-gray-300'
                    ]"
                >
                    <span
                        :class="[
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                            advancedSettings.autoAssignRiders ? 'translate-x-6' : 'translate-x-1'
                        ]"
                    ></span>
                </button>
            </div>
        </div>

        <!-- Rider Commission & Incentives Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Rider Commission & Incentives</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Base Commission (%)</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="riderCommission.baseCommission"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="incrementCommission('baseCommission')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrementCommission('baseCommission')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Distance Bonus ($/km)</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="riderCommission.distanceBonus"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="incrementCommission('distanceBonus')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrementCommission('distanceBonus')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Peak Hour Bonus ($)</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="riderCommission.peakHourBonus1"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="incrementCommission('peakHourBonus1')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrementCommission('peakHourBonus1')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Peak Hour Bonus ($)</label>
                    <div class="relative">
                        <input
                            type="number"
                            v-model="riderCommission.peakHourBonus2"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="incrementCommission('peakHourBonus2')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrementCommission('peakHourBonus2')" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Individual Rider Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Individual Rider</h2>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base %</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance Bonus</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Bonus</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Bonus</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Bonus</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Today's Performance</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="rider in individualRiders" :key="rider.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ rider.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ rider.basePercent }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ rider.distanceBonus }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ rider.timeBonus }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ rider.peakBonus }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ rider.completionBonus }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ rider.todaysPerformance }}</div>
                                <div class="text-xs text-gray-500">{{ rider.ordersCount }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Operational Settings Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Operational Settings</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Windows</label>
                    <p class="text-sm text-gray-500">Configure delivery time windows</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Auto-assign timeout</label>
                    <div class="relative">
                        <input
                            type="text"
                            v-model="operationalSettings.autoAssignTimeout"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="incrementTimeout()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrementTimeout()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Task Capacity</label>
                    <div class="relative">
                        <input
                            type="text"
                            v-model="operationalSettings.taskCapacity"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="incrementCapacity()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrementCapacity()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Max delivery distance</label>
                    <div class="relative">
                        <input
                            type="text"
                            v-model="operationalSettings.maxDeliveryDistance"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                            <button @click="incrementDistance()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button @click="decrementDistance()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notifications Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Notifications</h2>
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-900 mb-1">Order delays</p>
                        <p class="text-sm text-gray-500">Notify when orders are delayed</p>
                    </div>
                    <button
                        @click="notifications.orderDelays = !notifications.orderDelays"
                        :class="[
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                            notifications.orderDelays ? 'bg-blue-600' : 'bg-gray-300'
                        ]"
                    >
                        <span
                            :class="[
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                notifications.orderDelays ? 'translate-x-6' : 'translate-x-1'
                            ]"
                        ></span>
                    </button>
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-900 mb-1">Rider availability</p>
                        <p class="text-sm text-gray-500">Alert when no riders available</p>
                    </div>
                    <button
                        @click="notifications.riderAvailability = !notifications.riderAvailability"
                        :class="[
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                            notifications.riderAvailability ? 'bg-blue-600' : 'bg-gray-300'
                        ]"
                    >
                        <span
                            :class="[
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                notifications.riderAvailability ? 'translate-x-6' : 'translate-x-1'
                            ]"
                        ></span>
                    </button>
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-900 mb-1">Peak hour alerts</p>
                        <p class="text-sm text-gray-500">Notify during high demand</p>
                    </div>
                    <button
                        @click="notifications.peakHourAlerts = !notifications.peakHourAlerts"
                        :class="[
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                            notifications.peakHourAlerts ? 'bg-blue-600' : 'bg-gray-300'
                        ]"
                    >
                        <span
                            :class="[
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                notifications.peakHourAlerts ? 'translate-x-6' : 'translate-x-1'
                            ]"
                        ></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const deliveryFeeRules = ref({
    baseFee: '0.00',
    distanceFee: '0.00',
    freeDeliveryThreshold: '0.00',
    peakHourMultiplier: '0.00',
    serviceChargeRate: '0.00'
});

const advancedSettings = ref({
    autoAssignRiders: false
});

const riderCommission = ref({
    baseCommission: '0.00',
    distanceBonus: '0.00',
    peakHourBonus1: '0.00',
    peakHourBonus2: '0.00'
});

const individualRiders = ref([
    {
        id: 1,
        name: 'Mike',
        basePercent: '15%',
        distanceBonus: '$0.5',
        timeBonus: '$1.5',
        peakBonus: '1x',
        completionBonus: '$4',
        todaysPerformance: '$87.5',
        ordersCount: '12 orders'
    },
    {
        id: 2,
        name: 'Mike',
        basePercent: '15%',
        distanceBonus: '$0.5',
        timeBonus: '$1.5',
        peakBonus: '1x',
        completionBonus: '$4',
        todaysPerformance: '$87.5',
        ordersCount: '12 orders'
    }
]);

const operationalSettings = ref({
    autoAssignTimeout: '1 minutes',
    taskCapacity: '10 Orders',
    maxDeliveryDistance: '12km'
});

const notifications = ref({
    orderDelays: false,
    riderAvailability: false,
    peakHourAlerts: false
});

const increment = (field: string) => {
    const current = parseFloat(deliveryFeeRules.value[field as keyof typeof deliveryFeeRules.value] as string) || 0;
    deliveryFeeRules.value[field as keyof typeof deliveryFeeRules.value] = (current + 0.01).toFixed(2);
};

const decrement = (field: string) => {
    const current = parseFloat(deliveryFeeRules.value[field as keyof typeof deliveryFeeRules.value] as string) || 0;
    deliveryFeeRules.value[field as keyof typeof deliveryFeeRules.value] = Math.max(0, current - 0.01).toFixed(2);
};

const incrementCommission = (field: string) => {
    const current = parseFloat(riderCommission.value[field as keyof typeof riderCommission.value] as string) || 0;
    riderCommission.value[field as keyof typeof riderCommission.value] = (current + 0.01).toFixed(2);
};

const decrementCommission = (field: string) => {
    const current = parseFloat(riderCommission.value[field as keyof typeof riderCommission.value] as string) || 0;
    riderCommission.value[field as keyof typeof riderCommission.value] = Math.max(0, current - 0.01).toFixed(2);
};

const incrementTimeout = () => {
    const match = operationalSettings.value.autoAssignTimeout.match(/(\d+)/);
    if (match) {
        const num = parseInt(match[1]) + 1;
        operationalSettings.value.autoAssignTimeout = `${num} minutes`;
    }
};

const decrementTimeout = () => {
    const match = operationalSettings.value.autoAssignTimeout.match(/(\d+)/);
    if (match) {
        const num = Math.max(1, parseInt(match[1]) - 1);
        operationalSettings.value.autoAssignTimeout = `${num} minutes`;
    }
};

const incrementCapacity = () => {
    const match = operationalSettings.value.taskCapacity.match(/(\d+)/);
    if (match) {
        const num = parseInt(match[1]) + 1;
        operationalSettings.value.taskCapacity = `${num} Orders`;
    }
};

const decrementCapacity = () => {
    const match = operationalSettings.value.taskCapacity.match(/(\d+)/);
    if (match) {
        const num = Math.max(1, parseInt(match[1]) - 1);
        operationalSettings.value.taskCapacity = `${num} Orders`;
    }
};

const incrementDistance = () => {
    const match = operationalSettings.value.maxDeliveryDistance.match(/(\d+)/);
    if (match) {
        const num = parseInt(match[1]) + 1;
        operationalSettings.value.maxDeliveryDistance = `${num}km`;
    }
};

const decrementDistance = () => {
    const match = operationalSettings.value.maxDeliveryDistance.match(/(\d+)/);
    if (match) {
        const num = Math.max(1, parseInt(match[1]) - 1);
        operationalSettings.value.maxDeliveryDistance = `${num}km`;
    }
};
</script>

