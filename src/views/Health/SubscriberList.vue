<template>
    <div>
        <div class="mb-4">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search by name..."
                class="sm:w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div class="mb-4 flex items-center">
            <label for="entries" class="mr-2 text-gray-600">Show</label>
            <select id="entries" v-model="entriesPerPage" class="border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="20">20</option>
            </select>
            <span class="ml-2 text-gray-600">entries</span>
        </div>

        <div class="table-responsive overflow-auto">
            <table class="table-auto w-full border-collapse border border-gray-300">
                <thead class="bg-gray-300">
                    <tr>
                        <th class="px-4 py-2 border border-gray-300 text-left">ID</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Doctor Name</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Payment Type</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Amount</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Status</th>
                        <th class="px-4 py-2 border border-gray-300 text-center">Reciept File</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="paginatedData.length">
                        <template v-for="data in paginatedData" :key="data.id">
                            <tr class="even:bg-gray-50">
                                <td class="px-4 py-2 border border-gray-300">{{ data.id }}</td>
                                <td class="px-4 py-2 border border-gray-300 whitespace-nowrap">{{ data.name }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.paymenttype }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.amount }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.status }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.reciept }}</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">
                                    <div class="flex flex-col sm:space-y-1 sm:flex-col lg:flex-row lg:space-y-0 lg:space-x-2">
                                        <!-- View Button -->
                                        <button
                                            type="button"
                                            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            @click="viewSubpage(data.id)"
                                        >
                                            View
                                        </button>

                                        <!-- Toggle Button (Active/Disable) -->
                                        <button
                                            v-if="data.status === 'Active'"
                                            type="button"
                                            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                            @click="toggleStatus(data)"
                                        >
                                            Active
                                        </button>
                                        <button
                                            v-else
                                            type="button"
                                            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            @click="toggleStatus(data)"
                                        >
                                            Disable
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <tr v-else>
                        <td colspan="4" class="px-4 py-2 text-center text-gray-500">No data available.</td>
                    </tr>
                </tbody>
            </table>
        </div>

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
    const viewSubpage = (id: number) => {
        router.push({ name: 'viewSubPage', params: { id } });
    };
    const viewReceipt = (id: number) => {
        alert(`Viewing receipt for ID: ${id}`);
    };

    const toggleStatus = (data: any) => {
        data.status = data.status === 'Active' ? 'Disable' : 'Active';
    };

    const tableData = ref([
        { id: 1, name: 'John Doe', paymenttype: 'Bank Transfer', amount: '100', status: 'Active', reciept: 'View receipt' },
        { id: 2, name: 'Jane Smith', paymenttype: 'Bank Transfer', amount: '2000', status: 'Disable', reciept: 'View receipt' },
        { id: 3, name: 'Alice Brown', paymenttype: 'Bank Transfer', amount: '500', status: 'Disable', reciept: 'View receipt' },
        { id: 4, name: 'Charlie White', paymenttype: 'Bank Transfer', amount: '300', status: 'Disable', reciept: 'View receipt' },
        { id: 5, name: 'Eve Green', paymenttype: 'Bank Transfer', amount: '700', status: 'Active', reciept: 'View receipt' },
        { id: 6, name: 'Mike Black', paymenttype: 'Bank Transfer', amount: '400', status: 'Disable', reciept: 'View receipt' },
    ]);

    const searchQuery = ref('');
    const entriesPerPage = ref(5);
    const currentPage = ref(1);

    const filteredData = computed(() => {
        return tableData.value.filter((data) => data.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
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
