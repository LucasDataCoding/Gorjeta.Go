import type { ICoinLabels } from './fields'

export interface IFormCalculatorTip {
  expenseValue: number
  tipPercentage: number
  peoplePaying: number
  exchangeRate: string | ICoinLabels
}
