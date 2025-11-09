<template>
  <div :class="{ 'flex justify-between items-center space-x-10': isHorizontal }">
    <label
      :for="inputName"
      class="block uppercase"
      :class="isLableSecondary ? 'text-xs' : 'font-bold text-sm'"
      >{{ label }}</label
    >

    <div class="min-h-[50px] rounded-lg overflow-hidden bg-white flex items-center h-full">
      <button
        @click="modelValueTemp--"
        class="px-5 h-full text-lg font-bold text-purple cursor-pointer"
      >
        -
      </button>
      <div
        class="text-lg flex items-center overflow-hidden outline-1 outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-purple transition"
      >
        <input
          v-model="modelValueTemp"
          :name="inputName"
          :id="inputName"
          pattern="[0-9]*$"
          type="text"
          :placeholder="'' + min"
          class="font-semibold bg-transparent text-base text-center placeholder:text-gray-500 focus:outline-none w-[50px]"
        />
      </div>
      <button
        @click="modelValueTemp++"
        class="px-5 h-full text-lg font-bold text-purple cursor-pointer"
      >
        +
      </button>
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
  get: () => formatInputValue(props.modelValue || props.min),
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
  { immediate: true }
)
</script>
