<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Voting', route: { name: 'votingHome' } }, { label: 'Contests', route: { name: 'votingContestHome' } }]" />

        <div class="panel pb-0 mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-5">Contests</h5>

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
                    <template #Title="data">
                        <RouterLink :to="{ name: 'votingContestDetail', params: { contestId: data.value.id } }"
                            class="">
                            <div class="flex items-center">
                                <div class="w-24 h-16 mr-4">
                                    <img class="w-full h-full object-cover" :src="data.value.logo"
                                        :alt="data.value.Title" />
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-base text-primary font-black hover:underline">{{ data.value.Title
                                        }}</span>
                                    <span class="text-sm font-semibold">{{ data.value.country }} - {{
                                        data.value.audience }}</span>
                                </div>
                            </div>
                        </RouterLink>
                    </template>
                    <template #fee_required="data">
                        <span v-if="data.value.fee_required" class="badge badge-outline-success">Yes</span>
                        <span v-else class="badge badge-outline-dark">No</span>
                    </template>
                    <template #registration_fee="data">
                        <span v-if="data.value.registration_fee > 0">$ {{ data.value.registration_fee }}</span>
                        <span v-else class="text-warning">Free</span>
                    </template>
                    <template #duration="data">
                        <div class="text-sm flex flex-col justify-center text-center">
                            <span>{{ data.value.start_date }}</span>
                            -
                            <span>{{ data.value.end_date }}</span>
                        </div>
                    </template>
                    <template #status="data">
                        <span
                            :class="`badge bg-${data.value.status == 'CLOSED' ? 'danger' : data.value.status == 'PENDING' ? 'warning' : 'success'}`">
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

