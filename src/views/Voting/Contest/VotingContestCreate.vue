<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Voting', route: { name: 'votingHome' } }, { label: 'Contests', route: { name: 'votingContestHome' } }, { label: 'Create' }]" />

        <div class="panel pb-0 mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-5">Create Contest</h5>

            <div class="">
                <form class="">Create form here</form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';


</script>
