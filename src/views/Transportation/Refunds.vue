<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Refunds</h1>
      <p class="text-sm text-[#6b7280]">Manage refund requests and resolve disputes</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="inline-flex gap-1 bg-white p-1 rounded-lg border border-[#e5e7eb]">
      <button
        v-for="tab in refundTabs"
        :key="tab.id"
        @click="activeRefundTab = tab.id"
        :class="[
          'px-4 py-2 text-sm font-medium transition-all rounded-lg',
          activeRefundTab === tab.id
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
          <option value="rejected">Rejected</option>
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

    <!-- Refunds Table -->
    <div class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e5e7eb]">
          <thead class="bg-[#f9fafb]">
            <tr>
              <!-- Refund Request Tab Headers -->
              <template v-if="activeRefundTab === 'requests'">
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Request ID</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Reason</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Linked Delivery</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Date & Time</th>
              </template>
              <!-- Resolved Cases Tab Headers -->
              <template v-else>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Dispute ID</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Complainant</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Respondent</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Respondent</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Linked Delivery</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Date & Time</th>
              </template>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-[#e5e7eb]">
            <!-- Refund Request Tab Rows -->
            <template v-if="activeRefundTab === 'requests'">
              <tr
                v-for="(refund, index) in paginatedRefunds"
                :key="refund.id"
                :class="[
                  'hover:bg-[#f9fafb] transition-colors cursor-pointer',
                  index === 0 ? 'bg-[#f3f4f6]' : ''
                ]"
                @click="openRefundModal(refund)"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ refund.requestId }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ refund.customer }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ refund.amount }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ refund.reason }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ refund.linkedDelivery }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRefundStatusClass(refund.status)">
                    {{ refund.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-sm text-[#374151]">{{ refund.date }}</span>
                    <span class="text-xs text-[#6b7280]">{{ refund.time }}</span>
                  </div>
                </td>
              </tr>
            </template>
            <!-- Resolved Cases Tab Rows -->
            <template v-else>
              <tr
                v-for="(dispute, index) in paginatedRefunds"
                :key="dispute.id"
                :class="[
                  'hover:bg-[#f9fafb] transition-colors cursor-pointer',
                  index === 0 ? 'bg-[#f3f4f6]' : ''
                ]"
                @click="openRefundModal(dispute)"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ dispute.requestId }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ dispute.customer }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ dispute.amount }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">---</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ dispute.linkedDelivery }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRefundStatusClass(dispute.status)">
                    {{ dispute.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-[#374151]">{{ dispute.date }} {{ dispute.time }}</span>
                </td>
              </tr>
            </template>
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

    <!-- Refund Request Details Modal (Slide-in from right) -->
    <TransitionRoot appear :show="showRefundModal" as="template">
      <Dialog as="div" @close="closeRefundModal" class="relative z-50">
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
                      Refund Request Details
                    </DialogTitle>
                    <button
                      @click="closeRefundModal"
                      class="text-[#6b7280] hover:text-[#111827] transition-colors p-1 rounded-lg hover:bg-[#f3f4f6]"
                    >
                      <IconX class="h-5 w-5" />
                    </button>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <!-- Request Information -->
                    <div class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Request Information</h3>
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Request ID</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRefund?.requestId || 'REF-10045' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Customer</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRefund?.customer || 'Delivery Payment' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Status</p>
                          <span :class="getRefundStatusClass(selectedRefund?.status || 'Pending')">
                            {{ selectedRefund?.status || 'Pending' }}
                          </span>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Refund Amount</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRefund?.amount || '₦2,000' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Date & Time</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRefund?.date || '2024-10-12' }} {{ selectedRefund?.time || '14:35' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Linked Delivery</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedRefund?.linkedDelivery || 'R304' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Refund Reason -->
                    <div class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Refund Reason</h3>
                      <div class="space-y-3">
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Category</p>
                          <p class="text-sm text-[#111827]">{{ selectedRefund?.category || '---' }}</p>
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-[#6b7280] mb-1">Refund Reason here.</label>
                          <textarea
                            v-model="refundReason"
                            rows="3"
                            placeholder="Refund Reason here..."
                            class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 resize-none"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <!-- Linked Delivery & Payment Breakdown -->
                    <div class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Linked Delivery & Payment Breakdown</h3>
                      <div class="space-y-3">
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Delivery ID</p>
                          <p class="text-sm font-semibold text-[#111827]">DEL-001</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Order Subtotal</p>
                          <p class="text-sm font-semibold text-[#111827]">₦2,000</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Delivery Fee</p>
                          <p class="text-sm font-semibold text-[#111827]">₦250</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Service Fee</p>
                          <p class="text-sm font-semibold text-[#111827]">₦250</p>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-[#e5e7eb]">
                          <p class="text-sm font-semibold text-[#111827]">Original Total</p>
                          <p class="text-sm font-semibold text-[#111827]">₦250</p>
                        </div>
                      </div>
                    </div>

                    <!-- Audit Trail -->
                    <div class="space-y-4">
                      <h3 class="text-sm font-semibold text-[#111827]">Audit Trail</h3>
                      <div class="space-y-3">
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Refund requested by customer</p>
                          <p class="text-sm font-semibold text-[#111827]">2025-10-13 09:15</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-[#374151]">Supporting documents uploaded</p>
                          <p class="text-sm font-semibold text-[#111827]">2025-10-13 09:20</p>
                        </div>
                      </div>
                    </div>

                    <!-- Admin Resolution Note -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-[#111827]">Admin Resolution Note</label>
                      <textarea
                        v-model="adminResolutionNote"
                        rows="4"
                        placeholder="Add your decision note here"
                        class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                    <button
                      @click="closeRefundModal"
                      class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
                    >
                      Close
                    </button>
                    <button
                      @click="handleDeclineRefund"
                      class="px-4 py-2 rounded-lg bg-[#ef4444] text-sm font-medium text-white hover:bg-[#dc2626] transition-colors"
                    >
                      Decline Refund
                    </button>
                    <button
                      @click="handleApproveRefund"
                      class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
                    >
                      Approve Refund
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

interface Refund {
  id: string;
  requestId: string;
  customer: string;
  amount: string;
  reason: string;
  linkedDelivery: string;
  status: 'Completed' | 'Pending' | 'Rejected';
  date: string;
  time: string;
  category?: string;
}

const searchQuery = ref('');
const statusFilter = ref('');
const dateFilter = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const activeRefundTab = ref('requests');
const showRefundModal = ref(false);
const selectedRefund = ref<Refund | null>(null);
const refundReason = ref('');
const adminResolutionNote = ref('');

const refundTabs = [
  { id: 'requests', label: 'Refund Request' },
  { id: 'resolved', label: 'Resolved Cases' },
];

// Sample refund data
const refunds = ref<Refund[]>([
  {
    id: '1',
    requestId: 'Ref- 102003',
    customer: 'Ojo Thomas',
    amount: '₦345,000',
    reason: '---',
    linkedDelivery: 'PMD123',
    status: 'Completed',
    date: '2024-10-12',
    time: '14:35',
  },
  {
    id: '2',
    requestId: 'Ref- 102003',
    customer: 'Ajayi Kola',
    amount: '₦345,000',
    reason: '---',
    linkedDelivery: 'PMD123',
    status: 'Pending',
    date: '2024-10-12',
    time: '14:35',
  },
  {
    id: '3',
    requestId: 'Ref- 102003',
    customer: 'Ajayi Kola',
    amount: '₦345,000',
    reason: '---',
    linkedDelivery: 'PMD123',
    status: 'Pending',
    date: '2024-10-12',
    time: '14:35',
  },
  {
    id: '4',
    requestId: 'Ref- 102004',
    customer: 'John Doe',
    amount: '₦125,000',
    reason: 'Damaged goods',
    linkedDelivery: 'PMD124',
    status: 'Completed',
    date: '2024-10-11',
    time: '10:20',
  },
  {
    id: '5',
    requestId: 'Ref- 102005',
    customer: 'Jane Smith',
    amount: '₦89,500',
    reason: '---',
    linkedDelivery: 'PMD125',
    status: 'Pending',
    date: '2024-10-10',
    time: '16:45',
  },
]);

// Filter refunds based on search, filters, and tab
const filteredRefunds = computed(() => {
  let result = refunds.value;

  // Tab filter
  if (activeRefundTab.value === 'resolved') {
    result = result.filter((refund) => refund.status === 'Completed');
  } else {
    result = result.filter((refund) => refund.status !== 'Completed');
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (refund) =>
        refund.requestId.toLowerCase().includes(query) ||
        refund.customer.toLowerCase().includes(query) ||
        refund.linkedDelivery.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (statusFilter.value) {
    result = result.filter((refund) => refund.status.toLowerCase() === statusFilter.value);
  }

  // Date filter (if needed)
  if (dateFilter.value) {
    // Add date filtering logic if needed
  }

  return result;
});

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredRefunds.value.length / perPage.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, filteredRefunds.value.length);
  return { startIndex, endIndex };
});

const paginatedRefunds = computed(() => {
  return filteredRefunds.value.slice(pagination.value.startIndex, pagination.value.endIndex);
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

// Get refund status badge class
const getRefundStatusClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';
  const statusClasses: Record<string, string> = {
    'Completed': 'bg-[#d1fae5] text-[#047857]', // Light green background, dark green text
    'Pending': 'bg-[#fef3c7] text-[#d97706]', // Light orange/yellow background, orange text
    'Rejected': 'bg-[#fee2e2] text-[#dc2626]', // Light red background, dark red text
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
const openRefundModal = (refund: Refund) => {
  selectedRefund.value = refund;
  refundReason.value = refund.reason === '---' ? '' : refund.reason;
  adminResolutionNote.value = '';
  showRefundModal.value = true;
};

const closeRefundModal = () => {
  showRefundModal.value = false;
  selectedRefund.value = null;
  refundReason.value = '';
  adminResolutionNote.value = '';
};

const handleApproveRefund = () => {
  // Handle approve refund action
  console.log('Approve Refund clicked for:', selectedRefund.value?.requestId);
  console.log('Admin Note:', adminResolutionNote.value);
  closeRefundModal();
};

const handleDeclineRefund = () => {
  // Handle decline refund action
  console.log('Decline Refund clicked for:', selectedRefund.value?.requestId);
  console.log('Admin Note:', adminResolutionNote.value);
  closeRefundModal();
};

// Reset to page 1 when filters change
watch([searchQuery, statusFilter, dateFilter, activeRefundTab], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

