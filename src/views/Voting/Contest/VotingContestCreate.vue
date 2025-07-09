<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Voting', route: { name: 'votingHome' } }, { label: 'Contests', route: { name: 'votingContestHome' } }, { label: 'Create' }]" />

        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Create Contest</h5>
        </div>

        <form class="mb-8 mt-6" @submit.prevent="submitContest">
            <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
                <div class="panel col-span-2">
                    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Contest Details</h5>

                    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                        <TextInput v-model="contestData.title" type="text" label="Contest Name / Title"
                            placeholder="Enter contest name" required />
                        <TextInput v-model="contestData.alias" type="text" label="Alias (Optional)"
                            placeholder="Enter alias" />
                        <div class="col-span-2">
                            <TextareaInput v-model="contestData.description" rows="6" label="Campaign Description"
                                placeholder="Enter description" required />
                        </div>
                        <div>
                            <label class="block mb-1 text-gray-700">Country</label>
                            <Multiselect v-model="contestData.country" class="custom-multiselect"
                                placeholder="Select country" :options="countries" :searchable="false"
                                :preselect-first="false" :allow-empty="false" selected-label="" select-label=""
                                deselect-label="" />
                        </div>
                        <div>
                            <label class="block mb-1 text-gray-700">Audience</label>
                            <Multiselect v-model="contestData.audience" class="custom-multiselect"
                                placeholder="Select audience" :options="audience" :searchable="false"
                                :preselect-first="true" :allow-empty="false" selected-label="" select-label=""
                                deselect-label="" />
                        </div>
                        <TextInput v-model="contestData.leaderName" type="text" label="Campaign Leader Name"
                            placeholder="Enter name" required />
                        <div>
                            <label class="block mb-1 text-gray-700">Campaign Leader Role</label>
                            <Multiselect v-model="contestData.leaderRole" class="custom-multiselect"
                                placeholder="Select role" :options="roles" :searchable="false" :preselect-first="true"
                                :allow-empty="false" selected-label="" select-label="" deselect-label="" />
                        </div>
                        <TextInput v-model="contestData.asstName" type="text" label="Assistant Leader Name"
                            placeholder="Enter name" required />
                        <div>
                            <label class="block mb-1 text-gray-700">Asst Leader Role</label>
                            <Multiselect v-model="contestData.asstRole" class="custom-multiselect"
                                placeholder="Select role" :options="roles" :searchable="false" :preselect-first="true"
                                :allow-empty="false" selected-label="" select-label="" deselect-label="" />
                        </div>
                        <TextInput v-model="contestData.participationFee" type="number"
                            label="Participation Fee (0 means free)" placeholder="Enter fee" required />
                        <div>
                            <label class="block mb-1 text-gray-700">Repeat Contest</label>
                            <Multiselect v-model="contestData.repeatContest" class="custom-multiselect"
                                placeholder="Select role" :options="repeatContest" :searchable="false"
                                :preselect-first="true" :allow-empty="false" selected-label="" select-label=""
                                deselect-label="" />
                        </div>
                        <TextInput v-model="contestData.min_age" type="number" label="Minimum Age (Optional)"
                            placeholder="Enter age" />
                        <TextInput v-model="contestData.juryWinnig" type="text" label="Jury Voting (Optional)"
                            placeholder="Enter value" />
                    </div>
                </div>
                <div class="">
                    <div class="panel">
                        <div class="flex justify-between">
                            <h5 class="font-semibold text-lg dark:text-white-light mb-5">Rounds</h5>
                            <IconPlus @click="addRound" />
                        </div>

                        <div v-for="(round, index) in rounds" :key="index" class="flex"
                            :class="index !== 0 ? 'mt-8' : ''">
                            <div class="w-full">
                                <TextInput v-model="round.name" type="text" label="Round Name" placeholder="Round name"
                                    required />
                                <TextInput v-model="round.min_votes" type="number" label="Minimum Votes"
                                    placeholder="Minimum votes" required />
                                <div class="grid grid-cols-2 gap-3">
                                    <TextInput v-model="round.start_date" type="date" label="Start Date"
                                        placeholder="Start date" required />
                                    <TextInput v-model="round.end_date" type="date" label="End Date"
                                        placeholder="End date" required />
                                </div>
                            </div>
                            <IconTrash v-if="index !== 0" class="ml-2 text-danger" @click="removeRound(index)" />
                        </div>
                    </div>
                    <div class="panel mt-6">
                        <div class="flex justify-between">
                            <h5 class="font-semibold text-lg dark:text-white-light mb-5">Prize Awards</h5>
                            <IconPlus @click="addPrizeAward" />
                        </div>

                        <div class="">
                            <div v-for="(prize, index) in prizeAwards" :key="index" class="flex"
                                :class="index !== 0 ? 'mt-8' : ''">
                                <div class="w-full grid grid-cols-3 gap-3">
                                    <TextInput v-model="prize.position" type="number" label="Position"
                                        placeholder="Position" required />
                                    <TextInput class="col-span-2" v-model="prize.prize" type="number" label="Amount"
                                        placeholder="Enter amount" required />
                                </div>
                                <IconTrash v-if="index !== 0" class="ml-2 text-danger"
                                    @click="removePrizeAward(index)" />
                            </div>
                        </div>
                    </div>
                    <div class="panel mt-6">
                        <div class="flex justify-between">
                            <h5 class="font-semibold text-lg dark:text-white-light mb-5">Other Benefits</h5>
                            <IconPlus @click="addOtherBenefit" />
                        </div>

                        <div class="">
                            <div v-for="(benefit, index) in otherBenefits" :key="index" class="flex"
                                :class="index !== 0 ? 'mt-8' : ''">
                                <div class="w-full">
                                    <div class="w-full grid grid-cols-3 gap-3">
                                        <TextInput v-model="benefit.position" type="number" label="Position"
                                            placeholder="Position" required />
                                        <TextInput class="col-span-2" v-model="benefit.type" type="text"
                                            label="Benefit Type" placeholder="Enter type" required />
                                    </div>
                                    <TextInput v-model="benefit.benefit_name" type="text" label="Benefit Name"
                                        placeholder="Enter benefit name" required />
                                </div>
                                <IconTrash v-if="index !== 0" class="ml-2 text-danger"
                                    @click="removeOtherBenefit(index)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8 mx-4">
                <button type="submit" class="btn btn-primary w-full">Create Contest</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import TextareaInput from '@/components/Shared/Input/TextareaInput.vue';
