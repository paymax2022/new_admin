<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Analytics & Reports</h1>
      <p class="text-sm text-[#6b7280]">Overview of delivery performance, rider & merchant KPIs.</p>
    </div>

    <!-- KPI Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <!-- Total Deliveries -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-[#374151] mb-2">Total Deliveries</p>
            <p class="text-3xl font-semibold text-[#111827] mb-1">12,340</p>
            <div class="flex items-center gap-1">
              <svg class="h-3 w-3 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <p class="text-xs font-medium text-[#22c55e]">7.0% vs yesterday</p>
            </div>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#111827]">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Successful Deliveries -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-[#374151] mb-2">Successful Deliveries</p>
            <p class="text-3xl font-semibold text-[#22c55e] mb-1">93%</p>
            <div class="flex items-center gap-1">
              <svg class="h-3 w-3 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <p class="text-xs font-medium text-[#22c55e]">1.0% vs yesterday</p>
            </div>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#22c55e]">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Revenue Generated -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-[#374151] mb-2">Revenue Generated</p>
            <p class="text-3xl font-semibold text-[#111827] mb-1">00</p>
            <div class="flex items-center gap-1">
              <svg class="h-3 w-3 text-[#ef4444]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <p class="text-xs font-medium text-[#ef4444]">7.0% vs yesterday</p>
            </div>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b82f6]">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Riders -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-[#374151] mb-2">Active Riders</p>
            <p class="text-3xl font-semibold text-[#111827] mb-1">3,400</p>
            <div class="flex items-center gap-1">
              <svg class="h-3 w-3 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <p class="text-xs font-medium text-[#22c55e]">1.0% vs yesterday</p>
            </div>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#111827]">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section - Middle Row -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Delivery Success Rate (Donut Chart) -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-[#111827] mb-4">Delivery Success Rate</h3>
        <div class="h-64 flex items-center justify-center">
          <canvas ref="successRateCanvas"></canvas>
        </div>
        <div class="flex items-center justify-center gap-6 mt-4">
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded bg-[#3b82f6]"></div>
            <span class="text-sm text-[#374151]">Successful</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded bg-[#ef4444]"></div>
            <span class="text-sm text-[#374151]">Failed</span>
          </div>
        </div>
      </div>

      <!-- Rider Utilization (Vertical Bar Chart) -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-[#111827]">Rider Utilization</h3>
          <div class="relative">
            <select
              v-model="riderUtilizationFilter"
              class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-3 py-1.5 pr-8 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="this-year">This Year</option>
              <option value="last-year">Last Year</option>
              <option value="last-6-months">Last 6 Months</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          </div>
        </div>
        <div class="h-64">
          <canvas ref="riderUtilizationCanvas"></canvas>
        </div>
      </div>
    </div>

    <!-- Charts Section - Bottom Row -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Financial Overview (Line Chart) -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-[#111827]">Financial Overview</h3>
            <p class="text-sm text-[#6b7280] mt-1">200 Orders</p>
          </div>
          <div class="relative">
            <select
              v-model="financialOverviewFilter"
              class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-3 py-1.5 pr-8 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="this-year">This Year</option>
              <option value="last-year">Last Year</option>
              <option value="last-6-months">Last 6 Months</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          </div>
        </div>
        <div class="h-64">
          <canvas ref="financialOverviewCanvas"></canvas>
        </div>
      </div>

      <!-- Delivery Volume by Region (Horizontal Bar Chart) -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-[#111827] mb-4">Delivery Volume by Region</h3>
        <div class="h-64">
          <canvas ref="deliveryVolumeCanvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';

Chart.register(...registerables);

const successRateCanvas = ref<HTMLCanvasElement | null>(null);
const riderUtilizationCanvas = ref<HTMLCanvasElement | null>(null);
const financialOverviewCanvas = ref<HTMLCanvasElement | null>(null);
const deliveryVolumeCanvas = ref<HTMLCanvasElement | null>(null);

const riderUtilizationFilter = ref('this-year');
const financialOverviewFilter = ref('this-year');

let successRateChart: Chart | null = null;
let riderUtilizationChart: Chart | null = null;
let financialOverviewChart: Chart | null = null;
let deliveryVolumeChart: Chart | null = null;

const createCharts = () => {
  // Delivery Success Rate (Donut Chart)
  if (successRateCanvas.value) {
    if (successRateChart) {
      successRateChart.destroy();
    }
    successRateChart = new Chart(successRateCanvas.value, {
      type: 'doughnut',
      data: {
        labels: ['Successful', 'Failed'],
        datasets: [
          {
            data: [93, 7],
            backgroundColor: ['#3b82f6', '#ef4444'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: '70%',
      },
    });
  }

  // Rider Utilization (Vertical Bar Chart)
  if (riderUtilizationCanvas.value) {
    if (riderUtilizationChart) {
      riderUtilizationChart.destroy();
    }
    riderUtilizationChart = new Chart(riderUtilizationCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Rider Utilization',
            data: [15, 28, 18, 10, -5, -10],
            backgroundColor: '#6366f1',
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              stepSize: 20,
            },
            grid: {
              color: '#e5e7eb',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Financial Overview (Line Chart)
  if (financialOverviewCanvas.value) {
    if (financialOverviewChart) {
      financialOverviewChart.destroy();
    }
    financialOverviewChart = new Chart(financialOverviewCanvas.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Financial Overview',
            data: [-20, 10, 30, 20, 50, 40],
            borderColor: '#ec4899',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#3b82f6',
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              stepSize: 20,
            },
            grid: {
              color: '#e5e7eb',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Delivery Volume by Region (Horizontal Bar Chart)
  if (deliveryVolumeCanvas.value) {
    if (deliveryVolumeChart) {
      deliveryVolumeChart.destroy();
    }
    deliveryVolumeChart = new Chart(deliveryVolumeCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Lagos', 'Ibadan', 'Oyo', 'Abeokuta', 'Abuja', 'Ilorin', 'Kano'],
        datasets: [
          {
            label: 'Delivery Volume',
            data: [100, 75, 60, 50, 45, 30, 25],
            backgroundColor: '#d1d5db',
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
};

onMounted(() => {
  nextTick(() => {
    createCharts();
  });
});

// Watch for filter changes (if needed for future functionality)
watch([riderUtilizationFilter, financialOverviewFilter], () => {
  // Can update charts based on filter changes
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

