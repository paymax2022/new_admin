<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Commission Earnings</h1>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">SN</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service Name</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service Type</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">% Commision (what Sp gives Us)</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">On Purchase</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Charge</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(item, idx) in paginatedData" :key="idx" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ idx + 1 + (currentPage-1)*pageSize }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.serviceName }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.serviceType }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.commission }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.onPurchase }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.charge }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div class="text-xs text-gray-500 dark:text-gray-400">
          Showing {{ (currentPage-1)*pageSize+1 }} to {{ Math.min(currentPage*pageSize, commissionData.length) }} of {{ commissionData.length }} entries
        </div>
        <div class="flex items-center space-x-1">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-2 py-1 rounded border text-xs" :class="currentPage === 1 ? 'text-gray-400 border-gray-200 dark:border-gray-700' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'">
            &lt;
          </button>
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="['px-2 py-1 rounded border text-xs', currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800']">
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-2 py-1 rounded border text-xs" :class="currentPage === totalPages ? 'text-gray-400 border-gray-200 dark:border-gray-700' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'">
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const commissionData = ref([
  { serviceName: 'Resturant', serviceType: 'Own', commission: '10%', onPurchase: 'Share inflow to Merchant & PayMax', charge: '10%' },
  { serviceName: 'Grocery/Supermarket', serviceType: 'Own', commission: '10%', onPurchase: 'Share inflow to Merchant & PayMax', charge: '10%' },
  { serviceName: 'Voting (Paid', serviceType: 'Own', commission: '10%', onPurchase: 'Share inflow to Merchant & PayMax', charge: '10%' },
  { serviceName: 'Event Tickets', serviceType: 'Own', commission: '10%', onPurchase: 'Share inflow to Merchant & PayMax', charge: '10%' },
  { serviceName: 'Delivery ~ Rider', serviceType: 'Own', commission: '10%', onPurchase: 'Share inflow to Merchant & PayMax', charge: '10%' },
  { serviceName: 'Abd Electric Payment - ABEDC', serviceType: '3rd Party', commission: '1.70%', onPurchase: 'Share inflow to Paymax', charge: '10%' },
  { serviceName: 'Abuja Electric Distribution Company - AEDC', serviceType: '3rd Party', commission: '1.20%', onPurchase: 'Share inflow to Paymax', charge: '10%' },
  { serviceName: 'Benin Electricity - BEDC', serviceType: '3rd Party', commission: '1.50%', onPurchase: 'Share inflow to Paymax', charge: '10%' }
])
const pageSize = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(commissionData.value.length / pageSize))
const paginatedData = computed(() => commissionData.value.slice((currentPage.value-1)*pageSize, currentPage.value*pageSize))
function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }
function goToPage(page) { currentPage.value = page }
</script> 