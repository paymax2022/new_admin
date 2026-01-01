<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Payouts Management</h1>
            <p class="text-sm text-gray-500">Process and track restaurant payouts</p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Pending Payouts</span>
                    <div class="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-yellow-600 mb-1">$3,580.5</p>
                <p class="text-sm text-gray-500">1 requests</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Processing</span>
                    <div class="w-8 h-8 rounded bg-yellow-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">$50,100</p>
                <p class="text-sm text-gray-500">1 in requests</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Completed</span>
                    <div class="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">$283,900</p>
                <p class="text-sm text-gray-500">this week</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">Failed Payouts</span>
                    <div class="w-8 h-8 rounded bg-red-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-1">1</p>
                <p class="text-sm text-gray-500">require attention</p>
            </div>
        </div>

        <!-- Restaurant Payouts Section -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900">Restaurant Payouts</h3>
                        <p class="text-sm text-gray-500">Manage and process restaurant payout requests</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="relative flex-1 max-w-md">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            v-model="searchQuery"
                            placeholder="Search restaurants or transaction IDs"
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                    </div>
                    <select
                        v-model="statusFilter"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="payout in filteredPayouts" :key="payout.id" class="hover:bg-gray-50 cursor-pointer" @click="openPayoutModal(payout)">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <span class="text-sm font-semibold text-gray-600">{{ payout.restaurant.charAt(0) }}</span>
                                    </div>
                                    <div class="text-sm font-medium text-gray-900">{{ payout.restaurant }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${{ payout.amount.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ payout.period }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ payout.paymentMethod }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-full',
                                        payout.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                                        payout.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                        payout.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    ]"
                                >
                                    {{ payout.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ payout.requested }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Payout Details Modal -->
        <TransitionRoot appear :show="showPayoutModal" as="template">
            <Dialog as="div" @close="closePayoutModal" class="relative z-50">
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
                            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <h2 class="text-2xl font-bold text-gray-900">Payout Details</h2>
                                    <p class="text-sm text-gray-500 mt-1">Details information about this payout request</p>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <!-- Payout Information -->
                                    <div class="space-y-4 mb-6">
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Resolution</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.restaurant || 'Mama put' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Amount</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">${{ selectedPayout?.amount?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '3,949' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Period</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.period || 'Jan 12-21, 2020' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Status</p>
                                            </div>
                                            <div class="flex-1">
                                                <span
                                                    :class="[
                                                        'px-3 py-1 text-xs font-medium rounded',
                                                        selectedPayout?.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                                                        selectedPayout?.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        selectedPayout?.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                    ]"
                                                >
                                                    {{ selectedPayout?.status || 'pending' }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Payment Method</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.paymentMethod || 'Bank Transfer' }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Account Details -->
                                    <div class="border-t border-gray-200 pt-6 mb-6">
                                        <h3 class="text-lg font-bold text-gray-900 mb-4">Account Details</h3>
                                        <div class="space-y-4">
                                            <div class="flex items-start gap-3">
                                                <div class="w-32">
                                                    <p class="text-sm text-gray-500">Bank Name</p>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.bankName || 'My bank' }}</p>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <div class="w-32">
                                                    <p class="text-sm text-gray-500">Account Name</p>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.accountName || 'Mama Put' }}</p>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <div class="w-32">
                                                    <p class="text-sm text-gray-500">Account Number</p>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.accountNumber || '1234567890' }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Submission Information -->
                                    <div class="border-t border-gray-200 pt-6">
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Submitted</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.submitted || '1/20/2024, 11:30:00 AM' }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex flex-col gap-3">
                                    <div class="flex gap-3">
                                        <button
                                            @click="handleProcessPayout"
                                            class="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                                        >
                                            Process Payout
                                        </button>
                                        <button
                                            @click="handleRejectPayout"
                                            class="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                    <button
                                        @click="closePayoutModal"
                                        class="w-full px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Processed Payout Details Modal -->
        <TransitionRoot appear :show="showProcessedPayoutModal" as="template">
            <Dialog as="div" @close="closeProcessedPayoutModal" class="relative z-50">
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
                            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <!-- Modal Header -->
                                <div class="px-6 py-4 border-b border-gray-200">
                                    <h2 class="text-2xl font-bold text-gray-900">Payout Details</h2>
                                    <p class="text-sm text-gray-500 mt-1">Details Information about this payout request</p>
                                </div>

                                <!-- Modal Content -->
                                <div class="px-6 py-6">
                                    <!-- Payout Information -->
                                    <div class="space-y-4 mb-6">
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Resolution</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.restaurant || 'Mama put' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Amount</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">${{ selectedPayout?.amount?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '3,949' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Period</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.period || 'Jan 12-21, 2020' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Status</p>
                                            </div>
                                            <div class="flex-1">
                                                <span class="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                                    processing
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Account Details -->
                                    <div class="border-t border-gray-200 pt-6 mb-6">
                                        <h3 class="text-lg font-bold text-gray-900 mb-4">Account Details</h3>
                                        <div class="space-y-4">
                                            <div class="flex items-start gap-3">
                                                <div class="w-32">
                                                    <p class="text-sm text-gray-500">Bank Name</p>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.bankName || 'My bank' }}</p>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <div class="w-32">
                                                    <p class="text-sm text-gray-500">Account Name</p>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="text-sm font-medium text-gray-900">{{ (selectedPayout?.accountName || 'Mama Put') + ' PI' }}</p>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <div class="w-32">
                                                    <p class="text-sm text-gray-500">Account Number</p>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="text-sm font-medium text-gray-900">{{ (selectedPayout?.accountNumber || '1234567890') + '*' }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Submission Information -->
                                    <div class="border-t border-gray-200 pt-6 space-y-4">
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Submitted</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.submitted || '1/20/2024, 11:30:00 AM' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-32">
                                                <p class="text-sm text-gray-500">Processed at</p>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">{{ selectedPayout?.processedAt || '1/20/2024, 1:30:00 PM' }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
                                    <button
                                        @click="closeProcessedPayoutModal"
                                        class="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Close
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
import { ref, computed } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

const searchQuery = ref('');
const statusFilter = ref('all');
const showPayoutModal = ref(false);
const showProcessedPayoutModal = ref(false);
const selectedPayout = ref<any>(null);

const payouts = ref([
    {
        id: 1,
        restaurant: 'Mama put',
        amount: 3949,
        period: 'Jan 12-21, 2020',
        paymentMethod: 'Bank Transfer',
        status: 'pending',
        requested: '1/22/2024',
        bankName: 'My bank',
        accountName: 'Mama Put',
        accountNumber: '1234567890',
        submitted: '1/20/2024, 11:30:00 AM'
    },
    {
        id: 2,
        restaurant: 'Mama put',
        amount: 3580.5,
        period: 'Jan 15-21, 2024',
        paymentMethod: 'Bank Transfer ****1234',
        status: 'completed',
        requested: '1/22/2024',
        bankName: 'My bank',
        accountName: 'Mama Put',
        accountNumber: '1234567890',
        submitted: '1/20/2024, 11:30:00 AM'
    },
    {
        id: 3,
        restaurant: 'Eatwell',
        amount: 2940.25,
        period: 'Jan 15-21, 2024',
        paymentMethod: 'Bank Transfer ****1234',
        status: 'processing',
        requested: '1/22/2024',
        bankName: 'My bank',
        accountName: 'Eatwell',
        accountNumber: '1234567890',
        submitted: '1/20/2024, 11:30:00 AM'
    },
    {
        id: 4,
        restaurant: 'Happy life',
        amount: 6700,
        period: 'Jan 15-21, 2024',
        paymentMethod: 'Bank Transfer ****1234',
        status: 'failed',
        requested: '1/22/2024',
        bankName: 'My bank',
        accountName: 'Happy life',
        accountNumber: '1234567890',
        submitted: '1/20/2024, 11:30:00 AM'
    }
]);

const filteredPayouts = computed(() => {
    let filtered = payouts.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (payout) =>
                payout.restaurant.toLowerCase().includes(query) ||
                payout.paymentMethod.toLowerCase().includes(query)
        );
    }

    // Filter by status
    if (statusFilter.value !== 'all') {
        filtered = filtered.filter(
            (payout) => payout.status.toLowerCase() === statusFilter.value.toLowerCase()
        );
    }

    return filtered;
});

const openPayoutModal = (payout: any) => {
    selectedPayout.value = payout;
    showPayoutModal.value = true;
};

const closePayoutModal = () => {
    showPayoutModal.value = false;
    selectedPayout.value = null;
};

const handleProcessPayout = () => {
    if (selectedPayout.value) {
        selectedPayout.value.status = 'processing';
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        selectedPayout.value.processedAt = `${month}/${day}/${year}, ${displayHours}:${minutes}:${seconds} ${ampm}`;
    }
    showPayoutModal.value = false;
    showProcessedPayoutModal.value = true;
};

const closeProcessedPayoutModal = () => {
    showProcessedPayoutModal.value = false;
    selectedPayout.value = null;
};

const handleRejectPayout = () => {
    if (selectedPayout.value) {
        selectedPayout.value.status = 'failed';
    }
    closePayoutModal();
};
</script>

