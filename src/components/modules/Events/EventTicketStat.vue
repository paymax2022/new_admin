<template>
  <div class="bg-white p-4 rounded-lg w-full">
    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Event Tickets Statistics</h2>

    <div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <select class="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-auto">
        <option>all Events</option>
        <option>Caribbean Karaoke Nights</option>
        <option>Daily Meditation Classes</option>
        <option>Digital Marketing Seminar</option>
      </select>

      <div class="flex items-center gap-2 text-sm">
        <label for="entries">Show</label>
        <select id="entries" v-model="perPage" class="border border-gray-300 rounded px-2 py-1">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <div class="overflow-x-auto w-full">
      <table class="min-w-[600px] w-full border border-gray-200 text-sm text-left">
        <thead class="bg-gray-100 text-gray-600">
          <tr>
            <th class="px-4 py-2">Event</th>
            <th class="px-4 py-2">Ticket</th>
            <th class="px-4 py-2">Quantity</th>
            <th class="px-4 py-2">Order Total</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(event, index) in paginatedEvents" :key="index">
            <tr>
              <td colspan="4" class="bg-blue-100 text-blue-700 font-semibold px-4 py-2">
                {{ event.name }}
              </td>
            </tr>
            <tr v-for="(ticket, tIndex) in event.tickets" :key="tIndex" class="border-t">
              <td class="px-4 py-2">{{ event.name }}</td>
              <td class="px-4 py-2">{{ ticket.type }}</td>
              <td class="px-4 py-2">
                <span class="inline-block  text-blue-600 text-xs font-medium rounded-full px-2 py-0.5">
                  {{ ticket.quantity }}
                </span>
              </td>
              <td class="px-4 py-2">
                <span class="text-blue-600 font-medium">
                  {{ formatCurrency(ticket.total) }}
                </span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex justify-center items-center gap-2 text-sm">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const perPage = ref(10)
const currentPage = ref(1)

const events = ref([
  {
    name: 'Caribbean Karaoke Nights',
    tickets: [
      { type: 'Free', quantity: 36, total: 0 },
      { type: 'Early Bird', quantity: 8, total: 94.5 },
      { type: 'Regular', quantity: 29, total: 781.2 },
      { type: 'VIP', quantity: 22, total: 1912.5 },
    ]
  },
  {
    name: 'Daily Meditation Classes',
    tickets: [
      { type: 'Free', quantity: 79, total: 0 },
      { type: 'Early Bird', quantity: 24, total: 321.6 },
      { type: 'Regular', quantity: 67, total: 1975.7 },
      { type: 'VIP', quantity: 47, total: 4849.5 },
    ]
  },
  {
    name: 'Digital Marketing Seminar',
    tickets: [
      { type: 'Free', quantity: 2, total: 5.15 },
      { type: 'Early Bird', quantity: 1, total: 41.2 },
    ]
  }
])

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1)
  return events.value.slice(start * perPage.value, start * perPage.value + perPage.value)
})

const totalPages = computed(() => Math.ceil(events.value.length / perPage.value))

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const formatCurrency = (value) => {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style scoped>
/* Optional: smoother pagination UX */
button:disabled {
  cursor: not-allowed;
}
</style>
