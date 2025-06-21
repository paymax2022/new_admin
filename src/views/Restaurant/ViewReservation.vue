<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Restaurant Header -->
    <div class="p-4">
      <h1 class="text-xl font-bold">Sultan's Dine</h1>
    </div>

    <!-- Reservation Details -->
    <div class="p-4 md:p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Name & Email -->
            <tr>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 w-1/4">Name</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ reservation.customerName }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 w-1/4">Email</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ reservation.email }}</td>
            </tr>

            <!-- Phone & Date/Time -->
            <tr>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Phone</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ reservation.phone }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Date & Time</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ formatDateTime(reservation.dateTime) }}</td>
            </tr>

            <!-- Time Slot & Table -->
            <tr>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Time Slot</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ reservation.timeSlot }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Table</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ reservation.table }}</td>
            </tr>

            <!-- Guest & Status -->
            <tr>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Guest</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ reservation.guestCount }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Status</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                <select
                  v-model="reservation.status"
                  @change="updateStatus"
                  :class="statusClasses(reservation.status)"
                  class="text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Seated">Seated</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex flex-wrap gap-3 justify-end">
        <button
          @click="confirmReservation"
          class="px-4 py-2 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700"
        >
          Confirm
        </button>
        <button
          @click="cancelReservation"
          class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
        >
          Cancel
        </button>
        <button
          @click="editReservation"
          class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Reservation {
  customerName: string;
  email: string;
  phone: string;
  dateTime: Date;
  timeSlot: string;
  table: string;
  guestCount: number;
  status: 'Pending' | 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';
}

const reservation = ref<Reservation>({
  customerName: 'Customer Smith',
  email: 'customer@example.com',
  phone: '880532132132',
  dateTime: new Date('2025-05-18T13:16:00'),
  timeSlot: '12:00 PM-02:00 PM',
  table: 'Table 1',
  guestCount: 2,
  status: 'Pending'
});

const formatDateTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleString('en-US', options);
};

const statusClasses = (status: string): string => {
  const base = 'px-2 py-1 border border-transparent';
  switch (status) {
    case 'Pending':
      return `${base} bg-yellow-100 text-yellow-800`;
    case 'Confirmed':
      return `${base} bg-blue-100 text-blue-800`;
    case 'Seated':
      return `${base} bg-purple-100 text-purple-800`;
    case 'Completed':
      return `${base} bg-green-100 text-green-800`;
    case 'Cancelled':
      return `${base} bg-red-100 text-red-800`;
    default:
      return `${base} bg-gray-100 text-gray-800`;
  }
};

const updateStatus = () => {
  console.log('Status updated to:', reservation.value.status);
};

const confirmReservation = () => {
  reservation.value.status = 'Confirmed';
  updateStatus();
};

const cancelReservation = () => {
  reservation.value.status = 'Cancelled';
  updateStatus();
};

const editReservation = () => {
  console.log('Edit reservation:', reservation.value);
};
</script>

