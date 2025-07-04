<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-2">
      <div>
        <h1 class="text-2xl font-semibold">Resources Management</h1>
        <div class="text-sm text-gray-500">Manage your resource library, blog content, and visibility settings</div>
      </div>
      <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> Add Resource</button>
    </div>
    <div class="flex gap-6 border-b mb-4 mt-4">
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Resource Library' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Resource Library'">Resource Library</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Blog Manager' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Blog Manager'">Blog Manager</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Visibility Settings' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Visibility Settings'">Visibility Settings</button>
    </div>
    <div v-if="activeTab === 'Resource Library'">
      <div class="text-xs text-gray-400 mb-2">Resource Library</div>
      <div class="text-xs text-gray-500 mb-4">Manage and organize your community resources</div>
      <div class="mb-6">
        <input type="text" class="w-full border rounded px-3 py-2 text-sm" placeholder="Search resources..." v-model="search" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="resource in filteredResources" :key="resource.id" class="bg-white border rounded-xl shadow-sm p-5 flex flex-col min-w-[340px] max-w-full" style="min-height: 240px;">
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <component :is="resource.icon" class="w-6 h-6 text-gray-700" />
              <div>
                <div class="font-semibold text-base leading-tight">{{ resource.title }}</div>
                <div class="text-xs text-gray-400">{{ resource.category }}</div>
              </div>
            </div>
            <span v-if="resource.type" :class="['px-3 py-1 rounded-full text-xs font-semibold', resource.type === 'PDF' ? 'bg-red-50 text-red-500' : resource.type === 'Video' ? 'bg-purple-50 text-purple-500' : 'bg-blue-50 text-blue-500']">{{ resource.type }}</span>
          </div>
          <div class="text-xs text-gray-600 mb-3 mt-1">{{ resource.description }}</div>
          <div class="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500 mb-2">
            <span>Size: {{ resource.size }}</span>
            <span>Downloads:{{ resource.downloads }}</span>
            <span>Uploaded: {{ resource.uploaded }}</span>
            <span>Visibility:{{ resource.visibility }}</span>
          </div>
          <div class="mt-auto flex gap-2 pt-2">
            <button class="flex items-center gap-1 border rounded px-3 py-1 text-xs font-medium hover:bg-gray-50"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> View</button>
            <button class="flex items-center gap-1 border rounded px-3 py-1 text-xs font-medium hover:bg-gray-50"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5"/></svg> Download</button>
            <button class="flex items-center gap-1 border rounded px-3 py-1 text-xs font-medium hover:bg-gray-50"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6"/></svg> Edit</button>
            <button class="flex items-center gap-1 border rounded px-3 py-1 text-xs font-medium hover:bg-gray-50"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg> Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Blog Manager'">
      <div class="text-xs text-gray-400 mb-2">Blog Manager (Coming Soon)</div>
    </div>
    <div v-else-if="activeTab === 'Visibility Settings'">
      <div class="text-xs text-gray-400 mb-2">Visibility Settings (Coming Soon)</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// Use fallback SVGs for icons, or import from your icon set if available
const DocumentIcon = {
  template: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>'
};
const VideoIcon = {
  template: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>'
};
const InfographicIcon = {
  template: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h4v4"/></svg>'
};
const activeTab = ref('Resource Library');
const search = ref('');
const resources = ref([
  {
    id: 1,
    title: 'Member Handbook 2024',
    category: 'Documentation',
    description: 'Complete guide for new members',
    type: 'PDF',
    icon: DocumentIcon,
    size: '2.4 MB',
    downloads: 156,
    uploaded: '2024-01-15',
    visibility: 'All Members',
  },
  {
    id: 2,
    title: 'Welcome Orientation Video',
    category: 'Training',
    description: 'Introductory video for new members',
    type: 'Video',
    icon: VideoIcon,
    size: '45.2 MB',
    downloads: 89,
    uploaded: '2024-01-10',
    visibility: 'New Members',
  },
  {
    id: 3,
    title: 'Group Guidelines Infographic',
    category: 'Guidelines',
    description: 'Visual guide to group participation rules',
    type: 'PDF',
    icon: InfographicIcon,
    size: '1.8 MB',
    downloads: 89,
    uploaded: '2024-01-10',
    visibility: 'New Members',
  },
]);
const filteredResources = computed(() => {
  if (!search.value) return resources.value;
  return resources.value.filter(r => r.title.toLowerCase().includes(search.value.toLowerCase()) || r.description.toLowerCase().includes(search.value.toLowerCase()));
});
</script> 