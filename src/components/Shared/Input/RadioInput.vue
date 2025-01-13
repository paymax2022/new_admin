<template>
    <label class="inline-flex items-center">
        <input type="radio" :class="[
            'form-radio',
            square ? 'rounded-none' : '',
            outline ? `outline-${color}` : ''
        ]" :required="required" :disabled="disabled" :name="name" :value="value" v-model="internalValue" />
        <span class="ml-2">{{ label }}</span>
    </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, type PropType } from 'vue';

const props = defineProps({
    modelValue: [String, Number],
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    name: String,
    label: String,
    value: [String, Number],
    color: { type: String as PropType<'primary' | 'success' | 'secondary' | 'danger' | 'warning' | 'info' | 'dark'>, default: 'primary' },
    square: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
});

const emits = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue || '');

watch(internalValue, (newValue) => {
    emits('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue || '';
});
</script>
