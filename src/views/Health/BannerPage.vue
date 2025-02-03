<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Banner List</h2>
        <button @click="showAddModal = true" class="px-4 py-2 bg-purple-600 text-white rounded-lg">Add Banner</button>
      </div>

      <div class="flex justify-between mb-4">
        <div>
          <label>Show
            <select v-model="entriesPerPage" class="border p-1 rounded">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            entries
          </label>
        </div>
        <div>
          <label>Search: <input type="text" v-model="searchQuery" class="border p-1 rounded"></label>
        </div>
      </div>

      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Id</th>
            <th class="p-2 border">Image</th>
            <th class="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="banner in paginatedBanners" :key="banner.id" class="border">
            <td class="p-2 border">{{ banner.id }}</td>
            <td class="p-2 border"><img :src="banner.image" class="w-34 h-24"></td>
            <td class="p-2 border">
              <button @click="editBanner(banner)" class="text-blue-500 mr-2">
                <EditIcon class="w-5 h-5" />
              </button>
              <button @click="deleteBanner(banner.id)" class="text-gray-500">
                <DeleteIcon class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between items-center mt-4">
        <span>Showing {{ startEntry }} to {{ endEntry }} of {{ filteredBanners.length }} entries</span>
        <div>
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded mr-2">Previous</button>
          <span class="px-3 py-1 bg-purple-600 text-white rounded">{{ currentPage }}</span>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="px-3 py-1 border rounded ml-2">Next</button>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded shadow-lg w-96">
          <h3 class="text-lg font-semibold mb-4">{{ editingBanner ? 'Edit' : 'Add' }} Banner</h3>

          <!-- Image Preview -->
          <div v-if="newBanner.image" class="mb-4">
            <img :src="newBanner.image" class="w-40 h-40 object-cover mx-auto rounded">
          </div>

          <label class="block mb-2">Upload Image:</label>
          <input type="file" @change="handleFileUpload" class="w-full border p-2 rounded mb-4">

          <div class="flex justify-end">
            <button @click="saveBanner" class="px-4 py-2 bg-green-600 text-white rounded-lg mr-2">Save</button>
            <button @click="resetModal" class="px-4 py-2 bg-gray-400 text-white rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed } from 'vue';
  import Swal from 'sweetalert2';
  import DeleteIcon from "@/components/icon/icon-delete.vue";
  import EditIcon from "@/components/icon/icon-newEdit.vue";

  const banners = ref([]);
  const searchQuery = ref('');
  const entriesPerPage = ref(10);
  const currentPage = ref(1);
  const showAddModal = ref(false);
  const newBanner = ref({ image: '' });
  const editingBanner = ref(null);

  const filteredBanners = computed(() =>
    banners.value.filter(banner => banner.image.includes(searchQuery.value))
  );

  const totalPages = computed(() =>
    Math.ceil(filteredBanners.value.length / entriesPerPage.value)
  );

  const paginatedBanners = computed(() => {
    const start = (currentPage.value - 1) * entriesPerPage.value;
    return filteredBanners.value.slice(start, start + entriesPerPage.value);
  });

  const startEntry = computed(() =>
    (currentPage.value - 1) * entriesPerPage.value + 1
  );

  const endEntry = computed(() =>
    Math.min(currentPage.value * entriesPerPage.value, filteredBanners.value.length)
  );

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newBanner.value.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const editBanner = (banner) => {
    editingBanner.value = banner;
    newBanner.value = { ...banner };
    showAddModal.value = true;
  };

  const saveBanner = () => {
    if (!newBanner.value.image) {
      Swal.fire('Error!', 'Please select an image.', 'error');
      return;
    }

    if (editingBanner.value) {
      Object.assign(editingBanner.value, newBanner.value);
      Swal.fire('Updated!', 'Banner has been updated.', 'success');
    } else {
      banners.value.push({ id: banners.value.length + 1, image: newBanner.value.image });
      Swal.fire('Added!', 'New banner has been added.', 'success');
    }
    resetModal();
  };

  const deleteBanner = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        banners.value = banners.value.filter(banner => banner.id !== id);
        Swal.fire('Deleted!', 'Banner has been deleted.', 'success');
      }
    });
  };

  const resetModal = () => {
    showAddModal.value = false;
    newBanner.value = { image: '' };
    editingBanner.value = null;
  };
  </script>
