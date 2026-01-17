<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Deliveries Management</h1>
      <p class="text-sm text-[#6b7280]">Track and manage all delivery orders</p>
    </div>

    <!-- All Deliveries Section -->
    <div class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <!-- Section Header with Filters -->
      <div class="px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
        <h2 class="text-lg font-semibold text-[#111827]">All Deliveries</h2>
        <div class="flex items-center gap-3">
          <!-- All Status Filter -->
          <div class="relative">
            <select
              v-model="statusFilter"
              class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          </div>

          <!-- All Couriers Filter -->
          <div class="relative">
            <select
              v-model="courierFilter"
              class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="">All Couriers</option>
              <option value="Rider A">Rider A</option>
              <option value="Rider B">Rider B</option>
              <option value="Rider C">Rider C</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          </div>

          <!-- Today Filter -->
          <div class="relative">
            <select
              v-model="dateFilter"
              class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e5e7eb]">
          <thead class="bg-[#f9fafb]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Delivery ID</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Route</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Courier</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Distance</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Fee</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Payment</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-[#e5e7eb]">
            <tr
              v-for="(delivery, index) in paginatedDeliveries"
              :key="delivery.id"
              :class="[
                'hover:bg-[#f9fafb] transition-colors cursor-pointer',
                index === 0 ? 'bg-[#f3f4f6]' : ''
              ]"
              @click="openDeliveryModal(delivery)"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ delivery.deliveryId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ delivery.route }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ delivery.customer }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ delivery.courier }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ delivery.distance }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ delivery.fee }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(delivery.status)">
                  {{ delivery.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ delivery.payment }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ delivery.date }}</td>
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
          <span v-if="showEndEllipsis" class="px-2 text-[#374151]">...</span>

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

    <!-- Delivery Details Modal (Slide-in from right) -->
    <TransitionRoot appear :show="showDeliveryModal" as="template">
      <Dialog as="div" @close="closeDeliveryModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/40"></div>
        </TransitionChild>

        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden bg-white shadow-xl transition-all rounded-tl-2xl">
                <div class="flex flex-col h-screen">
                  <!-- Header -->
                  <div class="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb] bg-white">
                    <DialogTitle class="text-xl font-semibold text-[#111827]">
                      Delivery ID {{ selectedDelivery?.deliveryId }}
                    </DialogTitle>
                    <button
                      @click="closeDeliveryModal"
                      class="text-[#6b7280] hover:text-[#111827] transition-colors p-1 rounded-lg hover:bg-[#f3f4f6]"
                    >
                      <IconX class="h-5 w-5" />
                    </button>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <!-- Customer & Courier -->
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm font-medium text-[#6b7280] mb-2">Customer</p>
                        <p class="text-base font-semibold text-[#111827]">{{ selectedDelivery?.customer }}</p>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-[#6b7280] mb-2">Courier</p>
                        <div class="flex items-center gap-3">
                          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb] text-white font-semibold text-sm">
                            P
                          </div>
                          <p class="text-base font-semibold text-[#111827]">{{ selectedDelivery?.courier }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Summary Details -->
                    <div class="grid grid-cols-3 gap-4">
                      <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f4f6]">
                          <IconMapPin class="h-5 w-5 text-[#6b7280]" />
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280]">Distance</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedDelivery?.distance }}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f4f6]">
                          <IconDollar class="h-5 w-5 text-[#6b7280]" />
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280]">Fee</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedDelivery?.fee }}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f4f6]">
                          <IconWallet class="h-5 w-5 text-[#6b7280]" />
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280]">Payment</p>
                          <p class="text-sm font-semibold text-[#111827]">{{ selectedDelivery?.payment }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Status -->
                    <div>
                      <p class="text-sm font-medium text-[#6b7280] mb-2">Status</p>
                      <span :class="getStatusClass(selectedDelivery?.status || '')">
                        {{ selectedDelivery?.status }}
                      </span>
                    </div>

                    <!-- Pickup & Dropoff -->
                    <div class="space-y-4">
                      <div>
                        <p class="text-sm font-medium text-[#6b7280] mb-2">Pickup</p>
                        <div class="flex items-start gap-3">
                          <IconMapPin class="h-5 w-5 text-[#6b7280] mt-0.5 shrink-0" />
                          <p class="text-sm text-[#111827]">{{ getPickupAddress(selectedDelivery?.route || '') }}</p>
                        </div>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-[#6b7280] mb-2">Dropoff</p>
                        <div class="flex items-start gap-3">
                          <IconMapPin class="h-5 w-5 text-[#6b7280] mt-0.5 shrink-0" />
                          <p class="text-sm text-[#111827]">{{ getDropoffAddress(selectedDelivery?.route || '') }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Driver Phone -->
                    <div>
                      <p class="text-sm font-medium text-[#6b7280] mb-2">Driver Phone</p>
                      <div class="flex items-center gap-3">
                        <IconPhone class="h-5 w-5 text-[#6b7280]" />
                        <p class="text-sm font-semibold text-[#111827]">+234 801 234 5678</p>
                      </div>
                    </div>

                    <!-- Timeline -->
                    <div>
                      <p class="text-sm font-medium text-[#6b7280] mb-4">Timeline</p>
                      <div class="space-y-4">
                        <div>
                          <p class="text-sm font-semibold text-[#111827]">Order picked up</p>
                          <p class="text-xs text-[#6b7280] mt-1">10:15 AM</p>
                        </div>
                        <div>
                          <p class="text-sm font-semibold text-[#111827]">Arrived at dropoff</p>
                          <p class="text-xs text-[#6b7280] mt-1">10:50 AM</p>
                        </div>
                      </div>
                    </div>

                    <!-- Map Section -->
                    <div>
                      <p class="text-sm font-medium text-[#6b7280] mb-4">Route Map</p>
                      <div class="h-64 bg-[#f3f4f6] rounded-lg relative overflow-hidden">
                        <div ref="modalMapContainer" class="w-full h-full rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';
import IconArrowRight from '@/components/icon/icon-arrow-forward.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconMapPin from '@/components/icon/icon-map-pin.vue';
import IconPhone from '@/components/icon/icon-phone.vue';
import IconDollar from '@/components/icon/icon-dollar-sign-circle.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';

interface Delivery {
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
}

const searchQuery = ref('');
const statusFilter = ref('');
const courierFilter = ref('');
const dateFilter = ref('');
const currentPage = ref(1);
const perPage = ref(3); // Show 3 items per page to demonstrate pagination
const showDeliveryModal = ref(false);
const selectedDelivery = ref<Delivery | null>(null);
const modalMapContainer = ref<HTMLDivElement | null>(null);
let modalMap: google.maps.Map | null = null;

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'AIzaSyABaUOSZbdkQ8iT2U4bcKg9Surc2cX9Tbw';

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// Load Google Maps script
const loadGoogleMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });
};

