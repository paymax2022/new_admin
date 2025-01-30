<template>
    <div class="flex items-center justify-between flex-wrap gap-4">
        <h2 class="text-xl">Pharmacies</h2>
        <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
            <div class="flex gap-3">
                <div>
                    <button type="button" class="btn btn-primary" @click="editPharmacy()">
                        <icon-user-plus class="ltr:mr-2 rtl:ml-2" />
                        Add Pharmacy
                    </button>
                </div>
            </div>

            <div class="relative">
                <input
                    type="text"
                    placeholder="Search Pharmacies"
                    class="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
                    v-model="searchPharmacy"
                    @keyup="searchPharmacies"
                />
                <div class="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                    <icon-search class="mx-auto" />
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5 panel p-0 border-0 overflow-hidden">
        <template v-if="displayType === 'list'">
            <div class="table-responsive">
                <table class="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Working Time</th>
                            <th class="!text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="pharmacy in filteredPharmaciesList" :key="pharmacy.id">
                            <tr>
                                <td>
                                    <img :src="pharmacy.image" class="w-12 h-12 object-cover" alt="pharmacy image" />
                                </td>
                                <td>{{ pharmacy.name }}</td>
                                <td>{{ pharmacy.email }}</td>
                                <td>{{ pharmacy.phone }}</td>
                                <td>{{ pharmacy.workingTime }}</td>
                                <td>
                                    <div class="flex gap-4 items-center justify-center">
                                        <button type="button" class="btn btn-sm btn-outline-primary" @click="editPharmacy(pharmacy)">Edit</button>
                                        <button type="button" class="btn btn-sm btn-outline-danger" @click="deletePharmacy(pharmacy)">Delete</button>
                                        <button type="button" class="btn btn-sm btn-outline-info" @click="viewMedicines(pharmacy)">Medicines</button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </template>
    </div>
    <template v-if="displayType === 'grid'">
        <div class="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full">
            <template v-for="pharmacy in filteredPharmaciesList" :key="pharmacy.id">
                <div class="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                    <div class="bg-white/40 rounded-t-md bg-[url('/assets/images/notification-bg.png')] bg-center bg-cover p-6 pb-0">
                        <img class="object-contain w-4/5 max-h-40 mx-auto" :src="pharmacy.image" />
                    </div>
                    <div class="px-6 pb-24 -mt-10 relative">
                        <div class="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                            <div class="text-xl">{{ pharmacy.name }}</div>
                            <div class="text-white-dark">{{ pharmacy.phone }}</div>
                        </div>
                        <div class="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                            <div class="flex items-center">
                                <div class="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                                <div class="truncate text-white-dark">{{ pharmacy.email }}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="flex-none ltr:mr-2 rtl:ml-2">Working Time :</div>
                                <div class="text-white-dark">{{ pharmacy.workingTime }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                        <button type="button" class="btn btn-outline-primary w-1/2" @click="editPharmacy(pharmacy)">Edit</button>
                        <button type="button" class="btn btn-outline-danger w-1/2" @click="deletePharmacy(pharmacy)">Delete</button>
                        <button type="button" class="btn btn-outline-info w-1/2" @click="viewMedicines(pharmacy)">Medicines</button>
                    </div>
                </div>
            </template>
        </div>
    </template>

    <!-- Edit Pharmacy Modal -->
    <TransitionRoot appear :show="addPharmacyModal" as="template">
        <Dialog as="div" @close="addPharmacyModal = false" class="relative z-[51]">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button
                                type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="addPharmacyModal = false"
                            >
                                <icon-x />
                            </button>
                            <div class="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {{ params.id ? 'Edit Pharmacy' : 'Add Pharmacy' }}
                            </div>
                            <div class="p-5">
                                <form @submit.prevent="savePharmacy">
                                    <div class="mb-5">
                                        <label for="name">Name</label>
                                        <input id="name" type="text" placeholder="Enter Name" class="form-input" v-model="params.name" />
                                    </div>
                                    <div class="mb-5">
                                        <label for="email">Email</label>
                                        <input id="email" type="email" placeholder="Enter Email" class="form-input" v-model="params.email" />
                                    </div>
                                    <div class="mb-5">
                                        <label for="number">Phone Number</label>
                                        <input id="number" type="text" placeholder="Enter Phone Number" class="form-input" v-model="params.phone" />
                                    </div>
                                    <div class="mb-5">
                                        <label for="workingTime">Working Time</label>
                                        <input id="workingTime" type="text" placeholder="Enter Working Time" class="form-input" v-model="params.workingTime" />
                                    </div>
                                    <div class="mb-5">
                                        <label for="image">Image URL</label>
                                        <input id="image" type="text" placeholder="Enter Image URL" class="form-input" v-model="params.image" />
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <button type="submit" class="btn btn-primary ml-4 rtl:mr-4">Save Pharmacy</button>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { Dialog, TransitionRoot, TransitionChild } from '@headlessui/vue';
    import Dp1 from '@/assets/house2.png';
    import Dp2 from '@/assets/house3.png';

    const addPharmacyModal = ref(false);
    const displayType = ref('list');
    const searchPharmacy = ref('');
    const pharmacies = ref([
        { id: 1, name: 'Pharmacy A', image: Dp1, email: 'email@example.com', phone: '123-456-7890', workingTime: '9 AM - 5 PM' },
        { id: 2, name: 'Pharmacy B', image: Dp2, email: 'email@example.com', phone: '123-456-7890', workingTime: '9 AM - 5 PM' },
    ]);

    const filteredPharmaciesList = computed(() => {
        return pharmacies.value.filter((pharmacy) => pharmacy.name.toLowerCase().includes(searchPharmacy.value.toLowerCase()));
    });

    const params = ref({ id: null, name: '', email: '', phone: '', workingTime: '', image: '' });

    function editPharmacy(pharmacy = {}) {
        addPharmacyModal.value = true;
        params.value = pharmacy.id ? { ...pharmacy } : { id: null, name: '', email: '', phone: '', workingTime: '', image: '' };
    }

    function deletePharmacy(pharmacy) {
        const index = pharmacies.value.findIndex((p) => p.id === pharmacy.id);
        if (index !== -1) {
            pharmacies.value.splice(index, 1);
        }
    }

    function viewMedicines(pharmacy) {
        alert(`Viewing medicines for pharmacy: ${pharmacy.name}`);
    }

    function savePharmacy() {
        if (params.value.id) {
            const index = pharmacies.value.findIndex((p) => p.id === params.value.id);
            pharmacies.value[index] = { ...params.value };
        } else {
            params.value.id = pharmacies.value.length + 1;
            pharmacies.value.push({ ...params.value });
        }
        addPharmacyModal.value = false;
        alert('Pharmacy saved!');
    }
</script>
