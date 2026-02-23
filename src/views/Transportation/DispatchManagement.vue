<template>
  <div class="relative min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-4">
      <!-- Header -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Delivery Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Track and manage parcel deliveries</p>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">Total Parcels</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ede9fe]">
              <svg class="h-4 w-4 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </span>
          </div>
          <p class="mt-4 text-[28px] font-semibold text-[#0f172a]">24,563</p>
          <p class="mt-1 text-xs font-medium text-[#16a34a]">+12.5% vs last period</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">In Transit</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dbeafe]">
              <svg class="h-4 w-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 01-1 1h-1m-1-4h-1m4 0h1m-4 0V9m4 0v6m-4-3h.01M17 16h.01"/></svg>
            </span>
          </div>
          <p class="mt-4 text-[28px] font-semibold text-[#0f172a]">1,847</p>
          <p class="mt-1 text-xs font-medium text-[#16a34a]">+12.5% vs last period</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">Delivered Today</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dcfce7]">
              <svg class="h-4 w-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </span>
          </div>
          <p class="mt-4 text-[28px] font-semibold text-[#0f172a]">1,284</p>
          <p class="mt-1 text-xs font-medium text-[#16a34a]">+12.5% vs last period</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">Revenue</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffedd5]">
              <svg class="h-4 w-4 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </span>
          </div>
          <p class="mt-4 text-[28px] font-semibold text-[#0f172a]">₦30,500</p>
          <p class="mt-1 text-xs font-medium text-[#16a34a]">+12.5% vs last period</p>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        <div class="relative flex-1 max-w-[400px]">
          <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            v-model="search"
            placeholder="Search parcels..."
            class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
          />
        </div>
        <button class="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
          Filters
        </button>
      </div>

      <!-- Data Table -->
      <div class="rounded-xl border border-[#e5e7eb] bg-white overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr class="border-b border-[#e5e7eb] bg-[#fcfcfd] text-left text-xs font-semibold text-[#64748b]">
                <th class="px-4 py-3">Delivery ID</th>
                <th class="px-4 py-3">Route</th>
                <th class="px-4 py-3">Customer</th>
                <th class="px-4 py-3">Courier</th>
                <th class="px-4 py-3">Distance</th>
                <th class="px-4 py-3">Fee</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Payment</th>
                <th class="px-4 py-3">Date</th>
                <th class="w-12 px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in filteredRows"
                :key="row.id"
                class="cursor-pointer border-b border-[#f1f5f9] text-sm text-[#0f172a] transition-colors hover:bg-[#f8fafc]"
                @click="openDeliveryModal(row)"
              >
                <td class="px-4 py-3 font-medium text-[#334155]">{{ row.deliveryId }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.route }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.customer }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.courier }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.distance }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.fee }}</td>
                <td class="px-4 py-3">
                  <span
                    class="inline-block rounded-lg px-3 py-1 text-xs font-medium text-white"
                    :class="getStatusClass(row.status)"
                  >
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-[#334155]">{{ row.payment }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.date }}</td>
                <td class="relative px-2 py-3" @click.stop>
                  <button class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]">
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delivery Details Modal (Right Panel) -->
    <Teleport to="body">
      <div
        v-if="showDeliveryModal && selectedDelivery"
        class="fixed inset-0 z-[100] flex justify-end bg-black/40"
        @click.self="closeDeliveryModal"
      >
        <div
          class="flex h-full w-full max-w-md flex-col overflow-hidden rounded-l-xl bg-white shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-semibold text-[#0f172a]">Delivery ID {{ selectedDelivery.deliveryId }}</h2>
            <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeDeliveryModal">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto px-6 py-5">
            <!-- Key Delivery Information -->
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-sm"><span class="font-medium text-[#475569]">Customer:</span> <span class="font-semibold text-[#0f172a]">{{ getDeliveryDetail(selectedDelivery.deliveryId, 'customer') }}</span></p>
              <p class="mt-1 text-sm"><span class="font-medium text-[#475569]">Courier:</span> <span class="font-semibold text-[#0f172a]">{{ getDeliveryDetail(selectedDelivery.deliveryId, 'courier') }}</span></p>
              <div class="mt-3 flex flex-wrap gap-4">
                <div class="flex items-center gap-1.5 text-sm text-[#475569]">
                  <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                  {{ getDeliveryDetail(selectedDelivery.deliveryId, 'distance') }}
                </div>
                <div class="flex items-center gap-1.5 text-sm text-[#475569]">
                  <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {{ selectedDelivery.fee }}
                </div>
                <div class="flex items-center gap-1.5 text-sm text-[#475569]">
                  <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                  {{ selectedDelivery.payment }}
                </div>
              </div>
            </div>

            <!-- Status -->
            <div class="mt-4">
              <p class="text-xs font-medium text-[#475569]">Status</p>
              <span
                class="mt-1 inline-block rounded-lg px-3 py-1 text-xs font-medium text-white"
                :class="getStatusClass(selectedDelivery.status)"
              >
                {{ selectedDelivery.status }}
              </span>
            </div>

            <!-- Location and Contact -->
            <div class="mt-5 space-y-3">
              <div class="flex items-start gap-2">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <div>
                  <p class="text-xs font-medium text-[#475569]">Pickup</p>
                  <p class="text-sm text-[#0f172a]">{{ getDeliveryDetail(selectedDelivery.deliveryId, 'pickup') }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <div>
                  <p class="text-xs font-medium text-[#475569]">Dropoff</p>
                  <p class="text-sm text-[#0f172a]">{{ getDeliveryDetail(selectedDelivery.deliveryId, 'dropoff') }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <div>
                  <p class="text-xs font-medium text-[#475569]">Driver Phone</p>
                  <p class="text-sm text-[#0f172a]">{{ getDeliveryDetail(selectedDelivery.deliveryId, 'driverPhone') }}</p>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="mt-6">
              <p class="text-sm font-semibold text-[#0f172a]">Timeline</p>
              <div class="mt-3 space-y-2">
                <div v-for="(event, i) in getTimeline(selectedDelivery.deliveryId)" :key="i" class="flex items-center gap-3">
                  <span class="h-2 w-2 shrink-0 rounded-full bg-[#3b82f6]"></span>
                  <div>
                    <p class="text-sm text-[#0f172a]">{{ event.label }}</p>
                    <p class="text-xs text-[#64748b]">{{ event.time }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="mt-6">
              <p class="mb-2 text-sm font-semibold text-[#0f172a]">Route Map</p>
              <div class="flex min-h-[200px] items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f1f5f9]">
                <div class="text-center">
                  <svg class="mx-auto h-12 w-12 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                  <p class="mt-2 text-sm text-[#64748b]">Map view</p>
                  <p class="text-xs text-[#94a3b8]">10th St, 13th St, Civic Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';

type DeliveryRow = {
  id: string;
  deliveryId: string;
  route: string;
  customer: string;
  courier: string;
  distance: string;
  fee: string;
  status: string;
  payment: string;
  date: string;
};

const search = ref('');
const showDeliveryModal = ref(false);
const selectedDelivery = ref<DeliveryRow | null>(null);

const deliveryDetailsMap: Record<string, { customer: string; courier: string; distance: string; pickup: string; dropoff: string; driverPhone: string; timeline: { label: string; time: string }[] }> = {
  D101: { customer: 'Jane John', courier: 'Rider A', distance: '12.5 km', pickup: '12, Yaba Street, Yaba', dropoff: '45, Ajah Lane, Ajah', driverPhone: '+234 801 234 5678', timeline: [{ label: 'Order picked up', time: '10:15 AM' }, { label: 'Arrived at dropoff', time: '10:50 AM' }] },
  D102: { customer: 'Tunde A.', courier: 'Rider A', distance: '12.4 km', pickup: '12, Yaba Street, Yaba', dropoff: '45, Ajah Lane, Ajah', driverPhone: '+234 801 234 5678', timeline: [{ label: 'Order picked up', time: '10:15 AM' }, { label: 'Arrived at dropoff', time: '10:50 AM' }] },
  D103: { customer: 'Ana Ojo', courier: 'Rider C', distance: '12.5 km', pickup: 'Ikeja Central', dropoff: 'Marina Bay', driverPhone: '+234 802 345 6789', timeline: [{ label: 'Order placed', time: '09:00 AM' }, { label: 'Awaiting pickup', time: '—' }] },
};

const rows = ref<DeliveryRow[]>([
  { id: '1', deliveryId: 'D101', route: 'Yaba → Ajah', customer: 'Jane John', courier: 'Rider A', distance: '12.5 km', fee: '₦1,500', status: 'In Transit', payment: 'Wallet', date: '12 Oct' },
  { id: '2', deliveryId: 'D102', route: 'Lekki → Ikoyi', customer: 'Mike Johnson', courier: 'Rider B', distance: '12.5 km', fee: '₦1,500', status: 'Delivered', payment: 'Card', date: '12 Oct' },
  { id: '3', deliveryId: 'D103', route: 'Ikeja → Marina', customer: 'Ana Ojo', courier: 'Rider C', distance: '12.5 km', fee: '₦1,500', status: 'Pending pickup', payment: 'Wallet', date: '12 Oct' },
  { id: '4', deliveryId: 'D103', route: 'Ikeja → Marina', customer: 'Ana Ojo', courier: 'Rider C', distance: '12.5 km', fee: '₦1,500', status: 'Pending pickup', payment: 'Wallet', date: '12 Oct' },
]);

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter(
    (r) =>
      r.deliveryId.toLowerCase().includes(q) ||
      r.customer.toLowerCase().includes(q) ||
      r.courier.toLowerCase().includes(q) ||
      r.route.toLowerCase().includes(q)
  );
});

function getStatusClass(status: string) {
  switch (status) {
    case 'In Transit':
      return 'bg-[#3b82f6]';
    case 'Delivered':
      return 'bg-[#22c55e]';
    case 'Pending pickup':
      return 'bg-[#f97316]';
    default:
      return 'bg-[#64748b]';
  }
}

function getDeliveryDetail(deliveryId: string, key: string): string {
  const details = deliveryDetailsMap[deliveryId];
  if (!details) return '';
  return (details as Record<string, string>)[key] ?? '';
}

function getTimeline(deliveryId: string): { label: string; time: string }[] {
  return deliveryDetailsMap[deliveryId]?.timeline ?? [];
}

function openDeliveryModal(row: DeliveryRow) {
  selectedDelivery.value = row;
  showDeliveryModal.value = true;
}

function closeDeliveryModal() {
  showDeliveryModal.value = false;
  selectedDelivery.value = null;
}
</script>
