<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold mb-1">Member Management</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Monitor your organization's key metrics and performance</p>
    </div>
    <!-- Tabs -->
    <div class="flex gap-6 border-b mb-4">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="['pb-2 px-1 font-medium', activeTab === tab ? 'border-b-2 border-black text-black dark:border-white dark:text-white' : 'text-gray-400']">{{ tab }}</button>
    </div>
    <!-- Search and Filter -->
    <div class="flex gap-4 items-center mb-2">
      <input type="text" class="flex-1 border rounded px-3 py-2" placeholder="Search members by name or email" />
      <select class="border rounded px-3 py-2 w-40">
        <option>All Status</option>
        <option>Active</option>
        <option>Suspended</option>
        <option>Overdue</option>
      </select>
    </div>
    <!-- Membership Types & Tiers -->
    <div v-if="activeTab === 'Membership Types'">
      <div class="flex justify-between items-center mb-6 mt-4">
        <h2 class="text-lg font-semibold">Membership Types & Tiers</h2>
        <button class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800" @click="showCreateTypeModal = true">
          + Create a New type
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="border rounded-xl p-6 bg-white flex flex-col items-start shadow">
          <div class="flex items-center justify-between w-full mb-2">
            <span class="text-blue-700 font-semibold text-lg">Premium</span>
            <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">1,247 members</span>
          </div>
          <div class="text-2xl font-bold text-blue-700 mb-1">$89<span class="text-base font-normal">/month</span></div>
          <ul class="mb-6 mt-2 space-y-2">
            <li class="flex items-center gap-2 text-sm"><span class="text-green-600">✔</span> All Groups Access</li>
            <li class="flex items-center gap-2 text-sm"><span class="text-green-600">✔</span> Exclusive Resources</li>
            <li class="flex items-center gap-2 text-sm"><span class="text-green-600">✔</span> Priority Support</li>
          </ul>
          <div class="flex gap-2 w-full mt-auto">
            <button class="flex-1 border rounded px-3 py-2 text-sm font-medium" @click="openEditTypeModal(membershipTypes[0])">Edit Type</button>
            <button class="flex-1 border rounded px-3 py-2 text-sm font-medium" @click="openPermissionsModal(membershipTypes[0])">Manage Permissions</button>
          </div>
        </div>
        <div class="border rounded-xl p-6 bg-white flex flex-col items-start shadow">
          <div class="flex items-center justify-between w-full mb-2">
            <span class="text-blue-700 font-semibold text-lg">Basic</span>
            <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">892 members</span>
          </div>
          <div class="text-2xl font-bold text-blue-700 mb-1">$29<span class="text-base font-normal">/month</span></div>
          <ul class="mb-6 mt-2 space-y-2">
            <li class="flex items-center gap-2 text-sm"><span class="text-green-600">✔</span> Basic Groups</li>
            <li class="flex items-center gap-2 text-sm"><span class="text-green-600">✔</span> Standard Resources</li>
          </ul>
          <div class="flex gap-2 w-full mt-auto">
            <button class="flex-1 border rounded px-3 py-2 text-sm font-medium" @click="openEditTypeModal(membershipTypes[1])">Edit Type</button>
            <button class="flex-1 border rounded px-3 py-2 text-sm font-medium" @click="openPermissionsModal(membershipTypes[1])">Manage Permissions</button>
          </div>
        </div>
        <div class="border rounded-xl p-6 bg-white flex flex-col items-start shadow">
          <div class="flex items-center justify-between w-full mb-2">
            <span class="text-blue-700 font-semibold text-lg">Student</span>
            <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">708 members</span>
          </div>
          <div class="text-2xl font-bold text-blue-700 mb-1">$15<span class="text-base font-normal">/month</span></div>
          <ul class="mb-6 mt-2 space-y-2">
            <li class="flex items-center gap-2 text-sm"><span class="text-green-600">✔</span> Student Groups</li>
            <li class="flex items-center gap-2 text-sm"><span class="text-green-600">✔</span> Educational Resources</li>
          </ul>
          <div class="flex gap-2 w-full mt-auto">
            <button class="flex-1 border rounded px-3 py-2 text-sm font-medium" @click="openEditTypeModal(membershipTypes[2])">Edit Type</button>
            <button class="flex-1 border rounded px-3 py-2 text-sm font-medium" @click="openPermissionsModal(membershipTypes[2])">Manage Permissions</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Members Table -->
    <div v-if="activeTab === 'Member Directory'" class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-500 border-b">
            <th class="py-2 px-4">Member</th>
            <th class="py-2 px-4">Membership Type</th>
            <th class="py-2 px-4">Status</th>
            <th class="py-2 px-4">Subscription</th>
            <th class="py-2 px-4">Subscription</th>
            <th class="py-2 px-4">Last Active</th>
            <th class="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, i) in members" :key="i" class="border-b last:border-0">
            <td class="py-2 px-4">
              <div class="font-medium">{{ member.name }}</div>
              <div class="text-xs text-gray-400">{{ member.email }}</div>
            </td>
            <td class="py-2 px-4">{{ member.type }}</td>
            <td class="py-2 px-4">
              <span :class="member.status === 'Active' ? 'text-green-500' : member.status === 'Suspended' ? 'text-red-500' : ''">{{ member.status }}</span>
            </td>
            <td class="py-2 px-4">
              <span :class="member.subscription === 'Paid' ? 'text-green-500' : member.subscription === 'Overdue' ? 'text-red-500' : member.subscription === 'Grace Period' ? 'text-yellow-500' : ''">{{ member.subscription }}</span>
            </td>
            <td class="py-2 px-4">{{ member.subscriptionDate }}</td>
            <td class="py-2 px-4">{{ member.lastActive }}</td>
            <td class="py-2 px-4 flex gap-2">
              <button class="hover:bg-gray-100 rounded p-1" @click="editMember = member"><component :is="icons.PencilIcon" class="w-4 h-4 text-gray-400" /></button>
              <button class="hover:bg-gray-100 rounded p-1" @click="viewMember = member"><component :is="icons.EyeIcon" class="w-4 h-4 text-gray-400" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EditMemberModal v-if="editMember" :member="editMember" @close="editMember = null" />
    <MemberSettingsModal v-if="viewMember" :member="viewMember" @close="viewMember = null" @delete="showDeleteModal = true; memberToDelete = $event" />
    <DeleteMemberModal v-if="showDeleteModal" :member="memberToDelete!" @close="showDeleteModal = false" @confirm="handleDeleteMember" />
    <div v-if="showCreateTypeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-0 relative">
        <div class="px-8 pt-8 pb-4">
          <h2 class="font-semibold text-lg mb-4">Create New Membership Type</h2>
          <form @submit.prevent="handleCreateType">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Type Name</label>
              <input v-model="newType.name" type="text" class="w-full border rounded px-3 py-2" placeholder="e.g. Premium, Basic, Student" required />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Price</label>
              <input v-model="newType.price" type="text" class="w-full border rounded px-3 py-2" placeholder="e.g. $29/month" required />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea v-model="newType.description" class="w-full border rounded px-3 py-2" placeholder="Brief description of the Membership type" rows="2"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Features</label>
              <div class="flex gap-2 mb-2">
                <input v-model="featureInput" type="text" class="flex-1 border rounded px-3 py-2" placeholder="Add a Feature" />
                <button type="button" class="bg-black text-white px-4 py-2 rounded" @click="addFeature">Add</button>
              </div>
              <ul class="mb-2">
                <li v-for="(f, i) in newType.features" :key="i" class="text-sm flex items-center gap-2 mb-1">
                  <span>{{ f }}</span>
                  <button type="button" class="text-red-500" @click="removeFeature(i)">&times;</button>
                </li>
              </ul>
            </div>
            <div class="flex gap-2 mt-6">
              <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Create Type</button>
              <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showCreateTypeModal = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="showEditTypeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-0 relative">
        <div class="px-8 pt-8 pb-4">
          <h2 class="font-semibold text-lg mb-4">Edit {{ editTypeData.name }} Type</h2>
          <div class="mb-4 bg-orange-50 rounded p-3">
            <div class="text-xs text-orange-700 mb-1">Current Members</div>
            <div class="text-2xl font-bold text-orange-700">{{ editTypeData.memberCount }}</div>
          </div>
          <form @submit.prevent="handleUpdateType">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Type Name</label>
              <input v-model="editTypeData.name" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Price</label>
              <input v-model="editTypeData.price" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea v-model="editTypeData.description" class="w-full border rounded px-3 py-2" rows="2"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Features</label>
              <div class="flex gap-2 mb-2">
                <input v-model="editFeatureInput" type="text" class="flex-1 border rounded px-3 py-2" placeholder="Add a Feature" />
                <button type="button" class="bg-black text-white px-4 py-2 rounded" @click="addEditFeature">Add</button>
              </div>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="(f, i) in editTypeData.features" :key="i" class="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                  {{ f }}
                  <button type="button" class="text-gray-400 hover:text-red-500 ml-1" @click="removeEditFeature(i)">&times;</button>
                </span>
              </div>
            </div>
            <div class="flex gap-2 mt-6">
              <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Update Type</button>
              <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showEditTypeModal = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="showPermissionsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl p-0 relative">
        <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showPermissionsModal = false">&times;</button>
        <div class="px-8 pt-8 pb-4 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-lg flex items-center gap-2">
              <span>Manage Permissions – {{ permissionsTypeData.name }}</span>
            </h2>
            <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{{ permissionsTypeData.memberCount }} members</span>
          </div>
          <form @submit.prevent="savePermissions">
            <div v-for="(category, i) in permissionsCategories" :key="i" class="mb-6 border rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">{{ category.icon }}</span>
                <span class="font-semibold">{{ category.name }}</span>
              </div>
              <div class="text-xs text-gray-500 mb-3">{{ category.desc }}</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label v-for="(perm, j) in category.permissions" :key="j" class="flex items-center gap-2 text-sm">
                  <input type="checkbox" v-model="category.permissions[j].checked" />
                  <span>{{ perm.label }}</span>
                </label>
              </div>
            </div>
            <div class="flex gap-2 mt-6">
              <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Save Permissions</button>
              <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showPermissionsModal = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Onboarding Tab -->
    <div v-if="activeTab === 'Onboarding'">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Member Onboarding Tools</h2>
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <button class="flex-1 bg-black text-white px-4 py-2 rounded font-medium" @click="showAddMemberModal = true">+ Add Member</button>
          <button class="flex-1 border border-gray-300 px-4 py-2 rounded font-medium flex items-center justify-center gap-2" @click="showImportModal = true">
            <span class="material-icons-outlined">upload_file</span> Import CSV
          </button>
        </div>
        <div>
          <div class="font-medium mb-2">Invitation Links</div>
          <div class="text-xs text-gray-500 mb-2">Generate custom invitation links for efficient membership signups.</div>
          <div class="flex flex-col md:flex-row gap-2">
            <input type="text" class="flex-1 border rounded px-3 py-2" placeholder="Link shown after generation" disabled />
            <select class="border rounded px-3 py-2 w-48">
              <option>Membership Type</option>
              <option>Premium</option>
              <option>Basic</option>
              <option>Student</option>
            </select>
            <button class="bg-black text-white px-4 py-2 rounded font-medium">Generate Link</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddMemberModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
        <div class="px-8 pt-8 pb-4">
          <h2 class="font-semibold text-lg mb-4 flex items-center gap-2">
            <span class="material-icons-outlined">person_add</span> Add New Member
          </h2>
          <form @submit.prevent="handleAddMember">
            <div class="flex gap-4 mb-4">
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Full Name</label>
                <input v-model="newMember.name" type="text" class="w-full border rounded px-3 py-2" placeholder="Enter First Name" required />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Email Address</label>
                <input v-model="newMember.email" type="email" class="w-full border rounded px-3 py-2" placeholder="Enter Email address" required />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Membership Type</label>
              <select v-model="newMember.type" class="w-full border rounded px-3 py-2" required>
                <option value="" disabled>Select membership type</option>
                <option>Premium</option>
                <option>Basic</option>
                <option>Student</option>
              </select>
            </div>
            <div class="mb-4">
              <div class="bg-orange-50 rounded p-3 flex items-center gap-2">
                <input id="welcomeEmail" type="checkbox" v-model="newMember.sendWelcome" class="accent-orange-500" />
                <label for="welcomeEmail" class="text-orange-700 text-sm cursor-pointer">Send welcome email with login instructions</label>
              </div>
            </div>
            <div class="flex gap-2 mt-6">
              <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showAddMemberModal = false">Cancel</button>
              <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Add Member</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="showImportModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl p-0 relative">
        <div class="px-8 pt-8 pb-4">
          <h2 class="font-semibold text-lg mb-4 flex items-center gap-2">
            <span class="material-icons-outlined">group_add</span> Bulk Import Members
          </h2>
          <form @submit.prevent="handleImportMembers">
            <!-- Step 1: Download Template -->
            <div class="mb-6 border rounded-lg p-4">
              <div class="font-semibold mb-2">Step 1: Download Template</div>
              <div class="text-sm text-gray-500 mb-2">Download our CSV template to ensure your data is formatted correctly.</div>
              <button type="button" class="border rounded px-4 py-2 font-medium flex items-center gap-2 bg-gray-50 text-gray-700" @click="downloadTemplate">
                <span class="material-icons-outlined">download</span> Download CSV Template
              </button>
            </div>
            <!-- Step 2: Upload CSV -->
            <div class="mb-6 border rounded-lg p-4">
              <div class="font-semibold mb-2">Step 2: Upload Template</div>
              <div class="text-sm text-gray-500 mb-2">Click to upload or drag and drop your CSV file</div>
              <label class="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                <input type="file" accept=".csv" class="hidden" @change="handleFileUpload" />
                <span class="material-icons-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                <div class="text-gray-500">Choose File</div>
                <div v-if="importFileName" class="mt-2 text-xs text-gray-700">{{ importFileName }}</div>
              </label>
            </div>
            <!-- Step 3: Import Settings -->
            <div class="mb-6 border rounded-lg p-4">
              <div class="font-semibold mb-2">Step 3: Import Settings</div>
              <label class="block text-sm font-medium mb-1">Default Membership Type</label>
              <select v-model="importMembershipType" class="w-full border rounded px-3 py-2 mb-3" required>
                <option value="" disabled>Select default membership type</option>
                <option>Premium</option>
                <option>Basic</option>
                <option>Student</option>
              </select>
              <div class="bg-orange-50 rounded p-3 text-orange-700 text-xs">
                <div class="font-semibold mb-1">Import Notes:</div>
                <ul class="list-disc pl-5">
                  <li>Duplicate emails will be skipped</li>
                  <li>Welcome emails will be sent automatically</li>
                  <li>Invalid entries will be reported after import</li>
                </ul>
              </div>
            </div>
            <div class="flex gap-2 mt-6">
              <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showImportModal = false">Cancel</button>
              <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Import Members</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PencilIcon, EyeIcon } from '@heroicons/vue/24/outline';
