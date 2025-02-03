<template>
    <div class="p-4">
        <!-- Search Bar -->
        <div class="flex justify-between items-center mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Medicines..."
                class="w-full max-w-md px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
        </div>

        <div class="bg-white shadow-md rounded-lg p-4">
            <div class="mb-5 text-lg font-bold">Medicine List</div>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2">ID</th>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Dosage</th>
                            <th class="px-4 py-2">Description</th>
                            <th class="px-4 py-2">Medicine Type</th>
                            <th class="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(medicine, index) in filteredMedicines" :key="index" class="border-t border-gray-300">
                            <td class="px-4 py-2 font-semibold">{{ medicine.id }}</td>
                            <td class="px-4 py-2 whitespace-nowrap">{{ medicine.name }}</td>
                            <td class="px-4 py-2 whitespace-nowrap">{{ medicine.dosage }}</td>
                            <td class="px-4 py-2">{{ medicine.description }}</td>
                            <td class="px-4 py-2">{{ medicine.type }}</td>
                            <td class="px-4 py-2 text-center">
                                <button @click="editMedicine(medicine)" class="p-2 text-blue-600 hover:text-blue-800" aria-label="Edit">
                                    <EditIcon class="w-5 h-5" />
                                </button>
                                <button @click="confirmDelete(medicine.id)" class="p-2 text-red-600 hover:text-red-800" aria-label="Delete">
                                    <DeleteIcon class="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="filteredMedicines.length === 0">
                            <td colspan="6" class="text-center text-gray-500 px-4 py-2">No medicines found.</td>
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

const editMedicine = (medicine: Medicine) => {
    Swal.fire({
        title: '<span class="text-black">Edit Medicine</span>',
        html:
            '<label class="block text-black">Name</label>' +
            `<input id="swal-name" class="swal2-input" value="${medicine.name}">` +
            '<label class="block text-black">Dosage</label>' +
            `<input id="swal-dosage" class="swal2-input" value="${medicine.dosage}">` +
            '<label class="block text-black">Description</label>' +
            `<input id="swal-description" class="swal2-input" value="${medicine.description}">` +
            '<label class="block text-black">Medicine Type</label>' +
            `<input id="swal-type" class="swal2-input" value="${medicine.type}">`,
        showCancelButton: true,
        confirmButtonText: 'Save',
        preConfirm: () => {
            const name = (document.getElementById('swal-name') as HTMLInputElement).value;
            const dosage = (document.getElementById('swal-dosage') as HTMLInputElement).value;
            const description = (document.getElementById('swal-description') as HTMLInputElement).value;
            const type = (document.getElementById('swal-type') as HTMLInputElement).value;

            if (!name || !dosage || !description || !type) {
                Swal.showValidationMessage('All fields are required');
                return false;
            }

            medicine.name = name;
            medicine.dosage = dosage;
            medicine.description = description;
            medicine.type = type;
        }
    });
};

const confirmDelete = (id: string) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This medicine will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteMedicine(id);
            Swal.fire('Deleted!', 'The medicine has been deleted.', 'success');
        }
    });
};

const deleteMedicine = (id: string) => {
    medicines.value = medicines.value.filter((medicine) => medicine.id !== id);
};
</script>
