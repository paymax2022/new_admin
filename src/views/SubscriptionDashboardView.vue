<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Subscription Dashboard</h1>
      <div class="flex gap-2">
        <button class="border rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="showExportModal = true">
          <ArrowDownTrayIcon class="w-5 h-5" /> Export Report
        </button>
        <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="showInvoiceModal = true">
          <DocumentPlusIcon class="w-5 h-5" /> + Manual Invoice
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
      <div class="rounded-lg bg-white border p-4 flex flex-col items-start">
        <div class="flex items-center gap-2 mb-1 text-green-500"><BanknotesIcon class="w-5 h-5" /> Monthly Revenue</div>
        <div class="text-2xl font-bold text-green-600">$142,350</div>
      </div>
      <div class="rounded-lg bg-white border p-4 flex flex-col items-start">
        <div class="flex items-center gap-2 mb-1 text-blue-500"><ChartBarIcon class="w-5 h-5" /> Annual Revenue</div>
        <div class="text-2xl font-bold text-blue-600">$1,708,200</div>
      </div>
      <div class="rounded-lg bg-white border p-4 flex flex-col items-start">
        <div class="flex items-center gap-2 mb-1 text-red-500"><ArrowTrendingDownIcon class="w-5 h-5" /> Churn Rate</div>
        <div class="text-2xl font-bold text-red-500">2.3%</div>
      </div>
      <div class="rounded-lg bg-white border p-4 flex flex-col items-start">
        <div class="flex items-center gap-2 mb-1 text-purple-500"><CheckBadgeIcon class="w-5 h-5" /> Payment Compliance</div>
        <div class="text-2xl font-bold text-purple-600">95.2%</div>
      </div>
    </div>
    <div>
      <h2 class="font-semibold mb-2">Revenue by Billing Cycle</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div class="rounded-lg bg-white border p-4 flex flex-col items-start">
          <div class="text-xs text-gray-500 mb-1">Monthly</div>
          <div class="text-xl font-bold text-gray-800">$24,650</div>
          <div class="text-xs text-gray-400">847 subscribers</div>
          <div class="w-full h-1 bg-gray-200 rounded mt-2 mb-1">
            <div class="h-1 bg-blue-500 rounded" style="width: 60%"></div>
          </div>
        </div>
        <div class="rounded-lg bg-white border p-4 flex flex-col items-start">
          <div class="text-xs text-gray-500 mb-1">Quarterly</div>
          <div class="text-xl font-bold text-blue-700">$18,900</div>
          <div class="text-xs text-gray-400">324 subscribers</div>
          <div class="w-full h-1 bg-gray-200 rounded mt-2 mb-1">
            <div class="h-1 bg-blue-500 rounded" style="width: 40%"></div>
          </div>
        </div>
        <div class="rounded-lg bg-white border p-4 flex flex-col items-start">
          <div class="text-xs text-gray-500 mb-1">Annual</div>
          <div class="text-xl font-bold text-blue-700">$48,200</div>
          <div class="text-xs text-gray-400">129 subscribers</div>
          <div class="w-full h-1 bg-gray-200 rounded mt-2 mb-1">
            <div class="h-1 bg-blue-500 rounded" style="width: 20%"></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="font-semibold mb-2">Upcoming Renewals (Next 30 Days)</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="rounded-lg bg-white border p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600">234</div>
          <div class="text-xs text-gray-500 mt-1">Auto-Renewal Enabled</div>
        </div>
        <div class="rounded-lg bg-white border p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-yellow-600">45</div>
          <div class="text-xs text-gray-500 mt-1">Manual Renewal Required</div>
        </div>
        <div class="rounded-lg bg-white border p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-red-600">12</div>
          <div class="text-xs text-gray-500 mt-1">Payment Method Issues</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showInvoiceModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showInvoiceModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Create Manual Invoice</h2>
        <form @submit.prevent="handleCreateInvoice">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Select Member</label>
            <select v-model="invoice.member" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Choose member</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
              <option>Bob Johnson</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Membership Type</label>
            <select v-model="invoice.type" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Choose Select Type</option>
              <option>Premium</option>
              <option>Basic</option>
              <option>Student</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Amount</label>
            <input v-model="invoice.amount" type="number" class="w-full border rounded px-3 py-2" placeholder="0.00" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Due Date</label>
            <input v-model="invoice.dueDate" type="text" class="w-full border rounded px-3 py-2" placeholder="MM/DD/YYYY" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="invoice.description" class="w-full border rounded px-3 py-2" placeholder="Provide description" rows="2"></textarea>
          </div>
          <div class="flex gap-2 mt-6">
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showInvoiceModal = false">Cancel</button>
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-if="showExportModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showExportModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Export Report</h2>
        <form @submit.prevent="handleExportReport">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Report Type</label>
            <select v-model="exportReport.type" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select report type</option>
              <option>Summary</option>
              <option>Detailed</option>
              <option>Custom</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Date Range</label>
            <select v-model="exportReport.dateRange" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select date range</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Format</label>
            <select v-model="exportReport.format" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select File Format</option>
              <option>PDF</option>
              <option>CSV</option>
              <option>XLSX</option>
            </select>
          </div>
          <div class="mb-4">
            <div class="bg-orange-50 rounded p-3 flex items-center gap-2">
              <input id="detailedBreakdown" type="checkbox" v-model="exportReport.detailed" class="accent-orange-500" />
              <label for="detailedBreakdown" class="text-orange-700 text-sm cursor-pointer">Include detailed breakdown</label>
            </div>
          </div>
          <div class="flex gap-2 mt-6">
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showExportModal = false">Cancel</button>
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Export report</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon, DocumentPlusIcon, BanknotesIcon, ChartBarIcon, ArrowTrendingDownIcon, CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const showInvoiceModal = ref(false);
const invoice = ref({ member: '', type: '', amount: '', dueDate: '', description: '' });
const showExportModal = ref(false);
const exportReport = ref({ type: '', dateRange: '', format: '', detailed: false });

function handleCreateInvoice() {
  // Logic to create invoice
  showInvoiceModal.value = false;
  invoice.value = { member: '', type: '', amount: '', dueDate: '', description: '' };
}

function handleExportReport() {
  // Logic to export report
  showExportModal.value = false;
  exportReport.value = { type: '', dateRange: '', format: '', detailed: false };
}
</script> 