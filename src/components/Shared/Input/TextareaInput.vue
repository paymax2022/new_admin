<template>
    <div>
        <label v-if="label" :for="id" class="block mb-1 text-gray-700">{{ label }}</label>
        <div :class="['flex', { 'space-x-0': prepend || append }]">
            <div v-if="prepend"
                class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] whitespace-nowrap">
                <slot name="prepend">{{ prepend }}</slot>
            </div>
            <textarea :id="id" :rows="rows" :placeholder="placeholder" :class="[
                'form-textarea',
                inputClass,
                { 'ltr:rounded-l-none rtl:rounded-r-none': prepend, 'ltr:rounded-r-none rtl:rounded-l-none': append }
            ]" :required="required" :disabled="disabled" v-model="internalValue">
            </textarea>
            <div v-if="append"
                class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] whitespace-nowrap">
                <slot name="append">{{ append }}</slot>
            </div>
        </div>
        <span v-if="helperText" class="text-gray-500 text-xs">{{ helperText }}</span>
        <span v-if="errorMessage" class="text-red-500 text-xs">{{ errorMessage }}</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, type PropType } from 'vue';

const props = defineProps({
    modelValue: String,
    label: String,
    id: String,
    rows: { type: [Number, String], default: 3 },
    placeholder: String,
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    prepend: String,
    append: String,
    inputClass: String,
    helperText: String,
    errorMessage: String,
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
