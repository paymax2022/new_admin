<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Overview of delivery performance and activity</p>
            </div>
            <div class="relative" ref="dateDropdownRef">
                <button 
                    @click.stop="toggleDateDropdown"
                    class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                    {{ selectedDateRange }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                    v-if="showDateDropdown"
                    @click.stop
                    class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                    <div class="py-1">
                        <button
                            v-for="option in dateRangeOptions"
                            :key="option.value"
                            @click="selectDateRange(option.value)"
                            :class="[
                                'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                selectedDateRange === option.label ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                            ]"
                        >
                            {{ option.label }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- KPI Cards Section -->
        <div class="space-y-4 mb-6">
            <!-- First Row: 4 Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Total Trips -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Trips</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">323</p>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">↑ 12.5% vs last week</p>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900">
                                <TruckIcon class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Active Drivers -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Active Drivers</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">23</p>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">↑ 8.3% vs last week</p>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900">
                                <UserGroupIcon class="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Revenue Today -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Revenue Today</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">$53,000</p>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">↑ 15.2% vs yesterday</p>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                                <BanknotesIcon class="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Average Delivery Time -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Average Delivery Time</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">20 mins</p>
                            <p class="text-xs font-semibold text-red-600 dark:text-red-400">↓ 4.8% vs last week</p>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <ClockIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Second Row: 3 Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Pending Deliveries -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Pending Deliveries</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">00.00</p>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">↑ 0 vs last week</p>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900">
                                <BellIcon class="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Open Disputes -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Open Disputes</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">00.00</p>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">↑ 0 vs last week</p>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <ExclamationTriangleIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cancellations -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Cancellations</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">00.00</p>
                            <p class="text-xs font-semibold text-red-600 dark:text-red-400">↓ 4.8% vs last week</p>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900">
                                <XCircleIcon class="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Trips Over Time Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Trips Over Time</h2>
                    <button class="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1">
                        Today
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                <div class="h-64">
                    <LineChart :data="tripsChartData" :options="tripsChartOptions" />
                </div>
            </div>

            <!-- Weekly Revenue Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Weekly Revenue</h2>
                    <button class="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1">
                        Today
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                <div class="h-64">
                    <BarChart :data="revenueChartData" :options="revenueChartOptions" />
                </div>
            </div>
        </div>

        <!-- Live Driver Map Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Live Driver Map</h2>
                <div class="text-xs text-gray-500 dark:text-gray-400">1 mi</div>
            </div>
            <div class="relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden" style="height: 500px;">
                <div ref="mapContainer" class="w-full h-full rounded-lg"></div>
                
                <!-- Legend -->
                <div class="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center gap-4 z-10">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        <span class="text-xs text-gray-700 dark:text-gray-300">Available (10)</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-xs text-gray-700 dark:text-gray-300">Busy (3)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { 
    TruckIcon, 
    UserGroupIcon, 
    BanknotesIcon, 
    ClockIcon, 
    BellIcon, 
    ExclamationTriangleIcon,
    XCircleIcon
} from '@heroicons/vue/24/outline'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'

// Date range dropdown
const showDateDropdown = ref(false)
const selectedDateRange = ref('Today')
const dateDropdownRef = ref<HTMLElement | null>(null)

const dateRangeOptions = [
    { label: 'Today', value: 'today' },
    { label: '7 days', value: '7days' },
    { label: '30 days', value: '30days' },
    { label: '60 days', value: '60days' }
]

const toggleDateDropdown = () => {
    showDateDropdown.value = !showDateDropdown.value
}

const closeDateDropdown = () => {
    showDateDropdown.value = false
}

const selectDateRange = (value: string) => {
    const option = dateRangeOptions.find(opt => opt.value === value)
    if (option) {
        selectedDateRange.value = option.label
        // Here you can add logic to filter data based on selected date range
        console.log('Selected date range:', value)
    }
    closeDateDropdown()
}


// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'AIzaSyCxK0c-UDughTkIOKtBhacBDEClUgZWGmI';

const mapContainer = ref<HTMLDivElement | null>(null);
let map: google.maps.Map | null = null;
let markers: google.maps.Marker[] = [];
let poiMarkers: google.maps.Marker[] = [];

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

// Initialize map
const initMap = async () => {
  if (!mapContainer.value) return;

  try {
    await loadGoogleMaps();

    // San Francisco area coordinates (matching the image)
    const sfCenter = { lat: 37.7749, lng: -122.4194 };

    map = new google.maps.Map(mapContainer.value, {
      center: sfCenter,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }],
        },
      ],
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
    });

    // Points of Interest (POIs) - Blue markers
    const poiLocations = [
      { lat: 37.7755, lng: -122.4180, title: 'Souvla', type: 'restaurant' },
      { lat: 37.7750, lng: -122.4190, title: 'Dumpling Home', type: 'restaurant' },
      { lat: 37.7745, lng: -122.4200, title: 'Sightglass Coffee', type: 'coffee' },
      { lat: 37.7740, lng: -122.4210, title: 'Church Of 8 Wheels Roller Disco', type: 'venue' },
      { lat: 37.7735, lng: -122.4220, title: 'Zuni Café', type: 'restaurant' },
    ];

    poiLocations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; min-width: 120px;">
            <strong style="color: #111827; font-size: 14px;">${location.title}</strong>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      poiMarkers.push(marker);
    });

    // Available Drivers - Green markers (10 drivers)
    const availableDrivers = [
      { lat: 37.7760, lng: -122.4175, title: 'Driver Available #1' },
      { lat: 37.7758, lng: -122.4185, title: 'Driver Available #2' },
      { lat: 37.7756, lng: -122.4195, title: 'Driver Available #3' },
      { lat: 37.7754, lng: -122.4205, title: 'Driver Available #4' },
      { lat: 37.7752, lng: -122.4215, title: 'Driver Available #5' },
      { lat: 37.7750, lng: -122.4225, title: 'Driver Available #6' },
      { lat: 37.7748, lng: -122.4170, title: 'Driver Available #7' },
      { lat: 37.7746, lng: -122.4180, title: 'Driver Available #8' },
      { lat: 37.7744, lng: -122.4190, title: 'Driver Available #9' },
      { lat: 37.7742, lng: -122.4200, title: 'Driver Available #10' },
    ];

    availableDrivers.forEach((driver) => {
      const marker = new google.maps.Marker({
        position: { lat: driver.lat, lng: driver.lng },
        map: map,
        title: driver.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      markers.push(marker);
    });

    // Busy Drivers - Red markers (3 drivers)
    const busyDrivers = [
      { lat: 37.7757, lng: -122.4182, title: 'Driver Busy #1' },
      { lat: 37.7753, lng: -122.4198, title: 'Driver Busy #2' },
      { lat: 37.7749, lng: -122.4212, title: 'Driver Busy #3' },
    ];

    busyDrivers.forEach((driver) => {
      const marker = new google.maps.Marker({
        position: { lat: driver.lat, lng: driver.lng },
        map: map,
        title: driver.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      markers.push(marker);
    });
  } catch (error) {
    console.error('Error initializing map:', error);
    if (mapContainer.value) {
      mapContainer.value.innerHTML = '<div class="flex items-center justify-center h-full text-red-500">Failed to load map</div>';
    }
  }
};

// Trips Over Time Chart Data
const tripsChartData = ref({
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:58'],
    datasets: [{
        label: 'Trips',
        data: [20, 30, 50, 80, 140, 100, 60],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
    }]
})

const tripsChartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: true
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 160,
            ticks: {
                stepSize: 40
            },
            grid: {
                color: '#e5e7eb'
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
})

// Weekly Revenue Chart Data
const revenueChartData = ref({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Revenue',
        data: [2000, 2500, 3000, 2800, 3500, 3800, 3200],
        backgroundColor: '#f59e0b',
        borderRadius: 4,
        borderSkipped: false
    }]
})

const revenueChartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: true
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 4000,
            ticks: {
                stepSize: 1000
            },
            grid: {
                color: '#e5e7eb'
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
})

// Click outside handler for date dropdown
let handleClickOutside: ((event: MouseEvent) => void) | null = null;

onMounted(() => {
  initMap();
  
  // Close date dropdown when clicking outside
  handleClickOutside = (event: MouseEvent) => {
    if (dateDropdownRef.value && !dateDropdownRef.value.contains(event.target as Node)) {
      closeDateDropdown()
    }
  }
  document.addEventListener('click', handleClickOutside)
});

onBeforeUnmount(() => {
  // Remove click outside listener
  if (handleClickOutside) {
    document.removeEventListener('click', handleClickOutside)
  }
  
  // Clean up markers
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  poiMarkers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];
  poiMarkers = [];
  map = null;
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
