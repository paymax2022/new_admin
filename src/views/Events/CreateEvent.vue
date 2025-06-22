<template>
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-8">
            <!-- Header with Tabs -->
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Create Event</h1>
                <div class="flex space-x-4 mt-2 text-sm text-gray-500 border-b border-gray-200">
                    <button
                        v-for="tab in tabs"
                        :key="tab.id"
                        @click="activeTab = tab.id"
                        :class="{
                            'text-blue-600 border-b-2 border-blue-600': activeTab === tab.id,
                            'hover:text-gray-700': activeTab !== tab.id,
                        }"
                        class="py-2 px-1 font-medium focus:outline-none transition-colors duration-200"
                    >
                        {{ tab.label }}
                    </button>
                </div>
            </div>

            <div class="border-t border-gray-200 my-4"></div>

            <!-- Tab Content -->
            <div v-if="activeTab === 'details'">
                <!-- Form Section -->
                <div class="space-y-6">
                    <!-- Organiser Section -->
                    <div>
                        <h2 class="text-lg font-semibold text-gray-700 mb-3">Organiser</h2>
                        <input
                            type="text"
                            placeholder="Search Organiser Email/Name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Category Dropdown -->
                    <div>
                        <select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option disabled selected>-- Category --</option>
                            <option>Business & Seminars</option>
                            <option>Education & Classes</option>
                            <option>Food & Drink</option>
                            <!-- Add more categories as needed -->
                        </select>
                    </div>

                    <!-- Event Name -->
                    <div>
                        <input
                            type="text"
                            placeholder="Event Name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Event URL -->
                    <div>
                        <input
                            type="text"
                            placeholder="Event URL"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Excerpt -->
                    <div>
                        <input
                            type="text"
                            placeholder="Excerpt (Short Info)"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Description Textarea -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <!-- Why Attend Textarea -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Why to Attend</label>
                        <textarea
                            rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <!-- Offline Payment Instructions -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Offline Payment Instructions</label>
                        <textarea
                            rows="3"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <!-- Featured Event Toggle (Admin Only) -->
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 class="font-medium text-gray-700">Event Featured</h3>
                            <p class="text-sm text-gray-500">Only Admin can make an event featured to show it in Featured Events on Homepage.</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" :disabled="!isAdmin" />
                            <div
                                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                        </label>
                    </div>

                    <!-- Event Status Toggle (Admin Only) -->
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 class="font-medium text-gray-700">Event Status</h3>
                            <p class="text-sm text-gray-500">Only Admin can force Disable/Enable the Event. Disabled Event will be hidden from website.</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" :disabled="!isAdmin" />
                            <div
                                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                        </label>
                    </div>
                </div>
            </div>

            <div v-else-if="activeTab === 'timings'">
                <div class="space-y-6">
                    <!-- Start Date -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            type="date"
                            v-model="eventForm.startDate"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- End Date -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            v-model="eventForm.endDate"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Repetitive Event Toggle -->
                    <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="eventForm.isRepetitive" class="sr-only peer" />
                            <div
                                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                        </label>
                        <span class="text-sm font-medium text-gray-700">Make this a repetitive/recurring event</span>
                    </div>

                    <!-- Repetitive Schedules (Conditional) -->
                    <div v-if="eventForm.isRepetitive" class="space-y-4">
                        <div class="flex justify-between items-center">
                            <h3 class="font-medium text-gray-700">Repetitive Schedules</h3>
                            <button @click="addSchedule" class="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded hover:bg-blue-100">+ Add Schedule</button>
                        </div>

                        <div v-for="(schedule, index) in eventForm.schedules" :key="index" class="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div class="flex justify-between">
                                <span class="text-sm font-medium text-gray-700">Schedule {{ index + 1 }}</span>
                                <button @click="removeSchedule(index)" class="text-red-500 hover:text-red-700">Remove</button>
                            </div>

                            <!-- Start Time -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <input
                                    type="time"
                                    v-model="schedule.startTime"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <!-- End Time -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                <input
                                    type="time"
                                    v-model="schedule.endTime"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Non-repetitive Times -->
                    <div v-else class="space-y-6">
                        <!-- Start Time -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <input
                                type="time"
                                v-model="eventForm.startTime"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- End Time -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                            <input
                                type="time"
                                v-model="eventForm.endTime"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="activeTab === 'tickets'">
                <div class="max-w-6xl mx-auto">
                    <!-- Header -->
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold">@ Create Ticket</h2>
                        <button @click="showModal = true" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">+ Create Ticket</button>
                    </div>

                    <!-- Tickets Table -->
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="(ticket, index) in tickets" :key="index">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ ticket.title }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ ticket.price }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span v-if="ticket.quantity">{{ ticket.quantity }} available</span>
                                            <span v-else class="text-gray-400">Unlimited</span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button @click="editTicket(index)" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                            <button @click="deleteTicket(index)" class="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                    <tr v-if="tickets.length === 0">
                                        <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No tickets created yet</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Create/Edit Ticket Modal -->
                    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div class="p-6">
                                <div class="flex justify-between items-center mb-4">
                                    <h3 class="text-lg font-medium">{{ editingIndex === null ? 'Create' : 'Edit' }} Ticket</h3>
                                    <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form @submit.prevent="saveTicket" class="space-y-4">
                                    <!-- Title -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            v-model="ticketForm.title"
                                            type="text"
                                            required
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <!-- Price -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                                        <input
                                            v-model="ticketForm.price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            required
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <!-- Quantity -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Total Ticket Quantity</label>
                                        <input
                                            v-model="ticketForm.quantity"
                                            type="number"
                                            min="1"
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Leave blank for unlimited"
                                        />
                                    </div>

                                    <!-- Booking Limit -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Booking Limit Per Customer</label>
                                        <input
                                            v-model="ticketForm.bookingLimit"
                                            type="number"
                                            min="1"
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Leave blank for unlimited"
                                        />
                                        <p class="text-xs text-gray-500 mt-1">For how many times the same customer can purchase this ticket.</p>
                                    </div>

                                    <!-- Description -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            v-model="ticketForm.description"
                                            rows="3"
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        ></textarea>
                                    </div>

                                    <!-- Taxes -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Taxes</label>
                                        <select
                                            v-model="ticketForm.taxes"
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">-- Select --</option>
                                            <option value="vat">VAT (20%)</option>
                                            <option value="gst">GST (10%)</option>
                                            <option value="none">No Tax</option>
                                        </select>
                                    </div>

                                    <div class="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            @click="closeModal"
                                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                            {{ editingIndex === null ? 'Create' : 'Update' }} Ticket
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              <div v-else-if="activeTab === 'tickets'"></div>
            <div v-else-if="activeTab === 'location'">
                <LocationTab />
            </div>
            <div v-else-if="activeTab === 'publish'">
                <PublishTab />
            </div>
            <div v-else-if="activeTab === 'media'">
                <MediaTab />
            </div>
            <div v-else-if="activeTab === 'seo'">
                <SeoTab />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import LocationTab from '@/components/modules/Events/LocationTab.vue';
    import PublishTab from '@/components/modules/Events/PublishTab.vue';
    import MediaTab from '@/components/modules/Events/MediaTab.vue';
    import SeoTab from '@/components/modules/Events/SeoTab.vue';

    const activeTab = ref('details');
    const eventForm = ref({
        startDate: '',
        endDate: '',
        isRepetitive: false,
        startTime: '',
        endTime: '',
        schedules: [] as Array<{ startTime: string; endTime: string }>,
    });

    const addSchedule = () => {
        eventForm.value.schedules.push({
            startTime: '',
            endTime: '',
        });
    };

    const removeSchedule = (index: number) => {
        eventForm.value.schedules.splice(index, 1);
    };
    const tabs = [
        { id: 'details', label: 'Details' },
        { id: 'timings', label: 'Timings' },
        { id: 'tickets', label: 'Tickets' },
        { id: 'location', label: 'Location' },
        { id: 'media', label: 'Media' },
        { id: 'seo', label: 'SEO' },
        { id: 'publish', label: 'Publish' },
    ];
    interface Ticket {
        title: string;
        price: number;
        quantity: number | null;
        bookingLimit: number | null;
        description: string;
        taxes: string;
    }

    const showModal = ref(false);
    const editingIndex = ref<number | null>(null);
    const tickets = ref<Ticket[]>([]);

    const ticketForm = ref<{
        title: string;
        price: number;
        quantity: number | null;
        bookingLimit: number | null;
        description: string;
        taxes: string;
    }>({
        title: '',
        price: 0,
        quantity: null,
        bookingLimit: null,
        description: '',
        taxes: '',
    });

    const openModal = () => {
        ticketForm.value = {
            title: '',
            price: 0,
            quantity: null,
            bookingLimit: null,
            description: '',
            taxes: '',
        };
        editingIndex.value = null;
        showModal.value = true;
    };

    const editTicket = (index: number) => {
        ticketForm.value = { ...tickets.value[index] };
        editingIndex.value = index;
        showModal.value = true;
    };

    const deleteTicket = (index: number) => {
        tickets.value.splice(index, 1);
    };

    const saveTicket = () => {
        if (editingIndex.value !== null) {
            tickets.value[editingIndex.value] = { ...ticketForm.value };
        } else {
            tickets.value.push({ ...ticketForm.value });
        }
        closeModal();
    };

    const closeModal = () => {
        showModal.value = false;
    };
</script>
