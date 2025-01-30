<template>
    <div>
        <!-- Search Bar -->
        <div class="mb-4">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search by month or name..."
                class="sm:w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <!-- Entries Per Page Selector -->
        <div class="mb-4 flex items-center">
            <label for="entries" class="mr-2 text-gray-600">Show</label>
            <select id="entries" v-model="entriesPerPage" class="border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="20">20</option>
            </select>
            <span class="ml-2 text-gray-600">entries</span>
        </div>

        <!-- Table -->
        <div class="table-responsive overflow-auto">
            <table class="table-auto w-full border-collapse border border-gray-300">
                <thead class="bg-gray-300">
                    <tr>
                        <th class="px-4 py-2 border border-gray-300 text-left">ID</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Name</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Month</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Payment Type</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Amount</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Currency</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Subscription</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Status</th>
                        <th class="px-4 py-2 border border-gray-300 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="paginatedData.length">
                        <template v-for="data in paginatedData" :key="data.id">
                            <tr class="even:bg-gray-50">
                                <td class="px-4 py-2 border border-gray-300">{{ data.id }}</td>
                                <td class="px-4 py-2 border border-gray-300 whitespace-nowrap">{{ data.name }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.month }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.paymenttype }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.amount }}</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">₦</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.subscription }}</td>
                                <td class="px-4 py-2 border border-gray-300" :class="getStatusClass(data.status)">
                                    {{ data.status }}
                                </td>
                                <td class="px-4 py-2 border border-gray-300 text-center">
                                    <button
                                        type="button"
                                        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                        aria-label="Edit Payment"
                                        @click="openEditModal(data)"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <tr v-else>
                        <td colspan="8" class="px-4 py-2 text-center text-gray-500">No data available.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center mt-4">
            <button
                :disabled="currentPage === 1"
                @click="currentPage--"
                class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button
                :disabled="currentPage === totalPages"
                @click="currentPage++"
                class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>

        <!-- Edit Modal -->
        <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 class="text-xl font-semibold mb-4">Edit ID {{ editingData.id }}</h2>

                <div class="mb-4">
                    <label class="block text-gray-700">Name</label>
                    <input v-model="editingData.name" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Payment Type</label>
                    <input
                        v-model="editingData.paymenttype"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Amount</label>
                    <input
                        v-model="editingData.amount"
                        type="number"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Subscription</label>
                    <select v-model="editingData.subscription" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                        <option value="Doctor Subscription">Doctor Subscription</option>
                        <option value="Pharmacy Subscription">Pharmacy Subscription</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Status</label>
                    <select v-model="editingData.status" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                        <option value="Active">Active</option>
                        <option value="Disable">Disable</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <div class="flex justify-end space-x-4">
                    <button @click="isEditModalOpen = false" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
                    <button @click="saveChanges" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, watch } from 'vue';

    const tableData = ref([
        { id: 1, name: 'John Doe', month: 'October', paymenttype: 'Bank Transfer', amount: '100', status: 'Active', subscription: 'Doctor Subscription' },
        {
            id: 2,
            name: 'Jane Smith',
            month: 'November',
            paymenttype: 'Bank Transfer',
            amount: '2000',
            status: 'Disable',
            subscription: 'Pharmacy Subscription',
        },
        { id: 3, name: 'Alice Brown', month: 'December', paymenttype: 'Bank Transfer', amount: '500', status: 'Pending', subscription: 'Doctor Subscription' },
        {
            id: 4,
            name: ' Smith Vee',
            month: 'November',
            paymenttype: 'Bank Transfer',
            amount: '2000',
            status: 'Disable',
            subscription: 'Pharmacy Subscription',
        },
        {
            id: 5,
            name: 'Smith',
            month: 'November',
            paymenttype: 'Bank Transfer',
            amount: '2000',
            status: 'Disable',
            subscription: 'Pharmacy Subscription',
        },
    ]);

    const searchQuery = ref('');
    const entriesPerPage = ref(5);
    const currentPage = ref(1);

    const filteredData = computed(() => {
        return tableData.value.filter((data) => {
            const searchTerm = searchQuery.value.toLowerCase();
            return data.name?.toLowerCase().includes(searchTerm) || data.month?.toLowerCase().includes(searchTerm);
        });
    });

    const totalPages = computed(() => Math.ceil(filteredData.value.length / entriesPerPage.value));
    const paginatedData = computed(() => {
        const startIndex = (currentPage.value - 1) * entriesPerPage.value;
        return filteredData.value.slice(startIndex, startIndex + entriesPerPage.value);
    });

    watch([entriesPerPage, searchQuery], () => {
        currentPage.value = 1;
    });

    // Modal logic
    const isEditModalOpen = ref(false);
    const editingData = ref<any>({});

    const openEditModal = (data: any) => {
        isEditModalOpen.value = true;
        editingData.value = { ...data }; // Clone data to avoid directly mutating it
    };

    const saveChanges = () => {
        const index = tableData.value.findIndex((item) => item.id === editingData.value.id);
        if (index !== -1) {
            tableData.value[index] = { ...editingData.value };
        }
        isEditModalOpen.value = false;
    };

    // Status class method
    const getStatusClass = (status: string) => {
        if (status === 'Active') return 'text-green-600 font-semibold';
        if (status === 'Disable') return 'text-red-600 font-semibold';
        if (status === 'Pending') return 'text-orange-500 font-semibold';
        return '';
    };
</script>
