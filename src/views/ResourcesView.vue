<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-2">
      <div>
        <h1 class="text-2xl font-semibold">Resources Management</h1>
        <div class="text-sm text-gray-500">Manage your resource library, blog content, and visibility settings</div>
      </div>
      <div v-if="activeTab === 'Resource Library'">
        <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="openAddResourceModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Add Resource
        </button>
      </div>
      <div v-else-if="activeTab === 'Blog Manager'" class="flex gap-2">
        <button class="border border-black text-black rounded px-4 py-2 flex items-center gap-2 text-sm font-medium bg-white hover:bg-gray-50" @click="openBroadcastModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8M8 16h8M8 8h8"/>
          </svg>
          Broadcast to All
        </button>
        <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="openAddBlogModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Create post
        </button>
      </div>
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
            <button class="flex items-center gap-1 border rounded px-3 py-1 text-xs font-medium hover:bg-gray-50" @click="openResourceModal(resource)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> View</button>
            <button class="flex items-center gap-1 border rounded px-3 py-1 text-xs font-medium hover:bg-gray-50"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5"/></svg> Download</button>
            <button class="flex items-center gap-1 border rounded px-3 py-1 text-xs font-medium hover:bg-gray-50" @click="openEditResourceModal(resource)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6"/></svg> Edit</button>
            <button class="flex items-center gap-1 border rounded px-3 py-1 text-xs font-medium hover:bg-gray-50" @click="openDeleteResourceModal(resource)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg> Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Blog Manager'">
      <div class="text-xs text-gray-500 mb-4">Create and broadcast blog posts to your community</div>
      <input type="text" class="w-full border rounded px-3 py-2 text-sm mb-4" placeholder="Search blog post..." v-model="blogSearch" />
      <div v-for="post in filteredBlogPosts" :key="post.id" class="bg-white border rounded-xl shadow-sm p-5 mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="font-semibold text-base">{{ post.title }}</span>
          <span v-if="post.status === 'Published'" class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">Published</span>
          <span v-else-if="post.status === 'Scheduled'" class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">Scheduled</span>
          <span v-if="post.broadcasted" class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-semibold">Broadcasted</span>
        </div>
        <div class="text-sm text-gray-600 mb-2">{{ post.excerpt }}</div>
        <div class="flex flex-wrap gap-4 text-xs text-gray-500 mb-2 items-center">
          <span>By {{ post.author }}</span>
          <span>{{ post.category }}</span>
          <span>{{ post.date }}</span>
          <span v-if="post.views !== undefined">
            <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            {{ post.views }} views
          </span>
        </div>
        <div class="flex gap-2 items-center mb-1">
          <span v-if="post.status === 'Published'">Sent on {{ post.date }}</span>
          <span v-else-if="post.status === 'Scheduled'">Not broadcasted yet</span>
        </div>
        <div class="flex gap-2 mt-2">
          <button
            class="border rounded px-3 py-1 text-xs font-medium flex items-center gap-1"
            @click="openBlogPreviewModal(post)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Preview
          </button>
          <button class="border rounded px-3 py-1 text-xs font-medium flex items-center gap-1" @click="openEditBlogModal(post)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6"/>
            </svg>
            Edit
          </button>
          <button class="border rounded px-3 py-1 text-xs font-medium flex items-center gap-1" @click="openDeleteBlogModal(post)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Visibility Settings'">
      <div class="text-xs text-gray-400 mb-2">Visibility Settings</div>
      <div class="mb-6">
        <div class="border rounded-xl p-6 mb-6">
          <div class="font-semibold mb-2">General Visibility</div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Public Library Access</div>
                <div class="text-xs text-gray-500">Allow all users to browse the resource library</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="visibilitySettings.publicLibrary" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Member-Only Resources</div>
                <div class="text-xs text-gray-500">Restrict certain resources to registered members only</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="visibilitySettings.memberOnly" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Guest Download Access</div>
                <div class="text-xs text-gray-500">Allow guests to download public resources</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="visibilitySettings.guestDownload" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Download Restrictions</div>
                <div class="text-xs text-gray-500">Restrict high-value digital file downloads</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="visibilitySettings.downloadRestrictions" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="font-semibold mb-2">Visibility Groups</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border rounded-lg p-4 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div class="font-medium text-sm">All Members</div>
                <button class="text-xs text-blue-600 border border-blue-600 rounded px-2 py-0.5">Edit Members</button>
              </div>
              <div class="text-xs text-gray-500">Visible to all registered members</div>
            </div>
            <div class="border rounded-lg p-4 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div class="font-medium text-sm">New Members</div>
                <button class="text-xs text-blue-600 border border-blue-600 rounded px-2 py-0.5">Edit Members</button>
              </div>
              <div class="text-xs text-gray-500">Visible to members who joined in the last 30 days</div>
            </div>
            <div class="border rounded-lg p-4 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div class="font-medium text-sm">Premium Members</div>
                <button class="text-xs text-blue-600 border border-blue-600 rounded px-2 py-0.5">Edit Members</button>
              </div>
              <div class="text-xs text-gray-500">Only for active subscription members</div>
            </div>
            <div class="border rounded-lg p-4 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div class="font-medium text-sm">Administrators</div>
                <button class="text-xs text-blue-600 border border-blue-600 rounded px-2 py-0.5">Configure</button>
              </div>
              <div class="text-xs text-gray-500">Only visible to admins</div>
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="font-semibold mb-2">Resource Category Visibility</div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Documentation</div>
                <div class="text-xs text-gray-500">Control visibility for official resource categories</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="visibilitySettings.documentation" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Training Materials</div>
                <div class="text-xs text-gray-500">Control visibility for training resources</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="visibilitySettings.training" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Guidelines & Policies</div>
                <div class="text-xs text-gray-500">Set access for guidelines and policies</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="visibilitySettings.guidelines" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Important Announcements</div>
                <div class="text-xs text-gray-500">Set access for important updates</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="visibilitySettings.announcements" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="font-semibold mb-2">Resource Category Visibility</div>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2">
              <input type="radio" v-model="visibilitySettings.resourceCategory" value="Public Access" />
              Public Access
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" v-model="visibilitySettings.resourceCategory" value="Members Only" />
              Members Only
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" v-model="visibilitySettings.resourceCategory" value="Private" />
              Private
            </label>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeResourceModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div v-if="selectedResource">
          <h2 class="text-xl font-semibold mb-2">{{ selectedResource.title }}</h2>
          <div class="flex flex-wrap gap-4 text-sm mb-4">
            <div><strong>Category:</strong> {{ selectedResource.category }}</div>
            <div><strong>Visibility:</strong> {{ selectedResource.visibility }}</div>
            <div><strong>File Size:</strong> {{ selectedResource.size }}</div>
            <div><strong>Downloads:</strong> {{ selectedResource.downloads }}</div>
          </div>
          <div class="mb-2">
            <strong>Description:</strong>
            <div>{{ selectedResource.description }}</div>
          </div>
          <div class="mb-2 text-xs text-gray-500">
            <span>Uploaded: {{ selectedResource.uploaded }}</span>
          </div>
          <div class="mt-6 flex gap-2">
            <button class="bg-black text-white px-4 py-2 rounded" @click="downloadResource">Download File</button>
            <button class="border px-4 py-2 rounded" @click="closeResourceModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeEditResourceModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div v-if="editResource">
          <h2 class="text-xl font-semibold mb-4">Edit Resource</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Resource Title</label>
            <input v-model="editResource.title" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="editResource.description" class="w-full border rounded px-3 py-2 text-sm"></textarea>
          </div>
          <div class="mb-4 flex gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Category</label>
              <select v-model="editResource.category" class="w-full border rounded px-3 py-2 text-sm">
                <option>Documentation</option>
                <option>Training</option>
                <option>Guidelines</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Visibility</label>
              <select v-model="editResource.visibility" class="w-full border rounded px-3 py-2 text-sm">
                <option>All Members</option>
                <option>New Members</option>
              </select>
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium mb-1">Replace File (Optional)</label>
            <div class="border rounded px-3 py-8 text-center text-gray-400 text-sm">
              Click to upload new file or drag and drop<br />
              (File saving not implemented)
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-black text-white px-4 py-2 rounded" @click="updateResource">Update Resource</button>
            <button class="border px-4 py-2 rounded" @click="closeEditResourceModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeDeleteResourceModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div v-if="deleteResource">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
            </svg>
            <h2 class="text-xl font-semibold">Delete Resource</h2>
          </div>
          <div class="mb-4 text-gray-700">
            Are you sure you want to delete this resource? This action cannot be undone.
          </div>
          <div class="mb-4 p-3 border rounded bg-gray-50">
            <div class="font-semibold">{{ deleteResource.title }}</div>
            <div class="text-xs text-gray-500">{{ deleteResource.category }}</div>
            <span v-if="deleteResource.type" :class="['inline-block px-2 py-0.5 rounded-full text-xs font-semibold ml-2', deleteResource.type === 'PDF' ? 'bg-red-50 text-red-500' : deleteResource.type === 'Video' ? 'bg-purple-50 text-purple-500' : 'bg-blue-50 text-blue-500']">{{ deleteResource.type }}</span>
            <div class="text-xs mt-1">Size: {{ deleteResource.size }} | Downloads: {{ deleteResource.downloads }}</div>
            <div class="text-xs">Visibility: {{ deleteResource.visibility }}</div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Replace File (Optional)</label>
            <div class="border rounded px-3 py-8 text-center text-gray-400 text-sm">
              (Not required for delete)
            </div>
          </div>
          <div class="mb-4">
            <div class="border border-red-400 bg-red-50 text-red-700 rounded px-3 py-2 text-sm">
              <strong>Warning:</strong> This will permanently delete the resource file and all associated data. Members who have bookmarked this resource will lose access.
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-red-600 text-white px-4 py-2 rounded" @click="confirmDeleteResource">Delete Resource</button>
            <button class="border px-4 py-2 rounded" @click="closeDeleteResourceModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeAddResourceModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div>
          <h2 class="text-xl font-semibold mb-4">Add New Resource</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Resource Title</label>
            <input v-model="newResource.title" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter resource title" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="newResource.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Describe the resource"></textarea>
          </div>
          <div class="mb-4 flex gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Category</label>
              <select v-model="newResource.category" class="w-full border rounded px-3 py-2 text-sm">
                <option disabled value="">Select Category</option>
                <option>Documentation</option>
                <option>Training</option>
                <option>Guidelines</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Visibility</label>
              <select v-model="newResource.visibility" class="w-full border rounded px-3 py-2 text-sm">
                <option disabled value="">Select Visibility</option>
                <option>All Members</option>
                <option>New Members</option>
              </select>
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium mb-1">Upload File</label>
            <div class="border rounded px-3 py-8 text-center text-gray-400 text-sm">
              Click to upload or drag and drop<br />No .exe, .msi, or image/video files.
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-black text-white px-4 py-2 rounded" @click="addResource">Add Resource</button>
            <button class="border px-4 py-2 rounded" @click="closeAddResourceModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showAddBlogModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeAddBlogModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div>
          <h2 class="text-xl font-semibold mb-4">Create New Blog Post</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Post Title</label>
            <input v-model="newBlogPost.title" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter blog post title" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Excerpt</label>
            <input v-model="newBlogPost.excerpt" class="w-full border rounded px-3 py-2 text-sm" placeholder="A brief description of the post" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Content</label>
            <textarea v-model="newBlogPost.content" class="w-full border rounded px-3 py-2 text-sm" placeholder="Write your blog post content here"></textarea>
          </div>
          <div class="mb-4 flex gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Category</label>
              <select v-model="newBlogPost.category" class="w-full border rounded px-3 py-2 text-sm">
                <option disabled value="">Select Category</option>
                <option>Announcement</option>
                <option>Update</option>
                <option>Event</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Status</label>
              <select v-model="newBlogPost.status" class="w-full border rounded px-3 py-2 text-sm">
                <option value="Published">Publish now</option>
                <option value="Scheduled">Schedule</option>
              </select>
            </div>
          </div>
          <div class="mb-4 flex items-center">
            <input type="checkbox" v-model="newBlogPost.broadcasted" id="broadcasted" class="mr-2" />
            <label for="broadcasted" class="text-sm">Send broadcast notification to all members when published</label>
          </div>
          <div class="flex gap-2">
            <button class="bg-black text-white px-4 py-2 rounded" @click="addBlogPost">Publish</button>
            <button class="border px-4 py-2 rounded" @click="closeAddBlogModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showBlogPreviewModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeBlogPreviewModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div v-if="previewBlogPost">
          <div class="text-sm font-semibold mb-2">Preview Blog Post</div>
          <h2 class="text-2xl font-bold mb-2">{{ previewBlogPost.title }}</h2>
          <div class="flex flex-wrap gap-2 items-center text-xs text-gray-500 mb-2">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.07 4.93a10 10 0 11-14.14 0"/>
              </svg>
              By {{ previewBlogPost.author }}
            </span>
            <span>{{ previewBlogPost.date }}</span>
            <span v-if="previewBlogPost.views !== undefined">
              <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              {{ previewBlogPost.views }} views
            </span>
            <span class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">{{ previewBlogPost.category }}</span>
            <span v-if="previewBlogPost.status === 'Published'" class="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">Published</span>
            <span v-else-if="previewBlogPost.status === 'Scheduled'" class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">Scheduled</span>
          </div>
          <div class="prose prose-sm max-w-none mb-4">
            <div v-if="previewBlogPost.content">
              <div v-html="previewBlogPost.content"></div>
            </div>
            <div v-else>
              <div class="font-semibold mb-2">{{ previewBlogPost.excerpt }}</div>
              <div class="text-gray-700">No content available.</div>
            </div>
          </div>
          <div class="text-xs text-gray-500 mt-6">
            Published in {{ previewBlogPost.category }} &nbsp;|&nbsp; Broadcasted on {{ previewBlogPost.date }}
          </div>
          <div class="flex justify-end mt-4">
            <button class="border px-4 py-2 rounded" @click="closeBlogPreviewModal">Close Preview</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showEditBlogModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeEditBlogModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div v-if="editBlogPost">
          <h2 class="text-xl font-semibold mb-4">Edit Blog Post</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Post Title</label>
            <input v-model="editBlogPost.title" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Excerpt</label>
            <textarea v-model="editBlogPost.excerpt" class="w-full border rounded px-3 py-2 text-sm"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Content</label>
            <textarea v-model="editBlogPost.content" class="w-full border rounded px-3 py-2 text-sm"></textarea>
          </div>
          <div class="mb-4 flex gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Category</label>
              <select v-model="editBlogPost.category" class="w-full border rounded px-3 py-2 text-sm">
                <option>Announcement</option>
                <option>Update</option>
                <option>Event</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Status</label>
              <select v-model="editBlogPost.status" class="w-full border rounded px-3 py-2 text-sm">
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-black text-white px-4 py-2 rounded" @click="updateBlogPost">Update Post</button>
            <button class="border px-4 py-2 rounded" @click="closeEditBlogModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showDeleteBlogModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeDeleteBlogModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div>
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
            </svg>
            <h2 class="text-xl font-semibold">Delete Blog Post</h2>
          </div>
          <div class="mb-2 text-gray-700">Are you sure you want to delete this blog post? This action cannot be undone.</div>
          <div class="mb-4 p-3 border rounded bg-gray-50">
            <div class="font-semibold">{{ deleteBlogPost?.title }}</div>
            <span v-if="deleteBlogPost?.status === 'Published'" class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold ml-2">Published</span>
            <div class="text-xs text-gray-500 mt-1">{{ deleteBlogPost?.excerpt }}</div>
            <div class="flex flex-wrap gap-4 text-xs text-gray-500 mt-2 items-center">
              <span><svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.07 4.93a10 10 0 11-14.14 0"/></svg> Author: {{ deleteBlogPost?.author }}</span>
              <span><svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> Views:{{ deleteBlogPost?.views }}</span>
              <span><svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> Published:{{ deleteBlogPost?.date }}</span>
            </div>
            <div class="mt-2 p-2 bg-purple-50 border border-purple-200 text-purple-700 text-xs rounded">This post has been broadcasted to members on {{ deleteBlogPost?.date }}</div>
          </div>
          <div class="mb-4">
            <div class="border border-red-400 bg-red-50 text-red-700 rounded px-3 py-2 text-sm">
              <strong>Warning:</strong> This will permanently delete the blog post and all associated data. Members who have bookmarked this post will lose access.
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-red-600 text-white px-4 py-2 rounded" @click="confirmDeleteBlogPost">Delete Post</button>
            <button class="border px-4 py-2 rounded" @click="closeDeleteBlogModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showBroadcastModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          @click="closeBroadcastModal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div>
          <h2 class="text-xl font-semibold mb-4">Broadcast to All Members</h2>
          <div class="mb-4 p-3 border border-yellow-300 bg-yellow-50 text-yellow-800 text-sm rounded">
            <strong>Important Note:</strong><br />
            Mass broadcast (global broadcast) messages go to all listed members. Use this feature responsibly and only for important community-wide announcements.
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Subject Line:</label>
            <input v-model="broadcastForm.subject" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter broadcast subject" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Message Content:</label>
            <textarea v-model="broadcastForm.message" class="w-full border rounded px-3 py-2 text-sm" placeholder="Write your broadcast message here"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Broadcast Channels</label>
            <div class="flex flex-col gap-2">
              <label class="flex items-center gap-2"><input type="checkbox" v-model="broadcastForm.channels.email" /> Email Notification</label>
              <label class="flex items-center gap-2"><input type="checkbox" v-model="broadcastForm.channels.inApp" /> In-App Notification</label>
              <label class="flex items-center gap-2"><input type="checkbox" v-model="broadcastForm.channels.push" /> Push Notification</label>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Target Audience</label>
            <div class="flex flex-col gap-2">
              <label class="flex items-center gap-2"><input type="checkbox" v-model="broadcastForm.audience.all" /> All Members <span class="ml-2 text-xs text-gray-500">All Members</span></label>
              <label class="flex items-center gap-2"><input type="checkbox" v-model="broadcastForm.audience.active" /> Active Members (last 30 days) <span class="ml-2 text-xs text-gray-500">302 members</span></label>
              <label class="flex items-center gap-2"><input type="checkbox" v-model="broadcastForm.audience.premium" /> Premium Members <span class="ml-2 text-xs text-gray-500">84 members</span></label>
              <label class="flex items-center gap-2"><input type="checkbox" v-model="broadcastForm.audience.new" /> New Members (last 7 days) <span class="ml-2 text-xs text-gray-500">60 members</span></label>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Broadcast Summary</label>
            <div class="border rounded px-3 py-2 text-sm bg-gray-50 flex justify-between items-center">
              <span>Channels: {{ broadcastSummary }}</span>
              <span class="text-xs text-gray-500">60 members</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-black text-white px-4 py-2 rounded" @click="sendBroadcast">Send Broadcast</button>
            <button class="border px-4 py-2 rounded" @click="closeBroadcastModal">Cancel</button>
          </div>
        </div>
      </div>
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
const showModal = ref(false);
const selectedResource = ref<any>(null);
const showEditModal = ref(false);
const editResource = ref<any>(null);
const showDeleteModal = ref(false);
const deleteResource = ref<any>(null);
const showAddModal = ref(false);
const newResource = ref({
  title: '',
  description: '',
  category: '',
  visibility: '',
  // Add more fields as needed (e.g., file, type, size, etc.)
});
const blogPosts = ref([
  {
    id: 1,
    title: 'Welcome to Our Community!',
    status: 'Published',
    broadcasted: true,
    excerpt: "We're excited to have you join our growing community of like-minded individuals...",
    author: 'Admin Team',
    category: 'Announcement',
    date: '2024-01-15',
    views: 459,
  },
  {
    id: 2,
    title: 'New Features Coming Soon',
    status: 'Scheduled',
    broadcasted: false,
    excerpt: "We're working on some exciting new features that will enhance your experience...",
    author: 'Community Manager',
    category: 'Announcement',
    date: '2024-01-15',
    views: undefined,
  },
]);
const blogSearch = ref('');
const filteredBlogPosts = computed(() => {
  if (!blogSearch.value) return blogPosts.value;
  return blogPosts.value.filter(post =>
    post.title.toLowerCase().includes(blogSearch.value.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(blogSearch.value.toLowerCase())
  );
});
const showAddBlogModal = ref(false);
const newBlogPost = ref({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  status: 'Published',
  broadcasted: false,
});
const showBlogPreviewModal = ref(false);
const previewBlogPost = ref<any>(null);
const showEditBlogModal = ref(false);
const editBlogPost = ref<any>(null);
const showDeleteBlogModal = ref(false);
const deleteBlogPost = ref<any>(null);
const showBroadcastModal = ref(false);
const broadcastForm = ref({
  subject: '',
  message: '',
  channels: { email: false, inApp: false, push: false },
  audience: { all: false, active: false, premium: false, new: false },
});
const broadcastSummary = computed(() => {
  const channels: string[] = [];
  if (broadcastForm.value.channels.email) channels.push('Email');
  if (broadcastForm.value.channels.inApp) channels.push('In-App');
  if (broadcastForm.value.channels.push) channels.push('Push');
  return channels.length ? channels.join(', ') : 'None';
});
const visibilitySettings = ref({
  publicLibrary: false,
  memberOnly: false,
  guestDownload: false,
  downloadRestrictions: false,
  documentation: false,
  training: false,
  guidelines: false,
  announcements: false,
  resourceCategory: 'Public Access',
});

function openResourceModal(resource: any) {
  selectedResource.value = resource;
  showModal.value = true;
}

function closeResourceModal() {
  showModal.value = false;
  selectedResource.value = null;
}

function downloadResource() {
  // TODO: implement download logic
  alert('Download logic goes here!');
}

function openEditResourceModal(resource: any) {
  // Deep copy to avoid mutating the original until save
  editResource.value = { ...resource };
  showEditModal.value = true;
}

function closeEditResourceModal() {
  showEditModal.value = false;
  editResource.value = null;
}

function updateResource() {
  // Find and update the resource in the resources array
  const idx = resources.value.findIndex(r => r.id === editResource.value.id);
  if (idx !== -1) {
    resources.value[idx] = { ...editResource.value };
  }
  closeEditResourceModal();
}

function openDeleteResourceModal(resource: any) {
  deleteResource.value = resource;
  showDeleteModal.value = true;
}

function closeDeleteResourceModal() {
  showDeleteModal.value = false;
  deleteResource.value = null;
}

function confirmDeleteResource() {
  resources.value = resources.value.filter(r => r.id !== deleteResource.value.id);
  closeDeleteResourceModal();
}

function openAddResourceModal() {
  newResource.value = { title: '', description: '', category: '', visibility: '' };
  showAddModal.value = true;
}

function closeAddResourceModal() {
  showAddModal.value = false;
}

function addResource() {
  if (!newResource.value.title || !newResource.value.category || !newResource.value.visibility) return;
  resources.value.push({
    id: Date.now(),
    title: newResource.value.title,
    description: newResource.value.description,
    category: newResource.value.category,
    visibility: newResource.value.visibility,
    type: 'PDF', // Default type for demo
    icon: DocumentIcon,
    size: '1.0 MB', // Placeholder
    downloads: 0,
    uploaded: new Date().toISOString().slice(0, 10),
  });
  closeAddResourceModal();
}

function openAddBlogModal() {
  newBlogPost.value = { title: '', excerpt: '', content: '', category: '', status: 'Published', broadcasted: false };
  showAddBlogModal.value = true;
}

function closeAddBlogModal() {
  showAddBlogModal.value = false;
}

function addBlogPost() {
  if (!newBlogPost.value.title || !newBlogPost.value.category) return;
  blogPosts.value.unshift({
    id: Date.now(),
    title: newBlogPost.value.title,
    status: newBlogPost.value.status,
    broadcasted: newBlogPost.value.broadcasted,
    excerpt: newBlogPost.value.excerpt,
    author: 'Admin Team', // Or get from user
    category: newBlogPost.value.category,
    date: new Date().toISOString().slice(0, 10),
    views: 0,
  });
  closeAddBlogModal();
}

function openBlogPreviewModal(post: any) {
  previewBlogPost.value = post;
  showBlogPreviewModal.value = true;
}

function closeBlogPreviewModal() {
  showBlogPreviewModal.value = false;
  previewBlogPost.value = null;
}

function openEditBlogModal(post: any) {
  // Deep copy to avoid mutating the original until save
  editBlogPost.value = { ...post };
  showEditBlogModal.value = true;
}

function closeEditBlogModal() {
  showEditBlogModal.value = false;
  editBlogPost.value = null;
}

function updateBlogPost() {
  // Find and update the blog post in the blogPosts array
  const idx = blogPosts.value.findIndex(p => p.id === editBlogPost.value.id);
  if (idx !== -1) {
    blogPosts.value[idx] = { ...editBlogPost.value };
  }
  closeEditBlogModal();
}

function openDeleteBlogModal(post: any) {
  deleteBlogPost.value = post;
  showDeleteBlogModal.value = true;
}

function closeDeleteBlogModal() {
  showDeleteBlogModal.value = false;
  deleteBlogPost.value = null;
}

function confirmDeleteBlogPost() {
  blogPosts.value = blogPosts.value.filter(p => p.id !== deleteBlogPost.value.id);
  closeDeleteBlogModal();
}

function openBroadcastModal() {
  showBroadcastModal.value = true;
}

function closeBroadcastModal() {
  showBroadcastModal.value = false;
}

function sendBroadcast() {
  // TODO: implement broadcast logic
  closeBroadcastModal();
}
</script> 