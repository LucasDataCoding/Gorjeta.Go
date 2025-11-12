// useCalculateTipInfos.spec.ts
import { describe, it, expect } from 'vitest'
import { ref } from 'vue' // ✅ precisa estar aqui
import { useCalculateTipInfos } from '../composables/exchangeRate'

describe('useCalculateTipInfos', () => {
  it('calcula corretamente gorjeta e total para o grupo e individual', () => {
    const fields = ref({
      expenseValue: 73.23,
      tipPercentage: 13,
      peoplePaying: 10,
    })

    const result = useCalculateTipInfos(fields)
    const { group, individual } = result.value

    expect(group.expenseTip).toBeCloseTo(9.52, 2)
    expect(group.expenseTotal).toBeCloseTo(82.75, 2)
    expect(Number(individual.expenseTotal.toFixed(2))).toBe(8.29)
  })

  it('respeita arredondamento e divisões para valores pequenos', () => {
    const fields = ref({
      expenseValue: 2.58,
      tipPercentage: 17,
      peoplePaying: 3,
    })

    const result = useCalculateTipInfos(fields)
    const { group, individual } = result.value

    expect(group.expenseTip).toBeCloseTo(0.44, 2)
    expect(group.expenseTotal).toBeCloseTo(3.02, 2)
    expect(individual.expenseTotal).toBeCloseTo(1.01, 2)
  })
})