// Sample delivery data
const deliveries = ref<Delivery[]>([
  {
    id: '1',
    deliveryId: 'D101',
    route: 'Yaba → Ajah',
    customer: 'Jane John',
    courier: 'Rider A',
    distance: '12.5 km',
    fee: '₦1,500',
    status: 'In Transit',
    payment: 'Wallet',
    date: '12 Oct',
  },
  {
    id: '2',
    deliveryId: 'D102',
    route: 'Lekki → Ikoyi',
    customer: 'Mike Johnson',
    courier: 'Rider B',
    distance: '12.5 km',
    fee: '₦1,500',
    status: 'Delivered',
    payment: 'Card',
    date: '12 Oct',
  },
  {
    id: '3',
    deliveryId: 'D103',
    route: 'Ikeja → Marina',
    customer: 'Ana Ojo',
    courier: 'Rider C',
    distance: '12.5 km',
    fee: '₦1,500',
    status: 'Pending',
    payment: 'Wallet',
    date: '12 Oct',
  },
  {
    id: '4',
    deliveryId: 'D104',
    route: 'Victoria Island → Surulere',
    customer: 'David Smith',
    courier: 'Rider A',
    distance: '15.2 km',
    fee: '₦2,000',
    status: 'In Transit',
    payment: 'Card',
    date: '12 Oct',
  },
  {
    id: '5',
    deliveryId: 'D105',
    route: 'Gbagada → Ikeja',
    customer: 'Sarah Williams',
    courier: 'Rider B',
    distance: '8.7 km',
    fee: '₦1,200',
    status: 'Delivered',
    payment: 'Wallet',
    date: '11 Oct',
  },
  {
    id: '6',
    deliveryId: 'D106',
    route: 'Lekki → Ajah',
    customer: 'John Doe',
    courier: 'Rider C',
    distance: '10.3 km',
    fee: '₦1,300',
    status: 'Pending',
    payment: 'Card',
    date: '11 Oct',
  },
  {
    id: '7',
    deliveryId: 'D107',
    route: 'Ikoyi → Victoria Island',
    customer: 'Mary Johnson',
    courier: 'Rider A',
    distance: '5.1 km',
    fee: '₦800',
    status: 'Delivered',
    payment: 'Wallet',
    date: '11 Oct',
  },
  {
    id: '8',
    deliveryId: 'D108',
    route: 'Surulere → Yaba',
    customer: 'Peter Brown',
    courier: 'Rider B',
    distance: '7.4 km',
    fee: '₦1,100',
    status: 'In Transit',
    payment: 'Card',
    date: '10 Oct',
  },
  {
    id: '9',
    deliveryId: 'D109',
    route: 'Marina → Lekki',
    customer: 'Lisa Anderson',
    courier: 'Rider C',
    distance: '18.9 km',
    fee: '₦2,500',
    status: 'Delivered',
    payment: 'Wallet',
    date: '10 Oct',
  },
  {
    id: '10',
    deliveryId: 'D110',
    route: 'Ajah → Ikoyi',
    customer: 'Robert Taylor',
    courier: 'Rider A',
    distance: '14.6 km',
    fee: '₦1,800',
    status: 'Pending',
    payment: 'Card',
    date: '10 Oct',
  },
  {
    id: '11',
    deliveryId: 'D111',
    route: 'Ikeja → Lekki',
    customer: 'Emma Wilson',
    courier: 'Rider B',
    distance: '22.3 km',
    fee: '₦3,000',
    status: 'Delivered',
    payment: 'Wallet',
    date: '9 Oct',
  },
  {
    id: '12',
    deliveryId: 'D112',
    route: 'Yaba → Surulere',
    customer: 'James Brown',
    courier: 'Rider C',
    distance: '6.8 km',
    fee: '₦950',
    status: 'In Transit',
    payment: 'Card',
    date: '9 Oct',
  },
  {
    id: '13',
    deliveryId: 'D113',
    route: 'Victoria Island → Lekki',
    customer: 'Olivia Davis',
    courier: 'Rider A',
    distance: '11.4 km',
    fee: '₦1,400',
    status: 'Delivered',
    payment: 'Wallet',
    date: '9 Oct',
  },
  {
    id: '14',
    deliveryId: 'D114',
    route: 'Ikoyi → Yaba',
    customer: 'Michael Garcia',
    courier: 'Rider B',
    distance: '9.2 km',
    fee: '₦1,250',
    status: 'Pending',
    payment: 'Card',
    date: '8 Oct',
  },
  {
    id: '15',
    deliveryId: 'D115',
    route: 'Ajah → Victoria Island',
    customer: 'Sophia Martinez',
    courier: 'Rider C',
    distance: '16.7 km',
    fee: '₦2,200',
    status: 'In Transit',
    payment: 'Wallet',
    date: '8 Oct',
  },
  {
    id: '16',
    deliveryId: 'D116',
    route: 'Lekki → Ikeja',
    customer: 'William Anderson',
    courier: 'Rider A',
    distance: '23.1 km',
    fee: '₦3,100',
    status: 'Delivered',
    payment: 'Card',
    date: '8 Oct',
  },
  {
    id: '17',
    deliveryId: 'D117',
    route: 'Marina → Surulere',
    customer: 'Isabella Thomas',
    courier: 'Rider B',
    distance: '8.5 km',
    fee: '₦1,150',
    status: 'Pending',
    payment: 'Wallet',
    date: '7 Oct',
  },
  {
    id: '18',
    deliveryId: 'D118',
    route: 'Gbagada → Ikoyi',
    customer: 'Ethan Jackson',
    courier: 'Rider C',
    distance: '13.9 km',
    fee: '₦1,700',
    status: 'In Transit',
    payment: 'Card',
    date: '7 Oct',
  },
  {
    id: '19',
    deliveryId: 'D119',
    route: 'Yaba → Lekki',
    customer: 'Mia White',
    courier: 'Rider A',
    distance: '19.6 km',
    fee: '₦2,600',
    status: 'Delivered',
    payment: 'Wallet',
    date: '7 Oct',
  },
  {
    id: '20',
    deliveryId: 'D120',
    route: 'Ikeja → Ajah',
    customer: 'Alexander Harris',
    courier: 'Rider B',
    distance: '25.4 km',
    fee: '₦3,400',
    status: 'Pending',
    payment: 'Card',
    date: '6 Oct',
  },
  {
    id: '21',
    deliveryId: 'D121',
    route: 'Victoria Island → Ikeja',
    customer: 'Charlotte Clark',
    courier: 'Rider C',
    distance: '20.8 km',
    fee: '₦2,800',
    status: 'In Transit',
    payment: 'Wallet',
    date: '6 Oct',
  },
  {
    id: '22',
    deliveryId: 'D122',
    route: 'Lekki → Yaba',
    customer: 'Daniel Lewis',
    courier: 'Rider A',
    distance: '18.3 km',
    fee: '₦2,400',
    status: 'Delivered',
    payment: 'Card',
    date: '6 Oct',
  },
  {
    id: '23',
    deliveryId: 'D123',
    route: 'Ikoyi → Gbagada',
    customer: 'Amelia Walker',
    courier: 'Rider B',
    distance: '12.7 km',
    fee: '₦1,600',
    status: 'Pending',
    payment: 'Wallet',
    date: '5 Oct',
  },
  {
    id: '24',
    deliveryId: 'D124',
    route: 'Surulere → Marina',
    customer: 'Matthew Hall',
    courier: 'Rider C',
    distance: '7.9 km',
    fee: '₦1,050',
    status: 'In Transit',
    payment: 'Card',
    date: '5 Oct',
  },
  {
    id: '25',
    deliveryId: 'D125',
    route: 'Ajah → Ikeja',
    customer: 'Harper Allen',
    courier: 'Rider A',
    distance: '24.2 km',
    fee: '₦3,200',
    status: 'Delivered',
    payment: 'Wallet',
    date: '5 Oct',
  },
  {
    id: '26',
    deliveryId: 'D126',
    route: 'Yaba → Victoria Island',
    customer: 'Joseph Young',
    courier: 'Rider B',
    distance: '17.5 km',
    fee: '₦2,300',
    status: 'Pending',
    payment: 'Card',
    date: '4 Oct',
  },
  {
    id: '27',
    deliveryId: 'D127',
    route: 'Lekki → Surulere',
    customer: 'Abigail King',
    courier: 'Rider C',
    distance: '21.6 km',
    fee: '₦2,900',
    status: 'In Transit',
    payment: 'Wallet',
    date: '4 Oct',
  },
  {
    id: '28',
    deliveryId: 'D128',
    route: 'Ikeja → Ikoyi',
    customer: 'Samuel Wright',
    courier: 'Rider A',
    distance: '15.8 km',
    fee: '₦2,000',
    status: 'Delivered',
    payment: 'Card',
    date: '4 Oct',
  },
  {
    id: '29',
    deliveryId: 'D129',
    route: 'Marina → Ajah',
    customer: 'Emily Lopez',
    courier: 'Rider B',
    distance: '19.1 km',
    fee: '₦2,500',
    status: 'Pending',
    payment: 'Wallet',
    date: '3 Oct',
  },
  {
    id: '30',
    deliveryId: 'D130',
    route: 'Gbagada → Lekki',
    customer: 'David Hill',
    courier: 'Rider C',
    distance: '16.4 km',
    fee: '₦2,100',
    status: 'In Transit',
    payment: 'Card',
    date: '3 Oct',
  },
]);

