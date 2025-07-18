<template>
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <!-- Header with Search -->
            <div class="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="">
                    <h1 class="text-2xl font-bold text-gray-800">Delivery Agents</h1>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search agents..."
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
                    Add Agent
                </button>
            </div>
            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BIKE NUMBER</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="agent in paginatedAgents" :key="agent.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ agent.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500">{{ agent.email }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500">{{ agent.phone }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500">{{ agent.bikeNumber }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                    :class="{
                                        'bg-green-100 text-green-800': agent.status === 'Active',
                                        'bg-yellow-100 text-yellow-800': agent.status === 'On Leave',
                                        'bg-red-100 text-red-800': agent.status === 'Inactive',
                                    }"
                                >
                                    {{ agent.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center space-x-3">
                                    <button @click="goToView" class="text-blue-500 hover:text-blue-700">
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
                                    <button   @click="goToEdit" class="text-green-500 hover:text-green-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </button>

                                </div>
                            </td>
                        </tr>
                        <tr v-if="filteredAgents.length === 0">
                            <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No agents found</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination Footer -->
            <div class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-500">
                    Showing <span class="font-medium">{{ pagination.startIndex + 1 }}</span> to <span class="font-medium">{{ pagination.endIndex }}</span> of
                    <span class="font-medium">{{ filteredAgents.length }}</span> entries
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
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToCreate = () => {
        router.push({ name: 'createDeliveryAgents' });
    };
    const goToEdit = () => {
        router.push({ name: 'editDeliveryAgents' });
    };
    const goToView = () => {
        router.push({ name: 'viewDeliveryAgent' });
    };

    const deliveryAgents = ref([
        { id: 1, name: 'Raj Patel', email: 'raj.patel@example.com', phone: '(123) 456-7890', bikeNumber: 'MH01AB1234', status: 'Active' },
        { id: 2, name: 'Priya Sharma', email: 'priya.s@example.com', phone: '(234) 567-8901', bikeNumber: 'DL02CD5678', status: 'Active' },
        { id: 3, name: 'Amit Singh', email: 'amit.s@example.com', phone: '(345) 678-9012', bikeNumber: 'KA03EF9012', status: 'On Leave' },
        { id: 4, name: 'Neha Gupta', email: 'neha.g@example.com', phone: '(456) 789-0123', bikeNumber: 'TN04GH3456', status: 'Active' },
        { id: 5, name: 'Vikram Joshi', email: 'vikram.j@example.com', phone: '(567) 890-1234', bikeNumber: 'AP05IJ7890', status: 'Inactive' },
        { id: 6, name: 'Ananya Reddy', email: 'ananya.r@example.com', phone: '(678) 901-2345', bikeNumber: 'WB06KL1234', status: 'Active' },
        { id: 7, name: 'Rahul Mehta', email: 'rahul.m@example.com', phone: '(789) 012-3456', bikeNumber: 'GJ07MN5678', status: 'Active' },
        { id: 8, name: 'Sneha Iyer', email: 'sneha.i@example.com', phone: '(890) 123-4567', bikeNumber: 'RJ08OP9012', status: 'On Leave' },
        { id: 9, name: 'Arjun Kumar', email: 'arjun.k@example.com', phone: '(901) 234-5678', bikeNumber: 'UP09QR3456', status: 'Active' },
        { id: 10, name: 'Divya Nair', email: 'divya.n@example.com', phone: '(012) 345-6789', bikeNumber: 'MP10ST7890', status: 'Inactive' },
    ]);

    const searchQuery = ref('');
    const perPage = ref(5);
    const currentPage = ref(1);

    // Filter agents based on search query
    const filteredAgents = computed(() => {
        if (!searchQuery.value) return deliveryAgents.value;

        const query = searchQuery.value.toLowerCase();
        return deliveryAgents.value.filter(
            (agent) =>
                agent.name.toLowerCase().includes(query) ||
                agent.email.toLowerCase().includes(query) ||
                agent.phone.toLowerCase().includes(query) ||
                agent.bikeNumber.toLowerCase().includes(query) ||
                agent.status.toLowerCase().includes(query),
        );
    });

    // Pagination calculations
    const totalPages = computed(() => Math.ceil(filteredAgents.value.length / perPage.value));

    const pagination = computed(() => {
        const startIndex = (currentPage.value - 1) * perPage.value;
        const endIndex = Math.min(startIndex + perPage.value, filteredAgents.value.length);
        return { startIndex, endIndex };
    });

    const paginatedAgents = computed(() => {
        return filteredAgents.value.slice(pagination.value.startIndex, pagination.value.endIndex);
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
