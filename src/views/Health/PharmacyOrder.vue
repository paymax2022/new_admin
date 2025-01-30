<template>
    <div>
        <!-- Search, Entries and Table (Same as Before) -->

        <div class="table-responsive overflow-auto">
            <table class="table-auto w-full border-collapse border border-gray-300">
                <thead class="bg-gray-300">
                    <tr>
                        <th class="px-4 py-2 border border-gray-300 text-left">ID</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Pharmacy Name</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Patient Name</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Phone</th>
                        <th class="px-4 py-2 border border-gray-300 text-left">Order Type</th>
                        <th class="px-4 py-2 border border-gray-300 text-center">Total</th>
                        <th class="px-4 py-2 border border-gray-300 text-center">Date</th>
                        <th class="px-4 py-2 border border-gray-300 text-center">More</th>
                        <th class="px-4 py-2 border border-gray-300 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="paginatedData.length">
                        <template v-for="data in paginatedData" :key="data.id">
                            <tr class="even:bg-gray-50">
                                <td class="px-4 py-2 border border-gray-300">{{ data.id }}</td>
                                <td class="px-4 py-2 border border-gray-300 whitespace-nowrap">{{ data.pharmacyName }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.patientName }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.phone }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.orderType }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.total }}</td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.date }}</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">
                                    <div class="flex flex-col sm:space-y-1 sm:flex-col lg:flex-row lg:space-y-0 lg:space-x-2">
                                        <button
                                            type="button"
                                            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            @click="openModal(data)"
                                        >
                                            More
                                        </button>
                                    </div>
                                </td>
                                <td class="px-4 py-2 border border-gray-300">{{ data.status }}</td>
                            </tr>
                        </template>
                    </template>
                    <tr v-else>
                        <td colspan="4" class="px-4 py-2 text-center text-gray-500">No data available.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 p-4 relative">
                <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 text-xl">&times;</button>
                <h2 class="text-xl font-semibold mb-4">Order Details</h2>
                <div class="space-y-4">
                    <p><strong>ID:</strong> {{ selectedData.id }}</p>
                    <p><strong>Pharmacy Name:</strong> {{ selectedData.pharmacyName }}</p>
                    <p><strong>Patient Name:</strong> {{ selectedData.patientName }}</p>
                    <p><strong>Phone:</strong> {{ selectedData.phone }}</p>
                    <p><strong>Order Type:</strong> {{ selectedData.orderType }}</p>
                    <p><strong>Total:</strong> {{ selectedData.total }}</p>
                    <p><strong>Date:</strong> {{ selectedData.date }}</p>
                    <p><strong>Status:</strong> {{ selectedData.status }}</p>
                    <div>
                        <img :src="OrderImage" class="h-[400px] w-[400px]" alt="" />
                    </div>
                </div>
                <div class="mt-4">
                    <button @click="closeModal" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import OrderImage from '@/assets/orderdetail.png';
    const router = useRouter();
    const viewSubpage = (id: number) => {
        router.push({ name: 'viewSubPage', params: { id } });
    };

    const tableData = ref([
        {
            id: 1,
            pharmacyName: 'Parloff World',
            patientName: 'Parloff',
            phone: '+234 100-400-400',
            status: 'Accepted',
            orderType: 'Prescription',
            total: 3,
            date: '2024-09-20 04:20:22',
        },
        {
            id: 2,
            pharmacyName: 'Loff Pharmacy',
            patientName: 'Veekthor king',
            phone: '+225 300-200-100',
            status: 'Rejected',
            orderType: 'Normal',
            total: 1,
            date: '2024-09-20 04:20:22',
        },
        {
            id: 3,
            pharmacyName: 'BrownPharm',
            patientName: 'Parloff Wrld',
            phone: '+237 100-400-400',
            status: 'Accepted',
            orderType: 'Normal',
            total: 5,
            date: '2024-09-20 04:20:22',
        },
        {
            id: 4,
            pharmacyName: 'Veethor Clinic',
            patientName: 'Black White',
            phone: '+934 100-700-300',
            status: 'Accepted',
            orderType: 'Normal',
            total: 6,
            date: '2024-09-20 04:20:22',
        },
        {
            id: 5,
            pharmacyName: 'EveGreen Chemist',
            patientName: 'Wizkid Ayo',
            phone: '+234 500-400-400',
            status: 'Accepted',
            orderType: 'Normal',
            total: 1,
            date: '2024-09-20 04:20:22',
        },
        {
            id: 6,
            pharmacyName: 'Black Cartel',
            patientName: 'Ball Knock',
            phone: '+034 100-400-400',
            status: 'Rejected',
            orderType: 'Normal',
            total: 2,
            date: '2024-09-20 04:20:22',
        },
    ]);

    const searchQuery = ref('');
    const entriesPerPage = ref(5);
    const currentPage = ref(1);

    const filteredData = computed(() => {
        return tableData.value.filter(
            (data) =>
                data.pharmacyName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                data.patientName.toLowerCase().includes(searchQuery.value.toLowerCase()),
        );
    });

    const totalPages = computed(() => Math.ceil(filteredData.value.length / entriesPerPage.value));

    const paginatedData = computed(() => {
        const startIndex = (currentPage.value - 1) * entriesPerPage.value;
        return filteredData.value.slice(startIndex, startIndex + entriesPerPage.value);
    });

    const isModalOpen = ref(false);
    const selectedData = ref(null);

    const openModal = (data) => {
        selectedData.value = data;
        isModalOpen.value = true;
    };

    const closeModal = () => {
        isModalOpen.value = false;
        selectedData.value = null;
    };

    watch([entriesPerPage, searchQuery], () => {
        currentPage.value = 1;
    });
</script>