// Filter deliveries based on search and filters
const filteredDeliveries = computed(() => {
  let result = deliveries.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (delivery) =>
        delivery.deliveryId.toLowerCase().includes(query) ||
        delivery.route.toLowerCase().includes(query) ||
        delivery.customer.toLowerCase().includes(query) ||
        delivery.courier.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (statusFilter.value) {
    const statusMap: Record<string, string> = {
      'pending': 'Pending',
      'in-transit': 'In Transit',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
    };
    result = result.filter((delivery) => delivery.status === statusMap[statusFilter.value]);
  }

  // Courier filter
  if (courierFilter.value) {
    result = result.filter((delivery) => delivery.courier === courierFilter.value);
  }

  // Date filter (simplified - in real app, would filter by actual dates)
  if (dateFilter.value === 'today') {
    result = result.filter((delivery) => delivery.date === '12 Oct');
  }

  return result;
});

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredDeliveries.value.length / perPage.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, filteredDeliveries.value.length);
  return { startIndex, endIndex };
});

const paginatedDeliveries = computed(() => {
  return filteredDeliveries.value.slice(pagination.value.startIndex, pagination.value.endIndex);
});

// Visible pages for pagination
const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;

  if (totalPages.value <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage.value <= 3) {
      // Near the start: show 1, 2, 3, 4, 5, ..., 10
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage.value >= totalPages.value - 2) {
      // Near the end: show 1, ..., 6, 7, 8, 9, 10
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
        if (i > 1) pages.push(i);
      }
    } else {
      // In the middle: show 1, ..., current-1, current, current+1, ..., 10
      pages.push(currentPage.value - 1);
      pages.push(currentPage.value);
      pages.push(currentPage.value + 1);
    }
  }

  return pages;
});

