import { ref, computed, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { coins } from '@/constants/exchangeRate'
import type { IFormCalculatorTip } from '@/types/forms'
import { roundMoneyUp } from '@/helpers/money'

export const useTipCalculatorForm = defineStore('tipCalculator', () => {
  const route = useRoute()

  const queryRoute = route.query

  const emptyStartFieldsParameters: IFormCalculatorTip = {
    expenseValue: 0,
    tipPercentage: 10,
    peoplePaying: 2,
    exchangeRate: coins[0]!.value,
  }

  const fieldsParameters: Ref<IFormCalculatorTip> = ref({
    ...emptyStartFieldsParameters,
    ...queryRoute,
  })

  const router = useRouter()

  watch(
    fieldsParameters,
    (val) =>
      router.push({
        query: {
          ...fieldsParameters.value,
          exchangeRate: fieldsParameters.value.exchangeRate?.value,
        },
      }),
    { deep: true },
  )

  // todo
  // separar em composables
  // integrar com api de cotação euro / dolar => real
  // remover timeout quando clica no + e - do quantity field

  // Calculation Methods
  function calculatePercentageTipCost(cost: number) {
    return roundMoneyUp(cost * fieldsParameters.value.tipPercentage) / 100
  }

  const calculations = computed(() => {
    // Calculating Individual
    const expenseTipGroup = calculatePercentageTipCost(fieldsParameters.value.expenseValue)
    const groupCalculations = {
      expenseValue: fieldsParameters.value.expenseValue,
      expenseTip: expenseTipGroup,
      expenseTotal: roundMoneyUp(fieldsParameters.value.expenseValue + expenseTipGroup),
    }

    // Calculating Group
    const expenseValue = roundMoneyUp(
      groupCalculations.expenseTip / fieldsParameters.value.peoplePaying,
    )

    const expenseTip = calculatePercentageTipCost(expenseValue)

    const expenseTotal = roundMoneyUp(expenseValue + expenseTip)

    const individualCalculations = {
      expenseValue,
      expenseTip,
      expenseTotal,
    }

    return {
      group: groupCalculations,
      individual: individualCalculations,
    }
  })

  return {
    fieldsParameters,
    calculations,
  }
})
