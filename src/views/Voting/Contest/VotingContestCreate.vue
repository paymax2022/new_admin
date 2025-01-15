<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Voting', route: { name: 'votingHome' } }, { label: 'Contests', route: { name: 'votingContestHome' } }, { label: 'Create' }]" />

        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Create Contest</h5>
        </div>

        <div class="panel pb-0 mt-6">
            <form class="mt-6">
                <div class="pb-6 mt-6">
                    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Contest Details</h5>

                    <div class="">
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
                                    placeholder="Select country" :options="audience" :searchable="false"
                                    :preselect-first="true" :allow-empty="false" selected-label="" select-label=""
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
                                    placeholder="Select role" :options="roles" :searchable="false"
                                    :preselect-first="true" :allow-empty="false" selected-label="" select-label=""
                                    deselect-label="" />
                            </div>
                            <TextInput v-model="contestData.asstName" type="text" label="Assistant Leader Name"
                                placeholder="Enter name" required />
                            <div>
                                <label class="block mb-1 text-gray-700">Asst Leader Role</label>
                                <Multiselect class="custom-multiselect" placeholder="Select role" :options="roles"
                                    :searchable="false" :preselect-first="true" :allow-empty="false" selected-label=""
                                    select-label="" deselect-label="" />
                            </div>
                            <TextInput v-model="contestData.participationFee" type="number" label="Participation Fee"
                                placeholder="Enter fee" required />
                        </div>
                    </div>
                </div>

                <hr />

                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                    <div class="pb-0 mt-6">
                        <h5 class="font-semibold text-lg dark:text-white-light mb-5">Rounds</h5>

                        <div class="">
                        </div>
                    </div>
                    <div class="pb-0 mt-6">
                        <h5 class="font-semibold text-lg dark:text-white-light mb-5">Prize Award</h5>

                        <div class="">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import TextareaInput from '@/components/Shared/Input/TextareaInput.vue';
import TextInput from '@/components/Shared/Input/TextInput.vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { ref } from 'vue';

const audience = ['Nigeria', 'International']
const roles = ['CEO', 'President', 'Vice President'];

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
    asstrole: '',
    asstSignaure: '',
    category: '',
    startDate: '',
    endDate: '',
    repeatCcontest: '',
    image: '',
    participationFee: 0,
    min_age: '',
    juryWinnig: ''
})
</script>