<script setup lang="ts">
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
import IconPencil from '@/components/icon/icon-pencil.vue';
import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
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
    { field: 'Title', title: 'Title', hide: false },
    { field: 'Email', title: 'Created By', hide: false },
    { field: 'Category', title: 'Category', hide: false },
    { field: 'participants', title: 'Participants', hide: false },
    { field: 'round', title: 'Current Round', sort: false, hide: false },
    { field: 'fee_required', title: 'Requires Fee', hide: false },
    { field: 'registration_fee', title: 'Registration Fee', hide: false },
    { field: 'repeat_frequency', title: 'Repeat Frequency', hide: false },
    { field: 'duration', title: 'Duration', sort: false, hide: false },
    { field: 'status', title: 'Status', hide: false },
    { field: 'actions', title: 'Actions', sort: false, hide: false },
]) || [];
const rows = ref([
    {
        id: '1',
        Email: 'contact@contest1.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Innovation Challenge',
        Description: 'A contest to foster innovative ideas.',
        Category: 'Technology',
        Alias: 'innov_challenge',
        campaign_leader_name: 'John Doe',
        campaign_leader_role: 'Project Manager',
        campaign_leader_signature: 'http://example.com/signature1.png',
        assistant_leader_name: 'Jane Smith',
        assistant_leader_role: 'Assistant Manager',
        assistant_leader_signature: 'http://example.com/signature2.png',
        round: 1,
        fee_required: true,
        registration_fee: 50,
        repeat_frequency: 'Annually',
        user_id: 'user123',
        supported_by: 'Tech Corp',
        brief_objective: 'Encourage innovation in the tech industry.',
        sponsorship_email: 'sponsor@techcorp.com',
        contest_mechanism_summary: 'Participants submit their innovative ideas for evaluation.',
        country: 'USA',
        audience: 'Nigeria',
        start_date: '2025-02-01',
        end_date: '2025-02-28',
        created_at: '2025-01-01',
        participants: 100,
        prize: 10000,
        status: 'CLOSED'
    },
    {
        id: '2',
        Email: 'info@contest2.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Art Competition',
        Description: 'Showcase your artistic talents.',
        Category: 'Arts',
        Alias: 'art_comp',
        campaign_leader_name: 'Alice Brown',
        campaign_leader_role: 'Art Director',
        campaign_leader_signature: 'http://example.com/signature3.png',
        assistant_leader_name: 'Bob White',
        assistant_leader_role: 'Coordinator',
        assistant_leader_signature: 'http://example.com/signature4.png',
        round: 2,
        fee_required: false,
        registration_fee: 0,
        repeat_frequency: 'Quarterly',
        user_id: 'user456',
        supported_by: 'Art Foundation',
        brief_objective: 'Promote and support artists.',
        sponsorship_email: 'sponsor@artfoundation.com',
        contest_mechanism_summary: 'Participants submit their artworks for judging.',
        country: 'UK',
        audience: 'International',
        start_date: '2025-03-01',
        end_date: '2025-03-15',
        created_at: '2025-01-10',
        participants: 200,
        prize: 5000,
        status: 'ONGOING'
    },
    {
        id: '3',
        Email: 'support@contest3.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Coding Marathon',
        Description: 'A 24-hour coding competition.',
        Category: 'Programming',
        Alias: 'code_marathon',
        campaign_leader_name: 'Charlie Green',
        campaign_leader_role: 'Lead Developer',
        campaign_leader_signature: 'http://example.com/signature5.png',
        assistant_leader_name: 'Diana Blue',
        assistant_leader_role: 'HR Manager',
        assistant_leader_signature: 'http://example.com/signature6.png',
        round: 1,
        fee_required: true,
        registration_fee: 100,
        repeat_frequency: 'Monthly',
        user_id: 'user789',
        supported_by: 'Dev Hub',
        brief_objective: 'Enhance programming skills through competition.',
        sponsorship_email: 'sponsor@devhub.com',
        contest_mechanism_summary: 'Participants solve coding challenges within 24 hours.',
        country: 'Canada',
        audience: 'Nigeria',
        start_date: '2025-04-01',
        end_date: '2025-04-02',
        created_at: '2025-01-15',
        participants: 150,
        prize: 20000,
        status: 'PENDING'
    },
    {
        id: '4',
        Email: 'registration@contest4.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Music Talent Hunt',
        Description: 'Discover the next big music star.',
        Category: 'Music',
        Alias: 'music_hunt',
        campaign_leader_name: 'Eli Black',
        campaign_leader_role: 'Music Producer',
        campaign_leader_signature: 'http://example.com/signature7.png',
        assistant_leader_name: 'Fiona Gray',
        assistant_leader_role: 'Event Manager',
        assistant_leader_signature: 'http://example.com/signature8.png',
        round: 3,
        fee_required: false,
        registration_fee: 0,
        repeat_frequency: 'Biannually',
        user_id: 'user012',
        supported_by: 'Music Inc',
        brief_objective: 'Find and promote musical talents.',
        sponsorship_email: 'sponsor@musicinc.com',
        contest_mechanism_summary: 'Participants perform live in front of judges.',
        country: 'Australia',
        audience: 'International',
        start_date: '2025-05-01',
        end_date: '2025-05-30',
        created_at: '2025-01-20',
        participants: 250,
        prize: 15000,
        status: 'ACTIVE'
    },
    {
        id: '5',
        Email: 'apply@contest5.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Startup Pitch Fest',
        Description: 'Pitch your startup idea to investors.',
        Category: 'Business',
        Alias: 'startup_pitch',
        campaign_leader_name: 'George White',
        campaign_leader_role: 'CEO',
        campaign_leader_signature: 'http://example.com/signature9.png',
        assistant_leader_name: 'Hannah Black',
        assistant_leader_role: 'COO',
        assistant_leader_signature: 'http://example.com/signature10.png',
        round: 1,
        fee_required: true,
        registration_fee: 200,
        repeat_frequency: 'Annually',
        user_id: 'user345',
        supported_by: 'Invest Co',
        brief_objective: 'Help startups get funding and mentorship.',
        sponsorship_email: 'sponsor@investco.com',
        contest_mechanism_summary: 'Participants pitch their startup ideas to a panel of investors.',
        country: 'India',
        audience: 'Nigeria',
        start_date: '2025-06-01',
        end_date: '2025-06-30',
        created_at: '2025-01-25',
        participants: 50,
        prize: 50000,
        status: 'PENDING'
    },
    {
        id: '6',
        Email: 'info@contest6.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Environmental Awareness Contest',
        Description: 'Raise awareness about environmental issues.',
        Category: 'Environment',
        Alias: 'env_awareness',
        campaign_leader_name: 'Ivy Brown',
        campaign_leader_role: 'Environmental Scientist',
        campaign_leader_signature: 'http://example.com/signature11.png',
        assistant_leader_name: 'Jack Green',
        assistant_leader_role: 'Researcher',
        assistant_leader_signature: 'http://example.com/signature12.png',
        round: 2,
        fee_required: false,
        registration_fee: 0,
        repeat_frequency: 'Annually',
        user_id: 'user678',
        supported_by: 'Eco Org',
        brief_objective: 'Promote environmental sustainability.',
        sponsorship_email: 'sponsor@ecoorg.com',
        contest_mechanism_summary: 'Participants submit projects on environmental conservation.',
        country: 'Germany',
        audience: 'International',
        start_date: '2025-07-01',
        end_date: '2025-07-31',
        created_at: '2025-01-30',
        participants: 300,
        prize: 10000,
        status: 'CLOSED'
    },
    {
        id: '7',
        Email: 'contact@contest7.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Photography Contest',
        Description: 'Capture the best moments.',
        Category: 'Photography',
        Alias: 'photo_contest',
        campaign_leader_name: 'Kevin White',
        campaign_leader_role: 'Photographer',
        campaign_leader_signature: 'http://example.com/signature13.png',
        assistant_leader_name: 'Lily Black',
        assistant_leader_role: 'Assistant Photographer',
        assistant_leader_signature: 'http://example.com/signature14.png',
        round: 1,
        fee_required: true,
        registration_fee: 25,
        repeat_frequency: 'Quarterly',
        user_id: 'user901',
        supported_by: 'Photo World',
        brief_objective: 'Encourage and reward photography talents.',
        sponsorship_email: 'sponsor@photoworld.com',
        contest_mechanism_summary: 'Participants submit their best photographs for judging.',
        country: 'France',
        audience: 'International',
        start_date: '2025-08-01',
        end_date: '2025-08-15',
        created_at: '2025-02-05',
        participants: 400,
        prize: 15000,
        status: 'ONGOING'
    },
    {
        id: '8',
        Email: 'register@contest8.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Science Fair',
        Description: 'Showcase your scientific projects.',
        Category: 'Science',
        Alias: 'science_fair',
        campaign_leader_name: 'Michael Gray',
        campaign_leader_role: 'Scientist',
        campaign_leader_signature: 'http://example.com/signature15.png',
        assistant_leader_name: 'Nina White',
        assistant_leader_role: 'Lab Technician',
        assistant_leader_signature: 'http://example.com/signature16.png',
        round: 2,
        fee_required: false,
        registration_fee: 0,
        repeat_frequency: 'Annually',
        user_id: 'user234',
        supported_by: 'Science Assoc',
        brief_objective: 'Promote scientific research and innovation.',
        sponsorship_email: 'sponsor@scienceassoc.com',
        contest_mechanism_summary: 'Participants present their scientific projects.',
        country: 'Japan',
        audience: 'International',
        start_date: '2025-09-01',
        end_date: '2025-09-30',
        created_at: '2025-02-10',
        participants: 150,
        prize: 20000,
        status: 'ACTIVE'
    },
    {
        id: '9',
        Email: 'apply@contest9.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Writing Competition',
        Description: 'Showcase your writing skills.',
        Category: 'Literature',
        Alias: 'writing_comp',
        campaign_leader_name: 'Olivia Brown',
        campaign_leader_role: 'Editor',
        campaign_leader_signature: 'http://example.com/signature17.png',
        assistant_leader_name: 'Paul Black',
        assistant_leader_role: 'Assistant Editor',
        assistant_leader_signature: 'http://example.com/signature18.png',
        round: 1,
        fee_required: true,
        registration_fee: 30,
        repeat_frequency: 'Monthly',
        user_id: 'user567',
        supported_by: 'Writers Guild',
        brief_objective: 'Encourage and reward writing talents.',
        sponsorship_email: 'sponsor@writersguild.com',
        contest_mechanism_summary: 'Participants submit their writings for evaluation.',
        country: 'Brazil',
        audience: 'International',
        start_date: '2025-10-01',
        end_date: '2025-10-31',
        created_at: '2025-02-15',
        participants: 100,
        prize: 5000,
        status: 'ONGOING'
    },
    {
        id: '10',
        Email: 'info@contest10.com',
        logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Title: 'Cooking Contest',
        Description: 'Show your culinary skills.',
        Category: 'Culinary',
        Alias: 'cooking_contest',
        campaign_leader_name: 'Quincy Green',
        campaign_leader_role: 'Chef',
        campaign_leader_signature: 'http://example.com/signature19.png',
        assistant_leader_name: 'Rachel White',
        assistant_leader_role: 'Sous Chef',
        assistant_leader_signature: 'http://example.com/signature20.png',
        round: 2,
        fee_required: false,
        registration_fee: 0,
        repeat_frequency: 'Biannually',
        user_id: 'user890',
        supported_by: 'Culinary Assoc',
        brief_objective: 'Promote culinary arts and skills.',
        sponsorship_email: 'sponsor@culinaryassoc.com',
        contest_mechanism_summary: 'Participants cook and present their dishes.',
        country: 'Italy',
        audience: 'International',
        start_date: '2025-11-01',
        end_date: '2025-11-30',
        created_at: '2025-02-20',
        participants: 200,
        prize: 10000,
        status: 'CLOSED'
    }
])
</script>
