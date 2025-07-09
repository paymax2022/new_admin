<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Voting', route: { name: 'votingHome' } }, { label: 'Contests', route: { name: 'votingContestHome' } }, { label: `${$route.params.contestId}` }]" />

        <div v-if="isLoading" class="panel mt-6">
            <p>Loading...</p>
        </div>
        <div v-else-if="error" class="panel mt-6">
            <p class="text-danger">{{ error }}</p>
        </div>
        <div v-else-if="contest" class="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
            <div class="panel">
                <div class="flex justify-between">
                    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Contest Details</h5>
                    <div class="flex gap-3 items-start">
                       
                        <button class="!text-danger hover:!text-danger" @click="deleteContest">
                            <IconTrashLines class="ltr:mr-2 rtl:ml-2 shrink-0" />
                        </button>
                    </div>
                </div>

                <div class="mt-3 space-y-3">
                    <div class="max-w-[20rem] max-h-[20rem] overflow-hidden mx-auto">
                        <img class="w-full h-full object-cover" :src="contest.logo" :alt="contest.Title" />
                    </div>
                    <div class="space-x-2 flex justify-between whitespace-nowrap">
                        <div class="">
                            <div class="text-lg font-bold">{{ contest.Title }}</div>
                            <span class="text-sm">({{ contest.Alias }})</span>
                        </div>
                        <div>
                            <span
                                :class="`badge bg-${contest.status == 'CLOSED' ? 'danger' : contest.status == 'PENDING' ? 'warning' : 'success'}`">
                                {{ contest.status }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-0">
                        <span class="font-bold text-gray-300">Duration:</span>
                        <div class="flex space-x-4">
                            <span class="">{{ formatDate(contest.start_date) }}</span>
                            <span class="mx-1">-</span>
                            <span class="">{{ formatDate(contest.end_date) }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-0">
                        <span class="font-bold text-gray-300">Description:</span>
                        <span class="text-sm">{{ contest.Description }}</span>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Category:</span>
                            <span class="text-sm">{{ contest.Category }}</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Created By:</span>
                            <RouterLink to="#" class="text-sm text-primary">{{ contest.Email }}</RouterLink>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Country:</span>
                            <span class="text-sm">{{ contest.country }}</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Audience:</span>
                            <span class="text-sm">{{ contest.audience }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Campaign Leader Name:</span>
                            <span class="text-sm">{{ contest.campaign_leader_name }}</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Leader Role:</span>
                            <span class="text-sm">{{ contest.campaign_leader_role }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Asst Leader Name:</span>
                            <span class="text-sm">{{ contest.assistant_leader_name }}</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Asst Leader Role:</span>
                            <span class="text-sm">{{ contest.assistant_leader_role }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Requires Fee:</span>
                            <span class="text-sm">{{ contest.fee_required ? 'Yes' : 'No' }}</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Participation Fee:</span>
                            <span class="text-sm">${{ contest.registration_fee }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-2">
                <div
                    class="flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                    <RouterLink :to="{ name: 'votingContestDetail', params: { contestId: $route.params.contestId } }"
                        class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                        :class="{ '!border-primary text-primary': $route.name == 'votingContestDetail' }">
                        <IconInfoCircle class="w-5 h-5" />
                        Info
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'votingContestDetailRounds', params: { contestId: $route.params.contestId } }"
                        class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                        :class="{ '!border-primary text-primary': $route.name == 'votingContestDetailRounds' }">
                        Rounds
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'votingContestDetailPrizes', params: { contestId: $route.params.contestId } }"
                        class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                        :class="{ '!border-primary text-primary': $route.name == 'votingContestDetailPrizes' }">
                        Prizes
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'votingContestDetailPricing', params: { contestId: $route.params.contestId } }"
                        class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                        :class="{ '!border-primary text-primary': $route.name == 'votingContestDetailPricing' }">
                        Vote Pricing
                    </RouterLink>
                </div>

                <div class="panel">
                    <RouterView />
                </div>
            </div>
        </div>
        <div v-else class="panel mt-6">
            <p>No contest data available.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const contest = ref<any>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const fetchContestDetail = async () => {
    const contestId = route.params.contestId as string;
    if (!contestId) {
        error.value = 'No contest ID provided';
        isLoading.value = false;
        return;
    }
    isLoading.value = true;
    error.value = null;
    try {
        const response = await fetch(`/api/contests/${contestId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched contest detail:', data);
            // Map API response to match the expected contest structure
            contest.value = {
                id: data._id,
                Email: data.sponsorship_email || 'N/A',
                logo: data.image || 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                Title: data.title,
                Description: data.description,
                Category: data.category || 'N/A',
                Alias: data.alias || 'N/A',
                campaign_leader_name: data.leaderName,
                campaign_leader_role: data.leaderRole,
                campaign_leader_signature: data.leaderSignature || 'N/A',
                assistant_leader_name: data.asstName,
                assistant_leader_role: data.asstRole,
                assistant_leader_signature: data.asstSignature || 'N/A',
                round: data.rounds?.length || 1,
                fee_required: data.participationFee > 0,
                registration_fee: data.participationFee,
                repeat_frequency: data.repeatContest || 'None',
                user_id: data.user_id || 'N/A',
                supported_by: data.supported_by || 'N/A',
                brief_objective: data.brief_objective || 'N/A',
                sponsorship_email: data.sponsorship_email || 'N/A',
                contest_mechanism_summary: data.contest_mechanism_summary || 'N/A',
                country: data.country,
                audience: data.audience,
                start_date: data.rounds?.[0]?.start_date || '',
                end_date: data.rounds?.[0]?.end_date || '',
                created_at: data.createdAt,
                participants: data.participants || 0,
                prize: data.prizeAwards?.[0]?.prize || 0,
                status: determineStatus(data.rounds?.[0]?.start_date, data.rounds?.[0]?.end_date),
            };
        } else {
            const errorText = await response.text();
            error.value = `Error fetching contest: ${errorText || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error fetching contest detail:', error);
        error.value = 'Error fetching contest details. Please try again later.';
    } finally {
        isLoading.value = false;
    }
};

const determineStatus = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 'PENDING';
    const now = new Date('2025-07-09T03:34:00Z'); // 08:34 AM PKT (UTC+5)
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return 'PENDING';
    if (now > end) return 'CLOSED';
    return 'ONGOING';
};

const deleteContest = async () => {
    if (!confirm('Are you sure you want to delete this contest?')) return;
    const contestId = route.params.contestId as string;
    try {
        const response = await fetch('/api/contests', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: contestId }),
        });
        if (response.ok) {
            alert('Contest deleted successfully!');
            router.push({ name: 'votingContestHome' });
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
    fetchContestDetail();
});
</script>