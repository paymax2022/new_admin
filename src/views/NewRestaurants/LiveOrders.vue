<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Live Orders</h1>
                <p class="text-sm text-gray-500">Real-time order tracking and management</p>
            </div>
            <button
                @click="fetchLiveOrders"
                :disabled="loading"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                <svg 
                    :class="['w-5 h-5', loading ? 'animate-spin' : '']"
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
            </button>
        </div>

        <!-- Order Status Summary Cards -->
        <div class="grid grid-cols-5 gap-4 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Active Orders</p>
                <p class="text-2xl font-bold text-blue-600">{{ orderSummary.active }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Preparing</p>
                <p class="text-2xl font-bold text-yellow-500">{{ orderSummary.preparing }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Ready</p>
                <p class="text-2xl font-bold text-green-600">{{ orderSummary.ready }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Out for Delivery</p>
                <p class="text-2xl font-bold text-gray-500">{{ orderSummary.outForDelivery }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div class="absolute top-3 right-3">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <p class="text-sm text-gray-500 mb-2">Need Rider</p>
                <p class="text-2xl font-bold text-gray-500">{{ orderSummary.needRider }}</p>
            </div>
        </div>

        <!-- Search and Filter Bar -->
        <div class="flex items-center gap-4 mb-6">
            <div class="flex-1 relative">
                <input
                    type="text"
                    placeholder="Q Search res, name, ID..."
                    v-model="searchQuery"
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <div class="relative">
                <select
                    v-model="statusFilter"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                >
                    <option value="all">All</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="out-for-delivery">Out for delivery</option>
                    <option value="delivered">Delivered</option>
                </select>
                <svg class="absolute right-2 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        <!-- Active Orders Section -->
        <div class="mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Active Orders</h2>
        </div>

        <!-- Orders Table -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Progress</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="loading">
                        <td colspan="6" class="px-6 py-8 text-center">
                            <div class="flex items-center justify-center">
                                <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span class="ml-3 text-gray-600">Loading orders...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="filteredOrders.length === 0">
                        <td colspan="6" class="px-6 py-8 text-center text-sm text-gray-500">
                            No orders found
                        </td>
                    </tr>
                    <tr v-else v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                        <!-- Order Details -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ order.orderId }}</div>
                            <div class="text-sm text-gray-500">{{ order.total }} • {{ order.items }} items</div>
                            <div class="text-xs text-gray-400">Ordered: {{ order.orderedTime }}</div>
                        </td>
                        <!-- Customer -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                            <div class="text-sm text-gray-500">{{ order.customer.phone }}</div>
                            <div class="text-sm text-gray-500">{{ order.customer.address }}</div>
                        </td>
                        <!-- Restaurant -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ order.restaurant }}</div>
                        </td>
                        <!-- Rider -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div v-if="order.rider" class="text-sm text-gray-900">{{ order.rider.name }}</div>
                            <div v-if="order.rider" class="text-sm text-gray-500">{{ order.rider.phone }}</div>
                            <div v-else class="text-sm text-red-600 font-medium">No Rider Assigned</div>
                        </td>
                        <!-- Status & Progress -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                :class="[
                                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                                    getStatusClass(order.status)
                                ]"
                            >
                                {{ order.status }}
                            </span>
                        </td>
                        <!-- Timeline -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div v-if="order.eta" class="text-sm text-gray-900">ETA: {{ order.eta }}</div>
                            <div v-if="order.remaining" class="text-sm text-gray-500">{{ order.remaining }} remaining</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const searchQuery = ref('');
const statusFilter = ref('all');
const loading = ref(false);

const orders = ref<any[]>([]);

// Live order statuses to filter - these are statuses that indicate an order is still active/live
// We'll fetch all orders and filter client-side to avoid missing orders due to status value mismatches
const liveOrderStatuses = ['received', 'preparing', 'ready', 'picked_up', 'picked up', 'out_for_delivery', 'out for delivery'];
const excludedStatuses = ['delivered', 'cancelled', 'completed']; // Statuses that are NOT live

