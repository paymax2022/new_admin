<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-2xl font-semibold">Meeting Management</h1>
      <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="showUploadModal = true">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        Upload document
      </button>
    </div>
    <div class="font-semibold mb-2 mt-6">Action Point Dashboard</div>
    <div class="flex flex-wrap gap-2 items-center mb-4">
      <div class="flex-1 min-w-[200px]">
        <input class="w-full border rounded px-3 py-2 text-sm" placeholder="Search documents..." />
      </div>
      <select class="border rounded px-3 py-2 text-sm">
        <option>All meetings</option>
        <option>Board Meeting - Q1 Review</option>
        <option>Board Meeting - Feb Review</option>
      </select>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="text-left text-xs text-gray-500 border-b">
            <th class="py-2 pr-4">Document</th>
            <th class="py-2 pr-4">Meeting</th>
            <th class="py-2 pr-4">Type</th>
            <th class="py-2 pr-4">Size</th>
            <th class="py-2 pr-4">Uploaded</th>
            <th class="py-2 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in documents" :key="doc.name" class="border-b hover:bg-gray-50">
            <td class="py-2 pr-4 flex items-center gap-2">
              <svg v-if="doc.type==='Financial'" class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
              <svg v-else class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
              <a :href="'#'" class="text-blue-600 underline">{{ doc.name }}</a>
            </td>
            <td class="py-2 pr-4">{{ doc.meeting }}</td>
            <td class="py-2 pr-4">{{ doc.type }}</td>
            <td class="py-2 pr-4">{{ doc.size }}</td>
            <td class="py-2 pr-4">{{ doc.uploaded }}</td>
            <td class="py-2 pr-4 flex gap-2">
              <button class="text-gray-400 hover:text-black" title="Download" @click="openDocumentDetailsModal(doc)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v12m0 0l-4-4m4 4l4-4"/><path d="M20 20H4"/></svg></button>
              <button class="text-gray-400 hover:text-black" title="View" @click="openDocumentDetailsModal(doc)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Upload Document Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeUploadModal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <h2 class="text-lg font-semibold mb-4">Upload Document</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Document Preview</label>
          <div class="border border-dashed rounded px-4 py-6 text-center text-xs text-gray-500 bg-gray-50 flex flex-col items-center">
            <svg class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4"/><path d="M20 20H4"/></svg>
            <div>Drag and drop your document here, or <span class="text-blue-600 underline cursor-pointer">browse files</span></div>
            <div class="mt-1">Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (max 25MB)</div>
          </div>
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Document Title<span class="text-red-500">*</span></label>
            <input v-model="uploadForm.title" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter document title" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Document Type</label>
            <select v-model="uploadForm.type" class="w-full border rounded px-3 py-2 text-sm">
              <option disabled value="">Select type</option>
              <option>Financial</option>
              <option>Minutes</option>
              <option>Presentation</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Associated Meeting</label>
          <select v-model="uploadForm.meeting" class="w-full border rounded px-3 py-2 text-sm">
            <option disabled value="">Select meeting (optional)</option>
            <option>Board Meeting - Q1 Review</option>
            <option>Board Meeting - Feb Review</option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="uploadForm.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Add description of the document (optional)"></textarea>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2" @click="closeUploadModal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4"/><path d="M20 20H4"/></svg>
            Upload document
          </button>
          <button class="border px-4 py-2 rounded w-full" @click="closeUploadModal">Cancel</button>
        </div>
      </div>
    </div>
    <!-- Document Details Modal -->
    <div v-if="showDocumentDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeDocumentDetailsModal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <h2 class="text-lg font-semibold mb-4">Document Details</h2>
        <div class="mb-2">
          <div class="font-semibold text-base">{{ selectedDocument.name }}</div>
          <div class="text-xs text-gray-500 mb-1">Financial report containing quarterly performance metrics and budget analysis.</div>
          <div class="flex gap-2 mb-2">
            <span class="bg-gray-100 text-xs px-2 py-0.5 rounded">Financial</span>
            <span class="bg-gray-100 text-xs px-2 py-0.5 rounded">Quarterly</span>
            <span class="bg-gray-100 text-xs px-2 py-0.5 rounded">Report</span>
          </div>
        </div>
        <div class="mb-2">
          <div class="font-semibold text-sm mb-1">Document Information</div>
          <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
            <div>File Size: <span class="font-medium text-black">2.4 MB</span></div>
            <div>Format: <span class="font-medium text-black">PDF</span></div>
            <div>Pages: <span class="font-medium text-black">15</span></div>
            <div>Version: <span class="font-medium text-black">1.2</span></div>
          </div>
        </div>
        <div class="mb-2">
          <div class="font-semibold text-sm mb-1">Upload Details</div>
          <div class="text-xs text-gray-600">Uploaded by Sarah Wilson</div>
          <div class="text-xs text-gray-600">Upload date: Mar 10, 2024 at 2:30 PM</div>
          <div class="text-xs text-gray-600">Associated meeting: Board Meeting - Q1 Review</div>
        </div>
        <div class="mb-2 grid grid-cols-2 gap-4">
          <div>
            <div class="font-semibold text-sm mb-1">Access & Permissions</div>
            <div class="text-xs text-gray-600">Visibility: <span class="font-medium text-black">Board Members Only</span></div>
            <div class="text-xs text-gray-600">Downloads: <span class="font-medium text-black">12 times</span></div>
            <div class="text-xs text-gray-600">Last accessed: <span class="font-medium text-black">Mar 14, 2024</span></div>
          </div>
          <div>
            <div class="font-semibold text-sm mb-1">Document History</div>
            <div class="text-xs text-gray-600">Version 1.2<br>Uploaded by Sarah Wilson on Mar 10, 2024</div>
            <div class="text-xs text-gray-600 mt-1">Version 1.1<br>Uploaded by John Doe on Mar 7, 2024</div>
            <div class="text-xs text-gray-600 mt-1">Version 1.0<br>Created by Sarah Wilson on Mar 1, 2024</div>
          </div>
        </div>
        <div class="mb-6">
          <div class="font-semibold text-sm mb-1">Document Preview</div>
          <div class="border border-dashed rounded px-4 py-6 text-center text-xs text-gray-500 bg-gray-50 flex flex-col items-center">
            <svg class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
            <div>PDF Preview not available</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2" @click="closeDocumentDetailsModal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4"/><path d="M20 20H4"/></svg>
            Download document
          </button>
          <button class="border px-4 py-2 rounded w-full" @click="closeDocumentDetailsModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const documents = [
  {
    name: 'Q1_Financial_Report.pdf',
    meeting: 'Board Meeting - Q1 Review',
    type: 'Financial',
    size: '2.4 MB',
    uploaded: 'Mar 10, 2024',
  },
  {
    name: 'Meeting_Minute_Feb.docx',
    meeting: 'Board Meeting - Feb Review',
    type: 'Minutes',
    size: '1.2 MB',
    uploaded: 'Feb 15, 2024',
  },
];

type Document = {
  name: string;
  meeting: string;
  type: string;
  size: string;
  uploaded: string;
};

const showUploadModal = ref(false);
const uploadForm = ref({
  title: '',
  type: '',
  meeting: '',
  description: '',
});
const showDocumentDetailsModal = ref(false);
const emptyDocument: Document = {
  name: '',
  meeting: '',
  type: '',
  size: '',
  uploaded: '',
};
const selectedDocument = ref<Document>(emptyDocument);

function closeUploadModal() {
  showUploadModal.value = false;
  uploadForm.value = { title: '', type: '', meeting: '', description: '' };
}

function openDocumentDetailsModal(doc: Document) {
  selectedDocument.value = doc;
  showDocumentDetailsModal.value = true;
}

function closeDocumentDetailsModal() {
  showDocumentDetailsModal.value = false;
  selectedDocument.value = emptyDocument;
}
</script> 