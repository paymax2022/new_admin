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
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{{ loading ? '...' : stats.totalTrips.toLocaleString() }}</p>
                            <p :class="['text-xs font-semibold', totalTripsChange.isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400']">{{ totalTripsChange.label }}</p>
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
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{{ loading ? '...' : stats.activeDrivers }}</p>
                            <p :class="['text-xs font-semibold', activeDriversChange.isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400']">{{ activeDriversChange.label }}</p>
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
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{{ loading ? '...' : `₦${stats.revenueToday.toLocaleString()}` }}</p>
                            <p :class="['text-xs font-semibold', revenueChange.isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400']">{{ revenueChange.label }}</p>
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
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{{ loading ? '...' : `${Math.round(stats.averageDeliveryTime)} mins` }}</p>
                            <p :class="['text-xs font-semibold', averageDeliveryTimeChange.isIncrease ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400']">{{ averageDeliveryTimeChange.label }}</p>
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
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{{ loading ? '...' : stats.pendingDeliveries }}</p>
                            <p :class="['text-xs font-semibold', pendingDeliveriesChange.isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400']">{{ pendingDeliveriesChange.label }}</p>
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
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{{ loading ? '...' : stats.cancellations }}</p>
                            <p :class="['text-xs font-semibold', cancellationsChange.isIncrease ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400']">{{ cancellationsChange.label }}</p>
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
                        <span class="text-xs text-gray-700 dark:text-gray-300">Available ({{ availableCount }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-xs text-gray-700 dark:text-gray-300">Busy ({{ busyCount }})</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useToast } from 'vue-toastification'
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
import deliveryService from '@/services/deliveryService'

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

// Dashboard stats
const stats = ref({
    totalTrips: 0,
    activeDrivers: 0,
    revenueToday: 0,
    averageDeliveryTime: 0,
    pendingDeliveries: 0,
    openDisputes: 0,
    cancellations: 0
})

// Comparison stats (for percentage calculations)
const comparisonStats = ref({
    totalTripsLastWeek: 0,
    activeDriversLastWeek: 0,
    revenueYesterday: 0,
    averageDeliveryTimeLastWeek: 0,
    pendingDeliveriesLastWeek: 0,
    openDisputesLastWeek: 0,
    cancellationsLastWeek: 0
})

const loading = ref(false)
const toast = useToast()
const availableCount = ref(0)
const busyCount = ref(0)

// Get date range for API calls
const getDateRange = () => {
    const today = new Date()
    const ranges = {
        today: {
            start: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0],
            end: today.toISOString().split('T')[0]
        },
        '7days': {
            start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            end: today.toISOString().split('T')[0]
        },
        '30days': {
            start: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            end: today.toISOString().split('T')[0]
        },
        '60days': {
            start: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            end: today.toISOString().split('T')[0]
        }
    }
    const selected = dateRangeOptions.find(opt => opt.label === selectedDateRange.value)
    return ranges[selected?.value as keyof typeof ranges] || ranges.today
}

// Helper function to calculate percentage change
const calculatePercentageChange = (current: number, previous: number): { value: number; isIncrease: boolean } => {
    if (previous === 0) {
        return { value: current > 0 ? 100 : 0, isIncrease: current > 0 }
    }
    const change = ((current - previous) / previous) * 100
    return { value: Math.abs(change), isIncrease: change > 0 }
}

// Fetch dashboard data
const fetchDashboardData = async () => {
    loading.value = true
    try {
        const dateRange = getDateRange()
        const today = new Date()

        // Calculate comparison date ranges
        const lastWeekStart = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        const lastWeekEnd = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        const yesterdayStart = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        const yesterdayEnd = yesterdayStart

        // Fetch current metrics, comparison metrics, orders, and riders in parallel
        const [metricsRes, lastWeekMetricsRes, yesterdayMetricsRes, ordersRes, ridersRes] = await Promise.all([
            deliveryService.getDeliveryMetrics({
                start_date: dateRange.start,
                end_date: dateRange.end
            }).catch((err) => {
                if (process.env.NODE_ENV === 'development') {
                    console.error('[DeliveryHome] Error fetching metrics:', err)
                }
                return null
            }),
            deliveryService.getDeliveryMetrics({
                start_date: lastWeekStart,
                end_date: lastWeekEnd
            }).catch((err) => {
                if (process.env.NODE_ENV === 'development') {
                    console.error('[DeliveryHome] Error fetching last week metrics:', err)
                }
                return null
            }),
            deliveryService.getDeliveryMetrics({
                start_date: yesterdayStart,
                end_date: yesterdayEnd
            }).catch((err) => {
                if (process.env.NODE_ENV === 'development') {
                    console.error('[DeliveryHome] Error fetching yesterday metrics:', err)
                }
                return null
            }),
            deliveryService.getAllOrders({
                page: 1,
                limit: 1000
            }).catch((err) => {
                if (process.env.NODE_ENV === 'development') {
                    console.error('[DeliveryHome] Error fetching orders:', err)
                }
                return null
            }),
            // Try fetching all riders first, then filter client-side for active ones
            deliveryService.getAllRiders({
                page: 1,
                limit: 1000
            }).catch((err) => {
                if (process.env.NODE_ENV === 'development') {
                    console.error('[DeliveryHome] Error fetching riders:', err)
                }
                return null
            })
        ])

        // Helper function to extract metrics from response
        const extractMetrics = (res: any) => {
            if (!res?.data) return {}
            if (res.data.data && typeof res.data.data === 'object') {
                return res.data.data
            } else if (res.data.ok && res.data.data) {
                return res.data.data
            }
            return res.data
        }

        const metrics = extractMetrics(metricsRes)
        const lastWeekMetrics = extractMetrics(lastWeekMetricsRes)
        const yesterdayMetrics = extractMetrics(yesterdayMetricsRes)

        const ordersData = ordersRes?.data?.data || {}
        const orders: any[] = Array.isArray(ordersData) ? ordersData : ((ordersData as any).data || [])
        const ridersData = ridersRes?.data?.data || {}
        const allRiders: any[] = Array.isArray(ridersData) ? ridersData : ((ridersData as any).data || (ridersData as any).riders || [])

        // Filter active riders client-side based on status field
        const activeRiders = allRiders.filter((rider: any) => {
            const status = (rider.status || '').toLowerCase()
            const availability = (rider.availability_status || '').toLowerCase()
            // Consider riders active if status is 'active' or availability is 'available'
            return status === 'active' || availability === 'available' || status === 'online'
        })

        // Update stats - using correct field names from API response
        stats.value.totalTrips = metrics.total_orders || orders.length || 0
        stats.value.activeDrivers = metrics.active_riders || activeRiders.length || 0
        stats.value.revenueToday = metrics.total_revenue || 0
        stats.value.averageDeliveryTime = metrics.average_delivery_time_minutes || metrics.average_delivery_time || 0
        stats.value.pendingDeliveries = orders.filter((o: any) => {
            const status = (o.status || '').toLowerCase()
            return status === 'pending' || status === 'assigned'
        }).length || 0
        stats.value.cancellations = metrics.cancelled_orders || orders.filter((o: any) => {
            const status = (o.status || '').toLowerCase()
            return status === 'cancelled'
        }).length || 0

        // Update comparison stats from last week and yesterday metrics
        comparisonStats.value.totalTripsLastWeek = lastWeekMetrics.total_orders || 0
        comparisonStats.value.activeDriversLastWeek = lastWeekMetrics.active_riders || 0
        comparisonStats.value.revenueYesterday = yesterdayMetrics.total_revenue || 0
        comparisonStats.value.averageDeliveryTimeLastWeek = lastWeekMetrics.average_delivery_time_minutes || lastWeekMetrics.average_delivery_time || 0
        comparisonStats.value.pendingDeliveriesLastWeek = lastWeekMetrics.orders_by_status?.pending || 0
        comparisonStats.value.cancellationsLastWeek = lastWeekMetrics.cancelled_orders || 0
        // Note: Disputes would come from a separate disputes endpoint if available

    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || error?.message || 'Failed to load dashboard data'
        toast.error(errorMessage)
        if (process.env.NODE_ENV === 'development') {
            console.error('[DeliveryHome] fetchDashboardData error:', error)
        }
    } finally {
        loading.value = false
    }
}

const selectDateRange = async (value: string) => {
    const option = dateRangeOptions.find(opt => opt.value === value)
    if (option) {
        selectedDateRange.value = option.label
        await fetchDashboardData()
    }
    closeDateDropdown()
}

// Computed properties for percentage changes
const totalTripsChange = computed(() => {
    const change = calculatePercentageChange(stats.value.totalTrips, comparisonStats.value.totalTripsLastWeek)
    return {
        value: change.value.toFixed(1),
        isIncrease: change.isIncrease,
        label: `${change.isIncrease ? '↑' : '↓'} ${change.value.toFixed(1)}% vs last week`
    }
})

const activeDriversChange = computed(() => {
    const change = calculatePercentageChange(stats.value.activeDrivers, comparisonStats.value.activeDriversLastWeek)
    return {
        value: change.value.toFixed(1),
        isIncrease: change.isIncrease,
        label: `${change.isIncrease ? '↑' : '↓'} ${change.value.toFixed(1)}% vs last week`
    }
})

const revenueChange = computed(() => {
    const change = calculatePercentageChange(stats.value.revenueToday, comparisonStats.value.revenueYesterday)
    return {
        value: change.value.toFixed(1),
        isIncrease: change.isIncrease,
        label: `${change.isIncrease ? '↑' : '↓'} ${change.value.toFixed(1)}% vs yesterday`
    }
})

const averageDeliveryTimeChange = computed(() => {
    const change = calculatePercentageChange(stats.value.averageDeliveryTime, comparisonStats.value.averageDeliveryTimeLastWeek)
    return {
        value: change.value.toFixed(1),
        isIncrease: change.isIncrease,
        label: `${change.isIncrease ? '↑' : '↓'} ${change.value.toFixed(1)}% vs last week`
    }
})

const pendingDeliveriesChange = computed(() => {
    const change = calculatePercentageChange(stats.value.pendingDeliveries, comparisonStats.value.pendingDeliveriesLastWeek)
    return {
        value: change.value.toFixed(1),
        isIncrease: change.isIncrease,
        label: `${change.isIncrease ? '↑' : '↓'} ${change.value.toFixed(1)}% vs last week`
    }
})

const cancellationsChange = computed(() => {
    const change = calculatePercentageChange(stats.value.cancellations, comparisonStats.value.cancellationsLastWeek)
    return {
        value: change.value.toFixed(1),
        isIncrease: change.isIncrease,
        label: `${change.isIncrease ? '↑' : '↓'} ${change.value.toFixed(1)}% vs last week`
    }
})


// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'AIzaSyABaUOSZbdkQ8iT2U4bcKg9Surc2cX9Tbw';

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

// Initialize map with real rider locations
const initMap = async () => {
  if (!mapContainer.value) return;

  try {
    await loadGoogleMaps();

    // Fetch riders from the riders endpoint
    let allRiders: any[] = []
    let riderLocations: any[] = []

    try {
      const ridersRes = await deliveryService.getAllRiders({
        page: 1,
        limit: 1000
      })
      const ridersData: any = ridersRes?.data?.data || {}
      allRiders = Array.isArray(ridersData) ? ridersData : (ridersData.data || ridersData.riders || [])

      // Try to fetch rider locations if available
      try {
        const locationsRes = await deliveryService.getAllRiderLocations()
        riderLocations = locationsRes?.data?.data || []
      } catch (error) {
        // Location fetch failed, will use default locations
      }
    } catch (error) {
      console.error('Error fetching riders:', error)
    }

    // Create a map of rider locations by rider_id
    const locationsMap = new Map()
    riderLocations.forEach((loc: any) => {
      const riderId = loc.rider_id || loc._id
      if (riderId) {
        locationsMap.set(riderId, loc)
      }
    })

    // Use first rider location as center, or default to Lagos, Nigeria (based on user's data showing Nigeria)
    let mapCenter = { lat: 6.5244, lng: 3.3792 } // Lagos, Nigeria
    if (riderLocations.length > 0 && riderLocations[0].latitude && riderLocations[0].longitude) {
      mapCenter = { lat: riderLocations[0].latitude, lng: riderLocations[0].longitude }
    } else if (allRiders.length > 0) {
      // Use first rider's location if available in location map
      const firstRiderId = allRiders[0]._id || allRiders[0].rider_id || allRiders[0].id
      const firstRiderLocation = locationsMap.get(firstRiderId)
      if (firstRiderLocation && firstRiderLocation.latitude && firstRiderLocation.longitude) {
        mapCenter = { lat: firstRiderLocation.latitude, lng: firstRiderLocation.longitude }
      }
    }

    map = new google.maps.Map(mapContainer.value, {
      center: mapCenter,
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

    // Add real riders to map using riders from getAllRiders endpoint
    let localAvailableCount = 0
    let localBusyCount = 0

    allRiders.forEach((rider: any, index: number) => {
      const riderId = rider._id || rider.rider_id || rider.id
      const riderLocation = locationsMap.get(riderId)

      // Get location from location map if available, otherwise use default location with small offset
      let lat: number
      let lng: number

      if (riderLocation && riderLocation.latitude && riderLocation.longitude) {
        lat = riderLocation.latitude
        lng = riderLocation.longitude
      } else {
        // Use default location with small offset per rider if no location data
        const offset = (index % 10) * 0.01 // Small offset to spread markers
        lat = mapCenter.lat + offset
        lng = mapCenter.lng + offset
      }

      const status = (rider.status || '').toLowerCase()
      const availability = (rider.availability_status || '').toLowerCase()
      const isAvailable = status === 'online' || status === 'active' || availability === 'available'

      const riderName = `${rider.first_name || ''} ${rider.last_name || ''}`.trim() || rider.name || `Rider ${index + 1}`
      const riderPhone = rider.phone_number || rider.phone || 'N/A'
      const riderVehicle = rider.vehicle_type || rider.transport_mode || 'N/A'

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: riderName,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: isAvailable ? '#10b981' : '#ef4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      if (isAvailable) localAvailableCount++
      else localBusyCount++

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; min-width: 150px;">
            <strong style="color: #111827; font-size: 14px;">${riderName}</strong><br/>
            <span style="color: #6b7280; font-size: 12px;">Status: ${status || 'Unknown'}</span><br/>
            <span style="color: #6b7280; font-size: 12px;">Phone: ${riderPhone}</span><br/>
            <span style="color: #6b7280; font-size: 12px;">Vehicle: ${riderVehicle}</span>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });

    // Update reactive counts for legend
    availableCount.value = localAvailableCount
    busyCount.value = localBusyCount
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
            enabled: true,
            callbacks: {
                label: function(context: any) {
                    return `₦${context.parsed.y.toLocaleString()}`
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 4000,
            ticks: {
                stepSize: 1000,
                callback: function(value: any) {
                    return `₦${value.toLocaleString()}`
                }
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

onMounted(async () => {
  await fetchDashboardData()
  await initMap()

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
