<template>
    <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="stat in stats" :key="stat.label" class="bg-white p-4 rounded-xl shadow-sm flex items-center border border-gray-100 space-x-4">
                <div :class="`p-3 rounded-full text-white ${stat.bg}`">
                    <component :is="stat.icon" class="w-6 h-6" />
                </div>
                <div>
                    <p class="text-gray-500 text-sm font-medium">{{ stat.label }}</p>
                    <p class="text-lg font-semibold text-gray-800">{{ stat.value }}</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row mt-10">
            <div>
                <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <img :src="DP" alt="Logo" class="w-24 h-24 rounded-full mb-2" />
                    <div class="font-semibold text-lg">The Salad God</div>
                    <div class="text-sm text-gray-500">250 W 72nd St, New York, United State</div>
                </div>
                <div class="bg-white rounded-xl shadow p-2 lg:p-6 flex flex-col mt-10 items-center">
                    <img :src="DP" alt="Logo" class="w-24 h-24 rounded-full mb-2" />
                    <div class="font-semibold text-lg">John Doe</div>
                    <div class="text-sm text-gray-500">Restaurant Owner</div>
                    <div class="py-3 border border-gray-300 rounded-lg mt-4">
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                <div class="font-medium text-gray-700">Username</div>
                                <div class="text-gray-900">customer2</div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                <div class="font-medium text-gray-700">Phone</div>
                                <div class="text-gray-900">115005550006</div>
                            </div>

                            <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                <div class="font-medium text-gray-700">Email</div>
                                <div class="text-gray-900">customer2@example.com</div>
                            </div>

                            <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                <div class="font-medium text-gray-700">Address</div>
                                <div class="text-gray-900">Dhaka, Bangladesh</div>
                            </div>

                            <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                <div class="font-medium text-gray-700">Deposit Amount</div>
                                <div class="text-gray-900">$0.00</div>
                            </div>

                            <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                <div class="font-medium text-gray-700">Order Limit Amount</div>
                                <div class="text-gray-900">$0.00</div>
                            </div>

                            <div class="grid grid-cols-2 gap-4 border-b px-3 py-1 border-gray-300">
                                <div class="font-medium text-gray-700">Credit</div>
                                <div class="text-gray-900">$0.00</div>
                            </div>

                            <div class="grid grid-cols-2 gap-4 px-3 py-1">
                                <div class="font-medium text-gray-700">Status</div>
                                <div class="text-green-600 font-medium">Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/2 mx-auto">
                <div class="bg-white rounded-xl shadow p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Restaurant Information</h2>
                    <table class="w-full table-auto text-sm text-left">
                        <tbody>
                            <!-- Row 1 -->
                            <tr class="align-top">
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Name</th>
                                <td class="pb-4 text-gray-500">The Salad God</td>
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Latitude</th>
                                <td class="pb-4 text-gray-500">23.785305535697763</td>
                            </tr>

                            <!-- Row 2 -->
                            <tr class="align-top">
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Cuisines</th>
                                <td class="pb-4 text-gray-500">Asian , Dessert</td>
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Longitude</th>
                                <td class="pb-4 text-gray-500">90.35289287567139</td>
                            </tr>

                            <!-- Row 3 -->
                            <tr class="align-top">
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Delivery Status</th>
                                <td class="pb-4">
                                    <span class="inline-block bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-md"> Enable </span>
                                </td>
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Current Status</th>
                                <td class="pb-4">
                                    <span class="inline-block bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-md"> Active </span>
                                </td>
                            </tr>

                            <!-- Row 4 -->
                            <tr class="align-top">
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Pickup Status</th>
                                <td class="pb-4">
                                    <span class="inline-block bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-md"> Enable </span>
                                </td>
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Status</th>
                                <td class="pb-4">
                                    <span class="inline-block bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-md"> Active </span>
                                </td>
                            </tr>

                            <!-- Row 5 -->
                            <tr class="align-top">
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Table Status</th>
                                <td class="pb-4">
                                    <span class="inline-block bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-md"> Enable </span>
                                </td>
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Waiter Status</th>
                                <td class="pb-4">
                                    <span class="inline-block bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-md"> Active </span>
                                </td>
                            </tr>

                            <!-- Row 6 -->
                            <tr class="align-top">
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Opening Time</th>
                                <td class="pb-4 text-gray-500">11:00 PM</td>
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Closing Time</th>
                                <td class="pb-4 text-gray-500">01:00 AM</td>
                            </tr>

                            <!-- Row 7 -->
                            <tr class="align-top">
                                <th class="pr-4 pb-4 font-semibold text-gray-900">Address</th>
                                <td colspan="3" class="pb-4 text-gray-500">250 W 72nd St, New York, United State</td>
                            </tr>

                            <!-- Row 8 -->
                            <tr class="align-top">
                                <th class="pr-4 align-top font-semibold text-gray-900">Description</th>
                                <td colspan="3" class="text-gray-500">
                                    A regal culinary retreat where opulence meets flavor, offering a menu that fuses tradition and innovation. Indulge in a
                                    majestic dining experience, where every dish is crafted with a commitment to royal excellence and hospitality.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-10">
                    <div class="p-6 bg-white rounded-lg shadow-md">
                        <div class="flex justify-between items-center mb-6">
                            <h1 class="text-2xl font-bold">Menu Items</h1>
                            <div class="text-gray-500">10 entries per page</div>
                        </div>

                        <div class="mb-4">
                            <input
                                type="text"
                                v-model="searchQuery"
                                placeholder="Search..."
                                class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORIES</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIT PRICE</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            DISCOUNT PRICE
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-if="paginatedItems.length" v-for="item in paginatedItems" :key="item.id">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-500">{{ item.category }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">${{ item.unitPrice?.toFixed(2) }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">${{ item.discountPrice?.toFixed(2) }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                                            <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                                    />
                                                </svg>
                                            </button>
                                            <button @click="deleteItem(item)" class="text-red-600 hover:text-red-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                            <button @click="viewItem(item)" class="text-blue-600 hover:text-blue-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 3C5.5 3 2 10 2 10s3.5 7 8 7 8-7 8-7-3.5-7-8-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                                                    <path d="M10 8a2 2 0 100 4 2 2 0 000-4z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="5" class="px-6 py-4 text-center text-gray-500">No items found.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div class="flex items-center justify-between mt-4">
                            <div class="text-sm text-gray-500">
                                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredItems.length) }} of
                                {{ filteredItems.length }} entries
                            </div>
                            <div class="flex space-x-2">
                                <button
                                    @click="currentPage = 1"
                                    :disabled="currentPage === 1"
                                    class="px-3 py-1 border rounded-md"
                                    :class="currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'"
                                >
                                    First
                                </button>
                                <button
                                    @click="currentPage--"
                                    :disabled="currentPage === 1"
                                    class="px-3 py-1 border rounded-md"
                                    :class="currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'"
                                >
                                    Previous
                                </button>
                                <button
                                    v-for="page in visiblePages"
                                    :key="page"
                                    @click="currentPage = page"
                                    class="px-3 py-1 border rounded-md"
                                    :class="currentPage === page ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'"
                                >
                                    {{ page }}
                                </button>
                                <button
                                    @click="currentPage++"
                                    :disabled="currentPage === totalPages"
                                    class="px-3 py-1 border rounded-md"
                                    :class="currentPage === totalPages ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'"
                                >
                                    Next
                                </button>
                                <button
                                    @click="currentPage = totalPages"
                                    :disabled="currentPage === totalPages"
                                    class="px-3 py-1 border rounded-md"
                                    :class="currentPage === totalPages ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'"
                                >
                                    Last
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { CubeIcon, TruckIcon, ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/solid';
    import DP from '@/assets/image/dp.jpeg';
    const stats = [
        { label: 'Total Order', value: 9, bg: 'bg-purple-500', icon: CubeIcon },
        { label: 'Order Pending', value: 3, bg: 'bg-yellow-400', icon: ClockIcon },
        { label: 'Order Process', value: 0, bg: 'bg-green-300', icon: CheckCircleIcon },
        { label: 'Completed Order', value: 4, bg: 'bg-purple-400', icon: CubeIcon },
    ];
    interface MenuItem {
        id: number;
        name: string;
        category: string;
        unitPrice: number;
        discountPrice: number;
    }

    const items = ref<MenuItem[]>([
        { id: 1, name: 'Mediterranean Chickpea Salad', category: '', unitPrice: 4.99, discountPrice: 0.0 },
        { id: 2, name: 'A refreshing twist on classic flavors', category: '', unitPrice: 0, discountPrice: 0.0 },
        { id: 3, name: 'Falafel and Hummus Plate', category: 'Top Featured', unitPrice: 6.5, discountPrice: 0.0 },
        { id: 4, name: 'Protein-Packed Lentil Bowl', category: 'Nutrient-Packed Power Bowls', unitPrice: 6.99, discountPrice: 0.0 },
        { id: 5, name: 'Salmon Superfood Bowl', category: 'Nutrient-Packed Power Bowls', unitPrice: 12.99, discountPrice: 3.99 },
        { id: 6, name: 'Asian Sesame Tofu Bowl', category: 'Bam! Lite Snacks', unitPrice: 6.99, discountPrice: 0.0 },
        { id: 7, name: 'Southwest Chipotle Chickpea Salad', category: 'Bam! Lite Snacks', unitPrice: 3.99, discountPrice: 0.0 },
        { id: 8, name: 'Greek Village Salad', category: 'Vibrant Veggie Delights', unitPrice: 7.0, discountPrice: 2.01 },
        { id: 9, name: 'Caprese Salad', category: 'Bam! Lite Snacks', unitPrice: 5.99, discountPrice: 0.0 },
    ]);

    const searchQuery = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const filteredItems = computed(() => {
        return items.value.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.value.toLowerCase()),
        );
    });

    const totalPages = computed(() => {
        return Math.ceil(filteredItems.value.length / itemsPerPage);
    });

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredItems.value.slice(start, end);
    });

    const visiblePages = computed(() => {
        const maxVisible = 5;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(currentPage.value - half, 1);
        let end = Math.min(start + maxVisible - 1, totalPages.value);

        if (end - start + 1 < maxVisible) {
            start = Math.max(end - maxVisible + 1, 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    function editItem(item: MenuItem) {
        console.log('Edit:', item);
    }

    function deleteItem(item: MenuItem) {
        console.log('Delete:', item);
    }

    function viewItem(item: MenuItem) {
        console.log('View:', item);
    }

    function toggleFeatured(item: MenuItem) {
        console.log('Toggle featured:', item);
    }
</script>
