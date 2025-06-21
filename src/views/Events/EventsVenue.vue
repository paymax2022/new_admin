<template>
    <div class="py-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold">Venues</h1>
            <div class="flex flex-wrap gap-2">
                <button @click="goToCreate" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Add New
                </button>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Type</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="venue in venues" :key="venue.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ venue.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ venue.title }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span :class="getTypeBadgeClass(venue.type)" class="px-2 py-1 text-xs font-medium rounded-full">
                                    {{ venue.type }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    :class="venue.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ venue.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDateTime(venue.updatedAt) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                                <button @click="goToView" class="text-blue-600 hover:text-blue-900 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button @click="goToEdit" class="text-indigo-600 hover:text-indigo-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                        />
                                    </svg>
                                </button>
                                <button class="text-red-600 hover:text-red-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
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
        router.push({ name: 'viewVenue' });
    };
    const goToEdit = () => {
        router.push({ name: 'editVenue' });
    };
    const goToCreate = () => {
        router.push({ name: 'addVenue' });
    };

    interface Venue {
        id: number;
        title: string;
        type: 'Cinema' | 'Stadium' | 'Theater' | 'Hall';
        status: 'Enabled' | 'Disabled';
        updatedAt: string;
    }

    const venues = ref<Venue[]>([
        { id: 8, title: 'Australia Grand Hawk View', type: 'Cinema', status: 'Enabled', updatedAt: '2025-05-26 12:00:55' },
        { id: 7, title: 'Metro Glam Max', type: 'Stadium', status: 'Enabled', updatedAt: '2025-05-26 12:00:14' },
        { id: 6, title: 'Lemme Valley Hall', type: 'Cinema', status: 'Enabled', updatedAt: '2025-05-26 11:59:05' },
        { id: 5, title: 'Luxe Grand View', type: 'Cinema', status: 'Enabled', updatedAt: '2025-05-26 11:58:15' },
        { id: 4, title: 'Los Pepe Fusion', type: 'Cinema', status: 'Enabled', updatedAt: '2025-05-26 11:57:08' },
        { id: 3, title: 'Italy Street Show', type: 'Stadium', status: 'Enabled', updatedAt: '2025-05-26 11:56:38' },
        { id: 2, title: 'Frances Show Town', type: 'Cinema', status: 'Enabled', updatedAt: '2025-05-26 11:54:39' },
        { id: 1, title: 'New York Theater', type: 'Cinema', status: 'Enabled', updatedAt: '2025-05-26 11:53:31' },
    ]);

    const getTypeBadgeClass = (type: string) => {
        const classes: Record<string, string> = {
            Cinema: 'bg-purple-100 text-purple-800',
            Stadium: 'bg-blue-100 text-blue-800',
            Theater: 'bg-yellow-100 text-yellow-800',
            Hall: 'bg-green-100 text-green-800',
        };
        return classes[type] || 'bg-gray-100 text-gray-800';
    };

    const formatDateTime = (dateTime: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateTime).toLocaleString('en-US', options);
    };

    const viewVenue = (venue: Venue) => {
        console.log('Viewing venue:', venue.title);
        // Navigate to view page or show modal
    };

    const editVenue = (venue: Venue) => {
        console.log('Editing venue:', venue.title);
        // Navigate to edit page or show modal
    };

    const deleteVenue = (venue: Venue) => {
        console.log('Deleting venue:', venue.title);
        // Show confirmation and delete
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
