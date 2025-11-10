<template>
  <FieldNumber label="valor da conta" input-name="valor-conta">
    <template #prefix>
      {{ exchangeRate?.prefix }}
    </template>

    <template #sufix>
      <ExchangeRate v-model="exchangeRate" />
    </template>
  </FieldNumber>
</template>

<script lang="ts" setup>
import FieldNumber from '@/components/forms/fields/FieldNumber.vue'
import ExchangeRate from './ExchangeRate.vue'
import { ref } from 'vue'

const exchangeRate = ref()
</script>
