<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h1 class="text-2xl font-bold mb-6">Chicken Pasta</h1>

    <!-- Product Variations Section -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-4">Product Variation</h2>
      <div class="space-y-4">
        <div v-for="(variation, index) in variations" :key="`variation-${index}`" class="border border-gray-200 rounded-lg p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NAME</label>
              <input
                v-model="variation.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Variation name"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">PRICE</label>
              <input
                v-model="variation.price"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">DISCOUNT</label>
              <input
                v-model="variation.discountPrice"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              >
            </div>
          </div>
          <div class="mt-3 flex justify-end">
            <button
              @click="removeVariation(index)"
              class="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <button
        @click="addVariation"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
      >
        Add New Variation
      </button>
    </div>

    <!-- Product Options Section -->
    <div>
      <h2 class="text-lg font-semibold mb-4">Product Option</h2>
      <div class="space-y-4">
        <div v-for="(option, index) in options" :key="`option-${index}`" class="border border-gray-200 rounded-lg p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NAME</label>
              <input
                v-model="option.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Option name"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">PRICE</label>
              <input
                v-model="option.price"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">DISCOUNT</label>
              <input
                v-model="option.discountPrice"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              >
            </div>
          </div>
          <div class="mt-3 flex justify-end">
            <button
              @click="removeOption(index)"
              class="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <button
        @click="addOption"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
      >
        Add New Option
      </button>
    </div>

    <!-- Actions Section -->
    <div class="mt-8 flex justify-end space-x-4">
      <button
        @click="resetForm"
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Reset
      </button>
      <button

        class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
      >
        Save Product
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ProductVariation {
  name: string;
  price: number;
  discountPrice: number;
}

interface ProductOption {
  name: string;
  price: number;
  discountPrice: number;
}

const variations = ref<ProductVariation[]>([
  { name: '', price: 0, discountPrice: 0 }
]);

const options = ref<ProductOption[]>([
  { name: '', price: 0, discountPrice: 0 }
]);

const addVariation = () => {
  variations.value.push({ name: '', price: 0, discountPrice: 0 });
};

const removeVariation = (index: number) => {
  if (variations.value.length > 1) {
    variations.value.splice(index, 1);
  }
};

const addOption = () => {
  options.value.push({ name: '', price: 0, discountPrice: 0 });
};

const removeOption = (index: number) => {
  if (options.value.length > 1) {
    options.value.splice(index, 1);
  }
};

const resetForm = () => {
  variations.value = [{ name: '', price: 0, discountPrice: 0 }];
  options.value = [{ name: '', price: 0, discountPrice: 0 }];
};

</script>

