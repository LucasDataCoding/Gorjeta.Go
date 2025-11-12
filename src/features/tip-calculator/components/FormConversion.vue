<template>
  <form class="space-y-8" @submit.prevent>
    <FieldNumber
      v-model="tipCalculatorForm.fieldsParameters.expenseValue"
      label="valor da conta"
      input-name="valor-conta"
    >
      <template #prefix>
        {{ tipCalculatorForm.fieldsParameters?.exchangeRate?.prefix }}
      </template>

      <template #sufix>
        <ExchangeRate v-model="tipCalculatorForm.fieldsParameters.exchangeRate" />
      </template>
    </FieldNumber>

    <TipValue v-model="tipCalculatorForm.fieldsParameters.tipPercentage" />

    <FieldNumber
      label="quantos irão pagar"
      is-quantity
      is-horizontal
      v-model="tipCalculatorForm.fieldsParameters.peoplePaying"
      :min="2"
      :max="16"
      input-name="numero-pessoas"
    />
  </form>
</template>

<script lang="ts" setup>
import TipValue from './fields/TipValue.vue'
import FieldQuantity from '@/components/fields/FieldQuantity.vue'
import { useTipCalculatorForm } from '../stores/tipCalculatorForm'

import FieldNumber from '@/components/fields/FieldNumber.vue'
import ExchangeRate from './fields/ExchangeRate.vue'

const tipCalculatorForm = useTipCalculatorForm()
</script>
