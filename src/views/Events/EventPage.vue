<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Events</h1>
            <button @click="goToCreate" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add New</button>
        </div>

        <div class="mb-4">
            <input
                type="text"
                placeholder="Search events..."
                class="w-full md:w-64 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organiser</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repetitive</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seasonal Tickets</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="event in events" :key="event.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ event.title }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.category }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.organiser }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.startDate }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.endDate }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="event.repetitive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ event.repetitive ? 'Yes' : 'No' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="event.featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ event.featured ? 'Yes' : 'No' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.publish }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="event.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ event.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ event.seasonalTickets ? 'Yes' : 'No' }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.updatedAt }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex space-x-2">
                                    <button @click="goToView" class="text-blue-600 hover:text-blue-900">View</button>
                                    <button   @click="goToEdit" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button class="text-red-600 hover:text-red-900">Delete</button>
                                </div>
                                <!-- <div class="mt-1">
                                    <button class="text-sm text-purple-600 hover:text-purple-900">Export Attendees ({{ event.attendees }})</button>
                                </div> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToView = () => {
        router.push({ name: 'eventView' });
    };
    const goToEdit = () => {
        router.push({ name: 'editEvent' });
    };
    const goToCreate = () => {
        router.push({ name: 'addEvent' });
    };
    interface Event {
        id: number;
        title: string;
        category: string;
        organiser: string;
        startDate: string;
        endDate: string;
        repetitive: boolean;
        featured: boolean;
        publish: string;
        status: 'Enabled' | 'Disabled';
        seasonalTickets: boolean;
        updatedAt: string;
        attendees: number;
    }

    const events: Event[] = [
        {
            id: 1,
            title: 'Product Marketing Workshop',
            category: 'Business & Seminars',
            organiser: 'Josh Grey',
            startDate: '2025-12-09',
            endDate: '2025-12-11',
            repetitive: false,
            featured: false,
            publish: 'Published',
            status: 'Enabled',
            seasonalTickets: false,
            updatedAt: '2025-06-06 16:25:40',
            attendees: 10,
        },
        {
            id: 2,
            title: 'Digital Marketing Seminar',
            category: 'Travel & Trekking',
            organiser: 'Gina White',
            startDate: '2025-11-25',
            endDate: '2025-11-25',
            repetitive: false,
            featured: false,
            publish: 'Published',
            status: 'Enabled',
            seasonalTickets: false,
            updatedAt: '2025-06-06 16:25:14',
            attendees: 6,
        },
        {
            id: 3,
            title: 'College Fresher party',
            category: 'Education & Classes',
            organiser: 'Gina White',
            startDate: '2025-11-15',
            endDate: '2025-11-15',
            repetitive: false,
            featured: false,
            publish: 'Published',
            status: 'Enabled',
            seasonalTickets: false,
            updatedAt: '2025-06-06 16:23:54',
            attendees: 0,
        },
        {
            id: 4,
            title: 'Winter Wine Night',
            category: 'Food & Drink',
            organiser: 'Katie Stone',
            startDate: '2025-11-01',
            endDate: '2025-12-31',
            repetitive: true,
            featured: true,
            publish: 'Published',
            status: 'Enabled',
            seasonalTickets: false,
            updatedAt: '2025-06-06 16:23:21',
            attendees: 19,
        },
    ];
</script>

<style scoped>
    /* Responsive table adjustments */
    @media (max-width: 1024px) {
        table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }
    }
</style>
