import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { coins } from '@/constants/exchangeRate'
import type { IFormCalculatorTip, IFormCalculatorTipFromQuery } from '@/types/forms'
import { roundMoneyUp } from '@/helpers/money'
import { useParseQueryAtributtesForm, useCalculateTipInfos } from '@/composables/exchangeRate'

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
          ...val,
          exchangeRate: val.exchangeRate?.value,
        },
      }),
    { deep: true },
  )

  return {
    fieldsParameters,
    calculations,
  }
})
