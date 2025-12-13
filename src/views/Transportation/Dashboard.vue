<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-[#111827]">Dashboard Overview</h1>
        <p class="mt-1 text-sm text-[#6b7280]">Welcome back! Here's what's happening with your platform today</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          class="inline-flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] shadow-sm transition hover:bg-[#f9fafb]"
        >
          <IconDownload class="h-4 w-4" />
          Export Data
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1d4ed8]"
        >
          View Full Report
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <!-- Total Revenue -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-[#6b7280]">Total Revenue</p>
            <p class="mt-2 text-3xl font-semibold text-[#2563eb]">$4,500</p>
            <p class="mt-1 text-xs font-medium text-[#10b981]">1% vs yesterday</p>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#dbeafe]">
            <IconDollar class="h-6 w-6 text-[#2563eb]" />
          </div>
        </div>
      </div>

      <!-- Active Trips -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-[#6b7280]">Active Trips</p>
            <p class="mt-2 text-3xl font-semibold text-[#f97316]">23k</p>
            <p class="mt-1 text-xs font-medium text-[#10b981]">1% vs last week</p>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#fed7aa]">
            <IconCar class="h-6 w-6 text-[#f97316]" />
          </div>
        </div>
      </div>

      <!-- Total Users -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-[#6b7280]">Total Users</p>
            <p class="mt-2 text-3xl font-semibold text-[#10b981]">12k</p>
            <p class="mt-1 text-xs font-medium text-[#10b981]">1% vs last week</p>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#d1fae5]">
            <IconUsersGroup class="h-6 w-6 text-[#10b981]" />
          </div>
        </div>
      </div>

      <!-- Avg Ratings -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-[#6b7280]">Avg Ratings</p>
            <p class="mt-2 text-3xl font-semibold text-[#111827]">4.0</p>
            <p class="mt-1 text-xs font-medium text-[#6b7280]">0% vs last week</p>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f4f6]">
            <IconStar class="h-6 w-6 text-[#111827]" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Trips per Day Chart -->
        <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-[#111827] mb-4">Trips per Day</h2>
          <div class="h-64">
            <LineChart :data="tripsChartData" :options="tripsChartOptions" />
          </div>
        </div>

        <!-- Live Courier Map -->
        <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-[#111827] mb-4">Live Courier Map</h2>
          <div class="h-96 bg-[#f3f4f6] rounded-lg relative overflow-hidden">
            <div ref="mapContainer" class="w-full h-full rounded-lg"></div>
          </div>
        </div>
      </div>

      <!-- Right Column - Live Activity Feed -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-[#111827]">Live Activity Feed</h2>
          <button class="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8]">View All</button>
        </div>
        <div class="space-y-4">
          <div class="flex items-start gap-3 pb-4 border-b border-[#e5e7eb]">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbeafe] shrink-0">
              <IconCheck class="h-4 w-4 text-[#2563eb]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[#111827]">Courier #A102 completed delivery #D210</p>
              <p class="mt-1 text-xs text-[#6b7280]">2 mins ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 pb-4 border-b border-[#e5e7eb]">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbeafe] shrink-0">
              <IconCheck class="h-4 w-4 text-[#2563eb]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[#111827]">Courier #A102 completed delivery #D210</p>
              <p class="mt-1 text-xs text-[#6b7280]">2 mins ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 pb-4 border-b border-[#e5e7eb]">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#d1fae5] shrink-0">
              <IconUserPlus class="h-4 w-4 text-[#10b981]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[#111827]">Merchant XYZ joined the platform</p>
              <p class="mt-1 text-xs text-[#6b7280]">8 mins ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 pb-4 border-b border-[#e5e7eb]">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef3c7] shrink-0">
              <IconRefresh class="h-4 w-4 text-[#f59e0b]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[#111827]">Refund #R302 processed successfully</p>
              <p class="mt-1 text-xs text-[#6b7280]">8 mins ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 pb-4 border-b border-[#e5e7eb]">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbeafe] shrink-0">
              <IconDollar class="h-4 w-4 text-[#2563eb]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[#111827]">Payment #12345 received from customer</p>
              <p class="mt-1 text-xs text-[#6b7280]">8 mins ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbeafe] shrink-0">
              <IconDollar class="h-4 w-4 text-[#2563eb]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[#111827]">Payment #12345 received from customer</p>
              <p class="mt-1 text-xs text-[#6b7280]">8 mins ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LineChart from '@/components/charts/LineChart.vue';
import IconDownload from '@/components/icon/icon-download.vue';
import IconDollar from '@/components/icon/icon-dollar-sign-circle.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconStar from '@/components/icon/icon-star.vue';
import IconCheck from '@/components/icon/icon-circle-check.vue';
import IconUserPlus from '@/components/icon/icon-user-plus.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';

const mapContainer = ref<HTMLDivElement | null>(null);
let map: google.maps.Map | null = null;
let markers: google.maps.Marker[] = [];

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'AIzaSyCxK0c-UDughTkIOKtBhacBDEClUgZWGmI';

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

    // Awolowo Road, Ikoyi, Lagos - One of the most notable streets in Lagos
    const lagosCenter = { lat: 6.4481, lng: 3.4300 };

    map = new google.maps.Map(mapContainer.value, {
      center: lagosCenter,
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

    // Add markers for courier locations along Awolowo Road and surrounding areas
    const courierLocations = [
      { lat: 6.4481, lng: 3.4300, title: 'Courier #A102', status: 'Active Delivery' },
      { lat: 6.4500, lng: 3.4320, title: 'Courier #A103', status: 'In Transit' },
      { lat: 6.4460, lng: 3.4280, title: 'Courier #A104', status: 'Active Delivery' },
      { lat: 6.4520, lng: 3.4340, title: 'Courier #A105', status: 'Waiting' },
      { lat: 6.4440, lng: 3.4260, title: 'Courier #A106', status: 'Active Delivery' },
    ];

    courierLocations.forEach((location) => {
      // Create custom marker icon with truck emoji
      const markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#2563eb',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      };

      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title,
        icon: markerIcon,
        animation: google.maps.Animation.DROP,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; min-width: 150px;">
            <strong style="color: #111827; font-size: 14px;">${location.title}</strong><br/>
            <span style="color: #6b7280; font-size: 12px;">${location.status}</span><br/>
            <span style="color: #2563eb; font-size: 11px; margin-top: 4px; display: inline-block;">📍 Awolowo Road, Ikoyi</span>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
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

// Chart Data for Trips per Day
const tripsChartData = ref({
  labels: ['3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM'],
  datasets: [
    {
      label: 'Ride',
      data: [50, 60, 80, 100, 150, 200, 280, 250, 220, 200, 180, 200, 220, 240, 260, 300, 280, 250, 200],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: false,
    },
    {
      label: 'Hike',
      data: [30, 40, 50, 70, 100, 130, 180, 160, 140, 120, 110, 130, 150, 170, 190, 220, 200, 180, 150],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      tension: 0.4,
      fill: false,
    },
    {
      label: 'Parcel',
      data: [20, 25, 30, 40, 60, 80, 120, 100, 90, 80, 70, 85, 95, 110, 130, 150, 140, 120, 100],
      borderColor: '#f97316',
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
      tension: 0.4,
      fill: false,
    },
  ],
});

const tripsChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#6b7280',
      },
    },
    y: {
      beginAtZero: true,
      max: 350,
      grid: {
        color: '#f3f4f6',
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#6b7280',
        stepSize: 50,
      },
    },
  },
});

onMounted(() => {
  initMap();
});

onBeforeUnmount(() => {
  // Clean up markers
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];
  map = null;
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

