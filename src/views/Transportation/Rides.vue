<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-4">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Ride Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Monitor and manage all ride bookings</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div v-for="item in cards" :key="item.label" class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">{{ item.label }}</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full" :style="{ backgroundColor: item.bg }">
              <component :is="item.icon" class="h-4 w-4" :class="item.iconClass" />
            </span>
          </div>
          <p class="mt-4 text-[28px] font-semibold text-[#0f172a]">{{ item.value }}</p>
          <p class="mt-1 text-xs font-medium text-[#16a34a]">{{ item.change }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative max-w-[320px] flex-1">
          <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            v-model="search"
            placeholder="Search rides..."
            class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
          />
        </div>
        <select class="h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#475569] outline-none focus:border-[#cbd5e1]">
          <option value="">Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div class="rounded-xl border border-[#e5e7eb] bg-white overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[900px] border-collapse">
            <thead>
              <tr class="border-b border-[#e5e7eb] bg-[#fcfcfd] text-left text-xs font-semibold text-[#64748b]">
                <th class="px-4 py-3">Ride ID</th>
                <th class="px-4 py-3">User</th>
                <th class="px-4 py-3">Driver</th>
                <th class="px-4 py-3">Route</th>
                <th class="px-4 py-3">Fare</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Date</th>
                <th class="w-12 px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredRows" :key="row.id" class="border-b border-[#f1f5f9] text-sm text-[#0f172a]">
                <td class="px-4 py-3 text-[#334155]">{{ row.rideId }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.user }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <span class="text-[#334155]">{{ row.driver }}</span>
                    <span class="flex items-center gap-0.5 text-[#64748b]">
                      <svg class="h-3.5 w-3.5 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {{ row.driverRating }}
                    </span>
                  </div>
                </td>
                <td class="max-w-[200px] truncate px-4 py-3 text-[#334155]" :title="row.route">{{ row.route }}</td>
                <td class="px-4 py-3 text-[#334155]">₦{{ row.fare }}</td>
                <td class="px-4 py-3">
                  <span
                    class="inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
                    :class="getStatusClass(row.status)"
                  >
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-[#334155]">{{ row.date }}</td>
                <td class="relative px-2 py-3">
                  <button
                    class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]"
                    @click.stop="openActionId = openActionId === row.id ? null : row.id"
                  >
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div
                    v-if="openActionId === row.id"
                    class="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-lg"
                  >
                    <button
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="viewDetails(row)"
                    >
                      <IconEye class="h-3.5 w-3.5 text-[#64748b]" />
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Ride Details Modal -->
    <Teleport to="body">
      <div
        v-if="showDetailsModal && selectedRide"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeDetailsModal"
      >
        <div class="relative w-full max-w-lg rounded-xl bg-white shadow-xl" @click.stop>
          <!-- Header -->
          <div class="flex items-start justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div>
              <h2 class="text-lg font-semibold text-[#0f172a]">Ride Details - {{ selectedRide.rideId }}</h2>
              <p class="mt-1 text-sm text-[#64748b]">{{ selectedRide.date }}</p>
            </div>
            <button
              class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]"
              @click="closeDetailsModal"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="max-h-[70vh] overflow-y-auto px-6 py-4">
            <!-- Ride Booking -->
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-3">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dbeafe]">
                  <IconCar class="h-5 w-5 text-[#2563eb]" />
                </span>
                <div>
                  <p class="font-medium text-[#0f172a]">Ride Booking</p>
                  <p class="mt-1 text-sm text-[#64748b]">{{ selectedRide.bookingDateTime || selectedRide.date }}</p>
                </div>
              </div>
              <span
                class="shrink-0 rounded-full border px-3 py-1 text-xs font-medium"
                :class="getModalStatusClass(selectedRide.status)"
              >
                {{ selectedRide.status }}
              </span>
            </div>

            <!-- Passenger & Driver -->
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-medium text-[#64748b]">Passenger</p>
                <div class="mt-2 flex items-center gap-3">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9]">
                    <svg class="h-5 w-5 text-[#94a3b8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <p class="font-medium text-[#0f172a]">{{ selectedRide.user }}</p>
                    <p class="text-sm text-[#64748b]">{{ selectedRide.userPhone || '—' }}</p>
                  </div>
                </div>
              </div>
              <div>
                <p class="text-xs font-medium text-[#64748b]">Driver</p>
                <div class="mt-2 flex items-center gap-3">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9]">
                    <svg class="h-5 w-5 text-[#94a3b8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <p class="font-medium text-[#0f172a]">{{ selectedRide.driver }}</p>
                    <p class="text-sm text-[#64748b]">{{ selectedRide.driverPhone || '—' }}</p>
                    <span v-if="selectedRide.vehicleType" class="mt-1 inline-block rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-xs text-[#64748b]">{{ selectedRide.vehicleType }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Route Details -->
            <div class="mt-6">
              <p class="text-xs font-medium text-[#64748b]">Route Details</p>
              <div class="mt-3 space-y-3">
                <div class="flex items-start gap-3">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#16a34a]">
                    <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  </span>
                  <div>
                    <p class="text-xs text-[#64748b]">Pickup</p>
                    <p class="text-sm font-medium text-[#0f172a]">{{ selectedRide.pickup || selectedRide.route.split(' → ')[0] || selectedRide.route }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dc2626]">
                    <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  </span>
                  <div>
                    <p class="text-xs text-[#64748b]">Destination</p>
                    <p class="text-sm font-medium text-[#0f172a]">{{ selectedRide.destination || selectedRide.route.split(' → ')[1] || selectedRide.route }}</p>
                  </div>
                </div>
                <div v-if="selectedRide.distance" class="flex items-center gap-4 pt-1 text-sm text-[#94a3b8]">
                  <span class="flex items-center gap-1.5">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    {{ selectedRide.distance }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {{ selectedRide.distance }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="mt-6 flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
              <div>
                <p class="text-xs text-[#64748b]">Total Amount</p>
                <p class="text-lg font-semibold text-[#0f172a]">₦{{ selectedRide.fare }}</p>
              </div>
              <span class="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-medium text-[#16a34a]">{{ selectedRide.paymentStatus || 'Paid' }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <template v-if="selectedRide.status === 'Pending' || selectedRide.status === 'In Progress'">
              <button
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                @click="closeDetailsModal"
              >
                Reassign Driver
              </button>
              <button
                class="rounded-lg bg-[#dc2626] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#b91c1c]"
                @click="closeDetailsModal"
              >
                Cancel Ride
              </button>
            </template>
            <template v-else>
              <button
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                @click="closeDetailsModal"
              >
                Cancel
              </button>
              <button
                class="rounded-lg bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]"
                @click="closeDetailsModal"
              >
                Issue Refund
              </button>
            </template>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconSend from '@/components/icon/icon-send.vue';
import IconSquareCheck from '@/components/icon/icon-square-check.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconCar from '@/components/icon/icon-car.vue';

type RideRow = {
  id: string;
  rideId: string;
  user: string;
  driver: string;
  driverRating: string;
  route: string;
  pickup?: string;
  destination?: string;
  fare: string;
  status: string;
  date: string;
  userPhone?: string;
  driverPhone?: string;
  vehicleType?: string;
  bookingDateTime?: string;
  paymentStatus?: string;
  distance?: string;
};

const cards = [
  { label: 'Total Rides', value: '24,563', change: '+12.5% vs last period', icon: IconUsers, iconClass: 'text-[#2563eb]', bg: '#dbeafe' },
  { label: 'Active Rides', value: '1,847', change: '+10.5% vs last period', icon: IconSend, iconClass: 'text-[#16a34a]', bg: '#dcfce7' },
  { label: 'Completed Today', value: '1,284', change: '+5% vs last period', icon: IconSquareCheck, iconClass: 'text-[#8b5cf6]', bg: '#ede9fe' },
  { label: 'Revenue', value: '₦30,500', change: '+12.5% vs last period', icon: IconDollarSign, iconClass: 'text-[#ea580c]', bg: '#ffedd5' },
];

const search = ref('');
const openActionId = ref<string | null>(null);
const showDetailsModal = ref(false);
const selectedRide = ref<RideRow | null>(null);

const rows = ref<RideRow[]>([
  { id: '1', rideId: 'RD001', user: 'John Smith', driver: 'Mike Johnson', driverRating: '4.8', route: '123 Main St, Downtown → 456 Oak Ave, Uptown', pickup: '123 Main St, Downtown', destination: '456 Oak Ave, Uptown', fare: '125,000', status: 'Completed', date: '2024-01-15 09:30', userPhone: '+1 234-567-8901', driverPhone: '+1 234-567-8902', vehicleType: 'Sedan', bookingDateTime: 'Apr 10, 2024 at 10:30 AM', paymentStatus: 'Paid', distance: '8.5 km' },
  { id: '2', rideId: 'RD001', user: 'John Smith', driver: 'Mike Johnson', driverRating: '4.8', route: '123 Main St, Downtown → 456 Oak Ave, Uptown', pickup: '123 Main St, Downtown', destination: '456 Oak Ave, Uptown', fare: '125,000', status: 'In Progress', date: '2024-01-15 09:30', userPhone: '+1 234-567-8901', driverPhone: '+1 234-567-8902', vehicleType: 'Sedan', bookingDateTime: 'Apr 10, 2024 at 10:30 AM', paymentStatus: 'Paid', distance: '8.5 km' },
  { id: '3', rideId: 'RD001', user: 'John Smith', driver: 'Mike Johnson', driverRating: '4.8', route: '123 Main St, Downtown → 456 Oak Ave, Uptown', pickup: '123 Main St, Downtown', destination: '456 Oak Ave, Uptown', fare: '125,000', status: 'Pending', date: '2024-01-15 09:30', userPhone: '+1 234-567-8901', driverPhone: '+1 234-567-8902', vehicleType: 'Sedan', bookingDateTime: 'Apr 10, 2024 at 10:30 AM', paymentStatus: 'Paid', distance: '8.5 km' },
  { id: '4', rideId: 'RD001', user: 'John Smith', driver: 'Mike Johnson', driverRating: '4.8', route: '123 Main St, Downtown → 456 Oak Ave, Uptown', pickup: '123 Main St, Downtown', destination: '456 Oak Ave, Uptown', fare: '125,000', status: 'Cancelled', date: '2024-01-15 09:30', userPhone: '+1 234-567-8901', driverPhone: '+1 234-567-8902', vehicleType: 'Sedan', bookingDateTime: 'Apr 10, 2024 at 10:30 AM', paymentStatus: 'Paid', distance: '8.5 km' },
]);

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter(
    (r) =>
      r.rideId.toLowerCase().includes(q) ||
      r.user.toLowerCase().includes(q) ||
      r.driver.toLowerCase().includes(q)
  );
});

function getStatusClass(status: string) {
  switch (status) {
    case 'Completed':
      return 'bg-[#16a34a]';
    case 'In Progress':
      return 'bg-[#2563eb]';
    case 'Pending':
      return 'bg-[#ca8a04]';
    case 'Cancelled':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#64748b]';
  }
}

function viewDetails(row: RideRow) {
  openActionId.value = null;
  selectedRide.value = row;
  showDetailsModal.value = true;
}

function closeDetailsModal() {
  showDetailsModal.value = false;
  selectedRide.value = null;
}

function getModalStatusClass(status: string) {
  switch (status) {
    case 'Completed':
      return 'bg-[#dcfce7] text-[#16a34a] border-[#16a34a]/30';
    case 'In Progress':
      return 'bg-[#dbeafe] text-[#2563eb] border-[#2563eb]/30';
    case 'Pending':
      return 'bg-[#fef3c7] text-[#ca8a04] border-[#ca8a04]/30';
    case 'Cancelled':
      return 'bg-[#fee2e2] text-[#dc2626] border-[#dc2626]/30';
    default:
      return 'bg-[#f1f5f9] text-[#64748b] border-[#94a3b8]/30';
  }
}
</script>
