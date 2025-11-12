import type { ICoinLabels } from '@/features/tip-calculator/types/fields'
import { computed, ref, watch, type Ref } from 'vue'
import axios from 'axios'
import { coins, coinsValues } from '@/features/tip-calculator/constants/exchangeRate'
import { useRoute } from 'vue-router'
import type { IFormCalculatorTip } from '@/features/tip-calculator/types/forms'
import { roundMoneyUp } from '@/helpers/money'
import type {
  IExchangeRateResponse,
  IExchangeRateApiItemResponse,
} from '@/features/tip-calculator/types/api/exchange'

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

async function loadExchangeRates(desiredExchanges: string[]) {
  const response = await axios.get(
    `https://economia.awesomeapi.com.br/last/${desiredExchanges.map((e) => e + '-BRL').join(',')}`,
  )

  const data = response.data as IExchangeRateResponse

  return data
}

export function useCurrentExchangeRateValues(
  currentExchangeRateLabels: Ref<ICoinLabels | string>,
  expenseForeignExchange: Ref<number>,
) {
  const currentExchangeRate: Ref<null | IExchangeRateApiItemResponse> = ref(null)
  const currentExchangeRateValue = computed(() =>
    currentExchangeRate.value?.bid ? +currentExchangeRate.value?.bid : null,
  )
  const expenseInBrl = computed(
    () => expenseForeignExchange.value * (currentExchangeRateValue.value || 1),
  )

  watch(
    currentExchangeRateLabels,
    (val: ICoinLabels | string) => {
      if (typeof val !== 'string') {
        loadExchangeRates(coinsValues).then((exchangeRatesApi) => {
          currentExchangeRate.value = exchangeRatesApi[
            `${val.value}BRL`
          ] as IExchangeRateApiItemResponse
        })
      }
    },
    { immediate: true, deep: true },
  )

  return {
    currentExchangeRateValue,
    currentExchangeRate,
    expenseInBrl,
  }
}
