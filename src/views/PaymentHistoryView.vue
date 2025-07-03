<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Payment History</h1>
      <button class="border rounded px-4 py-2 flex items-center gap-2 text-sm font-medium">
        <ArrowDownTrayIcon class="w-5 h-5" /> Export History
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
      <div class="rounded-lg bg-green-50 p-4 text-center">
        <div class="text-xs text-green-700 mb-1">Monthly revenue</div>
        <div class="text-2xl font-bold text-green-700">$142,350</div>
      </div>
      <div class="rounded-lg bg-blue-50 p-4 text-center">
        <div class="text-xs text-blue-700 mb-1">Successful Payments</div>
        <div class="text-2xl font-bold text-blue-700">1,247</div>
      </div>
      <div class="rounded-lg bg-red-50 p-4 text-center cursor-pointer" @click="goToFailedPayments">
        <div class="text-xs text-red-700 mb-1">Failed Payments</div>
        <div class="text-2xl font-bold text-red-700">23</div>
      </div>
      <div class="rounded-lg bg-yellow-50 p-4 text-center">
        <div class="text-xs text-yellow-700 mb-1">Pending</div>
        <div class="text-2xl font-bold text-yellow-700">15</div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 mb-4">
      <input type="text" class="flex-1 border rounded px-3 py-2" placeholder="Search by member or Transaction" />
      <select class="border rounded px-3 py-2 w-48">
        <option>Filter by Status</option>
        <option>Successful</option>
        <option>Failed</option>
        <option>Pending</option>
      </select>
    </div>
    <div>
      <div class="font-semibold mb-2">Payment Transactions</div>
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-gray-500 border-b">
              <th class="py-2 px-4">Transaction ID</th>
              <th class="py-2 px-4">Member</th>
              <th class="py-2 px-4">Amount</th>
              <th class="py-2 px-4">Payment Method</th>
              <th class="py-2 px-4">Date</th>
              <th class="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 font-bold">TXN-001</td>
              <td class="py-2 px-4">John Doe</td>
              <td class="py-2 px-4">$89.00</td>
              <td class="py-2 px-4">Visa ****1234</td>
              <td class="py-2 px-4">2024-03-15</td>
              <td class="py-2 px-4"><span class="text-green-600">Successful</span></td>
            </tr>
            <tr>
              <td class="py-2 px-4 font-bold">TXN-002</td>
              <td class="py-2 px-4">Jane Smith</td>
              <td class="py-2 px-4">$29.00</td>
              <td class="py-2 px-4">Master ****5678</td>
              <td class="py-2 px-4">2024-03-14</td>
              <td class="py-2 px-4"><span class="text-green-600">Successful</span></td>
            </tr>
            <tr>
              <td class="py-2 px-4 font-bold">TXN-003</td>
              <td class="py-2 px-4">Bob Johnson</td>
              <td class="py-2 px-4">$89.00</td>
              <td class="py-2 px-4">Visa ****9012</td>
              <td class="py-2 px-4">2024-03-01</td>
              <td class="py-2 px-4"><span class="text-red-500">Failed</span></td>
            </tr>
            <tr>
              <td class="py-2 px-4 font-bold">TXN-004</td>
              <td class="py-2 px-4">Sarah Wilson</td>
              <td class="py-2 px-4">$15.00</td>
              <td class="py-2 px-4">PayPal</td>
              <td class="py-2 px-4">2024-02-28</td>
              <td class="py-2 px-4"><span class="text-yellow-500">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="showFailedPaymentsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showFailedPaymentsModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-semibold text-lg">Failed Payments</h2>
          <div class="flex gap-2">
            <button class="border rounded px-4 py-2 font-medium">Send Reminders</button>
            <button class="bg-red-600 text-white rounded px-4 py-2 font-medium">Retry / Settings</button>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div class="rounded-lg bg-white border p-4 text-center">
            <div class="text-xs text-green-700 mb-1">Total Failed</div>
            <div class="text-2xl font-bold text-green-600">23</div>
          </div>
          <div class="rounded-lg bg-white border p-4 text-center">
            <div class="text-xs text-yellow-700 mb-1">Total Revenue</div>
            <div class="text-2xl font-bold text-yellow-600">$1,847</div>
          </div>
          <div class="rounded-lg bg-white border p-4 text-center">
            <div class="text-xs text-blue-700 mb-1">Retry Attempts</div>
            <div class="text-2xl font-bold text-blue-700">15</div>
          </div>
        </div>
        <div>
          <div class="font-semibold mb-2">Failed Payment Details</div>
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-500 border-b">
                  <th class="py-2 px-4">Member</th>
                  <th class="py-2 px-4">Amount</th>
                  <th class="py-2 px-4">Payment Method</th>
                  <th class="py-2 px-4">Failure Reason</th>
                  <th class="py-2 px-4">Date</th>
                  <th class="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-4 font-bold">Bob Johnson</td>
                  <td class="py-2 px-4">$89.00</td>
                  <td class="py-2 px-4">Visa ****9012</td>
                  <td class="py-2 px-4 text-red-500">Insufficient funds</td>
                  <td class="py-2 px-4">2024-03-01</td>
                  <td class="py-2 px-4 flex gap-2"><button class="border rounded px-3 py-1">Retry</button><button class="border rounded px-3 py-1">Contact</button></td>
                </tr>
                <tr>
                  <td class="py-2 px-4 font-bold">Alice Brown</td>
                  <td class="py-2 px-4">$39.00</td>
                  <td class="py-2 px-4">Master ****3436</td>
                  <td class="py-2 px-4 text-red-500">Expired card</td>
                  <td class="py-2 px-4">2024-02-28</td>
                  <td class="py-2 px-4 flex gap-2"><button class="border rounded px-3 py-1">Retry</button><button class="border rounded px-3 py-1">Contact</button></td>
                </tr>
                <tr>
                  <td class="py-2 px-4 font-bold">Mike Wilson</td>
                  <td class="py-2 px-4">$189.00</td>
                  <td class="py-2 px-4">Visa ****7890</td>
                  <td class="py-2 px-4 text-red-500">Card declined</td>
                  <td class="py-2 px-4">2024-02-25</td>
                  <td class="py-2 px-4 flex gap-2"><button class="border rounded px-3 py-1">Retry</button><button class="border rounded px-3 py-1">Contact</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showFailedPaymentsModal = ref(false);

function goToFailedPayments() {
  router.push('/failed-payments');
}
</script> 