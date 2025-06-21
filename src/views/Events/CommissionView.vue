<template>
    <div class="container mx-auto  py-8">
        <div class="" >
            <h1 class="text-2xl font-bold mb-2">Payouts</h1>
            <p class="text-gray-600 mb-6">Organizer Earnings needs to be transferred to Organizer</p>
        </div>
        <button @click="showModal = true" class="bg-indigo-600 mb-4 text-white px-4 py-2 rounded-md">Organizer Bank Details</button>
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bookings</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Commission</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Tax</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer Earning</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month Year</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transferred</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(payout, index) in payouts" :key="index" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ payout.event }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button @click="showAccountDetails(payout)" class="text-blue-600 hover:text-blue-900">
                                    {{ payout.organizer }}
                                </button>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(payout.totalBookings) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">{{ formatCurrency(payout.adminCommission) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">{{ formatCurrency(payout.adminTax) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{{ formatCurrency(payout.organizerEarning) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ payout.monthYear }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span v-if="payout.transferred">✅</span>
                                <span v-else>💶</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button @click="updatePayout(payout)" class="text-indigo-600 hover:text-indigo-900">Update</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Account Details Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div class="flex justify-between items-center border-b px-6 py-4">
                    <h3 class="text-lg font-medium text-gray-900">Account Details</h3>
                    <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="px-6 py-4 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Organiser</p>
                            <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.name }} ({{ currentOrganizer.email }})</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Organisation</p>
                            <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.organisation }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Bank Name</p>
                            <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.bankName }}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Bank Code</p>
                            <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.bankCode }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Bank Branch Name</p>
                            <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.bankBranchName }}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Bank Branch Code</p>
                            <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.bankBranchCode }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Account Number</p>
                            <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.accountNumber }}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Account Name</p>
                            <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.accountName }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Account Phone</p>
                        <p class="mt-1 text-sm text-gray-900">{{ currentOrganizer.accountPhone }}</p>
                    </div>
                </div>
                <div class="bg-gray-50 px-6 py-3 flex justify-end">
                    <button
                        @click="closeModal"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    interface Payout {
        event: string;
        organizer: string;
        totalBookings: number;
        adminCommission: number;
        adminTax: number;
        organizerEarning: number;
        monthYear: string;
        transferred: boolean;
    }

    interface OrganizerDetails {
        name: string;
        email: string;
        organisation: string;
        bankName: string;
        bankCode: string;
        bankBranchName: string;
        bankBranchCode: string;
        accountNumber: string;
        accountName: string;
        accountPhone: string;
    }

    const payouts = ref<Payout[]>([
        {
            event: 'Global Marketing Conference',
            organizer: 'Gina White',
            totalBookings: 421.25,
            adminCommission: 21.07,
            adminTax: 11.4,
            organizerEarning: 400.2,
            monthYear: '10 2020',
            transferred: false,
        },
        {
            event: 'Global Marketing Conference',
            organizer: 'Gina White',
            totalBookings: 1070.0,
            adminCommission: 53.53,
            adminTax: 0.0,
            organizerEarning: 1016.54,
            monthYear: '10 2020',
            transferred: false,
        },
        {
            event: 'VR assistant Workshop',
            organizer: 'Gina White',
            totalBookings: 1511.55,
            adminCommission: 75.61,
            adminTax: 41.1,
            organizerEarning: 1436.01,
            monthYear: '10 2020',
            transferred: false,
        },
        {
            event: 'Global Marketing Conference',
            organizer: 'Gina White',
            totalBookings: 2017.9,
            adminCommission: 110.91,
            adminTax: 0.0,
            organizerEarning: 1906.99,
            monthYear: '09 2019',
            transferred: false,
        },
        {
            event: 'Digital Marketing Seminar',
            organizer: 'Gina White',
            totalBookings: 10.0,
            adminCommission: 0.5,
            adminTax: 0.0,
            organizerEarning: 9.5,
            monthYear: '07 2020',
            transferred: false,
        },
    ]);

    const showModal = ref(false);
    const currentOrganizer = ref<OrganizerDetails>({
        name: 'Gina White',
        email: 'ginawhite@mail.com',
        organisation: 'Gina Corp.',
        bankName: 'Sample Bank',
        bankCode: 'sample-bank-code',
        bankBranchName: 'Sample bank branch',
        bankBranchCode: 'sample.bank.branch.code',
        accountNumber: '1234567890',
        accountName: 'Gina White',
        accountPhone: '001122334455',
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const showAccountDetails = (payout: Payout) => {
        showModal.value = true;
    };

    const closeModal = () => {
        showModal.value = false;
    };

    const updatePayout = (payout: Payout) => {
        console.log('Updating payout:', payout);
        // Implement payout update logic
    };
</script>

<style scoped>
    @media (max-width: 1024px) {
        table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }
    }
</style>
