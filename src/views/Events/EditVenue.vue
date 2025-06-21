<template>
  <form @submit.prevent="handleSubmit" class=" p-6 bg-white rounded-lg shadow-md">
    <!-- Organizer Section -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Organizer Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="organizer" class="block text-sm font-medium text-gray-700 mb-1">Organizer Name</label>
          <input
            type="text"
            id="organizer"
            v-model="form.organizer"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div>
          <label for="organizerEmail" class="block text-sm font-medium text-gray-700 mb-1">Organizer Email</label>
          <input
            type="email"
            id="organizerEmail"
            v-model="form.organizerEmail"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
      </div>
    </div>

    <!-- Event Information -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Event Information</h2>
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="5"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>

    <!-- Venue Information -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Venue Information</h2>
      <div class="mb-4">
        <label for="venueType" class="block text-sm font-medium text-gray-700 mb-1">Venue Type</label>
        <select
          id="venueType"
          v-model="form.venueType"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Venue Type</option>
          <option value="conference-center">Conference Center</option>
          <option value="hotel">Hotel</option>
          <option value="stadium">Stadium</option>
          <option value="outdoor">Outdoor Venue</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="slug" class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            type="text"
            id="slug"
            v-model="form.slug"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            v-model="form.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Address Information -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Location Details</h2>
      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          type="text"
          id="address"
          v-model="form.address"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            id="city"
            v-model="form.city"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div>
          <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
          <input
            type="text"
            id="state"
            v-model="form.state"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div>
          <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
          <input
            type="text"
            id="zipCode"
            v-model="form.zipCode"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
      </div>

      <div class="mb-4">
        <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <input
          type="text"
          id="country"
          v-model="form.country"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="latitude" class="block text-sm font-medium text-gray-700 mb-1">Google Latitude</label>
          <input
            type="text"
            id="latitude"
            v-model="form.latitude"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div>
          <label for="longitude" class="block text-sm font-medium text-gray-700 mb-1">Google Longitude</label>
          <input
            type="text"
            id="longitude"
            v-model="form.longitude"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
      </div>
    </div>

    <!-- Image Upload -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Event Image</h2>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
        <div class="mt-1 flex items-center">
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="py-2 px-3 border border-gray-300 rounded-md text-sm"
          >
        </div>
        <p class="mt-1 text-sm text-gray-500">Upload a high-quality image for your event.</p>
        <div v-if="form.imagePreview" class="mt-4">
          <img :src="form.imagePreview" alt="Event preview" class="max-w-xs rounded-md">
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-4">
      <button
        type="button"
        @click="resetForm"
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Reset
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
 import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToView = () => {
        router.push({ name: 'editVenue' });
    };

const form = ref({
  organizer: 'Tony Ray',
  organizerEmail: 'tonyray@mail.com',
  title: 'Australia Grand Hawk View',
  description: '',
  venueType: '',
  slug: '',
  status: 'draft',
  address: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  latitude: '',
  longitude: '',
  imageFile: null,
  imagePreview: null
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.imageFile = file;
    form.value.imagePreview = URL.createObjectURL(file);
  }
};

const handleSubmit = () => {
  console.log('Form submitted:', form.value);
  // Here you would typically send the data to an API
  alert('Form submitted successfully!');
};

const resetForm = () => {
  form.value = {
    organizer: 'Tony Ray',
    organizerEmail: 'tonyray@mail.com',
    title: 'Australia Grand Hawk View',
    description: '',
    venueType: '',
    slug: '',
    status: 'draft',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    imageFile: null,
    imagePreview: null
  };
};
</script>

