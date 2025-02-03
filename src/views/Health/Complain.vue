<template>
    <div>
        <!-- Search Bar -->
        <div class="flex justify-between items-center mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Complaints..."
                class="px-4 py-2 border rounded-md w-full max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
        </div>

        <div class="panel">
            <div class="mb-5 text-lg font-bold">Complaint List</div>
            <div class="overflow-x-auto">
                <table class="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 border-b text-left">User Name</th>
                            <th class="px-4 py-2 border-b text-left">Title</th>
                            <th class="px-4 py-2 border-b text-left">Description</th>
                            <th class="px-4 py-2 border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Display filtered complaints -->
                        <tr v-for="(complain, index) in filteredComplaints" :key="index">
                            <td class="px-4 py-2 border-b">{{ complain.userName }}</td>
                            <td class="px-4 py-2 border-b">{{ complain.title }}</td>
                            <td class="px-4 py-2 border-b">{{ complain.description }}</td>
                            <td class="px-4 py-2 border-b text-center">
                                <!-- Gmail Icon -->
                                <button @click="handleEmail(complain)" class="p-2 text-red-600 hover:text-red-800 ml-2" aria-label="Reply">
                                    <IconEmail class="w-5 h-5" />
                                </button>

                                <button @click="deleteComplaint(index)" class="p-2 text-red-600 hover:text-red-800 ml-2" aria-label="Delete">
                                    <DeleteIcon class="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                        <!-- Show message if no results found -->
                        <tr v-if="filteredComplaints.length === 0">
                            <td colspan="4" class="px-4 py-2 border-b text-center text-gray-500">No complaints found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import Swal from 'sweetalert2';
    import DeleteIcon from '@/components/icon/icon-delete.vue';
    import IconEmail from '@/components/icon/icon-email.vue';

    interface Complaint {
        userName: string;
        title: string;
        description: string;
        email: string;
    }

    const complaints = ref<Complaint[]>([
        { userName: 'Alice Smith', title: 'Late Delivery', description: 'My package arrived late by two days.', email: 'alice@example.com' },
        { userName: 'Bob Brown', title: 'Damaged Product', description: 'The product was damaged upon arrival.', email: 'bob@example.com' },
        { userName: 'Charlie Davis', title: 'Payment Issue', description: 'My payment is still pending after a week.', email: 'charlie@example.com' },
        { userName: 'Diana Evans', title: 'Wrong Item', description: 'I received a different item than what I ordered.', email: 'diana@example.com' },
        { userName: 'Frank White', title: 'Unresponsive Support', description: 'Customer support hasn’t responded to my emails.', email: 'frank@example.com' },
    ]);

    const searchQuery = ref<string>('');

    // Filter complaints based on search query
    const filteredComplaints = computed(() => {
        const query = searchQuery.value.toLowerCase();
        return complaints.value.filter(
            (complain) =>
                complain.userName.toLowerCase().includes(query) ||
                complain.title.toLowerCase().includes(query) ||
                complain.description.toLowerCase().includes(query),
        );
    });

    // Handle Email Icon Action
    function handleEmail(complain: Complaint) {
        const emailSubject = encodeURIComponent(`Re: ${complain.title}`);
        const emailBody = encodeURIComponent(`Hi ${complain.userName},\n\nRegarding your complaint: ${complain.description}`);
        const recipientEmail = complain.email || ''; // Use the complain's email
        const emailLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
        window.location.href = emailLink;
    }

    // Delete complaint with SweetAlert confirmation
    function deleteComplaint(index: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This complaint will be deleted permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                complaints.value.splice(index, 1);
                Swal.fire('Deleted!', 'The complaint has been deleted.', 'success');
            }
        });
    }
</script>

<style scoped>
    /* Tailwind already provides most of the required styles, so no additional custom styles are needed */
</style>
