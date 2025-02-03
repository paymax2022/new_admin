<template>
    <div class="p-4">
        <!-- Search Bar -->
        <div class="flex justify-between items-center mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Addresses..."
                class="px-4 py-2 border rounded-md w-full max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
        </div>

        <div class="bg-white shadow-md rounded-lg p-4">
            <div class="mb-5 text-lg font-bold">Address List</div>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-center">ID</th>
                            <th class="px-4 py-2 text-center">Address</th>
                            <th class="px-4 py-2 text-center">Action</th>
                            <th class="px-4 py-2 text-center">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(address, index) in filteredAddresses" :key="index" class="border-t border-gray-300">
                            <td class="px-4 py-2 text-center font-semibold">{{ address.id }}</td>
                            <td class="px-4 py-2 text-center">{{ address.address }}</td>
                            <td class="px-4 py-2 text-center">
                                <div class="flex justify-center gap-4">
                                    <button @click="editAddress(address)" class="p-2 text-blue-600 hover:text-blue-800" aria-label="Edit">
                                        <EditIcon class="w-5 h-5" />
                                    </button>
                                    <button @click="confirmDelete(address.id)" class="p-2 text-red-600 hover:text-red-800" aria-label="Delete">
                                        <DeleteIcon class="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <button
                                    @click="viewAddress(address)"
                                    class="px-2 py-1 rounded-md text-green-600 hover:text-green-800 bg-green-100"
                                    aria-label="View"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
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
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
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

// Edit Address with SweetAlert
function editAddress(address: Address) {
    Swal.fire({
        title: "Edit Address",
        html:
            '<input id="swal-address" class="swal2-input" placeholder="Address" value="' + address.address + '">' +
            '<input id="swal-pharmacyName" class="swal2-input" placeholder="Pharmacy Name" value="' + (address.pharmacyName || '') + '">',
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
            const newAddress = (document.getElementById("swal-address") as HTMLInputElement).value;
            const newPharmacyName = (document.getElementById("swal-pharmacyName") as HTMLInputElement).value;

            if (!newAddress) {
                Swal.showValidationMessage("Address is required");
                return false;
            }

            address.address = newAddress;
            address.pharmacyName = newPharmacyName;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Success!", "Address updated successfully.", "success");
        }
    });
}

// Delete Address with SweetAlert Confirmation
function confirmDelete(id: string) {
    Swal.fire({
        title: "Are you sure?",
        text: "This address will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteAddress(id);
            Swal.fire("Deleted!", "The address has been deleted.", "success");
        }
    });
}

// Delete Address Function
function deleteAddress(id: string) {
    addresses.value = addresses.value.filter((address) => address.id !== id);
}

// View Address
const isViewModalOpen = ref(false);
const viewAddressData = ref<Address>({ id: '', address: '' });

function viewAddress(address: Address) {
    viewAddressData.value = { ...address };
    isViewModalOpen.value = true;
}

function closeViewModal() {
    isViewModalOpen.value = false;
}
</script>

<style scoped>
.table-responsive {
    overflow-x: auto;
}
</style>
