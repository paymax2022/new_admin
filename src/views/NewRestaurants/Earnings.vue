<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
                <h1 class="text-3xl font-bold text-gray-900">Earnings Dashboard</h1>
                <div class="flex items-center gap-4">
                    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>Last 3 Month</option>
                    </select>
                    <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors">
                        Export Data
                    </button>
                </div>
            </div>
            <p class="text-sm text-gray-500">Platform revenue analytics and performance metrics.</p>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span class="text-sm text-gray-500">Total Revenue</span>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">$844,929</p>
                <p class="text-sm text-green-600">↑ 4.8% vs last month</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span class="text-sm text-gray-500">Platform Commission</span>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">$50,100</p>
                <p class="text-sm text-green-600">↑ 1.2% vs last month</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    <span class="text-sm text-gray-500">Net Earnings</span>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">$283,900</p>
                <p class="text-sm text-green-600">↑ 4.8% vs last month</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                    <span class="text-sm text-gray-500">Order Value</span>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">$45,600</p>
                <p class="text-sm text-green-600">↑ 2.1% vs last month</p>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Revenue Trend Chart -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Revenue Trend</h3>
                <p class="text-sm text-gray-500 mb-4">Monthly revenue and commission breakdown</p>
                <div class="h-64 relative">
                    <svg class="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                        <!-- Y-axis labels -->
                        <text x="10" y="20" font-size="10" fill="#6b7280">200</text>
                        <text x="10" y="50" font-size="10" fill="#6b7280">150</text>
                        <text x="10" y="80" font-size="10" fill="#6b7280">100</text>
                        <text x="10" y="110" font-size="10" fill="#6b7280">50</text>
                        <text x="10" y="140" font-size="10" fill="#6b7280">0</text>
                        
                        <!-- Grid lines -->
                        <line x1="40" y1="20" x2="480" y2="20" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="50" x2="480" y2="50" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="80" x2="480" y2="80" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="110" x2="480" y2="110" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="140" x2="480" y2="140" stroke="#e5e7eb" stroke-width="1"/>
                        
                        <!-- Revenue line (brown/orange) -->
                        <polyline
                            points="60,120 100,100 140,80 180,110 220,90 260,50 300,70 340,40 380,60 420,30 460,20"
                            fill="none"
                            stroke="#92400e"
                            stroke-width="2"
                        />
                        
                        <!-- X-axis labels -->
                        <text x="60" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Jan</text>
                        <text x="100" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Feb</text>
                        <text x="140" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Mar</text>
                        <text x="180" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Apr</text>
                        <text x="220" y="170" font-size="10" fill="#6b7280" text-anchor="middle">May</text>
                        <text x="260" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Jun</text>
                        <text x="300" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Jul</text>
                        <text x="340" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Aug</text>
                        <text x="380" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Sep</text>
                        <text x="420" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Oct</text>
                        <text x="460" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Nov</text>
                        <text x="480" y="170" font-size="10" fill="#6b7280" text-anchor="middle">Dec</text>
                    </svg>
                </div>
            </div>

            <!-- Revenue by Category Chart -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Revenue by Category</h3>
                <p class="text-sm text-gray-500 mb-4">Distribution of revenue across food categories</p>
                <div class="flex items-center justify-center h-64">
                    <div class="relative w-48 h-48">
                        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="8"></circle>
                            <!-- Segments -->
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#000000" stroke-width="8" 
                                stroke-dasharray="62.8 188.4" stroke-dashoffset="0"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="8" 
                                stroke-dasharray="62.8 188.4" stroke-dashoffset="-62.8"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" stroke-width="8" 
                                stroke-dasharray="50.24 188.4" stroke-dashoffset="-125.6"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" stroke-width="8" 
                                stroke-dasharray="37.68 188.4" stroke-dashoffset="-175.84"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" stroke-width="8" 
                                stroke-dasharray="25.12 188.4" stroke-dashoffset="-213.52"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="8" 
                                stroke-dasharray="18.84 188.4" stroke-dashoffset="-238.64"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#dc2626" stroke-width="8" 
                                stroke-dasharray="12.56 188.4" stroke-dashoffset="-257.48"></circle>
                        </svg>
                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-black"></div>
                        <span class="text-xs text-gray-600">Task 1</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-blue-500"></div>
                        <span class="text-xs text-gray-600">Task 2</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-orange-500"></div>
                        <span class="text-xs text-gray-600">Task 3</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-red-500"></div>
                        <span class="text-xs text-gray-600">Task 4</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-pink-500"></div>
                        <span class="text-xs text-gray-600">Task 5</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-green-500"></div>
                        <span class="text-xs text-gray-600">Task 6</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded bg-red-600"></div>
                        <span class="text-xs text-gray-600">Others</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Top Performing Restaurants Section -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between mb-2">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900">Top Performing Restaurants</h3>
                        <p class="text-sm text-gray-500">Revenue and commission breakdown by restaurant</p>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="relative max-w-md">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by item, name or restaurants..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Commission</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Revenue</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="restaurant in restaurants" :key="restaurant.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <span class="text-sm font-semibold text-gray-600">{{ restaurant.name.charAt(0) }}</span>
                                    </div>
                                    <div class="text-sm font-medium text-gray-900">{{ restaurant.name }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${{ restaurant.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${{ restaurant.platformCommission.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ restaurant.orders }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-1">
                                    <span class="text-sm font-medium text-gray-900">{{ restaurant.rating }}</span>
                                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-full',
                                        restaurant.commissionRate >= 20 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    ]"
                                >
                                    {{ restaurant.commissionRate }}%
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${{ restaurant.netRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Bottom Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Commission Rate Trend -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Commission Rate Trend</h3>
                <p class="text-sm text-gray-500 mb-4">Average commission rate over time</p>
                <div class="h-64 relative">
                    <svg class="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                        <!-- Y-axis labels -->
                        <text x="10" y="20" font-size="10" fill="#6b7280">25</text>
                        <text x="10" y="50" font-size="10" fill="#6b7280">20</text>
                        <text x="10" y="80" font-size="10" fill="#6b7280">15</text>
                        <text x="10" y="110" font-size="10" fill="#6b7280">10</text>
                        <text x="10" y="140" font-size="10" fill="#6b7280">5</text>
                        <text x="10" y="170" font-size="10" fill="#6b7280">0</text>
                        
                        <!-- Grid lines -->
                        <line x1="40" y1="20" x2="380" y2="20" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="50" x2="380" y2="50" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="80" x2="380" y2="80" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="110" x2="380" y2="110" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="140" x2="380" y2="140" stroke="#e5e7eb" stroke-width="1"/>
                        <line x1="40" y1="170" x2="380" y2="170" stroke="#e5e7eb" stroke-width="1"/>
                        
                        <!-- X-axis labels -->
                        <text x="60" y="190" font-size="10" fill="#6b7280" text-anchor="middle">Jan</text>
                        <text x="120" y="190" font-size="10" fill="#6b7280" text-anchor="middle">Feb</text>
                        <text x="180" y="190" font-size="10" fill="#6b7280" text-anchor="middle">Mar</text>
                        <text x="240" y="190" font-size="10" fill="#6b7280" text-anchor="middle">Apr</text>
                        <text x="300" y="190" font-size="10" fill="#6b7280" text-anchor="middle">May</text>
                        <text x="360" y="190" font-size="10" fill="#6b7280" text-anchor="middle">Jun</text>
                    </svg>
                </div>
            </div>

            <!-- Growth Metrics -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Growth Metrics</h3>
                <p class="text-sm text-gray-500 mb-4">Key performance indicators</p>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Revenue Growth</span>
                        <span class="text-sm font-medium text-blue-600">+12.5%</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Order Volume</span>
                        <span class="text-sm font-medium text-blue-600">+8.2%</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">New Restaurants</span>
                        <span class="text-sm font-medium text-blue-600">+15</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Customer Retention</span>
                        <span class="text-sm font-medium text-gray-900">87.2%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const restaurants = ref([
    {
        id: 1,
        name: 'Mama pot',
        totalRevenue: 45600,
        platformCommission: 6840,
        orders: 50,
        rating: '4.8',
        commissionRate: 20,
        netRevenue: 38760
    },
    {
        id: 2,
        name: 'Catwell',
        totalRevenue: 38000,
        platformCommission: 5815,
        orders: 50,
        rating: '4.5',
        commissionRate: 20,
        netRevenue: 32005
    },
    {
        id: 3,
        name: 'Happy Me',
        totalRevenue: 5700,
        platformCommission: 500,
        orders: 5,
        rating: '2.8',
        commissionRate: 5,
        netRevenue: 5968
    }
]);
</script>

