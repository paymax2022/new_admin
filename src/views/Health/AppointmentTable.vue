<template>
    <div>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Today's Appointment</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search1" type="text" class="form-input w-auto" placeholder="Search..." />
                </div>
            </div>

            <div class="datatable">
                <vue3-datatable
                    :rows="rows"
                    :columns="datatable1Cols"
                    :totalRows="rows?.length"
                    :sortable="true"
                    sortColumn="firstName"
                    :search="search1"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #firstName="data">
                        <div class="flex items-center w-max">
                            <img class="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" :src="`/assets/images/profile-${data.value.id}.jpeg`" />
                            {{ data.value.firstName + ' ' + data.value.lastName }}
                        </div>
                    </template>
                    <template #dob="data">
                        {{ formatDate(data.value.dob) }}
                    </template>
                    <template #status>
                        <span class="badge" :class="`bg-${randomColor()}`">{{ randomStatus() }}</span>
                    </template>
                    <template #action>
                        <div class="text-center">
                            <button type="button" v-tippy>
                                <icon-x-circle />
                            </button>
                            <tippy>Delete</tippy>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import IconXCircle from '@/components/icon/icon-x-circle.vue';

    useMeta({ title: 'Multiple Tables' });
    const search1 = ref('');

    const datatable1Cols = ref([
        { field: 'id', title: 'ID' },
        { field: 'doctorName', title: 'Doctor Name' },
        { field: 'patientName', title: 'Patient Name' },
        { field: 'date', title: ' Date' },
        { field: 'time', title: 'Time' },
        { field: 'phone', title: 'Phone No.' },
        { field: 'duration', title: 'Duration' },
        { field: 'status', title: 'Status' },
    ]);
    const rows = ref([
        {
            id: 1,
            doctorName: 'Parloff Veekthor',
            patientName: 'Veekthor Parloff',
            email: 'vp@parloff.com',
            date: '05-01-2025',
            time: '4:00',
            phone: '+1 (821) 447-3782',
            duration: '40mins',
            isActive: true,
        },
        {
            id: 2,
            doctorName: 'Parloff Quan',
            patientName: 'Parloff Nine',
            email: 'vp@parloff.com',
            date: '05-01-2025',
            time: '4:00',
            phone: '+3 (981) 497-3482',
            duration: '40mins',
            isActive: false,
        },
    ]);

    const formatDate = (date) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const randomColor = () => {
        const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };

    const randomStatus = () => {
        const status = ['PAID', 'APPROVED', 'FAILED', 'CANCEL', 'SUCCESS', 'PENDING', 'COMPLETE'];
        const random = Math.floor(Math.random() * status.length);
        return status[random];
    };
</script>
