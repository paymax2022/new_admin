<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Rider Registration & Approval</h1>
            <div class="flex items-center gap-4">
                <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>
                <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors">
                    Export Data
                </button>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Total Applications</span>
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">{{ kpiStats.total }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Pending Review</span>
                    <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">{{ kpiStats.pending }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Approved</span>
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">{{ kpiStats.approved }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Rejection Rate</span>
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">{{ kpiStats.rejectionRate }}%</p>
            </div>
        </div>

        <!-- Search and Filter Bar -->
        <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-4">
                <div class="flex-1 relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Q Search by name or email"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>
                <select
                    v-model="statusFilter"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </div>

        <!-- Rider Applications Table -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider Info</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                                    <span class="ml-3 text-gray-600">Loading riders...</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-else-if="riders.length === 0">
                            <td colspan="6" class="px-6 py-8 text-center text-sm text-gray-500">No riders found</td>
                        </tr>
                        <tr v-else v-for="rider in filteredRiders" :key="rider.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold', getAvatarColor(rider.id)]">
                                        {{ rider.name.charAt(0) }}
                                    </div>
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">{{ rider.name }}</div>
                                        <div class="text-xs text-gray-500">ID: {{ rider.id }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">{{ rider.email }}</div>
                                <div class="text-sm text-gray-500">{{ rider.phone }}</div>
                                <div class="text-sm text-gray-500">{{ rider.location }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                    {{ rider.vehicle }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ rider.appliedDate }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="space-y-1">
                                    <div v-for="(doc, docIndex) in rider.documents" :key="doc.name" class="flex items-center justify-between gap-2">
                                        <span class="text-sm text-gray-900 font-medium">{{ doc.name }}:</span>
                                        <div class="relative" @click.stop>
                                            <button
                                                @click.stop="toggleDocumentDropdown(rider.id, docIndex)"
                                                :class="[
                                                    'px-3 py-1 text-xs font-medium rounded-lg transition-colors',
                                                    doc.status === 'Uploaded' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                                                    doc.status === 'Pending' ? 'bg-orange-500 text-white hover:bg-orange-600' :
                                                    'bg-red-500 text-white hover:bg-red-600'
                                                ]"
                                            >
                                                {{ doc.status }}
                                            </button>
                                            <div
                                                v-if="openDocumentDropdowns[`${rider.id}-${docIndex}`]"
                                                class="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                            >
                                                <button
                                                    @click.stop="updateDocumentStatus(rider.id, docIndex, 'Pending')"
                                                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                                                >
                                                    Pending
                                                </button>
                                                <button
                                                    @click.stop="updateDocumentStatus(rider.id, docIndex, 'Approved')"
                                                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    Approved
                                                </button>
                                                <button
                                                    @click.stop="updateDocumentStatus(rider.id, docIndex, 'Rejected')"
                                                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                                                >
                                                    Rejected
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="relative" @click.stop>
                                    <button
                                        @click.stop="toggleStatusDropdown(rider.id)"
                                        :class="[
                                            'px-3 py-1 text-xs font-medium rounded-full transition-colors',
                                            rider.status === 'Pending' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                                            rider.status === 'Approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                            'bg-red-100 text-red-800 hover:bg-red-200'
                                        ]"
                                    >
                                        {{ rider.status }}
                                    </button>
                                    <div
                                        v-if="openStatusDropdowns[rider.id]"
                                        class="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                    >
                                        <button
                                            @click.stop="updateRiderStatus(rider.id, 'Pending')"
                                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                                        >
                                            Pending
                                        </button>
                                        <button
                                            @click.stop="updateRiderStatus(rider.id, 'Approved')"
                                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Approved
                                        </button>
                                        <button
                                            @click.stop="updateRiderStatus(rider.id, 'Rejected')"
                                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                                        >
                                            Rejected
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const searchQuery = ref('');
const statusFilter = ref('all');
const loading = ref(false);
const openDocumentDropdowns = ref<Record<string, boolean>>({});
const openStatusDropdowns = ref<Record<string, boolean>>({});

const riders = ref<any[]>([]);

