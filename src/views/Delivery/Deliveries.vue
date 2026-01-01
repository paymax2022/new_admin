<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative">
        <!-- Header Section -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">DELIVERIES MANAGEMENT</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">View and manage all ride requests</p>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <!-- Search Bar -->
                <div class="flex-1">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search by Trip ID, Rider, or Driver..."
                            class="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <!-- Filter Dropdowns -->
                <div class="flex gap-3">
                    <!-- Status Filter -->
                    <div class="relative" ref="statusDropdownRef">
                        <button
                            @click.stop="toggleStatusDropdown"
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 min-w-[120px]"
                        >
                            {{ selectedStatus }}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            v-if="showStatusDropdown"
                            @click.stop
                            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div class="py-1">
                                <button
                                    v-for="status in statusOptions"
                                    :key="status"
                                    @click="selectStatus(status)"
                                    :class="[
                                        'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                        selectedStatus === status ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ status }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Vehicle Filter -->
                    <div class="relative" ref="vehicleDropdownRef">
                        <button
                            @click.stop="toggleVehicleDropdown"
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 min-w-[120px]"
                        >
                            {{ selectedVehicle }}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            v-if="showVehicleDropdown"
                            @click.stop
                            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div class="py-1">
                                <button
                                    v-for="vehicle in vehicleOptions"
                                    :key="vehicle"
                                    @click="selectVehicle(vehicle)"
                                    :class="[
                                        'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                        selectedVehicle === vehicle ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ vehicle }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Filter -->
                    <div class="relative" ref="paymentDropdownRef">
                        <button
                            @click.stop="togglePaymentDropdown"
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 min-w-[120px]"
                        >
                            {{ selectedPayment }}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            v-if="showPaymentDropdown"
                            @click.stop
                            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div class="py-1">
                                <button
                                    v-for="payment in paymentOptions"
                                    :key="payment"
                                    @click="selectPayment(payment)"
                                    :class="[
                                        'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                        selectedPayment === payment ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ payment }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Deliveries Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <Vue3Datatable
                    v-if="filteredDeliveries.length > 0"
                    :rows="filteredDeliveries"
                    :columns="columns"
                    :totalRows="filteredDeliveries.length"
                    :sortable="true"
                    :searchable="false"
                    :pageSize="rowsPerPage"
                    :pageSizeOptions="[10, 25, 50, 100]"
                    skin="bh-table-compact"
                    :loading="loading"
                    :classes="{
                        table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
                        thead: 'bg-gray-50 dark:bg-gray-800',
                        tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
                        tr: 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer',
                        th: 'px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300',
                        td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
                    }"
                    @row-clicked="onRowClick"
                >
                    <template #route="data">
                        <div v-if="data && data.value" class="flex flex-col gap-1">
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                <span class="text-sm">{{ data.value.pickup }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                                <span class="text-sm">{{ data.value.destination }}</span>
                            </div>
                        </div>
                        <span v-else class="text-gray-400">-</span>
                    </template>

                    <template #status="data">
                        <span v-if="data && data.value" :class="getStatusClass(data.value.status)" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium">
                            {{ data.value.status }}
                        </span>
                        <span v-else class="text-gray-400">-</span>
                    </template>

                    <template #actions="data">
                        <div v-if="data && data.value" class="flex items-center justify-center">
                            <button
                                @click.stop="viewDeliveryDetails(data.value)"
                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                title="View Details"
                            >
                                <EyeIcon class="h-5 w-5" />
                            </button>
                        </div>
                        <span v-else class="text-gray-400">-</span>
                    </template>
                </Vue3Datatable>
                <div v-else class="p-10 text-center text-gray-500 dark:text-gray-400">
                    No deliveries found
                </div>
            </div>
        </div>

        <!-- Trip Details Modal (Right Side) -->
        <div
            v-if="showModal && selectedDelivery"
            class="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50"
            @click.self="closeModal"
        >
            <div class="bg-white dark:bg-gray-800 w-full max-w-md h-full overflow-y-auto shadow-xl">
                <!-- Modal Header -->
                <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Trip Details - {{ selectedDelivery.id }}</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">View complete trip information and perform actions</p>
                    </div>
                    <button
                        @click="closeModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="p-6 space-y-6">
                    <!-- User Information -->
                    <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">User Information</label>
                        <div class="flex items-center gap-3">
                            <UserIcon class="h-5 w-5 text-gray-400" />
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDelivery.customer }}</span>
                        </div>
                    </div>

                    <!-- Driver Information -->
                    <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Driver Information</label>
                        <div class="space-y-2">
                            <div class="flex items-center gap-3">
                                <UserIcon class="h-5 w-5 text-gray-400" />
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDelivery.driverName || 'John Smith' }}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <StarIcon class="h-5 w-5 text-yellow-400" />
                                <span class="text-sm text-gray-700 dark:text-gray-300">Rating: {{ selectedDelivery.driverRating || '4.9' }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Trip Metrics -->
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <MapPinIcon class="h-4 w-4 text-gray-400" />
                                <span class="text-xs text-gray-500 dark:text-gray-400">Distance</span>
                            </div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDelivery.distance || '12.4km' }}</p>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <BanknotesIcon class="h-4 w-4 text-gray-400" />
                                <span class="text-xs text-gray-500 dark:text-gray-400">Fee</span>
                            </div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDelivery.fare }}</p>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <WalletIcon class="h-4 w-4 text-gray-400" />
                                <span class="text-xs text-gray-500 dark:text-gray-400">Payment</span>
                            </div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDelivery.payment }}</p>
                        </div>
                    </div>

                    <!-- Status -->
                    <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Status</label>
                        <span :class="getStatusClass(selectedDelivery.status)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                            {{ selectedDelivery.status }}
                        </span>
                    </div>

                    <!-- Pickup/Dropoff -->
                    <div class="space-y-3">
                        <div>
                            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Pickup</label>
                            <div class="flex items-center gap-2">
                                <MapPinIcon class="h-4 w-4 text-gray-400" />
                                <span class="text-sm text-gray-900 dark:text-white">{{ selectedDelivery.pickupAddress || selectedDelivery.pickup }}</span>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Dropoff</label>
                            <div class="flex items-center gap-2">
                                <MapPinIcon class="h-4 w-4 text-gray-400" />
                                <span class="text-sm text-gray-900 dark:text-white">{{ selectedDelivery.destinationAddress || selectedDelivery.destination }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Fare Breakdown -->
                    <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block">Fare Breakdown</label>
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">Base Fare</span>
                                <span class="text-gray-900 dark:text-white font-medium">{{ selectedDelivery.baseFare || '$6.00' }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">Distance ({{ selectedDelivery.distanceValue || '5.2 mi' }})</span>
                                <span class="text-gray-900 dark:text-white font-medium">{{ selectedDelivery.distanceFare || '$15.60' }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">Time ({{ selectedDelivery.timeValue || '18 min' }})</span>
                                <span class="text-gray-900 dark:text-white font-medium">{{ selectedDelivery.timeFare || '$3.90' }}</span>
                            </div>
                            <div class="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                <div class="flex justify-between">
                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">Total</span>
                                    <span class="text-sm font-bold text-gray-900 dark:text-white">{{ selectedDelivery.fare }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Map -->
                    <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Route Map</label>
                        <div class="relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden" style="height: 300px;">
                            <div ref="modalMapContainer" class="w-full h-full rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { 
    EyeIcon, 
    XMarkIcon, 
    UserIcon, 
    StarIcon, 
    MapPinIcon, 
    BanknotesIcon 
} from '@heroicons/vue/24/outline'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'

// Wallet icon component (using BanknotesIcon as fallback)
const WalletIcon = BanknotesIcon

// Sample data with extended fields
const deliveries = ref([
    {
        id: 'TRIP-78945',
        customer: 'Sarah Johnson',
        pickup: '123 Main St',
        destination: '456 Oak Ave',
        pickupAddress: '12, Yaba Street, Yaba',
        destinationAddress: '45, Ajah Lane, Ajah',
        courier: 'Rider A',
        driverName: 'John Smith',
        driverRating: '4.9',
        payment: 'Wallet',
        fare: '$24.50',
        status: 'In transit',
        distance: '12.4km',
        distanceValue: '5.2 mi',
        distanceFare: '$15.60',
        timeValue: '18 min',
        timeFare: '$3.90',
        baseFare: '$6.00'
    },
    {
        id: 'TRIP-78946',
        customer: 'Michael Chen',
        pickup: '789 Pine Rd',
        destination: '321 Elm St',
        pickupAddress: '789 Pine Rd, Downtown',
        destinationAddress: '321 Elm St, Uptown',
        courier: 'Rider B',
        driverName: 'Mike Johnson',
        driverRating: '4.7',
        payment: 'Cash',
        fare: '$18.75',
        status: 'completed',
        distance: '8.2km',
        distanceValue: '4.1 mi',
        distanceFare: '$12.30',
        timeValue: '15 min',
        timeFare: '$3.75',
        baseFare: '$6.00'
    },
    {
        id: 'TRIP-78947',
        customer: 'Emily Davis',
        pickup: '555 Maple Ave',
        destination: '777 Cedar Blvd',
        pickupAddress: '555 Maple Ave, North',
        destinationAddress: '777 Cedar Blvd, South',
        courier: 'Rider C',
        driverName: 'Emily Wilson',
        driverRating: '4.8',
        payment: 'Card',
        fare: '$32.10',
        status: 'completed',
        distance: '15.6km',
        distanceValue: '7.8 mi',
        distanceFare: '$23.40',
        timeValue: '25 min',
        timeFare: '$6.25',
        baseFare: '$6.00'
    },
    {
        id: 'TRIP-78948',
        customer: 'David Wilson',
        pickup: '999 Birch Ln',
        destination: '111 Spruce Dr',
        pickupAddress: '999 Birch Ln, East',
        destinationAddress: '111 Spruce Dr, West',
        courier: 'Rider A',
        driverName: 'David Brown',
        driverRating: '4.6',
        payment: 'Card',
        fare: '$15.25',
        status: 'cancelled',
        distance: '6.5km',
        distanceValue: '3.2 mi',
        distanceFare: '$9.60',
        timeValue: '12 min',
        timeFare: '$3.00',
        baseFare: '$6.00'
    },
    {
        id: 'TRIP-78949',
        customer: 'Jessica Martinez',
        pickup: '222 Willow Way',
        destination: '333 Ash St',
        pickupAddress: '222 Willow Way, Central',
        destinationAddress: '333 Ash St, Central',
        courier: 'Rider D',
        driverName: 'Jessica Lee',
        driverRating: '5.0',
        payment: 'Wallet',
        fare: '$20.00',
        status: 'In transit',
        distance: '10.2km',
        distanceValue: '5.1 mi',
        distanceFare: '$15.30',
        timeValue: '20 min',
        timeFare: '$5.00',
        baseFare: '$6.00'
    }
])

// Table configuration
const columns = ref([
    {
        key: 'id',
        title: 'Delivery ID',
        field: 'id',
        sortable: true,
        visible: true,
    },
    {
        key: 'customer',
        title: 'Customer',
        field: 'customer',
        sortable: true,
        visible: true,
    },
    {
        key: 'route',
        title: 'Route',
        field: 'route',
        sortable: false,
        visible: true,
    },
    {
        key: 'courier',
        title: 'Courier',
        field: 'courier',
        sortable: true,
        visible: true,
    },
    {
        key: 'payment',
        title: 'Payment',
        field: 'payment',
        sortable: true,
        visible: true,
    },
    {
        key: 'fare',
        title: 'Fare',
        field: 'fare',
        sortable: true,
        visible: true,
    },
    {
        key: 'status',
        title: 'Status',
        field: 'status',
        sortable: true,
        visible: true,
    },
    {
        key: 'actions',
        title: 'Actions',
        field: 'actions',
        sortable: false,
        visible: true,
    },
])

const rowsPerPage = ref(10)
const loading = ref(false)

// Search and filters
const searchQuery = ref('')
const selectedStatus = ref('All Status')
const selectedVehicle = ref('All Vehicles')
const selectedPayment = ref('All Payments')

const statusOptions = ['All Status', 'completed', 'In transit', 'cancelled']
const vehicleOptions = ['All Vehicles', 'Car', 'Bike', 'Van']
const paymentOptions = ['All Payments', 'Card', 'Cash', 'Wallet']

// Dropdown states
const showStatusDropdown = ref(false)
const showVehicleDropdown = ref(false)
const showPaymentDropdown = ref(false)
const statusDropdownRef = ref<HTMLElement | null>(null)
const vehicleDropdownRef = ref<HTMLElement | null>(null)
const paymentDropdownRef = ref<HTMLElement | null>(null)

// Modal state
const showModal = ref(false)
const selectedDelivery = ref<any>(null)
const modalMapContainer = ref<HTMLDivElement | null>(null)
let modalMap: google.maps.Map | null = null

// Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyCxK0c-UDughTkIOKtBhacBDEClUgZWGmI';

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

const initModalMap = async () => {
  if (!modalMapContainer.value || !selectedDelivery.value) return;

  try {
    await loadGoogleMaps();

    const sfCenter = { lat: 37.7749, lng: -122.4194 };

    modalMap = new google.maps.Map(modalMapContainer.value, {
      center: sfCenter,
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
    const pickupMarker = new google.maps.Marker({
      position: { lat: 37.7755, lng: -122.4180 },
      map: modalMap,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#10b981',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
      title: 'Pickup Location'
    });

    // Add dropoff marker
    const dropoffMarker = new google.maps.Marker({
      position: { lat: 37.7740, lng: -122.4210 },
      map: modalMap,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#ef4444',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
      title: 'Dropoff Location'
    });

    // Fit bounds to show both markers
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(pickupMarker.getPosition()!);
    bounds.extend(dropoffMarker.getPosition()!);
    modalMap.fitBounds(bounds);
  } catch (error) {
    console.error('Error initializing modal map:', error);
  }
};

const toggleStatusDropdown = () => {
    showStatusDropdown.value = !showStatusDropdown.value
    showVehicleDropdown.value = false
    showPaymentDropdown.value = false
}

const toggleVehicleDropdown = () => {
    showVehicleDropdown.value = !showVehicleDropdown.value
    showStatusDropdown.value = false
    showPaymentDropdown.value = false
}

const togglePaymentDropdown = () => {
    showPaymentDropdown.value = !showPaymentDropdown.value
    showStatusDropdown.value = false
    showVehicleDropdown.value = false
}

const selectStatus = (status: string) => {
    selectedStatus.value = status
    showStatusDropdown.value = false
}

const selectVehicle = (vehicle: string) => {
    selectedVehicle.value = vehicle
    showVehicleDropdown.value = false
}

const selectPayment = (payment: string) => {
    selectedPayment.value = payment
    showPaymentDropdown.value = false
}

// Filtered deliveries
const filteredDeliveries = computed(() => {
    let filtered = deliveries.value

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(delivery =>
            delivery.id.toLowerCase().includes(query) ||
            delivery.customer.toLowerCase().includes(query) ||
            delivery.courier.toLowerCase().includes(query)
        )
    }

    // Status filter
    if (selectedStatus.value !== 'All Status') {
        filtered = filtered.filter(delivery =>
            delivery.status.toLowerCase() === selectedStatus.value.toLowerCase()
        )
    }

    // Payment filter
    if (selectedPayment.value !== 'All Payments') {
        filtered = filtered.filter(delivery =>
            delivery.payment.toLowerCase() === selectedPayment.value.toLowerCase()
        )
    }

    return filtered
})

// Status badge classes
const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'completed') {
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    } else if (statusLower === 'in transit') {
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    } else if (statusLower === 'cancelled') {
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

// View delivery details
const viewDeliveryDetails = (delivery: any) => {
    selectedDelivery.value = delivery
    showModal.value = true
    // Initialize map after modal is shown
    setTimeout(() => {
        initModalMap()
    }, 100)
}

const closeModal = () => {
    showModal.value = false
    selectedDelivery.value = null
    if (modalMap) {
        modalMap = null
    }
}

const onRowClick = (row: any) => {
    viewDeliveryDetails(row)
}

// Click outside handlers
let handleClickOutside: ((event: MouseEvent) => void) | null = null

onMounted(() => {
    handleClickOutside = (event: MouseEvent) => {
        if (statusDropdownRef.value && !statusDropdownRef.value.contains(event.target as Node)) {
            showStatusDropdown.value = false
        }
        if (vehicleDropdownRef.value && !vehicleDropdownRef.value.contains(event.target as Node)) {
            showVehicleDropdown.value = false
        }
        if (paymentDropdownRef.value && !paymentDropdownRef.value.contains(event.target as Node)) {
            showPaymentDropdown.value = false
        }
    }
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    if (handleClickOutside) {
        document.removeEventListener('click', handleClickOutside)
    }
    if (modalMap) {
        modalMap = null
    }
})
</script>

<style scoped>
/* Additional styles matching TransactionsView */
:deep(.bh-table-compact) {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

:deep(.bh-table-compact thead) {
  background: linear-gradient(to right, #f9fafb, #f3f4f6);
}

.dark :deep(.bh-table-compact thead) {
  background: linear-gradient(to right, #374151, #1f2937);
}

:deep(.bh-table-compact thead th) {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f9fafb;
  padding: 1rem 1.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

.dark :deep(.bh-table-compact thead th) {
  background-color: #374151;
  color: #d1d5db;
  border-bottom-color: #4b5563;
}

:deep(.bh-table-compact tbody tr:hover) {
  cursor: pointer;
  background-color: #f9fafb;
  transform: scale(1.001);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark :deep(.bh-table-compact tbody tr:hover) {
  background-color: #1f2937;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
