<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Payments & Transactions</h1>
      <p class="text-sm text-[#6b7280]">Track all financial transactions and payouts</p>
    </div>

    <!-- Transaction Type Tabs -->
    <div class="inline-flex gap-1 bg-white p-1 rounded-lg border border-[#e5e7eb]">
      <button
        v-for="tab in transactionTabs"
        :key="tab.id"
        @click="activeTransactionTab = tab.id"
        :class="[
          'px-4 py-2 text-sm font-medium transition-all rounded-lg',
          activeTransactionTab === tab.id
            ? 'bg-[#f3f4f6] text-[#111827] shadow-sm'
            : 'bg-transparent text-[#6b7280] hover:bg-[#f9fafb]'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-3">
      <!-- All Status Filter -->
      <div class="relative">
        <select
          v-model="statusFilter"
          class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
      </div>

      <!-- Last 7 days Filter -->
      <div class="relative">
        <select
          v-model="dateFilter"
          class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
        >
          <option value="">Last 7 days</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last-30">Last 30 days</option>
          <option value="last-90">Last 90 days</option>
        </select>
        <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <!-- All Transactions Table -->
      <div v-if="activeTransactionTab === 'all'" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e5e7eb]">
          <thead class="bg-[#f9fafb]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Transaction ID</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Source</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Destination</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Date & Time</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">LINKED DELIVERY</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-[#e5e7eb]">
            <tr
              v-for="(transaction, index) in paginatedTransactions"
              :key="transaction.id"
              :class="[
                'hover:bg-[#f9fafb] transition-colors cursor-pointer',
                index === 0 ? 'bg-[#f3f4f6]' : ''
              ]"
              @click="openTransactionModal(transaction)"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ transaction.transactionId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ transaction.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ transaction.source }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ transaction.destination }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ transaction.amount }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(transaction.status)">
                  {{ transaction.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ transaction.dateTime }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ transaction.linkedDelivery }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Rider Payout Table -->
      <div v-if="activeTransactionTab === 'rider'" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e5e7eb]">
          <thead class="bg-[#f9fafb]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Payout ID</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Rider</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">DATE</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Deliveries</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Total Earning</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Fees Deducted</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Net Amount</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">STATUS</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-[#e5e7eb]">
            <tr
              v-for="(payout, index) in paginatedRiderPayouts"
              :key="payout.id"
              :class="[
                'hover:bg-[#f9fafb] transition-colors cursor-pointer',
                index === 0 ? 'bg-[#f3f4f6]' : ''
              ]"
              @click="openRiderPayoutModal(payout)"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ payout.payoutId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ payout.rider }} ({{ payout.riderId }})</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ payout.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ payout.deliveries }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ payout.totalEarning }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#ef4444]">{{ payout.feesDeducted }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#10b981]">{{ payout.netAmount }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getRiderPayoutStatusClass(payout.status)">
                  {{ payout.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-center">
        <div class="flex items-center gap-2">
          <!-- Previous Button -->
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            <IconArrowLeft class="h-4 w-4" />
          </button>

          <!-- Page Numbers -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-[#2563eb] text-white border border-[#2563eb]'
                : 'border border-[#e5e7eb] text-[#374151] hover:bg-white'
            ]"
          >
            {{ page }}
          </button>

          <!-- Ellipsis after pages -->
          <span v-if="showEndEllipsis" class="px-2 text-[#374151]">—</span>

          <!-- Last Page (if not already shown) -->
          <button
            v-if="totalPages > 7 && currentPage < totalPages - 3"
            @click="goToPage(totalPages)"
            :class="[
              'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium border border-[#e5e7eb] text-[#374151] hover:bg-white transition-colors',
              currentPage === totalPages ? 'bg-[#2563eb] text-white border-[#2563eb]' : ''
            ]"
          >
            {{ totalPages }}
          </button>

          <!-- Next Button -->
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            <IconArrowRight class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Transaction Details Modal (Slide-in from right) -->
    <TransitionRoot appear :show="showTransactionModal" as="template">
      <Dialog as="div" @close="closeTransactionModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/40"></div>
        </TransitionChild>

        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden bg-white shadow-xl transition-all rounded-tl-xl rounded-bl-xl">
                <div class="flex flex-col h-screen">
                  <!-- Header -->
                  <div class="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
                    <DialogTitle class="text-xl font-semibold text-[#111827]">
                      Transaction Details
                    </DialogTitle>
                    <button
                      @click="closeTransactionModal"
                      class="text-[#6b7280] hover:text-[#111827] transition-colors p-1 rounded-lg hover:bg-[#f3f4f6]"
                    >
                      <IconX class="h-5 w-5" />
                    </button>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <!-- Transaction Overview (Regular Transaction) -->
                    <div v-if="!isRiderPayoutModal" class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Transaction Details</h3>
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Transaction ID</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedTransaction?.transactionId || 'TXN10045' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Type</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedTransaction?.type || 'Delivery Payment' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Status</p>
                          <span :class="getStatusClass(selectedTransaction?.status || 'Completed')">
                            {{ selectedTransaction?.status || 'Completed' }}
                          </span>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Payment Method</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedTransaction?.paymentMethod || 'Wallet' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Date & Time</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedTransaction?.dateTime || '2024-10-12 14:35' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Linked Delivery</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedTransaction?.linkedDelivery || 'R304' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Rider Payout Overview -->
                    <div v-if="isRiderPayoutModal" class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Payout Details</h3>
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Payout ID</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRiderPayout?.payoutId || 'PAY-001' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Rider</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRiderPayout?.rider || 'John Mark' }} ({{ selectedRiderPayout?.riderId || 'R123' }})</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Date</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRiderPayout?.date || 'Oct 1, 2025' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Deliveries</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRiderPayout?.deliveries || 45 }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Status</p>
                          <span :class="getRiderPayoutStatusClass(selectedRiderPayout?.status || 'completed')">
                            {{ selectedRiderPayout?.status || 'completed' }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Payment Breakdown (Regular Transaction) -->
                    <div v-if="!isRiderPayoutModal" class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Payment Breakdown</h3>
                      <div class="space-y-3">
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Base Fare</p>
                          <p class="text-sm font-semibold text-[#111827]">₦2,000</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Distance Fee (5km)</p>
                          <p class="text-sm font-semibold text-[#111827]">₦250</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Service Fee (10%)</p>
                          <p class="text-sm font-semibold text-[#111827]">₦250</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Service Fee (10%)</p>
                          <p class="text-sm font-semibold text-[#111827]">₦250</p>
                        </div>
                      </div>
                    </div>

                    <!-- Payout Breakdown (Rider Payout) -->
                    <div v-if="isRiderPayoutModal" class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Payout Breakdown</h3>
                      <div class="space-y-3">
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Total Earning</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRiderPayout?.totalEarning || '₦345,000' }}</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Fees Deducted</p>
                          <p class="text-sm font-semibold text-[#ef4444]">{{ selectedRiderPayout?.feesDeducted || '-₦345,000' }}</p>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-[#e5e7eb]">
                          <p class="text-sm font-semibold text-[#111827]">Net Amount</p>
                          <p class="text-sm font-semibold text-[#10b981]">{{ selectedRiderPayout?.netAmount || '₦345,000' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Audit Trail -->
                    <div class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Audit Trail</h3>
                      <div class="space-y-3">
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Payment Initiated</p>
                          <p class="text-sm font-semibold text-[#111827]">2024-10-12 14:35:12</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Payment Processed</p>
                          <p class="text-sm font-semibold text-[#111827]">2024-10-12 14:35:18</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Payment Completed</p>
                          <p class="text-sm font-semibold text-[#111827]">2024-10-12 14:35:20</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="flex justify-end px-6 py-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                    <button
                      @click="handleDownloadReceipt"
                      class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
                    >
                      Download Receipt
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';
import IconArrowRight from '@/components/icon/icon-arrow-forward.vue';
import IconX from '@/components/icon/icon-x.vue';

interface Transaction {
  id: string;
  transactionId: string;
  type: string;
  source: string;
  destination: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  dateTime: string;
  linkedDelivery: string;
  paymentMethod?: string;
}

interface RiderPayout {
  id: string;
  payoutId: string;
  rider: string;
  riderId: string;
  date: string;
  deliveries: number;
  totalEarning: string;
  feesDeducted: string;
  netAmount: string;
  status: 'completed' | 'pending' | 'failed';
}

const searchQuery = ref('');
const statusFilter = ref('');
const dateFilter = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const activeTransactionTab = ref('all');
const showTransactionModal = ref(false);
const selectedTransaction = ref<Transaction | null>(null);
const selectedRiderPayout = ref<RiderPayout | null>(null);
const isRiderPayoutModal = ref(false);

const transactionTabs = [
  { id: 'all', label: 'All Transactions' },
  { id: 'rider', label: 'Rider Payout' },
];

// Sample transaction data
const transactions = ref<Transaction[]>([
  {
    id: '1',
    transactionId: 'TXN100452e3...',
    type: 'Delivery Payment',
    source: 'Sarah J (C002)',
    destination: 'Island',
    amount: '₦345,000',
    status: 'Completed',
    dateTime: '2024-10-12 14:35',
    linkedDelivery: 'PMD123',
    paymentMethod: 'Wallet',
  },
  {
    id: '2',
    transactionId: 'TXN100452e3...',
    type: 'Rider Payout',
    source: 'Sarah J (C002)',
    destination: 'Aja',
    amount: '₦345,000',
    status: 'Failed',
    dateTime: '2024-10-12 14:35',
    linkedDelivery: 'PMD123',
    paymentMethod: 'Wallet',
  },
  {
    id: '3',
    transactionId: 'TXN100452e3...',
    type: 'Rider Payout',
    source: 'Sarah J (C002)',
    destination: 'Aja',
    amount: '₦345,000',
    status: 'Pending',
    dateTime: '2024-10-12 14:35',
    linkedDelivery: 'PMD123',
    paymentMethod: 'Wallet',
  },
  {
    id: '4',
    transactionId: 'TXN100452e4...',
    type: 'Delivery Payment',
    source: 'John D (C001)',
    destination: 'Mainland',
    amount: '₦125,000',
    status: 'Completed',
    dateTime: '2024-10-11 10:20',
    linkedDelivery: 'PMD124',
  },
  {
    id: '5',
    transactionId: 'TXN100452e5...',
    type: 'Rider Payout',
    source: 'Jane S (C003)',
    destination: 'Victoria Island',
    amount: '₦89,500',
    status: 'Completed',
    dateTime: '2024-10-10 16:45',
    linkedDelivery: 'PMD125',
  },
]);

// Rider payout data
const riderPayouts = ref<RiderPayout[]>([
  {
    id: 'p1',
    payoutId: 'PAY-001',
    rider: 'John Mark',
    riderId: 'R123',
    date: 'Oct 1, 2025',
    deliveries: 45,
    totalEarning: '₦345,000',
    feesDeducted: '-₦345,000',
    netAmount: '₦345,000',
    status: 'completed',
  },
  {
    id: 'p2',
    payoutId: 'PAY-001',
    rider: 'John Mark',
    riderId: 'R123',
    date: 'Oct 1, 2025',
    deliveries: 45,
    totalEarning: '₦345,000',
    feesDeducted: '-₦345,000',
    netAmount: '₦345,000',
    status: 'pending',
  },
  {
    id: 'p3',
    payoutId: 'PAY-001',
    rider: 'John Mark',
    riderId: 'R123',
    date: 'Oct 1, 2025',
    deliveries: 45,
    totalEarning: '₦345,000',
    feesDeducted: '-₦345,000',
    netAmount: '₦345,000',
    status: 'pending',
  },
  {
    id: 'p4',
    payoutId: 'PAY-002',
    rider: 'Sarah Johnson',
    riderId: 'R124',
    date: 'Oct 2, 2025',
    deliveries: 32,
    totalEarning: '₦245,000',
    feesDeducted: '-₦24,500',
    netAmount: '₦220,500',
    status: 'completed',
  },
  {
    id: 'p5',
    payoutId: 'PAY-003',
    rider: 'Michael Brown',
    riderId: 'R125',
    date: 'Oct 3, 2025',
    deliveries: 28,
    totalEarning: '₦189,000',
    feesDeducted: '-₦18,900',
    netAmount: '₦170,100',
    status: 'pending',
  },
]);

// Filter transactions based on search, filters, and tab
const filteredTransactions = computed(() => {
  let result = transactions.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (transaction) =>
        transaction.transactionId.toLowerCase().includes(query) ||
        transaction.linkedDelivery.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (statusFilter.value) {
    result = result.filter((transaction) => transaction.status.toLowerCase() === statusFilter.value);
  }

  // Date filter (if needed)
  if (dateFilter.value) {
    // Add date filtering logic if needed
  }

  return result;
});

// Filter rider payouts
const filteredRiderPayouts = computed(() => {
  let result = riderPayouts.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (payout) =>
        payout.payoutId.toLowerCase().includes(query) ||
        payout.rider.toLowerCase().includes(query) ||
        payout.riderId.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (statusFilter.value) {
    result = result.filter((payout) => payout.status === statusFilter.value);
  }

  return result;
});

// Pagination calculations
const totalPages = computed(() => {
  if (activeTransactionTab.value === 'rider') {
    return Math.ceil(filteredRiderPayouts.value.length / perPage.value);
  }
  return Math.ceil(filteredTransactions.value.length / perPage.value);
});

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, filteredTransactions.value.length);
  return { startIndex, endIndex };
});

