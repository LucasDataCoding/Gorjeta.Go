<template>
  <div
    :class="{
      'flex items-center justify-between lg:justify-start space-x-3 lg:space-x-10': isHorizontal,
    }"
  >
    <label
      :for="inputName"
      class="block uppercase"
      :class="isLableSecondary ? 'text-xs' : 'font-bold text-sm'"
      >{{ label }}</label
    >

    <div
      class="text-lg mt-2 bg-white rounded-xl flex items-center pl-3 h-[50px] overflow-hidden outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-purple transition"
    >
      <div class="shrink-0 select-none me-3">
        <slot name="prefix" />
      </div>

      <input
        type="text"
        v-model="modelValueTemp"
        :name="inputName"
        :id="inputName"
        class="font-semibold min-w-0 w-[50px] lg:w-auto grow bg-transparent pr-3 py-3 text-base placeholder:text-gray-500 focus:outline-none"
        placeholder="0"
      />

      <div
        class="h-full text-white flex items-center justify-center uppercase bg-purple hover:bg-purple-700 transition font-medium"
      >
        <slot name="sufix" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  inputName: { type: String, required: true },
  modelValue: {
    type: Number,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
  },
  isHorizontal: Boolean,
  isLableSecondary: Boolean,
})

const emits = defineEmits(['update:modelValue'])

function formatInputValue(inputValue: number) {
  if (props.max && inputValue > props.max) {
    return props.max
  } else if (inputValue < props.min) {
    return props.min
  }

  return inputValue
}

const modelValueTemp = computed({
  get: () => props.modelValue,
  set: (inputValue: number) => {
    const inputFormatted = formatInputValue(inputValue)

    emits('update:modelValue', inputFormatted)
  },
})

watch(
  () => props.modelValue,
  (val) => {
    modelValueTemp.value = val || 0
  },
  { immediate: true },
)
</script>
