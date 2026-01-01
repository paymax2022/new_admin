<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Live Orders</h1>
            <p class="text-sm text-gray-500">Real-time order tracking and management</p>
        </div>

        <!-- Order Status Summary Cards -->
        <div class="grid grid-cols-5 gap-4 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Active Orders</p>
                <p class="text-2xl font-bold text-blue-600">00</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Preparing</p>
                <p class="text-2xl font-bold text-yellow-500">00</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Ready</p>
                <p class="text-2xl font-bold text-green-600">00</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Out for Delivery</p>
                <p class="text-2xl font-bold text-gray-500">00</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Need Rider</p>
                <p class="text-2xl font-bold text-gray-500">00</p>
            </div>
        </div>

        <!-- Search and Filter Bar -->
        <div class="flex items-center gap-4 mb-6">
            <div class="flex-1 relative">
                <input
                    type="text"
                    placeholder="Q Search res, name, ID..."
                    v-model="searchQuery"
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <div class="relative">
                <select
                    v-model="statusFilter"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                >
                    <option value="all">All</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="out-for-delivery">Out for delivery</option>
                    <option value="delivered">Delivered</option>
                </select>
                <svg class="absolute right-2 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        <!-- Active Orders Section -->
        <div class="mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Active Orders</h2>
        </div>

        <!-- Orders Table -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Progress</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                        <!-- Order Details -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ order.orderId }}</div>
                            <div class="text-sm text-gray-500">{{ order.total }} • {{ order.items }} items</div>
                            <div class="text-xs text-gray-400">Ordered: {{ order.orderedTime }}</div>
                        </td>
                        <!-- Customer -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                            <div class="text-sm text-gray-500">{{ order.customer.phone }}</div>
                            <div class="text-sm text-gray-500">{{ order.customer.address }}</div>
                        </td>
                        <!-- Restaurant -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ order.restaurant }}</div>
                        </td>
                        <!-- Rider -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div v-if="order.rider" class="text-sm text-gray-900">{{ order.rider.name }}</div>
                            <div v-if="order.rider" class="text-sm text-gray-500">{{ order.rider.phone }}</div>
                            <div v-else class="text-sm text-red-600 font-medium">No Rider Assigned</div>
                        </td>
                        <!-- Status & Progress -->
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
                        <!-- Timeline -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div v-if="order.eta" class="text-sm text-gray-900">ETA: {{ order.eta }}</div>
                            <div v-if="order.remaining" class="text-sm text-gray-500">{{ order.remaining }} remaining</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const searchQuery = ref('');
const statusFilter = ref('all');

const orders = ref([
    {
        id: 1,
        orderId: 'ORD001',
        total: '$32.97',
        items: 2,
        orderedTime: '14:30:00',
        customer: {
            name: 'John Smith',
            phone: '+1-555-0100',
            address: '123 Oak Street'
        },
        restaurant: 'Golden Dragon Restaurant',
        rider: null,
        status: 'Ready',
        eta: '15:00',
        remaining: '5:00'
    },
    {
        id: 2,
        orderId: 'ORD001',
        total: '$32.97',
        items: 1,
        orderedTime: '14:30:00',
        customer: {
            name: 'John Smith',
            phone: '+1-555-0100',
            address: '123 Oak Street'
        },
        restaurant: 'Golden Dragon Restaurant',
        rider: {
            name: 'Mike Wilson',
            phone: '+1-555-0200'
        },
        status: 'Preparing',
        eta: '15:00',
        remaining: '5:00'
    },
    {
        id: 3,
        orderId: 'ORD001',
        total: '$32.97',
        items: 1,
        orderedTime: '14:30:00',
        customer: {
            name: 'John Smith',
            phone: '+1-555-0100',
            address: '123 Oak Street'
        },
        restaurant: 'Mama Put Restaurant',
        rider: {
            name: 'Mike Wilson',
            phone: '+1-555-0200'
        },
        status: 'Out for delivery',
        eta: '15:00',
        remaining: '5:00'
    },
    {
        id: 4,
        orderId: 'ORD001',
        total: '$32.97',
        items: 1,
        orderedTime: '14:30:00',
        customer: {
            name: 'John Smith',
            phone: '+1-555-0100',
            address: '123 Oak Street'
        },
        restaurant: 'Mama Put Restaurant',
        rider: {
            name: 'Mike Wilson',
            phone: '+1-555-0200'
        },
        status: 'Delivered',
        eta: '15:00',
        remaining: '5:00'
    }
]);

const filteredOrders = computed(() => {
    let filtered = orders.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (order) =>
                order.orderId.toLowerCase().includes(query) ||
                order.customer.name.toLowerCase().includes(query) ||
                order.restaurant.toLowerCase().includes(query)
        );
    }

    // Filter by status
    if (statusFilter.value !== 'all') {
        filtered = filtered.filter((order) => {
            const status = order.status.toLowerCase().replace(/\s+/g, '-');
            return status === statusFilter.value;
        });
    }

    return filtered;
});

const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'ready') {
        return 'bg-purple-100 text-purple-800';
    } else if (statusLower === 'preparing') {
        return 'bg-yellow-100 text-yellow-800';
    } else if (statusLower === 'out for delivery') {
        return 'bg-green-100 text-green-800';
    } else if (statusLower === 'delivered') {
        return 'bg-gray-100 text-gray-800';
    }
    return 'bg-gray-100 text-gray-800';
};
</script>

