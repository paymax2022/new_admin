<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Voting', route: { name: 'votingHome' } }, { label: 'Contests', route: { name: 'votingContestHome' } }, { label: `${$route.params.contestId}` }]" />

        <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
            <div class="panel">
                <div class="flex justify-between">
                    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Contest Details</h5>
                    <div class="flex gap-3 items-start">
                        <RouterLink :to="{ name: 'votingContestEdit', params: { contestId: $route.params.contestId } }"
                            class="!text-info">
                            <IconPencilPaper class="ltr:mr-2 rtl:ml-2 shrink-0" />
                        </RouterLink>
                        <button class="!text-danger hover:!text-danger">
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
                            <span class="">{{ contest.start_date }}</span>
                            <span class="mx-1">-</span>
                            <span class="">{{ contest.end_date }}</span>
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
                            <span class="text-sm">{{ contest.fee_required }}</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Participation Fee:</span>
                            <span class="text-sm">{{ contest.registration_fee }}</span>
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
    </div>
</template>

<script setup lang="ts">
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import { ref } from 'vue';

const contest = ref({
    id: '1',
    Email: 'contact@contest1.com',
    logo: 'https://images.unsplash.com/photo-1735216228027-fe31c23474ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Title: 'Innovation Challenge',
    Description: 'A contest to foster innovative ideas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum deserunt a consequuntur, cupiditate dolorem magni eum vitae rem quaerat saepe amet incidunt unde reprehenderit debitis expedita minus quibusdam facilis quisquam. Libero, excepturi! Necessitatibus dolore, eos illo officia culpa consequuntur aut sapiente.Reprehenderit nisi alias facere vel commodi, ut at vero.Quod molestiae repellendus commodi non quibusdam accusantium rem voluptatum eligendi! Minus ipsam sequi, eius sunt nobis veniam deleniti beatae ut molestias inventore recusandae eligendi fuga neque quia, explicabo asperiores similique totam sapiente, delectus nesciunt.Quidem, molestiae facilis! Fugit, sapiente vitae. Nihil assumenda dolor inventore nisi facilis in sed, facere ipsum beatae omnis officiis sunt ipsam dolores a, alias tenetur amet dolorum est distinctio architecto eius magni rerum! Atque, mollitia expedita?',
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
})
</script>