const paginatedTransactions = computed(() => {
  return filteredTransactions.value.slice(pagination.value.startIndex, pagination.value.endIndex);
});

const paginatedRiderPayouts = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, filteredRiderPayouts.value.length);
  return filteredRiderPayouts.value.slice(startIndex, endIndex);
});

// Visible pages for pagination
const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;
  
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    if (currentPage.value <= 3) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage.value >= totalPages.value - 2) {
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
        if (i > 1) pages.push(i);
      }
    } else {
      pages.push(currentPage.value - 1);
      pages.push(currentPage.value);
      pages.push(currentPage.value + 1);
    }
  }
  
  return pages;
});

const showEndEllipsis = computed(() => {
  return totalPages.value > 7 && currentPage.value < totalPages.value - 3;
});

// Get status badge class
const getStatusClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white';
  const statusClasses: Record<string, string> = {
    'Completed': 'bg-[#10b981]',
    'Pending': 'bg-[#6b7280]',
    'Failed': 'bg-[#ef4444]',
  };
  return `${baseClasses} ${statusClasses[status] || 'bg-[#6b7280]'}`;
};

// Get rider payout status badge class
const getRiderPayoutStatusClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';
  const statusClasses: Record<string, string> = {
    'completed': 'bg-[#d1fae5] text-[#047857]', // Light green background, dark green text
    'pending': 'bg-[#fef3c7] text-[#d97706]', // Light orange/yellow background, orange text
    'failed': 'bg-[#fee2e2] text-[#dc2626]', // Light red background, dark red text
  };
  return `${baseClasses} ${statusClasses[status] || 'bg-[#f3f4f6] text-[#374151]'}`;
};

// Pagination methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Modal functions
const openTransactionModal = (transaction: Transaction) => {
  selectedTransaction.value = transaction;
  selectedRiderPayout.value = null;
  isRiderPayoutModal.value = false;
  showTransactionModal.value = true;
};

const openRiderPayoutModal = (payout: RiderPayout) => {
  selectedRiderPayout.value = payout;
  selectedTransaction.value = null;
  isRiderPayoutModal.value = true;
  showTransactionModal.value = true;
};

const closeTransactionModal = () => {
  showTransactionModal.value = false;
  selectedTransaction.value = null;
  selectedRiderPayout.value = null;
  isRiderPayoutModal.value = false;
};

const handleDownloadReceipt = () => {
  // Handle download receipt action
  console.log('Download Receipt clicked for transaction:', selectedTransaction.value?.transactionId);
};

// Reset to page 1 when filters change
watch([searchQuery, statusFilter, dateFilter, activeTransactionTab], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

