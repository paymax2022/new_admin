<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Role Management</h1>
        <p class="text-sm text-[#6b7280]">Manage admin roles and permissions</p>
      </div>
    </header>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="card in statCards"
        :key="card.label"
        class="flex flex-col justify-between rounded-3xl border border-transparent bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <p class="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">{{ card.label }}</p>
            <p class="text-2xl font-semibold text-[#111827]">{{ card.value }}</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl"
            :style="{ backgroundColor: card.iconBg, color: card.iconColor }"
          >
            <component :is="card.icon" class="h-6 w-6" />
          </div>
        </div>
        <p class="mt-4 text-sm font-medium" :class="card.deltaColor">{{ card.delta }}</p>
      </article>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-[#111827]">Admin Users</h2>
          <p class="text-sm text-[#6b7280]">Manage admin access levels</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div class="relative flex items-center">
            <IconSearch class="absolute left-4 h-4 w-4 text-[#94a3b8]" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search admin users..."
              class="w-full rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-11 pr-4 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleSearch"
            />
          </div>
          <div class="flex gap-3">
            <select
              v-model="roleFilter"
              class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#475569] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @change="handleFilterChange"
            >
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Compliance</option>
            </select>
            <select
              v-model="statusFilter"
              class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#475569] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @change="handleFilterChange"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
            @click="openAssignModal"
          >
            <IconUserPlus class="h-4 w-4" />
            Add Admin User
          </button>
        </div>
      </div>

      <div class="rounded-3xl border border-[#e2e8f0] bg-white">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#e2e8f0] text-sm text-[#475569]">
            <thead class="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <tr>
                <th class="px-5 py-4 text-left font-semibold text-[#111827]">User</th>
                <th class="px-5 py-4 text-left">Role</th>
                <th class="px-5 py-4 text-left">Status</th>
                <th class="px-5 py-4 text-left">Assigned Date</th>
                <th class="px-5 py-4 text-left">Assigned By</th>
                <th class="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e2e8f0] bg-white">
              <tr v-if="loading">
                <td colspan="6" class="px-5 py-8 text-center text-sm text-[#6b7280]">Loading admin users...</td>
              </tr>
              <tr v-else-if="error">
                <td colspan="6" class="px-5 py-8 text-center text-sm text-red-500">{{ error }}</td>
              </tr>
              <tr v-else-if="filteredAdmins.length === 0">
                <td colspan="6" class="px-5 py-8 text-center text-sm text-[#6b7280]">No admin users found</td>
              </tr>
              <tr v-else v-for="(admin, index) in paginatedAdmins" :key="admin.id || admin.email" class="relative hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5">
                  <div class="space-y-1">
                    <p class="font-semibold text-[#111827]">{{ admin.name }}</p>
                    <p class="text-xs text-[#6b7280]">{{ admin.email }}</p>
                  </div>
                </td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="roleClasses[admin.role]"
                  >
                    {{ roleLabelMap[admin.role] || admin.role }}
                  </span>
                </td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="statusClasses[admin.status]"
                  >
                    {{ admin.status }}
                  </span>
                </td>
                <td class="px-5 py-5 text-[#475569]">
                  {{ formatDate(admin.assignedDate) }}
                </td>
                <td class="px-5 py-5 text-[#475569]">
                  {{ admin.assignedBy || 'N/A' }}
                </td>
                <td class="px-5 py-5 text-right">
                  <div class="relative inline-flex">
                    <button
                      type="button"
                      class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#475569] transition hover:border-[#cbd5f5]"
                      @click.stop="toggleRowMenu(index)"
                    >
                      <IconHorizontalDots class="h-5 w-5" />
                    </button>
                    <transition name="fade">
                      <div
                        v-if="openMenuIndex === index"
                        class="absolute right-0 top-12 z-[9999] w-40 rounded-2xl border border-[#e2e8f0] bg-white py-2 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                          @click="openEditModal(admin)"
                        >
                          Edit Role
                          <IconEdit class="h-4 w-4 text-[#2563eb]" />
                        </button>
                      </div>
                    </transition>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div v-if="!loading && filteredAdmins.length > 0" class="flex items-center justify-between border-t border-[#e2e8f0] px-5 py-4">
          <div class="text-sm text-[#6b7280]">
            Showing <span class="font-medium text-[#111827]">{{ pagination.startIndex + 1 }}</span> to 
            <span class="font-medium text-[#111827]">{{ pagination.endIndex }}</span> of 
            <span class="font-medium text-[#111827]">{{ totalCount }}</span> entries
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-[#475569]">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>

    <EditRoleModal v-if="editModal.open && editModal.admin" :admin="editModal.admin" @close="closeEditModal" />
    <AssignAdminModal v-if="assignModal" @close="closeAssignModal" @assigned="handleRoleAssigned" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import userService from '@/services/userService';

import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconEdit from '@/components/icon/icon-edit.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconUserPlus from '@/components/icon/icon-user-plus.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';

import EditRoleModal from './components/EditRoleModal.vue';
import AssignAdminModal from './components/AssignAdminModal.vue';

const toast = useToast();
const loading = ref(false);
const error = ref('');
const searchQuery = ref('');
const roleFilter = ref('All Roles');
const statusFilter = ref('All Status');
const currentPage = ref(1);
const limit = ref(10);
const totalCount = ref(0);

const statCards = computed(() => [
  {
    label: 'Total Admin Users',
    value: totalCount.value.toString(),
    delta: '+5% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconUsersGroup,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    label: 'Active Sessions',
    value: admins.value.filter(a => a.status === 'active').length.toString(),
    delta: '-12% from last month',
    deltaColor: 'text-[#ef4444]',
    icon: IconTrendingUp,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
  {
    label: 'Super Admins',
    value: admins.value.filter(a => a.role === 'super-admin').length.toString(),
    delta: 'unchanged',
    deltaColor: 'text-[#94a3b8]',
    icon: IconWallet,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'Pending Invites',
    value: admins.value.filter(a => a.status === 'pending').length.toString(),
    delta: '+3 pending invites',
    deltaColor: 'text-[#f97316]',
    icon: IconMessageDots,
    iconBg: '#fff7ed',
    iconColor: '#f97316',
  },
]);

const roleClasses: Record<'super-admin' | 'admin' | 'compliance', string> = {
  'super-admin': 'bg-[#fef3f2] text-[#f97316]',
  admin: 'bg-[#f1f5f9] text-[#475569]',
  compliance: 'bg-[#eef2ff] text-[#4f46e5]',
};

const statusClasses: Record<'active' | 'inactive' | 'pending', string> = {
  active: 'bg-[#ecfdf5] text-[#16a34a]',
  inactive: 'bg-[#f8fafc] text-[#64748b]',
  pending: 'bg-[#fff7ed] text-[#f97316]',
};

type AdminRecord = {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'admin' | 'compliance';
  status: 'active' | 'inactive' | 'pending';
  assignedDate: string;
  assignedBy: string;
};

const admins = ref<AdminRecord[]>([]);

// Fetch admin users from API
const fetchAdminUsers = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const params: any = {
      page: currentPage.value,
      limit: limit.value,
      role: 'ADMIN',
    };
    
    if (searchQuery.value) {
      params.search = searchQuery.value;
    }
    
    if (statusFilter.value !== 'All Status') {
      const statusMap: Record<string, string> = {
        'Active': 'ACTIVE',
        'Pending': 'PENDING',
        'Suspended': 'DEACTIVATED',
      };
      params.status = statusMap[statusFilter.value] || statusFilter.value.toUpperCase();
    }
    
    const response = await userService.getUsers(params);
    
    // Handle response structure - API returns { data: [...], total_count, page, rows_per_page }
    let usersData: any[] = [];
    if (response?.data?.data && Array.isArray(response.data.data)) {
      usersData = response.data.data;
      totalCount.value = response.data.total_count || response.data.totalCount || response.data.data.length;
    } else if (Array.isArray(response?.data)) {
      usersData = response.data;
      totalCount.value = response.total_count || response.totalCount || usersData.length;
    } else if (response?.data && Array.isArray(response.data)) {
      usersData = response.data;
      totalCount.value = usersData.length;
    }
    
    // Map API response to component structure
    admins.value = usersData.map((user: any) => {
      // Map role from API to component role
      let role: 'super-admin' | 'admin' | 'compliance' = 'admin';
      if (user.role === 'SYSTEM_ADMIN' || user.userType === 'SYS_ADMIN') {
        role = 'super-admin';
      } else if (user.role === 'ADMIN') {
        role = 'admin';
      } else {
        role = 'compliance';
      }
      
      // Map status from API to component status
      let status: 'active' | 'inactive' | 'pending' = 'active';
      if (user.status === 'ACTIVE') {
        status = 'active';
      } else if (user.status === 'PENDING' || user.status === 'UNVERIFIED') {
        status = 'pending';
      } else {
        status = 'inactive';
      }
      
      return {
        id: user.id || user._id || '',
        name: `${user.first_name || ''} ${user.lastname || ''}`.trim() || user.email?.split('@')[0] || 'Unknown',
        email: user.email || '',
        role,
        status,
        assignedDate: user.createdAt || user.created_at || 'N/A',
        assignedBy: 'System',
      };
    });
  } catch (err: any) {
    console.error('Error fetching admin users:', err);
    error.value = err?.response?.data?.message || 'Failed to load admin users';
    toast.error('Failed to load admin users');
    admins.value = [];
  } finally {
    loading.value = false;
  }
};

// Filtered admins based on role filter (client-side, since API already filters by ADMIN role)
const filteredAdmins = computed(() => {
  let filtered = admins.value;
  
  if (roleFilter.value && roleFilter.value !== 'All Roles') {
    const roleMap: Record<string, 'super-admin' | 'admin' | 'compliance'> = {
      'Super Admin': 'super-admin',
      'Admin': 'admin',
      'Compliance': 'compliance',
    };
    const targetRole = roleMap[roleFilter.value];
    if (targetRole) {
      filtered = filtered.filter((admin) => admin.role === targetRole);
    }
  }
  
  return filtered;
});

// Pagination - API handles pagination, so we just use the current page data
const totalPages = computed(() => Math.ceil(totalCount.value / limit.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * limit.value;
  const endIndex = Math.min(startIndex + filteredAdmins.value.length, totalCount.value);
  return { startIndex, endIndex };
});

const paginatedAdmins = computed(() => {
  return filteredAdmins.value;
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchAdminUsers();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchAdminUsers();
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchAdminUsers();
};

const handleFilterChange = () => {
  currentPage.value = 1;
  fetchAdminUsers();
};

const formatDate = (dateString: string) => {
  if (!dateString || dateString === 'N/A' || dateString === '0001-01-01T00:00:00Z') {
    return 'N/A';
  }
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

const openMenuIndex = ref<number | null>(null);
const editModal = ref<{ open: boolean; admin: { name: string; email: string; roleLabel: string } | null }>({
  open: false,
  admin: null,
});
const assignModal = ref(false);

const handleClickOutside = () => {
  openMenuIndex.value = null;
};

const toggleRowMenu = (index: number) => {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
};

const roleLabelMap: Record<AdminRecord['role'], string> = {
  'super-admin': 'Super Admin',
  admin: 'Admin',
  compliance: 'Compliance',
};

const openEditModal = (admin: AdminRecord) => {
  editModal.value = {
    open: true,
    admin: {
      name: admin.name,
      email: admin.email,
      roleLabel: roleLabelMap[admin.role],
    },
  };
  openMenuIndex.value = null;
};

const closeEditModal = () => {
  editModal.value = { open: false, admin: null };
};

const openAssignModal = () => {
  assignModal.value = true;
};

const closeAssignModal = () => {
  assignModal.value = false;
};

const handleRoleAssigned = () => {
  // Refresh admin users list after role assignment
  fetchAdminUsers();
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  fetchAdminUsers();
});

onBeforeUnmount(() => window.removeEventListener('click', handleClickOutside));

watch([currentPage], () => {
  fetchAdminUsers();
});
</script>

