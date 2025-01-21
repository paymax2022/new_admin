<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Bills Payment', route: { name: 'billsPaymentHome' } }, { label: 'Airtime & Data' }]" />

        <div class="panel pb-0 mt-6">
            <h5 class="font-semibold text-lg mb-5">Airtime & Data</h5>

            <div class="datatable">
                <div class="mb-5 flex gap-2">
                    <TextInput v-model="search" class="max-w-xs" placeholder="Search..." />
                    <div class="dropdown">
                        <Popper placement="bottom-start" offsetDistance="0" class="align-middle">
                            <button type="button"
                                class="flex items-center border font-semibold border-[#e0e6ed] dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark">
                                <span class="ltr:mr-1 rtl:ml-1">Columns</span>
                                <IconCaretDown class="w-5 h-5" />
                            </button>
                            <template #content>
                                <ul class="whitespace-nowrap">
                                    <template v-for="(col, i) in cols" :key="i">
                                        <li>
                                            <div class="flex items-center px-4 py-1">
                                                <label class="cursor-pointer mb-0">
                                                    <input type="checkbox" class="form-checkbox" :id="`chk-${i}`"
                                                        :value="col.field" @change="col.hide = !col.hide"
                                                        :checked="!col.hide" />
                                                    <span :for="`chk-${i}`" class="ltr:ml-2 rtl:mr-2">{{ col.title
                                                        }}</span>
                                                </label>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                </div>

                <Vue3Datatable :loading="isLoading" :rows="rows" :columns="cols" :totalRows="rows?.length"
                    :sortable="true" sortColumn="firstName" :hasCheckbox="true" skin="whitespace-nowrap bh-table-hover"
                    :search="search">
                    <template #id="data">
                        <strong class="">{{ getRowIndex(data.value) }}</strong>
                    </template>
                    <template #provider="data">
                        <div class="flex flex-cols gap-2">
                            <span class="font-semibold">{{ data.value.network_provider }}</span>
                            <span class="text-lg font-semibold">{{ data.value.type }}</span>
                        </div>
                    </template>
                    <template #user="data">
                        <RouterLink to="#">
                            <div class="flex flex-col">
                                <div class="flex flex-col">
                                    <span class="text-base text-primary font-black hover:underline">{{
                                        data.value.user.name
                                    }}</span>
                                    <span class="text-sm font-semibold">({{ data.value.user.email }})</span>
                                </div>
                            </div>
                        </RouterLink>
                    </template>
                    <template #status="data">
                        <span class="bg-danger" />
                        <span class=" bg-warning" />
                        <span
                            :class="`badge bg-${data.value.status == 'failed' ? 'danger' : data.value.status == 'pending' ? 'warning' : 'success'}`">
                            {{ data.value.status }}
                        </span>
                    </template>
                    <template #actions="data">
                        <div class="dropdown">
                            <Popper placement="bottom-end" offsetDistance="0"
                                class="align-middle p-3 rounded-full hover:bg-gray-200">
                                <a href="javascript:;">
                                    <IconHorizontalDots class="rotate-90 opacity-70" />
                                </a>
                                <template #content="{ close }">
                                    <ul @click="close()" class="whitespace-nowrap">
                                        <li>
                                            <RouterLink to="#">
                                                <IconEye class="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                View
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="#">
                                                <IconPencilPaper class="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                Edit
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <button class="!text-danger hover:!text-danger">
                                                <IconTrashLines class="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </template>
                </Vue3Datatable>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import TextInput from '@/components/Shared/Input/TextInput.vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { ref } from 'vue';

const search = ref('')
const isLoading = ref(false)

const cols = ref([
    { field: 'id', title: 'ID', isUnique: true, hide: false },
    { field: 'beneficiary_number', title: 'Beneficiary Number', sort: false, hide: false },
    { field: 'provider', title: 'Provider & Type', hide: false },
    { field: 'amount', title: 'Amount', hide: false },
    { field: 'plan', title: 'Plan', hide: false },
    { field: 'user', title: 'User', hide: false },
    { field: 'transaction_id', title: 'Transaction Id', hide: false },
    { field: 'status', title: 'Status', hide: false },
    { field: 'actions', title: 'Actions', hide: false },
])