import EditMemberModal from '@/components/EditMemberModal.vue';
import MemberSettingsModal from '@/components/MemberSettingsModal.vue';
import DeleteMemberModal from '@/components/DeleteMemberModal.vue';
import { useRouter } from 'vue-router';

// Define the member type
interface MemberType {
  name: string;
  email: string;
  type: string;
  status: string;
  subscription: string;
  subscriptionDate: string;
  lastActive: string;
}

const tabs = ['Member Directory', 'Membership Types', 'Onboarding'];
const activeTab = ref('Member Directory');
const icons = { PencilIcon, EyeIcon };
const members: MemberType[] = [
  { name: 'John Doe', email: 'john@example.com', type: 'Premium', status: 'Active', subscription: 'Paid', subscriptionDate: '2024-01-15', lastActive: '2 hours ago' },
  { name: 'Jane Smith', email: 'jane@example.com', type: 'Basic', status: 'Suspended', subscription: 'Overdue', subscriptionDate: '2024-01-15', lastActive: '2 hours ago' },
  { name: 'Bob Johnson', email: 'bob@example.com', type: 'Student', status: 'Suspended', subscription: 'Overdue', subscriptionDate: '2024-01-15', lastActive: '2 hours ago' },
  { name: 'Sarah Wilson', email: 'sarah@example.com', type: 'Student', status: 'Active', subscription: 'Grace Period', subscriptionDate: '2024-01-15', lastActive: '2 hours ago' },
];
const editMember = ref<MemberType | null>(null);
const viewMember = ref<MemberType | null>(null);
const showDeleteModal = ref(false);
const memberToDelete = ref<MemberType | undefined>(undefined);
const showCreateTypeModal = ref(false);
const newType = ref({ name: '', price: '', description: '', features: [] as string[] });
const featureInput = ref('');
const membershipTypes = [
  {
    name: 'Premium', price: '$89/month', memberCount: 1247, description: 'Premium membership with 3 features', features: ['All Groups Access', 'Exclusive Resources', 'Priority Support']
  },
  {
    name: 'Basic', price: '$29/month', memberCount: 892, description: 'Basic membership with 2 features', features: ['Basic Groups', 'Standard Resources']
  },
  {
    name: 'Student', price: '$15/month', memberCount: 708, description: 'Student membership with 2 features', features: ['Student Groups', 'Educational Resources']
  }
];
const showEditTypeModal = ref(false);
const editTypeData = ref({ name: '', price: '', memberCount: 0, description: '', features: [] as string[] });
const editFeatureInput = ref('');
const showPermissionsModal = ref(false);
const permissionsTypeData = ref({ name: '', memberCount: 0 });
const permissionsCategories = ref([
  {
    name: 'Community Access',
    icon: '👥',
    desc: 'Permissions related to community interaction',
    permissions: [
      { label: 'View Groups', checked: true },
      { label: 'Join Groups', checked: true },
      { label: 'Create Posts', checked: false },
      { label: 'Comment on Posts', checked: false },
      { label: 'Like Posts', checked: false },
      { label: 'Access Member Hub', checked: false },
      { label: 'Send Messages', checked: false },
    ]
  },
  {
    name: 'Events & Meetings',
    icon: '📅',
    desc: 'Permissions relating to events and workshops',
    permissions: [
      { label: 'View Events', checked: true },
      { label: 'Register for Events', checked: true },
      { label: 'Create Events', checked: false },
      { label: 'Manage Events', checked: false },
      { label: 'View Event Analytics', checked: false },
    ]
  },
  {
    name: 'Resources & Content',
    icon: '📚',
    desc: 'Permissions related to resources and content',
    permissions: [
      { label: 'View Resources', checked: true },
      { label: 'Download Resources', checked: false },
      { label: 'Upload Resources', checked: false },
      { label: 'Manage Resources', checked: false },
      { label: 'View Research Materials', checked: false },
    ]
  },
  {
    name: 'Administrative',
    icon: '🛠️',
    desc: 'Administrative and moderation permissions',
    permissions: [
      { label: 'View Member List', checked: true },
      { label: 'Approve Memberships', checked: false },
      { label: 'Change Settings', checked: false },
      { label: 'Moderate Content', checked: false },
      { label: 'Suspend and Remove Members', checked: false },
      { label: 'View Reports and Analytics', checked: false },
      { label: 'Moderate Comments', checked: false },
    ]
  }
]);
const showAddMemberModal = ref(false);
const newMember = ref({ name: '', email: '', type: '', sendWelcome: true });
const showImportModal = ref(false);
const importFileName = ref('');
const importMembershipType = ref('');
const router = useRouter();

