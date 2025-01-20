<template>
    <div>
        <Breadcrumb :items="[{ label: 'Group Membership' }]" />

        <div class="mt-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 mb-6 text-white">
                <div class="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">All Groups</div>
                        <div class="dropdown">
                            <Popper placement="bottom-end" offsetDistance="0" class="align-middle">
                                <button type="button">
                                    <IconHorizontalDots class="hover:opacity-80 opacity-70" />
                                </button>
                                <template #content="{ close }">
                                    <ul @click="close()" class="text-black dark:text-white-dark">
                                        <li>
                                            <a href="javascript:;">View Report</a>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">137</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">
                        <IconEye class="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Last Week 84
                    </div>
                </div>

                <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Amount Paid</div>
                        <div class="dropdown">
                            <Popper placement="bottom-end" offsetDistance="0" class="align-middle">
                                <button type="button">
                                    <IconHorizontalDots class="hover:opacity-80 opacity-70" />
                                </button>
                                <template #content="{ close }">
                                    <ul @click="close()" class="text-black dark:text-white-dark">
                                        <li>
                                            <a href="javascript:;">View Report</a>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">$170.46</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">
                        <IconEye class="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Last Week 44,700
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';


</script>
