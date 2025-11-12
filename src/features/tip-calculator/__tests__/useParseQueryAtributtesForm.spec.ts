// useParseQueryAtributtesForm.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { useParseQueryAtributtesForm } from '../composables/exchangeRate'
import { useRoute } from 'vue-router'
import { coins } from '../constants/exchangeRate'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}))

describe('useParseQueryAtributtesForm', () => {
  it('retorna valores padrão quando não há query params', () => {
    ;(useRoute as any).mockReturnValue({ query: {} })
    const fields = useParseQueryAtributtesForm()

    expect(fields.value.expenseValue).toBe(0)
    expect(fields.value.tipPercentage).toBe(10)
    expect(fields.value.peoplePaying).toBe(2)
    expect(fields.value.exchangeRate).toBe(coins[0]!.value)
  })

  it('preenche valores vindos da query', () => {
    ;(useRoute as any).mockReturnValue({
      query: { expenseValue: '100', tipPercentage: '15', peoplePaying: '5', exchangeRate: 'USD' },
    })
    const fields = useParseQueryAtributtesForm()

    expect(fields.value.expenseValue).toBe(100)
    expect(fields.value.tipPercentage).toBe(15)
    expect(fields.value.peoplePaying).toBe(5)
    expect(fields.value.exchangeRate).toBe('USD')
  })
})
