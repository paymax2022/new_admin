<template>
    <li class="menu nav-item">
        <button type="button" class="nav-link group w-full" :class="{ active: store.activeDropdown === dropdownName }"
            @click="toggleDropdown">
            <div class="flex items-center">
                <component :is="iconComponent" class="group-hover:!text-primary shrink-0" />
                <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{ title
                    }}</span>
            </div>
            <div :class="{ 'rtl:rotate-90 -rotate-90': store.activeDropdown !== dropdownName }">
                <icon-caret-down />
            </div>
        </button>
        <vue-collapsible :isOpen="store.activeDropdown === dropdownName">
            <ul class="sub-menu text-gray-500">
                <li v-for="link in links" :key="link.route.name" @click="toggleMobileMenu">
                    <router-link :to="link.route">{{ link.displayName }}</router-link>
                </li>
            </ul>
        </vue-collapsible>
    </li>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/index';
import VueCollapsible from 'vue-height-collapsible/vue3';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';

interface Link {
    route: {
        name: string;
        params?: Record<string, any>;
    };
    displayName: string;
}

const props = defineProps<{
    dropdownName: string;
    title: string;
    iconComponent: any;
    links: Link[];
}>();

const store = useAppStore();


const toggleDropdown = () => {
    return store.toggleActiveDropdown(props.dropdownName);
};

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>
