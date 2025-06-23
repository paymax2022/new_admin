<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Commission Management</h1>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs">
        <thead>
          <tr>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">ID</th>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Biller</th>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Service</th>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Commission</th>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Commission cap</th>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">SP Incentive</th>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Total Amount charged to customer</th>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Amount remitted to Service provider (restaurant)</th>
            <th colspan="8" class="px-2 py-2 text-center font-semibold text-gray-700 dark:text-gray-200 border-l">How the 20% Dedicated as Profit is used</th>
            <th rowspan="2" class="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200 border-l">Total</th>
          </tr>
          <tr>
            <th class="px-2 py-2 text-center font-semibold text-pink-700 bg-pink-100">Payment Gateway</th>
            <th class="px-2 py-2 text-center font-semibold text-red-700 bg-red-100">SME/Notification Charges</th>
            <th class="px-2 py-2 text-center font-semibold text-yellow-700 bg-yellow-100">Balance Profit</th>
            <th class="px-2 py-2 text-center font-semibold text-yellow-700 bg-yellow-100">PAYMAX</th>
            <th class="px-2 py-2 text-center font-semibold text-blue-700 bg-blue-100">Referrer</th>
            <th class="px-2 py-2 text-center font-semibold text-purple-700 bg-purple-100">Partner</th>
            <th class="px-2 py-2 text-center font-semibold text-gray-700 bg-gray-100">Device PM</th>
            <th class="px-2 py-2 text-center font-semibold text-orange-700 bg-orange-100">Agent</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in paginatedData" :key="idx" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-2 py-2">{{ item.id }}</td>
            <td class="px-2 py-2">{{ item.biller }}</td>
            <td class="px-2 py-2">{{ item.service }}</td>
            <td class="px-2 py-2">{{ item.commission }}</td>
            <td class="px-2 py-2">{{ item.commissionCap }}</td>
            <td class="px-2 py-2">{{ item.spIncentive }}</td>
            <td class="px-2 py-2">{{ item.totalCharged }}</td>
            <td class="px-2 py-2">{{ item.amountRemitted }}</td>
            <td class="px-2 py-2 text-pink-700 bg-pink-50">{{ item.paymentGateway }}</td>
            <td class="px-2 py-2 text-red-700 bg-red-50">{{ item.smeCharges }}</td>
            <td class="px-2 py-2 text-yellow-700 bg-yellow-50">{{ item.balanceProfit }}</td>
            <td class="px-2 py-2 text-yellow-700 bg-yellow-50">{{ item.paymax }}</td>
            <td class="px-2 py-2 text-blue-700 bg-blue-50">{{ item.referrer }}</td>
            <td class="px-2 py-2 text-purple-700 bg-purple-50">{{ item.partner }}</td>
            <td class="px-2 py-2 text-gray-700 bg-gray-50">{{ item.devicePM }}</td>
            <td class="px-2 py-2 text-orange-700 bg-orange-50">{{ item.agent }}</td>
            <td class="px-2 py-2 border-l">{{ item.total }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div class="text-xs text-gray-500 dark:text-gray-400">
          Showing {{ paginatedData.length ? (currentPage-1)*pageSize+1 : 0 }} to {{ (currentPage-1)*pageSize+paginatedData.length }} of {{ commissionData.length }} entries (filtered from {{ commissionData.length }} total entries)
        </div>
        <div class="flex items-center space-x-1">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-2 py-1 rounded border text-xs" :class="currentPage === 1 ? 'text-gray-400 border-gray-200 dark:border-gray-700' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'">
            <span>&lt;&lt;</span>
          </button>
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="['px-2 py-1 rounded border text-xs', currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800']">
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-2 py-1 rounded border text-xs" :class="currentPage === totalPages ? 'text-gray-400 border-gray-200 dark:border-gray-700' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'">
            <span>&gt;&gt;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const commissionData = ref([
  {
    id: 1,
    biller: 'Restaurant',
    service: 'Food',
    commission: '10%',
    commissionCap: '1,000.00',
    spIncentive: '0',
    totalCharged: '1,000.00',
    amountRemitted: '900',
    paymentGateway: '1.0%',
    smeCharges: '4.00',
    balanceProfit: '4.50%',
    paymax: '4%',
    referrer: '1%',
    partner: '1.5%',
    devicePM: '3%',
    agent: '10%',
    total: 'N112'
  },
  {
    id: 2,
    biller: 'Restaurant',
    service: 'Food',
    commission: '10%',
    commissionCap: '1,000.00',
    spIncentive: '0',
    totalCharged: '1,000.00',
    amountRemitted: '950',
    paymentGateway: '1.0%',
    smeCharges: '4.00',
    balanceProfit: '4.50%',
    paymax: '4%',
    referrer: '1%',
    partner: '1.5%',
    devicePM: '3%',
    agent: '10%',
    total: 'N112'
  },
  {
    id: 3,
    biller: 'Restaurant',
    service: 'Food',
    commission: '10%',
    commissionCap: '1,000.00',
    spIncentive: '0',
    totalCharged: '1,000.00',
    amountRemitted: '950',
    paymentGateway: '1.0%',
    smeCharges: '4.00',
    balanceProfit: '4.50%',
    paymax: '4%',
    referrer: '1%',
    partner: '1.5%',
    devicePM: '3%',
    agent: '10%',
    total: 'N112'
  },
  {
    id: 4,
    biller: 'Restaurant',
    service: 'Food',
    commission: '10%',
    commissionCap: '1,000.00',
    spIncentive: '0',
    totalCharged: '1,000.00',
    amountRemitted: '950',
    paymentGateway: '1.0%',
    smeCharges: '4.00',
    balanceProfit: '4.50%',
    paymax: '4%',
    referrer: '1%',
    partner: '1.5%',
    devicePM: '3%',
    agent: '10%',
    total: 'N112'
  },
  {
    id: 5,
    biller: 'Restaurant',
    service: 'Food',
    commission: '10%',
    commissionCap: '1,000.00',
    spIncentive: '0',
    totalCharged: '1,000.00',
    amountRemitted: '950',
    paymentGateway: '1.0%',
    smeCharges: '4.00',
    balanceProfit: '4.50%',
    paymax: '4%',
    referrer: '1%',
    partner: '1.5%',
    devicePM: '3%',
    agent: '10%',
    total: 'N112'
  }
])
const pageSize = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(commissionData.value.length / pageSize))
const paginatedData = computed(() => commissionData.value.slice((currentPage.value-1)*pageSize, currentPage.value*pageSize))
function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }
function goToPage(page) { currentPage.value = page }
</script> 