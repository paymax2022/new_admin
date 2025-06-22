<template>
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Header Section -->
        <div class="bg-gray-100 text-gray-800 p-6">
            <div class="flex items-center gap-4" >
                <img :src="Dp" alt="" class="w-16 h-16 rounded-full" />
                <h1 class="text-2xl font-bold">Restaurant Owner</h1>
            </div>
            <div class="flex items-center mt-2">
                <span class="text-sm uppercase tracking-wider font-semibold">RESTAURANT OWNER</span>
            </div>
            <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm">
                <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                    </svg>
                    restaurantowner@example.com
                </span>
                <span class="flex items-center mt-2 sm:mt-0">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                    </svg>
                    1150055550006
                </span>
            </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200"></div>

        <!-- Basic Information Section -->
        <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">First Name</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">restaurant</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Last Name</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">owner</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Email</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">restaurantowner@example.com</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Phone</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">1150055550006</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Username</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">restaurantowner</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Address</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Dhaka, Bangladesh</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Deposit Amount</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$0.00</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Credit</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$0.00</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Status</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Active</td>
                            <td class="px-4 py-3 whitespace-nowrap"></td>
                            <td class="px-4 py-3 whitespace-nowrap"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
  import Dp from '../../assets/image/dp.jpeg'
    import { ref } from 'vue';

    const ownerInfo = ref({
        firstName: 'restaurant',
        lastName: 'owner',
        email: 'restaurantowner@example.com',
        phone: '1150055550006',
        username: 'restaurantowner',
        address: 'Dhaka, Bangladesh',
        depositAmount: '$0.00',
        credit: '$0.00',
        status: 'Active',
    });
</script>

<style scoped>
    /* Any custom styles can go here */
</style>
