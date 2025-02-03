<template>
    <div>
        <!-- Search Bar and Add Specialist Button -->
        <div class="flex flex-wrap justify-between items-center mb-4 gap-2">
            <!-- Search Bar -->
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Specialties..."
                class="px-4 py-2 border rounded-md flex-1 max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
            <!-- Add Specialist Button -->
            <button @click="openAddSpecialistModal" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Add Specialist</button>
        </div>

        <div class="panel">
            <div class="mb-5 text-lg font-bold">Specialties List</div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th class="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Display filtered specialties -->
                        <tr v-for="(specialty, index) in filteredSpecialties" :key="index">
                            <td class="font-semibold cursor-pointer text-blue-600 hover:underline">
                                {{ specialty.id }}
                            </td>
                            <td class="whitespace-nowrap">
                                <img :src="specialty.image" alt="Specialist Image" class="w-12 h-12 rounded-full" />
                            </td>
                            <td class="whitespace-nowrap">{{ specialty.name }}</td>
                            <td class="whitespace-nowrap">{{ specialty.description}}</td>
                            <td class="text-center p-2 border border-gray-300">
                                <div class="flex items-center justify-center gap-2">
                                    <!-- Edit Button with Custom Icon -->
                                    <button
                                        @click="openEditModal(specialty)"
                                        class="p-2 text-blue-600 hover:text-blue-800 flex items-center justify-center"
                                        aria-label="Edit"
                                    >
                                        <EditIcon class="w-5 h-5" />
                                    </button>
                                    <!-- Delete Button with Custom Icon -->
                                    <button
                                        @click="deleteSpecialty(specialty.id)"
                                        class="p-2 text-red-600 hover:text-red-800 flex items-center justify-center"
                                        aria-label="Delete"
                                    >
                                        <DeleteIcon class="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <!-- Show message if no results found -->
                        <tr v-if="filteredSpecialties.length === 0">
                            <td colspan="4" class="text-center text-gray-500">No specialties found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Add Specialist Modal -->
        <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-md p-6 w-full max-w-lg shadow-lg">
                <h3 class="text-lg font-bold mb-4">Add New Specialist</h3>
                <div class="mb-4">
                    <label for="new-specialty-id" class="block text-sm font-medium text-gray-700">ID</label>
                    <input
                        id="new-specialty-id"
                        v-model="newSpecialty.id"
                        type="text"
                        class="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>
                <div class="mb-4">
                    <label for="new-specialty-name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="new-specialty-name"
                        v-model="newSpecialty.name"
                        type="text"
                        class="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>
                <div class="mb-4">
                    <label for="new-specialty-description" class="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        id="new-specialty-description"
                        v-model="newSpecialty.description"
                        type="text"
                        class="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>
                <div class="mb-4">
                    <label for="new-specialty-image" class="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        id="new-specialty-image"
                        type="file"
                        accept="image/*"
                        @change="handleImageUpload($event, 'add')"
                        class="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
                    />
                    <div v-if="newSpecialty.image" class="mt-3">
                        <img :src="newSpecialty.image" alt="Preview" class="w-16 h-16 rounded-full" />
                    </div>
                </div>
                <div class="flex justify-end">
                    <button @click="closeAddModal" class="px-4 py-2 bg-gray-200 rounded-md mr-2">Cancel</button>
                    <button @click="addSpecialty" class="px-4 py-2 bg-green-600 text-white rounded-md">Add</button>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-md p-6 w-full max-w-lg shadow-lg">
                <h3 class="text-lg font-bold mb-4">Edit Specialty</h3>
                <div class="mb-4">
                    <label for="specialty-id" class="block text-sm font-medium text-gray-700">ID</label>
                    <input
                        id="specialty-id"
                        v-model="editableSpecialty.id"
                        type="text"
                        class="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
                        readonly
                    />
                </div>
                <div class="mb-4">
                    <label for="specialty-name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="specialty-name"
                        v-model="editableSpecialty.name"
                        type="text"
                        class="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>
                <div class="mb-4">
                    <label for="specialty-description" class="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        id="specialty-description"
                        v-model="editableSpecialty.description"
                        type="text"
                        class="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>
                <div class="mb-4">
                    <label for="specialty-image" class="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        id="specialty-image"
                        type="file"
                        accept="image/*"
                        @change="handleImageUpload($event, 'edit')"
                        class="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
                    />
                    <div v-if="editableSpecialty.image" class="mt-3">
                        <img :src="editableSpecialty.image" alt="Preview" class="w-16 h-16 rounded-full" />
                    </div>
                </div>
                <div class="flex justify-end">
                    <button @click="closeModal" class="px-4 py-2 bg-gray-200 rounded-md mr-2">Cancel</button>
                    <button @click="saveSpecialty" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import Swal from 'sweetalert2';
    import EditIcon from '@/components/icon/icon-newEdit.vue';
    import DeleteIcon from '@/components/icon/icon-delete.vue';

    interface Specialty {
        id: string;
        name: string;
        description: string;
        image: string | null;
    }

    const specialties = ref<Specialty[]>([
        { id: '#01', name: 'Cardiology', image: '/icons/cardiology.png', description: 'Cardiology is a branch of medicine that deals with the disorders of the heart.'},
        { id: '#02', name: 'Neurology', image: '/icons/neurology.png', description: 'Neurology is a branch of medicine that deals with the disorders of the nervous system.' },
        { id: '#03', name: 'Orthopedics', image: '/icons/orthopedics.png', description: 'Orthopedics is a branch of medicine that deals with the disorders of the musculoskeletal system.' },
        { id: '#04', name: 'Dermatology', image: '/icons/dermatology.png', description: 'Dermatology is a branch of medicine that deals with the disorders of the skin.' },
        { id: '#05', name: 'Oncology', image: '/icons/oncology.png', description: 'Oncology is a branch of medicine that deals with the disorders of cancer.' },
    ]);

    const searchQuery = ref<string>('');
    const showModal = ref<boolean>(false);
    const showAddModal = ref<boolean>(false);
    const editableSpecialty = ref<Specialty | null>(null);
    const newSpecialty = ref<Specialty>({ id: '', name: '', description: '', image: null });

    // Filter specialties based on search query
    const filteredSpecialties = computed(() => {
        const query = searchQuery.value.toLowerCase();
        return specialties.value.filter((specialty) => specialty.name.toLowerCase().includes(query) || specialty.id.includes(query));
    });

    // Delete specialty with SweetAlert confirmation
    function deleteSpecialty(id: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                specialties.value = specialties.value.filter((specialty) => specialty.id !== id);
                Swal.fire('Deleted!', 'The specialty has been deleted.', 'success');
            }
        });
    }

    // Open edit modal
    function openEditModal(specialty: Specialty) {
        editableSpecialty.value = { ...specialty };
        showModal.value = true;
    }

    // Save edited specialty with SweetAlert confirmation
    function saveSpecialty() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to save the changes?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const index = specialties.value.findIndex((s) => s.id === editableSpecialty.value?.id);
                if (index !== -1 && editableSpecialty.value) {
                    specialties.value[index] = { ...editableSpecialty.value };
                    closeModal();
                    Swal.fire('Saved!', 'Your changes have been saved.', 'success');
                }
            }
        });
    }

    // Close modals
    function closeModal() {
        showModal.value = false;
        editableSpecialty.value = null;
    }

    // Handle file upload for image
    function handleImageUpload(event: Event, action: 'add' | 'edit') {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (action === 'add') {
                    newSpecialty.value.image = reader.result as string;
                } else if (action === 'edit' && editableSpecialty.value) {
                    editableSpecialty.value.image = reader.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // Open add specialist modal
    function openAddSpecialistModal() {
        showAddModal.value = true;
    }

    // Close add specialist modal
    function closeAddModal() {
        showAddModal.value = false;
    }

    // Add new specialty
    function addSpecialty() {
        if (!newSpecialty.value.id || !newSpecialty.value.name || !newSpecialty.value.description || !newSpecialty.value.image) {
            Swal.fire('Error', 'All fields are required to add a new specialty!', 'error');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to add this new specialist?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!',
        }).then((result) => {
            if (result.isConfirmed) {
                specialties.value.push({ ...newSpecialty.value });
                closeAddModal();
                Swal.fire('Added!', 'The new specialty has been added.', 'success');
            }
        });
    }
</script>

