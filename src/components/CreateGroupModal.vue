<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
    @click.self="close"
  >
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-semibold">Create New Group</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
      </div>

      <!-- Loading/Error States -->
      <div v-if="loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Creating group...</p>
      </div>

      <div v-else-if="error" class="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400">
        <p class="font-semibold">Error creating group</p>
        <p class="text-sm mt-1">{{ error }}</p>
      </div>

      <form v-else @submit.prevent="submit" class="p-6 space-y-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold border-b pb-2">Basic Information</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Group Name <span class="text-red-500">*</span></label>
              <input v-model="form.name" type="text" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="Enter group name" required />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Email <span class="text-red-500">*</span></label>
              <input v-model="form.email" type="email" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="group@example.com" required />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="form.description" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" rows="3" placeholder="Describe what this group is about"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Website</label>
              <input v-model="form.website" type="url" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="https://example.com" />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Phone</label>
              <input v-model="form.phone" type="tel" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="+234-123-456-7890" />
            </div>
          </div>
        </div>

        <!-- Address -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold border-b pb-2">Address</h3>
          
          <div>
            <label class="block text-sm font-medium mb-1">Street</label>
            <input v-model="form.address.street" type="text" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="123 Main Street" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">City</label>
              <input v-model="form.address.city" type="text" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="Lagos" />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">State</label>
              <input v-model="form.address.state" type="text" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="Lagos" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Country</label>
              <input v-model="form.address.country" type="text" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="Nigeria" />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Postal Code</label>
              <input v-model="form.address.postal_code" type="text" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="100001" />
            </div>
          </div>
        </div>

        <!-- Group Settings -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold border-b pb-2">Group Settings</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Visibility <span class="text-red-500">*</span></label>
              <select v-model="form.visibility" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" required>
                <option value="public">Public - Anyone can see this group</option>
                <option value="private">Private - Only members can see</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Join Method <span class="text-red-500">*</span></label>
              <select v-model="form.join_method" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" required>
                <option value="direct">Direct - Anyone can join</option>
                <option value="invite_only">Invite Only - Must be invited</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Membership & Payment -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold border-b pb-2">Membership & Payment</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Membership Fee <span class="text-red-500">*</span></label>
              <input v-model.number="form.membership_fee" type="number" min="0" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="5000" required />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Currency <span class="text-red-500">*</span></label>
              <select v-model="form.currency" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" required>
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Payment Interval <span class="text-red-500">*</span></label>
              <select v-model="form.payment_interval" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" required>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Categories & Tags -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold border-b pb-2">Categories & Tags</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Categories (comma separated)</label>
              <input v-model="categoriesInput" type="text" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="General, Technology" />
              <p class="text-xs text-gray-500 mt-1">Example: General, Technology, Community</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input v-model="tagsInput" type="text" class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" placeholder="community, tech, networking" />
              <p class="text-xs text-gray-500 mt-1">Example: community, tech, networking</p>
            </div>
          </div>
        </div>

        <!-- Advanced Settings (Collapsible) -->
        <div class="space-y-4">
          <button type="button" @click="showAdvanced = !showAdvanced" class="flex items-center gap-2 text-lg font-semibold border-b pb-2 w-full">
            <span>Advanced Settings</span>
            <span class="text-sm">{{ showAdvanced ? '▼' : '▶' }}</span>
          </button>
          
          <div v-show="showAdvanced" class="space-y-4 pl-4">
            <!-- Member Settings -->
            <div class="space-y-2">
              <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Member Settings</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.settings.require_approval" class="rounded" />
                  <span class="text-sm">Require approval to join</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.settings.require_identity" class="rounded" />
                  <span class="text-sm">Require identity verification</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.settings.allow_member_invites" class="rounded" />
                  <span class="text-sm">Allow members to invite others</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.settings.allow_member_posts" class="rounded" />
                  <span class="text-sm">Allow member posts</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.settings.require_post_approval" class="rounded" />
                  <span class="text-sm">Require post approval</span>
                </label>
              </div>
            </div>

            <!-- Payment Settings -->
            <div class="space-y-2">
              <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Payment Settings</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs mb-1">Grace Period (days)</label>
                  <input v-model.number="form.settings.grace_period" type="number" min="0" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" />
                </div>
                <div>
                  <label class="block text-xs mb-1">Max Defaults</label>
                  <input v-model.number="form.settings.max_default_payments" type="number" min="0" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" />
                </div>
                <div>
                  <label class="block text-xs mb-1">Auto Remind (days before)</label>
                  <input v-model.number="form.settings.auto_remind_days_before" type="number" min="0" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" />
                </div>
              </div>
              <label class="flex items-center gap-2 mt-2">
                <input type="checkbox" v-model="form.settings.auto_suspend_overdue" class="rounded" />
                <span class="text-sm">Auto-suspend members with overdue payments</span>
              </label>
            </div>

            <!-- Features -->
            <div class="space-y-2">
              <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Features</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.settings.enable_badges" class="rounded" />
                  <span class="text-sm">Enable badges</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.settings.enable_leaderboard" class="rounded" />
                  <span class="text-sm">Enable leaderboard</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.settings.enable_ai_chat" class="rounded" />
                  <span class="text-sm">Enable AI chat</span>
                </label>
              </div>
            </div>

            <!-- File Settings -->
            <div class="space-y-2">
              <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">File Upload Settings</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs mb-1">Max File Size (bytes)</label>
                  <input v-model.number="form.settings.max_file_size" type="number" min="0" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" />
                  <p class="text-xs text-gray-500 mt-1">Current: {{ (form.settings.max_file_size / 1048576).toFixed(1) }} MB</p>
                </div>
                <div>
                  <label class="block text-xs mb-1">Allowed File Types (comma separated)</label>
                  <input v-model="allowedFileTypesInput" type="text" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" placeholder="pdf, jpg, png, docx" />
                </div>
              </div>
            </div>

            <!-- Theme -->
            <div class="space-y-2">
              <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Theme Colors</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs mb-1">Primary Color</label>
                  <input v-model="form.theme.primary_color" type="color" class="w-full h-10 border dark:border-gray-600 rounded" />
                </div>
                <div>
                  <label class="block text-xs mb-1">Secondary Color</label>
                  <input v-model="form.theme.secondary_color" type="color" class="w-full h-10 border dark:border-gray-600 rounded" />
                </div>
                <div>
                  <label class="block text-xs mb-1">Accent Color</label>
                  <input v-model="form.theme.accent_color" type="color" class="w-full h-10 border dark:border-gray-600 rounded" />
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="space-y-2">
              <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Social Links</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs mb-1">Facebook</label>
                  <input v-model="form.social_links.facebook" type="url" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" placeholder="https://facebook.com/group" />
                </div>
                <div>
                  <label class="block text-xs mb-1">Twitter</label>
                  <input v-model="form.social_links.twitter" type="url" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" placeholder="https://twitter.com/group" />
                </div>
                <div>
                  <label class="block text-xs mb-1">LinkedIn</label>
                  <input v-model="form.social_links.linkedin" type="url" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" placeholder="https://linkedin.com/company/group" />
                </div>
                <div>
                  <label class="block text-xs mb-1">Instagram</label>
                  <input v-model="form.social_links.instagram" type="url" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" placeholder="https://instagram.com/group" />
                </div>
              </div>
            </div>

            <!-- Custom Fields -->
            <div class="space-y-2">
              <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300">Custom Fields</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs mb-1">Industry</label>
                  <input v-model="form.custom_fields.industry" type="text" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800" placeholder="Technology" />
                </div>
                <div>
                  <label class="block text-xs mb-1">Size</label>
                  <select v-model="form.custom_fields.size" class="w-full border dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800">
                    <option value="">Select size</option>
                    <option value="small">Small (1-50 members)</option>
                    <option value="medium">Medium (51-200 members)</option>
                    <option value="large">Large (201-1000 members)</option>
                    <option value="enterprise">Enterprise (1000+ members)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
          <button type="button" @click="close" class="px-6 py-2 rounded border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
            Cancel
          </button>
          <button type="submit" :disabled="loading" class="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Create Group
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { groupService } from '@/services/groupService';
import { useToast } from 'vue-toastification';

