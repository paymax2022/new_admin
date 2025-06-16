<template>
    <div class="p-6">
        <!-- Header -->
        <div class="bg-white rounded shadow p-6 flex items-center space-x-4">
            <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div>
                <h2 class="text-xl font-bold">Delivery Boy Two</h2>
                <p class="text-sm text-gray-600">deliveryboy2@example.com</p>
                <p class="text-sm text-gray-500">115005550006</p>
            </div>
        </div>

        <!-- Tabs -->
        <div class="flex space-x-4 mt-6">
            <button
                @click="activeTab = 'profile'"
                :class="activeTab === 'profile' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'"
                class="px-4 py-2 rounded font-medium"
            >
                Profile
            </button>
            <button
                @click="activeTab = 'orders'"
                :class="activeTab === 'orders' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'"
                class="px-4 py-2 rounded font-medium"
            >
                Orders
            </button>
        </div>

        <!-- Tab Content -->
        <div class="bg-white rounded shadow p-6 mt-4">
            <div v-if="activeTab === 'profile'">
                <h3 class="text-lg font-semibold mb-4">Basic Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span class="font-semibold">Name:</span> Delivery Boy Two</div>
                    <div><span class="font-semibold">Email:</span> deliveryboy2@example.com</div>
                    <div><span class="font-semibold">Phone:</span> 115005550006</div>
                    <div><span class="font-semibold">Deposit Amount:</span> $0.00</div>
                    <div><span class="font-semibold">Order Limit Amount:</span> $0.00</div>
                    <div><span class="font-semibold">Order Balance:</span> $0.00</div>
                    <div><span class="font-semibold">Credit:</span> $0.00</div>
                    <div><span class="font-semibold">Username:</span> delivery2</div>
                    <div><span class="font-semibold">Address:</span> Dhaka, Bangladesh</div>
                    <div>
                        <span class="font-semibold">Status:</span>
                        <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </div>
                </div>
            </div>

            <!-- Orders tab (placeholder) -->
            <div v-if="activeTab === 'orders'">
                <div>
                    <h3 class="text-lg font-semibold mb-4">Orders Information</h3>

                    <!-- Top Controls -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-2">
                            <label class="text-sm">
                                <select class="border rounded px-2 py-1 text-sm">
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                                entries per page
                            </label>
                        </div>
                        <div>
                            <label class="text-sm"
                                >Search:
                                <input type="text" class="ml-2 border rounded px-2 py-1 text-sm" placeholder="" />
                            </label>
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full border border-gray-200 text-sm">
                            <thead class="bg-gray-100 text-left">
                                <tr>
                                    <th class="px-4 py-2 font-medium text-gray-700">CODE</th>
                                    <th class="px-4 py-2 font-medium text-gray-700">NAME</th>
                                    <th class="px-4 py-2 font-medium text-gray-700">DATE</th>
                                    <th class="px-4 py-2 font-medium text-gray-700">STATUS</th>
                                    <th class="px-4 py-2 font-medium text-gray-700">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders" :key="order.code">
                                    <td class="px-4 py-2">{{ order.code }}</td>
                                    <td class="px-4 py-2">{{ order.name }}</td>
                                    <td class="px-4 py-2">{{ order.date }}</td>
                                    <td class="px-4 py-2">
                                        <span class="px-2 py-1 rounded text-xs font-medium" :class="statusClass(order.status)">
                                            {{ order.status }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-2">
                                        <button class="text-blue-600 hover:underline text-xs">View</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Footer -->
                    <div class="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>Showing 1 to {{ orders.length }} of {{ orders.length }} entries</div>
                        <div class="flex space-x-1">
                            <button class="px-2 py-1 border rounded bg-white text-gray-500">&laquo;</button>
                            <button class="px-2 py-1 border rounded bg-white text-gray-500">&lsaquo;</button>
                            <button class="px-2 py-1 border rounded bg-white text-gray-500">&rsaquo;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const activeTab = ref('profile');
    const orders = ref([
        {
            code: 'ORD001',
            name: 'John Doe',
            date: '2025-06-15',
            status: 'Delivered',
        },
        {
            code: 'ORD002',
            name: 'Jane Smith',
            date: '2025-06-14',
            status: 'Pending',
        },
        {
            code: 'ORD003',
            name: 'Alice Lee',
            date: '2025-06-13',
            status: 'Cancelled',
        },
    ]);

    function statusClass(status) {
        switch (status) {
            case 'Delivered':
                return 'text-green-600 bg-green-100';
            case 'Pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'Cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    }
</script>
