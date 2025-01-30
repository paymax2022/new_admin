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
                        <th class="px-4 py-2 border border-gray-300 text-left">Name / Month</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Payment Type</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Amount</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Currency</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Status</th>
                        <th class="px-4 py-2 border border-gray-300 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="paginatedData.length">
                        <template v-for="data in paginatedData" :key="data.id">
                            <tr class="even:bg-gray-50">
                                <td class="px-4 py-2 border border-gray-300">{{ data.id }}</td>
                                <td class="px-4 py-2 border border-gray-300 whitespace-nowrap">{{ data.name || data.month }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.paymenttype || '' }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.amount }}</td>
                                <td class="px-4 py-2 border border-gray-300">₦</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.status }}</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">
                                    <button
                                        type="button"
                                        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                        aria-label="Edit Payment"
                                        @click="goToSavePayment(data.id)"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <tr v-else>
                        <td colspan="7" class="px-4 py-2 text-center text-gray-500">No data available.</td>
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
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, watch } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const goToSavePayment = (id: number) => {
        router.push({ name: 'savePayment', params: { id } });
    };

    const tableData = ref([
        { id: 1, name: 'John Doe', month: 'October', paymenttype: 'Bank Transfer', amount: '100', status: 'Active' },
        { id: 2, name: 'Jane Smith', month: 'November', paymenttype: 'Bank Transfer', amount: '2000', status: 'Disable' },
        { id: 3, name: 'Alice Brown', month: 'December', paymenttype: 'Bank Transfer', amount: '500', status: 'Disable' },
        { id: 4, name: 'Charlie White', month: 'January', paymenttype: 'Bank Transfer', amount: '300', status: 'Disable' },
        { id: 5, name: 'Eve Green', month: 'February', paymenttype: 'Bank Transfer', amount: '700', status: 'Active' },
        { id: 6, name: 'Mike Black', month: 'March', paymenttype: 'Bank Transfer', amount: '400', status: 'Disable' },
        { id: 7, name: '', month: 'April', paymenttype: '', amount: '700', status: 'Active' }, // For month display
    ]);

    const searchQuery = ref('');
    const entriesPerPage = ref(5);
    const currentPage = ref(1);

    const filteredData = computed(() => {
        return tableData.value.filter((data) => {
            const searchTerm = searchQuery.value.toLowerCase();
            return (data.name && data.name.toLowerCase().includes(searchTerm)) || (data.month && data.month.toLowerCase().includes(searchTerm));
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
</script>
