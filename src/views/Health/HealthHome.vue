<template>
    <div>
        <!-- Chart Section -->
        <div class="mb-6 bg-white dark:bg-black rounded-lg">
            <div class="mt-2">
                <h5 class="font-semibold text-lg dark:text-white-light pl-3 mt-3">Monthly Appointment Report</h5>
            </div>
            <apexchart height="300" :options="lineChart" :series="lineChartSeries" class="overflow-hidden mt-2" />
        </div>
        <div>
            <AppointmentTable />
        </div>
        <!-- Appointments Section -->
        <div class="lg:flex gap-3 flex-wrap lg:justify-center">
            <div
                v-for="(appointment, index) in appointments"
                :key="index"
                class="sm:w-full lg:max-w-[19rem] mt-3 flex justify-between bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
            >
                <div class="py-7 px-6">
                    <h5 class="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                        {{ appointment.title }}
                    </h5>
                    <p class="text-white-dark text-3xl">{{ appointment.count }}</p>
                </div>
                <div class="flex items-center pr-6">
                    <component :is="appointment.icon" class="h-[64px]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import apexchart from 'vue3-apexcharts';
    import { useAppStore } from '@/stores/index';
    import IconCalendar from '@/components/icon/icon-calendar.vue';
    import AppointmentTable from './AppointmentTable.vue';

    const store = useAppStore();

    // Dynamic Appointments Data
    const appointments = [
        { title: 'New Appointment', icon: IconCalendar, count: 25 },
        { title: 'Total Doctors', icon: IconCalendar, count: 12 },
        { title: 'Total Patients', icon: IconCalendar, count: 8 },
        { title: 'Total Pharmacy', icon: IconCalendar, count: 10 },
        { title: 'Total Pharmacy Order', icon: IconCalendar, count: 2 },
        { title: 'Total Review', icon: IconCalendar, count: 6 },
    ];

    // ApexChart Configuration
    const lineChart = computed(() => {
        const isDark = store.theme === 'dark' || store.isDarkMode ? true : false;
        const isRtl = store.rtlClass === 'rtl' ? true : false;
        return {
            chart: {
                height: 300,
                type: 'line',
                toolbar: false,
            },
            colors: ['#4361ee'],
            tooltip: {
                marker: false,
                y: {
                    formatter(number) {
                        return '$' + number;
                    },
                },
                theme: isDark ? 'dark' : 'light',
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -20 : 0,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
            },
        };
    });

    const lineChartSeries = ref([
        {
            name: 'Sales',
            data: [45, 55, 75, 25, 45, 110],
        },
    ]);
</script>
