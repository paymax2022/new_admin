<template>
    <div>
        <!-- Search Bar -->
        <div class="flex justify-between items-center mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Reviews..."
                class="px-4 py-2 border rounded-md w-full max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
        </div>

        <div class="panel">
            <div class="mb-5 text-lg font-bold">Review List</div>
            <div class="overflow-x-auto">
                <table class="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 border-b text-left">ID</th>
                            <th class="px-4 py-2 border-b text-left">Doctor Name</th>
                            <th class="px-4 py-2 border-b text-left">Patient Name</th>
                            <th class="px-4 py-2 border-b text-center">Rating</th>
                            <th class="px-4 py-2 border-b text-left">Review</th>
                            <th class="px-4 py-2 border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Display filtered reviews -->
                        <tr v-for="(review, index) in filteredReviews" :key="review.id">
                            <td class="px-4 py-2 border-b">{{ review.id }}</td>
                            <td class="px-4 py-2 border-b">{{ review.doctorName }}</td>
                            <td class="px-4 py-2 border-b">{{ review.patientName }}</td>
                            <td class="px-4 py-2 border-b text-center">{{ review.rating }}</td>
                            <td class="px-4 py-2 border-b">{{ review.review }}</td>
                            <td class="px-4 py-2 border-b text-center">
                                <button
                                    @click="deleteReview(index)"
                                    class="p-2 text-red-600 hover:text-red-800"
                                    aria-label="Delete"
                                >
                                    <DeleteIcon class="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                        <!-- Show message if no results found -->
                        <tr v-if="filteredReviews.length === 0">
                            <td colspan="6" class="px-4 py-2 border-b text-center text-gray-500">No reviews found.</td>
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
    import DeleteIcon from "@/components/icon/icon-delete.vue";

    interface Review {
        id: number;
        doctorName: string;
        patientName: string;
        rating: number;
        review: string;
    }

    const reviews = ref<Review[]>([
        { id: 1, doctorName: 'Dr. John Doe', patientName: 'Alice Smith', rating: 5, review: 'Excellent care and attention.' },
        { id: 2, doctorName: 'Dr. Jane Williams', patientName: 'Bob Brown', rating: 4, review: 'Very knowledgeable and professional.' },
        { id: 3, doctorName: 'Dr. Mark Johnson', patientName: 'Charlie Davis', rating: 3, review: 'Average experience. Room for improvement.' },
        { id: 4, doctorName: 'Dr. Emily Clark', patientName: 'Diana Evans', rating: 5, review: 'Amazing experience! Highly recommended.' },
        { id: 5, doctorName: 'Dr. Liam O’Connor', patientName: 'Frank White', rating: 4, review: 'Good service overall.' },
    ]);

    const searchQuery = ref<string>('');

    // Filter reviews based on search query
    const filteredReviews = computed(() => {
        const query = searchQuery.value.toLowerCase();
        return reviews.value.filter(
            (review) =>
                review.doctorName.toLowerCase().includes(query) ||
                review.patientName.toLowerCase().includes(query) ||
                review.review.toLowerCase().includes(query),
        );
    });

    // Delete review with SweetAlert confirmation
    function deleteReview(index: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This review will be deleted permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                reviews.value.splice(index, 1);
                Swal.fire('Deleted!', 'The review has been deleted.', 'success');
            }
        });
    }
</script>

