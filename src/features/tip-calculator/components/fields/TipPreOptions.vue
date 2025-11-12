<template>
  <div class="text-lg mt-2 flex items-center">
    <fieldset class="w-full">
      <div class="space-x-6 flex items-center">
        <button
          v-for="percentage in percentages"
          :key="percentage"
          class="flex items-center justify-center transition-all rounded-sm chip-percentage cursor-pointer text-sm hover:brightness-[0.9]"
          :class="{
            'is-current-percentage text-base font-semibold': isCurrentPercentage(percentage),
          }"
          @click="updatePercentage(percentage)"
        >
          {{ percentage }}%
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
  },
})

const percentages = [10, 15, 18, 20]

const emits = defineEmits(['update:modelValue'])

function isCurrentPercentage(percentage: number) {
  return percentage === props.modelValue
}

function updatePercentage(percentage: number) {
  emits('update:modelValue', percentage)
}
</script>

<style lang="scss" scoped>
.chip-percentage {
  background-color: var(--color-white);
  color: var(--color-purple);
  height: 35px;
  flex-grow: 1;

  &.is-current-percentage {
    background-color: var(--color-purple);
    color: var(--color-white);
  }
}
</style>
