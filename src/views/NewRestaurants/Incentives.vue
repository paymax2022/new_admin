<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Rider Performance Reports</h1>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                Create Incentive
            </button>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Active Incentives</span>
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Total Participants</span>
                    <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">960</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Total Paid Out</span>
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">$69,850</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Avg Monthly Cost</span>
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900">$15,240</p>
            </div>
        </div>

        <!-- Tabs and Search Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-4">
                    <button
                        @click="activeTab = 'incentive-programs'"
                        :class="[
                            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                            activeTab === 'incentive-programs' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        ]"
                    >
                        Incentive Programs
                    </button>
                    <button
                        @click="activeTab = 'rider-earnings'"
                        :class="[
                            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                            activeTab === 'rider-earnings' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        ]"
                    >
                        Rider Earnings
                    </button>
                </div>
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            v-model="searchQuery"
                            placeholder="Search by name or email"
                            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                    </div>
                    <select
                        v-model="statusFilter"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Incentive Programs Table -->
        <div v-if="activeTab === 'incentive-programs'" class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-bold text-gray-900">Incentive Programs</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incentive Details</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criteria</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="incentive in filteredIncentives" :key="incentive.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900 max-w-md">{{ incentive.details }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-full',
                                        incentive.type === 'hourly' ? 'bg-blue-100 text-blue-800' :
                                        incentive.type === 'challenge' ? 'bg-purple-100 text-purple-800' :
                                        'bg-gray-100 text-gray-800'
                                    ]"
                                >
                                    {{ incentive.type }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${{ incentive.amount }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">{{ incentive.criteria }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ incentive.duration }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ incentive.participants }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${{ incentive.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-full',
                                        incentive.status === 'active' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    ]"
                                >
                                    {{ incentive.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="relative" @click.stop>
                                    <button
                                        @click.stop="toggleActionsDropdown(incentive.id)"
                                        class="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                    <div
                                        v-if="openActionsDropdowns[incentive.id]"
                                        class="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                    >
                                        <button class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg">
                                            Edit
                                        </button>
                                        <button class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                                            View Details
                                        </button>
                                        <button class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Rider Earnings Tab Content -->
        <div v-if="activeTab === 'rider-earnings'" class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-bold text-gray-900">Rider Incentive Earnings</h3>
            </div>
            <div class="p-6 space-y-6">
                <div v-for="rider in riderEarnings" :key="rider.id" class="border border-gray-200 rounded-lg p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h4 class="text-lg font-bold text-gray-900 mb-1">{{ rider.programName }}</h4>
                            <p class="text-sm text-gray-500">ID: {{ rider.id }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-500 mb-1">Total Incentives</p>
                            <p class="text-lg font-bold text-green-600">${{ rider.totalIncentives.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Incentives Earned -->
                        <div>
                            <h5 class="text-sm font-medium text-gray-700 mb-3">Incentives Earned</h5>
                            <div class="space-y-3">
                                <div v-for="incentive in rider.incentivesEarned" :key="incentive.name" class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">{{ incentive.name }}</p>
                                        <p class="text-xs text-gray-500">{{ incentive.period }}</p>
                                    </div>
                                    <p class="text-sm font-bold text-green-600">${{ incentive.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
                                </div>
                            </div>
                        </div>
                        <!-- Eligible Programs -->
                        <div>
                            <h5 class="text-sm font-medium text-gray-700 mb-3">Eligible Programs</h5>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="program in rider.eligiblePrograms"
                                    :key="program"
                                    class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                                >
                                    {{ program }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const activeTab = ref('incentive-programs');
const searchQuery = ref('');
const statusFilter = ref('all');
const openActionsDropdowns = ref<Record<string, boolean>>({});

const incentives = ref([
    {
        id: 1,
        details: 'Extra $5 per delivery during rush hours (11AM-2PM, 6PM-9PM)',
        type: 'hourly',
        amount: '5.00',
        criteria: 'Active during peak hours',
        duration: '2024-01-01 to 2024-12-31',
        participants: '156',
        totalPaid: 12450.00,
        status: 'active'
    },
    {
        id: 2,
        details: 'Complete 50+ deliveries in a week for $100 bonus',
        type: 'challenge',
        amount: '25.00',
        criteria: '50+ deliveries per week',
        duration: '2024-01-01 to 2024-12-31',
        participants: '56',
        totalPaid: 12450.00,
        status: 'active'
    }
]);

const riderEarnings = ref([
    {
        id: 'R001',
        programName: 'Weekly Challenge',
        totalIncentives: 125.00,
        incentivesEarned: [
            {
                name: 'Peak Hour Bonus',
                period: 'This Month',
                amount: 125.00
            },
            {
                name: 'Weekly Challenge',
                period: 'Last 4 Weeks',
                amount: 125.00
            },
            {
                name: 'Rating Bonus',
                period: 'This Month',
                amount: 125.00
            }
        ],
        eligiblePrograms: ['Peak Hour Bonus', 'Weekly Challenge', 'Rating Bonus']
    },
    {
        id: 'R001',
        programName: 'Weekly Challenge',
        totalIncentives: 125.00,
        incentivesEarned: [
            {
                name: 'Peak Hour Bonus',
                period: 'This Month',
                amount: 125.00
            },
            {
                name: 'Weekly Challenge',
                period: 'Last 4 Weeks',
                amount: 125.00
            },
            {
                name: 'Rating Bonus',
                period: 'This Month',
                amount: 125.00
            }
        ],
        eligiblePrograms: ['Peak Hour Bonus', 'Weekly Challenge', 'Rating Bonus']
    }
]);

const filteredIncentives = computed(() => {
    let filtered = incentives.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (incentive) =>
                incentive.details.toLowerCase().includes(query) ||
                incentive.type.toLowerCase().includes(query) ||
                incentive.criteria.toLowerCase().includes(query)
        );
    }

    // Filter by status
    if (statusFilter.value !== 'all') {
        filtered = filtered.filter(
            (incentive) => incentive.status.toLowerCase() === statusFilter.value.toLowerCase()
        );
    }

    return filtered;
});

const toggleActionsDropdown = (incentiveId: number) => {
    // Close all other dropdowns
    Object.keys(openActionsDropdowns.value).forEach(k => {
        if (k !== incentiveId.toString()) {
            openActionsDropdowns.value[k] = false;
        }
    });
    openActionsDropdowns.value[incentiveId.toString()] = !openActionsDropdowns.value[incentiveId.toString()];
};

const closeAllDropdowns = () => {
    Object.keys(openActionsDropdowns.value).forEach(k => {
        openActionsDropdowns.value[k] = false;
    });
};

onMounted(() => {
    document.addEventListener('click', closeAllDropdowns);
});

onUnmounted(() => {
    document.removeEventListener('click', closeAllDropdowns);
});
</script>

