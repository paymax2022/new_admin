<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
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

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <!-- Total Restaurants -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Total Restaurants</p>
                        <p class="text-3xl font-bold text-blue-600">2,847</p>
                        <div class="flex items-center mt-2">
                            <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-xs text-gray-600">0.5% vs yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Orders -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Total Orders</p>
                        <p class="text-3xl font-bold text-purple-600">690,000</p>
                        <div class="flex items-center mt-2">
                            <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-xs text-gray-600">0.5% vs yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active Orders -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Active Orders</p>
                        <p class="text-3xl font-bold text-orange-600">47</p>
                        <div class="flex items-center mt-2">
                            <div class="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                            <span class="text-xs text-gray-600">0.5% vs yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Revenue -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Total Revenue</p>
                        <p class="text-3xl font-bold text-green-600">$45,678</p>
                        <div class="flex items-center mt-2">
                            <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-xs text-gray-600">7.0% vs last week</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Avg Order Value -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Avg Order Value</p>
                        <p class="text-3xl font-bold text-gray-900">$24.50</p>
                        <div class="flex items-center mt-2">
                            <svg class="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-xs text-gray-600">0.5% vs last month</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Completion Rate -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Completion Rate</p>
                        <p class="text-3xl font-bold text-green-600">94.2%</p>
                        <div class="flex items-center mt-2">
                            <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-xs text-gray-600">0.5% vs yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Avg Prep Time -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Avg Prep Time</p>
                        <p class="text-3xl font-bold text-green-600">18 min</p>
                        <div class="flex items-center mt-2">
                            <svg class="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-xs text-gray-600">0.5% vs yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Customer Rating -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Customer Rating</p>
                        <p class="text-3xl font-bold text-green-600">4.6</p>
                        <div class="flex items-center mt-2">
                            <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-xs text-gray-600">0.5% vs yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active Riders -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Active Riders</p>
                        <p class="text-3xl font-bold text-blue-600">156</p>
                        <div class="flex items-center mt-2">
                            <div class="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                            <span class="text-xs text-gray-600">0.5% vs yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Customers -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Total Customers</p>
                        <p class="text-3xl font-bold text-indigo-600">50</p>
                        <div class="flex items-center mt-2">
                            <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-xs text-gray-600">0.5% vs yesterday</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Order Statistics Section -->
        <div class="mb-6">
            <!-- Order Filter & Stats Breakdown -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h2 class="text-xl font-bold text-gray-800">Order Statistics</h2>
                <div class="relative inline-block text-left">
                    <button @click="orderStatsOpen = !orderStatsOpen" class="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium flex items-center gap-1">
                        {{ selectedOrderRange }}
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-if="orderStatsOpen" class="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                        <ul class="py-1 text-sm text-gray-700">
                            <li v-for="range in orderRanges" :key="range" @click="selectOrderRange(range)" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                {{ range }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Breakdown Stats -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="stat in orderStats" :key="stat.label" class="bg-white p-4 rounded-xl shadow-sm flex items-center border border-gray-100 space-x-4">
                    <div :class="`p-3 rounded-full text-white ${stat.bg}`">
                        <component :is="stat.icon" class="w-6 h-6" />
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-medium">{{ stat.label }}</p>
                        <p class="text-lg font-semibold text-gray-800">{{ stat.value }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-6">
                <!-- Order Trends -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold text-gray-900">Order Trends (Today)</h2>
                        <div class="relative">
                            <select v-model="selectedTimeRange" class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Last 30 Days</option>
                                <option>Last 7 Days</option>
                                <option>Last 24 Hours</option>
                            </select>
                        </div>
                    </div>
                    <div class="h-64">
                        <LineChart :data="orderTrendsData" :options="orderTrendsOptions" />
                    </div>
                </div>

                <!-- Recent Orders -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold text-gray-900">Recent Orders</h2>
                        <div class="relative">
                            <select v-model="selectedOrderStatus" class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="all">All</option>
                                <option value="accepted">Accepted</option>
                                <option value="ready">Ready</option>
                                <option value="in-transit">In Transit</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div v-for="order in filteredOrders" :key="order.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border-b border-gray-100 last:border-b-0">
                            <div class="flex items-center gap-3">
                                <div>
                                    <p class="font-medium text-gray-900">{{ order.orderNumber }}</p>
                                    <p class="text-sm text-gray-600">{{ order.restaurant }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span v-if="order.price" class="text-sm font-medium text-gray-900">{{ order.price }}</span>
                                <span :class="getStatusClass(order.status)" class="px-2.5 py-1 rounded-full text-xs font-medium">
                                    {{ order.status }}
                                </span>
                                <span class="text-xs text-gray-500">{{ order.time }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
                <!-- Order by Category -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Order by Category</h2>
                    <div class="h-64">
                        <DonutChart :data="categoryData" :options="categoryOptions" />
                    </div>
                </div>

                <!-- Pending Approvals -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h2>
                    <div class="space-y-3">
                        <div v-for="restaurant in pendingRestaurants" :key="restaurant.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                            <div>
                                <p class="font-medium text-gray-900">{{ restaurant.name }}</p>
                                <p class="text-sm text-gray-600">{{ restaurant.type }}</p>
                                <p class="text-xs text-gray-500 mt-1">{{ restaurant.time }}</p>
                            </div>
                            <button class="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                                Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import LineChart from '@/components/charts/LineChart.vue';
import DonutChart from '@/components/charts/DonutChart.vue';
import { CubeIcon, TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';

const selectedTimeRange = ref('Last 30 Days');
const selectedOrderStatus = ref('all');

// Order Statistics
const orderStatsOpen = ref(false);
const selectedOrderRange = ref('01 Jun - 30 Jun');
const orderRanges = ['01 Jun - 30 Jun', '01 May - 31 May', '01 Apr - 30 Apr'];

const orderStats = [
    { label: 'Total Orders', value: 9, bg: 'bg-purple-500', icon: CubeIcon },
    { label: 'Pending', value: 3, bg: 'bg-yellow-400', icon: ClockIcon },
    { label: 'Processing', value: 0, bg: 'bg-green-300', icon: CheckCircleIcon },
    { label: 'On The Way', value: 0, bg: 'bg-sky-400', icon: TruckIcon },
    { label: 'Delivered', value: 4, bg: 'bg-purple-400', icon: CubeIcon },
    { label: 'Canceled', value: 0, bg: 'bg-red-300', icon: XCircleIcon },
    { label: 'Rejected', value: 1, bg: 'bg-red-400', icon: XMarkIcon },
];

function selectOrderRange(range: string) {
    selectedOrderRange.value = range;
    orderStatsOpen.value = false;
}

const orderTrendsData = {
    labels: ['7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
    datasets: [
        {
            label: 'Orders',
            data: [50, 80, 120, 150, 200, 180, 160, 140, 120, 100, 130, 160, 190, 220],
            borderColor: 'rgb(249, 115, 22)',
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
            tension: 0.4,
            fill: false,
        },
        {
            label: 'Deliveries',
            data: [30, 50, 70, 90, 110, 100, 90, 80, 70, 60, 80, 100, 120, 150],
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.4,
            fill: false,
        },
    ],
};

const orderTrendsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 300,
            ticks: {
                stepSize: 50,
            },
        },
    },
};

const categoryData = {
    labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    datasets: [
        {
            data: [35, 25, 20, 20],
            backgroundColor: [
                'rgb(59, 130, 246)',
                'rgb(239, 68, 68)',
                'rgb(249, 115, 22)',
                'rgb(0, 0, 0)',
            ],
        },
    ],
};

const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
    },
    cutout: '60%',
};

const orders = ref([
    { id: 1, orderNumber: '#12345', restaurant: 'Pizza Palace', status: 'Accepted', time: '5 min ago' },
    { id: 2, orderNumber: '#12346', restaurant: 'Burger King', status: 'Ready', time: '5 min ago' },
    { id: 3, orderNumber: '#12347', restaurant: 'Sushi House', status: 'In Transit', time: '5 min ago', price: '$34.50' },
    { id: 4, orderNumber: '#12348', restaurant: 'Taco Bell', status: 'Delivered', time: '5 min ago', price: '$34.90' },
]);

const filteredOrders = computed(() => {
    if (selectedOrderStatus.value === 'all') {
        return orders.value;
    }
    return orders.value.filter(order => {
        const statusMap: Record<string, string> = {
            'accepted': 'Accepted',
            'ready': 'Ready',
            'in-transit': 'In Transit',
            'delivered': 'Delivered',
        };
        return order.status === statusMap[selectedOrderStatus.value];
    });
});

const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
        'Accepted': 'bg-green-100 text-green-800',
        'Ready': 'bg-orange-100 text-orange-800',
        'In Transit': 'bg-blue-100 text-blue-800',
        'Delivered': 'bg-gray-100 text-gray-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
};

const pendingRestaurants = ref([
    { id: 1, name: 'Restaurant A', type: 'New Registration', time: '2 hours ago' },
    { id: 2, name: 'Restaurant B', type: 'New Registration', time: '2 hours ago' },
    { id: 3, name: 'Restaurant C', type: 'New Registration', time: '3 hours ago' },
    { id: 4, name: 'Restaurant D', type: 'New Registration', time: '3 hours ago' },
]);
</script>

