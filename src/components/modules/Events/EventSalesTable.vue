<template>
  <div class=" max-w-full">
    <div class="bg-white p-6 rounded-xl shadow-md">
      <h1 class="text-2xl font-semibold text-gray-700 mb-4">Event Sales Reports</h1>

      <!-- Select Event -->
      <div class="mb-4">
        <label class="block text-sm text-gray-600 mb-1">Select Event</label>
        <select
          v-model="selectedEvent"
          class="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="all">All Events</option>
          <option v-for="event in events" :key="event" :value="event">{{ event }}</option>
        </select>
      </div>

      <!-- Export CSV Button -->
      <div class="text-center text-gray-400 mb-4 text-sm font-medium">
        Export Sales Report CSV
      </div>

      <!-- Table Controls -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-2 text-sm text-gray-600 gap-2">
        <div class="flex items-center space-x-2">
          <label>Show</label>
          <select v-model="entriesToShow" class="border border-gray-300 rounded px-2 py-1">
            <option>5</option>
            <option>10</option>
            <option>25</option>
          </select>
          <span>entries</span>
        </div>

        <div>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-[900px] w-full table-auto text-sm text-left border border-gray-200">
          <thead class="bg-gray-100 text-gray-600">
            <tr>
              <th class="px-3 py-2 font-medium">Order Number</th>
              <th class="px-3 py-2 font-medium">Event</th>
              <th class="px-3 py-2 font-medium">Timing</th>
              <th class="px-3 py-2 font-medium">Customer</th>
              <th class="px-3 py-2 font-medium">Booking Date</th>
              <th class="px-3 py-2 font-medium">Checked In</th>
              <th class="px-3 py-2 font-medium">Ticket</th>
              <th class="px-3 py-2 font-medium">Order Total</th>
              <th class="px-3 py-2 font-medium">Organiser</th>
              <th class="px-3 py-2 font-medium">Organiser Earning</th>
              <th class="px-3 py-2 font-medium">Admin Commission</th>
              <th class="px-3 py-2 font-medium">Admin Tax</th>
              <th class="px-3 py-2 font-medium">Payout</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in paginatedData" :key="index" class="border-t">
              <td class="px-3 py-2 font-medium text-gray-700">{{ row.orderNumber }}</td>
              <td class="px-3 py-2">{{ row.event }}</td>
              <td class="px-3 py-2">{{ row.timing }}</td>
              <td class="px-3 py-2">
                {{ row.customer.name }}<br />
                <span class="text-xs text-gray-500">({{ row.customer.email }})</span>
              </td>
              <td class="px-3 py-2">{{ row.bookingDate }}</td>
              <td class="px-3 py-2">{{ row.checkedIn }}</td>
              <td class="px-3 py-2">{{ row.ticket }}</td>
              <td class="px-3 py-2">{{ row.orderTotal }}</td>
              <td class="px-3 py-2">
                {{ row.organiser.name }}<br />
                <span class="text-xs text-gray-500">({{ row.organiser.email }})</span>
              </td>
              <td class="px-3 py-2">{{ row.earning }}</td>
              <td class="px-3 py-2">{{ row.commission }}</td>
              <td class="px-3 py-2">{{ row.tax }}</td>
              <td class="px-3 py-2">{{ row.payout }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-between items-center mt-4 text-sm">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const selectedEvent = ref('all')
const entriesToShow = ref(5)
const currentPage = ref(1)

const events = ['World Health Day', 'Product Marketing Workshop']

const allData = [
  {
    orderNumber: '1701253042624',
    event: 'World Health Day',
    timing: '2025-04-07 - 2025-04-07',
    customer: {
      name: 'David lane',
      email: 'davidlane@mail.com',
    },
    bookingDate: '29 Nov 2025',
    checkedIn: 'No',
    ticket: '0.00 USD (Free ✖ 1)',
    orderTotal: '0.00 USD',
    organiser: {
      name: 'Katie Stone',
      email: 'katiestone@mail.com',
    },
    earning: '0 USD',
    commission: '0 USD',
    tax: '0 USD',
    payout: 'Transferred',
  },
  {
    orderNumber: '1573309109877',
    event: 'Product Marketing Workshop',
    timing: '2025-12-09 - 2025-12-09',
    customer: {
      name: 'Cora Woods',
      email: 'corawoods@mail.com',
    },
    bookingDate: '09 Nov 2025',
    checkedIn: 'No',
    ticket: '10.00 USD (Early Bird ✖ 2)',
    orderTotal: '21.00 USD',
    organiser: {
      name: 'Josh Grey',
      email: 'joshgrey@mail.com',
    },
    earning: '19.95 USD',
    commission: '1.05 USD',
    tax: '0.00 USD',
    payout: 'Transferred',
  },
  {
    orderNumber: '1573309109877',
    event: 'Product Marketing Workshop',
    timing: '2025-12-09 - 2025-12-09',
    customer: {
      name: 'Cora Woods',
      email: 'corawoods@mail.com',
    },
    bookingDate: '09 Nov 2025',
    checkedIn: 'No',
    ticket: '50.00 USD (VIP ✖ 2)',
    orderTotal: '112.50 USD',
    organiser: {
      name: 'Josh Grey',
      email: 'joshgrey@mail.com',
    },
    earning: '106.88 USD',
    commission: '5.62 USD',
    tax: '0.00 USD',
    payout: 'Transferred',
  },
  // Add more dummy data if needed to test pagination
]

const filteredData = computed(() =>
  selectedEvent.value === 'all'
    ? allData
    : allData.filter((item) => item.event === selectedEvent.value)
)

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / entriesToShow.value)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * entriesToShow.value
  return filteredData.value.slice(start, start + entriesToShow.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>
