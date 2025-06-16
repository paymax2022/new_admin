<template>
    <div class="space-y-6 lg:p-4">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="(card, index) in statsCards" :key="index" class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">{{ card.title }}</p>
                        <p class="text-2xl font-bold mt-1">{{ card.value }}</p>
                    </div>
                    <div
                        class="w-12 h-12 rounded-full flex items-center justify-center"
                        :class="card.bgColor"
                        v-html="
                            `<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 ${card.iconColor}' fill='none' viewBox='0 0 24 24' stroke='currentColor'>${card.svgPath}</svg>`
                        "
                    ></div>
                </div>
            </div>
        </div>

        <!-- Order Filter & Stats Breakdown -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 class="text-xl font-bold text-gray-800">Order Statistics</h2>
            <div class="relative inline-block text-left">
                <button @click="open = !open" class="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium flex items-center gap-1">
                    {{ selected }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div v-if="open" class="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <ul class="py-1 text-sm text-gray-700">
                        <li v-for="range in ranges" :key="range" @click="selectRange(range)" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {{ range }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Breakdown Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="stat in stats" :key="stat.label" class="bg-white p-4 rounded-xl shadow-sm flex items-center border border-gray-100 space-x-4">
                <div :class="`p-3 rounded-full text-white ${stat.bg}`">
                    <component :is="stat.icon" class="w-6 h-6" />
                </div>
                <div>
                    <p class="text-gray-500 text-sm font-medium">{{ stat.label }}</p>
                    <p class="text-lg font-semibold text-gray-800">{{ stat.value }}</p>
                </div>
            </div>
        </div>

        <div>
            <!-- sale & ordersummary Stats -->
            <div class="block lg:flex gap-5 w-full mt-8">
                <div class="w-full">
                    <h3 class="text-lg font-semibold mb-2">Sale Summary</h3>
                    <div id="chart1" ref="chartRef1" class="border border-gray-300 p-4 rounded-lg"></div>
                </div>
                <div class="w-full">
                    <h3 class="text-lg font-semibold mb-2">Order Summary</h3>
                    <div id="chart2" ref="chartRef2" class="border border-gray-300 p-4 rounded-lg"></div>
                </div>
            </div>
            <!-- revenue & top customer Stats -->
            <div class="block lg:flex gap-5 w-full mt-8">
                <div class="w-full">
                    <h3 class="text-lg font-semibold mb-2">Revenue</h3>
                    <div id="chart3" ref="chartRef3" class="border border-gray-300 p-4 rounded-lg"></div>
                </div>
                <div class="w-full">
                    <h3 class="text-lg font-semibold mb-2">Top Customers</h3>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="space-y-4">
                            <div
                                v-for="customer in customers"
                                :key="customer.id"
                                class="flex items-center justify-between p-3 hover:bg-gray-50 rounded transition"
                            >
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span class="text-blue-600 font-medium">
                                            {{ getInitials(customer.name) }}
                                        </span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-800">{{ customer.name }}</p>
                                        <p class="text-sm text-gray-500">{{ customer.email }}</p>
                                    </div>
                                </div>
                                <div class="bg-gray-100 px-3 py-1 rounded-full">
                                    <span class="text-sm font-medium text-gray-700">
                                        {{ customer.orders }} {{ customer.orders === 1 ? 'Order' : 'Orders' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- top delivery agent and most popular restaurants -->
            <div class="block lg:flex gap-5 w-full mt-8">
                <div class="w-full">
                    <h3 class="text-lg font-semibold mb-2">Top Delivery Agents</h3>
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="space-y-4">
                            <div
                                v-for="deliveryAgent in deliveryAgents"
                                :key="deliveryAgent.id"
                                class="flex items-center justify-between p-3 hover:bg-gray-50 rounded transition"
                            >
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span class="text-blue-600 font-medium">
                                            {{ getInitials(deliveryAgent.name) }}
                                        </span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-800">{{ deliveryAgent.name }}</p>
                                        <p class="text-sm text-gray-500">{{ deliveryAgent.email }}</p>
                                    </div>
                                </div>
                                <div class="bg-gray-100 px-3 py-1 rounded-full">
                                    <span class="text-sm font-medium text-gray-700">
                                        {{ deliveryAgent.trip }} {{ deliveryAgent.trip === 1 ? 'Trip' : 'Trips' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full">
                    <h3 class="text-lg font-semibold mb-2">Most Popular Restaurants</h3>
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="space-y-4">
                            <div
                                v-for="popularRestaurant in popularRestaurants"
                                :key="popularRestaurant.id"
                                class="flex items-center justify-between p-3 hover:bg-gray-50 rounded transition"
                            >
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span class="text-blue-600 font-medium">
                                            {{ getInitials(popularRestaurant.name) }}
                                        </span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-800">{{ popularRestaurant.name }}</p>
                                        <p class="text-sm text-gray-500">{{ popularRestaurant.email }}</p>
                                    </div>
                                </div>
                                <div class="bg-gray-100 px-3 py-1 rounded-full">
                                    <span class="text-sm font-medium text-gray-700">
                                        {{ popularRestaurant.orders }} {{ popularRestaurant.orders === 1 ? 'Order' : 'Orders' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import ApexCharts from 'apexcharts';
    import { CubeIcon, TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';

    const statsCards = [
        {
            title: 'Total Orders',
            value: 690000,
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-50',
            svgPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />`,
        },
        {
            title: 'Total Customers',
            value: 50,
            iconColor: 'text-yellow-500',
            bgColor: 'bg-yellow-50',
            svgPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />`,
        },
        {
            title: 'Total Restaurants',
            value: 15,
            iconColor: 'text-green-500',
            bgColor: 'bg-green-50',
            svgPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M13 10V3L4 14h7v7l9-11h-7z" />`,
        },
        {
            title: 'Total Income',
            value: 19,
            iconColor: 'text-purple-500',
            bgColor: 'bg-purple-50',
            svgPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0...z" />`,
        },
    ];

    const stats = [
        { label: 'Total Orders', value: 9, bg: 'bg-purple-500', icon: CubeIcon },
        { label: 'Pending', value: 3, bg: 'bg-yellow-400', icon: ClockIcon },
        { label: 'Processing', value: 0, bg: 'bg-green-300', icon: CheckCircleIcon },
        { label: 'On The Way', value: 0, bg: 'bg-sky-400', icon: TruckIcon },
        { label: 'Delivered', value: 4, bg: 'bg-purple-400', icon: CubeIcon },
        { label: 'Canceled', value: 0, bg: 'bg-red-300', icon: XCircleIcon },
        { label: 'Rejected', value: 1, bg: 'bg-red-400', icon: XMarkIcon },
    ];

    const open = ref(false);
    const selected = ref('01 Jun - 30 Jun');
    const ranges = ['01 Jun - 30 Jun', '01 May - 31 May', '01 Apr - 30 Apr'];

    function selectRange(range: string) {
        selected.value = range;
        open.value = false;
    }

    const chartRef1 = ref(null);
    const chartRef2 = ref(null);
    const chartRef3 = ref(null);

    let chart1: ApexCharts | null = null;
    let chart2: ApexCharts | null = null;
    let chart3: ApexCharts | null = null;

    const options1 = {
        chart: { type: 'bar' },
        series: [{ name: 'sales', data: [30, 40, 45, 50, 49, 60, 70, 91, 125] }],
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
    };
    const options2 = {
        chart: { type: 'line' },
        series: [
            { name: 'revenue', data: [25, 30, 35, 45, 55, 65, 80, 100, 110] },
            { name: 'food', data: [25, 30, 35, 45, 55, 65, 80, 100, 110] },
        ],
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
    };
    const options3 = {
        chart: { type: 'bar' },
        series: [{ name: 'sales', data: [30, 40, 45, 50, 49, 60, 70, 91, 125] }],
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
        if (chartRef3.value) {
            chart3 = new ApexCharts(chartRef3.value, options3);
            chart3.render();
        }
    });
    onBeforeUnmount(() => {
        chart1?.destroy();
        chart2?.destroy();
        chart3?.destroy();
    });

    const customers = ref([
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 3 },
        { id: 2, name: 'Jack J. Smith', email: 'jack@example.com', orders: 1 },
        { id: 2, name: 'Adekunle Victor', email: 'victor@example.com', orders: 46 },
        // Add more customers as needed
    ]);

    const deliveryAgents = ref([
        { id: 1, name: 'John Doe', email: 'john@example.com', trip: 3 },
        { id: 2, name: 'Jack J. Smith', email: 'jack@example.com', trip: 1 },
        { id: 2, name: 'Adekunle Victor', email: 'victor@example.com', trip: 46 },
        // Add more delivery agents as needed
    ]);

    const popularRestaurants = ref([
        { id: 1, name: 'Pizza Hut', email: 'hut@example.com', orders: 3 },
        { id: 2, name: ' Vee Burger', email: 'vee@example.com', orders: 1 },
        { id: 2, name: 'Victor Grills', email: 'victor@example.com', orders: 46 },
        // Add more popular items as needed
    ]);

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase();
    };
</script>
<style scoped>
    #chart1,
    #chart2 {
        min-height: 100px;
        width: 100%;
    }
</style>
