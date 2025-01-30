<template>
    <div class="flex items-center justify-between flex-wrap gap-4">
        <h2 class="text-xl">Doctors</h2>
        <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
            <div class="flex gap-3">
                <div>
                    <button type="button" class="btn btn-primary" @click="editDoctor()">
                        <icon-user-plus class="ltr:mr-2 rtl:ml-2" />
                        Add Doctor
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        class="btn btn-outline-primary p-2"
                        :class="{ 'bg-primary text-white': displayType === 'list' }"
                        @click="displayType = 'list'"
                    >
                        <icon-list-check />
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        class="btn btn-outline-primary p-2"
                        :class="{ 'bg-primary text-white': displayType === 'grid' }"
                        @click="displayType = 'grid'"
                    >
                        <icon-layout-grid />
                    </button>
                </div>
            </div>

            <div class="relative">
                <input
                    type="text"
                    placeholder="Search Doctors"
                    class="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
                    v-model="searchDoctor"
                    @keyup="searchDoctors"
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialization</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th class="!text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="doctor in filteredDoctorsList" :key="doctor.id">
                            <tr>
                                <td>
                                    <div class="flex items-center w-max">
                                        <div v-show="doctor.path" class="w-max">
                                            <img :src="doctor.path" class="h-10 w-10 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                        </div>
                                        <div
                                            v-show="!doctor.path && doctor.name"
                                            class="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full bg-primary text-white text-sm font-semibold"
                                        >
                                            {{ doctor.name.charAt(0) + '' + doctor.name.charAt(doctor.name.indexOf(' ') + 1) }}
                                        </div>
                                        <div
                                            v-show="!doctor.path && !doctor.name"
                                            class="border border-gray-300 dark:border-gray-800 rounded-full grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2"
                                        >
                                            <icon-user class="w-4.5 h-4.5" />
                                        </div>
                                        <div>{{ doctor.name }}</div>
                                    </div>
                                </td>
                                <td>{{ doctor.email }}</td>
                                <td class="whitespace-nowrap">{{ doctor.role }}</td>
                                <td class="whitespace-nowrap">{{ doctor.phone }}</td>
                                <td>
                                    <select v-model="doctor.status" class="form-select py-1 px-2" @change="updateDoctorStatus(doctor)">
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Request">Request</option>
                                    </select>
                                </td>
                                <td>
                                    <div class="flex gap-4 items-center justify-center">
                                        <button type="button" class="btn btn-sm btn-outline-primary" @click="editDoctor(doctor)">Edit</button>
                                        <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteDoctor(doctor)">Delete</button>
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
            <template v-for="doctor in filteredDoctorsList" :key="doctor.id">
                <div class="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                    <div class="bg-white/40 rounded-t-md bg-[url('/assets/images/notification-bg.png')] bg-center bg-cover p-6 pb-0">
                        <template v-if="doctor.path">
                            <img class="object-contain w-4/5 max-h-40 mx-auto" :src="doctor.path" />
                        </template>
                    </div>
                    <div class="px-6 pb-24 -mt-10 relative">
                        <div class="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                            <div class="text-xl">{{ doctor.name }}</div>
                            <div class="text-white-dark">{{ doctor.role }}</div>
                            <div class="flex items-center justify-between flex-wrap mt-6 gap-3">
                                <div class="flex-auto">
                                    <div class="text-info">{{ doctor.experience }} years</div>
                                    <div>Experience</div>
                                </div>
                                <div class="flex-auto">
                                    <div class="text-info">{{ doctor.patients }}</div>
                                    <div>Patients</div>
                                </div>
                                <div class="flex-auto">
                                    <div class="text-info">{{ doctor.reviews }}</div>
                                    <div>Reviews</div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <ul class="flex space-x-4 rtl:space-x-reverse items-center justify-center">
                                    <li>
                                        <a href="javascript:;" class="btn btn-outline-primary p-0 h-7 w-7 rounded-full">
                                            <icon-facebook />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" class="btn btn-outline-primary p-0 h-7 w-7 rounded-full">
                                            <icon-instagram />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" class="btn btn-outline-primary p-0 h-7 w-7 rounded-full">
                                            <icon-linkedin />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" class="btn btn-outline-primary p-0 h-7 w-7 rounded-full">
                                            <icon-twitter />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                            <div class="flex items-center">
                                <div class="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                                <div class="truncate text-white-dark">{{ doctor.email }}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="flex-none ltr:mr-2 rtl:ml-2">Phone :</div>
                                <div class="text-white-dark">{{ doctor.phone }}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="flex-none ltr:mr-2 rtl:ml-2">Address :</div>
                                <div class="text-white-dark">{{ doctor.address }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                        <button type="button" class="btn btn-outline-primary w-1/2" @click="editDoctor(doctor)">Edit</button>
                        <button type="button" class="btn btn-outline-danger w-1/2" @click="deleteDoctor(doctor)">Delete</button>
                    </div>
                </div>
            </template>
        </div>
    </template>
    <TransitionRoot appear :show="addDoctorModal" as="template">
        <Dialog as="div" @close="addDoctorModal = false" class="relative z-[51]">
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
                                @click="addDoctorModal = false"
                            >
                                <icon-x />
                            </button>
                            <div class="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {{ params.id ? 'Edit Doctor' : 'Add Doctor' }}
                            </div>
                            <div class="p-5">
                                <form @submit.prevent="saveDoctor">
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
                                        <label for="specialization">Specialization</label>
                                        <input id="specialization" type="text" placeholder="Enter Specialization" class="form-input" v-model="params.role" />
                                    </div>

                                    <div class="flex justify-end items-center mt-8">
                                        <button type="button" class="btn btn-outline-danger" @click="addDoctorModal = false">Cancel</button>
                                        <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            {{ params.id ? 'Update' : 'Add' }}
                                        </button>
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
<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import Swal from 'sweetalert2';
    import { useMeta } from '@/composables/use-meta';

    import IconUserPlus from '@/components/icon/icon-user-plus.vue';
    import IconListCheck from '@/components/icon/icon-list-check.vue';
    import IconLayoutGrid from '@/components/icon/icon-layout-grid.vue';
    import IconSearch from '@/components/icon/icon-search.vue';
    import IconUser from '@/components/icon/icon-user.vue';
    import IconFacebook from '@/components/icon/icon-facebook.vue';
    import IconInstagram from '@/components/icon/icon-instagram.vue';
    import IconLinkedin from '@/components/icon/icon-linkedin.vue';
    import IconTwitter from '@/components/icon/icon-twitter.vue';
    import IconX from '@/components/icon/icon-x.vue';
    import Dp1 from '@/assets/house2.png';
    import Dp2 from '@/assets/house3.png';

    useMeta({ title: 'Doctors' });

    const defaultParams = ref({
        id: null,
        name: '',
        email: '',
        role: '',
        phone: '',
        location: '',
    });
    const displayType = ref('list');
    const addDoctorModal = ref(false);
    const params = ref(JSON.parse(JSON.stringify(defaultParams.value)));
    const filteredDoctorsList: any = ref([]);
    const searchDoctor = ref('');
    const updateDoctorStatus = (doctor) => {
        showMessage(`Status for ${doctor.name} updated to ${doctor.status}`);
    };
    const doctorList = ref([
        {
            id: 1,
            path: Dp1,
            name: 'Alan Green',
            role: 'Cardiologist',
            email: 'alan@mail.com',
            location: 'Boston, USA',
            phone: '+1 202 555 0197',
            status: 'Approved',
            posts: 25,
            followers: '5K',
            following: 500,
            experience: 1,
        },
        {
            id: 2,
            path: Dp2,
            name: 'Linda Nelson',
            role: 'Neurologist',
            email: 'linda@mail.com',
            location: 'Sydney, Australia',
            phone: '+1 202 555 0170',
            status: 'Approved',
            posts: 25,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 3,
            path: Dp1,
            name: 'Lila Perry',
            role: 'Pediatrician',
            email: 'lila@mail.com',
            location: 'Miami, USA',
            phone: '+1 202 555 0105',
            status: 'Approved',
            posts: 20,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 4,
            path: Dp2,
            name: 'Andy King',
            role: 'Surgeon',
            email: 'andy@mail.com',
            location: 'Tokyo, Japan',
            phone: '+1 202 555 0194',
            status: 'Approved',
            posts: 25,
            followers: '21.5K',
            following: 300,
        },
    ]);

    onMounted(() => {
        searchDoctors();
    });

    const searchDoctors = () => {
        filteredDoctorsList.value = doctorList.value.filter((d) => d.name.toLowerCase().includes(searchDoctor.value.toLowerCase()));
    };

    const editDoctor = (doctor: any = null) => {
        params.value = JSON.parse(JSON.stringify(defaultParams.value));
        if (doctor) {
            params.value = JSON.parse(JSON.stringify(doctor));
        }

        addDoctorModal.value = true;
    };

    const saveDoctor = () => {
        if (!params.value.name) {
            showMessage('Name is required.', 'error');
            return true;
        }
        if (!params.value.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.value.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }
        if (!params.value.role) {
            showMessage('Specialization is required.', 'error');
            return true;
        }

        if (params.value.id) {
            let doctor: any = doctorList.value.find((d) => d.id === params.value.id);
            doctor.name = params.value.name;
            doctor.email = params.value.email;
            doctor.role = params.value.role;
            doctor.phone = params.value.phone;
            doctor.location = params.value.location;
        } else {
            let maxDoctorId = doctorList.value.length
                ? doctorList.value.reduce((max, character) => (character.id > max ? character.id : max), doctorList.value[0].id)
                : 0;

            let doctor = {
                id: maxDoctorId + 1,
                path: '',
                name: params.value.name,
                email: params.value.email,
                role: params.value.role,
                phone: params.value.phone,
                location: params.value.location,
                posts: 20,
                followers: '5K',
                following: 500,
            };
            doctorList.value.splice(0, 0, doctor);
            searchDoctors();
        }

        showMessage('Doctor has been saved successfully.');
        addDoctorModal.value = false;
    };

    const deleteDoctor = (doctor: any = null) => {
        doctorList.value = doctorList.value.filter((d) => d.id != doctor.id);
        searchDoctors();
        showMessage('Doctor has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
</script>