// Transform API order data to component format
const transformOrderData = (apiOrder: any, restaurantName: string = 'Unknown Restaurant') => {
    const orderId = apiOrder._id || apiOrder.id || 'N/A';
    
    // Extract total from suggested_price or other fields
    const total = apiOrder.suggested_price || apiOrder.total_amount || apiOrder.total || apiOrder.amount || 0;
    
    // Items count - may need to be calculated from order items if available
    const items = apiOrder.items?.length || apiOrder.item_count || 1;
    
    // Use order_placed_at or created_at for ordered time
    const orderedTime = apiOrder.order_placed_at || apiOrder.created_at
        ? new Date(apiOrder.order_placed_at || apiOrder.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : 'N/A';
    
    // Extract customer info from delivery_info
    const deliveryInfo = apiOrder.delivery_info || {};
    const customer = {
        name: deliveryInfo.receiver_full_name || apiOrder.customer?.name || apiOrder.customer_name || 'N/A',
        phone: deliveryInfo.receiver_mobile || apiOrder.customer?.phone || apiOrder.customer_phone || 'N/A',
        address: deliveryInfo.drop_off_address || deliveryInfo.pick_up_address || apiOrder.delivery_address || apiOrder.address || 'N/A'
    };
    
    // Rider info - check if rider_id is not the default empty ID
    const riderId = apiOrder.rider_id;
    const hasRider = riderId && riderId !== '000000000000000000000000';
    const rider = hasRider && apiOrder.rider ? {
        name: apiOrder.rider.name || 'N/A',
        phone: apiOrder.rider.phone || 'N/A'
    } : null;
    
    // Status - normalize the status value
    const status = (apiOrder.status || 'received').toLowerCase();
    const statusDisplay = formatStatus(status);
    
    // Calculate ETA and remaining time if available
    // Use preparation_time from order_info if available
    const preparationTime = apiOrder.order_info?.preparation_time || 30; // default 30 minutes
    const orderDate = apiOrder.order_placed_at || apiOrder.created_at;
    let eta: string | null = null;
    let remaining: string | null = null;
    
    if (orderDate) {
        const orderDateTime = new Date(orderDate);
        const estimatedDelivery = new Date(orderDateTime.getTime() + preparationTime * 60000);
        eta = estimatedDelivery.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        remaining = calculateRemainingTime(orderDate, estimatedDelivery.toISOString());
    }
    
    return {
        id: orderId,
        orderId: orderId.substring(0, 8).toUpperCase(), // Short ID for display
        total: `₦${parseFloat(total.toString()).toFixed(2)}`,
        items: items,
        orderedTime: orderedTime,
        customer: customer,
        restaurant: restaurantName,
        rider: rider,
        status: statusDisplay,
        statusRaw: status,
        eta: eta,
        remaining: remaining,
        _original: apiOrder
    };
};

// Format status for display
const formatStatus = (status: string): string => {
    const statusLower = status.toLowerCase();
    const statusMap: { [key: string]: string } = {
        'received': 'Received',
        'preparing': 'Preparing',
        'ready': 'Ready',
        'picked_up': 'Out for delivery',
        'picked up': 'Out for delivery',
        'out_for_delivery': 'Out for delivery',
        'out for delivery': 'Out for delivery',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
    };
    return statusMap[statusLower] || status.charAt(0).toUpperCase() + status.slice(1);
};

// Calculate remaining time
const calculateRemainingTime = (createdAt: string, estimatedDelivery: string): string | null => {
    try {
        const created = new Date(createdAt);
        const estimated = new Date(estimatedDelivery);
        const now = new Date();
        const diffMs = estimated.getTime() - now.getTime();
        
        if (diffMs <= 0) return '0:00';
        
        const minutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        return hours > 0 ? `${hours}:${mins.toString().padStart(2, '0')}` : `${mins}:00`;
    } catch (e) {
        return null;
    }
};

// Fetch all live orders from all restaurants
const fetchLiveOrders = async () => {
    loading.value = true;
    orders.value = [];
    
    try {
        // First, get all restaurants using the restaurants/all endpoint
        const restaurantsResponse = await restaurantService.getAllRestaurants(100, 1);
        const restaurantsData = restaurantsResponse.data?.data || restaurantsResponse.data || [];
        
        if (!Array.isArray(restaurantsData) || restaurantsData.length === 0) {
            toast.warning('No restaurants found');
            return;
        }
        
        // Create a map of restaurant ID to name for quick lookup
        const restaurantMap = new Map<string, string>();
        restaurantsData.forEach((restaurant: any) => {
            const id = restaurant._id || restaurant.id;
            const name = restaurant.name || `Restaurant ${id?.substring(0, 8)}`;
            if (id) {
                restaurantMap.set(id, name);
            }
        });
        
        // Fetch orders for each restaurant (without status filter, then filter client-side)
        const orderPromises = Array.from(restaurantMap.keys()).map(async (restaurantId) => {
            try {
                // Fetch all orders for the restaurant (no status filter to get everything)
                const response = await restaurantService.getRestaurantOrders(restaurantId, 1, 100);
                
                // Handle the API response structure: { data: [...], message: "success", ok: true }
                // getRestaurantOrders returns response.data which is the object with data array
                const ordersData = response.data || [];
                let allOrders: any[] = [];
                
                if (Array.isArray(ordersData)) {
                    allOrders = ordersData;
                }
                
                // Filter for live orders client-side (exclude delivered, cancelled, completed)
                const liveOrders = allOrders.filter((order: any) => {
                    const status = (order.status || '').toLowerCase().trim();
                    // Include if status is in liveOrderStatuses or not in excludedStatuses
                    const isLiveStatus = liveOrderStatuses.some(liveStatus => 
                        status === liveStatus.toLowerCase() || 
                        status.includes(liveStatus.toLowerCase())
                    );
                    const isExcluded = excludedStatuses.some(excluded => 
                        status === excluded.toLowerCase() || 
                        status.includes(excluded.toLowerCase())
                    );
                    return isLiveStatus || (!isExcluded && status && status !== '');
                });
                
                const restaurantName = restaurantMap.get(restaurantId) || `Restaurant ${restaurantId.substring(0, 8)}`;
                return { restaurantId, restaurantName, orders: liveOrders };
            } catch (error) {
                console.error(`Error fetching orders for restaurant ${restaurantId}:`, error);
                return { restaurantId, restaurantName: restaurantMap.get(restaurantId) || 'Unknown', orders: [] };
            }
        });
        
        const results = await Promise.all(orderPromises);
        
        // Transform and combine all orders
        const allTransformedOrders: any[] = [];
        results.forEach(({ restaurantId, restaurantName, orders: restaurantOrders }) => {
            restaurantOrders.forEach((order: any) => {
                allTransformedOrders.push(transformOrderData(order, restaurantName));
            });
        });
        
        orders.value = allTransformedOrders;
        
        // Log for debugging
        console.log('Total restaurants:', restaurantMap.size);
        console.log('Total live orders found:', orders.value.length);
        console.log('Orders by status:', orders.value.reduce((acc: any, order: any) => {
            acc[order.statusRaw] = (acc[order.statusRaw] || 0) + 1;
            return acc;
        }, {}));
        
        if (orders.value.length === 0) {
            toast.info('No live orders found. Live orders are orders with status: Received, Preparing, Ready, or Out for Delivery (excluding Delivered and Cancelled)');
        } else {
            toast.success(`Loaded ${orders.value.length} live order(s)`);
        }
    } catch (error: any) {
        console.error('Error fetching live orders:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load live orders';
        toast.error(errorMessage);
        orders.value = [];
    } finally {
        loading.value = false;
    }
};

// Fetch orders on mount
onMounted(() => {
    fetchLiveOrders();
});

const filteredOrders = computed(() => {
    let filtered = orders.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (order) =>
                order.orderId.toLowerCase().includes(query) ||
                order.customer.name.toLowerCase().includes(query) ||
                order.restaurant.toLowerCase().includes(query)
        );
    }

    // Filter by status
    if (statusFilter.value !== 'all') {
        filtered = filtered.filter((order) => {
            const status = order.status.toLowerCase().replace(/\s+/g, '-');
            const statusRaw = order.statusRaw?.toLowerCase() || '';
            
            // Map filter values to API status values
            const statusMap: { [key: string]: string[] } = {
                'preparing': ['preparing'],
                'ready': ['ready'],
                'out-for-delivery': ['picked_up', 'out_for_delivery'],
                'delivered': ['delivered']
            };
            
            if (statusFilter.value in statusMap) {
                return statusMap[statusFilter.value].includes(statusRaw);
            }
            
            return status === statusFilter.value;
        });
    }

    return filtered;
});

// Calculate summary statistics
const orderSummary = computed(() => {
    const active = orders.value.length;
    const preparing = orders.value.filter(o => o.statusRaw === 'preparing').length;
    const ready = orders.value.filter(o => o.statusRaw === 'ready').length;
    const outForDelivery = orders.value.filter(o => o.statusRaw === 'picked_up' || o.statusRaw === 'out_for_delivery').length;
    const needRider = orders.value.filter(o => o.statusRaw === 'ready' && !o.rider).length;
    
    return {
        active,
        preparing,
        ready,
        outForDelivery,
        needRider
    };
});

const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'ready') {
        return 'bg-purple-100 text-purple-800';
    } else if (statusLower === 'preparing') {
        return 'bg-yellow-100 text-yellow-800';
    } else if (statusLower === 'out for delivery') {
        return 'bg-green-100 text-green-800';
    } else if (statusLower === 'delivered') {
        return 'bg-gray-100 text-gray-800';
    }
    return 'bg-gray-100 text-gray-800';
};
</script>

