<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6">Organiser Earnings</h1>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organiser</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bookings</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Commission</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Tax</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organiser Earning</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(organiser, index) in organisers" :key="index" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span class="text-blue-600 font-medium">{{ getInitials(organiser.name) }}</span>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ organiser.name }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {{ formatCurrency(organiser.totalBookings) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                                {{ formatCurrency(organiser.adminCommission) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                                {{ formatCurrency(organiser.adminTax) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                {{ formatCurrency(organiser.organiserEarning) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button  @click="goToView" class="text-blue-600 hover:text-blue-900 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="bg-gray-50">
                        <tr>
                            <td class="px-6 py-3 text-sm font-medium text-gray-900">Totals</td>
                            <td class="px-6 py-3 text-sm font-medium text-gray-900">{{ formatCurrency(totalBookings) }}</td>
                            <td class="px-6 py-3 text-sm font-medium text-red-600">{{ formatCurrency(totalCommission) }}</td>
                            <td class="px-6 py-3 text-sm font-medium text-red-600">{{ formatCurrency(totalTax) }}</td>
                            <td class="px-6 py-3 text-sm font-medium text-green-600">{{ formatCurrency(totalEarnings) }}</td>
                            <td class="px-6 py-3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToView = () => {
        router.push({ name: 'commissionView' });
    };
    interface Organiser {
        name: string;
        totalBookings: number;
        adminCommission: number;
        adminTax: number;
        organiserEarning: number;
    }

    const organisers = ref<Organiser[]>([
        {
            name: 'Gina White',
            totalBookings: 5030.7,
            adminCommission: 261.62,
            adminTax: 52.5,
            organiserEarning: 4769.24,
        },
        {
            name: 'Katie Stone',
            totalBookings: 138263.15,
            adminCommission: 2946.38,
            adminTax: 3250.5,
            organiserEarning: 135316.97,
        },
        {
            name: 'Tony Ray',
            totalBookings: 93589.1,
            adminCommission: 1750.84,
            adminTax: 2479.2,
            organiserEarning: 91838.45,
        },
        {
            name: 'Josh Grey',
            totalBookings: 197.9,
            adminCommission: 9.9,
            adminTax: 4.8,
            organiserEarning: 188.01,
        },
    ]);

    // Computed totals
    const totalBookings = computed(() => organisers.value.reduce((sum, org) => sum + org.totalBookings, 0));
    const totalCommission = computed(() => organisers.value.reduce((sum, org) => sum + org.adminCommission, 0));
    const totalTax = computed(() => organisers.value.reduce((sum, org) => sum + org.adminTax, 0));
    const totalEarnings = computed(() => organisers.value.reduce((sum, org) => sum + org.organiserEarning, 0));

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('');
    };

    const viewDetails = (organiser: Organiser) => {
        console.log('Viewing details for:', organiser.name);
        // In a real app, you would navigate to a details page or show a modal
    };
</script>

<style scoped>
    /* Responsive adjustments */
    @media (max-width: 1024px) {
        table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }
    }
</style>
