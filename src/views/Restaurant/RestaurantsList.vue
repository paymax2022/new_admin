<template>
    <div class="container py-8">
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <!-- Header with Search -->
            <div
                class="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="">
                    <h1 class="text-2xl font-bold text-gray-800">Restaurant Details</h1>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="Search restaurants..."
                            class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                            @input="handleSearch" />
                        <div class="absolute left-3 top-2.5 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div class="text-sm text-gray-500 flex items-center">
                        Show
                        <select v-model="perPage" @change="updatePagination"
                            class="mx-2 border rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500">
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

                <button @click="goToCreate"
                    class="flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Restaurant
                </button>
            </div>
            <!-- Loading State -->
            <div v-if="loading" class="px-6 py-8 text-center">
                <div class="inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Loading restaurants...
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="px-6 py-8 text-center">
                <div class="text-red-600 mb-4">{{ error }}</div>
                <button @click="fetchRestaurants" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Try Again
                </button>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                NAME</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                USER</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                STATUS</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="restaurant in paginatedRestaurants" :key="restaurant._id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ restaurant.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500 capitalize">{{ restaurant.user_id }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                    :class="restaurant.accepting_orders ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                    {{ restaurant.accepting_orders ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center space-x-3">
                                    <button @click="goToView(restaurant._id)" class="text-blue-500 hover:text-blue-700"
                                        title="View">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                    <button @click="goToEdit(restaurant._id)"
                                        class="text-green-500 hover:text-green-700" title="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button v-if="!restaurant.verified" @click="openVerifyModal(restaurant)"
                                        class="text-purple-500 hover:text-purple-700" title="Verify Restaurant">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <button @click="handleDelete(restaurant._id)"
                                        class="text-red-500 hover:text-red-700" title="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="paginatedRestaurants.length === 0 && !loading">
                            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No restaurants found
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination Footer -->
            <div v-if="!loading && !error"
                class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-500">
                    Showing <span class="font-medium">{{ pagination.startIndex + 1 }}</span> to <span
                        class="font-medium">{{ pagination.endIndex }}</span> of
                    <span class="font-medium">{{ totalRestaurants }}</span> entries
                </div>

                <div class="flex items-center gap-1">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="{ 'hover:bg-gray-50': currentPage !== 1 }">
                        Previous
                    </button>

                    <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
                        class="w-8 h-8 flex items-center justify-center border rounded"
                        :class="{ 'bg-blue-500 text-white border-blue-500': page === currentPage, 'hover:bg-gray-50': page !== currentPage }">
                        {{ page }}
                    </button>

                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="{ 'hover:bg-gray-50': currentPage !== totalPages }">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Verification Modal -->
    <div v-if="showVerifyModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        @click.self="closeVerifyModal">
        <div class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-900">Verify Restaurant</h3>
                <button @click="closeVerifyModal" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <div v-if="selectedRestaurant" class="space-y-4">
                <!-- Restaurant Details -->
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-3">Restaurant Information</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="font-medium text-gray-700">Name:</span>
                            <span class="text-gray-900 ml-2">{{ selectedRestaurant.name }}</span>
                        </div>
                        <div>
                            <span class="font-medium text-gray-700">Type:</span>
                            <span class="text-gray-900 ml-2">{{ selectedRestaurant.restaurant_type || 'N/A' }}</span>
                        </div>
                        <div>
                            <span class="font-medium text-gray-700">Address:</span>
                            <span class="text-gray-900 ml-2">{{ selectedRestaurant.address || 'N/A' }}</span>
                        </div>
                        <div>
                            <span class="font-medium text-gray-700">Status:</span>
                            <span :class="selectedRestaurant.accepting_orders ? 'text-green-600' : 'text-red-600'"
                                class="ml-2 font-medium">
                                {{ selectedRestaurant.accepting_orders ? 'Active' : 'Inactive' }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Verification Actions -->
                <div class="flex justify-end space-x-3 pt-4">
                    <button @click="closeVerifyModal"
                        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Cancel
                    </button>
                    <button @click="handleVerifyRestaurant" :disabled="verifying"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50">
                        <span v-if="verifying">Verifying...</span>
                        <span v-else>Verify Restaurant</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';

const restaurants = ref([]);
const searchQuery = ref('');
const perPage = ref(10);
const currentPage = ref(1);
const loading = ref(false);
const error = ref('');
const totalRestaurants = ref(0);
const router = useRouter();
const toast = useToast();

// Verification modal state
const showVerifyModal = ref(false);
const selectedRestaurant = ref(null);
const verifying = ref(false);



// Fetch restaurants from API
const fetchRestaurants = async () => {
    loading.value = true;
    error.value = '';

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
        if (loading.value) {
            loading.value = false;
            error.value = 'Request timeout - please try again';
            console.warn('API request timed out');
        }
    }, 10000); // 10 second timeout

    try {
        const response = await restaurantService.getAllRestaurants(10, currentPage.value);
        clearTimeout(timeoutId);

        console.log('API Response received:', response);

        // Handle different possible response structures
        if (Array.isArray(response)) {
            // If response is directly an array
            restaurants.value = response;
            totalRestaurants.value = response.length;
            console.log('Using direct array response');
        } else if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
            // If response has nested data structure: response.data.data
            restaurants.value = response.data.data;
            totalRestaurants.value = response.data.total || response.data.data.length;
            console.log('Using nested response.data.data array');
        } else if (response && response.data && Array.isArray(response.data)) {
            // If response has a data property with array
            restaurants.value = response.data;
            totalRestaurants.value = response.total || response.data.length;
            console.log('Using response.data array');
        } else if (response && response.restaurants && Array.isArray(response.restaurants)) {
            // If response has a restaurants property
            restaurants.value = response.restaurants;
            totalRestaurants.value = response.total || response.restaurants.length;
            console.log('Using response.restaurants array');
        } else if (response && response.results && Array.isArray(response.results)) {
            // If response has a results property
            restaurants.value = response.results;
            totalRestaurants.value = response.total || response.results.length;
            console.log('Using response.results array');
        } else if (response && response.items && Array.isArray(response.items)) {
            // If response has an items property
            restaurants.value = response.items;
            totalRestaurants.value = response.total || response.items.length;
            console.log('Using response.items array');
        } else {
            // Fallback - try to find any array in the response
            restaurants.value = [];
            totalRestaurants.value = 0;
            console.warn('Unexpected API response structure:', response);
            console.warn('Available properties:', Object.keys(response || {}));
        }

        console.log('Successfully loaded', restaurants.value.length, 'restaurants');
    } catch (err) {
        clearTimeout(timeoutId);
        error.value = 'Failed to fetch restaurants';
        toast.error('Failed to fetch restaurants');
        console.error('Error fetching restaurants:', err);
    } finally {
        loading.value = false;
    }
};

