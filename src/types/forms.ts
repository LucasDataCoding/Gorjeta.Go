import type { ICoinLabels } from './fields'

export interface IFormCalculatorTipFromQuery {
  expenseValue?: string
  tipPercentage?: string
  peoplePaying?: string
  exchangeRate: string
}

export interface IFormCalculatorTip {
  expenseValue: number
  tipPercentage: number
  peoplePaying: number
  exchangeRate: string | ICoinLabels
}
