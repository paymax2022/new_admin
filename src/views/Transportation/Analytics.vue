<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-5">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold leading-tight text-[#333]">Analytics & Reports</h1>
        <p class="mt-1 text-sm text-[#6b7280]">Comprehensive insights across all services</p>
      </div>

      <!-- Service Usage Stats + Popular Routes + Top Drivers -->
      <div class="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <!-- Service Usage Stats -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Service Usage Stats</h2>
          <p class="mt-0.5 text-sm text-[#6b7280]">Monthly comparison by service type</p>
          <div class="mt-4 h-[260px] w-full">
            <LineChart :data="serviceUsageChartData" :options="serviceUsageChartOptions" />
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <!-- Popular Routes -->
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <h2 class="text-base font-bold text-[#333]">Popular Routes</h2>
            <p class="mt-0.5 text-sm text-[#6b7280]">Top performing routes this month</p>
            <ul class="mt-4 space-y-4">
              <li
                v-for="route in popularRoutes"
                :key="route.name"
                class="flex items-center justify-between border-b border-[#f1f5f9] pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <p class="font-medium text-[#333]">{{ route.name }}</p>
                  <p class="mt-0.5 text-sm text-[#6b7280]">{{ route.trips }} trips</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-[#333]">{{ route.amount }}</p>
                  <p class="mt-0.5 text-sm font-medium" :class="route.changeClass">{{ route.change }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Top Drivers -->
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <h2 class="text-base font-bold text-[#333]">Top Drivers</h2>
            <p class="mt-0.5 text-sm text-[#6b7280]">Best performing drivers this week</p>
            <ul class="mt-4 space-y-4">
              <li
                v-for="driver in topDrivers"
                :key="driver.name"
                class="flex items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4 last:border-b-0 last:pb-0"
              >
                <div class="flex min-w-0 flex-1 items-center gap-3">
                  <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb] text-[#6b7280]">
                    <IconUser class="h-5 w-5" />
                  </span>
                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <p class="font-medium text-[#333]">{{ driver.name }}</p>
                      <span
                        class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                        :style="{ backgroundColor: driver.pillBg }"
                      >
                        {{ driver.pill }}
                      </span>
                    </div>
                    <p class="mt-0.5 flex items-center gap-1.5 text-sm text-[#6b7280]">
                      <IconStar class="h-4 w-4 text-[#FFC107]" />
                      {{ driver.rating }} · {{ driver.trips }} trips
                    </p>
                  </div>
                </div>
                <p class="shrink-0 font-medium text-[#4CAF50]">{{ driver.earnings }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Parcel Delivery Efficiency + Bus Booking Trends -->
      <div class="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <!-- Parcel Delivery Efficiency -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Parcel Delivery Efficiency</h2>
          <p class="mt-0.5 text-sm text-[#6b7280]">Key delivery performance metrics</p>
          <div class="mt-4 grid grid-cols-2 gap-3">
            <div
              v-for="metric in parcelMetrics"
              :key="metric.label"
              class="rounded-lg bg-[#F7F8FA] p-4"
            >
              <p class="text-sm text-[#6b7280]">{{ metric.label }}</p>
              <p class="mt-1 text-xl font-bold text-[#333]">{{ metric.value }}</p>
              <p class="mt-0.5 text-sm font-medium" :class="metric.changeClass">{{ metric.change }}</p>
            </div>
          </div>
        </div>

        <!-- Bus Booking Trends -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Bus Booking Trends</h2>
          <p class="mt-0.5 text-sm text-[#6b7280]">Weekly bookings vs capacity utilization</p>
          <div class="mt-4 h-[260px] w-full">
            <LineChart :data="busBookingChartData" :options="busBookingChartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconUser from '@/components/icon/icon-user.vue';
import IconStar from '@/components/icon/icon-star.vue';
import LineChart from '@/components/charts/LineChart.vue';

const popularRoutes = [
  { name: 'Downtown → Airport', trips: '1247 trips', amount: '₦2,500', change: '+12%', changeClass: 'text-[#4CAF50]' },
  { name: 'City Center → Mall', trips: '892 trips', amount: '₦1,800', change: '-10%', changeClass: 'text-[#F44336]' },
  { name: 'Station → University', trips: '756 trips', amount: '₦1,200', change: '+8%', changeClass: 'text-[#4CAF50]' },
];

const topDrivers = [
  { name: 'John Smith', rating: '4.9', trips: '234 trips', pill: 'Heading', pillBg: '#FFC107', earnings: '₦2,500' },
  { name: 'Jane Doe', rating: '4.8', trips: '198 trips', pill: 'Rising Star', pillBg: '#FF9800', earnings: '₦2,100' },
  { name: 'Mike Johnson', rating: '4.7', trips: '176 trips', pill: 'New', pillBg: '#4CAF50', earnings: '₦1,900' },
];

const parcelMetrics = [
  { label: 'Average Delivery Time', value: '28 min', change: '-12%', changeClass: 'text-[#F44336]' },
  { label: 'On-time Delivery Rate', value: '94.2%', change: '+12%', changeClass: 'text-[#4CAF50]' },
  { label: 'Failed Deliveries', value: '1.8%', change: '-0.9%', changeClass: 'text-[#F44336]' },
  { label: 'Customer Satisfaction', value: '4.6/5', change: '+0.2', changeClass: 'text-[#4CAF50]' },
];

// Service Usage Stats – stacked area (Ride + Parcel), Week 1–4, $0–$8000
const serviceUsageChartData = computed(() => ({
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Ride: 310',
      data: [2000, 3500, 3000, 5000],
      borderColor: '#93c5fd',
      backgroundColor: 'rgba(173, 216, 230, 0.7)',
      fill: true,
      tension: 0.3,
    },
    {
      label: 'Parcel: 310',
      data: [1500, 2500, 4000, 3100],
      borderColor: '#dda0dd',
      backgroundColor: 'rgba(221, 160, 221, 0.6)',
      fill: true,
      tension: 0.3,
    },
  ],
}));

const serviceUsageChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: {
      position: 'top',
      labels: { color: '#374151', usePointStyle: true },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      ticks: { color: '#6b7280', font: { size: 11 } },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      max: 8000,
      grid: { color: '#e5e7eb' },
      ticks: {
        color: '#6b7280',
        font: { size: 11 },
        callback(value: number) {
          return `$${Number(value).toLocaleString()}`;
        },
      },
    },
  },
}));

// Bus Booking Trends – stacked area (Capacity + Booking), Mon–Sun, 0–700
const busBookingChartData = computed(() => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Capacity: 310',
      data: [400, 450, 420, 480, 500, 550, 310],
      borderColor: '#c4b5fd',
      backgroundColor: 'rgba(230, 230, 250, 0.8)',
      fill: true,
      tension: 0.3,
    },
    {
      label: 'Booking: 310',
      data: [280, 320, 300, 350, 380, 400, 310],
      borderColor: '#93c5fd',
      backgroundColor: 'rgba(173, 216, 230, 0.7)',
      fill: true,
      tension: 0.3,
    },
  ],
}));

const busBookingChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: {
      position: 'top',
      labels: { color: '#374151', usePointStyle: true },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      ticks: { color: '#6b7280', font: { size: 11 } },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      max: 700,
      grid: { color: '#e5e7eb' },
      ticks: { color: '#6b7280', font: { size: 11 } },
    },
  },
}));
</script>
