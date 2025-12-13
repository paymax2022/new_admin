<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Customers</h1>
      <p class="text-sm text-[#6b7280]">Manage customer accounts and relationships</p>
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-3">
      <!-- All Orders Filter -->
      <div class="relative">
        <select
          v-model="ordersFilter"
          class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
        >
          <option value="">All Orders</option>
          <option value="0-10">0 - 10 orders</option>
          <option value="10-50">10 - 50 orders</option>
          <option value="50+">50 + orders</option>
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

    <!-- Customers Table -->
    <div class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e5e7eb]">
          <thead class="bg-[#f9fafb]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Customer ID</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Total Orders</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Total Spent</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Last Order</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Payment Method</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-[#e5e7eb]">
            <tr
              v-for="(customer, index) in paginatedCustomers"
              :key="customer.id"
              :class="[
                'hover:bg-[#f9fafb] transition-colors cursor-pointer',
                index === 0 ? 'bg-[#f3f4f6]' : ''
              ]"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ customer.customerId }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-[#111827]">{{ customer.name }}</span>
                  <span class="text-xs text-[#6b7280]">{{ customer.email }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ customer.contact }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ customer.totalOrders }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ customer.totalSpent }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ customer.lastOrder }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ customer.paymentMethod }}</td>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';
import IconArrowRight from '@/components/icon/icon-arrow-forward.vue';

interface Customer {
  id: string;
  customerId: string;
  name: string;
  email: string;
  contact: string;
  totalOrders: number;
  totalSpent: string;
  lastOrder: string;
  paymentMethod: string;
}

const searchQuery = ref('');
const ordersFilter = ref('');
const dateFilter = ref('');
const currentPage = ref(1);
const perPage = ref(10);

// Sample customer data
const customers = ref<Customer[]>([
  {
    id: '1',
    customerId: 'C001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    contact: '08123456789',
    totalOrders: 232,
    totalSpent: '₦125,000',
    lastOrder: '2024-10-10',
    paymentMethod: 'Wallet',
  },
  {
    id: '2',
    customerId: 'C00135',
    name: 'John Doe',
    email: 'john.doe@email.com',
    contact: '08123456789',
    totalOrders: 12,
    totalSpent: '₦345,000',
    lastOrder: '2024-10-10',
    paymentMethod: 'Card',
  },
  {
    id: '3',
    customerId: 'C002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    contact: '08123456790',
    totalOrders: 156,
    totalSpent: '₦89,500',
    lastOrder: '2024-10-09',
    paymentMethod: 'Card',
  },
  {
    id: '4',
    customerId: 'C003',
    name: 'Michael Johnson',
    email: 'michael.j@email.com',
    contact: '08123456791',
    totalOrders: 89,
    totalSpent: '₦67,200',
    lastOrder: '2024-10-08',
    paymentMethod: 'Wallet',
  },
  {
    id: '5',
    customerId: 'C004',
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    contact: '08123456792',
    totalOrders: 201,
    totalSpent: '₦145,800',
    lastOrder: '2024-10-10',
    paymentMethod: 'Card',
  },
  {
    id: '6',
    customerId: 'C005',
    name: 'David Brown',
    email: 'david.b@email.com',
    contact: '08123456793',
    totalOrders: 45,
    totalSpent: '₦32,100',
    lastOrder: '2024-10-07',
    paymentMethod: 'Wallet',
  },
  {
    id: '7',
    customerId: 'C006',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    contact: '08123456794',
    totalOrders: 178,
    totalSpent: '₦112,400',
    lastOrder: '2024-10-09',
    paymentMethod: 'Card',
  },
  {
    id: '8',
    customerId: 'C007',
    name: 'Robert Wilson',
    email: 'robert.w@email.com',
    contact: '08123456795',
    totalOrders: 67,
    totalSpent: '₦48,900',
    lastOrder: '2024-10-06',
    paymentMethod: 'Wallet',
  },
  {
    id: '9',
    customerId: 'C008',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    contact: '08123456796',
    totalOrders: 134,
    totalSpent: '₦98,300',
    lastOrder: '2024-10-08',
    paymentMethod: 'Card',
  },
  {
    id: '10',
    customerId: 'C009',
    name: 'James Taylor',
    email: 'james.t@email.com',
    contact: '08123456797',
    totalOrders: 92,
    totalSpent: '₦71,600',
    lastOrder: '2024-10-05',
    paymentMethod: 'Wallet',
  },
]);

// Filter customers based on search and filters
const filteredCustomers = computed(() => {
  let result = customers.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (customer) =>
        customer.customerId.toLowerCase().includes(query) ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query)
    );
  }

  // Orders filter
  if (ordersFilter.value) {
    if (ordersFilter.value === '0-10') {
      result = result.filter((customer) => customer.totalOrders >= 0 && customer.totalOrders <= 10);
    } else if (ordersFilter.value === '10-50') {
      result = result.filter((customer) => customer.totalOrders > 10 && customer.totalOrders <= 50);
    } else if (ordersFilter.value === '50+') {
      result = result.filter((customer) => customer.totalOrders > 50);
    }
  }

  // Date filter (if needed)
  if (dateFilter.value) {
    // Add filtering logic based on date if needed
  }

  return result;
});

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / perPage.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, filteredCustomers.value.length);
  return { startIndex, endIndex };
});

const paginatedCustomers = computed(() => {
  return filteredCustomers.value.slice(pagination.value.startIndex, pagination.value.endIndex);
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

// Reset to page 1 when filters change
watch([searchQuery, ordersFilter, dateFilter], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

