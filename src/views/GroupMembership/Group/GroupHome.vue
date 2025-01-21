<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Group Membership', route: { name: 'groupMembershipHome' } }, { label: 'Groups' }]" />

        <div class="panel pb-0 mt-6">
            <div class="flex justify-between">
                <h5 class="font-semibold text-lg mb-5">Groups</h5>
                <div class="">
                    <RouterLink :to="{ name: 'groupMembershipGroupCreate' }" class="btn btn-info">
                        <IconPlus class="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                        Create Group
                    </RouterLink>
                </div>
            </div>

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
                    <template #name="data">
                        <RouterLink :to="{ name: 'groupMembershipGroupDetail', params: { groupId: data.value.id } }">
                            <div class="flex flex-col">
                                <div class="w-24 h-16">
                                    <img class="w-full h-full object-cover" :src="data.value.image"
                                        :alt="data.value.name" />
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-base text-primary font-black hover:underline">{{ data.value.name
                                        }}</span>
                                </div>
                            </div>
                        </RouterLink>
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
                                            <RouterLink
                                                :to="{ name: 'groupMembershipGroupDetail', params: { groupId: data.value.id } }">
                                                <IconEye class="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                View
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink
                                                :to="{ name: 'groupMembershipGroupEdit', params: { groupId: data.value.id } }">
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

<script setup lang="ts">
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import TextInput from '@/components/Shared/Input/TextInput.vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { ref } from 'vue';

const getRowIndex = (row) => {
    return rows.value.findIndex(r => r === row) + 1;
}

const search = ref('')
const isLoading = ref(false)

const cols = ref([
    { field: 'id', title: 'ID', isUnique: true, hide: false },
    { field: 'name', title: 'Name', hide: false },
    { field: 'country', title: 'Country', hide: false },
    { field: 'state', title: 'State', hide: false },
    { field: 'LGA', title: 'LGA', hide: false },
    { field: 'group_type', title: 'Group Type', sort: false, hide: false },
    { field: 'group_admins', title: 'Admins', hide: false },
    // { field: 'status', title: 'Status', hide: false },
    { field: 'actions', title: 'Actions', sort: false, hide: false },
]) || [];

const rows = ref([
    {
        id: 1,
        name: "Tech Innovators",
        group_type: "closed",
        group_admins: 3,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group dedicated to fostering innovation in technology.",
        country: "Nigeria",
        state: "Lagos",
        LGA: "Ikeja",
        leaders_name: "John Doe",
        email: "john.doe@example.com",
        mobile_number: "+2347012345678",
        group_logo: "tech_innovators_logo.png"
    },
    {
        id: 2,
        name: "Health Enthusiasts",
        group_type: "open",
        group_admins: 2,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group promoting healthy living and wellness.",
        country: "USA",
        state: "California",
        LGA: "Los Angeles",
        leaders_name: "Jane Smith",
        email: "jane.smith@example.com",
        mobile_number: "+1234567890",
        group_logo: "health_enthusiasts_logo.png"
    },
    {
        id: 3,
        name: "Art Lovers",
        group_type: "closed",
        group_admins: 4,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A community for art lovers and artists.",
        country: "France",
        state: "Île-de-France",
        LGA: "Paris",
        leaders_name: "Pierre Dupont",
        email: "pierre.dupont@example.com",
        mobile_number: "+33123456789",
        group_logo: "art_lovers_logo.png"
    },
    {
        id: 4,
        name: "Book Club",
        group_type: "open",
        group_admins: 1,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group for book enthusiasts to share and discuss books.",
        country: "UK",
        state: "England",
        LGA: "London",
        leaders_name: "Emily Brown",
        email: "emily.brown@example.com",
        mobile_number: "+441234567890",
        group_logo: "book_club_logo.png"
    },
    {
        id: 5,
        name: "Fitness Freaks",
        group_type: "closed",
        group_admins: 2,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group dedicated to fitness and exercise.",
        country: "Australia",
        state: "New South Wales",
        LGA: "Sydney",
        leaders_name: "Michael Johnson",
        email: "michael.johnson@example.com",
        mobile_number: "+61234567890",
        group_logo: "fitness_freaks_logo.png"
    },
    {
        id: 6,
        name: "Travel Buddies",
        group_type: "open",
        group_admins: 3,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group for travel enthusiasts to share experiences.",
        country: "Canada",
        state: "Ontario",
        LGA: "Toronto",
        leaders_name: "Sarah Lee",
        email: "sarah.lee@example.com",
        mobile_number: "+14161234567",
        group_logo: "travel_buddies_logo.png"
    },
    {
        id: 7,
        name: "Music Maniacs",
        group_type: "closed",
        group_admins: 4,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A community for music lovers and musicians.",
        country: "Germany",
        state: "Bavaria",
        LGA: "Munich",
        leaders_name: "Hans Müller",
        email: "hans.muller@example.com",
        mobile_number: "+491234567890",
        group_logo: "music_maniacs_logo.png"
    },
    {
        id: 8,
        name: "Foodies United",
        group_type: "open",
        group_admins: 2,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group for food lovers and culinary enthusiasts.",
        country: "Italy",
        state: "Lazio",
        LGA: "Rome",
        leaders_name: "Giovanni Rossi",
        email: "giovanni.rossi@example.com",
        mobile_number: "+390612345678",
        group_logo: "foodies_united_logo.png"
    },
    {
        id: 9,
        name: "Science Geeks",
        group_type: "closed",
        group_admins: 3,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group for science enthusiasts and professionals.",
        country: "India",
        state: "Maharashtra",
        LGA: "Mumbai",
        leaders_name: "Rajesh Kumar",
        email: "rajesh.kumar@example.com",
        mobile_number: "+919876543210",
        group_logo: "science_geeks_logo.png"
    },
    {
        id: 10,
        name: "Nature Lovers",
        group_type: "open",
        group_admins: 2,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group for people who love nature and outdoor activities.",
        country: "Brazil",
        state: "São Paulo",
        LGA: "São Paulo",
        leaders_name: "Ana Silva",
        email: "ana.silva@example.com",
        mobile_number: "+5511987654321",
        group_logo: "nature_lovers_logo.png"
    },
    {
        id: 11,
        name: "Gaming Guild",
        group_type: "closed",
        group_admins: 1,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A group for video game enthusiasts and developers.",
        country: "Japan",
        state: "Tokyo",
        LGA: "Shibuya",
        leaders_name: "Yuki Tanaka",
        email: "yuki.tanaka@example.com",
        mobile_number: "+81312345678",
        group_logo: "gaming_guild_logo.png"
    },
    {
        id: 12,
        name: "Photography Fans",
        group_type: "open",
        group_admins: 3,
        image: "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A community for photography enthusiasts and professionals.",
        country: "South Africa",
        state: "Gauteng",
        LGA: "Johannesburg",
        leaders_name: "Thabo Nkosi",
        email: "thabo.nkosi@example.com",
        mobile_number: "+27123456789",
        group_logo: "photography_fans_logo.png"
    }
]);
</script>
