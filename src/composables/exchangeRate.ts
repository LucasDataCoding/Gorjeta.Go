import type { ICoinLabels } from '@/types/fields'
import { computed, ref, watch, type Ref } from 'vue'
import axios from 'axios'
import { coins, coinsValues } from '@/constants/exchangeRate'

export interface IExchangeRateApiItemResponse {
  ask: '6.13497'
  bid: '6.11995'
  code: 'EUR'
  codein: 'BRL'
  create_date: '2025-11-11 09:26:03'
  high: '6.14628'
  low: '6.10501'
  name: 'Euro/Real Brasileiro'
  pctChange: '0.122387'
  timestamp: '1762863963'
  varBid: '0.007481'
}

export interface IExchangeRateResponse {
  [key: string]: IExchangeRateApiItemResponse
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
