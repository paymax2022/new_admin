<template>
  <div>
    <button
      @click="toggle"
      class="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
    >
      <component :is="iconComponent" class="w-5 h-5" />
      <span class="flex-1 text-left">{{ label }}</span>
      <ChevronDown v-if="children?.length" :class="{ 'rotate-180': isOpen }" class="w-4 h-4 transition-transform" />
    </button>

    <div v-if="isOpen && children?.length" class="ml-8 mt-1 space-y-1">
      <RouterLink
        v-for="(child, index) in children"
        :key="index"
        :to="child.link"
        class="block px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {{ child.label }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as Icons from 'lucide-vue-next'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  icon: String,
  label: String,
  link: String,
  children: Array
})

const isOpen = ref(false)

const toggle = () => {
  if (props.children?.length) isOpen.value = !isOpen.value
}

const iconComponent = computed(() => Icons[props.icon] || Icons.Circle)
</script>
