<template>
  <li class="menu nav-item">
    <router-link :to="{ name: 'voting-dashboard' }" class="nav-link group">
      <div class="flex items-center">
        <icon-menu-components class="group-hover:!text-primary shrink-0" />
        <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Voting Dashboard</span>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
</script>

