<template>
    <div>
        <button class="p-3 rounded-full hover:bg-gray-100 cursor-pointer -m-4" @click="$router.back()">
            <IconArrowLeft class="w-5 h-5 rotate-180" />
        </button>

        <div class="mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-3">Contestant Details</h5>
            <div class="flex space-x-2">
                <div class="w-full">
                    <div class="max-w-[8rem] max-h-[8rem] overflow-hidden rounded">
                        <img src="/assets/images/user-profile.jpeg" alt="Avatar" class="w-full h-full object-cover" />
                    </div>
                    <div class="mt-2 flex space-x-2">
                        <div class="w-8 h-8 rounded bg-gray-300"></div>
                        <div class="w-8 h-8 rounded bg-gray-300"></div>
                        <div class="w-8 h-8 rounded bg-gray-300"></div>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="font-bold text-lg">
                                <span class="text-sm badge bg-info-dark-light text-info">{{ $route.params.contestantId
                                    }}</span>
                                Adam Ife
                            </div>
                            <div class="text-sm text-gray-500">Musician</div>
                        </div>
                        <div>
                            <div class="">640 votes</div>
                        </div>
                    </div>
                    <p class="mt-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nostrum commodi quae qui aperiam
                        quis tempore, sequi nulla rem maxime odio enim illo ipsum perferendis, quam sed et fuga quia!
                        Cupiditate officia ad officiis ea. Inventore, commodi dicta alias voluptatem in ipsa nam magnam
                        sint harum expedita id, corrupti doloremque tenetur est reiciendis ratione quis dolorum ipsam?
                        Incidunt, atque repudiandae.
                    </p>
                </div>
            </div>
        </div>
        <div class="mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-3">Voters</h5>
            <div class="space-y-2">
                <div v-for="i in 6" :key="i" class="p-2 flex justify-between items-center shadow-md rounded-md">
                    <div class="space-x-4 flex items-center">
                        <!-- <span class="font-bold text-gray-400">{{ i }}</span> -->
                        <div class="w-10 h-10 rounded overflow-hidden">
                            <img class="w-full h-full object-cover" src="/assets/images/user-profile.jpeg"
                                alt="Adam Ife" />
                        </div>
                        <span class="font-bold">Adam Ife</span>
                    </div>
                    <div class="">{{ 134 - (i * 10) }} votes</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';

</script>
