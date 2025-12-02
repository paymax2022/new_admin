<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Rider Performance Reports</h1>
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
                    <span class="text-sm text-gray-500">Avg Delivery Time</span>
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">28 min</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">On-Time Rate</span>
                    <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">96%</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Avg Rating</span>
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">3.9</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Completion Rate</span>
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">98%</p>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Performance Trends Chart -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Performance Trends</h3>
                <div class="h-64 relative">
                    <svg class="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                        <!-- Y-axis labels -->
                        <text x="10" y="20" font-size="10" fill="#6b7280">300</text>
                        <text x="10" y="50" font-size="10" fill="#6b7280">250</text>
                        <text x="10" y="80" font-size="10" fill="#6b7280">200</text>
                        <text x="10" y="110" font-size="10" fill="#6b7280">150</text>
                        <text x="10" y="140" font-size="10" fill="#6b7280">100</text>
                        <text x="10" y="170" font-size="10" fill="#6b7280">50</text>
                        <text x="10" y="195" font-size="10" fill="#6b7280">0</text>
                        
                        <!-- Grid lines -->
                        <line x1="40" y1="20" x2="400" y2="20" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="50" x2="400" y2="50" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="80" x2="400" y2="80" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="110" x2="400" y2="110" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="140" x2="400" y2="140" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="170" x2="400" y2="170" stroke="#e5e7eb" stroke-width="1"/>
                        
                        <!-- Green line (On-Time Rate %) -->
                        <polyline
                            points="60,60 120,40 180,80 240,20 300,50 360,100"
                            fill="none"
                            stroke="#10b981"
                            stroke-width="2"
                        />
                        
                        <!-- Blue line (Completion Rate %) -->
                        <polyline
                            points="60,80 120,50 180,90 240,30 300,60 360,110"
                            fill="none"
                            stroke="#3b82f6"
                            stroke-width="2"
                        />
                        
                        <!-- X-axis labels -->
                        <text x="60" y="195" font-size="10" fill="#6b7280" text-anchor="middle">7 AM</text>
                        <text x="120" y="195" font-size="10" fill="#6b7280" text-anchor="middle">10 AM</text>
                        <text x="180" y="195" font-size="10" fill="#6b7280" text-anchor="middle">1 PM</text>
                        <text x="240" y="195" font-size="10" fill="#6b7280" text-anchor="middle">4 PM</text>
                        <text x="300" y="195" font-size="10" fill="#6b7280" text-anchor="middle">7 PM</text>
                        <text x="360" y="195" font-size="10" fill="#6b7280" text-anchor="middle">10 PM</text>
                    </svg>
                </div>
                <div class="flex items-center justify-center gap-4 mt-4">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-green-500"></div>
                        <span class="text-xs text-gray-600">On-Time Rate %</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-blue-500"></div>
                        <span class="text-xs text-gray-600">Completion Rate %</span>
                    </div>
                </div>
            </div>

            <!-- Delivery Time Distribution Chart -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Delivery Time Distribution</h3>
                <div class="flex items-center justify-center h-64">
                    <div class="relative w-48 h-48">
                        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="8"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="8" 
                                stroke-dasharray="251.2 125.6" stroke-dashoffset="0"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="8" 
                                stroke-dasharray="251.2 125.6" stroke-dashoffset="-125.6"></circle>
                        </svg>
                    </div>
                </div>
                <div class="flex items-center justify-center gap-4 mt-4">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-blue-500"></div>
                        <span class="text-xs text-gray-600">Delivery Time</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-green-500"></div>
                        <span class="text-xs text-gray-600">Other Completion</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rider Performance Table -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider Info</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time Delivery</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings (Total Earned)</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="rider in topRiders" :key="rider.rank" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center justify-center w-8 h-8">
                                    <svg v-if="rider.rank === 1" class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
                                        <text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="white">1</text>
                                    </svg>
                                    <svg v-else-if="rider.rank === 2" class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" fill="#C0C0C0" stroke="#808080" stroke-width="1"/>
                                        <text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="white">2</text>
                                    </svg>
                                    <svg v-else-if="rider.rank === 3" class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" fill="#CD7F32" stroke="#8B4513" stroke-width="1"/>
                                        <text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="white">3</text>
                                    </svg>
                                    <span v-else class="text-sm font-medium text-gray-900">{{ rider.rank }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                                        {{ rider.name.charAt(0) }}
                                    </div>
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">{{ rider.name }}</div>
                                        <div class="text-xs text-gray-500">ID: {{ rider.id }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-1">
                                    <span class="text-sm font-medium text-gray-900">{{ rider.rating }}</span>
                                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ rider.totalOrders }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-full',
                                        rider.onTimeDelivery === '98%' && rider.rank === 1 ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'
                                    ]"
                                >
                                    {{ rider.onTimeDelivery }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${{ rider.earnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'text-sm font-medium',
                                        rider.performance === 'Excellent' ? 'text-green-600' : 'text-blue-600'
                                    ]"
                                >
                                    {{ rider.performance }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Summary Performance Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Daily Performance -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Daily Performance</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Orders Completed</span>
                        <span class="text-sm font-medium text-gray-900">1,246</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Average Rating</span>
                        <span class="text-sm font-medium text-gray-900">4.7/5.0</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Late Deliveries</span>
                        <span class="text-sm font-medium text-gray-900">32</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Customer Complaints</span>
                        <span class="text-sm font-medium text-gray-900">12</span>
                    </div>
                </div>
            </div>

            <!-- Weekly Performance -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Weekly Performance</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Total Orders</span>
                        <span class="text-sm font-medium text-gray-900">8,734</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">On-Time Deliveries</span>
                        <span class="text-sm font-medium text-gray-900">96%</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Avg Delivery Time</span>
                        <span class="text-sm font-medium text-gray-900">25 min</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Customer Satisfaction</span>
                        <span class="text-sm font-medium text-gray-900">4.7/5.0</span>
                    </div>
                </div>
            </div>

            <!-- Monthly Performance -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Monthly Performance</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Total Orders</span>
                        <span class="text-sm font-medium text-gray-900">37,156</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Performance Score</span>
                        <span class="text-sm font-medium text-gray-900">4.7/5.0</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Top Performers</span>
                        <span class="text-sm font-medium text-gray-900">23 riders</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Improvement Needed</span>
                        <span class="text-sm font-medium text-gray-900">8 riders</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const topRiders = ref([
    {
        rank: 1,
        name: 'John Smith',
        id: 'R001',
        rating: '4.9',
        totalOrders: '234',
        onTimeDelivery: '98%',
        earnings: 2450.00,
        performance: 'Excellent'
    },
    {
        rank: 2,
        name: 'John Smith',
        id: 'R001',
        rating: '4.9',
        totalOrders: '189',
        onTimeDelivery: '98%',
        earnings: 2450.00,
        performance: 'Excellent'
    },
    {
        rank: 3,
        name: 'John Smith',
        id: 'R001',
        rating: '4.9',
        totalOrders: '156',
        onTimeDelivery: '98%',
        earnings: 2450.00,
        performance: 'Good'
    }
]);
</script>