// Navigation methods
const goToCreate = () => {
    router.push({ name: 'createRestaurant' });
};

const goToEdit = (restaurantId) => {
    router.push({ name: 'editRestaurant', params: { id: restaurantId } });
};

const goToView = (restaurantId) => {
    router.push({ name: 'restaurantListView', params: { id: restaurantId } });
};

const handleDelete = async (restaurantId) => {
    if (confirm('Are you sure you want to delete this restaurant?')) {
        try {
            await restaurantService.deleteRestaurant(restaurantId);
            toast.success('Restaurant deleted successfully');
            await fetchRestaurants(); // Refresh the list
        } catch (err) {
            toast.error('Failed to delete restaurant');
            console.error('Error deleting restaurant:', err);
        }
    }
};

// Verification modal handlers
const openVerifyModal = (restaurant) => {
    selectedRestaurant.value = restaurant;
    showVerifyModal.value = true;
};

const closeVerifyModal = () => {
    showVerifyModal.value = false;
    selectedRestaurant.value = null;
    verifying.value = false;
};

const handleVerifyRestaurant = async () => {
    if (!selectedRestaurant.value) return;

    verifying.value = true;

    try {
        await restaurantService.verifyRestaurant(selectedRestaurant.value._id);
        toast.success('Restaurant verified successfully');

        // Update the restaurant in the local list
        const restaurantIndex = restaurants.value.findIndex(r => r._id === selectedRestaurant.value._id);
        if (restaurantIndex !== -1) {
            restaurants.value[restaurantIndex].verified = true;
        }

        closeVerifyModal();
    } catch (err) {
        toast.error('Failed to verify restaurant');
        console.error('Error verifying restaurant:', err);
    } finally {
        verifying.value = false;
    }
};
// Filter restaurants based on search query
const filteredRestaurants = computed(() => {
    if (!searchQuery.value) {
        return restaurants.value;
    }

    const query = searchQuery.value.toLowerCase();
    return restaurants.value.filter(
        (restaurant) =>
            restaurant.name.toLowerCase().includes(query) ||
            restaurant.user_id.toLowerCase().includes(query) ||
            restaurant.restaurant_type.toLowerCase().includes(query) ||
            restaurant.address.toLowerCase().includes(query),
    );
});

// Pagination calculations
const totalPages = computed(() => Math.ceil(totalRestaurants.value / perPage.value));

const pagination = computed(() => {
    const startIndex = (currentPage.value - 1) * perPage.value;
    const endIndex = Math.min(startIndex + perPage.value, totalRestaurants.value);
    return { startIndex, endIndex };
});

const paginatedRestaurants = computed(() => {
    return filteredRestaurants.value.slice(pagination.value.startIndex, pagination.value.endIndex);
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
        fetchRestaurants(); // Fetch new data when page changes
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchRestaurants();
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchRestaurants();
    }
};

const updatePagination = () => {
    currentPage.value = 1;
    fetchRestaurants();
};

const handleSearch = () => {
    currentPage.value = 1;
    // Search is handled client-side, no need to refetch
};

// Reset to page 1 when search or perPage changes
watch([searchQuery, perPage], () => {
    currentPage.value = 1;
});

// Load restaurants on component mount
onMounted(() => {
    fetchRestaurants();
});
</script>
