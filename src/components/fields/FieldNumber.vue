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
      class="text-lg bg-white rounded-xl flex items-center pl-3 h-[50px] overflow-hidden outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-purple transition"
      :class="{ 'mt-2': !isHorizontal }"
    >
      <button
        v-if="isQuantity"
        @click="modelValueTemp--"
        class="px-3 lg:px-5 h-full text-lg font-bold text-purple cursor-pointer"
      >
        -
      </button>
      <div v-else class="shrink-0 select-none me-3">
        <slot name="prefix" />
      </div>

      <input
        type="text"
        v-model.lazy="modelValueTemp"
        :name="inputName"
        :id="inputName"
        class="font-semibold min-w-0 w-[50px] bg-transparent pr-3 py-3 text-base placeholder:text-gray-500 focus:outline-none"
        placeholder="0"
        :class="{ 'lg:w-auto grow': !isQuantity, 'text-center': isQuantity }"
      />

      <button
        v-if="isQuantity"
        @click="modelValueTemp++"
        class="px-3 lg:px-5 h-full text-lg font-bold text-purple cursor-pointer"
      >
        +
      </button>

      <div
        v-else
        class="h-full text-white flex items-center justify-center uppercase bg-purple hover:bg-purple-700 transition font-medium"
      >
        <slot name="sufix" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

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
  isQuantity: Boolean,
  isInt: Boolean,
  isLableSecondary: Boolean,
})

const emits = defineEmits(['update:modelValue'])

function formatInputValue(inputValue: number | string) {
  if (typeof inputValue !== 'string') inputValue = String(inputValue)

  // Remove tudo que não for número, vírgula ou ponto
  let cleaned = inputValue.replace(/[^0-9.,]/g, '')

  // Mantém apenas o primeiro separador decimal
  const parts = cleaned.split(/[,\.]/)
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('')
  } else {
    cleaned = cleaned.replace(',', '.')
  }

  let valueReturned = Number(cleaned)
  if (isNaN(valueReturned)) valueReturned = 0

  // Aplica limites
  if (props.max && valueReturned > props.max) {
    valueReturned = props.max
  } else if (valueReturned < props.min) {
    valueReturned = props.min
  }

  return props.isInt ? Math.floor(valueReturned) : valueReturned
}

const modelValueTemp = ref(String(props.modelValue ?? ''))

watch(
  () => props.modelValue,
  (val) => {
    modelValueTemp.value = String(formatInputValue(val ?? ''))
  },
  { immediate: true }
)

watch(modelValueTemp, (inputValue) => {
  const inputFormatted = formatInputValue(inputValue)
  emits('update:modelValue', inputFormatted)

  const formattedString = String(inputFormatted)
  if (formattedString !== inputValue) {
    modelValueTemp.value = formattedString
  }
})
</script>
