import type { ICoinLabels } from '@/features/tip-calculator/types/fields'

export const coins: ICoinLabels[] = [
  {
    prefix: '$',
    sufix: 'usd',
    value: 'usd',
  },
  {
    prefix: '€',
    sufix: 'eur',
    value: 'eur',
  },
].map((coin) => ({ ...coin, value: coin.value.toUpperCase() }))

export const coinsValues = coins.map((c) => c.value)
