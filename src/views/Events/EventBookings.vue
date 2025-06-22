<template>
    <div class="container mx-auto py-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold">Bookings</h1>
            <div class="relative w-full md:w-64">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search bookings..."
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancellation</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Checked In</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn ID</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expired</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="booking in bookings" :key="booking.id">
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ booking.id }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">{{ booking.orderNumber }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{ booking.eventTitle }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ booking.ticketTitle }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">{{ booking.quantity }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">${{ booking.netPrice.toFixed(2) }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ booking.customerEmail }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ booking.bookingCancel }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="booking.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ booking.status }}
                                </span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ formatDate(booking.createdAt) }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="booking.checkedIn === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ booking.checkedIn }}
                                </span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ booking.paymentType }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="booking.isPaid === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ booking.isPaid }}
                                </span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">{{ booking.transactionId }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="booking.expired === 'Yes' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ booking.expired }}
                                </span>
                            </td>
                            <td class="px-4 py-3 space-x-2 whitespace-nowrap text-sm font-medium">
                                <button @click="goToView" class="text-blue-600 hover:text-blue-900">View</button>
                                <button @click="goToEdit" class="text-green-600 hover:text-green-900">Edit</button>
                                <button class="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToView = () => {
        router.push({ name: 'bookingsView' });
    };
    const goToEdit = () => {
        router.push({ name: 'bookingsEdit' });
    };

    interface Booking {
        id: number;
        orderNumber: string;
        eventTitle: string;
        ticketTitle: string;
        quantity: number;
        netPrice: number;
        customerEmail: string;
        bookingCancel: string;
        status: 'Enabled' | 'Disabled';
        createdAt: string;
        checkedIn: 'Yes' | 'No';
        paymentType: string;
        isPaid: 'Yes' | 'No';
        transactionId: string;
        expired: 'Yes' | 'No';
    }

    const bookings = ref<Booking[]>([
        {
            id: 398,
            orderNumber: '1701253042624',
            eventTitle: 'World Health Day',
            ticketTitle: 'Free',
            quantity: 1,
            netPrice: 0.0,
            customerEmail: 'davidian@gmail.com',
            bookingCancel: 'No Cancellation',
            status: 'Enabled',
            createdAt: '2025-11-29',
            checkedIn: 'No',
            paymentType: 'Offline',
            isPaid: 'Yes',
            transactionId: 'N/A',
            expired: 'Yes',
        },
        {
            id: 57,
            orderNumber: '1573309109877',
            eventTitle: 'Product Marketing Workshop',
            ticketTitle: 'Early Bird',
            quantity: 2,
            netPrice: 21.0,
            customerEmail: 'corawoods@mail.com',
            bookingCancel: 'No Cancellation',
            status: 'Enabled',
            createdAt: '2025-11-09',
            checkedIn: 'No',
            paymentType: 'Offline',
            isPaid: 'Yes',
            transactionId: 'N/A',
            expired: 'No',
        },
    ]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
</script>

<style scoped>
    /* Responsive table adjustments */
    @media (max-width: 1280px) {
        table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }
    }
</style>