function handleDeleteMember(member) {
  // Remove the member from the list (optional, for demo)
  const idx = members.findIndex(m => m.email === member.email);
  if (idx !== -1) members.splice(idx, 1);
  showDeleteModal.value = false;
  memberToDelete.value = undefined;
}

function addFeature() {
  if (featureInput.value.trim()) {
    newType.value.features.push(featureInput.value.trim());
    featureInput.value = '';
  }
}

function removeFeature(idx: number) {
  newType.value.features.splice(idx, 1);
}

function handleCreateType() {
  // Here you would add logic to save the new type
  showCreateTypeModal.value = false;
  newType.value = { name: '', price: '', description: '', features: [] };
}

function openEditTypeModal(type) {
  editTypeData.value = { ...type, features: [...type.features] };
  showEditTypeModal.value = true;
  editFeatureInput.value = '';
}

function addEditFeature() {
  if (editFeatureInput.value.trim()) {
    editTypeData.value.features.push(editFeatureInput.value.trim());
    editFeatureInput.value = '';
  }
}

function removeEditFeature(idx: number) {
  editTypeData.value.features.splice(idx, 1);
}

function handleUpdateType() {
  // Here you would update the type in your data source
  showEditTypeModal.value = false;
}

function openPermissionsModal(type) {
  permissionsTypeData.value = { name: type.name, memberCount: type.memberCount };
  showPermissionsModal.value = true;
}

function savePermissions() {
  // Save logic here
  showPermissionsModal.value = false;
}

function handleAddMember() {
  // Add logic to save the new member
  showAddMemberModal.value = false;
  newMember.value = { name: '', email: '', type: '', sendWelcome: true };
}

function handleFileUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    importFileName.value = files[0].name;
  }
}

function downloadTemplate() {
  // Logic to download template
}

function handleImportMembers() {
  // Logic to import members
  showImportModal.value = false;
  importFileName.value = '';
  importMembershipType.value = '';
  router.push('/activity-logs');
}
</script> 