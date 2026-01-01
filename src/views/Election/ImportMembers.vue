<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Import Members</h1>
        <p class="text-sm text-[#6b7280]">Upload member data from CSV or Excel files to add them to the system.</p>
      </div>
    </div>

    <div class="max-w-3xl space-y-8">
      <!-- Download Template Section -->
      <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-2">Download Template</h2>
        <p class="text-sm text-[#6b7280] mb-6">Use our template to ensure your data is formatted correctly.</p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
          @click="downloadTemplate"
        >
          <IconDownload class="h-5 w-5" />
          Download CSV Template
        </button>
      </section>

      <!-- Upload File Section -->
      <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-2">Upload File</h2>
        <p class="text-sm text-[#6b7280] mb-6">Select a CSV or Excel file containing member data.</p>
        <div class="relative">
          <input
            id="file-upload"
            ref="fileInput"
            type="file"
            accept=".csv,.xlsx,.xls"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            @change="handleFileSelect"
          />
          <label
            for="file-upload"
            class="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b] cursor-pointer"
          >
            <span>Choose File</span>
          </label>
        </div>
        <p v-if="selectedFile" class="mt-4 text-sm text-[#6b7280]">
          Selected: <span class="font-semibold text-[#111827]">{{ selectedFile.name }}</span>
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconDownload from '@/components/icon/icon-download.vue';

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

const downloadTemplate = () => {
  // Create a simple CSV template
  const csvContent = 'Name,Email,Student ID,Department\nJohn Doe,john.doe@example.com,ST001,Computer Science\nJane Smith,jane.smith@example.com,ST002,Mathematics';
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'member_template.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};
</script>

