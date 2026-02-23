<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-4">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Bookings Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Track and manage all service bookings</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div v-for="item in cards" :key="item.label" class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p class="text-xs text-[#64748b]">{{ item.label }}</p>
          <p class="mt-4 text-[28px] font-semibold text-[#0f172a]">{{ item.value }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative max-w-[360px] flex-1">
          <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            v-model="search"
            placeholder="Search booking ID, user, driver..."
            class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
          />
        </div>
        <select class="h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#475569] outline-none focus:border-[#cbd5e1]">
          <option value="">Service</option>
          <option value="rider">Rider</option>
          <option value="parcel">Parcel</option>
          <option value="vehicle">Vehicle</option>
          <option value="bus">Bus</option>
        </select>
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
                <th class="px-4 py-3">Booking ID</th>
                <th class="px-4 py-3">Service</th>
                <th class="px-4 py-3">User</th>
                <th class="px-4 py-3">Driver</th>
                <th class="px-4 py-3">Route</th>
                <th class="px-4 py-3">Amount</th>
                <th class="px-4 py-3">Status</th>
                <th class="w-12 px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredRows" :key="row.id" class="border-b border-[#f1f5f9] text-sm text-[#0f172a]">
                <td class="px-4 py-3 text-[#334155]">{{ row.bookingId }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <span
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      :style="{ backgroundColor: row.serviceBg }"
                    >
                      <!-- Rider: car -->
                      <IconCar v-if="row.service === 'rider'" class="h-4 w-4" :class="row.serviceIconClass" />
                      <!-- Parcel: box -->
                      <IconBox v-else-if="row.service === 'parcel'" class="h-4 w-4" :class="row.serviceIconClass" />
                      <!-- Vehicle: car outline -->
                      <IconCar v-else-if="row.service === 'vehicle'" class="h-4 w-4" :class="row.serviceIconClass" />
                      <!-- Bus: Font Awesome bus-solid -->
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-4 w-4 shrink-0" :class="row.serviceIconClass" fill="currentColor"><path d="M256 0C390.4 0 480 35.2 480 80V384c0 35.2-89.6 80-224 80S32 419.2 32 384V80C32 35.2 121.6 0 256 0zM128 400a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm256 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm96-176c0-17.7-57.3-48-96-48s-96 30.3-96 48 57.3 48 96 48 96-30.3 96-48zM96 176c0-17.7 57.3-48 96-48s96 30.3 96 48-57.3 48-96 48-96-30.3-96-48z"/></svg>
                    </span>
                    <span class="font-medium" :class="row.serviceIconClass">{{ getServiceLabel(row.service) }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-[#334155]">{{ row.user }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.driver }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.route }}</td>
                <td class="px-4 py-3 text-[#334155]">₦{{ row.amount }}</td>
                <td class="px-4 py-3">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-medium"
                    :class="getStatusClass(row.status)"
                  >
                    {{ row.status }}
                  </span>
                </td>
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

    <!-- Booking Details Modal -->
    <div
      v-if="showDetailsModal && selectedBooking"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
      @click="closeDetailsModal"
    >
      <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl" @click.stop>
        <div class="flex items-start justify-between border-b border-[#e5e7eb] p-5">
          <div>
            <h3 class="text-lg font-semibold text-[#0f172a]">Booking Details</h3>
            <p class="mt-0.5 text-sm text-[#64748b]">Full details for booking B{{ selectedBooking.bookingId }}</p>
          </div>
          <button class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]" @click="closeDetailsModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div class="space-y-5 p-5">
          <!-- Booking Type & Status -->
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3">
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                :style="{ backgroundColor: selectedBooking.serviceBg }"
              >
                <IconCar v-if="selectedBooking.service === 'rider'" class="h-5 w-5" :class="selectedBooking.serviceIconClass" />
                <IconBox v-else-if="selectedBooking.service === 'parcel'" class="h-5 w-5" :class="selectedBooking.serviceIconClass" />
                <IconCar v-else-if="selectedBooking.service === 'vehicle'" class="h-5 w-5" :class="selectedBooking.serviceIconClass" />
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 shrink-0" :class="selectedBooking.serviceIconClass" fill="currentColor"><path d="M256 0C390.4 0 480 35.2 480 80V384c0 35.2-89.6 80-224 80S32 419.2 32 384V80C32 35.2 121.6 0 256 0zM128 400a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm256 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm96-176c0-17.7-57.3-48-96-48s-96 30.3-96 48 57.3 48 96 48 96-30.3 96-48zM96 176c0-17.7 57.3-48 96-48s96 30.3 96 48-57.3 48-96 48-96-30.3-96-48z"/></svg>
              </span>
              <div>
                <p class="font-semibold text-[#0f172a]">{{ getBookingTypeLabel(selectedBooking.service) }}</p>
                <p class="mt-0.5 text-sm text-[#64748b]">{{ selectedBooking.dateTime }}</p>
              </div>
            </div>
            <span
              class="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
              :class="getStatusClass(selectedBooking.status)"
            >
              {{ selectedBooking.status }}
            </span>
          </div>

          <!-- Route -->
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
                <svg class="h-4 w-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <div>
                <p class="text-xs text-[#64748b]">Pickup</p>
                <p class="text-sm font-medium text-[#0f172a]">{{ selectedBooking.pickup }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fee2e2]">
                <svg class="h-4 w-4 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <div>
                <p class="text-xs text-[#64748b]">Destination</p>
                <p class="text-sm font-medium text-[#0f172a]">{{ selectedBooking.destination }}</p>
              </div>
            </div>
          </div>

          <!-- User & Driver -->
          <div class="flex gap-6">
            <div class="flex items-center gap-3">
              <img
                :src="`https://i.pravatar.cc/48?u=${selectedBooking.user}`"
                :alt="selectedBooking.user"
                class="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p class="text-sm font-semibold text-[#0f172a]">{{ selectedBooking.user }}</p>
                <p class="text-xs text-[#64748b]">Customer</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <img
                :src="`https://i.pravatar.cc/48?u=${selectedBooking.driver}`"
                :alt="selectedBooking.driver"
                class="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p class="text-sm font-semibold text-[#0f172a]">{{ selectedBooking.driver }}</p>
                <p class="text-xs text-[#64748b]">Driver</p>
              </div>
            </div>
          </div>

          <!-- Payment -->
          <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <div>
              <p class="text-xs text-[#64748b]">Payment</p>
              <p class="mt-0.5 text-base font-semibold text-[#0f172a]">Total Amount</p>
              <p class="mt-0.5 text-lg font-semibold text-[#0f172a]">₦{{ selectedBooking.amount }}</p>
            </div>
            <span class="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-medium text-[#16a34a]">
              {{ selectedBooking.paymentStatus || 'Paid' }}
            </span>
          </div>

          <!-- Action buttons (Pending only) -->
          <div v-if="selectedBooking.status === 'Pending'" class="flex gap-3 pt-2">
            <button class="flex-1 rounded-md border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]" @click="openReassignModal">
              Reassign Driver
            </button>
            <button class="flex-1 rounded-md bg-[#dc2626] px-4 py-2 text-sm font-medium text-white hover:bg-[#b91c1c]">
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reassign Driver Modal -->
    <div
      v-if="showReassignModal && selectedBooking"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 px-4"
      @click="closeReassignModal"
    >
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl" @click.stop>
        <div class="flex items-start justify-between border-b border-[#e5e7eb] p-5">
          <div>
            <h3 class="text-lg font-semibold text-[#0f172a]">Reassign Driver</h3>
            <p class="mt-0.5 text-sm text-[#64748b]">Select a new driver for booking {{ selectedBooking.bookingId }}</p>
          </div>
          <button class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]" @click="closeReassignModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div class="space-y-4 p-5">
          <!-- Current Driver -->
          <div>
            <p class="mb-2 text-xs font-medium text-[#64748b]">Current Driver</p>
            <div class="flex items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-3">
              <img
                :src="`https://i.pravatar.cc/48?u=${selectedBooking.driver}`"
                :alt="selectedBooking.driver"
                class="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p class="text-sm font-semibold text-[#0f172a]">{{ selectedBooking.driver }}</p>
                <p class="text-xs text-[#64748b]">{{ selectedBooking.pickup }} → {{ selectedBooking.destination }}</p>
              </div>
            </div>
          </div>

          <!-- Search -->
          <div class="relative">
            <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
            <input
              v-model="reassignDriverSearch"
              type="text"
              placeholder="Search booking ID, user, driver..."
              class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
            />
          </div>

          <!-- Driver List -->
          <div class="max-h-48 space-y-2 overflow-y-auto">
            <button
              v-for="d in filteredReassignDrivers"
              :key="d.id"
              type="button"
              class="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition"
              :class="
                d.status === 'Busy'
                  ? 'cursor-not-allowed border-[#e5e7eb] bg-[#f8fafc] opacity-60'
                  : selectedNewDriver?.id === d.id
                    ? 'border-[#0f172a] bg-[#f8fafc]'
                    : 'border-[#e5e7eb] bg-white hover:bg-[#f8fafc]'
              "
              :disabled="d.status === 'Busy'"
              @click="d.status !== 'Busy' && (selectedNewDriver = d)"
            >
              <img :src="`https://i.pravatar.cc/48?u=${d.name}`" :alt="d.name" class="h-10 w-10 rounded-full object-cover" />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-[#0f172a]">{{ d.name }}</p>
                <p class="text-xs text-[#64748b]">{{ d.vehicle }} · ★ {{ d.rating }} · {{ d.trips }} trips</p>
              </div>
              <span
                class="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
                :class="d.status === 'Available' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fef9c3] text-[#ca8a04]'"
              >
                {{ d.status }}
              </span>
            </button>
          </div>

          <!-- New Driver Selected -->
          <div v-if="selectedNewDriver" class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-3">
            <p class="mb-2 text-xs font-medium text-[#64748b]">New Driver</p>
            <div class="flex items-center gap-3">
              <img
                :src="`https://i.pravatar.cc/48?u=${selectedNewDriver.name}`"
                :alt="selectedNewDriver.name"
                class="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p class="text-sm font-semibold text-[#0f172a]">{{ selectedNewDriver.name }}</p>
                <p class="text-xs text-[#64748b]">{{ selectedNewDriver.vehicle }} · ★ {{ selectedNewDriver.rating }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 border-t border-[#e5e7eb] pt-4">
            <button
              type="button"
              class="flex-1 rounded-md border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeReassignModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="flex-1 rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="!selectedNewDriver"
              @click="confirmReassign"
            >
              Reassign to {{ selectedNewDriver?.name || 'Driver' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconBox from '@/components/icon/icon-box.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';

type BookingRow = {
  id: string;
  bookingId: string;
  service: 'rider' | 'parcel' | 'vehicle' | 'bus';
  serviceBg: string;
  serviceIconClass: string;
  user: string;
  driver: string;
  route: string;
  pickup: string;
  destination: string;
  amount: string;
  status: string;
  dateTime: string;
  paymentStatus?: string;
};

const cards = [
  { label: 'Total Today', value: '1,284' },
  { label: 'In Progress', value: '342' },
  { label: 'Completed', value: '892' },
  { label: 'Cancelled', value: '23' },
];

const search = ref('');
const openActionId = ref<string | null>(null);
const showDetailsModal = ref(false);
const showReassignModal = ref(false);
const selectedBooking = ref<BookingRow | null>(null);
const reassignDriverSearch = ref('');
const selectedNewDriver = ref<{ id: string; name: string; vehicle: string; rating: string; trips: number; status: string } | null>(null);

type DriverOption = { id: string; name: string; vehicle: string; rating: string; trips: number; status: string };
const availableDrivers = ref<DriverOption[]>([
  { id: 'd1', name: 'Maria Garcia', vehicle: 'Honda Accord', rating: '4.9', trips: 1234, status: 'Available' },
  { id: 'd2', name: 'Maria Garcia', vehicle: 'Toyota Camry', rating: '4.8', trips: 987, status: 'Busy' },
  { id: 'd3', name: 'Maria Garcia', vehicle: 'Honda Accord', rating: '4.9', trips: 1234, status: 'Available' },
  { id: 'd4', name: 'John Smith', vehicle: 'Ford Focus', rating: '4.7', trips: 756, status: 'Available' },
]);

const filteredReassignDrivers = computed(() => {
  const q = reassignDriverSearch.value.trim().toLowerCase();
  if (!q) return availableDrivers.value;
  return availableDrivers.value.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.vehicle.toLowerCase().includes(q)
  );
});

const rows = ref<BookingRow[]>([
  { id: '1', bookingId: '82847', service: 'rider', serviceBg: '#dbeafe', serviceIconClass: 'text-[#2563eb]', user: 'Sarah Johnson', driver: 'John Smith', route: 'Downtown Station - Airport Terminal 2', pickup: 'Downtown Station', destination: 'Airport Terminal 2', amount: '125,000', status: 'Completed', dateTime: 'Apr 10, 2024 at 10:30 AM', paymentStatus: 'Paid' },
  { id: '2', bookingId: '82847', service: 'parcel', serviceBg: '#ede9fe', serviceIconClass: 'text-[#8b5cf6]', user: 'Sarah Johnson', driver: 'John Smith', route: 'Downtown Station - Airport Terminal 2', pickup: 'Downtown Station', destination: 'Airport Terminal 2', amount: '125,000', status: 'In Progress', dateTime: 'Apr 10, 2024 at 11:35 AM', paymentStatus: 'Paid' },
  { id: '3', bookingId: '82847', service: 'bus', serviceBg: '#dcfce7', serviceIconClass: 'text-[#16a34a]', user: 'Sarah Johnson', driver: 'John Smith', route: 'Downtown Station - Airport Terminal 2', pickup: 'Downtown Station', destination: 'Airport Terminal 2', amount: '125,000', status: 'Pending', dateTime: 'Apr 10, 2024 at 09:45 AM', paymentStatus: 'Paid' },
  { id: '4', bookingId: '82847', service: 'rider', serviceBg: '#dbeafe', serviceIconClass: 'text-[#2563eb]', user: 'Sarah Johnson', driver: 'John Smith', route: 'Downtown Station - Airport Terminal 2', pickup: 'Downtown Station', destination: 'Airport Terminal 2', amount: '125,000', status: 'Cancelled', dateTime: 'Apr 10, 2024 at 10:30 AM', paymentStatus: 'Paid' },
]);

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter(
    (r) =>
      r.bookingId.toLowerCase().includes(q) ||
      r.user.toLowerCase().includes(q) ||
      r.driver.toLowerCase().includes(q)
  );
});

function getStatusClass(status: string) {
  switch (status) {
    case 'Completed':
      return 'bg-[#dcfce7] text-[#16a34a]';
    case 'In Progress':
      return 'bg-[#dbeafe] text-[#2563eb]';
    case 'Pending':
      return 'bg-[#fef9c3] text-[#ca8a04]';
    case 'Cancelled':
      return 'bg-[#fee2e2] text-[#dc2626]';
    default:
      return 'bg-[#f1f5f9] text-[#64748b]';
  }
}

function getServiceLabel(service: string) {
  const map: Record<string, string> = { rider: 'Rider', parcel: 'Parcel', vehicle: 'Vehicle', bus: 'Bus' };
  return map[service] ?? service;
}

function getBookingTypeLabel(service: string) {
  const map: Record<string, string> = { rider: 'Ride Booking', parcel: 'Parcel Booking', vehicle: 'Vehicle Booking', bus: 'Bus Booking' };
  return map[service] ?? service + ' Booking';
}

function viewDetails(row: BookingRow) {
  openActionId.value = null;
  selectedBooking.value = row;
  showDetailsModal.value = true;
}

function closeDetailsModal() {
  showDetailsModal.value = false;
  selectedBooking.value = null;
}

function openReassignModal() {
  reassignDriverSearch.value = '';
  selectedNewDriver.value = null;
  showReassignModal.value = true;
}

function closeReassignModal() {
  showReassignModal.value = false;
  reassignDriverSearch.value = '';
  selectedNewDriver.value = null;
}

function confirmReassign() {
  if (!selectedBooking.value || !selectedNewDriver.value) return;
  selectedBooking.value.driver = selectedNewDriver.value.name;
  closeReassignModal();
}
</script>
