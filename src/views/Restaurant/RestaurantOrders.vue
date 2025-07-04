<template>
    <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="stat in stats" :key="stat.label" class="bg-white p-4 rounded-xl shadow-sm flex items-center border border-gray-100 space-x-4">
                <div :class="`p-3 rounded-full text-white ${stat.bg}`">
                    <component :is="stat.icon" class="w-6 h-6" />
                </div>
                <div>
                    <p class="text-gray-500 text-sm font-medium">{{ stat.label }}</p>
                    <p class="text-lg font-semibold text-gray-800">{{ stat.value }}</p>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 py-8">
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <!-- Header with Search -->
                <div class="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div class="">
                        <h1 class="text-2xl font-bold text-gray-800">Order Details</h1>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search orders..."
                                class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                                @input="handleSearch"
                            />
                            <div class="absolute left-3 top-2.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div class="text-sm text-gray-500 flex items-center">
                            Show
                            <select
                                v-model="perPage"
                                @change="updatePagination"
                                class="mx-2 border rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                            entries
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER CODE</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER TYPE</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ order.code }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ order.name }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-500">{{ order.date }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-500">{{ order.type }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[order.status]}`">
                                        {{ order.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ order.total }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div class="flex items-center space-x-3">
                                        <button  @click="goToView"  class="text-blue-500 hover:text-blue-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </button>
                                        <button class="text-red-500 hover:text-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filteredOrders.length === 0">
                                <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">No orders found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Footer -->
                <div class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="text-sm text-gray-500">
                        Showing <span class="font-medium">{{ pagination.startIndex + 1 }}</span> to
                        <span class="font-medium">{{ pagination.endIndex }}</span> of <span class="font-medium">{{ filteredOrders.length }}</span> entries
                    </div>

                    <div class="flex items-center gap-1">
                        <button
                            @click="prevPage"
                            :disabled="currentPage === 1"
                            class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="{ 'hover:bg-gray-50': currentPage !== 1 }"
                        >
                            Previous
                        </button>

                        <button
                            v-for="page in visiblePages"
                            :key="page"
                            @click="goToPage(page)"
                            class="w-8 h-8 flex items-center justify-center border rounded"
                            :class="{ 'bg-blue-500 text-white border-blue-500': page === currentPage, 'hover:bg-gray-50': page !== currentPage }"
                        >
                            {{ page }}
                        </button>

                        <button
                            @click="nextPage"
                            :disabled="currentPage === totalPages"
                            class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="{ 'hover:bg-gray-50': currentPage !== totalPages }"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
     import { useRouter } from 'vue-router';
    const router = useRouter();

    const goToView = () => {
        router.push({ name: 'viewOrder' });
    };
    import { CubeIcon, TruckIcon, ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/solid';
    const stats = [
        { label: 'Total Orders', value: 9, bg: 'bg-purple-500', icon: CubeIcon },
        { label: 'OrdersPending', value: 3, bg: 'bg-yellow-400', icon: ClockIcon },
        { label: 'Order Process', value: 0, bg: 'bg-green-300', icon: TruckIcon },
        { label: 'Order Completed', value: 0, bg: 'bg-sky-400', icon: CheckCircleIcon },
    ];

    // Sample data based on table headers
    const orders = ref([
        { id: 1, code: 'ORD-001', name: 'John Doe', date: '2023-08-15', type: 'Delivery', status: 'Completed', total: '$45.00' },
        { id: 2, code: 'ORD-002', name: 'Jane Smith', date: '2023-08-16', type: 'Pickup', status: 'Processing', total: '$32.50' },
        { id: 3, code: 'ORD-003', name: 'Robert Johnson', date: '2023-08-17', type: 'Dine-in', status: 'Pending', total: '$28.75' },
        { id: 4, code: 'ORD-004', name: 'Emily Davis', date: '2023-08-18', type: 'Delivery', status: 'Cancelled', total: '$52.30' },
        { id: 5, code: 'ORD-005', name: 'Michael Wilson', date: '2023-08-19', type: 'Pickup', status: 'Completed', total: '$19.99' },
        { id: 6, code: 'ORD-006', name: 'Sarah Brown', date: '2023-08-20', type: 'Dine-in', status: 'Processing', total: '$67.45' },
        { id: 7, code: 'ORD-007', name: 'David Taylor', date: '2023-08-21', type: 'Delivery', status: 'Completed', total: '$41.20' },
        { id: 8, code: 'ORD-008', name: 'Jessica Clark', date: '2023-08-22', type: 'Pickup', status: 'Pending', total: '$23.15' },
        { id: 9, code: 'ORD-009', name: 'Thomas White', date: '2023-08-23', type: 'Dine-in', status: 'Processing', total: '$38.90' },
        { id: 10, code: 'ORD-010', name: 'Lisa Hall', date: '2023-08-24', type: 'Delivery', status: 'Completed', total: '$55.60' },
    ]);

    // Status styling
    const statusClasses = {
        Completed: 'bg-green-100 text-green-800',
        Processing: 'bg-blue-100 text-blue-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Cancelled: 'bg-red-100 text-red-800',
    };

    const searchQuery = ref('');
    const perPage = ref(5);
    const currentPage = ref(1);

    // Filter orders based on search query
    const filteredOrders = computed(() => {
        if (!searchQuery.value) return orders.value;

        const query = searchQuery.value.toLowerCase();
        return orders.value.filter(
            (order) =>
                order.code.toLowerCase().includes(query) ||
                order.name.toLowerCase().includes(query) ||
                order.date.toLowerCase().includes(query) ||
                order.type.toLowerCase().includes(query) ||
                order.status.toLowerCase().includes(query) ||
                order.total.toLowerCase().includes(query),
        );
    });

    // Pagination calculations
    const totalPages = computed(() => Math.ceil(filteredOrders.value.length / perPage.value));

    const pagination = computed(() => {
        const startIndex = (currentPage.value - 1) * perPage.value;
        const endIndex = Math.min(startIndex + perPage.value, filteredOrders.value.length);
        return { startIndex, endIndex };
    });

    const paginatedOrders = computed(() => {
        return filteredOrders.value.slice(pagination.value.startIndex, pagination.value.endIndex);
    });

    // Visible pages for pagination (max 5 pages shown)
    const visiblePages = computed(() => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages.value, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    });

    // Pagination methods
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    };

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }
    };

    const updatePagination = () => {
        currentPage.value = 1;
    };

    const handleSearch = () => {
        currentPage.value = 1;
    };

    // Reset to page 1 when search or perPage changes
    watch([searchQuery, perPage], () => {
        currentPage.value = 1;
    });
</script>