import TextInput from '@/components/Shared/Input/TextInput.vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { ref } from 'vue';

const router = useRouter();

const audience = ['Nigeria', 'International'];
const countries = ['Nigeria', 'USA', 'UK', 'Canada', 'India'];
const roles = ['CEO', 'President', 'Vice President'];
const repeatContest = ['None', 'Monthly', 'Quarterly', 'Yearly'];

const contestData = ref({
    title: '',
    alias: '',
    description: '',
    country: '',
    audience: '',
    leaderName: '',
    leaderRole: '',
    leaderSignature: '',
    asstName: '',
    asstRole: '',
    asstSignaure: '',
    category: '',
    startDate: '',
    endDate: '',
    repeatContest: '',
    image: '',
    participationFee: 0,
    min_age: '',
    juryWinnig: ''
});

const rounds = ref([
    {
        name: '',
        min_votes: 1,
        start_date: '',
        end_date: '',
    },
]);

const prizeAwards = ref([
    {
        position: 1,
        prize: '',
    },
]);

const otherBenefits = ref([
    {
        position: 1,
        type: '',
        benefit_name: '',
    },
]);

const addRound = () => {
    rounds.value.push({
        name: '',
        min_votes: 1,
        start_date: '',
        end_date: '',
    });
};

const removeRound = (index: number) => {
    rounds.value.splice(index, 1);
};

const addPrizeAward = () => {
    prizeAwards.value.push({
        position: prizeAwards.value.length + 1,
        prize: '',
    });
};

const removePrizeAward = (index: number) => {
    prizeAwards.value.splice(index, 1);
};

const addOtherBenefit = () => {
    otherBenefits.value.push({
        position: otherBenefits.value.length + 1,
        type: '',
        benefit_name: '',
    });
};

const removeOtherBenefit = (index: number) => {
    otherBenefits.value.splice(index, 1);
};

const submitContest = async () => {
    try {
        const response = await fetch('/api/contests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...contestData.value,
                rounds: rounds.value,
                prizeAwards: prizeAwards.value,
                otherBenefits: otherBenefits.value,
            }),
        });

        if (response.ok) {
    
            router.push({ path: '/voting/contests' });
        } else {
            const errorData = await response.json();
            alert(`Error creating contest: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error submitting contest:', error);
        alert('Error creating contest. Please try again later.');
    }
};
</script>