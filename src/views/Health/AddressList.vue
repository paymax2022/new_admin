<template>
    <div>
        <!-- Search Bar -->
        <div class="flex justify-between items-center mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Addresses..."
                class="px-4 py-2 border rounded-md w-full max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
        </div>

        <div class="panel">
            <div class="mb-5 text-lg font-bold">Address List</div>
            <div class="overflow-x-auto">
                <table class="min-w-full table-auto">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-center">ID</th>
                            <th class="px-4 py-2 text-center">Address</th>
                            <th class="px-4 py-2 text-center">Action</th>
                            <th class="px-4 py-2 text-center">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Display filtered addresses -->
                        <tr v-for="(address, index) in filteredAddresses" :key="index">
                            <td class="px-4 py-2 text-center font-semibold">{{ address.id }}</td>
                            <td class="px-4 py-2 text-center">{{ address.address }}</td>
                            <td class="px-4 py-2 text-center">
                                <div class="flex justify-center gap-4">
                                    <!-- Edit button with imported EditIcon -->
                                    <button @click="editAddress(address)" class="p-2 text-blue-600 hover:text-blue-800" aria-label="Edit">
                                        <EditIcon class="h-3 w-3" />
                                    </button>
                                    <!-- Delete button with imported DeleteIcon -->
                                    <button @click="deleteAddress(address.id)" class="p-2 text-red-600 hover:text-red-800" aria-label="Delete">
                                        <DeleteIcon class="h-3 w-3" />
                                    </button>
                                </div>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <!-- View button -->
                                <button
                                    @click="viewAddress(address)"
                                    class="px-2 rounded-md text-green-600 hover:text-green-800 bg-green-100"
                                    aria-label="View"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                        <!-- Show message if no results found -->
                        <tr v-if="filteredAddresses.length === 0">
                            <td colspan="4" class="px-4 py-2 text-center text-gray-500">No addresses found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- View Address Modal -->
        <div v-if="isViewModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 class="text-xl font-bold mb-4">View Address</h3>
                <p><strong>ID:</strong> {{ viewAddressData.id }}</p>
                <p><strong>Address:</strong> {{ viewAddressData.address }}</p>
                <p v-if="viewAddressData.pharmacyName"><strong>Pharmacy Name:</strong> {{ viewAddressData.pharmacyName }}</p>
                <div v-if="viewAddressData.pharmacyImg">
                    <img :src="viewAddressData.pharmacyImg" alt="Pharmacy Image" class="w-32 h-32 object-cover mt-4" />
                </div>
                <div class="flex justify-end space-x-4">
                    <button @click="closeViewModal" class="px-4 py-2 bg-gray-300 rounded-md text-sm">Close</button>
                </div>
            </div>
        </div>

        <!-- Edit Address Modal -->
        <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 class="text-xl font-bold mb-4">Edit Address</h3>
                <form @submit.prevent="updateAddress">
                    <div class="mb-4">
                        <label for="address" class="block text-sm font-medium">Address</label>
                        <input id="address" v-model="editAddressData.address" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="pharmacyName" class="block text-sm font-medium">Pharmacy Name</label>
                        <input
                            id="pharmacyName"
                            v-model="editAddressData.pharmacyName"
                            type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="pharmacyImg" class="block text-sm font-medium">Pharmacy Image</label>
                        <input id="pharmacyImg" type="file" @change="handleImageUpload" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        <div v-if="editAddressData.pharmacyImg" class="mt-4">
                            <img :src="editAddressData.pharmacyImg" alt="Pharmacy Image Preview" class="w-32 h-32 object-cover" />
                        </div>
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
    import DeleteIcon from '@/components/icon/icon-delete.vue';
    import EditIcon from '@/components/icon/icon-newEdit.vue';
    import HospitalOne from '@/assets/house2.png';

    interface Address {
        id: string;
        address: string;
        pharmacyName?: string;
        pharmacyImg?: string;
    }

    const addresses = ref<Address[]>([
        { id: '#01', address: '123 Main St, Springfield', pharmacyName: 'Pharmacy A', pharmacyImg: HospitalOne },
        { id: '#02', address: '456 Elm St, Oak Town', pharmacyName: 'Pharmacy B', pharmacyImg: 'path/to/img2.jpg' },
        { id: '#03', address: '789 Pine St, River City', pharmacyName: 'Pharmacy A', pharmacyImg: 'path/to/img1.jpg' },
        { id: '#04', address: '101 Maple St, Green Valley', pharmacyName: 'Pharmacy A', pharmacyImg: 'path/to/img1.jpg' },
    ]);

    const searchQuery = ref<string>('');

    const filteredAddresses = computed(() => {
        const query = searchQuery.value.toLowerCase();
        return addresses.value.filter((address) => address.address.toLowerCase().includes(query) || address.id.includes(query));
    });

    const isEditModalOpen = ref(false);
    const editAddressData = ref<Address>({ id: '', address: '' });

    const isViewModalOpen = ref(false);
    const viewAddressData = ref<Address>({ id: '', address: '' });

    function handleImageUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    editAddressData.value.pharmacyImg = reader.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // Open the edit modal and set current address data
    function editAddress(address: Address) {
        editAddressData.value = { ...address };
        isEditModalOpen.value = true;
    }

    // Close the edit modal
    function closeEditModal() {
        isEditModalOpen.value = false;
    }

    // Update address information
    function updateAddress() {
        const index = addresses.value.findIndex((a) => a.id === editAddressData.value.id);
        if (index !== -1) {
            addresses.value[index] = { ...editAddressData.value };
        }
        closeEditModal();
    }

    // Delete address
    function deleteAddress(id: string) {
        addresses.value = addresses.value.filter((address) => address.id !== id);
    }

    // Open the view modal and set current address data
    function viewAddress(address: Address) {
        viewAddressData.value = { ...address };
        isViewModalOpen.value = true;
    }

    // Close the view modal
    function closeViewModal() {
        isViewModalOpen.value = false;
    }
</script>

<style scoped>
    .table-responsive {
        overflow-x: auto;
    }
</style>
