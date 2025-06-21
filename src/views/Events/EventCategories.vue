<template>
    <div class="p-4 bg-white rounded shadow">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <div class="flex gap-2">
                <button @click="goToCreate" class="bg-green-500 text-white px-4 py-2 rounded">+ Add New</button>

            </div>
            <div class="flex flex-wrap gap-2">
                <input v-model="search" placeholder="Search..." class="border px-3 py-2 rounded w-full md:w-64" />
            </div>
        </div>

        <div class="overflow-auto">
            <table class="w-full text-left border">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-3"><input type="checkbox" /></th>
                        <th class="p-3">Id</th>
                        <th class="p-3">Name</th>
                        <th class="p-3">Slug</th>
                        <th class="p-3">Thumb (256x256 px)</th>
                        <th class="p-3">Updated At</th>
                        <th class="p-3">Status</th>
                        <th class="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in paginatedData" :key="category.id" class="border-b hover:bg-gray-50">
                        <td class="p-3"><input type="checkbox" /></td>
                        <td class="p-3">{{ category.id }}</td>
                        <td class="p-3">{{ category.name }}</td>
                        <td class="p-3">{{ category.slug }}</td>
                        <td class="p-3 text-center">🖼️</td>
                        <td class="p-3">{{ category.updated_at }}</td>
                        <td class="p-3">{{ category.status }}</td>
                        <td class="p-3 flex gap-2 flex-wrap">
                            <button @click="goToView" class="bg-yellow-500 text-white px-3 py-1 rounded">View</button>
                            <button @click="goToEdit" class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                            <button class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex justify-between items-center">
            <button @click="prevPage" :disabled="page === 1" class="px-4 py-1 border rounded disabled:opacity-50">Previous</button>
            <span>Page {{ page }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="page === totalPages" class="px-4 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToCreate = () => {
        router.push({ name: 'createCategory' });
    };
    const goToEdit = () => {
        router.push({ name: 'editCategory' });
    };
    const goToView = () => {
        router.push({ name: 'viewCategory' });
    };

    const search = ref('');
    const page = ref(1);
    const perPage = 5;

    const categories = ref([
        { id: 10, name: 'Artificial Intelligence', slug: 'artificial-intelligence', updated_at: '2025-06-06 13:18:30', status: 'Enabled' },
        { id: 1, name: 'Business & Seminars', slug: 'business-&-seminars', updated_at: '2025-05-23 11:51:24', status: 'Enabled' },
        { id: 7, name: 'Food & Drink', slug: 'food-&-drink', updated_at: '2025-05-23 11:51:09', status: 'Enabled' },
        { id: 9, name: 'Science & Tech', slug: 'science-&-tech', updated_at: '2025-05-23 11:50:53', status: 'Enabled' },
    ]);

    const filteredData = computed(() => categories.value.filter((c) => c.name.toLowerCase().includes(search.value.toLowerCase())));

    const totalPages = computed(() => Math.ceil(filteredData.value.length / perPage));

    const paginatedData = computed(() => filteredData.value.slice((page.value - 1) * perPage, page.value * perPage));

    const nextPage = () => {
        if (page.value < totalPages.value) page.value++;
    };
    const prevPage = () => {
        if (page.value > 1) page.value--;
    };
</script>
