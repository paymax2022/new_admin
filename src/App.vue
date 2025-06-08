<template>
  <div class="main-section antialiased relative font-nunito text-sm font-normal"
    :class="[store.sidebar ? 'toggle-sidebar' : '', store.menu, store.layout, store.rtlClass]">
    <component :is="mainLayout">
      <RouterView />
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterView } from 'vue-router';
import appLayout from '@/layouts/app-layout.vue';
import authLayout from '@/layouts/auth-layout.vue';
import { useAppStore } from '@/stores/index';
import { useMeta } from '@/composables/use-meta';

const store = useAppStore();

// meta
useMeta({ title: 'Admin Dashboard' });

const mainLayout = computed(() => {
  return store.mainLayout === 'auth' ? authLayout : appLayout;
});
</script>
