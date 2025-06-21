<template>
  <div class="space-y-6">
    <!-- Thumbnail Upload -->
    <div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">Thumbnail Image</h3>
      <p class="text-sm text-gray-500 mb-3">Pinch/Scroll to zoom Drag Left/Right to adjust</p>

      <!-- Thumbnail Dropzone -->
      <div
        @dragover.prevent="dragOver = true"
        @dragleave="dragOver = false"
        @drop.prevent="handleThumbnailDrop"
        :class="{'border-blue-500 bg-blue-50': dragOver, 'border-gray-300': !dragOver}"
        class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-2 transition-colors duration-200"
      >
        <div v-if="!thumbnailPreview">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-2 text-sm text-gray-600">Drag-n-Drop Or Browse Thumbnail</p>
          <p class="text-xs text-gray-500 mt-1">Upload 16:9 ratio thumbnail image of atleast 1280x720 px (jpg/jpeg/png)</p>
          <input
            type="file"
            ref="thumbnailInputRef"
            @change="handleThumbnailChange"
            accept="image/jpeg,image/png"
            class="hidden"
          />
          <button
            @click="thumbnailInputRef?.click()"
            class="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Select Thumbnail
          </button>
        </div>
        <div v-else class="relative">
          <img :src="thumbnailPreview" alt="Thumbnail preview" class="mx-auto max-h-64 rounded-lg">
          <button
            @click.stop="removeThumbnail"
            class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Image Gallery -->
    <div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">Images Gallery</h3>

      <!-- Gallery Dropzone -->
      <div
        @dragover.prevent="galleryDragOver = true"
        @dragleave="galleryDragOver = false"
        @drop.prevent="handleGalleryDrop"
        :class="{'border-blue-500 bg-blue-50': galleryDragOver, 'border-gray-300': !galleryDragOver}"
        class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-3 transition-colors duration-200"
      >
        <input
          type="file"
          ref="galleryInputRef"
          @change="handleGalleryChange"
          accept="image/jpeg,image/png"
          multiple
          class="hidden"
        />
        <button
          @click="galleryInputRef?.click()"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Choose files
        </button>
        <p class="text-sm text-gray-500 mt-1">No file chosen</p>
        <p class="text-xs text-gray-500 mt-1">Upload images related to your Event</p>
      </div>

      <!-- Gallery Preview -->
      <div v-if="galleryFiles.length > 0" class="grid grid-cols-3 gap-3 mt-4">
        <div v-for="(file, index) in galleryFiles" :key="index" class="relative group">
          <img :src="file.preview" class="h-32 w-full object-cover rounded-lg">
          <button
            @click="removeGalleryImage(index)"
            class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- YouTube Video URL -->
    <div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">YouTube Video URL (Optional)</h3>
      <div class="flex items-center space-x-2">
        <span class="text-gray-500">e.g.</span>
        <span class="text-sm text-gray-500">https://www.youtube.com/watch?v=id</span>
      </div>
      <input
        v-model="youtubeUrl"
        type="text"
        placeholder="Enter Video ID Only"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
      />
    </div>

    <!-- Save Button -->
    <div class="pt-4">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dragOver = ref(false);
const galleryDragOver = ref(false);
const thumbnailPreview = ref<string | null>(null);
const thumbnailFile = ref<File | null>(null);
const galleryFiles = ref<Array<{file: File, preview: string}>>([]);
const youtubeUrl = ref('');

// Add typed refs for file inputs
const thumbnailInputRef = ref<HTMLInputElement | null>(null);
const galleryInputRef = ref<HTMLInputElement | null>(null);

const handleThumbnailDrop = (e: DragEvent) => {
  dragOver.value = false;
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    processThumbnailFile(files[0]);
  }
};

const handleThumbnailChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    processThumbnailFile(input.files[0]);
  }
};

const processThumbnailFile = (file: File) => {
  if (!file.type.match('image.*')) return;

  thumbnailFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    thumbnailPreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const removeThumbnail = () => {
  thumbnailPreview.value = null;
  thumbnailFile.value = null;
};

const handleGalleryDrop = (e: DragEvent) => {
  galleryDragOver.value = false;
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    processGalleryFiles(Array.from(files));
  }
};

const handleGalleryChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    processGalleryFiles(Array.from(input.files));
  }
};

const processGalleryFiles = (files: File[]) => {
  files.forEach(file => {
    if (!file.type.match('image.*')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      galleryFiles.value.push({
        file,
        preview: e.target?.result as string
      });
    };
    reader.readAsDataURL(file);
  });
};

const removeGalleryImage = (index: number) => {
  galleryFiles.value.splice(index, 1);
};
</script>
