<template>
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <!-- Header with Search -->
            <div class="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="">
                    <h1 class="text-2xl font-bold text-gray-800">Menu Items Details</h1>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search menu items..."
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
                        <select v-model="perPage" @change="updatePagination" class="mx-2 border rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        entries
                    </div>
                </div>
            </div>
            <div class="flex gap-6 my-6 justify-end mx-5">
                <button class="flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Menu Item
                </button>
            </div>
            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIT PRICE</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="menuItem in paginatedMenuItems" :key="menuItem.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ menuItem.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500 capitalize">{{ menuItem.category }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {{ menuItem.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500 capitalize">
                                    {{ menuItem.unit_price }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center space-x-3">
                                    <button class="text-blue-500 hover:text-blue-700" title="View">
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
                                    <button class="text-green-500 hover:text-green-700" title="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </button>
                                    <button class="text-purple-500 hover:text-purple-700" title="Modify">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </button>
                                    <button class="text-red-500 hover:text-red-700" title="Delete">
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
                        <tr v-if="filteredMenuItems.length === 0">
                            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No menu items found</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination Footer -->
            <div class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-500">
                    Showing <span class="font-medium">{{ pagination.startIndex + 1 }}</span> to <span class="font-medium">{{ pagination.endIndex }}</span> of
                    <span class="font-medium">{{ filteredMenuItems.length }}</span> entries
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
</template>

<script setup>
    import { ref, computed, watch } from 'vue';

    const menuItems = ref([
        { id: 1, name: 'The Salad God', category: 'Beverages', status: 'Active', unit_price: '50,000.00' },
        { id: 2, name: 'Wham! Bam! Burrito', category: 'Sweet', status: 'Active', unit_price: '10,000.00' },
        { id: 3, name: 'Gustosa Pasta', category: 'Beef', status: 'Active', unit_price: '3,000.00' },
        { id: 4, name: 'Burger King', category: 'Fast Food', status: 'Active', unit_price: '1,000.00' },
        { id: 5, name: 'McDonalds', category: 'Fast Food', status: 'Active', unit_price: '9,000.00' },
        { id: 6, name: 'Starbucks', category: 'Beverages', status: 'Active', unit_price: '1,000.00' },
        { id: 7, name: 'Mr Beast Burger', category: 'Burgers', status: 'Active', unit_price: '1,000.00' },
        { id: 8, name: "Sultan's Dine", category: 'Asian', status: 'Active', unit_price: '1,000.00' },
        // Add more sample data to test pagination
        ...Array.from({ length: 12 }, (_, i) => ({
            id: i + 9,
            name: `Menu Item ${i + 9}`,
            category: ['Beverages', 'Sweet', 'Beef', 'Fast Food'][i % 4],
            status: 'Active',
            unit_price: `${(i + 1) * 1000}.00`,
        })),
    ]);

    const searchQuery = ref('');
    const perPage = ref(10);
    const currentPage = ref(1);

    // Filter menu items based on search query
    const filteredMenuItems = computed(() => {
        if (!searchQuery.value) return menuItems.value;

        const query = searchQuery.value.toLowerCase();
        return menuItems.value.filter(
            (item) =>
                item.name.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.status.toLowerCase().includes(query) ||
                item.unit_price.toLowerCase().includes(query),
        );
    });

    // Pagination calculations
    const totalPages = computed(() => Math.ceil(filteredMenuItems.value.length / perPage.value));

    const pagination = computed(() => {
        const startIndex = (currentPage.value - 1) * perPage.value;
        const endIndex = Math.min(startIndex + perPage.value, filteredMenuItems.value.length);
        return { startIndex, endIndex };
    });

    const paginatedMenuItems = computed(() => {
        return filteredMenuItems.value.slice(pagination.value.startIndex, pagination.value.endIndex);
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
