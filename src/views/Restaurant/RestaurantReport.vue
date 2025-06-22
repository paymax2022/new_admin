<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Sales Report</h1>

      <!-- Controls Row -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div class="text-sm text-gray-600">
          <select
            v-model="perPage"
            @change="resetPagination"
            class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">10 entries per page</option>
            <option value="25">25 entries per page</option>
            <option value="50">50 entries per page</option>
          </select>
        </div>

        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search orders..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <div class="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="header in headers"
                :key="header.key"
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="order in paginatedOrders"
              :key="order.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ order.orderCode }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.restaurantName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="{
                    'bg-green-100 text-green-800': order.orderStatus === 'Completed',
                    'bg-blue-100 text-blue-800': order.orderStatus === 'Accepted',
                    'bg-yellow-100 text-yellow-800': order.orderStatus === 'Pending',
                    'bg-red-100 text-red-800': order.orderStatus === 'Reject'
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ order.orderStatus }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.orderType }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${{ order.deliveryCharge.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${{ order.subtotal.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${{ order.total.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="{
                    'bg-green-100 text-green-800': order.paymentStatus === 'Paid',
                    'bg-red-100 text-red-800': order.paymentStatus === 'Unpaid'
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ order.paymentStatus }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.paymentMethod }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${{ order.paidPrice.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row items-center justify-between mt-4 px-2 py-3 bg-white border-t border-gray-200">
        <div class="text-sm text-gray-700 mb-4 sm:mb-0">
          Showing <span class="font-medium">{{ pagination.startIndex + 1 }}</span> to
          <span class="font-medium">{{ pagination.endIndex }}</span> of
          <span class="font-medium">{{ filteredOrders.length }}</span> entries
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

interface Order {
  id: string;
  orderCode: string;
  restaurantName: string;
  orderStatus: 'Completed' | 'Accepted' | 'Pending' | 'Reject';
  orderType: string;
  deliveryCharge: number;
  subtotal: number;
  total: number;
  paymentStatus: 'Paid' | 'Unpaid';
  paymentMethod: string;
  paidPrice: number;
}

const headers = [
  { key: 'orderCode', label: 'ORDER CODE' },
  { key: 'restaurantName', label: 'RESTAURANT NAME' },
  { key: 'orderStatus', label: 'ORDER STATUS' },
  { key: 'orderType', label: 'ORDER TYPE' },
  { key: 'deliveryCharge', label: 'DELIVERY CHARGE' },
  { key: 'subtotal', label: 'SUBTOTAL' },
  { key: 'total', label: 'TOTAL' },
  { key: 'paymentStatus', label: 'PAYMENT STATUS' },
  { key: 'paymentMethod', label: 'PAYMENT METHOD' },
  { key: 'paidPrice', label: 'PAID PRICE' },
];

// Mock data - replace with API calls in production
const orders = ref<Order[]>([
  {
    id: '1',
    orderCode: 'ORD-00000011',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Completed',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 30.00,
    total: 42.00,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash On Delivery',
    paidPrice: 42.00
  },
  {
    id: '2',
    orderCode: 'ORD-00000028',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Completed',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 90.00,
    total: 102.00,
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe',
    paidPrice: 102.00
  },
  {
    id: '3',
    orderCode: 'ORD-00000034',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Reject',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 30.00,
    total: 42.00,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash On Delivery',
    paidPrice: 0.00
  },
  {
    id: '4',
    orderCode: 'ORD-00000044',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Completed',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 10.00,
    total: 22.00,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash On Delivery',
    paidPrice: 22.00
  },
  {
    id: '5',
    orderCode: 'ORD-00000056',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Pending',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 90.00,
    total: 102.00,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash On Delivery',
    paidPrice: 0.00
  },
  {
    id: '6',
    orderCode: 'ORD-00000068',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Completed',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 40.00,
    total: 52.00,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash On Delivery',
    paidPrice: 52.00
  },
  {
    id: '7',
    orderCode: 'ORD-00000074',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Accepted',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 20.00,
    total: 32.00,
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe',
    paidPrice: 32.00
  },
  {
    id: '8',
    orderCode: 'ORD-00000074',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Pending',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 10.00,
    total: 22.00,
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe',
    paidPrice: 22.00
  },
  {
    id: '9',
    orderCode: 'ORD-00000097',
    restaurantName: "Sultan's Dine",
    orderStatus: 'Pending',
    orderType: 'Delivery',
    deliveryCharge: 12.00,
    subtotal: 60.00,
    total: 72.00,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash On Delivery',
    paidPrice: 0.00
  }
]);

const searchQuery = ref('');
const perPage = ref(10);

const pagination = reactive({
  currentPage: 1,
  totalPages: computed(() => Math.ceil(filteredOrders.value.length / perPage.value)),
  startIndex: computed(() => (pagination.currentPage - 1) * perPage.value),
  endIndex: computed(() => Math.min(pagination.currentPage * perPage.value, filteredOrders.value.length))
});

const filteredOrders = computed(() => {
  if (!searchQuery.value) return orders.value;

  const query = searchQuery.value.toLowerCase();
  return orders.value.filter(order =>
    order.orderCode.toLowerCase().includes(query) ||
    order.restaurantName.toLowerCase().includes(query) ||
    order.orderStatus.toLowerCase().includes(query) ||
    order.paymentMethod.toLowerCase().includes(query)
  );
});

const paginatedOrders = computed(() => {
  return filteredOrders.value.slice(
    pagination.startIndex,
    pagination.currentPage * perPage.value
  );
});

const resetPagination = () => {
  pagination.currentPage = 1;
};

const prevPage = () => {
  if (pagination.currentPage > 1) {
    pagination.currentPage--;
  }
};

const nextPage = () => {
  if (pagination.currentPage < pagination.totalPages) {
    pagination.currentPage++;
  }
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= pagination.totalPages) {
    pagination.currentPage = page;
  }
};
</script>