const rows = ref([
    {
        beneficiary_number: "+2347012345678",
        type: "airtime",
        network_provider: "MTN",
        amount: 1000,
        plan: "One-time",
        transaction_id: "TX1234567890",
        status: "completed",
        user: {
            name: "John Doe",
            email: "john.doe@example.com"
        }
    },
    {
        beneficiary_number: "+2348012345678",
        type: "data",
        network_provider: "Airtel",
        amount: 2000,
        plan: "Weekly Plan",
        transaction_id: "TX0987654321",
        status: "pending",
        user: {
            name: "Jane Smith",
            email: "jane.smith@example.com"
        }
    },
    {
        beneficiary_number: "+2349012345678",
        type: "airtime",
        network_provider: "Glo",
        amount: 500,
        plan: "One-time",
        transaction_id: "TX1122334455",
        status: "completed",
        user: {
            name: "Alice Johnson",
            email: "alice.johnson@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345679",
        type: "data",
        network_provider: "9mobile",
        amount: 1500,
        plan: "Monthly Plan",
        transaction_id: "TX2233445566",
        status: "failed",
        user: {
            name: "Bob Brown",
            email: "bob.brown@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345671",
        type: "airtime",
        network_provider: "MTN",
        amount: 750,
        plan: "One-time",
        transaction_id: "TX3344556677",
        status: "completed",
        user: {
            name: "Charlie Green",
            email: "charlie.green@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345672",
        type: "data",
        network_provider: "Airtel",
        amount: 2500,
        plan: "Daily Plan",
        transaction_id: "TX4455667788",
        status: "pending",
        user: {
            name: "David Black",
            email: "david.black@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345673",
        type: "airtime",
        network_provider: "Glo",
        amount: 1000,
        plan: "One-time",
        transaction_id: "TX5566778899",
        status: "completed",
        user: {
            name: "Ella White",
            email: "ella.white@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345674",
        type: "data",
        network_provider: "9mobile",
        amount: 500,
        plan: "Weekly Plan",
        transaction_id: "TX6677889900",
        status: "failed",
        user: {
            name: "Frank Red",
            email: "frank.red@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345675",
        type: "airtime",
        network_provider: "MTN",
        amount: 2000,
        plan: "One-off",
        transaction_id: "TX7788990011",
        status: "completed",
        user: {
            name: "Grace Blue",
            email: "grace.blue@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345676",
        type: "data",
        network_provider: "Airtel",
        amount: 1500,
        plan: "Monthly Plan",
        transaction_id: "TX8899001122",
        status: "pending",
        user: {
            name: "Henry Orange",
            email: "henry.orange@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345677",
        type: "airtime",
        network_provider: "Glo",
        amount: 750,
        plan: "Weekly Plan",
        transaction_id: "TX9900112233",
        status: "completed",
        user: {
            name: "Ivy Yellow",
            email: "ivy.yellow@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345670",
        type: "data",
        network_provider: "9mobile",
        amount: 2500,
        plan: "Daily Plan",
        transaction_id: "TX0011223344",
        status: "failed",
        user: {
            name: "Jack Purple",
            email: "jack.purple@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345680",
        type: "airtime",
        network_provider: "MTN",
        amount: 1000,
        plan: "One-off",
        transaction_id: "TX1122334456",
        status: "completed",
        user: {
            name: "Karen Pink",
            email: "karen.pink@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345681",
        type: "data",
        network_provider: "Airtel",
        amount: 500,
        plan: "Weekly Plan",
        transaction_id: "TX2233445567",
        status: "pending",
        user: {
            name: "Leo Grey",
            email: "leo.grey@example.com"
        }
    },
    {
        beneficiary_number: "+2347012345682",
        type: "airtime",
        network_provider: "Glo",
        amount: 2000,
        plan: "One-time",
        transaction_id: "TX3344556678",
        status: "completed",
        user: {
            name: "Mia Cyan",
            email: "mia.cyan@example.com"
        }
    }
])

const getRowIndex = (row) => {
    return rows.value.findIndex(r => r === row) + 1;
}
</script>
