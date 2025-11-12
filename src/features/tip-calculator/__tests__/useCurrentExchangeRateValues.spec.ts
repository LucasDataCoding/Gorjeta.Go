// useCurrentExchangeRateValues.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import axios from 'axios'
import { useCurrentExchangeRateValues } from '../composables/exchangeRate'

vi.mock('axios')

describe('useCurrentExchangeRateValues', () => {
  it('carrega e calcula o valor convertido corretamente', async () => {
    ;(axios.get as any).mockResolvedValueOnce({
      data: {
        USDBRL: { bid: '5.00' },
      },
    })

    const currency = ref({ label: 'USD', value: 'USD' })
    const expense = ref(10)

    const { currentExchangeRate, currentExchangeRateValue, expenseInBrl } =
      useCurrentExchangeRateValues(currency, expense)

    await nextTick()
    await vi.waitFor(() => currentExchangeRate.value !== null)

    expect(currentExchangeRateValue.value).toBe(5)
    expect(expenseInBrl.value).toBe(50)
  })

  it('mantém 1:1 quando ainda não há taxa carregada', () => {
    const currency = ref('USD')
    const expense = ref(10)

    const { expenseInBrl } = useCurrentExchangeRateValues(currency, expense)

    expect(expenseInBrl.value).toBe(10)
  })
})