const showStartEllipsis = computed(() => {
  return totalPages.value > 7 && currentPage.value > 4;
});

const showEndEllipsis = computed(() => {
  return totalPages.value > 7 && currentPage.value < totalPages.value - 3;
});

// Get status badge class
const getStatusClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white';
  const statusClasses: Record<string, string> = {
    'In Transit': 'bg-[#2563eb]',
    'Delivered': 'bg-[#10b981]',
    'Pending': 'bg-[#f59e0b]',
    'Cancelled': 'bg-[#ef4444]',
  };
  return `${baseClasses} ${statusClasses[status] || 'bg-[#6b7280]'}`;
};

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
watch([searchQuery, statusFilter, courierFilter, dateFilter], () => {
  currentPage.value = 1;
});

// Open delivery modal
const openDeliveryModal = async (delivery: Delivery) => {
  selectedDelivery.value = delivery;
  showDeliveryModal.value = true;

  // Initialize map after modal opens
  await nextTick();
  if (modalMapContainer.value) {
    initModalMap();
  }
};

// Close delivery modal
const closeDeliveryModal = () => {
  showDeliveryModal.value = false;
  if (modalMap) {
    modalMap = null;
  }
};

// Initialize map in modal
const initModalMap = async () => {
  if (!modalMapContainer.value) return;

  try {
    await loadGoogleMaps();

    // Get route coordinates (simplified - in real app would use actual addresses)
    const route = selectedDelivery.value?.route || '';
    const [pickup, dropoff] = route.split(' → ');

    // Use Lagos coordinates (Awolowo Road area)
    const center = { lat: 6.4481, lng: 3.4300 };

    modalMap = new google.maps.Map(modalMapContainer.value, {
      center: center,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
    });

    // Add pickup marker
    new google.maps.Marker({
      position: { lat: 6.4481, lng: 3.4300 },
      map: modalMap,
      title: 'Pickup',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#10b981',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
    });

    // Add dropoff marker
    new google.maps.Marker({
      position: { lat: 6.4500, lng: 3.4320 },
      map: modalMap,
      title: 'Dropoff',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#ef4444',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
    });
  } catch (error) {
    console.error('Error initializing modal map:', error);
  }
};

// Get pickup address from route
const getPickupAddress = (route: string): string => {
  const parts = route.split(' → ');
  if (parts.length > 0) {
    const location = parts[0].trim();
    // Return formatted address
    return `12, ${location} Street, ${location}`;
  }
  return 'Pickup location';
};

// Get dropoff address from route
const getDropoffAddress = (route: string): string => {
  const parts = route.split(' → ');
  if (parts.length > 1) {
    const location = parts[1].trim();
    // Return formatted address
    return `45, ${location} Lane, ${location}`;
  }
  return 'Dropoff location';
};

onBeforeUnmount(() => {
  if (modalMap) {
    modalMap = null;
  }
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

