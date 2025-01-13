<template>
    <label class="inline-flex items-center">
        <input type="checkbox" :class="[
            'form-checkbox',
            round ? 'rounded-full' : '',
            outline ? `outline-${color}` : ''
        ]" :required="required" :disabled="disabled" v-model="internalValue" />
        <span class="ml-2">{{ label }}</span>
    </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, type PropType } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    label: String,
    color: { type: String as PropType<'primary' | 'success' | 'secondary' | 'danger' | 'warning' | 'info' | 'dark'>, default: 'primary' },
    round: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
});

const emits = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue || false);

watch(internalValue, (newValue) => {
    emits('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue || false;
});
</script>
