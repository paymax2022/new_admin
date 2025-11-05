<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Certificate Management</h1>
        <p class="text-xs text-gray-600">Generate and manage contestant certificates</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Generate All Certificates Button -->
        <button @click="showBulkGenerationModal = true" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Generate All Certificates
        </button>
      </div>
    </div>

    <!-- Key Metrics Section -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <!-- Total Certificates -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-600 mb-1">Total Certificates</h4>
            <h3 class="text-4xl font-bold text-gray-900">127</h3>
          </div>
          <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>

      <!-- Generated -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-600 mb-1">Generated</h4>
            <h3 class="text-4xl font-bold text-gray-900">89</h3>
          </div>
          <svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
      </div>

      <!-- Downloaded -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-600 mb-1">Downloaded</h4>
            <h3 class="text-4xl font-bold text-gray-900">67</h3>
          </div>
          <svg class="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </div>
      </div>

      <!-- Pending -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-600 mb-1">Pending</h4>
            <h3 class="text-4xl font-bold text-gray-900">38</h3>
          </div>
          <svg class="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-6 border-b border-gray-200 mb-6">
      <button @click="activeTab = 'all'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'all' ? 'text-gray-900' : 'text-gray-500'">All Certificates</span>
        <div v-if="activeTab === 'all'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
      <button @click="activeTab = 'templates'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'templates' ? 'text-gray-900' : 'text-gray-500'">Certificate Templates</span>
        <div v-if="activeTab === 'templates'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
      <button @click="activeTab = 'settings'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'settings' ? 'text-gray-900' : 'text-gray-500'">Auto-Generation Settings</span>
        <div v-if="activeTab === 'settings'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
      </button>
    </div>

    <!-- All Certificates Tab -->
    <div v-if="activeTab === 'all'">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Contestant Certificates</h2>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"></th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Certificate Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Downloaded</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Row 1: Winner -->
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="font-bold text-gray-900">Sarah Johnson</div>
                  <div class="text-xs text-gray-500">CID-001</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">#1</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Winner</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Generated</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Yes</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-4">
                  <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </button>
                  <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Download
                  </button>
                </div>
              </td>
            </tr>

            <!-- Row 2: Runner-up -->
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="font-bold text-gray-900">Sarah Johnson</div>
                  <div class="text-xs text-gray-500">CID-001</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">#1</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Runner-up</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Generated</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">No</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-4">
                  <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </button>
                  <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Download
                  </button>
                </div>
              </td>
            </tr>

            <!-- Row 3: Third Place -->
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="font-bold text-gray-900">Sarah Johnson</div>
                  <div class="text-xs text-gray-500">CID-001</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">#1</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Third Place</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Generated</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Yes</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-4">
                  <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </button>
                  <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Download
                  </button>
                </div>
              </td>
            </tr>

            <!-- Row 4: Finalist -->
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="font-bold text-gray-900">Sarah Johnson</div>
                  <div class="text-xs text-gray-500">CID-001</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">#1</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Finalist</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white" style="background-color: #F6B05C;">Pending</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">No</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-4">
                  <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </button>
                  <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Download
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Certificate Templates Tab -->
    <div v-if="activeTab === 'templates'">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Certificate Templates</h2>
      <div class="space-y-4">
        <!-- Winner Certificate -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Winner Certificate</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Active</span>
              </div>
              <p class="text-sm text-gray-600">For 1st place winner</p>
            </div>
            <div class="flex items-center gap-3">
              <button @click="showPreviewModal = true" class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button @click="showEditModal = true" class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Finalist Certificate -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Finalist Certificate</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Active</span>
              </div>
              <p class="text-sm text-gray-600">For Top 10 finalists</p>
            </div>
            <div class="flex items-center gap-3">
              <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Participation Certificate -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Participation Certificate</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white" style="background-color: #F6B05C;">Inactive</span>
              </div>
              <p class="text-sm text-gray-600">For all contestants</p>
            </div>
            <div class="flex items-center gap-3">
              <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button class="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Upload New Template -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-base font-bold text-gray-900 mb-2">Upload New Template</h3>
          <p class="text-sm text-gray-600 mb-4">Upload a custom certificate template (PDF or image format)</p>
          <button class="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Template
          </button>
        </div>
      </div>
    </div>

    <!-- Auto-Generation Settings Tab -->
    <div v-if="activeTab === 'settings'">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Auto-Generation Settings</h2>
      <div class="grid grid-cols-2 gap-6">
        <!-- Auto-Generation Rules (Left Section) -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-base font-bold text-gray-900 mb-6">Auto-Generation Rules</h3>
          <div class="space-y-5">
            <!-- Auto-Generate Certificates -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Auto-Generate Certificates</label>
              <div class="relative">
                <select v-model="autoGenRules.autoGenerate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Winner Certificate Template -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Winner Certificate Template</label>
              <div class="relative">
                <select v-model="autoGenRules.winnerTemplate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                  <option value="">Select</option>
                  <option value="template1">Winner Certificate</option>
                  <option value="template2">Winner Certificate 2</option>
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Finalist Certificate Template -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Finalist Certificate Template</label>
              <div class="relative">
                <select v-model="autoGenRules.finalistTemplate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                  <option value="">Select</option>
                  <option value="template1">Finalist Certificate</option>
                  <option value="template2">Finalist Certificate 2</option>
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Top Position Range for Certificates -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Top Position Range for Certificates</label>
              <div class="relative">
                <input v-model.number="autoGenRules.topPositionRange" type="number" placeholder="Enter number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Certificate Content Settings (Right Section) -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-base font-bold text-gray-900 mb-6">Certificate Content Settings</h3>
          <div class="space-y-5">
            <!-- Contest Name -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Contest Name</label>
              <input v-model="contentSettings.contestName" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter contest name">
            </div>

            <!-- Organizing Body -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Organizing Body</label>
              <input v-model="contentSettings.organizingBody" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter organizing body">
            </div>

            <!-- Authorized Signature -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Authorized Signature</label>
              <input v-model="contentSettings.authorizedSignature" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter authorized signature">
            </div>

            <!-- Contest Director Name -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Contest Director Name</label>
              <input v-model="contentSettings.directorName" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter director name">
            </div>

            <!-- Official Seal/Logo -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Official Seal/Logo</label>
              <button class="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Upload Seal/Logo</span>
              </button>
            </div>

            <!-- Save Settings Button -->
            <div class="pt-2">
              <button @click="saveAutoGenSettings" class="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Certificate Generation Modal -->
    <div v-if="showBulkGenerationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeBulkGenerationModal">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Bulk Certificate Generation</h2>
          <button @click="closeBulkGenerationModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Certificate Types -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-3">Certificate Types</label>
            <div class="grid grid-cols-2 gap-3">
              <!-- All Type -->
              <button @click="bulkForm.certificateType = 'all'" class="p-4 rounded-lg transition-all flex items-center gap-3" style="background-color: #E8EDF7;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-900">
                  <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.0588 6.83333 22 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-sm font-medium text-gray-900">All Type</span>
              </button>

              <!-- inner -->
              <button @click="bulkForm.certificateType = 'inner'" class="p-4 rounded-lg transition-all flex items-center gap-3" style="background-color: #E8F7ED;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-900">
                  <path d="M11.6686 5.21209C11.8066 4.9293 12.1934 4.92931 12.3314 5.21209L13.1449 6.87962C13.1989 6.9903 13.3003 7.06733 13.4178 7.08687L15.1862 7.38106C15.4859 7.43092 15.6054 7.81457 15.391 8.03904L14.125 9.36497C14.0412 9.45281 14.0025 9.5772 14.021 9.69975L14.3 11.5502C14.3473 11.8636 14.0345 12.1008 13.7638 11.9568L12.1688 11.1081C12.0628 11.0516 11.9372 11.0516 11.8312 11.1081L10.2362 11.9568C9.96554 12.1008 9.65271 11.8636 9.69996 11.5502L9.979 9.69975C9.99748 9.5772 9.95882 9.45281 9.87495 9.36497L8.60896 8.03904C8.39464 7.81457 8.51408 7.43092 8.8138 7.38106L10.5822 7.08687C10.6997 7.06733 10.8011 6.9903 10.8551 6.87962L11.6686 5.21209Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 16.3424L14.6264 20.6513C14.9541 21.5195 15.118 21.9536 15.403 22C15.6887 21.9578 16.0387 21.4804 16.3808 20.6172C16.6258 19.9991 16.7482 19.6901 17.0005 19.5235C17.0779 19.4724 17.1625 19.432 17.252 19.4035C17.5436 19.3108 17.879 19.4015 18.5497 19.5828C19.2669 19.7767 19.7651 19.7226 19.9618 19.5828C20.0197 19.5417 19.9618 19.5797 19.9618 19.5797C20.0776 19.3743 19.9213 19.0539 19.6088 18.4131L17.4561 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11 16.3421L9.3736 20.6503C9.0459 21.5183 8.72171 21.9536 8.43671 22C8.15097 21.9578 7.97992 21.5263 7.63781 20.6632C7.39287 20.0453 7.25175 19.6893 6.99948 19.5226C6.92213 19.4715 6.83745 19.4312 6.74803 19.4027C6.45638 19.31 6.12101 19.4007 5.45027 19.582C4.73308 19.7758 4.2349 19.7186 4.03815 19.5788C3.92237 19.3735 4.07866 19.0531 4.39123 18.4124L6.54387 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-sm font-medium text-gray-900">inner</span>
              </button>

              <!-- Runner-up -->
              <button @click="bulkForm.certificateType = 'runner-up'" class="p-4 rounded-lg transition-all flex items-center gap-3" style="background-color: #F7E8E8;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-900">
                  <path d="M11.6686 5.21209C11.8066 4.9293 12.1934 4.92931 12.3314 5.21209L13.1449 6.87962C13.1989 6.9903 13.3003 7.06733 13.4178 7.08687L15.1862 7.38106C15.4859 7.43092 15.6054 7.81457 15.391 8.03904L14.125 9.36497C14.0412 9.45281 14.0025 9.5772 14.021 9.69975L14.3 11.5502C14.3473 11.8636 14.0345 12.1008 13.7638 11.9568L12.1688 11.1081C12.0628 11.0516 11.9372 11.0516 11.8312 11.1081L10.2362 11.9568C9.96554 12.1008 9.65271 11.8636 9.69996 11.5502L9.979 9.69975C9.99748 9.5772 9.95882 9.45281 9.87495 9.36497L8.60896 8.03904C8.39464 7.81457 8.51408 7.43092 8.8138 7.38106L10.5822 7.08687C10.6997 7.06733 10.8011 6.9903 10.8551 6.87962L11.6686 5.21209Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 16.3424L14.6264 20.6513C14.9541 21.5195 15.118 21.9536 15.403 22C15.6887 21.9578 16.0387 21.4804 16.3808 20.6172C16.6258 19.9991 16.7482 19.6901 17.0005 19.5235C17.0779 19.4724 17.1625 19.432 17.252 19.4035C17.5436 19.3108 17.879 19.4015 18.5497 19.5828C19.2669 19.7767 19.7651 19.7226 19.9618 19.5828C20.0197 19.5417 19.9618 19.5797 19.9618 19.5797C20.0776 19.3743 19.9213 19.0539 19.6088 18.4131L17.4561 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11 16.3421L9.3736 20.6503C9.0459 21.5183 8.72171 21.9536 8.43671 22C8.15097 21.9578 7.97992 21.5263 7.63781 20.6632C7.39287 20.0453 7.25175 19.6893 6.99948 19.5226C6.92213 19.4715 6.83745 19.4312 6.74803 19.4027C6.45638 19.31 6.12101 19.4007 5.45027 19.582C4.73308 19.7758 4.2349 19.7186 4.03815 19.5788C3.92237 19.3735 4.07866 19.0531 4.39123 18.4124L6.54387 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-sm font-medium text-gray-900">Runner-up</span>
              </button>

              <!-- Finalist -->
              <button @click="bulkForm.certificateType = 'finalist'" class="p-4 rounded-lg transition-all flex items-center gap-3" style="background-color: #EDE8F7;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-900">
                  <path d="M11.6686 5.21209C11.8066 4.9293 12.1934 4.92931 12.3314 5.21209L13.1449 6.87962C13.1989 6.9903 13.3003 7.06733 13.4178 7.08687L15.1862 7.38106C15.4859 7.43092 15.6054 7.81457 15.391 8.03904L14.125 9.36497C14.0412 9.45281 14.0025 9.5772 14.021 9.69975L14.3 11.5502C14.3473 11.8636 14.0345 12.1008 13.7638 11.9568L12.1688 11.1081C12.0628 11.0516 11.9372 11.0516 11.8312 11.1081L10.2362 11.9568C9.96554 12.1008 9.65271 11.8636 9.69996 11.5502L9.979 9.69975C9.99748 9.5772 9.95882 9.45281 9.87495 9.36497L8.60896 8.03904C8.39464 7.81457 8.51408 7.43092 8.8138 7.38106L10.5822 7.08687C10.6997 7.06733 10.8011 6.9903 10.8551 6.87962L11.6686 5.21209Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 16.3424L14.6264 20.6513C14.9541 21.5195 15.118 21.9536 15.403 22C15.6887 21.9578 16.0387 21.4804 16.3808 20.6172C16.6258 19.9991 16.7482 19.6901 17.0005 19.5235C17.0779 19.4724 17.1625 19.432 17.252 19.4035C17.5436 19.3108 17.879 19.4015 18.5497 19.5828C19.2669 19.7767 19.7651 19.7226 19.9618 19.5828C20.0197 19.5417 19.9618 19.5797 19.9618 19.5797C20.0776 19.3743 19.9213 19.0539 19.6088 18.4131L17.4561 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11 16.3421L9.3736 20.6503C9.0459 21.5183 8.72171 21.9536 8.43671 22C8.15097 21.9578 7.97992 21.5263 7.63781 20.6632C7.39287 20.0453 7.25175 19.6893 6.99948 19.5226C6.92213 19.4715 6.83745 19.4312 6.74803 19.4027C6.45638 19.31 6.12101 19.4007 5.45027 19.582C4.73308 19.7758 4.2349 19.7186 4.03815 19.5788C3.92237 19.3735 4.07866 19.0531 4.39123 18.4124L6.54387 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-sm font-medium text-gray-900">Finalist</span>
              </button>
            </div>
          </div>

          <!-- Position Range -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-3">Position Range</label>
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="block text-xs text-gray-600 mb-1">From</label>
                <input v-model.number="bulkForm.positionFrom" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="0">
              </div>
              <div class="pt-6">
                <span class="text-gray-500">to</span>
              </div>
              <div class="flex-1">
                <label class="block text-xs text-gray-600 mb-1">to</label>
                <input v-model.number="bulkForm.positionTo" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="0">
              </div>
            </div>
          </div>

          <!-- Generation Preview -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Generation Preview</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-600">Eligible Certificates:</span>
                <span class="font-medium text-gray-900 ml-2">{{ generationPreview.eligible }}</span>
              </div>
              <div>
                <span class="text-gray-600">Already Generated:</span>
                <span class="font-medium text-gray-900 ml-2">{{ generationPreview.alreadyGenerated }}</span>
              </div>
              <div>
                <span class="text-gray-600">To Be Generated:</span>
                <span class="font-medium text-gray-900 ml-2">{{ generationPreview.toBeGenerated }}</span>
              </div>
              <div>
                <span class="text-gray-600">Estimated Time:</span>
                <span class="font-medium text-gray-900 ml-2">{{ generationPreview.estimatedTime }}</span>
              </div>
            </div>
          </div>

          <!-- Generation Options -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-3">Generation Options</label>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="bulkForm.sendEmail" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Send email notification to contestants</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="bulkForm.skipGenerated" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Skip certificates that are already generated</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="bulkForm.autoDownloadLinks" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Generate download links automatically</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="closeBulkGenerationModal" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="generateCertificates" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-orange-500">
            Generate {{ generationPreview.toBeGenerated }} Certificate{{ generationPreview.toBeGenerated !== 1 ? 's' : '' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Winner Certificate Preview Modal -->
    <div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="showPreviewModal = false">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="relative p-6 border-b border-gray-200">
          <button @click="showPreviewModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Circular orange icon at top center -->
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full flex items-center justify-center" style="background-color: #F6B05C;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <!-- Title and description -->
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Winner Certificate</h2>
            <p class="text-sm text-gray-600 mb-1">This template is designed for</p>
            <p class="text-base font-bold" style="color: #F6B05C;">For 1st place winner</p>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-4">Template Preview Content</h3>
            
            <!-- Certificate Details -->
            <div class="space-y-3 mb-6">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Certificate type:</span>
                <span class="text-sm font-medium text-gray-900">Winner Certificate</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Status:</span>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Active</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Usage:</span>
                <span class="text-sm font-medium text-gray-900">For 1st place winner</span>
              </div>
            </div>

            <!-- Additional Template Information -->
            <div class="grid grid-cols-3 gap-4 items-center">
              <div>
                <span class="text-sm text-gray-600 block mb-1">Template Design</span>
                <span class="text-sm font-medium text-gray-900">The Spotlight Entertainment</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2" style="background-color: #F6B05C;">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span class="text-xs text-gray-600">Template ID: 1</span>
              </div>
              <div>
                <span class="text-sm text-gray-600 block mb-1">Status</span>
                <span class="text-sm font-medium text-gray-900">Active</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="showPreviewModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button class="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-orange-500">
            Use This Template
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Template Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="showEditModal = false">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Edit Template - Winner Certificate</h2>
          <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Template Name -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Template Name</label>
            <input v-model="editForm.templateName" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter template name">
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Description</label>
            <input v-model="editForm.description" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter description">
          </div>

          <!-- Active Template -->
          <div>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="editForm.isActive" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
              <span class="text-sm font-medium text-gray-900">Active Template</span>
            </label>
          </div>

          <!-- Template Design -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Template Design</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
              <div class="flex flex-col items-center gap-3">
                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div>
                  <p class="text-sm text-gray-900 font-medium">Upload a new template design (PDF, PNG, JPG)</p>
                  <p class="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Font Size -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Font Size</label>
            <div class="relative">
              <select v-model="editForm.fontSize" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Color Schema -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Color Schema</label>
            <div class="relative">
              <select v-model="editForm.colorSchema" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select Color Scheme</option>
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
                <option value="orange">Orange</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Layout -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Layout</label>
            <div class="relative">
              <select v-model="editForm.layout" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select layout</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="showEditModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="saveTemplate" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-500">
            Save Template
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeTab = ref('all');

const showBulkGenerationModal = ref(false);
const showPreviewModal = ref(false);
const showEditModal = ref(false);

const editForm = ref({
  templateName: 'Registration Confirmation',
  description: 'For 1st place winner',
  isActive: true,
  fontSize: '',
  colorSchema: '',
  layout: '',
});

const autoGenRules = ref({
  autoGenerate: '',
  winnerTemplate: '',
  finalistTemplate: '',
  topPositionRange: null,
});

const contentSettings = ref({
  contestName: 'The Spotlight Season 1',
  organizingBody: 'The Spotlight Entertainment',
  authorizedSignature: '',
  directorName: '',
});

const bulkForm = ref({
  certificateType: 'all',
  positionFrom: 0,
  positionTo: 0,
  sendEmail: true,
  skipGenerated: true,
  autoDownloadLinks: true,
});

const generationPreview = computed(() => {
  return {
    eligible: 4,
    alreadyGenerated: 3,
    toBeGenerated: 1,
    estimatedTime: '1 min',
  };
});

const closeBulkGenerationModal = () => {
  showBulkGenerationModal.value = false;
};

const generateCertificates = () => {
  // Handle generate certificates logic here
  console.log('Generating certificates:', bulkForm.value);
  closeBulkGenerationModal();
};

const saveTemplate = () => {
  // Handle save template logic here
  console.log('Saving template:', editForm.value);
  showEditModal.value = false;
};

const saveAutoGenSettings = () => {
  // Handle save auto-generation settings logic here
  console.log('Saving auto-generation settings:', {
    rules: autoGenRules.value,
    content: contentSettings.value,
  });
};
</script>

