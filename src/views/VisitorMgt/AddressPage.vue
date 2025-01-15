<template>
    <div class="sm:flex flex-1 gap-3">
        <div class="flex-1">
            <div class="sm:flex justify-between item-center">
                <div class="sm:flex space-y-3 sm:space-y-0 sm:space-x-3 block items-center">
                    <button
                        v-for="(tab, index) in tabs"
                        :key="index"
                        @click="setActiveTab(tab.status)"
                        :class="[
                            'px-2 py-1 border rounded-lg w-full sm:w-[100px]  h-[50px] text-center',
                            activeTab === tab.status ? 'bg-purple-100 text-purple-600 border-purple-500' : 'bg-white border-gray-300 hover:bg-gray-100',
                        ]"
                        :aria-selected="activeTab === tab.status ? 'true' : 'false'"
                        role="tab"
                    >
                        {{ tab.label }} ({{ tab.count }})
                    </button>
                </div>
                <div class="flex justify-center items-center mt-3 sm:mt-0">
                    <a href="#" class="text-sm text-gray-600 hover:text-gray-900 underline">Download Report</a>
                </div>
            </div>
            <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                <div v-for="(card, index) in filteredCards" :key="index" class="border border-gray-200 bg-white rounded-lg px-4 py-2 flex flex-col h-24">
                    <div class="flex gap-4">
                        <div class="h-10 w-10 border p-2 rounded-full mt-3 bg-gray-100">
                            <IconHouse class="fill-gray-700" />
                        </div>
                        <div class="mt-3">
                            <span class="text-sm font-semibold">{{ card.address }}</span>
                            <p class="text-sm text-gray-500 mt-2">{{ card.details }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="space-y-6">
                <div class="rounded-lg shadow px-3 py-2">
                    <h3 class="text-lg font-bold text-gray-700 mb-4">Houses</h3>
                    <apexchart height="200" :options="housesPieChart" :series="housesPieChartSeries" class="rounded-lg overflow-hidden"></apexchart>
                </div>

                <div class="rounded-lg shadow px-3 py-2">
                    <h3 class="text-lg font-bold text-gray-700 mb-4">Occupants</h3>
                    <apexchart height="200" :options="occupantsPieChart" :series="occupantsPieChartSeries" class="rounded-lg overflow-hidden"></apexchart>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import apexchart from 'vue3-apexcharts';
    import IconHouse from '@/components/icon/icon-house.vue';

    const cards = [
        { address: 'Road 6 No g45, Duplex', details: 'Address with 2 residents' },
        { address: 'Road 4 No rs7, Duplex', details: 'Address with 2 residents' },
        { address: 'Road 6 No g45, Duplex', details: 'Address with 2 residents' },
        { address: 'Road 4 No rs7, Duplex', details: 'Address with 2 residents' },
        { address: 'Road 6 No g45, Duplex', details: 'Address with 2 residents' },
        { address: 'Road 4 No rs7, Duplex', details: 'Address with 2 residents' },
    ];

    // Tabs data
    const tabs = [
        { label: 'Active', status: 'Active', count: 551 },
        { label: 'Disabled', status: 'Disabled', count: 194 },
        { label: 'Disapproved', status: 'Disapproved', count: 261 },
        { label: 'Approved', status: 'Approved', count: 100 }, // Example count
    ];

    // Reactive variables
    const activeTab = ref('Active');
    const filteredCards = ref(cards); // Adjust filtering logic if needed

    // Functions
    const setActiveTab = (status) => {
        activeTab.value = status;
        // Add filtering logic here if needed
    };

    // Pie chart data for houses
    const housesPieChart = computed(() => ({
        chart: {
            height: 300,
            type: 'pie',
            toolbar: { show: false },
        },
        labels: ['Duplex', 'Admin Office', 'Duplex Island', 'Other'],
        colors: ['#FFD700', '#FF4500', '#6A5ACD', '#32CD32'],
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }],
        legend: { position: 'bottom' },
    }));
    const housesPieChartSeries = ref([829, 2, 71, 0]);

    // Pie chart data for occupants
    const occupantsPieChart = computed(() => ({
        chart: {
            height: 300,
            type: 'pie',
            toolbar: { show: false },
        },
        labels: ['Tenant', 'Landlord', 'Commercial'],
        colors: ['#FF69B4', '#4682B4', '#7FFF00'],
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }],
        legend: { position: 'bottom' },
    }));
    const occupantsPieChartSeries = ref([495, 396, 0]);
</script>
