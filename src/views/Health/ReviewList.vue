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
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th class="ltr:rounded-l-md rtl:rounded-r-md">Doctor Name</th>
                            <th>Patient Name</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Display filtered reviews -->
                        <tr v-for="(review, index) in filteredReviews" :key="index">
                            <td class="whitespace-nowrap">{{ review.id }}</td>
                            <td class="whitespace-nowrap">{{ review.doctorName }}</td>
                            <td class="whitespace-nowrap">{{ review.patientName }}</td>
                            <td class="text-center">{{ review.rating }}</td>
                            <td>{{ review.review }}</td>
                            <td class="text-center">
                                <button @click="deleteReview(index)" class="p-2 text-red-600 hover:text-red-800" aria-label="Delete">
                                    <DeleteIcon class="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                        <!-- Show message if no results found -->
                        <tr v-if="filteredReviews.length === 0">
                            <td colspan="5" class="text-center text-gray-500">No reviews found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
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

    // Delete review by index
    function deleteReview(index: number) {
        reviews.value.splice(index, 1);
    }
</script>

<style scoped>
    .table-responsive {
        overflow-x: auto;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }
    th,
    td {
        padding: 8px 12px;
        border: 1px solid #ddd;
        text-align: left;
    }
    th {
        background-color: #f8f8f8;
    }
</style>