const emit = defineEmits(['close', 'created']);
const toast = useToast();

const loading = ref(false);
const error = ref('');
const showAdvanced = ref(false);

// Form data
const form = ref({
  name: '',
  description: '',
  website: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    postal_code: ''
  },
  visibility: 'public',
  join_method: 'direct',
  membership_fee: 5000,
  currency: 'NGN',
  payment_interval: 'monthly',
  settings: {
    require_approval: false,
    require_identity: false,
    allow_member_invites: true,
    allow_member_posts: true,
    require_post_approval: false,
    grace_period: 7,
    max_default_payments: 3,
    auto_suspend_overdue: false,
    auto_remind_days_before: 3,
    enable_badges: true,
    enable_leaderboard: true,
    enable_ai_chat: false,
    max_file_size: 10485760,
    allowed_file_types: ['pdf', 'jpg', 'png', 'docx']
  },
  theme: {
    primary_color: '#0057B8',
    secondary_color: '#FFD700',
    accent_color: '#FF5733'
  },
  categories: [] as string[],
  tags: [] as string[],
  custom_fields: {
    industry: '',
    size: 'medium'
  },
  social_links: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  }
});

// Helper inputs for arrays
const categoriesInput = ref('General, Technology');
const tagsInput = ref('community, tech, networking');
const allowedFileTypesInput = ref('pdf, jpg, png, docx');

function close() {
  emit('close');
}

async function submit() {
  try {
    loading.value = true;
    error.value = '';

    // Parse comma-separated inputs
    form.value.categories = categoriesInput.value.split(',').map(c => c.trim()).filter(c => c);
    form.value.tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t);
    form.value.settings.allowed_file_types = allowedFileTypesInput.value.split(',').map(t => t.trim()).filter(t => t);

    console.log('Creating group with data:', form.value);

    const response = await groupService.createGroup(form.value);

    console.log('Group created successfully:', response);

    toast.success(`Group "${form.value.name}" created successfully!`);
    emit('created', response.data);
    close();
  } catch (err: any) {
    console.error('Error creating group:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to create group. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>
