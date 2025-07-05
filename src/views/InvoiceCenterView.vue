<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Invoice Center</h1>
      <div class="flex gap-2">
        <button class="border rounded px-4 py-2 flex items-center gap-2 text-sm font-medium">
          <ArrowDownTrayIcon class="w-5 h-5" /> Export All
        </button>
        <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="showInvoiceModal = true">
          <DocumentPlusIcon class="w-5 h-5" /> + Create invoice
        </button>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 mb-4">
      <input type="text" class="flex-1 border rounded px-3 py-2" placeholder="Search invoice" />
      <select class="border rounded px-3 py-2 w-48">
        <option>Filter by Status</option>
        <option>Paid</option>
        <option>Pending</option>
        <option>Overdue</option>
      </select>
    </div>
    <div>
      <div class="font-semibold mb-2">Recent Invoices</div>
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-gray-500 border-b">
              <th class="py-2 px-4">Invoice ID</th>
              <th class="py-2 px-4">Member</th>
              <th class="py-2 px-4">Amount</th>
              <th class="py-2 px-4">Date</th>
              <th class="py-2 px-4">Status</th>
              <th class="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 font-bold">INV-001</td>
              <td class="py-2 px-4">John Doe</td>
              <td class="py-2 px-4">$89.00</td>
              <td class="py-2 px-4">2024-03-15</td>
              <td class="py-2 px-4"><span class="text-green-600">Paid</span></td>
              <td class="py-2 px-4 flex gap-2">
                <button class="hover:bg-gray-100 rounded p-1" @click="showInvoiceDetailsModal = true"><EyeIcon class="w-4 h-4 text-gray-400" /></button>
                <button class="hover:bg-gray-100 rounded p-1"><ArrowPathIcon class="w-4 h-4 text-gray-400" /></button>
              </td>
            </tr>
            <tr>
              <td class="py-2 px-4 font-bold">INV-002</td>
              <td class="py-2 px-4">Jane Smith</td>
              <td class="py-2 px-4">$39.00</td>
              <td class="py-2 px-4">2024-03-14</td>
              <td class="py-2 px-4"><span class="text-green-600">Paid</span></td>
              <td class="py-2 px-4 flex gap-2">
                <button class="hover:bg-gray-100 rounded p-1" @click="showInvoiceDetailsModal = true"><EyeIcon class="w-4 h-4 text-gray-400" /></button>
                <button class="hover:bg-gray-100 rounded p-1"><ArrowPathIcon class="w-4 h-4 text-gray-400" /></button>
              </td>
            </tr>
            <tr>
              <td class="py-2 px-4 font-bold">INV-003</td>
              <td class="py-2 px-4">Bob Johnson</td>
              <td class="py-2 px-4">$89.00</td>
              <td class="py-2 px-4">2024-03-01</td>
              <td class="py-2 px-4"><span class="text-red-500">Overdue</span></td>
              <td class="py-2 px-4 flex gap-2">
                <button class="hover:bg-gray-100 rounded p-1" @click="showInvoiceDetailsModal = true"><EyeIcon class="w-4 h-4 text-gray-400" /></button>
                <button class="hover:bg-gray-100 rounded p-1"><ArrowPathIcon class="w-4 h-4 text-gray-400" /></button>
              </td>
            </tr>
            <tr>
              <td class="py-2 px-4 font-bold">INV-004</td>
              <td class="py-2 px-4">Sarah Wilson</td>
              <td class="py-2 px-4">$15.00</td>
              <td class="py-2 px-4">2024-02-28</td>
              <td class="py-2 px-4"><span class="text-yellow-500">Pending</span></td>
              <td class="py-2 px-4 flex gap-2">
                <button class="hover:bg-gray-100 rounded p-1" @click="showInvoiceDetailsModal = true"><EyeIcon class="w-4 h-4 text-gray-400" /></button>
                <button class="hover:bg-gray-100 rounded p-1"><ArrowPathIcon class="w-4 h-4 text-gray-400" /></button>
              </td>
            </tr>
          </tbody>
        </table>
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
              <option>Sarah Wilson</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Membership type</label>
            <select v-model="invoice.type" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select type</option>
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
            <textarea v-model="invoice.description" class="w-full border rounded px-3 py-2" placeholder="Invoice description" rows="2"></textarea>
          </div>
          <div class="flex gap-2 mt-6">
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showInvoiceModal = false">Cancel</button>
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-if="showInvoiceDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showInvoiceDetailsModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Invoice Details - INV-001</h2>
        <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
          <div>
            <div class="font-semibold mb-1">Bill To:</div>
            <div>John Doe</div>
            <div class="text-xs text-gray-500">john.doe@email.com</div>
            <div class="text-xs text-gray-500 mb-2">Premium Member</div>
          </div>
          <div class="text-sm text-gray-700">
            <div><span class="font-medium">Invoice Date:</span> 2024-03-15</div>
            <div><span class="font-medium">Due Date:</span> 2024-03-30</div>
            <div><span class="font-medium">Payment Method:</span> Visa •••• 4242</div>
            <div><span class="font-medium">Status:</span> <span class="text-green-600 font-semibold">Paid</span></div>
          </div>
        </div>
        <div class="border-t pt-4 mb-4">
          <div class="font-semibold mb-2">Invoice Items</div>
          <table class="w-full text-sm mb-2">
            <thead>
              <tr class="text-left text-gray-500 border-b">
                <th class="py-2 px-4">Description</th>
                <th class="py-2 px-4">Qty</th>
                <th class="py-2 px-4">Unit Price</th>
                <th class="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2 px-4">Premium Membership - March 2024</td>
                <td class="py-2 px-4">1</td>
                <td class="py-2 px-4">$89.00</td>
                <td class="py-2 px-4">$89.00</td>
              </tr>
            </tbody>
          </table>
          <div class="flex flex-col items-end text-sm">
            <div class="flex gap-8">
              <div class="text-gray-500">Subtotal:</div>
              <div>$89.00</div>
            </div>
            <div class="flex gap-8">
              <div class="text-gray-500">Tax (10%):</div>
              <div>$8.90</div>
            </div>
            <div class="flex gap-8 font-bold">
              <div>Total:</div>
              <div>$97.90</div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Download PDF</button>
          <button class="flex-1 border rounded px-4 py-2 font-medium">Print Invoice</button>
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="showInvoiceDetailsModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon, DocumentPlusIcon, EyeIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
const showInvoiceModal = ref(false);
const invoice = ref({ member: '', type: '', amount: '', dueDate: '', description: '' });
const showInvoiceDetailsModal = ref(false);
function handleCreateInvoice() {
  // Logic to create invoice
  showInvoiceModal.value = false;
  invoice.value = { member: '', type: '', amount: '', dueDate: '', description: '' };
}
</script> 