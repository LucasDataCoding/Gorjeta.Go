<template>
  <form class="space-y-8" @submit.prevent>
    <PriceExpense v-model="formData.priceExpense" />
    <TipValue v-model="formData.tipPercentage" />
    <FieldQuantity
      label="quantos irão pagar"
      is-horizontal
      v-model="formData.quantityPayers"
      :min="2"
    />
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PriceExpense from './fields/PriceExpense.vue'
import TipValue from './fields/TipValue.vue'
import FieldQuantity from './fields/FieldQuantity.vue'

const formData = ref({
  tipPercentage: null,
  priceExpense: null,
  quantityPayers: null,
})
</script>
