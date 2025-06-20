<template>
    <div class=" bg-gray-100 min-h-screen">
        <!-- Stat Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <article
                v-for="(stat, index) in stats"
                :key="`stat-${stat.label}-${index}`"
                class="text-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-200"
                :class="[stat.colorClass || 'bg-blue-500 hover:bg-blue-600']"
            >
                <p class="text-2xl font-bold mb-1">{{ stat.value }}</p>
                <p class="text-sm opacity-90">{{ stat.label }}</p>
            </article>
        </div>

        <!-- Top Selling Events -->
        <div class="bg-white rounded-xl p-4 shadow-md">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Top 10 Selling Events</h2>
            <apexchart width="100%" height="350" type="bar" :options="chartOptions" :series="chartSeries" />
        </div>

        <!-- Event Sales Table -->
        <div class="mt-6">
            <EventSalesTable />
        </div>
        <!-- Event Ticket Statistics -->
        <div class="mt-6">
            <EventTicketStat />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import ApexChart from 'vue3-apexcharts';
    import EventSalesTable from '@/components/modules/Events/EventSalesTable.vue';
    import EventTicketStat from '@/components/modules/Events/EventTicketStat.vue';

    const stats = [
        { label: 'Customers', value: 4, colorClass: '' },
        { label: 'Organisers', value: 4, colorClass: '' },
        { label: 'Events', value: 17, colorClass: '' },
        { label: 'Bookings', value: 379, colorClass: '' },
        { label: 'Revenue', value: '285.00 USD', colorClass: '' },
    ];

    const chartSeries = [
        {
            name: 'Total Bookings',
            data: [280, 125, 118, 115, 110, 108, 106, 94, 57, 55],
        },
    ];

    const chartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 4,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: [
                'Daily Meditation Classes',
                'Global Marketing Conferen...',
                'VR assistant Workshop',
                'Caribbean Karaoke Nights',
                'Funday Sunday Swimming Cl...',
                'Italian Cooking Class (Se...',
                'Regular Yoga Classes (Sea...',
                'Professional Piano Lesson...',
                'Regular Fitness Classes (...',
                'Winter Wine Night',
            ],
            labels: {
                rotate: -45,
                style: { fontSize: '12px' },
            },
        },
        yaxis: {
            labels: {
                style: { fontSize: '12px' },
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
        },
        colors: ['#3b82f6'],
        responsive: [
            {
                breakpoint: 640,
                options: {
                    chart: {
                        height: 300,
                    },
                    xaxis: {
                        labels: {
                            rotate: -45,
                            style: { fontSize: '10px' },
                        },
                    },
                },
            },
        ],
    };
</script>

<script lang="ts">
    export default {
        components: {
            apexchart: ApexChart,
        },
    };
</script>
