<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Commission Configuration</h1>
                    <p class="text-sm text-gray-500 mt-1">Manage commission tiers and custom rates for restaurants</p>
                </div>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                    Custom Commission
                </button>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Avg Commission Rate</span>
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">16.1%</p>
                <p class="text-sm text-gray-500">Across all tiers</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Total Restaurants</span>
                    <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">291</p>
                <p class="text-sm text-gray-500">All commission tiers</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Custom Commissions</span>
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">1</p>
                <p class="text-sm text-gray-500">Active agreements</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Revenue Impact</span>
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">+12.3%</p>
                <p class="text-sm text-gray-500">vs last month</p>
            </div>
        </div>

        <!-- Tabs Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-4">
                <button
                    @click="activeTab = 'commission-tiers'"
                    :class="[
                        'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                        activeTab === 'commission-tiers' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                    ]"
                >
                    Commission Tiers
                </button>
                <button
                    @click="activeTab = 'custom-commission'"
                    :class="[
                        'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                        activeTab === 'custom-commission' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                    ]"
                >
                    Custom Commission
                </button>
            </div>
        </div>

        <!-- Commission Tiers Content -->
        <div v-if="activeTab === 'commission-tiers'" class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="mb-6">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Commission Tiers</h3>
                <p class="text-sm text-gray-500">Manage standard commission rates based on restaurant performance</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="tier in commissionTiers" :key="tier.id" class="border border-gray-200 rounded-lg p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h4 class="text-lg font-bold text-gray-900 mb-1">{{ tier.name }}</h4>
                            <p class="text-sm text-gray-500">{{ tier.description }}</p>
                        </div>
                        <span class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Active
                        </span>
                    </div>
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-500">Commission Rate</span>
                            <span class="text-sm font-bold text-gray-900">{{ tier.rate }}%</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-500">Volume Threshold</span>
                            <span class="text-sm font-medium text-gray-900">{{ tier.threshold }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-500">Restaurants</span>
                            <span class="text-sm font-medium text-gray-900">{{ tier.restaurants }}</span>
                        </div>
                    </div>
                    <button @click="openEditModal(tier)" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors">
                        Edit
                    </button>
                </div>
            </div>
        </div>

        <!-- Custom Commission Tab Content -->
        <div v-if="activeTab === 'custom-commission'" class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Custom Commission</h3>
                <p class="text-sm text-gray-500">Manage custom commission rates for specific restaurants</p>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Rate</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custom Rate</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="customCommission in customCommissions" :key="customCommission.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <span class="text-sm font-semibold text-gray-600">{{ customCommission.restaurant.charAt(0) }}</span>
                                    </div>
                                    <div class="text-sm font-medium text-gray-900">{{ customCommission.restaurant }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ customCommission.currentRate }}%</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{{ customCommission.customRate }}%</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ customCommission.effectiveDate }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ customCommission.expiryDate }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-full',
                                        customCommission.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                    ]"
                                >
                                    {{ customCommission.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Edit Commission Tier Modal -->
        <TransitionRoot appear :show="showEditModal" as="template">
            <Dialog as="div" @close="closeEditModal" class="relative z-50">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel @click.stop class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <h2 class="text-2xl font-bold text-gray-900">Edit Commission Tier</h2>
                                    <p class="text-sm text-gray-500 mt-1">Update tier details and commission rates</p>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <div class="space-y-6">
                                        <!-- Tier Name -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Tier Name</label>
                                            <div class="relative">
                                                <input
                                                    type="text"
                                                    v-model="editingTier.name"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                >
                                                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        <!-- Description -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                            <div class="relative">
                                                <input
                                                    type="text"
                                                    v-model="editingTier.description"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                >
                                                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        <!-- Commission Rate -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                                            <div class="relative">
                                                <input
                                                    type="number"
                                                    v-model="editingTier.rate"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                >
                                                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        <!-- Volume Threshold -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Volume of Threshold ($)</label>
                                            <div class="relative">
                                                <input
                                                    type="number"
                                                    v-model="editingTier.thresholdValue"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                >
                                                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        <!-- Active Toggle -->
                                        <div class="flex items-center justify-between">
                                            <label class="block text-sm font-medium text-gray-700">Active</label>
                                            <button
                                                @click="editingTier.active = !editingTier.active"
                                                :class="[
                                                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                                    editingTier.active ? 'bg-gray-600' : 'bg-gray-300'
                                                ]"
                                            >
                                                <span
                                                    :class="[
                                                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                                        editingTier.active ? 'translate-x-6' : 'translate-x-1'
                                                    ]"
                                                ></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        @click.stop="closeEditModal"
                                        class="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                    <button
                                        @click.stop="saveTierChanges"
                                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

const activeTab = ref('commission-tiers');
const showEditModal = ref(false);
const editingTier = ref<any>(null);

const customCommissions = ref([
    {
        id: 1,
        restaurant: 'Mama put',
        currentRate: '15',
        customRate: '12',
        effectiveDate: '12/31/2024',
        expiryDate: '12/31/2025',
        status: 'Active'
    },
    {
        id: 2,
        restaurant: 'Mama put',
        currentRate: '15',
        customRate: '12',
        effectiveDate: '12/31/2024',
        expiryDate: '12/31/2025',
        status: 'Inactive'
    }
]);

const commissionTiers = ref([
    {
        id: 1,
        name: 'Basic',
        description: 'Entry level for every restaurant',
        rate: '18',
        threshold: '$0/month',
        thresholdValue: 0,
        restaurants: '156',
        active: true
    },
    {
        id: 2,
        name: 'Standard',
        description: 'For established restaurants',
        rate: '15',
        threshold: '$250,000/month',
        thresholdValue: 250000,
        restaurants: '15',
        active: true
    },
    {
        id: 3,
        name: 'Premium',
        description: 'High volume restaurants',
        rate: '12',
        threshold: '$100,000/month',
        thresholdValue: 100000,
        restaurants: '23',
        active: true
    },
    {
        id: 4,
        name: 'Enterprise',
        description: 'Large restaurant chains',
        rate: '10',
        threshold: '$250,000/month',
        thresholdValue: 250000,
        restaurants: '15',
        active: true
    }
]);

const openEditModal = (tier: any) => {
    // Parse threshold value from string like "$250,000/month" or "$0/month"
    let thresholdValue = 0;
    if (tier.thresholdValue) {
        thresholdValue = tier.thresholdValue;
    } else {
        const match = tier.threshold.match(/\$([\d,]+)/);
        if (match) {
            thresholdValue = parseInt(match[1].replace(/,/g, '')) || 0;
        }
    }
    
    editingTier.value = {
        ...tier,
        thresholdValue: thresholdValue
    };
    showEditModal.value = true;
};

const closeEditModal = (event?: Event) => {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    showEditModal.value = false;
    editingTier.value = null;
};

const saveTierChanges = () => {
    if (editingTier.value) {
        const tier = commissionTiers.value.find(t => t.id === editingTier.value.id);
        if (tier) {
            tier.name = editingTier.value.name;
            tier.description = editingTier.value.description;
            tier.rate = editingTier.value.rate;
            tier.thresholdValue = editingTier.value.thresholdValue;
            tier.threshold = `$${editingTier.value.thresholdValue.toLocaleString('en-US')}/month`;
            tier.active = editingTier.value.active;
        }
    }
    closeEditModal();
};
</script>

