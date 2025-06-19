<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
      <div class="flex gap-2">
        <select v-model="dateRange" class="border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-100">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>This Month</option>
          <option>Last Month</option>
        </select>
        <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          <span class="mr-2">⬇️</span> Export
        </button>
      </div>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Overview of your system's performance and key metrics</p>
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center"><span class="mr-2">👤</span>Total Users</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">2,345</div>
        <div class="text-xs text-green-600">↑ 120 this month</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center"><span class="mr-2">💳</span>Total Transactions</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">12,789</div>
        <div class="text-xs text-green-600">↑ 1,200 last month</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center"><span class="mr-2">💰</span>Total Revenue</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$345,897</div>
        <div class="text-xs text-green-600">↑ $15,000 this month</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center"><span class="mr-2">📈</span>Conversion Rate</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">2.5%</div>
        <div class="text-xs text-green-600">↑ 1.2% from last month</div>
      </div>
    </div>
    <!-- Charts -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">User & Transaction Growth</h2>
      <div class="h-64 w-full flex items-center justify-center">
        <!-- Replace with chart.js/line chart if available -->
        <canvas id="growthChart"></canvas>
      </div>
      <div class="flex gap-4 mt-2 text-xs">
        <span class="text-blue-600 font-semibold">■ Users</span>
        <span class="text-pink-600 font-semibold">■ Transactions</span>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Transaction Types</h2>
        <div class="h-56 w-full flex items-center justify-center">
          <!-- Replace with chart.js/bar chart if available -->
          <canvas id="typeChart"></canvas>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">User Distribution</h2>
        <div class="h-56 w-full flex items-center justify-center">
          <!-- Replace with chart.js/pie chart if available -->
          <canvas id="userChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
let Chart = null
const dateRange = ref('Last 7 days')

onMounted(async () => {
  if (!Chart) {
    Chart = (await import('chart.js/auto')).default
  }
  // User & Transaction Growth Line Chart
  const growthCtx = document.getElementById('growthChart')
  if (growthCtx) {
    new Chart(growthCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Users',
            data: [500, 700, 1200, 900, 1100, 800],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.1)',
            tension: 0.4,
            fill: false,
          },
          {
            label: 'Transactions',
            data: [400, 600, 900, 1500, 1200, 700],
            borderColor: '#ec4899',
            backgroundColor: 'rgba(236,72,153,0.1)',
            tension: 0.4,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    })
  }
  // Transaction Types Bar Chart
  const typeCtx = document.getElementById('typeChart')
  if (typeCtx) {
    new Chart(typeCtx, {
      type: 'bar',
      data: {
        labels: ['Deposit', 'Withdrawals', 'Transfers', 'Commissions', 'Payouts', 'Refunds'],
        datasets: [
          {
            label: 'Count',
            data: [500, 200, 350, 700, 400, 380],
            backgroundColor: '#2563eb',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    })
  }
  // User Distribution Pie Chart
  const userCtx = document.getElementById('userChart')
  if (userCtx) {
    new Chart(userCtx, {
      type: 'pie',
      data: {
        labels: ['Active Users', 'Inactive Users', 'New Users', 'Banned Users'],
        datasets: [
          {
            data: [60, 25, 10, 5],
            backgroundColor: ['#2563eb', '#f59e42', '#22c55e', '#ef4444'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    })
  }
})
</script> 