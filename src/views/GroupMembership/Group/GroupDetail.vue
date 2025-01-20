<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Group Membership', route: { name: 'groupMembershipHome' } }, { label: 'Groups', route: { name: 'groupMembershipGroupHome' } }, { label: `${$route.params.groupId}` }]" />

        <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
            <div class="panel">
                <div class="flex justify-between">
                    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Group Details</h5>
                    <div class="flex gap-3 items-start">
                        <RouterLink
                            :to="{ name: 'groupMembershipGroupEdit', params: { groupId: $route.params.groupId } }"
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
                        <img class="w-full h-full object-cover" :src="group.image" :alt="group.name" />
                    </div>
                    <div class="space-x-2 flex justify-between whitespace-nowrap">
                        <div class="">
                            <div class="text-lg font-bold">{{ group.name }}</div>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Group Type:</span>
                            <span class="text-sm">{{ group.group_type }}</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">No of Admins:</span>
                            <span class="text-sm ">{{ group.group_admins }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Country:</span>
                            <span class="text-sm">{{ group.country }}</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">State:</span>
                            <span class="text-sm ">{{ group.state }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-0 w-full">
                        <span class="font-bold text-gray-300">LGA:</span>
                        <span class="text-sm">{{ group.LGA }}</span>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Leader Name:</span>
                            <span class="text-sm font-bold">{{ group.leaders_name }}</span>
                            <span class="text-sm text-info">{{ group.email }}</span>
                            <span class="text-sm text-info">{{ group.mobile_number }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-2">
                <div class="panel">
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Unapproved Members: </span>
                            <div><span class="badge bg-warning-dark-light text-warning">4</span></div>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Total Enrolled Members:</span>
                            <span class="text-sm">20</span>
                        </div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Amount Paid:</span>
                            <span class="text-sm">$10530</span>
                        </div>
                        <div class="flex flex-col space-y-0 w-full">
                            <span class="font-bold text-gray-300">Unpaid Subscription:</span>
                            <span class="text-sm">$530</span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <div class="mb-2 w-full">
                            <span class="font-bold text-gray-300">Members:</span>
                        </div>
                        <div class="space-y-2">
                            <RouterLink to="#" v-for="i in 8" :key="i"
                                class="p-2 flex justify-between items-center shadow-md rounded-md hover:bg-gray-50">
                                <div class="space-x-4 flex items-center">
                                    <span class="font-bold text-gray-400">{{ i }}</span>
                                    <div class="w-10 h-10 rounded overflow-hidden">
                                        <img class="w-full h-full object-cover" src="/assets/images/user-profile.jpeg"
                                            alt="Adam Ife" />
                                    </div>
                                    <span class="font-bold">Adam Ife</span>
                                </div>
                                <span class="badge badge-outline-success">Paid</span>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import { ref } from 'vue';

const group = ref({
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
})
</script>
