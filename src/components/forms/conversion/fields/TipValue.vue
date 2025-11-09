<template>
  <div>
    <div class="mb-1">
      <label for="valor-porcentagem" class="block text-sm font-bold uppercase">Gorjeta</label>
    </div>

    <div class="lg:grid grid-cols-12 gap-10 space-y-3 lg:space-y-0">
      <div class="col-span-7 space-y-5">
        <TipPreOptions v-model="currentPercentage" />

        <TipPercentage v-model="currentPercentage" class="w-full" />
      </div>

      <div class="col-span-5">
        <img
          src="../../../../../public/doodle_cacafe.png"
          width="149"
          height="199"
          alt="personagem tomando café"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import TipPercentage from './TipPercentage.vue'
import TipPreOptions from './TipPreOptions.vue'

const emits = defineEmits(['update:model-value'])

// TODO
// AJUSTAR PORCENTAGEM QUE NAO FICA BARRADO EM 20
// DEPOIS DO PRIMEIRO BARRAMENTO ACIMA DE 20

const currentPercentageTemp = ref(10)

const currentPercentage = computed({
  get: () => currentPercentageTemp.value,
  set: (percentage: number) => {
    emits('update:model-value', percentage)
    currentPercentageTemp.value = percentage
  },
})
</script>
