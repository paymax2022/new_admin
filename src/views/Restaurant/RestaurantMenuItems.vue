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
                <button @click="goToCreate" class="flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white cursor-pointer">
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
                        <tr v-if="loading" class="hover:bg-gray-50">
                            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">Loading menu items...</td>
                        </tr>
                        <tr v-else-if="menuItems.length === 0" class="hover:bg-gray-50">
                            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No menu items found</td>
                        </tr>
                        <tr v-else v-for="menuItem in paginatedMenuItems" :key="menuItem._id || menuItem.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ menuItem.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500 capitalize">{{ menuItem.category }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(menuItem)">
                                    {{ getStatus(menuItem) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500 capitalize">
                                    {{ formatPrice(menuItem.price || menuItem.unit_price) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center space-x-3">
                                    <button @click="goToView(menuItem)" class="text-blue-500 hover:text-blue-700" title="View">
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
                                    <button @click="goToEdit(menuItem)" class="text-green-500 hover:text-green-700" title="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </button>
                                    <button  @click="goToVariant" class="text-purple-500 hover:text-purple-700" title="Modify">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </button>
                                    <button @click="handleDelete(menuItem)" class="text-red-500 hover:text-red-700" title="Delete">
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

<script setup lang="ts">
    import { ref, computed, watch, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import { restaurantService } from '@/services/restaurantService';

    const router = useRouter();
    const toast = useToast();
    const loading = ref(false);

    const goToCreate = () => {
        router.push({ name: 'createMenu' });
    };
    const goToView = (menuItem: any) => {
        router.push({ name: 'viewMenu', params: { id: menuItem._id || menuItem.id } });
    };
    const goToEdit = (menuItem: any) => {
        router.push({ name: 'editMenu', params: { id: menuItem._id || menuItem.id } });
    };
    const goToVariant = () => {
        router.push({ name: 'variantMenu' });
    };

    const menuItems = ref([]);

    // Fetch menus from API
    const fetchMenus = async () => {
        try {
            loading.value = true;
            const response = await restaurantService.getAllMenus();
            console.log('Menus response:', response);
            
            // Handle response structure: { data: [...], message: string, ok: boolean }
            if (response?.data && Array.isArray(response.data)) {
                // Filter out deleted items (deleted_at !== "0001-01-01T00:00:00Z")
                menuItems.value = response.data.filter(item => 
                    !item.deleted_at || item.deleted_at === "0001-01-01T00:00:00Z"
                );
                toast.success('Menu items loaded successfully');
            } else if (Array.isArray(response)) {
                menuItems.value = response.filter(item => 
                    !item.deleted_at || item.deleted_at === "0001-01-01T00:00:00Z"
                );
            } else {
                menuItems.value = [];
                console.warn('Unexpected response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching menus:', error);
            toast.error('Failed to load menu items');
            menuItems.value = [];
        } finally {
            loading.value = false;
        }
    };

    // Format price for display
    const formatPrice = (price) => {
        if (!price && price !== 0) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return new Intl.NumberFormat('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numPrice);
    };

    // Get status based on deleted_at
    const getStatus = (item) => {
        if (item.deleted_at && item.deleted_at !== "0001-01-01T00:00:00Z") {
            return 'Deleted';
        }
        return 'Active';
    };

    // Get status class for styling
    const getStatusClass = (item) => {
        if (item.deleted_at && item.deleted_at !== "0001-01-01T00:00:00Z") {
            return 'bg-red-100 text-red-800';
        }
        return 'bg-green-100 text-green-800';
    };

    onMounted(() => {
        fetchMenus();
    });

    const searchQuery = ref('');
    const perPage = ref(10);
    const currentPage = ref(1);

    // Filter menu items based on search query
    const filteredMenuItems = computed(() => {
        if (!searchQuery.value) return menuItems.value;

        const query = searchQuery.value.toLowerCase();
        return menuItems.value.filter(
            (item) =>
                (item.name || '').toLowerCase().includes(query) ||
                (item.category || '').toLowerCase().includes(query) ||
                getStatus(item).toLowerCase().includes(query) ||
                formatPrice(item.price || item.unit_price).toLowerCase().includes(query),
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

    const handleDelete = async (menuItem: any) => {
        if (!confirm(`Are you sure you want to delete "${menuItem.name}"?`)) {
            return;
        }

        const menuId = menuItem._id || menuItem.id;
        const restaurantId = menuItem.restaurant_id;

        if (!menuId || !restaurantId) {
            toast.error('Missing menu or restaurant ID');
            return;
        }

        try {
            await restaurantService.deleteMenu(restaurantId, menuId);
            toast.success('Menu item deleted successfully');
            fetchMenus(); // Refresh the list
        } catch (error: any) {
            console.error('Error deleting menu:', error);
            toast.error(error.response?.data?.message || 'Failed to delete menu item');
        }
    };

    // Reset to page 1 when search or perPage changes
    watch([searchQuery, perPage], () => {
        currentPage.value = 1;
    });
</script>
