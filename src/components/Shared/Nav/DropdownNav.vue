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
                <template v-if="links && links.length && links[0].category">
                  <template v-for="(group, idx) in groupedLinks" :key="group.category">
                    <li class="px-4 py-2 text-xs font-bold uppercase text-gray-400" v-if="group.category">{{ group.category }}</li>
                    <li v-for="link in group.links" :key="link.route.name" @click="toggleMobileMenu">
                      <router-link :to="link.route">{{ link.displayName }}</router-link>
                    </li>
                  </template>
                </template>
                <template v-else>
                  <li v-for="link in links" :key="link.route.name" @click="toggleMobileMenu">
                    <router-link :to="link.route">{{ link.displayName }}</router-link>
                  </li>
                </template>
            </ul>
        </vue-collapsible>
    </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/index';
import VueCollapsible from 'vue-height-collapsible/vue3';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';

interface Link {
    route: {
        name: string;
        params?: Record<string, any>;
    };
    displayName: string;
    category?: string;
}

const props = defineProps<{
    dropdownName: string;
    title: string;
    iconComponent: any;
    links: Link[];
}>();

const store = useAppStore();

const groupedLinks = computed(() => {
  if (!props.links || !props.links.length) return [];
  const groups: { category: string, links: Link[] }[] = [];
  let lastCategory = '';
  props.links.forEach(link => {
    if (!link.category) {
      groups.push({ category: '', links: [link] });
      return;
    }
    if (!groups.length || groups[groups.length - 1].category !== link.category) {
      groups.push({ category: link.category, links: [link] });
    } else {
      groups[groups.length - 1].links.push(link);
    }
  });
  return groups;
});

const toggleDropdown = () => {
    return store.toggleActiveDropdown(props.dropdownName);
};

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>
