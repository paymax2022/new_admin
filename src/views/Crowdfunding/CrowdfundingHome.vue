<template>
    <div class="">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <!-- Total Campaign Card -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Campaign</p>
                        <p class="text-2xl font-bold mt-1">69</p>
                    </div>
                    <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Pending Campaign Card -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Pending Campaign</p>
                        <p class="text-2xl font-bold mt-1">50</p>
                    </div>
                    <div class="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Running Campaign Card -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Running Campaign</p>
                        <p class="text-2xl font-bold mt-1">15</p>
                    </div>
                    <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Campaign Reviews Card -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Campaign Reviews</p>
                        <p class="text-2xl font-bold mt-1">19</p>
                    </div>
                    <div class="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div class=" block lg:flex gap-5 w-full mt-8">
            <div class="w-full">
                <h3 class="text-lg font-semibold mb-2">Campaign Categories</h3>
                <div id="chart1" ref="chartRef1" class="border border-gray-300 p-4 rounded-lg" ></div>
            </div>
            <div class="w-full">
                <h3 class="text-lg font-semibold mb-2">Transaction Report</h3>
                <div id="chart2" ref="chartRef2" class="border border-gray-300 p-4 rounded-lg"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import ApexCharts from 'apexcharts';

    const chartRef1 = ref(null);
    const chartRef2 = ref(null);

    let chart1: ApexCharts | null = null;
    let chart2: ApexCharts | null = null;

    const options1 = {
        chart: { type: 'bar' },
        series: [{ name: 'sales', data: [30, 40, 45, 50, 49, 60, 70, 91, 125] }],
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
    };

    const options2 = {
        chart: { type: 'line' },
        series: [{ name: 'revenue', data: [25, 30, 35, 45, 55, 65, 80, 100, 110] }],
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
    };

    onMounted(() => {
        if (chartRef1.value) {
            chart1 = new ApexCharts(chartRef1.value, options1);
            chart1.render();
        }
        if (chartRef2.value) {
            chart2 = new ApexCharts(chartRef2.value, options2);
            chart2.render();
        }
    });

    onBeforeUnmount(() => {
        chart1?.destroy();
        chart2?.destroy();
    });
    const stats = ref([
        { title: 'Total Campaign', value: 69, icon: 'chart-bar', color: 'blue' },
        { title: 'Pending Campaign', value: 50, icon: 'clock', color: 'yellow' },
        { title: 'Running Campaign', value: 15, icon: 'lightning-bolt', color: 'green' },
        { title: 'Campaign Reviews', value: 19, icon: 'star', color: 'purple' },
    ]);
</script>
<style scoped>
    #chart1,
    #chart2 {
        min-height: 100px;
        width: 100%;
    }
</style>
