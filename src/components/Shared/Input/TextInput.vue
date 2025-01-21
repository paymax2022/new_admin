<template>
    <div class="">
        <label v-if="label" :for="id" class="block mb-1 text-gray-700">{{ label }}</label>
        <div :class="['flex items-center', { 'space-x-2': prepend || append }]">
            <div v-if="prepend" class="input-prepend" :class="prependClass">
                <slot name="prepend"></slot>
            </div>
            <input :id="id" :type="type" :placeholder="placeholder" :class="[
                'form-input',
                'border',
                'rounded',
                'p-2',
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-blue-500',
                'focus:border-transparent',
                inputClass,
                { 'rounded-l-none': prepend, 'rounded-r-none': append },
                { 'file:py-2 file:px-4 file:border-0 file:font-semibold !p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary': type === 'file' },
            ]" :required="required" :readonly="readonly" :disabled="disabled" v-model="internalValue" v-maska="mask" />
            <div v-if="append" class="input-append" :class="appendClass">
                <slot name="append"></slot>
            </div>
        </div>
        <span v-if="helperText" class="text-gray-500 text-xs">{{ helperText }}</span>
        <span v-if="errorMessage" class="text-red-500 text-xs">{{ errorMessage }}</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, type PropType } from 'vue';

const props = defineProps({
    id: String,
    type: { type: String as PropType<string>, default: 'text' },
    placeholder: String,
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    inputClass: String,
    prepend: { type: Boolean, default: false },
    prependClass: String,
    append: { type: Boolean, default: false },
    appendClass: String,
    helperText: String,
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    mask: String,
    errorMessage: String,
    label: String,
});

const emits = defineEmits(['update:modelValue']);

const internalValue = ref<string | number>(props.modelValue);

watch(internalValue, (newValue) => {
    emits('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
});
</script>

<style scoped>
.input-prepend {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    padding: 0 12px;
    font-weight: bold;
    border: 1px solid #e0e6ed;
    border-right: 0;
    border-radius: 4px 0 0 4px;
}

.input-append {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    padding: 0 12px;
    font-weight: bold;
    border: 1px solid #e0e6ed;
    border-left: 0;
    border-radius: 0 4px 4px 0;
}
</style>
