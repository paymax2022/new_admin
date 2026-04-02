<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-lg rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
          <div>
            <h2 class="text-xl font-semibold text-[#111827]">Assign Admin Role</h2>
            <p class="text-sm text-[#6b7280]">Grant administrative access to a user</p>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <section class="space-y-6 px-8 py-6">
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">User Email</label>
            <select
              v-model="selectedUserEmail"
              @change="handleUserSelect"
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#1f2937] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              :disabled="loading || loadingUsers"
            >
              <option value="" disabled selected>Select user email</option>
              <option v-for="user in users" :key="user.id" :value="user.email">
                {{ user.email }}
              </option>
            </select>
            <p v-if="loadingUsers" class="mt-1 text-xs text-[#6b7280]">Loading users...</p>
            <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Role</label>
            <select
              v-model="selectedRoleId"
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#1f2937] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              :disabled="loading || loadingRoles"
            >
              <option value="" disabled selected>Choose role</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
              </option>
            </select>
            <p v-if="loadingRoles" class="mt-1 text-xs text-[#6b7280]">Loading roles...</p>
          </div>
        </section>

        <footer class="flex justify-end gap-3 border-t border-[#f1f5f9] px-8 py-5">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5]"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            :disabled="loading || !selectedUserId || !selectedRoleId"
            class="rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220] disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleAssignRole"
          >
            <span v-if="loading">Assigning...</span>
            <span v-else>Assign Role</span>
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import IconX from '@/components/icon/icon-x.vue';
import userService from '@/services/userService';
import rolePermissionService from '@/services/rolePermissionService';
import teamService from '@/services/teamService';

const emit = defineEmits(['close', 'assigned']);

const toast = useToast();
const loading = ref(false);
const loadingUsers = ref(false);
const loadingRoles = ref(false);
const error = ref('');

const users = ref<Array<{ id: string; email: string }>>([]);
const roles = ref<Array<{ id: string; name: string }>>([]);
const selectedUserEmail = ref('');
const selectedUserId = ref('');
const selectedRoleId = ref('');

// Fetch all users
const fetchUsers = async () => {
  loadingUsers.value = true;
  error.value = '';
  
  try {
    // Fetch all users with pagination
    let allUsers: any[] = [];
    let page = 1;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const response = await userService.getUsers({ page, limit });
      
      let usersData: any[] = [];
      if (response?.data?.data && Array.isArray(response.data.data)) {
        usersData = response.data.data;
      } else if (Array.isArray(response?.data)) {
        usersData = response.data;
      }
      
      if (usersData.length === 0) {
        hasMore = false;
      } else {
        allUsers.push(...usersData);
        if (usersData.length < limit) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }
    
    users.value = allUsers
      .filter(user => user.email) // Only include users with email
      .map(user => ({
        id: user.id || user._id || '',
        email: user.email || '',
      }));
  } catch (err: any) {
    console.error('Error fetching users:', err);
    error.value = err?.response?.data?.message || 'Failed to load users';
    toast.error('Failed to load users');
  } finally {
    loadingUsers.value = false;
  }
};

// Fetch all roles
const fetchRoles = async () => {
  loadingRoles.value = true;
  
  try {
    // Fetch all roles with pagination
    let allRoles: any[] = [];
    let page = 1;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const response = await rolePermissionService.getRoles({ page, limit });
      
      let rolesData: any[] = [];
      if (response?.data?.data && Array.isArray(response.data.data)) {
        rolesData = response.data.data;
      } else if (Array.isArray(response?.data)) {
        rolesData = response.data;
      }
      
      if (rolesData.length === 0) {
        hasMore = false;
      } else {
        allRoles.push(...rolesData);
        if (rolesData.length < limit) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }
    
    roles.value = allRoles.map(role => ({
      id: role.id || role._id || '',
      name: role.name || '',
    }));
  } catch (err: any) {
    console.error('Error fetching roles:', err);
    toast.error('Failed to load roles');
  } finally {
    loadingRoles.value = false;
  }
};

// Handle user selection - get user ID from selected email
const handleUserSelect = () => {
  const selectedUser = users.value.find(user => user.email === selectedUserEmail.value);
  if (selectedUser) {
    selectedUserId.value = selectedUser.id;
  } else {
    selectedUserId.value = '';
  }
};

// Handle assign role
const handleAssignRole = async () => {
  if (!selectedUserId.value || !selectedRoleId.value) {
    toast.error('Please select both user and role');
    return;
  }

  loading.value = true;
  error.value = '';
  
  try {
    await teamService.assignRoleToAdmin({
      userId: selectedUserId.value,
      roleId: selectedRoleId.value,
    });
    
    toast.success('Role assigned successfully');
    emit('assigned');
    emit('close');
    
    // Reset form
    selectedUserEmail.value = '';
    selectedUserId.value = '';
    selectedRoleId.value = '';
  } catch (err: any) {
    console.error('Error assigning role:', err);
    error.value = err?.response?.data?.message || 'Failed to assign role';
    toast.error('Failed to assign role');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
});
</script>


