<template>
  <FieldNumber label="valor da conta" input-name="valor-conta">
    <template #prefix>{{ currentExchange.prefix }}</template>
    <template #sufix>{{ currentExchange.sufix }}</template>
  </FieldNumber>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import FieldNumber from './FieldNumber.vue'

interface ICoinLabels {
  prefix: string
  sufix: string
}

const coins: ICoinLabels[] = [
  {
    prefix: '$',
    sufix: 'usd',
  },
  {
    prefix: '€',
    sufix: 'eur',
  },
]

const currentExchange: Ref<ICoinLabels> = ref(coins[0])
</script>
