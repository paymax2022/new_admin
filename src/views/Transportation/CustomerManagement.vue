<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-4">
      <!-- Header -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold leading-tight text-[#374151]">Customer Management</h1>
          <p class="mt-1 text-sm text-[#888]">Manage customer accounts and relationships</p>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div class="relative flex-1 max-w-[400px]">
          <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            v-model="search"
            placeholder="Search Customer..."
            class="h-10 w-full rounded-lg border border-[#e0e0e0] bg-white pl-9 pr-3 text-sm text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#cbd5e1]"
          />
        </div>
        <select
          v-model="dateRange"
          class="h-10 min-w-[140px] rounded-lg border border-[#e0e0e0] bg-white px-4 pr-9 text-sm text-[#374151] outline-none focus:border-[#cbd5e1]"
        >
          <option value="7">Last 7 days</option>
          <option value="14">Last 14 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>

      <!-- Customer Table (card-like rows) -->
      <div class="overflow-x-auto rounded-lg border border-[#e0e0e0] bg-white">
        <div class="min-w-[800px]">
          <!-- Table Header -->
          <div class="grid grid-cols-[80px_1fr_110px_100px_110px_110px_120px] gap-4 border-b border-[#e0e0e0] bg-white px-4 py-3 text-left text-sm font-semibold text-[#374151]">
            <div>Customer ID</div>
            <div>Name</div>
            <div>Contact</div>
            <div>Total Order</div>
            <div>Total Spent</div>
            <div>Last Order</div>
            <div>Payment Method</div>
          </div>
          <!-- Table Body - card-like rows -->
          <div class="divide-y divide-[#e5e7eb]">
            <div
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="grid grid-cols-[80px_1fr_110px_100px_110px_110px_120px] gap-4 bg-[#f8f8f8] px-4 py-4 text-sm text-[#374151]"
            >
            <div class="font-medium text-[#374151]">{{ customer.customerId }}</div>
            <div>
              <p class="font-medium text-[#374151]">{{ customer.name }}</p>
              <p class="mt-0.5 text-xs text-[#6b7280]">{{ customer.email }}</p>
            </div>
            <div class="text-[#374151]">{{ customer.contact }}</div>
            <div class="text-[#374151]">{{ customer.totalOrder }}</div>
            <div class="text-[#374151]">{{ customer.totalSpent }}</div>
            <div class="text-[#374151]">{{ customer.lastOrder }}</div>
            <div class="text-[#374151]">{{ customer.paymentMethod }}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';

type CustomerRow = {
  id: string;
  customerId: string;
  name: string;
  email: string;
  contact: string;
  totalOrder: string;
  totalSpent: string;
  lastOrder: string;
  paymentMethod: string;
};

const search = ref('');
const dateRange = ref('7');

const customers = ref<CustomerRow[]>([
  { id: '1', customerId: 'C001', name: 'John Doe', email: 'john.doe@email.com', contact: '08123456789', totalOrder: '232', totalSpent: '₦125,000', lastOrder: '2024-10-10', paymentMethod: 'Wallet' },
  { id: '2', customerId: 'C002', name: 'Jane Smith', email: 'jane.smith@email.com', contact: '08098765432', totalOrder: '156', totalSpent: '₦89,500', lastOrder: '2024-10-09', paymentMethod: 'Cash' },
  { id: '3', customerId: 'C003', name: 'Chidi Okonkwo', email: 'chidi.o@email.com', contact: '08123456780', totalOrder: '89', totalSpent: '₦45,200', lastOrder: '2024-10-08', paymentMethod: 'Wallet' },
  { id: '4', customerId: 'C004', name: 'Amina Bello', email: 'amina.bello@email.com', contact: '07012345678', totalOrder: '312', totalSpent: '₦178,000', lastOrder: '2024-10-10', paymentMethod: 'Wallet' },
  { id: '5', customerId: 'C005', name: 'Emeka Nwosu', email: 'emeka.n@email.com', contact: '09087654321', totalOrder: '44', totalSpent: '₦22,100', lastOrder: '2024-10-07', paymentMethod: 'Cash' },
]);

const filteredCustomers = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return customers.value;
  return customers.value.filter(
    (c) =>
      c.customerId.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.contact.includes(q)
  );
});
</script>
