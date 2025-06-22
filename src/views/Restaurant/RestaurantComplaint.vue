<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Complaints</h1>

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
            <option value="100">100 entries per page</option>
          </select>
        </div>

        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <div class="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Table -->
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
            <tr v-if="filteredComplaints.length === 0">
              <td :colspan="headers.length" class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                No data available in table
              </td>
            </tr>
            <tr
              v-for="complaint in paginatedComplaints"
              :key="complaint.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ complaint.orderCode }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ complaint.customerName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="{
                    'bg-green-100 text-green-800': complaint.status === 'Resolved',
                    'bg-yellow-100 text-yellow-800': complaint.status === 'In Progress',
                    'bg-red-100 text-red-800': complaint.status === 'Pending'
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ complaint.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  @click="viewComplaint(complaint.id)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editComplaint(complaint.id)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteComplaint(complaint.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
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
          <span class="font-medium">{{ filteredComplaints.length }}</span> entries
        </div>

        <div class="flex space-x-1">
          <button
            @click="prevPage"
            :disabled="pagination.currentPage === 1"
            :class="{
              'cursor-not-allowed bg-gray-100': pagination.currentPage === 1,
              'hover:bg-gray-100': pagination.currentPage > 1
            }"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium"
          >
            Previous
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="{
              'bg-blue-600 text-white': page === pagination.currentPage,
              'hover:bg-gray-100': page !== pagination.currentPage
            }"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium"
          >
            {{ page }}
          </button>

          <button
            @click="nextPage"
            :disabled="pagination.currentPage === pagination.totalPages"
            :class="{
              'cursor-not-allowed bg-gray-100': pagination.currentPage === pagination.totalPages,
              'hover:bg-gray-100': pagination.currentPage < pagination.totalPages
            }"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';

interface Complaint {
  id: string;
  orderCode: string;
  customerName: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
}

// Mock data - replace with API calls in a real application
const complaints = ref<Complaint[]>([
  { id: '1', orderCode: 'ORD-2023-001', customerName: 'John Smith', status: 'Pending' },
  { id: '2', orderCode: 'ORD-2023-002', customerName: 'Sarah Johnson', status: 'In Progress' },
  { id: '3', orderCode: 'ORD-2023-003', customerName: 'Michael Brown', status: 'Resolved' },
  { id: '4', orderCode: 'ORD-2023-004', customerName: 'Emily Davis', status: 'Pending' },
  { id: '5', orderCode: 'ORD-2023-005', customerName: 'Robert Wilson', status: 'In Progress' },
  { id: '6', orderCode: 'ORD-2023-006', customerName: 'Jennifer Lee', status: 'Resolved' },
  { id: '7', orderCode: 'ORD-2023-007', customerName: 'David Taylor', status: 'Pending' },
  { id: '8', orderCode: 'ORD-2023-008', customerName: 'Jessica Martinez', status: 'In Progress' },
  { id: '9', orderCode: 'ORD-2023-009', customerName: 'Thomas Anderson', status: 'Resolved' },
  { id: '10', orderCode: 'ORD-2023-010', customerName: 'Lisa Thomas', status: 'Pending' },
  { id: '11', orderCode: 'ORD-2023-011', customerName: 'Daniel White', status: 'In Progress' },
  { id: '12', orderCode: 'ORD-2023-012', customerName: 'Michelle Harris', status: 'Resolved' },
]);

const headers = [
  { key: 'orderCode', label: 'ORDER CODE' },
  { key: 'customerName', label: 'CUSTOMER NAME' },
  { key: 'status', label: 'STATUS' },
  { key: 'actions', label: 'ACTIONS' },
];

const searchQuery = ref('');
const perPage = ref(10);

const pagination = reactive({
  currentPage: 1,
  totalPages: computed(() => Math.ceil(filteredComplaints.value.length / perPage.value)),
  startIndex: computed(() => (pagination.currentPage - 1) * perPage.value),
  endIndex: computed(() => Math.min(pagination.currentPage * perPage.value, filteredComplaints.value.length))
});

const filteredComplaints = computed(() => {
  if (!searchQuery.value) return complaints.value;

  const query = searchQuery.value.toLowerCase();
  return complaints.value.filter(complaint =>
    complaint.orderCode.toLowerCase().includes(query) ||
    complaint.customerName.toLowerCase().includes(query) ||
    complaint.status.toLowerCase().includes(query)
  );
});

const paginatedComplaints = computed(() => {
  return filteredComplaints.value.slice(
    pagination.startIndex,
    pagination.currentPage * perPage.value
  );
});

const visiblePages = computed(() => {
  const maxVisiblePages = 5;
  const pages = [];
  let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > pagination.totalPages) {
    endPage = pagination.totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
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

const viewComplaint = (id: string) => {
  console.log('View complaint:', id);
  // Navigate to complaint detail view in a real app
};

const editComplaint = (id: string) => {
  console.log('Edit complaint:', id);
  // Open edit modal or navigate to edit view
};

const deleteComplaint = (id: string) => {
  console.log('Delete complaint:', id);
  // Show confirmation dialog and delete in a real app
};
</script>
