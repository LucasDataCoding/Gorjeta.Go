import { ref, computed, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { coins } from '@/constants/exchangeRate'
import type { IFormCalculatorTip } from '@/types/forms'

export const useTipCalculatorForm = defineStore('counter', () => {
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

  return {
    fieldsParameters,
  }
})
