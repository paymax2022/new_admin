<template>
    <div class="mb-5">
        <ul class="flex font-semibold dark:text-white-dark">
            <li>
                <router-link :to="{ name: 'dashboard' }" class="dark:hover:text-white-dark/70">
                    <IconHome class="w-4 h-4" />
                </router-link>
            </li>
            <template v-if="items?.length">
                <li v-for="(item, index) in items" :key="index" class="before:content-['/'] before:px-1.5">
                    <template v-if="index !== items.length - 1">
                        <router-link v-if="item.route" :to="item.route"
                            class="hover:underline dark:hover:text-white-dark/70">
                            {{ item.label }}
                        </router-link>
                        <span v-else class="text-gray-500 hover:text-gray-500/70 dark:text-white-light">
                            {{ item.label }}
                        </span>
                    </template>
                    <template v-else>
                        <span class="text-gray-500 hover:text-gray-500/70 dark:text-white-light">
                            {{ item.label }}
                        </span>
                    </template>
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import IconHome from '../icon/icon-home.vue';

interface BreadcrumbItem {
    label: string;
    route?: string | { name: string; params?: Record<string, any> };
}

defineProps<{
    items?: BreadcrumbItem[];
}>();
</script>
