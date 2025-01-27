<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn btn-danger gap-2" @click="deleteRow()">
                            <icon-trash-lines />
                            Delete
                        </button>
                        <router-link to="/apps/invoice/add" class="btn btn-primary gap-2">
                            <icon-plus />
                            Add New
                        </router-link>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :rows="items"
                    :columns="cols"
                    :totalRows="items?.length"
                    :hasCheckbox="true"
                    :sortable="true"
                    :search="search"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #invoice="data">
                        <router-link to="/apps/invoice/preview" class="text-primary underline font-semibold hover:no-underline"
                            >#{{ data.value.invoice }}</router-link
                        >
                    </template>
                    <template #name="data">
                        <div class="flex items-center font-semibold">
                            <div class="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                                <img class="h-8 w-8 rounded-full object-cover" :src="`/assets/images/profile-${data.value.id}.jpeg`" />
                            </div>
                            {{ data.value.name }}
                        </div>
                    </template>
                    <template #amount="data">
                        <div class="font-semibold ltr:text-right rtl:text-left">${{ data.value.amount }}</div>
                    </template>
                    <template #status="data">
                        <span class="badge" :class="[data.value.status.toLowerCase() === 'Active' ? 'badge-outline-success' : 'badge-outline-danger']">{{
                            data.value.status
                        }}</span>
                    </template>
                    <template #actions="data">
                        <div class="flex gap-4 items-center justify-center">
                            <router-link to="/apps/invoice/edit" class="hover:text-info">
                                <icon-edit class="w-4.5 h-4.5" />
                            </router-link>
                            <router-link to="/apps/invoice/preview" class="hover:text-primary">
                               <icon-eye />
                            </router-link>
                            <button type="button" class="hover:text-danger" @click="deleteRow(`${data.value.id}`)">
                                <icon-trash-lines />
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';

    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';

    useMeta({ title: 'Invoice List' });

    const datatable: any = ref(null);
    const search = ref('');
    const cols = ref([
        { field: 'name', title: 'Rider' },
        { field: 'email', title: 'Email' },
        { field: 'date', title: 'Date Registered' },
        { field: 'status', title: 'Status' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);
    const items = ref([
        {
            id: 1,
            name: 'Laurie Fox',
            email: 'lauriefox@company.com',
            date: '15 Dec 2020',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Alexander Gray',
            email: 'alexGray3188@gmail.com',
            date: '20 Dec 2020',
            status: 'Active',
        },
        {
            id: 3,
            name: 'James Taylor',
            email: 'jamestaylor468@gmail.com',
            date: '27 Dec 2020',
            status: 'Pending',
        },
        {
            id: 4,
            name: 'Grace Roberts',
            email: 'graceRoberts@company.com',
            date: '31 Dec 2020',
            status: 'Active',
        },
        {
            id: 5,
            name: 'Donna Rogers',
            email: 'donnaRogers@hotmail.com',
            date: '03 Jan 2021',
            status: 'Active',
        },
        
    ]);
    const searchText = ref('');
    const columns = ref(['id', 'invoice', 'name', 'email', 'date', 'amount', 'status', 'actions']);
    const tableOption = ref({
        headings: {
            id: (h: any, row: any, index: number) => {
                return '#';
            },
        },
        perPage: 10,
        perPageValues: [10, 20, 30, 50, 100],
        skin: 'table-hover',
        columnsClasses: { actions: 'actions !text-center w-1' },
        pagination: { show: true, nav: 'scroll', chunk: 10 },
        texts: {
            count: 'Showing {from} to {to} of {count} entries',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: '',
        },
        resizableColumns: false,
        sortable: ['invoice', 'name', 'email', 'date', 'amount', 'status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
    });

    const deleteRow = (item: any = null) => {
        if (confirm('Are you sure want to delete selected row ?')) {
            if (item) {
                items.value = items.value.filter((d) => d.id != item);
                datatable.value.clearSelectedRows();
            } else {
                let selectedRows = datatable.value.getSelectedRows();
                const ids = selectedRows.map((d) => {
                    return d.id;
                });
                items.value = items.value.filter((d) => !ids.includes(d.id as never));
                datatable.value.clearSelectedRows();
            }
        }
    };
</script>
