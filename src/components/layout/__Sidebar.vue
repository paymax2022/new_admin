<template>
  <aside class="w-64 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col">
    <!-- Logo -->
    <div class="p-4 flex items-center justify-center border-b dark:border-gray-700">
      <!-- <img src="@/assets/logo.png" alt="Logo" class="h-10" /> -->
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-2 py-4 space-y-2 text-sm text-gray-700 dark:text-gray-100">
      <SidebarItem icon="LayoutDashboard" label="Dashboard" />
      <SidebarItem icon="UserIcon" label="User Management" :children="[
        { label: 'User list', link: '/users' }
      ]" />
      <SidebarItem icon="ShieldCheck" label="Roles & Permissions" link="/roles" />
      <SidebarItem icon="DollarSign" label="Financial" :children="[]" />
      <SidebarItem icon="Users" label="Referrals" :children="[]" />
      <SidebarItem icon="Gavel" label="Dispute" :children="[]" />
      <SidebarItem icon="FileText" label="R/eports" :children="[]" />
      <SidebarItem icon="Settings" label="System" :children="[]" />
    </nav>
  </aside>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
</script>
