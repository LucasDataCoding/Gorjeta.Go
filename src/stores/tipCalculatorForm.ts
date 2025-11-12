import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { coins } from '@/constants/exchangeRate'
import type { IFormCalculatorTip, IFormCalculatorTipFromQuery } from '@/types/forms'
import { roundMoneyUp } from '@/helpers/money'

export function useParseQueryAtributtesForm() {
  const route = useRoute()
  const formAtributes = route.query

  const emptyStartFieldsParameters: IFormCalculatorTip = {
    expenseValue: 0,
    tipPercentage: 10,
    peoplePaying: 2,
    exchangeRate: coins[0]!.value,
  }

  const fields = ref({
    expenseValue: Number(formAtributes?.expenseValue) || emptyStartFieldsParameters.expenseValue,
    tipPercentage: Number(formAtributes?.tipPercentage) || emptyStartFieldsParameters.tipPercentage,
    peoplePaying: Number(formAtributes?.peoplePaying) || emptyStartFieldsParameters.peoplePaying,
    exchangeRate: formAtributes?.exchangeRate || emptyStartFieldsParameters.exchangeRate,
  } as IFormCalculatorTip)

  return fields
}

export function useCalculateTipInfos(fieldsParameters: any) {
  function calculatePercentageTipCost(cost: number) {
    return roundMoneyUp(cost * fieldsParameters.value.tipPercentage) / 100
  }

  const calcs = computed(() => {
    // Calculating Individual
    const expenseTipGroup = calculatePercentageTipCost(fieldsParameters.value.expenseValue)
    const groupCalculations = {
      expenseValue: fieldsParameters.value.expenseValue,
      expenseTip: expenseTipGroup,
      expenseTotal: roundMoneyUp(fieldsParameters.value.expenseValue + expenseTipGroup),
    }

    // Calculating Group
    const expenseValue = roundMoneyUp(
      groupCalculations.expenseValue / fieldsParameters.value.peoplePaying,
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

  return calcs
}

export const useTipCalculatorForm = defineStore('tipCalculator', () => {
  const fieldsParameters: Ref<IFormCalculatorTip> = useParseQueryAtributtesForm()
  const calculations = useCalculateTipInfos(fieldsParameters)

  const router = useRouter()

  // Watch to check if values of form changes,
  // if so, push query params to keep filters
  // so the user can share the account
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

  return {
    fieldsParameters,
    calculations,
  }
})
