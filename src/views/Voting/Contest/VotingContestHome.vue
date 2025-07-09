<template>
    <div>
        <Breadcrumb :items="[{ label: 'Voting', route: { name: 'votingHome' } }, { label: 'Contests' }]" />

        <div class="panel pb-0 mt-6">
            <div class="flex justify-between">
                <h5 class="font-semibold text-lg dark:text-white-light mb-5">Contests</h5>
                <div>
                    <RouterLink :to="{ name: 'votingContestCreate' }" class="btn btn-info">
                        <IconPlus class="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                        Create Contest
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
                    :sortable="true" sortColumn="Title" :hasCheckbox="true" skin="whitespace-nowrap bh-table-hover"
                    :search="search">
                    <template #id="data">
                        <strong class="">{{ getRowIndex(data.value) }}</strong>
                    </template>
                    <template #Title="data">
                        <RouterLink :to="{ name: 'votingContestDetail', params: { contestId: data.value.id } }">
                            <div class="flex items-center">
  
                                <div class="flex flex-col">
                                    <span class="text-base text-primary font-black hover:underline">{{ data.value.title
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
                            <span>{{ formatDate(data.value.start_date) }}</span>
                            -
                            <span>{{ formatDate(data.value.end_date) }}</span>
                        </div>
                    </template>
                    <template #status="data">
                        <span
                            :class="`badge bg-${data.value.status === 'CLOSED' ? 'danger' : data.value.status === 'PENDING' ? 'warning' : 'success'}`">
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
                                            <RouterLink
                                                :to="{ name: 'votingContestDetail', params: { contestId: data.value.id } }">
                                                <IconEye class="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                View
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink
                                                :to="{ name: 'votingContestEdit', params: { contestId: data.value.id } }">
                                                <IconPencilPaper class="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                Edit
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <button class="!text-danger hover:!text-danger"
                                                @click="deleteContest(data.value.id)">
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
import { onMounted, ref, nextTick } from 'vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import TextInput from '@/components/Shared/Input/TextInput.vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { RouterLink } from 'vue-router';
import Popper from 'vue3-popper';

const search = ref('');
const isLoading = ref(false);
const rows = ref([]);
const cols = ref([
    { field: 'id', title: 'ID', isUnique: true, hide: false },
    { field: 'Title', title: 'Title', hide: false },
    //{ field: 'Email', title: 'Created By', hide: false },
    //{ field: 'Category', title: 'Category', hide: false },
    { field: 'participants', title: 'Participants', hide: false },
    { field: 'round', title: 'Current Round', sort: false, hide: false },
    { field: 'fee_required', title: 'Requires Fee', hide: false },
    { field: 'registration_fee', title: 'Registration Fee', hide: false },
    { field: 'repeat_frequency', title: 'Repeat Frequency', hide: false },
    { field: 'duration', title: 'Duration', sort: false, hide: false },
    { field: 'status', title: 'Status', hide: false },
    { field: 'actions', title: 'Actions', sort: false, hide: false },
]);

const getRowIndex = (row) => {
    return rows.value.findIndex(r => r === row) + 1;
};

const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const fetchContests = async () => {
    isLoading.value = true;
    try {
        const response = await fetch('/api/contests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched contests:', data);
            rows.value = data.map(contest => ({
                id: contest._id,
                Email: contest.sponsorship_email || 'N/A',
                title: contest.title,
                Description: contest.description,
                Category: contest.category || 'N/A',
                Alias: contest.alias || 'N/A',
                campaign_leader_name: contest.leaderName,
                campaign_leader_role: contest.leaderRole,
                campaign_leader_signature: contest.leaderSignature || 'N/A',
                assistant_leader_name: contest.asstName,
                assistant_leader_role: contest.asstRole,
                assistant_leader_signature: contest.asstSignature || 'N/A',
                round: contest.rounds?.length || 1,
                fee_required: contest.participationFee > 0,
                registration_fee: contest.participationFee,
                repeat_frequency: contest.repeatContest || 'None',
                user_id: contest.user_id || 'N/A',
                supported_by: contest.supported_by || 'N/A',
                brief_objective: contest.brief_objective || 'N/A',
                sponsorship_email: contest.sponsorship_email || 'N/A',
                contest_mechanism_summary: contest.contest_mechanism_summary || 'N/A',
                country: contest.country,
                audience: contest.audience,
                start_date: contest.rounds?.[0]?.start_date || '',
                end_date: contest.rounds?.[0]?.end_date || '',
                created_at: contest.createdAt,
                participants: contest.participants || 0,
                prize: contest.prizeAwards?.[0]?.prize || 0,
                status: determineStatus(contest.rounds?.[0]?.start_date, contest.rounds?.[0]?.end_date),
            }));
            console.log('Mapped rows:', rows.value);
            await nextTick();
        } else {
            console.error('Fetch error:', response.status, response.statusText);
            const errorText = await response.text(); // Capture error details
            console.error('Error details:', errorText);
            alert(`Error fetching contests: ${errorText || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error fetching contests:', error);
        alert('Error fetching contests. Please try again later.');
    } finally {
        isLoading.value = false;
    }
};

const determineStatus = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 'PENDING';
    const now = new Date('2025-07-09T03:08:00Z'); // 08:08 AM PKT (UTC+5)
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return 'PENDING';
    if (now > end) return 'CLOSED';
    return 'ONGOING';
};

const deleteContest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contest?')) return;
    try {
        const response = await fetch('/api/contests', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        if (response.ok) {
            alert('Contest deleted successfully!');
            rows.value = rows.value.filter(row => row.id !== id);
        } else {
            const errorData = await response.json();
            alert(`Error deleting contest: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error deleting contest:', error);
        alert('Error deleting contest. Please try again later.');
    }
};

onMounted(() => {
    fetchContests();
});
</script>