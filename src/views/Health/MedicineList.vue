<template>
    <div>
        <!-- Search Bar -->
        <div class="flex justify-between items-center mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Medicines..."
                class="px-4 py-2 border rounded-md w-full max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
        </div>

        <div class="panel">
            <div class="mb-5 text-lg font-bold">Medicine List</div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th class="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                            <th>Name</th>
                            <th>Dosage</th>
                            <th>Description</th>
                            <th>Medicine Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Display filtered medicines -->
                        <tr v-for="(medicine, index) in filteredMedicines" :key="index">
                            <td class="font-semibold">{{ medicine.id }}</td>
                            <td class="whitespace-nowrap">{{ medicine.name }}</td>
                            <td class="whitespace-nowrap">{{ medicine.dosage }}</td>
                            <td>{{ medicine.description }}</td>
                            <td>{{ medicine.type }}</td>
                            <td class="text-center">
                                <!-- Edit button with pencil icon -->
                                <button @click="editMedicine(medicine)" class="p-2 text-blue-600 hover:text-blue-800" aria-label="Edit">
                                    <EditIcon class="h-5 w-5" />
                                </button>
                                <!-- Delete button with trash icon -->
                                <button @click="deleteMedicine(medicine.id)" class="p-2 text-red-600 hover:text-red-800" aria-label="Delete">
                                    <DeleteIcon class="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                        <!-- Show message if no results found -->
                        <tr v-if="filteredMedicines.length === 0">
                            <td colspan="6" class="text-center text-gray-500">No medicines found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Edit Medicine Modal -->
        <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 class="text-xl font-bold mb-4">Edit Medicine</h3>
                <form @submit.prevent="updateMedicine">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium">Name</label>
                        <input id="name" v-model="editMedicineData.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="dosage" class="block text-sm font-medium">Dosage</label>
                        <input id="dosage" v-model="editMedicineData.dosage" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            v-model="editMedicineData.description"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        ></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="type" class="block text-sm font-medium">Medicine Type</label>
                        <input id="type" v-model="editMedicineData.type" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div class="flex justify-end space-x-4">
                        <button @click="closeEditModal" class="px-4 py-2 bg-gray-300 rounded-md text-sm">Cancel</button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import DeleteIcon from "@/components/icon/icon-delete.vue";
    import EditIcon from "@/components/icon/icon-newEdit.vue";

    interface Medicine {
        id: string;
        name: string;
        dosage: string;
        description: string;
        type: string;
    }

    const medicines = ref<Medicine[]>([
        { id: '#01', name: 'Mentha Oil', dosage: '60mg', description: 'As vasodilator, 20 mg 4 times daily', type: 'Injection' },
        { id: '#02', name: 'Paracetamol', dosage: '500mg', description: 'Pain reliever', type: 'Tablet' },
        { id: '#03', name: 'Ibuprofen', dosage: '200mg', description: 'Anti-inflammatory', type: 'Tablet' },
        { id: '#04', name: 'Aspirin', dosage: '75mg', description: 'Blood thinner', type: 'Tablet' },
    ]);

    const searchQuery = ref<string>('');

    const filteredMedicines = computed(() => {
        const query = searchQuery.value.toLowerCase();
        return medicines.value.filter(
            (medicine) =>
                medicine.name.toLowerCase().includes(query) ||
                medicine.dosage.toLowerCase().includes(query) ||
                medicine.description.toLowerCase().includes(query) ||
                medicine.type.toLowerCase().includes(query),
        );
    });

    const isEditModalOpen = ref(false);
    const editMedicineData = ref<Medicine>({ id: '', name: '', dosage: '', description: '', type: '' });

    // Open the edit modal and set current medicine data
    function editMedicine(medicine: Medicine) {
        editMedicineData.value = { ...medicine };
        isEditModalOpen.value = true;
    }

    // Close the edit modal
    function closeEditModal() {
        isEditModalOpen.value = false;
    }

    // Update medicine information
    function updateMedicine() {
        const index = medicines.value.findIndex((m) => m.id === editMedicineData.value.id);
        if (index !== -1) {
            medicines.value[index] = { ...editMedicineData.value };
        }
        closeEditModal();
    }

    // Delete medicine
    function deleteMedicine(id: string) {
        medicines.value = medicines.value.filter((medicine) => medicine.id !== id);
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
    .bg-white {
        background-color: white;
    }
</style>