// Transform API rider data to component format
const transformRiderData = (apiRider: any) => {
    const fullName = `${apiRider.first_name || ''} ${apiRider.last_name || ''}`.trim() || 'Unknown Rider';
    const location = apiRider.local_district || apiRider.address || `${apiRider.city || ''}, ${apiRider.state || ''}`.trim() || 'N/A';
    const vehicle = apiRider.vehicle_type || apiRider.transport_mode || 'N/A';
    
    // Format applied date (use created_at if available, otherwise current date)
    const appliedDate = apiRider.created_at 
        ? new Date(apiRider.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    // Build documents array from available photos
    const documents: any[] = [];
    if (apiRider.driving_license_photo_front || apiRider.driving_license_photo_back) {
        documents.push({ 
            name: 'License', 
            status: (apiRider.driving_license_photo_front && apiRider.driving_license_photo_back) ? 'Uploaded' : 'Pending',
            front: apiRider.driving_license_photo_front,
            back: apiRider.driving_license_photo_back
        });
    }
    if (apiRider.driver_photo) {
        documents.push({ 
            name: 'Driver Photo', 
            status: 'Uploaded',
            url: apiRider.driver_photo
        });
    }
    if (apiRider.vehicle_image) {
        documents.push({ 
            name: 'Vehicle', 
            status: 'Uploaded',
            url: apiRider.vehicle_image
        });
    }
    
    // Default to at least one document entry if none exist
    if (documents.length === 0) {
        documents.push({ name: 'License', status: 'Pending' });
        documents.push({ name: 'Driver Photo', status: 'Pending' });
        documents.push({ name: 'Vehicle', status: 'Pending' });
    }
    
    // Map status - API might have different status values
    // Default to 'Pending' if status is not explicitly approved/rejected
    let status = 'Pending';
    if (apiRider.status === 'approved' || apiRider.approved === true) {
        status = 'Approved';
    } else if (apiRider.status === 'rejected' || apiRider.rejected === true) {
        status = 'Rejected';
    } else if (apiRider.status === 'online' || apiRider.status === 'active') {
        // Online/active riders are likely approved
        status = 'Approved';
    }
    
    return {
        id: apiRider._id || apiRider.id || 'N/A',
        name: fullName,
        email: apiRider.email || 'N/A',
        phone: apiRider.phone_number || apiRider.phone || 'N/A',
        location: location,
        vehicle: vehicle,
        appliedDate: appliedDate,
        documents: documents,
        status: status,
        _original: apiRider
    };
};

// Fetch all riders
const fetchRiders = async () => {
    loading.value = true;
    try {
        const response = await restaurantService.getRiders();
        const ridersData = response.data?.riders || response.riders || [];
        
        if (Array.isArray(ridersData)) {
            riders.value = ridersData.map(transformRiderData);
        } else {
            riders.value = [];
        }
        
        if (riders.value.length === 0) {
            toast.info('No riders found');
        } else {
            toast.success(`Loaded ${riders.value.length} rider(s)`);
        }
    } catch (error: any) {
        console.error('Error fetching riders:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load riders';
        toast.error(errorMessage);
        riders.value = [];
    } finally {
        loading.value = false;
    }
};

// KPI Stats computed from riders data
const kpiStats = computed(() => {
    const total = riders.value.length;
    const pending = riders.value.filter(r => r.status === 'Pending').length;
    const approved = riders.value.filter(r => r.status === 'Approved').length;
    const rejected = riders.value.filter(r => r.status === 'Rejected').length;
    const rejectionRate = total > 0 ? Math.round((rejected / total) * 100) : 0;
    
    return {
        total,
        pending,
        approved,
        rejected,
        rejectionRate
    };
});

const filteredRiders = computed(() => {
    let filtered = riders.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (rider) =>
                rider.name.toLowerCase().includes(query) ||
                rider.email.toLowerCase().includes(query)
        );
    }

    // Filter by status
    if (statusFilter.value !== 'all') {
        filtered = filtered.filter(
            (rider) => rider.status.toLowerCase() === statusFilter.value.toLowerCase()
        );
    }

    return filtered;
});

const getAvatarColor = (id: string) => {
    const colors = ['bg-green-500', 'bg-amber-700', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
    const index = parseInt(id.replace('R', '')) % colors.length;
    return colors[index] || 'bg-gray-500';
};

const toggleDocumentDropdown = (riderId: string, docIndex: number) => {
    const key = `${riderId}-${docIndex}`;
    // Close all other dropdowns
    Object.keys(openDocumentDropdowns.value).forEach(k => {
        if (k !== key) {
            openDocumentDropdowns.value[k] = false;
        }
    });
    Object.keys(openStatusDropdowns.value).forEach(k => {
        openStatusDropdowns.value[k] = false;
    });
    openDocumentDropdowns.value[key] = !openDocumentDropdowns.value[key];
};

const toggleStatusDropdown = (riderId: string) => {
    // Close all other dropdowns
    Object.keys(openDocumentDropdowns.value).forEach(k => {
        openDocumentDropdowns.value[k] = false;
    });
    Object.keys(openStatusDropdowns.value).forEach(k => {
        if (k !== riderId) {
            openStatusDropdowns.value[k] = false;
        }
    });
    openStatusDropdowns.value[riderId] = !openStatusDropdowns.value[riderId];
};

const updateDocumentStatus = (riderId: string, docIndex: number, status: string) => {
    const rider = riders.value.find(r => r.id === riderId);
    if (rider && rider.documents[docIndex]) {
        // Map "Approved" to "Uploaded" for display
        rider.documents[docIndex].status = status === 'Approved' ? 'Uploaded' : status;
    }
    openDocumentDropdowns.value[`${riderId}-${docIndex}`] = false;
};

const updateRiderStatus = (riderId: string, status: string) => {
    const rider = riders.value.find(r => r.id === riderId);
    if (rider) {
        rider.status = status;
    }
    openStatusDropdowns.value[riderId] = false;
};

const closeAllDropdowns = () => {
    Object.keys(openDocumentDropdowns.value).forEach(k => {
        openDocumentDropdowns.value[k] = false;
    });
    Object.keys(openStatusDropdowns.value).forEach(k => {
        openStatusDropdowns.value[k] = false;
    });
};

onMounted(() => {
    document.addEventListener('click', closeAllDropdowns);
    fetchRiders();
});

onUnmounted(() => {
    document.removeEventListener('click', closeAllDropdowns);
});
</script>

