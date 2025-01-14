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
                            <TextInput type="text" label="Contest Name / Title" placeholder="Enter contest name"
                                required />
                            <TextInput type="text" label="Alias (Optional)" placeholder="Enter alias" />
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
import TextInput from '@/components/Shared/Input/TextInput.vue';


</script>
