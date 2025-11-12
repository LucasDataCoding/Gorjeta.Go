export function roundMoneyUp(val: number) {
  return Math.ceil(val * 100) / 100
}

export function formatMoneyVisual(val: number) {
  return String(roundMoneyUp(val)).replace('.', ',')
}
