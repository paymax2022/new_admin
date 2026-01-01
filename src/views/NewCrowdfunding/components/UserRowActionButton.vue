<template>
  <button
    class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-90"
    :style="{
      color: textColor,
      backgroundColor: bgColor,
      borderColor: borderColor,
    }"
  >
    <component :is="iconComponent" class="h-4 w-4" />
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import IconBan from '@/components/icon/icon-ban.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconEye from '@/components/icon/icon-eye.vue';

const iconMap = {
  eye: IconEye,
  ban: IconBan,
  'circle-check': IconCircleCheck,
};

export type ActionButtonConfig = {
  label: string;
  type: string;
  icon: keyof typeof iconMap;
  textColor: string;
  bgColor: string;
  borderColor: string;
};

const props = defineProps<ActionButtonConfig>();

const iconComponent = computed(() => iconMap[props.icon] || IconEye);
</script>


